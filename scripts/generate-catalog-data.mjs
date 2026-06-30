import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')

function slugToName(slug) {
  const special = {
    dj: 'DJ',
    'photo-opportunity': 'Photo Opportunity',
    'coffee-break': 'Coffee Break',
    'box-lunch': 'Box Lunch',
    'xv-anos': 'XV Años',
  }
  if (special[slug]) return special[slug]
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function defaultIncluye(name) {
  return [
    `Servicio profesional de ${name.toLowerCase()}`,
    'Atención personalizada desde la cotización',
    'Coordinación con proveedores certificados',
    'Supervisión el día del evento',
  ]
}

function generateFromImages(imageDir, options = {}) {
  const dir = path.join(ROOT, 'public/images', imageDir)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .map((file) => {
      const slug = file.replace(/\.(png|jpg|jpeg|webp)$/i, '')
      const name = slugToName(slug)
      return {
        slug,
        name,
        tagline: options.tagline?.(name, slug) ?? `Servicio profesional de ${name.toLowerCase()} para tu evento`,
        short:
          options.short?.(name, slug) ??
          `Contrata ${name.toLowerCase()} con Bodasesor. Calidad garantizada, atención personalizada y experiencia en eventos en todo México.`,
        img: `/images/${imageDir}/${file}`,
        incluye: defaultIncluye(name),
        idealPara: options.idealPara ?? ['Bodas', 'XV Años', 'Eventos corporativos', 'Fiestas privadas'],
        desc:
          options.desc?.(name, slug) ??
          `En Bodasesor ofrecemos ${name.toLowerCase()} con los más altos estándares de calidad. Nuestro equipo coordina cada detalle para que tu evento sea impecable.`,
      }
    })
}

function writeModule(filePath, content) {
  fs.writeFileSync(path.join(ROOT, filePath), content, 'utf8')
  console.log('Wrote', filePath)
}

// Wedding
const WEDDING = generateFromImages('wedding', {
  tagline: (name) => `Planeación y coordinación: ${name.toLowerCase()}`,
  idealPara: ['Bodas', 'XV Años', 'Eventos sociales'],
})
writeModule(
  'src/data/wedding-products.js',
  `export const weddingNavItems = ${JSON.stringify(WEDDING.map((p) => ({ href: `/wedding-planner/${p.slug}`, name: p.name })), null, 2)}

export const WEDDING = ${JSON.stringify(WEDDING, null, 2)}
`
)

// Música
const MUSICA = generateFromImages('musica', {
  tagline: (name) => `${name} profesional para tu evento`,
  idealPara: ['Bodas', 'XV Años', 'Fiestas', 'Eventos corporativos'],
})
writeModule(
  'src/data/musica-products.js',
  `export const musicaNavItems = ${JSON.stringify(MUSICA.map((p) => ({ href: `/musica/${p.slug}`, name: p.name })), null, 2)}

export const MUSICA = ${JSON.stringify(MUSICA, null, 2)}
`
)

// Fotografía
const FOTOGRAFIA = generateFromImages('fotografia', {
  idealPara: ['Bodas', 'XV Años', 'Eventos corporativos', 'Fiestas privadas'],
})
writeModule(
  'src/data/fotografia-products.js',
  `export const fotografiaNavItems = ${JSON.stringify(FOTOGRAFIA.map((p) => ({ href: `/fotografia/${p.slug}`, name: p.name })), null, 2)}

export const FOTOGRAFIA = ${JSON.stringify(FOTOGRAFIA, null, 2)}
`
)

// Espacios
const ESPACIOS = generateFromImages('espacios', {
  idealPara: ['Bodas', 'XV Años', 'Eventos corporativos', 'Celebraciones privadas'],
})
writeModule(
  'src/data/espacios-products.js',
  `export const espaciosNavItems = ${JSON.stringify(ESPACIOS.map((p) => ({ href: `/espacios-eventos/${p.slug}`, name: p.name })), null, 2)}

export const ESPACIOS = ${JSON.stringify(ESPACIOS, null, 2)}
`
)

// Empresas
const EMPRESAS = generateFromImages('empresas', {
  idealPara: ['Empresas', 'Corporativos', 'Oficinas', 'Eventos de integración'],
})
writeModule(
  'src/data/empresas-products.js',
  `export const empresasNavItems = ${JSON.stringify(EMPRESAS.map((p) => ({ href: `/empresas/${p.slug}`, name: p.name })), null, 2)}

export const EMPRESAS = ${JSON.stringify(EMPRESAS, null, 2)}
`
)

// Repostería
const REPOSTERIA = generateFromImages('reposteria', {
  idealPara: ['Bodas', 'XV Años', 'Baby shower', 'Eventos corporativos'],
})
writeModule(
  'src/data/reposteria-products.js',
  `export const reposteriaNavItems = ${JSON.stringify(REPOSTERIA.map((p) => ({ href: `/reposteria/${p.slug}`, name: p.name })), null, 2)}

export const REPOSTERIA = ${JSON.stringify(REPOSTERIA, null, 2)}
`
)

console.log('Done:', { wedding: WEDDING.length, musica: MUSICA.length, fotografia: FOTOGRAFIA.length, espacios: ESPACIOS.length, empresas: EMPRESAS.length, reposteria: REPOSTERIA.length })
