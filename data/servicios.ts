import type { ServiceCategory } from "./types";

export const servicios = [
  {
    slug: "faciales",
    titulo: "Faciales",
    descripcion:
      "Limpieza profunda, hidratación y rejuvenecimiento para cada tipo de piel.",
    href: "/servicios/faciales",
    cover: "/images/facials/img1.svg",
  },
  {
    slug: "masajes",
    titulo: "Masajes",
    descripcion:
      "Relajación, alivio muscular y bienestar en cada sesión.",
    href: "/servicios/masajes",
    cover: "/images/massages/img1.svg",
  },
  {
    slug: "especiales",
    titulo: "Especiales",
    descripcion:
      "Tratamientos avanzados: skin booster, hilos tensores y toxina botulínica.",
    href: "/servicios/especiales",
    cover: "/images/specials/img1.svg",
  },
] as const satisfies readonly ServiceCategory[];
