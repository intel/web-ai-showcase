/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

/* eslint-disable no-undef */
import os from "os";
import fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { mkdirpSync } from "mkdirp";
import {
  ALL_NEEDED_MODEL_RESOURCES,
  TRANSFORMER_LOCAL_MODEL_PATH
} from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function buildSubProjects(args) {
  const PROJECT_ARRAY = ["phi3-webgpu", "deepseek-r1-webgpu"];
  const buildCmd =
    args === "--github"
      ? "build:github"
      : args === "--use-remote-models"
        ? "build:use-remote-models"
        : "build";
  for (let project of PROJECT_ARRAY) {
    execSync(`cd ./samples/${project} && npm install && npm run ${buildCmd}`, {
      stdio: "inherit"
    });
  }
}

function copyResourcesIntoDist(args) {
  // ignore the models resources deployed with `remote` mode
  const RESOURCES_ARRAY = args === "--use-remote-models" ? [] : ["models"];

  const REMOTE_DEMOS_DIST = {
    "samples/phi3-webgpu/dist/assets": "/assets",
    "samples/phi3-webgpu/dist/index.html": "samples/phi3-webgpu/",
    "samples/deepseek-r1-webgpu/dist/assets": "/assets",
    "samples/deepseek-r1-webgpu/dist/index.html": "samples/deepseek-r1-webgpu/"
  };

  console.log(">>> Copy resources into distribution package...");
  if (os.platform() === "win32") {
    for (let path of RESOURCES_ARRAY) {
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
    for (let path of RESOURCES_ARRAY) {
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

  console.log("<<< All resources have been copied into distribution package!");
}

async function fetchResources() {
  const logFile = "fetch_models.log";
  const RESOURCE_URL_DEST_MAPPING = {};

  const constructModelsFolderPath = (modelName, resourceName) => {
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
  };

  const constructUrlDestMapping = (modelName) => {
    const modelObject = ALL_NEEDED_MODEL_RESOURCES[modelName];
    const resourceArray = modelObject.resources;

    resourceArray.map((file) => {
      const _url = new URL(file, modelObject.linkPathPrefix).href;

      RESOURCE_URL_DEST_MAPPING[_url] = constructModelsFolderPath(
        modelName,
        file
      );
    });
  };

  const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to download ${url}: ${response.statusText}`
            );
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
  };

  const cleanUp = () => {
    // remove the log file when all resources are downloaded successfully
    const logFilePath = path.resolve(__dirname, logFile);
    fse.remove(logFilePath);
  };

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
        continue;
      }
    }

    cleanUp();

    console.log(
      "<<< Download process completed, please check that all necessary resources have been successfully fetched!"
    );
  } catch (error) {
    console.error(
      `\n\n[x] Error occur when downloading resources: \n${error}. ${os.platform() !== "win32" ? `\n\n\nSee ${path.resolve(__dirname, logFile)} for details.` : ""}`
    );
  }
}

function buildForGithub() {
  buildSubProjects("--github");
  copyResourcesIntoDist("--use-remote-models");
}

function buildForRemoteMode() {
  buildSubProjects("--use-remote-models");
  copyResourcesIntoDist("--use-remote-models");
}

function buildForLocalMode() {
  fetchResources();
  buildSubProjects();
  copyResourcesIntoDist();
}

const MODE = process.argv.slice(2)[0];
switch (MODE) {
  case "--github":
    // build for deployment on github
    // Remote mode + different base url
    buildForGithub();
    break;
  case "--use-remote-models":
    // build for Remote mode
    buildForRemoteMode();
    break;
  default:
    // build for Hoisting mode by default
    buildForLocalMode();
    break;
}
