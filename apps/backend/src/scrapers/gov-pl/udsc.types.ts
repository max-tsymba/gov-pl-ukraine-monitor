// --------------- news -----------------
export interface UdscNewsItem {
  date: string | null;
  title: string | null;
  url: string;
  summary: string | null;
}

export interface ScrapeUdscNewsOptions {
  page?: number;
  size?: number;
}

export interface UdscNewsPageResult {
  items: UdscNewsItem[];
  page: number;
  size: number;
  totalPages: number;
}

export type ParseUdscNewsListType = Omit<UdscNewsPageResult, 'page' | 'size'>;
