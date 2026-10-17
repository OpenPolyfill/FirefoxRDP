// SPDX-License-Identifier: MPL-2.0
import { createServer, type Server, type Socket } from 'node:net'
import { once } from 'node:events'
import { encodeJson } from '../../src/codec.js'

export type MockPacket = Record<string, unknown>
export type MockRdpServerOptions = {
  fragmentGreeting?: boolean
  onBulk?: (actor: string, type: string, data: Buffer, socket: Socket) => void
}

export type MockPacketHandler = (packet: MockPacket, socket: Socket) => void

export async function mockRdpServer(
  onPacket: MockPacketHandler,
  options: MockRdpServerOptions = {}
): Promise<{ server: Server; port: number }> {
  const server = createServer((socket) => {
    const greeting = encodeJson({ from: 'root', applicationType: 'browser', traits: {} })
    if (options.fragmentGreeting) {
      socket.write(greeting.subarray(0, 3))
      socket.write(greeting.subarray(3))
    } else {
      socket.write(greeting)
    }
    let buffer = Buffer.alloc(0)
    socket.on('data', (chunk: Buffer) => {
      buffer = Buffer.concat([buffer, chunk])
      while (true) {
        const colon = buffer.indexOf(58)
        if (colon < 0) break
        const header = buffer.subarray(0, colon).toString('ascii')
        const bulk = /^bulk ([^\s:]+) ([^\s:]+) (0|[1-9]\d*)$/.exec(header)
        const size = Number(bulk?.[3] ?? header)
        if (!Number.isSafeInteger(size) || buffer.length < colon + 1 + size) break
        const end = colon + 1 + size
        const payload = buffer.subarray(colon + 1, end)
        buffer = buffer.subarray(end)
        if (bulk) {
          options.onBulk?.(bulk[1], bulk[2], payload, socket)
          continue
        }
        const packet = JSON.parse(payload.toString('utf8')) as MockPacket
        onPacket(packet, socket)
      }
    })
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Expected socket address')
  return { server, port: address.port }
}

export async function closeMockRdpServer(server: Server): Promise<void> {
  await new Promise<void>((resolve) => server.close(() => resolve()))
}
