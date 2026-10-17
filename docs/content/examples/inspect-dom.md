---
title: 'Inspect the DOM'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

The inspector actor is normally exposed by the target form. A generated inspector front gives access to `getWalker()`; the returned `walker` is a managed actor front when both specs are present.

```ts
import { FirefoxRDP, ActorFront } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const target = await tab.getTarget()
  const inspectorActor = target.form?.inspectorActor
  if (typeof inspectorActor !== 'string') throw new Error('No inspector actor')
  const inspector = rdp.front(inspectorActor, 'inspector') // requires synced specs
  const walker = await inspector.api.getWalker(null)
  if (walker instanceof ActorFront) console.log('Walker actor', walker.actorId)
} finally {
  rdp.close()
}
```

DOM node grips are not the same thing as browser `Node` instances in your Node.js process.
