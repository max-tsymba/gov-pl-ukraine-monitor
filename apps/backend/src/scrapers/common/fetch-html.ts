import axios from 'axios';

// ============================ HTML FETCHER ============================
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; GovPLMonitor/1.0)',
  'Accept-Language': 'pl-PL,pl;q=0.9,en;q=0.8',
};
const TIMOUT = 15000;

export async function fetchHtml(url: string): Promise<string> {
  const response = await axios.get<string>(url, {
    headers: HEADERS,
    timeout: TIMOUT,
  });

  return response.data;
}
