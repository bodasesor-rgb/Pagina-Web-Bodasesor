#!/usr/bin/env node
/**
 * CANONICAL production / preview build for Pagina-Web-Bodasesor.
 *
 * ALWAYS use this (or `npm run build:nexus` / `npm run build:netlify`) before
 * publishing to bodasesor.com OR a Netlify deploy preview. Plain `npm run build`
 * / `vite build` is SPA-only and WILL wipe Nexus SEO landings on Netlify.
 *
 * Order:
 * 1) Optional Netlify ZIP snapshot (preserves blog/ if ZIP is wiped)
 * 1b) Sync SEO landings — REQUIRED
 * 1c) Ensure blog seed + sync blogs — REQUIRED (fail if rich blogs missing)
 * 1d) Sync blog images from NEXUS_URL — REQUIRED (sibling *.webp under /blog/{slug}/)
 * 2) Build SPA
 * 3) Merge SEO + blogs into dist/
 * 4) Patch / guard Nexus + blogs + images + finalize sitemap + prerender + Gate A
 *
 * Env:
 *   NEXUS_URL=https://white-ferret-567834.hostingersite.com
 *   SITE_BASE=https://bodasesor.com
 *   MIN_NEXUS_LANDINGS=1200
 *   MIN_BLOG_PAGES=50
 *   MIN_BLOG_IMAGES=50
 *   MIN_SEO_CSS_BYTES=10000
 *   ALLOW_SPA_ONLY_DEPLOY=1  — emergency only
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LIVE = join(ROOT, '.netlify-live')
const allowSpaOnly = process.env.ALLOW_SPA_ONLY_DEPLOY === '1'
if (process.env.SEO_SYNC_FORCE !== '0') {
  process.env.SEO_SYNC_FORCE = '1'
}
const inCi = process.env.CI === 'true'
const isPreview =
  process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy'
const MIN_BLOG_PAGES = Number(process.env.MIN_BLOG_PAGES || 50)

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

function liveBlogRichHint() {
  if (!existsSync(join(LIVE, 'blog'))) return 0
  try {
    const listing = spawnSync(
      'bash',
      ['-lc', `find "${join(LIVE, 'blog')}" -name index.html 2>/dev/null | wc -l`],
      { encoding: 'utf8' },
    )
    return Number(String(listing.stdout || '0').trim()) || 0
  } catch {
    return 0
  }
}

console.log('══════════════════════════════════════════════════')
console.log(' netlify-build-nexus — SPA + preserve Nexus SEO + blogs')
console.log(` CONTEXT=${process.env.CONTEXT || '(none)'} preview=${isPreview} CI=${inCi}`)
console.log(` NEXUS_URL=${process.env.NEXUS_URL || 'https://white-ferret-567834.hostingersite.com'}`)
console.log(` SEO_SYNC_FORCE=${process.env.SEO_SYNC_FORCE || '(off)'}`)
console.log(` MIN_NEXUS_LANDINGS=${process.env.MIN_NEXUS_LANDINGS || 1200}`)
console.log(` MIN_BLOG_PAGES=${MIN_BLOG_PAGES}`)
console.log('══════════════════════════════════════════════════')

if (allowSpaOnly) {
  console.warn(
    '\n⚠ ALLOW_SPA_ONLY_DEPLOY=1 set — sync may be optional, but Gate A still requires SPA+SEO unless you skip it.',
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

// Static blogs: seed (durable) + live refresh — REQUIRED so SPA deploys cannot wipe them
run(
  '1c Ensure + sync blogs estáticos (seed durable, no pisar ricos)',
  'node',
  ['scripts/sync-blogs-from-live.mjs'],
  { optional: allowSpaOnly },
)

// Blog article images (sibling *.webp under /blog/{slug}/) — REQUIRED so URLs are not SPA HTML
run(
  '1d Sync imágenes de blog desde NEXUS_URL (public/blog + .netlify-live)',
  'node',
  ['scripts/sync-blog-images-from-nexus.mjs'],
  { optional: allowSpaOnly },
)

run('2/4 Build SPA + redirects', 'npm', ['run', 'build'])

const hasSeo = existsSync(LIVE) && liveLandingCount() > 0
const hasBlogs = liveBlogRichHint() > 0

if (hasSeo || hasBlogs) {
  run('3/4 Fusionar Nexus/SEO + blogs en dist', 'node', ['scripts/merge-live-into-dist.mjs'])
  run('4a Parchear SEO Nexus (CSS blocking, titles, lazy imgs, gtag)', 'node', ['scripts/patch-nexus-seo.mjs'], {
    optional: true,
  })
  if (hasSeo) {
    run('4b Verificar Nexus en dist (guard)', 'node', ['scripts/guard-nexus-dist.mjs'])
  }
  run('4b2 Verificar blogs estáticos en dist (guard OBLIGATORIO)', 'node', ['scripts/guard-blogs-dist.mjs'], {
    optional: allowSpaOnly,
  })
  run(
    '4b3 Verificar imágenes de blog en dist (OBLIGATORIO)',
    'node',
    ['scripts/guard-blog-images-dist.mjs'],
    { optional: allowSpaOnly },
  )
  run(
    '4b4 Finalize sitemap (SPA + Nexus dist landings + blogs)',
    'node',
    ['scripts/finalize-sitemap.mjs'],
  )
} else if (!allowSpaOnly) {
  console.error('\n❌ Sin landings SEO ni blogs en .netlify-live/ — abortando para no publicar SPA-only.')
  console.error('   Revisa NEXUS_URL / SITE_BASE / seo-seed/netlify-blog-seed.tgz')
  process.exit(1)
} else {
  console.warn('\n⚠ ALLOW_SPA_ONLY_DEPLOY=1 — continuing without SEO/blog merge (unsafe).')
}

// SPA product shells AFTER merge so rich blogs / Nexus are skipped, not overwritten
run(
  '4c Prerender SPA SEO shells (meta + canonical por producto)',
  'node',
  ['scripts/prerender-spa-seo-shells.mjs'],
)

// Re-check blogs after prerender (must not have been replaced by SPA shells)
run(
  '4c2 Re-verificar blogs tras prerender (no pisar)',
  'node',
  ['scripts/guard-blogs-dist.mjs'],
  { optional: allowSpaOnly },
)

// Gate A — absolute: fail if SPA OR Nexus landings missing
run(
  '4d Gate A: verify-dist-spa-and-nexus (SPA + SEO + blogs)',
  'node',
  ['scripts/verify-dist-spa-and-nexus.mjs'],
)

run('Verificar redirects en dist', 'node', ['scripts/verify-redirects-deploy.mjs'])

console.log('\n✓ netlify-build-nexus listo (SPA + Nexus SEO + blogs preservados, Gate A OK)')
