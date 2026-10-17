import { FirefoxRDP } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tab')
  const watcher = await tab.getWatcher()
  watcher.on('resources-available-array', (packet) => {
    if (Array.isArray(packet.array)) {
      for (const resource of packet.array) console.log(resource)
    }
  })
  await watcher.watchResources(['network-event'])
  console.log('Watching network-event; press Ctrl+C to stop')
  await new Promise<void>((resolve) => process.once('SIGINT', () => resolve()))
  await watcher.unwatchResources(['network-event'])
} finally {
  rdp.close()
}
