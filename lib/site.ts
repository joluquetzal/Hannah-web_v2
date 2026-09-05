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

  // Contact — TODO
  phone: "+52 55 0000 0000",
  phoneHref: "tel:+525500000000",
  whatsapp: "https://wa.me/525500000000",
  email: "contacto@hannah.mx",
  emailHref: "mailto:contacto@hannah.mx",

  // Location — TODO: confirm exact street number and postal code with client
  address: {
    street: "Eugenia 1309",
    neighborhood: "Col. Narvarte",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "03020",
    country: "MX",
  },

  // Hours — TODO
  hours: "Lunes a sábado, 10:00 – 19:00",

  // Google Maps embed (keyless `?q=…&output=embed` form) + a plain link
  // for "abrir en Google Maps". Both point at the address above.
  mapEmbedUrl:
    "https://www.google.com/maps?q=Eugenia%201309%2C%20Col.%20Narvarte%2C%20CDMX%2C%20M%C3%A9xico&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Eugenia%201309%2C%20Col.%20Narvarte%2C%20CDMX%2C%20M%C3%A9xico",

  // Social — TODO
  social: {
    instagram: "",
    facebook: "",
  },

  // Deployment
  url: "https://hannah.mx",
} as const;

export type Site = typeof site;
