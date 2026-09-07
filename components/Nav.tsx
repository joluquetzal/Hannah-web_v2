"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NavDropdown } from "@/components/NavDropdown";
import { site } from "@/lib/site";
import { servicios } from "@/data/servicios";

/** Links after the dropdown. "Inicio" and "Servicios" are rendered separately. */
const links = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function Nav() {
  const pathname = usePathname();
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
    clsx("transition-colors hover:text-cream", active ? "text-cream" : "text-sand");

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isSolid ? "bg-noir/90 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Principal"
        className="flex items-center justify-between px-gutter py-5"
      >
        <Link
          href="/"
          className="font-display text-2xl italic tracking-wide text-cream"
        >
          {site.name}
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <ul className="hidden items-center gap-5 text-[13px] md:flex md:gap-7 md:text-sm">
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={linkClass(pathname === "/")}
            >
              Inicio
            </Link>
          </li>

          <NavDropdown onOpenChange={setDropdownOpen} />

          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass(active)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          type="button"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
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
            aria-label="Menú móvil"
            className="flex flex-col gap-7 px-gutter py-8 text-sm"
          >
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={linkClass(pathname === "/")}
            >
              Inicio
            </Link>

            {/* Servicios — flat list, no hover needed on touch */}
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted">
                Servicios
              </p>
              <div className="flex flex-col gap-4 border-l border-crimson-light pl-4">
                {servicios.map((cat) => {
                  const active = pathname.startsWith(cat.href);
                  return (
                    <Link
                      key={cat.slug}
                      href={cat.href}
                      aria-current={active ? "page" : undefined}
                      className={linkClass(active)}
                    >
                      {cat.titulo}
                    </Link>
                  );
                })}
                <Link
                  href="/servicios"
                  className="text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-sand"
                >
                  Ver todos los servicios
                </Link>
              </div>
            </div>

            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass(active)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
