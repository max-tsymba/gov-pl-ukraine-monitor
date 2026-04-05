import * as cheerio from 'cheerio';

import { UdscNewsItem } from './udsc.types.js';

import { buildAbsoluteUrl, normalizeText } from '../utils/helper.js';

const GOV_PL_DOMAIN = 'https://www.gov.pl';

// ============================ UDSC NEWS parser ============================

export function parseUdscNewsList(html: string): UdscNewsItem[] {
  // ---------------- vars  -----------------
  const $ = cheerio.load(html);
  const results: UdscNewsItem[] = [];

  //   for duplicates
  const seen = new Set<string>();

  // ---------------- cheerio ------------------
  const hrefTags = 'a[href*="/web/udsc/"]';
  $(hrefTags).each((_, element) => {
    const link = $(element);
    const href = link.attr('href');
    const title = normalizeText(link.text());

    if (!href || !title) return;

    const url = buildAbsoluteUrl(GOV_PL_DOMAIN, href);

    if (seen.has(url)) return;

    const cardText = normalizeText(link.parent().text());

    // find date
    const maybeDateMatch = cardText.match(/\b\d{2}\.\d{2}\.\d{4}\b/);
    const date = maybeDateMatch ? maybeDateMatch[0] : null;

    // find and build summary
    let summary: string | null = null;

    const parentText = normalizeText(link.parent().text());
    const isExistParentText: boolean =
      Boolean(parentText) && parentText !== title;

    if (isExistParentText) {
      const parentTextTrim = parentText
        .replace(title, '')
        .replace(date ?? '', '')
        .trim();
      summary = parentTextTrim || null;
    }

    // add to results
    results.push({ date, title, url, summary });

    seen.add(url);
  });

  // ---------------- returns  -----------------
  return results;
}
