import { UdscNewsItem } from '../scrapers/gov-pl/udsc.types.js';

export interface IGetNewsOptions {
  page?: number;
  size?: number;
}

export interface IGetNewsResponse {
  items: UdscNewsItem[];
  page: number;
  size: number;
  totalPages: number;
  totalItemsOnPage: number;
}
