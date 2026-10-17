// SPDX-License-Identifier: MPL-2.0
/** Firefox stream transport: byte-length-prefixed UTF-8 JSON and bulk payloads. */
export type JsonPacket = { from: string; [field: string]: unknown }
export type BulkPacket = {
  from: string
  type: string
  bulk: true
  data: Buffer
  [field: string]: unknown
}
export type IncomingPacket = JsonPacket | BulkPacket

export function encodeJson(packet: Record<string, unknown>): Buffer {
  const json = Buffer.from(JSON.stringify(packet), 'utf8')
  return Buffer.concat([Buffer.from(`${json.length}:`, 'ascii'), json])
}

export function encodeBulk(actor: string, type: string, data: Buffer): Buffer {
  if (!/^[^\s:]+$/.test(actor) || !/^[^\s:]+$/.test(type)) {
    throw new TypeError('Invalid bulk actor or type')
  }
  return Buffer.concat([Buffer.from(`bulk ${actor} ${type} ${data.length}:`, 'utf8'), data])
}

export class PacketDecoder {
  private buffered: Buffer = Buffer.alloc(0)
  private next: { length: number; actor?: string; type?: string } | undefined

  constructor(readonly maxPacketBytes = 64 * 1024 * 1024) {
    if (!Number.isSafeInteger(maxPacketBytes) || maxPacketBytes < 1) {
      throw new RangeError('Invalid maxPacketBytes')
    }
  }

  push(chunk: Buffer): IncomingPacket[] {
    this.buffered = this.buffered.length ? Buffer.concat([this.buffered, chunk]) : chunk
    const packets: IncomingPacket[] = []
    while (true) {
      if (!this.next) {
        const end = this.buffered.indexOf(0x3a) // colon
        if (end < 0) {
          if (this.buffered.length > 512) throw new Error('RDP frame header too large')
          break
        }
        if (end > 512) throw new Error('RDP frame header too large')
        const header = this.buffered.subarray(0, end).toString('utf8')
        const jsonMatch = /^(0|[1-9]\d*)$/.exec(header)
        const bulkMatch = /^bulk ([^\s:]+) ([^\s:]+) (0|[1-9]\d*)$/.exec(header)
        if (!jsonMatch && !bulkMatch) throw new Error('Invalid RDP frame header')
        const length = Number(jsonMatch?.[1] ?? bulkMatch?.[3])
        if (!Number.isSafeInteger(length) || length > this.maxPacketBytes) {
          throw new Error('RDP packet length exceeds limit')
        }
        this.next = {
          length,
          ...(bulkMatch && { actor: bulkMatch[1], type: bulkMatch[2] })
        }
        this.buffered = this.buffered.subarray(end + 1)
      }
      if (this.buffered.length < this.next.length) break
      const payload = this.buffered.subarray(0, this.next.length)
      this.buffered = this.buffered.subarray(this.next.length)
      if (this.next.actor && this.next.type) {
        // Clone so the data remains valid when the input buffer is recycled.
        packets.push({
          from: this.next.actor,
          type: this.next.type,
          bulk: true,
          data: Buffer.from(payload)
        })
      } else {
        let value: unknown
        try {
          value = JSON.parse(payload.toString('utf8'))
        } catch (error) {
          throw new Error('Malformed RDP JSON packet', { cause: error })
        }
        if (
          !value ||
          typeof value !== 'object' ||
          Array.isArray(value) ||
          typeof (value as JsonPacket).from !== 'string'
        ) {
          throw new Error("RDP packet must be a JSON object with a 'from' actor")
        }
        packets.push(value as JsonPacket)
      }
      this.next = undefined
    }
    return packets
  }
}
