// @Function: remove tabs, spaces, /n ---------------------

const normalizeText = (value: string): string => {
  return value.replace(/\s+/g, ' ').trim();
};
export { normalizeText };

// @Function: do link as absolute URL ---------------------

const buildAbsoluteUrl = (domain: string, href: string): string => {
  const isHttp = href.startsWith('http://');
  const isHttps = href.startsWith('https://');

  if (isHttp || isHttps) return href;

  return `${domain}${href}`;
};
export { buildAbsoluteUrl };

// @Function: check date ---------------------

const isDate = (value: string): boolean => {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(value);
};
export { isDate };
