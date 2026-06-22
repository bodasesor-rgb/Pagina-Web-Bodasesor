import { WEDDING_PLANNER_SERVICES, whatsappLink } from '../data/site'
import SectionCTA from '../components/SectionCTA'

export default function WeddingPlanner() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 bg-[#162040] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-accent text-3xl mb-4">◈</div>
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Bodasesor Eventos</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Wedding Planner</h1>
          <p className="text-gray-300 text-lg mb-8">
            Planeación, coordinación y creación total de tu evento. Para que tú solo disfrutes el momento más importante de tu vida.
          </p>
          <p className="text-accent text-sm mb-8">6 servicios disponibles · Desde asesoría puntual hasta la creación total de tu evento.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={whatsappLink('Hola, me interesa el servicio de Wedding Planner')}
              target="_blank" rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-colors">
              Hablar con un planner
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-[#8a9bb5]">
            <span>✓ Experiencia en bodas de lujo</span>
            <span>✓ Equipo certificado</span>
            <span>✓ Atención personalizada</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Servicios</p>
            <h2 className="font-serif text-4xl text-[#162040]">Nuestros Servicios de Wedding Planner</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WEDDING_PLANNER_SERVICES.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-7 hover:shadow-md hover:border-secondary transition-all">
                <h3 className="font-serif text-xl text-[#162040] mb-1">{s.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{s.desc}</p>
                <p className="text-[#8a9bb5] text-sm leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/40 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-[#162040] mb-3">¿En qué etapa de tu planeación estás?</h2>
          <p className="text-[#8a9bb5] mb-8">Cuéntanos dónde estás y te decimos cuál servicio es el ideal para ti.</p>
          <a href={whatsappLink('Hola, necesito una consulta con un wedding planner')}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-colors">
            Consulta con un planner
          </a>
        </div>
      </section>

      <SectionCTA />
    </>
  )
}
