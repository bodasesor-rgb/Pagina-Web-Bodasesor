import { Link } from "wouter";
import { useCity } from "../context/CityContext";
import { COLGANTES } from "../data/colgantes-products";

const WA_BASE = "https://wa.me/5215540080373?text=";

interface Props { slug: string | undefined; }

function WaSvg() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function ColganteDetailPage({ slug }: Props) {
  const { city } = useCity();
  const product = COLGANTES.find(c => c.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5efe8]">
        <div className="text-center">
          <p className="text-2xl font-serif text-[#162040] mb-4">Diseño no encontrado</p>
          <Link href="/colgantes" className="text-[#162040] underline font-serif">Ver todos los colgantes</Link>
        </div>
      </div>
    );
  }

  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar el colgante: ${product.name} para mi evento.`);
  const idx = COLGANTES.findIndex(c => c.slug === product.slug);
  const prev = idx > 0 ? COLGANTES[idx - 1] : null;
  const next = idx < COLGANTES.length - 1 ? COLGANTES[idx + 1] : null;

  const sameCat = COLGANTES.filter(c => c.cat === product.cat && c.slug !== product.slug);
  const others = COLGANTES.filter(c => c.cat !== product.cat).slice(0, 6);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero split */}
      <section className="bg-[#162040]">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:py-0 grid lg:grid-cols-5 min-h-[460px] items-center">

          {/* Left: text */}
          <div className="lg:col-span-2 py-10 lg:py-14 lg:pr-8">
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6 font-serif flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/colgantes" className="hover:text-white transition-colors">Colgantes Premium</Link>
              <span>/</span>
              <span className="text-white/80">{product.catLabel}</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-white/10 text-white/70 text-xs font-serif px-3 py-1 rounded-full">
                {product.catLabel}
              </span>
              <span className="bg-white/10 text-white/70 text-xs font-serif px-3 py-1 rounded-full">
                {product.dimensiones}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-4">
              {product.name}{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/80 font-serif leading-relaxed mb-3 text-lg">
              {product.short}
            </p>
            <p className="text-white/60 font-serif leading-relaxed mb-6 text-sm">
              {product.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <span key={tag} className="bg-white/10 text-white/70 text-xs font-serif px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <a href={waMsg} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <a href="tel:5215540080373"
                className="flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300">
                Llamar
              </a>
            </div>

            <Link href="/colgantes" className="text-white/40 hover:text-white/70 font-serif text-xs flex items-center gap-1.5 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Ver catálogo completo
            </Link>
          </div>

          {/* Right: image */}
          <div className="lg:col-span-3 flex items-center justify-center py-8 lg:py-10">
            <div className="w-full max-w-xl h-[320px] lg:h-[440px] rounded-2xl overflow-hidden bg-[#0d1630]">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Elementos de la instalación */}
      <section className="py-12 px-4 bg-[#f5efe8]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-serif font-bold text-[#162040] mb-5">Elementos de la instalación</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {product.elementos.map(el => (
              <div key={el}
                className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[#162040]/8">
                <svg className="w-4 h-4 text-[#162040]/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-serif text-sm text-[#162040]">{el}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-serif text-[#162040]/50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Dimensiones: {product.dimensiones}
          </div>
        </div>
      </section>

      {/* Catalog CTA banner */}
      <section className="py-8 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f5efe8] rounded-2xl px-6 py-5">
          <div>
            <p className="font-serif font-bold text-[#162040]">¿Quieres ver todos los diseños?</p>
            <p className="font-serif text-sm text-gray-500">Explora el catálogo completo de colgantes premium</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/colgantes"
              className="flex items-center gap-2 bg-[#162040] hover:bg-[#1a2a52] text-white px-5 py-2.5 rounded-xl font-semibold font-serif text-sm transition-all hover:scale-105">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-8 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          {prev ? (
            <Link href={`/colgantes/${prev.slug}`}
              className="flex items-center gap-2 text-sm font-serif text-[#162040] hover:underline max-w-[45%]">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="truncate">{prev.name}</span>
            </Link>
          ) : <div />}
          <Link href="/colgantes"
            className="text-xs font-serif font-semibold text-[#162040]/50 hover:text-[#162040] uppercase tracking-wide whitespace-nowrap">
            Ver catálogo
          </Link>
          {next ? (
            <Link href={`/colgantes/${next.slug}`}
              className="flex items-center gap-2 text-sm font-serif text-[#162040] hover:underline max-w-[45%] text-right">
              <span className="truncate">{next.name}</span>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* Same category */}
      {sameCat.length > 0 && (
        <section className="py-10 px-4 bg-[#f5efe8]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-[#162040] mb-5">
              Más {product.catLabel}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sameCat.map(c => (
                <Link key={c.slug} href={`/colgantes/${c.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-md transition-all">
                  <div className="h-28 overflow-hidden bg-gray-100">
                    <img src={c.img} alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-serif font-semibold text-[#162040] leading-snug">{c.name}</p>
                    <p className="text-[10px] font-serif text-gray-400 mt-0.5">{c.dimensiones}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other categories */}
      {others.length > 0 && (
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-serif font-bold text-[#162040] mb-5">También te puede interesar</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {others.map(c => (
                <Link key={c.slug} href={`/colgantes/${c.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-md transition-all">
                  <div className="h-20 overflow-hidden bg-gray-100">
                    <img src={c.img} alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-serif font-semibold text-[#162040] leading-snug">{c.name}</p>
                    <p className="text-[10px] font-serif text-gray-400 mt-0.5">{c.catLabel}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#162040] py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-3">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="text-white/70 font-serif mb-6">
            Cotiza tu {product.name} con nosotros. Instalación incluida, diseño a tu medida.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waMsg} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <WaSvg /> Cotizar este diseño
            </a>
            <Link href="/colgantes"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
