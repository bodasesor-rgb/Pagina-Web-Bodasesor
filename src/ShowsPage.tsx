import { Link } from "wouter";
import { SHOWS, SHOWS_BY_CATEGORY } from "@/data/shows-products";
import type { ShowsProduct } from "@/data/shows-products";
import { useCity } from "@/context/CityContext";

const WA_BASE = "https://wa.me/5215540080373?text=";
const waGeneral = WA_BASE + encodeURIComponent("Hola, me interesa cotizar un show de entretenimiento para mi evento. ¿Me pueden dar información?");

const categoryConfig = {
  percusion: { label: 'Percusión', icon: '◎', desc: 'Batucada, tambores LED y tambores con agua.' },
  danza: { label: 'Show y Danza', icon: '✦', desc: 'Robot Magic, bailarinas, Krystal Dance, Las Vegas, Regional Mexicano y Alas de Isis.' },
  tecnologia: { label: 'Tecnología y Luz', icon: '⬡', desc: 'Laser Man, Illuminates Pixel, Hologram y Fuego.' },
  circo: { label: 'Circo', icon: '◈', desc: 'Pulsadas, Cyr Wheel, Mástil, Hula Hula, Malabares, Contorsión, Telas, Aro, Pole Dance y Clown. ~6 min por acto.' },
};

export default function ShowsPage() {
  const { city } = useCity();
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="flex items-center gap-2 text-xs text-white/50 mb-6 font-serif">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-white/80">Shows</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              Shows y Entretenimiento{city ? ` en ${city.name}` : ''}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              El espectáculo que hace que tu evento sea irrepetible. Percusión, danza, circo y tecnología — todo bajo un mismo catálogo.
            </p>
            <p className="text-white/50 font-serif text-sm mb-8">
              28 shows disponibles. Percusión, danza, tecnología, circo, Blue Man, estatuas vivientes y más — cada acto diseñado para crear el momento que todos recordarán.
            </p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Cotizar mi show
            </a>
          </div>
          <div className="hidden lg:grid grid-cols-3 gap-3 h-64">
            {SHOWS.slice(0, 3).map(p => (
              <div key={p.slug} className="rounded-2xl overflow-hidden bg-[#0d1630]">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-[#162040]/70">
          <span><strong className="text-[#162040]">13</strong> shows disponibles</span>
          <span>•</span>
          <span>Percusión, danza y tecnología</span>
          <span>•</span>
          <span>Shows en vivo certificados</span>
          <span>•</span>
          <span>Cotización personalizada</span>
        </div>
      </div>

      {/* SEO Description */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          <p>
            Nuestro catálogo de <strong>shows y entretenimiento para eventos</strong> en México es el más completo del mercado. Contamos con <strong>batucada brasileña</strong>, <strong>tambores LED</strong>, <strong>Laser Man</strong>, <strong>robot de luz</strong>, <strong>show de fuego</strong> y <strong>bailarinas de Las Vegas</strong>. Cada acto está diseñado para crear un momento inolvidable en tu boda, quinceañera, fiesta o evento corporativo.
          </p>
          <p>
            En la categoría de circo ofrecemos <strong>acrobacias en telas aéreas</strong>, <strong>aro aéreo</strong>, <strong>Cyr Wheel</strong>, <strong>contorsionistas</strong>, <strong>malabares</strong>, <strong>hula hula</strong>, <strong>mástil chino</strong> y <strong>pole dance artístico</strong>. Cada número dura aproximadamente 6 minutos y puede combinarse con otros actos para crear un espectáculo a medida.
          </p>
          <p>
            También disponemos de <strong>shows de tecnología e iluminación</strong>: <strong>Illuminates Pixel</strong>, <strong>hologramas</strong>, <strong>danza regional mexicana</strong> y <strong>Krystal Dance</strong>. Contratamos artistas profesionales con experiencia en grandes eventos, incluyendo transmisiones en vivo. Solicita tu cotización personalizada y elige los shows que mejor se adapten a tu celebración.
          </p>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.entries(categoryConfig) as [keyof typeof categoryConfig, typeof categoryConfig[keyof typeof categoryConfig]][]).map(([key, cfg]) => (
              <a key={key} href={`#${key}`}
                className="bg-[#f5efe8] rounded-2xl p-5 hover:shadow-md transition-all border border-[#162040]/5 hover:border-[#162040]/20">
                <p className="font-serif text-2xl text-[#162040]/30 mb-2">{cfg.icon}</p>
                <p className="font-serif font-bold text-[#162040] mb-1">{cfg.label}</p>
                <p className="font-serif text-xs text-gray-500">{cfg.desc}</p>
                <p className="font-serif text-xs text-[#162040]/50 mt-2 font-semibold">
                  {SHOWS_BY_CATEGORY[key].length} show{SHOWS_BY_CATEGORY[key].length !== 1 ? 's' : ''} →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Percusión */}
      <section id="percusion" className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl text-[#162040]/30 font-serif">◎</span>
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40">Categoría</p>
              <h2 className="text-2xl font-serif font-bold text-[#162040]">Percusión</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {SHOWS_BY_CATEGORY.percusion.map(p => <ShowCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Show y Danza */}
      <section id="danza" className="py-12 px-4 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl text-[#162040]/30 font-serif">✦</span>
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40">Categoría</p>
              <h2 className="text-2xl font-serif font-bold text-[#162040]">Show y Danza</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWS_BY_CATEGORY.danza.map(p => <ShowCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Tecnología y Luz */}
      <section id="tecnologia" className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl text-[#162040]/30 font-serif">⬡</span>
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40">Categoría</p>
              <h2 className="text-2xl font-serif font-bold text-[#162040]">Tecnología y Luz</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOWS_BY_CATEGORY.tecnologia.map(p => <ShowCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Circo */}
      <section id="circo" className="py-12 px-4 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl text-[#162040]/30 font-serif">◈</span>
            <div>
              <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40">Categoría</p>
              <h2 className="text-2xl font-serif font-bold text-[#162040]">Circo</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SHOWS_BY_CATEGORY.circo.map(p => <ShowCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">¿Cuál show es para tu evento?</h2>
          <p className="text-white/70 font-serif mb-8">
            Cotización personalizada en menos de 24 horas. También podemos combinar varios shows.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar shows para mi evento
          </a>
        </div>
      </section>

    </div>
  );
}

function ShowCard({ product }: { product: ShowsProduct }) {
  const waMsg = WA_BASE + encodeURIComponent(`Hola, me interesa cotizar el show "${product.name}" para mi evento.`);
  const icon = product.category === 'percusion' ? '◎' : product.category === 'danza' ? '✦' : product.category === 'circo' ? '◈' : '⬡';
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300">
      <Link href={`/shows/${product.slug}`}>
        <div className="h-48 overflow-hidden bg-[#0d1630] flex items-center justify-center">
          {product.img ? (
            <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <span className="text-white/10 font-serif text-5xl">{icon}</span>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/40">{product.categoryLabel}</p>
          <p className="text-[10px] font-serif text-[#162040]/30">{product.duracion}</p>
        </div>
        <h3 className="font-serif font-bold text-[#162040] text-base mb-1">{product.name}</h3>
        <p className="font-serif text-gray-500 text-xs mb-3 italic">{product.tagline}</p>
        <p className="font-serif text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2">{product.short}</p>
        <div className="flex gap-2">
          <Link href={`/shows/${product.slug}`}
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
