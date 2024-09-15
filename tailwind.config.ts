import type { Config } from "tailwindcss"; // Importa il tipo Config da Tailwind

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sienna: "#8a2d0e",
        olive: "#899e63",
        ivory: "#f5efe6",
        milk: "#fef9f2",
        grayStone: "#66635b",
        grayLight: "#d8dada",
        brownDark: "#514f48",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
