import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * Category nav pill. The active one inverts and gains a 6px crimson dot before
 * its label, which is how the mockup marks the current category.
 */
export function Chip({
  href,
  active = false,
  children,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-4",
        "font-body text-label font-bold uppercase tracking-label transition-colors",
        active
          ? "border-sand bg-sand text-noir"
          : "border-sand/35 text-sand hover:border-sand hover:text-cream",
      )}
    >
      {active && (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-crimson" />
      )}
      {children}
    </Link>
  );
}

/**
 * Non-interactive fact pill (duración, recomendación). Not uppercase, and the
 * 44px rule doesn't apply because there is nothing to tap.
 */
export function MetaChip({
  label,
  value,
  onSand = false,
}: {
  /** Optional lead-in, rendered lighter — e.g. "Recomendación:". */
  label?: string;
  value: string;
  /** Sand sheets need a dark wash instead of a light one. */
  onSand?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex min-h-9 items-center gap-1 rounded-full px-[0.9rem]",
        "font-body text-[0.78rem] font-bold tracking-meta",
        onSand ? "bg-noir/10" : "bg-white/[0.08]",
      )}
    >
      {label && <span className="font-medium opacity-75">{label}</span>}
      {value}
    </span>
  );
}
