---
title: 'Tabs and targets'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

`root.listTabs()` returns tracked `TabDescriptorFront` objects. Tab descriptors and targets are distinct actors: the tab is a stable descriptor; the target represents the currently debugged execution context and may change on navigation.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
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
```

Prefer tab descriptor navigation methods (`navigateTo`, `reload`, `goBack`) on Firefox 140+. For older Firefox revisions, consult the generated specs and actor traits. Do not cache a target across navigation or process switching without listening for watcher notifications.
