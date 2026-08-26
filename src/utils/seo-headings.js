/**
 * Heading helpers: keep one strong H1 with natural Spanish prepositions,
 * and avoid a first H2 that merely repeats the H1.
 */

function fold(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9áéíóúüñ]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenSet(s) {
  return new Set(
    fold(s)
      .split(' ')
      .filter((t) => t.length > 2 && !['los', 'las', 'del', 'una', 'uno', 'para', 'con', 'por'].includes(t)),
  )
}

/** True when two headings are the same topic (exact, containment, or high overlap). */
export function headingsAreDuplicate(a, b) {
  const fa = fold(a)
  const fb = fold(b)
  if (!fa || !fb) return false
  if (fa === fb) return true
  if (fa.includes(fb) || fb.includes(fa)) return true
  const ta = tokenSet(a)
  const tb = tokenSet(b)
  if (!ta.size || !tb.size) return false
  let overlap = 0
  for (const t of ta) if (tb.has(t)) overlap++
  const ratio = overlap / Math.min(ta.size, tb.size)
  return ratio >= 0.75
}

/**
 * H2 under the hero for body/SEO copy — never a clone of the H1.
 * @param {string} h1
 * @param {string|null|undefined} sectionTitle
 * @param {string} [fallback]
 */
export function bodySectionHeading(h1, sectionTitle, fallback = 'Sobre este servicio') {
  const raw = String(sectionTitle || '').trim()
  if (!raw || headingsAreDuplicate(h1, raw)) return fallback
  return raw
}

/**
 * Ensure service H1 carries natural prepositions (para / en).
 * Does not rewrite legal/meta-looking titles.
 */
export function enrichServiceH1(title, cityName = null) {
  const t = String(title || '').trim()
  if (!t) {
    return cityName
      ? `Servicios para Bodas y Eventos en ${cityName}`
      : 'Servicios para Bodas y Eventos en México'
  }
  if (/quienes.?somos|aviso|terminos|catalogos|galeria|\bblog\b/i.test(fold(t))) {
    return t
  }
  if (cityName) {
    if (new RegExp(`\\ben\\s+${fold(cityName).replace(/\s+/g, '\\s+')}`, 'i').test(fold(t))) {
      return t
    }
    if (/\bpara\b/i.test(t)) return `${t} en ${cityName}`
    return `${t} para Bodas y Eventos en ${cityName}`
  }
  if (/en\s+m[eé]xico/i.test(t)) return t
  if (/\bpara\b/i.test(t)) return /en\s+m[eé]xico/i.test(t) ? t : `${t} en México`
  return `${t} para Bodas y Eventos en México`
}
