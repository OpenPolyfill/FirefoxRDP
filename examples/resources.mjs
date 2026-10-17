// SPDX-License-Identifier: MPL-2.0
import { FirefoxRDP } from '../dist/index.js'
const client = await FirefoxRDP.connect({ port: Number(process.env.RDP_PORT ?? 6000) })
try {
  const tabs = await client.root.listTabs()
  const tab = tabs.find((t) => t.selected) ?? tabs[0]
  if (!tab) throw new Error('No tabs')
  const watcher = await tab.getWatcher({ isServerTargetSwitchingEnabled: true })
  watcher.on('resources-available-array', (p) => console.log('Available:', p.array))
  watcher.on('resources-updated-array', (p) => console.log('Updated:', p.array))
  watcher.onTargetAvailable((target) => console.log('Target:', target.actorId))
  await watcher.watchTargets('frame')
  await watcher.watchResources(['console-message', 'network-event'])
  console.log('Listening for 10s...')
  await new Promise((r) => setTimeout(r, 10_000))
} finally {
  client.close()
}
