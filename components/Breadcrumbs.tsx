"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CRUMB_EVENT } from "@/components/SheetStack";
import { servicios } from "@/data/servicios";
import { site } from "@/lib/site";
import { getDictionary, localizedPath, stripLocale } from "@/lib/i18n";
import type { Dictionary, Lang } from "@/lib/i18n";

type Crumb = { label: string; path: string };

/**
 * Label for one locale-neutral path segment. Category names come from
 * `data/servicios.ts` so the crumb and the page title can't drift apart.
 */
function segmentLabel(segment: string, t: Dictionary, lang: Lang): string {
  const category = servicios.find((c) => c.slug === segment);
  if (category) return category.titulo[lang];

  switch (segment) {
    case "servicios":
      return t.nav.services;
    case "nosotros":
      return t.nav.about;
    case "contacto":
      return t.nav.contact;
    case "aviso-de-privacidad":
      return t.legal.privacy.title;
    case "terminos":
      return t.legal.terms.title;
    default:
      return segment;
  }
}

function buildTrail(rest: string, t: Dictionary, lang: Lang): Crumb[] {
  const segments = rest.split("/").filter(Boolean);
  if (segments.length === 0) return [];

  const trail: Crumb[] = [{ label: t.nav.home, path: "/" }];
  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    trail.push({ label: segmentLabel(segment, t, lang), path });
  }
  return trail;
}

export function Breadcrumbs() {
  const { lang, rest } = stripLocale(usePathname() || "/");
  const t = getDictionary(lang);
  const trail = buildTrail(rest, t, lang);

  // The sheet currently on screen, reported by SheetStack. Not a link and not
  // in the JSON-LD: it names a position in the page, not a route.
  const [live, setLive] = useState<string | null>(null);
  useEffect(() => {
    const onCrumb = (e: Event) =>
      setLive((e as CustomEvent<string | null>).detail);
    window.addEventListener(CRUMB_EVENT, onCrumb);
    return () => window.removeEventListener(CRUMB_EVENT, onCrumb);
  }, []);
  useEffect(() => setLive(null), [rest]);

  // Hidden on the landing page: a single "Inicio" crumb says nothing.
  if (trail.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${site.url}${localizedPath(crumb.path, lang)}`,
    })),
  };

  return (
    <nav
      aria-label={t.nav.breadcrumbLabel}
      // Long trails scroll inside this row rather than widening the page.
      className="overflow-x-auto border-t border-paper/15 px-gutter [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ol className="flex min-h-11 items-center whitespace-nowrap font-hserif text-sm font-semibold">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center">
              {i > 0 && (
                <span aria-hidden className="mx-3.5 text-paper">
                  /
                </span>
              )}
              {isLast ? (
                <span
                  aria-current={live ? undefined : "page"}
                  className={live ? "text-stone" : "text-paper"}
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={localizedPath(crumb.path, lang)}
                  className="inline-flex min-h-11 items-center text-stone transition-colors hover:text-paper"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}

        {live && (
          <li className="flex items-center">
            <span aria-hidden className="mx-3.5 text-paper">
              /
            </span>
            <span aria-current="true" className="text-paper">
              {live}
            </span>
          </li>
        )}
      </ol>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
