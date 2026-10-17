import { error } from '@sveltejs/kit';
import { getDocEntryBySlug, getRawMarkdownBySlug } from '#lib/server/content.js';

export function getMarkdownResponse(slug: string): Response {
	const slugParts = slug ? slug.split('/') : [];
	const entry = getDocEntryBySlug(slugParts);
	const body = getRawMarkdownBySlug(slugParts);

	if (!entry || body === null) {
		error(404, `Document not found: ${slugParts.join('/')}`);
	}

	const header = [`# ${entry.title}`, entry.description ? `\n> ${entry.description}` : '']
		.filter(Boolean)
		.join('\n');

	return new Response(`${header}\n\n${body.trim()}\n`, {
		headers: { 'content-type': 'text/markdown; charset=utf-8' }
	});
}
