import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import cypressPlugin from "eslint-plugin-cypress";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["cypress.config.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["cypress/**/*.{js,ts}"],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...cypressPlugin.environments.globals.globals,
      },
    },
    rules: {
      "cypress/no-unnecessary-waiting": "off",
      "cypress/no-assigning-return-values": "warn",
    },
  },

  {
    files: ["cypress.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "import/no-unresolved": "off",
      "no-undef": "off",
    },
  },
]);
