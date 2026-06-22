import { useState, useEffect, useRef } from 'react'
import { Link } from 'wouter'
import { useCity } from '../context/CityContext'
import { CITY_MAP } from '../data/city-data'
import GalleryCarouselSection from '../components/GalleryCarousel'
import { img } from '../data/site'

const WHATSAPP = "5215540080373"
const WA_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=Hola%2C%20me%20interesa%20cotizar%20un%20servicio`

const CLIENTS = [
  'Omnilife','Cisidat','Deloitte','Impulsa Labs','BCA','Bomker',
  'Mexico Railway','Jumex','Inspark','BlackBerry','Iusacell','Cinemex',
  'Cinépolis','OXXO','Telcel','Bimbo','Cemex','Televisa Univision',
  'Banorte','Heineken México','Nestlé México','Walmart México','Soriana',
]

const TESTIMONIALS = [
  { text: 'Desde la organización no nos preocupamos por nada, todo estuvo muy bien coordinado y el evento salió increíble. Siempre fueron muy profesionales y estuvieron al pendiente de cada detalle.', name: 'Cinthya Rodríguez', type: 'Evento corporativo', initials: 'CR' },
  { text: 'La comida estuvo exquisita de verdad 💖 y todo el equipo que montó, cocinó, sirvió y nos atendió ese día fue de primera. Gracias por ayudarme a hacer mi boda un evento memorable.', name: 'Ximena Hernández', type: 'Boda', initials: 'XH' },
  { text: 'Excelente servicio y atención. Ninguna queja del equipo de cocina y meseros, organizados, amables y atentos. La comida estuvo muy rica. Los volvería a contratar sin duda.', name: 'Sandra Toledano', type: 'Boda íntima', initials: 'ST' },
  { text: 'Gran acompañamiento de Alejandro, gran profesional buscando solucionar cada uno de los retos que fueron saliendo. Total confianza para futuros eventos.', name: 'Adolfo Núñez', type: 'Boda civil', initials: 'AN' },
  { text: 'Recibí múltiples felicitaciones de mis invitados por el sabor de los alimentos. Los meseros fueron muy amables y atentos. Destacaría la puntualidad y comprensión.', name: 'Selene Carrillo', type: 'Celebración familiar', initials: 'SC' },
  { text: 'Cuidan cada detalle, la comida estuvo deliciosa, los meseros muy amables, la decoración, todo salió increíble. Valió 100% la pena.', name: 'Rosa Isabel Castro', type: 'Evento especial', initials: 'RC' },
]

function useCountUp(target, duration = 1800, trigger = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger, target, duration])
  return count
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { city } = useCity()
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={img('/images/hero-bg-new.png')} alt="Bodasesor eventos" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#162040]/65" />
      </div>

      {/* Review badge */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-3 bg-white/12 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 text-white text-sm font-serif">
        <div className="w-9 h-9 bg-[#162040] rounded-full flex items-center justify-center text-xs font-bold text-[#f5efe8] flex-shrink-0 border-2 border-white/30">HJ</div>
        <div>
          <span className="font-bold">Héctor Jiménez</span>
          <span className="text-white/60 mx-1">·</span>
          <span className="text-white/70">Monterrey</span>
          <div className="text-white/60 text-xs mt-0.5">Servicio impecable, el banquete superó todas las expectativas de mis invitados.</div>
        </div>
        <div className="text-white/40 text-xs ml-2 whitespace-nowrap">Hace 1 día</div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Encuentra todo para tu evento<br />
          <span className="text-[#f5efe8]">{city ? `en ${city.name}` : 'en un solo lugar'}</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-serif mb-10 max-w-2xl mx-auto leading-relaxed">
          Banquetes premium, catering gourmet y mobiliario elegante para eventos corporativos, bodas y celebraciones en todo México
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white font-bold font-serif px-7 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Cotiza por WhatsApp
          </a>
          <Link href="/banquetes-catering"
            className="border-2 border-white/60 text-white hover:bg-white hover:text-[#162040] font-bold font-serif px-7 py-4 rounded-xl transition-all duration-300">
            Ver servicios
          </Link>
        </div>
        {/* Scroll indicator */}
        <div className="mt-14 flex justify-center">
          <div className="scroll-bounce text-white/50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const events = useCountUp(1000, 1800, visible)
  const people = useCountUp(10000, 2000, visible)
  return (
    <section ref={ref} className="bg-[#f5efe8] py-10 border-b border-[#162040]/10">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 md:grid-cols-4 gap-6 items-center">
        <div className="text-center count-in">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <svg className="w-7 h-7 text-[#162040]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="font-serif text-3xl md:text-4xl font-bold text-[#162040]">{events.toLocaleString()}+</p>
          <p className="text-[#162040]/60 text-xs uppercase tracking-wider mt-1 font-serif">Eventos realizados</p>
        </div>
        <div className="text-center count-in">
          <div className="flex items-center justify-center mb-1">
            <svg className="w-7 h-7 text-[#162040]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <p className="font-serif text-3xl md:text-4xl font-bold text-[#162040]">{people.toLocaleString()}+</p>
          <p className="text-[#162040]/60 text-xs uppercase tracking-wider mt-1 font-serif">Personas atendidas</p>
        </div>
        <div className="text-center count-in">
          <div className="flex items-center justify-center mb-1">
            <svg className="w-7 h-7 text-[#162040]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <p className="font-serif text-3xl md:text-4xl font-bold text-[#162040]">4.6/5</p>
          <p className="text-[#162040]/60 text-xs uppercase tracking-wider mt-1 font-serif">Calificación promedio</p>
        </div>
        {/* Garantía seal */}
        <div className="hidden md:flex justify-center">
          <img src={img('/images/sello-garantia-transparent.png')} alt="Garantía Bodasesor"
            className="w-24 h-24 object-contain"
            onError={e => { e.target.style.display = 'none' }} />
        </div>
      </div>
    </section>
  )
}

// ─── Services grid ─────────────────────────────────────────────────────────────
function Services() {
  const { city } = useCity()
  const cityLabel = city ? ` en ${city.short}` : ''
  const services = [
    {
      title: 'Banquetes & Catering',
      desc: `Menús personalizados y servicio gourmet para eventos de 10 a 500+ personas`,
      extra: '¿Necesitas algo en específico? Nosotros lo preparamos',
      cta: 'Solicitar menú',
      href: '/banquetes-catering',
      img: img('/images/banquete-hero.png'),
    },
    {
      title: 'Eventos completos',
      desc: 'Organización integral de tu evento de principio a fin',
      cta: 'Planear mi evento',
      href: '/bodas',
      img: img('/images/banquete-hero.png'),
    },
    {
      title: 'Mobiliario premium',
      desc: 'Renta de muebles elegantes para cualquier tipo de evento',
      bullets: ['Sillas Tiffany, Ghost, Crossback', 'Mesas redondas, rectangulares, mármol', 'Salas lounge iluminadas', 'Carpas blancas y negras', 'Periqueras y tarimas'],
      extra: 'Checa nuestras opciones',
      cta: 'Ver catálogo',
      href: '/salas-periqueras',
      img: img('/images/banquete-hero.png'),
    },
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#162040]/50 text-xs font-bold uppercase tracking-widest mb-2 font-serif">Lo que hacemos</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#162040]">Nuestros servicios{cityLabel}</h2>
          <p className="text-gray-500 mt-3 font-serif">Todo lo que necesitas para hacer de tu evento una experiencia inolvidable</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(s => (
            <div key={s.href} className="bg-[#f5efe8] rounded-2xl overflow-hidden card-lift border border-[#162040]/8 group">
              <div className="h-48 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#162040] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm font-serif mb-3">{s.desc}</p>
                {s.bullets && (
                  <ul className="text-sm text-gray-500 font-serif mb-3 space-y-1">
                    {s.bullets.map(b => <li key={b} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#162040]/40 rounded-full flex-shrink-0" />{b}</li>)}
                  </ul>
                )}
                {s.extra && <p className="text-[#162040]/60 text-xs font-serif italic mb-3">{s.extra}</p>}
                <Link href={s.href}
                  className="inline-flex items-center gap-1.5 bg-[#162040] hover:bg-[#1a2a52] text-white text-sm font-bold font-serif px-5 py-2.5 rounded-xl transition-all duration-200">
                  {s.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Cities ────────────────────────────────────────────────────────────────────
function Cities() {
  const { setCity } = useCity()
  const cities = Object.values(CITY_MAP)
  return (
    <section className="py-16 bg-[#162040]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 font-serif">Cobertura Nacional</p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-8">
          Servicio en las principales ciudades
        </h2>
        <p className="text-white/60 font-serif text-sm mb-8">Llevamos la excelencia de nuestros servicios a todo México</p>
        <div className="flex flex-wrap justify-center gap-2">
          {cities.map(city => (
            <button key={city.slug}
              onClick={() => setCity(city)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-sm font-serif rounded-full transition-all duration-200">
              {city.short !== city.name ? city.short : city.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Cotiza gratis', desc: 'Contáctanos por WhatsApp y cuéntanos sobre tu evento' },
    { n: '02', title: 'Recibe propuesta', desc: 'Opciones personalizadas con precios claros' },
    { n: '03', title: 'Confirma detalles', desc: 'Ajustamos según tus preferencias' },
    { n: '04', title: '¡Disfruta tu evento!', desc: 'Nosotros nos encargamos de todo' },
  ]
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#162040]/50 text-xs font-bold uppercase tracking-widest mb-2 font-serif">Cómo funciona</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#162040]">Organizar tu evento es más fácil de lo que piensas</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map(s => (
            <div key={s.n} className="text-center">
              <div className="font-serif text-5xl font-bold text-[#162040]/15 mb-3">{s.n}</div>
              <h3 className="font-serif font-bold text-[#162040] mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm font-serif">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section className="py-20 bg-[#f5efe8]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <img src={img('/images/galeria-1.png')} alt="Bodasesor equipo"
            className="rounded-2xl shadow-lg w-full object-cover"
            loading="lazy"
            onError={e => { e.target.src = img('/images/banquete-hero.png') }} />
        </div>
        <div className="md:w-1/2">
          <p className="text-[#162040]/50 text-xs font-bold uppercase tracking-widest mb-3 font-serif">Quiénes somos</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#162040] mb-5">Creamos eventos que se convierten en recuerdos</h2>
          <p className="text-gray-600 mb-5 leading-relaxed font-serif">
            Somos Bodasesor Eventos, una empresa especializada en la organización y producción de celebraciones en la Ciudad de México. Con más de diez años de experiencia, acompañamos a nuestros clientes en cada etapa de su evento.
          </p>
          <div className="flex gap-10 mb-8">
            <div>
              <p className="font-serif text-3xl font-bold text-[#162040]">+10</p>
              <p className="text-xs text-[#162040]/50 uppercase tracking-wider font-serif mt-1">años de experiencia</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-[#162040]">100%</p>
              <p className="text-xs text-[#162040]/50 uppercase tracking-wider font-serif mt-1">atención personalizada</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: '🏆', t: 'Experiencia comprobada', d: 'Más de una década organizando eventos de todos los tamaños.' },
              { icon: '🤝', t: 'Servicio personalizado', d: 'Trabajamos contigo para llevar tu visión a la realidad.' },
              { icon: '✨', t: 'Calidad en cada detalle', d: 'Los mejores proveedores de catering, decoración y logística.' },
              { icon: '💡', t: 'Creatividad e innovación', d: 'Experiencias originales que sorprenden a tus invitados.' },
            ].map(f => (
              <div key={f.t} className="flex gap-2">
                <span className="text-xl flex-shrink-0 mt-0.5">{f.icon}</span>
                <div>
                  <p className="font-serif font-bold text-[#162040] text-sm">{f.t}</p>
                  <p className="text-gray-500 text-xs font-serif">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/quienes-somos" className="inline-flex items-center gap-1.5 text-[#162040] font-bold font-serif hover:underline text-sm">
            Conoce nuestra historia →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Clients marquee ──────────────────────────────────────────────────────────
function Clients() {
  return (
    <section className="py-12 bg-white overflow-hidden border-y border-gray-100">
      <p className="text-center text-[#162040]/40 text-[10px] font-bold uppercase tracking-widest mb-8 font-serif">Nuestros clientes — Empresas que confían en nosotros</p>
      <div className="marquee-track">
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <span key={i} className="text-[#162040]/40 hover:text-[#162040] font-serif font-semibold text-sm mx-8 flex-shrink-0 transition-colors cursor-default whitespace-nowrap">{c}</span>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0)
  const perView = 3
  const visible = TESTIMONIALS.slice(active * perView, active * perView + perView)
  const pages = Math.ceil(TESTIMONIALS.length / perView)
  return (
    <section className="py-20 bg-[#f5efe8]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#162040]/50 text-xs font-bold uppercase tracking-widest mb-2 font-serif">Lo que dicen</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#162040]">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-500 mt-2 font-serif">Testimonios reales de quienes confiaron en nosotros</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <div key={i} className="review-card-enter bg-white rounded-2xl p-7 shadow-sm border border-[#162040]/8 card-lift">
              <div className="text-amber-400 mb-3 text-lg">★★★★★</div>
              <p className="text-gray-600 text-sm font-serif leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#162040]/10 text-[#162040] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 font-serif">
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#162040] font-serif">{t.name}</p>
                  <p className="text-xs text-gray-400 font-serif">{t.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-[#162040]' : 'w-2.5 bg-[#162040]/25 hover:bg-[#162040]/50'}`} />
          ))}
        </div>
        <p className="text-center text-[#162040]/50 text-sm font-serif mt-4">
          Calificación promedio: <strong className="text-[#162040]">4.6/5</strong>
        </p>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="bg-[#162040] py-16 px-4 text-center">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">¿Listo para planear tu evento?</h2>
      <p className="text-white/60 font-serif mb-8">Obtén una cotización personalizada en menos de 5 minutos</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href={WA_URL} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white font-bold font-serif px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chatear por WhatsApp
        </a>
        <a href="tel:5215540080373"
          className="border-2 border-white/40 text-white hover:bg-white hover:text-[#162040] font-bold font-serif px-8 py-3.5 rounded-xl transition-all duration-300">
          Llamar ahora
        </a>
      </div>
      <div className="flex flex-wrap gap-6 justify-center mt-6 text-white/40 text-sm font-serif">
        <span>✓ Sin compromiso</span>
        <span>✓ Respuesta en menos de 2 horas</span>
        <span>✓ Atención personalizada</span>
      </div>
    </section>
  )
}

// ─── Main Home component ───────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <GalleryCarouselSection />
      <Cities />
      <HowItWorks />
      <About />
      <Clients />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
