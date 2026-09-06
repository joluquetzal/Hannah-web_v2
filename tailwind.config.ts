import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0E0A0A",
        crimson: {
          DEFAULT: "#6B1414",
          light: "#3D1A1A",
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
      // viewport instead of hitting a fixed breakpoint cap. That fixed cap
      // (max-w-2xl/3xl) is what was leaving a wall of empty space beside
      // left-aligned headers/paragraphs on wide monitors — this keeps the
      // measure readable while letting it breathe on bigger screens.
      maxWidth: {
        prose: "clamp(30rem, 22rem + 22vw, 56rem)",
      },
    },
  },
  plugins: [],
};

export default config;
