/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "520px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        customOrange: "#d88531",
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addBase }) {
      addBase({
        body: { fontFamily: '"Roboto Slab", serif' },
      });
    },
  ],
};
