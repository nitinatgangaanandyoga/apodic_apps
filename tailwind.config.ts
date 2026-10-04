import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-work-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        ivory: "#FAF7F5",
        ink: "#1C1B19",
        muted: "#8A7F6E",
        bodytext: "#4A453C",
        faint: "#ABA396",
        hairline: "#E7E1D6",
        hairline2: "#F1ECE3",
        avatarbg: "#E9E3D6",
        avatartext: "#6E6656",
        brass: {
          DEFAULT: "#B08D57",
          dark: "#5B4423",
          light: "#F3E9D8",
          accent: "#8A6A3C",
          soft: "#C9A05F",
        },
        green: {
          DEFAULT: "#2F4B3C",
          mid: "#3D5C4A",
          light: "#E4EBE4",
          dark: "#1C3128",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,27,25,0.03), 0 14px 30px -20px rgba(28,27,25,0.28)",
        cardSm: "0 1px 2px rgba(28,27,25,0.03), 0 10px 24px -18px rgba(28,27,25,0.25)",
        bar: "0 -6px 16px -12px rgba(28,27,25,0.2)",
        pop: "0 2px 8px rgba(28,27,25,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
