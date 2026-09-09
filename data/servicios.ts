import type { ServiceCategory } from "./types";

export const servicios = [
  {
    slug: "faciales",
    titulo: { es: "Faciales", en: "Facials" },
    descripcion: {
      es: "Limpieza profunda, hidratación y rejuvenecimiento para cada tipo de piel.",
      en: "Deep cleansing, hydration and rejuvenation for every skin type.",
    },
    href: "/servicios/faciales",
    cover: "/images/facials/img1.svg",
  },
  {
    slug: "masajes",
    titulo: { es: "Masajes", en: "Massages" },
    descripcion: {
      es: "Relajación, alivio muscular y bienestar en cada sesión.",
      en: "Relaxation, muscle relief and wellbeing in every session.",
    },
    href: "/servicios/masajes",
    cover: "/images/massages/img1.svg",
  },
  {
    slug: "especiales",
    titulo: { es: "Especiales", en: "Special treatments" },
    descripcion: {
      es: "Tratamientos avanzados: skin booster, hilos tensores y toxina botulínica.",
      en: "Advanced treatments: skin booster, tensor threads and botulinum toxin.",
    },
    href: "/servicios/especiales",
    cover: "/images/specials/img1.svg",
  },
] as const satisfies readonly ServiceCategory[];
