import type { Config } from "tailwindcss";

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
        primary: "#6366F1", // Updated to match feedback
        secondary: "#FBBF24",
        success: "#34D399",
        background: "#FAFAFA",
        text: "#1E293B",
        accent: "#EC4899",
      },
      fontFamily: {
        fredoka: ['"Fredoka"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(to bottom, #FAFAFA, #EEF2FF)',
        'gradient-sky': 'linear-gradient(to bottom, #DBEAFE, #FEF3C7)',
      },
    },
  },
  plugins: [],
};
export default config;

