import { FirefoxRDP } from '../../src/index.js'
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
