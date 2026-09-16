"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import clsx from "clsx";
import { servicios } from "@/data/servicios";
import { localizedPath, stripLocale } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

/**
 * "Servicios" nav item with a full-width panel beneath the header.
 *
 * The panel is `absolute inset-x-0` and the <header> is the positioned
 * ancestor, so it spans the header's width rather than the list item's.
 *
 * Disclosure pattern (button + aria-expanded), not role="menu": the panel
 * holds plain links, so browsers and screen readers treat them normally.
 * Opens on hover and on click / Enter / Space / ArrowDown; closes on Escape
 * (restoring focus), outside pointerdown, focus leaving the group, and
 * route change.
 */
/** Category card grounds. Matches the sheet themes the category pages use. */
const cardTheme: Record<string, string> = {
  faciales: "bg-crimson text-cream",
  masajes: "bg-crimson-light text-cream",
  especiales: "bg-sand text-noir",
};

export function NavDropdown({
  navLinkClass,
}: {
  /** Shared bar-link styling, so the trigger matches its sibling links. */
  navLinkClass: (active: boolean) => string;
}) {
  const pathname = usePathname();
  const { lang, t } = useI18n();
  const { rest } = stripLocale(pathname || "/");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const active = rest.startsWith("/servicios");
  const path = (p: string) => localizedPath(p, lang);

  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), []);
  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  }, [cancelClose]);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close when a pointer goes down outside the group.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function focusFirstItem() {
    requestAnimationFrame(() => {
      containerRef.current
        ?.querySelector<HTMLAnchorElement>("[data-menu-item]")
        ?.focus();
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLLIElement>) {
    if (event.key === "Escape" && open) {
      event.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      focusFirstItem();
    }
  }

  // Tabbing out of the group closes it.
  function onBlur(event: FocusEvent<HTMLLIElement>) {
    if (!containerRef.current?.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  }

  return (
    <li
      ref={containerRef}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={closeSoon}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        onFocus={cancelClose}
        className={clsx(navLinkClass(active), "gap-1.5")}
      >
        {t.nav.services}
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className={clsx(
            "h-1.5 w-2.5 transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        >
          <path
            d="M1 1l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Spans the header: <header> is the positioned ancestor. */}
      <div
        id={panelId}
        hidden={!open}
        onMouseEnter={cancelClose}
        onMouseLeave={closeSoon}
        className="absolute inset-x-0 top-full z-mega border-t border-paper/15 bg-ink shadow-[0_30px_50px_-20px_rgb(0_0_0/0.7)]"
      >
        <div className="mx-auto max-w-shell px-gutter py-6">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-hserif text-base font-semibold text-stone">
              {t.nav.servicesMenuHeading}
            </p>
            <Link
              data-menu-item
              href={path("/servicios")}
              className="inline-flex min-h-11 items-center font-grotesk text-label font-bold uppercase tracking-label text-paper transition-opacity hover:opacity-80"
            >
              {t.nav.servicesViewAll} <span aria-hidden>↗</span>
            </Link>
          </div>

          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {servicios.map((category) => {
              const current = rest === category.href;
              return (
                <li key={category.slug}>
                  <Link
                    data-menu-item
                    href={path(category.href)}
                    aria-current={current ? "page" : undefined}
                    className={clsx(
                      "flex h-full min-h-36 flex-col justify-between gap-3 p-4 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none",
                      cardTheme[category.slug],
                      current && "ring-1 ring-inset ring-paper/60",
                    )}
                  >
                    <p className="font-body text-2xl font-extrabold uppercase leading-none tracking-caps">
                      {category.titulo[lang]}
                    </p>
                    <p className="max-w-[30ch] text-sm leading-snug">
                      {category.descripcion[lang]}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}
