import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
};

export function ButtonLink({ href, children, variant = "solid", className }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center px-7 py-3 text-xs uppercase tracking-label transition-colors",
        variant === "solid"
          ? "bg-crimson text-cream hover:bg-crimson-light"
          : "border border-sand/40 text-sand hover:border-sand hover:text-cream",
        className,
      )}
    >
      {children}
    </Link>
  );
}
