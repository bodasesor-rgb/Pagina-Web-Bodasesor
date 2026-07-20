import CityLink from "../components/CityLink";
const Link = CityLink;
import { FLORERIA, FLORERIA_BY_CATEGORY } from "../data/floreria-products";
import type { FloreriaProduct } from "../data/floreria-products";
import { useCity } from "../context/CityContext";
import IconFromEmoji from "../components/IconFromEmoji";

const WA_BASE = "https://wa.me/5215540080373?text=";
const waGeneral = WA_BASE + encodeURIComponent("Hola, me interesa cotizar decoración floral o decoración para mi evento. ¿Me pueden dar información?");

const categoryConfig = {
  floral: { label: 'Floral', icon: '✿', desc: 'Centros de mesa, ramos nupciales y arreglos para cada ocasión.' },
  globos: { label: 'Globos', icon: '○', desc: 'Aros, paredes y estructuras de globos para backdrop e impacto visual.' },
  decoracion: { label: 'Decoración', icon: '✦', desc: 'Photo op, letras gigantes, decoración ambiental y aérea.' },
};

export default function FloreriaPage() {
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
              <span className="text-white/80">Florería y Decoración</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Florería y Decoración{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              Flores, globos y decoración integral para transformar cualquier espacio en el escenario perfecto para tu evento.
            </p>
            <p className="text-[#8a9bb5] font-serif text-sm mb-8">
              Desde centros de mesa y ramos de novia hasta photo opportunities, letras gigantes y decoración aérea. Todo diseñado a medida.
            </p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Cotizar por WhatsApp
            </a>
          </div>
          <div className="hidden lg:grid grid-cols-3 gap-3 h-72">
            {FLORERIA.slice(0, 3).map((p, i) => (
              <div key={p.slug} className={`rounded-2xl overflow-hidden bg-[#0d1630] flex items-center justify-center ${i === 1 ? 'row-span-1' : ''}`}>
                {p.img ? (
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-80" />
                ) : (
                  <IconFromEmoji emoji={categoryConfig[p.category].icon} className="w-12 h-12 text-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-gray-600">
          <span><strong className="text-[#162040]">9</strong> productos disponibles</span>
          <span>•</span>
          <span>Diseño 100% personalizado</span>
          <span>•</span>
          <span>Flores naturales e importadas</span>
          <span>•</span>
          <span>Instalación profesional incluida</span>
        </div>
      </div>

      {/* SEO Description */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          <p>
            Somos especialistas en <strong>decoración floral para eventos en México</strong>. Nuestros arreglos incluyen <strong>centros de mesa florales</strong>, <strong>ramos de novia</strong>, <strong>arcos de flores naturales</strong>, <strong>coronas florales</strong> y composiciones personalizadas con flores importadas de temporada. Cada diseño se elabora a medida para reflejar la personalidad y el estilo de tu evento.
          </p>
          <p>
            También ofrecemos <strong>decoración con globos para eventos</strong>: <strong>aros de globos</strong>, <strong>paredes de globos</strong>, <strong>arcos de globos</strong> y estructuras temáticas. Para la decoración ambiental, contamos con <strong>letras gigantes luminosas</strong>, <strong>photo opportunities</strong>, <strong>marquesinas LED</strong>, <strong>decoración aérea</strong> y ambientación integral de salones, jardines y haciendas.
          </p>
          <p>
            Nuestro servicio de <strong>florería para bodas</strong> es el más solicitado, aunque también atendemos quinceañeras, baby showers, bautizos, eventos corporativos y fiestas temáticas. Cada propuesta incluye instalación profesional, coordinación el día del evento y retiro al finalizar. Cotizamos sin costo con base en tu visión, el tipo de flores y el espacio a decorar.
          </p>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(Object.entries(categoryConfig) as [keyof typeof categoryConfig, typeof categoryConfig[keyof typeof categoryConfig]][]).map(([key, cfg]) => (
              <a key={key} href={`#${key}`}
                className="bg-[#f5efe8] rounded-2xl p-5 hover:shadow-md transition-all border border-[#162040]/5 hover:border-[#162040]/20">
                <IconFromEmoji emoji={cfg.icon} className="w-8 h-8 text-[#162040]/30 mb-2" />
                <p className="font-serif font-bold text-[#162040] mb-1">{cfg.label}</p>
                <p className="font-serif text-xs text-gray-600">{cfg.desc}</p>
                <p className="font-serif text-xs text-[#162040]/75 mt-2 font-semibold">
                  {FLORERIA_BY_CATEGORY[key].length} producto{FLORERIA_BY_CATEGORY[key].length !== 1 ? 's' : ''} →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Floral */}
      <section id="floral" className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <IconFromEmoji emoji={categoryConfig.floral.icon} className="w-8 h-8 text-[#162040]/30" />
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75">Categoría</p>
              <h2 className="text-2xl font-serif font-bold text-[#162040]">Floral</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLORERIA_BY_CATEGORY.floral.map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Globos */}
      <section id="globos" className="py-12 px-4 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <IconFromEmoji emoji={categoryConfig.globos.icon} className="w-8 h-8 text-[#162040]/30" />
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75">Categoría</p>
              <h2 className="text-2xl font-serif font-bold text-[#162040]">Globos</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FLORERIA_BY_CATEGORY.globos.map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Decoración */}
      <section id="decoracion" className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <IconFromEmoji emoji={categoryConfig.decoracion.icon} className="w-8 h-8 text-[#162040]/30" />
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75">Categoría</p>
              <h2 className="text-2xl font-serif font-bold text-[#162040]">Decoración</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLORERIA_BY_CATEGORY.decoracion.map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">¿Listo para diseñar tu decoración?</h2>
          <p className="text-white/70 font-serif mb-8">
            Cotización personalizada en menos de 24 horas. Instalación profesional incluida.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar mi decoración
          </a>
        </div>
      </section>

    </div>
  );
}

function ProductCard({ product }: { product: FloreriaProduct }) {
  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar ${product.name} para mi evento.`);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300">
      <Link href={`/floreria/${product.slug}`}>
        <div className="h-48 overflow-hidden bg-[#f5efe8] flex items-center justify-center">
          {product.img ? (
            <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <IconFromEmoji
              emoji={categoryConfig[product.category].icon}
              className="w-16 h-16 text-[#162040]/20"
            />
          )}
        </div>
      </Link>
      <div className="p-5">
        <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75 mb-1">{product.categoryLabel}</p>
        <h3 className="font-serif font-bold text-[#162040] text-base mb-1">{product.name}</h3>
        <p className="font-serif text-gray-600 text-xs mb-3 italic">{product.tagline}</p>
        <p className="font-serif text-gray-600 text-xs mb-4 leading-relaxed line-clamp-2">{product.short}</p>
        <div className="flex gap-2">
          <Link href={`/floreria/${product.slug}`}
            className="flex-1 text-center text-xs font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2 rounded-lg hover:bg-[#f5efe8] transition-colors">
            Ver detalle
          </Link>
          <a href={waMsg} target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-serif font-semibold text-white bg-[#0d6849] hover:bg-[#0a5740] py-2 rounded-lg transition-colors">
            Cotizar
          </a>
        </div>
      </div>
    </div>
  );
}
