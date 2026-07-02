import CityLink from './CityLink'

const Link = CityLink

/**
 * Visible SEO copy for the home page — crawlable without waiting for lazy chunks.
 */
export default function HomeSeoContent() {
  return (
    <section
      id="sobre-bodasesor"
      className="bg-white py-16 border-b border-[#f5efe8]"
      aria-labelledby="seo-intro-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-serif text-gray-700 leading-relaxed space-y-6">
        <h2 id="seo-intro-heading" className="text-3xl md:text-4xl font-bold text-[#162040] text-center mb-8">
          Banquetes, catering y servicios para eventos en todo México
        </h2>

        <p>
          <strong>Bodasesor Eventos</strong> es tu marketplace de confianza para organizar bodas, quinceañeras,
          graduaciones, eventos corporativos y celebraciones familiares. Con más de <strong>1,000 eventos realizados</strong> y
          presencia en Ciudad de México, Guadalajara, Monterrey, Cancún, Puebla, Querétaro y decenas de ciudades más,
          reunimos en un solo lugar banquetes premium, catering gourmet, mobiliario elegante, música, fotografía,
          florería, shows, wedding planner y espacios para eventos.
        </p>

        <p>
          Sabemos que cada celebración es única. Por eso ofrecemos menús personalizados desde banquetes formales y
          servicio kosher hasta taquizas, parrilladas argentinas, barras de sushi, coffee break empresarial y estaciones
          de antojitos mexicanos. Nuestro equipo de chefs, meseros y coordinadores cuida cada detalle para que tú
          disfrutes el momento mientras nosotros nos encargamos de la logística, el montaje y el servicio en sitio.
        </p>

        <h3 className="text-2xl font-bold text-[#162040] pt-4">
          Servicios de banquetes y catering para bodas y eventos
        </h3>
        <p>
          El corazón de Bodasesor es la gastronomía. Contrata{' '}
          <Link href="/banquetes-catering" className="text-[#162040] font-semibold hover:underline">
            banquetes y catering
          </Link>{' '}
          para grupos de 10 a más de 500 invitados: menús de alta cocina, barras de alimentos temáticas, mesas de dulces,
          pozole y tostadas, paella en vivo, canapés premium y{' '}
          <Link href="/barras-de-bebidas" className="text-[#162040] font-semibold hover:underline">
            barras de bebidas
          </Link>{' '}
          con coctelería y mixología. Para empresas contamos con{' '}
          <Link href="/alimentos-empresas" className="text-[#162040] font-semibold hover:underline">
            catering corporativo
          </Link>{' '}
          y soluciones para convenciones, lanzamientos y cenas de fin de año.
        </p>

        <h3 className="text-2xl font-bold text-[#162040] pt-4">
          Mobiliario, decoración y producción para tu evento
        </h3>
        <p>
          Complementa tu banquete con renta de{' '}
          <Link href="/salas-periqueras" className="text-[#162040] font-semibold hover:underline">
            salas lounge y periqueras
          </Link>
          , sillas Tiffany, mesas imperiales,{' '}
          <Link href="/pistas-tarimas" className="text-[#162040] font-semibold hover:underline">
            pistas de baile y tarimas
          </Link>
          , carpas, entelados, vajillas, colgantes florales y{' '}
          <Link href="/floreria" className="text-[#162040] font-semibold hover:underline">
            arreglos florales
          </Link>
          . También encontrarás{' '}
          <Link href="/audio-iluminacion-video" className="text-[#162040] font-semibold hover:underline">
            audio, iluminación y video
          </Link>
          , DJ y grupos musicales, fotógrafos profesionales, shows de entretenimiento y{' '}
          <Link href="/wedding-planner" className="text-[#162040] font-semibold hover:underline">
            wedding planner
          </Link>{' '}
          para bodas integrales.
        </p>

        <h3 className="text-2xl font-bold text-[#162040] pt-4">
          Bodas, XV años y eventos sociales en tu ciudad
        </h3>
        <p>
          Organizamos{' '}
          <Link href="/bodas" className="text-[#162040] font-semibold hover:underline">bodas</Link>,{' '}
          <Link href="/xv-anos" className="text-[#162040] font-semibold hover:underline">quinceañeras</Link>,{' '}
          <Link href="/graduaciones" className="text-[#162040] font-semibold hover:underline">graduaciones</Link>,{' '}
          <Link href="/baby-shower" className="text-[#162040] font-semibold hover:underline">baby showers</Link>,{' '}
          <Link href="/primera-comunion" className="text-[#162040] font-semibold hover:underline">primeras comuniones</Link>{' '}
          y{' '}
          <Link href="/corporativos" className="text-[#162040] font-semibold hover:underline">eventos corporativos</Link>.
          Selecciona tu ciudad en el menú superior o explora{' '}
          <Link href="/ciudad-de-mexico" className="text-[#162040] font-semibold hover:underline">CDMX</Link>,{' '}
          <Link href="/guadalajara" className="text-[#162040] font-semibold hover:underline">Guadalajara</Link>,{' '}
          <Link href="/monterrey" className="text-[#162040] font-semibold hover:underline">Monterrey</Link>,{' '}
          <Link href="/cancun" className="text-[#162040] font-semibold hover:underline">Cancún</Link>{' '}
          y el resto del catálogo nacional. Cotiza sin compromiso por WhatsApp y recibe propuesta personalizada
          con precios claros, opciones de menú y recomendaciones según el tipo de evento y número de invitados.
        </p>

        <p className="text-center pt-4">
          <a
            href="https://api.whatsapp.com/send?phone=5215540080373&text=Hola%2C%20me%20gustar%C3%ADa%20cotizar%20un%20evento"
            className="inline-flex items-center gap-2 bg-[#0d6849] hover:bg-[#0a5740] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotiza tu evento por WhatsApp
          </a>
        </p>
      </div>
    </section>
  )
}
