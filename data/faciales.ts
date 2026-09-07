import type { Treatment } from "./types";

export const faciales = [
  {
    slug: "facial-hidratante",
    nombre: { es: "FACIAL HIDRATANTE", en: "HYDRATING FACIAL" },
    descripcion: {
      es: "Para pieles mixtas a secas. Mejora las líneas de expresión y la humectación, y disminuye la sensación acartonada.",
      en: "For combination to dry skin. Improves fine lines and hydration, and reduces the feeling of tightness.",
    },
    incluye: {
      es: [
        "Limpieza",
        "Exfoliación",
        "Ozono",
        "Mascarilla de elastina",
        "Aparatología",
        "Ácido hialurónico",
        "Crema hidratante",
      ],
      en: [
        "Cleansing",
        "Exfoliation",
        "Ozone",
        "Elastin mask",
        "Technology-assisted treatment",
        "Hyaluronic acid",
        "Moisturizing cream",
      ],
    },
    img: "/images/facials/img1.svg",
    video: "/images/facials/video1.mp4",
  },
  {
    slug: "anti-acne-piel-grasa",
    nombre: { es: "ANTI ACNÉ O PIEL GRASA", en: "ANTI-ACNE OR OILY SKIN" },
    descripcion: {
      es: "Controla el exceso de grasa y mejora el brillo, el escozor y la apariencia de la piel.",
      en: "Controls excess oil and improves shine, stinging and the appearance of the skin.",
    },
    incluye: {
      es: [
        "Limpieza",
        "Exfoliación",
        "Extracción",
        "Aparatología",
        "Alta frecuencia",
        "Mascarilla de arcilla o barro negro",
        "Hidratación",
      ],
      en: [
        "Cleansing",
        "Exfoliation",
        "Extraction",
        "Technology-assisted treatment",
        "High frequency",
        "Clay or black-mud mask",
        "Hydration",
      ],
    },
    img: "/images/facials/img2.svg",
    video: "/images/facials/video2.mp4",
  },
  {
    slug: "hidrodermoabrasion",
    nombre: { es: "HIDRODERMOABRASIÓN", en: "HYDRADERMABRASION" },
    descripcion: {
      es: "Remueve células muertas, exceso de grasa e impurezas mediante una succión indolora. Hidrata y limpia de forma simultánea.",
      en: "Removes dead cells, excess oil and impurities through painless suction. Hydrates and cleanses at the same time.",
    },
    incluye: {
      es: [
        "Limpieza",
        "Exfoliación",
        "Alta frecuencia",
        "Hidrodermoabrasión con solución de vitamina C, ácido acetilsalicílico, ácido glicólico o ácido hialurónico",
        "Mascarilla hidroplástica",
        "Hidratación",
      ],
      en: [
        "Cleansing",
        "Exfoliation",
        "High frequency",
        "Hydradermabrasion with a vitamin C, acetylsalicylic acid, glycolic acid or hyaluronic acid solution",
        "Hydroplastic mask",
        "Hydration",
      ],
    },
    img: "/images/facials/img3.svg",
    video: "/images/facials/video3.mp4",
  },
  {
    slug: "facial-hannah",
    nombre: { es: "FACIAL HANNAH", en: "FACIAL HANNAH" },
    descripcion: {
      es: "El facial más completo. Mejora la apariencia general, con extracción si es necesario y microdermoabrasión o hidrodermoabrasión.",
      en: "The most complete facial. Improves overall appearance, with extraction if needed and microdermabrasion or hydradermabrasion.",
    },
    incluye: {
      es: [
        "Limpieza",
        "Exfoliación",
        "Aparatología según el tipo de piel",
        "Alta frecuencia",
        "Radiofrecuencia",
        "Mascarilla Gold",
        "Hidratación",
      ],
      en: [
        "Cleansing",
        "Exfoliation",
        "Technology-assisted treatment based on skin type",
        "High frequency",
        "Radiofrequency",
        "Gold mask",
        "Hydration",
      ],
    },
    recomendacion: { es: "2 sesiones", en: "2 sessions" },
    destacado: true,
    img: "/images/facials/img4.svg",
    video: "/images/facials/video4.mp4",
  },
  {
    slug: "facial-rejuvenecedor",
    nombre: { es: "FACIAL REJUVENECEDOR", en: "REJUVENATING FACIAL" },
    descripcion: {
      es: "Rejuvenece la piel, favorece la producción de colágeno y mejora la apariencia general.",
      en: "Rejuvenates the skin, boosts collagen production and improves overall appearance.",
    },
    incluye: {
      es: [
        "Limpieza",
        "Exfoliación",
        "Radiofrecuencia",
        "Bioestimulación",
        "Mascarilla según necesidad",
        "Máscara LED",
      ],
      en: [
        "Cleansing",
        "Exfoliation",
        "Radiofrequency",
        "Biostimulation",
        "Mask as needed",
        "LED mask",
      ],
    },
    recomendacion: {
      es: "8 a 10 sesiones periódicas",
      en: "8 to 10 regular sessions",
    },
    img: "/images/facials/img5.svg",
    video: "/images/facials/video5.mp4",
  },
  {
    slug: "microdermoabrasion",
    nombre: { es: "MICRODERMOABRASIÓN", en: "MICRODERMABRASION" },
    descripcion: {
      es: "Piel más joven, suave y limpia. Elimina cicatrices y disminuye arrugas.",
      en: "Younger, smoother, cleaner skin. Reduces scars and softens wrinkles.",
    },
    incluye: {
      es: [
        "Limpieza",
        "Exfoliación",
        "Alta frecuencia",
        "Microdermoabrasión con puntas de diamante",
        "Mascarilla hidroplástica",
        "Hidratación",
      ],
      en: [
        "Cleansing",
        "Exfoliation",
        "High frequency",
        "Diamond-tip microdermabrasion",
        "Hydroplastic mask",
        "Hydration",
      ],
    },
    img: "/images/facials/img6.svg",
    video: "/images/facials/video6.mp4",
  },
] as const satisfies readonly Treatment[];

export type Facial = (typeof faciales)[number];
