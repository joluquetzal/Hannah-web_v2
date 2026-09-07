"use client";

import { site } from "@/lib/site";
import { getDictionary } from "@/lib/i18n";
import { useLang } from "@/lib/i18n/useLang";

/** LocalBusiness structured data for the current page's language. */
export function BusinessJsonLd() {
  const lang = useLang();
  const t = getDictionary(lang);

  const json = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: site.name,
    description: t.site.description,
    url: lang === "es" ? site.url : `${site.url}/en`,
    inLanguage: lang === "es" ? "es-MX" : "en-US",
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: "MX",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
