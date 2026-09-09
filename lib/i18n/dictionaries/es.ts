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
    privacyBefore: "Al enviar, aceptas nuestro ",
    privacyLink: "Aviso de Privacidad",
    privacyAfter: ".",
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
    privacy: "Aviso de Privacidad",
    terms: "Términos y Condiciones",
  },

  legal: {
    placeholderNote:
      "Borrador — texto de ejemplo pendiente de revisión y aprobación legal del cliente. No publicar en producción sin validar los datos entre corchetes.",
    lastUpdatedLabel: "Última actualización:",
    lastUpdated: "[fecha]",
    privacy: {
      title: "Aviso de Privacidad",
      intro:
        "En HannaH valoramos tu privacidad. Este aviso describe cómo recabamos, usamos y protegemos tus datos personales cuando te pones en contacto con nosotros a través de este sitio.",
      sections: [
        {
          heading: "Responsable de tus datos personales",
          body: [
            "[Razón social del responsable] (en adelante, «HannaH» o «el Responsable»), con domicilio en Eugenia 1309, Col. Narvarte, Ciudad de México, C.P. 03020, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y demás normativa aplicable.",
          ],
        },
        {
          heading: "Datos personales que recabamos",
          body: [
            "Cuando utilizas nuestro formulario de contacto recabamos: nombre, número de teléfono, correo electrónico (opcional), el servicio de tu interés y el contenido del mensaje que decidas enviarnos.",
            "No recabamos datos personales sensibles a través del sitio. Te pedimos no incluir información sobre tu salud u otros datos sensibles en el campo de mensaje.",
          ],
        },
        {
          heading: "Finalidades del tratamiento",
          body: [
            "Finalidades primarias: dar respuesta a tus solicitudes de información, contactarte para coordinar una cita y darte seguimiento como cliente o prospecto.",
            "Finalidades secundarias: enviarte información sobre promociones, servicios y novedades de HannaH. Puedes oponerte a las finalidades secundarias en cualquier momento escribiendo a [correo de contacto de privacidad].",
          ],
        },
        {
          heading: "Transferencias de datos",
          body: [
            "Para el envío y la gestión de los mensajes del formulario utilizamos el servicio de un tercero (EmailJS, operado desde los Estados Unidos de América).",
            "Fuera de lo anterior, no transferimos tus datos personales a terceros sin tu consentimiento, salvo en los casos previstos por el artículo 37 de la LFPDPPP.",
          ],
        },
        {
          heading: "Derechos ARCO",
          body: [
            "Tienes derecho a acceder, rectificar y cancelar tus datos personales, así como a oponerte a su tratamiento. Para ejercer estos derechos, envía tu solicitud a [correo de contacto de privacidad] indicando tu nombre, los datos sobre los que deseas ejercer el derecho y una descripción clara de tu petición. Responderemos en los plazos que establece la LFPDPPP.",
          ],
        },
        {
          heading: "Medios para limitar el uso o la divulgación",
          body: [
            "Puedes solicitar que limitemos el uso o la divulgación de tus datos escribiendo a [correo de contacto de privacidad]. Asimismo, puedes inscribirte en el Registro Público para Evitar Publicidad (REPEP) de la PROFECO en https://repep.profeco.gob.mx.",
          ],
        },
        {
          heading: "Cookies y tecnologías de rastreo",
          body: [
            "Actualmente este sitio no utiliza cookies ni tecnologías de rastreo con fines de analítica o publicidad. Si esto cambia, actualizaremos este aviso y, en su caso, solicitaremos tu consentimiento.",
          ],
        },
        {
          heading: "Cambios al aviso de privacidad",
          body: [
            "Nos reservamos el derecho de modificar este aviso de privacidad. Cualquier cambio se publicará en esta misma página, indicando la fecha de última actualización.",
          ],
        },
        {
          heading: "Contacto",
          body: [
            "Para cualquier duda sobre este aviso o el tratamiento de tus datos, contáctanos en [correo de contacto de privacidad] o al [teléfono].",
          ],
        },
      ],
    },
    terms: {
      title: "Términos y Condiciones",
      intro:
        "El acceso y uso de este sitio web (el «Sitio») implica la aceptación de los presentes Términos y Condiciones. Si no estás de acuerdo, te pedimos no utilizar el Sitio.",
      sections: [
        {
          heading: "Objeto del Sitio",
          body: [
            "El Sitio tiene carácter informativo y de presentación de los servicios de HannaH, clínica de belleza y estética ubicada en la Ciudad de México. No permite realizar compras, pagos ni reservaciones en línea.",
          ],
        },
        {
          heading: "La información no constituye asesoría médica",
          body: [
            "La información publicada en el Sitio es de carácter general y no sustituye la consulta, el diagnóstico ni el tratamiento con un profesional de la salud calificado. Antes de contratar cualquier tratamiento se realizará una valoración individual.",
          ],
        },
        {
          heading: "Resultados de los tratamientos",
          body: [
            "Los resultados de los tratamientos estéticos varían de una persona a otra y dependen de factores individuales. Las imágenes y descripciones del Sitio son ilustrativas y no constituyen una garantía de resultados.",
          ],
        },
        {
          heading: "Propiedad intelectual",
          body: [
            "Los textos, imágenes, logotipos, marcas y demás contenidos del Sitio son propiedad de HannaH o de sus titulares y están protegidos por la legislación aplicable. No se permite su reproducción o uso sin autorización previa por escrito.",
          ],
        },
        {
          heading: "Enlaces a sitios de terceros",
          body: [
            "El Sitio puede contener enlaces a sitios de terceros (por ejemplo, redes sociales o mapas). HannaH no es responsable del contenido ni de las prácticas de privacidad de dichos sitios.",
          ],
        },
        {
          heading: "Limitación de responsabilidad",
          body: [
            "HannaH procura mantener la información del Sitio actualizada y correcta, pero no garantiza que esté libre de errores ni que el Sitio esté disponible de forma ininterrumpida. En la medida permitida por la ley, HannaH no será responsable por daños derivados del uso o de la imposibilidad de uso del Sitio.",
          ],
        },
        {
          heading: "Modificaciones",
          body: [
            "HannaH puede modificar estos Términos y Condiciones en cualquier momento. La versión vigente será la publicada en esta página.",
          ],
        },
        {
          heading: "Legislación aplicable y jurisdicción",
          body: [
            "Estos Términos y Condiciones se rigen por la legislación de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de la Ciudad de México, salvo disposición legal en contrario.",
          ],
        },
        {
          heading: "Contacto",
          body: [
            "Para cualquier duda sobre estos Términos y Condiciones, escríbenos a [correo de contacto] o al [teléfono].",
          ],
        },
      ],
    },
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
    avisoPrivacidad: {
      title: "Aviso de Privacidad",
      description:
        "Cómo HannaH recaba, usa y protege tus datos personales conforme a la LFPDPPP.",
    },
    terminos: {
      title: "Términos y Condiciones",
      description: "Condiciones de uso del sitio web de HannaH.",
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
