// SPDX-License-Identifier: MPL-2.0
import assert from 'node:assert/strict'
import test from 'node:test'
import { FirefoxRDP } from '../src/client.js'
import { encodeJson } from '../src/codec.js'
import { closeMockRdpServer, mockRdpServer, type MockPacket } from './helpers/mock-rdp-server.js'

test('generated api + modern evaluationResult + oneway event routing without mis-correlating FIFO', async () => {
  const sent: MockPacket[] = []
  const { server, port } = await mockRdpServer((packet, socket) => {
    sent.push(packet)
    if (packet.type === 'connect') socket.write(encodeJson({ from: 'root' }))
    if (packet.type === 'listTabs')
      socket.write(
        encodeJson({ from: 'root', tabs: [{ actor: 'tabA', selected: true, title: 'Hello' }] })
      )
    if (packet.type === 'getTarget')
      socket.write(
        encodeJson({ from: 'tabA', frame: { actor: 'targetA', consoleActor: 'consoleA' } })
      )
    if (packet.type === 'getWatcher')
      socket.write(encodeJson({ from: 'tabA', actor: 'watchA', traits: {} }))
    if (packet.type === 'watchResources') {
      socket.write(
        Buffer.concat([
          encodeJson({
            from: 'watchA',
            type: 'resources-available-array',
            array: [{ resourceType: 'console-message' }]
          }),
          encodeJson({ from: 'watchA' })
        ])
      )
    }
    if (packet.type === 'evaluateJSAsync') {
      assert.equal(packet.text, '2 + 2')
      socket.write(
        Buffer.concat([
          encodeJson({ from: 'consoleA', type: 'networkEvent', eventActor: { actor: 'net1' } }),
          encodeJson({ from: 'consoleA', type: 'evaluationResult', resultID: 'eval-1', result: 4 }),
          encodeJson({ from: 'consoleA', resultID: 'eval-1' })
        ])
      )
    }
    if (packet.type === 'goBack') socket.write(encodeJson({ from: 'tabA' }))
  })
  const rdp = await FirefoxRDP.connect({ port })
  try {
    const tabs = await rdp.root.listTabs()
    assert.equal(tabs[0]!.selected, true)
    const tab = tabs[0]!
    assert.equal((await tab.getTarget()).console().actorId, 'consoleA')
    const watcher = await tab.getWatcher()
    let n = 0
    watcher.on('resources-available-array', (pkt) => {
      n = (pkt.array as unknown[]).length
    })
    await watcher.watchResources(['console-message'])
    assert.equal(n, 1)
    await watcher.unwatchResources(['console-message'])
    await watcher.watchResources(['console-message']) // no stale pending reply from oneway
    assert.equal((await tab.getTarget()).console().actorId, 'consoleA')
    const target = await tab.getTarget()
    const consoleFront = target.console()
    let eventAlias = 0
    consoleFront.on('serverNetworkEvent', () => eventAlias++)
    assert.equal((await consoleFront.evaluateJS('2 + 2')).result, 4)
    assert.equal(eventAlias, 1)
    assert.equal(await tab.api.goBack(), undefined)
    assert.equal(typeof rdp.front('tabA', 'tabDescriptor').api.getFavicon, 'function')
    assert.ok(sent.some((x) => x.type === 'unwatchResources'))
    assert.ok(sent.some((x) => x.type === 'evaluateJSAsync'))
  } finally {
    rdp.close()
    await closeMockRdpServer(server)
  }
})
