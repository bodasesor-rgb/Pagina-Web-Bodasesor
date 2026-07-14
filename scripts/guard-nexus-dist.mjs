#!/usr/bin/env node
/**
 * Fail the build if dist/ is missing Nexus SEO landings after merge.
 * Prevents publishing SPA-only deploys that wipe SEO landings.
 *
 * Env:
 *   MIN_NEXUS_LANDINGS=1200  (default 1200; Phase-1 inventory = 1402)
 *   ALLOW_SPA_ONLY_DEPLOY=1  — emergency escape (avoid in preview/prod)
 */
import { readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const MIN_NEXUS_LANDINGS = Number(process.env.MIN_NEXUS_LANDINGS || 1200)

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

async function isSeoLanding(relPath) {
  const abs = join(DIST, relPath)
  try {
    const html = await readFile(abs, 'utf8')
    if (!html.includes('seo-service-hero')) return false
    if (html.includes('id="root"') && html.includes('/assets/index-')) return false
    return true
  } catch {
    return false
  }
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('guard-nexus-dist: dist/ missing')
    process.exit(1)
  }

  const all = await walkIndexHtml(DIST)
  const nexus = []
  for (const rel of all) {
    if (await isSeoLanding(rel)) nexus.push(rel)
  }

  // Dedupe slug vs nexus-output-pages/{slug}
  const slugs = new Set(
    nexus.map((rel) => {
      const dir = rel.replace(/\/index\.html$/, '')
      return dir.startsWith('nexus-output-pages/') ? dir.slice('nexus-output-pages/'.length) : dir
    }),
  )

  console.log(
    `guard-nexus-dist: ${slugs.size} Nexus SEO landings in dist/ (${all.length} nested index.html, MIN=${MIN_NEXUS_LANDINGS})`,
  )

  if (slugs.size >= MIN_NEXUS_LANDINGS) {
    console.log('✓ Nexus SEO landings present')
    return
  }

  if (process.env.ALLOW_SPA_ONLY_DEPLOY === '1') {
    console.warn(
      `\n⚠ ALLOW_SPA_ONLY_DEPLOY=1 — publishing SPA-only (${slugs.size} Nexus landings in dist/).`,
    )
    console.warn('  Re-deploy Nexus SEO immediately after this publish.')
    return
  }

  console.error(
    `\n❌ Nexus guard failed: only ${slugs.size} SEO landings (need ≥${MIN_NEXUS_LANDINGS}).`,
  )
  console.error('  Run: npm run build:nexus')
  console.error('  Or set MIN_NEXUS_LANDINGS lower only for local debug (never on prod/preview).')
  console.error('  Publishing now would wipe Nexus SEO pages from bodasesor.com.')
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
