// SPDX-License-Identifier: MPL-2.0

/**
 * TypeDoc can emit object-shaped types as prose: `{ actor: string }`.
 * mdsvex turns that prose into Svelte markup, in which braces are expressions.
 *
 * Do not use {'{'}: Markdown/typography transforms may turn the ASCII quotes
 * into curly quotes before the Svelte compiler runs. A quote-free constant
 * JS expression is safe across both parsers and renders the correct character.
 * Leave YAML frontmatter and fenced code blocks unchanged.
 */
export function escapeSvelteMarkdown(markdown) {
  let fence = null
  let frontmatter = /^---\r?\n/.test(markdown) ? 0 : -1
  return markdown
    .split(/(\r?\n)/)
    .map((part) => {
      if (part === '\n' || part === '\r\n') return part
      if (frontmatter >= 0) {
        frontmatter++
        if (frontmatter > 1 && /^---\s*$/.test(part)) frontmatter = -1
        return part
      }
      const marker = part.match(/^[ \t]{0,3}(`{3,}|~{3,})(.*)$/)
      if (fence) {
        if (
          marker &&
          marker[1][0] === fence.char &&
          marker[1].length >= fence.length &&
          /^\s*$/.test(marker[2])
        )
          fence = null
        return part
      }
      if (marker) {
        fence = { char: marker[1][0], length: marker[1].length }
        return part
      }
      // Accept older generated docs too (ASCII or typography-transformed quotes).
      // This keeps re-running the transformer idempotent.
      return part
        .replace(/\{['‘’]\{['‘’]\}/g, '{String.fromCharCode(123)}')
        .replace(/\{['‘’]\}['‘’]\}/g, '{String.fromCharCode(125)}')
        .replace(/\{String\.fromCharCode\((?:123|125)\)\}|[{}]/g, (token) => {
          if (token.startsWith('{String.fromCharCode(')) return token
          return token === '{' ? '{String.fromCharCode(123)}' : '{String.fromCharCode(125)}'
        })
    })
    .join('')
}
