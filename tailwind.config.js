/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          100: "#feccdb",
          200: "#fd99b8",
          300: "#fb6694",
          400: "#fa3371",
          500: "#f9004d",
          600: "#c7003e",
          700: "#95002e",
          800: "#64001f",
          900: "#32000f",
        },
        white: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333",
        },
        black: {
          100: "#d1d1d1",
          200: "#a3a3a3",
          300: "#747474",
          400: "#464646",
          500: "#181818",
          600: "#131313",
          700: "#0e0e0e",
          800: "#0a0a0a",
          900: "#050505",
        },
        lightBlack: "#262626",
        niceBlack: "#191919",
        yellow: "#ffc700",
        green: "#29ffe5",
        blue: "#00eded",
        pink: "#ff01f5",
        grey: "#4d4d4d",
        hoverColor: "#3700d5",
        red: "#ff0000",
        niceGray: "#7e8d90",
      },
      spacing: {
        21: "5.25rem",
        22: "5.50rem",
        23: "5.75rem",
        24: "6rem",
        25: "6.25rem",
        26: "6.50rem",
        27: "6.75rem",
        28: "7rem",
        29: "7.25rem",
        30: "7.50rem",
        31: "7.75rem",
        32: "8rem",
        33: "8.25rem",
        34: "8.50rem",
        35: "8.75rem",
        36: "9rem",
        37: "9.25rem",
        38: "9.50rem",
        39: "9.75rem",
        40: "10rem",
        41: "10.25rem",
        42: "10.50rem",
        43: "10.75rem",
        44: "11rem",
        45: "11.25rem",
        46: "11.50rem",
        47: "11.75rem",
        48: "12rem",
        49: "12.25rem",
        50: "12.50rem",
        51: "12.75rem",
        52: "13rem",
        53: "13.25rem",
        54: "13.50rem",
        55: "13.75rem",
        56: "14rem",
        57: "14.25rem",
        58: "14.50rem",
        59: "14.75rem",
        60: "15rem",
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
      fontSize: {
        "heading-bold": [
          "83px",
          {
            lineHeight: "99.6px",
            fontWeight: "600",
          },
        ],
        "heading-semibold": [
          "83px",
          {
            lineHeight: "99.6px",
            fontWeight: "500",
          },
        ],
        "heading-light": [
          "83px",
          {
            lineHeight: "99.6px",
            fontWeight: "400",
          },
        ],
        "heading1-bold": [
          "67px",
          {
            lineHeight: "80.4px",
            fontWeight: "600",
          },
        ],
        "heading1-semibold": [
          "67px",
          {
            lineHeight: "80.4px",
            fontWeight: "500",
          },
        ],
        "heading1-light": [
          "67px",
          {
            lineHeight: "80.4px",
            fontWeight: "400",
          },
        ],

        "heading2-bold": [
          "53px",
          {
            lineHeight: "63.6px",
            fontWeight: "600",
          },
        ],
        "heading2-semibold": [
          "53px",
          {
            lineHeight: "63.6px",
            fontWeight: "500",
          },
        ],
        "heading2-light": [
          "53px",
          {
            lineHeight: "63.6px",
            fontWeight: "400",
          },
        ],

        "heading3-bold": [
          "43px",
          {
            lineHeight: "51.6px",
            fontWeight: "600",
          },
        ],
        "heading3-semibold": [
          "43px",
          {
            lineHeight: "51.6px",
            fontWeight: "500",
          },
        ],
        "heading3-light": [
          "43px",
          {
            lineHeight: "51.6px",
            fontWeight: "400",
          },
        ],

        "sub-heading1-bold": [
          "34px",
          {
            lineHeight: "40.8px",
            fontWeight: "600",
          },
        ],
        "sub-heading1-semibold": [
          "34px",
          {
            lineHeight: "40.8px",
            fontWeight: "500",
          },
        ],
        "sub-heading1-light": [
          "34px",
          {
            lineHeight: "40.8px",
            fontWeight: "400",
          },
        ],

        "sub-heading2-bold": [
          "27px",
          {
            lineHeight: "32.4px",
            fontWeight: "600",
          },
        ],
        "sub-heading2-semibold": [
          "27px",
          {
            lineHeight: "32.4px",
            fontWeight: "500",
          },
        ],
        "sub-heading2-light": [
          "27px",
          {
            lineHeight: "32.4px",
            fontWeight: "400",
          },
        ],

        "body1-bold": [
          "22px",
          {
            lineHeight: "26.4px",
            fontWeight: "600",
          },
        ],
        "body1-semibold": [
          "22px",
          {
            lineHeight: "26.4px",
            fontWeight: "500",
          },
        ],
        "body1-light": [
          "22px",
          {
            lineHeight: "26.4px",
            fontWeight: "400",
          },
        ],

        "body2-bold": [
          "18px",
          {
            lineHeight: "21.6px",
            fontWeight: "600",
          },
        ],
        "body2-semibold": [
          "18px",
          {
            lineHeight: "21.6px",
            fontWeight: "500",
          },
        ],
        "body2-light": [
          "18px",
          {
            lineHeight: "21.6px",
            fontWeight: "400",
          },
        ],

        "text1-bold": [
          "16px",
          {
            lineHeight: "19.2px",
            fontWeight: "600",
          },
        ],
        "text1-semibold": [
          "16px",
          {
            lineHeight: "19.2px",
            fontWeight: "500",
          },
        ],
        "text1-light": [
          "16px",
          {
            lineHeight: "19.2px",
            fontWeight: "400",
          },
        ],

        "text2-bold": [
          "14px",
          {
            lineHeight: "16.8px",
            fontWeight: "600",
          },
        ],
        "text2-semibold": [
          "14px",
          {
            lineHeight: "16.8px",
            fontWeight: "500",
          },
        ],
        "text2-light": [
          "14px",
          {
            lineHeight: "16.8px",
            fontWeight: "400",
          },
        ],

        "caption1-bold": [
          "11px",
          {
            lineHeight: "13.2px",
            fontWeight: "600",
          },
        ],
        "caption1-semibold": [
          "11px",
          {
            lineHeight: "13.2px",
            fontWeight: "500",
          },
        ],
        "caption1-light": [
          "11px",
          {
            lineHeight: "13.2px",
            fontWeight: "400",
          },
        ],

        "caption2-bold": [
          "9px",
          {
            lineHeight: "10.8px",
            fontWeight: "600",
          },
        ],
        "caption2-semibold": [
          "9px",
          {
            lineHeight: "10.8px",
            fontWeight: "500",
          },
        ],
        "caption2-light": [
          "9px",
          {
            lineHeight: "10.8px",
            fontWeight: "400",
          },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
