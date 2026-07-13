#!/usr/bin/env node
/**
 * Fail the build if dist/ is missing Nexus SEO landings after merge.
 * Prevents publishing SPA-only deploys that wipe ~1,700 SEO pages.
 */
import { readdir, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const MIN_NEXUS_LANDINGS = 50

async function walkIndexHtml(dir, base = dir, found = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === 'assets' || entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkIndexHtml(full, base, found)
    } else if (entry.name === 'index.html') {
      const rel = full.slice(base.length + 1)
      if (rel !== 'index.html') found.push(rel)
    }
  }
  return found
}

function isNexusLanding(relPath) {
  const dir = relPath.replace(/\/index\.html$/, '')
  if (!dir || dir === 'index.html') return false
  if (dir.startsWith('assets/')) return false
  return (
    dir.includes('-a-domicilio-') ||
    dir.startsWith('eventos/') ||
    dir.startsWith('nexus-output-pages/') ||
    /^[a-z0-9-]+-[a-z0-9-]+-[a-z0-9-]+/.test(dir)
  )
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('guard-nexus-dist: dist/ missing')
    process.exit(1)
  }

  const all = await walkIndexHtml(DIST)
  const nexus = all.filter(isNexusLanding)

  console.log(`guard-nexus-dist: ${nexus.length} Nexus landings in dist/ (${all.length} total index.html)`)

  if (nexus.length >= MIN_NEXUS_LANDINGS) {
    console.log('✓ Nexus SEO landings present')
    return
  }

  if (process.env.ALLOW_SPA_ONLY_DEPLOY === '1') {
    console.warn(
      `\n⚠ ALLOW_SPA_ONLY_DEPLOY=1 — publishing SPA-only (${nexus.length} Nexus landings in dist/).`,
    )
    console.warn('  Re-deploy Nexus SEO immediately after this publish.')
    return
  }

  console.error(
    `\n❌ Nexus guard failed: only ${nexus.length} SEO landings (need ≥${MIN_NEXUS_LANDINGS}).`,
  )
  console.error('  Run: npm run sync:netlify && npm run build:safe')
  console.error('  Or re-deploy Nexus SEO first, then merge before SPA publish.')
  console.error('  Publishing now would wipe ~1,700 SEO pages from bodasesor.com.')
  process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
