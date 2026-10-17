import { FirefoxRDP } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs())[0]
  if (!tab) throw new Error('No tabs')
  const target = await tab.getTarget()
  const result = await target.console().evaluateJS('({ title: document.title })')
  if (result.hasException) console.error(result.exceptionMessage)
  else console.log(result.result) // RDP primitive or object grip
} finally {
  rdp.close()
}
