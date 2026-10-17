import { getMarkdownResponse } from '#lib/server/markdown.js';
import type { EntryGenerator, RequestHandler } from './$types';
import { getDocsEntries } from '#lib/server/content.js';

export const prerender = true;

// Explicit entries so every doc gets its .md file without depending on the
// prerender crawler finding the "View as Markdown" links.
export const entries: EntryGenerator = () =>
	getDocsEntries()
		.filter((entry) => entry.slug !== '')
		.map((entry) => ({ slug: entry.slug }));

export const GET: RequestHandler = ({ params, url }) => {
	if (params.slug === '') {
		return new Response(null, {
			status: 308,
			headers: { location: url.pathname.replace(/\/\.md$/, '.md') }
		});
	}

	return getMarkdownResponse(params.slug);
};
