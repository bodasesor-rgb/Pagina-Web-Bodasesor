#!/usr/bin/env node
/**
 * Full SEO health audit against production (or BASE_URL).
 * Flags soft-404 (home canonical/title), redirect chains, noindex, tiny HTML.
 *
 * Usage:
 *   node scripts/audit-seo-production.mjs
 *   BASE_URL=https://bodasesor.com CONCURRENCY=20 node scripts/audit-seo-production.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BASE = (process.env.BASE_URL || 'https://bodasesor.com').replace(/\/$/, '')
const CONCURRENCY = Number(process.env.CONCURRENCY || 16)
const UA =
  process.env.AUDIT_UA ||
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

const HOME_TITLE_SNIPPET = 'Banquetes y Catering para Eventos en México'
const HOME_CANONICAL = `${BASE}/`

async function fetchSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`, {
    headers: { 'user-agent': UA },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`sitemap ${res.status}`)
  const xml = await res.text()
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  return [...new Set(locs)]
}

function extraProbeUrls() {
  // Known GA / legacy patterns not always in sitemap
  return [
    `${BASE}/bodasciudad-de-mexico`,
    `${BASE}/carpasmorelia`,
    `${BASE}/banquetes/2-tiemposmorelia`,
    `${BASE}/desayunospuerto-vallarta`,
    `${BASE}/cupcakes-gourmetciudad-de-mexico`,
    `${BASE}/banquete-kosherciudad-de-mexico`,
    `${BASE}/blogs/noticias/votos-matrimoniales-2024`,
    `${BASE}/collections/xv-anos-cdmx`,
    `${BASE}/products/tarima-madera`,
    `${BASE}/banquetes/ciudad-de-mexico`,
    `${BASE}/banquetes/cuernavaca`,
    `${BASE}/banquetes/3-tiempos/ciudad-de-mexico`,
    `${BASE}/desayunos/puerto-vallarta`,
    `${BASE}/cupcakes-gourmet/ciudad-de-mexico`,
  ]
}

async function probe(url) {
  const issues = []
  let status = 0
  let finalUrl = url
  let title = ''
  let canonical = ''
  let robots = ''
  let bytes = 0
  let redirects = 0
  let location = ''

  try {
    // First hop (manual) to see redirects
    let current = url
    for (let i = 0; i < 6; i++) {
      const res = await fetch(current, {
        method: 'GET',
        redirect: 'manual',
        headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml' },
      })
      status = res.status
      if (status >= 300 && status < 400) {
        const loc = res.headers.get('location') || ''
        location = loc
        redirects++
        if (!loc) {
          issues.push('redirect_without_location')
          break
        }
        current = new URL(loc, current).toString()
        continue
      }
      finalUrl = current
      const buf = Buffer.from(await res.arrayBuffer())
      bytes = buf.length
      const html = buf.toString('utf8')
      title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || ''
      const canonMatch =
        html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
        html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)
      canonical = canonMatch?.[1] || ''
      robots = (html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i) || [])[1] || ''

      if (status === 404 || status === 410) issues.push(`http_${status}`)
      if (status >= 500) issues.push(`http_${status}`)
      if (redirects >= 3) issues.push('redirect_chain_long')
      if (bytes > 0 && bytes < 1500) issues.push('tiny_html')
      if (/noindex/i.test(robots)) issues.push('noindex')

      const pathOnly = new URL(finalUrl).pathname.replace(/\/+$/, '') || '/'
      const isHome = pathOnly === '/'
      if (!isHome) {
        if (canonical === HOME_CANONICAL || canonical === `${HOME_CANONICAL}`) {
          issues.push('canonical_home')
        }
        if (title.includes(HOME_TITLE_SNIPPET)) {
          issues.push('title_home')
        }
        // Soft-404: small shell + home signals
        if (bytes > 0 && bytes < 8500 && (issues.includes('canonical_home') || issues.includes('title_home'))) {
          issues.push('soft404_spa_home')
        }
      }

      // Canonical should roughly match final URL (allow trailing slash diff)
      if (canonical) {
        try {
          const cPath = new URL(canonical).pathname.replace(/\/+$/, '') || '/'
          const fPath = pathOnly
          if (cPath !== fPath && cPath !== '/' && !issues.includes('canonical_home')) {
            // city alias ok if related; flag mismatch
            if (!fPath.endsWith(cPath) && !cPath.endsWith(fPath)) {
              issues.push('canonical_mismatch')
            }
          }
        } catch {
          issues.push('canonical_invalid')
        }
      } else if (status === 200 && bytes > 500) {
        issues.push('missing_canonical')
      }

      if (!title && status === 200) issues.push('missing_title')
      break
    }
    if (redirects >= 6) issues.push('redirect_loop_risk')
  } catch (err) {
    issues.push(`fetch_error:${err.message}`)
  }

  return {
    url,
    finalUrl,
    status,
    redirects,
    location,
    title: title.slice(0, 80),
    canonical,
    robots,
    bytes,
    issues: [...new Set(issues)],
  }
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx], idx)
      if ((idx + 1) % 100 === 0 || idx + 1 === items.length) {
        process.stderr.write(`  probed ${idx + 1}/${items.length}\n`)
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return out
}

async function main() {
  console.log(`SEO audit BASE=${BASE} concurrency=${CONCURRENCY}`)
  const sitemap = await fetchSitemapUrls()
  const extras = extraProbeUrls()
  const urls = [...new Set([...sitemap, ...extras])]
  console.log(`URLs to probe: ${urls.length} (sitemap=${sitemap.length}, extras=${extras.length})`)

  const results = await mapPool(urls, CONCURRENCY, (u) => probe(u))

  const byIssue = {}
  const flagged = []
  for (const r of results) {
    if (!r.issues.length) continue
    flagged.push(r)
    for (const iss of r.issues) {
      byIssue[iss] = (byIssue[iss] || 0) + 1
    }
  }

  const soft404 = results.filter((r) => r.issues.includes('soft404_spa_home'))
  const canonHome = results.filter((r) => r.issues.includes('canonical_home'))
  const titleHome = results.filter((r) => r.issues.includes('title_home'))
  const chains = results.filter((r) => r.issues.includes('redirect_chain_long'))
  const httpErr = results.filter((r) => r.issues.some((i) => i.startsWith('http_')))
  const noindex = results.filter((r) => r.issues.includes('noindex'))
  const gluedStill200 = results.filter(
    (r) =>
      /ciudad-de-mexico|morelia|puerto-vallarta|cdmx/i.test(new URL(r.url).pathname) &&
      !new URL(r.url).pathname.includes('/') === false &&
      /[a-z](ciudad-de-mexico|morelia|puerto-vallarta)$/.test(new URL(r.url).pathname.replace(/\/+$/, '')) &&
      r.status === 200,
  )

  const summary = {
    base: BASE,
    probedAt: new Date().toISOString(),
    totalProbed: results.length,
    clean: results.length - flagged.length,
    flagged: flagged.length,
    byIssue,
    soft404Count: soft404.length,
    canonicalHomeCount: canonHome.length,
    titleHomeCount: titleHome.length,
    redirectChainCount: chains.length,
    httpErrorCount: httpErr.length,
    noindexCount: noindex.length,
  }

  const outDir = join(ROOT, 'artifacts')
  try {
    writeFileSync(join('/tmp', 'seo-audit-summary.json'), JSON.stringify(summary, null, 2))
    writeFileSync(
      join('/tmp', 'seo-audit-soft404.json'),
      JSON.stringify(
        soft404.map((r) => ({ url: r.url, status: r.status, bytes: r.bytes, title: r.title, canonical: r.canonical })),
        null,
        2,
      ),
    )
    writeFileSync(
      join('/tmp', 'seo-audit-flagged.json'),
      JSON.stringify(
        flagged.map((r) => ({
          url: r.url,
          status: r.status,
          redirects: r.redirects,
          bytes: r.bytes,
          title: r.title,
          canonical: r.canonical,
          issues: r.issues,
        })),
        null,
        2,
      ),
    )
  } catch {
    /* ignore */
  }

  console.log('\n=== SUMMARY ===')
  console.log(JSON.stringify(summary, null, 2))
  console.log('\n=== Soft-404 samples (max 25) ===')
  for (const r of soft404.slice(0, 25)) {
    console.log(`  ${r.bytes}B ${r.url} | ${r.title.slice(0, 50)} | ${r.canonical}`)
  }
  console.log('\n=== Other flagged (non soft404, max 30) ===')
  for (const r of flagged.filter((x) => !x.issues.includes('soft404_spa_home')).slice(0, 30)) {
    console.log(`  [${r.issues.join(',')}] ${r.status} ${r.url}`)
  }
  console.log('\n=== Extras (legacy/glued) ===')
  for (const u of extras) {
    const r = results.find((x) => x.url === u)
    if (r) console.log(`  ${r.status} redirs=${r.redirects} ${r.issues.join('|') || 'ok'} ${u} → ${r.finalUrl}`)
  }

  // Exit non-zero if critical mass of soft404 (informational for CI optional)
  if (process.env.AUDIT_FAIL_ON_SOFT404 === '1' && soft404.length > 0) {
    process.exit(2)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
