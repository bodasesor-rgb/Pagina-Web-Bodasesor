import { useState, useEffect, lazy, Suspense } from "react";
import { useCity } from "../context/CityContext";
import HomeSeoContent from "../components/HomeSeoContent";
import HomeJsonLd from "../components/HomeJsonLd";

const HomeBelowFold = lazy(() => import("./HomeBelowFold"));

const WHATSAPP_NUMBER = "5215540080373";
const WHATSAPP_BASE = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}`;

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
      const id = window.requestIdleCallback(start, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1500);
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
    <div key={key} className="review-card-enter fixed bottom-24 left-4 sm:left-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 w-72 z-40 border border-white/50">
      <div className="flex items-start gap-3">
        <img
          src={r.photo}
          alt=""
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-[#f5efe8]"
          loading="lazy"
          decoding="async"
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
  const { city } = useCity();

  return (
    <div>
      <HomeJsonLd />
      <section className="relative min-h-[520px] md:min-h-[480px] flex items-center overflow-x-hidden md:overflow-hidden md:aspect-[1408/768]" data-testid="section-hero">
        <picture className="absolute inset-0 -z-10" aria-hidden="true">
          <source media="(max-width: 768px)" srcSet="/images/hero-bg-new-mobile.webp" type="image/webp" />
          <source srcSet="/images/hero-bg-new.webp" type="image/webp" />
          <img
            src="/images/hero-bg-new.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            width={1408}
            height={768}
          />
        </picture>
        <div className="absolute inset-0 bg-[#162040]/60 pointer-events-none" aria-hidden="true" />
        <div className="hidden md:block">
          <RotatingReviewCard />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24 text-center z-10 w-full">
          <h1
            key={city?.slug ?? 'default'}
            className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold text-white mb-5 md:mb-8 leading-tight"
          >
            {city ? (
              <>Banquetes y catering para eventos<br />en {city.name}</>
            ) : (
              <>Banquetes, catering y servicios<br />para eventos en México</>
            )}
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-[#f5efe8] mb-8 md:mb-12 max-w-4xl mx-auto font-serif">
            {city
              ? `Banquetes, catering gourmet y mobiliario elegante para eventos en ${city.name}. Cotiza sin compromiso.`
              : 'Banquetes premium, catering gourmet y mobiliario elegante para eventos corporativos, bodas y celebraciones en todo México'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <a
              href={`${WHATSAPP_BASE}&text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento`}
              target="_blank" rel="noopener noreferrer"
              data-testid="btn-cotizar-hero"
              className="bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 md:px-10 py-4 md:py-5 rounded-lg text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-3 font-serif"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Cotiza por WhatsApp
            </a>
            <a
              href="#servicios"
              className="bg-white hover:bg-[#f5efe8] text-[#162040] px-8 md:px-10 py-4 md:py-5 rounded-lg text-lg md:text-xl font-bold transition-all duration-300 border-2 border-white font-serif hover:scale-105 hover:shadow-xl"
            >
              Ver servicios
            </a>
          </div>
          <div className="mt-10 md:mt-20">
            <svg className="w-8 h-8 md:w-10 md:h-10 mx-auto text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <HomeBelowFold />
      </Suspense>

      <HomeSeoContent />
    </div>
  );
}
