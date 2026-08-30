import { useState, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import { useCity } from "../context/CityContext";
import HomeSeoContent from "../components/HomeSeoContent";
import HomeJsonLd from "../components/HomeJsonLd";
import {
  enableHomeStaticHero,
  disableHomeStaticHero,
  syncStaticHeroCopy,
} from "../utils/static-lcp-shell";
import CatalogImage from "../components/CatalogImage";

const HomeBelowFold = lazy(() => import("./HomeBelowFold"));

/**
 * Keep preloaded #lcp-hero-wrap + #static-hero-copy as the LCP layer.
 * React only adds the navy overlay + below-fold — no duplicate H1 (avoids
 * waiting on hydration + Playfair for Largest Contentful Paint).
 */
function HeroMedia() {
  const { city } = useCity()
  useLayoutEffect(() => {
    enableHomeStaticHero()
    return () => disableHomeStaticHero()
  }, [])
  useLayoutEffect(() => {
    syncStaticHeroCopy(city)
  }, [city])
  return null
}

const heroReviews = [
  { name: "Héctor Jiménez",       city: "Monterrey",        text: "Servicio impecable, el banquete superó todas las expectativas de mis invitados.", time: "Hace 1 día",       photo: "/images/reviews/avatar-12.jpg" },
  { name: "Ximena Hernández",     city: "CDMX",             text: "La comida estuvo exquisita, todo el equipo fue de primera desde el primer momento.", time: "Hace 3 semanas",  photo: "/images/reviews/avatar-5.jpg" },
  { name: "Cinthya Rodríguez",    city: "Guadalajara",      text: "Todo muy bien coordinado, los meseros fueron muy atentos y puntuales.", time: "Hace 2 meses",    photo: "/images/reviews/avatar-9.jpg" },
  { name: "Adolfo Núñez",         city: "Puebla",           text: "Gran acompañamiento de Alejandro, total confianza para futuros eventos.", time: "Hace 8 meses",    photo: "/images/reviews/avatar-15.jpg" },
  { name: "Sandra Toledano",      city: "Querétaro",        text: "Los volvería a contratar sin duda, excelente servicio y atención.", time: "Hace 1 semana",   photo: "/images/reviews/avatar-20.jpg" },
  { name: "Fernanda Castillo",    city: "Estado de México", text: "Mis invitados no paraban de felicitarme por la comida y la decoración.", time: "Hace 4 meses",    photo: "/images/reviews/avatar-25.jpg" },
  { name: "Roberto Méndez",       city: "Monterrey",        text: "Banquete de boda espectacular, todo salió mejor de lo que esperábamos.", time: "Hace 1 año",       photo: "/images/reviews/avatar-33.jpg" },
  { name: "Lucía Morales",        city: "CDMX",             text: "Catering gourmet de primer nivel, presentación increíble y sabor delicioso.", time: "Hace 2 semanas",  photo: "/images/reviews/avatar-47.jpg" },
  { name: "Carlos Espinoza",      city: "Cancún",           text: "Profesionales de verdad, coordinaron todo a la perfección el día del evento.", time: "Hace 6 meses",    photo: "/images/reviews/avatar-51.jpg" },
  { name: "Valeria Gutiérrez",    city: "Guadalajara",      text: "La barra de sushi fue un éxito total, a todos les encantó la presentación.", time: "Hace 3 días",      photo: "/images/reviews/avatar-44.jpg" },
  { name: "Miguel Ángel Torres",  city: "Puebla",           text: "Organización impecable, el personal fue muy amable y siempre al pendiente.", time: "Hace 1 año y medio", photo: "/images/reviews/avatar-57.jpg" },
  { name: "Paola Reyes",          city: "León",             text: "Quince años inolvidables, todo el montaje y la comida estuvieron perfectos.", time: "Hace 5 meses",    photo: "/images/reviews/avatar-38.jpg" },
  { name: "Andrés Villalobos",    city: "Querétaro",        text: "Servicio corporativo muy profesional, los coffee breaks fueron excelentes.", time: "Hace 2 años",      photo: "/images/reviews/avatar-61.jpg" },
  { name: "Rosa Isabel Castro",   city: "Mérida",           text: "Cuidan cada detalle, la comida estuvo deliciosa y la decoración increíble.", time: "Hace 1 mes",       photo: "/images/reviews/avatar-32.jpg" },
  { name: "Diego Fuentes",        city: "Toluca",           text: "La paella estuvo exquisita, el chef llegó puntual y el montaje fue rápido.", time: "Hace 3 meses",    photo: "/images/reviews/avatar-67.jpg" },
  { name: "Selene Carrillo",      city: "CDMX",             text: "Meseros muy amables, la puntualidad y organización fueron sobresalientes.", time: "Hace 10 meses",   photo: "/images/reviews/avatar-49.jpg" },
  { name: "Alejandra Domínguez",  city: "Monterrey",        text: "Recomendados al 100%, la mesa de postres fue la sensación de la noche.", time: "Hace 3 años",      photo: "/images/reviews/avatar-16.jpg" },
  { name: "Juan Pablo Herrera",   city: "Veracruz",         text: "Muy buena relación calidad-precio, todo a tiempo y sin ningún contratiempo.", time: "Hace 7 meses",    photo: "/images/reviews/avatar-70.jpg" },
  { name: "Mariana Sánchez",      city: "San Luis Potosí",  text: "El taquiza de guisados fue un hit entre los invitados, lo pediremos de nuevo.", time: "Hace 2 semanas",  photo: "/images/reviews/avatar-29.jpg" },
  { name: "Esteban Ramírez",      city: "Oaxaca",           text: "Excelente atención desde la cotización hasta el último detalle del evento.", time: "Hace 11 meses",   photo: "/images/reviews/avatar-53.jpg" },
];

function RotatingReviewCard() {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const start = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 3000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => { setIdx(i => (i + 1) % heroReviews.length); setKey(k => k + 1); }, 4500);
    return () => clearInterval(t);
  }, [ready]);
  if (!ready) return null;
  const r = heroReviews[idx];
  return (
    <div key={key} className="review-card-enter fixed bottom-24 left-4 sm:left-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 w-72 min-h-[7.5rem] z-40 border border-white/50">
      <div className="flex items-start gap-3">
        <CatalogImage
          src={r.photo}
          alt={r.name}
          title={r.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-[#f5efe8]"
          fallback=""
          onError={e => {
            const el = e.target as HTMLImageElement;
            el.style.display = 'none';
            if (el.nextElementSibling) (el.nextElementSibling as HTMLElement).style.display = 'flex';
          }}
        />
        <div className="w-10 h-10 rounded-full bg-[#162040] items-center justify-center text-white font-bold text-sm flex-shrink-0 hidden" aria-hidden="true">
          {r.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-serif font-bold text-gray-900 text-sm truncate">{r.name}</span>
            <span className="text-gray-600 text-xs">·</span>
            <span className="text-gray-600 text-xs">{r.city}</span>
          </div>
          <p className="text-gray-600 text-xs leading-snug mb-2">{r.text}</p>
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
            <span className="text-gray-600 text-xs ml-1">{r.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <HomeJsonLd />
      <section
        className="relative min-h-[260px] md:min-h-[280px] lg:min-h-[300px] flex flex-col justify-center overflow-x-hidden overflow-hidden"
        data-testid="section-hero"
        aria-label="Inicio"
      >
        <HeroMedia />
        {/* Dimmer only — headline/CTAs live in #static-hero-copy for early LCP */}
        <div className="absolute inset-0 bg-[#162040]/60 pointer-events-none z-[1]" aria-hidden="true" />
        <div className="hidden md:block">
          <RotatingReviewCard />
        </div>
      </section>

      <Suspense fallback={null}>
        <HomeBelowFold />
      </Suspense>

      <HomeSeoContent />
    </div>
  );
}
