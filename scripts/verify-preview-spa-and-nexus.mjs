#!/usr/bin/env node
/**
 * Gate B — verify a deployed URL (Netlify deploy preview or prod) has SPA + SEO + CSS.
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
const MIN_CSS_BYTES = Number(process.env.MIN_SEO_CSS_BYTES || 10_000)

const SMOKES = [
  '/',
  '/banquete-de-lujo-estado-de-mexico/',
  '/banquete-kosher-ciudad-de-mexico/',
  '/banquete-3-tiempos-a-domicilio-aguascalientes/',
]

async function fetchRes(path, accept = 'text/html') {
  const url = `${BASE}${path}`
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: accept },
    redirect: 'follow',
  })
  const buf = Buffer.from(await res.arrayBuffer())
  const text = buf.toString('utf8')
  return {
    url,
    status: res.status,
    html: text,
    bytes: buf.length,
    contentType: res.headers.get('content-type') || '',
  }
}

function isSpaHome(html) {
  return html.includes('id="root"') && /\/assets\//.test(html)
}

function isSeoLanding(html) {
  return html.includes('seo-service-hero') && !(html.includes('id="root"') && html.includes('/assets/index-'))
}

function looksLikeCss(text, contentType) {
  const head = String(text || '').trimStart().slice(0, 400)
  if (head.startsWith('<!DOCTYPE') || head.startsWith('<html')) return false
  if (/text\/css/i.test(contentType)) return true
  return /:root|--navy|\.seo-service-hero|font-family/.test(head) || head.includes('{')
}

async function main() {
  if (!BASE) {
    console.error('Usage: PREVIEW_URL=https://... node scripts/verify-preview-spa-and-nexus.mjs')
    process.exit(1)
  }
  console.log(`Gate B — checking ${BASE}`)
  const issues = []

  for (const path of SMOKES) {
    const { url, status, html, bytes } = await fetchRes(path)
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

  const css = await fetchRes('/css/seo-landing.css', 'text/css,*/*;q=0.1')
  console.log(
    `  ${css.status} ${css.bytes}B type=${css.contentType || '(none)'} ${css.url}`,
  )
  if (css.status !== 200) {
    issues.push(`/css/seo-landing.css HTTP ${css.status}`)
  } else if (css.bytes < MIN_CSS_BYTES) {
    issues.push(
      `/css/seo-landing.css too small (${css.bytes}B < ${MIN_CSS_BYTES}) — SPA soft-404 HTML?`,
    )
  } else if (!looksLikeCss(css.html, css.contentType)) {
    issues.push('/css/seo-landing.css body looks like HTML, not CSS')
  }

  if (issues.length) {
    console.error('\n❌ Gate B FAILED:')
    for (const i of issues) console.error(`  - ${i}`)
    process.exit(1)
  }
  console.log('\n✓ Gate B OK — SPA home + SEO smokes + seo-landing.css')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
