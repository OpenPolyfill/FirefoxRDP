// SPDX-License-Identifier: MPL-2.0
import assert from 'node:assert/strict'
import test from 'node:test'
import { FirefoxRDP, LongStringFront } from '../src/client.js'
import { marshalMethod } from '../src/specs.js'
import { encodeJson } from '../src/codec.js'
import { closeMockRdpServer, mockRdpServer } from './helpers/mock-rdp-server.js'

test('generated positional typed event listener receives Arg() array and Option() dictionary', async () => {
  const { server, port } = await mockRdpServer((packet, socket) => {
    if (packet.type === 'connect') socket.write(encodeJson({ from: 'root' }))
    if (packet.type === 'watchResources') {
      socket.write(
        Buffer.concat([
          encodeJson({
            from: 'w1',
            type: 'resources-available-array',
            array: [{ resourceType: 'console-message' }]
          }),
          encodeJson({ from: 'w1' })
        ])
      )
    }
    if (packet.type === 'substring') socket.write(encodeJson({ from: 'long1', substring: 'world' }))
  })
  const client = await FirefoxRDP.connect({ port })
  try {
    const watcher = client.front('w1', 'watcher')
    const result: unknown[] = []
    watcher.listen('resources-available-array', (resources) => result.push(...resources))
    await watcher.api.watchResources(['console-message'])
    assert.deepEqual(result, [{ resourceType: 'console-message' }])
    const grip = client.longString({ actor: 'long1', initial: 'hello ', length: 11 })
    assert.ok(grip instanceof LongStringFront)
    assert.equal(await grip.text(), 'hello world')
    const wait = watcher.waitFor('target-available-form', { timeoutMs: 20 })
    await assert.rejects(wait, /Timed out/)
    const value = client.revive(
      { count: 1, item: { actor: 'node1' }, untouched: 42 },
      'fixtureDict'
    )
    assert.deepEqual(value, { count: 1, item: { actor: 'node1' }, untouched: 42 })
  } finally {
    client.close()
    await closeMockRdpServer(server)
  }
})

test('nested dictionary arguments and actor retvals are marshalled recursively', () => {
  const fake = { actorId: 'actor1' }
  const method = { args: { node: { kind: 'arg' as const, index: 0, type: 'nullable:domnode' } } }
  assert.deepEqual(
    marshalMethod(method, [fake], (v) => (v === fake ? 'actor1' : v)),
    { node: 'actor1' }
  )
})
