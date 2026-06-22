import { BARRAS_SERVICES, whatsappLink } from '../data/site'
import SectionCTA from '../components/SectionCTA'

export default function BarrasBebidas() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">Bebidas para eventos</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Barras de Bebidas</h1>
          <p className="text-gray-300 text-lg mb-8">
            Desde barras de aguas frescas hasta bartenders de mixología premium — todo para mantener a tus invitados bien servidos durante tu evento.
          </p>
          <p className="text-accent text-sm mb-8">5 opciones disponibles · Con y sin alcohol · Bartenders certificados · Montaje incluido</p>
          <a href={whatsappLink('Hola, me interesa cotizar una barra de bebidas para mi evento')}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-colors">
            Cotizar barra de bebidas
          </a>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-gray-600 leading-relaxed space-y-4">
          <p>Las barras de bebidas para eventos son un elemento fundamental para la experiencia de tus invitados. Ofrecemos barra de aguas frescas artesanales, barra de mocteles sin alcohol, coctelería y mixología premium con bartenders certificados, café de especialidad con barista y carritos de paletas y helados artesanales.</p>
          <p>Nuestro servicio de open bar para bodas y eventos sociales puede combinar diferentes barras en un solo paquete. El show de flair bartending es una opción espectacular que entretiene a tus invitados mientras disfrutan de sus bebidas.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {BARRAS_SERVICES.map(s => (
              <span key={s.slug} className="px-4 py-2 bg-white border border-secondary text-primary text-sm rounded-full">{s.icon} {s.name}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BARRAS_SERVICES.map((s) => (
              <div key={s.slug} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-secondary transition-all">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-serif text-xl text-gray-900 mb-2">{s.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl text-gray-900 mb-3">¿Qué bebidas quieres en tu evento?</h2>
          <p className="text-gray-500 mb-8">Podemos combinar varias barras en un solo paquete. Cotización personalizada en menos de 24 horas.</p>
          <a href={whatsappLink('Hola, quiero cotizar barras de bebidas para mi evento')}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-colors">
            Cotizar barras
          </a>
        </div>
      </section>

      <SectionCTA />
    </>
  )
}
