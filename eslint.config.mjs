import globals from "globals";
import tseslint from "typescript-eslint";

export default {
  files: ["**/*.{js,mjs,cjs,ts}"],
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "prefer-const": "warn",
    "no-console": "warn"
  },
  ignores: [".node_modules/*"]
};

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  eslintPluginPrettierRecommended,
];