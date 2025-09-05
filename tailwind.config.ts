import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",          
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",    
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"], 
        sans: ["Geist Sans", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [forms],
  darkMode: "class", 
} satisfies Config;

export default config;
