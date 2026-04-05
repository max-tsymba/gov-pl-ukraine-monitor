import { fetchHtml } from '../common/fetch-html.js';

import { buildUdscNewsUrl } from '../utils/helper.js';

import { parseUdscNewsList } from './udsc-news.parser.js';

import { ScrapeUdscNewsOptions, UdscNewsPageResult } from './udsc.types.js';

// ============================ UDSC NEWS orchestrator ============================

export async function scrapeUdscNewsList(
  options: ScrapeUdscNewsOptions = {},
): Promise<UdscNewsPageResult> {
  const page = options.page ?? 1;
  const size = options.size ?? 10;

  const url = buildUdscNewsUrl({ page, size });
  const html = await fetchHtml(url);

  const results = parseUdscNewsList(html);

  return {
    ...results,
    page,
    size,
    totalPages: 0,
  };
}
