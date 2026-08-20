import CityLink from "../components/CityLink";
const Link = CityLink;
import OptimizedImage from "../components/OptimizedImage";
import HighlightKeywords from "../components/HighlightKeywords";
import ProductGalleryCarousel from "../components/ProductGalleryCarousel";
import { useCityHubPage } from "../hooks/useCityHubPage";

const WA = "https://wa.me/5215540080373?text=";
const waGeneral =
  WA +
  encodeURIComponent(
    "Hola, me interesa cotizar una mesa personalizada o decoración de alimentos para mi evento. ¿Me pueden dar información?",
  );

const DEFAULT_FAQS = [
  {
    q: "¿Qué incluye una mesa personalizada?",
    a: "Diseño acorde a tu temática, surtido de productos, montaje, decoración y desmontaje. Ajustamos colores, altura y cantidad según invitados.",
  },
  {
    q: "¿Puedo combinar varias mesas en el mismo evento?",
    a: "Sí. Es muy popular combinar mesa de dulces con mesa de quesos o cupcakes. Coordinamos el montaje para que se vea como una sola estación.",
  },
  {
    q: "¿Cuánto tiempo tarda la cotización?",
    a: "Te enviamos propuesta por WhatsApp en menos de 24 horas con opciones de tamaño y presupuesto.",
  },
];

const ITEMS = [
  {
    name: "Mesa de Dulces",
    href: "/mesa-dulces",
    tag: "Mesa candy bar decorada con dulces artesanales, paletas, chocolates y golosinas temáticas para cualquier evento",
    icon: "🍬",
    img: "/images/productos/mesa-dulces.png",
    highlight: "La más solicitada",
  },
  {
    name: "Mesa de Postres",
    href: "/mesa-postres",
    tag: "Mesa de postres gourmet con pasteles miniatura, macarons, cheesecakes y bocados dulces de autor",
    icon: "🎂",
    img: "/images/productos/mesa-postres.png",
    highlight: null as string | null,
  },
  {
    name: "Mesa de Quesos",
    href: "/mesa-quesos",
    tag: "Tabla de quesos y charcutería con quesos nacionales e importados, frutos, mermeladas y panes artesanales",
    icon: "🧀",
    img: "/images/productos/mesa-quesos.png",
    highlight: "Perfecta para bodas",
  },
  {
    name: "Cupcakes Gourmet",
    href: "/cupcakes-gourmet",
    tag: "Cupcakes decorados a mano con buttercream de colores personalizados según la temática de tu evento",
    icon: "🧁",
    img: "/images/productos/cupcakes-gourmet.png",
    highlight: null,
  },
  {
    name: "Carrito de Snacks",
    href: "/carrito-snacks",
    tag: "Carrito decorado con palomitas, chips, cacahuates y snacks para darle un toque diferente a tu celebración",
    icon: "🍿",
    img: "/images/productos/carrito-snacks.png",
    highlight: null,
  },
];

export default function MesasPersonalizadasPage() {
  const { city, cityCopy, displayH1, displayHeadline, displaySectionTitle, keywords } =
    useCityHubPage("mesas-personalizadas", "Mesas Personalizadas");
  const faqs = cityCopy?.faqs?.length ? cityCopy.faqs : DEFAULT_FAQS;

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#162040] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[#8a9bb5] mb-6 font-serif">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white/80">Mesas Personalizadas</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              {displayH1}
            </h1>
            <p className="text-white/70 font-serif text-lg mb-4">
              {displayHeadline ? (
                <HighlightKeywords
                  text={displayHeadline}
                  keywords={keywords}
                  className="font-bold text-white"
                />
              ) : (
                "Mesas candy bar, de postres gourmet, charcutería y más — decoradas a la perfección para complementar tu evento y deleitar a tus invitados."
              )}
            </p>
            <p className="text-[#8a9bb5] font-serif text-sm mb-8">
              {cityCopy?.zones?.length ? (
                <>
                  {city ? `Cobertura en ${city.name}:` : "Cobertura nacional:"}{" "}
                  <HighlightKeywords
                    text={cityCopy.zones.join(" · ")}
                    keywords={keywords}
                    className="font-bold text-white"
                  />
                </>
              ) : city ? (
                `Servicio disponible en ${city.name} y área metropolitana.`
              ) : (
                "Servicio a nivel nacional · CDMX · Guadalajara · Monterrey · León y más"
              )}
            </p>
            <a
              href={waGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-7 py-3 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105"
            >
              Cotizar mesa personalizada
            </a>
          </div>
          <div className="mt-6 lg:mt-0">
            <ProductGalleryCarousel slug="mesa-dulces" title="Mesas Personalizadas" />
          </div>
        </div>
      </section>

      <div className="bg-[#f5efe8] border-b border-[#162040]/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm font-serif text-gray-600">
          <span>
            <strong className="text-[#162040]">{ITEMS.length}</strong> tipos de mesas
          </span>
          <span>•</span>
          <span>Diseño personalizado</span>
          <span>•</span>
          <span>Montaje incluido</span>
          <span>•</span>
          <span>Combinables entre sí</span>
        </div>
      </div>

      <section className="py-10 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto space-y-4 font-serif text-gray-600 text-sm leading-relaxed">
          {cityCopy?.description?.length ? (
            <>
              {displaySectionTitle && (
                <h2 className="text-xl font-serif font-bold text-[#162040]">{displaySectionTitle}</h2>
              )}
              {cityCopy.description.map((para) => (
                <p key={para.slice(0, 24)}>
                  <HighlightKeywords text={para} keywords={keywords} />
                </p>
              ))}
              {cityCopy.localBullets?.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {cityCopy.localBullets.map((b) => (
                    <li key={b}>
                      <HighlightKeywords text={b} keywords={keywords} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <>
              <h2 className="text-xl font-serif font-bold text-[#162040]">
                {displaySectionTitle || "Mesas Personalizadas para Bodas y Eventos en México"}
              </h2>
              <p>
                Las <strong>mesas personalizadas</strong> elevan la experiencia visual y gastronómica de tu celebración. Ofrecemos <strong>mesa de dulces</strong>, <strong>mesa de postres gourmet</strong>, <strong>mesa de quesos y charcutería</strong>, <strong>cupcakes gourmet</strong> y <strong>carrito de snacks</strong>, todas decoradas con la paleta de tu evento.
              </p>
              <p>
                Cada propuesta incluye diseño, surtido, montaje y desmontaje. Cotizamos sin costo en menos de 24 horas para bodas, XV años y eventos corporativos en toda México.
              </p>
              {cityCopy?.localBullets?.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {cityCopy.localBullets.map((b) => (
                    <li key={b}>
                      <HighlightKeywords text={b} keywords={keywords} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="py-10 px-4 bg-[#faf7f2] border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-serif font-bold text-[#162040] mb-4">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-[#162040]/10 bg-white px-5 py-4">
                <summary className="cursor-pointer font-serif font-bold text-[#162040] list-none flex items-start justify-between gap-3">
                  <span>{f.q}</span>
                  <span className="text-[#162040]/50 group-open:rotate-45 transition-transform text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-700 font-serif text-sm leading-relaxed">
                  <HighlightKeywords text={f.a} keywords={keywords} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#162040]/75 mb-2">
              Nuestro catálogo
            </p>
            <h2 className="text-3xl font-serif font-bold text-[#162040]">Elige tu mesa ideal</h2>
            <p className="text-gray-600 font-serif mt-2 max-w-xl mx-auto">
              Cada mesa se decora con los colores de tu evento y puede combinarse con otros servicios.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ITEMS.map((item, idx) => (
              <MesaCard key={item.href} {...item} city={city?.name} priority={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#162040] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Diseñemos tu mesa juntos</h2>
          <p className="text-white/70 font-serif mb-8">
            Cuéntanos la temática, colores y número de invitados — te enviamos propuesta en menos de 24 horas.
          </p>
          <a
            href={waGeneral}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-4 rounded-xl font-bold font-serif text-lg transition-all duration-300 hover:scale-105"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

function MesaCard({
  name,
  href,
  tag,
  icon,
  img,
  highlight,
  city,
  priority = false,
}: {
  name: string;
  href: string;
  tag: string;
  icon: string;
  img: string;
  highlight: string | null;
  city?: string;
  priority?: boolean;
}) {
  const waMsg =
    WA +
    encodeURIComponent(
      `Hola, me interesa cotizar "${name}"${city ? ` en ${city}` : ""} para mi evento.`,
    );
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#162040]/8 hover:border-[#162040]/25 hover:shadow-xl transition-all duration-300 flex flex-col relative">
      {highlight && (
        <div className="absolute top-3 right-3 z-10 bg-[#162040] text-white text-[10px] font-serif font-bold px-2.5 py-1 rounded-full">
          {highlight}
        </div>
      )}
      <Link href={href} aria-label={`Ver ${name}`}>
        <div className="h-52 overflow-hidden bg-[#f5efe8] relative">
          <OptimizedImage
            src={img}
            alt={name}
            title={name}
            width={400}
            height={208}
            priority={priority}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/galeria-1.png";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute bottom-3 left-3 text-3xl">{icon}</span>
        </div>
      </Link>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif font-bold text-[#162040] text-base mb-2">
          {name}
          {city ? ` en ${city}` : ""}
        </h3>
        <p className="font-serif text-gray-600 text-sm mb-5 leading-relaxed flex-1">{tag}</p>
        <div className="flex gap-2">
          <Link
            href={href}
            className="flex-1 text-center text-sm font-serif font-semibold text-[#162040] border border-[#162040]/20 py-2.5 rounded-xl hover:bg-[#f5efe8] transition-colors"
          >
            Ver Detalle
          </Link>
          <a
            href={waMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-sm font-serif font-semibold text-white bg-[#0d6849] hover:bg-[#0a5740] py-2.5 rounded-xl transition-colors"
          >
            Cotizar
          </a>
        </div>
      </div>
    </div>
  );
}
