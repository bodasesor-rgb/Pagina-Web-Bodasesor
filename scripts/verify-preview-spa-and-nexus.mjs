#!/usr/bin/env node
/**
 * Gate B — verify a deployed URL (Netlify deploy preview or prod) has SPA + SEO.
 *
 * Usage:
 *   PREVIEW_URL=https://deploy-preview-XX--site.netlify.app node scripts/verify-preview-spa-and-nexus.mjs
 *   # or
 *   node scripts/verify-preview-spa-and-nexus.mjs https://your-preview-url
 *
 * Never use this as a reason to deploy --prod; it only checks an already-published URL.
 */
const BASE = (process.argv[2] || process.env.PREVIEW_URL || '').replace(/\/$/, '')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const SMOKES = [
  '/',
  '/banquete-de-lujo-estado-de-mexico/',
  '/banquete-kosher-ciudad-de-mexico/',
  '/banquete-3-tiempos-a-domicilio-aguascalientes/',
]

async function fetchText(path) {
  const url = `${BASE}${path}`
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html' }, redirect: 'follow' })
  const html = await res.text()
  return { url, status: res.status, html, bytes: Buffer.byteLength(html, 'utf8') }
}

function isSpaHome(html) {
  return html.includes('id="root"') && /\/assets\//.test(html)
}

function isSeoLanding(html) {
  return html.includes('seo-service-hero') && !(html.includes('id="root"') && html.includes('/assets/index-'))
}

async function main() {
  if (!BASE) {
    console.error('Usage: PREVIEW_URL=https://... node scripts/verify-preview-spa-and-nexus.mjs')
    process.exit(1)
  }
  console.log(`Gate B — checking ${BASE}`)
  const issues = []

  for (const path of SMOKES) {
    const { url, status, html, bytes } = await fetchText(path)
    console.log(`  ${status} ${bytes}B ${url}`)
    if (!status || status >= 400) {
      issues.push(`${path} HTTP ${status}`)
      continue
    }
    if (path === '/') {
      if (!isSpaHome(html)) issues.push(`${path} is not SPA shell`)
      if (isSeoLanding(html) && !isSpaHome(html)) issues.push(`${path} overwritten by Nexus HTML`)
    } else {
      if (!isSeoLanding(html)) {
        issues.push(`${path} missing seo-service-hero (SPA shell or wrong page; ${bytes}B)`)
      }
      if (bytes < 12_000) issues.push(`${path} too small (${bytes}B) — likely SPA-only shell`)
    }
  }

  if (issues.length) {
    console.error('\n❌ Gate B FAILED:')
    for (const i of issues) console.error(`  - ${i}`)
    process.exit(1)
  }
  console.log('\n✓ Gate B OK — preview/prod URL has SPA home + SEO smokes')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
