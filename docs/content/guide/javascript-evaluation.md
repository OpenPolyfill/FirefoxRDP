---
title: 'JavaScript evaluation'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

`WebConsoleFront.evaluateJS()` wraps modern Firefox `evaluateJSAsync`: it sends the expression, waits for the matching `evaluationResult` event by `resultID`, and returns the raw evaluation packet. It does not automatically turn Firefox object grips into JavaScript values.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const target = await tab.getTarget()
  const result = await target.console().evaluateJS('({ title: document.title })')
  if (result.hasException) console.error(result.exceptionMessage)
  else console.log(result.result) // RDP primitive or object grip
} finally {
  rdp.close()
}
```

Inspect `result.hasException`, `result.exceptionMessage`, `result.result`, and other evaluation fields. Object references may be grips (with actor IDs), not JSON-serializable copies of remote objects. See [actor fronts](/docs/guide/actor-fronts).
