import { FirefoxRDP, RDPRemoteError } from '../../src/index.js'
const rdp = await FirefoxRDP.connect({ requestTimeoutMs: 15_000 })
rdp.on('unhandledPacket', (packet) => console.warn('Unexpected RDP packet', packet))
try {
  await rdp.root.listTabs()
} catch (error) {
  if (error instanceof RDPRemoteError) console.error(error.actorId, error.code)
  else throw error
} finally {
  rdp.close()
}
