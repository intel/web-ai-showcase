/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import * as path from "path";
import { existsSync } from "fs";
import topLevelAwait from "vite-plugin-top-level-await";

function resourceHandlerPlugin() {
  return {
    name: "resource-handler-plugin",
    configureServer(server) {
      const base = server.config.base || "/";

      return () => {
        server.middlewares.use((req, res, next) => {
          // Set HSTS header for secure connections
          if (req.secure) {
            // max-age is the time in seconds that the browser should remember that the site is only to be accessed using HTTPS
            // includeSubDomains ensures that the rule applies to all subdomains as well
            res.setHeader(
              "Strict-Transport-Security",
              "max-age=31536000; includeSubDomains"
            );
          }
          // if request the local static resource
          if (req.originalUrl.startsWith(base)) {
            const localPath = req.originalUrl.replace(base, "");
            const localFilePath = path.join(__dirname, localPath);
            if (!existsSync(localFilePath)) {
              res.setHeader("Content-Type", "text/html");
              res.statusCode = 404;
              res.end("Not Found");
              return;
            }
          }
          next();
        });
      };
    }
  };
}

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("Loaded environment variables:", env);

  return defineConfig({
    base: env.VITE_BASE,
    plugins: [react(), basicSsl(), resourceHandlerPlugin(), topLevelAwait()]
  });
};
