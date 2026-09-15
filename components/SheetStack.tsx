"use client";

import { useEffect, useRef } from "react";

/** Live-breadcrumb channel. A DOM event keeps the header and the page
 *  decoupled — no context, no store (react-nextjs rule). */
export const CRUMB_EVENT = "hannah:crumb";

function headerHeight() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-h",
  );
  return Number.parseFloat(raw) || 0;
}

/**
 * Turns its `Sheet` children into a sticky stack: each sheet pins below the
 * header while the next one rises over it.
 *
 * Progressive enhancement: sticky is switched on by `data-stack="on"`, which is
 * only set after mount, so without JS the sheets are ordinary sections and
 * nothing is ever hidden behind another. Reduced motion keeps the stacking
 * (it is just scrolling) but loads no GSAP and applies no transforms.
 */
export function SheetStack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = ref.current;
    if (!stack) return;

    const sheets = () =>
      Array.from(stack.querySelectorAll<HTMLElement>("[data-sheet]"));

    // --- sticky offsets ----------------------------------------------------
    // A sheet shorter than the space below the header pins directly under it.
    // A taller one scrolls until its bottom meets the viewport bottom and
    // pins there, so its last lines are never cut off.
    const measure = () => {
      const header = headerHeight();
      const available = window.innerHeight - header;
      const all = sheets();

      all.forEach((sheet) => {
        sheet.classList.remove("is-tall");
        sheet.style.top = "";
      });
      all.forEach((sheet) => {
        if (sheet.hasAttribute("data-static")) return;
        if (sheet.offsetHeight > available) sheet.classList.add("is-tall");
      });
      all.forEach((sheet) => {
        if (sheet.hasAttribute("data-static")) return;
        sheet.style.top = `${header + Math.min(0, available - sheet.offsetHeight)}px`;
      });
    };

    measure();
    stack.dataset.stack = "on";

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stack);
    sheets().forEach((sheet) => resizeObserver.observe(sheet));
    window.addEventListener("resize", measure);

    // --- live breadcrumb ---------------------------------------------------
    // A sheet counts as "in view" once its top has risen above 45% of the
    // window. Sheets are sequential, so the last intersecting one in DOM
    // order is the one on screen.
    const crumbSheets = sheets().filter((s) => s.dataset.crumb);
    const active = new Set<HTMLElement>();
    const emit = () => {
      const current = crumbSheets.filter((s) => active.has(s)).pop();
      window.dispatchEvent(
        new CustomEvent<string | null>(CRUMB_EVENT, {
          detail: current?.dataset.crumb ?? null,
        }),
      );
    };
    const crumbObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) active.add(el);
          else active.delete(el);
        }
        emit();
      },
      { rootMargin: "0px 0px -55% 0px", threshold: 0 },
    );
    crumbSheets.forEach((sheet) => crumbObserver.observe(sheet));

    // --- cover effect ------------------------------------------------------
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    if (!reduced) {
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([{ gsap }, { ScrollTrigger }]) => {
          if (cancelled || !ref.current) return;
          gsap.registerPlugin(ScrollTrigger);

          ctx = gsap.context(() => {
            const all = sheets();
            const header = headerHeight();

            all.forEach((sheet, i) => {
              const inner = sheet.querySelector<HTMLElement>("[data-sheet-inner]");
              const shade = sheet.querySelector<HTMLElement>("[data-sheet-shade]");
              if (!inner) return;

              // Rising into view: fade the incoming sheet up to full opacity
              // by the time its top reaches the header.
              if (i > 0 && !sheet.hasAttribute("data-static")) {
                gsap.fromTo(
                  inner,
                  { opacity: 0.55 },
                  {
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: sheet,
                      start: "top bottom",
                      end: `top ${header}px`,
                      scrub: true,
                    },
                  },
                );
              }

              // Being covered: shrink and dim as the NEXT sheet rises. The
              // shade reaches 0.6 exactly when that sheet's top meets the
              // header's bottom.
              const next = all[i + 1];
              if (!next) return;

              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: next,
                  start: "top bottom",
                  end: `top ${header}px`,
                  scrub: true,
                },
              });
              timeline.to(inner, { scale: 0.94, y: -40, ease: "none" }, 0);
              if (shade) timeline.to(shade, { opacity: 0.6, ease: "none" }, 0);
            });

            ScrollTrigger.refresh();
          }, ref);
        },
      );
    }

    return () => {
      cancelled = true;
      ctx?.revert();
      resizeObserver.disconnect();
      crumbObserver.disconnect();
      window.removeEventListener("resize", measure);
      delete stack.dataset.stack;
      sheets().forEach((sheet) => {
        sheet.style.top = "";
        sheet.classList.remove("is-tall");
      });
      window.dispatchEvent(
        new CustomEvent<string | null>(CRUMB_EVENT, { detail: null }),
      );
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
}
