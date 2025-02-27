import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the .prettierrc file
const prettierConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8")
);

export default [
  { languageOptions: { globals: globals.browser } },
  {
    files: ["**/*.js"],
    rules: {
      semi: "error",
      "no-unused-vars": [
        "error",
        { destructuredArrayIgnorePattern: "^_", argsIgnorePattern: "^_" }
      ],
      "prettier/prettier": ["error", prettierConfig]
    }
  },
  {
    ignores: [
      "dist/**/*.js",
      "samples/phi3-webgpu/node_modules/**/*.js",
      "samples/phi3-webgpu/dist/**/*.js",
      "samples/deepseek-r1-webgpu/node_modules/**/*.js",
      "samples/deepseek-r1-webgpu/dist/**/*.js",
      "samples/deepseek-r1-webgpu-local/node_modules/**/*.js",
      "samples/deepseek-r1-webgpu-local/dist/**/*.js",
      "**/*.config.js",
      "**/*.config.cjs",
      "models/**/*.js",
      "models/**/*.mjs"
    ]
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended
];
