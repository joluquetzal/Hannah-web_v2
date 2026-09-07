/**
 * Locale config. Spanish is the default and lives at the bare path (`/`,
 * `/contacto`); English is prefixed (`/en`, `/en/contacto`).
 *
 * See `.claude/rules/content-i18n.md`: every user-facing string exists in both
 * languages, Spanish is the source of truth, and both are updated together.
 */
export const locales = ["es", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLocale: Lang = "es";

export function isLang(value: string | undefined): value is Lang {
  return value === "es" || value === "en";
}

/**
 * Split a pathname into its locale and the locale-neutral rest.
 * Only `/en` is a real prefix — Spanish is unprefixed.
 */
export function stripLocale(pathname: string): { lang: Lang; rest: string } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { lang: "en", rest: pathname.slice(3) || "/" };
  }
  return { lang: "es", rest: pathname || "/" };
}

/** Build the href for a locale-neutral path (leading slash) in `lang`. */
export function localizedPath(path: string, lang: Lang): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  if (lang === defaultLocale) return clean || "/";
  return `/en${clean}`;
}
