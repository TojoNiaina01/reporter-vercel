const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          100: "#d8e6e5",
          200: "#b2cdcb",
          300: "#8bb3b1",
          400: "#3e817d",
          500: "#659a97",
          600: "#326764",
          700: "#254d4b",
          800: "#193432",
          900: "#0c1a19",
        },
        secondary: {
          100: "#d7d1d0",
          200: "#afa3a0",
          300: "#867671",
          400: "#5e4841",
          500: "#361a12",
          600: "#2b150e",
          700: "#20100b",
          800: "#160a07",
          900: "#0b0504",
        },
      },
      backgroundImage: (theme) => ({
        "tag-bg": "url('/assets/img/TagBg.png')",
      }),
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@headlessui/tailwindcss"),
  ],
};
