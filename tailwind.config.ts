import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0F",
        surface: {
          DEFAULT: "#121219",
          raised: "#17171f",
        },
        line: "rgba(255,255,255,0.08)",
        signal: "#34D399",
        gold: "#F59E0B",
        text: "#FAFAFA",
        muted: "#A1A1AA",
      },
      fontFamily: {
        display: ["var(--font-display)", "Sora", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      maxWidth: {
        app: "76rem",
      },
    },
  },
  plugins: [],
};

export default config;
