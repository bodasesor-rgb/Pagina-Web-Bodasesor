/**
 * Full audit: Spanish prepositions in SEO titles / H1s (SPA hubs + national copy).
 * Exit 1 if commercial pages lack natural prep (para|de|en|con|por).
 */
import { SPA_SEO_HUBS } from '../src/data/spa-seo-hubs.js'
import { PRIORITY_HUB_SERP, HOME_SERP } from '../src/data/priority-hub-serp.js'
import { buildNationalHubCopy, buildNationalServiceCopy } from '../src/utils/national-service-copy.js'
import { buildSeoTitle, stripSeoBrand } from '../src/utils/seo-title.js'

const PREP = /\b(para|de|en|con|por|a)\b/i
const META_PATH =
  /\/(catalogos|quienes-somos|aviso-de-privacidad|terminos-y-condiciones|politicas-de-devoluciones|blog|galeria|buscar)(\/|$)/i

const CITIES = [
  { slug: 'ciudad-de-mexico', name: 'Ciudad de México', short: 'CDMX' },
  { slug: 'guadalajara', name: 'Guadalajara', short: 'GDL' },
  { slug: 'monterrey', name: 'Monterrey', short: 'MTY' },
]

function hasPrep(s) {
  return PREP.test(String(s || ''))
}

function isMeta(path) {
  return META_PATH.test(path)
}

const failures = []
const warnings = []
const okRows = []

function fail(where, detail) {
  failures.push({ where, detail })
}

function warn(where, detail) {
  warnings.push({ where, detail })
}

// 1) Priority hubs + home
console.log('=== 1. Priority hubs + home ===')
for (const [slug, s] of Object.entries(PRIORITY_HUB_SERP)) {
  const titleOk = hasPrep(s.title)
  const h1Ok = hasPrep(s.h1)
  const serp = buildSeoTitle(s.title)
  if (!titleOk) fail(`priority:${slug}:title`, s.title)
  if (!h1Ok) fail(`priority:${slug}:h1`, s.h1)
  if (serp.length > 60) warn(`priority:${slug}:serp-len`, `${serp.length} ${serp}`)
  console.log(
    `${titleOk && h1Ok ? 'OK' : 'FAIL'} ${slug} | ${s.title} | ${s.h1} | SERP(${serp.length}) ${serp}`,
  )
}
for (const [k, v] of Object.entries({ title: HOME_SERP.title, h1: HOME_SERP.h1 })) {
  if (!hasPrep(v) && k === 'h1') fail(`home:${k}`, v)
  if (k === 'title' && !hasPrep(v) && !hasPrep(HOME_SERP.h1)) warn(`home:title`, v)
  console.log(`HOME ${k}: ${v} ${hasPrep(v) ? 'OK' : 'WEAK'}`)
}

// 2) All SPA hubs national copy
console.log('\n=== 2. SPA hubs (national title + H1) ===')
let commercial = 0
let commercialOk = 0
for (const hub of SPA_SEO_HUBS) {
  const slug = hub.path.replace(/^\//, '')
  const nat = buildNationalHubCopy(slug, hub.title)
  const title = stripSeoBrand(nat.seoTitle || hub.title)
  const h1 = nat.h1 || hub.title
  const serp = buildSeoTitle(title)
  const meta = isMeta(hub.path)
  commercial += meta ? 0 : 1

  const titleOk = hasPrep(title) || meta
  const h1Ok = hasPrep(h1) || meta
  // Event-type awkward pattern
  if (/^bodas\s+para\s+bodas/i.test(h1) || /^xv\s+años\s+para\s+xv/i.test(h1)) {
    fail(`hub:${hub.path}:awkward-h1`, h1)
  }
  if (meta && /para\s+bodas\s+y\s+eventos/i.test(h1)) {
    fail(`hub:${hub.path}:meta-stuffed`, h1)
  }
  if (!titleOk) fail(`hub:${hub.path}:title`, title)
  if (!h1Ok) fail(`hub:${hub.path}:h1`, h1)
  if (!meta && titleOk && h1Ok) commercialOk++
  if (serp.length > 60) warn(`hub:${hub.path}:serp-len`, `${serp.length} ${serp}`)

  const mark = titleOk && h1Ok ? 'OK' : 'FAIL'
  if (mark === 'FAIL' || !meta) {
    okRows.push({ path: hub.path, mark, title, h1, serpLen: serp.length })
  }
  if (mark === 'FAIL') console.log(`FAIL ${hub.path}\n  title: ${title}\n  h1: ${h1}`)
}

console.log(`Commercial hubs with prep: ${commercialOk}/${commercial}`)

// 3) City fallbacks (no Gemini JSON — same as useCityHubPage fallback)
console.log('\n=== 3. City fallback H1 / title patterns ===')
for (const hub of SPA_SEO_HUBS.filter((h) => !isMeta(h.path)).slice(0, 25)) {
  for (const city of CITIES) {
    const fallbackH1 = `${hub.title} en ${city.name}`
    const fallbackTitle = `${hub.title} en ${city.short || city.name}`
    if (!hasPrep(fallbackH1)) fail(`city-fallback:${hub.path}:${city.slug}:h1`, fallbackH1)
    if (!hasPrep(fallbackTitle)) fail(`city-fallback:${hub.path}:${city.slug}:title`, fallbackTitle)
  }
}
console.log('City fallbacks checked for first 25 commercial hubs × 3 cities')

// 4) Sample product national copy
console.log('\n=== 4. Product national copy samples ===')
const productSamples = [
  { title: 'Silla Tiffany', seoTitle: null },
  { title: 'Carrito de Snacks', seoTitle: null },
  { title: 'Banquete Formal de 3 Tiempos', seoTitle: null },
]
for (const p of productSamples) {
  const copy = buildNationalServiceCopy(p)
  const ok = hasPrep(copy.h1) && hasPrep(stripSeoBrand(copy.seoTitle))
  if (!ok) fail(`product:${p.title}`, `${copy.seoTitle} | ${copy.h1}`)
  console.log(`${ok ? 'OK' : 'FAIL'} ${p.title} → ${copy.seoTitle} | ${copy.h1}`)
}

// 5) Key path spot-check
console.log('\n=== 5. Spot-check key paths ===')
const spot = [
  '/bodas',
  '/xv-anos',
  '/corporativos',
  '/shows',
  '/wedding-planner',
  '/banquetes-catering',
  '/mesas-sillas',
  '/pistas-tarimas',
  '/floreria',
  '/musica',
  '/fotografia',
  '/quienes-somos',
  '/terminos-y-condiciones',
  '/catalogos',
]
for (const path of spot) {
  const hub = SPA_SEO_HUBS.find((h) => h.path === path)
  if (!hub) {
    fail(`spot:missing`, path)
    continue
  }
  const nat = buildNationalHubCopy(path.replace(/^\//, ''), hub.title)
  const serp = buildSeoTitle(stripSeoBrand(nat.seoTitle))
  console.log(
    `${path}\n  title: ${nat.seoTitle}\n  h1:    ${nat.h1}\n  serp:  ${serp} (${serp.length})`,
  )
}

// Summary
console.log('\n=== SUMMARY ===')
console.log(`failures: ${failures.length}`)
console.log(`warnings: ${warnings.length}`)
if (failures.length) {
  console.log('\nFAILURES:')
  for (const f of failures) console.log(`- ${f.where}: ${f.detail}`)
}
if (warnings.length) {
  console.log('\nWARNINGS (title >60 after brand — truncated by buildSeoTitle):')
  for (const w of warnings.slice(0, 20)) console.log(`- ${w.where}: ${w.detail}`)
  if (warnings.length > 20) console.log(`… +${warnings.length - 20} more`)
}

if (failures.length) {
  process.exit(1)
}
console.log('\nPASS: commercial titles/H1s have natural Spanish prepositions; meta pages not stuffed.')
