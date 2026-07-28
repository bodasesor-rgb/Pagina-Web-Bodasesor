import CityLink from '../components/CityLink'
import Breadcrumbs from '../components/Breadcrumbs'

const Link = CityLink

type LegalKind = 'privacidad' | 'terminos'

const CONTENT: Record<
  LegalKind,
  { title: string; updated: string; sections: Array<{ h: string; p: string[] }> }
> = {
  privacidad: {
    title: 'Aviso de Privacidad',
    updated: '23 de julio de 2026',
    sections: [
      {
        h: 'Responsable del tratamiento',
        p: [
          'Bodasesor Eventos (“Bodasesor”), con operaciones en Ciudad de México, México, es responsable del uso y protección de tus datos personales. Contacto: hola@bodasesor.com y teléfono 55 4008 0373.',
        ],
      },
      {
        h: 'Datos que recabamos',
        p: [
          'Podemos recabar nombre, teléfono, correo electrónico, ciudad del evento, fecha tentativa y detalles de cotización cuando nos contactas por WhatsApp, formulario, teléfono o correo.',
          'También utilizamos datos técnicos de navegación (páginas visitadas, dispositivo) a través de herramientas de analítica como Google Analytics, para mejorar el sitio.',
        ],
      },
      {
        h: 'Finalidad',
        p: [
          'Usamos tus datos para responder cotizaciones, coordinar servicios de banquetes y eventos, dar seguimiento comercial y mejorar la experiencia del sitio.',
          'No vendemos tu información a terceros. Podemos compartirla solo con proveedores necesarios para prestar el servicio (por ejemplo, logística o producción), bajo confidencialidad.',
        ],
      },
      {
        h: 'Derechos ARCO y contacto',
        p: [
          'Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos escribiendo a hola@bodasesor.com o por WhatsApp al 55 4008 0373.',
          'Conservamos la información el tiempo necesario para la relación comercial y las obligaciones legales aplicables.',
        ],
      },
    ],
  },
  terminos: {
    title: 'Términos y Condiciones',
    updated: '23 de julio de 2026',
    sections: [
      {
        h: 'Uso del sitio',
        p: [
          'Este sitio web informa sobre servicios de banquetes, catering, mobiliario y producción de eventos ofrecidos por Bodasesor en México. Al usarlo aceptas estos términos.',
          'Los contenidos son orientativos. Precios, disponibilidad y alcances se confirman únicamente en una cotización formal.',
        ],
      },
      {
        h: 'Cotizaciones y servicios',
        p: [
          'Una cotización por WhatsApp, teléfono o correo no constituye contrato hasta que ambas partes confirmen por escrito alcance, fechas, montos y condiciones de pago.',
          'Bodasesor puede rechazar o ajustar servicios por disponibilidad, ubicación, seguridad o requisitos del venue.',
        ],
      },
      {
        h: 'Propiedad intelectual',
        p: [
          'Textos, marcas, fotografías y diseños del sitio pertenecen a Bodasesor o a sus licenciantes. No está permitido copiarlos para uso comercial sin autorización.',
        ],
      },
      {
        h: 'Contacto',
        p: [
          'Para dudas sobre estos términos: hola@bodasesor.com · 55 4008 0373 · Ciudad de México, México.',
        ],
      },
    ],
  },
}

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const data = CONTENT[kind]

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#162040] text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            variant="dark"
            className="mb-4"
            items={[
              { name: 'Inicio', href: '/' },
              { name: 'Quiénes somos', href: '/quienes-somos' },
              { name: data.title },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-serif font-bold">{data.title}</h1>
          <p className="text-white/70 font-serif mt-3 text-sm">Última actualización: {data.updated}</p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {data.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-serif font-bold text-[#162040] mb-3">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para.slice(0, 40)} className="text-gray-700 font-serif leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </section>
        ))}
        <p className="text-sm text-gray-500 font-serif pt-4 border-t border-gray-100">
          También puedes leer{' '}
          <Link href="/quienes-somos" className="text-[#162040] underline">
            Quiénes somos
          </Link>{' '}
          o contactarnos para cotizar tu evento.
        </p>
      </article>
    </div>
  )
}
