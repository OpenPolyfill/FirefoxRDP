---
title: 'Monitor console resources'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

Use a watcher to observe console messages. Resource payloads are Firefox-native objects; inspect their `resourceType` and fields rather than assuming a fixed schema.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
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
```

Watchers remain subscribed until explicitly unwatched or the connection closes.
