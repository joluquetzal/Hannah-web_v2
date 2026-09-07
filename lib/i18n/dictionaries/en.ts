import type { Dictionary } from "./es";

/**
 * English (US). Translated from `es.ts`, which is the source of truth. Keep the
 * keys in lockstep — `satisfies Dictionary` fails the build if any drift.
 * Aesthetic / clinical terms (treatment "includes" lists especially) are a
 * best effort and want a native review.
 */
export const en = {
  site: {
    tagline: "Beauty & aesthetics clinic",
    description:
      "Beauty and aesthetics clinic in Mexico City. Facials, massages and special treatments in a space designed for caring for your skin.",
  },

  nav: {
    primaryLabel: "Primary",
    mobileLabel: "Mobile menu",
    skipToContent: "Skip to content",
    home: "Home",
    services: "Services",
    about: "About",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    servicesMenuHeading: "Our services",
    servicesViewAll: "View all",
    servicesViewAllLong: "View all services",
    servicesCardCta: "View treatments",
  },

  langSwitch: {
    label: "Language",
    es: "ES",
    en: "EN",
    toEs: "Ver en español",
    toEn: "View in English",
  },

  home: {
    title: "Caring for your skin, like a ritual",
    lead: "Facials, massages and aesthetic treatments in a space designed to help you slow down, breathe and return to yourself.",
    ctaServices: "View services",
    ctaContact: "Contact",
  },

  servicios: {
    title: "Services",
    lead: "Three ways to care for your skin and wellbeing. Choose a category to see the treatments.",
  },

  categories: {
    faciales: {
      title: "Facials",
      lead: "Six facials to hydrate, balance and rejuvenate according to your skin type.",
    },
    masajes: {
      title: "Massages",
      lead: "Four massages to relax the body, ease muscle tension and restore your energy.",
    },
    especiales: {
      title: "Special treatments",
      lead: "Four advanced treatments to deeply hydrate and firm the skin of the face.",
    },
  },

  treatment: {
    includes: "Includes",
    zones: "Areas",
    recommendation: "Recommended:",
    cta: "Book an appointment",
    signature: "Signature treatment",
  },

  nosotros: {
    eyebrow: "About",
    title: "A space for unhurried care",
    intro:
      "HannaH is a beauty and aesthetics clinic in Mexico City. We combine technology, professional skincare and a personal touch to care for the skin and wellbeing of everyone who visits us.",
    philosophyTitle: "Philosophy",
    philosophy1:
      "We believe in results built through consistency and in treatments designed for each skin type. No generic formulas: first we listen, then we advise.",
    philosophy2:
      "Every session is also a pause. A moment to slow down and reconnect with yourself.",
    teamTitle: "Team",
    team1:
      "A team of specialists in facial and body aesthetics, in continuous training to offer current, safe techniques.",
    teamNote: "(Team profiles pending client content.)",
    talkTitle: "Shall we talk?",
    talkBody: "Tell us what you need and we'll get back to you soon.",
    talkCta: "Get in touch",
  },

  contacto: {
    title: "Contact",
    lead: "Leave us a message with your details and we'll get back to you as soon as possible.",
  },

  clinic: {
    visitUs: "Visit us",
    phone: "Phone",
    hours: "Hours",
    whatsapp: "WhatsApp",
    social: "Social",
    whatsappCta: "Message us",
    mapCta: "Open in Google Maps",
    mapPending: "Map coming soon",
    mapTitle: "HannaH's location on the map",
    hoursSummary:
      "Monday to Friday, 9:00 am – 7:00 pm · Saturday, 9:00 am – 2:00 pm · Sunday closed",
    schedule: [
      { days: "Monday to Friday", time: "9:00 am – 7:00 pm" },
      { days: "Saturday", time: "9:00 am – 2:00 pm" },
      { days: "Sunday", time: "Closed" },
    ],
  },

  form: {
    nombre: "Name",
    nombrePlaceholder: "Your full name",
    telefono: "Phone",
    telefonoPlaceholder: "55 1234 5678",
    servicio: "Service",
    servicioPlaceholder: "Which service are you interested in?",
    servicioFaciales: "Facials",
    servicioMasajes: "Massages",
    servicioEspeciales: "Special treatments",
    servicioOtro: "Other / Not sure yet",
    email: "Email",
    emailPlaceholder: "you@email.com",
    optional: "Optional",
    mensaje: "Message",
    mensajePlaceholder: "How can we help you?",
    charsLeftSuffix: "left",
    submit: "Send message",
    submitting: "Sending…",
    successTitle: "Thank you.",
    successBody:
      "We've received your message and will get back to you as soon as possible.",
    successAgain: "Send another message",
    errorLead: "We couldn't send your message. Please try again or reach us on",
    errorWhatsApp: "WhatsApp",
    errors: {
      nombreRequired: "Please enter your name.",
      nombreShort: "That name is too short.",
      nombreLong: "That name is too long.",
      nombreInvalid: "Please enter a valid name.",
      nombreNoDigits: "The name shouldn't contain numbers.",
      emailInvalid: "Please check your email address.",
      telefonoRequired: "Please enter your phone number.",
      telefonoShort: "It must have at least 10 digits.",
      telefonoLong: "That's too many digits.",
      servicioRequired: "Please select the service you're interested in.",
      mensajeRequired: "Please enter your message.",
      mensajeLongPrefix: "Maximum",
      mensajeLongSuffix: "characters.",
    },
  },

  footer: {
    contact: "Contact",
    visitUs: "Visit us",
    rights: "All rights reserved.",
    contactCta: "Get in touch",
  },

  notFound: {
    eyebrow: "Error 404",
    title: "This page doesn't exist",
    body: "The link may be broken or the page may have moved.",
    home: "Back to home",
    services: "View services",
  },

  meta: {
    home: {
      title: "HannaH — Beauty & aesthetics clinic",
      description:
        "Beauty and aesthetics clinic in Mexico City. Facials, massages and special treatments in a space designed for caring for your skin.",
    },
    servicios: {
      title: "Services",
      description:
        "Facials, massages and special treatments at HannaH, a beauty and aesthetics clinic.",
    },
    faciales: {
      title: "Facials",
      description:
        "Facial treatments at HannaH: hydrating, anti-acne, hydradermabrasion, Facial HannaH, rejuvenating and microdermabrasion.",
    },
    masajes: {
      title: "Massages",
      description:
        "Massages at HannaH: relaxing, hot stone, sports and body-contouring.",
    },
    especiales: {
      title: "Special treatments",
      description:
        "Special treatments at HannaH: skin booster, tensor threads, nanobotox and mesobotox.",
    },
    nosotros: {
      title: "About",
      description:
        "Meet HannaH: our philosophy, our team and the way we care for your skin.",
    },
    contacto: {
      title: "Contact",
      description:
        "Get in touch with HannaH. Message us and we'll reply soon. Address, phone, hours and WhatsApp.",
    },
    notFound: { title: "Page not found" },
  },
} as const satisfies Dictionary;
