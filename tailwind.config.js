/* eslint-disable unicorn/prefer-module */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
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
