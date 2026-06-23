import { useEffect } from 'react'
import { useLocation } from 'wouter'
import { useCity } from '../context/CityContext'

const SEO_MAP = {
  '/':                     { title: 'Bodasesor Eventos',           desc: 'Banquetes, catering, mobiliario y servicios premium para bodas, quinceañeras y eventos corporativos en México.' },
  '/galeria':              { title: 'Galería de Eventos',          desc: 'Fotos reales de bodas, banquetes, quinceañeras y eventos corporativos organizados por Bodasesor en México.' },
  '/banquetes-catering':   { title: 'Banquetes y Catering',        desc: 'Catálogo completo de banquetes formales, catering gourmet, barras de alimentos y estaciones mexicanas para eventos.' },
  '/barras-de-bebidas':    { title: 'Barras de Bebidas',           desc: 'Barras de bebidas con y sin alcohol para eventos: mocteles, mixología, café premium y carritos de helado.' },
  '/wedding-planner':      { title: 'Wedding Planner',             desc: 'Servicio de wedding planner profesional. Planeación, coordinación y asesoría para tu boda.' },
  '/audio-iluminacion-video': { title: 'Audio, Iluminación y Video', desc: 'Sonido, iluminación y video profesional para eventos, bodas y corporativos en México.' },
  '/salas-periqueras':     { title: 'Salas y Periqueras',          desc: 'Renta de salas lounge y periqueras para eventos, bodas y recepciones en México.' },
  '/fotografia':           { title: 'Fotografía y Video',          desc: 'Fotografía profesional, video, cámara 360, cabina de fotos y más para tu evento.' },
  '/quienes-somos':        { title: 'Quiénes Somos',               desc: 'Conoce al equipo de Bodasesor Eventos. Más de 10 años organizando eventos en México.' },
  '/bodas':                { title: 'Bodas',                       desc: 'Servicios completos para bodas: catering, decoración, música, fotografía y más.' },
  '/corporativos':         { title: 'Eventos Corporativos',        desc: 'Catering, mobiliario y servicios para eventos corporativos en México.' },
  '/xv-anos':              { title: 'XV Años',                     desc: 'Servicios completos para XV años: banquete, decoración, música, shows y más.' },
  '/baby-shower':          { title: 'Baby Shower',                 desc: 'Servicios para baby shower: mesa de dulces, decoración, catering y más.' },
  '/cumpleanos':           { title: 'Cumpleaños',                  desc: 'Servicios para fiestas de cumpleaños: catering, decoración, shows e inflables.' },
  '/primera-comunion':     { title: 'Primera Comunión',            desc: 'Servicios completos para primera comunión: banquete, decoración y más.' },
}

export default function GlobalSEO() {
  const [location] = useLocation()
  const { city } = useCity()

  useEffect(() => {
    const path = location.replace(/\/$/, '') || '/'
    const seo = SEO_MAP[path]
    if (!seo) return

    document.title = city
      ? `${seo.title} ${city.short || city.name} | Bodasesor Eventos`
      : `${seo.title} | Bodasesor Eventos`

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', city ? `${seo.desc} Disponible en ${city.name}.` : seo.desc)
  }, [location, city])

  return null
}
