// SPDX-License-Identifier: MPL-2.0
import assert from 'node:assert/strict'
import test from 'node:test'
import { PacketDecoder, encodeBulk, encodeJson } from '../src/codec.js'

test('UTF-8 byte lengths, fragmented and combined frames', () => {
  const decoder = new PacketDecoder()
  const a = encodeJson({ from: 'root', title: 'Xin chào 🌍' })
  const b = encodeJson({ from: 'target', result: 3 })
  assert.equal(decoder.push(a.subarray(0, 2)).length, 0)
  assert.equal(decoder.push(Buffer.concat([a.subarray(2), b])).length, 2)
})

test('bulk frame roundtrip and size ceiling', () => {
  const decoder = new PacketDecoder()
  const payload = Buffer.from([0, 1, 0, 255, 58])
  const wire = encodeBulk('one.actor', 'data', payload)
  assert.deepEqual(decoder.push(wire), [
    { from: 'one.actor', type: 'data', bulk: true, data: payload }
  ])
  assert.throws(() => new PacketDecoder(4).push(encodeJson({ from: 'root' })), /exceeds limit/)
  assert.throws(() => decoder.push(Buffer.from('foo:hello')), /Invalid RDP frame header/)
})
