/**
 * Maps SPA product/hub slugs → Nexus PRINCIPAL gallery key.
 *
 * Nexus uploads images once per principal service (e.g. "banquetes").
 * Satellites (kosher, mexicano, bodas, XV, etc.) reuse that same key.
 *
 * If a slug is absent here, resolveNexusGalleryKey() falls back to the slug itself
 * when Nexus has a matching key; otherwise the SPA keeps its static gallery.
 */
export const NEXUS_GALLERY_KEY_BY_SLUG = {
  // Banquetes family → banquetes
  banquetes: 'banquetes',
  'banquete-kosher': 'banquetes',
  'banquete-mexicano': 'banquetes',
  'banquete-navideno': 'banquetes',
  'banquetes-catering': 'banquetes',

  // Barras de bebidas
  'barra-bebidas': 'barras-de-bebidas',
  'barras-de-bebidas': 'barras-de-bebidas',
  'barra-mocteles': 'barras-de-bebidas',
  'cocteles-mixologia': 'barras-de-bebidas',
  'barra-cafe-premium': 'barras-de-bebidas',
  'paletas-helados': 'barras-de-bebidas',

  // Mesas personalizadas / postres
  'mesa-dulces': 'mesas-personalizadas',
  'mesa-postres': 'mesas-personalizadas',
  'mesa-quesos': 'mesas-personalizadas',
  'cupcakes-gourmet': 'mesas-personalizadas',
  'mesas-personalizadas': 'mesas-personalizadas',

  // Mobiliario
  'mesas-sillas': 'mesas-sillas',
  'silla-tiffany': 'mesas-sillas',
  'silla-ghost': 'mesas-sillas',

  // Hubs / servicios
  carpas: 'carpas',
  'pistas-tarimas': 'pistas-tarimas',
  'floreria-decoracion': 'floreria',
  floreria: 'floreria',
  'fotografia-video': 'fotografia',
  fotografia: 'fotografia',
  musica: 'musica',
  'wedding-planner': 'wedding-planner',
  shows: 'shows',
  'espacios-eventos': 'espacios-eventos',
  reposteria: 'reposteria',
  'alimentos-empresas': 'alimentos-empresas',
  inflables: 'inflables',

  // Event types (satellites of service packages — often share banquetes/mobiliario
  // photos when Nexus only uploaded under the principal food/furniture keys)
  bodas: 'bodas',
  'xv-anos': 'xv-anos',
  corporativos: 'corporativos',
  'baby-shower': 'baby-shower',
  cumpleanos: 'cumpleanos',
  graduaciones: 'graduaciones',
  'primera-comunion': 'primera-comunion',
}

/**
 * @param {string} slug
 * @returns {string}
 */
export function resolveNexusGalleryKey(slug) {
  const s = String(slug || '')
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
  if (!s) return ''
  if (NEXUS_GALLERY_KEY_BY_SLUG[s]) return NEXUS_GALLERY_KEY_BY_SLUG[s]
  // Banquet menu / variant prefixes
  if (s.startsWith('banquete')) return 'banquetes'
  if (s.startsWith('barra-') || s.startsWith('barras-')) return 'barras-de-bebidas'
  if (s.startsWith('mesa-') && !s.startsWith('mesas-sillas')) return 'mesas-personalizadas'
  if (s.startsWith('silla-') || s.startsWith('mesa-redonda') || s.startsWith('mesa-cuadrada')) {
    return 'mesas-sillas'
  }
  return s
}
