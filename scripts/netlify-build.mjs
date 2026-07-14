#!/usr/bin/env node
/**
 * Netlify build: preserve Nexus/SEO pages, then build SPA.
 *
 * Order:
 * 1) Try Netlify deploy ZIP snapshot (optional — often missing Nexus files)
 * 2) Sync live SEO landings via sitemap HTTP (seo-service-hero)
 * 3) Build SPA
 * 4) Merge SEO into dist + guard
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LIVE = join(ROOT, '.netlify-live')
const allowSpaOnly = process.env.ALLOW_SPA_ONLY_DEPLOY === '1'
const inCi = process.env.CI === 'true'
const isPreview =
  process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy'

function run(label, cmd, args, { optional = false } = {}) {
  console.log(`\n▶ ${label}`)
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: false })
  if (r.status !== 0 && !optional) process.exit(r.status ?? 1)
  return r.status === 0
}

function liveLandingCount() {
  if (!existsSync(join(LIVE, '.manifest.json'))) return 0
  try {
    const m = JSON.parse(readFileSync(join(LIVE, '.manifest.json'), 'utf8'))
    if (typeof m.landingsSaved === 'number') return m.landingsSaved
  } catch {
    /* fall through */
  }
  return existsSync(LIVE) ? 1 : 0
}

const hasNetlifyCreds =
  Boolean(process.env.NETLIFY_AUTH_TOKEN) &&
  Boolean(process.env.NETLIFY_SITE_ID || process.env.SITE_ID)

if (hasNetlifyCreds && process.env.SKIP_NETLIFY_ZIP !== '1') {
  const siteRef = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  console.log(`Netlify ZIP snapshot opcional (site ${String(siteRef).slice(0, 8)}…)`)
  run('1a Descargar ZIP Netlify (opcional)', 'node', ['scripts/pull-netlify-live.mjs'], {
    optional: true,
  })
} else {
  console.log('ZIP Netlify omitido (SKIP_NETLIFY_ZIP o sin creds) — sync HTTP')
}

// Always try HTTP sync from live production / NEXUS_URL — this is what preserves
 // landings when Netlify ZIPs have 0 SEO files.
run(
  '1b Sync landings SEO desde producción/sitemap',
  'node',
  ['scripts/sync-seo-from-live.mjs'],
  { optional: allowSpaOnly },
)

run('2/4 Build SPA + redirects', 'npm', ['run', 'build'])

if (existsSync(LIVE) && liveLandingCount() > 0) {
  run('3/4 Fusionar páginas Nexus/SEO en dist', 'node', ['scripts/merge-live-into-dist.mjs'])
  run('4a Parchear SEO Nexus (titles ≤60, lazy imgs)', 'node', ['scripts/patch-nexus-seo.mjs'], {
    optional: true,
  })
  run('4b Verificar Nexus en dist', 'node', ['scripts/guard-nexus-dist.mjs'])
} else if (!allowSpaOnly && inCi) {
  console.error('\n❌ Sin landings SEO en .netlify-live/ — abortando para no borrar Nexus.')
  console.error('   Revisa NEXUS_URL / SITE_BASE o republica lotes desde Nexus.')
  process.exit(1)
} else if (allowSpaOnly) {
  console.warn('\n⚠ ALLOW_SPA_ONLY_DEPLOY=1 — build SPA-only (re-deploy Nexus after publish).')
}

run('Verificar redirects en dist', 'node', ['scripts/verify-redirects-deploy.mjs'])

console.log('\n✓ Netlify build listo')
