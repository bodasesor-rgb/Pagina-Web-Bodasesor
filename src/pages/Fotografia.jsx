import { whatsappLink } from '../data/site'
import SectionCTA from '../components/SectionCTA'

export default function Fotografia() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 bg-[#162040] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Recuerdos para siempre</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Fotografía & Video</h1>
          <p className="text-gray-300 text-lg mb-8">
            Capturamos cada momento especial de tu evento con fotógrafos y videógrafos profesionales, para que los recuerdos duren toda la vida.
          </p>
          <a href={whatsappLink('Hola, me interesa cotizar fotografía y video para mi evento')}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-colors">
            Cotizar fotografía & video
          </a>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: '📷', title: 'Fotografía de Eventos', desc: 'Cobertura fotográfica del día completo: desde los preparativos hasta el cierre de la fiesta. Entregamos álbum digital con edición profesional.', items: ['Cobertura completa del evento', 'Fotos de detalle y ambiente', 'Álbum digital editado', 'Entrega en 2-3 semanas'] },
              { icon: '🎬', title: 'Video Cinematográfico', desc: 'Filmación profesional con equipo 4K y técnicas cinematográficas. Drone disponible para tomas aéreas.', items: ['Filmación en 4K', 'Edición cinematográfica', 'Drone (aerial shots)', 'Música personalizada'] },
              { icon: '360°', title: 'Cámara 360 & Photobooth', desc: 'El show de fotos más divertido para tus invitados. Cámara 360 con impresión en el momento.', items: ['Cámara 360 con impresión', 'Photobooth con props', 'Galería digital compartida', 'Operador incluido'] },
              { icon: '📸', title: 'Sesión de Parejas', desc: 'Sesión fotográfica profesional para novios o parejas en locación. Ideal como recuerdo especial.', items: ['2-3 horas de sesión', 'Locación de tu elección', '50+ fotos editadas', 'Álbum físico opcional'] },
            ].map(s => (
              <div key={s.title} className="border border-gray-100 rounded-2xl p-8 hover:shadow-md hover:border-secondary transition-all">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-serif text-2xl text-[#162040] mb-3">{s.title}</h3>
                <p className="text-[#8a9bb5] text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map(i => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-primary">✓</span> {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA />
    </>
  )
}
