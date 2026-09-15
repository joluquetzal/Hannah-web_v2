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
        // noir and fails WCAG AA for body text). #847A6F is 4.68:1 on noir —
        // and only on noir: 4.49:1 on `surface` and 1.79:1 on `sand` both
        // fail, so `muted` is a noir-only token (layout-responsive §8).
        muted: "#847A6F",
        // Concept 03 sheet + header palette (pipeline D3).
        // Lifted noir: the sheet theme that sits a step above the page ground,
        // so a stacked sheet reads as a separate plane without a border.
        surface: "#151010",
        ink: "#221A08", // header bar ground
        paper: "#FFEBD6", // header strip ground + filled header button
        stone: "#9C917D", // inactive breadcrumbs on `ink` (5.54:1)
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "Cambria", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "-apple-system", "sans-serif"],
        // Header chrome (Concept 03): nav links, breadcrumbs and the strip.
        hserif: ["var(--font-source-serif)", "Georgia", "Cambria", "serif"],
        // Header buttons and the ES/EN switch.
        grotesk: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
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
        // Concept 03 heavy-caps scale: DM Sans 800, uppercase, tight leading.
        // These are the redesign's page-level type — the `display-*` sizes
        // above stay for the Cormorant italic accent phrases inside them.
        // Curves traced from the prototype's cqi values, re-expressed as
        // rem + vw so they still respond to the user's font-size setting.
        // caps-md is provisional until Phase 6 renders the longest treatment
        // names (HIDRODERMOABRASIÓN, MASAJE PIEDRAS CALIENTES) at every width.
        "caps-xl": "clamp(2.6rem, 0.5rem + 8.6vw, 8.5rem)", // Inicio + page h1
        "caps-lg": "clamp(3.2rem, 0.4rem + 11.5vw, 10rem)", // category / hub titles
        "caps-md": "clamp(2.4rem, 1.2rem + 4.85vw, 5.6rem)", // treatment names
        "caps-sm": "clamp(1.9rem, 1.5rem + 1.7vw, 3.2rem)", // cards, hub columns
      },
      // Tracking for the two uppercase-caps roles. Uppercase text is always
      // tracked (see styling-tailwind rule); these replace the repeated
      // arbitrary `tracking-[0.2em]` / `tracking-[0.3em]`.
      letterSpacing: {
        label: "0.2em", // inline labels, button text, small caps CTAs
        eyebrow: "0.3em", // section eyebrows above a heading
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
      // The ONE sanctioned viewport-height value (pipeline D1). A window sheet
      // fills what is left below the sticky header. `svh` so mobile browser
      // chrome doesn't clip it. Usable only by ServiceColumns and
      // TreatmentWindow, and only as `min-h-` — never `h-` — so a sheet whose
      // content outgrows the window still grows. See layout-responsive §5.
      minHeight: {
        window: "calc(100svh - var(--header-h))",
      },
      // Sheets are rounded at the top and cast an upward shadow, so the sheet
      // rising over the previous one reads as a separate plane.
      borderRadius: {
        sheet: "18px",
      },
      boxShadow: {
        sheet: "0 -30px 60px -30px rgb(0 0 0 / 0.75)",
      },
      // Documented z-scale — no arbitrary values (styling-tailwind).
      // Sheets stack in normal flow at the default z-index; everything here
      // sits above them.
      zIndex: {
        menu: "30", // mobile menu panel
        header: "40", // sticky site header
        mega: "45", // services mega menu, above the header it drops from
      },
    },
  },
  plugins: [],
};

export default config;
