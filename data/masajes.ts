import type { Treatment } from "./types";

export const masajes = [
  {
    slug: "masaje-relajante",
    nombre: "MASAJE RELAJANTE",
    duracion: "50 min",
    descripcion:
      "Favorece la circulación, reduce el estrés y mejora el estado de ánimo.",
    img: "/images/massages/img1.svg",
    video: "/images/massages/video1.mp4",
  },
  {
    slug: "masaje-piedras-calientes",
    nombre: "MASAJE PIEDRAS CALIENTES",
    duracion: "60 min",
    descripcion:
      "Masaje Zen. Mejora la calidad del sueño y reduce los dolores musculares.",
    img: "/images/massages/img2.svg",
    video: "/images/massages/video2.mp4",
  },
  {
    slug: "masaje-deportivo",
    nombre: "MASAJE DEPORTIVO",
    duracion: "60 min",
    descripcion:
      "Mejora el dolor en contracturas, disminuye el estrés y relaja los músculos.",
    img: "/images/massages/img3.svg",
    video: "/images/massages/video3.mp4",
  },
  {
    slug: "masaje-modelador",
    nombre: "MASAJE MODELADOR",
    duracion: "10 sesiones",
    descripcion:
      "Drenaje linfático, compresas de lodo del Mar Muerto, cavitación y radiofrecuencia.",
    img: "/images/massages/img4.svg",
    video: "/images/massages/video4.mp4",
  },
] as const satisfies readonly Treatment[];

export type Masaje = (typeof masajes)[number];
