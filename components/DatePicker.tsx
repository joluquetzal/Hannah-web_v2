"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import clsx from "clsx";
import {
  addDays,
  addMonths,
  daysInMonth,
  formatLongES,
  formatMonthES,
  fromISODate,
  mondayIndex,
  startOfMonth,
  toISODate,
  todayISO,
} from "@/lib/date";

const WEEKDAYS = [
  { short: "L", long: "lunes" },
  { short: "M", long: "martes" },
  { short: "M", long: "miércoles" },
  { short: "J", long: "jueves" },
  { short: "V", long: "viernes" },
  { short: "S", long: "sábado" },
  { short: "D", long: "domingo" },
] as const;

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
};

/**
 * Calendar date picker styled to the site's palette.
 *
 * Native <input type="date"> can't be themed, so this renders its own grid.
 * The chosen value is mirrored into a hidden input, so the surrounding form
 * still reads it straight off FormData.
 */
export function DatePicker({ id, name, value, onChange, min, invalid, describedBy }: Props) {
  const [open, setOpen] = useState(false);
  const initial = value || min || todayISO();
  const [focused, setFocused] = useState(initial);
  const [view, setView] = useState(() => startOfMonth(fromISODate(initial)));

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

  // Keep DOM focus on the focused day while the calendar is open.
  useEffect(() => {
    if (!open) return;
    containerRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focused}"]`)?.focus();
  }, [open, focused]);

  function openCalendar() {
    const start = value || min || todayISO();
    setFocused(start);
    setView(startOfMonth(fromISODate(start)));
    setOpen(true);
  }

  function closeCalendar() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  const isDisabled = (iso: string) => Boolean(min && iso < min);

  function select(iso: string) {
    if (isDisabled(iso)) return;
    onChange(iso);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function moveFocus(days: number) {
    const next = toISODate(addDays(fromISODate(focused), days));
    setFocused(next);
    setView(startOfMonth(fromISODate(next)));
  }

  function shiftMonth(months: number) {
    const current = fromISODate(focused);
    const target = addMonths(startOfMonth(current), months);
    const day = Math.min(current.getDate(), daysInMonth(target));
    const next = toISODate(new Date(target.getFullYear(), target.getMonth(), day));
    setFocused(next);
    setView(startOfMonth(fromISODate(next)));
  }

  function onGridKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        moveFocus(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        moveFocus(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveFocus(-7);
        break;
      case "ArrowDown":
        event.preventDefault();
        moveFocus(7);
        break;
      case "Home":
        event.preventDefault();
        moveFocus(-mondayIndex(fromISODate(focused)));
        break;
      case "End":
        event.preventDefault();
        moveFocus(6 - mondayIndex(fromISODate(focused)));
        break;
      case "PageUp":
        event.preventDefault();
        shiftMonth(-1);
        break;
      case "PageDown":
        event.preventDefault();
        shiftMonth(1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        select(focused);
        break;
      case "Escape":
        event.preventDefault();
        closeCalendar();
        break;
      default:
        break;
    }
  }

  const leadingBlanks = mondayIndex(view);
  const total = daysInMonth(view);
  const days = Array.from({ length: total }, (_, i) =>
    toISODate(new Date(view.getFullYear(), view.getMonth(), i + 1)),
  );

  const prevMonth = addMonths(view, -1);
  const prevDisabled = Boolean(
    min && toISODate(new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0)) < min,
  );

  const today = todayISO();

  return (
    <div ref={containerRef} className="relative">
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
        onClick={() => (open ? closeCalendar() : openCalendar())}
        className={clsx(
          "flex w-full items-center justify-between border bg-transparent px-4 py-3 text-left focus:outline-none",
          invalid ? "border-crimson" : "border-crimson-light focus:border-sand",
          value ? "text-cream" : "text-muted",
        )}
      >
        <span>{value ? formatLongES(value) : "Elige una fecha"}</span>
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4 text-sand">
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
        className="absolute left-0 top-full z-40 mt-2 w-[19rem] border border-crimson-light bg-noir/95 p-4 backdrop-blur-sm"
      >
        {/* Rendered only while open: this is a static export, so anything
            date-dependent in the server HTML would be frozen at build time. */}
        {open && (
          <>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => shiftMonth(-1)}
                disabled={prevDisabled}
                aria-label="Mes anterior"
                className="px-2 py-1 text-sand transition-colors hover:text-cream disabled:cursor-not-allowed disabled:opacity-30"
              >
                ‹
              </button>
              <p aria-live="polite" className="font-display text-lg capitalize italic text-cream">
                {formatMonthES(view)}
              </p>
              <button
                type="button"
                onClick={() => shiftMonth(1)}
                aria-label="Mes siguiente"
                className="px-2 py-1 text-sand transition-colors hover:text-cream"
              >
                ›
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1">
              {WEEKDAYS.map((weekday, i) => (
                <abbr
                  key={i}
                  title={weekday.long}
                  className="pb-1 text-center text-[10px] uppercase tracking-widest text-muted no-underline"
                >
                  {weekday.short}
                </abbr>
              ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-1" onKeyDown={onGridKeyDown}>
              {Array.from({ length: leadingBlanks }, (_, i) => (
                <span key={`blank-${i}`} />
              ))}

              {days.map((iso) => {
                const disabled = isDisabled(iso);
                const selected = iso === value;
                return (
                  <button
                    key={iso}
                    type="button"
                    data-day={iso}
                    disabled={disabled}
                    tabIndex={iso === focused ? 0 : -1}
                    aria-pressed={selected}
                    aria-current={iso === today ? "date" : undefined}
                    onClick={() => select(iso)}
                    className={clsx(
                      "aspect-square text-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sand",
                      disabled && "cursor-not-allowed text-muted/40",
                      !disabled && !selected && "text-sand hover:bg-crimson-light hover:text-cream",
                      selected && "bg-crimson text-cream",
                      iso === today && !selected && "underline underline-offset-4",
                    )}
                  >
                    {Number(iso.slice(8, 10))}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
