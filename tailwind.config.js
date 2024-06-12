/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
