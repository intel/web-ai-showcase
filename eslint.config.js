import globals from "globals";
import pluginJs from "@eslint/js";

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
      "samples/deepseek-r1-webgpu-local/node_modules/**/*.js",
      "samples/deepseek-r1-webgpu-local/dist/**/*.js",
      "**/*.config.js",
      "**/*.config.cjs",
      "models/**/*.js",
      "models/**/*.mjs"
    ]
  },
  pluginJs.configs.recommended
];
