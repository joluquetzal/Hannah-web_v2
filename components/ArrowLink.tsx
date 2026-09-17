import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * Underlined uppercase link with a trailing ↗. The rule is a 1px background
 * gradient sitting 8px above the bottom edge, so it can animate its width —
 * a real `text-decoration` cannot. On hover it retracts to the right.
 */
const base = clsx(
  "inline-flex min-h-11 items-center gap-2",
  "font-body text-arrow font-bold uppercase tracking-arrow",
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-[position:0_calc(100%-8px)] bg-no-repeat",
  "transition-[background-size] duration-[350ms]",
  "hover:bg-[length:0_1px] hover:bg-[position:100%_calc(100%-8px)]",
  "motion-reduce:transition-none",
);

export function ArrowLink({
  href,
  children,
  external = false,
  className,
  /** NavDropdown finds its first focusable item by this attribute. */
  "data-menu-item": dataMenuItem,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  "data-menu-item"?: boolean;
}) {
  const content = (
    <>
      {children}
      <span aria-hidden>↗</span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-menu-item={dataMenuItem}
        className={clsx(base, className)}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} data-menu-item={dataMenuItem} className={clsx(base, className)}>
      {content}
    </Link>
  );
}
