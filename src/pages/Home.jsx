import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { whatsappLink, CLIENTS, TESTIMONIALS, CITIES, INSTAGRAM_GROUPS } from '../data/site'

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

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
    <section ref={ref} className="bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
        <div>
          <p className="font-serif text-4xl md:text-5xl text-accent">{events.toLocaleString()}+</p>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">Eventos realizados</p>
        </div>
        <div>
          <p className="font-serif text-4xl md:text-5xl text-accent">{people.toLocaleString()}+</p>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">Personas atendidas</p>
        </div>
        <div>
          <p className="font-serif text-4xl md:text-5xl text-accent">4.6/5</p>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">Calificación promedio</p>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    { icon: '🍽️', title: 'Banquetes & Catering', desc: 'Menús personalizados y servicio gourmet para eventos de 10 a 500+ personas', to: '/banquetes-catering' },
    { icon: '🎊', title: 'Eventos completos', desc: 'Organización integral de tu evento de principio a fin', to: '/bodas' },
    { icon: '🪑', title: 'Mobiliario premium', desc: 'Renta de muebles elegantes para cualquier tipo de evento', to: '/salas-periqueras' },
    { icon: '💍', title: 'Wedding Planner', desc: 'Planeación, coordinación y creación total de tu boda', to: '/wedding-planner' },
    { icon: '🎵', title: 'Audio & Iluminación', desc: 'Sonido e iluminación profesional para todo tipo de eventos', to: '/audio-iluminacion-video' },
    { icon: '📷', title: 'Fotografía & Video', desc: 'Cobertura profesional para inmortalizaar cada momento', to: '/fotografia' },
  ]
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Lo que hacemos</p>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">Nuestros servicios</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Todo lo que necesitas para hacer de tu evento una experiencia inolvidable</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link key={s.to} to={s.to}
              className="group p-7 rounded-2xl border border-gray-100 hover:border-secondary hover:shadow-lg transition-all bg-white">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-serif text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function InstagramGallery() {
  const [slide, setSlide] = useState(0)
  const total = INSTAGRAM_GROUPS.length
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % total), 3500)
    return () => clearInterval(t)
  }, [total])
  const group = INSTAGRAM_GROUPS[slide]
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">@bodasesormx</p>
          <h2 className="font-serif text-4xl text-gray-900">Galería de Eventos</h2>
          <p className="text-gray-500 mt-2">Más de 145 fotos reales de eventos realizados por Bodasesor en todo México.</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {group.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl bg-gray-200">
              <img src={src} alt={`Evento ${slide * 3 + i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {INSTAGRAM_GROUPS.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === slide ? 'bg-primary w-5' : 'bg-gray-300'}`} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/galeria" className="inline-flex items-center gap-2 border border-gray-300 hover:border-accent text-gray-700 hover:text-primary font-semibold px-6 py-3 rounded-full transition-colors text-sm">
            Ver galería completa →
          </Link>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { num: '01', title: 'Cotiza gratis', desc: 'Contáctanos por WhatsApp y cuéntanos sobre tu evento' },
    { num: '02', title: 'Recibe propuesta', desc: 'Opciones personalizadas con precios claros' },
    { num: '03', title: 'Confirma detalles', desc: 'Ajustamos según tus preferencias' },
    { num: '04', title: '¡Disfruta tu evento!', desc: 'Nosotros nos encargamos de todo' },
  ]
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Cómo funciona</p>
          <h2 className="font-serif text-4xl text-gray-900">Organizar tu evento es más fácil de lo que piensas</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="font-serif text-5xl text-amber-200 font-bold mb-3">{s.num}</div>
              <h3 className="font-serif text-lg text-gray-900 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="py-20 px-4 bg-secondary/40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <img src="/images/galeria-1.png" alt="Bodasesor equipo" className="rounded-2xl shadow-lg w-full object-cover" loading="lazy" />
        </div>
        <div className="md:w-1/2">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Quiénes somos</p>
          <h2 className="font-serif text-4xl text-gray-900 mb-5">Creamos eventos que se convierten en recuerdos</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Somos Bodasesor Eventos, una empresa especializada en la organización y producción de celebraciones en la Ciudad de México. Con más de diez años de experiencia, acompañamos a nuestros clientes en cada etapa de su evento.
          </p>
          <div className="flex gap-8 mb-6">
            <div>
              <p className="font-serif text-3xl text-primary">+10</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">años de experiencia</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-primary">100%</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">atención personalizada</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: '🏆', t: 'Experiencia comprobada' },
              { icon: '🤝', t: 'Servicio personalizado' },
              { icon: '✨', t: 'Calidad en cada detalle' },
              { icon: '💡', t: 'Creatividad e innovación' },
            ].map(f => (
              <div key={f.t} className="flex items-center gap-2 text-sm text-gray-700">
                <span>{f.icon}</span> {f.t}
              </div>
            ))}
          </div>
          <Link to="/quienes-somos" className="inline-flex items-center gap-1 text-primary font-semibold hover:underline text-sm">
            Conoce nuestra historia →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Clients() {
  return (
    <section className="py-16 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">Empresas que confían en nosotros</p>
        <div className="relative">
          <div className="flex gap-10 animate-marquee whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-gray-400 font-semibold text-sm flex-shrink-0 hover:text-gray-700 transition-colors">{c}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>
    </section>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const perView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3
  const pages = Math.ceil(TESTIMONIALS.length / perView)
  const visible = TESTIMONIALS.slice(active * perView, active * perView + perView)
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Nuestros clientes</p>
          <h2 className="font-serif text-4xl text-gray-900">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <div className="text-accent text-lg mb-3">★★★★★</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-primary w-5' : 'bg-gray-300'}`} />
          ))}
        </div>
        <p className="text-center text-gray-400 text-sm mt-4">Calificación promedio: <strong className="text-gray-700">4.6/5</strong></p>
      </div>
    </section>
  )
}

function Cities() {
  return (
    <section className="py-16 px-4 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-2">Cobertura nacional</p>
        <h2 className="font-serif text-3xl mb-8">Servicio en las principales ciudades</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {CITIES.map(city => (
            <span key={city} className="px-4 py-2 bg-gray-800 hover:bg-primary/20 border border-gray-700 hover:border-accent text-gray-300 hover:text-accent rounded-full text-sm transition-colors cursor-default">
              {city}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-bg-new.png" alt="Evento Bodasesor" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-2 inline-flex items-center gap-3 mb-8 text-sm text-white">
            <span className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900">HJ</span>
            <span><strong>Héctor Jiménez</strong> · Monterrey · Servicio impecable, el banquete superó todas las expectativas.</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-semibold leading-tight mb-6">
            Encuentra todo para tu evento<br/>
            <span className="text-accent">en un solo lugar</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Banquetes premium, catering gourmet y mobiliario elegante para eventos corporativos, bodas y celebraciones en todo México
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full text-base transition-colors shadow-lg">
              Cotiza por WhatsApp
            </a>
            <Link to="/banquetes-catering"
              className="border border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-base transition-colors">
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      <Stats />
      <Services />
      <InstagramGallery />
      <HowItWorks />
      <AboutSection />
      <Clients />
      <Testimonials />
      <Cities />

      {/* Final CTA */}
      <section className="bg-primary py-16 px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-3">¿Listo para planear tu evento?</h2>
        <p className="text-secondary-foreground mb-8">Obtén una cotización personalizada en menos de 5 minutos</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
            className="bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:bg-secondary transition-colors">
            Chatear por WhatsApp
          </a>
          <a href="tel:+525540080373" className="border-2 border-white text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors">
            Llamar ahora
          </a>
        </div>
        <div className="flex flex-wrap gap-6 justify-center mt-6 text-secondary-foreground text-sm">
          <span>✓ Sin compromiso</span>
          <span>✓ Respuesta en menos de 2 horas</span>
          <span>✓ Atención personalizada</span>
        </div>
      </section>
    </>
  )
}
