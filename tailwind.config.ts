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
          DEFAULT: "#1B2A5C",
          light: "#243570",
          dark: "#141f45",
        },
        orange: {
          DEFAULT: "#F59B1E",
          hover: "#e08a10",
        },
        green: {
          serma: "#2BA96B",
        },
        muted: "#94A3B8",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        orange: "0 0 20px rgba(245, 155, 30, 0.4)",
        "orange-sm": "0 0 10px rgba(245, 155, 30, 0.3)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at top right, rgba(245,155,30,0.12) 0%, transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
