import { scrapeUdscNewsList } from '../scrapers/gov-pl/udsc-news.scraper.js';

// ============================ UDSC NEWS service ============================

export async function getUdscNews() {
  const items = await scrapeUdscNewsList();

  return items;
}
