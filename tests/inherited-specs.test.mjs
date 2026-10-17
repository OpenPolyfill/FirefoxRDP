// SPDX-License-Identifier: MPL-2.0
import assert from 'node:assert/strict'
import test from 'node:test'
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const baseSource = `
const { generateActorSpec, Arg, Option, RetVal } = require('resource://devtools/shared/protocol.js');
const windowGlobalTargetSpecPrototype = {
  typeName: 'windowGlobalTarget',
  methods: {
    focus: { request: {}, response: {} },
    navigateTo: { request: { url: Option(0, 'string') }, response: {} },
    listFrames: { request: {}, response: RetVal('windowGlobalTarget.listframes') },
  },
  events: {
    tabNavigated: { type: 'tabNavigated', url: Option(0, 'string') },
    contentScrolled: { type: 'contentScrolled', deltaY: Arg(0, 'number') },
  },
};
const windowGlobalTargetSpec = generateActorSpec(windowGlobalTargetSpecPrototype);
exports.windowGlobalTargetSpecPrototype = windowGlobalTargetSpecPrototype;
exports.windowGlobalTargetSpec = windowGlobalTargetSpec;
`
const childSource = `
const { generateActorSpec } = require('resource://devtools/shared/protocol.js');
const { extend } = require('resource://devtools/shared/extend.js');
const { windowGlobalTargetSpecPrototype } = require('resource://devtools/shared/specs/targets/window-global.js');
const parentProcessTargetSpecPrototype = extend(windowGlobalTargetSpecPrototype, { typeName: 'parentProcessTarget' });
const parentProcessTargetSpec = generateActorSpec(parentProcessTargetSpecPrototype);
exports.parentProcessTargetSpecPrototype = parentProcessTargetSpecPrototype;
exports.parentProcessTargetSpec = parentProcessTargetSpec;
`

test('CLI resolves imported prototypes and emits inherited typed APIs', async () => {
  const folder = await mkdtemp(path.join(tmpdir(), 'rdp-inheritance-'))
  try {
    await mkdir(path.join(folder, 'targets'))
    await writeFile(path.join(folder, 'targets/window-global.js'), baseSource)
    await writeFile(path.join(folder, 'targets/parent-process.js'), childSource)
    const output = path.join(folder, 'generated.ts')
    const job = spawnSync(process.execPath, ['scripts/generate-specs.mjs', folder, output], {
      encoding: 'utf8'
    })
    assert.equal(job.status, 0, `${job.stderr}\n${job.stdout}`)
    assert.match(job.stdout, /Generated 2 actor specs, 6 methods, 4 events/)
    const source = await readFile(output, 'utf8')
    assert.match(source, /"parentProcessTarget": \{/)
    assert.match(source, /"navigateTo": \(a0\?: \{ "url"\?: string \}\) => Promise<void>/)
    assert.match(source, /"contentScrolled": \(a0: number\) => void/)
  } finally {
    await rm(folder, { recursive: true, force: true })
  }
})
