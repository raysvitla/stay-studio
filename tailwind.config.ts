import type { Config } from "tailwindcss";

// Stay Studio uses Tailwind ONLY for the admin / editor chrome.
// Template rendering uses inline CSS so the preview matches the export exactly.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stay brand tokens (mirrored from lib/brand.ts)
        lilac: "#EBE1FF",
        yellow: "#FFFFA5",
        lime: "#E6FFA0",
        blue: "#E1F5FF",
        charcoal: "#3C3C3C",
        offwhite: "#FCFCFC",
        whisper: "#EDEDED",
      },
      fontFamily: {
        sans: ["Arimo", "system-ui", "sans-serif"],
        display: ["Mukta", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
