import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import cypressPlugin from "eslint-plugin-cypress";
import jestPlugin from "eslint-plugin-jest"; // Importa el plugin de Jest

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

  // Configuración para Cypress
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

  // Configuración para el archivo de configuración de Cypress
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

  // Configuración para pruebas con Jest
  {
    files: ["**/*.{test,spec}.{js,mjs,cjs}"], // Archivos de prueba para Jest
    plugins: {
      jest: jestPlugin,
    },
    extends: ["plugin:jest/recommended"], // Reglas recomendadas de Jest
    languageOptions: {
      globals: {
        ...globals.jest, // Incluye las globals de Jest como describe, test, expect
      },
    },
    rules: {
      // Aquí puedes agregar reglas personalizadas si lo necesitas
    },
  },
]);
