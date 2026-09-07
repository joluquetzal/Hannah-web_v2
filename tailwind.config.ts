import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0E0A0A",
        crimson: {
          DEFAULT: "#6B1414", // brand red — BACKGROUND only (1.63:1 on noir, fails as text)
          light: "#3D1A1A", // mid-dark surface
          bright: "#E0938A", // error / alert TEXT and borders on dark — ~8.2:1 on noir
        },
        sand: "#C9A27A",
        cream: "#F0E8DC",
        // Nudged lighter than the design-doc #7A6E65 (which is ~3.98:1 on
        // noir and fails WCAG AA for body text). #847A6F is ~4.74:1.
        muted: "#847A6F",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "Cambria", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      // Fluid page-level spacing: scales with viewport width (clamped at both
      // ends) instead of jumping at breakpoints, so outer margins stay
      // proportional to the window on everything from phones to ultrawide
      // monitors. Component-internal padding (buttons, inputs, nav/footer
      // rhythm) intentionally stays on the fixed Tailwind scale.
      spacing: {
        gutter: "clamp(1.5rem, 1rem + 2.5vw, 4rem)",
        "top-clear": "clamp(6rem, 4rem + 9vw, 11rem)",
        "section-b": "clamp(4rem, 3rem + 6vw, 7rem)",
        "section-b-lg": "clamp(5rem, 4rem + 7vw, 9rem)",
      },
      // Fluid display type: same clamp() approach as spacing above, so
      // headlines ramp continuously with the window instead of jumping once
      // at the `sm` breakpoint and then sitting flat. Body copy and UI/chrome
      // text (nav, buttons, labels, footer) stay on the fixed scale.
      fontSize: {
        "display-lg": "clamp(3rem, 2.5rem + 2.5vw, 4.5rem)",
        "display-md": "clamp(2.25rem, 1.95rem + 1.5vw, 3rem)",
        "display-sm": "clamp(1.875rem, 1.65rem + 0.9vw, 2.25rem)",
      },
      // Fluid prose width: page intros and long-form copy grow with the
      // viewport instead of hitting a fixed breakpoint cap. The upper bound
      // is the readable-measure ceiling: 36rem keeps even the densest 18px
      // body line (narrow-glyph Spanish sentences on the service pages) inside
      // the 50–75ch target on monitors up to 2560px — rendered and counted,
      // not estimated. A wider cap (50rem ≈ 90ch, 40rem ≈ 80ch on those lines)
      // blows past that on wide screens.
      maxWidth: {
        prose: "clamp(30rem, 22rem + 18vw, 36rem)",
        // The 1280px content cap. Every page's content lives in a centered
        // shell (`mx-auto max-w-shell px-gutter`) so wide monitors don't
        // stretch columns to the viewport edge — see layout-responsive rule §4.
        shell: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;
