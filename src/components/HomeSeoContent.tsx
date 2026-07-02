import CityLink from './CityLink'

const Link = CityLink

/** SEO copy at the bottom of the home page — visible to crawlers, out of the hero flow. */
export default function HomeSeoContent() {
  return (
    <section
      id="sobre-bodasesor"
      className="bg-[#f5efe8] py-14 border-t border-[#162040]/10"
      aria-labelledby="seo-intro-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-serif text-gray-700 leading-relaxed space-y-5 text-[0.95rem] md:text-base">
        <h2 id="seo-intro-heading" className="text-2xl md:text-3xl font-bold text-[#162040] text-center mb-6">
          Creamos eventos completos en todo México
        </h2>

        <p>
          <strong>Bodasesor Eventos</strong> diseña y produce celebraciones integrales: bodas, quinceañeras,
          graduaciones, eventos corporativos y fiestas familiares. Con más de <strong>1,000 eventos realizados</strong>,
          coordinamos de principio a fin banquetes premium, catering gourmet, mobiliario, decoración, música,
          fotografía, shows y producción técnica en Ciudad de México, Guadalajara, Monterrey, Cancún, Puebla,
          Querétaro y decenas de ciudades más.
        </p>

        <p>
          No solo rentamos servicios sueltos: armamos la experiencia completa. Un solo equipo planea el menú,
          el montaje, la logística y la operación el día del evento para que tú disfrutes sin preocuparte por
          proveedores, tiempos ni detalles de último minuto.
        </p>

        <h3 className="text-xl font-bold text-[#162040] pt-2">
          Banquetes y catering a la medida
        </h3>
        <p>
          Nuestro{' '}
          <Link href="/banquetes-catering" className="text-[#162040] font-semibold hover:underline">
            servicio de banquetes y catering
          </Link>{' '}
          incluye menús personalizados para 10 a más de 500 invitados: alta cocina, banquete kosher, taquizas,
          parrilladas, barras de sushi, coffee break empresarial, mesas de dulces,{' '}
          <Link href="/barras-de-bebidas" className="text-[#162040] font-semibold hover:underline">
            barras de bebidas
          </Link>{' '}
          con coctelería y{' '}
          <Link href="/alimentos-empresas" className="text-[#162040] font-semibold hover:underline">
            soluciones corporativas
          </Link>{' '}
          para convenciones y cenas de empresa.
        </p>

        <h3 className="text-xl font-bold text-[#162040] pt-2">
          Producción integral: mobiliario, decoración y entretenimiento
        </h3>
        <p>
          Integramos{' '}
          <Link href="/salas-periqueras" className="text-[#162040] font-semibold hover:underline">
            mobiliario premium
          </Link>
          ,{' '}
          <Link href="/pistas-tarimas" className="text-[#162040] font-semibold hover:underline">
            pistas y tarimas
          </Link>
          , carpas,{' '}
          <Link href="/floreria" className="text-[#162040] font-semibold hover:underline">
            florería
          </Link>
          ,{' '}
          <Link href="/audio-iluminacion-video" className="text-[#162040] font-semibold hover:underline">
            audio e iluminación
          </Link>
          ,{' '}
          <Link href="/musica" className="text-[#162040] font-semibold hover:underline">
            música en vivo y DJ
          </Link>
          ,{' '}
          <Link href="/fotografia" className="text-[#162040] font-semibold hover:underline">
            fotografía
          </Link>
          ,{' '}
          <Link href="/shows" className="text-[#162040] font-semibold hover:underline">
            shows
          </Link>{' '}
          y{' '}
          <Link href="/wedding-planner" className="text-[#162040] font-semibold hover:underline">
            wedding planner
          </Link>{' '}
          en un mismo proyecto coordinado.
        </p>

        <h3 className="text-xl font-bold text-[#162040] pt-2">
          Bodas, XV años y eventos en tu ciudad
        </h3>
        <p>
          Producción completa para{' '}
          <Link href="/bodas" className="text-[#162040] font-semibold hover:underline">bodas</Link>,{' '}
          <Link href="/xv-anos" className="text-[#162040] font-semibold hover:underline">quinceañeras</Link>,{' '}
          <Link href="/graduaciones" className="text-[#162040] font-semibold hover:underline">graduaciones</Link>,{' '}
          <Link href="/baby-shower" className="text-[#162040] font-semibold hover:underline">baby showers</Link>,{' '}
          <Link href="/primera-comunion" className="text-[#162040] font-semibold hover:underline">primeras comuniones</Link>{' '}
          y{' '}
          <Link href="/corporativos" className="text-[#162040] font-semibold hover:underline">eventos corporativos</Link>.
          Atendemos{' '}
          <Link href="/ciudad-de-mexico" className="text-[#162040] font-semibold hover:underline">CDMX</Link>,{' '}
          <Link href="/guadalajara" className="text-[#162040] font-semibold hover:underline">Guadalajara</Link>,{' '}
          <Link href="/monterrey" className="text-[#162040] font-semibold hover:underline">Monterrey</Link>,{' '}
          <Link href="/cancun" className="text-[#162040] font-semibold hover:underline">Cancún</Link>{' '}
          y el resto del país. Cotiza por WhatsApp y recibe una propuesta personalizada con menú, montaje y
          opciones según tu tipo de evento e invitados.
        </p>
      </div>
    </section>
  )
}
