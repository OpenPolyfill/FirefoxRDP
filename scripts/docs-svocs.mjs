// SPDX-License-Identifier: MPL-2.0
// The official SVOCS scaffold is a source template, not an installable docs plugin.
import { existsSync } from 'node:fs'
import { readFile, readdir, writeFile, mkdir, cp, rm, mkdtemp } from 'node:fs/promises'
import { resolve, relative, dirname, posix } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { escapeSvelteMarkdown } from './escape-svelte-markdown.mjs'

const root = resolve(import.meta.dirname, '..')
const site = resolve(process.env.SVOCS_TEST_SITE || resolve(root, 'website'))
const manual = resolve(root, 'docs/content')
const themes = resolve(root, 'docs/themes')
const overlay = resolve(process.env.SVOCS_TEST_OVERLAY || resolve(root, 'docs/svocs'))
const names = ['ayu-light', 'ayu-dark', 'ayu-mirage', 'ayu-evolve']
const cmd = process.argv[2] || 'check'
const minNode = [22, 17]

// These two files are generated directly. The site must not depend on an
// optional docs/svocs/+page.* overlay being present in a zip or working tree.
// The landing page redirects to the SVOCS docs home while keeping a static
// fallback for hosts that do not execute JavaScript.
const homepageSvelte = String.raw`<script lang="ts">
  import { resolve } from '$app/paths';
  import { onMount } from 'svelte';

  const destination = resolve('/docs');

  onMount(() => {
    window.location.replace(destination);
  });
</script>

<svelte:head>
  <title>Firefox RDP — Documentation</title>
  <!-- Meta refresh remains as a static-host fallback when JavaScript is disabled. -->
  <meta http-equiv="refresh" content={'0;url=' + destination} />
  <link rel="canonical" href={destination} />
</svelte:head>

<section class="redirect-page" aria-labelledby="redirect-title">
  <div class="redirect-card">
    <p class="eyebrow">Firefox RDP</p>
    <h1 id="redirect-title">Documentation</h1>
    <p>Opening the documentation…</p>
    <a class="continue" href={destination}>Continue to docs</a>
  </div>
</section>

<style>
  .redirect-page {
    display: grid;
    place-items: center;
    min-height: min(62vh, 34rem);
    padding: 4rem 1.25rem;
  }

  .redirect-card {
    width: min(100%, 34rem);
    padding: clamp(2rem, 6vw, 4rem);
    border: 1px solid var(--line);
    border-radius: 1rem;
    background: var(--bg-soft);
    box-shadow: 0 1.5rem 4rem color-mix(in srgb, var(--shadow) 24%, transparent);
    text-align: center;
  }

  .eyebrow {
    margin: 0 0 0.75rem;
    color: var(--accent-strong);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(2rem, 5vw, 3.25rem);
    letter-spacing: -0.04em;
  }

  .redirect-card > p:not(.eyebrow) {
    margin: 0.85rem 0 1.5rem;
    color: var(--text-soft);
  }

  .continue {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.65rem 1rem;
    border-radius: 0.55rem;
    background: var(--accent);
    color: var(--bg);
    font-weight: 650;
    text-decoration: none;
  }

  .continue:hover {
    background: var(--accent-strong);
  }
</style>`
const homepageLoad = String.raw`// SPDX-License-Identifier: MPL-2.0
// The homepage prerenders a static redirect to the SVOCS docs home.
export const prerender = true;`

function run(file, args, cwd = root, stdio = 'inherit') {
  const result = spawnSync(file, args, { cwd, stdio, env: process.env })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${file} ${args.join(' ')} failed: ${result.status}`)
}
function ensureNode() {
  const [major, minor] = process.versions.node.split('.').map(Number)
  if (major < minNode[0] || (major === minNode[0] && minor < minNode[1])) {
    throw new Error(
      `SVOCS v0.24.1 requires Node >= ${minNode.join('.')}; detected ${process.versions.node}`
    )
  }
}
async function entries(dir) {
  const out = []
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const file = resolve(dir, ent.name)
    if (ent.isDirectory()) out.push(...(await entries(file)))
    else if (ent.isFile() && file.endsWith('.md')) out.push(file)
  }
  return out
}
async function check() {
  const sources = await entries(manual)
  const routes = new Set(
    sources.map((file) => {
      const name = relative(manual, file).replaceAll('\\', '/')
      if (name === 'index.md') return '/docs'
      return '/docs/' + name.replace(/\/index\.md$/, '').replace(/\.md$/, '')
    })
  )
  let snippets = 0,
    links = 0
  for (const file of sources) {
    const name = relative(manual, file).replaceAll('\\', '/')
    const body = await readFile(file, 'utf8')
    if (!/^---\r?\n[\s\S]*?\r?\n---\r?\n/.test(body)) throw Error(`Missing frontmatter in ${name}`)
    for (const match of body.matchAll(/\]\(([^)]+)\)/g)) {
      const href = match[1].split(/[?#]/, 1)[0]
      if (!href.startsWith('/docs/')) continue
      if (!routes.has(href) && href !== '/docs/api/reference')
        throw Error(`Broken docs link ${name}: ${href}`)
      links++
    }
    const example = name.match(/^(?:guide|examples)\/([\w-]+)\.md$/)
    if (example) {
      const source = await readFile(resolve(root, 'docs/snippets', example[1] + '.ts'), 'utf8')
      const code = source
        .trimEnd()
        .replaceAll("from '../../src/index.js'", "from '@openpolyfill/firefox-rdp'")
      if (!body.includes('```ts\n' + code + '\n```')) throw Error(`Snippet mismatch in ${name}`)
      snippets++
    }
  }
  if (!routes.has('/docs/api') || !routes.has('/docs') || sources.length < 15 || snippets < 13)
    throw Error(`Incomplete docs: ${sources.length} pages, ${snippets} snippets`)
  const css = await readFile(resolve(overlay, 'ayu.css'), 'utf8')
  const selector = await readFile(resolve(overlay, 'AyuThemeSelector.svelte'), 'utf8')
  for (const name of names) {
    const theme = JSON.parse(await readFile(resolve(themes, name + '.json'), 'utf8'))
    if (
      !css.includes(`data-ayu='${name}'`) ||
      !css.includes(theme.vars.background) ||
      !css.includes(theme.vars.foreground)
    )
      throw Error(`Missing colors for ${name}`)
    if (!selector.includes(`'${name}'`)) throw Error(`Missing selector option ${name}`)
  }
  console.log(
    `SVOCS docs source OK: ${sources.length} pages, ${snippets} snippets, ${links} links, 4 Ayu themes`
  )
}
async function patchTemplate() {
  // Assert template contracts: failing loudly is safer than shipping a blank or broken site.
  const layoutFile = resolve(site, 'src/routes/+layout.svelte')
  const htmlFile = resolve(site, 'src/app.html')
  const layout = await readFile(layoutFile, 'utf8')
  const html = await readFile(htmlFile, 'utf8')
  const oldImport = "import ThemeToggle from '#lib/themes/docs/ThemeToggle.svelte';"
  if (!layout.includes(oldImport) && !layout.includes('AyuThemeSelector.svelte')) {
    throw Error(
      'SVOCS layout no longer matches v0.24.1; update theme integration before proceeding'
    )
  }
  let changed = layout
    .replace(
      oldImport,
      "import AyuThemeSelector from '#lib/themes/docs/AyuThemeSelector.svelte';\n\timport '../ayu.css';"
    )
    .replace('<ThemeToggle />', '<AyuThemeSelector />')
  if (!changed.includes("import '../ayu.css';")) throw Error('Theme CSS import was not installed')
  await writeFile(layoutFile, changed)
  const newScript = `<script>\n      (function () {\n        var options = ['ayu-light', 'ayu-dark', 'ayu-mirage', 'ayu-evolve'];\n        var selected = 'ayu-dark';\n        try {\n          var saved = localStorage.getItem('openpolyfill-ayu-theme');\n          if (options.includes(saved)) selected = saved;\n          else if (localStorage.getItem('svocs-theme') === 'light' ||\n                   window.matchMedia('(prefers-color-scheme: light)').matches) selected = 'ayu-light';\n        } catch (e) { /* storage may be disabled */ }\n        document.documentElement.dataset.ayu = selected;\n        document.documentElement.dataset.theme = selected === 'ayu-light' ? 'light' : 'dark';\n      })();\n    </script>`
  // Only replace the inline script which initializes svocs-theme; preserve other scripts.
  const htmlNew = html.replace(
    /<script>\s*\(function \(\) \{[\s\S]*?\}\)\(\);\s*<\/script>/,
    newScript
  )
  if (html === htmlNew || !htmlNew.includes('openpolyfill-ayu-theme')) {
    if (!html.includes('openpolyfill-ayu-theme'))
      throw Error('SVOCS theme boot script could not be located')
  } else await writeFile(htmlFile, htmlNew)
  const themeDest = resolve(site, 'src/lib/themes/docs/AyuThemeSelector.svelte')
  await mkdir(dirname(themeDest), { recursive: true })
  await cp(resolve(overlay, 'AyuThemeSelector.svelte'), themeDest)
  await cp(resolve(overlay, 'ayu.css'), resolve(site, 'src/ayu.css'))
  // The homepage renders Getting Started directly, using SVOCS' content loader.
  await writeFile(resolve(site, 'src/routes/+page.svelte'), homepageSvelte + '\n')
  await writeFile(resolve(site, 'src/routes/+page.ts'), homepageLoad + '\n')
  const config = resolve(site, 'src/lib/site.ts')
  const c = await readFile(config, 'utf8')
  await writeFile(
    config,
    c
      .replace(/export const SITE_NAME = .*?;/, "export const SITE_NAME = 'Firefox RDP';")
      .replace(
        /export const SITE_DESCRIPTION = .*?;/,
        "export const SITE_DESCRIPTION = 'Typed Firefox Remote Debugging Protocol SDK';"
      )
  )
}

async function prepare() {
  await check()
  if (!existsSync(resolve(site, 'src/routes/+layout.svelte'))) {
    throw Error('SVOCS website not initialized. Run npm run docs:setup once.')
  }
  await patchTemplate()
  const content = resolve(site, 'content')
  await rm(content, { recursive: true, force: true })
  await cp(manual, content, { recursive: true })
  const meta = {
    items: {
      start: { type: 'separator', title: 'Start here', order: 1 },
      index: { title: 'Introduction', order: 2, icon: 'book' },
      guide: { title: 'Guides', order: 3, icon: 'terminal' },
      examples: { title: 'Examples', order: 4, icon: 'code' },
      api: { title: 'API', order: 5, icon: 'package' }
    }
  }
  await writeFile(resolve(content, '_meta.json'), JSON.stringify(meta, null, 2) + '\n')
  await writeFile(
    resolve(content, 'guide/_meta.json'),
    JSON.stringify(
      {
        items: {
          'getting-started': { order: 1 },
          connection: { order: 2 },
          'tabs-and-targets': { order: 3 },
          'javascript-evaluation': { order: 4 },
          'events-and-resources': { order: 5 },
          'actor-fronts': { order: 6 },
          lifecycle: { order: 7 },
          'error-handling': { order: 8 }
        }
      },
      null,
      2
    ) + '\n'
  )
  const apiDir = resolve(content, 'api/reference')
  const tmp = await mkdtemp(resolve(tmpdir(), 'firefox-rdp-typedoc-'))
  try {
    run(
      'npm',
      [
        'exec',
        '--',
        'typedoc',
        '--plugin',
        'typedoc-plugin-markdown',
        '--entryPoints',
        'src/index.ts',
        '--tsconfig',
        'tsconfig.json',
        '--out',
        tmp
      ],
      root
    )
    const generated = await entries(tmp)
    if (!generated.length) throw Error('TypeDoc generated no Markdown pages')
    await cp(tmp, apiDir, { recursive: true })
    // SVOCS pages use extensionless routes. TypeDoc Markdown emits relative *.md links.
    for (const doc of await entries(apiDir)) {
      const docRel = relative(apiDir, doc).replaceAll('\\', '/')
      let md = await readFile(doc, 'utf8')
      md = md.replace(
        /(\]\()([^)]*?\.md)(#[^)]*)?(\))/g,
        (all, prefix, link, fragment = '', close) => {
          if (/^(https?:|\/\/)/.test(link)) return all
          const normalized = posix.normalize(posix.join(posix.dirname(docRel), link))
          if (normalized.startsWith('../'))
            throw Error(`TypeDoc link escapes API tree: ${docRel}: ${link}`)
          const routed = normalized
            .replace(/(^|\/)README\.md$/i, '$1index.md')
            .replace(/(^|\/)index\.md$/i, '')
            .replace(/\.md$/i, '')
          return `${prefix}/docs/api/reference${routed ? '/' + routed.replace(/^\//, '') : ''}${fragment}${close}`
        }
      )
      // TypeDoc copies the package README and license fixtures into the API tree,
      // but extensionless content assets are not valid prerender routes. Keep
      // attribution links external so generated API pages remain deployable.
      md = md
        .replace(
          /\]\([^)]*LICENSE(?:\.md)?\)/g,
          '](' + 'https://github.com/OpenPolyfill/firefox-rdp/blob/main/LICENSE' + ')'
        )
        .replace(
          /\]\([^)]*NOTICE(?:\.md)?\)/g,
          '](' + 'https://github.com/OpenPolyfill/firefox-rdp/blob/main/NOTICE.md' + ')'
        )
      await writeFile(doc, escapeSvelteMarkdown(md))
    }
    // Convert TypeDoc README to an SVOCS section entry page.
    const readme = resolve(apiDir, 'README.md')
    if (existsSync(readme)) {
      await cp(readme, resolve(apiDir, 'index.md'))
      await rm(readme)
    } else {
      await writeFile(
        resolve(apiDir, 'index.md'),
        '---\ntitle: Generated API\n---\n\n# Generated API\n\n' +
          generated.map((file) => `- ${relative(tmp, file)}\n`).join('')
      )
    }
  } finally {
    await rm(tmp, { recursive: true, force: true })
  }
  console.log('Prepared SVOCS content and TypeDoc API reference.')
}
async function setup() {
  ensureNode()
  if (!existsSync(resolve(site, 'src/routes/+layout.svelte'))) {
    if (existsSync(site)) {
      const all = await readdir(site)
      if (all.length) throw Error('website/ exists but is not a SVOCS scaffold')
    }
    // Force stdin to a pipe so the official CLI takes its deterministic non-interactive path.
    const result = spawnSync(
      'npm',
      [
        'exec',
        '--yes',
        '--package=create-svocs-docs@0.24.1',
        '--',
        'create-svocs-docs',
        'website',
        '--site-name=Firefox RDP',
        '--search=pagefind',
        '--accent=#e6b450'
      ],
      { cwd: root, stdio: ['pipe', 'inherit', 'inherit'], env: process.env }
    )
    if (result.error || result.status !== 0)
      throw Error(`SVOCS scaffold failed (${result.status}): ${result.error || ''}`)
    if (!existsSync(resolve(site, 'package.json')))
      throw Error('SVOCS scaffolder did not create website/package.json')
    // Non-interactive scaffolder initializes a nested git repo by default. Remove only the one we just generated.
    await rm(resolve(site, '.git'), { recursive: true, force: true })
  }
  run('npm', ['install'], site)
  await prepare()
}
async function main() {
  if (cmd === 'check') return check()
  if (cmd === 'setup') return setup()
  if (cmd === 'patch') return patchTemplate()
  if (cmd === 'prepare') return prepare()
  ensureNode()
  if (cmd === 'dev' || cmd === 'build') await prepare()
  if (cmd === 'dev' || cmd === 'build' || cmd === 'preview') {
    run('npm', ['run', cmd === 'dev' ? 'dev' : cmd], site)
    if (cmd === 'build') {
      const build = resolve(site, 'build')
      const htmlFiles = await entriesHtml(build, build)
      if (
        htmlFiles.length < 17 ||
        !htmlFiles.some((p) => /^docs(?:\/index)?\.html$|^docs\/index\.html$/.test(p)) ||
        !htmlFiles.some((p) => p.includes('api') && p.includes('reference'))
      )
        throw Error(`Incomplete SVOCS build: ${htmlFiles.length} HTML pages`)
      console.log(
        `SVOCS built ${htmlFiles.length} HTML pages including manual docs and generated API`
      )
    }
    return
  }
  throw Error(`Unknown docs command: ${cmd}`)
}
async function entriesHtml(dir, buildRoot) {
  const files = []
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const f = resolve(dir, ent.name)
    if (ent.isDirectory()) files.push(...(await entriesHtml(f, buildRoot)))
    else if (f.endsWith('.html')) files.push(relative(buildRoot, f))
  }
  return files
}
main().catch((e) => {
  console.error(e.stack || e)
  process.exitCode = 1
})
