import { defineConfig } from "cypress";
require("dotenv").config();

export default defineConfig({
  defaultCommandTimeout: 5000,
  viewportWidth: 1920,
  viewportHeight: 1200,
  env: {},
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
