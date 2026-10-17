import { FirefoxRDP } from '../../src/index.js'
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
