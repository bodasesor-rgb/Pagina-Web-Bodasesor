import { Link } from 'wouter'
import { useCity } from '../context/CityContext'
import { img } from '../data/site'

const WHATSAPP = "5215540080373"

// Map of known service slugs to their data
const SERVICE_DATA = {
  // Banquetes
  'banquetes':           { title: 'Banquetes Formales', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Servicio de banquete formal con chefs ejecutivos, meseros profesionales y vajilla premium para tu evento.' },
  'banquete-kosher':     { title: 'Banquete Kosher', cat: 'Banquetes & Catering', img: '/images/banquete-kosher-hero.png', desc: 'Banquete kosher certificado con ingredientes y preparación según las normas rabínicas.' },
  'banquete-mexicano':   { title: 'Banquete Mexicano', cat: 'Banquetes & Catering', img: '/images/banquete-mexicano-hero.png', desc: 'Recetas regionales auténticas con técnicas contemporáneas para eventos en todo México.' },
  'banquete-navideno':   { title: 'Banquete Navideño', cat: 'Banquetes & Catering', img: '/images/banquete-navideno-hero.png', desc: 'Cena de gala navideña para posadas y fiestas de fin de año.' },
  'pozole-tostadas':     { title: 'Pozole y Tostadas', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Pozole rojo, blanco y verde con todos los acompañantes para tu evento.' },
  'paella':              { title: 'Paella Valenciana', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Paella española auténtica cocinada en vivo con mariscos y azafrán.' },
  'comida-corrida':      { title: 'Comida Corrida', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Menú del día completo para comedores industriales y eventos de empresa.' },
  'coffee-break':        { title: 'Coffee Break', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Café de especialidad, pastelería y snacks para eventos corporativos.' },
  'bocadillos':          { title: 'Bocadillos', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Bocadillos gourmet para cócteles y recepciones elegantes.' },
  'canapes-premium':     { title: 'Canapés Premium', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Canapés de autor para bodas y eventos de lujo.' },
  'desayuno-social':     { title: 'Desayuno Social', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Brunch y desayunos para eventos matutinos y corporativos.' },
  'parrillada-argentina':{ title: 'Parrillada Argentina', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Cortes premium a la parrilla con asadores profesionales.' },
  'parrillada-tradicional':{ title: 'Parrillada Tradicional', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Parrillada mexicana para reuniones familiares y eventos.' },
  'taquiza-guisados':    { title: 'Taquiza de Guisados', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Guisados auténticos servidos en tortilla, la segunda cena más popular en bodas.' },
  'puestos-antojitos':   { title: 'Puestos de Antojitos', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Tacos, sopes, gorditas y más antojitos mexicanos para tus invitados.' },
  'puestos-quesadillas': { title: 'Puestos de Quesadillas', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Quesadillas de tortilla azul o blanca con variedad de rellenos.' },
  'carrito-snacks':      { title: 'Carrito de Snacks', cat: 'Banquetes & Catering', img: '/images/banquete-hero.png', desc: 'Carrito de snacks dulces y salados para eventos y fiestas.' },
  // Bebidas
  'barra-bebidas':       { title: 'Barra de Bebidas', cat: 'Barras de Bebidas', img: '/images/banquete-hero.png', desc: 'Aguas frescas, refrescos, jugos naturales y bebidas personalizadas para tus invitados.' },
  'barra-mocteles':      { title: 'Barra de Mocteles', cat: 'Barras de Bebidas', img: '/images/banquete-hero.png', desc: 'Bebidas sin alcohol inspiradas en cócteles clásicos, elegantes y deliciosas.' },
  'cocteles-mixologia':  { title: 'Cocteles y Mixología', cat: 'Barras de Bebidas', img: '/images/banquete-hero.png', desc: 'Bartenders profesionales con carta de cócteles artesanales y show de flairtending.' },
  'barra-cafe-premium':  { title: 'Barra de Café Premium', cat: 'Barras de Bebidas', img: '/images/banquete-hero.png', desc: 'Barista certificado, máquina espresso profesional y café de especialidad.' },
  'paletas-helados':     { title: 'Paletas y Helados', cat: 'Barras de Bebidas', img: '/images/banquete-hero.png', desc: 'Carrito de paletas artesanales, helados y nieves para tus invitados.' },
  'barra-crepas':        { title: 'Barra de Crepas', cat: 'Barras de Alimentos', img: '/images/banquete-hero.png', desc: 'Crepas dulces y saladas preparadas al momento frente a tus invitados.' },
  'barra-sushi':         { title: 'Barra de Sushi y Poke Bowl', cat: 'Barras de Alimentos', img: '/images/banquete-hero.png', desc: 'Sushi rolls, nigiri y poke bowls preparados por chef japonés.' },
  'barra-mariscos':      { title: 'Barra de Mariscos', cat: 'Barras de Alimentos', img: '/images/banquete-hero.png', desc: 'Cocteles de camarón, ostiones y ceviche fresco al momento.' },
  'barra-paninis':       { title: 'Barra de Paninis', cat: 'Barras de Alimentos', img: '/images/banquete-hero.png', desc: 'Paninis artesanales con pan fresco e ingredientes gourmet.' },
  'barra-pastas':        { title: 'Barra de Pastas', cat: 'Barras de Alimentos', img: '/images/banquete-hero.png', desc: 'Pastas italianas preparadas al momento con diferentes salsas.' },
  'barra-pizzas':        { title: 'Barra de Pizzas', cat: 'Barras de Alimentos', img: '/images/banquete-hero.png', desc: 'Pizzas artesanales al horno con variedad de ingredientes.' },
  'barra-americana':     { title: 'Barra Americana', cat: 'Barras de Alimentos', img: '/images/banquete-hero.png', desc: 'Hamburguesas, hot dogs y papas para eventos y fiestas.' },
  'barra-yucateca':      { title: 'Barra Yucateca', cat: 'Barras de Alimentos', img: '/images/banquete-hero.png', desc: 'Cochinita pibil, salbutes y panuchos auténticos yucatecos.' },
  // Mesas dulces
  'mesa-dulces':         { title: 'Mesa de Dulces', cat: 'Mesas Personalizadas', img: '/images/banquete-hero.png', desc: 'Mesa temática con dulces artesanales, chocolates y macarons en los colores de tu evento.' },
  'mesa-postres':        { title: 'Mesa de Postres', cat: 'Mesas Personalizadas', img: '/images/banquete-hero.png', desc: 'Pasteles de autor, mousse, tartaletas y postres finos.' },
  'mesa-quesos':         { title: 'Mesa de Quesos', cat: 'Mesas Personalizadas', img: '/images/banquete-hero.png', desc: 'Selección de quesos europeos, embutidos y frutos secos gourmet.' },
  'cupcakes-gourmet':    { title: 'Cupcakes Gourmet', cat: 'Mesas Personalizadas', img: '/images/banquete-hero.png', desc: 'Cupcakes de autor decorados a mano con la temática de tu evento.' },
  // Eventos
  'bodas':               { title: 'Servicios para Bodas', cat: 'Tipo de Evento', img: '/images/banquete-hero.png', desc: 'Todo lo que necesitas para la boda de tus sueños en un solo lugar.' },
  'corporativos':        { title: 'Eventos Corporativos', cat: 'Tipo de Evento', img: '/images/banquete-hero.png', desc: 'Catering, mobiliario y logística para eventos empresariales.' },
  'xv-anos':             { title: 'XV Años', cat: 'Tipo de Evento', img: '/images/banquete-hero.png', desc: 'El festejo de quince años más especial de tu vida.' },
  'baby-shower':         { title: 'Baby Shower', cat: 'Tipo de Evento', img: '/images/banquete-hero.png', desc: 'Celebra la llegada de tu bebé con estilo y elegancia.' },
  'cumpleanos':          { title: 'Cumpleaños', cat: 'Tipo de Evento', img: '/images/banquete-hero.png', desc: 'Fiestas de cumpleaños para todas las edades.' },
  'primera-comunion':    { title: 'Primera Comunión', cat: 'Tipo de Evento', img: '/images/banquete-hero.png', desc: 'Un día sagrado, una celebración perfecta.' },
  'cenas':               { title: 'Cenas de Gala', cat: 'Tipo de Evento', img: '/images/banquete-hero.png', desc: 'Cenas memorables para ocasiones especiales.' },
  'graduaciones':        { title: 'Graduaciones', cat: 'Tipo de Evento', img: '/images/banquete-hero.png', desc: 'Celebra el logro con una fiesta que estará en tus recuerdos.' },
  // Cities
  'ciudad-de-mexico':    { title: 'Eventos en Ciudad de México', cat: 'Ciudad', img: '/images/hero-bg-new.png', desc: 'Banquetes, catering y mobiliario para eventos en la CDMX y área metropolitana.' },
  'guadalajara':         { title: 'Eventos en Guadalajara', cat: 'Ciudad', img: '/images/hero-bg-new.png', desc: 'Servicios de catering y organización de eventos en Guadalajara, Jalisco.' },
  'monterrey':           { title: 'Eventos en Monterrey', cat: 'Ciudad', img: '/images/hero-bg-new.png', desc: 'Banquetes y eventos premium en Monterrey y área metropolitana.' },
  'queretaro':           { title: 'Eventos en Querétaro', cat: 'Ciudad', img: '/images/hero-bg-new.png', desc: 'Catering y organización de eventos en Querétaro.' },
  'puebla':              { title: 'Eventos en Puebla', cat: 'Ciudad', img: '/images/hero-bg-new.png', desc: 'Servicios para bodas y eventos en Puebla.' },
  'cancun':              { title: 'Eventos en Cancún', cat: 'Ciudad', img: '/images/hero-bg-new.png', desc: 'Bodas de destino y eventos en Cancún y Riviera Maya.' },
}

const RELATED_BY_CAT = {
  'Banquetes & Catering': [
    { name: 'Ver todos los banquetes', href: '/banquetes-catering' },
    { name: 'Barra de Bebidas', href: '/barra-bebidas' },
    { name: 'Taquiza de Guisados', href: '/taquiza-guisados' },
    { name: 'Paella', href: '/paella' },
  ],
  'Barras de Bebidas': [
    { name: 'Ver todas las barras', href: '/barras-de-bebidas' },
    { name: 'Cocteles y Mixología', href: '/cocteles-mixologia' },
    { name: 'Barra de Café Premium', href: '/barra-cafe-premium' },
  ],
  'Barras de Alimentos': [
    { name: 'Ver barras de alimentos', href: '/banquetes-catering' },
    { name: 'Barra de Sushi', href: '/barra-sushi' },
    { name: 'Barra de Crepas', href: '/barra-crepas' },
  ],
  'Mesas Personalizadas': [
    { name: 'Ver mesas personalizadas', href: '/mesas-personalizadas' },
    { name: 'Mesa de Dulces', href: '/mesa-dulces' },
    { name: 'Mesa de Postres', href: '/mesa-postres' },
  ],
  'Tipo de Evento': [
    { name: 'Bodas', href: '/bodas' },
    { name: 'Corporativos', href: '/corporativos' },
    { name: 'XV Años', href: '/xv-anos' },
    { name: 'Baby Shower', href: '/baby-shower' },
  ],
  'Ciudad': [
    { name: 'CDMX', href: '/ciudad-de-mexico' },
    { name: 'Guadalajara', href: '/guadalajara' },
    { name: 'Monterrey', href: '/monterrey' },
    { name: 'Querétaro', href: '/queretaro' },
  ],
}

export default function ServicePage({ slug, params }) {
  const { city } = useCity()
  // Handle params from App.jsx routing
  const resolvedSlug = slug || params?.slug || params?.chairSlug || params?.mesaSlug || ''
  const data = SERVICE_DATA[resolvedSlug]
  const cityLabel = city ? ` en ${city.name}` : ''
  const waMsg = `Hola, me interesa cotizar: ${data?.title || resolvedSlug}${cityLabel}`
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(waMsg)}`
  const related = RELATED_BY_CAT[data?.cat] || []

  if (!data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 bg-[#f5efe8]">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🔧</div>
          <h1 className="font-serif text-2xl font-bold text-[#162040] mb-3">Página en preparación</h1>
          <p className="text-gray-500 font-serif mb-8">Estamos preparando esta página. Por ahora puedes cotizar directamente por WhatsApp.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold font-serif px-6 py-3 rounded-xl hover:bg-green-500 transition-colors">
              Cotizar por WhatsApp
            </a>
            <Link href="/" className="flex items-center justify-center border border-[#162040]/20 text-[#162040] font-serif font-semibold px-6 py-3 rounded-xl hover:bg-[#162040]/5 transition-colors">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#162040] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50 mb-6 font-serif flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/60">{data.cat}</span>
            <span>/</span>
            <span className="text-white/80">{data.title}</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            {data.title}{cityLabel}
          </h1>
          <p className="text-lg text-white/75 font-serif max-w-2xl mx-auto mb-8">{data.desc}</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-green-500 text-white px-7 py-3.5 rounded-xl font-bold font-serif transition-all duration-300 hover:scale-105">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Cotizar por WhatsApp
          </a>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#f5efe8] border-b border-[#162040]/10 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-6 justify-center text-sm font-serif text-[#162040]/70">
          <span>✓ Sin compromiso</span>
          <span>·</span>
          <span>✓ Respuesta en menos de 2 horas</span>
          <span>·</span>
          <span>✓ +1,000 eventos realizados</span>
          <span>·</span>
          <span>✓ Garantía Bodasesor</span>
        </div>
      </section>

      {/* Hero image */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden h-64 md:h-96 bg-gray-100">
            <img src={img(data.img)} alt={data.title}
              className="w-full h-full object-cover"
              onError={e => { e.target.src = img('/images/banquete-hero.png') }} />
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="py-12 px-4 bg-[#f5efe8]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-[#162040] mb-6">Servicios relacionados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map(r => (
                <Link key={r.href} href={r.href}
                  className="bg-white border border-[#162040]/10 rounded-xl px-4 py-3 text-sm font-serif text-[#162040] hover:border-[#162040]/30 hover:shadow-md transition-all text-center">
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-[#162040] py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
            ¿Listo para cotizar {data.title.toLowerCase()}{cityLabel}?
          </h2>
          <p className="text-white/70 font-serif mb-6">
            Solicita tu presupuesto personalizado sin compromiso. Respuesta en menos de 2 horas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-[#f5efe8] text-[#162040] px-7 py-3 rounded-xl font-bold font-serif transition-all hover:scale-105">
              Cotizar por WhatsApp
            </a>
            <a href="tel:5215540080373"
              className="flex items-center gap-2 border-2 border-white/40 text-white px-7 py-3 rounded-xl font-semibold font-serif hover:bg-white hover:text-[#162040] transition-all">
              Llamar ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
