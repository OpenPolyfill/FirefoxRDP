// SPDX-License-Identifier: MPL-2.0
import { FirefoxRDP } from '../dist/index.js'

const host = process.env.RDP_HOST ?? '127.0.0.1'
const port = Number(process.env.RDP_PORT ?? 6000)
const frontendVersion = process.env.RDP_FRONTEND_VERSION
const client = await FirefoxRDP.connect({ host, port, frontendVersion, requestTimeoutMs: 15_000 })
try {
  console.log('Connected:', (await client.greeting).applicationType)
  const tabs = await client.root.listTabs()
  for (const tab of tabs)
    console.log(
      `${tab.selected ? '*' : ' '} ${tab.title || '(untitled)'} ${tab.url || ''} [${tab.actorId}]`
    )
  const tab = tabs.find((t) => t.selected) ?? tabs[0]
  if (!tab) throw new Error('No tabs. Open a normal tab in the debugged browser.')
  const target = await tab.getTarget()
  const consoleFront = target.console()
  const expression = process.env.RDP_EVAL ?? 'document.title'
  const result = await consoleFront.evaluateJS(expression)
  console.log(`Evaluation ${expression}:`, JSON.stringify(result.result))
  if (result.exception || result.hasException)
    console.error('Remote exception:', result.exceptionMessage ?? result.exception)
} finally {
  client.close()
}
