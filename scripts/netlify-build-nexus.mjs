#!/usr/bin/env node
/**
 * CANONICAL production / preview build for Pagina-Web-Bodasesor.
 *
 * ALWAYS use this (or `npm run build:nexus` / `npm run build:netlify`) before
 * publishing to bodasesor.com OR a Netlify deploy preview. Plain `npm run build`
 * / `vite build` is SPA-only and WILL wipe Nexus SEO landings on Netlify.
 *
 * Order:
 * 1) Optional Netlify ZIP snapshot
 * 2) Sync SEO landings from NEXUS_URL / production (seo-service-hero) — REQUIRED
 * 3) Build SPA
 * 4) Merge SEO into dist/ + guard + verify-dist-spa-and-nexus (Gate A)
 *
 * Env:
 *   NEXUS_URL=https://white-ferret-567834.hostingersite.com
 *   SITE_BASE=https://bodasesor.com
 *   MIN_NEXUS_LANDINGS=1200  (default; Phase-1 inventory = 1402)
 *   ALLOW_SPA_ONLY_DEPLOY=1  — emergency only (Gate A still fails unless you skip it)
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
    if (typeof m.landingsOnDisk === 'number') return m.landingsOnDisk
    if (typeof m.landingsSaved === 'number') return m.landingsSaved
  } catch {
    /* fall through */
  }
  return existsSync(LIVE) ? 1 : 0
}

console.log('══════════════════════════════════════════════════')
console.log(' netlify-build-nexus — SPA + preserve Nexus SEO')
console.log(` CONTEXT=${process.env.CONTEXT || '(none)'} preview=${isPreview} CI=${inCi}`)
console.log(` MIN_NEXUS_LANDINGS=${process.env.MIN_NEXUS_LANDINGS || 1200}`)
console.log('══════════════════════════════════════════════════')

if (allowSpaOnly) {
  console.warn(
    '\n⚠ ALLOW_SPA_ONLY_DEPLOY=1 set — sync may be optional, but Gate A (verify-dist-spa-and-nexus) still requires SPA+SEO unless you remove that step.',
  )
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

// Sync is REQUIRED for production AND deploy-preview (Phase 1: no SPA-only preview).
run(
  '1b Sync landings SEO desde NEXUS_URL / producción (obligatorio)',
  'node',
  ['scripts/sync-seo-from-live.mjs'],
  { optional: allowSpaOnly },
)

run('2/4 Build SPA + redirects', 'npm', ['run', 'build'])

if (existsSync(LIVE) && liveLandingCount() > 0) {
  run('3/4 Fusionar páginas Nexus/SEO en dist', 'node', ['scripts/merge-live-into-dist.mjs'])
  run('4a Parchear SEO Nexus (titles ≤60, lazy imgs, gtag)', 'node', ['scripts/patch-nexus-seo.mjs'], {
    optional: true,
  })
  run('4b Verificar Nexus en dist (guard)', 'node', ['scripts/guard-nexus-dist.mjs'])
} else if (!allowSpaOnly) {
  console.error('\n❌ Sin landings SEO en .netlify-live/ — abortando para no publicar SPA-only.')
  console.error('   Revisa NEXUS_URL / SITE_BASE o republica lotes desde Nexus.')
  console.error('   Preview y producción EXIGEN SPA + SEO (Phase 1).')
  process.exit(1)
} else {
  console.warn('\n⚠ ALLOW_SPA_ONLY_DEPLOY=1 — continuing without SEO merge (unsafe).')
}

// SPA product shells with correct title/canonical (after Nexus merge so we skip real landings)
run(
  '4c Prerender SPA SEO shells (meta + canonical por producto)',
  'node',
  ['scripts/prerender-spa-seo-shells.mjs'],
)

// Gate A — absolute: fail if SPA OR Nexus landings missing
run(
  '4c Gate A: verify-dist-spa-and-nexus (SPA + SEO)',
  'node',
  ['scripts/verify-dist-spa-and-nexus.mjs'],
)

run('Verificar redirects en dist', 'node', ['scripts/verify-redirects-deploy.mjs'])

console.log('\n✓ netlify-build-nexus listo (SPA + Nexus SEO preservado, Gate A OK)')
