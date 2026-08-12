import { Phone, CheckCircle2 } from "lucide-react";
import CityLink from "../components/CityLink";
const Link = CityLink;
import Breadcrumbs from "../components/Breadcrumbs";
import HighlightKeywords from "../components/HighlightKeywords";
import OptimizedImage from "../components/OptimizedImage";
import ProductGalleryCarousel from "../components/ProductGalleryCarousel";
import SeoRelatedLinks from "../components/SeoRelatedLinks";
import { useCityHubPage } from "../hooks/useCityHubPage";
import {
  getBanquetMenu,
  getMenusForParent,
  getBanquetParent,
} from "../data/banquetes-menus";
import { isCityLandingSlug } from "../utils/city-url";
import { toSpanishTitleCase, buildHighlightKeywords } from "../utils/spanish-title-case";
import ServicePage from "./ServicePage";

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
  const resolvedMenuSlug = menuSlug ?? "";
  const isCityAsMenu = Boolean(resolvedMenuSlug && isCityLandingSlug(resolvedMenuSlug));
  const menu = !isCityAsMenu ? getBanquetMenu(parentSlug, resolvedMenuSlug) : null;
  const parent = getBanquetParent(parentSlug);
  const siblings = parent ? getMenusForParent(parentSlug) : [];
  const hubSlug =
    !isCityAsMenu && resolvedMenuSlug ? `${parentSlug}/${resolvedMenuSlug}` : parentSlug;

  const menuKeywordExtras = [
    menu?.name || "",
    menu?.label || "",
    parent?.name || "",
    parent?.shortName || "",
    "4 Tiempos",
    "3 Tiempos",
    "2 Tiempos",
    "Buffet",
    "Menú por tiempos",
    "Banquete formal",
    "Meseros",
    "Vajilla",
    "Sopa",
    "Entrada",
    "Plato fuerte",
    "Postre",
    "Chef",
    "Cotización",
  ].filter(Boolean);

  const { city, cityCopy, displayH1, displayHeadline, displaySectionTitle, keywords } =
    useCityHubPage(hubSlug, menu?.name || parent?.name || "Banquete", menuKeywordExtras);

  // National pages still need bold keywords even without cityCopy
  const kw =
    keywords.length > 0
      ? keywords
      : buildHighlightKeywords({
          primaryKeyword: menu?.name || "",
          zones: [],
          cityName: city?.name || "",
          cityShort: city?.short || "",
          extra: menuKeywordExtras,
        });

  if (isCityAsMenu) {
    return <ServicePage params={{ slug: parentSlug }} />;
  }

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
  const heroAlt = city
    ? `${menu.name} para eventos en ${city.name}`
    : `${menu.name} para bodas y eventos`;
  const headline =
    displayHeadline ||
    toSpanishTitleCase(menu.headline);
  const sectionTitle =
    displaySectionTitle ||
    toSpanishTitleCase(
      city
        ? `${menu.name} para Bodas y Eventos en ${city.name}`
        : `${menu.name} para Bodas y Eventos`,
    );

  const bodyParas = cityCopy?.description?.length
    ? cityCopy.description
    : [
        ...menu.description,
        `Duración estimada del servicio: ${menu.duration}. Ideal para ${(menu.idealPara || []).join(", ") || "bodas, XV años y eventos sociales"}.`,
        `En Bodasesor diseñamos cada ${menu.label.toLowerCase()} con chef, meseros, vajilla y montaje para que tu banquete se sienta completo de principio a fin.`,
      ];

  const crumbItems = [
    { name: "Inicio", href: "/" },
    { name: "Banquetes y Catering", href: "/banquetes-catering" },
    { name: parent.name, href: parent.href },
    {
      name: city ? `${menu.label} en ${city.short || city.name}` : menu.label,
    },
  ];
  const faqs = cityCopy?.faqs?.length
    ? cityCopy.faqs
    : [
        {
          q: `¿Qué incluye el ${menu.name}?`,
          a: `Incluye servicio a la mesa o estaciones según el formato, chef, meseros, vajilla y montaje. Personalizamos el menú ${menu.label.toLowerCase()} según invitados y estilo del evento.`,
        },
        {
          q: `¿Puedo cambiar platillos del menú de ejemplo?`,
          a: `Sí. El menú de ejemplo es referencial: adaptamos sopa, entrada, plato fuerte, postre o estaciones buffet a tu gusto y restricciones alimenticias.`,
        },
        {
          q: `¿Cuánto tarda la cotización?`,
          a: `Te enviamos una propuesta por WhatsApp en menos de 24 horas con opciones de servicio básico, tradicional o premium.`,
        },
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero — mismo patrón que ServicePage */}
      <section className="relative overflow-hidden bg-[#162040]" style={{ minHeight: "280px" }}>
        <OptimizedImage
          src={menu.parentImg}
          alt={heroAlt}
          width={1200}
          height={675}
          priority
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[#162040]/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-14">
          <Breadcrumbs items={crumbItems} variant="dark" className="mb-5" />
          <p className="text-white/70 text-xs font-serif mb-3">{menu.duration}</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4 text-white">
            {displayH1}
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-serif mb-4 leading-relaxed max-w-2xl">
            <HighlightKeywords text={headline} keywords={kw} className="font-bold text-white" />
          </p>
          {cityCopy?.zones?.length ? (
            <p className="text-white/65 font-serif text-sm mb-8">
              Cobertura en {city?.name}:{" "}
              <HighlightKeywords
                text={cityCopy.zones.join(" · ")}
                keywords={kw}
                className="font-bold text-white"
              />
            </p>
          ) : city ? (
            <p className="text-white/65 font-serif text-sm mb-8">
              Servicio disponible en{" "}
              <strong className="font-bold text-white">{city.name}</strong> y área metropolitana
            </p>
          ) : (
            <p className="text-white/65 font-serif text-sm mb-8">
              Servicio a nivel nacional · CDMX · Estado de México · Guadalajara · Monterrey · León y más
            </p>
          )}
          <div className="flex flex-wrap gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-6 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <WaSvg /> Cotizar por WhatsApp
            </a>
            <a
              href="tel:5215540080373"
              className="flex items-center gap-2 bg-[#162040] hover:bg-[#0f1830] border-2 border-white/30 text-white px-6 py-3 rounded-xl font-semibold font-serif transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Otros formatos — barra tipo “related” de ServicePage */}
      <section className="bg-[#162040] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-white/60 font-serif mr-2 shrink-0">
              {parent.shortName}:
            </span>
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`${parent.href}/${s.slug}`}
                className={`px-3 py-1.5 border rounded-full text-sm font-serif transition-all duration-300 hover:scale-105 ${
                  s.slug === menu.slug
                    ? "bg-[#0d6849] border-[#0d6849] text-white"
                    : "bg-white border-white text-[#162040] hover:bg-[#162040] hover:text-white"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Descripción + galería */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#162040] mb-6">{sectionTitle}</h2>
              <div className="space-y-4">
                {bodyParas.map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed font-serif text-lg">
                    <HighlightKeywords text={para} keywords={kw} />
                  </p>
                ))}
                {cityCopy?.localBullets?.length ? (
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 font-serif text-lg">
                    {cityCopy.localBullets.map((b) => (
                      <li key={b}>
                        <HighlightKeywords text={b} keywords={kw} />
                      </li>
                    ))}
                  </ul>
                ) : city ? (
                  <p className="text-gray-600 leading-relaxed font-serif text-lg">
                    Servicio disponible en{" "}
                    <strong className="font-bold text-[#162040]">{city.name}</strong> y área
                    metropolitana. Cotiza sin compromiso.
                  </p>
                ) : (
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 font-serif text-lg">
                    <li>
                      <HighlightKeywords
                        text="Chef, meseros, vajilla y montaje incluidos en el servicio."
                        keywords={kw}
                      />
                    </li>
                    <li>
                      <HighlightKeywords
                        text="Menú adaptable a restricciones alimenticias y estilo del evento."
                        keywords={kw}
                      />
                    </li>
                    <li>
                      <HighlightKeywords
                        text="Cotización personalizada por WhatsApp en menos de 24 horas."
                        keywords={kw}
                      />
                    </li>
                  </ul>
                )}
              </div>
              <div className="mt-8 p-4 bg-[#f5efe8]/60 rounded-xl border border-[#162040]/10">
                <p className="text-sm text-gray-600 font-serif italic">
                  <HighlightKeywords
                    text={
                      cityCopy?.seoDescription ||
                      (city
                        ? `${menu.seoDescription} Disponible en ${city.name}.`
                        : menu.seoDescription)
                    }
                    keywords={kw}
                  />
                </p>
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <ProductGalleryCarousel slug={parentSlug} title={menu.name} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA horizontal */}
      <section className="bg-[#162040] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                <WaSvg />
              </div>
              <div>
                <p className="font-bold font-serif text-white text-lg">¿Listo para cotizar?</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/60 font-serif mt-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Cotización sin compromiso
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Menú personalizable
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Garantía Bodasesor
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-center md:justify-end">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#162040] px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <WaSvg /> Cotizar por WhatsApp
              </a>
              <a
                href="tel:5215540080373"
                className="flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] hover:border-white transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                55 4008 0373
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              ¿Qué incluye nuestro servicio?
            </h2>
            <p className="text-gray-600 mt-3 font-serif">
              Todo lo necesario para un {menu.label.toLowerCase()} impecable
              {city ? ` en ${city.name}` : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menu.included.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#162040]/5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#162040]/8 flex items-center justify-center mb-3 text-[#162040] font-serif font-bold">
                  {i + 1}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-serif">
                  <HighlightKeywords text={item} keywords={kw} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menú de ejemplo */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              {toSpanishTitleCase(
                city
                  ? `Ejemplo de menú ${menu.label} en ${city.name}`
                  : `Ejemplo de menú ${menu.label}`,
              )}
            </h2>
            <p className="text-gray-600 mt-3 font-serif">
              Propuesta referencial
              {city ? (
                <>
                  {" "}
                  para eventos en <strong className="font-bold text-[#162040]">{city.name}</strong>
                </>
              ) : null}
              {" "}
              — adaptamos cada tiempo a tus gustos
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menu.menuExample.map((item, i) => {
              const [label, ...rest] = item.split(": ");
              const content = rest.join(": ");
              return (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-[#f5efe8]/60 rounded-xl border border-[#162040]/10 hover:bg-[#f5efe8] transition-colors"
                >
                  <div className="flex-shrink-0 w-7 h-7 bg-[#162040] text-white rounded-full flex items-center justify-center text-xs font-bold font-serif mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    {content ? (
                      <>
                        <span className="text-gray-700 text-xs font-bold uppercase tracking-wide font-serif">
                          <HighlightKeywords text={label} keywords={kw} />
                        </span>
                        <p className="text-[#162040] font-serif mt-0.5">
                          <HighlightKeywords text={content} keywords={kw} />
                        </p>
                      </>
                    ) : (
                      <p className="text-[#162040] font-serif">
                        <HighlightKeywords text={label} keywords={kw} />
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-600 text-sm font-serif mb-4">
              ¿Quieres un menú diferente? Diseñamos el tuyo desde cero.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-3 rounded-xl font-bold font-serif transition-colors"
            >
              <WaSvg /> Personalizar mi menú
            </a>
          </div>
        </div>
      </section>

      {/* Niveles de servicio */}
      <section className="py-16 bg-[#f5efe8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#162040]">
              Niveles de servicio
            </h2>
            <p className="text-gray-600 mt-2 font-serif">
              Elige el paquete que mejor se adapte a tu evento
              {city ? ` en ${city.name}` : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {menu.serviceTiers.map((tier, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 border bg-white ${
                  tier.popular
                    ? "border-[#162040] shadow-2xl scale-[1.02]"
                    : "border-[#162040]/15 shadow-sm"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#162040] text-white text-xs font-bold font-serif px-3 py-1 rounded-full">
                    Más Popular
                  </span>
                )}
                <h3 className="text-xl font-serif font-bold text-[#162040] mb-4 text-center">
                  {tier.name}
                </h3>
                <ul className="space-y-2">
                  {tier.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-serif text-gray-600">
                      <span className="text-[#162040]/75 mt-0.5">✓</span>
                      <HighlightKeywords text={item} keywords={kw} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white border-t border-[#162040]/10" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-serif font-bold text-[#162040] mb-2">
            Preguntas frecuentes
          </h2>
          <p className="text-gray-600 font-serif text-sm mb-8">
            Respuestas claras sobre {menu.name}
            {city ? ` en ${city.name}` : ""}.
          </p>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-[#162040]/10 bg-[#faf7f2] px-5 py-4"
              >
                <summary className="cursor-pointer font-serif font-bold text-[#162040] list-none flex items-start justify-between gap-3">
                  <span>
                    <HighlightKeywords text={f.q} keywords={kw} />
                  </span>
                  <span className="text-[#162040]/50 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-700 font-serif text-sm leading-relaxed">
                  <HighlightKeywords text={f.a} keywords={kw} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SeoRelatedLinks
        basePath={parent.href}
        title={menu.name}
        related={siblings.map((s) => ({
          name: s.label,
          href: `${parent.href}/${s.slug}`,
        }))}
      />

      {/* CTA final */}
      <section className="bg-[#162040] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
            ¿Listo para cotizar tu banquete?
          </h2>
          <p className="text-white/70 font-serif mb-6">
            Recibe una propuesta personalizada
            {city ? ` para ${city.name}` : ""} sin compromiso
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-3 rounded-xl font-bold font-serif transition-all hover:scale-105"
          >
            <WaSvg /> Cotizar {menu.label}
          </a>
        </div>
      </section>
    </div>
  );
}
