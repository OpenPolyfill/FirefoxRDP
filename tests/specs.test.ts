// SPDX-License-Identifier: MPL-2.0
import assert from 'node:assert/strict'
import test from 'node:test'
import { bundledSpecs } from '../src/generated/specs.js'
import { marshalMethod, unmarshalReturn } from '../src/specs.js'

test('Firefox Option(0) hoists several optional fields and omits undefined', () => {
  const method = bundledSpecs.console!.methods.evaluateJSAsync!
  assert.deepEqual(marshalMethod(method, [{ text: '2+2', eager: false, disableBreaks: true }]), {
    text: '2+2',
    eager: false,
    disableBreaks: true
  })
})
test('Arg(0), Arg(1) map positional arguments; RetVal unwraps direct and wrapped replies', () => {
  assert.deepEqual(
    marshalMethod(bundledSpecs.tabDescriptor!.methods.navigateTo!, ['about:blank', true]),
    { url: 'about:blank', waitForLoad: true }
  )
  assert.deepEqual(
    unmarshalReturn(
      { from: 'root', applicationType: 'browser', traits: {} },
      bundledSpecs.root!.methods.getRoot!
    ),
    { applicationType: 'browser', traits: {} }
  )
  assert.deepEqual(
    unmarshalReturn({ from: 'root', tabs: [{ actor: 'a' }] }, bundledSpecs.root!.methods.listTabs!),
    [{ actor: 'a' }]
  )
})
