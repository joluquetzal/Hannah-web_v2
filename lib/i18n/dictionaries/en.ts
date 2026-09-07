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
    privacyBefore: "By sending this, you accept our ",
    privacyLink: "Privacy Notice",
    privacyAfter: ".",
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
    privacy: "Privacy Notice",
    terms: "Terms & Conditions",
  },

  legal: {
    placeholderNote:
      "Draft — sample text pending the client's legal review and approval. Do not publish without validating the values in brackets.",
    lastUpdatedLabel: "Last updated:",
    lastUpdated: "[date]",
    privacy: {
      title: "Privacy Notice",
      intro:
        "At HannaH we value your privacy. This notice explains how we collect, use and protect your personal data when you contact us through this site.",
      sections: [
        {
          heading: "Data controller",
          body: [
            "[Legal name of the controller] (“HannaH” or “the Controller”), with address at Eugenia 1309, Col. Narvarte, Mexico City, C.P. 03020, is responsible for the processing of your personal data under Mexico's Federal Law on the Protection of Personal Data Held by Private Parties (LFPDPPP), its Regulations and other applicable rules.",
          ],
        },
        {
          heading: "Personal data we collect",
          body: [
            "When you use our contact form we collect: name, phone number, email address (optional), the service you are interested in, and the content of the message you choose to send us.",
            "We do not collect sensitive personal data through the site. Please do not include health information or other sensitive data in the message field.",
          ],
        },
        {
          heading: "Purposes of processing",
          body: [
            "Primary purposes: to respond to your requests for information, to contact you to arrange an appointment, and to follow up with you as a client or prospective client.",
            "Secondary purposes: to send you information about promotions, services and news from HannaH. You may object to the secondary purposes at any time by writing to [privacy contact email].",
          ],
        },
        {
          heading: "Data transfers",
          body: [
            "To send and manage the form messages we use a third-party service (EmailJS, operated from the United States of America).",
            "Other than the above, we do not transfer your personal data to third parties without your consent, except in the cases provided for in Article 37 of the LFPDPPP.",
          ],
        },
        {
          heading: "ARCO rights",
          body: [
            "You have the right to access, rectify and cancel your personal data, and to object to its processing. To exercise these rights, send your request to [privacy contact email] stating your name, the data concerned and a clear description of your request. We will respond within the time limits set by the LFPDPPP.",
          ],
        },
        {
          heading: "How to limit use or disclosure",
          body: [
            "You may ask us to limit the use or disclosure of your data by writing to [privacy contact email]. You may also register with PROFECO's Public Registry to Avoid Advertising (REPEP) at https://repep.profeco.gob.mx.",
          ],
        },
        {
          heading: "Cookies and tracking technologies",
          body: [
            "This site currently does not use cookies or tracking technologies for analytics or advertising. If this changes, we will update this notice and, where required, ask for your consent.",
          ],
        },
        {
          heading: "Changes to this privacy notice",
          body: [
            "We reserve the right to amend this privacy notice. Any change will be published on this page, showing the date it was last updated.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any questions about this notice or the processing of your data, contact us at [privacy contact email] or at [phone].",
          ],
        },
      ],
    },
    terms: {
      title: "Terms & Conditions",
      intro:
        "Accessing and using this website (the “Site”) means you accept these Terms & Conditions. If you do not agree, please do not use the Site.",
      sections: [
        {
          heading: "Purpose of the Site",
          body: [
            "The Site is informational and presents the services of HannaH, a beauty and aesthetics clinic located in Mexico City. It does not allow online purchases, payments or bookings.",
          ],
        },
        {
          heading: "The information is not medical advice",
          body: [
            "The information on the Site is general in nature and does not replace consultation, diagnosis or treatment by a qualified health professional. An individual assessment is carried out before any treatment is arranged.",
          ],
        },
        {
          heading: "Treatment results",
          body: [
            "The results of aesthetic treatments vary from person to person and depend on individual factors. Images and descriptions on the Site are illustrative and are not a guarantee of results.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The text, images, logos, trademarks and other content on the Site are the property of HannaH or their respective owners and are protected by applicable law. They may not be reproduced or used without prior written authorization.",
          ],
        },
        {
          heading: "Links to third-party sites",
          body: [
            "The Site may contain links to third-party sites (for example, social media or maps). HannaH is not responsible for the content or privacy practices of those sites.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "HannaH strives to keep the information on the Site current and accurate, but does not warrant that it is free of errors or that the Site will be available without interruption. To the extent permitted by law, HannaH is not liable for damages arising from the use of, or inability to use, the Site.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "HannaH may amend these Terms & Conditions at any time. The version in force is the one published on this page.",
          ],
        },
        {
          heading: "Governing law and jurisdiction",
          body: [
            "These Terms & Conditions are governed by the laws of the United Mexican States. For any dispute, the parties submit to the competent courts of Mexico City, unless the law provides otherwise.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any questions about these Terms & Conditions, write to us at [contact email] or at [phone].",
          ],
        },
      ],
    },
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
    avisoPrivacidad: {
      title: "Privacy Notice",
      description:
        "How HannaH collects, uses and protects your personal data under Mexico's LFPDPPP.",
    },
    terminos: {
      title: "Terms & Conditions",
      description: "Conditions of use for the HannaH website.",
    },
    notFound: { title: "Page not found" },
  },
} as const satisfies Dictionary;
