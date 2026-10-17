---
title: 'Errors and compatibility'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

RDP is an internal Firefox debugging protocol and can change without semver guarantees. Generate schemas from a **specific Firefox commit**, not a moving `main` branch, and test with the target Firefox build.

```ts
import { FirefoxRDP, RDPRemoteError } from '@openpolyfill/firefox-rdp'
const rdp = await FirefoxRDP.connect({ requestTimeoutMs: 15_000 })
rdp.on('unhandledPacket', (packet) => console.warn('Unexpected RDP packet', packet))
try {
  await rdp.root.listTabs()
} catch (error) {
  if (error instanceof RDPRemoteError) console.error(error.actorId, error.code)
  else throw error
} finally {
  rdp.close()
}
```

`RDPRemoteError` exposes the remote actor ID and Firefox error code. Other errors include socket disconnects, timeouts and marshalling issues. `rdp.on('protocolError', ...)` and `rdp.on('unhandledPacket', ...)` can be useful for diagnosis. They do not automatically reconnect the client.

## Known limitations

- Source sync/generation captures declarative actor specs, including several inheritance and factory forms; it cannot automatically recreate arbitrary Mozilla Front subclass logic or all custom serializers.
- A schema successfully generated from a revision does not by itself prove that every feature works on that Firefox build.
- Bulk receive is supported at transport level; some high-level bulk streaming conveniences remain absent.
- Browser-side usage requires a separate transport/proxy; Node TCP is the implemented transport.
