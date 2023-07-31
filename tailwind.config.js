/* eslint-disable unicorn/prefer-module */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/fe/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightpink: "#FFF5F8",
        pink: "#FD346E",
      },
      fontFamily: {
        sans: ["var(--poppins-font)"],
        poppins: ["var(--poppins-font)", "ui-serif", "Georgia"],
      },
    },
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
