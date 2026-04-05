import { scrapeUdscNewsList } from '../scrapers/gov-pl/udsc-news.scraper.js';

import { IGetNewsOptions, IGetNewsResponse } from './news.types.js';

// ============================ UDSC NEWS service ============================

export async function getUdscNews(
  options: IGetNewsOptions = {},
): Promise<IGetNewsResponse> {
  const page = options.page ?? 1;
  const size = options.size ?? 10;

  const result = await scrapeUdscNewsList({ page, size });

  return {
    items: result.items,
    page: result.page,
    size: result.size,
    totalPages: result.totalPages,
    totalItemsOnPage: result.items.length,
  };
}
