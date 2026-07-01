import CityLink from "../components/CityLink";
const Link = CityLink;
import { CARPAS } from "../data/carpas-products";
import { useCity } from "../context/CityContext";

const WA_BASE = "https://wa.me/5215540080373?text=";
const waGeneral = WA_BASE + encodeURIComponent("Hola, me interesa cotizar una carpa para mi evento. ¿Me pueden dar información y disponibilidad?");

function WaSvg() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function CarpasPage() {
  const { city } = useCity();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[#8a9bb5] mb-6 font-serif">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-white/80">Carpas para Eventos</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Carpas para Eventos{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              Protección y elegancia para tus eventos al aire libre. Carpas de todos los estilos y tamaños, instaladas y retiradas por profesionales.
            </p>
            <p className="text-[#8a9bb5] font-serif text-sm mb-8">
              Desde carpas blancas clásicas hasta domos geodésicos de vanguardia. Cotizamos por metro cuadrado según el área a cubrir.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={waGeneral} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
                <WaSvg />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-3 h-80">
            <div className="rounded-2xl overflow-hidden bg-[#0d1630]">
              <img src={CARPAS[0].img} alt={CARPAS[0].name} className="w-full h-full object-cover opacity-90" />
            </div>
            <div className="rounded-2xl overflow-hidden bg-[#0d1630]">
              <img src={CARPAS[2].img} alt={CARPAS[2].name} className="w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-[#162040]/70">
          <span><strong className="text-[#162040]">{CARPAS.length}</strong> estilos disponibles</span>
          <span>•</span>
          <span>Cotizado por m²</span>
          <span>•</span>
          <span>Instalación y retiro incluidos</span>
          <span>•</span>
          <span>Disponible en toda la República</span>
        </div>
      </div>

      {/* SEO Description */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          <p>
            Las <strong>carpas para eventos en México</strong> son la solución ideal cuando quieres celebrar al aire libre sin depender del clima. Nuestro catálogo incluye <strong>carpas blancas clásicas</strong>, <strong>carpas transparentes de cristal</strong>, <strong>domos geodésicos</strong>, <strong>carpas árabe o beduina</strong> y <strong>estructuras tensionadas de diseño</strong>. Todas se instalan en jardines, haciendas, terrenos baldíos y estacionamientos.
          </p>
          <p>
            Cada <strong>carpa para boda</strong> o evento social puede personalizarse con entelados, iluminación interior, piso de madera, cortinas, cristales laterales y climatización. Cotizamos por metro cuadrado según el área a cubrir y el número de invitados. Nuestros técnicos realizan el montaje y desmontaje completo, cumpliendo con normas de seguridad estructural.
          </p>
          <p>
            También atendemos <strong>renta de carpas para eventos corporativos</strong>, ferias, exposiciones, graduaciones y fiestas infantiles. Tenemos presencia en Ciudad de México, Estado de México, Morelos, Puebla y toda la República Mexicana. Solicita tu cotización sin costo y recibe atención personalizada en menos de 24 horas.
          </p>
        </div>
      </section>

      {/* Catálogo */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040] mb-4">
              Nuestros Estilos de Carpa{city ? ` en ${city.name}` : ''}
            </h2>
            <p className="text-gray-600 font-serif max-w-2xl mx-auto">
              Cada carpa está disponible en múltiples tamaños y se adapta a jardines, haciendas, terrenos y espacios abiertos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CARPAS.map(carpa => {
              const wa = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar una ${carpa.name} para mi evento${city ? ` en ${city.name}` : ''}. ¿Me pueden dar información?`);
              return (
                <div key={carpa.slug} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 group">
                  <div className="bg-[#162040] h-48 overflow-hidden relative">
                    <img src={carpa.img} alt={carpa.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162040]/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-[#162040] mb-1">
                      {carpa.name}{city ? ` ${city.short}` : ''}
                    </h3>
                    <p className="text-sm text-[#162040]/60 font-serif italic mb-3">{carpa.tagline}</p>
                    <p className="text-gray-600 font-serif text-sm leading-relaxed mb-4">{carpa.short}</p>

                    <div className="mb-4">
                      <p className="text-xs font-bold text-[#162040] font-serif mb-1.5">Ideal para:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {carpa.idealPara.slice(0, 3).map(t => (
                          <span key={t} className="bg-[#f5efe8] text-[#162040] text-xs font-serif px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/carpas/${carpa.slug}`}
                        className="flex-1 bg-[#162040] hover:bg-[#1e2d56] text-white text-sm font-bold font-serif py-2.5 px-4 rounded-xl text-center transition-colors"
                      >
                        Ver detalles
                      </Link>
                      <a href={wa} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 bg-[#0d6849] hover:bg-[#0a5740] text-white text-sm font-bold font-serif py-2.5 px-3 rounded-xl transition-colors">
                        <WaSvg />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#162040] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            ¿Necesitas una carpa para tu evento{city ? ` en ${city.name}` : ''}?
          </h2>
          <p className="text-white/70 font-serif mb-8">
            Cuéntanos el tamaño de tu espacio y el tipo de evento y te enviamos una cotización sin compromiso.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <WaSvg />
            Cotizar ahora
          </a>
        </div>
      </section>

    </div>
  );
}
