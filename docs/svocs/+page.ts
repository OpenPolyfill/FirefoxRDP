// SPDX-License-Identifier: MPL-2.0
import type { PageLoad } from './$types'
import { loadDocComponent } from '#lib/core/content.js'

export const prerender = true

export const load: PageLoad = async () => {
  const Content = await loadDocComponent('guide/getting-started')
  if (!Content) throw new Error('Missing Getting Started documentation')
  return { Content }
}
