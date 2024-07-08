const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'wou365',
  e2e: {
    baseUrl: 'http://localhost:3000',
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
