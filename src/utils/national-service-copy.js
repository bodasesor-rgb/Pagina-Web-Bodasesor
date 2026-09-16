import { defaultServiceFaqs } from './seo-meta.js'
import { PRIORITY_HUB_SERP } from '../data/priority-hub-serp.js'

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

/** Pages that should NOT get “para Bodas y Eventos…” stuffed into the H1. */
const META_PAGE_RE =
  /quienes.?somos|aviso.?de.?privacidad|terminos|politicas.?de.?devoluci|\bcatalogos\b|\bgaleria\b|\bblog\b|\bbuscar\b/i

function foldAccents(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function isMetaPageTitle(title) {
  return META_PAGE_RE.test(foldAccents(title))
}

/** Event-type hubs: “Bodas para Bodas…” is wrong — prefer “Servicios para X en México”. */
const EVENT_TYPE_LABELS = new Set([
  'bodas',
  'xv anos',
  'xv-anos',
  'eventos corporativos',
  'corporativos',
  'graduaciones',
  'baby shower',
  'cumpleanos',
  'primera comunion',
  'cenas',
  'comidas',
  'desayunos',
  'lanzamientos',
  'inflables',
])

function isEventTypeTitle(title) {
  return EVENT_TYPE_LABELS.has(foldAccents(title))
}

/**
 * National H1 with natural Spanish prepositions (para / en / de).
 * Avoids stuffing legal pages and redundant “Bodas para Bodas…”.
 */
function nationalH1(title) {
  const t = String(title || '').trim()
  if (!t) return 'Servicios para Bodas y Eventos en México'
  if (isMetaPageTitle(t)) return t
  if (/en\s+méxico/i.test(t)) return t
  if (isEventTypeTitle(t)) {
    if (/^eventos\s+corporativos$/i.test(t)) return 'Eventos Corporativos en México'
    return `Servicios para ${t} en México`
  }
  if (/para\s+bodas\s+y\s+eventos/i.test(t)) return /en\s+méxico/i.test(t) ? t : `${t} en México`
  if (/para\s+eventos(\s+corporativos)?/i.test(t)) {
    return t.replace(/para\s+eventos(\s+corporativos)?/i, 'para Bodas y Eventos en México')
  }
  if (/\bpara\b/i.test(t)) return /en\s+méxico/i.test(t) ? t : `${t} en México`
  return `${t} para Bodas y Eventos en México`
}

/** Compact SERP title core (brand appended later; keep natural prepositions). */
function nationalSeoTitle(title) {
  const t = String(title || '').trim()
  if (!t) return 'Servicios para Eventos'
  if (isMetaPageTitle(t)) return t
  if (isEventTypeTitle(t)) {
    if (/^eventos\s+corporativos$/i.test(t)) return 'Eventos Corporativos en México'
    return `${t} en México`
  }
  if (/\b(para|en|de)\b/i.test(t)) return t
  return `${t} para Eventos`
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
    sectionTitle: 'Detalle del servicio, montaje y cotización',
    description: Array.isArray(product.description)
      ? product.description
      : [product.description].filter(Boolean),
    localBullets,
    zones: NATIONAL_COVERAGE_ZONES,
    faqs,
    seoTitle: product.seoTitle || nationalSeoTitle(title),
    seoDescription:
      product.seoDescription ||
      `${title} para bodas y eventos en México. Cotiza con Bodasesor por WhatsApp.`,
    primaryKeyword: title,
  }
}

function eventTypeNational(label, servicesHint) {
  const h1 = `Servicios para ${label} en México`
  return {
    h1,
    seoTitle: `${label} en México`,
    sectionTitle: `Qué incluye tu paquete de ${label.toLowerCase()}`,
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

function priorityEventType(slug, label, servicesHint) {
  const p = PRIORITY_HUB_SERP[slug]
  const base = eventTypeNational(label, servicesHint)
  if (!p) return base
  return {
    ...base,
    headline: p.headline,
    seoTitle: p.title,
    seoDescription: p.desc,
    h1: p.h1,
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
      headline: PRIORITY_HUB_SERP['banquetes-catering'].headline,
      seoTitle: PRIORITY_HUB_SERP['banquetes-catering'].title,
      seoDescription: PRIORITY_HUB_SERP['banquetes-catering'].desc,
      h1: PRIORITY_HUB_SERP['banquetes-catering'].h1,
      sectionTitle: 'Menús, estaciones y cómo cotizar',
      description: [
        'Buscas un banquete o catering para eventos en México: menús por tiempos, buffet y estaciones con chef, meseros y vajilla incluidos. Bodasesor arma la propuesta completa para bodas, XV años y corporativos.',
        'Ofrecemos banquetes formales de alta cocina, banquete mexicano, kosher y navideño, además de catering gourmet, barras de alimentos y puestos de antojitos cocinados al momento.',
        'Cotiza tu banquete por WhatsApp sin compromiso: te enviamos opciones de menú según invitados, venue y presupuesto, normalmente en menos de 24 horas.',
      ],
      localBullets: [
        'Banquetes por tiempos, buffet y estaciones con chef y meseros.',
        'Catering para bodas, XV años, graduaciones y eventos corporativos.',
        'Barras de alimentos y puestos de antojitos cocinados al momento.',
        'Montaje, vajilla, personal y desmontaje en un solo paquete.',
        'Cobertura nacional con cotización por WhatsApp en menos de 24 horas.',
      ],
      faqs: [
        {
          q: '¿Qué incluye un banquete para eventos con Bodasesor?',
          a: 'Menú (tiempos, buffet o estaciones), chef, meseros, vajilla, montaje y desmontaje. Puedes combinar el banquete con barras de alimentos o taquiza en un solo paquete.',
        },
        {
          q: '¿Ofrecen catering para bodas y eventos corporativos?',
          a: 'Sí. Tenemos banquetes formales, catering gourmet, coffee break, canapés y estaciones mexicanas para bodas, XV años, graduaciones y corporativos en todo México.',
        },
        {
          q: '¿Cómo cotizo un banquete o servicio de banquetes?',
          a: 'Escríbenos por WhatsApp al 55 4008 0373 con fecha, ciudad e invitados. Te enviamos propuesta personalizada, normalmente en menos de 24 horas y sin compromiso.',
        },
      ],
    },
    carpas: {
      headline: PRIORITY_HUB_SERP.carpas.headline,
      seoTitle: PRIORITY_HUB_SERP.carpas.title,
      seoDescription: PRIORITY_HUB_SERP.carpas.desc,
      h1: PRIORITY_HUB_SERP.carpas.h1,
      sectionTitle: 'Tipos de carpa, instalación y logística',
      description: [
        'Renta de carpas para fiestas y eventos al aire libre: bodas, XV años, corporativos y celebraciones en jardines, haciendas o terrenos. Instalación, anclaje y retiro a cargo de nuestro equipo.',
        'Elige carpas clásicas, transparentes, domos o estructuras tensionadas según invitados, clima y estilo. Adaptamos tamaño y montaje al venue de tu evento.',
        'Cotiza tu carpa para eventos por WhatsApp: te confirmamos disponibilidad, medidas y logística en CDMX y principales ciudades de México.',
      ],
      localBullets: [
        'Carpas para fiestas, bodas y eventos al aire libre.',
        'Instalación, anclaje y retiro por equipo profesional.',
        'Opciones de tamaño y estilo según invitados y venue.',
        'Compatible con mobiliario, iluminación y ambientación Bodasesor.',
        'Cotización por WhatsApp en menos de 24 horas.',
      ],
      faqs: [
        {
          q: '¿Rentan carpas para eventos y fiestas?',
          a: 'Sí. Ofrecemos renta de carpas para fiestas, bodas, XV años y eventos corporativos al aire libre, con instalación y retiro incluidos.',
        },
        {
          q: '¿Qué tipos de carpa para eventos tienen?',
          a: 'Carpas clásicas, transparentes, domos y estructuras tensionadas en varios tamaños. Te asesoramos según invitados, terreno y clima.',
        },
        {
          q: '¿La instalación de la carpa está incluida?',
          a: 'Sí. El paquete incluye traslado, instalación, anclaje seguro y retiro. Cotizamos por WhatsApp con medidas y fecha de tu evento.',
        },
      ],
    },
    floreria: {
      headline: PRIORITY_HUB_SERP.floreria.headline,
      seoTitle: PRIORITY_HUB_SERP.floreria.title,
      seoDescription: PRIORITY_HUB_SERP.floreria.desc,
      h1: PRIORITY_HUB_SERP.floreria.h1,
      sectionTitle: 'Arreglos, ambientación y montaje floral',
      description: [
        'Florería y decoración para bodas y eventos: centros de mesa, ramos nupciales, arreglos florales, globos y ambientación integral según la temática de tu celebración.',
        'Diseñamos la decoración de eventos con flores, plantas, photo ops y estructuras que transforman el venue — desde bodas íntimas hasta XV años y corporativos.',
        'Cotiza arreglos florales y decoración por WhatsApp: montaje y desmontaje incluidos, con cobertura en CDMX y principales ciudades de México.',
      ],
      localBullets: [
        'Centros de mesa, ramos y arreglos florales a la temática.',
        'Decoración con globos, photo ops y ambientación integral.',
        'Opciones con plantas y florales para bodas y eventos.',
        'Montaje y desmontaje incluidos en la propuesta.',
        'Cotización por WhatsApp en menos de 24 horas.',
      ],
      faqs: [
        {
          q: '¿Qué incluye el servicio de florería para eventos?',
          a: 'Centros de mesa, ramos, arreglos florales y ambientación según tu paleta. También combinamos flores con globos y photo ops en un solo montaje.',
        },
        {
          q: '¿Hacen decoración de eventos con plantas y flores?',
          a: 'Sí. Diseñamos decoración floral y con plantas para bodas, XV años y eventos sociales, alineada a la temática y al espacio del venue.',
        },
        {
          q: '¿El montaje floral está incluido?',
          a: 'Sí. Incluimos diseño, montaje y desmontaje. Cotiza por WhatsApp con fecha, ciudad y estilo deseado.',
        },
      ],
    },
    'pistas-tarimas': {
      headline: PRIORITY_HUB_SERP['pistas-tarimas'].headline,
      seoTitle: PRIORITY_HUB_SERP['pistas-tarimas'].title,
      seoDescription: PRIORITY_HUB_SERP['pistas-tarimas'].desc,
      h1: PRIORITY_HUB_SERP['pistas-tarimas'].h1,
      sectionTitle: 'Pista de madera, tarimas y montaje',
      description: [
        'Renta de pista de madera, pistas LED y tarima de madera para bodas, XV años y eventos: escenarios y estrados a medida con instalación profesional.',
        'Una pista de baile bien dimensionada es el centro de la celebración. También montamos tarimas de madera, escenarios y sets completos con barras y cabinas coordinadas.',
        'Cotiza pista de madera o tarima por WhatsApp: te proponemos medidas, acabados y logística según tu venue en México.',
      ],
      localBullets: [
        'Pista de madera, LED, espejo y acabados premium.',
        'Tarima de madera, escenarios y estrados a la medida del venue.',
        'Sets completos con barras y cabinas coordinadas.',
        'Montaje, nivelación y retiro incluidos.',
        'Cotización por WhatsApp en menos de 24 horas.',
      ],
      faqs: [
        {
          q: '¿Rentan pista de madera para eventos?',
          a: 'Sí. Ofrecemos pista de madera y otros acabados (LED, espejo) con instalación, nivelación y retiro incluidos para bodas y fiestas.',
        },
        {
          q: '¿También rentan tarima de madera?',
          a: 'Sí. Tarimas de madera, escenarios y estrados según el tamaño de tu espacio. Puedes combinar pista de baile y tarima en un solo set.',
        },
        {
          q: '¿Cómo cotizo una pista de baile o tarima?',
          a: 'Escríbenos por WhatsApp con medidas aproximadas del venue, fecha y ciudad. Te enviamos opciones y disponibilidad sin compromiso.',
        },
      ],
    },
    'espacios-eventos': {
      headline: PRIORITY_HUB_SERP['espacios-eventos'].headline,
      seoTitle: PRIORITY_HUB_SERP['espacios-eventos'].title,
      seoDescription: PRIORITY_HUB_SERP['espacios-eventos'].desc,
      h1: PRIORITY_HUB_SERP['espacios-eventos'].h1,
      sectionTitle: 'Salón de eventos, haciendas y venues',
      description: [
        'Buscas un salón de eventos, locales para fiestas, haciendas o terrazas: Bodasesor te asesora para elegir el espacio según invitados, zona y estilo, y coordina la producción completa.',
        'Trabajamos salones para eventos, haciendas en CDMX (incluida la zona de Teotihuacán) y México, jardines y terrazas. Combinamos venue con banquetes, mobiliario, florería y audiovisual en un solo equipo.',
        'Cotiza por WhatsApp: cuéntanos ciudad, fecha e invitados y te orientamos sobre salones para eventos cerca de ti o haciendas disponibles.',
      ],
      localBullets: [
        'Salón de eventos y salones para bodas, XV años y graduaciones.',
        'Haciendas en CDMX, Teotihuacán y principales ciudades de México.',
        'Jardines y terrazas con ambientación y logística completa.',
        'Asesoría de venue + banquete, mobiliario y producción.',
        'Cotización por WhatsApp en menos de 24 horas.',
      ],
      faqs: [
        {
          q: '¿Ayudan a encontrar un salón de eventos?',
          a: 'Sí. Te orientamos para elegir salón de eventos o locales según invitados, zona y presupuesto, y coordinamos montaje y catering.',
        },
        {
          q: '¿También trabajan haciendas en CDMX y Teotihuacán?',
          a: 'Sí. Asesoramos haciendas en CDMX, zona Teotihuacán y otras ciudades, y armamos banquete, mobiliario y decoración en el mismo paquete.',
        },
        {
          q: '¿Cómo cotizo un espacio para mi evento?',
          a: 'Escríbenos por WhatsApp al 55 4008 0373 con ciudad, fecha e invitados. Te proponemos opciones de salón, hacienda o terraza sin compromiso.',
        },
      ],
    },
    'wedding-planner': {
      headline: PRIORITY_HUB_SERP['wedding-planner'].headline,
      seoTitle: PRIORITY_HUB_SERP['wedding-planner'].title,
      seoDescription: PRIORITY_HUB_SERP['wedding-planner'].desc,
      h1: PRIORITY_HUB_SERP['wedding-planner'].h1,
      sectionTitle: 'Planeación y coordinación de bodas',
      description: [
        'Wedding planner para bodas en México: planeación, timeline, proveedores y coordinación el día del evento con el equipo Bodasesor.',
        'Atendemos bodas en CDMX, Puebla y todo el país. Unificamos banquete, decoración, música y logística para que disfrutes sin estrés.',
        'Cotiza tu wedding planner por WhatsApp: te compartimos alcance del servicio y siguientes pasos según fecha y ciudad.',
      ],
      localBullets: [
        'Wedding planner con coordinación integral del día.',
        'Proveedores internos: banquete, florería, música y más.',
        'Cobertura en CDMX, Puebla y principales ciudades.',
        'Timeline, ensayos y supervisión en sitio.',
        'Cotización por WhatsApp sin compromiso.',
      ],
      faqs: [
        {
          q: '¿Ofrecen wedding planner en Puebla y CDMX?',
          a: 'Sí. Coordinamos bodas en Puebla, CDMX y otras ciudades de México con el mismo estándar de producción Bodasesor.',
        },
        {
          q: '¿Qué incluye el servicio de wedding planner?',
          a: 'Planeación, selección de proveedores, timeline, ensayos y coordinación el día del evento. Podemos incluir banquete y montaje en el mismo paquete.',
        },
        {
          q: '¿Cómo inicio con un wedding planner Bodasesor?',
          a: 'Escríbenos por WhatsApp con fecha y ciudad de la boda. Te enviamos propuesta y agenda de primera llamada sin compromiso.',
        },
      ],
    },
    'barras-de-bebidas': {
      headline: PRIORITY_HUB_SERP['barras-de-bebidas'].headline,
      seoTitle: PRIORITY_HUB_SERP['barras-de-bebidas'].title,
      seoDescription: PRIORITY_HUB_SERP['barras-de-bebidas'].desc,
      h1: PRIORITY_HUB_SERP['barras-de-bebidas'].h1,
      sectionTitle: 'Barras para bebidas: opciones y montaje',
      description: [
        'Barras de bebidas para eventos: mocteles, mixología, café premium y carritos de helado con bartenders y baristas profesionales.',
        'Armamos barras para bebidas con o sin alcohol, cristalería, hielo y garnishes incluidos. Combina varias estaciones en un solo open bar.',
        'Cotiza tu barra de bebidas por WhatsApp: te proponemos carta y personal según invitados, duración y ciudad.',
      ],
      localBullets: [
        'Barras para bebidas con y sin alcohol para todo tipo de evento.',
        'Bartenders y baristas certificados con montaje incluido.',
        'Cristalería, hielo, garnishes y desmontaje en el paquete.',
        'Combina varias barras en un solo open bar coordinado.',
        'Cotización por WhatsApp en menos de 24 horas.',
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
    fotografia: {
      headline: PRIORITY_HUB_SERP.fotografia.headline,
      seoTitle: PRIORITY_HUB_SERP.fotografia.title,
      seoDescription: PRIORITY_HUB_SERP.fotografia.desc,
      h1: PRIORITY_HUB_SERP.fotografia.h1,
      sectionTitle: 'Fotografía, video y cabinas para tu evento',
      description: [
        'Video y fotografía para eventos: cobertura profesional, cabinas, cámara 360 y producción audiovisual para bodas y fiestas.',
        'Capturamos la ceremonia, la recepción y los detalles. También montamos cabinas de fotos, Magic Mirror y pantallas para entretenimiento.',
        'Cotiza fotografía y video por WhatsApp: te enviamos paquetes según horas de cobertura y ciudad.',
      ],
      localBullets: [
        'Fotógrafo y videógrafo para bodas y eventos.',
        'Cabinas de fotos, cámara 360 y experiencias interactivas.',
        'Entrega digital organizada y opciones de álbum.',
        'Cobertura en CDMX y principales ciudades de México.',
        'Cotización por WhatsApp sin compromiso.',
      ],
      faqs: [
        {
          q: '¿Ofrecen video y fotografía para eventos?',
          a: 'Sí. Paquetes de fotografía y video para bodas, XV años y eventos sociales, con cobertura de ceremonia y recepción.',
        },
        {
          q: '¿También rentan cabinas de fotos?',
          a: 'Sí. Cabinas, Magic Mirror, pantalla verde y cámara 360 para entretenimiento durante la fiesta.',
        },
        {
          q: '¿Cómo cotizo fotografía o video?',
          a: 'Escríbenos por WhatsApp con fecha, ciudad y horas de cobertura. Te enviamos opciones sin compromiso.',
        },
      ],
    },
    shows: {
      headline: PRIORITY_HUB_SERP.shows.headline,
      seoTitle: PRIORITY_HUB_SERP.shows.title,
      seoDescription: PRIORITY_HUB_SERP.shows.desc,
      h1: PRIORITY_HUB_SERP.shows.h1,
      sectionTitle: 'Shows en vivo para tu celebración',
      description: [
        'Shows y entretenimiento para eventos: percusión, danza, circo y tecnología de luz para bodas, XV años y fiestas.',
        'Coordinamos el timing con tu timeline para que cada acto entre en el momento correcto sin frenar la fiesta.',
        'Cotiza shows por WhatsApp: te proponemos actos según duración, espacio y estilo del evento.',
      ],
      localBullets: [
        'Batucada, danza, circo y shows con tecnología.',
        'Actos de ~6 minutos o sets más largos según el paquete.',
        'Coordinación con DJ y maestro de ceremonias.',
        'Cobertura nacional con logística incluida.',
        'Cotización por WhatsApp en menos de 24 horas.',
      ],
      faqs: [
        {
          q: '¿Qué tipo de shows ofrecen?',
          a: 'Percusión, danza, circo y actos con luz/tecnología. Armamos un set según el estilo de tu evento.',
        },
        {
          q: '¿Puedo combinar varios shows?',
          a: 'Sí. Es común combinar batucada de entrada con un acto de danza o circo a media noche.',
        },
        {
          q: '¿Cómo cotizo un show?',
          a: 'Escríbenos por WhatsApp con fecha, ciudad y tipo de evento. Te enviamos disponibilidad y propuesta.',
        },
      ],
    },
    musica: {
      headline: PRIORITY_HUB_SERP.musica.headline,
      seoTitle: PRIORITY_HUB_SERP.musica.title,
      seoDescription: PRIORITY_HUB_SERP.musica.desc,
      h1: PRIORITY_HUB_SERP.musica.h1,
      sectionTitle: 'DJ y música en vivo',
      description: [
        'Música y DJ para eventos: ambientación, baile y momentos clave con playlist a tu medida.',
        'Grupos versátiles, mariachi, saxofón y DJ profesional para bodas, XV años y corporativos.',
        'Cotiza música para tu evento por WhatsApp con duración y estilo deseado.',
      ],
      localBullets: [
        'DJ profesional con equipo de audio.',
        'Música en vivo: grupos, mariachi y saxofón.',
        'Coordinación de entradas, vals y último baile.',
        'Compatible con shows y audio Bodasesor.',
        'Cotización por WhatsApp sin compromiso.',
      ],
      faqs: [
        {
          q: '¿Incluyen DJ para la fiesta?',
          a: 'Sí. DJ con equipo, playlist personalizada y coordinación de momentos clave del evento.',
        },
        {
          q: '¿También hay música en vivo?',
          a: 'Sí. Grupos versátiles, mariachi, saxofón y más según el estilo de tu celebración.',
        },
        {
          q: '¿Cómo cotizo música o DJ?',
          a: 'Escríbenos por WhatsApp con fecha, ciudad y horas de servicio. Te enviamos opciones disponibles.',
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
    bodas: priorityEventType('bodas', 'Bodas', 'banquetes, florería, música, fotografía y wedding planner'),
    corporativos: priorityEventType(
      'corporativos',
      'Eventos Corporativos',
      'coffee break, catering, audio e iluminación',
    ),
    'xv-anos': priorityEventType(
      'xv-anos',
      'XV Años',
      'banquete, decoración, música, shows y mesa de dulces',
    ),
    graduaciones: priorityEventType(
      'graduaciones',
      'Graduaciones',
      'catering, música, decoración y fotografía',
    ),
    'baby-shower': eventTypeNational('Baby Shower', 'decoración, catering, mesa de dulces y fotografía'),
    cumpleanos: eventTypeNational('Cumpleaños', 'catering, música, inflables y mesa de dulces'),
    'primera-comunion': priorityEventType(
      'primera-comunion',
      'Primera Comunión',
      'banquete, decoración y mesa de dulces',
    ),
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
    h1: extra.h1 || h1,
    headline: extra.headline,
    sectionTitle: extra.sectionTitle || 'Opciones, montaje y cotización',
    description: Array.isArray(extra.description) ? extra.description : [],
    localBullets: extra.localBullets,
    zones: NATIONAL_COVERAGE_ZONES,
    faqs: extra.faqs,
    seoTitle: extra.seoTitle || nationalSeoTitle(title),
    seoDescription:
      extra.seoDescription ||
      `${title} para bodas y eventos en México. Cotiza con Bodasesor por WhatsApp sin compromiso.`,
    primaryKeyword: title,
  }
}
