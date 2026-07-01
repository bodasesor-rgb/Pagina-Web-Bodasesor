import CityLink from "../components/CityLink";
const Link = CityLink;
import { useCity } from "../context/CityContext";
import { CARPAS, CarpaSlug } from "../data/carpas-products";

const WA_BASE = "https://wa.me/5215540080373?text=";

function WaSvg() {
  return (
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface Props { slug: string | undefined; }

export default function CarpaDetailPage({ slug }: Props) {
  const { city } = useCity();
  const carpa = CARPAS.find(c => c.slug === (slug as CarpaSlug));

  if (!carpa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5efe8]">
        <div className="text-center">
          <p className="text-2xl font-serif text-[#162040] mb-4">Carpa no encontrada</p>
          <Link href="/carpas" className="text-[#162040] underline font-serif">Ver todas las carpas</Link>
        </div>
      </div>
    );
  }

  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar una ${carpa.name} para mi evento${city ? ` en ${city.name}` : ''}. ¿Me pueden dar información?`);
  const idx = CARPAS.findIndex(c => c.slug === carpa.slug);
  const prev = idx > 0 ? CARPAS[idx - 1] : null;
  const next = idx < CARPAS.length - 1 ? CARPAS[idx + 1] : null;
  const others = CARPAS.filter(c => c.slug !== carpa.slug);

  const emoji =
    carpa.slug === 'domo' ? '🔵' :
    carpa.slug === 'arabe' ? '🕌' :
    carpa.slug === 'transparente' ? '💎' :
    carpa.slug === 'versalles' ? '👑' : '⛺';

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040]">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:py-0 grid lg:grid-cols-5 min-h-[460px] items-center">

          {/* Left: text */}
          <div className="lg:col-span-2 py-10 lg:py-14 lg:pr-8">
            <nav className="flex items-center gap-2 text-xs text-[#8a9bb5] mb-6 font-serif flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/carpas" className="hover:text-white transition-colors">Carpas para Eventos</Link>
              <span>/</span>
              <span className="text-white/80">{carpa.name}</span>
            </nav>

            <span className="bg-white/10 text-white/70 text-xs font-serif px-3 py-1 rounded-full mb-4 inline-block">
              Carpas para Eventos
            </span>

            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-2 mt-3">
              {carpa.name}{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/60 font-serif text-sm italic mb-4">{carpa.tagline}</p>
            <p className="text-white/80 font-serif leading-relaxed mb-3 text-base">{carpa.short}</p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a href={waMsg} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
                <WaSvg />
                Cotizar esta carpa
              </a>
              <Link href="/carpas"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-serif transition-colors">
                Ver todas las carpas
              </Link>
            </div>
          </div>

          {/* Right: visual */}
          <div className="hidden lg:block lg:col-span-3 h-full min-h-[460px] overflow-hidden">
            <img src={carpa.img} alt={carpa.name} className="w-full h-full object-cover opacity-90" />
          </div>
        </div>
      </section>

      {/* Prev / Next nav */}
      {(prev || next) && (
        <div className="bg-[#0d1630] text-white/60 text-xs font-serif py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {prev
              ? <Link href={`/carpas/${prev.slug}`} className="hover:text-white transition-colors flex items-center gap-1">← {prev.name}</Link>
              : <span />}
            {next
              ? <Link href={`/carpas/${next.slug}`} className="hover:text-white transition-colors flex items-center gap-1">{next.name} →</Link>
              : <span />}
          </div>
        </div>
      )}

      {/* Details */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-10">

          {/* Left: description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#162040] mb-4">Descripción</h2>
              <p className="text-gray-600 font-serif leading-relaxed">{carpa.desc}</p>
            </div>

            {/* Incluye */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#162040] mb-3">¿Qué incluye?</h3>
              <ul className="space-y-2">
                {(carpa.incluye ?? []).map(item => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 font-serif text-sm">
                    <span className="text-[#162040] font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal para */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#162040] mb-3">Ideal para</h3>
              <div className="flex flex-wrap gap-2">
                {(carpa.idealPara ?? []).map(t => (
                  <span key={t} className="bg-[#f5efe8] border border-[#162040]/10 text-[#162040] text-sm font-serif px-3 py-1.5 rounded-xl">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Colores */}
            <div>
              <h3 className="text-lg font-serif font-bold text-[#162040] mb-3">Colores y acabados disponibles</h3>
              <div className="flex flex-wrap gap-2">
                {(carpa.colores ?? []).map(c => (
                  <span key={c} className="bg-white border border-gray-200 text-gray-700 text-sm font-serif px-3 py-1.5 rounded-xl shadow-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: CTA card */}
          <div>
            <div className="bg-[#f5efe8] rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-serif font-bold text-[#162040] mb-2">
                ¿Te interesa esta carpa?
              </h3>
              {city && (
                <p className="text-sm text-[#162040]/70 font-serif mb-4">
                  Servicio disponible en <strong>{city.name}</strong>
                </p>
              )}
              <p className="text-gray-600 font-serif text-sm mb-6">
                Dinos el tamaño de tu espacio y la fecha de tu evento y te enviamos una cotización sin compromiso.
              </p>
              <a href={waMsg} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white py-3 px-6 rounded-xl font-bold font-serif transition-colors mb-3">
                <WaSvg />
                Cotizar por WhatsApp
              </a>
              <Link href="/carpas"
                className="w-full flex items-center justify-center text-[#162040] text-sm font-serif hover:underline">
                Ver todos los estilos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Otros estilos */}
      {others.length > 0 && (
        <section className="py-12 bg-[#f5efe8]/50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-[#162040] mb-8">Otros estilos de carpa</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {others.map(o => (
                <Link key={o.slug} href={`/carpas/${o.slug}`}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-0.5 block">
                  <p className="font-serif font-bold text-[#162040] text-sm mb-1">{o.name}</p>
                  <p className="text-gray-600 font-serif text-xs leading-snug">{o.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
