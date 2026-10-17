// SPDX-License-Identifier: MPL-2.0
import assert from 'node:assert/strict'
import test from 'node:test'
import type { Socket } from 'node:net'
import { FirefoxRDP, RDPRemoteError } from '../src/client.js'
import { encodeJson } from '../src/codec.js'
import { closeMockRdpServer, mockRdpServer } from './helpers/mock-rdp-server.js'

test('greeting, connect, actor reply FIFO, event interleaving, remote error', async () => {
  const { server, port } = await mockRdpServer(
    (packet, socket) => {
      if (packet.type === 'connect') {
        assert.equal(packet.frontendVersion, '155.0')
        socket.write(encodeJson({ from: 'root' }))
      } else if (packet.type === 'listTabs') {
        socket.write(
          Buffer.concat([
            encodeJson({ from: 'root', type: 'tabListChanged' }),
            encodeJson({
              from: 'root',
              tabs: [{ actor: 'a1', title: 'Tab', url: 'about:blank' }],
              selected: 0
            })
          ])
        )
      } else if (packet.type === 'getWatcher') {
        socket.write(encodeJson({ from: 'a1', actor: 'watcher1', traits: {} }))
      } else if (packet.type === 'watchResources') {
        assert.deepEqual(packet.resourceTypes, ['console-message'])
        socket.write(
          encodeJson({
            from: 'watcher1',
            type: 'resources-available-array',
            resources: [{ resourceType: 'console-message' }]
          })
        )
        socket.write(encodeJson({ from: 'watcher1' }))
      } else if (packet.type === 'first') {
        socket.write(encodeJson({ from: 'a1', type: 'status-changed', status: 'ok' }))
        socket.write(encodeJson({ from: 'a1', value: 'first' }))
      } else if (packet.type === 'second') {
        socket.write(encodeJson({ from: 'a1', value: 'second' }))
      } else if (packet.type === 'bad') {
        socket.write(encodeJson({ from: 'a1', error: 'noSuchActor', message: 'gone' }))
      }
    },
    { fragmentGreeting: true }
  )
  const client = await FirefoxRDP.connect({ port, frontendVersion: '155.0' })
  try {
    let changed = 0
    client.root.on('tabListChanged', () => changed++)
    const tabs = await client.root.listTabs()
    assert.equal(changed, 1)
    assert.equal(tabs[0]?.selected, true)
    assert.equal(tabs[0]?.url, 'about:blank')
    const watcher = await tabs[0]!.getWatcher()
    let resources = 0
    watcher.on('resources-available-array', () => resources++)
    await watcher.watchResources(['console-message'])
    assert.equal(resources, 1)
    assert.equal(client.actor('watcher1'), watcher)
    const front = client.actor('a1')
    let events = 0
    front.on('status-changed', () => events++)
    const [a, b] = await Promise.all([front.methods.first(), front.methods.second()])
    assert.equal(a.value, 'first')
    assert.equal(b.value, 'second')
    assert.equal(events, 1)
    await assert.rejects(
      front.methods.bad(),
      (e: unknown) => e instanceof RDPRemoteError && e.code === 'noSuchActor'
    )
  } finally {
    client.close()
    await closeMockRdpServer(server)
  }
})

test('bulk and normal requests use the per-actor FIFO queue', async () => {
  const received: string[] = []
  let sendBulkReply: (() => void) | undefined
  let normalSocket: Socket | undefined
  const flushReplies = () => {
    if (received.length !== 2) return
    assert.deepEqual(received, ['bulk', 'normal'])
    sendBulkReply!()
    normalSocket!.write(encodeJson({ from: 'bulk1', type: 'after' }))
  }
  const { server, port } = await mockRdpServer(
    (packet, socket) => {
      if (packet.type === 'connect') socket.write(encodeJson({ from: 'root' }))
      if (packet.type === 'after') {
        received.push('normal')
        normalSocket = socket
        flushReplies()
      }
    },
    {
      onBulk: (actor, type, data, socket) => {
        assert.equal(actor, 'bulk1')
        assert.equal(type, 'upload')
        assert.deepEqual(data, Buffer.from('payload'))
        received.push('bulk')
        sendBulkReply = () => socket.write(encodeJson({ from: 'bulk1', type: 'uploaded' }))
        flushReplies()
      }
    }
  )
  const client = await FirefoxRDP.connect({ port })
  try {
    const [bulk, normal] = await Promise.all([
      client.requestBulk('bulk1', 'upload', Buffer.from('payload')),
      client.request('bulk1', 'after')
    ])
    assert.deepEqual(bulk, { from: 'bulk1', type: 'uploaded' })
    assert.deepEqual(normal, { from: 'bulk1', type: 'after' })
  } finally {
    client.close()
    await closeMockRdpServer(server)
  }
})
