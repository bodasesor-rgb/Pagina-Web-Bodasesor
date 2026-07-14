#!/usr/bin/env node
/**
 * Gate A — fail the build if dist/ is missing the SPA shell OR Nexus SEO landings.
 *
 * This is the Phase-1 hard gate: never ship a SPA-only (or SEO-only) dist/.
 *
 * Usage: node scripts/verify-dist-spa-and-nexus.mjs
 * Env:
 *   MIN_NEXUS_LANDINGS=1200  (default 1200; Phase-1 canonical inventory is 1402)
 *   DIST_DIR=dist            (optional override)
 *
 * Does NOT honor ALLOW_SPA_ONLY_DEPLOY — that escape hatch is intentionally ignored here.
 */
import { readdir, readFile, access } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, process.env.DIST_DIR || 'dist')
const MIN_NEXUS_LANDINGS = Number(process.env.MIN_NEXUS_LANDINGS || 1200)
const INVENTORY = join(__dirname, 'seo-landing-slugs.json')

/** Known Nexus landings that must exist after merge (smoke probes). */
const SMOKE_SLUGS = [
  'banquete-de-lujo-estado-de-mexico',
  'banquete-kosher-ciudad-de-mexico',
  'banquete-3-tiempos-a-domicilio-aguascalientes',
]

async function walkIndexHtml(dir, base = dir, found = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === 'assets' || entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkIndexHtml(full, base, found)
    } else if (entry.name === 'index.html') {
      const rel = full.slice(base.length + 1).replace(/\\/g, '/')
      if (rel !== 'index.html') found.push(rel)
    }
  }
  return found
}

async function isSeoLandingHtml(absPath) {
  try {
    const html = await readFile(absPath, 'utf8')
    if (!html.includes('seo-service-hero')) return false
    // SPA shell mistaken as landing
    if (html.includes('id="root"') && html.includes('/assets/index-')) return false
    return true
  } catch {
    return false
  }
}

async function countSeoLandings(dist) {
  const indexes = await walkIndexHtml(dist)
  let count = 0
  const seen = new Set()
  for (const rel of indexes) {
    // Prefer top-level {slug}/index.html; also count nexus-output-pages/{slug}
    const dir = rel.replace(/\/index\.html$/, '')
    const slug = dir.startsWith('nexus-output-pages/')
      ? dir.slice('nexus-output-pages/'.length)
      : dir
    if (!slug || slug.includes('/')) {
      // nested non-nexus paths — still ok if seo hero
      if (await isSeoLandingHtml(join(dist, rel))) {
        const key = slug
        if (!seen.has(key)) {
          seen.add(key)
          count++
        }
      }
      continue
    }
    if (seen.has(slug)) continue
    if (await isSeoLandingHtml(join(dist, rel))) {
      seen.add(slug)
      count++
    }
  }
  return { count, seen }
}

async function verifySpa(dist, issues) {
  const indexPath = join(dist, 'index.html')
  if (!existsSync(indexPath)) {
    issues.push('SPA missing: dist/index.html')
    return
  }
  const html = await readFile(indexPath, 'utf8')
  if (!html.includes('id="root"') && !/id=['"]root['"]/.test(html)) {
    issues.push('SPA dist/index.html missing #root (not a Vite SPA shell)')
  }
  if (!html.includes('/assets/')) {
    issues.push('SPA dist/index.html missing /assets/ references')
  }
  const assetsDir = join(dist, 'assets')
  if (!existsSync(assetsDir)) {
    issues.push('SPA missing: dist/assets/')
    return
  }
  const assets = await readdir(assetsDir)
  const js = assets.filter((f) => f.endsWith('.js'))
  if (js.length === 0) {
    issues.push('SPA missing: no .js files in dist/assets/')
  }
}

async function verifySmoke(dist, issues) {
  for (const slug of SMOKE_SLUGS) {
    const p = join(dist, slug, 'index.html')
    if (!existsSync(p)) {
      issues.push(`SEO smoke missing: dist/${slug}/index.html`)
      continue
    }
    if (!(await isSeoLandingHtml(p))) {
      issues.push(`SEO smoke invalid (no seo-service-hero): dist/${slug}/index.html`)
    }
  }
}

async function main() {
  console.log('══════════════════════════════════════════════════')
  console.log(' verify-dist-spa-and-nexus (Gate A)')
  console.log(` DIST=${DIST}`)
  console.log(` MIN_NEXUS_LANDINGS=${MIN_NEXUS_LANDINGS}`)
  console.log('══════════════════════════════════════════════════')

  const issues = []

  if (!existsSync(DIST)) {
    console.error('❌ dist/ missing — run build:nexus first')
    process.exit(1)
  }

  await verifySpa(DIST, issues)

  const { count, seen } = await countSeoLandings(DIST)
  console.log(`SEO landings with seo-service-hero: ${count}`)

  let expected = null
  if (existsSync(INVENTORY)) {
    try {
      const inv = JSON.parse(await readFile(INVENTORY, 'utf8'))
      expected = Number(inv.count) || (inv.slugs || []).length
      console.log(`Inventory canonical count: ${expected}`)
    } catch {
      /* ignore */
    }
  }

  if (count < MIN_NEXUS_LANDINGS) {
    issues.push(
      `SEO landings ${count} < MIN_NEXUS_LANDINGS ${MIN_NEXUS_LANDINGS} (would publish SPA-only / incomplete SEO)`,
    )
  }

  await verifySmoke(DIST, issues)

  // SPA must still win at root
  if (existsSync(join(DIST, 'index.html'))) {
    const root = await readFile(join(DIST, 'index.html'), 'utf8')
    if (root.includes('seo-service-hero') && !root.includes('id="root"')) {
      issues.push('dist/index.html looks like a Nexus landing — SPA root was overwritten')
    }
  }

  if (issues.length) {
    console.error('\n❌ verify-dist-spa-and-nexus FAILED:')
    for (const i of issues) console.error(`  - ${i}`)
    console.error('\nDo NOT deploy this dist/ (preview or prod). Fix sync/merge and rebuild.')
    if (expected) {
      console.error(`Canonical inventory size (Phase 1): ${expected}. 13k landings are Phase 2.`)
    }
    process.exit(1)
  }

  console.log(`✓ Gate A OK — SPA present + ${count} Nexus SEO landings (≥${MIN_NEXUS_LANDINGS})`)
  console.log(`  Smokes: ${SMOKE_SLUGS.join(', ')}`)
  // keep seen referenced for future debug
  void seen
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
