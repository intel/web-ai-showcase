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
  {
    ignores: [
      "node_modules",
      "dist",
      "samples/phi3-webgpu/node_modules",
      "samples/phi3-webgpu/dist",
      "samples/deepseek-r1-webgpu-local/node_modules",
      "samples/deepseek-r1-webgpu-local/dist",
      "*.config.js",
      "*.config.cjs",
      "models"
    ]
  },
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
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended
];
