/** Ideal Google meta description length. */
export const META_DESC_MIN = 120
export const META_DESC_MAX = 155

/**
 * Clamp/pad a meta description into the 120–155 character sweet spot.
 * Does not invent prices or fake claims.
 */
export function clampMetaDescription(text, { min = META_DESC_MIN, max = META_DESC_MAX } = {}) {
  let t = String(text || '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!t) {
    t =
      'Banquetes, catering y servicios para bodas y eventos en México. Cotiza con Bodasesor por WhatsApp.'
  }

  if (t.length > max) {
    const cut = t.slice(0, max - 1)
    const lastSpace = cut.lastIndexOf(' ')
    t = `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`
  }

  const pads = [
    ' Cotiza sin compromiso con Bodasesor.',
    ' Disponible en CDMX y principales ciudades de México.',
    ' Banquetes, catering y producción de eventos.',
  ]
  for (const pad of pads) {
    if (t.length >= min) break
    if (t.length + pad.length <= max) t = `${t}${pad}`.trim()
  }

  if (t.length > max) t = `${t.slice(0, max - 1).trim()}…`
  return t
}

export function buildFaqPageJsonLd(faqs) {
  const list = (faqs || []).filter((f) => f?.q && f?.a)
  if (list.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}

/** Sensible default FAQs when a product has none (real ops info, no fake prices). */
export function defaultServiceFaqs(title) {
  const name = title || 'este servicio'
  return [
    {
      q: `¿Cómo cotizo ${name}?`,
      a: 'Escríbenos por WhatsApp o llámanos al 55 4008 0373. Te enviamos una propuesta personalizada, normalmente en menos de una hora.',
    },
    {
      q: `¿En qué ciudades ofrecen ${name}?`,
      a: 'Operamos en Ciudad de México y las principales ciudades de México. Indica la ubicación de tu evento al cotizar para confirmar cobertura y logística.',
    },
    {
      q: '¿Qué incluye el servicio?',
      a: 'La cotización detalla personal, montaje, equipo y alcance según el tipo de evento. Puedes combinar banquetes, mobiliario y producción con un solo coordinador Bodasesor.',
    },
  ]
}
