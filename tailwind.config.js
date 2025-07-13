/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["active"],
  theme: {
    extend: {
      fontFamily: {
        encode: ['"Encode Sans Expanded"', "sans-serif"],
      },
      colors: {
        "main-color": "var(--color-main-color)",
        "light-color": "var(--color-light-color)",
        "rating-color": "var(--color-rating-color)",
      },
      boxShadow: {
        custom: "var(--color-shadow)",
      },
    },
  },
  plugins: [require("daisyui")],
};
