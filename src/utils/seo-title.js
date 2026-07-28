/** Max Google SERP title length (chars). */
export const SEO_TITLE_MAX = 60

const BRAND = ' | Bodasesor'

/** Strip trailing brand suffixes from generated or legacy titles. */
export function stripSeoBrand(text) {
  return String(text ?? '')
    .replace(/\s*—\s*Cotización Gratis\s*/gi, ' ')
    .replace(/\s*\|\s*Bodasesor(\s+Eventos)?\s*$/i, '')
    .replace(/\s+a Domicilio/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/**
 * Build a ≤60 char document title.
 * @param {string} headline — service or page name (may include legacy brand suffix)
 * @param {string|null} [cityShort] — optional city abbreviation
 */
export function buildSeoTitle(headline, cityShort = null) {
  let core = stripSeoBrand(headline)
  if (cityShort) core = `${core} ${cityShort}`.trim()

  let title = `${core}${BRAND}`
  if (title.length <= SEO_TITLE_MAX) return title

  const maxCore = SEO_TITLE_MAX - BRAND.length
  return `${core.slice(0, maxCore).trim()}${BRAND}`
}

/** Shorten an existing full title (e.g. Nexus HTML) to ≤60 chars. */
export function shortenExistingTitle(title) {
  return buildSeoTitle(stripSeoBrand(title))
}
