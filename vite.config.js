/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { existsSync } from "fs";
import * as path from "path";
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

export default () => {
  return defineConfig({
    // define the global variable
    define: {
      VITE_ENV_USE_REMOTE_MODELS: process.argv
        .slice(2)
        .includes(`use-remote-models`)
        ? true
        : false
    },
    base: "./",
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext"
      }
    },
    server: {
      fallback: false,
      host: "0.0.0.0",
      https: true
    },

    build: {
      target: "esnext",
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          stable_diffusion: path.resolve(
            __dirname,
            "samples/stable_diffusion/stable-diffusion.html"
          ),
          llm_gemma: path.resolve(__dirname, "samples/llm_gemma/gemma.html"),
          image_background_removal: path.resolve(
            __dirname,
            "samples/image_background_removal/index.html"
          ),
          image_to_text: path.resolve(
            __dirname,
            "samples/image_to_text/index.html"
          ),
          summarization: path.resolve(
            __dirname,
            "samples/summarization/index.html"
          ),
          question_answering: path.resolve(
            __dirname,
            "samples/question_answering/index.html"
          ),

          worker: path.resolve(__dirname, "samples/common/worker.js")
        }
      }
    },

    worker: {
      plugins: () => [
        topLevelAwait({
          // The export name of top-level await promise for each chunk module
          promiseExportName: "__tla",
          // The function to generate import names of top-level await promise in each chunk module
          promiseImportName: (i) => `__tla_${i}`
        })
      ]
    },

    plugins: [basicSsl(), resourceHandlerPlugin()]
  });
};
