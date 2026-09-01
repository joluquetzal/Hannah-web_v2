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

  // Location — TODO
  address: {
    street: "Calle Sin Nombre 000",
    neighborhood: "Colonia",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "00000",
    country: "MX",
  },

  // Hours — TODO
  hours: "Lunes a sábado, 10:00 – 19:00",

  // Embeds — TODO
  mapEmbedUrl: "",

  // Social — TODO
  social: {
    instagram: "",
    facebook: "",
  },

  // Deployment
  url: "https://hannah.mx",
} as const;

export type Site = typeof site;
