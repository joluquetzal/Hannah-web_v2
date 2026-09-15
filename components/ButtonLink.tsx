import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  /** `cream` is the filled button on a photographic or coloured ground. */
  variant?: "solid" | "cream" | "ghost";
  className?: string;
};

const variantClass = {
  solid: "bg-crimson text-cream hover:bg-crimson-light",
  cream: "bg-cream text-noir hover:bg-sand",
  // Cream, not sand: ghost buttons sit on photos and coloured sheets where
  // sand can drop to ~3.7:1, while cream clears 6.9:1 on the worst case.
  ghost: "border border-cream/40 text-cream hover:border-cream hover:bg-cream/10",
} as const;

export function ButtonLink({ href, children, variant = "solid", className }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-12 items-center justify-center px-7 py-3 text-xs uppercase tracking-label transition-colors",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
