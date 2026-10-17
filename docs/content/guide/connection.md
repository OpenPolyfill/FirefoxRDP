---
title: 'Connections & security'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

The SDK currently supports Node.js TCP, not WebSocket or a browser-hosted direct socket. Firefox emits an unsolicited `root` greeting before the first request. `FirefoxRDP.connect()` waits for it, sends the optional `root.connect` handshake (Firefox 133+) and handles older servers that reject that method.

```ts
import { FirefoxRDP } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect({
  host: '127.0.0.1',
  port: 6000,
  connectTimeoutMs: 10_000,
  requestTimeoutMs: 30_000
  // frontendVersion: '155.0', // optionally match the target Firefox release
})
try {
  console.log((await rdp.greeting).applicationType)
} finally {
  rdp.close()
}
```

`requestTimeoutMs` controls outstanding actor requests; `connectTimeoutMs` bounds TCP connect and greeting. If a reply arrives after a timeout, its per-actor FIFO slot remains occupied until the late reply arrives, preventing a reply from being assigned to a newer request. **Closing the client is the correct recovery for permanently lost replies.**

> **Privileged endpoint** — Firefox RDP can control privileged browser state. Its TCP wire format does not provide TLS or authentication by itself. Do not expose port 6000 to your LAN or the Internet. Use loopback and a protected tunnel if remote access is necessary.
