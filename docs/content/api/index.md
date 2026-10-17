---
title: 'API reference'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

**The runtime API and the Firefox actor bindings are documented separately.**

See [Generated API](/docs/api/reference) for the TypeDoc pages. These pages are generated from `src/index.ts` during `npm run docs:prepare`.

### Main entry points

- `FirefoxRDP.connect({ port })` — connect to the remote debugging server.
- `rdp.root.listTabs()` — enumerate browser tab descriptors.
- `tab.getTarget()` / `tab.getWatcher()` — obtain the current debugging context and resource watcher.
- `rdp.front(actorId, typeName).api.method(...args)` — invoke a method generated from a Firefox actor spec.
- `front.listen(name, listener)` — subscribe to typed actor events.
- `front.call(methodName, params)` — generic named-parameter fallback for methods not included in the generated snapshot.

Start with [Getting started](/docs/guide/getting-started) or [Actor fronts](/docs/guide/actor-fronts) for complete examples.

The generated reference appears under `/docs/api/reference/` so this overview page always exists, even before TypeDoc generation. Documentation builds fail if the TypeDoc section is missing.
