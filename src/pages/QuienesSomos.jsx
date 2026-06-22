import { Link } from 'react-router-dom'
import { EMAIL, PHONE, INSTAGRAM, whatsappLink, img } from '../data/site'
import SectionCTA from '../components/SectionCTA'

export default function QuienesSomos() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 text-center bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-3">Quiénes somos</p>
          <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-6">Creamos eventos que se convierten en recuerdos</h1>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img src={img('/images/galeria-1.png')} alt="Equipo Bodasesor" className="rounded-2xl shadow-lg w-full object-cover" loading="lazy" />
          </div>
          <div className="md:w-1/2">
            <p className="text-gray-600 mb-5 leading-relaxed">
              Somos Bodasesor Eventos, una empresa especializada en la organización y producción de celebraciones sociales en la Ciudad de México. Con más de diez años de experiencia, acompañamos a nuestros clientes en cada etapa de su evento: desde la primera idea hasta el último detalle.
            </p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { num: '+10', label: 'años de experiencia' },
                { num: '100%', label: 'atención personalizada' },
                { num: '1,000+', label: 'eventos realizados' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-3xl text-amber-600">{s.num}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl text-gray-900 text-center mb-10">¿Por qué elegir Bodasesor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: 'Experiencia comprobada', desc: 'Más de una década organizando eventos de todos los tamaños, con un equipo profesional y apasionado.' },
              { icon: '🤝', title: 'Servicio personalizado', desc: 'Cada evento es único. Trabajamos contigo para entender tu visión y llevarla a la realidad.' },
              { icon: '✨', title: 'Calidad en cada detalle', desc: 'Nos aliamos con los mejores proveedores para garantizar catering, decoración y logística de primer nivel.' },
              { icon: '💡', title: 'Creatividad e innovación', desc: 'Diseñamos experiencias originales que sorprenden a tus invitados y superan tus expectativas.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-serif text-lg text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-2xl text-gray-700 italic mb-8">
            "No solo organizamos eventos — creamos los momentos que tus invitados recordarán para siempre."
          </blockquote>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-amber-600 transition-colors">
              <span>📧</span> {EMAIL}
            </a>
            <a href={`tel:+52${PHONE.replace(/\s/g,'')}`} className="flex items-center gap-2 hover:text-amber-600 transition-colors">
              <span>📞</span> {PHONE}
            </a>
            <span className="flex items-center gap-2 text-amber-600">
              <span>📸</span> {INSTAGRAM}
            </span>
          </div>
          <div className="mt-8">
            <Link to="/" className="inline-flex items-center gap-2 text-amber-600 hover:underline font-semibold text-sm">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      <SectionCTA />
    </>
  )
}
