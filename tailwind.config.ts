import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EB5E28",
        black: "#221E22",
        white: "#FFFCF2"
      },
      fontFamily: {
        "poppins": ["var(--font-poppins)", "sans-serif"]
      }
    },
  },
  plugins: [],
} satisfies Config;
