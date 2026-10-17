---
title: 'Firefox RDP'
description: 'Firefox Remote Debugging Protocol TypeScript SDK documentation'
---

**A TypeScript client for Firefox's Remote Debugging Protocol (RDP).**

Interact with browser actors using function calls, rather than constructing `{to, type}` packets yourself.

## Start here

- [Getting started](/docs/guide/getting-started) — install locally, enable debugging, and evaluate your first expression.
- [Connection and security](/docs/guide/connection) — handshake, timeouts and safe transport.
- [Tabs and targets](/docs/guide/tabs-and-targets) — navigate the actor hierarchy.
- [Actor fronts](/docs/guide/actor-fronts) — use generated methods and event listeners.
- [API reference](/docs/api) — browse generated TypeScript actor types and runtime entry points.

## Practical examples

- [Inspect a page](/docs/examples/inspect-page)
- [Watch console messages](/docs/examples/monitor-console)
- [Watch network activity](/docs/examples/monitor-network)
- [Inspect DOM](/docs/examples/inspect-dom)
- [Inspect script sources](/docs/examples/debug-script)

## About compatibility

RDP is **not a stable public Firefox API**. The SDK targets Node.js TCP debugging, and method availability follows the Firefox actor specs used to generate the bundled bindings. A generated signature documents a wire operation; it does not guarantee that every feature is end-to-end verified on every Firefox build.

Manual pages live in `docs/content/`. Their TypeScript examples are checked against `docs/snippets/` by `npm run docs:check`.
