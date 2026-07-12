import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useCity } from '../context/CityContext'
import { syncLcpPreload } from '../utils/lcp-preload'
import { buildSeoTitle } from '../utils/seo-title'

const SEO_MAP = {
  '/':                     { title: 'Banquetes y Catering para Eventos en México', desc: 'Contrata banquetes, catering gourmet, mobiliario, música, fotografía y wedding planner para bodas, XV años y eventos corporativos en CDMX, Guadalajara, Monterrey y todo México.' },
  '/galeria':              { title: 'Galería de Eventos',          desc: 'Fotos reales de bodas, banquetes, quinceañeras y eventos corporativos organizados por Bodasesor en México.' },
  '/banquetes-catering':   { title: 'Banquetes y Catering',        desc: 'Catálogo completo de banquetes formales, catering gourmet, barras de alimentos y estaciones mexicanas para eventos.' },
  '/barras-de-bebidas':    { title: 'Barras de Bebidas',           desc: 'Barras de bebidas con y sin alcohol para eventos: mocteles, mixología, café premium y carritos de helado.' },
  '/mesas-personalizadas': { title: 'Mesas Personalizadas',        desc: 'Mesas temáticas para eventos: dulces, botanas, sushi, charcutería, frutas y más. Diseño personalizado con montaje incluido.' },
  '/combinaciones-mesas-sillas': { title: 'Combinaciones de Mesas y Sillas', desc: 'Paquetes de mesas y sillas coordinadas para bodas, XV años y eventos corporativos en México.' },
  '/vajillas':             { title: 'Vajillas para Eventos',       desc: 'Renta de vajillas premium para banquetes y eventos: porcelana, cristalería y cubertería de alta calidad.' },
  '/colgantes':            { title: 'Colgantes Decorativos',       desc: 'Colgantes florales, de luces y decorativos para bodas, quinceañeras y eventos especiales.' },
  '/entelados':            { title: 'Entelados para Eventos',      desc: 'Entelados y decoración de mesas para bodas, XV años y eventos sociales en México.' },
  '/floreria':             { title: 'Florería para Eventos',       desc: 'Arreglos florales, centros de mesa y decoración floral para bodas y eventos en México.' },
  '/shows':                { title: 'Shows y Entretenimiento',     desc: 'Shows en vivo, artistas y entretenimiento para bodas, XV años y eventos corporativos.' },
  '/pistas-tarimas':       { title: 'Pistas y Tarimas',            desc: 'Renta de pistas de baile, tarimas y escenarios para eventos en México.' },
  '/salas-periqueras':     { title: 'Salas y Periqueras',          desc: 'Renta de salas lounge y periqueras para eventos, bodas y recepciones en México.' },
  '/reposteria':           { title: 'Repostería para Eventos',     desc: 'Pasteles, mesas de postres, cupcakes y repostería artesanal para bodas y celebraciones.' },
  '/wedding-planner':      { title: 'Wedding Planner',             desc: 'Servicio de wedding planner profesional. Planeación, coordinación y asesoría para tu boda.' },
  '/musica':               { title: 'Música para Eventos',         desc: 'DJ, grupos versátiles, mariachi, saxofonista y música en vivo para bodas y eventos.' },
  '/fotografia':           { title: 'Fotografía y Video',          desc: 'Fotografía profesional, video, cámara 360, cabina de fotos y más para tu evento.' },
  '/espacios-eventos':     { title: 'Espacios para Eventos',       desc: 'Salones, jardines y espacios para bodas, XV años y eventos corporativos en México.' },
  '/carpas':               { title: 'Carpas para Eventos',       desc: 'Renta de carpas para bodas, eventos corporativos y celebraciones al aire libre.' },
  '/alimentos-empresas':   { title: 'Alimentos para Empresas',     desc: 'Coffee break, box lunch, desayunos ejecutivos y catering corporativo en México.' },
  '/audio-iluminacion-video': { title: 'Audio, Iluminación y Video', desc: 'Sonido, iluminación y video profesional para eventos, bodas y corporativos en México.' },
  '/quienes-somos':        { title: 'Quiénes Somos',               desc: 'Conoce al equipo de Bodasesor Eventos. Más de 10 años organizando eventos en México.' },
  '/blog':                 { title: 'Blog de Eventos y Bodas',     desc: 'Consejos, tendencias y guías para planear bodas, XV años y eventos corporativos en México.' },
  '/buscar':               { title: 'Buscar servicios',            desc: 'Encuentra banquetes, mobiliario, shows, florería y todos los servicios de Bodasesor.' },
  '/bodas':                { title: 'Bodas',                       desc: 'Servicios completos para bodas: catering, decoración, música, fotografía y más.' },
  '/corporativos':         { title: 'Eventos Corporativos',        desc: 'Catering, mobiliario y servicios para eventos corporativos en México.' },
  '/xv-anos':              { title: 'XV Años',                     desc: 'Servicios completos para XV años: banquete, decoración, música, shows y más.' },
  '/graduaciones':         { title: 'Graduaciones',                desc: 'Servicios completos para graduaciones: banquete, decoración, música y más.' },
  '/baby-shower':          { title: 'Baby Shower',                 desc: 'Servicios para baby shower: mesa de dulces, decoración, catering y más.' },
  '/cumpleanos':           { title: 'Cumpleaños',                  desc: 'Servicios para fiestas de cumpleaños: catering, decoración, shows e inflables.' },
  '/primera-comunion':     { title: 'Primera Comunión',            desc: 'Servicios completos para primera comunión: banquete, decoración y más.' },
}

function setMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function setCanonical(href) {
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', href)
}

export default function GlobalSEO() {
  const [location] = useLocation()
  const { city } = useCity()

  useEffect(() => {
    const path = location.replace(/\/$/, '') || '/'

    const canonicalHref = city && path === '/'
      ? `https://bodasesor.com/${city.slug}`
      : `https://bodasesor.com${path === '/' ? '' : path}`
    setCanonical(canonicalHref)
    syncLcpPreload(path)

    const seo = SEO_MAP[path]
    if (!seo) return

    document.title = buildSeoTitle(seo.title, city ? (city.short || city.name) : null)

    setMeta('description', city ? `${seo.desc} Disponible en ${city.name}.` : seo.desc)
  }, [location, city])

  return null
}
