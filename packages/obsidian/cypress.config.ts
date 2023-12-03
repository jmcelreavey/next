import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  experimentalStudio: false,
  includeShadowDom: true,
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "artefacts/screenshots",
  videosFolder: "artefacts/videos",
  downloadsFolder: "artefacts/downloads",
  watchForFileChanges: false,
  modifyObstructiveCode: false,
  defaultCommandTimeout: 6000,
  viewportHeight: 1080,
  viewportWidth: 2048,
  env: {
    IS_CI: process.env.IS_CI,
    baseClientUrl: "http://localhost:3005",
    baseAdminUrl: "http://localhost:3010",
    docker_db_container: "mccausland-db-1",
    mysql: {
      host: "localhost",
      port: "2114",
      user: "docker",
      password: "docker",
      database: "docker",
    },
    HEIGHT: 2000,
    WIDTH: 1200,
  },
  e2e: {
    testIsolation: false,
    excludeSpecPattern: "*.ts",
    specPattern: "cypress/tests/**/*.feature",
    baseUrl: "http://localhost:3010",
    supportFile: "cypress/support/support.ts",
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      await addCucumberPreprocessorPlugin(on, config);
      await require("./cypress/plugins/plugins.ts")(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
