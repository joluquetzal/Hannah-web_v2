"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { ReactNode } from "react";

/**
 * Fades its children up 28px the first time they are 15% visible, then stops
 * observing. Content is rendered visible and only *becomes* hidden once the
 * observer is attached, so with JS off — or under reduced motion — nothing is
 * ever left invisible.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        armed && "transition-[opacity,transform] duration-[900ms] ease-out",
        armed && !shown && "translate-y-7 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
