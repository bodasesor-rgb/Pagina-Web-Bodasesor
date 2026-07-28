#!/usr/bin/env node
/**
 * Lighthouse audit matrix for bodasesor.com pages.
 * Usage: node scripts/audit-pagespeed.mjs [baseUrl] [--mobile] [--limit N]
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BASE = process.argv.find((a) => a.startsWith('http')) || 'https://bodasesor.com'
const MOBILE = process.argv.includes('--mobile')
const LIMIT = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] || 0)

const CATEGORIES = [
  'performance',
  'accessibility',
  'best-practices',
  'seo',
  'agentic-browsing',
]

function chromePath() {
  const r = spawnSync('which', ['google-chrome', 'chromium', 'chromium-browser'], { encoding: 'utf8' })
  return r.stdout.trim().split('\n').find(Boolean) || '/usr/bin/google-chrome'
}

function collectPaths() {
  const lines = readFileSync(join(ROOT, 'public/_redirects'), 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#'))

  const dests = [...new Set(
    lines.map((l) => l.split(/\s+/)[1]).filter((t) => t?.startsWith('/') && t !== '/index.html'),
  )]

  const core = [
    '/',
    '/banquetes-catering',
    '/barras-de-bebidas',
    '/mesas-personalizadas',
    '/salas-periqueras',
    '/pistas-tarimas',
    '/vajillas',
    '/colgantes',
    '/floreria',
    '/shows',
    '/musica',
    '/fotografia',
    '/wedding-planner',
    '/reposteria',
    '/espacios-eventos',
    '/carpas',
    '/audio-iluminacion-video',
    '/galeria',
    '/quienes-somos',
    '/blog',
    '/blog/articulos/',
    '/buscar',
    '/bodas',
    '/xv-anos',
    '/corporativos',
    '/graduaciones',
    '/ciudad-de-mexico',
    '/guadalajara',
    '/monterrey',
    '/bodas/ciudad-de-mexico',
    '/banquetes-catering/ciudad-de-mexico',
    '/sillas/tiffany',
    '/sillas/tiffany/ciudad-de-mexico',
    '/mesas/imperial',
    '/banquetes/menu-ejecutivo',
    '/pistas-tarimas/tarima-madera',
    '/espacios-eventos/salones/ciudad-de-mexico',
    '/eventos/bodas-cdmx',
    '/bocadillos',
    '/paella',
    '/barra-bebidas',
  ]

  const merged = [...new Set([...core, ...dests])]
  if (LIMIT > 0) return merged.slice(0, LIMIT)
  return merged
}

function runLighthouse(url, outPath) {
  const args = [
    'lighthouse',
    url,
    `--output=json`,
    `--output-path=${outPath}`,
    `--quiet`,
    `--chrome-flags=--headless --no-sandbox --disable-gpu`,
    `--only-categories=${CATEGORIES.join(',')}`,
  ]
  if (MOBILE) {
    args.push('--form-factor=mobile', '--screenEmulation.mobile=true')
  } else {
    args.push('--preset=desktop')
  }

  const r = spawnSync('npx', args, {
    env: { ...process.env, CHROME_PATH: chromePath() },
    encoding: 'utf8',
    timeout: 120000,
  })
  return r.status === 0
}

function scoreReport(report) {
  const scores = {}
  for (const cat of CATEGORIES) {
    const c = report.categories?.[cat]
    if (!c) {
      scores[cat] = null
      continue
    }
    if (cat === 'agentic-browsing') {
      // fractional score e.g. "3/3" or numeric
      scores[cat] = c.displayValue || (c.score != null ? Math.round(c.score * 100) : null)
    } else {
      scores[cat] = c.score != null ? Math.round(c.score * 100) : null
    }
  }
  return scores
}

function failingAudits(report) {
  const fails = []
  for (const [id, audit] of Object.entries(report.audits || {})) {
    if (audit.score === null || audit.score >= 1) continue
    if (audit.scoreDisplayMode === 'informative' || audit.scoreDisplayMode === 'notApplicable') continue
    fails.push({ id, title: audit.title, score: audit.score, description: audit.description?.slice(0, 120) })
  }
  return fails
}

const paths = collectPaths()
console.log(`Auditing ${paths.length} paths on ${BASE} (${MOBILE ? 'mobile' : 'desktop'})…\n`)

const results = []
const failSummary = new Map()

for (let i = 0; i < paths.length; i++) {
  const p = paths[i]
  const url = `${BASE}${p}`
  const tmp = `/tmp/lh-audit-${i}.json`
  process.stdout.write(`[${i + 1}/${paths.length}] ${p} … `)

  if (!runLighthouse(url, tmp)) {
    console.log('ERROR')
    results.push({ path: p, error: 'lighthouse failed' })
    continue
  }

  const report = JSON.parse(readFileSync(tmp, 'utf8'))
  const scores = scoreReport(report)
  const fails = failingAudits(report)
  const not100 = Object.entries(scores).filter(([k, v]) => v !== null && typeof v === 'number' && v < 100)

  console.log(
    not100.length
      ? not100.map(([k, v]) => `${k}:${v}`).join(' ')
      : Object.entries(scores).filter(([, v]) => v != null).map(([k, v]) => `${k}:${v}`).join(' '),
  )

  for (const f of fails) {
    const key = f.id
    if (!failSummary.has(key)) failSummary.set(key, { title: f.title, count: 0, paths: [] })
    const entry = failSummary.get(key)
    entry.count++
    if (entry.paths.length < 5) entry.paths.push(p)
  }

  results.push({ path: p, scores, fails: fails.map((f) => f.id) })
}

const under100 = results.filter((r) =>
  r.scores && Object.values(r.scores).some((v) => typeof v === 'number' && v < 100),
)

console.log('\n=== SUMMARY ===')
console.log(`Total: ${results.length}, under 100 on any metric: ${under100.length}`)

console.log('\nTop failing audits:')
;[...failSummary.entries()]
  .sort((a, b) => b[1].count - a[1].count)
  .slice(0, 25)
  .forEach(([id, { title, count, paths: ps }]) => {
    console.log(`  ${count}x ${id} — ${title} (e.g. ${ps.join(', ')})`)
  })

console.log('\nPages with any score < 100:')
under100.slice(0, 40).forEach((r) => {
  console.log(`  ${r.path}: ${JSON.stringify(r.scores)} fails=${r.fails?.slice(0, 5).join(',')}`)
})
if (under100.length > 40) console.log(`  … and ${under100.length - 40} more`)

writeFileSync(join(ROOT, 'audit-pagespeed-results.json'), JSON.stringify({ base: BASE, mobile: MOBILE, results, failSummary: [...failSummary.entries()] }, null, 2))
console.log('\nFull results → audit-pagespeed-results.json')
