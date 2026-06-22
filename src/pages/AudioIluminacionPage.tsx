import { Link } from "wouter";
import { useCity } from "../context/CityContext";
import { AUDIO_ILUMINACION } from "../data/audio-iluminacion-products";
import type { AudioIluminacionProduct, AudioIluminacionCategory } from "../data/audio-iluminacion-products";

const WA_BASE = "https://wa.me/5215540080373?text=";
const waGeneral = WA_BASE + encodeURIComponent("Hola, me interesa cotizar audio, iluminación o video para mi evento. ¿Me pueden dar información?");

const CATEGORY_META: Record<AudioIluminacionCategory, { label: string; icon: string; id: string; desc: string }> = {
  audio:      { label: 'Audio Profesional',      icon: '🎵', id: 'audio',      desc: 'Sistemas de sonido de alta fidelidad para cualquier tamaño de evento.' },
  iluminacion:{ label: 'Iluminación de Impacto', icon: '💡', id: 'iluminacion', desc: 'Desde guirnaldas románticas hasta cabezas móviles robóticas y efectos láser.' },
  video:      { label: 'Video y Pantallas',       icon: '🎥', id: 'video',      desc: 'Pantallas LED gigantes, transmisión en vivo y camarografía profesional.' },
};

const WaSvg = () => (
  <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function ProductCard({ product }: { product: AudioIluminacionProduct }) {
  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar "${product.name}" para mi evento.`);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300">
      <Link href={`/audio-iluminacion-video/${product.slug}`}>
        <div className="h-48 overflow-hidden bg-[#f5efe8]">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).src = '/images/instagram/ig1.jpg'; }}
          />
        </div>
      </Link>
      <div className="p-5">
        <h3 className="font-serif font-bold text-[#162040] text-base mb-1">{product.name}</h3>
        <p className="font-serif text-gray-500 text-xs mb-3 italic">{product.tagline}</p>
        <p className="font-serif text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2">{product.short}</p>
        <div className="flex gap-2">
          <Link href={`/audio-iluminacion-video/${product.slug}`}
            className="flex-1 text-center text-xs font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2 rounded-lg hover:bg-[#f5efe8] transition-colors">
            Ver detalle
          </Link>
          <a href={waMsg} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-serif font-semibold text-white bg-[#25D366] hover:bg-green-500 py-2 rounded-lg transition-colors">
            Cotizar
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AudioIluminacionPage() {
  const { city } = useCity();
  const categories: AudioIluminacionCategory[] = ['audio', 'iluminacion', 'video'];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-white/40 mb-3">Bodasesor Eventos</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Audio, Iluminación y Video{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              Transformamos cada celebración en una experiencia sensorial inolvidable con tecnología de punta y equipo profesional.
            </p>
            <p className="text-white/50 font-serif text-sm mb-8">
              {AUDIO_ILUMINACION.length} servicios disponibles. Técnicos especializados con experiencia en bodas, corporativos y eventos de gran formato.
            </p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <WaSvg /> Cotizar producción audiovisual
            </a>
          </div>
          <div className="hidden lg:grid grid-cols-3 gap-3 h-56">
            {AUDIO_ILUMINACION.slice(0, 3).map(p => (
              <div key={p.slug} className="rounded-xl overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/instagram/ig1.jpg'; }} />
              </div>
            ))}
          </div>
        </div>
        {/* Sub-badges */}
        <div className="border-t border-white/10 py-4">
          <div className="max-w-7xl mx-auto px-4 flex gap-6 text-white/40 font-serif text-xs">
            <span>Audio profesional</span><span>•</span>
            <span>Iluminación de impacto</span><span>•</span>
            <span>Video y pantallas 4K</span><span>•</span>
            <span>Técnicos certificados</span>
          </div>
        </div>
      </section>

      {/* SEO Description */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          <p>
            El <strong>audio profesional para eventos</strong> es el pilar de cualquier celebración memorable. Contamos con <strong>sistemas de sonido Line Array</strong>, <strong>consolas digitales</strong>, <strong>micrófonos inalámbricos de solapa y diadema</strong> y <strong>monitores de escenario</strong> para artistas en vivo. Nuestros técnicos de sonido tienen experiencia en bodas, congresos, conciertos y festivales.
          </p>
          <p>
            En <strong>iluminación para eventos</strong> ofrecemos desde <strong>guirnaldas Edison vintage</strong>, <strong>cascadas LED</strong>, <strong>uplighting de salón</strong> y <strong>gobos de iniciales</strong> hasta <strong>cabezas móviles robóticas</strong>, <strong>efectos láser</strong>, <strong>máquinas de humo bajo</strong>, <strong>cañones de confeti</strong> y <strong>iluminación arquitectónica de fachadas</strong>. Cada diseño de iluminación se programa a medida para tu paleta de colores y estilo de evento.
          </p>
          <p>
            Para <strong>video y pantallas en eventos</strong> contamos con <strong>pantallas LED gigantes</strong>, <strong>proyectores de alta luminosidad</strong>, <strong>transmisión en vivo para bodas</strong>, <strong>camarografía profesional</strong> y <strong>video mapping</strong>. Todos los servicios incluyen transporte, montaje, operación técnica durante el evento y desmontaje al finalizar.
          </p>
        </div>
      </section>

      {/* ── Categorías índice ── */}
      <section className="bg-[#f5efe8] border-b border-[#162040]/10 py-6 px-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {categories.map(cat => {
            const meta = CATEGORY_META[cat];
            return (
              <a key={cat} href={`#${meta.id}`}
                className="flex items-center gap-2 bg-white text-[#162040] px-4 py-2 rounded-lg font-serif text-sm font-bold border border-[#162040]/10 hover:border-[#162040]/30 hover:shadow-sm transition-all">
                <span>{meta.icon}</span>{meta.label}
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Sección por categoría ── */}
      {categories.map(cat => {
        const meta = CATEGORY_META[cat];
        const products = AUDIO_ILUMINACION.filter(p => p.category === cat);
        return (
          <section key={cat} id={meta.id} className="py-14 px-4 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <span className="text-2xl text-[#162040]/30 font-serif">{meta.icon}</span>
                <div>
                  <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40">
                    Producción Audiovisual
                  </p>
                  <h2 className="text-2xl font-serif font-bold text-[#162040]">{meta.label}</h2>
                  <p className="font-serif text-gray-500 text-sm mt-1">{meta.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => <ProductCard key={p.slug} product={p} />)}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Paquetes ── */}
      <section className="bg-[#f5efe8] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40 mb-2">Todo en Uno</p>
            <h2 className="text-3xl font-serif font-bold text-[#162040]">Paquetes según tu Evento</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Boda Romántica', icon: '💍', items: ['Audio básico con micrófonos', 'Guirnaldas y cascadas LED', 'Uplighting en color de tu boda', 'Máquina de humo bajo', 'Proyector de gobo con iniciales'] },
              { title: 'Fiesta Premium', icon: '🎊', items: ['Sistema Line Array', 'Cabezas móviles robóticas', 'Pantalla LED 4x2.5 m', 'Efectos especiales y láser', 'Operador técnico completo'] },
              { title: 'Corporativo', icon: '🏢', items: ['Audio profesional con consola', 'Pantalla LED o proyector', 'Iluminación arquitectónica', 'Transmisión en vivo', 'Soporte técnico integral'] },
            ].map(pkg => (
              <div key={pkg.title} className="bg-white rounded-2xl p-7 border border-[#162040]/8 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">{pkg.icon}</div>
                <h3 className="font-serif font-bold text-[#162040] text-lg mb-4">{pkg.title}</h3>
                <ul className="space-y-2 mb-6">
                  {pkg.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-serif text-sm text-gray-600">
                      <span className="text-[#162040]/30 mt-0.5 flex-shrink-0">◎</span>{item}
                    </li>
                  ))}
                </ul>
                <a href={waGeneral} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#162040] hover:bg-[#1d2a52] text-white py-3 rounded-xl font-serif font-bold text-sm transition-colors">
                  <WaSvg /> Cotizar este paquete
                </a>
              </div>
            ))}
          </div>
          <p className="text-center font-serif text-sm text-[#162040]/50 mt-8">
            En cada servicio incluimos: transporte del equipo al venue · montaje y pruebas antes del evento · operación técnica durante todo el evento · desmontaje al finalizar
          </p>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">¿Listo para crear una experiencia inolvidable?</h2>
          <p className="text-white/70 font-serif mb-8">
            Te asesoramos sin costo para armar el paquete ideal según tu evento, espacio y visión.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <WaSvg /> Solicitar cotización personalizada
          </a>
        </div>
      </section>
    </div>
  );
}
