/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// eslint-disable-next-line no-undef
const args = process.argv.slice(2);
const value = args[0];

const filePath = path.join(__dirname, "./config.js");
let fileContent = fs.readFileSync(filePath, "utf8");

// default to use local
let USE_REMOTE_MODELS = false;

if (value === "remote-models") {
  USE_REMOTE_MODELS = true;
}

fileContent = fileContent.replace(
  /(export const USE_REMOTE_MODELS =\s*)(true|false)/,
  `$1${USE_REMOTE_MODELS}`
);

fs.writeFileSync(filePath, fileContent, "utf8");
