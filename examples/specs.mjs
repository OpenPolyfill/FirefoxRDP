// SPDX-License-Identifier: MPL-2.0
import { bundledSpecs, bundledDictTypes } from '../dist/index.js'
const specs = Object.values(bundledSpecs)
const count = (field) => specs.reduce((sum, spec) => sum + Object.keys(spec[field] ?? {}).length, 0)
console.log(
  `${specs.length} actors, ${count('methods')} methods, ${count('events')} events, ${Object.keys(bundledDictTypes).length} dictionary types`
)
for (const spec of specs.sort((a, b) => a.typeName.localeCompare(b.typeName))) {
  console.log(
    `${spec.typeName.padEnd(28)} ${Object.keys(spec.methods).length.toString().padStart(3)} methods`
  )
}
