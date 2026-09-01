"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";
import clsx from "clsx";
import { servicios } from "@/data/servicios";

/**
 * "Servicios" nav item with a submenu of the three categories.
 *
 * Disclosure pattern (button + aria-expanded), not role="menu": the panel
 * holds plain links, so browsers and screen readers treat them normally.
 * Opens on hover for pointers and on click / Enter / Space / ArrowDown for
 * keyboards. Closes on Escape (returning focus), outside click, focus leaving
 * the group, and route change.
 */
export function NavDropdown() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const active = pathname.startsWith("/servicios");

  const cancelClose = useCallback(() => clearTimeout(closeTimer.current), []);
  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
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
      className="relative"
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
        className={clsx(
          "inline-flex items-center gap-1.5 transition-colors hover:text-cream",
          active ? "text-cream" : "text-sand",
        )}
      >
        Servicios
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

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 top-full z-50 min-w-[13rem] border border-crimson-light bg-noir/95 py-2 backdrop-blur-sm"
      >
        <ul className="text-sm">
          <li>
            <Link
              data-menu-item
              href="/servicios"
              aria-current={pathname === "/servicios" ? "page" : undefined}
              className="block px-4 py-2 text-sand transition-colors hover:bg-crimson-light hover:text-cream"
            >
              Ver todos
            </Link>
          </li>
          {servicios.map((category) => (
            <li key={category.slug}>
              <Link
                data-menu-item
                href={category.href}
                aria-current={pathname === category.href ? "page" : undefined}
                className={clsx(
                  "block px-4 py-2 transition-colors hover:bg-crimson-light hover:text-cream",
                  pathname === category.href ? "text-cream" : "text-sand",
                )}
              >
                {category.titulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
