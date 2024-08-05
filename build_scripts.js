/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

/* eslint-disable no-undef */
import os from "os";
import fs from "fs";
import * as path from "path";
import * as fse from "fs-extra";
import { mkdirpSync } from "mkdirp";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

import {
  TRANSFORMER_LOCAL_MODEL_PATH,
  ALL_NEEDED_MODEL_RESOURCES
} from "./config.js";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PHI3_PROJECT_NAME = "phi3-webgpu";
const LOG_FILE = "fetch_models.log";
const RESOURCE_URL_DEST_MAPPING = {};
const RESOURCES_DIST = ["models"];
const REMOTE_DEMOS_DIST = {
  "samples/phi3-webgpu/dist/assets": "/assets",
  "samples/phi3-webgpu/dist/index.html": "samples/phi3-webgpu/"
};

function constructModelsFolderPath(modelName, resourceName) {
  const modelObject = ALL_NEEDED_MODEL_RESOURCES[modelName];
  // remove the slash in the start
  const modelRoot = TRANSFORMER_LOCAL_MODEL_PATH.replace(/^\//, "");

  const destinationPath = path.resolve(
    modelRoot,
    modelObject.localFolderPathPrefix,
    modelName,
    resourceName
  );

  const destinationDirname = path.dirname(destinationPath);

  //e.g: /models/Xenova/distilbart-cnn-6-6/onnx/
  // create this folder if not made yet.
  if (!fs.existsSync(destinationDirname)) {
    mkdirpSync(destinationDirname, {
      recursive: true
    });
  }

  return destinationPath;
}

function constructUrlDestMapping(modelName) {
  const modelObject = ALL_NEEDED_MODEL_RESOURCES[modelName];
  const resourceArray = modelObject.resources;

  resourceArray.map((file) => {
    const _url = new URL(file, modelObject.linkPathPrefix).href;

    RESOURCE_URL_DEST_MAPPING[_url] = constructModelsFolderPath(
      modelName,
      file
    );
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to download ${url}: ${response.statusText}`);
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFile(dest, buffer, (err) => {
          if (err) throw new Error(`Failed to save file: ${err.message}`);
          console.log(`File saved to ${dest}`);
          resolve();
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function cleanUp() {
  // remove the log file when all resources are downloaded successfully
  const logFilePath = path.resolve(__dirname, LOG_FILE);
  fse.remove(logFilePath);
}

async function fetchModels() {
  // loop objects to construct the folder of this model and mkdir recursively if the destination folder not exist
  // construct resources [ download link : destination ] mapping
  Object.keys(ALL_NEEDED_MODEL_RESOURCES).map((modelName) => {
    constructUrlDestMapping(modelName);
  });

  // loop to download all resources into destination
  try {
    console.warn(
      ">>> Downloading required model files(~3GB), this may take a while ..."
    );

    const keys = Object.keys(RESOURCE_URL_DEST_MAPPING);
    for (var i = 0; i < keys.length; i++) {
      const url = keys[i];
      if (fs.existsSync(RESOURCE_URL_DEST_MAPPING[url])) {
        console.warn(
          `[+] Already downloaded ${url} ${RESOURCE_URL_DEST_MAPPING[url]}`
        );
        continue;
      }
      console.warn(`[+] Downloading ${url} ...`);
      try {
        await downloadFile(url, RESOURCE_URL_DEST_MAPPING[url]);
      } catch (error) {
        console.warn(error);
        console.warn("[-] Failed to download file: ", url);
        // continue to fetch next model
        continue;
      }
    }

    cleanUp();

    console.log(
      "<<< The download process is complete, please check if all resources have been downloaded successfully!"
    );
  } catch (error) {
    console.error(
      `\n\n[x] Error occur when downloading resources: \n${error}. ${os.platform() !== "win32" ? `\n\n\nSee ${path.resolve(__dirname, LOG_FILE)} for details.` : ""}`
    );
  }
}

function copyModelsIntoDist() {
  if (os.platform() === "win32") {
    for (let path of RESOURCES_DIST) {
      if (path)
        execSync(
          `powershell -Command "Copy-Item -Path "${path}" -Destination "dist/${path}" -Recurse -Force"`,
          { stdio: "inherit" }
        );
    }

    for (const [target, dest] of Object.entries(REMOTE_DEMOS_DIST)) {
      if (!fs.existsSync(path.resolve(__dirname, `dist/${dest}`))) {
        fs.mkdirSync(path.resolve(__dirname, `dist/${dest}`), {
          recursive: true
        });
      }
      let command = "";
      if (fs.statSync(target).isFile()) {
        command = `powershell -Command "Copy-Item -Path "${target}" -Destination "dist/${dest}" -Recurse -Force"`;
      } else {
        command = `powershell -Command "Copy-Item -Path "${target}/*" -Destination "dist/${dest}" -Recurse -Force"`;
      }
      execSync(command, { stdio: "inherit" });
    }
  } else {
    for (let path of RESOURCES_DIST) {
      if (path)
        execSync(`mkdir -p dist/${path} && cp -r ${path}/* dist/${path}`);
    }

    for (const [target, dest] of Object.entries(REMOTE_DEMOS_DIST)) {
      let command = "";
      if (fs.statSync(target).isFile()) {
        command = `mkdir -p dist/${dest} && cp ${target} dist/${dest}`;
      } else {
        command = `mkdir -p dist/${dest} && cp -r ${target}/* dist/${dest}`;
      }
      execSync(command, { stdio: "inherit" });
    }
  }
}

function buildPhi3WebGPU(args) {
  const buildCmd = args === "github" ? "build:github" : "build";

  execSync(
    `cd ./samples/${PHI3_PROJECT_NAME} && npm install && npm run ${buildCmd}`,
    {
      stdio: "inherit"
    }
  );
}

// accept the command arg and run the corresponding function
const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

switch (command) {
  case "fetch-models":
    await fetchModels();
    break;
  case "copy-models":
    copyModelsIntoDist();
    break;
  case "build-sub-projects":
    buildPhi3WebGPU(commandArgs);
    break;
  default:
    console.log("Invalid command");
    console.log(
      "Usage: node scripts.js [ fetch-models | copy-models | build-sub-projects ]"
    );
    break;
}
