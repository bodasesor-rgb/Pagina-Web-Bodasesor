import type { Config, Context } from '@netlify/edge-functions'

// ═══════════════════════════════════════════════════════════════
// CAPA 0 — SONDEOS / EXPLOITS (respuesta minúscula, sin HTML SPA)
// ═══════════════════════════════════════════════════════════════
const PROBE_PATHS = new Set([
  '/products.json',
  '/collections.json',
  '/cart.json',
  '/cart.js',
  '/meta.json',
  '/services/meta.json',
  '/search/suggest.json',
  '/search/suggest.json/',
  '/wp-login.php',
  '/wp-admin',
  '/xmlrpc.php',
  '/.env',
  '/.git/config',
  '/composer.json',
  '/package.json',
  '/phpinfo.php',
  '/admin.php',
  '/actuator',
  '/actuator/health',
])

const PROBE_PREFIXES = [
  '/products.json',
  '/collections.json',
  '/cart.js',
  '/cart.json',
  '/wp-admin/',
  '/wp-content/',
  '/wp-includes/',
  '/.git/',
  '/.env',
  '/vendor/phpunit/',
  '/phpmyadmin',
  '/admin/config',
]

function isProbePath(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (PROBE_PATHS.has(pathname) || PROBE_PATHS.has(p)) return true
  const lower = p.toLowerCase()
  return PROBE_PREFIXES.some((prefix) => lower === prefix || lower.startsWith(prefix))
}

// ═══════════════════════════════════════════════════════════════
// CAPA 1 — SIEMPRE PERMITIR (SEO + previews sociales)
// ═══════════════════════════════════════════════════════════════
const ALLOW = [
  /googlebot/i,
  /google-inspectiontool/i,
  /storebot-google/i,
  /adsbot-google/i,
  /apis-google/i,
  /mediapartners-google/i,
  /bingbot/i,
  /bingpreview/i,
  /adidxbot/i,
  /duckduckbot/i,
  /yandex(bot|images)/i,
  /baiduspider/i,
  /applebot(?!-extended)/i,
  /slurp/i,
  /facebookexternalhit/i,
  /facebookcatalog/i,
  /twitterbot/i,
  /linkedinbot/i,
  /pinterest/i,
  /whatsapp/i,
  /telegrambot/i,
  /slackbot/i,
  /discordbot/i,
  // Ubersuggest / auditorías pedidas por el equipo
  /semrushbot/i,
]

// ═══════════════════════════════════════════════════════════════
// CAPA 2 — BLOQUEAR (IA, SEO scrapers, headless, libraries)
// ═══════════════════════════════════════════════════════════════
const BLOCK = [
  // AI / LLM crawlers
  /GPTBot/i,
  /OAI-SearchBot/i,
  /ChatGPT-User/i,
  /ClaudeBot/i,
  /anthropic-ai/i,
  /Claude-Web/i,
  /CCBot/i,
  /Google-Extended/i,
  /PerplexityBot/i,
  /Bytespider/i,
  /Amazonbot/i,
  /Applebot-Extended/i,
  /cohere-ai/i,
  /Diffbot/i,
  /ImagesiftBot/i,
  /Omgili/i,
  /YouBot/i,
  /Meta-ExternalFetcher/i,
  /meta-externalagent/i,
  /Timpibot/i,
  /PetalBot/i,
  /DuckAssistBot/i,
  /AI2Bot/i,
  /Webzio-Extended/i,
  /ICC-Crawler/i,
  /Kangaroobot/i,
  /FriendlyCrawler/i,

  // SEO / bandwidth scrapers (Semrush permitido arriba en ALLOW)
  /AhrefsBot/i,
  /AhrefsSiteAudit/i,
  /DotBot/i,
  /MJ12bot/i,
  /DataForSeoBot/i,
  /BLEXBot/i,
  /rogerbot/i,
  /screaming.?frog/i,
  /serpstatbot/i,
  /SeznamBot/i,
  /Seekport/i,
  /ZoominfoBot/i,
  /BomboraBot/i,
  /Awario(Smart)?Bot/i,
  /magpie-crawler/i,
  /VelenPublicWebCrawler/i,
  /Turnitin/i,
  /trendictionbot/i,
  /Blackboard\s?Safeassign/i,

  // Security scanners / internet census
  /CensysInspect/i,
  /Censys.io/i,
  /\bShodan\b/i,
  /InternetMeasurement/i,
  /paloaltonetworks/i,
  /Detectify/i,
  /Nuclei/i,
  /zgrab/i,
  /masscan/i,
  /Nmap\sScripting/i,
  /sqlmap/i,
  /nikto/i,
  /OpenVAS/i,
  /nessus/i,

  // Headless / automation / HTTP libs (not real browsers)
  /HeadlessChrome/i,
  /PhantomJS/i,
  /Selenium/i,
  /Puppeteer/i,
  /Playwright/i,
  /scrapy/i,
  /python-requests/i,
  /python-urllib/i,
  /aiohttp/i,
  /httpx\//i,
  /Go-http-client/i,
  /java\//i,
  /okhttp/i,
  /libwww-perl/i,
  /HTTPie/i,
  /PostmanRuntime/i,
  /Insomnia/i,
  /RestSharp/i,
  /node-fetch/i,
  /axios\//i,
  /undici/i,
  /Apache-HttpClient/i,
  /libcurl/i,
  /\bcurl\//i,
  /\bwget\b/i,
  /HTTrack/i,
  /Nutch/i,
  /heritrix/i,
  /Firefox\/.*Bot/i,
]

/** Obvious non-browser UAs that still burn bandwidth */
function isSuspiciousUa(ua: string): boolean {
  const t = ua.trim()
  if (t.length < 12) return true
  if (/^(Mozilla\/4\.0)$/i.test(t)) return true
  // Match Bot/Crawler even inside tokens like SomeRandomBot/1.0
  if (
    /bot|crawler|spider|scraper|fetch\/\d|scanner/i.test(t) &&
    !ALLOW.some((rx) => rx.test(t))
  ) {
    return true
  }
  return false
}

export default async (request: Request, context: Context) => {
  const url = new URL(request.url)
  const pathname = url.pathname

  if (isProbePath(pathname)) {
    console.log(`PROBE-404 ip=${context.ip} path=${pathname}`)
    return new Response('Not found.', {
      status: 404,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=86400',
        'x-robots-tag': 'noindex',
      },
    })
  }

  const ua = request.headers.get('user-agent') || ''
  const category = (request.headers.get('netlify-agent-category') || '').toLowerCase()

  // SEO / social previews always pass
  if (ALLOW.some((rx) => rx.test(ua))) return context.next()

  // Netlify-classified AI / scraper traffic
  if (category === 'ai' || category === 'ads') {
    return block(context, ua, `categoria:${category}`)
  }

  if (BLOCK.some((rx) => rx.test(ua))) {
    return block(context, ua, 'lista-negra')
  }

  if (ua.trim() === '' || isSuspiciousUa(ua)) {
    return block(context, ua, ua.trim() === '' ? 'sin-user-agent' : 'ua-sospechoso')
  }

  return context.next()
}

function block(context: Context, ua: string, reason: string) {
  console.log(`BLOQUEADO [${reason}] ip=${context.ip} ua="${ua.slice(0, 180)}"`)
  return new Response('Access denied.', {
    status: 403,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
      'x-robots-tag': 'noindex',
    },
  })
}

export const config: Config = {
  path: '/*',
  // Skip edge on static assets so CDN can cache them (Cache-Control headers apply).
  // Note: asset hits still count in Netlify bandwidth — that is expected and
  // explains most of GA vs Netlify request gaps for real visitors too.
  excludedPath: [
    '/robots.txt',
    '/.well-known/*',
    '/css/*',
    '/assets/*',
    '/images/*',
    '/*.webp',
    '/*.svg',
    '/*.png',
    '/*.jpg',
    '/*.jpeg',
    '/*.gif',
    '/*.ico',
    '/*.woff',
    '/*.woff2',
    '/favicon.ico',
    '/favicon.svg',
    '/apple-touch-icon.svg',
    '/sitemap.xml',
    '/llms.txt',
  ],
  onError: 'bypass',
}
