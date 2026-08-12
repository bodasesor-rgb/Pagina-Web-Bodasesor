/**
 * Local context for Gemini city-hub rewrites (zones / region — not fake venues).
 * Keep factual and short; generators inject this into the prompt.
 */
export const CITY_LOCAL_CONTEXT = {
  'ciudad-de-mexico': {
    state: 'Ciudad de México',
    zones: ['Polanco', 'Roma Norte', 'Condesa', 'Santa Fe', 'Coyoacán', 'Pedregal', 'Interlomas'],
    notes: 'Mercado de bodas y corporativos grande; salones, rooftops y jardines en CDMX y zona metropolitana.',
  },
  'estado-de-mexico': {
    state: 'Estado de México',
    zones: ['Interlomas', 'Huixquilucan', 'Naucalpan', 'Toluca', 'Metepec', 'Atizapán'],
    notes: 'Muchas celebraciones en salones del Poniente y Valle de Toluca; logística hacia CDMX.',
  },
  aguascalientes: {
    state: 'Aguascalientes',
    zones: ['Centro', 'Campestre', 'Norte', 'Villasunción'],
    notes: 'Bodas y XV en salones campestres y haciendas del Bajío.',
  },
  acapulco: {
    state: 'Guerrero',
    zones: ['Diamante', 'Punta Diamante', 'Bay Zone', 'Puerto Marqués'],
    notes: 'Eventos destination con vista al mar; logística hotelería y clima cálido.',
  },
  cancun: {
    state: 'Quintana Roo',
    zones: ['Zona Hotelera', 'Puerto Cancún', 'Centro', 'Riviera Maya cercana'],
    notes: 'Bodas destination y eventos hotel; mix local + invitados internacionales.',
  },
  cozumel: {
    state: 'Quintana Roo',
    zones: ['Centro', 'Sur', 'Norte', 'playas'],
    notes: 'Eventos island destination; ferry/aeropuerto y proveedores locales.',
  },
  cuernavaca: {
    state: 'Morelos',
    zones: ['Centro', 'Delicias', 'Ahuatepec', 'Temixco', 'Jiutepec'],
    notes: 'Jardines y haciendas de clima templado; popular para bodas de CDMX que buscan exterior.',
  },
  guadalajara: {
    state: 'Jalisco',
    zones: ['Providencia', 'Zapopan', 'Tlaquepaque', 'Vallarta', 'Puerta de Hierro'],
    notes: 'Segundo mercado grande del país; salones, quintas y cultura tapatía en celebraciones.',
  },
  leon: {
    state: 'Guanajuato',
    zones: ['Campestre', 'La Martinica', 'Las Trojes', 'Centro', 'Valle del Campestre', 'Premier'],
    notes: 'Hub del Bajío (calzado/industria); bodas en salones campestres y haciendas de Guanajuato.',
  },
  'los-cabos': {
    state: 'Baja California Sur',
    zones: ['Cabo San Lucas', 'San José del Cabo', 'Corridor', 'Puerto Los Cabos'],
    notes: 'Destination weddings de lujo; resorts y venues outdoor frente al mar.',
  },
  merida: {
    state: 'Yucatán',
    zones: ['Centro histórico', 'García Ginerés', 'Montes de Amé', 'Cholul', 'Temozón'],
    notes: 'Haciendas henequeneras y casonas coloniales; gastronomía yucateca en banquetes.',
  },
  monterrey: {
    state: 'Nuevo León',
    zones: ['San Pedro', 'Valle Oriente', 'Cumbres', 'Centro', 'Santiago'],
    notes: 'Mercado corporativo fuerte + bodas en San Pedro; salones y quintas de montaña.',
  },
  morelia: {
    state: 'Michoacán',
    zones: ['Centro histórico', 'Altos', 'Camelinas', 'Tres Marías'],
    notes: 'Patrimonio colonial; banquetes con toque michoacano y jardines templados.',
  },
  oaxaca: {
    state: 'Oaxaca',
    zones: ['Centro histórico', 'Reforma', 'San Felipe', 'Etla'],
    notes: 'Bodas con identidad gastronómica oaxaqueña; venues coloniales y de valle.',
  },
  pachuca: {
    state: 'Hidalgo',
    zones: ['Centro', 'Periodistas', 'Plateado', 'Mineral del Monte cercano'],
    notes: 'Eventos regionales del Valle de México norte; salones y haciendas hidalguenses.',
  },
  puebla: {
    state: 'Puebla',
    zones: ['Angelópolis', 'La Paz', 'Centro histórico', 'Cholula', 'Lomas de Angelópolis'],
    notes: 'Fuerte tradición de XV y bodas; gastronomía poblana y salones en Angelópolis/Cholula.',
  },
  'puerto-vallarta': {
    state: 'Jalisco',
    zones: ['Zona Hotelera', 'Marina', 'Centro', 'Nuevo Vallarta', 'Bucerías'],
    notes: 'Destination beach weddings; mix resort + venues frente a bahía.',
  },
  queretaro: {
    state: 'Querétaro',
    zones: ['Centro histórico', 'Juriquilla', 'Milán', 'El Refugio', 'Corregidora'],
    notes: 'Bajío en crecimiento; haciendas, salones Juriquilla y bodas de fin de semana.',
  },
  'san-luis-potosi': {
    state: 'San Luis Potosí',
    zones: ['Centro', 'Lomas', 'Tangamanga', 'Himno Nacional'],
    notes: 'Eventos regionales del Altiplano; salones y quinta potosinas.',
  },
  'san-miguel-allende': {
    state: 'Guanajuato',
    zones: ['Centro histórico', 'Atotonilco', 'Los Frailes', 'La Lejona'],
    notes: 'Destination wedding colonial; rooftops, terrazas e invitados nacionales/internacionales.',
  },
  tijuana: {
    state: 'Baja California',
    zones: ['Zona Río', 'Playas', 'Otay', 'Centro'],
    notes: 'Eventos binacionales; salones modernos y logística frontera.',
  },
  toluca: {
    state: 'Estado de México',
    zones: ['Metepec', 'Centro Toluca', 'Zinacantepec', 'Lerma'],
    notes: 'Metepec y Valle de Toluca; jardines de clima frío y salones empresariales.',
  },
  torreon: {
    state: 'Coahuila',
    zones: ['Centro', 'Residencial Campestre', 'La Rosita', 'Nazas'],
    notes: 'Laguna; bodas y corporativos regionales con salones locales.',
  },
  'valle-de-bravo': {
    state: 'Estado de México',
    zones: ['Centro', 'Avándaro', 'La Herradura', 'lago'],
    notes: 'Weekend destination; venues boscosos y lago, popular entre CDMX.',
  },
  veracruz: {
    state: 'Veracruz',
    zones: ['Boca del Río', 'Centro', 'Costa de Oro', 'Mocambo'],
    notes: 'Eventos costeros y salones Boca del Río; clima cálido húmedo.',
  },
}

export function getCityLocalContext(slug) {
  return CITY_LOCAL_CONTEXT[slug] || null
}
