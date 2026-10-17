import { FirefoxRDP } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  for (const tab of await rdp.root.listTabs()) {
    console.log(tab.actorId, tab.title, tab.url, tab.selected)
  }
  const tab = (await rdp.root.listTabs()).find((t) => t.selected)
  if (!tab) throw new Error('No selected tab')
  const watcher = await tab.getWatcher()
  watcher.onTargetAvailable((target) => console.log('Target available', target.actorId))
  watcher.onTargetDestroyed((id) => console.log('Target destroyed', id))
  await watcher.watchTargets('frame')
  await new Promise<void>((resolve) => process.once('SIGINT', () => resolve()))
  await watcher.unwatchTargets('frame')
} finally {
  rdp.close()
}
