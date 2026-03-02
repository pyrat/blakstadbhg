/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./assets/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  "#f3f7ee",
          100: "#e4eeda",
          200: "#c7dcb5",
          300: "#a3c488",
          400: "#7ea85c",
          500: "#6B8F47",
          600: "#4e6e32",
          700: "#3d5627",
          800: "#2D5016",
          900: "#1e3610",
          950: "#0f1d08",
        },
        sand: {
          50:  "#fdfaf4",
          100: "#F5E6C8",
          200: "#ead4a0",
          300: "#ddb96e",
          400: "#ce9a41",
          500: "#b97f28",
          600: "#96631e",
          700: "#7a4d1b",
          800: "#663f1c",
          900: "#58351b",
        },
        moss: {
          400: "#8fb060",
          500: "#6B8F47",
          600: "#547239",
        },
      },
      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
