"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { NavDropdown } from "@/components/NavDropdown";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/lib/site";
import { servicios } from "@/data/servicios";
import { localizedPath, stripLocale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

/** Shared shape for the two header buttons (WhatsApp outline, Contacto filled). */
const headerButton =
  "inline-flex min-h-12 items-center justify-center whitespace-nowrap px-4 font-grotesk text-hbtn uppercase tracking-hbtn transition-colors";

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

  // The active underline is a 1px background gradient, not text-decoration,
  // so its width can animate from 0 (the mockup grows it in).
  const navLinkClass = (active: boolean) =>
    clsx(
      "inline-flex min-h-11 items-center px-3.5 font-hserif text-nav font-semibold tracking-nav text-paper",
      "bg-[linear-gradient(currentColor,currentColor)] bg-[position:0.875rem_calc(100%-9px)] bg-no-repeat",
      "transition-[background-size,opacity] duration-[350ms] hover:opacity-80 motion-reduce:transition-none",
      active ? "bg-[length:calc(100%-1.75rem)_1px]" : "bg-[length:0_1px]",
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
        <p className="hidden font-hserif text-strip sm:block">
          {t.clinic.visitUsAt} {address}, {site.address.city}
        </p>
        <a
          href={site.mapLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 items-center bg-ink px-[0.8rem] font-grotesk text-hstrip uppercase tracking-hstrip text-paper transition-opacity hover:opacity-85 sm:inline-flex"
        >
          {t.clinic.mapCta}
        </a>
        {/* Below sm the sentence becomes the link and the button is dropped. */}
        <a
          href={site.mapLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center font-hserif text-strip underline underline-offset-4 sm:hidden"
        >
          {t.clinic.visitUsAt} {address}
        </a>
      </div>

      {/* Row 2 — main bar. 70px at md matches the prototype; the spacing
          scale has no 70px step. The sticky <header> is the positioning
          ancestor for the mega menu and the mobile panel, so both drop below
          the breadcrumbs rather than over them. */}
      <div className="flex min-h-16 items-center gap-4 px-gutter py-2 text-paper wide:min-h-[4.375rem]">
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
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <nav
          aria-label={t.nav.primaryLabel}
          className="ml-nav-offset hidden wide:block"
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
              "hidden border border-paper text-paper hover:bg-paper hover:text-ink wide:inline-flex",
            )}
          >
            {t.clinic.whatsapp}
          </a>
          <Link
            href={path("/contacto")}
            className={clsx(
              headerButton,
              "hidden border border-paper bg-paper text-ink hover:bg-transparent hover:text-paper wide:inline-flex",
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
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-paper wide:hidden"
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

      <ScrollProgress />

      {/* Mobile menu — fills everything below the header and slides up into it.
          `h-[calc(100svh - header)]` is the window height, but this is an
          overlay, not a content section, so §5's ban doesn't apply. `invisible`
          when closed keeps its links out of the tab order. */}
      <div
          id="menu-movil"
          className={clsx(
            "absolute inset-x-0 top-full z-menu h-[calc(100svh-var(--header-h))] overflow-y-auto bg-ink transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none wide:hidden",
            mobileOpen ? "visible translate-y-0" : "invisible translate-y-full",
          )}
          aria-hidden={!mobileOpen}
        >
          <nav
            aria-label={t.nav.mobileLabel}
            className="flex min-h-full flex-col justify-between border-t border-paper/15 px-gutter py-6"
          >
            <div className="flex flex-col">
            <Link href={path("/")} className="py-1 font-hserif text-m-link font-semibold leading-[1.1] text-paper">
              {t.nav.home}
            </Link>

            <Link
              href={path("/servicios")}
              className="py-1 font-hserif text-m-link font-semibold leading-[1.1] text-paper"
            >
              {t.nav.services}
            </Link>
            <div className="mb-2 flex flex-wrap gap-x-5">
              {servicios.map((cat) => (
                <Link
                  key={cat.slug}
                  href={path(cat.href)}
                  className="inline-flex min-h-11 items-center font-display text-m-sub italic text-crimson-bright"
                >
                  {cat.titulo[lang]}
                </Link>
              ))}
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={path(link.href)}
                className="py-1 font-hserif text-m-link font-semibold leading-[1.1] text-paper"
              >
                {link.label}
              </Link>
            ))}
            </div>

            <div>

            <div className="mt-8 border-t border-paper/15 pt-4 font-hserif text-sm text-paper">
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

            <div className="mt-5 grid gap-2">
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
            </div>
          </nav>
        </div>
    </header>
  );
}
