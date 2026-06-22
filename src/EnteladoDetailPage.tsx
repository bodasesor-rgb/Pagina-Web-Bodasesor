import { Link } from "wouter";
import { useCity } from "@/context/CityContext";
import { ENTELADOS, EnteladoSlug } from "@/data/entelados-products";

const WA_BASE = "https://wa.me/5215540080373?text=";

function WaSvg() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface Props { slug: string | undefined; }

export default function EnteladoDetailPage({ slug }: Props) {
  const { city } = useCity();
  const estilo = ENTELADOS.find(e => e.slug === (slug as EnteladoSlug));

  if (!estilo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5efe8]">
        <div className="text-center">
          <p className="text-2xl font-serif text-[#162040] mb-4">Estilo no encontrado</p>
          <Link href="/entelados" className="text-[#162040] underline font-serif">Ver todos los entelados</Link>
        </div>
      </div>
    );
  }

  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar un ${estilo.name} para mi evento.`);
  const idx = ENTELADOS.findIndex(e => e.slug === estilo.slug);
  const prev = idx > 0 ? ENTELADOS[idx - 1] : null;
  const next = idx < ENTELADOS.length - 1 ? ENTELADOS[idx + 1] : null;
  const others = ENTELADOS.filter(e => e.slug !== estilo.slug);

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
              <Link href="/entelados" className="hover:text-white transition-colors">Entelados para Techo</Link>
              <span>/</span>
              <span className="text-white/80">{estilo.name}</span>
            </nav>

            <span className="bg-white/10 text-white/70 text-xs font-serif px-3 py-1 rounded-full mb-4 inline-block">
              Entelados para Techo
            </span>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-2 mt-3">
              {estilo.name}{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/60 font-serif text-sm italic mb-4">{estilo.tagline}</p>
            <p className="text-white/80 font-serif leading-relaxed mb-3 text-base">
              {estilo.short}
            </p>
            <p className="text-white/60 font-serif leading-relaxed mb-6 text-sm">
              {estilo.desc}
            </p>

            {/* Ideal para */}
            <div className="flex flex-wrap gap-2 mb-8">
              {estilo.idealPara.map(tag => (
                <span key={tag} className="bg-white/10 text-white/70 text-xs font-serif px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={waMsg} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <a href="tel:5215540080373"
                className="flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300">
                Llamar
              </a>
            </div>
          </div>

          {/* Right: image grid */}
          <div className="lg:col-span-3 flex items-center justify-center py-8 lg:py-10">
            {estilo.imgPages.length === 1 ? (
              <div className="w-full max-w-xl h-[320px] lg:h-[440px] rounded-2xl overflow-hidden bg-[#0d1630]">
                <img src={estilo.img} alt={estilo.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className={`w-full grid gap-2 ${estilo.imgPages.length >= 4 ? 'grid-cols-2' : 'grid-cols-2'} h-[320px] lg:h-[440px]`}>
                {estilo.imgPages.slice(0, 4).map((src, i) => (
                  <div key={i} className="rounded-xl overflow-hidden bg-[#0d1630]">
                    <img src={src} alt={`${estilo.name} ${i + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Incluye + Colores */}
      <section className="py-12 px-4 bg-[#f5efe8]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#162040] mb-4">Incluye</h2>
            <div className="space-y-2">
              {estilo.incluye.map(item => (
                <div key={item} className="flex items-start gap-2 bg-white rounded-xl px-4 py-3 border border-[#162040]/8">
                  <svg className="w-4 h-4 text-[#162040]/50 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-serif text-sm text-[#162040]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-[#162040] mb-4">Colores disponibles</h2>
            <div className="space-y-2">
              {estilo.colores.map(c => (
                <div key={c} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-[#162040]/8">
                  <span className="w-3 h-3 rounded-full bg-[#f5efe8] border border-[#162040]/20 flex-shrink-0" />
                  <span className="font-serif text-sm text-[#162040]">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ver catálogo banner */}
      <section className="py-8 px-4 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f5efe8] rounded-2xl px-6 py-5">
          <div>
            <p className="font-serif font-bold text-[#162040]">¿Quieres ver todos los estilos?</p>
            <p className="font-serif text-sm text-gray-500">Explora el catálogo completo de entelados para techo</p>
          </div>
          <Link href="/entelados"
            className="flex items-center gap-2 bg-[#162040] hover:bg-[#1a2a52] text-white px-5 py-2.5 rounded-xl font-semibold font-serif text-sm transition-all hover:scale-105">
            Ver catálogo completo
          </Link>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-8 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
          {prev ? (
            <Link href={`/entelados/${prev.slug}`}
              className="flex items-center gap-2 text-sm font-serif text-[#162040] hover:underline max-w-[45%]">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="truncate">{prev.name}</span>
            </Link>
          ) : <div />}
          <Link href="/entelados" className="text-xs font-serif font-semibold text-[#162040]/50 hover:text-[#162040] uppercase tracking-wide whitespace-nowrap">
            Ver catálogo
          </Link>
          {next ? (
            <Link href={`/entelados/${next.slug}`}
              className="flex items-center gap-2 text-sm font-serif text-[#162040] hover:underline max-w-[45%] text-right">
              <span className="truncate">{next.name}</span>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* Otros estilos */}
      <section className="py-10 px-4 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-serif font-bold text-[#162040] mb-5">Otros estilos de entelado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {others.map(e => (
              <Link key={e.slug} href={`/entelados/${e.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-md transition-all">
                <div className="h-36 overflow-hidden bg-gray-100">
                  <img src={e.img} alt={e.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <p className="font-serif font-bold text-[#162040] text-sm">{e.name}</p>
                  <p className="font-serif text-xs text-gray-400 mt-0.5">{e.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#162040] py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-3">¿Listo para transformar tu espacio?</h2>
          <p className="text-white/70 font-serif mb-6">
            Cotiza tu {estilo.name} con nosotros. Instalación profesional incluida.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waMsg} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <WaSvg /> Cotizar este estilo
            </a>
            <Link href="/entelados"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all duration-300">
              Ver todos los estilos
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
