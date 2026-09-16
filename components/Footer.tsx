"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

/** Every footer link is a real 44px target (accessibility-seo §Touch targets). */
const linkClass =
  "inline-flex min-h-11 items-center font-body text-base font-medium text-noir transition-opacity hover:opacity-70";

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();

  const social = [
    { href: site.social.instagram, label: "Instagram" },
    { href: site.social.facebook, label: "Facebook" },
  ];

  return (
    // The last sheet: sand ground, rounded top and an upward shadow, so it
    // rises over the sticky sheet above it exactly like the rest of the stack.
    // `muted` is never used here — it measures 1.79:1 on sand (§8).
    <footer className="relative z-10 overflow-hidden rounded-t-sheet bg-sand text-noir shadow-sheet">
      <div className="mx-auto w-full max-w-shell px-gutter pt-20">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="font-body text-caps-footer font-extrabold uppercase leading-none tracking-caps">
              {t.talk.title}
            </p>
            <Link
              href={localizedPath("/contacto", lang)}
              className="mt-5 inline-flex min-h-12 items-center bg-noir px-6 text-label font-bold uppercase tracking-label text-cream transition-opacity hover:opacity-85"
            >
              {t.footer.contactCta}
            </Link>
          </div>

          <div className="text-sm">
            <p className="text-eyebrow font-bold uppercase tracking-eyebrow">
              {t.footer.contact}
            </p>
            <ul className="mt-2">
              <li>
                <a href={site.phoneHref} className={linkClass}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className={linkClass}>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {t.clinic.whatsapp}
                </a>
              </li>
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <p className="text-eyebrow font-bold uppercase tracking-eyebrow">
              {t.footer.visitUs}
            </p>
            <address className="mt-3 space-y-1 not-italic leading-relaxed">
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

        {/* Decorative wordmark. `w-full` + `overflow-hidden` on the footer keep
            it from ever widening the page, however large the type gets. */}
        <p
          aria-hidden
          className="mt-14 w-full select-none overflow-hidden text-center font-display text-[22vw] font-medium italic leading-[0.72] tracking-tight text-noir"
        >
          {site.name}
        </p>
      </div>

      <div className="border-t border-noir/20">
        <div className="mx-auto flex w-full max-w-shell flex-col gap-1 px-gutter py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="py-2">
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <nav className="flex flex-wrap gap-x-6">
            <Link
              href={localizedPath("/aviso-de-privacidad", lang)}
              className={linkClass}
            >
              {t.footer.privacy}
            </Link>
            <Link href={localizedPath("/terminos", lang)} className={linkClass}>
              {t.footer.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
