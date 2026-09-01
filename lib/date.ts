/**
 * Local-time date helpers for `yyyy-mm-dd` strings.
 *
 * `Date.toISOString()` converts to UTC first, so in Mexico (UTC-6) an evening
 * "today" reports tomorrow's date. Everything here formats and parses in
 * local time instead.
 */

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

/** Parse `yyyy-mm-dd` into a local Date (midnight local, never UTC). */
export function fromISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatLongES(iso: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fromISODate(iso));
}
