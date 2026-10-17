#!/usr/bin/env node
// SPDX-License-Identifier: MPL-2.0
// Parse declarative Firefox DevTools actor specs without executing browser-privileged code.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const key = (n) =>
  ts.isIdentifier(n) || ts.isStringLiteral(n) || ts.isNumericLiteral(n) ? n.text : undefined
function entries(node) {
  if (!node || !ts.isObjectLiteralExpression(node)) return []
  return node.properties
    .filter(ts.isPropertyAssignment)
    .map((p) => [key(p.name), p.initializer])
    .filter(([k]) => k !== undefined)
}
function literal(node) {
  if (node && (ts.isStringLiteral(node) || ts.isNumericLiteral(node))) return node.text
  return undefined
}
function isGenerateCall(node) {
  return (
    ts.isCallExpression(node) &&
    ((ts.isIdentifier(node.expression) && node.expression.text === 'generateActorSpec') ||
      (ts.isPropertyAccessExpression(node.expression) &&
        node.expression.name.text === 'generateActorSpec'))
  )
}

export function extract(source, filename = 'spec.js', options = {}) {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  const declarations = new Map()
  const calls = []
  const factoryCalls = []
  const imported = new Map()
  function scan(node) {
    // Resolve named spec imports without executing Firefox source files.
    if (
      ts.isVariableDeclaration(node) &&
      ts.isObjectBindingPattern(node.name) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      ts.isIdentifier(node.initializer.expression) &&
      node.initializer.expression.text === 'require'
    ) {
      const modulePath = literal(node.initializer.arguments[0])
      if (modulePath)
        for (const element of node.name.elements) {
          if (!ts.isIdentifier(element.name)) continue
          const exportName = element.propertyName ? key(element.propertyName) : element.name.text
          if (exportName) imported.set(element.name.text, { modulePath, exportName })
        }
    }
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer)
      declarations.set(node.name.text, node.initializer)
    if (isGenerateCall(node)) calls.push(node)
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'createStorageSpec'
    )
      factoryCalls.push(node)
    ts.forEachChild(node, scan)
  }
  scan(file)
  // Resolve only declarative AST nodes; never evaluate arbitrary source JS.
  function resolve(node, scope = {}, depth = 0) {
    if (!node || depth > 20) return node
    if (ts.isParenthesizedExpression(node)) return resolve(node.expression, scope, depth + 1)
    if (ts.isIdentifier(node) && declarations.has(node.text))
      return resolve(declarations.get(node.text), scope, depth + 1)
    if (ts.isPropertyAccessExpression(node)) {
      const base =
        ts.isIdentifier(node.expression) && node.expression.text === 'options'
          ? scope
          : Object.fromEntries(resolvedEntries(node.expression, scope, depth + 1))
      return resolve(base[node.name.text], scope, depth + 1)
    }
    return node
  }
  function resolvedEntries(node, scope = {}, depth = 0) {
    if (depth > 20) return []
    node = resolve(node, scope, depth + 1)
    if (
      node &&
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.expression.getText(file) === 'Object' &&
      node.expression.name.text === 'assign'
    ) {
      const fields = new Map()
      for (const argument of node.arguments)
        for (const [name, expr] of resolvedEntries(argument, scope, depth + 1))
          fields.set(name, expr)
      return [...fields]
    }
    if (!node || !ts.isObjectLiteralExpression(node)) return []
    const fields = new Map()
    for (const property of node.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = key(property.name)
        if (name !== undefined) fields.set(name, property.initializer)
      } else if (ts.isSpreadAssignment(property)) {
        for (const [name, expr] of resolvedEntries(property.expression, scope, depth + 1))
          fields.set(name, expr)
      }
    }
    return [...fields]
  }
  const find = (node, name, scope) =>
    resolvedEntries(node, scope).find(([key]) => key === name)?.[1]
  const readLiteral = (node, scope) => literal(resolve(node, scope))
  function readPlaceholder(node, scope) {
    node = resolve(node, scope)
    if (!node || !ts.isCallExpression(node) || !ts.isIdentifier(node.expression)) return undefined
    const fn = node.expression.text
    if (!['Arg', 'Option', 'RetVal'].includes(fn)) return undefined
    const index = fn === 'RetVal' ? null : Number(readLiteral(node.arguments[0], scope))
    const type =
      readLiteral(node.arguments[fn === 'RetVal' ? 0 : 1], scope) ??
      (fn === 'RetVal' ? undefined : 'json')
    if (!type || (fn !== 'RetVal' && !Number.isSafeInteger(index))) return undefined
    return { kind: fn.toLowerCase(), ...(index !== null && { index }), type }
  }
  const result = []
  function parse(typeName, methods, events, scope = {}) {
    const mappedMethods = {}
    for (const [name, node] of methods) {
      const args = {}
      for (const [field, expr] of resolvedEntries(find(node, 'request', scope), scope)) {
        const value = readPlaceholder(expr, scope)
        if (value && value.kind !== 'retval') args[field] = value
        else if (field !== 'type')
          throw new Error(`Unsupported request field ${typeName}.${name}.${field}`)
      }
      const response = find(node, 'response', scope)
      const direct = readPlaceholder(response, scope)
      const wrapped = resolvedEntries(response, scope)
        .map(([field, expr]) => ({ field, value: readPlaceholder(expr, scope) }))
        .find((x) => x.value?.kind === 'retval')
      const oneway = resolve(find(node, 'oneway', scope), scope)?.kind === ts.SyntaxKind.TrueKeyword
      const release =
        resolve(find(node, 'release', scope), scope)?.kind === ts.SyntaxKind.TrueKeyword
      mappedMethods[name] = {
        ...(readLiteral(find(node, 'name', scope), scope) && {
          wireName: readLiteral(find(node, 'name', scope), scope)
        }),
        args,
        ...(direct && { returns: { type: direct.type, field: null } }),
        ...(wrapped && { returns: { type: wrapped.value.type, field: wrapped.field } }),
        ...(oneway && { oneway: true }),
        ...(release && { release: true })
      }
    }
    const mappedEvents = {}
    const eventArgs = {}
    for (const [name, node] of events) {
      mappedEvents[name] = readLiteral(find(node, 'type', scope), scope) || name
      const args = {}
      for (const [field, expr] of resolvedEntries(node, scope)) {
        if (field === 'type') continue
        const value = readPlaceholder(expr, scope)
        if (value && value.kind !== 'retval') args[field] = value
        else throw new Error(`Unsupported event field ${typeName}.${name}.${field}`)
      }
      eventArgs[name] = args
    }
    return { typeName, methods: mappedMethods, events: mappedEvents, eventArgs, source: filename }
  }
  let dynamicStorageActor
  for (const call of calls) {
    const argument = call.arguments[0]
    const desc = resolve(argument)
    if (
      desc &&
      ts.isCallExpression(desc) &&
      ts.isIdentifier(desc.expression) &&
      desc.expression.text === 'extend'
    ) {
      // Mozilla's extend(proto, properties) uses Object.create(): unspecified
      // members (including methods and events) are inherited from the prototype.
      const base = resolve(desc.arguments[0])
      const overlay = resolve(desc.arguments[1])
      if (!base || !ts.isIdentifier(base) || !overlay || !ts.isObjectLiteralExpression(overlay)) {
        throw new Error(
          `Unsupported inherited actor spec at ${file.getLineAndCharacterOfPosition(call.pos).line + 1}`
        )
      }
      const dependency = imported.get(base.text)
      if (!dependency || typeof options.resolveImport !== 'function') {
        throw new Error(`Cannot resolve inherited actor prototype ${base.text} in ${filename}`)
      }
      const inherited = options.resolveImport(dependency.modulePath, dependency.exportName)
      if (!inherited)
        throw new Error(
          `Missing imported actor prototype ${dependency.exportName} in ${dependency.modulePath}`
        )
      const properties = resolvedEntries(overlay)
      const accepted = new Set(['typeName', 'methods', 'events'])
      for (const [name] of properties)
        if (!accepted.has(name))
          throw new Error(`Unsupported inherited spec property ${name} in ${filename}`)
      const typeName = readLiteral(find(overlay, 'typeName')) || inherited.typeName
      const hasMethods = properties.some(([name]) => name === 'methods')
      const hasEvents = properties.some(([name]) => name === 'events')
      const extra = parse(
        typeName,
        hasMethods ? resolvedEntries(find(overlay, 'methods')) : [],
        hasEvents ? resolvedEntries(find(overlay, 'events')) : []
      )
      result.push({
        ...extra,
        methods: hasMethods ? extra.methods : { ...inherited.methods },
        events: hasEvents ? extra.events : { ...inherited.events },
        eventArgs: hasEvents ? extra.eventArgs : { ...inherited.eventArgs },
        prototypeName: ts.isIdentifier(argument) ? argument.text : undefined
      })
      continue
    }
    if (!desc || !ts.isObjectLiteralExpression(desc))
      throw new Error(
        `Unsupported generateActorSpec argument at ${file.getLineAndCharacterOfPosition(call.pos).line + 1}`
      )
    const type = find(desc, 'typeName')
    const typeName = readLiteral(type)
    if (!typeName) {
      // Firefox storage.js defines a createStorageSpec(options) factory that invokes protocol.generateActorSpec.
      if (
        ts.isPropertyAccessExpression(type) &&
        type.expression.getText(file) === 'options' &&
        type.name.text === 'typeName'
      ) {
        dynamicStorageActor = desc
        continue
      }
      throw new Error(
        `Missing literal typeName at ${file.getLineAndCharacterOfPosition(call.pos).line + 1}`
      )
    }
    result.push({
      ...parse(
        typeName,
        resolvedEntries(find(desc, 'methods')),
        resolvedEntries(find(desc, 'events'))
      ),
      prototypeName: ts.isIdentifier(argument) ? argument.text : undefined
    })
  }
  if (factoryCalls.length) {
    if (!dynamicStorageActor)
      throw new Error('Storage spec factory found without a declarative generateActorSpec template')
    const commonMethods = declarations.get('methods')
    if (!commonMethods) throw new Error('Storage spec factory is missing common methods')
    for (const call of factoryCalls) {
      const options = call.arguments[0]
      const scope = Object.fromEntries(resolvedEntries(options))
      const typeName = readLiteral(scope.typeName, scope)
      if (!typeName) throw new Error('Storage spec factory call has no literal type name')
      const methods = new Map(resolvedEntries(commonMethods, scope))
      for (const [name, node] of resolvedEntries(scope.methods, scope)) methods.set(name, node)
      result.push(
        parse(
          typeName,
          [...methods],
          resolvedEntries(find(dynamicStorageActor, 'events'), scope),
          scope
        )
      )
    }
  }
  return result
}
/** Collect Firefox `types.addDictType()` field specializations for recursive actor grips. */
export function extractDictTypes(source, filename = 'spec.js') {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS)
  const dictionaries = {}
  function scan(node) {
    if (
      node &&
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'addDictType'
    ) {
      const name = literal(node.arguments[0])
      const shape = node.arguments[1]
      if (name && shape && ts.isObjectLiteralExpression(shape)) {
        dictionaries[name] = Object.fromEntries(
          entries(shape)
            .map(([field, value]) => [field, literal(value)])
            .filter(([, ty]) => ty !== undefined)
        )
      }
    }
    ts.forEachChild(node, scan)
  }
  scan(file)
  return dictionaries
}
function walk(p) {
  return fs.statSync(p).isDirectory()
    ? fs
        .readdirSync(p)
        .sort()
        .flatMap((n) => walk(path.join(p, n)))
    : p.endsWith('.js')
      ? [p]
      : []
}
let generatedActors = new Set()
let generatedDictionaries = new Set()
/** Map known Firefox actor references to typed fronts, dictionaries to recursive interfaces. */
function typeOf(type, input = false) {
  if (type.startsWith('nullable:')) return `${typeOf(type.slice(9), input)} | null`
  if (type.startsWith('array:')) return `Array<${typeOf(type.slice(6), input)}>`
  if (type.endsWith('#actorid')) return 'string'
  const primitive = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    json: 'unknown',
    longstring: 'string | LongStringFront',
    arraybuffer: 'Uint8Array'
  }[type]
  if (primitive) return primitive
  if (generatedActors.has(type))
    return input ? 'ActorFront' : `GeneratedFront<${JSON.stringify(type)}>`
  if (generatedDictionaries.has(type)) return `GeneratedDictionaries[${JSON.stringify(type)}]`
  return 'unknown'
}
function signature(args) {
  const fields = Object.entries(args)
  const max = Math.max(-1, ...fields.map(([, p]) => p.index))
  const required = (index) => fields.some(([, p]) => p.index === index && p.kind === 'arg')
  const signatures = []
  for (let i = 0; i <= max; i++) {
    const group = fields.filter(([, p]) => p.index === i)
    const simple = group.find(([, p]) => p.kind === 'arg')
    const optional =
      !required(i) && !Array.from({ length: max - i }, (_, j) => i + 1 + j).some(required)
    if (simple && group.length === 1)
      signatures.push(`a${i}${optional ? '?' : ''}: ${typeOf(simple[1].type, true)}`)
    else if (group.length && group.every(([, p]) => p.kind === 'option'))
      signatures.push(
        `a${i}${optional ? '?' : ''}: { ${group.map(([name, p]) => `${JSON.stringify(name)}?: ${typeOf(p.type, true)}`).join('; ')} }${optional ? '' : ' | undefined'}`
      )
    else signatures.push(`a${i}${optional ? '?' : ''}: unknown`)
  }
  return signatures.join(', ')
}
function exportSpecs(input, output) {
  const sourceRoot = path.resolve(input)
  const files = walk(sourceRoot)
  const specs = {}
  const dictTypes = {}
  const skipped = []
  const cache = new Map()
  const active = new Set()
  function readSpecs(filename) {
    filename = path.resolve(filename)
    if (cache.has(filename)) return cache.get(filename)
    if (active.has(filename)) throw new Error(`Circular actor spec import: ${filename}`)
    if (!filename.startsWith(sourceRoot + path.sep))
      throw new Error(`Actor spec escapes source directory: ${filename}`)
    active.add(filename)
    try {
      const source = fs.readFileSync(filename, 'utf8')
      const specs = extract(source, path.relative(sourceRoot, filename), {
        resolveImport(modulePath, exportName) {
          const prefix = 'resource://devtools/shared/specs/'
          if (!modulePath.startsWith(prefix))
            throw new Error(`Unsupported actor spec import: ${modulePath}`)
          const importedFile = path.resolve(sourceRoot, modulePath.slice(prefix.length))
          if (!importedFile.startsWith(sourceRoot + path.sep))
            throw new Error(`Actor spec import escapes source directory: ${modulePath}`)
          const importedSource = fs.readFileSync(importedFile, 'utf8')
          // Only symbols actually exported by the imported module may be inherited.
          const exported = new RegExp(`\\bexports\\.${exportName}\\s*=`).test(importedSource)
          if (!exported) throw new Error(`Not an exported prototype: ${modulePath}#${exportName}`)
          const candidate = readSpecs(importedFile).find(
            (spec) => spec.prototypeName === exportName
          )
          if (!candidate)
            throw new Error(`Cannot locate generated actor for ${modulePath}#${exportName}`)
          return candidate
        }
      })
      cache.set(filename, specs)
      return specs
    } finally {
      active.delete(filename)
    }
  }
  for (const filename of files) {
    try {
      const source = fs.readFileSync(filename, 'utf8')
      Object.assign(dictTypes, extractDictTypes(source, filename))
      for (const spec of readSpecs(filename)) {
        if (specs[spec.typeName]) throw new Error(`Duplicate actor type ${spec.typeName}`)
        const { prototypeName: _prototypeName, ...publicSpec } = spec
        specs[spec.typeName] = publicSpec
      }
    } catch (error) {
      skipped.push(`${filename}: ${error.message}`)
    }
  }
  const values = Object.values(specs)
  if (!values.length || skipped.length) {
    skipped.forEach((e) => console.error(e))
    console.error(
      `${values.length} actor types parsed; ${skipped.length} files unsupported. Generation aborted to avoid silently incomplete coverage.`
    )
    process.exitCode = 1
    return
  }
  generatedActors = new Set(values.map((v) => v.typeName))
  generatedDictionaries = new Set(Object.keys(dictTypes))
  const lines = [
    '// SPDX-License-Identifier: MPL-2.0',
    '// Generated from Firefox actor specs (Mozilla MPL-2.0). Do not edit.',
    'import type { ActorSpec } from "../specs.js";',
    'import type { ActorFront, LongStringFront } from "../client.js";',
    `export const bundledSpecs: Record<string, ActorSpec> = ${JSON.stringify(specs, null, 2)};`,
    `export const bundledDictTypes: Record<string, Record<string, string>> = ${JSON.stringify(dictTypes, null, 2)};`,
    'export interface GeneratedActorAPI {'
  ]
  for (const spec of values) {
    lines.push(`  /** Firefox actor \`${spec.typeName}\`; source: ${spec.source || 'unknown'} */`)
    lines.push(`  ${JSON.stringify(spec.typeName)}: {`)
    for (const [name, method] of Object.entries(spec.methods)) {
      const returnType = method.oneway
        ? 'void'
        : method.returns
          ? typeOf(method.returns.type)
          : 'void'
      lines.push(
        `    ${JSON.stringify(name)}: (${signature(method.args)}) => Promise<${returnType}>;`
      )
    }
    lines.push('  };')
  }
  lines.push('}', 'export interface GeneratedActorEvents {')
  for (const spec of values) {
    lines.push(`  ${JSON.stringify(spec.typeName)}: {`)
    for (const [name, args] of Object.entries(spec.eventArgs)) {
      const fields = Object.entries(args)
      const max = Math.max(-1, ...fields.map(([, p]) => p.index))
      const types = Array.from({ length: max + 1 }, (_, i) => {
        const group = fields.filter(([, p]) => p.index === i)
        if (!group.length) return `a${i}: unknown`
        if (group.some(([, p]) => p.kind === 'arg')) return `a${i}: ${typeOf(group[0][1].type)}`
        return `a${i}: { ${group.map(([field, p]) => `${JSON.stringify(field)}?: ${typeOf(p.type, true)}`).join('; ')} }`
      })
      lines.push(`    ${JSON.stringify(name)}: (${types.join(', ')}) => void;`)
    }
    lines.push('  };')
  }
  lines.push(
    '}',
    '/** A typed actor handle returned by a generated method. */',
    'export type GeneratedFront<K extends keyof GeneratedActorAPI & string> = Omit<ActorFront, "api" | "listen"> & {',
    '  api: GeneratedActorAPI[K];',
    '  listen<E extends keyof GeneratedActorEvents[K] & string>(event: E, listener: GeneratedActorEvents[K][E]): ActorFront;',
    '};',
    '/** Firefox dictionary types collected from addDictType(). */',
    'export interface GeneratedDictionaries {'
  )
  for (const [name, fields] of Object.entries(dictTypes)) {
    lines.push(`  ${JSON.stringify(name)}: {`)
    for (const [field, ty] of Object.entries(fields))
      lines.push(`    ${JSON.stringify(field)}?: ${typeOf(ty)};`)
    lines.push('    [key: string]: unknown;', '  };')
  }
  lines.push('}')
  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true })
  fs.writeFileSync(output, lines.join('\n') + '\n')
  console.log(
    `Generated ${values.length} actor specs, ${values.reduce((n, s) => n + Object.keys(s.methods).length, 0)} methods, ${values.reduce((n, s) => n + Object.keys(s.events).length, 0)} events, ${Object.keys(dictTypes).length} dictionary types from ${files.length} files -> ${output}`
  )
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const input = process.argv[2]
  if (!input) {
    console.error(
      'Usage: node scripts/generate-specs.mjs <firefox/devtools/shared/specs> [output.ts]'
    )
    process.exit(2)
  }
  exportSpecs(input, process.argv[3] || 'src/generated/specs.ts')
}
