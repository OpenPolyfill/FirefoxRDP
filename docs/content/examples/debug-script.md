---
title: 'Debug a script'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

Attach to the thread actor advertised in the current target form. This example lists sources rather than assuming any breakpoints or source IDs.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
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
```

Generate the `thread` actor spec from your Firefox revision before using typed thread methods. Paused/resumed notifications, exception handling and debugger state can vary with Firefox.
