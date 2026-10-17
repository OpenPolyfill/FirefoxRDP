---
title: 'Monitor network resources'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

Subscribe to network events via the watcher; the payload shape depends on Firefox resource actors and the generated schema revision.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tab')
  const watcher = await tab.getWatcher()
  watcher.on('resources-available-array', (packet) => {
    if (Array.isArray(packet.array)) {
      for (const resource of packet.array) console.log(resource)
    }
  })
  await watcher.watchResources(['network-event'])
  console.log('Watching network-event; press Ctrl+C to stop')
  await new Promise<void>((resolve) => process.once('SIGINT', () => resolve()))
  await watcher.unwatchResources(['network-event'])
} finally {
  rdp.close()
}
```

Network request metadata may be separate from the underlying `networkEvent` actor's response bodies and headers.
