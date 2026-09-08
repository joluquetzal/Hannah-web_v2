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
export function NavDropdown({
  onOpenChange,
}: {
  /** Lets the header go solid while the panel is showing. */
  onOpenChange?: (open: boolean) => void;
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

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

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
        className={clsx(
          "inline-flex items-center gap-1.5 transition-colors hover:text-cream",
          active || open ? "text-cream" : "text-sand",
        )}
      >
        {t.nav.services}
        <svg
          aria-hidden
          viewBox="0 0 10 6"
          className={clsx(
            "h-1.5 w-2.5 transition-transform duration-200",
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
        className="absolute inset-x-0 top-full border-y border-crimson-light bg-noir/95 backdrop-blur-md"
      >
        <div className="px-gutter py-8">
          <div className="flex items-baseline justify-between">
            <p className="text-xs uppercase tracking-eyebrow text-muted-strong">
              {t.nav.servicesMenuHeading}
            </p>
            <Link
              data-menu-item
              href={path("/servicios")}
              className="text-xs uppercase tracking-label text-sand transition-colors hover:text-cream"
            >
              {t.nav.servicesViewAll}
            </Link>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {servicios.map((category) => {
              const current = rest === category.href;
              return (
                <li key={category.slug}>
                  <Link
                    data-menu-item
                    href={path(category.href)}
                    aria-current={current ? "page" : undefined}
                    className={clsx(
                      "group block h-full border p-5 transition-colors",
                      current
                        ? "border-sand/50 bg-crimson-light/40"
                        : "border-crimson-light hover:border-sand/50 hover:bg-crimson-light/40",
                    )}
                  >
                    <p className="font-display text-2xl italic text-cream">
                      {category.titulo[lang]}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-sand">
                      {category.descripcion[lang]}
                    </p>
                    <span className="mt-4 inline-block text-xs uppercase tracking-label text-muted-strong transition-colors group-hover:text-cream">
                      {t.nav.servicesCardCta}
                    </span>
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
