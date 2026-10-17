import { FirefoxRDP } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const watcher = await tab.getWatcher()
  watcher.onTargetDestroyed((actorId) => rdp.forget(actorId))
  await watcher.watchTargets('frame')
  await new Promise<void>((resolve) => process.once('SIGINT', () => resolve()))
  await watcher.unwatchTargets('frame')
} finally {
  rdp.close()
}
