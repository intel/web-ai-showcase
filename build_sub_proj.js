/* eslint-disable no-undef */

import { execSync } from "child_process";

const PHI3_PROJECT_NAME = "phi3-webgpu";

const args = process.argv.slice(2);
const buildCmd = args[0] === "github" ? "build:github" : "build";

function buildPhi3WebGPU() {
  execSync(
    `cd ./samples/${PHI3_PROJECT_NAME} && npm install && npm run ${buildCmd}`,
    {
      stdio: "inherit"
    }
  );
}

buildPhi3WebGPU();
