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
        muted: "#7A6E65",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "Cambria", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
