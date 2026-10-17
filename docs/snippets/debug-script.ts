import { FirefoxRDP } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const target = await tab.getTarget()
  const threadActor = target.form?.threadActor
  if (typeof threadActor !== 'string') throw new Error('No thread actor in target form')
  const thread = rdp.front(threadActor, 'thread') // requires synced thread spec
  await thread.api.attach({})
  console.log(await thread.api.sources())
} finally {
  rdp.close()
}
