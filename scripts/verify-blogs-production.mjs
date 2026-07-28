#!/usr/bin/env node
/**
 * Post-deploy smoke: static blogs still rich on production (not SPA shells).
 * Usage: node scripts/verify-blogs-production.mjs
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { browserNavHeaders } from './lib/browser-fetch-headers.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BASE = (process.env.SITE_BASE || 'https://bodasesor.com').replace(/\/$/, '')
const SLUG_LIST = join(ROOT, 'seo-seed', 'blog-slugs.txt')
const MIN_BYTES = 20_000

const FIXED = [
  '/blog/articulos',
  '/blog/5-claves-para-elegir-el-salon-de-eventos-ideal-para-el-lanzamiento-de-tu-marca',
  '/blog/5-errores-comunes-al-contratar-el-catering-de-tu-evento-corporativo-y-como-evitarlos',
  '/blog/5-tradiciones-de-boda-que-ya-pasaron-de-moda-y-cuales-las-reemplazan',
]

function isSpaShell(html) {
  return html.includes('id="root"') && /\/assets\/index-[^"']+\.js/.test(html)
}

function isRich(html) {
  if (!html || isSpaShell(html)) return false
  if (html.includes('Bodasesor Eventos Blog')) return true
  return html.length >= MIN_BYTES
}

function sampleSlugs(n = 8) {
  if (!existsSync(SLUG_LIST)) return []
  const all = readFileSync(SLUG_LIST, 'utf8')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
  // deterministic sample from start + middle
  const picks = new Set(all.slice(0, 4))
  const mid = Math.floor(all.length / 2)
  for (let i = mid; i < mid + 4 && i < all.length; i++) picks.add(all[i])
  return [...picks].slice(0, n).map((s) => `/blog/${s}`)
}

async function check(path) {
  const url = `${BASE}${path}/`.replace(/([^:]\/)\/+/g, '$1')
  const res = await fetch(url, { headers: browserNavHeaders(), redirect: 'follow' })
  const html = await res.text()
  const bytes = Buffer.byteLength(html, 'utf8')
  const ok = res.ok && isRich(html)
  const issues = []
  if (!res.ok) issues.push(`HTTP ${res.status}`)
  if (isSpaShell(html)) issues.push('SPA shell (blog wiped)')
  if (bytes < MIN_BYTES && !html.includes('Bodasesor Eventos Blog')) {
    issues.push(`${bytes}B too small`)
  }
  console.log(`${ok ? '✓' : '✗'} ${path} → ${res.status} ${bytes}B${issues.length ? ' — ' + issues.join('; ') : ''}`)
  return ok
}

async function main() {
  const paths = [...new Set([...FIXED, ...sampleSlugs(8)])]
  console.log(`verify-blogs-production: ${paths.length} URLs @ ${BASE}`)
  let failed = 0
  for (const p of paths) {
    const ok = await check(p)
    if (!ok) failed++
  }
  if (failed) {
    console.error(`\n❌ ${failed} blog(s) wiped or thin on production`)
    process.exit(1)
  }
  console.log('\n✓ Static blogs OK on production')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
