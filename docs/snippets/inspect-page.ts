import { FirefoxRDP } from '../../src/index.js'
const rdp = await FirefoxRDP.connect()
try {
  const tab = (await rdp.root.listTabs()).find((x) => x.selected)
  if (!tab) throw new Error('No selected tab')
  const target = await tab.getTarget()
  const reply = await target
    .console()
    .evaluateJS('({ title: document.title, href: location.href })')
  console.log(reply.result)
} finally {
  rdp.close()
}
