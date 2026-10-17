---
title: 'Events and resources'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

Each actor routes its own unsolicited packets. Register listeners before starting a watch to avoid losing the first event. Use `.on(name, packet)` for raw packets and `.listen(name, ...args)` for decoded positional arguments driven by Firefox actor event specs.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const watcher = await tab.getWatcher()
  watcher.on('resources-available-array', (packet) => console.log(packet.array))
  watcher.listen('resources-updated-array', (resources) => console.log(resources))
  await watcher.watchResources(['console-message'])
  await new Promise<void>((resolve) => process.once('SIGINT', () => resolve()))
  await watcher.unwatchResources(['console-message'])
} finally {
  rdp.close()
}
```

For resource watchers, use `watcher.watchResources([...])` or the generated `watcher.api.watchResources([...])`. Resource names and availability are Firefox-version dependent. `waitFor(type, { timeoutMs, signal })` waits for a single **raw** event packet.

Events not declared in the selected spec snapshot may be mistaken for replies during pending calls; explicitly register custom event types with `front.registerEvents('eventName')` when using an untyped actor.
