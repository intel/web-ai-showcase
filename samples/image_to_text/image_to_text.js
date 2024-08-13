/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

import { setupNavigBar } from "../../js/navbar.js";
import {
  changeClass4StatusBar,
  defineResourcesObject,
  getRequestPrefix,
  constructLoadModelsPanel,
  initModelsPanelHandler,
  formatBytes,
  htmlToElement,
  getElementId4Resource,
  removeHiddenClass
} from "../common/utility.js";
import exampleImgPath from "/assets/cats.png";

import { ALL_NEEDED_MODEL_RESOURCES } from "../../config.js";

import Worker from "../common/worker.js?worker&inline";

setupNavigBar("../..");

const worker = new Worker();
const DEFAULT_CACHE_STORAGE_NAME = "transformers-cache";
const MODEL_NAME = "vit-gpt2-image-captioning";

const IMAGE2TEXT_INPUT = document.getElementById("upload");
const IMAGE_WRAPPER = document.getElementById("image-wrapper");
const IMAGE2TEXT_OUTPUT_TEXTBOX = document.getElementById(
  "image2text-output-textbox"
);
const PROGRESS = document.getElementById("progress");
const EXAMPLE_BUTTON = document.getElementById("example");
const STATUS_SPAN = document.getElementById("status");
const LOAD_MODEL_PROMPT_CONTENT = document.getElementById(
  "loadModelPromptContent"
);
const LOADING_MODELS_TEXT = document.getElementById("loadingModelText");
const LOAD_MODELS_BUTTON = document.getElementById("loadModelBtn");
const LOAD_MODELS_POPOVER = document.getElementById("modelPopover");
const PROGRESS_BAR = document.getElementById(`progressBar`);
const MODEL_PANEL_WRAPPER = document.getElementById("modelPanelWrapper");

const REQUEST_PREFIX = getRequestPrefix(MODEL_NAME);
const NEEDED_RESOURCES = defineResourcesObject(MODEL_NAME);

let startTime = 0;
let timeoutId = null;
let lastContent = null;

const defaultParams = {
  max_new_tokens: 50,
  num_beams: 1,
  temperature: 1,
  top_k: 0,
  do_sample: false
};

for (const [param, value] of Object.entries(defaultParams)) {
  document.getElementById(param).value = value;
}

function getParams() {
  let parametersObj = {};
  for (const [param, _value] of Object.entries(defaultParams)) {
    const ele = document.getElementById(param);

    if (ele && ele.value !== undefined) {
      if (param === "do_sample") {
        parametersObj[param] = ele.value === "true" ? true : false;
      } else {
        parametersObj[param] = parseInt(ele.value);
      }
    }
  }
  return parametersObj;
}

function checkForChanges() {
  const currentContent = IMAGE2TEXT_OUTPUT_TEXTBOX.value;
  if (currentContent === lastContent) {
    toggleStatus();
    STATUS_SPAN.parentElement.classList.toggle("hidden");
    STATUS_SPAN.textContent = "";
    timeoutId = null;
  } else {
    lastContent = currentContent;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(checkForChanges, 1500);
  }
}

EXAMPLE_BUTTON.addEventListener("click", (e) => {
  e.preventDefault();
  const img = new Image();
  img.onload = function () {
    STATUS_SPAN.textContent = "Generating ... ";
    STATUS_SPAN.parentElement.classList.toggle("hidden");
    toggleStatus();
    startTime = new Date().getTime();
    triggerInference(img);
  };
  img.classList.add("object-contain", "w-full");
  img.src = exampleImgPath;
  IMAGE_WRAPPER.innerHTML = "";
  IMAGE_WRAPPER.appendChild(img);
});

IMAGE2TEXT_INPUT.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);

  const img = new Image();
  img.onload = function () {
    STATUS_SPAN.textContent = "Generating";
    STATUS_SPAN.parentElement.classList.toggle("hidden");
    toggleStatus();
    startTime = new Date().getTime();
    triggerInference(img);
  };
  img.classList.add("object-contain", "w-full");
  img.src = url;
  IMAGE_WRAPPER.innerHTML = "";
  IMAGE_WRAPPER.appendChild(img);
});

function getImageDataFromImage(original) {
  // Helper function to get image data from image element
  const canvas = document.createElement("canvas");
  canvas.width = original.naturalWidth;
  canvas.height = original.naturalHeight;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(original, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
}

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

function triggerInference(img) {
  // Set and pass generation settings to web worker
  let data = {
    baseURI: document.baseURI,
    task: "image-to-text",
    generation: getParams(),
    image: getImageDataFromImage(img),
    elementIdToUpdate: IMAGE2TEXT_OUTPUT_TEXTBOX.id
  };

  worker.postMessage(data);
}

worker.addEventListener("message", (event) => {
  if (!event.data) return;

  const message = event.data;
  switch (message.type) {
    case "download": // for session creation
      if (message.data.status === "initiate") {
        // if this resource is not displayed in status bar like
        // `config.json`, currently only `.onnx` files are displayed
        if (
          !message.data.file ||
          (message.data.file.split(".").length > 0 &&
            message.data.file.split(".")[1] !== "onnx") ||
          !NEEDED_RESOURCES[message.data.file] ||
          NEEDED_RESOURCES[message.data.file].cached
        ) {
          break;
        }

        removeHiddenClass(LOADING_MODELS_TEXT, PROGRESS);

        PROGRESS.appendChild(
          htmlToElement(`<div model="${message.data.name}" file="${message.data.file}"
        class="relative 2xl:my-2 my-1 2xl:rounded-2xl rounded-lg w-full 2xl:min-h-[30px] min-h-[20px] bg-stone-200/40 flex items-center justify-between font-mono"
      >
    <div class="relative px-2 z-20 2xl:text-sm text-xs" name="statusText"></div>
    <div class="relative px-2 z-20 2xl:text-sm text-xs">
      <span name="progressVal">0%</span>
    </div>
    <div
      name="progressBar"
      class="absolute top-0 2xl:rounded-2xl rounded-lg z-10 text-right bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 2xl:min-h-[30px] min-h-[20px] "
    ></div>
    </div>`)
        );
      } else {
        if (message.data.status === "ready") {
          // Pipeline is ready - hide container
          if (!PROGRESS.classList.contains("hidden")) {
            PROGRESS.classList.add("hidden");
          }
          if (!LOADING_MODELS_TEXT.classList.contains("hidden")) {
            LOADING_MODELS_TEXT.classList.add("hidden");
          }
          break;
        }
        const barElem = PROGRESS.querySelector(
          `div[model="${message.data.name}"][file="${message.data.file}"]`
        );

        const statusBarElement = document.getElementById(
          `${message.data.file.match(/\/?([^/.]+?)(?:\.[^/.]+)?$/)[1]}StatusBar`
        );

        switch (message.data.status) {
          case "progress": {
            if (!message.data.file || !NEEDED_RESOURCES[message.data.file]) {
              break;
            }

            const name = message.data.file;
            // update the status bar to 'loading'
            if (statusBarElement) {
              // if this resource has been cached before, show loading and update the size
              if (NEEDED_RESOURCES[name].cached) {
                statusBarElement.textContent = "loading";
                changeClass4StatusBar("loading", statusBarElement);
                // Validate message.data.total before assigning
                if (
                  typeof message.data.total === "number" &&
                  !isNaN(message.data.total) &&
                  message.data.total > 0
                ) {
                  NEEDED_RESOURCES[name].size = message.data.total;
                }
                break;
              }
              // means the resource has not been cached, should download and update the progress bar
              else {
                statusBarElement.textContent = "downloading";
                changeClass4StatusBar("loading", statusBarElement);
                // Validate message.data.total before assigning
                if (
                  typeof message.data.total === "number" &&
                  !isNaN(message.data.total) &&
                  message.data.total > 0
                ) {
                  NEEDED_RESOURCES[name].size = message.data.total;
                }
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

                  // update existing bar
                  if (!progressBarElem.style.height) {
                    progressBarElem.style.height = "100%";
                  }
                  progressBarElem.style.width =
                    message.data.progress.toFixed(2) + "%";
                  progressValElem.textContent =
                    message.data.progress.toFixed(2) + "%";
                  statusTextElem.textContent = `${
                    message.data.file
                  } (${formatBytes(message.data.loaded)} / ${formatBytes(
                    message.data.total
                  )})`;
                }
              }
            }
            break;
          }

          case "done": {
            if (!message.data.file || !NEEDED_RESOURCES[message.data.file]) {
              break;
            }
            let endTime = new Date().getTime();
            // Remove the progress bar
            if (barElem !== null) barElem.classList.add("hidden");

            // update the status flag of this resource
            removeHiddenClass(
              document.getElementById(
                `${getElementId4Resource(message.data.file)}StatusFlag`
              )
            );

            // update the status bar of this resource
            // if this resource has been cached before, show `cached loaded`, or `download` if uncached
            if (statusBarElement) {
              let source = "downloaded";
              let size = 0;
              const name = message.data.file;
              if (NEEDED_RESOURCES[name]) {
                size = NEEDED_RESOURCES[name].size;
                if (NEEDED_RESOURCES[name].cached) source = "cache loaded";
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
      }

      break;
    case "update": {
      // for generation
      let target = message.target;
      let elem = document.getElementById(target);
      elem.value = message.data;
      if (!timeoutId) {
        lastContent = document.getElementById(target).value;
        timeoutId = setTimeout(checkForChanges, 1500);
      }
      break;
    }
    case "complete":
      document.getElementById(message.target).value = message.data;
      break;

    default:
      break;
  }
});

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

              removeHiddenClass(PROGRESS_BAR);

              PROGRESS_BAR.innerHTML = `
              <div class="relative px-2 z-20 2xl:text-sm text-xs" id="StatusText"></div>
            <div class="relative px-2 z-20 2xl:text-sm text-xs">
              <span id="ProgressVal">0%</span>
            </div>
            <div
              id="ProgressBar"
              class="absolute top-0 rounded-2xl 2xl:text-sm text-xs z-10 text-right bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
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
                progressEle.style.height = "100%";
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
            const cacheKey = getRequestPrefix(MODEL_NAME) + resource;
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
