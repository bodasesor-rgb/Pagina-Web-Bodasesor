import { useEffect } from "react";
import { useCity } from "@/context/CityContext";
import { Link } from "wouter";
import { COMBINACIONES } from "@/data/combinaciones-products";

const WHATSAPP_NUMBER = "5215540080373";

function WaSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

export default function CombinacionesPage() {
  const { city } = useCity();
  useEffect(() => {
    document.title = 'Catálogo de Combinaciones de Mesas y Sillas | Bodasesor';
  }, []);

  const waGeneral = WA_BASE + encodeURIComponent('Hola, me gustaría cotizar una combinación de mesas y sillas para mi evento.');

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50 mb-6 font-serif flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/mesas-sillas" className="hover:text-white transition-colors">Mesas y Sillas</Link>
            <span>/</span>
            <span className="text-white/80">Combinaciones</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            Catálogo de Combinaciones{city ? ` en ${city.name}` : ''}
          </h1>
          <p className="text-lg md:text-xl text-white/75 font-serif max-w-2xl mx-auto mb-8">
            Las combinaciones de mesa y silla más elegantes y solicitadas — selecciona la que más te guste y cotiza al instante
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={waGeneral}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <WaSvg /> Cotizar por WhatsApp
            </a>
            <a
              href="tel:5215540080373"
              className="flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300 hover:scale-105"
            >
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap gap-6 justify-center text-sm font-serif text-[#162040]/70">
          <span><strong className="text-[#162040]">{COMBINACIONES.length}</strong> combinaciones disponibles</span>
          <span>•</span>
          <span>Entrega, armado y retiro incluidos</span>
          <span>•</span>
          <span>+1,000 eventos realizados</span>
        </div>
      </section>

      {/* Grid de combinaciones */}
      <section className="py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {COMBINACIONES.map((c) => {
              const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar la combinación: ${c.label}`);
              return (
                <div
                  key={c.slug}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/20 hover:shadow-xl transition-all duration-300"
                >
                  {/* Foto — link a página individual */}
                  <Link href={`/combinaciones/${c.slug}`}>
                    <div className="aspect-[4/3] overflow-hidden bg-[#f5efe8]">
                      <img
                        src={c.img}
                        alt={c.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-5">
                    <Link href={`/combinaciones/${c.slug}`}>
                      <h2 className="font-serif font-bold text-[#162040] text-base leading-snug mb-2 hover:underline">
                        {c.label}
                      </h2>
                    </Link>
                    <p className="text-gray-500 text-sm font-serif leading-relaxed mb-4">
                      {c.desc}
                    </p>
                    <div className="flex gap-2">
                      <Link href={`/combinaciones/${c.slug}`}
                        className="flex-1 flex items-center justify-center border border-[#162040]/20 text-[#162040] py-2 px-3 rounded-xl font-semibold font-serif text-xs hover:bg-[#f5efe8] transition-colors">
                        Ver detalle
                      </Link>
                      <a
                        href={waMsg}
                        target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-green-500 text-white py-2 px-3 rounded-xl font-bold font-serif text-xs transition-all duration-200"
                      >
                        <WaSvg /> Cotizar
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#162040] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
            ¿No encuentras la combinación que buscas?
          </h2>
          <p className="text-white/70 font-serif mb-6">
            Tenemos más de 18 modelos de sillas y 6 tipos de mesas. Contamos con el catálogo completo para crear la combinación perfecta para tu evento.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={waGeneral}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105"
            >
              <WaSvg /> Consultar catálogo completo
            </a>
            <Link
              href="/mesas-sillas"
              className="flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300"
            >
              Ver Mesas y Sillas
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
