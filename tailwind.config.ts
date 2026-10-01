import type { Config } from "tailwindcss";

/**
 * Every color resolves through a CSS variable so the three themes
 * (ink, paper, phosphor) can re-skin the whole site from globals.css
 * with no per-component edits.
 *
 * Variables hold space-separated RGB triplets; the <alpha-value>
 * placeholder keeps Tailwind opacity modifiers working
 * (bg-signal/10, border-gold/40, bg-white/[0.06], ...).
 */
const alpha = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const zincVar = (shade: number) => alpha(`--c-zinc-${shade}`);

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
        ink: {
          DEFAULT: alpha("--c-ink"),
          soft: alpha("--c-ink-soft"),
        },
        surface: {
          DEFAULT: alpha("--c-surface"),
          raised: alpha("--c-surface-raised"),
          overlay: alpha("--c-surface-overlay"),
        },
        // Hairlines carry their alpha baked in; no opacity
        // modifiers are used with them anywhere in the site.
        line: "var(--c-line)",
        lineStrong: "var(--c-line-strong)",
        signal: {
          DEFAULT: alpha("--c-signal"),
          hover: alpha("--c-signal-hover"),
        },
        gold: alpha("--c-gold"),
        text: alpha("--c-text"),
        muted: alpha("--c-muted"),
        // The raw zinc/white/rose utilities used across components
        // are theme-driven too, so body copy, captions, hairline
        // tints and the difficulty badge keep working in all themes.
        zinc: {
          50: zincVar(50),
          100: zincVar(100),
          200: zincVar(200),
          300: zincVar(300),
          400: zincVar(400),
          500: zincVar(500),
          600: zincVar(600),
          700: zincVar(700),
          800: zincVar(800),
          900: zincVar(900),
          950: zincVar(950),
        },
        white: alpha("--c-white"),
        rose: {
          300: alpha("--c-rose-300"),
          400: alpha("--c-rose-400"),
        },
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
