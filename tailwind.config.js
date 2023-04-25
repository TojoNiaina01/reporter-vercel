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
          100: "#e3d8d6",
          200: "#c8b1ae",
          300: "#ac8a85",
          400: "#91635d",
          500: "#753c34",
          600: "#5e302a",
          700: "#46241f",
          800: "#2f1815",
          900: "#170c0a",
        },
      },
      backgroundImage: (theme) => ({
        "tag-bg": "url('/assets/img/TagBg.png')",
      }),
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
