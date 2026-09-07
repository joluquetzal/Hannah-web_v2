/**
 * Spanish (Mexico) — the source of truth. Every key here MUST exist in `en.ts`
 * with a translation; `en.ts` is typed `satisfies Dictionary`, so a missing or
 * misshaped key fails the build. See `.claude/rules/content-i18n.md`.
 */
export const es = {
  site: {
    tagline: "Clínica de belleza y estética",
    description:
      "Clínica de belleza y estética en México. Faciales, masajes y tratamientos especiales en un espacio pensado para el cuidado de tu piel.",
  },

  nav: {
    primaryLabel: "Principal",
    mobileLabel: "Menú móvil",
    skipToContent: "Saltar al contenido",
    home: "Inicio",
    services: "Servicios",
    about: "Nosotros",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    servicesMenuHeading: "Nuestros servicios",
    servicesViewAll: "Ver todos",
    servicesViewAllLong: "Ver todos los servicios",
    servicesCardCta: "Ver tratamientos",
  },

  langSwitch: {
    label: "Idioma",
    es: "ES",
    en: "EN",
    toEs: "Ver en español",
    toEn: "View in English",
  },

  home: {
    title: "El cuidado de tu piel, como un ritual",
    lead: "Faciales, masajes y tratamientos estéticos en un espacio pensado para detenerte, respirar y volver a ti.",
    ctaServices: "Ver servicios",
    ctaContact: "Contacto",
  },

  servicios: {
    title: "Servicios",
    lead: "Tres formas de cuidar tu piel y tu bienestar. Elige una categoría para conocer los tratamientos.",
  },

  categories: {
    faciales: {
      title: "Faciales",
      lead: "Seis faciales para hidratar, equilibrar y rejuvenecer según tu tipo de piel.",
    },
    masajes: {
      title: "Masajes",
      lead: "Cuatro masajes para relajar el cuerpo, aliviar la tensión muscular y renovar la energía.",
    },
    especiales: {
      title: "Especiales",
      lead: "Cuatro tratamientos avanzados para hidratar en profundidad y tensar la piel del rostro.",
    },
  },

  treatment: {
    includes: "Incluye",
    zones: "Zonas",
    recommendation: "Recomendación:",
    cta: "Agendar cita",
    signature: "Tratamiento insignia",
  },

  nosotros: {
    eyebrow: "Nosotros",
    title: "Un espacio para el cuidado, sin prisa",
    intro:
      "HannaH es una clínica de belleza y estética en México. Combinamos aparatología, cosmética profesional y un trato cercano para cuidar la piel y el bienestar de cada persona que nos visita.",
    philosophyTitle: "Filosofía",
    philosophy1:
      "Creemos en los resultados que se construyen con constancia y en tratamientos diseñados para cada tipo de piel. Nada de fórmulas genéricas: primero escuchamos, después proponemos.",
    philosophy2:
      "Cada sesión es también una pausa. Un momento para bajar el ritmo y reconectar con una misma.",
    teamTitle: "Equipo",
    team1:
      "Un equipo de especialistas en estética facial y corporal, en formación continua para ofrecer técnicas actuales y seguras.",
    teamNote: "(Perfiles del equipo pendientes de contenido del cliente.)",
    talkTitle: "¿Hablamos?",
    talkBody: "Cuéntanos qué necesitas y te respondemos pronto.",
    talkCta: "Contáctanos",
  },

  contacto: {
    title: "Contacto",
    lead: "Déjanos un mensaje con tus datos y te respondemos lo antes posible.",
  },

  clinic: {
    visitUs: "Visítanos",
    phone: "Teléfono",
    hours: "Horario",
    whatsapp: "WhatsApp",
    social: "Redes",
    whatsappCta: "Escríbenos",
    mapCta: "Abrir en Google Maps",
    mapPending: "Mapa pendiente",
    mapTitle: "Ubicación de HannaH en el mapa",
    hoursSummary:
      "Lunes a viernes de 9:00 a 19:00 h · Sábado de 9:00 a 14:00 h · Domingo cerrado",
    schedule: [
      { days: "Lunes a viernes", time: "9:00 – 19:00 h" },
      { days: "Sábado", time: "9:00 – 14:00 h" },
      { days: "Domingo", time: "Cerrado" },
    ],
  },

  form: {
    nombre: "Nombre",
    nombrePlaceholder: "Tu nombre completo",
    telefono: "Teléfono",
    telefonoPlaceholder: "55 1234 5678",
    servicio: "Servicio",
    servicioPlaceholder: "¿Qué servicio te interesa?",
    servicioFaciales: "Faciales",
    servicioMasajes: "Masajes",
    servicioEspeciales: "Especiales",
    servicioOtro: "Otro / No sé aún",
    email: "Correo electrónico",
    emailPlaceholder: "tu@correo.com",
    optional: "Opcional",
    mensaje: "Mensaje",
    mensajePlaceholder: "¿En qué podemos ayudarte?",
    charsLeftSuffix: "restantes",
    submit: "Enviar mensaje",
    submitting: "Enviando…",
    successTitle: "Gracias.",
    successBody: "Recibimos tu mensaje y te responderemos lo antes posible.",
    successAgain: "Enviar otro mensaje",
    errorLead: "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por",
    errorWhatsApp: "WhatsApp",
    errors: {
      nombreRequired: "Escribe tu nombre.",
      nombreShort: "El nombre es demasiado corto.",
      nombreLong: "El nombre es demasiado largo.",
      nombreInvalid: "Escribe un nombre válido.",
      nombreNoDigits: "El nombre no debe llevar números.",
      emailInvalid: "Revisa tu correo electrónico.",
      telefonoRequired: "Escribe tu teléfono.",
      telefonoShort: "Debe tener al menos 10 dígitos.",
      telefonoLong: "Tiene demasiados dígitos.",
      servicioRequired: "Selecciona el servicio que te interesa.",
      mensajeRequired: "Escribe tu mensaje.",
      mensajeLongPrefix: "Máximo",
      mensajeLongSuffix: "caracteres.",
    },
  },

  footer: {
    contact: "Contacto",
    visitUs: "Visítanos",
    rights: "Todos los derechos reservados.",
    contactCta: "Contáctanos",
  },

  notFound: {
    eyebrow: "Error 404",
    title: "Esta página no existe",
    body: "Puede que el enlace esté roto o que la página se haya movido.",
    home: "Volver al inicio",
    services: "Ver servicios",
  },

  meta: {
    home: {
      title: "HannaH — Clínica de belleza y estética",
      description:
        "Clínica de belleza y estética en México. Faciales, masajes y tratamientos especiales en un espacio pensado para el cuidado de tu piel.",
    },
    servicios: {
      title: "Servicios",
      description:
        "Faciales, masajes y tratamientos especiales en HannaH, clínica de belleza y estética.",
    },
    faciales: {
      title: "Faciales",
      description:
        "Tratamientos faciales en HannaH: hidratante, anti acné, hidrodermoabrasión, Facial HannaH, rejuvenecedor y microdermoabrasión.",
    },
    masajes: {
      title: "Masajes",
      description:
        "Masajes en HannaH: relajante, piedras calientes, deportivo y modelador.",
    },
    especiales: {
      title: "Especiales",
      description:
        "Tratamientos especiales en HannaH: skin booster, hilos tensores, nanobotox y mesobotox.",
    },
    nosotros: {
      title: "Nosotros",
      description:
        "Conoce HannaH: nuestra filosofía, el equipo y la forma en que cuidamos tu piel.",
    },
    contacto: {
      title: "Contacto",
      description:
        "Ponte en contacto con HannaH. Escríbenos y te respondemos pronto. Dirección, teléfono, horarios y WhatsApp.",
    },
    notFound: { title: "Página no encontrada" },
  },
} as const;

/** Widen string literals to `string` and drop `readonly` so `en.ts` can
 *  `satisfies Dictionary` — same shape and keys, different values. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : { -readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof es>;
