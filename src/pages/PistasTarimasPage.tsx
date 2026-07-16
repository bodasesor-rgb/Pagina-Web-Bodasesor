import { useEffect } from "react";
import CityLink from "../components/CityLink";
import OptimizedImage from "../components/OptimizedImage";
const Link = CityLink;
import { PISTAS_TARIMAS, PistaTarimaCat } from "../data/pistas-tarimas-products";
import { useCity } from "../context/CityContext";

const WHATSAPP_NUMBER = "5215540080373";
const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}?text=`;

function WaSvg({ size = 4 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`w-${size} h-${size} flex-shrink-0`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const CATEGORIES: { key: PistaTarimaCat; label: string; icon: string; desc: string }[] = [
  { key: 'tarimas', label: 'Tarimas Básicas', icon: '🪵', desc: 'Estructuras sólidas y versátiles para cualquier tipo de evento' },
  { key: 'pistas', label: 'Pistas de Baile', icon: '💃', desc: 'El corazón de tu celebración, diseñadas a medida' },
  { key: 'escenarios', label: 'Escenarios y Estrados', icon: '🎭', desc: 'Estructuras elegantes que elevan tus momentos más importantes' },
  { key: 'sets', label: 'Sets Completos', icon: '✨', desc: 'Pistas, barras y cabinas coordinadas en un solo paquete' },
];

const CATEGORY_COLORS: Record<PistaTarimaCat, string> = {
  tarimas: 'from-amber-800 to-amber-900',
  pistas: 'from-[#162040] to-[#0d1630]',
  escenarios: 'from-slate-700 to-slate-900',
  sets: 'from-violet-800 to-violet-900',
};

export default function PistasTarimasPage() {
  const { city } = useCity();
  const waGeneral = WA_BASE + encodeURIComponent('Hola, me gustaría cotizar una pista de baile o tarima para mi evento.');

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-[#8a9bb5] mb-6 font-serif flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/80">Pistas y Tarimas</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            Pistas de Baile, Tarimas<br className="hidden sm:block" /> y Escenarios{city ? ` en ${city.name}` : ''}
          </h1>
          <p className="text-lg md:text-xl text-white/75 font-serif max-w-2xl mx-auto mb-8">
            Diseñados a medida para transformar tu celebración en una experiencia inolvidable
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <WaSvg size={4} /> Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap gap-6 justify-center text-sm font-serif text-gray-600">
          <span><strong className="text-[#162040]">+100</strong> eventos realizados</span>
          <span>•</span>
          <span>Materiales premium de alta resistencia</span>
          <span>•</span>
          <span>Instalación profesional incluida</span>
          <span>•</span>
          <span>Diseños completamente personalizados</span>
        </div>
      </section>

      {/* SEO Description */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          <p>
            La <strong>pista de baile para eventos</strong> es el centro de la celebración. En Bodasesor ofrecemos <strong>pistas de madera lustrada</strong>, <strong>pistas espejadas</strong>, <strong>pistas LED RGB</strong>, <strong>pistas de parquet flotante</strong> y <strong>pistas personalizadas con vinil impreso</strong>. Cada pista se fabrica y ensambla a la medida del espacio disponible, sin restricciones de forma o tamaño.
          </p>
          <p>
            También contamos con <strong>tarimas para escenario</strong>, <strong>tarimas para DJ y música en vivo</strong>, <strong>estrados para ceremonia civil</strong>, <strong>escenarios telescópicos</strong> y <strong>sets completos con cabina de DJ y barra coordinada</strong>. Todos los materiales son de alta resistencia y soportan el peso de equipos pesados, artistas y público.
          </p>
          <p>
            Nuestro servicio incluye <strong>diseño personalizado de pista</strong> según la estética de tu evento, instalación profesional con técnicos certificados, iluminación bajo la pista y desmontaje al concluir. Atendemos bodas, quinceañeras, graduaciones, eventos corporativos y festivales en toda la República Mexicana. Solicita tu cotización sin compromiso hoy mismo.
          </p>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#162040] mb-8 text-center">¿Por qué elegirnos?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🎨', t: 'Diseños completamente personalizados', d: 'Cada pista o tarima se adapta exactamente a la estética de tu evento.' },
              { icon: '🏆', t: 'Materiales premium', d: 'Alta resistencia y durabilidad para que bailes toda la noche sin preocupaciones.' },
              { icon: '🔧', t: 'Instalación profesional', d: 'Equipo especializado con asistencia técnica incluida en cada servicio.' },
              { icon: '📐', t: 'Medidas a la medida', d: 'Sin limitaciones de tamaño. Tu espacio define nuestras dimensiones.' },
              { icon: '💬', t: 'Asesoramiento integral', d: 'Desde la cotización hasta el montaje, te acompañamos en cada paso.' },
              { icon: '🚚', t: 'Logística coordinada', d: 'Entrega, armado y retiro coordinados para que no te preocupes de nada.' },
            ].map(item => (
              <div key={item.t} className="bg-[#f5efe8] rounded-xl p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-serif font-bold text-[#162040] mb-1 text-sm">{item.t}</h3>
                <p className="text-gray-600 text-xs font-serif leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías con productos */}
      {CATEGORIES.map(cat => {
        const products = PISTAS_TARIMAS.filter(p => p.cat === cat.key);
        return (
          <section key={cat.key} className="py-12 px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#162040]">{cat.label}</h2>
                  <p className="text-gray-600 font-serif text-sm">{cat.desc}</p>
                </div>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => {
                  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar: ${product.name} para mi evento.`);
                  return (
                    <div key={product.slug}
                      className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/20 hover:shadow-xl transition-all duration-300">

                      {/* Visual header */}
                      <Link href={`/pistas-tarimas/${product.slug}`}>
                        <div className="h-44 product-media overflow-hidden bg-gray-100">
                          <OptimizedImage
                            src={product.img}
                            alt={product.name}
                            width={400}
                            height={176}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      <div className="p-5">
                        <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75 mb-1 block">
                          {cat.label}
                        </span>
                        <Link href={`/pistas-tarimas/${product.slug}`}>
                          <h3 className="font-serif font-bold text-[#162040] text-base leading-snug mb-2 hover:underline">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm font-serif leading-relaxed mb-4 line-clamp-2">
                          {product.short}
                        </p>
                        <div className="flex gap-2">
                          <Link href={`/pistas-tarimas/${product.slug}`}
                            className="flex-1 flex items-center justify-center border border-[#162040]/20 text-[#162040] py-2 px-3 rounded-xl font-semibold font-serif text-xs hover:bg-[#f5efe8] transition-colors">
                            Ver detalle
                          </Link>
                          <a href={waMsg} target="_blank" rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-[#0d6849] hover:bg-[#0a5740] text-white py-2 px-3 rounded-xl font-bold font-serif text-xs transition-all duration-200">
                            <WaSvg size={3} /> Cotizar
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}


      {/* CTA final */}
      <section className="bg-[#162040] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
            ¿Listo para transformar tu evento?
          </h2>
          <p className="text-white/70 font-serif mb-6">
            Solicita tu presupuesto personalizado hoy mismo. Nuestros asesores te ayudarán a elegir la opción ideal.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <WaSvg size={4} /> Cotizar por WhatsApp
            </a>
            <a href="tel:5215540080373"
              className="flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300">
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
