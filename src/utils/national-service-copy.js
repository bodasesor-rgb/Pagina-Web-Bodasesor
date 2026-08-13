import { defaultServiceFaqs } from './seo-meta.js'

/** Zones shown on national (no-city) service pages — same UI slot as city zones. */
export const NATIONAL_COVERAGE_ZONES = [
  'Ciudad de México',
  'Estado de México',
  'Guadalajara',
  'Monterrey',
  'León',
  'Querétaro',
  'Puebla',
  'Cancún',
]

function nationalH1(title) {
  const t = String(title || '').trim()
  if (!t) return 'Servicios para Bodas y Eventos en México'
  if (/en\s+méxico/i.test(t)) return t
  if (/para\s+bodas\s+y\s+eventos/i.test(t)) return `${t} en México`
  if (/para\s+eventos(\s+corporativos)?/i.test(t)) {
    return t.replace(/para\s+eventos(\s+corporativos)?/i, 'para Bodas y Eventos en México')
  }
  return `${t} para Bodas y Eventos en México`
}

/**
 * Build cityCopy-shaped content for national (no-city) product/service pages
 * so the layout matches hub×city landings: zones, bullets, FAQs, section title.
 */
export function buildNationalServiceCopy(product) {
  if (!product?.title) return null
  const title = product.title
  const h1 = nationalH1(title)
  const included = Array.isArray(product.included) ? product.included : []
  const localBullets =
    included.length > 0
      ? included
          .slice(0, 5)
          .map((item) => {
            const name = item.title || item.text || ''
            const desc = item.desc || ''
            return desc ? `${name}: ${desc}` : name
          })
          .filter(Boolean)
      : [
          `Servicio de ${title} con montaje, personal y desmontaje incluidos.`,
          'Logística a nivel nacional con coordinación Bodasesor de punta a punta.',
          'Presentación alineada a la temática y paleta de tu evento.',
          'Cotización personalizada por WhatsApp, normalmente en menos de 24 horas.',
          'Puedes combinar banquetes, barras, mesas y mobiliario en un solo paquete.',
        ]

  const faqs =
    Array.isArray(product.faqs) && product.faqs.length >= 2
      ? product.faqs
      : defaultServiceFaqs(title)

  return {
    h1,
    headline: product.headline || `${title} con servicio profesional Bodasesor`,
    sectionTitle: h1,
    description: Array.isArray(product.description)
      ? product.description
      : [product.description].filter(Boolean),
    localBullets,
    zones: NATIONAL_COVERAGE_ZONES,
    faqs,
    seoTitle: product.seoTitle || `${title} | Bodasesor`,
    seoDescription:
      product.seoDescription ||
      `${title} para bodas y eventos en México. Cotiza con Bodasesor por WhatsApp.`,
    primaryKeyword: title,
  }
}

function eventTypeNational(label, servicesHint) {
  return {
    headline: `Organización integral de ${label.toLowerCase()} con un solo coordinador Bodasesor.`,
    localBullets: [
      `Paquete completo para ${label.toLowerCase()}: ${servicesHint}.`,
      'Un solo contacto para banquete, mobiliario, música y producción.',
      'Cobertura nacional con logística y montaje incluidos.',
      'Cotización personalizada por WhatsApp en menos de 24 horas.',
    ],
    faqs: [
      {
        q: `¿Qué incluye el servicio de ${label}?`,
        a: `Coordinamos ${servicesHint} según tu presupuesto e invitados. Armamos un paquete único con un solo coordinador Bodasesor.`,
      },
      {
        q: '¿Atienden a nivel nacional?',
        a: 'Sí. Operamos en CDMX, Estado de México, Guadalajara, Monterrey, León y principales ciudades de México.',
      },
      {
        q: '¿Cuánto tarda la cotización?',
        a: 'Te enviamos propuesta por WhatsApp normalmente en menos de una hora, sin compromiso.',
      },
    ],
  }
}

/**
 * National defaults for category hub pages (banquetes-catering, barras-de-bebidas, mesas-personalizadas).
 */
export function buildNationalHubCopy(hubSlug, fallbackTitle) {
  const title = fallbackTitle || 'Servicios Bodasesor'
  const h1 = nationalH1(title)
  const byHub = {
    'banquetes-catering': {
      headline:
        'Banquetes formales, catering gourmet, barras de alimentos y estaciones mexicanas en un solo catálogo.',
      localBullets: [
        'Menús por tiempos, buffet y estaciones con chef y meseros.',
        'Barras de alimentos y puestos de antojitos cocinados al momento.',
        'Logística completa: montaje, vajilla, personal y desmontaje.',
        'Cobertura nacional con cotización en menos de 24 horas.',
      ],
      faqs: [
        {
          q: '¿Qué servicios incluye Banquetes y Catering?',
          a: 'Banquetes formales por tiempos, catering gourmet, barras de alimentos y estaciones mexicanas. Cada propuesta incluye personal, montaje y logística.',
        },
        {
          q: '¿Puedo combinar banquete con barras o estaciones?',
          a: 'Sí. Es muy común complementar un banquete formal con taquiza, barra de sushi o coffee break. Armamos un paquete coordinado.',
        },
        {
          q: '¿Cotizan a nivel nacional?',
          a: 'Sí. Atendemos CDMX, Estado de México, Guadalajara, Monterrey, León y más ciudades. Cotización por WhatsApp en menos de 24 horas.',
        },
      ],
    },
    'barras-de-bebidas': {
      headline:
        'Desde aguas frescas y mocteles hasta mixología premium, café de especialidad y carritos de helado.',
      localBullets: [
        'Opciones con y sin alcohol para todo tipo de evento.',
        'Bartenders y baristas certificados con montaje incluido.',
        'Cristalería, hielo, garnishes y desmontaje en el paquete.',
        'Combina varias barras en un solo open bar coordinado.',
      ],
      faqs: [
        {
          q: '¿Qué incluye una barra de bebidas Bodasesor?',
          a: 'Montaje, personal (bartender o barista según el servicio), cristalería o vajilla, hielo, garnishes y desmontaje. Personalizamos la carta según invitados y duración del evento.',
        },
        {
          q: '¿Puedo combinar varias barras en un solo evento?',
          a: 'Sí. Es muy común combinar mocteles o aguas frescas con café premium o paletas. Armamos un paquete único con logística coordinada.',
        },
        {
          q: '¿Atienden eventos con y sin alcohol?',
          a: 'Sí. Tenemos opciones 100% sin alcohol (mocteles, aguas, café, helados) y mixología premium con bartenders profesionales.',
        },
      ],
    },
    'mesas-personalizadas': {
      headline:
        'Mesas de dulces, postres, quesos, cupcakes y snacks decoradas a la temática de tu evento.',
      localBullets: [
        'Diseño acorde a colores y estilo de tu celebración.',
        'Surtido, montaje, decoración y desmontaje incluidos.',
        'Combinables: dulces + quesos + cupcakes en una sola estación.',
        'Cotización por WhatsApp en menos de 24 horas a nivel nacional.',
      ],
      faqs: [
        {
          q: '¿Qué incluye una mesa personalizada?',
          a: 'Diseño acorde a tu temática, surtido de productos, montaje, decoración y desmontaje. Ajustamos colores, altura y cantidad según invitados.',
        },
        {
          q: '¿Puedo combinar varias mesas en el mismo evento?',
          a: 'Sí. Es muy popular combinar mesa de dulces con mesa de quesos o cupcakes. Coordinamos el montaje para que se vea como una sola estación.',
        },
        {
          q: '¿Cuánto tiempo tarda la cotización?',
          a: 'Te enviamos propuesta por WhatsApp en menos de 24 horas con opciones de tamaño y presupuesto.',
        },
      ],
    },
    bodas: eventTypeNational('Bodas', 'banquetes, florería, música, fotografía y wedding planner'),
    corporativos: eventTypeNational('Eventos Corporativos', 'coffee break, catering, audio e iluminación'),
    'xv-anos': eventTypeNational('XV Años', 'banquete, decoración, música, shows y mesa de dulces'),
    graduaciones: eventTypeNational('Graduaciones', 'catering, música, decoración y fotografía'),
    'baby-shower': eventTypeNational('Baby Shower', 'decoración, catering, mesa de dulces y fotografía'),
    cumpleanos: eventTypeNational('Cumpleaños', 'catering, música, inflables y mesa de dulces'),
    'primera-comunion': eventTypeNational('Primera Comunión', 'banquete, decoración y mesa de dulces'),
    cenas: eventTypeNational('Cenas', 'menús de gala, protocolo y ambientación'),
    comidas: eventTypeNational('Comidas', 'catering de mediodía y almuerzos'),
    desayunos: eventTypeNational('Desayunos', 'brunch, estaciones en vivo y café premium'),
    lanzamientos: eventTypeNational('Lanzamientos', 'canapés, cócteles y branding gastronómico'),
  }

  const extra = byHub[hubSlug] || {
    headline: `${title} con servicio profesional Bodasesor en toda México.`,
    localBullets: [
      'Montaje, personal y desmontaje incluidos.',
      'Cobertura nacional con logística Bodasesor.',
      'Cotización sin compromiso por WhatsApp.',
    ],
    faqs: defaultServiceFaqs(title),
  }

  return {
    h1,
    headline: extra.headline,
    sectionTitle: h1,
    description: [],
    localBullets: extra.localBullets,
    zones: NATIONAL_COVERAGE_ZONES,
    faqs: extra.faqs,
    seoTitle: `${title} | Bodasesor`,
    seoDescription: `${title} para bodas y eventos en México. Cotiza con Bodasesor.`,
    primaryKeyword: title,
  }
}
