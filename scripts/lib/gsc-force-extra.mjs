/**
 * Extra GSC_FORCE redirects (glued legacy + thin product×city → indexable hub×city).
 * Merged into generate-redirects.mjs GSC_FORCE_REDIRECTS.
 * Source: .gsc-audit/gsc-audit-report.json sampleAnalyticsNotInSitemap + bad-redirects-priority.json
 */
export const GSC_FORCE_EXTRA = [
  // Glued single-segment (high GSC impressions, not in sitemap)
  ['/carrito-snackscancun', '/carrito-snacks/cancun/'],
  ['/coffee-breakpuebla', '/alimentos-empresas/puebla/'],
  ['/coffee-breakcancun', '/alimentos-empresas/cancun/'],
  ['/paellamonterrey', '/paella/monterrey/'],
  ['/puestos-antojitospuebla', '/puestos-antojitos/puebla/'],
  ['/barra-bebidascancun', '/barras-de-bebidas/cancun/'],
  ['/barra-cafe-premiumlos-cabos', '/barras-de-bebidas/los-cabos/'],
  ['/barra-moctelesmonterrey', '/barras-de-bebidas/monterrey/'],
  ['/barra-sushimonterrey', '/barras-de-bebidas/monterrey/'],
  ['/barras-de-bebidascancun', '/barras-de-bebidas/cancun/'],
  ['/bocadillospachuca', '/bocadillos/pachuca/'],
  ['/cocteles-mixologiamorelia', '/cocteles-mixologia/morelia/'],
  ['/paletas-heladoscuernavaca', '/paletas-helados/cuernavaca/'],
  ['/parrillada-argentinapuerto-vallarta', '/parrillada-argentina/puerto-vallarta/'],
  ['/vajillas-estilomonterrey', '/vajillas/monterrey/'],
  ['/vajillas-estilopuebla', '/vajillas/puebla/'],
  ['/sillas/louis-xvmonterrey', '/sillas/louis-xv/monterrey/'],
  // Thin product×city (noindex prerender) → indexable hub×city
  ['/floreria/letras-gigantes/merida', '/floreria/merida/'],
  ['/floreria/letras-gigantes/ciudad-de-mexico', '/floreria/ciudad-de-mexico/'],
  ['/silla-ghost/ciudad-de-mexico', '/sillas/ghost/'],
  ['/vajillas-estilo/pachuca', '/vajillas/pachuca/'],
  ['/vajillas-estilo/ciudad-de-mexico', '/vajillas/ciudad-de-mexico/'],
  ['/mesas/picnic/puebla', '/mesas-sillas/puebla/'],
  ['/musica/dueto/guadalajara', '/musica/guadalajara/'],
  ['/musica/grupo-versatil/morelia', '/musica/morelia/'],
  ['/pistas-tarimas/tarima-madera/acapulco', '/pistas-tarimas/acapulco/'],
  ['/sillas/louis-xv/puebla', '/mesas-sillas/puebla/'],
  // Shopify collections with traffic but missing/wrong in map
  ['/collections/banquetes-para-eventos-pequenos-en-puerto-vallarta', '/banquetes-catering/puerto-vallarta/'],
  ['/collections/shows-para-eventos-cancun', '/shows/cancun/'],
  ['/collections/banquetes-para-eventos-en-pachuca', '/banquetes-catering/pachuca/'],
  ['/collections/banquete-catering-en-lazaro-cardenas', '/banquetes-catering/'],
  ['/collections/banquetes-a-domicilio-en-queretaro', '/banquetes-catering/queretaro/'],
  ['/collections/banquetes-para-fiestas-infantiles-en-queretaro', '/banquetes-catering/queretaro/'],
  ['/collections/inflables-valle-de-bravo', '/inflables/valle-de-bravo/'],
  ['/products/catering-de-comida-japonesa-cdmx', '/banquetes-catering/ciudad-de-mexico/'],
  // Dead blog slug → blog index (no matching static article)
  ['/blogs/noticias/frases-romanticas-buenos-dias-pareja', '/blog/'],
]
