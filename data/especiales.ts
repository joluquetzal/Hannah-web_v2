import type { Treatment } from "./types";

export const especiales = [
  {
    slug: "skin-booster",
    nombre: { es: "SKIN BOOSTER", en: "SKIN BOOSTER" },
    descripcion: {
      es: "Hidratación profunda con ácido hialurónico.",
      en: "Deep hydration with hyaluronic acid.",
    },
    incluye: {
      es: ["4 sesiones", "1 sesión cada 15 días"],
      en: ["4 sessions", "1 session every 15 days"],
    },
    img: "/images/specials/img1.webp",
  },
  {
    slug: "hilos-tensores",
    nombre: { es: "HILOS TENSORES", en: "TENSOR THREADS" },
    descripcion: {
      es: "Elimina arrugas y flacidez facial. Levanta las cejas y redefine el óvalo y el contorno de la mandíbula.",
      en: "Reduces wrinkles and facial sagging. Lifts the brows and redefines the facial oval and jawline.",
    },
    zonas: {
      es: [
        "Frente",
        "Perfilamiento mandibular",
        "Surco nasogeniano",
        "Patas de gallo",
        "Líneas de marioneta",
        "Cuello",
      ],
      en: [
        "Forehead",
        "Jawline contouring",
        "Nasolabial fold",
        "Crow's feet",
        "Marionette lines",
        "Neck",
      ],
    },
    img: "/images/specials/img2.webp",
  },
  {
    slug: "nanobotox",
    nombre: { es: "NANOBOTOX", en: "NANOBOTOX" },
    descripcion: {
      es: "Combinación de pequeñas dosis de toxina botulínica y ácido hialurónico.",
      en: "A combination of small doses of botulinum toxin and hyaluronic acid.",
    },
    incluye: {
      es: ["Una aplicación", "Un refuerzo"],
      en: ["One application", "One touch-up"],
    },
    img: "/images/specials/img3.webp",
  },
  {
    slug: "mesobotox",
    nombre: { es: "MESOBOTOX", en: "MESOBOTOX" },
    descripcion: {
      es: "Pequeñas dosis de toxina botulínica en el tercio superior del rostro. Trata arrugas y líneas de expresión suaves.",
      en: "Small doses of botulinum toxin in the upper third of the face. Treats wrinkles and soft expression lines.",
    },
    incluye: {
      es: ["Una aplicación", "Un refuerzo"],
      en: ["One application", "One touch-up"],
    },
    img: "/images/specials/img4.webp",
  },
] as const satisfies readonly Treatment[];

export type Especial = (typeof especiales)[number];
