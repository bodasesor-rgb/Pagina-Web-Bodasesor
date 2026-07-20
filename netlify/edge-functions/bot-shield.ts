import type { Config, Context } from '@netlify/edge-functions'

// ═══════════════════════════════════════════════════════════════
// CAPA 0 — SONDEOS Shopify / APIs fantasma
// Evita servir el SPA HTML (7KB+) a bots que piden /products.json etc.
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
])

const PROBE_PREFIXES = [
  '/products.json',
  '/collections.json',
  '/cart.js',
  '/cart.json',
]

function isShopifyProbe(pathname: string): boolean {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (PROBE_PATHS.has(pathname) || PROBE_PATHS.has(p)) return true
  return PROBE_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}?`))
}

// ═══════════════════════════════════════════════════════════════
// CAPA 1 — SIEMPRE PERMITIR (máxima prioridad, nunca se bloquean)
// SEO + previews WhatsApp/FB/IG
// ═══════════════════════════════════════════════════════════════
const ALLOW = [
  /googlebot/i,
  /google-inspectiontool/i,
  /storebot-google/i,
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
]

// ═══════════════════════════════════════════════════════════════
// CAPA 2 — BLOQUEAR SIEMPRE (IA + scrapers de ancho de banda)
// ═══════════════════════════════════════════════════════════════
const BLOCK = [
  /GPTBot/i,
  /OAI-SearchBot/i,
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
  /Timpibot/i,
  /PetalBot/i,
  /DuckAssistBot/i,
  /AhrefsBot/i,
  // SemrushBot — permitido (Ubersuggest audita con este user-agent)
  /DotBot/i,
  /MJ12bot/i,
  /DataForSeoBot/i,
  /BLEXBot/i,
  /rogerbot/i,
  /screaming.?frog/i,
  /serpstatbot/i,
  /scrapy/i,
  /python-requests/i,
  /Go-http-client/i,
  /libwww-perl/i,
  /HTTrack/i,
  /Nutch/i,
  /masscan/i,
  /zgrab/i,
  /\bcurl\//i,
  /\bwget\b/i,
]

export default async (request: Request, context: Context) => {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Tiny 404 for legacy Shopify API probes — never SPA HTML soft-404.
  if (isShopifyProbe(pathname)) {
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
  const category = request.headers.get('netlify-agent-category') || ''

  if (ALLOW.some((rx) => rx.test(ua))) return context.next()

  if (category === 'ai') {
    return block(context, ua, 'categoria:ai')
  }

  if (BLOCK.some((rx) => rx.test(ua))) {
    return block(context, ua, 'lista-negra')
  }

  if (ua.trim() === '') {
    return block(context, ua, 'sin-user-agent')
  }

  return context.next()
}

function block(context: Context, ua: string, reason: string) {
  console.log(`BLOQUEADO [${reason}] ip=${context.ip} ua="${ua}"`)
  return new Response('Access denied.', {
    status: 403,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}

export const config: Config = {
  path: '/*',
  // Skip edge on static assets so CDN can cache them (Cache-Control headers apply).
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
