"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

/** Every footer link is a real 44px target (accessibility-seo §Touch targets). */
const linkClass =
  "inline-flex min-h-11 items-center font-body text-base font-medium text-noir hover:underline";

const headingClass =
  "mb-[0.6rem] text-label font-bold uppercase tracking-label text-noir/70";

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();
  const path = (p: string) => localizedPath(p, lang);

  return (
    // The last sheet: sand ground, rounded top and an upward shadow, so it
    // rises over the sticky sheet above it exactly like the rest of the stack.
    // `muted` is never used here — it measures 1.79:1 on sand (§8).
    <footer className="relative z-10 overflow-hidden rounded-t-sheet bg-sand text-noir shadow-sheet">
      <div className="mx-auto w-full max-w-shell px-gutter pt-[clamp(3rem,7vw,5rem)]">
        <div className="grid gap-8 sm:grid-cols-2 wide:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-body text-caps-footer font-extrabold uppercase leading-none tracking-caps">
              {t.talk.title}
            </p>
            <p className="mb-4 mt-3 max-w-[30ch] text-list leading-relaxed">
              {t.talk.body}
            </p>
            <Link
              href={path("/contacto")}
              className="inline-flex min-h-12 items-center gap-2 rounded bg-noir px-[1.4rem] font-body text-btn font-bold uppercase tracking-label text-cream transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              {t.footer.contactCta}
              <span aria-hidden>&#8599;</span>
            </Link>
          </div>

          <div>
            <p className={headingClass}>{t.footer.contact}</p>
            <ul>
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
                  {t.clinic.whatsapp} <span aria-hidden>&nbsp;&#8599;</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={headingClass}>{t.footer.visitUs}</p>
            <address className="not-italic leading-relaxed">
              <span className="block">{site.address.street}</span>
              <span className="block">{site.address.neighborhood}</span>
              <span className="block">
                {site.address.city}, {site.address.state}
              </span>
              <span className="mt-3 block text-[0.9rem] opacity-80">
                {t.clinic.hoursSummary}
              </span>
            </address>
          </div>

          <div>
            <p className={headingClass}>{site.name}</p>
            <ul>
              <li>
                <Link href={path("/servicios")} className={linkClass}>
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href={path("/nosotros")} className={linkClass}>
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={path("/contacto")} className={linkClass}>
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram <span aria-hidden>&nbsp;&#8599;</span>
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Facebook <span aria-hidden>&nbsp;&#8599;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full-bleed wordmark, drawn as SVG text inside a viewBox. An SVG scales
          to its box by construction, so unlike a font-size in vw it cannot
          overflow the shell or clip at any width — which is what the previous
          22vw italic version did (bug: "the wordmark is cut off"). */}
      <svg
        aria-hidden
        viewBox="0 0 1000 224"
        preserveAspectRatio="xMidYMax meet"
        className="mt-[clamp(2rem,5vw,4rem)] block w-full translate-y-[8%] select-none"
      >
        <text
          x="500"
          y="218"
          textAnchor="middle"
          textLength="980"
          lengthAdjust="spacingAndGlyphs"
          className="fill-noir font-display"
          fontSize="311"
          fontWeight="500"
          letterSpacing="-0.03em"
        >
          {site.name}
        </text>
      </svg>

      <div className="relative bg-sand">
        <div className="mx-auto flex w-full max-w-shell flex-col gap-1 border-t border-noir/20 px-gutter py-4 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="py-2">
            &copy; {year} {site.legalName}. {t.footer.rights}
          </p>
          <nav className="flex flex-wrap gap-x-6">
            <Link href={path("/aviso-de-privacidad")} className={linkClass}>
              {t.footer.privacy}
            </Link>
            <Link href={path("/terminos")} className={linkClass}>
              {t.footer.terms}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
