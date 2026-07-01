import { useEffect } from "react";
import CityLink from "../components/CityLink";
const Link = CityLink;
import { useCity } from "../context/CityContext";
import {
  getBanquetMenu,
  getMenusForParent,
  getBanquetParent,
} from "../data/banquetes-menus";

const WHATSAPP = "5215540080373";
const WA = (title: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(`Hola, me interesa cotizar: ${title}`)}`;

function WaSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type Props = {
  parentSlug: string;
  menuSlug?: string;
};

export default function BanqueteMenuDetailPage({ parentSlug, menuSlug }: Props) {
  const { city } = useCity();
  const menu = getBanquetMenu(parentSlug, menuSlug ?? "");
  const parent = getBanquetParent(parentSlug);
  const siblings = getMenusForParent(parentSlug);

  useEffect(() => {
    if (menu) {
      document.title = city
        ? `${menu.seoTitle} ${city.short} | Bodasesor Eventos`
        : `${menu.seoTitle} | Bodasesor Eventos`;
    }
  }, [menu?.seoTitle, city]);

  if (!menu || !parent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5efe8] text-[#162040] px-4 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Menú no encontrado</h1>
        <Link href="/banquetes-catering" className="text-[#162040] underline font-serif">
          Ver banquetes y catering
        </Link>
      </div>
    );
  }

  const waUrl = WA(city ? `${menu.name} en ${city.name}` : menu.name);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#162040]">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:py-0 grid lg:grid-cols-5 min-h-[380px] items-center">
          <div className="lg:col-span-3 py-8 lg:py-14 lg:pr-8">
            <nav className="flex items-center gap-2 text-xs text-[#8a9bb5] mb-5 font-serif flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/banquetes-catering" className="hover:text-white transition-colors">Banquetes y Catering</Link>
              <span>/</span>
              <Link href={parent.href} className="hover:text-white transition-colors">{parent.name}</Link>
              <span>/</span>
              <span className="text-white/80">{menu.label}</span>
            </nav>
            <div className="inline-block bg-white/10 text-white/70 text-xs font-serif px-3 py-1 rounded-full mb-4">
              {menu.duration}
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight mb-3">
              {city ? `${menu.name} en ${city.name}` : menu.name}
            </h1>
            <p className="text-white/75 font-serif leading-relaxed mb-6">{menu.headline}</p>
            <div className="flex flex-wrap gap-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-6 py-3 rounded-xl font-bold font-serif transition-all hover:scale-105">
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <Link href={parent.href}
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all">
                Ver {parent.shortName}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-2 flex items-center justify-center py-8">
            <img src={menu.parentImg} alt={menu.name}
              className="max-h-[280px] w-full object-cover rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {menu.description.map((para, i) => (
            <p key={i} className="text-gray-600 font-serif text-lg leading-relaxed mb-4">{para}</p>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section className="py-14 px-4 bg-[#f5efe8]/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-[#162040]">Menú de ejemplo</h2>
            <p className="text-gray-600 mt-2 font-serif">Propuesta referencial — personalizamos cada menú a tu gusto</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menu.menuExample.map((item, i) => {
              const [label, ...rest] = item.split(": ");
              const content = rest.join(": ");
              return (
                <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-[#162040]/10 shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#162040] text-white rounded-full flex items-center justify-center text-sm font-bold font-serif">
                    {i + 1}
                  </div>
                  <div>
                    {content ? (
                      <>
                        <span className="text-[#162040]/60 text-xs font-bold uppercase tracking-wide font-serif">{label}</span>
                        <p className="text-[#162040] font-serif mt-0.5">{content}</p>
                      </>
                    ) : (
                      <p className="text-[#162040] font-serif">{label}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-3 rounded-xl font-bold font-serif transition-colors">
              <WaSvg /> Personalizar mi menú
            </a>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#162040] mb-6 text-center">¿Qué incluye?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {menu.included.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[#f5efe8]/50 rounded-xl border border-[#162040]/10">
                <span className="text-[#162040]/75 font-serif mt-0.5">◎</span>
                <p className="font-serif text-gray-600 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service tiers */}
      <section className="py-14 px-4 bg-[#f5efe8]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-[#162040]">Niveles de servicio</h2>
            <p className="text-gray-600 mt-2 font-serif">Elige el paquete que mejor se adapte a tu evento</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {menu.serviceTiers.map((tier, i) => (
              <div key={i}
                className={`relative rounded-2xl p-6 border bg-white ${
                  tier.popular ? "border-[#162040] shadow-2xl scale-[1.02]" : "border-[#162040]/15 shadow-sm"
                }`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#162040] text-white text-xs font-bold font-serif px-3 py-1 rounded-full">
                    Más Popular
                  </span>
                )}
                <h3 className="text-xl font-serif font-bold text-[#162040] mb-4 text-center">{tier.name}</h3>
                <ul className="space-y-2">
                  {tier.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-serif text-gray-600">
                      <span className="text-[#162040]/75 mt-0.5">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other formats */}
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#162040] mb-2 text-center">
            Otros formatos de {parent.shortName}
          </h2>
          <p className="text-gray-600 font-serif text-center mb-8">Explora todas las opciones de menú disponibles</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siblings.map((s) => (
              <Link key={s.slug}
                href={`${parent.href}/${s.slug}`}
                className={`group p-5 rounded-2xl border text-center transition-all ${
                  s.slug === menu.slug
                    ? "bg-[#162040] text-white border-[#162040]"
                    : "bg-white border-[#162040]/10 hover:border-[#162040]/30 hover:shadow-md"
                }`}>
                <div className={`text-2xl mb-2 ${s.slug === menu.slug ? "text-white" : "text-[#162040]"}`}>
                  {s.slug === "buffet" ? "🍽️" : s.slug === "4-tiempos" ? "4️⃣" : s.slug === "3-tiempos" ? "3️⃣" : "2️⃣"}
                </div>
                <h3 className={`font-serif font-bold text-sm ${s.slug === menu.slug ? "text-white" : "text-[#162040]"}`}>
                  {s.label}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#162040] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-3">¿Listo para cotizar tu banquete?</h2>
          <p className="text-white/70 font-serif mb-6">Recibe una propuesta personalizada sin compromiso</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-3 rounded-xl font-bold font-serif transition-all hover:scale-105">
            <WaSvg /> Cotizar {menu.label}
          </a>
        </div>
      </section>
    </div>
  );
}
