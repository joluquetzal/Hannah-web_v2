/** Shared shapes for the service content in `data/`. */

/** A value that exists in both site languages. See `lib/i18n`. */
export type Localized<T> = { readonly es: T; readonly en: T };

export type Treatment = {
  /** URL-safe id, unique within its category. */
  slug: string;
  /** Display name — kept in the client's original casing per language. */
  nombre: Localized<string>;
  descripcion: Localized<string>;
  /** "Incluye:" list — faciales and some especiales. */
  incluye?: Localized<readonly string[]>;
  /** Zonas de aplicación — hilos tensores. */
  zonas?: Localized<readonly string[]>;
  /** Duración o número de sesiones — masajes. */
  duracion?: Localized<string>;
  /** Recomendación de sesiones — algunos faciales. */
  recomendacion?: Localized<string>;
  /** Signature treatment (Facial HannaH). */
  destacado?: boolean;
  /** Static image, served from /public. */
  img: string;
  /** Muted looping clip shown on hover, served from /public. */
  video: string;
};

export type ServiceCategory = {
  slug: string;
  titulo: Localized<string>;
  descripcion: Localized<string>;
  /** Locale-neutral path; prefix per locale with `localizedPath`. */
  href: string;
  /** Cover image for the /servicios hub card. */
  cover: string;
};
