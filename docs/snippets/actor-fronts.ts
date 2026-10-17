import { FirefoxRDP, ActorFront } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const root = rdp.front('root', 'root')
  const tabs = await root.api.listTabs()
  console.log(tabs)
  const front: ActorFront = rdp.actor('someActorId')
  front.registerEvents('customNotification')
  // Call a method not represented by the bundled generated bindings:
  // await front.call('someMethod', { property: 'value' });
} finally {
  rdp.close()
}
