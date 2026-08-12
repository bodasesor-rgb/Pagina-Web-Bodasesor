/**
 * Spanish Title Case for headings:
 * Capitalize content words; keep articles/prepositions/conjunctions lowercase
 * (unless first or last token, or after ":" / "—" / "-").
 */

const SMALL = new Set([
  'el',
  'la',
  'los',
  'las',
  'un',
  'una',
  'unos',
  'unas',
  'de',
  'del',
  'al',
  'a',
  'en',
  'y',
  'e',
  'o',
  'u',
  'ni',
  'con',
  'por',
  'para',
  'sin',
  'sobre',
  'entre',
  'contra',
  'hacia',
  'durante',
  'mediante',
  'según',
  'segun',
  'vía',
  'via',
  'vs',
  'the',
  'of',
  'and',
  'or',
  'tus',
  'su',
  'sus',
  'mi',
  'mis',
  'tu',
  'nuestro',
  'nuestra',
  'que',
  'como',
  'más',
  'mas',
])

function capWord(word) {
  if (!word) return word
  // Keep all-caps acronyms (CDMX, XV, GDL)
  if (/^[A-ZÁÉÍÓÚÜÑ0-9]{2,}$/.test(word) && word === word.toUpperCase()) return word
  // Preserve internal capitals like "WhatsApp" if already mixed — still normalize first letter
  const lower = word.toLocaleLowerCase('es-MX')
  return lower.charAt(0).toLocaleUpperCase('es-MX') + lower.slice(1)
}

/**
 * @param {string} input
 * @returns {string}
 */
export function toSpanishTitleCase(input) {
  const text = String(input || '')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text) return ''

  // Split on spaces but keep punctuation attached for force-cap detection
  const parts = text.split(' ')
  return parts
    .map((raw, i) => {
      const isFirst = i === 0
      const isLast = i === parts.length - 1
      // Force cap after colon / dash break in titles
      const prev = i > 0 ? parts[i - 1] : ''
      const afterBreak = /[:—–\-]$/.test(prev)

      // Separate trailing punctuation
      const m = raw.match(/^([«"'(]*)(.*?)([»"').,:;!?]*)$/)
      const pre = m?.[1] || ''
      const core = m?.[2] || raw
      const post = m?.[3] || ''

      if (!core) return raw

      const lower = core.toLocaleLowerCase('es-MX')
      const force = isFirst || isLast || afterBreak
      const next =
        !force && SMALL.has(lower)
          ? lower
          : // hyphenated: Alta-Gama → Alta-Gama
            core
              .split('-')
              .map((seg, j) => {
                const sl = seg.toLocaleLowerCase('es-MX')
                if (j > 0 && SMALL.has(sl)) return sl
                return capWord(seg)
              })
              .join('-')

      return `${pre}${next}${post}`
    })
    .join(' ')
}

/** Collect unique keyword phrases for bolding (longest first). */
export function buildHighlightKeywords({
  primaryKeyword = '',
  zones = [],
  cityName = '',
  cityShort = '',
  extra = [],
} = {}) {
  const out = []
  const push = (s) => {
    const t = String(s || '').trim()
    if (t.length >= 3) out.push(t)
  }
  push(primaryKeyword)
  // Split primary into tokens ≥4 chars
  for (const w of String(primaryKeyword || '').split(/[\s|/,:]+/)) {
    if (w.length >= 4 && !SMALL.has(w.toLocaleLowerCase('es-MX'))) push(w)
  }
  for (const z of zones || []) push(z)
  push(cityName)
  push(cityShort)
  for (const e of extra || []) push(e)
  // Prefer longer matches first
  const uniq = [...new Set(out)]
  uniq.sort((a, b) => b.length - a.length)
  return uniq.slice(0, 16)
}
