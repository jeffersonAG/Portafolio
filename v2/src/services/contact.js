const EMAILJS_URL = 'https://api.emailjs.com/api/v1.0/email/send';

// EmailJS expects these public identifiers in browser requests, never a private key.
const EMAILJS_CONFIG = {
  service_id: 'service_z9vbgm4',
  template_id: 'template_1s6v73e',
  user_id: '9IiEnFsf94JAoczav',
};

export class ContactError extends Error {
  constructor(message, { status = 0, details = '' } = {}) {
    super(message);
    this.name = 'ContactError';
    this.status = status;
    this.details = String(details).replace(/\s+/g, ' ').trim().slice(0, 500);
  }
}

function providerError(status, details) {
  let message = 'El servicio de correo no pudo procesar el envío. Inténtalo más tarde.';

  if (status === 401 || status === 403) {
    message = 'El servicio de correo no autorizó el envío desde esta página.';
  } else if (status === 400 || status === 404 || status === 412 || status === 422) {
    message = 'El servicio de correo necesita una revisión de su configuración.';
  } else if (status === 429) {
    message = 'Se alcanzó el límite de envíos. Espera antes de volver a intentarlo.';
  }

  return new ContactError(message, { status, details });
}

export async function sendContactMessage(fields, {
  fetchImpl = globalThis.fetch,
  timeoutMs = 15000,
  protocol = globalThis.location?.protocol,
} = {}) {
  const name = String(fields.name ?? '').trim();
  const email = String(fields.email ?? '').trim();
  const message = String(fields.message ?? '').trim();

  if (!name || !email || !message) {
    throw new ContactError('Completa nombre, correo y mensaje antes de enviar.');
  }

  if (protocol === 'file:') {
    throw new ContactError('Abre el portafolio desde su dirección web o un servidor local para enviar mensajes.', {
      details: 'El formulario no puede enviar desde un archivo abierto con file://. Usa npm run dev o npm run preview.',
    });
  }

  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetchImpl(EMAILJS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        ...EMAILJS_CONFIG,
        template_params: {
          name,
          email,
          message,
          subject: 'Solicitud de contacto desde Portfolio V2',
        },
      }),
    });
    const details = await response.text();

    if (!response.ok) throw providerError(response.status, details);
    return { status: response.status };
  } catch (error) {
    if (error instanceof ContactError) throw error;
    if (timedOut) {
      throw new ContactError('El servicio tardó demasiado en responder. Tu mensaje se conserva; evita reenviarlo varias veces.', {
        details: 'No se recibió una confirmación a tiempo. No se realizó ningún reintento automático.',
      });
    }
    throw new ContactError('No se pudo conectar con el servicio de correo. Comprueba tu conexión e inténtalo de nuevo.', {
      details: error instanceof Error ? error.message : 'La conexión con EmailJS no se pudo completar.',
    });
  } finally {
    clearTimeout(timeout);
  }
}
