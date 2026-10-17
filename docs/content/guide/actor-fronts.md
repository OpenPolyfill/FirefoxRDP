---
title: 'Actor fronts and generated APIs'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

Firefox's server object is an **actor** identified by an ID. An `ActorFront` is the client-side handle for that ID. The high-level `.api.method(...args)` methods are generated from Firefox `Arg(index)`, `Option(index)` and `RetVal(type)` spec declarations, while `.call(method, params)` is a raw named-parameter fallback.

```ts
import { FirefoxRDP, ActorFront } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect()
try {
  const root = rdp.front('root', 'root')
  const tabs = await root.api.listTabs()
  console.log(tabs)
  const front: ActorFront = rdp.actor('someActorId')
  front.registerEvents('customNotification')
  // Call a method not represented by the bundled generated bindings:
  // await front.call('someMethod', { property: 'value' });
} finally {
  rdp.close()
}
```

`front(actorId, 'actorType')` loads the associated spec and returns a typed front when the actor type is present in generated bindings. `fromForm(form, 'actorType')` also stores the form. Responses containing declared actor types become tracked fronts; `array:` and dictionary types revive recursively.

## Regenerate actor bindings from a Firefox revision

This is a contributor workflow. Consumers already receive the bundled generated bindings from npm and do not need the repository source tree. `sync:firefox` downloads specs for a GitHub revision; `generate:specs` can read a matching local Firefox checkout.

```sh
npm run sync:firefox -- --ref <full-firefox-commit-sha>
npm run build
npm test
```

Commit both `src/generated/specs.ts` and `src/generated/firefox-source.json`. `npm run build` must not re-download or regenerate specs. Firefox's implementation includes custom `Front` subclass logic beyond the declarative protocol; generated methods expose wire operations, not every Mozilla-side helper.
