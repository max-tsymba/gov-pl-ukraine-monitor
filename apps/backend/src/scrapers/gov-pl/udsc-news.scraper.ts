import { fetchHtml } from '../common/fetch-html.js';
import { parseUdscNewsList } from './udsc-news.parser.js';
import { UdscNewsItem } from './udsc.types.js';

const UDSC_NEWS_URL = 'https://www.gov.pl/web/udsc/aktualnosci-udsc';

// ============================ UDSC NEWS orchestrator ============================

export async function scrapeUdscNewsList(): Promise<UdscNewsItem[]> {
  const html = await fetchHtml(UDSC_NEWS_URL);

  const items = parseUdscNewsList(html);

  return items;
}
