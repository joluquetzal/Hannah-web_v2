import type { Treatment } from "./types";

export const especiales = [
  {
    slug: "skin-booster",
    nombre: "SKIN BOOSTER",
    descripcion: "Hidratación profunda con ácido hialurónico.",
    incluye: ["4 sesiones", "1 sesión cada 15 días"],
    img: "/images/specials/img1.svg",
    gif: "/images/specials/video1.gif",
  },
  {
    slug: "hilos-tensores",
    nombre: "HILOS TENSORES",
    descripcion:
      "Elimina arrugas y flacidez facial. Levanta las cejas y redefine el óvalo y el contorno de la mandíbula.",
    zonas: [
      "Frente",
      "Perfilamiento mandibular",
      "Surco nasogeniano",
      "Patas de gallo",
      "Líneas de marioneta",
      "Cuello",
    ],
    img: "/images/specials/img2.svg",
    gif: "/images/specials/video2.gif",
  },
  {
    slug: "nanobotox",
    nombre: "NANOBOTOX",
    descripcion:
      "Combinación de pequeñas dosis de toxina botulínica y ácido hialurónico.",
    incluye: ["Una aplicación", "Un refuerzo"],
    img: "/images/specials/img3.svg",
    gif: "/images/specials/video3.gif",
  },
  {
    slug: "mesobotox",
    nombre: "MESOBOTOX",
    descripcion:
      "Pequeñas dosis de toxina botulínica en el tercio superior del rostro. Trata arrugas y líneas de expresión suaves.",
    incluye: ["Una aplicación", "Un refuerzo"],
    img: "/images/specials/img4.svg",
    gif: "/images/specials/video4.gif",
  },
] as const satisfies readonly Treatment[];

export type Especial = (typeof especiales)[number];
