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
