import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { localizedPath, locales } from "@/lib/i18n";

const routes = [
  "/",
  "/servicios",
  "/servicios/faciales",
  "/servicios/masajes",
  "/servicios/especiales",
  "/nosotros",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((lang) => ({
      url: `${site.url}${localizedPath(route, lang)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
      alternates: {
        languages: {
          es: `${site.url}${localizedPath(route, "es")}`,
          en: `${site.url}${localizedPath(route, "en")}`,
        },
      },
    })),
  );
}
