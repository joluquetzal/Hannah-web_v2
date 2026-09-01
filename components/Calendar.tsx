"use client";

import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";
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
 * lazily — react-day-picker is ~23 kB and is only needed once someone opens
 * the field.
 */
export default function Calendar({
  value,
  min,
  monthsAhead,
  onSelect,
}: Props) {
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
      disabled={minDate ? { before: minDate } : undefined}
      onSelect={(date) => {
        if (date) onSelect(toISODate(date));
      }}
      classNames={{
        root: "text-sand",
        months: "flex flex-col",
        month: "w-full",
        nav: "flex items-center justify-between pb-2",
        button_previous:
          "inline-flex h-7 w-7 items-center justify-center text-sand transition-colors hover:text-cream disabled:cursor-not-allowed disabled:opacity-30",
        button_next:
          "inline-flex h-7 w-7 items-center justify-center text-sand transition-colors hover:text-cream disabled:cursor-not-allowed disabled:opacity-30",
        chevron: "h-3.5 w-3.5 fill-current",
        month_caption: "flex items-center justify-center pb-3",
        caption_label: "font-display text-lg italic capitalize text-cream",
        dropdowns: "flex items-center justify-center gap-2",
        dropdown_root: "relative",
        dropdown:
          "cursor-pointer border border-crimson-light bg-noir px-2 py-1 text-sm capitalize text-cream focus:border-sand focus:outline-none",
        month_grid: "w-full border-collapse",
        weekday:
          "pb-2 text-center text-[10px] font-normal uppercase tracking-widest text-muted",
        day: "p-0 text-center",
        day_button:
          "flex aspect-square w-full items-center justify-center text-sm transition-colors hover:bg-crimson-light hover:text-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-sand",
        selected: "[&>button]:bg-crimson [&>button]:text-cream",
        today: "[&>button]:underline [&>button]:underline-offset-4",
        outside: "[&>button]:text-muted/50",
        disabled:
          "[&>button]:cursor-not-allowed [&>button]:text-muted/40 [&>button]:hover:bg-transparent [&>button]:hover:text-muted/40",
        hidden: "invisible",
      }}
    />
  );
}
