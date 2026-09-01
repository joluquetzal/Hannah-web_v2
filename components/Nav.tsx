"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { NavDropdown } from "@/components/NavDropdown";
import { site } from "@/lib/site";

/** Links after the dropdown. "Inicio" and "Servicios" are rendered separately. */
const links = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (active: boolean) =>
    clsx("transition-colors hover:text-cream", active ? "text-cream" : "text-sand");

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-noir/90 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
      >
        <Link
          href="/"
          className="font-display text-2xl italic tracking-wide text-cream"
        >
          {site.name}
        </Link>

        <ul className="flex items-center gap-5 text-[13px] sm:gap-7 sm:text-sm">
          <li>
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={linkClass(pathname === "/")}
            >
              Inicio
            </Link>
          </li>

          <NavDropdown />

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
      </nav>
    </header>
  );
}
