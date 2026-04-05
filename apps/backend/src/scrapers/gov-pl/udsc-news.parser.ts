import * as cheerio from 'cheerio';

import { ParseUdscNewsListType, UdscNewsItem } from './udsc.types.js';

import GOV_PL_DOMAIN, {
  UDSC_NEWS_DATE_SELECTOR,
  UDSC_NEWS_ITEM_SELECTOR,
  UDSC_NEWS_SUMMARY_SELECTOR,
  UDSC_NEWS_TITLE_SELECTOR,
} from '../constants/gov-pl.constants.js';

import { buildAbsoluteUrl, normalizeText } from '../utils/helper.js';

// ============================ UDSC NEWS parser ============================

// @Parser for NEWS PAGINATION
function parseTotalPages($: cheerio.CheerioAPI): number {
  const bodyText = normalizeText($('body').text());
  const match = bodyText.match(/\b\d+\s+z\s+(\d+)\b/);

  if (!match) return 0;

  const totalPages = Number(match[1]);

  return Number.isFinite(totalPages) ? totalPages : 0;
}

// @Parser for NEWS LIST
export function parseUdscNewsList(html: string): ParseUdscNewsListType {
  // ---------------- vars  -----------------
  const $ = cheerio.load(html);
  const results: UdscNewsItem[] = [];

  //   for duplicates
  const seen = new Set<string>();

  // ---------------- get items by selector and parse them  -----------------
  const newsItems = $(UDSC_NEWS_ITEM_SELECTOR);

  newsItems.each((_, element) => {
    const item = $(element);

    // date
    const dateElement = item.find(UDSC_NEWS_DATE_SELECTOR).first();
    const date: string | null = normalizeText(dateElement.text()) || null;

    // title
    const titleElement = item.find(UDSC_NEWS_TITLE_SELECTOR).first();
    const title: string | null = normalizeText(titleElement.text()) || null;

    // link
    const href = titleElement.attr('href');

    // summary
    const summaryElement = item.find(UDSC_NEWS_SUMMARY_SELECTOR).first();
    const summary: string | null = normalizeText(summaryElement.text()) || null;

    if (!title || !href) return;

    // check for duplicates
    const url = buildAbsoluteUrl(GOV_PL_DOMAIN, href);

    if (seen.has(url)) return;

    // add results
    results.push({
      date,
      title,
      url,
      summary,
    });

    seen.add(url);
  });

  // add total pages
  const totalPages = parseTotalPages($);

  // ---------------- returns  -----------------
  return {
    items: [...results],
    totalPages,
  };
}
