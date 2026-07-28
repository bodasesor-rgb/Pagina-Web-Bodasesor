/**
 * Generates src/data/banquetes-menus.js with 16 menu sub-pages
 * (4 banquet types × 4 formats: 4/3/2 tiempos + buffet)
 *
 * Usage: node scripts/generate-banquetes-menus.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, 'src/data/banquetes-menus.js')

const SERVICE_TIERS = [
  {
    name: 'Básico',
    items: [
      'Meseros: 1 c/20 personas · 5 horas',
      'Personal de cocina',
      'Vajilla blanca + cubertería',
      'Cristalería: copa + vaso',
      'Silla Tiffany',
      'Centro de mesa con flores de temporada',
      'Barra: vitroleros (2 sabores) + agua + café',
      'Barman 1 c/50 personas · charolas · hielo',
    ],
  },
  {
    name: 'Tradicional',
    items: [
      'Meseros: 1 c/15 personas · 5 horas',
      'Personal de cocina',
      'Vajilla blanca + cubertería + plato base decorativo',
      'Cristalería completa: highball, old fashion, tequileros, copas, ceniceros, jarras',
      'Silla Tiffany + camino de mesa',
      'Centro de mesa con flores de temporada',
      'Barra: refrescos + margaritas s/a + agua + café + 1 sabor de agua',
      'Barman 1 c/50 personas · charolas · hielo',
    ],
  },
  {
    name: 'Premium',
    popular: true,
    items: [
      'Meseros: 1 c/10 personas · 5 horas',
      'Personal de cocina especializado',
      'Vajilla blanca + cubertería + plato base decorativo + copas de color',
      'Cristalería completa premium',
      'Silla Tiffany / Crossback / Avantgarde',
      'Mesa de madera opcional (redonda, cuadrada o rectangular)',
      'Centro de mesa con flores de temporada',
      'Barra completa: refrescos + margaritas s/a + agua + café + 1 sabor de agua',
      'Barman 1 c/50 personas · charolas · hielo',
    ],
  },
]

const PARENTS = [
  {
    slug: 'banquetes',
    name: 'Banquete Formal',
    shortName: 'Formal',
    href: '/banquetes',
    img: '/images/banquete-hero.png',
    theme: 'formal',
  },
  {
    slug: 'banquete-kosher',
    name: 'Banquete Kosher',
    shortName: 'Kosher',
    href: '/banquete-kosher',
    img: '/images/banquete-kosher-hero.png',
    theme: 'kosher',
  },
  {
    slug: 'banquete-mexicano',
    name: 'Banquete Mexicano',
    shortName: 'Mexicano',
    href: '/banquete-mexicano',
    img: '/images/banquete-mexicano-hero.png',
    theme: 'mexicano',
  },
  {
    slug: 'banquete-navideno',
    name: 'Banquete Navideño',
    shortName: 'Navideño',
    href: '/banquete-navideno',
    img: '/images/banquete-navideno-hero.png',
    theme: 'navideno',
  },
]

const FORMATS = [
  {
    slug: '4-tiempos',
    label: '4 Tiempos',
    name: (p) => `${p.name} de 4 Tiempos`,
    headline: 'Sopa, entrada, plato fuerte y postre — la experiencia completa',
    desc: 'Menú servido a la mesa con cuatro tiempos. Ideal para bodas, XV años y cenas de gala de 3 a 4 horas.',
    duration: '3.5 – 4 horas',
  },
  {
    slug: '3-tiempos',
    label: '3 Tiempos',
    name: (p) => `${p.name} de 3 Tiempos`,
    headline: 'Entrada, plato fuerte y postre con servicio elegante',
    desc: 'Formato clásico de tres tiempos. Perfecto para eventos de 2 a 3 horas con excelente relación calidad-tiempo.',
    duration: '2.5 – 3 horas',
  },
  {
    slug: '2-tiempos',
    label: '2 Tiempos',
    name: (p) => `${p.name} de 2 Tiempos`,
    headline: 'Plato fuerte y postre — práctico y sofisticado',
    desc: 'Opción ágil para eventos de mediodía, graduaciones o cenas ejecutivas de 1.5 a 2 horas.',
    duration: '1.5 – 2 horas',
  },
  {
    slug: 'buffet',
    label: 'Buffet',
    name: (p) => `${p.name} Buffet`,
    headline: 'Estaciones abundantes con servicio dinámico',
    desc: 'Amplia variedad en estaciones calientes y frías. Ideal para eventos grandes, posadas y recepciones informales.',
    duration: '2 – 3 horas',
  },
]

const MENUS = {
  formal: {
    '4-tiempos': [
      'Sopa: Crema de elote rostizado con aceite de trufa',
      'Entrada: Ensalada de arúgula con peras caramelizadas y queso de cabra',
      'Plato fuerte: Filete de res en salsa de vino tinto con puré trufado',
      'Postre: Coulant de chocolate con helado de vainilla',
    ],
    '3-tiempos': [
      'Entrada: Carpaccio de res con rúcula, parmesano y reducción balsámica',
      'Plato fuerte: Pechuga rellena de espinacas en salsa de champiñones',
      'Postre: Tarta tatin de manzana con crema inglesa',
    ],
    '2-tiempos': [
      'Plato fuerte: Salmón en costra de hierbas con vegetales asados',
      'Postre: Mousse de frutos rojos en copa',
    ],
    buffet: [
      'Estación fría: Ensaladas gourmet, quesos importados y panes artesanales',
      'Estación caliente: Res en salsa de vino, pollo al limón y pasta alfredo',
      'Estación internacional: Sushi rolls, ceviche y brochetas mediterráneas',
      'Postres: Barra de pasteles, fruta fresca y mini postres de autor',
    ],
  },
  kosher: {
    '4-tiempos': [
      'Sopa: Caldo de pollo con kneidlach (bolitas de matzá)',
      'Entrada: Ensalada israelí con tahini de limón',
      'Plato fuerte: Pechuga de pollo rellena en salsa de hierbas con arroz árabe',
      'Postre: Baklava artesanal y frutas frescas de temporada',
    ],
    '3-tiempos': [
      'Entrada: Hummus artesanal con pita tostada y aceitunas marinadas',
      'Plato fuerte: Brisket cocinado lentamente con papas y zanahorias glaseadas',
      'Postre: Rugelach casero y fruta de temporada',
    ],
    '2-tiempos': [
      'Plato fuerte: Pescado al horno con hierbas y vegetales asados (Parve)',
      'Postre: Halva con miel y nueces',
    ],
    buffet: [
      'Estación fría: Ensaladas, dips Kosher y pita recién horneada',
      'Estación cárnica: Pollo asado, kebabs y guarniciones sin lácteos',
      'Estación láctea: Quiches, quesos Kosher y pastas con crema',
      'Postres: Baklava, fruta fresca y galletas Kosher',
    ],
  },
  mexicano: {
    '4-tiempos': [
      'Sopa: Pozole rojo tradicional con todos sus acompañantes',
      'Entrada: Ensalada de nopales con queso panela y epazote',
      'Plato fuerte: Pollo en mole negro oaxaqueño con arroz rojo',
      'Postre: Tres leches con canela o capirotada de temporada',
    ],
    '3-tiempos': [
      'Entrada: Tostaditas con guacamole, chapulines y queso cotija',
      'Plato fuerte: Chiles en nogada con arroz blanco y frijoles de olla',
      'Postre: Arroz con leche artesanal y ate de guayaba',
    ],
    '2-tiempos': [
      'Plato fuerte: Cochinita pibil con cebolla morada y tortillas hechas a mano',
      'Postre: Flan napolitano con cajeta',
    ],
    buffet: [
      'Estación de tacos: Suadero, pastor, bistec y guisados del día',
      'Estación regional: Carnitas michoacanas, barbacoa y mixiotes',
      'Antojitos: Quesadillas, sopes, gorditas y elotes preparados',
      'Postres: Churros, capirotada, dulces típicos y aguas frescas',
    ],
  },
  navideno: {
    '4-tiempos': [
      'Sopa: Crema de calabaza con semillas tostadas',
      'Entrada: Ensalada navideña con nuez, granada y vinagreta de miel',
      'Plato fuerte: Pavo relleno tradicional con puré de papa y gravy',
      'Postre: Buñuelos con piloncillo o rosca de reyes (temporada)',
    ],
    '3-tiempos': [
      'Entrada: Ensalada de betabel con queso de cabra y nuez',
      'Plato fuerte: Bacalao a la vizcaína con arroz blanco y aceitunas',
      'Postre: Ponche de frutas servido caliente y galletas navideñas',
    ],
    '2-tiempos': [
      'Plato fuerte: Pierna de cerdo al horno con romeritos y papas',
      'Postre: Rosca de reyes o turrón artesanal',
    ],
    buffet: [
      'Estación caliente: Pavo, pierna de cerdo, romeritos y bacalao',
      'Estación mexicana: Pozole, tamales y atole de temporada',
      'Estación internacional: Jamón, quesos y panes especiales',
      'Postres: Buñuelos, rosca, fruta de temporada y chocolate caliente',
    ],
  },
}

const INCLUDED = {
  formal: [
    'Chef ejecutivo y servicio de meseros profesionales',
    'Vajilla fina, cristalería y cubiertos premium',
    'Centro de mesa floral básico incluido',
    'Coordinador de banquete el día del evento',
  ],
  kosher: [
    'Supervisión rabínica (mashguiaj) durante la preparación',
    'Ingredientes con certificación Kosher',
    'Vajilla separada para cárnicos y lácteos',
    'Menú revisado y aprobado antes del evento',
  ],
  mexicano: [
    'Recetas regionales auténticas con ingredientes locales',
    'Salsas artesanales y tortillas hechas a mano',
    'Servicio de meseros con uniforme tradicional opcional',
    'Aguas frescas de jamaica y tamarindo incluidas',
  ],
  navideno: [
    'Menú con clásicos navideños mexicanos e internacionales',
    'Montaje temático navideño en mesas',
    'Servicio completo: preparación, montaje y limpieza',
    'Disponibilidad prioritaria en temporada (dic. 16–31)',
  ],
}

const menus = []
for (const parent of PARENTS) {
  for (const format of FORMATS) {
    const menuExample = MENUS[parent.theme][format.slug]
    menus.push({
      parentSlug: parent.slug,
      parentName: parent.name,
      parentHref: parent.href,
      parentImg: parent.img,
      slug: format.slug,
      name: format.name(parent),
      label: format.label,
      headline: format.headline,
      seoTitle: `${format.name(parent)} | Bodasesor`,
      seoDescription: `${format.desc} ${parent.name} para bodas, XV años, corporativos y celebraciones en México.`,
      description: [
        format.desc,
        `Nuestro ${format.name(parent).toLowerCase()} combina la excelencia de ${parent.name.toLowerCase()} con un servicio impecable: meseros capacitados, montaje de mesas y presentación cuidada en cada platillo.`,
        'Personalizamos cada propuesta según número de invitados, restricciones dietéticas y estilo de tu evento. Cotiza sin compromiso y recibe una propuesta de menú a tu medida.',
      ],
      menuExample,
      duration: format.duration,
      included: INCLUDED[parent.theme],
      serviceTiers: SERVICE_TIERS,
      idealPara: ['Bodas', 'XV Años', 'Eventos corporativos', 'Graduaciones', 'Cenas de gala'],
    })
  }
}

const banquetesNavGroups = PARENTS.map((parent) => ({
  heading: parent.name,
  href: parent.href,
  items: FORMATS.map((f) => ({
    name: f.slug === 'buffet' ? 'Banquete buffet' : `Banquete ${f.label.toLowerCase()}`,
    href: `${parent.href}/${f.slug}`,
  })),
}))

// Legacy nested shape (parent → children)
const banquetesNavItems = PARENTS.map((parent) => ({
  name: parent.name,
  href: parent.href,
  children: FORMATS.map((f) => ({
    name: f.slug === 'buffet' ? 'Banquete buffet' : `Banquete ${f.label.toLowerCase()}`,
    href: `${parent.href}/${f.slug}`,
  })),
}))

const file = `// Banquet menu sub-pages — ${menus.length} entries (4 types × 4 formats)
// Regenerate: node scripts/generate-banquetes-menus.mjs

export const BANQUET_PARENTS = ${JSON.stringify(PARENTS, null, 2)}

export const BANQUET_MENU_FORMATS = ${JSON.stringify(FORMATS.map((f) => ({ slug: f.slug, label: f.label })), null, 2)}

export const banquetesNavGroups = ${JSON.stringify(banquetesNavGroups, null, 2)}

export const banquetesNavItems = ${JSON.stringify(banquetesNavItems, null, 2)}

export const BANQUET_MENUS = ${JSON.stringify(menus, null, 2)}

export function getBanquetMenu(parentSlug, menuSlug) {
  if (!parentSlug || !menuSlug) return null
  return BANQUET_MENUS.find((m) => m.parentSlug === parentSlug && m.slug === menuSlug) ?? null
}

export function getMenusForParent(parentSlug) {
  return BANQUET_MENUS.filter((m) => m.parentSlug === parentSlug)
}

export function getBanquetParent(slug) {
  return BANQUET_PARENTS.find((p) => p.slug === slug) ?? null
}
`

fs.writeFileSync(OUT, file)
console.log(`Wrote ${menus.length} banquet menus to ${OUT}`)
