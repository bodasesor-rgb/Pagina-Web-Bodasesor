import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { whatsappLink, WHY_BODASESOR } from '../data/site'
import SectionCTA from '../components/SectionCTA'

const EVENT_DATA = {
  bodas: {
    title: 'Servicios para Bodas en México',
    hero: 'Todo lo que necesitas para la boda de tus sueños en un solo lugar',
    heroImg: '/images/banquete-hero.png',
    intro: 'Una boda es mucho más que un evento: es la celebración del amor y el comienzo de una nueva historia. Bodasesor nació para acompañar a las parejas en la organización de su día más importante, ofreciendo acceso a los mejores proveedores de México en un solo lugar. Hemos acompañado más de 1,000 bodas en todo México.',
    services: [
      { cat: 'Banquete & Catering', items: ['Banquete Formal', 'Paella Valenciana', 'Taquiza de Guisados', 'Parrillada Argentina', 'Canapés Premium', 'Barra de Sushi'], to: '/banquetes-catering' },
      { cat: 'Barras de Bebidas', items: ['Barra de Bebidas', 'Cócteles y Mixología', 'Barra de Café Premium', 'Barra de Mocteles'], to: '/barras-de-bebidas' },
      { cat: 'Decoración & Flores', items: ['Florería y Decoración', 'Espacios para Eventos'], to: '/fotografia' },
      { cat: 'Fotografía & Video', items: ['Fotografía y Video'], to: '/fotografia' },
      { cat: 'Música & Entretenimiento', items: ['Música y DJ', 'Shows y Entretenimiento'], to: '/audio-iluminacion-video' },
      { cat: 'Coordinación Integral', items: ['Wedding Planner'], to: '/wedding-planner' },
    ],
  },
  corporativos: {
    title: 'Eventos Corporativos Profesionales en México',
    hero: 'Eventos empresariales que proyectan la imagen que tu marca merece',
    heroImg: '/images/banquete-hero.png',
    intro: 'Los eventos corporativos son la carta de presentación de tu empresa ante clientes, socios y colaboradores. Desde coffee breaks para juntas hasta congresos de 5,000 personas, pasando por cenas de gala, lanzamientos de producto y posadas navideñas empresariales: Bodasesor tiene la experiencia y los proveedores para hacerlo impecable.',
    services: [
      { cat: 'Catering Corporativo', items: ['Coffee Break Ejecutivo', 'Canapés Premium', 'Desayuno Social', 'Comida Corrida', 'Alimentos para Empresas', 'Bocadillos'], to: '/banquetes-catering' },
      { cat: 'Barras de Bebidas', items: ['Barra de Café Premium', 'Barra de Bebidas', 'Cócteles y Mixología', 'Barra de Mocteles'], to: '/barras-de-bebidas' },
      { cat: 'Decoración & Branding', items: ['Florería y Decoración', 'Espacios para Eventos'], to: '/fotografia' },
      { cat: 'Fotografía & Video', items: ['Fotografía y Video'], to: '/fotografia' },
      { cat: 'Música & Entretenimiento', items: ['Música y DJ', 'Shows y Entretenimiento'], to: '/audio-iluminacion-video' },
    ],
  },
  'xv-anos': {
    title: 'Servicios para XV Años en México',
    hero: 'El festejo de quince años más especial de tu vida',
    heroImg: '/images/banquete-hero.png',
    intro: 'Los XV años son uno de los eventos más especiales en la cultura mexicana. Bodasesor te ofrece todos los servicios para que tu fiesta de quince años sea perfecta: desde el banquete y las barras de bebidas hasta el DJ, la decoración floral y la fotografía.',
    services: [
      { cat: 'Banquete & Catering', items: ['Banquete Formal', 'Taquiza de Guisados', 'Barra de Crepas', 'Barra de Sushi', 'Repostería'], to: '/banquetes-catering' },
      { cat: 'Barras de Bebidas', items: ['Barra de Bebidas', 'Barra de Mocteles', 'Paletas y Helados'], to: '/barras-de-bebidas' },
      { cat: 'Música & Shows', items: ['Música y DJ', 'Shows y Entretenimiento'], to: '/audio-iluminacion-video' },
      { cat: 'Decoración', items: ['Florería y Decoración', 'Colgantes y Centros de Mesa'], to: '/fotografia' },
    ],
  },
  'baby-shower': {
    title: 'Baby Shower — Bodasesor Eventos',
    hero: 'Celebra la llegada de tu bebé con estilo',
    heroImg: '/images/banquete-hero.png',
    intro: 'Un baby shower es la celebración perfecta para dar la bienvenida a un nuevo integrante de la familia. Bodasesor te ofrece todos los servicios para que tu baby shower sea un evento memorable: catering gourmet, decoración temática, mesa de dulces y mucho más.',
    services: [
      { cat: 'Catering', items: ['Canapés Premium', 'Bocadillos', 'Desayuno Social', 'Cupcakes Gourmet'], to: '/banquetes-catering' },
      { cat: 'Bebidas', items: ['Barra de Mocteles', 'Barra de Café Premium', 'Paletas y Helados'], to: '/barras-de-bebidas' },
    ],
  },
  cumpleanos: {
    title: 'Fiestas de Cumpleaños — Bodasesor Eventos',
    hero: 'Celebra un año más con una fiesta increíble',
    heroImg: '/images/banquete-hero.png',
    intro: 'Desde cumpleaños íntimos hasta fiestas grandes, Bodasesor tiene los servicios para hacer tu cumpleaños un evento memorable. Catering personalizado, barras de bebidas, música y más.',
    services: [
      { cat: 'Alimentos', items: ['Taquiza de Guisados', 'Parrillada Tradicional', 'Barra de Crepas', 'Barra de Pizzas'], to: '/banquetes-catering' },
      { cat: 'Bebidas', items: ['Barra de Bebidas', 'Cócteles y Mixología', 'Paletas y Helados'], to: '/barras-de-bebidas' },
      { cat: 'Entretenimiento', items: ['Música y DJ', 'Shows y Entretenimiento'], to: '/audio-iluminacion-video' },
    ],
  },
  'primera-comunion': {
    title: 'Primera Comunión — Bodasesor Eventos',
    hero: 'Un día sagrado, una celebración perfecta',
    heroImg: '/images/banquete-hero.png',
    intro: 'La primera comunión es un momento sagrado que merece una celebración a la altura. Bodasesor coordina todos los servicios para que el festejo sea íntimo, elegante y memorable.',
    services: [
      { cat: 'Alimentos', items: ['Banquete Formal', 'Bocadillos', 'Cupcakes Gourmet', 'Repostería'], to: '/banquetes-catering' },
      { cat: 'Bebidas', items: ['Barra de Mocteles', 'Barra de Café Premium'], to: '/barras-de-bebidas' },
    ],
  },
  cenas: {
    title: 'Cenas de Gala — Bodasesor Eventos',
    hero: 'Cenas memorables para ocasiones especiales',
    heroImg: '/images/banquete-hero.png',
    intro: 'Bodasesor organiza cenas de gala, cenas empresariales y cenas temáticas para todo tipo de ocasión. Menús personalizados, servicio de meseros, decoración y música en vivo.',
    services: [
      { cat: 'Alimentos', items: ['Banquete Formal', 'Canapés Premium', 'Paella', 'Parrillada Argentina'], to: '/banquetes-catering' },
      { cat: 'Bebidas', items: ['Cócteles y Mixología', 'Barra de Vinos', 'Barra de Café Premium'], to: '/barras-de-bebidas' },
    ],
  },
  graduaciones: {
    title: 'Graduaciones — Bodasesor Eventos',
    hero: 'Celebra el logro con una fiesta que estará en tus recuerdos',
    heroImg: '/images/banquete-hero.png',
    intro: 'La graduación es un hito que merece una celebración especial. Bodasesor coordina todo: desde el banquete hasta el DJ y la decoración, para que tu fiesta de graduación sea un éxito.',
    services: [
      { cat: 'Alimentos', items: ['Banquete Formal', 'Taquiza de Guisados', 'Barra de Crepas'], to: '/banquetes-catering' },
      { cat: 'Bebidas', items: ['Barra de Bebidas', 'Cócteles y Mixología'], to: '/barras-de-bebidas' },
      { cat: 'Entretenimiento', items: ['Música y DJ'], to: '/audio-iluminacion-video' },
    ],
  },
}

export default function EventPage() {
  const { slug } = useParams()
  const data = EVENT_DATA[slug] || {
    title: 'Bodasesor Eventos',
    hero: 'Organizamos tu evento perfecto',
    heroImg: '/images/banquete-hero.png',
    intro: 'Contáctanos para cotizar cualquier tipo de evento.',
    services: [],
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-gray-900 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={data.heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{data.title}</h1>
          <p className="text-xl text-gray-300 mb-8">{data.hero}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={whatsappLink(`Hola, me interesa cotizar para mi evento: ${data.title}`)}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-full transition-colors flex items-center gap-2">
              Cotizar por WhatsApp
            </a>
            <a href="tel:+525540080373" className="border border-white/40 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-full transition-colors">
              Llamar ahora
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-400">
            <span>✓ Cotización sin compromiso</span>
            <span>✓ +1,000 eventos realizados</span>
            <span>✓ Garantía Bodasesor</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 leading-relaxed text-lg text-center">{data.intro}</p>
        </div>
      </section>

      {/* Services */}
      {data.services.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl text-gray-900 text-center mb-10">
              Servicios disponibles para {data.title.replace('Servicios para ', '').replace('Servicios Completos para ', '')}
            </h2>
            <p className="text-center text-gray-500 mb-12">Un solo proveedor para coordinar todos los servicios de tu evento. Sin estrés, sin intermediarios.</p>
            <div className="space-y-8">
              {data.services.map((cat) => (
                <div key={cat.cat}>
                  <h3 className="font-serif text-xl text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-400 rounded-full inline-block" />
                    {cat.cat}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {cat.items.map(item => (
                      <Link key={item} to={cat.to}
                        className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:border-amber-300 hover:text-amber-700 transition-all text-center">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Bodasesor */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl text-center text-gray-900 mb-10">¿Por qué elegir Bodasesor?</h2>
          <p className="text-center text-gray-500 mb-10">Más de 15 años coordinando eventos en toda la república mexicana</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_BODASESOR.map(w => (
              <div key={w.title} className="text-center">
                <div className="text-3xl mb-3">{w.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">{w.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA
        title={`¿Listo para organizar tu ${data.title.replace('Servicios para ', '').replace('Servicios Completos para ', '').replace(' en México', '').replace(' Profesionales', '')}?`}
        subtitle="Escríbenos hoy y recibe una cotización personalizada sin compromiso en menos de una hora."
      />
    </>
  )
}
