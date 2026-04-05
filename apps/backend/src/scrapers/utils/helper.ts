// @Function: remove tabs, spaces, /n ---------------------

import { UDSC_NEWS_URL } from '../constants/gov-pl.constants.js';
import { ScrapeUdscNewsOptions } from '../gov-pl/udsc.types.js';

export const normalizeText = (value: string): string => {
  return value.replace(/\s+/g, ' ').trim();
};

// @Function: do link as absolute URL ---------------------

export const buildAbsoluteUrl = (domain: string, href: string): string => {
  const isHttp = href.startsWith('http://');
  const isHttps = href.startsWith('https://');

  if (isHttp || isHttps) return href;

  return `${domain}${href}`;
};

// @Function: check date ---------------------

export const isDate = (value: string): boolean => {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(value);
};

// @Function: build url with pagination for udsc scraper  ---------------------

export const buildUdscNewsUrl = (
  options: ScrapeUdscNewsOptions = {},
): string => {
  const page = options.page ?? 1;
  const size = options.size ?? 10;

  const url = new URL(UDSC_NEWS_URL);
  url.searchParams.set('page', String(page));
  url.searchParams.set('size', String(size));

  return url.toString();
};
