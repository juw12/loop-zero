import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F1EA",
        cream: "#ECE7DB",
        ink: "#0B1826",
        navy: {
          900: "#0E2338",
          800: "#143150",
          700: "#1C4266",
          600: "#27598A",
        },
        mist: { light: "#586575", dark: "#93A6BB" },
        hairline: { light: "#DAD3C4", dark: "#1E3A56" },
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
          "monospace",
        ],
      },
      maxWidth: { page: "76rem" },
      boxShadow: {
        card: "0 1px 2px rgba(11,24,38,0.04), 0 12px 32px -12px rgba(11,24,38,0.18)",
        lift: "0 2px 4px rgba(11,24,38,0.06), 0 24px 48px -16px rgba(11,24,38,0.28)",
      },
    },
  },
  plugins: [],
};
export default config;
