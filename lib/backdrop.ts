/**
 * Hex values for the `[data-bg]` sections that ScrollBackdrop tweens between.
 *
 * GSAP animates a real colour value, so these can't be Tailwind classes.
 * Keep them in sync with `theme.extend.colors` in tailwind.config.ts.
 */
export const backdrop = {
  noir: "#0E0A0A",
  crimsonLight: "#3D1A1A",
} as const;
