import type { RequestHandler } from './$types';
import { getMarkdownResponse } from '#lib/server/markdown.js';

export const prerender = true;

export const GET: RequestHandler = () => getMarkdownResponse('');
