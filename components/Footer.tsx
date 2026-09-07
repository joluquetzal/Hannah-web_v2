"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-crimson-light bg-noir">
      <div className="grid gap-10 px-gutter py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl italic text-cream">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{t.site.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="text-cream">{t.footer.contact}</p>
          <ul className="mt-3 space-y-1 text-muted">
            <li>
              <a href={site.phoneHref} className="hover:text-sand">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:text-sand">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sand"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sand"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sand"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-cream">{t.footer.visitUs}</p>
          <address className="mt-3 space-y-1 not-italic text-muted">
            <p>
              {site.address.street}, {site.address.neighborhood}
            </p>
            <p>
              {site.address.city}, {site.address.state}{" "}
              {site.address.postalCode}
            </p>
            <p>{t.clinic.hoursSummary}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-crimson-light">
        <div className="flex flex-col gap-2 px-gutter py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <Link href={localizedPath("/contacto", lang)} className="hover:text-sand">
            {t.footer.contactCta}
          </Link>
        </div>
      </div>
    </footer>
  );
}
