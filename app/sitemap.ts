import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/servicios",
  "/servicios/faciales",
  "/servicios/masajes",
  "/servicios/especiales",
  "/nosotros",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
