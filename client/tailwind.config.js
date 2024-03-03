/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: 'rgb(40, 115, 90)',
        customDarkGreen: 'rgb(27, 86, 67)'
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "fade-out": "fadeOut 1s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#174058",
          "primary-content": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
};
