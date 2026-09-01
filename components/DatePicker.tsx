"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { formatLongES } from "@/lib/date";

/**
 * Loaded on first open — react-day-picker is ~23 kB and nobody needs it
 * until they actually reach for the date field.
 */
const Calendar = dynamic(() => import("@/components/Calendar"), {
  ssr: false,
  loading: () => (
    <p className="py-10 text-center text-sm text-muted">Cargando calendario…</p>
  ),
});

type Props = {
  /** Applied to the trigger so the field's <label htmlFor> reaches it. */
  id: string;
  /** Name of the hidden input the form reads. */
  name: string;
  value: string;
  onChange: (iso: string) => void;
  /** Earliest selectable date, `yyyy-mm-dd`. */
  min?: string;
  invalid?: boolean;
  describedBy?: string;
  /** How far ahead bookings are allowed, in months. */
  monthsAhead?: number;
};

/**
 * Popover date field. react-day-picker supplies the calendar itself (grid
 * semantics, keyboard handling, Spanish locale, month/year dropdowns); this
 * component owns the trigger, the popover shell and the form wiring.
 *
 * The value is mirrored into a hidden input, so the surrounding form still
 * reads it straight off FormData.
 */
export function DatePicker({
  id,
  name,
  value,
  onChange,
  min,
  invalid,
  describedBy,
  monthsAhead = 18,
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // Close when a pointer goes down outside.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function closeCalendar() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeCalendar();
    }
  }

  return (
    <div ref={containerRef} className="relative" onKeyDown={onKeyDown}>
      <input type="hidden" name={name} value={value} />

      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        // No aria-invalid: it isn't valid on role="button". The error text is
        // announced through aria-describedby instead.
        aria-describedby={describedBy}
        onClick={() => (open ? closeCalendar() : setOpen(true))}
        className={clsx(
          "flex w-full items-center justify-between border bg-transparent px-4 py-3 text-left focus:outline-none",
          invalid ? "border-crimson" : "border-crimson-light focus:border-sand",
          value ? "text-cream" : "text-muted",
        )}
      >
        <span className="first-letter:uppercase">
          {value ? formatLongES(value) : "Elige una fecha"}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-4 w-4 shrink-0 text-sand"
        >
          <rect
            x="1.5"
            y="3"
            width="13"
            height="11.5"
            rx="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M1.5 6.5h13M5 1.5V4M11 1.5V4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        role="dialog"
        aria-label="Elige una fecha"
        className="absolute left-0 top-full z-40 mt-2 w-[20.5rem] border border-crimson-light bg-noir/95 p-4 backdrop-blur-sm"
      >
        {/* Mounted only while open: this is a static export, so anything
            date-dependent in the server HTML would freeze at build time. */}
        {open && (
          <Calendar
            value={value}
            min={min}
            monthsAhead={monthsAhead}
            onSelect={(iso) => {
              onChange(iso);
              setOpen(false);
              triggerRef.current?.focus();
            }}
          />
        )}
      </div>
    </div>
  );
}
