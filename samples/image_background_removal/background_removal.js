/*
 * This file is modified based on
 *     https://github.com/xenova/transformers.js/blob/main/examples/remove-background-client/main.js
 */

import { AutoModel, AutoProcessor, env, RawImage } from "@xenova/transformers";

import { setupNavigBar } from "../../js/navbar.js";
import {
  changeClass4StatusBar,
  getRequestPrefix,
  defineResourcesObject,
  htmlToElement,
  formatBytes,
  getElementId4Resource,
  constructLoadModelsPanel,
  initModelsPanelHandler,
  removeHiddenClass
} from "../common/utility.js";
import {
  USE_REMOTE_MODELS,
  ALL_NEEDED_MODEL_RESOURCES,
  TRANSFORMERS_V3_ORT_ENV_WASM_FILE_PATH
} from "../../config.js";

import exampleImg from "/assets/person.avif";

// load navigation bar
setupNavigBar("../..");

// Since we will download the model from the Hugging Face Hub, we can skip the local model check
env.allowLocalModels = USE_REMOTE_MODELS ? false : true;
env.allowRemoteModels = USE_REMOTE_MODELS ? true : false;

// Proxy the WASM backend to prevent the UI from freezing
env.backends.onnx.wasm.proxy = false;

// set up local wasm paths for hosting mode
if (!USE_REMOTE_MODELS) {
  env.backends.onnx.wasm.wasmPaths = TRANSFORMERS_V3_ORT_ENV_WASM_FILE_PATH;
}

// Constants
const DEFAULT_CACHE_STORAGE_NAME = "transformers-cache";
const MODEL_NAME = "RMBG-1.4";

// Reference the elements that we will need
const fileUpload = document.getElementById("upload");
const imageContainer = document.getElementById("container");
const example = document.getElementById("example");
const LOAD_MODEL_PROMPT_CONTENT = document.getElementById(
  "loadModelPromptContent"
);
const LOADING_MODELS_TEXT = document.getElementById("loadingModelText");
const PROGRESS = document.getElementById("progress");
const PROGRESS_BAR = document.getElementById(`progressBar`);
const LOAD_MODELS_BUTTON = document.getElementById("loadModelBtn");
const LOAD_MODELS_POPOVER = document.getElementById("modelPopover");
const MODEL_PANEL_WRAPPER = document.getElementById("modelPanelWrapper");

const REQUEST_PREFIX = getRequestPrefix(MODEL_NAME);
const NEEDED_RESOURCES = defineResourcesObject(MODEL_NAME);

let startTime = 0;
let model = null;
let processor = null;

function model_progress_cb_handler(message) {
  /**
   *
   * file - "onnx/model_quantized.onnx"
   * loaded - 3997696
   * name - "briaai/RMBG-1.4"
   * progress - 9.003165670890668
   * status - "progress"
   * total : 44403226
   */
  const fileName = message.file;
  let statusBarElement = null;
  if (fileName) {
    statusBarElement = document.getElementById(
      `${fileName.match(/\/?([^/.]+?)(?:\.[^/.]+)?$/)[1]}StatusBar`
    );
  }

  switch (message.status) {
    case "download":
      if (statusBarElement) {
        startTime = new Date().getTime();

        const name = message.file;
        // if this resource has been cached before, keep hidden
        if (NEEDED_RESOURCES[name] && NEEDED_RESOURCES[name].cached) {
          return;
        }

        removeHiddenClass(LOADING_MODELS_TEXT, PROGRESS);

        PROGRESS.appendChild(
          htmlToElement(`<div model="${message.name}" file="${message.file}"
        class="relative my-4 rounded-2xl w-full min-h-[30px] bg-stone-200/40 flex items-center justify-between font-mono"
      >
    <div class="relative px-2 z-20" name="statusText"></div>
    <div class="relative px-2 z-20">
      <span name="progressVal">0%</span>
    </div>
    <div
      name="progressBar"
      class="absolute top-0 rounded-2xl z-10 text-right bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    ></div>
    </div>`)
        );
      }

      break;
    case "progress":
      if (statusBarElement) {
        if (
          NEEDED_RESOURCES[message.file] &&
          NEEDED_RESOURCES[message.file].cached
        ) {
          statusBarElement.textContent = "loading";
          changeClass4StatusBar("loading", statusBarElement);
          NEEDED_RESOURCES[message.file].size = message.total;
          break;
        } else {
          statusBarElement.textContent = "downloading";
          changeClass4StatusBar("loading", statusBarElement);
          NEEDED_RESOURCES[message.file].size = message.total;

          const barElem = PROGRESS.querySelector(
            `div[model="${message.name}"][file="${message.file}"]`
          );

          if (barElem !== null) {
            const statusTextElem = barElem.querySelector(
              "div[name='statusText']"
            );

            const progressBarElem = barElem.querySelector(
              "div[name='progressBar']"
            );
            const progressValElem = barElem.querySelector(
              "span[name='progressVal']"
            );

            // update the status bar to 'loading'

            // update existing bar
            if (!progressBarElem.style.height) {
              progressBarElem.style.height = "30px";
            }
            progressBarElem.style.width = message.progress.toFixed(2) + "%";
            progressValElem.textContent = message.progress.toFixed(2) + "%";
            statusTextElem.textContent = `${message.file} (${formatBytes(
              message.loaded
            )} / ${formatBytes(message.total)})`;
            break;
          }
        }
      }
      break;

    case "done":
      if (!PROGRESS.classList.contains("hidden")) {
        PROGRESS.classList.add("hidden");
      }
      if (!LOADING_MODELS_TEXT.classList.contains("hidden")) {
        LOADING_MODELS_TEXT.classList.add("hidden");
      }

      let endTime = new Date().getTime();
      // Remove the progress bar
      // update the status bar of this resource
      // if this resource has been cached before, show `cached loaded`, or `download` if uncached
      if (statusBarElement) {
        let source = "downloaded";
        let size = 0;
        if (NEEDED_RESOURCES[message.file]) {
          size = NEEDED_RESOURCES[message.file].size;
          if (NEEDED_RESOURCES[message.file].cached) source = "cache loaded";
        }

        statusBarElement.textContent = `${source} in ${(
          (endTime - startTime) /
          1000
        ).toFixed(2)}s(${formatBytes(size)})`;
        changeClass4StatusBar("loaded", statusBarElement);
        size = 0;
      }
      break;
  }
}

example.addEventListener("click", (e) => {
  e.preventDefault();
  predict(exampleImg);
});

fileUpload.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();

  // Set up a callback when the file is loaded
  reader.onload = (e2) => predict(e2.target.result);
  reader.readAsDataURL(file);
});

function toggleStatus() {
  // toggle loading effect according to the running status
  document.querySelectorAll(".control-entry").forEach((elem) => {
    elem.classList.toggle("opacity-25");
    elem.classList.toggle("cursor-pointer");
    const inputEle = elem.querySelector("input");
    if (inputEle) {
      inputEle.disabled = inputEle.disabled ? false : true;
    }
    elem.disabled = elem.disabled ? false : true;
  });
}

constructLoadModelsPanel(MODEL_NAME, MODEL_PANEL_WRAPPER);

function bindEventListener() {
  ALL_NEEDED_MODEL_RESOURCES[MODEL_NAME].resources.map((resource) => {
    const elementId = getElementId4Resource(resource);

    const inputElement = document.getElementById(`uploadInput4${elementId}`);
    if (inputElement) {
      inputElement.addEventListener("change", async function (event) {
        const files = event.target.files;
        if (!files.length) {
          return;
        }

        const cache = await caches.open(DEFAULT_CACHE_STORAGE_NAME);

        for (const file of files) {
          const reader = new FileReader();

          reader.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
              const loaded = progressEvent.loaded;
              const total = progressEvent.total;
              // show the progress bar
              removeHiddenClass(PROGRESS_BAR);

              PROGRESS_BAR.innerHTML = `
            <div class="relative px-2 z-20" id="StatusText"></div>
            <div class="relative px-2 z-20">
              <span id="ProgressVal">0%</span>
            </div>
            <div
              id="ProgressBar"
              class="absolute top-0 rounded-2xl z-10 text-right bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            ></div>
         `;

              const statusText = document.getElementById(`StatusText`);
              // show the progress of downloading
              const progressEle = document.getElementById(`ProgressBar`);
              // show the progress value
              const progressValEle = document.getElementById(`ProgressVal`);

              let progress = (loaded / total) * 100;
              statusText.textContent = `Uploading model ...`;

              if (!progressEle.style.height) {
                progressEle.style.height = "30px";
              }
              progressEle.style.width = `${progress}%`;
              progressValEle.textContent = `${formatBytes(
                loaded
              )}/${formatBytes(total)}`;
            }
          };

          reader.onload = async function (fileEvent) {
            const arrayBuffer = fileEvent.target.result;
            const blob = new Blob([arrayBuffer]);
            const fileExt =
              file.name.split(".").length > 0 ? file.name.split(".")[1] : "";
            const contentType =
              fileExt === "json"
                ? "text/plain; charset=utf-8"
                : "binary/octet-stream";
            const response = new Response(blob, {
              headers: {
                "Content-Length": blob.size.toString(),
                "Accept-Ranges": "bytes",
                "Content-Type": contentType
              }
            });
            // construct the url for this cached resource.
            const cacheKey = REQUEST_PREFIX + resource;
            const cacheResponse = await cache.match(cacheKey);
            if (!cacheResponse) {
              cache
                .put(cacheKey, response)
                .then(() => {
                  console.log(`cache ${resource} successfully.`);
                  scanCacheStorage();
                })
                .catch((error) => {
                  console.error(`cache ${resource} failed:`, error);
                });
            }

            if (!PROGRESS_BAR.classList.contains("hidden")) {
              PROGRESS_BAR.classList.add("hidden");
            }
          };

          reader.readAsArrayBuffer(file);
        }
      });
    }
  });
}

bindEventListener();

// Predict foreground of the given image
async function predict(url) {
  toggleStatus();

  try {
    // if model and processor are not ready, initialize them first
    if (!model) {
      model = await AutoModel.from_pretrained("briaai/RMBG-1.4", {
        // Do not require config.json to be present in the repository
        progress_callback: model_progress_cb_handler,
        device: "webgpu",
        dtype: "fp32"
      });
    }

    if (!processor) {
      processor = await AutoProcessor.from_pretrained("briaai/RMBG-1.4", {
        // Do not require config.json to be present in the repository
        config: {
          do_normalize: true,
          do_pad: false,
          do_rescale: true,
          do_resize: true,
          image_mean: [0.5, 0.5, 0.5],
          feature_extractor_type: "ImageFeatureExtractor",
          image_std: [1, 1, 1],
          resample: 2,
          rescale_factor: 0.00392156862745098,
          size: { width: 1024, height: 1024 }
        },
        device: "webgpu",
        dtype: "fp32"
      });
    }

    // Read image
    const image = await RawImage.fromURL(url);

    // Update UI
    imageContainer.innerHTML = `<div id="loadingIcon" class="absolute_center">
  <div class="lds-ripple">
    <div></div>
    <div></div>
  </div>
</div>`;
    imageContainer.style.backgroundImage = `url(${url})`;

    imageContainer.style.backgroundSize = "100% 100%";
    imageContainer.style.backgroundRepeat = "no-repeat";

    // Set container width and height depending on the image aspect ratio
    const ar = image.width / image.height;
    const [cw, ch] = ar > 720 / 480 ? [720, 720 / ar] : [480 * ar, 480];
    imageContainer.style.width = `${cw}px`;
    imageContainer.style.height = `${ch}px`;

    // Preprocess image
    const { pixel_values } = await processor(image);

    // Predict alpha matte
    const { output } = await model({ input: pixel_values });

    // Resize mask back to original size
    const mask = await RawImage.fromTensor(
      output[0].mul(255).to("uint8")
    ).resize(image.width, image.height);

    // Create new canvas
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext("2d");

    // Draw original image output to canvas
    ctx.drawImage(image.toCanvas(), 0, 0);

    // Update alpha channel
    const pixelData = ctx.getImageData(0, 0, image.width, image.height);
    for (let i = 0; i < mask.data.length; ++i) {
      pixelData.data[4 * i + 3] = mask.data[i];
    }
    ctx.putImageData(pixelData, 0, 0);

    // Update UI
    imageContainer.append(canvas);
    imageContainer.style.removeProperty("background-image");
    imageContainer.style.background = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURb+/v////5nD/3QAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVBjTYwABQSCglEENMxgYGAAynwRB8BEAgQAAAABJRU5ErkJggg==")`; // status.textContent = "Done!";
    toggleStatus();
    // remove loading effect
    document.getElementById("loadingIcon").classList.toggle("hidden");
  } catch (error) {
    console.log("Error:", error);
  }
}

async function scanCacheStorage() {
  let cache = await caches.open(DEFAULT_CACHE_STORAGE_NAME);
  // loop the needed resources
  for (const name of Object.keys(NEEDED_RESOURCES)) {
    let status = "",
      textContent = "";
    const url = REQUEST_PREFIX + name;
    const cacheResponse = await cache.match(url);
    const statusBarElement = document.getElementById(
      `${name.match(/\/?([^/.]+?)(?:\.[^/.]+)?$/)[1]}StatusBar`
    );
    if (!cacheResponse || !cacheResponse.ok) {
      // not cached
      status = "unload";
      textContent = "unload";
    } else {
      status = "cached";
      textContent = "cache available";
      // add into cached resource array
      NEEDED_RESOURCES[name].cached = true;
      // hide the prompt content since the model has been cached
      if (
        LOAD_MODEL_PROMPT_CONTENT &&
        !LOAD_MODEL_PROMPT_CONTENT.classList.contains("hidden")
      ) {
        LOAD_MODEL_PROMPT_CONTENT.classList.add("hidden");
      }

      // update the status flag of this resource
      removeHiddenClass(
        document.getElementById(`${getElementId4Resource(name)}StatusFlag`)
      );
    }
    if (statusBarElement) {
      changeClass4StatusBar(status, statusBarElement);
      statusBarElement.textContent = textContent;
    }
  }
}

await scanCacheStorage();

initModelsPanelHandler(LOAD_MODELS_BUTTON, LOAD_MODELS_POPOVER);
