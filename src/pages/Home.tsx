import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import CityLink from "../components/CityLink";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import IconFromEmoji from "../components/IconFromEmoji";
import { Lightbox } from "../components/Lightbox";
import { useCity } from "../context/CityContext";
import { CITY_MAP } from "../data/city-data";
import { withCityPath, stripCityFromPath } from "../utils/city-url";

const Link = CityLink;

const WHATSAPP_NUMBER = "5215540080373";
const WHATSAPP_BASE = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`;

// ─── Rotating review card (appears in hero bottom-left) ──────────────────────
const heroReviews = [
  { name: "Héctor Jiménez",       city: "Monterrey",        text: "Servicio impecable, el banquete superó todas las expectativas de mis invitados.", time: "Hace 1 día",       photo: "https://i.pravatar.cc/80?img=12" },
  { name: "Ximena Hernández",     city: "CDMX",             text: "La comida estuvo exquisita, todo el equipo fue de primera desde el primer momento.", time: "Hace 3 semanas",  photo: "https://i.pravatar.cc/80?img=5"  },
  { name: "Cinthya Rodríguez",    city: "Guadalajara",      text: "Todo muy bien coordinado, los meseros fueron muy atentos y puntuales.", time: "Hace 2 meses",    photo: "https://i.pravatar.cc/80?img=9"  },
  { name: "Adolfo Núñez",         city: "Puebla",           text: "Gran acompañamiento de Alejandro, total confianza para futuros eventos.", time: "Hace 8 meses",    photo: "https://i.pravatar.cc/80?img=15" },
  { name: "Sandra Toledano",      city: "Querétaro",        text: "Los volvería a contratar sin duda, excelente servicio y atención.", time: "Hace 1 semana",   photo: "https://i.pravatar.cc/80?img=20" },
  { name: "Fernanda Castillo",    city: "Estado de México", text: "Mis invitados no paraban de felicitarme por la comida y la decoración.", time: "Hace 4 meses",    photo: "https://i.pravatar.cc/80?img=25" },
  { name: "Roberto Méndez",       city: "Monterrey",        text: "Banquete de boda espectacular, todo salió mejor de lo que esperábamos.", time: "Hace 1 año",       photo: "https://i.pravatar.cc/80?img=33" },
  { name: "Lucía Morales",        city: "CDMX",             text: "Catering gourmet de primer nivel, presentación increíble y sabor delicioso.", time: "Hace 2 semanas",  photo: "https://i.pravatar.cc/80?img=47" },
  { name: "Carlos Espinoza",      city: "Cancún",           text: "Profesionales de verdad, coordinaron todo a la perfección el día del evento.", time: "Hace 6 meses",    photo: "https://i.pravatar.cc/80?img=51" },
  { name: "Valeria Gutiérrez",    city: "Guadalajara",      text: "La barra de sushi fue un éxito total, a todos les encantó la presentación.", time: "Hace 3 días",      photo: "https://i.pravatar.cc/80?img=44" },
  { name: "Miguel Ángel Torres",  city: "Puebla",           text: "Organización impecable, el personal fue muy amable y siempre al pendiente.", time: "Hace 1 año y medio", photo: "https://i.pravatar.cc/80?img=57" },
  { name: "Paola Reyes",          city: "León",             text: "Quince años inolvidables, todo el montaje y la comida estuvieron perfectos.", time: "Hace 5 meses",    photo: "https://i.pravatar.cc/80?img=38" },
  { name: "Andrés Villalobos",    city: "Querétaro",        text: "Servicio corporativo muy profesional, los coffee breaks fueron excelentes.", time: "Hace 2 años",      photo: "https://i.pravatar.cc/80?img=61" },
  { name: "Rosa Isabel Castro",   city: "Mérida",           text: "Cuidan cada detalle, la comida estuvo deliciosa y la decoración increíble.", time: "Hace 1 mes",       photo: "https://i.pravatar.cc/80?img=32" },
  { name: "Diego Fuentes",        city: "Toluca",           text: "La paella estuvo exquisita, el chef llegó puntual y el montaje fue rápido.", time: "Hace 3 meses",    photo: "https://i.pravatar.cc/80?img=67" },
  { name: "Selene Carrillo",      city: "CDMX",             text: "Meseros muy amables, la puntualidad y organización fueron sobresalientes.", time: "Hace 10 meses",   photo: "https://i.pravatar.cc/80?img=49" },
  { name: "Alejandra Domínguez",  city: "Monterrey",        text: "Recomendados al 100%, la mesa de postres fue la sensación de la noche.", time: "Hace 3 años",      photo: "https://i.pravatar.cc/80?img=16" },
  { name: "Juan Pablo Herrera",   city: "Veracruz",         text: "Muy buena relación calidad-precio, todo a tiempo y sin ningún contratiempo.", time: "Hace 7 meses",    photo: "https://i.pravatar.cc/80?img=70" },
  { name: "Mariana Sánchez",      city: "San Luis Potosí",  text: "El taquiza de guisados fue un hit entre los invitados, lo pediremos de nuevo.", time: "Hace 2 semanas",  photo: "https://i.pravatar.cc/80?img=29" },
  { name: "Esteban Ramírez",      city: "Oaxaca",           text: "Excelente atención desde la cotización hasta el último detalle del evento.", time: "Hace 11 meses",   photo: "https://i.pravatar.cc/80?img=53" },
];

function RotatingReviewCard() {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => { setIdx(i => (i + 1) % heroReviews.length); setKey(k => k + 1); }, 4500);
    return () => clearInterval(t);
  }, []);
  const r = heroReviews[idx];
  return (
    <div key={key} className="review-card-enter fixed bottom-24 left-4 sm:left-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 w-72 z-40 border border-white/50">
      <div className="flex items-start gap-3">
        <img
          src={r.photo}
          alt={r.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-[#f5efe8]"
          onError={e => {
            const el = e.target as HTMLImageElement;
            el.style.display = 'none';
            if (el.nextElementSibling) (el.nextElementSibling as HTMLElement).style.display = 'flex';
          }}
        />
        <div className="w-10 h-10 rounded-full bg-[#162040] items-center justify-center text-white font-bold text-sm flex-shrink-0 hidden">
          {r.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-serif font-bold text-gray-900 text-sm truncate">{r.name}</span>
            <span className="text-gray-400 text-xs">·</span>
            <span className="text-gray-500 text-xs">{r.city}</span>
          </div>
          <p className="text-gray-600 text-xs leading-snug mb-2">{r.text}</p>
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
            <span className="text-gray-400 text-xs ml-1">{r.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Gallery carousel ─────────────────────────────────────────────────────────
// 30 fotos reales de instagram (sin los excluidos de la galería)
const gallerySlides = [
  [1,  3,  4 ].map(n => `/images/instagram/ig${n}.jpg`),
  [5,  6,  7 ].map(n => `/images/instagram/ig${n}.jpg`),
  [8,  9,  10].map(n => `/images/instagram/ig${n}.jpg`),
  [11, 12, 14].map(n => `/images/instagram/ig${n}.jpg`),
  [15, 16, 17].map(n => `/images/instagram/ig${n}.jpg`),
  [18, 19, 20].map(n => `/images/instagram/ig${n}.jpg`),
  [21, 23, 24].map(n => `/images/instagram/ig${n}.jpg`),
  [25, 26, 27].map(n => `/images/instagram/ig${n}.jpg`),
  [28, 29, 30].map(n => `/images/instagram/ig${n}.jpg`),
  [31, 32, 34].map(n => `/images/instagram/ig${n}.jpg`),
];
const galleryAlts = [
  ["Evento real Bodasesor", "Evento con decoración", "Boda o quinceañera"],
  ["Catering en evento", "Mobiliario premium", "Decoración elegante"],
  ["Banquete servido", "Evento social", "Celebración especial"],
  ["Montaje de mesas", "Evento corporativo", "Salon decorado"],
  ["Catering gourmet", "Servicio de meseros", "Boda en salón"],
  ["Montaje floral", "Mesa banquete", "Evento privado"],
  ["Servicio a domicilio", "Evento íntimo", "Mesa dulces"],
  ["Decoracion boda", "Evento XV años", "Catering buffet"],
  ["Evento de empresa", "Servicio premium", "Banquete formal"],
  ["Celebración social", "Gala corporativa", "Evento familiar"],
];

const allGalleryImages = gallerySlides.flat();

function GalleryCarousel() {
  const [slide, setSlide] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const prev = () => setSlide(s => (s - 1 + gallerySlides.length) % gallerySlides.length);
  const next = () => setSlide(s => (s + 1) % gallerySlides.length);
  const total = allGalleryImages.length;

  return (
    <>
      <div className="relative">
        <div className="flex justify-between items-center mb-4 px-8 md:px-12">
          <span className="text-sm text-gray-500 font-serif">
            Fotos {slide * 3 + 1}–{Math.min(slide * 3 + 3, total)} de {total}
          </span>
        </div>
        <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#162040] hover:bg-[#1a2a52] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 -ml-4 md:-ml-6">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-12">
          {gallerySlides[slide].map((src, i) => (
            <div
              key={src}
              className="relative h-80 overflow-hidden rounded-2xl group cursor-pointer border-4 border-white hover:border-[#162040] transition-all duration-300 bg-[#f5efe8]"
              onClick={() => setLightboxIdx(slide * 3 + i)}
            >
              <img
                src={src}
                alt={galleryAlts[slide][i]}
                className="w-full h-full object-contain"
                onError={e => { (e.target as HTMLImageElement).src = '/images/galeria-1.png'; }}
              />
              <div className="absolute inset-0 bg-[#162040]/0 group-hover:bg-[#162040]/40 transition-all duration-300 flex items-center justify-center">
                <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
        <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#162040] hover:bg-[#1a2a52] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 -mr-4 md:-mr-6">
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="flex justify-center gap-2 mt-8">
          {gallerySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-3 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-[#162040]' : 'w-3 bg-gray-400 hover:bg-[#162040]'}`}
            />
          ))}
        </div>
      </div>
      {lightboxIdx !== null && (
        <Lightbox
          images={allGalleryImages}
          index={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(i => ((i ?? 0) - 1 + total) % total)}
          onNext={() => setLightboxIdx(i => ((i ?? 0) + 1) % total)}
        />
      )}
    </>
  );
}

// ─── Stats counter animation ──────────────────────────────────────────────────
function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function StatBlock({ delay, children }: { delay: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <div
      ref={ref}
      className="p-6 text-center transition-all duration-1000"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(80px)',
      }}
    >
      {children}
    </div>
  );
}

// ─── Logo carousel companies ──────────────────────────────────────────────────
const clients = [
  'Omnilife','Cisidat','Deloitte','Impulsa Labs','BCA','Bomker',
  'Mexico Railway','Jumex','Inspark','BlackBerry','Iusacell','Cinemex',
  'Cinépolis','OXXO','Telcel','Bimbo','Cemex','Televisa Univision',
  'Banorte','Heineken México','Nestlé México','Walmart México','Soriana',
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const cities = [
  { name: 'CDMX', href: '/ciudad-de-mexico' },
  { name: 'Estado de México', href: '/estado-de-mexico' },
  { name: 'Aguascalientes', href: '/aguascalientes' },
  { name: 'Cancún / Riviera Maya', href: '/cancun' },
  { name: 'Cuernavaca', href: '/cuernavaca' },
  { name: 'Guadalajara', href: '/guadalajara' },
  { name: 'León', href: '/leon' },
  { name: 'Los Cabos', href: '/los-cabos' },
  { name: 'Mérida', href: '/merida' },
  { name: 'Monterrey', href: '/monterrey' },
  { name: 'Morelia', href: '/morelia' },
  { name: 'Oaxaca', href: '/oaxaca' },
  { name: 'Pachuca', href: '/pachuca' },
  { name: 'Puebla', href: '/puebla' },
  { name: 'Puerto Vallarta', href: '/puerto-vallarta' },
  { name: 'Querétaro', href: '/queretaro' },
  { name: 'San Luis Potosí', href: '/san-luis-potosi' },
  { name: 'San Miguel de Allende', href: '/san-miguel-allende' },
  { name: 'Tijuana', href: '/tijuana' },
  { name: 'Toluca / Metepec', href: '/toluca' },
  { name: 'Torreón', href: '/torreon' },
  { name: 'Veracruz', href: '/veracruz' },
];

const testimonials = [
  { name: 'Cinthya Rodríguez', type: 'Evento corporativo', text: 'Desde la organización no nos preocupamos por nada, todo estuvo muy bien coordinado y el evento salió increíble. Siempre fueron muy profesionales y estuvieron al pendiente de cada detalle.' },
  { name: 'Ximena Hernández', type: 'Boda', text: 'La comida estuvo exquisita de verdad y todo el equipo que montó, cocinó, sirvió y nos atendió ese día fue de primera. Gracias por ayudarme a hacer mi boda un evento memorable.' },
  { name: 'Sandra Toledano', type: 'Boda íntima', text: 'Excelente servicio y atención. Ninguna queja del equipo de cocina y meseros, organizados, amables y atentos. La comida estuvo muy rica. Los volvería a contratar sin duda.' },
  { name: 'Adolfo Núñez', type: 'Boda civil', text: 'Gran acompañamiento de Alejandro, gran profesional buscando solucionar cada uno de los retos que fueron saliendo. Total confianza para futuros eventos.' },
  { name: 'Selene Carrillo', type: 'Celebración familiar', text: 'Recibí múltiples felicitaciones de mis invitados por el sabor de los alimentos. Los meseros fueron muy amables y atentos. Destacaría la puntualidad y comprensión.' },
  { name: 'Rosa Isabel Castro', type: 'Evento especial', text: 'Cuidan cada detalle, la comida estuvo deliciosa, los meseros muy amables, la decoración, todo salió increíble. Valió 100% la pena.' },
];

const FiveStars = () => (
  <div className="flex gap-1 mb-4">
    {[1,2,3,4,5].map(i => (
      <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ))}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const { city } = useCity();
  const [location, setLocation] = useLocation();

  const selectCity = (citySlug) => {
    if (!CITY_MAP[citySlug]) return;
    setLocation(withCityPath(stripCityFromPath(location), citySlug));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden" data-testid="section-hero">
        <picture className="absolute inset-0">
          <source media="(max-width: 768px)" srcSet="/images/hero-bg-new-mobile.webp" type="image/webp" />
          <source srcSet="/images/hero-bg-new.webp" type="image/webp" />
          <img
            src="/images/hero-bg-new.png"
            alt=""
            width={1408}
            height={768}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[#162040]/60" />
        {/* Review card */}
        <div className="hidden md:block">
          <RotatingReviewCard />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center z-10 w-full">
          <h1 key={city?.slug ?? 'default'} className="text-4xl md:text-7xl font-bold text-white mb-6 font-serif leading-tight">
            {city
              ? <>Encuentra todo para tu evento<br />en {city.name}</>
              : <>Encuentra todo para tu evento<br />en un solo lugar</>
            }
          </h1>
          <p className="text-xl md:text-2xl text-[#f5efe8] mb-12 max-w-4xl mx-auto font-serif">
            {city
              ? `Banquetes, catering gourmet y mobiliario elegante para eventos en ${city.name}. Cotiza sin compromiso.`
              : 'Banquetes premium, catering gourmet y mobiliario elegante para eventos corporativos, bodas y celebraciones en todo México'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={`${WHATSAPP_BASE}&text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento`}
              target="_blank" rel="noopener noreferrer"
              data-testid="btn-cotizar-hero"
              className="bg-[#25D366] hover:bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 font-serif"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Cotiza por WhatsApp
            </a>
            <a
              href="#servicios"
              className="bg-white hover:bg-[#f5efe8] text-[#162040] px-10 py-5 rounded-lg text-xl font-bold transition-all duration-300 border-2 border-white font-serif hover:scale-105 hover:shadow-xl"
            >
              Ver servicios
            </a>
          </div>
          <div className="mt-20">
            <ChevronDown className="w-10 h-10 mx-auto text-white animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Stats (trust badges) ── */}
      <section id="trust-badges" className="bg-[#f5efe8] py-16 relative overflow-visible" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatBlock delay={0}>
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-[#162040]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-[#162040] mb-3 font-serif">1,000+</div>
              <div className="text-gray-800 font-medium text-lg font-serif">Eventos realizados</div>
            </StatBlock>
            <StatBlock delay={400}>
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-[#162040]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-[#162040] mb-3 font-serif">10,000+</div>
              <div className="text-gray-800 font-medium text-lg font-serif">Personas atendidas</div>
            </StatBlock>
            <StatBlock delay={800}>
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-[#162040]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-[#162040] mb-3 font-serif">4.6/5</div>
              <div className="text-gray-800 font-medium text-lg font-serif">Calificación promedio</div>
            </StatBlock>
          </div>
          {/* Sello — absolutely positioned to the right, partially outside */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-8 lg:-right-16">
            <img
              src="/images/sello-garantia-transparent.png"
              alt="Garantía de Felicidad Bodasesor"
              className="h-32 w-auto drop-shadow-lg"
              onError={e => { (e.target as HTMLImageElement).src = '/images/sello-garantia.png'; }}
            />
          </div>
        </div>
      </section>

      {/* ── Nuestros Servicios (3 cards) ── */}
      <section id="servicios" className="py-24 bg-white" data-testid="section-servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#162040] mb-6 font-serif">Nuestros servicios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">Todo lo que necesitas para hacer de tu evento una experiencia inolvidable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Card 1 — Banquetes & Catering */}
            <div className="bg-white border-2 border-[#f5efe8] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#162040] flex flex-col">
              <div className="relative h-48 bg-gradient-to-br from-[#162040] to-[#1a2a52] flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"/>
                </svg>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#162040] mb-4 font-serif">Banquetes &amp; Catering</h3>
                <p className="text-gray-700 mb-6 font-serif">Menús personalizados y servicio gourmet para eventos de 10 a 500+ personas</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  {[
                    { text: 'Banquete formal para eventos', href: '/banquetes' },
                    { text: 'Banquete kosher', href: '/banquete-kosher' },
                    { text: 'Banquete mexicano', href: '/banquete-mexicano' },
                    { text: 'Paella para eventos', href: '/paella' },
                    { text: 'Mesa de dulces', href: '/mesa-dulces' },
                    { text: 'Coffee break empresarial', href: '/coffee-break' },
                    { text: 'Catering para empresas', href: '/alimentos-empresas' },
                  ].map(item => (
                    <li key={item.text} className="flex items-start group">
                      <svg className="w-5 h-5 text-[#162040] mt-1 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                      <Link href={item.href} className="text-gray-700 font-serif hover:text-[#162040] hover:font-bold hover:underline transition-all duration-200 cursor-pointer">{item.text}</Link>
                    </li>
                  ))}
                </ul>
                <p className="text-[#162040] font-medium italic mb-6 font-serif text-center">¿Necesitas algo en específico? Nosotros lo preparamos</p>
                <Link href="/banquetes-catering" className="block w-full bg-[#162040] hover:bg-[#1a2a52] text-white text-center py-4 rounded-lg font-bold transition-all duration-300 font-serif mt-auto hover:scale-105 hover:shadow-xl">
                  Solicitar menú
                </Link>
              </div>
            </div>

            {/* Card 2 — Eventos completos */}
            <div className="bg-white border-2 border-[#f5efe8] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#162040] flex flex-col">
              <div className="relative h-48 bg-gradient-to-br from-[#f5efe8] to-[#8a9bb5] flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83V6.31l6-2.12 6 2.12v4.78z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#162040] mb-4 font-serif">Eventos completos</h3>
                <p className="text-gray-700 mb-6 font-serif">Organización integral de tu evento de principio a fin</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  {[
                    { text: 'Wedding planner', href: '/wedding-planner' },
                    { text: 'Decoración y florería', href: '/floreria-decoracion' },
                    { text: 'Fotografía y video', href: '/fotografia-video' },
                    { text: 'Música y DJ', href: '/musica' },
                    { text: 'Shows y entretenimiento', href: '/shows' },
                    { text: 'Pozole y tostadas', href: '/pozole-tostadas' },
                    { text: 'Parrillada argentina', href: '/parrillada-argentina' },
                  ].map(item => (
                    <li key={item.text} className="flex items-start group">
                      <svg className="w-5 h-5 text-[#162040] mt-1 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                      <Link href={item.href} className="text-gray-700 font-serif hover:text-[#162040] hover:font-bold hover:underline transition-all duration-200 cursor-pointer">{item.text}</Link>
                    </li>
                  ))}
                </ul>
                <Link href="/wedding-planner" className="block w-full bg-[#162040] hover:bg-[#1a2a52] text-white text-center py-4 rounded-lg font-bold transition-all duration-300 font-serif mt-auto hover:scale-105 hover:shadow-xl">
                  Planear mi evento
                </Link>
              </div>
            </div>

            {/* Card 3 — Mobiliario premium */}
            <div className="bg-white border-2 border-[#f5efe8] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#162040] flex flex-col">
              <div className="relative h-48 bg-gradient-to-br from-[#8a9bb5] to-[#162040] flex items-center justify-center">
                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h7V2H4c-1.1 0-2 .9-2 2v7h2V4zm6 9l-4 5h12l-3-4-2.03 2.71L10 13zm7-4.5c0-.83-.67-1.5-1.5-1.5S14 7.67 14 8.5s.67 1.5 1.5 1.5S17 9.33 17 8.5zM20 2h-7v2h7v7h2V4c0-1.1-.9-2-2-2zm0 18h-7v2h7c1.1 0 2-.9 2-2v-7h-2v7zM4 13H2v7c0 1.1.9 2 2 2h7v-2H4v-7z"/>
                </svg>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#162040] mb-4 font-serif">Mobiliario premium</h3>
                <p className="text-gray-700 mb-6 font-serif">Renta de muebles elegantes para cualquier tipo de evento</p>
                <ul className="space-y-3 mb-6 flex-grow">
                  {[
                    { text: 'Sillas Tiffany, Ghost, Crossback', href: '/mesas-sillas' },
                    { text: 'Mesas redondas, rectangulares, mármol', href: '/mesas-sillas' },
                    { text: 'Salas lounge iluminadas', href: '/salas-periqueras' },
                    { text: 'Carpas blancas y negras', href: '/carpas' },
                    { text: 'Periqueras y tarimas', href: '/pistas-tarimas' },
                  ].map(item => (
                    <li key={item.text} className="flex items-start group">
                      <svg className="w-5 h-5 text-[#162040] mt-1 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                      <Link href={item.href} className="text-gray-700 font-serif hover:text-[#162040] hover:font-bold hover:underline transition-all duration-200 cursor-pointer">{item.text}</Link>
                    </li>
                  ))}
                </ul>
                <p className="text-[#162040] font-medium italic mb-6 font-serif text-center">Checa nuestras opciones</p>
                <Link href="/mesas-sillas" className="block w-full bg-[#162040] hover:bg-[#1a2a52] text-white text-center py-4 rounded-lg font-bold transition-all duration-300 font-serif mt-auto hover:scale-105 hover:shadow-xl">
                  Ver catálogo
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Galería ── */}
      <section id="galeria" className="py-24 bg-[#f5efe8]" data-testid="section-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#162040] mb-6 font-serif">Galería de eventos</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-serif">Descubre la magia que creamos en cada celebración</p>
          </div>
          <GalleryCarousel />
          <div className="text-center mt-16">
            <a
              href={`${WHATSAPP_BASE}&text=Hola%2C%20me%20gustar%C3%ADa%20ver%20m%C3%A1s%20fotos%20de%20eventos`}
              target="_blank" rel="noopener noreferrer"
              className="inline-block bg-[#162040] hover:bg-[#1a2a52] text-white px-10 py-4 rounded-lg font-bold transition-colors duration-300 font-serif text-lg"
            >
              Ver más eventos
            </a>
          </div>
        </div>
      </section>

      {/* ── Ciudades ── */}
      <section className="py-20 bg-[#f5efe8]/30" data-testid="section-ciudades">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#162040] mb-4 font-serif tracking-wider">COBERTURA NACIONAL</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#162040] mb-6 font-serif">Servicio en las principales ciudades</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-serif">Llevamos la excelencia de nuestros servicios a todo México</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map(c => (
              <button
                key={c.href}
                onClick={() => selectCity(c.href.slice(1))}
                className="bg-white hover:bg-[#162040] hover:text-white text-[#162040] font-serif font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cómo funciona ── */}
      <section className="py-24 bg-[#f5efe8]" data-testid="section-como-funciona">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#162040] mb-6 font-serif">Cómo funciona</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto font-serif">Organizar tu evento es más fácil de lo que piensas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {[
              {
                title: 'Cotiza gratis',
                desc: 'Contáctanos por WhatsApp y cuéntanos sobre tu evento',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>,
                last: false,
              },
              {
                title: 'Recibe propuesta',
                desc: 'Opciones personalizadas con precios claros',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>,
                last: false,
              },
              {
                title: 'Confirma detalles',
                desc: 'Ajustamos según tus preferencias',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>,
                last: false,
              },
              {
                title: 'Disfruta tu evento',
                desc: 'Nosotros nos encargamos de todo',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>,
                last: true,
              },
            ].map((step, i) => (
              <div key={step.title} className="text-center relative">
                {!step.last && (
                  <div className="hidden md:block absolute top-14 left-1/2 w-full h-1 bg-[#8a9bb5] z-0" />
                )}
                <div className="relative inline-flex items-center justify-center w-28 h-28 bg-white border-4 border-[#162040] text-[#162040] rounded-full mb-6 z-10 shadow-xl hover:bg-[#162040] hover:text-white transition-all duration-300 group cursor-default">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {step.icon}
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#162040] mb-4 font-serif">{step.title}</h3>
                <p className="text-gray-700 font-serif text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiénes somos ── */}
      <section className="py-24 bg-[#f5efe8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-[#162040] mb-4 font-serif tracking-widest uppercase">Quiénes somos</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#162040] mb-8 font-serif leading-tight">
                Creamos eventos que se convierten en recuerdos
              </h2>
              <p className="text-xl text-gray-700 font-serif leading-relaxed mb-8">
                Somos Bodasesor Eventos, una empresa especializada en la organización y producción de celebraciones en la Ciudad de México. Con más de diez años de experiencia, acompañamos a nuestros clientes en cada etapa de su evento.
              </p>
              <div className="flex gap-12 mb-10">
                <div>
                  <div className="text-4xl font-bold text-[#162040] font-serif">+10</div>
                  <div className="text-gray-600 font-serif text-sm">años de experiencia</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#162040] font-serif">100%</div>
                  <div className="text-gray-600 font-serif text-sm">atención personalizada</div>
                </div>
              </div>
              <Link href="/quienes-somos" className="inline-block bg-[#162040] hover:bg-[#1a2a52] text-white px-8 py-4 rounded-lg font-bold font-serif transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Conoce nuestra historia →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: '🏆', title: 'Experiencia comprobada', desc: 'Más de una década organizando eventos de todos los tamaños.' },
                { icon: '🤝', title: 'Servicio personalizado', desc: 'Trabajamos contigo para llevar tu visión a la realidad.' },
                { icon: '✨', title: 'Calidad en cada detalle', desc: 'Los mejores proveedores de catering, decoración y logística.' },
                { icon: '💡', title: 'Creatividad e innovación', desc: 'Experiencias originales que sorprenden a tus invitados.' },
              ].map(p => (
                <div key={p.title} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-[#162040]/8 flex items-center justify-center mb-3 text-[#162040]">
                    <IconFromEmoji emoji={p.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#162040] font-serif mb-2 text-sm">{p.title}</h3>
                  <p className="text-gray-600 font-serif text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Carrusel de clientes ── */}
      <section className="py-16 bg-[#162040] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <p className="text-[#f5efe8] text-xs font-serif tracking-widest mb-3 uppercase">Nuestros clientes</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">Empresas que confían en nosotros</h2>
        </div>
        <div className="relative overflow-hidden select-none">
          <div className="marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-7 py-4 transition-colors duration-300 cursor-default"
              >
                <span className="text-white font-bold font-serif text-base whitespace-nowrap">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonios ── */}
      <section id="testimonios" className="py-24 bg-white" data-testid="section-reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#162040] mb-6 font-serif">Lo que dicen nuestros clientes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">Testimonios reales de quienes confiaron en nosotros</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.name} className="bg-[#f5efe8] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-[#f5efe8] hover:border-[#162040]">
                <FiveStars />
                <p className="text-gray-700 mb-6 italic font-serif text-lg leading-relaxed">"{t.text}"</p>
                <div className="border-t-2 border-[#8a9bb5] pt-4">
                  <p className="font-bold text-[#162040] font-serif text-lg">{t.name}</p>
                  <p className="text-gray-600 font-serif">{t.type}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <p className="text-gray-700 mb-6 font-serif text-lg flex items-center justify-center gap-2 flex-wrap">
              Calificación promedio: <span className="font-bold text-[#162040] text-2xl">4.6/5</span> en
              <svg viewBox="0 0 272 92" className="h-7 inline-block" xmlns="http://www.w3.org/2000/svg">
                <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                <path d="M35.29 41.41V32H66.6v28.29A32.5 32.5 0 0145.63 68C27.5 68 13.57 53.91 13.57 35.84c0-18.01 13.93-32 32.06-32 9.66 0 16.38 3.78 21.5 8.65L60.7 20.08c-3.7-3.53-8.9-6.3-15.37-6.3-12.6 0-22.51 10.41-22.51 23.26 0 12.77 9.91 23.18 22.51 23.18 5.04 0 9.16-1.26 12.52-3.19V41.41H35.29z" fill="#4285F4"/>
              </svg>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.google.com/search?q=bodasesor"
                target="_blank" rel="noopener noreferrer"
                className="inline-block bg-[#162040] hover:bg-[#1a2a52] text-white px-10 py-4 rounded-lg font-bold transition-colors duration-300 font-serif text-lg"
              >
                Ver todas las reseñas
              </a>
              <a
                href="https://g.page/r/CfYUk4pqp8VBEBM/review"
                target="_blank" rel="noopener noreferrer"
                className="inline-block bg-white hover:bg-[#f5efe8] text-[#162040] border-2 border-[#162040] px-10 py-4 rounded-lg font-bold transition-colors duration-300 font-serif text-lg"
              >
                Escribe una reseña
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-[#162040] py-24" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif">¿Listo para planear tu evento?</h2>
          <p className="text-2xl text-[#f5efe8] mb-12 font-serif">Obtén una cotización personalizada en menos de 5 minutos</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <a
              href={`${WHATSAPP_BASE}&text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento`}
              target="_blank" rel="noopener noreferrer"
              data-testid="btn-cta-bottom"
              className="bg-[#25D366] hover:bg-green-600 text-white px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 font-serif"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chatear por WhatsApp
            </a>
            <a
              href="tel:+525540080373"
              className="bg-white hover:bg-[#f5efe8] text-[#162040] px-12 py-5 rounded-lg text-xl font-bold transition-all duration-300 font-serif"
            >
              Llamar ahora
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[#f5efe8]">
            {['Sin compromiso', 'Respuesta en menos de 2 horas', 'Atención personalizada'].map(item => (
              <div key={item} className="flex items-center gap-2 font-serif">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
