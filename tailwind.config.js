/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: "#f9004d",
        white: "#ffffff",
        black: "#181818",
        lightBlack: "#262626",
        niceBlack: "#191919",
        yellow: "#ffc700",
        green: "#29ffe5",
        black: "#121212",
        blue: "#00eded",
        pink: "#ff01f5",
        grey: "#4d4d4d",
        hoverColor: "#3700d5",
        red: "#ff0000",
        niceGray: "#7e8d90",
      },

      fontFamily: {
        rabar: ["rabar-39"],
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
        Poppins: ["Poppins", "sans-serif"],
        Pacifico: ["Pacifico", "cursive"],
        Speda: ["speda"],
        almaria_bold: ["almaria_bold"],
        almaria_extra_bold: ["almaria_extra_bold"],
        almaria_light: ["almaria_light"],
        almaria_reguler: ["almaria_reguler"],
      },
    },
  },
  plugins: [],
};
