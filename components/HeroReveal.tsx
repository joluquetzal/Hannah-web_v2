"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * Staggered entrance for elements marked `data-reveal` inside it.
 * GSAP is imported lazily so it stays out of the route's initial bundle.
 * No-ops (content stays visible) when the user prefers reduced motion.
 */
export function HeroReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void import("gsap").then(({ gsap }) => {
      if (cancelled || !ref.current) return;
      ctx = gsap.context(() => {
        gsap.from("[data-reveal]", {
          y: 24,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
        });
      }, ref.current);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
