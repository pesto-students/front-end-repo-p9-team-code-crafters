/* eslint-disable unicorn/prefer-module */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightpink: "#FFF5F8",
        pink: "#FD346E",
        lightgray: "#767676",
        neutral: "#5A5A5A",
        fontBlack: "#333333",
      },
      fontFamily: {
        sans: ["var(--poppins-font)"],
        poppins: ["var(--poppins-font)", "ui-serif", "Georgia"],
      },
      minHeight: {
        mainLayout: "calc(100vh - 128px)",
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
