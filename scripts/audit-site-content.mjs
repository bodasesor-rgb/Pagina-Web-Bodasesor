#!/usr/bin/env node
/**
 * Full live content audit of every sitemap URL:
 * status, canonical, robots, title/description/H1 sync, city consistency,
 * AI/template leftovers, grammar slips, thin & duplicated text, broken internal links.
 *
 * Usage: node scripts/audit-site-content.mjs   (SITE_BASE, AUDIT_CONCURRENCY optional)
 * Output: .gsc-audit/site-content-audit.json + console summary
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { CITY_MAP } from '../src/data/city-data.js'

const SITE = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY || 8)
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }

const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
const decode = (s) =>
  String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))

const CITIES = Object.entries(CITY_MAP)
  .filter(([k, v]) => k === v.slug)
  .map(([slug, v]) => ({ slug, name: v.name, short: v.short, keys: [norm(v.name).split(' / ')[0], norm(v.short || '')].filter((x) => x && x.length > 2) }))
const CITY_SLUGS = new Set(Object.keys(CITY_MAP))

const STOP = new Set('de del la las el los y e en para con a o por sin sobre tu tus mi su sus que un una al se es lo como mas bodasesor eventos evento renta precio precios cotiza mexico'.split(' '))
const tokens = (s) => new Set(norm(s).split(/[^a-z0-9]+/).filter((t) => t.length > 2 && !STOP.has(t)).map((t) => t.replace(/(es|s)$/, '')))
const overlap = (a, b) => {
  if (!a.size || !b.size) return 0
  let n = 0
  for (const t of a) if (b.has(t)) n++
  return n / Math.min(a.size, b.size)
}

const TEXT_RULES = [
  ['ai_prompt_leak', /por favor,? ind[ií]came|como (un )?modelo de lenguaje|no puedo (ayudarte|cumplir)|aqu[ií] tienes (el|un) (art[ií]culo|texto)|\bclaro[,!] aqu[ií]/i],
  ['template_placeholder', /\[(nombre|tema|ciudad|serie|estreno|pel[ií]cula|producto|servicio|insertar|x)\b[^\]]*\]|\{\{|\}\}|\bundefined\b|\bNaN\b|\[object Object\]|lorem ipsum/i],
  ['markdown_leftover', /\*\*[^*\n]{2,80}\*\*|(^|\s)#{2,4}\s+[A-ZÁÉÍÓÚ]/],
  ['filler_template', /es uno de los pilares fundamentales|nos referimos a un conjunto de elementos que van mucho m[aá]s all[aá]|act[uú]a como el director de orquesta|es un elemento diferenciador que separa a los mejores proveedores/i],
  ['gender_slip', /\b[Ee]l (frases|mensajes|palabras|flores|mesas|sillas|carpas|bodas|banquetes|tendencias|ideas|arreglos|votos)\b/],
  ['double_eventos', /para eventos para eventos|los mejores eventos para eventos|para eventos y eventos/i],
  ['repeated_word', /\b(de|la|el|en|para|que|los|las|y|con)\s+\1\b/i],
  ['spaced_punct', / [,.;:](?=\s)/],
]
const DUP_PHRASE_MIN = 90

async function fetchText(url, { redirect = 'manual' } = {}) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: UA, redirect, signal: AbortSignal.timeout(25_000) })
      if ((res.status === 429 || res.status === 403) && attempt < 2) {
        await new Promise((r) => setTimeout(r, 4000 * (attempt + 1)))
        continue
      }
      const body = res.status === 200 ? await res.text() : ''
      return { status: res.status, location: res.headers.get('location') || '', body }
    } catch (err) {
      if (attempt === 2) return { status: 0, location: '', body: '', error: String(err.message || err) }
    }
  }
  return { status: 0, location: '', body: '' }
}

async function sitemapUrls() {
  const seen = new Set()
  const out = []
  async function walk(url) {
    if (seen.has(url)) return
    seen.add(url)
    const { body } = await fetchText(url, { redirect: 'follow' })
    const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
    if (/<sitemapindex/i.test(body)) for (const l of locs) await walk(l)
    else out.push(...locs.filter((l) => !/\.(xml|jpe?g|png|webp)$/i.test(l)))
  }
  await walk(`${SITE}/sitemap.xml`)
  return [...new Set(out)]
}

function pick(html, re) {
  return decode((html.match(re) || [])[1] || '').replace(/\s+/g, ' ').trim()
}

function mainText(html) {
  return decode(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<header[\s\S]*?<\/header>/gi, ' ')
      .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
      .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
      .replace(/<aside id="site-legal-boot"[\s\S]*?<\/aside>/gi, ' ')
      .replace(/<\/?(a|strong|em|b|i|span|small|mark|abbr|sup|sub|u)\b[^>]*>/gi, '')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim()
}

function pageKind(html) {
  if (html.includes('seo-blog-')) return 'nexus-blog'
  if (html.includes('seo-service-hero') || html.includes('seo-section')) return 'nexus-landing'
  if (html.includes('id="root"')) return 'spa'
  return 'other'
}

function cityFromPath(path) {
  for (const seg of path.split('/').filter(Boolean)) if (CITY_SLUGS.has(seg)) return CITY_MAP[seg]
  return null
}

function analyze(url, res) {
  const path = new URL(url).pathname
  const html = res.body
  const issues = []
  const add = (code, detail = '') => issues.push(detail ? `${code}: ${detail}` : code)

  if (res.status !== 200) {
    add('status', `${res.status}${res.location ? ` -> ${res.location.replace(SITE, '')}` : ''}${res.error ? ` ${res.error}` : ''}`)
    return { url, path, status: res.status, issues }
  }

  const kind = pageKind(html)
  const title = pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i)
  const desc = pick(html, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)
  const canonical = pick(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)
  const robots = pick(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i)
  const ogUrl = pick(html, /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i)
  const visibleHtml = html.replace(/<div id="spa-crawler-wrap"[\s\S]*?<\/main><\/div>/i, '').replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
  const h1s = [...visibleHtml.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => decode(m[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim())
  const crawlerH1 = pick(html, /<main id="spa-crawler-content"[\s\S]*?<h1>([\s\S]*?)<\/h1>/i)
  const h1 = h1s[0] || crawlerH1
  const text = mainText(kind === 'spa' ? (html.match(/<div id="spa-crawler-wrap"[\s\S]*?<\/main><\/div>/i) || [''])[0] : html)
  const words = text ? text.split(/\s+/).length : 0

  if (!canonical) add('canonical_missing')
  else if (canonical.replace(/\/$/, '') !== url.replace(/\/$/, '')) add('canonical_mismatch', canonical.replace(SITE, ''))
  if (ogUrl && ogUrl.replace(/\/$/, '') !== url.replace(/\/$/, '')) add('og_url_mismatch', ogUrl.replace(SITE, ''))
  if (/noindex/i.test(robots)) add('noindex_in_sitemap')

  if (!title) add('title_missing')
  else {
    if (title.length > 65) add('title_long', String(title.length))
    if (title.length < 20) add('title_short', title)
    if (/^[a-záéíóúñ¿¡]/.test(title)) add('title_lowercase', title)
    if ((title.match(/bodasesor/gi) || []).length > 1) add('title_brand_twice', title)
    if (/^blog\s*\|/i.test(title)) add('title_generic', title)
    if (/\b(\w{4,})\b[^|]*\b\1\b/i.test(title.replace(/\|.*$/, '')) && /eventos[^|]*eventos/i.test(title)) add('title_repetition', title)
  }
  if (!desc) add('description_missing')
  else {
    if (desc.length < 70) add('description_short', String(desc.length))
    if (desc.length > 170) add('description_long', String(desc.length))
  }
  if (!h1) add('h1_missing')
  if (h1s.length > 1) add('h1_multiple', String(h1s.length))
  if (h1 && title) {
    const ov = overlap(tokens(title.replace(/\|[^|]*$/, '')), tokens(h1))
    if (ov < 0.34) add('title_h1_mismatch', `"${title}" vs "${h1}"`)
  }
  if (title && path !== '/') {
    const segs = path.split('/').filter(Boolean).filter((s) => !CITY_SLUGS.has(s))
    const slugTok = tokens(segs.join(' ').replace(/-/g, ' '))
    if (slugTok.size && overlap(slugTok, tokens(`${title} ${h1}`)) === 0) add('url_title_mismatch', `${path} vs "${title}"`)
  }

  const city = cityFromPath(path)
  if (city) {
    const hay = norm(`${title} ${h1}`)
    const own = [norm(city.name).split(' / ')[0], norm(city.short || '')].filter((k) => k && k.length > 2)
    if (!own.some((k) => hay.includes(k))) add('city_missing_in_title_h1', `${city.name}: "${title}"`)
    const others = CITIES.filter((c) => c.slug !== city.slug && c.keys.some((k) => new RegExp(`\\b${k}\\b`).test(hay)))
      .filter((c) => !(city.slug === 'estado-de-mexico' && c.slug === 'ciudad-de-mexico'))
      .filter((c) => !(city.slug === 'ciudad-de-mexico' && c.slug === 'estado-de-mexico'))
    if (others.length) add('city_conflict', `${city.name} url, title/h1 mention ${others.map((c) => c.name).join(', ')}`)
  }

  const textForRules = `${title} \n ${h1} \n ${desc} \n ${text}`
  for (const [code, re] of TEXT_RULES) {
    const m = textForRules.match(re)
    if (m) add(code, `…${textForRules.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, ' ')}…`)
  }
  if (kind !== 'spa' && words < 250) add('thin_content', `${words} words`)

  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["']/gi)]
    .map((m) => m[1])
    .filter((h) => h.startsWith('/') || h.startsWith(SITE) || h.startsWith('https://www.bodasesor.com'))
    .map((h) => {
      try {
        const u = new URL(h, SITE)
        return (u.pathname.replace(/\/+$/, '') || '/') + (u.search || '')
      } catch {
        return null
      }
    })
    .filter((h) => h && !/\.(pdf|jpe?g|png|webp|svg|xml)$/i.test(h) && !h.startsWith('/cdn-cgi'))

  return { url, path, status: 200, kind, title, desc, h1, words, text, links: [...new Set(links)], issues }
}

async function pool(items, fn, n) {
  const out = new Array(items.length)
  let i = 0
  let done = 0
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const idx = i++
        out[idx] = await fn(items[idx], idx)
        if (++done % 250 === 0) console.log(`  ${done}/${items.length}`)
      }
    }),
  )
  return out
}

function cityNormalize(s) {
  let t = norm(s)
  for (const c of CITIES) for (const k of c.keys) t = t.split(k).join('{city}')
  return t
}

async function main() {
  const all = await sitemapUrls()
  const limit = Number(process.env.AUDIT_LIMIT || 0)
  const urls = limit ? all.filter((_, i) => i % Math.ceil(all.length / limit) === 0) : all
  console.log(`Sitemap URLs: ${all.length} (auditing ${urls.length})`)
  const results = await pool(urls, async (u) => analyze(u, await fetchText(u)), CONCURRENCY)

  const ok = results.filter((r) => r.status === 200)
  const groupDup = (field, minLen) => {
    const m = new Map()
    for (const r of ok) {
      const v = (r[field] || '').trim()
      if (v.length < minLen) continue
      const key = norm(v)
      if (!m.has(key)) m.set(key, [])
      m.get(key).push(r)
    }
    return [...m.values()].filter((g) => g.length > 1)
  }
  for (const g of groupDup('title', 10)) for (const r of g) r.issues.push(`title_duplicate: x${g.length} "${r.title}"`)
  for (const g of groupDup('desc', 30)) for (const r of g) r.issues.push(`description_duplicate: x${g.length}`)

  const fp = new Map()
  for (const r of ok) {
    if (r.kind === 'spa' || r.words < 200) continue
    const key = cityNormalize(r.text).replace(/[^a-z{} ]/g, '').slice(200, 1400)
    if (!fp.has(key)) fp.set(key, [])
    fp.get(key).push(r)
  }
  const nearDupGroups = [...fp.values()].filter((g) => g.length > 1)
  for (const g of nearDupGroups) for (const r of g) r.issues.push(`body_near_duplicate: x${g.length} (e.g. ${g.find((x) => x !== r)?.path})`)

  const phraseCount = new Map()
  for (const r of ok) {
    if (r.kind === 'spa') continue
    const sentences = new Set(
      r.text
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.length >= DUP_PHRASE_MIN)
        .map(cityNormalize),
    )
    for (const s of sentences) phraseCount.set(s, (phraseCount.get(s) || 0) + 1)
  }
  const boilerplate = [...phraseCount.entries()]
    .filter(([, n]) => n >= 25)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .map(([s, n]) => ({ pages: n, sentence: s.slice(0, 220) }))

  const sitemapSet = new Set(urls.map((u) => new URL(u).pathname.replace(/\/+$/, '') || '/'))
  const linkSources = new Map()
  for (const r of ok) for (const l of r.links || []) {
    if (sitemapSet.has(l)) continue
    if (!linkSources.has(l)) linkSources.set(l, [])
    if (linkSources.get(l).length < 3) linkSources.get(l).push(r.path)
  }
  const linkTargets = [...linkSources.keys()]
  console.log(`Internal link targets outside sitemap: ${linkTargets.length}`)
  const linkChecks = await pool(
    linkTargets,
    async (p) => {
      const res = await fetchText(`${SITE}${p}`)
      let final = res.status
      let loc = res.location
      if (res.status >= 300 && res.status < 400 && loc) {
        const r2 = await fetchText(new URL(loc, SITE).href)
        final = r2.status
        loc = new URL(loc, SITE).pathname
      }
      return { path: p, status: res.status, final, location: loc, from: linkSources.get(p) }
    },
    CONCURRENCY,
  )
  const brokenLinks = linkChecks.filter((l) => l.final !== 200)
  const redirectedLinks = linkChecks.filter((l) => l.final === 200 && l.status !== 200)

  const counts = {}
  const examples = {}
  for (const r of results) for (const i of r.issues) {
    const code = i.split(':')[0]
    counts[code] = (counts[code] || 0) + 1
    if (!examples[code]) examples[code] = []
    if (examples[code].length < 8) examples[code].push(`${r.path} — ${i}`)
  }
  const byKind = {}
  for (const r of ok) byKind[r.kind] = (byKind[r.kind] || 0) + 1

  const report = {
    auditedAt: new Date().toISOString(),
    totals: { urls: urls.length, ok: ok.length, byKind, pagesWithIssues: results.filter((r) => r.issues.length).length },
    counts: Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1])),
    examples,
    boilerplate,
    brokenLinks: brokenLinks.slice(0, 300),
    brokenLinkCount: brokenLinks.length,
    redirectedLinkCount: redirectedLinks.length,
    redirectedLinks: redirectedLinks.slice(0, 100),
    pages: results.map(({ text, links, ...r }) => r),
  }
  await mkdir('.gsc-audit', { recursive: true })
  await writeFile('.gsc-audit/site-content-audit.json', JSON.stringify(report, null, 2))

  const lines = [
    `URLs ${report.totals.urls} | 200 OK ${report.totals.ok} | kinds ${JSON.stringify(byKind)} | with issues ${report.totals.pagesWithIssues}`,
    '',
    'ISSUE COUNTS',
    ...Object.entries(report.counts).map(([k, v]) => `  ${String(v).padStart(5)}  ${k}`),
    '',
    `BROKEN INTERNAL LINKS: ${brokenLinks.length} | redirected internal links: ${redirectedLinks.length}`,
    ...brokenLinks.slice(0, 25).map((l) => `  ${l.status}${l.final !== l.status ? `>${l.final}` : ''} ${l.path} (from ${l.from.join(', ')})`),
    '',
    'EXAMPLES',
    ...Object.entries(examples).flatMap(([k, v]) => [`[${k}]`, ...v.slice(0, 5).map((x) => `  ${x.slice(0, 260)}`)]),
    '',
    'BOILERPLATE SENTENCES (pages)',
    ...boilerplate.slice(0, 15).map((b) => `  ${b.pages}  ${b.sentence.slice(0, 160)}`),
  ]
  await writeFile('.gsc-audit/site-content-audit.txt', lines.join('\n'), 'utf8')
  console.log('✓ .gsc-audit/site-content-audit.txt')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
