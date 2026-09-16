/**
 * SERP / CTR copy for GSC + Ubersuggest priority hubs.
 * Titles: core only — brand appended via buildSeoTitle (≤60).
 * Descriptions: aim 130–155 chars with query + CTA.
 * Updated 2026-09 from Ubersuggest next-actions (#11–20 + Alto).
 */
export const PRIORITY_HUB_SERP = {
  'mesas-sillas': {
    title: 'Renta de Mesas y Sillas para Eventos',
    desc: 'Renta de mesas y sillas para eventos y bodas: Tiffany, Ghost, Crossback. Entrega y montaje en México. Cotiza por WhatsApp.',
    h1: 'Renta de Mesas y Sillas para Eventos',
    headline:
      'Alquiler de mesas y sillas para bodas y fiestas: más de 20 modelos con entrega, montaje y retiro incluidos.',
  },
  'banquetes-catering': {
    title: 'Banquetes y Catering para Eventos',
    desc: 'Servicio de banquetes y catering para eventos y fiestas en México: menús, buffet y estaciones. Cotiza por WhatsApp sin compromiso.',
    h1: 'Banquetes y Catering para Eventos',
    headline:
      'Banquetes y eventos con menús por tiempos, buffet y catering gourmet — cotiza por WhatsApp en menos de 24 horas.',
  },
  carpas: {
    title: 'Carpas para Fiestas y Eventos',
    desc: 'Renta de carpas para fiestas y eventos: precios claros, instalación profesional para bodas y XV años. Cotiza por WhatsApp.',
    h1: 'Carpas para Fiestas y Eventos',
    headline:
      'Carpas para fiestas y eventos al aire libre: tamaños, estilos e instalación con cotización transparente por WhatsApp.',
  },
  floreria: {
    title: 'Florería y Arreglos de Salón para Eventos',
    desc: 'Florería y arreglos de salón para bodas y eventos especiales: centros de mesa, ramos y ambientación. Cotiza por WhatsApp.',
    h1: 'Florería y Decoración para Eventos',
    headline:
      'Arreglos de salón, centros de mesa y florería para eventos especiales — ambientación integral con Bodasesor.',
  },
  'pistas-tarimas': {
    title: 'Pista de Madera y Tarimas para Eventos',
    desc: 'Renta de pista de madera, pistas LED y tarima de madera para bodas y eventos. Montaje profesional. Cotiza por WhatsApp.',
    h1: 'Pistas de Baile y Tarimas para Eventos',
    headline:
      'Pista de madera, tarima de madera, LED y espejo: pistas de baile y escenarios a medida con montaje incluido.',
  },
  'espacios-eventos': {
    title: 'Salón de Eventos y Espacios para Fiestas',
    desc: 'Salón de eventos, salones, haciendas, jardines y terrazas para bodas y fiestas en México. Asesoría Bodasesor. Cotiza por WhatsApp.',
    h1: 'Salón de Eventos y Espacios para Celebrar',
    headline:
      'Encuentra salón de eventos, locales, haciendas y terrazas para bodas y fiestas — te asesoramos para elegir el venue ideal.',
  },
  'wedding-planner': {
    title: 'Wedding Planner para Bodas en México',
    desc: 'Wedding planner para bodas en México y Puebla: planeación, coordinación y proveedores en un solo equipo. Cotiza por WhatsApp.',
    h1: 'Wedding Planner para Bodas',
    headline:
      'Wedding planner profesional: planeamos y coordinamos tu boda en CDMX, Puebla y todo México con Bodasesor.',
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
