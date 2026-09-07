/**
 * Single source of truth for the clinic's NAP (name, address, phone) and
 * contact details. Language-neutral only — translatable copy (tagline,
 * descriptions, hours labels) lives in `lib/i18n/dictionaries`.
 *
 * TODO: replace every placeholder below with real data from the client.
 */
export const site = {
  name: "HannaH",
  legalName: "HannaH — Belleza y Estética",

  // Contact
  phone: "+52 55 3956 0265",
  phoneHref: "tel:+525539560265",
  whatsapp: "https://wa.me/525539560265",
  email: "hannah.spa19@gmail.com",
  emailHref: "mailto:hannah.spa19@gmail.com",

  // Location — TODO: confirm exact street number and postal code with client
  address: {
    street: "Eugenia 1309",
    neighborhood: "Col. Narvarte",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "03020",
    country: "MX",
  },

  // Opening hours for JSON-LD (schema.org OpeningHoursSpecification). The
  // human-readable per-day labels live in `dictionaries.clinic.schedule`.
  openingHours: [
    {
      opens: "09:00",
      closes: "19:00",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    { opens: "09:00", closes: "14:00", dayOfWeek: ["Saturday"] },
  ],

  // Google Maps embed (keyless `?q=…&output=embed` form) + a plain link
  // for "abrir en Google Maps". Both point at the address above.
  mapEmbedUrl:
    "https://www.google.com/maps?q=Eugenia%201309%2C%20Col.%20Narvarte%2C%20CDMX%2C%20M%C3%A9xico&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Eugenia%201309%2C%20Col.%20Narvarte%2C%20CDMX%2C%20M%C3%A9xico",

  // Social
  social: {
    instagram: "https://www.instagram.com/hannah.spa.cdmx/",
    facebook: "https://www.facebook.com/people/Hannah-Spa/61553359328074/",
  },

  // Deployment
  url: "https://hannah.mx",
} as const;

export type Site = typeof site;
