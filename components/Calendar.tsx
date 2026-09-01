"use client";

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { es } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { fromISODate, toISODate, todayISO } from "@/lib/date";

type Props = {
  /** Currently selected date, `yyyy-mm-dd`, or "" for none. */
  value: string;
  /** Earliest selectable date, `yyyy-mm-dd`. */
  min?: string;
  /** How far ahead bookings are allowed, in months. */
  monthsAhead: number;
  onSelect: (iso: string) => void;
};

/**
 * The calendar itself. Kept in its own module so DatePicker can load it
 * lazily — react-day-picker is ~23 kB and is only needed once someone
 * opens the field.
 *
 * The library's own stylesheet supplies the layout (table sizing, nav
 * placement, dropdown positioning). We only re-theme it, through its CSS
 * variables plus colour-only classes appended to the default class names —
 * replacing those class names outright would strip the layout CSS.
 */

/** Palette, mirrored from tailwind.config.ts. GSAP-free, plain CSS values. */
const theme = [
  "[--rdp-accent-color:#6B1414]",
  "[--rdp-accent-background-color:#3D1A1A]",
  "[--rdp-today-color:#C9A27A]",
  "[--rdp-day_button-border-radius:0px]",
  "[--rdp-day_button-border:1px_solid_transparent]",
  "[--rdp-selected-border:1px_solid_#C9A27A]",
  "[--rdp-day-width:2.5rem]",
  "[--rdp-day-height:2.5rem]",
  "[--rdp-day_button-width:2.5rem]",
  "[--rdp-day_button-height:2.5rem]",
  "[--rdp-nav_button-width:1.75rem]",
  "[--rdp-nav_button-height:1.75rem]",
  "[--rdp-disabled-opacity:0.25]",
  "[--rdp-outside-opacity:0.4]",
  "[--rdp-weekday-opacity:1]",
].join(" ");

export default function Calendar({ value, min, monthsAhead, onSelect }: Props) {
  const defaults = getDefaultClassNames();

  const minDate = min ? fromISODate(min) : undefined;
  const selected = value ? fromISODate(value) : undefined;
  const startMonth = minDate ?? fromISODate(todayISO());
  const endMonth = new Date(
    startMonth.getFullYear(),
    startMonth.getMonth() + monthsAhead,
    1,
  );

  return (
    <DayPicker
      mode="single"
      locale={es}
      autoFocus
      showOutsideDays
      captionLayout="dropdown"
      selected={selected}
      defaultMonth={selected ?? startMonth}
      startMonth={startMonth}
      endMonth={endMonth}
      // Closed on Sundays — the clinic runs Monday to Saturday.
      disabled={[...(minDate ? [{ before: minDate }] : []), { dayOfWeek: [0] }]}
      onSelect={(date) => {
        if (date) onSelect(toISODate(date));
      }}
      classNames={{
        ...defaults,
        root: `${defaults.root} ${theme} text-sand`,
        month_caption: `${defaults.month_caption} font-display text-lg italic capitalize text-cream`,
        caption_label: `${defaults.caption_label} font-display text-lg italic capitalize text-cream`,
        dropdown: `${defaults.dropdown} cursor-pointer border border-crimson-light bg-noir capitalize text-cream [&_option]:bg-noir [&_option]:text-cream`,
        button_previous: `${defaults.button_previous} text-sand transition-colors hover:text-cream`,
        button_next: `${defaults.button_next} text-sand transition-colors hover:text-cream`,
        chevron: `${defaults.chevron} fill-current`,
        weekday: `${defaults.weekday} text-[10px] font-normal uppercase tracking-widest text-muted`,
        day_button: `${defaults.day_button} text-sm transition-colors hover:bg-crimson-light hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sand`,
        today: `${defaults.today} font-medium`,
        disabled: `${defaults.disabled} line-through`,
      }}
    />
  );
}
