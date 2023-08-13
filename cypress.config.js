/* eslint-disable unicorn/prefer-module */
const {defineConfig} = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Change this to your app's URL
    specPattern: "**/*.cy.js",
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    supportFile: "cypress/support/e2e.js",
  },
});
