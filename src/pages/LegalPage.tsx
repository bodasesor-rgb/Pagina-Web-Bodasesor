import CityLink from '../components/CityLink'
import Breadcrumbs from '../components/Breadcrumbs'
import { usePageSeo } from '../hooks/usePageSeo'

const Link = CityLink

type LegalKind = 'privacidad' | 'terminos' | 'devoluciones'

type LegalSection = {
  h: string
  p?: string[]
  table?: { headers: [string, string]; rows: Array<[string, string]> }
}

type LegalDoc = {
  title: string
  path: string
  updated: string
  description: string
  intro?: string[]
  sections: LegalSection[]
}

const CONTENT: Record<LegalKind, LegalDoc> = {
  privacidad: {
    title: 'Aviso de Privacidad',
    path: '/aviso-de-privacidad',
    updated: '23 de julio de 2026',
    description:
      'Aviso de privacidad de Bodasesor: tratamiento de datos personales y derechos ARCO.',
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
    path: '/terminos-y-condiciones',
    updated: '23 de julio de 2026',
    description: 'Términos y condiciones de uso del sitio y servicios de Bodasesor Eventos.',
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
  devoluciones: {
    title: 'Política de Cancelación y Devoluciones',
    path: '/politicas-de-devoluciones',
    updated: '20 de agosto de 2026',
    description:
      'Política de cancelación y devoluciones de Bodasesor: reembolsos según anticipación al evento.',
    intro: [
      'En Bodasesor entendemos que en ocasiones surgen imprevistos que pueden llevar a la cancelación de nuestros servicios. Con el fin de brindar claridad y transparencia a nuestros clientes, hemos establecido la siguiente política de reembolsos, aplicable a partir de la fecha de cancelación notificada por escrito y la fecha del evento contratado.',
    ],
    sections: [
      {
        h: 'Condiciones de reembolso según anticipación',
        table: {
          headers: ['Anticipación de la cancelación', 'Reembolso aplicable'],
          rows: [
            [
              '6 meses o más antes del evento',
              '100% de los pagos realizados, excepto el anticipo inicial',
            ],
            [
              '4 meses antes del evento',
              '60% de los pagos realizados, sin incluir el primer anticipo',
            ],
            [
              '2 meses antes del evento',
              '30% de los pagos realizados, excluyendo el primer anticipo',
            ],
            [
              'Menos de 2 meses antes del evento',
              'No se reintegrará ningún pago',
            ],
          ],
        },
      },
      {
        h: 'Notas importantes',
        p: [
          'El anticipo inicial no es reembolsable bajo ninguna circunstancia, independientemente de la fecha de cancelación. Este monto cubre la reserva de la fecha y los costos administrativos asociados al inicio del servicio.',
          'El periodo de anticipación se calcula tomando como referencia la fecha del evento y el día en que se notifica formalmente la cancelación.',
          'Todas las solicitudes de cancelación deben realizarse por escrito (correo electrónico a hola@bodasesor.com, WhatsApp al 55 4008 0373 o medio equivalente) para poder procesar el reembolso correspondiente.',
          'Los reembolsos aplicables se procesarán en un plazo de 15 días hábiles a partir de la confirmación de la cancelación.',
          'Esta política aplica a cancelaciones realizadas por el cliente. Los casos de fuerza mayor podrán evaluarse de manera individual.',
        ],
      },
      {
        h: 'Contacto Bodasesor',
        p: [
          'Para solicitar una cancelación o resolver dudas sobre esta política, contáctanos:',
          'Correo: hola@bodasesor.com',
          'Teléfono / WhatsApp: 55 4008 0373',
          'Sitio: https://bodasesor.com',
          'Ciudad de México, México.',
        ],
      },
    ],
  },
}

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const data = CONTENT[kind]

  usePageSeo({
    title: data.title,
    description: data.description,
    path: data.path,
    h1: data.title,
  })

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
        {data.intro?.map((para) => (
          <p key={para.slice(0, 48)} className="text-gray-700 font-serif leading-relaxed">
            {para}
          </p>
        ))}

        {data.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-serif font-bold text-[#162040] mb-3">{s.h}</h2>
            {s.table && (
              <div className="overflow-x-auto mb-4 rounded-xl border border-[#162040]/12">
                <table className="w-full text-left font-serif text-sm md:text-base">
                  <thead className="bg-[#162040] text-white">
                    <tr>
                      <th className="px-4 py-3 font-bold">{s.table.headers[0]}</th>
                      <th className="px-4 py-3 font-bold">{s.table.headers[1]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map(([a, b]) => (
                      <tr key={a} className="border-t border-[#162040]/10 odd:bg-[#f5efe8]/40">
                        <td className="px-4 py-3 text-[#162040] font-semibold align-top">{a}</td>
                        <td className="px-4 py-3 text-gray-700 align-top">{b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.p?.map((para) => (
              <p key={para.slice(0, 40)} className="text-gray-700 font-serif leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </section>
        ))}

        <p className="text-sm text-gray-500 font-serif pt-4 border-t border-gray-100">
          También puedes leer{' '}
          <Link href="/aviso-de-privacidad" className="text-[#162040] underline">
            Aviso de Privacidad
          </Link>
          {' · '}
          <Link href="/terminos-y-condiciones" className="text-[#162040] underline">
            Términos y Condiciones
          </Link>
          {' · '}
          <Link href="/quienes-somos" className="text-[#162040] underline">
            Quiénes somos
          </Link>
          .
        </p>
      </article>
    </div>
  )
}
