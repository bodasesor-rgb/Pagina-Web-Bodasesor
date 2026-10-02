/** Max Google SERP title length (chars). */
export const SEO_TITLE_MAX = 60

const BRAND = ' | Bodasesor'

/**
 * Strip brand suffixes from generated or legacy titles.
 * Drops every secondary "| …" segment that mentions Bodasesor, is empty, or is a 1–2 word tag
 * ("| Arreglos", "| Bodasesor Catering", "| |").
 */
export function stripSeoBrand(text) {
  const raw = String(text ?? '').replace(/\s*—\s*Cotización Gratis\s*/gi, ' ')
  const [head = '', ...rest] = raw.split('|').map((s) => s.trim())
  const keep = rest.filter((s) => s && !/bodasesor|…$/i.test(s) && s.split(/\s+/).length > 2)
  return [head, ...keep].join(' | ').replace(/\s{2,}/g, ' ').trim()
}

const COMPRESSIONS = [
  [/\s+para\s+(Bodas\s+y\s+Eventos|Eventos\s+y\s+Bodas)\b/i, ' para Eventos'],
  [/Ciudad de México/i, 'CDMX'],
  [/Estado de México/i, 'Edomex'],
  [/\s+para\s+Eventos\b(?=.*\s+en\s+)/i, ''],
  [/^Servicio\s+de\s+/i, ''],
  [/San Miguel de Allende/i, 'San Miguel'],
]

/**
 * Build a ≤60 char document title.
 * @param {string} headline — service or page name (may include legacy brand suffix)
 * @param {string|null} [cityShort] — optional city abbreviation
 */
export function buildSeoTitle(headline, cityShort = null) {
  let core = stripSeoBrand(headline)
  if (cityShort && !core.toLowerCase().includes(cityShort.toLowerCase())) core = `${core} ${cityShort}`.trim()

  const maxCore = SEO_TITLE_MAX - BRAND.length
  for (const [re, rep] of COMPRESSIONS) {
    if (core.length <= maxCore) break
    core = core.replace(re, rep).replace(/\s{2,}/g, ' ').trim()
    core = core.charAt(0).toUpperCase() + core.slice(1)
  }
  if (core.length <= maxCore) return `${core}${BRAND}`

  // Keep a trailing location ("… en Monterrey") so city variants stay distinct after truncation.
  const loc = core.match(/\s+en\s+(?!(Cada|Casa|Tu|Tus|Su|Sus|Un|Una|El|La|Los|Las)\b)[A-ZÁÉÍÓÚÑ][^|:]{1,24}$/)
  if (loc && loc.index > 12) {
    const head = truncateAtWord(core.slice(0, loc.index), maxCore - loc[0].length)
    if (head.length >= 12) return `${head}${loc[0]}${BRAND}`
  }
  return `${truncateAtWord(core, maxCore)}${BRAND}`
}

function truncateAtWord(text, max) {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const colon = cut.lastIndexOf(':')
  if (colon >= 15) return cut.slice(0, colon).trim()
  const atWord = text.charAt(max) === ' ' || !cut.includes(' ') ? cut : cut.slice(0, cut.lastIndexOf(' '))
  return atWord
    .replace(/(\s+(de|del|la|las|el|los|y|e|en|para|con|a|al|o|por|sin|sobre|tu|tus|mi|su|sus|que|qué|cómo|cuál|cuáles|es|son))+$/i, '')
    .replace(/[\s,:;—|-]+$/, '')
    .trim()
}

/** Shorten an existing full title (e.g. Nexus HTML) to ≤60 chars. */
export function shortenExistingTitle(title) {
  return buildSeoTitle(stripSeoBrand(title))
}
