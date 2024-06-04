import { execSync } from "child_process";

const PHI3_PROJECT_NAME = "phi3-webgpu";

function buildPhi3WebGPU() {
  try {
    execSync(
      `cd ./samples/${PHI3_PROJECT_NAME} && npm install && npm run build`,
      {
        stdio: "inherit"
      }
    );
  } catch (error) {
    throw error;
  }
}

buildPhi3WebGPU();
