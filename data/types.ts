/** Shared shapes for the service content in `data/`. */

export type Treatment = {
  /** URL-safe id, unique within its category. */
  slug: string;
  /** Display name — kept in the client's original casing. */
  nombre: string;
  descripcion: string;
  /** "Incluye:" list — faciales and some especiales. */
  incluye?: readonly string[];
  /** Zonas de aplicación — hilos tensores. */
  zonas?: readonly string[];
  /** Duración o número de sesiones — masajes. */
  duracion?: string;
  /** Recomendación de sesiones — algunos faciales. */
  recomendacion?: string;
  /** Signature treatment (Facial HannaH). */
  destacado?: boolean;
  /** Static image, served from /public. */
  img: string;
  /** Muted looping clip shown on hover, served from /public. */
  video: string;
};

export type ServiceCategory = {
  slug: string;
  titulo: string;
  descripcion: string;
  href: string;
  /** Cover image for the /servicios hub card. */
  cover: string;
};
