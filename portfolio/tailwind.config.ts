import type { Config } from "tailwindcss";

/**
 * Design tokens for the agency portfolio.
 *
 * Palette: deep blue (navy/ink) + warm neutral (paper/cream) + one accent (amber).
 * Fonts use system stacks (no Google Fonts dependency, works offline + behind any proxy).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4F1EA",
        cream: "#ECE7DB",
        sand: "#E3DCCC",
        ink: "#0B1826",
        navy: {
          950: "#081521",
          900: "#0E2338",
          800: "#143150",
          700: "#1C4266",
          600: "#27598A",
          500: "#37709F",
        },
        mist: {
          light: "#586575",
          dark: "#93A6BB",
        },
        hairline: {
          light: "#DAD3C4",
          dark: "#1E3A56",
        },
        accent: {
          DEFAULT: "#C97B24",
          bright: "#E8A24A",
          soft: "#F1E3CB",
        },
      },
      fontFamily: {
        display: [
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      maxWidth: {
        prose: "65ch",
        page: "76rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,24,38,0.04), 0 12px 32px -12px rgba(11,24,38,0.18)",
        lift: "0 2px 4px rgba(11,24,38,0.06), 0 24px 48px -16px rgba(11,24,38,0.28)",
        glow: "0 0 0 1px rgba(201,123,36,0.25), 0 24px 60px -20px rgba(201,123,36,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.8)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.06)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 1s ease both",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        drift: "drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
