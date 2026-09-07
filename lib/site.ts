/**
 * Single source of truth for the clinic's NAP (name, address, phone) and
 * contact details. Reused by Nav, Footer, /contacto and JSON-LD.
 *
 * TODO: replace every placeholder below with real data from the client.
 */
export const site = {
  name: "HannaH",
  legalName: "HannaH — Belleza y Estética",
  tagline: "Clínica de belleza y estética",
  description:
    "Clínica de belleza y estética en México. Faciales, masajes y tratamientos especiales en un espacio pensado para el cuidado de tu piel.",

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

  // Hours. `summary` for the compact footer/contact line; `schedule` drives
  // the day-by-day list and the JSON-LD openingHoursSpecification.
  hours: {
    summary:
      "Lunes a viernes de 9:00 a 19:00 h · Sábado de 9:00 a 14:00 h · Domingo cerrado",
    schedule: [
      { days: "Lunes a viernes", time: "9:00 – 19:00 h", opens: "09:00", closes: "19:00", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
      { days: "Sábado", time: "9:00 – 14:00 h", opens: "09:00", closes: "14:00", dayOfWeek: ["Saturday"] },
      { days: "Domingo", time: "Cerrado", opens: null, closes: null, dayOfWeek: ["Sunday"] },
    ],
  },

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
