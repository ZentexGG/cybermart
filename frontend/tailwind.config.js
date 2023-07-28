/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-down-out": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "50%": {
            opacity: "1",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: "0",
          },
        },
      },
      animation: {
        "fade-in-down-out": "fade-in-down-out 3s ease-out",
      },
    },
  },
  plugins: [],
};
