# Firefox RDP

A Node.js client for Firefox's Remote Debugging Protocol (RDP). Powered by TypeScript, the Firefox actor protocol,[^rdp-protocol] and generated actor bindings.

## About

`@openpolyfill/firefox-rdp` lets Node.js applications control and inspect Firefox through actor/front objects instead of manually composing `{to, type}` packets.

The package combines a small runtime client with bindings generated from Firefox's declarative actor specifications. Use the high-level fronts for common browser operations, the generated `.api` facade for typed actor methods, or the raw fallback when an actor method is not represented by a generated schema.

## Features

- TCP connection to Firefox's remote debugging server.
- UTF-8 JSON framing and bounded bulk-payload support.
- Per-actor FIFO request correlation with event interleaving.
- Managed actor fronts with actor-form revival and lifecycle tracking.
- Generated positional APIs from Firefox `Arg()`, `Option()`, and `RetVal()` declarations.
- Typed event listeners with raw packet listeners when needed.
- Recursive actor and dictionary serialization.
- Long-string grips with chunked reads.
- Runtime registration of actor specs and dictionary types.
- A source-sync and code-generation pipeline for Firefox actor specs.

## Installation

```sh
npm install @openpolyfill/firefox-rdp
```

Requirements:

- Node.js 20 or newer.
- Firefox with remote debugging enabled.

Start Firefox with a separate profile and a localhost-only debugging endpoint:

```sh
firefox --no-remote \
  --profile /path/to/debug-profile \
  --start-debugger-server 6000
```

Enable `devtools.debugger.remote-enabled` and, when required by the target build, `devtools.chrome.enabled`. Firefox RDP is privileged, unencrypted, and unauthenticated at the TCP layer. Do not expose it to a LAN or the public Internet.

## Usage

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'

const rdp = await FirefoxRDP.connect({ port: 6000 })

try {
  const tabs = await rdp.root.listTabs()
  const tab = tabs.find((candidate) => candidate.selected) ?? tabs[0]
  if (!tab) throw new Error('Open a Firefox tab first')

  const target = await tab.getTarget()
  const result = await target.console().evaluateJS('document.title')
  console.log(result.result)

  await tab.navigateTo('https://example.org')
} finally {
  rdp.close()
}
```

## Actor fronts

The built-in fronts cover common RDP operations, following Firefox's client-side actor model.[^client-api]

```ts
const watcher = await tab.getWatcher()

watcher.listen('resources-available-array', (resources) => {
  for (const resource of resources) {
    console.log(resource.resourceType)
  }
})

await watcher.api.watchResources(['console-message', 'network-event'])
```

For any actor represented by the generated bindings:

```ts
const thread = rdp.front(threadActorId, 'thread')
thread.listen('paused', (packet) => console.log(packet))
await thread.api.attach({})
```

When a generated schema is unavailable, use the generic front:

```ts
const actor = rdp.actor(actorId)
await actor.call('methodName', { namedArgument: 1 })
```

`rdp.front(actorId, typeName).api.method(...args)` uses the positional signature extracted from Firefox specs. `front.listen(name, listener)` decodes typed event arguments, while `front.on(name, listener)` receives raw packets. Actor forms can be revived with `rdp.fromForm(form, typeName)`, and long strings can be read with `await rdp.longString(grip).text()`.

## Firefox compatibility

Firefox RDP is an internal protocol and does not provide stable semver compatibility. The bundled bindings come from a recorded Firefox source revision, and method availability depends on the Firefox build being debugged.[^actor-specs]

Generated declarations describe wire-level actor operations. They do not recreate every Mozilla front subclass, custom serializer, pooled actor lifecycle, or other browser-side helper. Always test against the Firefox revision you intend to use.

To generate bindings from a specific Firefox revision:

```sh
npm run sync:firefox -- --ref <firefox-commit-or-tag>
npm run build
npm test
```

The generated output is written to `src/generated/specs.ts` and `src/generated/firefox-source.json`. A matching local Firefox checkout can also be used:

```sh
npm run generate:specs -- /path/to/firefox/devtools/shared/specs
npm run build
npm test
```

The generator extracts declarative actor methods and events, dictionary types, storage-spec factories, and supported cross-file `extend()` inheritance. It aborts on unsupported declarations rather than silently producing partial bindings.

## Examples

- `examples/smoke.mjs` — connect and evaluate a JavaScript expression.
- `examples/live.mjs` — connect, list tabs, and evaluate page code.
- `examples/resources.mjs` — watch resource events.
- `examples/debugger.mjs` — inspect debugger and target events.
- `examples/specs.mjs` — inspect generated actor specs.

The examples use `RDP_PORT` for the Firefox port and `RDP_EVAL` for the JavaScript expression where applicable.

## Documentation

The documentation source lives in `docs/content/`. The generated website uses SVOCS and TypeDoc.

```sh
npm run docs:setup   # first setup
npm run docs:dev
npm run docs:build
npm run docs:preview
npm run docs:check
```

## Development

```sh
npm install
npm run format:check
npm run lint
npm test
npm run docs:check
npm run pack:check
```

Use `npm run format` to apply Prettier formatting. `npm run verify` runs formatting checks, ESLint, tests, and documentation checks together.

## Publishing

The `publish-package` workflow publishes to npmjs using npm trusted publishing (GitHub Actions OIDC) and to GitHub Packages independently. After updating the package version, push a matching `v*.*.*` tag. The npmjs package must be configured to trust this repository and workflow in npm's package settings.

## License

The SDK and generated bindings are licensed under MPL-2.0. Mozilla-origin definitions retain their upstream attribution. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md).

[^rdp-protocol]: Mozilla's overview of the wire protocol and actor model: [Firefox Remote Debugging Protocol](https://firefox-source-docs.mozilla.org/devtools/backend/protocol.html)

[^client-api]: Mozilla's reference for Firefox client-side fronts: [Firefox client API](https://firefox-source-docs.mozilla.org/devtools/backend/client-api.html)

[^actor-specs]: The declarative actor specification sources used to generate bindings: [Firefox actor specs](https://github.com/mozilla-firefox/firefox/tree/main/devtools/shared/specs)
