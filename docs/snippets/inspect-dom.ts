import { FirefoxRDP, ActorFront } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const target = await tab.getTarget()
  const inspectorActor = target.form?.inspectorActor
  if (typeof inspectorActor !== 'string') throw new Error('No inspector actor')
  const inspector = rdp.front(inspectorActor, 'inspector') // requires synced specs
  const walker = await inspector.api.getWalker(null)
  if (walker instanceof ActorFront) console.log('Walker actor', walker.actorId)
} finally {
  rdp.close()
}
