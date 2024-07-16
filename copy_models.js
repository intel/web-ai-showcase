/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

import { execSync } from "child_process";
import os from "os";
import fs from "fs";
import * as path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resources = ["models", "samples/common/3rdparty"];

const REMOTE_DEMOS_DIST = {
  "samples/phi3-webgpu/dist/assets": "/assets",
  "samples/phi3-webgpu/dist/index.html": "samples/phi3-webgpu/"
};

if (os.platform() === "win32") {
  for (let path of resources) {
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
  for (let path of resources) {
    if (path) execSync(`mkdir -p dist/${path} && cp -r ${path}/* dist/${path}`);
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
