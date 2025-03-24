/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navBackground: "#233241",
        colorAdd: "#b447a6",
        backgroundPanel: "#13072e",
        backgroundPanelSec: "#1e103e",
        backgroundPanelThird: "#330059",
        backgroundPanelFourth: "#ad4ef1",
      },
      fontSize: {
        navCustom: "0.875rem",
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["synthwave", "light"],
  },
};
