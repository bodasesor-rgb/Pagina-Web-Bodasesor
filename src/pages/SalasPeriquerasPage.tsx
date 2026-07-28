import CityLink from "../components/CityLink";
const Link = CityLink;
import { SALAS_CATALOG, PERIQUERAS_CATALOG } from "../data/salas-periqueras-products";
import { useCity } from "../context/CityContext";

const WHATSAPP_NUMBER = "5215540080373";
const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

function WaSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ProductCard({ name, img, href, waMsg }: { name: string; img: string; href: string; waMsg: string }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300">
      <Link href={href} aria-label={`Ver ${name}`}>
        <div className="aspect-[4/3] overflow-hidden bg-[#f5efe8]">
          <img src={img} alt="" width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-4 pb-2">
          <h3 className="font-serif font-bold text-[#162040] text-sm leading-snug">{name}</h3>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <a
          href={waMsg}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white py-2 px-3 rounded-xl font-bold font-serif text-xs transition-all duration-200 hover:scale-[1.02]"
        >
          <WaSvg /> Cotizar
        </a>
      </div>
    </div>
  );
}

export default function SalasPeriquerasPage() {
  const { city } = useCity();
  const waGeneral = WA_BASE + encodeURIComponent('Hola, me gustaría cotizar salas o periqueras para mi evento.');

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-[#8a9bb5] mb-6 font-serif flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/80">Salas y Periqueras</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            Salas y Periqueras{city ? ` en ${city.name}` : ''}
          </h1>
          <p className="text-lg md:text-xl text-white/75 font-serif max-w-2xl mx-auto mb-8">
            Transforma cualquier espacio con nuestro catálogo completo de salas de estar y periqueras — estilo, comodidad y elegancia para tu evento
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <WaSvg /> Cotizar por WhatsApp
            </a>
            <a href="tel:5215540080373"
              className="flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300 hover:scale-105">
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap gap-6 justify-center text-sm font-serif text-gray-600">
          <span><strong className="text-[#162040]">{SALAS_CATALOG.length}</strong> modelos de salas</span>
          <span>•</span>
          <span><strong className="text-[#162040]">{PERIQUERAS_CATALOG.length}</strong> modelos de periqueras</span>
          <span>•</span>
          <span>Entrega, armado y retiro incluidos</span>
          <span>•</span>
          <span>+1,000 eventos realizados</span>
        </div>
      </section>

      {/* SEO Description */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          <p>
            Las <strong>salas de estar para eventos</strong> y las <strong>periqueras para eventos</strong> son el complemento perfecto para cualquier celebración. Nuestro catálogo incluye <strong>salas lounge elegantes</strong>, <strong>salas industriales estilo loft</strong>, <strong>salas minimalistas en blanco</strong>, <strong>salas capitonadas vintage</strong> y <strong>salas de terciopelo premium</strong>. Cada conjunto está disponible en diferentes colores y configuraciones para adaptarse a la paleta de tu evento.
          </p>
          <p>
            Las <strong>periqueras para boda y quinceañera</strong> que ofrecemos van desde modelos clásicos de madera hasta <strong>periqueras de mármol</strong>, <strong>periqueras industriales de metal negro</strong>, <strong>periqueras transparentes de acrílico</strong> y <strong>periqueras doradas de lujo</strong>. Son ideales para zonas de coctel, áreas de descanso y espacios de conversación durante el evento.
          </p>
          <p>
            Todos nuestros <strong>muebles para renta de eventos</strong> incluyen entrega, armado y retiro sin costo adicional. Atendemos la Ciudad de México, Estado de México, Querétaro, Puebla y toda la República Mexicana. Disponemos de inventario suficiente para eventos con más de 500 invitados. Solicita tu cotización y recibe propuesta de ambientación completa.
          </p>
        </div>
      </section>

      {/* Jump nav */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-6 justify-center">
          <a href="#salas" className="text-sm font-serif font-semibold text-[#162040] hover:underline">
            Salas de Estar ({SALAS_CATALOG.length})
          </a>
          <span className="text-gray-300">|</span>
          <a href="#periqueras" className="text-sm font-serif font-semibold text-[#162040] hover:underline">
            Periqueras ({PERIQUERAS_CATALOG.length})
          </a>
        </div>
      </section>

      {/* ── SALAS SECTION ── */}
      <section id="salas" className="py-14 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#162040] mb-2">Salas de Estar</h2>
            <p className="text-gray-600 font-serif">
              Crea espacios de conversación cómodos y elegantes. Disponibles en múltiples estilos, colores y capacidades.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {SALAS_CATALOG.map(sala => (
              <ProductCard
                key={sala.slug}
                name={sala.name}
                img={sala.img}
                href={`/salas/${sala.slug}`}
                waMsg={WA_BASE + encodeURIComponent(`Hola, me interesa cotizar la: ${sala.name}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100 mx-8" />

      {/* ── PERIQUERAS SECTION ── */}
      <section id="periqueras" className="py-14 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#162040] mb-2">Periqueras</h2>
            <p className="text-gray-600 font-serif">
              Excelente opción para eventos donde se requiere espacio para comer o trabajar. Estilos industriales, vintage, mármol y más.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {PERIQUERAS_CATALOG.map(per => (
              <ProductCard
                key={per.slug}
                name={per.name}
                img={per.img}
                href={`/periqueras/${per.slug}`}
                waMsg={WA_BASE + encodeURIComponent(`Hola, me interesa cotizar la: ${per.name}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#162040] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
            ¿Tienes alguna duda sobre el mobiliario?
          </h2>
          <p className="text-white/70 font-serif mb-6">
            Nuestro equipo está listo para ayudarte a crear el espacio perfecto para tu evento. Contáctanos ahora.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-8 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
            <WaSvg /> Consultar por WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
