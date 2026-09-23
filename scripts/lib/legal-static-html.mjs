/** Static legal copy for crawlers / Google OAuth brand verification (no JS). */

export const LEGAL_STATIC = {
  '/aviso-de-privacidad': {
    h1: 'Aviso de Privacidad',
    intro:
      'Bodasesor (Bodasesor Eventos) publica este aviso para informar cómo tratamos datos personales y el uso de APIs de Google en herramientas internas del sitio.',
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
        h: 'Uso de APIs de Google',
        p: [
          'Bodasesor puede utilizar APIs de Google (por ejemplo Search Console o Indexing) con cuentas autorizadas del equipo para indexar y monitorear páginas propias de bodasesor.com. No vendemos datos de usuarios de Google a terceros.',
          'El acceso a datos de Google se limita a la operación del sitio Bodasesor y al cumplimiento de políticas de Google aplicables.',
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
  '/terminos-y-condiciones': {
    h1: 'Términos y Condiciones',
    intro:
      'Términos de uso del sitio Bodasesor (bodasesor.com) y de los servicios de banquetes, catering y eventos.',
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
        ],
      },
    ],
  },
  '/politicas-de-devoluciones': {
    h1: 'Políticas de Devoluciones',
    intro: 'Política de cancelación y devoluciones de Bodasesor según anticipación al evento.',
    sections: [
      {
        h: 'Cancelaciones',
        p: [
          'Las condiciones de anticipo, cancelación y reembolso se confirman en cada cotización formal. Contáctanos en hola@bodasesor.com o WhatsApp 55 4008 0373.',
        ],
      },
    ],
  },
}

export function renderLegalStaticHtml(path, escapeHtml) {
  const doc = LEGAL_STATIC[path]
  if (!doc) return ''
  const sections = doc.sections
    .map((s) => {
      const paras = (s.p || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('')
      return `<section><h2>${escapeHtml(s.h)}</h2>${paras}</section>`
    })
    .join('')
  return `<main id="spa-legal-prerender" style="max-width:44rem;margin:0 auto;padding:1.5rem 1rem 3rem;font-family:Georgia,serif;color:#162040;line-height:1.5">
  <p style="font-size:0.9rem;margin:0 0 1rem"><a href="/">Bodasesor</a> / ${escapeHtml(doc.h1)}</p>
  <h1 style="font-size:1.75rem;margin:0 0 1rem">${escapeHtml(doc.h1)}</h1>
  <p>${escapeHtml(doc.intro)}</p>
  ${sections}
  <p style="margin-top:2rem;font-size:0.9rem"><a href="/aviso-de-privacidad">Aviso de Privacidad</a> · <a href="/terminos-y-condiciones">Términos</a> · <a href="/">Inicio Bodasesor</a></p>
</main>`
}
