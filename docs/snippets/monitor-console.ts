import { FirefoxRDP } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tab')
  const watcher = await tab.getWatcher()
  watcher.on('resources-available-array', (packet) => {
    const resources = packet.array
    if (Array.isArray(resources)) for (const resource of resources) console.log(resource)
  })
  await watcher.watchResources(['console-message'])
  console.log('Watching console-message; press Ctrl+C to stop')
  await new Promise<void>((resolve) => process.once('SIGINT', () => resolve()))
  await watcher.unwatchResources(['console-message'])
} finally {
  rdp.close()
}
