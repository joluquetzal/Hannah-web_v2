"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fixed backdrop whose colour crossfades as each `[data-bg]` section
 * scrolls through the viewport. Same idea as the old site.
 * Renders a static `noir` backdrop and does nothing under reduced motion.
 */
export function ScrollBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-noir"
    />
  );
}
