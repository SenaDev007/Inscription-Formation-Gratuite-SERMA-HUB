import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#080e20",
          light: "#0d1530",
          elevated: "#111e3a",
          dark: "#050810",
        },
        orange: {
          DEFAULT: "#F59B1E",
          hover: "#e08a10",
        },
        green: {
          serma: "#2BA96B",
        },
        muted: "#64748b",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        orange: "0 0 24px rgba(245,155,30,0.35), 0 4px 12px rgba(245,155,30,0.15)",
        "orange-sm": "0 0 12px rgba(245,155,30,0.25)",
        card: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,155,30,0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 90% 110%, rgba(43,169,107,0.04) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
