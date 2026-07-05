import CityLink from "../components/CityLink";
const Link = CityLink;
import { VAJILLAS, VajillaCat } from "../data/vajillas-products";
import { useCity } from "../context/CityContext";

const WA_BASE = "https://wa.me/5215540080373?text=";
const waGeneral = WA_BASE + encodeURIComponent("Hola, me interesa cotizar vajillas para mi evento. ¿Me pueden dar información?");

const CATEGORIES: { key: VajillaCat; label: string; desc: string }[] = [
  { key: 'lozas',       label: 'Lozas',                  desc: 'Porcelana y vidrio clásico' },
  { key: 'ceramica',    label: 'Cerámicas',               desc: 'Artesanales y semi matte' },
  { key: 'mauve',       label: 'Línea Mauve',             desc: 'Colores artesanales exclusivos' },
  { key: 'rustica',     label: 'Colecciones Rústicas',    desc: 'Peltre, barro y piedra' },
  { key: 'especial',    label: 'Colecciones Especiales',  desc: 'Gold, melamina y más' },
  { key: 'platos-base', label: 'Platos Base',             desc: 'Decorativos y charger plates' },
  { key: 'cubiertos',   label: 'Cubiertos',               desc: 'Allegro, Emilio, Gold y más' },
  { key: 'cristaleria', label: 'Cristalería',             desc: 'Copas, vasos y cristal de servicio' },
];

export default function VajillasPage() {
  const { city } = useCity();
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-[#8a9bb5] mb-6 font-serif">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/80">Vajillas y Estilo</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
            Vajillas y Estilo{city ? ` en ${city.name}` : ''}
          </h1>
          <p className="text-white/70 font-serif text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Más de 40 colecciones de vajilla, cubiertos y cristalería para hacer de tu mesa un elemento central de tu celebración.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-gray-600">
          <span><strong className="text-[#162040]">+40</strong> colecciones disponibles</span>
          <span>•</span>
          <span><strong className="text-[#162040]">8</strong> categorías de producto</span>
          <span>•</span>
          <span>Entrega e instalación incluida</span>
          <span>•</span>
          <span>Sin mínimo de piezas</span>
        </div>
      </div>

      {/* Category quick-nav */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#162040] mb-6 text-center">Explora por categoría</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map(cat => (
              <a key={cat.key} href={`#${cat.key}`}
                className="flex flex-col items-center text-center p-3 rounded-xl border border-[#162040]/10 hover:border-[#162040]/30 hover:bg-[#f5efe8] transition-all group cursor-pointer">
                <span className="text-xs font-serif font-bold text-[#162040] group-hover:text-[#162040] leading-snug">{cat.label}</span>
                <span className="text-[10px] font-serif text-gray-600 mt-0.5">{cat.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products by category */}
      {CATEGORIES.map(cat => {
        const products = VAJILLAS.filter(v => v.cat === cat.key);
        if (products.length === 0) return null;
        return (
          <section key={cat.key} id={cat.key} className="py-12 px-4 border-t border-gray-100 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75 mb-1">Categoría</p>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#162040]">{cat.label}</h2>
                  <p className="text-gray-600 font-serif text-sm mt-1">{cat.desc}</p>
                </div>
                <a href={waGeneral} target="_blank" rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 text-sm font-serif text-[#0d6849] hover:underline">
                  Cotizar {cat.label}
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <div key={product.slug}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/20 hover:shadow-xl transition-all duration-300">
                    <Link href={`/vajillas/${product.slug}`}>
                      <div className="h-48 overflow-hidden bg-gray-100">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-5">
                      <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75 mb-1 block">
                        {product.catLabel}
                      </span>
                      <h3 className="font-serif font-bold text-[#162040] text-base mb-1 leading-snug">{product.name}</h3>
                      <p className="text-gray-600 font-serif text-xs mb-3 leading-relaxed line-clamp-2">{product.short}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.piezas.slice(0, 3).map(p => (
                          <span key={p} className="text-[10px] font-serif bg-[#f5efe8] text-gray-700 px-2 py-0.5 rounded-full">{p}</span>
                        ))}
                        {product.piezas.length > 3 && (
                          <span className="text-[10px] font-serif bg-[#f5efe8] text-gray-700 px-2 py-0.5 rounded-full">+{product.piezas.length - 3} más</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/vajillas/${product.slug}`}
                          className="flex-1 text-center text-xs font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2 rounded-lg hover:bg-[#f5efe8] transition-colors">
                          Ver detalle
                        </Link>
                        <a href={WA_BASE + encodeURIComponent(`Hola, me interesa cotizar: ${product.name} para mi evento.`)}
                          target="_blank" rel="noopener noreferrer"
                          className="flex-1 text-center text-xs font-serif font-semibold text-white bg-[#0d6849] hover:bg-[#0a5740] py-2 rounded-lg transition-colors">
                          Cotizar
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA final */}
      <section className="bg-[#162040] py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">¿Lista tu mesa ideal?</h2>
          <p className="text-white/70 font-serif mb-8">
            Cotiza tu vajilla completa con nosotros. Asesoría personalizada, amplio inventario y entrega en todo México.
          </p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Cotizar vajilla completa
          </a>
        </div>
      </section>

    </div>
  );
}
