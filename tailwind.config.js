/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        button: "var(--color-button)",
        "link-hover": "var(--color-link-hover)",
        main: "#242424",
        "light-background": "#f0f4f8",
        "dark-background": "#1a202c",
      },
      screens: {
        phone: { max: "767px" },
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
      },

      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at center, #ffffff0f, #0000001a)",
      },
      transitionDuration: {
        custom: "var(--transition-speed)",
      },
    },
  },
  plugins: [nextui()],
};
