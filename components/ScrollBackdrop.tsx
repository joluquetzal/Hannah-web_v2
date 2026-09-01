"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed backdrop whose colour crossfades as each `[data-bg]` section
 * scrolls through the viewport. Same idea as the old site.
 * GSAP + ScrollTrigger are imported lazily (kept out of the initial
 * bundle); renders a static `noir` backdrop and no-ops under reduced motion.
 */
export function ScrollBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);

        // No scope argument: gsap.context(fn, scope) would scope the
        // "[data-bg]" selector to the backdrop div, which contains none of
        // the page's sections. The sections live across the whole document.
        ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>("[data-bg]").forEach((section) => {
            const color = section.dataset.bg;
            if (!color) return;
            ScrollTrigger.create({
              trigger: section,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => {
                if (self.isActive) {
                  gsap.to(el, {
                    backgroundColor: color,
                    duration: 0.8,
                    overwrite: "auto",
                  });
                }
              },
            });
          });
          ScrollTrigger.refresh();
        });
      },
    );

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-noir"
    />
  );
}
