#!/usr/bin/env node
/**
 * Smoke-test that bodasesor.com still serves Nexus SEO landings (not SPA-only shell).
 * Usage: node scripts/verify-nexus-production.mjs
 *
 * Fails when a known landing URL returns the generic SPA index (~7 KB) instead of
 * static Nexus HTML (>15 KB with city/service-specific title).
 */
const UA =
  'Mozilla/5.0 (compatible; BodasesorNexusVerify/1.0; +https://bodasesor.com)'

const SPA_HOME_TITLE = 'Banquetes y Catering para Eventos en México | Bodasesor'

/** Known Nexus landings — service × city paths published by Seo-Nexus-2.0 */
const PROBES = [
  {
    url: 'https://bodasesor.com/banquete-de-lujo-estado-de-mexico/',
    minBytes: 12_000,
    titleMustInclude: ['Banquete', 'México'],
    mustInclude: ['seo-service-hero'],
  },
  {
    url: 'https://bodasesor.com/banquete-3-tiempos-a-domicilio-aguascalientes/',
    minBytes: 12_000,
    titleMustInclude: ['Banquete', 'Aguascalientes'],
    mustInclude: ['seo-service-hero'],
  },
  {
    url: 'https://bodasesor.com/banquete-kosher-ciudad-de-mexico/',
    minBytes: 12_000,
    titleMustInclude: ['Kosher', 'México'],
    mustInclude: ['seo-service-hero'],
  },
]

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i)
  return m ? m[1].trim() : ''
}

function isSpaShell(html, title) {
  if (html.includes('id="root"') && html.includes('/assets/index-')) return true
  if (title === SPA_HOME_TITLE) return true
  if (/<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/bodasesor\.com\/?["']/i.test(html)) {
    return true
  }
  return false
}

async function checkProbe(probe) {
  const res = await fetch(probe.url, {
    headers: { 'User-Agent': UA, Accept: 'text/html' },
    redirect: 'follow',
  })
  const html = await res.text()
  const bytes = Buffer.byteLength(html, 'utf8')
  const title = extractTitle(html)

  const issues = []

  if (!res.ok) issues.push(`HTTP ${res.status}`)
  if (isSpaShell(html, title)) {
    issues.push('SPA shell (Nexus landing missing — deploy likely wiped SEO pages)')
  }
  if (bytes < probe.minBytes) {
    issues.push(`${bytes} bytes (expected ≥${probe.minBytes})`)
  }
  for (const needle of probe.titleMustInclude) {
    if (!title.includes(needle) && !html.includes(needle)) {
      issues.push(`missing "${needle}" in title/content`)
    }
  }
  for (const needle of probe.mustInclude || []) {
    if (!html.includes(needle)) {
      issues.push(`missing "${needle}" (not SEO HTML)`)
    }
  }

  const ok = issues.length === 0
  console.log(
    `${ok ? '✓' : '✗'} ${probe.url}`,
    `\n    title: ${title.slice(0, 80)}${title.length > 80 ? '…' : ''}`,
    `\n    size: ${bytes} bytes`,
    issues.length ? `\n    → ${issues.join('; ')}` : '',
  )
  return ok ? 0 : 1
}

let failed = 0
for (const probe of PROBES) {
  failed += await checkProbe(probe)
}

if (failed) {
  console.error(
    `\n❌ ${failed} Nexus production check(s) failed.`,
    '\n   Las landings SEO no están en bodasesor.com.',
    '\n   1. Re-ejecuta deploy en Seo-Nexus-2.0 (Nexus SEO)',
    '\n   2. O usa npm run build:safe antes de publicar el SPA',
    '\n   3. No vuelvas a desplegar SPA-only con netlify-cli deploy --prod --dir=dist',
  )
  process.exit(1)
}

console.log('\n✓ Nexus SEO landings present in production')
