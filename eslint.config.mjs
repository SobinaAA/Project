import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // Подключаем конфигурацию Prettier для отключения конфликтующих правил
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'error'
      // 'no-console': 'error' // Предупреждение при использовании console.log
    }
  }
];


const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  eslintPluginPrettierRecommended,
];