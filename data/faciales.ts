import type { Treatment } from "./types";

export const faciales = [
  {
    slug: "facial-hidratante",
    nombre: "FACIAL HIDRATANTE",
    descripcion:
      "Para pieles mixtas a secas. Mejora las líneas de expresión y la humectación, y disminuye la sensación acartonada.",
    incluye: [
      "Limpieza",
      "Exfoliación",
      "Ozono",
      "Mascarilla de elastina",
      "Aparatología",
      "Ácido hialurónico",
      "Crema hidratante",
    ],
    img: "/images/facials/img1.svg",
    gif: "/images/facials/video1.gif",
  },
  {
    slug: "anti-acne-piel-grasa",
    nombre: "ANTI ACNÉ O PIEL GRASA",
    descripcion:
      "Controla el exceso de grasa y mejora el brillo, el escozor y la apariencia de la piel.",
    incluye: [
      "Limpieza",
      "Exfoliación",
      "Extracción",
      "Aparatología",
      "Alta frecuencia",
      "Mascarilla de arcilla o barro negro",
      "Hidratación",
    ],
    img: "/images/facials/img2.svg",
    gif: "/images/facials/video2.gif",
  },
  {
    slug: "hidrodermoabrasion",
    nombre: "HIDRODERMOABRASIÓN",
    descripcion:
      "Remueve células muertas, exceso de grasa e impurezas mediante una succión indolora. Hidrata y limpia de forma simultánea.",
    incluye: [
      "Limpieza",
      "Exfoliación",
      "Alta frecuencia",
      "Hidrodermoabrasión con solución de vitamina C, ácido acetilsalicílico, ácido glicólico o ácido hialurónico",
      "Mascarilla hidroplástica",
      "Hidratación",
    ],
    img: "/images/facials/img3.svg",
    gif: "/images/facials/video3.gif",
  },
  {
    slug: "facial-hannah",
    nombre: "FACIAL HANNAH",
    descripcion:
      "El facial más completo. Mejora la apariencia general, con extracción si es necesario y microdermoabrasión o hidrodermoabrasión.",
    incluye: [
      "Limpieza",
      "Exfoliación",
      "Aparatología según el tipo de piel",
      "Alta frecuencia",
      "Radiofrecuencia",
      "Mascarilla Gold",
      "Hidratación",
    ],
    recomendacion: "2 sesiones",
    destacado: true,
    img: "/images/facials/img4.svg",
    gif: "/images/facials/video4.gif",
  },
  {
    slug: "facial-rejuvenecedor",
    nombre: "FACIAL REJUVENECEDOR",
    descripcion:
      "Rejuvenece la piel, favorece la producción de colágeno y mejora la apariencia general.",
    incluye: [
      "Limpieza",
      "Exfoliación",
      "Radiofrecuencia",
      "Bioestimulación",
      "Mascarilla según necesidad",
      "Máscara LED",
    ],
    recomendacion: "8 a 10 sesiones periódicas",
    img: "/images/facials/img5.svg",
    gif: "/images/facials/video5.gif",
  },
  {
    slug: "microdermoabrasion",
    nombre: "MICRODERMOABRASIÓN",
    descripcion:
      "Piel más joven, suave y limpia. Elimina cicatrices y disminuye arrugas.",
    incluye: [
      "Limpieza",
      "Exfoliación",
      "Alta frecuencia",
      "Microdermoabrasión con puntas de diamante",
      "Mascarilla hidroplástica",
      "Hidratación",
    ],
    img: "/images/facials/img6.svg",
    gif: "/images/facials/video6.gif",
  },
] as const satisfies readonly Treatment[];

export type Facial = (typeof faciales)[number];
