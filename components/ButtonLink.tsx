import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "cream" | "sand" | "noir" | "ghost";
  /** Adds the mockup's trailing ↗. Decorative — it is not read out. */
  arrow?: boolean;
  /** Set for links that leave the site. */
  external?: boolean;
  className?: string;
};

/** Grounds per the mockup: a filled button picks the colour its sheet needs. */
const variantClass = {
  cream: "bg-cream text-noir hover:bg-sand",
  sand: "bg-sand text-noir hover:bg-cream",
  noir: "bg-noir text-cream hover:bg-crimson-light",
  // Cream, not sand: ghost buttons sit on photos and coloured sheets where
  // sand can drop to ~3.7:1, while cream clears 6.9:1 on the worst case.
  ghost: "border border-cream/40 text-cream hover:bg-cream/10",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "cream",
  arrow = false,
  external = false,
  className,
}: Props) {
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden>↗</span>}
    </>
  );
  const classes = clsx(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded px-[1.4rem]",
    "font-body text-btn font-bold uppercase tracking-label",
    "transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none",
    variantClass[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
