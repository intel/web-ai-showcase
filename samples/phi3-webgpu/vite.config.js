/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("Loaded environment variables:", env);

  return defineConfig({
    base: env.VITE_BASE,
    plugins: [react(), basicSsl()]
  });
};
