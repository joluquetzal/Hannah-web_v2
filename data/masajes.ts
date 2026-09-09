import type { Treatment } from "./types";

export const masajes = [
  {
    slug: "masaje-relajante",
    nombre: { es: "MASAJE RELAJANTE", en: "RELAXING MASSAGE" },
    duracion: { es: "50 min", en: "50 min" },
    descripcion: {
      es: "Favorece la circulación, reduce el estrés y mejora el estado de ánimo.",
      en: "Improves circulation, reduces stress and lifts your mood.",
    },
    img: "/images/massages/img1.svg",
    video: "/images/massages/video1.mp4",
  },
  {
    slug: "masaje-piedras-calientes",
    nombre: { es: "MASAJE PIEDRAS CALIENTES", en: "HOT STONE MASSAGE" },
    duracion: { es: "60 min", en: "60 min" },
    descripcion: {
      es: "Masaje Zen. Mejora la calidad del sueño y reduce los dolores musculares.",
      en: "A Zen massage. Improves sleep quality and eases muscle aches.",
    },
    img: "/images/massages/img2.svg",
    video: "/images/massages/video2.mp4",
  },
  {
    slug: "masaje-deportivo",
    nombre: { es: "MASAJE DEPORTIVO", en: "SPORTS MASSAGE" },
    duracion: { es: "60 min", en: "60 min" },
    descripcion: {
      es: "Mejora el dolor en contracturas, disminuye el estrés y relaja los músculos.",
      en: "Relieves knot and muscle-strain pain, lowers stress and relaxes the muscles.",
    },
    img: "/images/massages/img3.svg",
    video: "/images/massages/video3.mp4",
  },
  {
    slug: "masaje-modelador",
    nombre: { es: "MASAJE MODELADOR", en: "BODY-CONTOURING MASSAGE" },
    duracion: { es: "10 sesiones", en: "10 sessions" },
    descripcion: {
      es: "Drenaje linfático, compresas de lodo del Mar Muerto, cavitación y radiofrecuencia.",
      en: "Lymphatic drainage, Dead Sea mud wraps, cavitation and radiofrequency.",
    },
    img: "/images/massages/img4.svg",
    video: "/images/massages/video4.mp4",
  },
] as const satisfies readonly Treatment[];

export type Masaje = (typeof masajes)[number];
