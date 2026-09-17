"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { CRUMB_EVENT } from "@/components/SheetStack";

/**
 * Treatment image that crossfades to its muted clip while the slide is on
 * screen, then pauses when it leaves.
 *
 * Two deliberate differences from the original hover pattern:
 *
 * 1. `preload="none"` and no `autoPlay`. Six clips on a category page used to
 *    download and buffer on load — 800 KB before the visitor scrolled. Nothing
 *    is fetched now until a slide is actually reached.
 * 2. The swap follows the sheet the visitor is actually on, not hover, so it
 *    works on touch where there is no hover at all.
 *
 * It listens to the same signal that drives the live breadcrumb rather than
 * observing itself. A sticky sheet stays fully in the viewport after it has
 * been covered, so a plain IntersectionObserver leaves every visited clip
 * playing — three at once by the third treatment, which cost half the frame
 * rate (33ms frames against 16.7). Exactly one clip plays now.
 *
 * Under `prefers-reduced-motion` the clip never loads or plays and the still
 * image stays — the same outcome the CSS `motion-reduce:hidden` gave.
 */
export function TreatmentMedia({
  img,
  video,
  alt,
}: {
  img: string;
  video: string;
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onCrumb = (event: Event) => {
      const active = (event as CustomEvent<string | null>).detail === alt;
      if (active) {
        // play() rejects if the browser blocks autoplay; the still image is
        // already the fallback, so there is nothing to recover.
        void node.play().then(
          () => setPlaying(true),
          () => setPlaying(false),
        );
      } else if (!node.paused) {
        node.pause();
        setPlaying(false);
      }
    };

    window.addEventListener(CRUMB_EVENT, onCrumb);
    return () => {
      window.removeEventListener(CRUMB_EVENT, onCrumb);
      node.pause();
    };
  }, [alt]);

  return (
    <div className="absolute inset-0">
      <Image
        src={img}
        alt={alt}
        fill
        sizes="(min-width: 56rem) 45vw, 100vw"
        className={clsx(
          "object-cover transition-opacity duration-700 motion-reduce:transition-none",
          playing ? "opacity-0" : "opacity-100",
        )}
      />
      <video
        ref={videoRef}
        src={video}
        preload="none"
        aria-hidden
        loop
        muted
        playsInline
        className={clsx(
          "absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-700 motion-reduce:hidden",
          playing ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
