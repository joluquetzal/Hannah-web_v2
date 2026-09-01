import { faciales } from "@/data/faciales";
import { masajes } from "@/data/masajes";
import { especiales } from "@/data/especiales";

/** Grouped treatment names for the /contacto <select> — derived from data/. */
export const servicioOptions = [
  { grupo: "Faciales", opciones: faciales.map((t) => t.nombre) },
  { grupo: "Masajes", opciones: masajes.map((t) => t.nombre) },
  { grupo: "Especiales", opciones: especiales.map((t) => t.nombre) },
] as const;
