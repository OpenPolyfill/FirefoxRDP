// SPDX-License-Identifier: MPL-2.0
import { EventEmitter } from 'node:events'
import { Socket } from 'node:net'
import type { BulkPacket, IncomingPacket, JsonPacket } from './codec.js'
import { TcpTransport, connectTcp } from './transport.js'
import { bundledSpecs, bundledDictTypes } from './generated/specs.js'
import { marshalMethod, unmarshalReturn, unmarshalEvent } from './specs.js'
import type { ActorSpec } from './specs.js'
import type { GeneratedActorAPI, GeneratedFront } from './generated/specs.js'

export type RDPResponse = JsonPacket | BulkPacket
export type PacketListener = (packet: RDPResponse) => void
export type Params = Record<string, unknown>

export interface ConnectOptions {
  host?: string
  port?: number
  connectTimeoutMs?: number
  /** Firefox DevTools wire compatibility marker; match this to the remote Firefox release. */
  frontendVersion?: string
  requestTimeoutMs?: number
  maxPacketBytes?: number
}

export class RDPRemoteError extends Error {
  constructor(
    readonly actorId: string,
    readonly code: string,
    message: string
  ) {
    super(message)
    this.name = 'RDPRemoteError'
  }
}

type Deferred = {
  resolve: (value: RDPResponse) => void
  reject: (reason: Error) => void
  timer: NodeJS.Timeout
  timedOut: boolean
}

/** A generic actor client: use call() or the methods proxy to invoke actor methods. */
export class ActorFront {
  private readonly listeners = new Map<string, Set<PacketListener>>()
  private readonly eventNames = new Set<string>()
  private readonly typedListeners = new Map<string, Set<(...args: unknown[]) => void>>()
  /** Most recent actor form, when supplied by the remote actor. */
  form: Params | undefined
  readonly methods: Record<string, (params?: Params) => Promise<RDPResponse>>
  /** Firefox-spec positional method calls; arguments are marshalled by Arg/Option templates. */
  readonly api: Record<string, (...args: unknown[]) => Promise<unknown>>
  protected spec?: ActorSpec
  get specTypeName(): string | undefined {
    return this.spec?.typeName
  }

  constructor(
    readonly client: FirefoxRDP,
    readonly actorId: string
  ) {
    // A legacy RDP notification type not declared in protocol.js actor specs.
    this.registerEvents('networkEventUpdate')
    this.methods = new Proxy(
      Object.create(null) as Record<string, (params?: Params) => Promise<RDPResponse>>,
      {
        get: (_target, name) => {
          if (typeof name !== 'string' || name === 'then') return undefined
          return (params?: Params) => this.call(name, params)
        }
      }
    )
    this.api = new Proxy(
      Object.create(null) as Record<string, (...args: unknown[]) => Promise<unknown>>,
      {
        get: (_target, method) => {
          if (typeof method !== 'string' || method === 'then') return undefined
          return (...args: unknown[]) => this.invoke(method, ...args)
        }
      }
    )
  }

  /** Attach an actor spec to enable schema-based calls and automatic event routing. */
  useSpec(spec: ActorSpec): this {
    this.spec = spec
    this.registerEvents(...Object.values(spec.events))
    return this
  }

  /** Call the named Firefox actor method with its original positional JS signature. */
  async invoke(method: string, ...args: unknown[]): Promise<unknown> {
    const spec = this.spec?.methods[method]
    if (!spec)
      throw new Error(
        `Unknown method ${this.spec?.typeName ?? 'untyped actor'}.${method}; load an actor spec first`
      )
    const packet = marshalMethod(spec, args, (value, type) => this.client.serialize(value, type))
    if (spec.oneway) {
      this.client.notify(this.actorId, spec.wireName ?? method, packet)
      return undefined
    }
    const response = await this.call(spec.wireName ?? method, packet)
    const value = unmarshalReturn(response, spec)
    if (spec.release) this.client.forget(this.actorId)
    return this.client.revive(value, spec.returns?.type)
  }

  call(method: string, params: Params = {}): Promise<RDPResponse> {
    return this.client.request(this.actorId, method, params)
  }

  /** Subscribe with Firefox's native positional Front event signature. */
  listen(type: string, listener: (...args: unknown[]) => void): this {
    this.registerEvents(this.spec?.events[type] ?? type)
    let listeners = this.typedListeners.get(type)
    if (!listeners) this.typedListeners.set(type, (listeners = new Set()))
    listeners.add(listener)
    return this
  }

  unlisten(type: string, listener: (...args: unknown[]) => void): this {
    this.typedListeners.get(type)?.delete(listener)
    return this
  }

  /** Await one event, optionally with cancellation and timeout. */
  waitFor(
    type: string,
    options: { timeoutMs?: number; signal?: AbortSignal } = {}
  ): Promise<RDPResponse> {
    const timeoutMs = options.timeoutMs ?? this.client.requestTimeoutMs
    return new Promise((resolve, reject) => {
      if (options.signal?.aborted) {
        reject(options.signal.reason)
        return
      }
      let timer: NodeJS.Timeout | undefined
      const cleanup = () => {
        this.off(type, handler)
        if (timer) clearTimeout(timer)
        options.signal?.removeEventListener('abort', cancelled)
      }
      const handler = (packet: RDPResponse) => {
        cleanup()
        resolve(packet)
      }
      const cancelled = () => {
        cleanup()
        reject(options.signal?.reason ?? new Error('Aborted'))
      }
      this.on(type, handler)
      options.signal?.addEventListener('abort', cancelled, { once: true })
      if (timeoutMs > 0)
        timer = setTimeout(() => {
          cleanup()
          reject(new Error(`Timed out waiting for RDP event ${type}`))
        }, timeoutMs)
    })
  }

  /** Mark event packet types explicitly, even if no listener is currently attached. */
  registerEvents(...types: string[]): this {
    for (const type of types) this.eventNames.add(type)
    return this
  }

  on(type: string, listener: PacketListener): this {
    this.registerEvents(this.spec?.events[type] ?? type)
    let listeners = this.listeners.get(type)
    if (!listeners) this.listeners.set(type, (listeners = new Set()))
    listeners.add(listener)
    return this
  }

  off(type: string, listener: PacketListener): this {
    this.listeners.get(type)?.delete(listener)
    return this
  }

  once(type: string, listener: PacketListener): this {
    const oneShot: PacketListener = (packet) => {
      this.off(type, oneShot)
      listener(packet)
    }
    return this.on(type, oneShot)
  }

  /** Preserve listeners when a generic actor is upgraded to a specialized front. */
  adoptFrom(other: ActorFront): this {
    for (const type of other.eventNames) this.eventNames.add(type)
    for (const [type, callbacks] of other.listeners) {
      for (const callback of callbacks) this.on(type, callback)
    }
    for (const [type, callbacks] of other.typedListeners) {
      for (const callback of callbacks) this.listen(type, callback)
    }
    this.form ??= other.form
    return this
  }

  isEvent(packet: RDPResponse): boolean {
    return (
      typeof packet.type === 'string' && this.eventNames.has(packet.type) && !('error' in packet)
    )
  }

  dispatch(packet: RDPResponse): void {
    const type = packet.type as string
    const names = new Set([type])
    for (const [eventName, wireType] of Object.entries(this.spec?.events ?? {})) {
      if (wireType === type) names.add(eventName)
    }
    for (const name of names) {
      for (const listener of this.listeners.get(name) ?? []) {
        try {
          listener(packet)
        } catch (error) {
          this.client.emit('listenerError', error, packet)
        }
      }
      const args = unmarshalEvent(packet, this.spec?.eventArgs?.[name], (v, type) =>
        this.client.revive(v, type)
      )
      for (const listener of this.typedListeners.get(name) ?? []) {
        try {
          listener(...args)
        } catch (error) {
          this.client.emit('listenerError', error, packet)
        }
      }
    }
  }
}

function actorIdFrom(value: unknown, field: string): string {
  if (typeof value === 'string') return value
  if (
    value &&
    typeof value === 'object' &&
    typeof (value as { actor?: unknown }).actor === 'string'
  ) {
    return (value as { actor: string }).actor
  }
  throw new Error(`Expected actor ID in ${field}`)
}

export interface TabInfo {
  actor: string
  title?: string
  url?: string
  [key: string]: unknown
}

export class RootFront extends ActorFront {
  constructor(client: FirefoxRDP) {
    super(client, 'root')
    this.registerEvents(
      'tabListChanged',
      'workerListChanged',
      'addonListChanged',
      'processListChanged'
    )
  }

  async getRoot(): Promise<RDPResponse> {
    return this.call('getRoot')
  }
  async listTabs(): Promise<TabDescriptorFront[]> {
    const response = await this.call('listTabs')
    const tabs = response.tabs
    if (!Array.isArray(tabs)) throw new Error('Invalid listTabs reply')
    return tabs.map((tab, index) => {
      if (!tab || typeof tab !== 'object') throw new Error('Invalid tab form')
      const info = tab as TabInfo
      const existing = this.client.actor(info.actor)
      if (existing instanceof TabDescriptorFront) {
        existing.update(
          info,
          typeof info.selected === 'boolean' ? info.selected : response.selected === index
        )
        return existing
      }
      return this.client.track(
        new TabDescriptorFront(
          this.client,
          info,
          typeof info.selected === 'boolean' ? info.selected : response.selected === index
        )
      )
    })
  }
  async listProcesses(): Promise<RDPResponse> {
    return this.call('listProcesses')
  }
  async listAddons(): Promise<RDPResponse> {
    return this.call('listAddons')
  }
  async listWorkers(): Promise<RDPResponse> {
    return this.call('listWorkers')
  }
  async getProcess(id = 0): Promise<ActorFront> {
    const reply = await this.call('getProcess', { id })
    const revived = this.client.revive(reply.processDescriptor, 'processDescriptor')
    return revived instanceof ActorFront
      ? revived
      : this.client.actor(actorIdFrom(reply.processDescriptor, 'processDescriptor'))
  }
}

export class TabDescriptorFront extends ActorFront {
  constructor(
    client: FirefoxRDP,
    public info: TabInfo,
    public selected: boolean
  ) {
    super(client, info.actor)
    this.form = info
    this.useSpec(client.specs.tabDescriptor!)
    this.on('descriptor-destroyed', () => client.forget(this.actorId))
  }
  update(info: TabInfo, selected: boolean): void {
    this.info = info
    this.form = info
    this.selected = selected
  }
  get title(): string | undefined {
    return this.info.title
  }
  get url(): string | undefined {
    return this.info.url
  }

  async getWatcher(
    options: { isServerTargetSwitchingEnabled?: boolean; isPopupDebuggingEnabled?: boolean } = {}
  ): Promise<WatcherFront> {
    const reply = await this.call('getWatcher', options)
    // The watcher form itself has an actor field.
    const actorId = actorIdFrom(reply.watcher ?? reply, 'watcher')
    const current = this.client.actor(actorId)
    const watcher =
      current instanceof WatcherFront
        ? current
        : this.client.track(new WatcherFront(this.client, actorId))
    watcher.form = (reply.watcher ?? reply) as Params
    return watcher
  }

  async navigateTo(url: string, waitForLoad = true): Promise<void> {
    await this.call('navigateTo', { url, waitForLoad })
  }
  async reload(bypassCache = false): Promise<void> {
    await this.call('reloadDescriptor', { bypassCache })
  }
  async goBack(): Promise<void> {
    await this.call('goBack')
  }
  async goForward(): Promise<void> {
    await this.call('goForward')
  }

  async getTarget(): Promise<TargetFront> {
    const reply = await this.call('getTarget')
    const form = (reply.frame ?? reply.target) as unknown
    const actor = actorIdFrom(form, 'frame')
    const current = this.client.actor(actor)
    if (current instanceof TargetFront) {
      current.form = form as Params
      return current
    }
    return this.client.track(new TargetFront(this.client, actor, form as Params))
  }
}

export class WatcherFront extends ActorFront {
  constructor(client: FirefoxRDP, actorId: string) {
    super(client, actorId)
    this.useSpec(client.specs.watcher!)
    this.on('target-destroyed-form', (packet) => {
      const target = packet.target
      if (target && typeof target === 'object' && typeof (target as Params).actor === 'string') {
        client.forget((target as { actor: string }).actor)
      }
    })
  }
  onTargetAvailable(listener: (target: TargetFront) => void): this {
    return this.on('target-available-form', (packet) => {
      const form = packet.target
      if (form && typeof form === 'object' && !Array.isArray(form)) {
        const actorId = actorIdFrom(form, 'target')
        const previous = this.client.actor(actorId)
        const target =
          previous instanceof TargetFront
            ? previous
            : this.client.track(new TargetFront(this.client, actorId, form as Params))
        target.form = form as Params
        listener(target)
      }
    })
  }
  onTargetDestroyed(listener: (actorId: string, options: Params | null) => void): this {
    return this.on('target-destroyed-form', (packet) => {
      const target = packet.target
      if (target && typeof target === 'object' && typeof (target as Params).actor === 'string') {
        const actorId = (target as { actor: string }).actor
        this.client.forget(actorId)
        listener(actorId, (packet.options ?? null) as Params | null)
      }
    })
  }
  async watchTargets(targetType: string): Promise<void> {
    await this.call('watchTargets', { targetType })
  }
  async unwatchTargets(targetType: string): Promise<void> {
    this.client.notify(this.actorId, 'unwatchTargets', { targetType, options: null })
  }
  async watchResources(resourceTypes: string[]): Promise<void> {
    await this.call('watchResources', { resourceTypes })
  }
  async unwatchResources(resourceTypes: string[]): Promise<void> {
    this.client.notify(this.actorId, 'unwatchResources', { resourceTypes })
  }
}

export class TargetFront extends ActorFront {
  constructor(client: FirefoxRDP, actorId: string, formData: Params = {}) {
    super(client, actorId)
    this.form = formData
    this.useSpec(client.specs.windowGlobalTarget!)
  }
  console(): WebConsoleFront {
    const actorId = actorIdFrom(this.form?.consoleActor, 'consoleActor')
    const current = this.client.actor(actorId)
    return current instanceof WebConsoleFront
      ? current
      : this.client.track(new WebConsoleFront(this.client, actorId))
  }
  async attach(): Promise<RDPResponse> {
    return this.call('attach')
  }
  async detach(): Promise<RDPResponse> {
    return this.call('detach')
  }
}

export class WebConsoleFront extends ActorFront {
  constructor(client: FirefoxRDP, actorId: string) {
    super(client, actorId)
    this.useSpec(client.specs.console!)
  }
  /** Evaluate in the tab; wait for the evaluationResult event corresponding to the returned resultID. */
  async evaluateJS(text: string, options: Params = {}): Promise<RDPResponse> {
    const received: RDPResponse[] = []
    let expect: string | undefined
    let wake: ((packet: RDPResponse) => void) | undefined
    const listener: PacketListener = (packet) => {
      received.push(packet)
      if (wake && packet.resultID === expect) wake(packet)
    }
    this.on('evaluationResult', listener)
    try {
      // evaluateJS() was removed from the modern webconsole actor; only async remains.
      const response = await this.call('evaluateJSAsync', { text, ...options })
      if (typeof response.resultID !== 'string')
        throw new Error('evaluateJSAsync did not return resultID')
      expect = response.resultID
      const existing = received.find((p) => p.resultID === expect)
      if (existing) return existing
      return await new Promise<RDPResponse>((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error(`RDP evaluation timed out: ${expect}`)),
          this.client.requestTimeoutMs
        )
        wake = (packet) => {
          clearTimeout(timer)
          resolve(packet)
        }
      })
    } finally {
      this.off('evaluationResult', listener)
    }
  }
}

export class LongStringFront extends ActorFront {
  private grip?: { actor: string; length: number; initial: string }
  constructor(
    client: FirefoxRDP,
    actorId: string,
    grip?: { actor: string; length: number; initial: string }
  ) {
    super(client, actorId)
    this.grip = grip
  }
  get length(): number | undefined {
    return this.grip?.length
  }
  get initial(): string | undefined {
    return this.grip?.initial
  }
  setGrip(grip: { actor: string; length: number; initial: string }): void {
    this.grip = grip
  }
  /** Read the complete string using chunked substring requests, including its initial prefix. */
  async text(chunkSize = 64 * 1024): Promise<string> {
    const grip = this.grip
    if (!grip) throw new Error('No longstring grip')
    if (!Number.isSafeInteger(chunkSize) || chunkSize < 1) throw new RangeError('Invalid chunkSize')
    const chunks = [grip.initial]
    for (let at = grip.initial.length; at < grip.length; at += chunkSize) {
      chunks.push(await this.substring(at, Math.min(at + chunkSize, grip.length)))
    }
    return chunks.join('')
  }
  async substring(start: number, end: number): Promise<string> {
    const reply = await this.call('substring', { start, end })
    if (typeof reply.substring !== 'string') throw new Error('Invalid substring reply')
    return reply.substring
  }
}

export class ObjectFront extends ActorFront {
  async prototypeAndProperties(): Promise<RDPResponse> {
    return this.call('prototypeAndProperties')
  }
  async property(name: string): Promise<RDPResponse> {
    return this.call('property', { name })
  }
  async release(): Promise<void> {
    await this.call('release')
  }
}

/** External Node.js Firefox RDP client. Transport owns the stream, fronts own event declarations. */
export class FirefoxRDP extends EventEmitter {
  readonly root: RootFront
  /** Schema registry, including specs generated from a Firefox checkout. */
  readonly specs: Record<string, ActorSpec> = { ...bundledSpecs }
  readonly dictTypes: Record<string, Record<string, string>> = { ...bundledDictTypes }
  readonly greeting: Promise<JsonPacket>
  private readonly fronts = new Map<string, ActorFront>()
  private readonly pending = new Map<string, Deferred[]>()
  private greetResolve!: (packet: JsonPacket) => void
  private greetReject!: (reason: Error) => void
  private greeted = false
  private closed = false

  private constructor(
    readonly transport: TcpTransport,
    readonly requestTimeoutMs: number
  ) {
    super()
    this.root = new RootFront(this)
    this.root.useSpec(this.specs.root!)
    this.fronts.set('root', this.root)
    this.greeting = new Promise<JsonPacket>((resolve, reject) => {
      this.greetResolve = resolve
      this.greetReject = reject
    })
    // Connection failure may happen before connect() reaches the greeting await.
    void this.greeting.catch(() => {})
    transport.on('packet', (packet: IncomingPacket) => this.handlePacket(packet))
    transport.on('protocolError', (error: Error) => this.emit('protocolError', error))
    transport.on('transportError', (error: Error) => this.emit('transportError', error))
    transport.on('closed', () => this.terminate(new Error('RDP connection closed')))
  }

  static async connect(options: ConnectOptions = {}): Promise<FirefoxRDP> {
    const {
      host = '127.0.0.1',
      port = 6000,
      connectTimeoutMs = 10_000,
      requestTimeoutMs = 30_000,
      maxPacketBytes,
      frontendVersion
    } = options
    if (!Number.isSafeInteger(requestTimeoutMs) || requestTimeoutMs < 1)
      throw new RangeError('Invalid requestTimeoutMs')
    const socket = new Socket()
    const client = new FirefoxRDP(new TcpTransport(socket, maxPacketBytes), requestTimeoutMs)
    try {
      await connectTcp(socket, host, port, connectTimeoutMs)
      // Firefox sends the root greeting without a client request.
      await Promise.race([
        client.greeting,
        new Promise<never>((_, reject) => {
          const timer = setTimeout(
            () => reject(new Error('Timed out waiting for RDP greeting')),
            connectTimeoutMs
          )
          void client.greeting.finally(() => clearTimeout(timer)).catch(() => {})
        })
      ])
      try {
        await client.root.call('connect', frontendVersion ? { frontendVersion } : {})
      } catch (error) {
        if (!(error instanceof RDPRemoteError) || error.code !== 'unrecognizedPacketType')
          throw error
      }
      return client
    } catch (error) {
      client.close()
      throw error
    }
  }

  /** Add generated schemas (e.g. build output of scripts/generate-specs.mjs). */
  registerSpecs(specs: Record<string, ActorSpec>): void {
    Object.assign(this.specs, specs)
    for (const front of this.fronts.values()) {
      const spec = front.specTypeName
        ? this.specs[front.specTypeName]
        : front instanceof RootFront
          ? this.specs.root
          : front instanceof WatcherFront
            ? this.specs.watcher
            : front instanceof TabDescriptorFront
              ? this.specs.tabDescriptor
              : front instanceof WebConsoleFront
                ? this.specs.console
                : front instanceof TargetFront
                  ? this.specs.windowGlobalTarget
                  : undefined
      if (spec) front.useSpec(spec)
    }
  }

  /** Register dictionary shapes from a generated Firefox source version. */
  registerDictTypes(dictTypes: Record<string, Record<string, string>>): void {
    Object.assign(this.dictTypes, dictTypes)
  }

  /** Encode actor fronts and fields inside Firefox dictionary types. */
  serialize(value: unknown, type: string): unknown {
    if (value == null) return value
    if (type.startsWith('nullable:')) return this.serialize(value, type.slice(9))
    if (type.startsWith('array:'))
      return Array.isArray(value) ? value.map((item) => this.serialize(item, type.slice(6))) : value
    if (type.endsWith('#actorid')) return value instanceof ActorFront ? value.actorId : value
    const shape = this.dictTypes[type]
    if (shape && typeof value === 'object' && !Array.isArray(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([field, item]) => [
          field,
          shape[field] ? this.serialize(item, shape[field]) : item
        ])
      )
    }
    if (this.specs[type] && value instanceof ActorFront) return value.actorId
    return value
  }

  /** Typed, generated positional API for any actor represented in the schema registry. */
  front<K extends keyof GeneratedActorAPI & string>(actorId: string, typeName: K): GeneratedFront<K>
  front(actorId: string, typeName: string): ActorFront
  front(actorId: string, typeName: string): ActorFront {
    const spec = this.specs[typeName]
    if (!spec) throw new Error(`Unknown actor spec: ${typeName}`)
    const front = this.actor(actorId).useSpec(spec)
    return front
  }

  /** Turn an actor form into a tracked front and keep its form available. */
  fromForm<T extends ActorFront = ActorFront>(
    form: { actor: string; [key: string]: unknown },
    typeName?: string
  ): T {
    const front = typeName ? this.front(form.actor, typeName) : this.actor(form.actor)
    front.form = form
    return front as T
  }

  /** Reconstitute a Firefox longstring grip into an on-demand readable object. */
  longString(
    grip: string | { actor: string; length: number; initial: string }
  ): string | LongStringFront {
    if (typeof grip === 'string') return grip
    if (
      !grip ||
      typeof grip.actor !== 'string' ||
      typeof grip.initial !== 'string' ||
      !Number.isSafeInteger(grip.length)
    ) {
      throw new TypeError('Invalid RDP longString grip')
    }
    const current = this.actor(grip.actor)
    if (current instanceof LongStringFront) {
      current.setGrip(grip)
      return current
    }
    return this.track(new LongStringFront(this, grip.actor, grip))
  }

  /** Convert actor-form return values to the matching managed Front. */
  revive(value: unknown, type?: string): unknown {
    if (!type || value == null) return value
    if (type.startsWith('nullable:')) return this.revive(value, type.slice(9))
    if (type === 'longstring')
      return this.longString(value as string | { actor: string; length: number; initial: string })
    if (type.endsWith('#actorid')) return value
    const shape = this.dictTypes[type]
    if (shape && typeof value === 'object' && !Array.isArray(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([field, item]) => [
          field,
          shape[field] ? this.revive(item, shape[field]) : item
        ])
      )
    }
    if (type.startsWith('array:') && Array.isArray(value))
      return value.map((x) => this.revive(x, type.slice(6)))
    const desc = this.specs[type]
    if (!desc || (typeof value !== 'string' && (typeof value !== 'object' || !('actor' in value))))
      return value
    const actorId = actorIdFrom(value, type)
    const front = this.front(actorId, type)
    if (value && typeof value === 'object' && 'actor' in value) front.form = value as Params
    return front
  }

  /** Cache a specialized front so incoming notifications are dispatched to it. */
  track<T extends ActorFront>(front: T): T {
    const previous = this.fronts.get(front.actorId)
    if (previous && previous !== front) front.adoptFrom(previous)
    this.fronts.set(front.actorId, front)
    return front
  }

  actor(actorId: string): ActorFront {
    if (!actorId) throw new TypeError('actorId is required')
    let front = this.fronts.get(actorId)
    if (!front) this.fronts.set(actorId, (front = new ActorFront(this, actorId)))
    return front
  }

  /** Discard a released/destroyed actor front so its ID cannot retain stale listeners. */
  forget(actorId: string): void {
    if (actorId !== 'root') this.fronts.delete(actorId)
  }

  /** Fire-and-forget invocation for oneway methods; does not occupy a FIFO reply slot. */
  notify(actorId: string, method: string, params: Params = {}): void {
    if (this.closed) throw new Error('RDP connection closed')
    if (!actorId || !method || Object.hasOwn(params, 'to') || Object.hasOwn(params, 'type'))
      throw new TypeError('Invalid RDP notification routing')
    this.transport.send({ ...params, to: actorId, type: method })
  }

  /** Arbitrary RDP method, with no manually composed packets at call sites. */
  request(actorId: string, method: string, params: Params = {}): Promise<RDPResponse> {
    if (this.closed) return Promise.reject(new Error('RDP connection closed'))
    if (!actorId || !method) return Promise.reject(new TypeError('actorId and method are required'))
    if (Object.hasOwn(params, 'to') || Object.hasOwn(params, 'type')) {
      return Promise.reject(new TypeError('Params cannot override RDP routing fields'))
    }
    return this.enqueueRequest(actorId, `RDP request timed out: ${actorId}.${method}`, () =>
      this.transport.send({ ...params, to: actorId, type: method })
    )
  }

  /** Send a bulk-data request and await its actor's next reply. */
  requestBulk(actorId: string, type: string, data: Buffer): Promise<RDPResponse> {
    if (this.closed) return Promise.reject(new Error('RDP connection closed'))
    if (!actorId || !type) return Promise.reject(new TypeError('actorId and type are required'))
    return this.enqueueRequest(actorId, `RDP bulk request timed out: ${actorId}.${type}`, () =>
      this.transport.sendBulk(actorId, type, data)
    )
  }

  private enqueueRequest(
    actorId: string,
    timeoutMessage: string,
    send: () => void
  ): Promise<RDPResponse> {
    let queue = this.pending.get(actorId)
    if (!queue) this.pending.set(actorId, (queue = []))
    if (queue.length >= 1024)
      return Promise.reject(new Error(`Too many pending requests to ${actorId}`))
    return new Promise<RDPResponse>((resolve, reject) => {
      // A timeout MUST NOT remove the FIFO slot. A late reply still consumes it.
      const item: Deferred = {
        resolve,
        reject,
        timedOut: false,
        timer: setTimeout(() => {
          item.timedOut = true
          reject(new Error(timeoutMessage))
        }, this.requestTimeoutMs)
      }
      queue!.push(item)
      try {
        send()
      } catch (error) {
        queue!.pop()
        clearTimeout(item.timer)
        reject(error as Error)
      }
    })
  }

  private handlePacket(packet: IncomingPacket): void {
    this.emit('packet', packet) // diagnostic stream, including the root greeting
    if (!this.greeted && packet.from === 'root' && 'applicationType' in packet) {
      this.greeted = true
      this.greetResolve(packet as JsonPacket)
      return
    }
    const front = this.fronts.get(packet.from)
    if (front?.isEvent(packet)) {
      front.dispatch(packet)
      return
    }
    const queue = this.pending.get(packet.from)
    const item = queue?.shift()
    if (queue?.length === 0) this.pending.delete(packet.from)
    if (!item) {
      this.emit('unhandledPacket', packet)
      return
    }
    clearTimeout(item.timer)
    if (item.timedOut) return
    if (typeof packet.error === 'string') {
      item.reject(
        new RDPRemoteError(
          packet.from,
          packet.error,
          typeof packet.message === 'string' ? packet.message : packet.error
        )
      )
    } else {
      item.resolve(packet)
    }
  }

  private terminate(error: Error): void {
    if (this.closed) return
    this.closed = true
    if (!this.greeted) this.greetReject(error)
    for (const queue of this.pending.values())
      for (const item of queue) {
        clearTimeout(item.timer)
        if (!item.timedOut) item.reject(error)
      }
    this.pending.clear()
    this.emit('close')
  }

  close(): void {
    this.terminate(new Error('RDP client closed'))
    this.transport.close()
  }
}
