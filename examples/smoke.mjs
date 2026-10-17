// SPDX-License-Identifier: MPL-2.0
import { FirefoxRDP, bundledSpecs } from '../dist/index.js'
const host = process.env.RDP_HOST ?? '127.0.0.1'
const port = Number(process.env.RDP_PORT ?? 6000)
const client = await FirefoxRDP.connect({
  host,
  port,
  requestTimeoutMs: 15_000,
  frontendVersion: process.env.RDP_FRONTEND_VERSION
})
const report = (step, detail = '') => console.log(`PASS ${step}${detail ? `: ${detail}` : ''}`)
try {
  report('connect', String((await client.greeting).applicationType))
  report('schemas', `${Object.keys(bundledSpecs).length} bundled actor types`)
  const tabs = await client.root.listTabs()
  report('listTabs', `${tabs.length} tabs`)
  const tab = tabs.find((t) => t.selected) ?? tabs[0]
  if (!tab) throw new Error('Open an ordinary browser tab before running the smoke test')
  const target = await tab.getTarget()
  report('getTarget', target.actorId)
  const result = await target.console().evaluateJS('6 * 7')
  if (
    result.hasException ||
    !result.result ||
    result.result.type !== 'number' ||
    result.result.value !== 42
  ) {
    // Firefox can return plain primitive 42 or a grip { type: 'number', value: 42 }.
    if (result.hasException || result.result !== 42)
      throw new Error(`Unexpected JS evaluation result: ${JSON.stringify(result)}`)
  }
  report('evaluateJS', '6 * 7 = 42')
  const watcher = await tab.getWatcher()
  await watcher.watchResources(['console-message'])
  await watcher.unwatchResources(['console-message'])
  report('watchResources/unwatchResources', watcher.actorId)
} finally {
  client.close()
}
