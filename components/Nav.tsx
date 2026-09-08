"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NavDropdown } from "@/components/NavDropdown";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { site } from "@/lib/site";
import { servicios } from "@/data/servicios";
import { localizedPath, stripLocale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

export function Nav() {
  const pathname = usePathname();
  const { lang, t } = useI18n();
  const { rest } = stripLocale(pathname || "/");
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isSolid = scrolled || dropdownOpen || mobileOpen;

  const linkClass = (active: boolean) =>
    clsx(
      "transition-colors hover:text-cream",
      active ? "text-cream" : "text-sand",
    );

  const path = (p: string) => localizedPath(p, lang);
  const isActive = (p: string) => (p === "/" ? rest === "/" : rest.startsWith(p));

  const links = [
    { href: "/nosotros", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ];

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isSolid ? "bg-noir/90 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <nav
        aria-label={t.nav.primaryLabel}
        className="flex items-center justify-between px-gutter py-5"
      >
        <Link
          href={path("/")}
          className="font-display text-2xl italic tracking-wide text-cream"
        >
          {site.name}
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <div className="hidden items-center gap-5 md:flex md:gap-7">
          <ul className="flex items-center gap-5 text-sm md:gap-7">
            <li>
              <Link
                href={path("/")}
                aria-current={isActive("/") ? "page" : undefined}
                className={linkClass(isActive("/"))}
              >
                {t.nav.home}
              </Link>
            </li>

            <NavDropdown onOpenChange={setDropdownOpen} />

            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={path(link.href)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={linkClass(isActive(link.href))}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <LanguageSwitch className="border-l border-crimson-light pl-4" />
        </div>

        {/* Hamburger button — mobile only */}
        <button
          type="button"
          aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={clsx(
              "block h-px w-6 bg-cream transition-transform duration-200",
              mobileOpen && "translate-y-[6px] rotate-45",
            )}
          />
          <span
            className={clsx(
              "block h-px w-6 bg-cream transition-opacity duration-200",
              mobileOpen && "opacity-0",
            )}
          />
          <span
            className={clsx(
              "block h-px w-6 bg-cream transition-transform duration-200",
              mobileOpen && "-translate-y-[6px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-crimson-light bg-noir/95 backdrop-blur-md md:hidden">
          <nav
            aria-label={t.nav.mobileLabel}
            className="flex flex-col gap-7 px-gutter py-8 text-sm"
          >
            <Link
              href={path("/")}
              aria-current={isActive("/") ? "page" : undefined}
              className={linkClass(isActive("/"))}
            >
              {t.nav.home}
            </Link>

            {/* Servicios — flat list, no hover needed on touch */}
            <div>
              <p className="mb-3 text-xs uppercase tracking-eyebrow text-muted-strong">
                {t.nav.services}
              </p>
              <div className="flex flex-col gap-4 border-l border-crimson-light pl-4">
                {servicios.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={path(cat.href)}
                    aria-current={isActive(cat.href) ? "page" : undefined}
                    className={linkClass(isActive(cat.href))}
                  >
                    {cat.titulo[lang]}
                  </Link>
                ))}
                <Link
                  href={path("/servicios")}
                  className="text-xs uppercase tracking-label text-muted-strong transition-colors hover:text-cream"
                >
                  {t.nav.servicesViewAllLong}
                </Link>
              </div>
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={path(link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={linkClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}

            <LanguageSwitch className="pt-2" />
          </nav>
        </div>
      )}
    </header>
  );
}
