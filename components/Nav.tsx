"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { NavDropdown } from "@/components/NavDropdown";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { site } from "@/lib/site";
import { servicios } from "@/data/servicios";
import { localizedPath, stripLocale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

/** Shared shape for the two header buttons (WhatsApp outline, Contacto filled). */
const headerButton =
  "inline-flex min-h-12 items-center justify-center whitespace-nowrap px-4 font-grotesk text-xs uppercase tracking-label transition-colors";

export function Nav() {
  const pathname = usePathname();
  const { lang, t } = useI18n();
  const { rest } = stripLocale(pathname || "/");
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Publish the real header height so `min-h-window` and the sticky sheets can
  // subtract it. globals.css carries a static default for the first paint.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`,
      );
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const path = (p: string) => localizedPath(p, lang);
  const isActive = (p: string) => (p === "/" ? rest === "/" : rest.startsWith(p));

  const navLinkClass = (active: boolean) =>
    clsx(
      "inline-flex min-h-11 items-center px-3.5 font-hserif text-base font-semibold text-paper transition-opacity hover:opacity-80",
      active && "underline decoration-1 underline-offset-8",
    );

  const links = [
    { href: "/nosotros", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ];

  const address = `${site.address.street}, ${site.address.neighborhood}`;

  // Breadcrumbs render nothing on the landing page, so the header is one row
  // shorter there. This has to be true in the served HTML, not just after
  // hydration, or every window-height sheet resizes on first paint.
  const hasCrumbs = rest !== "/";

  return (
    <header ref={headerRef} className="sticky top-0 z-header bg-ink">
      {!hasCrumbs && <style>{":root{--hdr-crumbs:0px}"}</style>}
      {/* Row 1 — announcement strip */}
      {/* No vertical padding: the 44px controls inside set the row's height,
          so the strip lands at exactly 44 rather than 44 + padding. */}
      <div className="flex min-h-11 items-center justify-center gap-5 bg-paper px-gutter text-ink">
        <p className="hidden font-hserif text-sm sm:block">
          {t.clinic.visitUsAt} {address}, {site.address.city}
        </p>
        <a
          href={site.mapLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 items-center bg-ink px-3 font-grotesk text-xs uppercase tracking-label text-paper transition-opacity hover:opacity-85 sm:inline-flex"
        >
          {t.clinic.mapCta}
        </a>
        {/* Below sm the sentence becomes the link and the button is dropped. */}
        <a
          href={site.mapLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-hserif text-sm underline underline-offset-4 sm:hidden"
        >
          {t.clinic.visitUsAt} {address}
        </a>
      </div>

      {/* Row 2 — main bar. 70px at md matches the prototype; the spacing
          scale has no 70px step. The sticky <header> is the positioning
          ancestor for the mega menu and the mobile panel, so both drop below
          the breadcrumbs rather than over them. */}
      <div className="flex min-h-16 items-center gap-4 px-gutter py-2 text-paper md:min-h-[4.375rem]">
        <Link
          href={path("/")}
          aria-label={`${site.name} — ${t.nav.home}`}
          className="inline-flex min-h-11 items-center"
        >
          <Image
            src="/brand/hannah-wordmark.svg"
            alt={site.name}
            width={138}
            height={40}
            priority
            className="h-7 w-auto md:h-8"
          />
        </Link>

        <nav
          aria-label={t.nav.primaryLabel}
          className="ml-8 hidden md:block lg:ml-16"
        >
          <ul className="flex items-center">
            <NavDropdown navLinkClass={navLinkClass} />
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={path(link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={navLinkClass(isActive(link.href))}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              headerButton,
              "hidden border border-paper text-paper hover:bg-paper hover:text-ink md:inline-flex",
            )}
          >
            {t.clinic.whatsapp}
          </a>
          <Link
            href={path("/contacto")}
            className={clsx(
              headerButton,
              "hidden border border-paper bg-paper text-ink hover:bg-transparent hover:text-paper md:inline-flex",
            )}
          >
            {t.footer.contactCta}
          </Link>

          <LanguageSwitch />

          <button
            type="button"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="menu-movil"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-paper md:hidden"
          >
            <span
              className={clsx(
                "block h-px w-4 bg-paper transition-transform duration-300 motion-reduce:transition-none",
                mobileOpen && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={clsx(
                "block h-px w-4 bg-paper transition-transform duration-300 motion-reduce:transition-none",
                mobileOpen && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      {/* Row 3 — breadcrumbs (renders nothing on the landing page) */}
      <Breadcrumbs />

      {/* Mobile menu — rises from below the header. */}
      <div
          id="menu-movil"
          className={clsx(
            "absolute inset-x-0 top-full z-menu origin-top bg-ink transition-all duration-300 motion-reduce:transition-none md:hidden",
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-3 opacity-0",
          )}
          aria-hidden={!mobileOpen}
        >
          <nav
            aria-label={t.nav.mobileLabel}
            className="flex flex-col gap-1 border-t border-paper/15 px-gutter py-6"
          >
            <Link href={path("/")} className="py-1 font-hserif text-3xl font-semibold text-paper">
              {t.nav.home}
            </Link>

            <Link
              href={path("/servicios")}
              className="py-1 font-hserif text-3xl font-semibold text-paper"
            >
              {t.nav.services}
            </Link>
            <div className="mb-2 flex flex-wrap gap-x-5">
              {servicios.map((cat) => (
                <Link
                  key={cat.slug}
                  href={path(cat.href)}
                  className="inline-flex min-h-11 items-center font-display text-xl italic text-crimson-bright"
                >
                  {cat.titulo[lang]}
                </Link>
              ))}
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={path(link.href)}
                className="py-1 font-hserif text-3xl font-semibold text-paper"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 border-t border-paper/15 pt-4 font-hserif text-sm text-paper">
              <p>
                {address}, {site.address.city}
              </p>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-11 items-center text-crimson-bright"
              >
                {site.phone}
              </a>
            </div>

            <div className="grid gap-2">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(headerButton, "border border-paper text-paper")}
              >
                {t.clinic.whatsapp}
              </a>
              <Link
                href={path("/contacto")}
                className={clsx(headerButton, "border border-paper bg-paper text-ink")}
              >
                {t.footer.contactCta}
              </Link>
            </div>
          </nav>
        </div>
    </header>
  );
}
