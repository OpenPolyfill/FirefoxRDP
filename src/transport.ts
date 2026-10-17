// SPDX-License-Identifier: MPL-2.0
import { EventEmitter } from 'node:events'
import { Socket } from 'node:net'
import { encodeBulk, encodeJson, PacketDecoder, type IncomingPacket } from './codec.js'

/** Node TCP transport. No implicit TLS: Firefox RDP TCP is plaintext. */
export class TcpTransport extends EventEmitter {
  private readonly decoder: PacketDecoder
  private closed = false

  constructor(
    readonly socket: Socket,
    maxPacketBytes?: number
  ) {
    super()
    this.decoder = new PacketDecoder(maxPacketBytes)
    socket.on('data', (data: Buffer) => {
      try {
        for (const packet of this.decoder.push(data)) this.emit('packet', packet)
      } catch (error) {
        this.emit('protocolError', error)
        socket.destroy(error as Error)
      }
    })
    socket.on('error', (error) => this.emit('transportError', error))
    socket.on('close', () => {
      this.closed = true
      this.emit('closed')
    })
  }

  send(packet: Record<string, unknown>): void {
    this.write(encodeJson(packet))
  }

  sendBulk(actor: string, type: string, data: Buffer): void {
    this.write(encodeBulk(actor, type, data))
  }

  private write(data: Buffer): void {
    if (this.closed || this.socket.destroyed) throw new Error('RDP transport closed')
    this.socket.write(data)
  }

  close(): void {
    this.socket.destroy()
  }
}

export async function connectTcp(
  socket: Socket,
  host: string,
  port: number,
  timeoutMs: number
): Promise<void> {
  if (!Number.isSafeInteger(port) || port < 1 || port > 65535) throw new RangeError('Invalid port')
  await new Promise<void>((resolve, reject) => {
    const cleanup = () => {
      socket.off('connect', connected)
      socket.off('error', failed)
      clearTimeout(timer)
    }
    const connected = () => {
      cleanup()
      resolve()
    }
    const failed = (error: Error) => {
      cleanup()
      reject(error)
    }
    const timer = setTimeout(() => {
      cleanup()
      socket.destroy()
      reject(new Error(`RDP connection timed out after ${timeoutMs}ms`))
    }, timeoutMs)
    socket.once('connect', connected)
    socket.once('error', failed)
    socket.connect(port, host)
  })
}

export type { IncomingPacket }
