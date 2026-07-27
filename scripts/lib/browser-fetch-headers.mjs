/** Headers that pass bot-shield (Chrome + Sec-Fetch navigation hints). */
export const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

export function browserNavHeaders(extra = {}) {
  return {
    'user-agent': BROWSER_UA,
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'sec-fetch-site': 'none',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-dest': 'document',
    'sec-fetch-user': '?1',
    ...extra,
  }
}

export function browserAssetHeaders(extra = {}) {
  return {
    'user-agent': BROWSER_UA,
    accept: '*/*',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'no-cors',
    'sec-fetch-dest': 'empty',
    ...extra,
  }
}
