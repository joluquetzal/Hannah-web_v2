import type { Metadata } from "next";
import { getDictionary } from "./index";
import { localizedPath, type Lang } from "./config";

type PageKey =
  | "home"
  | "servicios"
  | "faciales"
  | "masajes"
  | "especiales"
  | "nosotros"
  | "contacto"
  | "avisoPrivacidad"
  | "terminos";

/**
 * Per-route metadata for a locale: localized title/description, a self-canonical
 * URL and hreflang alternates for both languages.
 */
export function buildMetadata(lang: Lang, key: PageKey, path: string): Metadata {
  const m = getDictionary(lang).meta[key];
  return {
    title: key === "home" ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: {
      canonical: localizedPath(path, lang),
      languages: {
        es: localizedPath(path, "es"),
        en: localizedPath(path, "en"),
        "x-default": localizedPath(path, "es"),
      },
    },
    openGraph: { locale: lang === "es" ? "es_MX" : "en_US" },
  };
}
