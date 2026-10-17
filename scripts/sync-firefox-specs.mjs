#!/usr/bin/env node
// SPDX-License-Identifier: MPL-2.0
/** Download only Firefox RDP actor specs, then regenerate TypeScript bindings.
 * Usage: node scripts/sync-firefox-specs.mjs [--ref main] [--output src/generated/specs.ts]
 * Set GITHUB_TOKEN for larger rate limits. No privileged Firefox JS is executed.
 */
import { mkdir, rename, rm, writeFile, mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const repo = 'mozilla-firefox/firefox'
const directory = 'devtools/shared/specs'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function argsOf(argv) {
  const result = {
    ref: 'main',
    output: 'src/generated/specs.ts',
    api: 'https://api.github.com',
    raw: 'https://raw.githubusercontent.com'
  }
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i]
    if (!['--ref', '--output', '--api', '--raw'].includes(key) || !argv[i + 1])
      throw new Error(`Invalid argument ${key}`)
    result[key.slice(2)] = argv[++i]
  }
  if (!/^[\w./-]+$/.test(result.ref) || result.ref.includes('..')) throw new Error('Invalid ref')
  return result
}

async function fetchChecked(url, api = false) {
  const headers = {
    'User-Agent': 'openpolyfill-firefox-rdp',
    Accept: 'application/vnd.github+json'
  }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  for (let n = 0; n < 4; n++) {
    let response
    try {
      response = await fetch(url, { headers, signal: AbortSignal.timeout(30_000) })
    } catch (error) {
      if (n === 3) throw error
      await new Promise((r) => setTimeout(r, 500 * 2 ** n))
      continue
    }
    if (response.ok) return response
    if ([429, 502, 503, 504].includes(response.status) && n < 3) {
      await new Promise((r) => setTimeout(r, 750 * 2 ** n))
      continue
    }
    const hint = response.status === 403 && api ? ' (GitHub API rate limit? Set GITHUB_TOKEN.)' : ''
    throw new Error(
      `HTTP ${response.status} fetching ${url}${hint}: ${(await response.text()).slice(0, 200)}`
    )
  }
  throw new Error(`Failed downloading ${url}`)
}

async function listSpecs(apiRoot, ref) {
  const files = []
  async function walk(folder) {
    const url = `${apiRoot}/repos/${repo}/contents/${folder}?ref=${encodeURIComponent(ref)}`
    const nodes = await (await fetchChecked(url, true)).json()
    if (!Array.isArray(nodes)) throw new Error(`Not a directory: ${folder}`)
    for (const node of nodes) {
      if (node.type === 'dir') await walk(node.path)
      else if (node.type === 'file' && node.path.endsWith('.js')) files.push(node.path)
    }
  }
  await walk(directory)
  files.sort()
  if (files.length < 10) throw new Error(`Only ${files.length} Firefox specs found`)
  return files
}

export async function sync(options) {
  const staging = await mkdtemp(path.join(tmpdir(), 'firefox-rdp-specs-'))
  try {
    const commitURL = `${options.api}/repos/${repo}/commits/${encodeURIComponent(options.ref)}`
    const commit = await (await fetchChecked(commitURL, true)).json()
    const revision = commit.sha
    if (typeof revision !== 'string' || !/^[0-9a-f]{40}$/.test(revision)) {
      throw new Error(`Cannot resolve a Git commit for ${options.ref}`)
    }
    const paths = await listSpecs(options.api, revision)
    let index = 0
    const failures = []
    await Promise.all(
      Array.from({ length: Math.min(8, paths.length) }, async () => {
        while (index < paths.length) {
          const sourcePath = paths[index++]
          try {
            const refPath = revision
            const url = `${options.raw}/${repo}/${refPath}/${sourcePath}`
            const source = await (await fetchChecked(url)).text()
            const filename = path.join(staging, path.relative(directory, sourcePath))
            await mkdir(path.dirname(filename), { recursive: true })
            await writeFile(filename, source)
          } catch (error) {
            failures.push(`${sourcePath}: ${error.message}`)
          }
        }
      })
    )
    if (failures.length)
      throw new Error(`Failed to download ${failures.length} specs:\n${failures.join('\n')}`)
    const output = path.resolve(root, options.output)
    const generator = path.join(root, 'scripts', 'generate-specs.mjs')
    // Run as a child so the only persistent output is a complete generated file.
    const temporaryOutput = `${output}.tmp`
    const job = spawnSync(process.execPath, [generator, staging, temporaryOutput], {
      encoding: 'utf8'
    })
    if (job.status !== 0) throw new Error(`Generation failed:\n${job.stderr}\n${job.stdout}`)
    await mkdir(path.dirname(output), { recursive: true })
    await rename(temporaryOutput, output)
    await writeFile(
      path.join(path.dirname(output), 'firefox-source.json'),
      JSON.stringify(
        { repo, ref: options.ref, revision, directory, files: paths.length },
        null,
        2
      ) + '\n'
    )
    return `${job.stdout.trim()} (ref=${options.ref}, commit=${revision})`
  } finally {
    await rm(staging, { recursive: true, force: true })
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    console.log(await sync(argsOf(process.argv.slice(2))))
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
}
