#!/usr/bin/env node
/**
 * Gate: Nexus landings + prerendered SPA shells must have apex canonical with trailing slash.
 * Catches the GSC bucket "Duplicada: sin canónica del usuario" before deploy.
 *
 * Usage: node scripts/audit-canonical-dist.mjs
 * Env: MIN_CANONICAL_NEXUS=1000  DIST_DIR=dist
 */
import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { absoluteUrl } from './lib/seo-canonical.mjs'
import { isNexusLandingHtml } from './lib/nexus-html.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, process.env.DIST_DIR || 'dist')
const MIN_NEXUS = Number(process.env.MIN_CANONICAL_NEXUS || process.env.MIN_NEXUS_LANDINGS || 1000)
const SITE_BASE = 'https://bodasesor.com'

function pathFromIndex(abs, base) {
  const rel = relative(base, abs).replace(/\\/g, '/')
  if (rel === 'index.html') return '/'
  return `/${rel.replace(/\/index\.html$/, '')}`
}

function extractCanonical(html) {
  const m = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)
  return m ? m[1].trim() : ''
}

function extractOgUrl(html) {
  const m = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i)
  return m ? m[1].trim() : ''
}

function isSpaSeoShell(html) {
  if (isNexusLandingHtml(html)) return false
  if (/name=["']robots["'][^>]+noindex/i.test(html)) return false
  return (
    html.includes('id="spa-lcp-prerender"') ||
    (html.includes('rel="canonical"') && html.includes('name="description"'))
  )
}

function isBadHost(href) {
  if (!href) return true
  return (
    /hostingersite\.com/i.test(href) ||
    /www\.bodasesor\.com/i.test(href) ||
    !href.startsWith(SITE_BASE)
  )
}

async function walkIndexHtml(dir, base = dir, out = []) {
  if (!existsSync(dir)) return out
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'assets' || e.name === 'node_modules') continue
      await walkIndexHtml(full, base, out)
    } else if (e.name === 'index.html') {
      out.push(full)
    }
  }
  return out
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('❌ audit-canonical-dist: dist/index.html missing')
    process.exit(1)
  }

  const indexes = await walkIndexHtml(DIST)
  const issues = []
  let nexusOk = 0
  let nexusTotal = 0
  let spaOk = 0
  let spaTotal = 0

  for (const abs of indexes) {
    const path = pathFromIndex(abs, DIST)
    if (path === '/' || path.startsWith('/assets') || path.startsWith('/buscar')) continue

    const html = await readFile(abs, 'utf8')
    const isNexus = isNexusLandingHtml(html)
    const isSpaSeo = isSpaSeoShell(html)

    if (!isNexus && !isSpaSeo) continue

    const expected = absoluteUrl(path)
    const canonical = extractCanonical(html)
    const ogUrl = extractOgUrl(html)

    if (isNexus) {
      nexusTotal++
      if (!canonical || isBadHost(canonical) || canonical !== expected) {
        issues.push(`nexus missing/bad canonical: ${path} → got "${canonical || '(none)'}" want "${expected}"`)
      } else {
        nexusOk++
      }
      if (ogUrl && ogUrl !== expected && !isBadHost(ogUrl)) {
        issues.push(`nexus og:url mismatch: ${path} → "${ogUrl}"`)
      }
    }

    if (isSpaSeo) {
      spaTotal++
      if (!canonical || canonical !== expected) {
        issues.push(`spa missing/bad canonical: ${path} → got "${canonical || '(none)'}" want "${expected}"`)
      } else {
        spaOk++
      }
    }
  }

  const minNexusRequired =
    nexusTotal >= MIN_NEXUS ? MIN_NEXUS : nexusTotal > 0 ? nexusTotal : MIN_NEXUS
  const failures = []
  if (nexusTotal > 0 && nexusOk < minNexusRequired) {
    failures.push(
      `Only ${nexusOk}/${nexusTotal} Nexus pages with valid canonical (need ≥${minNexusRequired})`,
    )
  }
  if (nexusTotal === 0 && nexusOk < MIN_NEXUS) {
    failures.push(`No Nexus landings found in dist (need ≥${MIN_NEXUS} for production)`)
  }
  if (issues.length) {
    failures.push(...issues.slice(0, 20))
    if (issues.length > 20) failures.push(`… and ${issues.length - 20} more canonical issues`)
  }

  if (failures.length) {
    console.error('❌ audit-canonical-dist failed:\n' + failures.join('\n'))
    process.exit(1)
  }

  console.log(
    `✓ Canonical audit OK — Nexus ${nexusOk}/${nexusTotal}, SPA shells ${spaOk}/${spaTotal} (${indexes.length} index.html scanned)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
