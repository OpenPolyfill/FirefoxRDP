// SPDX-License-Identifier: MPL-2.0
/** Declarative Firefox actor specification after extraction from Mozilla's JS specs. */
export interface ArgumentSpec {
  kind: 'arg' | 'option'
  index: number
  type: string
}
export interface ActorMethodSpec {
  wireName?: string
  args: Record<string, ArgumentSpec>
  returns?: { type: string; field: string | null }
  oneway?: boolean
  release?: boolean
}
export interface ActorSpec {
  typeName: string
  methods: Record<string, ActorMethodSpec>
  /** JS event name -> on-the-wire packet type */
  events: Record<string, string>
  /** Event name -> wire properties and their positional Firefox Arg/Option slots. */
  eventArgs?: Record<string, Record<string, ArgumentSpec>>
  source?: string
}
/** Map positional Actor method arguments onto its RDP request template. */
export function marshalMethod(
  spec: ActorMethodSpec,
  args: unknown[],
  convert = toWireValue
): Record<string, unknown> {
  const packet: Record<string, unknown> = {}
  for (const [name, def] of Object.entries(spec.args)) {
    const argument = args[def.index]
    const value =
      def.kind === 'option'
        ? argument && typeof argument === 'object'
          ? (argument as Record<string, unknown>)[name]
          : undefined
        : argument
    if (value === undefined) continue
    // Firefox actor types are represented by their actor ID when passed as arguments.
    packet[name] = convert(value, def.type)
  }
  return packet
}
export function toWireValue(value: unknown, type: string): unknown {
  if (type.startsWith('nullable:') && value == null) return value
  if (type.startsWith('nullable:')) return toWireValue(value, type.slice(9))
  if (type.startsWith('array:') && Array.isArray(value))
    return value.map((v) => toWireValue(v, type.slice(6)))
  if (value && typeof value === 'object' && 'actorId' in value && typeof value.actorId === 'string')
    return value.actorId
  return value
}
/** Unwrap `RetVal` packets as Firefox FrontClassWithSpec does. */
export function unmarshalReturn(packet: Record<string, unknown>, spec: ActorMethodSpec): unknown {
  if (!spec.returns) return undefined
  const { field } = spec.returns
  const value =
    field === null
      ? Object.fromEntries(Object.entries(packet).filter(([k]) => k !== 'from'))
      : packet[field]
  // Actor retvals can be recognized via their form by the calling client.
  return value
}

/** Decode a Firefox actor event into the positional arguments passed to native Front listeners. */
export function unmarshalEvent(
  packet: Record<string, unknown>,
  eventArgs: Record<string, ArgumentSpec> = {},
  convert: (v: unknown, type: string) => unknown = (value) => value
): unknown[] {
  const args: unknown[] = []
  for (const [field, def] of Object.entries(eventArgs)) {
    const value = convert(packet[field], def.type)
    if (def.kind === 'option') {
      const option = args[def.index]
      const object = option && typeof option === 'object' ? (option as Record<string, unknown>) : {}
      if (value !== undefined) object[field] = value
      args[def.index] = object
    } else {
      args[def.index] = value
    }
  }
  return args
}
