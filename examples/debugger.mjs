// SPDX-License-Identifier: MPL-2.0
import { FirefoxRDP } from '../dist/index.js'

const client = await FirefoxRDP.connect({ port: Number(process.env.RDP_PORT ?? 6000) })
try {
  const [tab] = await client.root.listTabs()
  if (!tab) throw new Error('No tabs are available')
  const target = await tab.getTarget()
  const watcher = await tab.getWatcher({ isServerTargetSwitchingEnabled: true })
  watcher.onTargetAvailable((next) =>
    console.log('Target available:', next.actorId, next.form?.url)
  )
  watcher.onTargetDestroyed((id) => console.log('Target destroyed:', id))
  watcher.listen('resources-available-array', (resources) => {
    for (const resource of resources) console.log('Resource:', resource.resourceType)
  })
  await watcher.watchResources(['console-message', 'network-event'])
  console.log('Target:', target.actorId)
  console.log('Web console:', target.console().actorId)
  console.log('Evaluation:', (await target.console().evaluateJS('location.href')).result)
} finally {
  client.close()
}
