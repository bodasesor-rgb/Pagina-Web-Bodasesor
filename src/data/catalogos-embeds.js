/** @typedef {{
  id: string,
  provider: 'gamma' | 'canva',
  title: string,
  category: string,
  relatedHref: string,
  embedSrc: string,
  slug: string,
  services: string[],
}} Catalogo */

/** Auto-built from Bodasesor catalogs spreadsheet — one entry per unique Gamma/Canva catalog. */
export const CATALOGO_CATEGORIES = [
  { id: 'banquetes', label: 'Banquetes' },
  { id: 'barras', label: 'Barras y Bebidas' },
  { id: 'gastronomia', label: 'Gastronomía' },
  { id: 'mesas', label: 'Mesas dulces y extras' },
  { id: 'mobiliario', label: 'Mobiliario' },
  { id: 'produccion', label: 'Audio e iluminación' },
  { id: 'empresas', label: 'Empresas' },
]

export const CATALOGOS = 
[
  {
    "id": "mtvyjwjzr9f2ztl",
    "provider": "gamma",
    "title": "Banquete Formal",
    "category": "banquetes",
    "relatedHref": "/banquetes",
    "embedSrc": "https://gamma.app/embed/mtvyjwjzr9f2ztl",
    "slug": "banquete-formal",
    "services": [
      "Banquete 3 tiempos",
      "Banquete 4 tiempos"
    ]
  },
  {
    "id": "pk7ukfdzk55qmwv",
    "provider": "gamma",
    "title": "Banquete Kosher",
    "category": "banquetes",
    "relatedHref": "/banquete-kosher",
    "embedSrc": "https://gamma.app/embed/pk7ukfdzk55qmwv",
    "slug": "banquete-kosher",
    "services": [
      "Banquete Kosher 3 tiempos",
      "Banquete Kosher 4 tiempos",
      "Banquete Kosher Buffet"
    ]
  },
  {
    "id": "mdxr4clinu89lhc",
    "provider": "gamma",
    "title": "Banquete Mexicano",
    "category": "banquetes",
    "relatedHref": "/banquete-mexicano",
    "embedSrc": "https://gamma.app/embed/mdxr4clinu89lhc",
    "slug": "banquete-mexicano",
    "services": [
      "Banquete Mexicano 3 tiempos",
      "Banquete Mexicano 4 tiempos"
    ]
  },
  {
    "id": "rwspw9yutm1wxqb",
    "provider": "gamma",
    "title": "Banquete Navideño",
    "category": "banquetes",
    "relatedHref": "/banquete-navideno",
    "embedSrc": "https://gamma.app/embed/rwspw9yutm1wxqb",
    "slug": "banquete-navideno",
    "services": [
      "Banquete Navideños 3 tiempos",
      "Banquete Navideños 4 tiempos"
    ]
  },
  {
    "id": "18jhyxtgrtsipz6",
    "provider": "gamma",
    "title": "Barra Americana",
    "category": "barras",
    "relatedHref": "/barra-americana",
    "embedSrc": "https://gamma.app/embed/18jhyxtgrtsipz6",
    "slug": "barra-americana",
    "services": [
      "Barra Americana"
    ]
  },
  {
    "id": "6uny5ng5cjorf5k",
    "provider": "gamma",
    "title": "Barra Yucateca",
    "category": "barras",
    "relatedHref": "/barra-yucateca",
    "embedSrc": "https://gamma.app/embed/6uny5ng5cjorf5k",
    "slug": "barra-yucateca",
    "services": [
      "Barra Yucateca"
    ]
  },
  {
    "id": "m30do486cwn6vr5",
    "provider": "gamma",
    "title": "Barra de Bebidas",
    "category": "barras",
    "relatedHref": "/barra-bebidas",
    "embedSrc": "https://gamma.app/embed/m30do486cwn6vr5",
    "slug": "barra-de-bebidas",
    "services": [
      "Barra de bebidas",
      "Barra de bebidas con Alcohol"
    ]
  },
  {
    "id": "2br197aw6yxx76i",
    "provider": "gamma",
    "title": "Barra de Café",
    "category": "barras",
    "relatedHref": "/barra-cafe-premium",
    "embedSrc": "https://gamma.app/embed/2br197aw6yxx76i",
    "slug": "barra-de-cafe",
    "services": [
      "Barra de Café"
    ]
  },
  {
    "id": "dspl12wj36tyg1l",
    "provider": "gamma",
    "title": "Barra de Crepas",
    "category": "barras",
    "relatedHref": "/barra-crepas",
    "embedSrc": "https://gamma.app/embed/dspl12wj36tyg1l",
    "slug": "barra-de-crepas",
    "services": [
      "Barra de Crepas"
    ]
  },
  {
    "id": "malebob041soctf",
    "provider": "gamma",
    "title": "Barra de Mariscos",
    "category": "barras",
    "relatedHref": "/barra-mariscos",
    "embedSrc": "https://gamma.app/embed/malebob041soctf",
    "slug": "barra-de-mariscos",
    "services": [
      "Barra de mariscos"
    ]
  },
  {
    "id": "mjpgz9sp0yl23wa",
    "provider": "gamma",
    "title": "Barra de Paninis",
    "category": "barras",
    "relatedHref": "/barra-paninis",
    "embedSrc": "https://gamma.app/embed/mjpgz9sp0yl23wa",
    "slug": "barra-de-paninis",
    "services": [
      "Barra de paninis"
    ]
  },
  {
    "id": "hqg4e68bdbyo03n",
    "provider": "gamma",
    "title": "Barra de Pastas y Ensaladas",
    "category": "barras",
    "relatedHref": "/barra-pastas",
    "embedSrc": "https://gamma.app/embed/hqg4e68bdbyo03n",
    "slug": "barra-de-pastas-y-ensaladas",
    "services": [
      "Barra de pastas y ensaladas"
    ]
  },
  {
    "id": "dyuyiiwbgsn9f5t",
    "provider": "gamma",
    "title": "Barra de Pizzas",
    "category": "barras",
    "relatedHref": "/barra-pizzas",
    "embedSrc": "https://gamma.app/embed/dyuyiiwbgsn9f5t",
    "slug": "barra-de-pizzas",
    "services": [
      "Barra de pizzas"
    ]
  },
  {
    "id": "9kpwbfeb0drpds6",
    "provider": "gamma",
    "title": "Barra de Sushi",
    "category": "barras",
    "relatedHref": "/barra-sushi",
    "embedSrc": "https://gamma.app/embed/9kpwbfeb0drpds6",
    "slug": "barra-de-sushi",
    "services": [
      "Barra de sushi"
    ]
  },
  {
    "id": "xik1kuzcc35kpgm",
    "provider": "gamma",
    "title": "Coctelería y Mixología",
    "category": "barras",
    "relatedHref": "/cocteles-mixologia",
    "embedSrc": "https://gamma.app/embed/xik1kuzcc35kpgm",
    "slug": "cocteleria-y-mixologia",
    "services": [
      "Coctelería y mixología"
    ]
  },
  {
    "id": "nn6q5mxt92hyv5s",
    "provider": "gamma",
    "title": "Mocteles",
    "category": "barras",
    "relatedHref": "/barra-mocteles",
    "embedSrc": "https://gamma.app/embed/nn6q5mxt92hyv5s",
    "slug": "mocteles",
    "services": [
      "Mocteles"
    ]
  },
  {
    "id": "fj2k4uuluormliq",
    "provider": "gamma",
    "title": "Bocadillos",
    "category": "gastronomia",
    "relatedHref": "/bocadillos",
    "embedSrc": "https://gamma.app/embed/fj2k4uuluormliq",
    "slug": "bocadillos",
    "services": [
      "Bocadillos"
    ]
  },
  {
    "id": "vogec0g5v30ozrn",
    "provider": "gamma",
    "title": "Canapés",
    "category": "gastronomia",
    "relatedHref": "/canapes-premium",
    "embedSrc": "https://gamma.app/embed/vogec0g5v30ozrn",
    "slug": "canapes",
    "services": [
      "Canapés"
    ]
  },
  {
    "id": "z6vzp1hfaiii92g",
    "provider": "gamma",
    "title": "Cupcakes y Betún",
    "category": "gastronomia",
    "relatedHref": "/cupcakes-gourmet",
    "embedSrc": "https://gamma.app/embed/z6vzp1hfaiii92g",
    "slug": "cupcakes-y-betun",
    "services": [
      "Betún Clásico",
      "Betún Decorado",
      "Cupcakes"
    ]
  },
  {
    "id": "huu3a7tmytrqmap",
    "provider": "gamma",
    "title": "Paella",
    "category": "gastronomia",
    "relatedHref": "/paella",
    "embedSrc": "https://gamma.app/embed/huu3a7tmytrqmap",
    "slug": "paella",
    "services": [
      "Paella"
    ]
  },
  {
    "id": "h4qf484lnguofm7",
    "provider": "canva",
    "title": "Paletas de Hielo y Helados",
    "category": "gastronomia",
    "relatedHref": "/paletas-helados",
    "embedSrc": "https://www.canva.com/design/DAGnpfkTCGs/WLmqEF4WFbdRvgp3Y6OEXQ/view?embed",
    "slug": "paletas-de-hielo-y-helados",
    "services": [
      "Paletas de hielo y Helados"
    ]
  },
  {
    "id": "sygi1v8h677r5lj",
    "provider": "gamma",
    "title": "Parrillada Argentina",
    "category": "gastronomia",
    "relatedHref": "/parrillada-argentina",
    "embedSrc": "https://gamma.app/embed/sygi1v8h677r5lj",
    "slug": "parrillada-argentina",
    "services": [
      "Parrillada Argentina"
    ]
  },
  {
    "id": "dss29u2e1rynhsg",
    "provider": "gamma",
    "title": "Parrillada Tacos",
    "category": "gastronomia",
    "relatedHref": "/parrillada-tradicional",
    "embedSrc": "https://gamma.app/embed/dss29u2e1rynhsg",
    "slug": "parrillada-tacos",
    "services": [
      "Parrillada Tacos"
    ]
  },
  {
    "id": "fpcxbbllnpm1zmf",
    "provider": "gamma",
    "title": "Pozole y Tostadas",
    "category": "gastronomia",
    "relatedHref": "/pozole-tostadas",
    "embedSrc": "https://gamma.app/embed/fpcxbbllnpm1zmf",
    "slug": "pozole-y-tostadas",
    "services": [
      "Pozole y Tostadas"
    ]
  },
  {
    "id": "p0q9yz8ff3hzaqh",
    "provider": "gamma",
    "title": "Puestos de Comida",
    "category": "gastronomia",
    "relatedHref": "/puestos-antojitos",
    "embedSrc": "https://gamma.app/embed/p0q9yz8ff3hzaqh",
    "slug": "puestos-de-comida",
    "services": [
      "Puestos de comida"
    ]
  },
  {
    "id": "f2w93bmmzm4uyb0",
    "provider": "gamma",
    "title": "Taquiza",
    "category": "gastronomia",
    "relatedHref": "/taquiza-guisados",
    "embedSrc": "https://gamma.app/embed/f2w93bmmzm4uyb0",
    "slug": "taquiza",
    "services": [
      "Taquiza"
    ]
  },
  {
    "id": "omu9swvnwg9rpgf",
    "provider": "gamma",
    "title": "Carrito de Snacks",
    "category": "mesas",
    "relatedHref": "/carrito-snacks",
    "embedSrc": "https://gamma.app/embed/omu9swvnwg9rpgf",
    "slug": "carrito-de-snacks",
    "services": [
      "Carrito de snaks"
    ]
  },
  {
    "id": "qe082yb4hylz532",
    "provider": "gamma",
    "title": "Mesa de Dulces",
    "category": "mesas",
    "relatedHref": "/mesa-dulces",
    "embedSrc": "https://gamma.app/embed/qe082yb4hylz532",
    "slug": "mesa-de-dulces",
    "services": [
      "Mesa de dulces"
    ]
  },
  {
    "id": "rvpasgeholj0abk",
    "provider": "gamma",
    "title": "Mesa de Postres",
    "category": "mesas",
    "relatedHref": "/mesa-postres",
    "embedSrc": "https://gamma.app/embed/rvpasgeholj0abk",
    "slug": "mesa-de-postres",
    "services": [
      "Mesa de Postres"
    ]
  },
  {
    "id": "yx0yjgezabg1gl3",
    "provider": "gamma",
    "title": "Mesa de Quesos",
    "category": "mesas",
    "relatedHref": "/mesa-quesos",
    "embedSrc": "https://gamma.app/embed/yx0yjgezabg1gl3",
    "slug": "mesa-de-quesos",
    "services": [
      "Mesa de quesos"
    ]
  },
  {
    "id": "dbqdqv08j5bv9o7",
    "provider": "gamma",
    "title": "Entelados para Techo",
    "category": "mobiliario",
    "relatedHref": "/entelados",
    "embedSrc": "https://gamma.app/embed/dbqdqv08j5bv9o7",
    "slug": "entelados-para-techo",
    "services": [
      "Entelado"
    ]
  },
  {
    "id": "gn7u5c1wix5gai6",
    "provider": "gamma",
    "title": "Mesas y Sillas",
    "category": "mobiliario",
    "relatedHref": "/mesas-sillas",
    "embedSrc": "https://gamma.app/embed/gn7u5c1wix5gai6",
    "slug": "mesas-y-sillas",
    "services": [
      "Barras",
      "Conjuntos",
      "Mesas",
      "Sillas"
    ]
  },
  {
    "id": "74snkxawzs9pzoy",
    "provider": "gamma",
    "title": "Salas y Periqueras",
    "category": "mobiliario",
    "relatedHref": "/salas-periqueras",
    "embedSrc": "https://gamma.app/embed/74snkxawzs9pzoy",
    "slug": "salas-y-periqueras",
    "services": [
      "BANCOS PARA PERIQUERAS (precio unitario)",
      "MESAS DE CENTRO",
      "PERIQUERAS — INDIVIDUALES (precio por conjunto)",
      "PERIQUERAS — LÍNEAS (precio por configuración: 4 / 6 / 8 px)",
      "SALA LUXOR (4 colores)",
      "SALA VINTAGE OREJONA",
      "SALAS BOHO Y CHIC",
      "SALAS DE ESTAR"
    ]
  },
  {
    "id": "nghm8x7m033zusx",
    "provider": "gamma",
    "title": "Tarimas y Pistas",
    "category": "mobiliario",
    "relatedHref": "/pistas-tarimas",
    "embedSrc": "https://gamma.app/embed/nghm8x7m033zusx",
    "slug": "tarimas-y-pistas",
    "services": [
      "Tarima & Pista"
    ]
  },
  {
    "id": "pcvozy1lcatkjwc",
    "provider": "gamma",
    "title": "Audio, Iluminación y Video",
    "category": "produccion",
    "relatedHref": "/audio-iluminacion-video",
    "embedSrc": "https://gamma.app/embed/pcvozy1lcatkjwc",
    "slug": "audio-iluminacion-y-video",
    "services": [
      "AUDIO",
      "DJ",
      "ILUMINACIÓN",
      "VIDEO"
    ]
  },
  {
    "id": "jjwg8u7lvp3hfs9",
    "provider": "gamma",
    "title": "Coffee Break",
    "category": "empresas",
    "relatedHref": "/coffee-break",
    "embedSrc": "https://gamma.app/embed/jjwg8u7lvp3hfs9",
    "slug": "coffee-break",
    "services": [
      "Coffee Break"
    ]
  },
  {
    "id": "stlkh9sdnivzkd8",
    "provider": "gamma",
    "title": "Comida Corrida",
    "category": "empresas",
    "relatedHref": "/comida-corrida",
    "embedSrc": "https://gamma.app/embed/stlkh9sdnivzkd8",
    "slug": "comida-corrida",
    "services": [
      "Comida Corrida"
    ]
  },
  {
    "id": "ay6vsr9744n627c",
    "provider": "gamma",
    "title": "Desayuno o Brunch",
    "category": "empresas",
    "relatedHref": "/desayuno-brunch",
    "embedSrc": "https://gamma.app/embed/ay6vsr9744n627c",
    "slug": "desayuno-o-brunch",
    "services": [
      "Desayuno o Brunch"
    ]
  }
]

export function getCatalogoBySlug(slug) {
  return CATALOGOS.find((c) => c.slug === slug) || null
}

/** Bodasesor page for a catalog — never expose Gamma/Canva edit URLs. */
export function getCatalogoPagePath(slug) {
  return `/catalogos/${slug}`
}
