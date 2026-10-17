---
title: 'Inspect a page'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

List tabs, choose the selected descriptor, retrieve the active target and evaluate the document title and URL.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs()).find((x) => x.selected)
  if (!tab) throw new Error('No selected tab')
  const target = await tab.getTarget()
  const reply = await target
    .console()
    .evaluateJS('({ title: document.title, href: location.href })')
  console.log(reply.result)
} finally {
  rdp.close()
}
```

Use [tabs & targets](/docs/guide/tabs-and-targets) for navigation and switching considerations.
