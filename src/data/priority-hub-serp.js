/**
 * SERP / CTR copy for GSC priority hubs (high impressions, low CTR).
 * Titles: core only — brand appended via buildSeoTitle (≤60).
 * Descriptions: aim 130–155 chars with query + CTA.
 */
export const PRIORITY_HUB_SERP = {
  'mesas-sillas': {
    title: 'Renta de Mesas y Sillas para Eventos',
    desc: 'Renta de mesas y sillas y mobiliario para eventos: Tiffany, Ghost, Crossback y más. Entrega y montaje en México. Cotiza por WhatsApp.',
    h1: 'Renta de Mesas y Sillas para Eventos',
    headline:
      'Mobiliario para eventos: más de 20 modelos de sillas y mesas con entrega, montaje y retiro incluidos.',
  },
  'banquetes-catering': {
    title: 'Banquetes y Catering para Eventos',
    desc: 'Banquetes y catering para eventos en México: menús por tiempos, buffet, barras y estaciones mexicanas. Cotiza por WhatsApp sin compromiso.',
    h1: 'Banquetes y Catering para Eventos',
    headline:
      'Banquetes formales, catering gourmet y estaciones mexicanas — cotiza por WhatsApp en menos de 24 horas.',
  },
  carpas: {
    title: 'Carpas para Fiestas y Eventos',
    desc: 'Renta de carpas para fiestas y eventos al aire libre: bodas, XV años y corporativos. Instalación profesional. Cotiza por WhatsApp.',
    h1: 'Carpas para Fiestas y Eventos',
    headline:
      'Carpas de todos los estilos y tamaños para bodas y eventos al aire libre, con instalación y retiro profesional.',
  },
  floreria: {
    title: 'Florería y Decoración para Eventos',
    desc: 'Florería y decoración para bodas y eventos en México: centros de mesa, ramos, globos y ambientación completa. Cotiza por WhatsApp.',
    h1: 'Florería y Decoración para Eventos',
    headline:
      'Arreglos florales, centros de mesa y decoración integral para transformar el escenario de tu evento.',
  },
  'pistas-tarimas': {
    title: 'Pistas de Baile y Tarimas para Eventos',
    desc: 'Renta de pistas de baile y tarimas para bodas y eventos: escenarios, estrados y sets completos. Cotiza por WhatsApp con Bodasesor.',
    h1: 'Pistas de Baile y Tarimas para Eventos',
    headline:
      'Pistas de baile, tarimas y escenarios a medida para bodas, XV años y eventos con montaje incluido.',
  },
}

/** Home SERP + static LCP hero copy (index.html). */
export const HOME_SERP = {
  title: 'Banquetes, Catering y Mobiliario para Eventos',
  desc: 'Banquetes, catering gourmet y renta de mobiliario para bodas, XV años y eventos en México. Cotiza por WhatsApp sin compromiso hoy.',
  h1: 'Banquetes, Catering y Mobiliario para Eventos en México',
  sub: 'Banquetes premium, catering y mobiliario elegante para bodas, quinceañeras y eventos corporativos. Cotiza por WhatsApp.',
}

/** pageSeo shape for useCityHubPage */
export function hubPageSeo(slug) {
  const s = PRIORITY_HUB_SERP[slug]
  if (!s) return null
  return {
    seoTitle: s.title,
    seoDescription: s.desc,
    h1: s.h1,
  }
}
