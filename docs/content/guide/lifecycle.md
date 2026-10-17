---
title: 'Actor lifecycle'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

Actor IDs belong to one connection. Reuse fronts through `rdp.actor(id)` or `rdp.front(id, type)`, and release actors that expose `release()`. `TabDescriptorFront` and `WatcherFront` handle several destruction events automatically; full Mozilla DevTools target-switching semantics are not reproduced.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const watcher = await tab.getWatcher()
  watcher.onTargetDestroyed((actorId) => rdp.forget(actorId))
  await watcher.watchTargets('frame')
  await new Promise<void>((resolve) => process.once('SIGINT', () => resolve()))
  await watcher.unwatchTargets('frame')
} finally {
  rdp.close()
}
```

Treat a target form as stale after `target-destroyed-form`. If a navigation switches processes, reacquire the target; do not keep issuing commands against an obsolete actor ID. On shutdown always call `rdp.close()`. Pending requests reject when the transport terminates.
