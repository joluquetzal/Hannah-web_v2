"use client";

import { useEffect, useRef } from "react";

/**
 * 2px bar along the header's bottom edge showing how far down the page you are.
 *
 * Writes `scaleX` straight to the node in a rAF callback rather than through
 * React state — this runs on every scroll frame, and a state update per frame
 * would re-render the whole header. Transform only, so it never triggers layout.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      data-progress
      className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden text-paper motion-reduce:hidden"
    >
      <span
        ref={ref}
        data-progress-fill
        className="block h-full origin-left scale-x-0 bg-crimson-bright"
      />
    </div>
  );
}
