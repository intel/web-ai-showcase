import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  {
    files: ["**/*.js"],
    rules: {
      semi: "error",
      "no-unused-vars": [
        "error",
        { destructuredArrayIgnorePattern: "^_", argsIgnorePattern: "^_" }
      ]
    }
  },
  {
    ignores: [
      "dist/**/*.js",
      "samples/phi3-webgpu/node_modules/**/*.js",
      "samples/phi3-webgpu/dist/**/*.js",
      "samples/deepseek-r1-webgpu/node_modules/**/*.js",
      "samples/deepseek-r1-webgpu/dist/**/*.js",
      "**/*.config.js",
      "**/*.config.cjs",
      "models/**/*.js",
      "models/**/*.mjs"
    ]
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier
];
