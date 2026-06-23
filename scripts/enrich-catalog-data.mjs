import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(import.meta.dirname, '..')

const SHOW_INCLUYE = [
  'Artistas profesionales certificados',
  'Vestuario y accesorios del show',
  'Coordinación previa con el organizador del evento',
  'Montaje, presentación y desmontaje',
]

function enrichShow(raw) {
  return {
    ...raw,
    img: raw.img ?? `/images/shows/${raw.slug}.png`,
    duracion: raw.duracion ?? (raw.category === 'circo' ? '6 minutos aprox.' : '10-15 minutos'),
    desc: raw.desc ?? raw.short,
    idealPara: raw.idealPara ?? ['Bodas', 'XV Años', 'Eventos corporativos', 'Fiestas privadas'],
    incluye: raw.incluye ?? SHOW_INCLUYE,
  }
}

// ── Shows ──
const showsPath = path.join(ROOT, 'src/data/shows-products.js')
let showsSrc = fs.readFileSync(showsPath, 'utf8')
showsSrc = showsSrc.replace('export const SHOWS = [', 'const RAW_SHOWS = [')
showsSrc = showsSrc.replace(
  /export const SHOWS_BY_CATEGORY = \{[\s\S]*?\};\nexport const ShowsSlug/,
  `function enrichShow(raw) {
  const defaults = ${JSON.stringify(SHOW_INCLUYE)};
  return {
    ...raw,
    img: raw.img ?? \`/images/shows/\${raw.slug}.png\`,
    duracion: raw.duracion ?? (raw.category === 'circo' ? '6 minutos aprox.' : '10-15 minutos'),
    desc: raw.desc ?? raw.short,
    idealPara: raw.idealPara ?? ['Bodas', 'XV Años', 'Eventos corporativos', 'Fiestas privadas'],
    incluye: raw.incluye ?? defaults,
  };
}

export const SHOWS = RAW_SHOWS.map(enrichShow);

export const SHOWS_BY_CATEGORY = {
  percusion: SHOWS.filter(s => s.category === 'percusion'),
  danza: SHOWS.filter(s => s.category === 'danza'),
  tecnologia: SHOWS.filter(s => s.category === 'tecnologia'),
  circo: SHOWS.filter(s => s.category === 'circo'),
};
export const ShowsSlug`
)
fs.writeFileSync(showsPath, showsSrc)
console.log('Patched shows-products.js')

// ── Florería ──
const floreriaPath = path.join(ROOT, 'src/data/floreria-products.js')
const floreriaSrc = fs.readFileSync(floreriaPath, 'utf8')
const floreriaMatch = floreriaSrc.match(/export const FLORERIA = (\[[\s\S]*?\]);/)
if (floreriaMatch) {
  const raw = eval(floreriaMatch[1])
  const filtered = raw.filter((p) => ['floral', 'globos', 'decoracion'].includes(p.category))
  const enriched = filtered.map((p) => ({
    ...p,
    img: p.img ?? `/images/floreria/${p.slug}.png`,
    desc: p.desc ?? p.short,
    idealPara: p.idealPara ?? ['Bodas', 'XV Años', 'Baby shower', 'Eventos corporativos'],
    incluye: p.incluye ?? [
      'Diseño personalizado según tu temática',
      'Materiales premium y acabados profesionales',
      'Instalación y montaje en el venue',
      'Retiro al finalizar el evento',
    ],
  }))
  const nav = {
    floral: enriched.filter((p) => p.category === 'floral').map((p) => ({ href: `/floreria/${p.slug}`, name: p.name })),
    globos: enriched.filter((p) => p.category === 'globos').map((p) => ({ href: `/floreria/${p.slug}`, name: p.name })),
    decoracion: enriched.filter((p) => p.category === 'decoracion').map((p) => ({ href: `/floreria/${p.slug}`, name: p.name })),
  }
  const newFloreria = `export const floreriaNavItems = ${JSON.stringify(nav, null, 2)};

export const FLORERIA = ${JSON.stringify(enriched, null, 2)};
`
  fs.writeFileSync(floreriaPath, newFloreria)
  console.log('Patched floreria-products.js', enriched.length, 'products')
}
