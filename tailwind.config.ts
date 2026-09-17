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
        gutter: "clamp(1.25rem, 0.5rem + 3vw, 4rem)", // mockup: 20px @390, 51px @1440
        // Gap between the logo and the first nav link (mockup: x=431 @1440).
        "nav-offset": "clamp(1rem, 10vw, 12rem)",
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
        // Concept 03 display scale — every value is the size the MOCKUP
        // renders (Phase 13 fidelity table), converted `N cqi` → `N vw`
        // because on the real site the frame is the viewport. Named by role,
        // not by t-shirt size, so a call site can't pick the wrong one.
        // The older "fitted to the Arial fallback" reasoning is superseded:
        // next/font ships size-adjusted fallbacks and CLS is verified by
        // measurement instead.
        "caps-hero": "clamp(2.6rem, 9.2vw, 8.5rem)", // Inicio h1
        "caps-page": "clamp(3.4rem, 15vw, 13rem)", // category h1
        "caps-talk": "clamp(3.4rem, 14vw, 12rem)", // "¿Hablamos?" talk sheet
        "caps-link": "clamp(2.4rem, 9vw, 7rem)", // "Otras categorías" rows
        "caps-name": "clamp(2.4rem, 6.2vw, 5.6rem)", // treatment name (before fit)
        "caps-col": "clamp(1.9rem, 3.2vw, 3.2rem)", // hub column title
        "caps-word": "clamp(3rem, 11.5vw, 11rem)", // /nosotros big words
        "caps-about": "2rem", // /nosotros h1 — F1, the mockup's rendered size
        "caps-statement": "clamp(1.9rem, 4.6vw, 4rem)", // /nosotros team statement
        "caps-card": "clamp(1.6rem, 3vw, 2.4rem)", // /nosotros team card title
        "caps-contact": "clamp(3.2rem, 11vw, 9.5rem)", // /contacto h1 (fit to column)
        "caps-form": "clamp(1.8rem, 3.2vw, 2.6rem)", // /contacto form title
        "caps-footer": "clamp(2.2rem, 6vw, 4.5rem)", // footer "¿Hablamos?"

        // Small-text roles. These sit BELOW the old 12px floor because the
        // mockup sets them at 11.2–11.5px; §7 records the exception.
        eyebrow: "0.72rem", // 11.5px — eyebrows
        label: "0.7rem", // 11.2px — counters, list/column headings, form labels
        btn: "0.75rem", // 12px — button text
        arrow: "0.78rem", // 12.5px — arrow links
        // Header controls are Space Grotesk at weight 400, not DM Sans 700 —
        // they are chrome, not content labels.
        hbtn: "0.9rem", // 14.4px — header bar buttons
        hstrip: "0.8rem", // 12.8px — announcement strip button
        strip: "0.92rem", // 14.7px — announcement strip text (Source Serif 400)
        nav: "0.98rem", // 15.7px — header nav links (Source Serif 600)
        mega: "0.95rem", // 15.2px — mega-menu heading
        "mega-card": "1.6rem", // mega-menu card title
        "mega-body": "0.82rem", // mega-menu card description
        "m-link": "2.4rem", // mobile menu primary links
        "m-sub": "1.4rem", // mobile menu category links
      },
      // Tracking for the two uppercase-caps roles. Uppercase text is always
      // tracked (see styling-tailwind rule); these replace the repeated
      // arbitrary `tracking-[0.2em]` / `tracking-[0.3em]`.
      letterSpacing: {
        label: "0.2em", // inline labels, button text, small caps CTAs
        eyebrow: "0.3em", // section eyebrows above a heading
        // Display caps (`text-caps-*`, DM Sans 800). Large uppercase needs the
        // opposite of what small uppercase needs: letters this size read as
        // loose at 0, so they tighten. Never use this below ~24px.
        caps: "-0.025em",
        counter: "0.24em", // treatment counter, list headings
        arrow: "0.16em", // arrow links
        meta: "0.08em", // meta chips (not uppercase)
        hero: "0.14em", // Inicio hero meta block
        hbtn: "0.02em", // header bar buttons
        hstrip: "0.03em", // announcement strip button
        nav: "-0.005em", // header nav links
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
      keyframes: {
        "crumb-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "none" },
        },
        "mega-in": {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "crumb-in": "crumb-in 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        "mega-in": "mega-in 250ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
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
