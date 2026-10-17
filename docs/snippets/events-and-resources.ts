import { FirefoxRDP } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const watcher = await tab.getWatcher()
  watcher.on('resources-available-array', (packet) => console.log(packet.array))
  watcher.listen('resources-updated-array', (resources) => console.log(resources))
  await watcher.watchResources(['console-message'])
  await new Promise<void>((resolve) => process.once('SIGINT', () => resolve()))
  await watcher.unwatchResources(['console-message'])
} finally {
  rdp.close()
}
