export const WHATSAPP = '5215540080373'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP}`
export const PHONE = '55 4008 0373'
export const EMAIL = 'bodasesor@gmail.com'
export const INSTAGRAM = '@bodasesormx'
export const INSTAGRAM_URL = 'https://www.instagram.com/bodasesormx'

export const whatsappLink = (msg = 'Hola, me interesa cotizar para mi evento') =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(msg)}`

export const CITIES = [
  'CDMX',
  'Estado de México',
  'Aguascalientes',
  'Cancún / Riviera Maya',
  'Cuernavaca',
  'Guadalajara',
  'León',
  'Los Cabos',
  'Mérida',
  'Monterrey',
  'Morelia',
  'Oaxaca',
  'Pachuca',
  'Puebla',
  'Puerto Vallarta',
  'Querétaro',
  'San Luis Potosí',
  'San Miguel de Allende',
  'Tijuana',
  'Toluca / Metepec',
  'Torreón',
  'Veracruz',
]

export const CLIENTS = [
  'Omnilife', 'Cisidat', 'Deloitte', 'Impulsa Labs', 'BCA', 'Bomker',
  'Mexico Railway', 'Jumex', 'Inspark', 'BlackBerry', 'Iusacell', 'Cinemex',
  'Cinépolis', 'OXXO', 'Telcel', 'Bimbo', 'Cemex', 'Televisa Univision',
  'Banorte', 'Heineken México', 'Nestlé México', 'Walmart México', 'Soriana',
]

export const TESTIMONIALS = [
  {
    text: 'Desde la organización no nos preocupamos por nada, todo estuvo muy bien coordinado y el evento salió increíble. Siempre fueron muy profesionales y estuvieron al pendiente de cada detalle.',
    name: 'Cinthya Rodríguez',
    type: 'Evento corporativo',
    initials: 'CR',
  },
  {
    text: 'La comida estuvo exquisita de verdad 💖 y todo el equipo que montó, cocinó, sirvió y nos atendió ese día fue de primera. Gracias por ayudarme a hacer mi boda un evento memorable.',
    name: 'Ximena Hernández',
    type: 'Boda',
    initials: 'XH',
  },
  {
    text: 'Excelente servicio y atención. Ninguna queja del equipo de cocina y meseros, organizados, amables y atentos. La comida estuvo muy rica. Los volvería a contratar sin duda.',
    name: 'Sandra Toledano',
    type: 'Boda íntima',
    initials: 'ST',
  },
  {
    text: 'Gran acompañamiento de Alejandro, gran profesional buscando solucionar cada uno de los retos que fueron saliendo. Total confianza para futuros eventos.',
    name: 'Adolfo Núñez',
    type: 'Boda civil',
    initials: 'AN',
  },
  {
    text: 'Recibí múltiples felicitaciones de mis invitados por el sabor de los alimentos. Los meseros fueron muy amables y atentos. Destacaría la puntualidad y comprensión.',
    name: 'Selene Carrillo',
    type: 'Celebración familiar',
    initials: 'SC',
  },
  {
    text: 'Cuidan cada detalle, la comida estuvo deliciosa, los meseros muy amables, la decoración, todo salió increíble. Valió 100% la pena.',
    name: 'Rosa Isabel Castro',
    type: 'Evento especial',
    initials: 'RC',
  },
]

export const EVENT_TYPES = [
  { label: 'Baby Shower', slug: 'baby-shower' },
  { label: 'Bodas', slug: 'bodas' },
  { label: 'Cenas', slug: 'cenas' },
  { label: 'Corporativos', slug: 'corporativos' },
  { label: 'Cumpleaños', slug: 'cumpleanos' },
  { label: 'XV Años', slug: 'xv-anos' },
  { label: 'Graduaciones', slug: 'graduaciones' },
  { label: 'Primera Comunión', slug: 'primera-comunion' },
]

export const BANQUETES_SERVICES = {
  title: 'Banquetes & Catering',
  description: 'Desde banquetes formales de alta cocina hasta estaciones de antojitos mexicanos — todo el servicio de alimentos para tu evento en un solo catálogo.',
  stats: '25 servicios disponibles. Banquetes formales, catering gourmet, barras de alimentos y estaciones temáticas.',
  categories: [
    {
      icon: '🍽️',
      label: 'Banquetes',
      desc: 'Alta cocina servida a la mesa con chefs ejecutivos, meseros y vajilla premium.',
      items: [
        { name: 'Banquete Formal', desc: 'Gastronomía de lujo para tu celebración más importante', slug: 'banquetes' },
        { name: 'Banquete Kosher', desc: 'Certificación rabínica, ingredientes kosher y menús tradicionales', slug: 'banquete-kosher' },
        { name: 'Banquete Mexicano', desc: 'Recetas regionales auténticas con técnicas contemporáneas', slug: 'banquete-mexicano' },
        { name: 'Banquete Navideño', desc: 'Cena de gala navideña para posadas y fiestas de fin de año', slug: 'banquete-navideno' },
      ],
    },
    {
      icon: '👨‍🍳',
      label: 'Catering',
      desc: 'Platillos gourmet preparados en sitio para todo tipo de evento.',
      items: [
        { name: 'Pozole y Tostadas', desc: 'Pozole rojo, blanco y verde con todos los acompañantes', slug: 'pozole-tostadas' },
        { name: 'Paella', desc: 'Paella española auténtica cocinada en vivo con mariscos', slug: 'paella' },
        { name: 'Comida Corrida', desc: 'Menú del día completo para comedores y eventos de empresa', slug: 'comida-corrida' },
        { name: 'Coffee Break', desc: 'Café de especialidad, pastelería y snacks para corporativos', slug: 'coffee-break' },
        { name: 'Bocadillos', desc: 'Bocadillos gourmet para cócteles y recepciones elegantes', slug: 'bocadillos' },
        { name: 'Canapés Premium', desc: 'Canapés de autor para bodas y eventos de lujo', slug: 'canapes-premium' },
        { name: 'Desayuno Social', desc: 'Brunch y desayunos para eventos matutinos y corporativos', slug: 'desayuno-social' },
      ],
    },
    {
      icon: '🥗',
      label: 'Barras de Alimentos',
      desc: 'Estaciones temáticas de comida preparada al momento frente a tus invitados.',
      items: [
        { name: 'Barra de Crepas', desc: 'Crepas dulces y saladas preparadas al momento', slug: 'barra-crepas' },
        { name: 'Barra de Sushi y Poke Bowl', desc: 'Sushi rolls, nigiri y poke bowls con chef japonés', slug: 'barra-sushi' },
        { name: 'Barra de Mariscos', desc: 'Cocteles de camarón, ostiones y ceviche fresco', slug: 'barra-mariscos' },
        { name: 'Barra de Paninis', desc: 'Paninis artesanales con pan fresco e ingredientes gourmet', slug: 'barra-paninis' },
        { name: 'Barra de Pastas', desc: 'Pastas italianas preparadas al momento con diferentes salsas', slug: 'barra-pastas' },
        { name: 'Barra de Pizzas', desc: 'Pizzas artesanales al horno con variedad de ingredientes', slug: 'barra-pizzas' },
        { name: 'Barra Americana', desc: 'Hamburguesas, hot dogs y papas para eventos y fiestas', slug: 'barra-americana' },
        { name: 'Barra Yucateca', desc: 'Cochinita pibil, salbutes y panuchos auténticos yucatecos', slug: 'barra-yucateca' },
      ],
    },
    {
      icon: '🔥',
      label: 'Estaciones',
      desc: 'Puestos y estaciones de comida típica mexicana cocinada en vivo.',
      items: [
        { name: 'Parrillada Argentina', desc: 'Cortes premium a la parrilla con asadores profesionales', slug: 'parrillada-argentina' },
        { name: 'Parrillada Tradicional', desc: 'Parrillada mexicana para reuniones familiares y eventos', slug: 'parrillada-tradicional' },
        { name: 'Taquiza de Guisados', desc: 'Variedad de guisados auténticos servidos en tortilla', slug: 'taquiza-guisados' },
        { name: 'Puestos de Antojitos', desc: 'Tacos, sopes, gorditas y más antojitos mexicanos', slug: 'puestos-antojitos' },
        { name: 'Puestos de Quesadillas', desc: 'Quesadillas de tortilla azul o blanca con variedad de rellenos', slug: 'puestos-quesadillas' },
        { name: 'Carrito de Snacks', desc: 'Carrito de snacks dulces y salados para eventos y fiestas', slug: 'carrito-snacks' },
      ],
    },
  ],
}

export const BARRAS_SERVICES = [
  { icon: '🥤', name: 'Barra de Bebidas', desc: 'Barras de aguas frescas, refrescos, jugos naturales y bebidas personalizadas para tus invitados', slug: 'barra-bebidas' },
  { icon: '🍹', name: 'Barra de Mocteles', desc: 'Bebidas sin alcohol inspiradas en cócteles clásicos: presentación elegante y sabores únicos para todos', slug: 'barra-mocteles' },
  { icon: '🍸', name: 'Cocteles y Mixología', desc: 'Bartenders profesionales con carta de cócteles artesanales y show de flairtending para tus invitados', slug: 'cocteles-mixologia' },
  { icon: '☕', name: 'Barra de Café Premium', desc: 'Barista certificado, máquina espresso profesional, café de especialidad y bebidas calientes gourmet', slug: 'barra-cafe-premium' },
  { icon: '🧁', name: 'Paletas y Helados', desc: 'Carrito de paletas artesanales, helados y nieves para refrescar a tus invitados con variedad de sabores', slug: 'paletas-helados' },
]

export const WEDDING_PLANNER_SERVICES = [
  { name: 'Planeación de Evento', desc: 'Tu visión convertida en un plan perfecto', detail: 'Servicio completo de planeación desde cero: definición de concepto, selección de proveedores, presupuesto y cronograma. Todo organizado para que no te preocupes por nada.' },
  { name: 'Coordinación de Evento', desc: 'Todo fluye, todo se cumple, todo a tiempo', detail: 'Coordinación integral el día del evento: supervisamos cada proveedor, resolvemos imprevistos y garantizamos que todo suceda según el plan.' },
  { name: 'Asesoría Personalizada', desc: 'La guía experta que necesitas en el momento justo', detail: 'Sesiones de asesoría uno a uno con nuestra especialista en eventos. Revisamos tu concepto, proveedores, presupuesto y te orientamos en cada decisión.' },
  { name: 'Servicios Independientes', desc: 'Solo lo que necesitas, sin paquetes innecesarios', detail: 'Contrata solo el servicio específico que requieres: gestión de un proveedor, elaboración de timeline, mesa de regalos, logística de transporte y más.' },
  { name: 'Supervisión de Evento', desc: 'Ojos expertos en cada detalle el gran día', detail: 'Supervisión presencial el día del evento: verificamos que cada proveedor cumpla, que los tiempos se respeten y que los detalles sean exactamente como los imaginaste.' },
  { name: 'Creación Total del Evento', desc: 'Tú sueñas, nosotros lo creamos todo', detail: 'El servicio más completo: diseñamos, planeamos, coordinamos y ejecutamos tu evento de principio a fin. Tú solo llega y disfruta.' },
]

export const WHY_BODASESOR = [
  { icon: '🤝', title: 'Un solo contacto', desc: 'Coordinamos todos los proveedores de tu evento. Tú solo hablas con nosotros.' },
  { icon: '🏆', title: 'Más de 1,000 eventos', desc: '15 años de experiencia en bodas, XV años, corporativos y más en todo México.' },
  { icon: '✨', title: 'Garantía de calidad', desc: 'Todos nuestros proveedores son auditados y cumplen nuestros estándares.' },
  { icon: '⚡', title: 'Respuesta en 1 hora', desc: 'Cotización personalizada en menos de una hora. Rápido, fácil y sin compromiso.' },
]

// Instagram gallery images (groups of 3 per slide)
export const INSTAGRAM_GROUPS = Array.from({ length: 10 }, (_, i) => {
  const base = i * 3
  return [base + 1, base + 2, base + 3].map(n => `/images/instagram/ig${n}.jpg`)
})
