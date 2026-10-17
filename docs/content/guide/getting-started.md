---
title: 'Getting started'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

Install the package from GitHub Packages:

```sh
printf '%s\n' '@openpolyfill:registry=https://npm.pkg.github.com' >> .npmrc
npm login --scope=@openpolyfill --auth-type=legacy --registry=https://npm.pkg.github.com
npm install @openpolyfill/firefox-rdp
```

Use a GitHub personal access token (classic) with `read:packages` as the npm password. Keep `.npmrc` credentials out of version control.

Start a separate Firefox profile with remote debugging enabled:

```sh
firefox --no-remote --profile /path/to/debug-profile --start-debugger-server 6000
```

Enable `devtools.debugger.remote-enabled` / `devtools.chrome.enabled` if your build requires them, and approve the remote-debugging prompt. Bind/access the debugging endpoint only on trusted localhost. See [connection security](/docs/guide/connection).

## First program

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect({ port: 6000 })
try {
  const tabs = await rdp.root.listTabs()
  const tab = tabs.find((t) => t.selected) ?? tabs[0]
  if (!tab) throw new Error('Open a Firefox tab first')
  const target = await tab.getTarget()
  const evaluation = await target.console().evaluateJS('document.title')
  if (evaluation.hasException) throw new Error(String(evaluation.exceptionMessage))
  console.log(evaluation.result)
} finally {
  rdp.close()
}
```

Run it with a TypeScript runtime of your choice, or compile with `tsc`. Open an ordinary web tab first. The script closes the connection in `finally`.

## Where next?

Read [tabs & targets](/docs/guide/tabs-and-targets), [events & resources](/docs/guide/events-and-resources), and the [API reference](/docs/api). The runtime includes generated actor bindings from a recorded Firefox source revision; regenerate them when targeting a different revision.
