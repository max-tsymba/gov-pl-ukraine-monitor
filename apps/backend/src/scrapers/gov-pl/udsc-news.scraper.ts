import { fetchHtml } from '../common/fetch-html.js';
import { parseUdscNewsList } from './udsc-news.parser.js';
import { UdscNewsItem } from './udsc.types.js';

const UDSC_NEWS_URL = 'https://www.gov.pl/web/udsc/aktualnosci-udsc';

// ============================ UDSC NEWS orchestrator ============================

export async function scrapeUdscNewsList(): Promise<UdscNewsItem[]> {
  const html = await fetchHtml(UDSC_NEWS_URL);

  console.log('HTML length:', html.length);

  const items = parseUdscNewsList(html);

  console.log('Parsed items count:', items.length);
  console.log(
    'First parsed items:',
    JSON.stringify(items.slice(0, 5), null, 2),
  );

  return items;
}
