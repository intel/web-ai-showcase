/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

import {
  ALL_NEEDED_MODEL_RESOURCES,
  TRANSFORMER_LOCAL_MODEL_PATH
} from "./config.js";
import * as path from "path";
import { mkdirpSync } from "mkdirp";
import fs from "fs";
import * as fse from "fs-extra";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = "fetch_models.log";
const RESOURCE_URL_DEST_MAPPING = {};

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
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.statusText}`);
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => {
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFile(dest, buffer, err => {
        if (err) throw new Error(`Failed to save file: ${err.message}`);
        console.log(`File saved to ${dest}`);
        resolve();
      })
    })
    .catch(error => {
      console.error(error);
      reject();
    })
  })
}

function cleanUp() {
  // remove the log file when all resources are downloaded successfully
  const logFilePath = path.resolve(__dirname, logFile);
  fse.remove(logFilePath);
}

async function main() {
  // loop objects to construct the folder of this model and mkdir recursively if the destination folder not exist
  // construct resources [ download link : destination ] mapping
  Object.keys(ALL_NEEDED_MODEL_RESOURCES).map((modelName) => {
    constructUrlDestMapping(modelName);
  });

  // loop to download all resources into destination
  try {
    console.warn(">>> Downloading required model files(~3GB), this may take a while ...");

    const keys = Object.keys(RESOURCE_URL_DEST_MAPPING);
    for (var i = 0; i < keys.length; i++) {
      const url = keys[i];
      if (fs.existsSync(RESOURCE_URL_DEST_MAPPING[url])) {
        console.warn(`[+] Already downloaded ${url} ${RESOURCE_URL_DEST_MAPPING[url]}`);
        continue;
      }
      console.warn(`[+] Downloading ${url} ...`);
      await downloadFile(url, RESOURCE_URL_DEST_MAPPING[url]);
    }

    cleanUp();

    console.log("<<< All resources have been downloaded successfully!");
  } catch (error) {
    console.error(
      `\n\n[x] Error occur when downloading resources: \n${error}. ${os.platform() !== "win32" ? `\n\n\nSee ${path.resolve(__dirname, logFile)} for details.` : ""}`
    );
  }
}

await main();
