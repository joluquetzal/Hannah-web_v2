import type { Treatment } from "./types";

export const masajes = [
  {
    slug: "masaje-relajante",
    nombre: "MASAJE RELAJANTE",
    duracion: "50 min",
    descripcion:
      "Favorece la circulación, reduce el estrés y mejora el estado de ánimo.",
    img: "/images/masajes/img1.svg",
    gif: "/images/masajes/video1.gif",
  },
  {
    slug: "masaje-piedras-calientes",
    nombre: "MASAJE PIEDRAS CALIENTES",
    duracion: "60 min",
    descripcion:
      "Masaje Zen. Mejora la calidad del sueño y reduce los dolores musculares.",
    img: "/images/masajes/img2.svg",
    gif: "/images/masajes/video2.gif",
  },
  {
    slug: "masaje-deportivo",
    nombre: "MASAJE DEPORTIVO",
    duracion: "60 min",
    descripcion:
      "Mejora el dolor en contracturas, disminuye el estrés y relaja los músculos.",
    img: "/images/masajes/img3.svg",
    gif: "/images/masajes/video3.gif",
  },
  {
    slug: "masaje-modelador",
    nombre: "MASAJE MODELADOR",
    duracion: "10 sesiones",
    descripcion:
      "Drenaje linfático, compresas de lodo del Mar Muerto, cavitación y radiofrecuencia.",
    img: "/images/masajes/img4.svg",
    gif: "/images/masajes/video4.gif",
  },
] as const satisfies readonly Treatment[];

export type Masaje = (typeof masajes)[number];
