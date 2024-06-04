// Copyright 2024 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// ---------------------------------------------------------------------------------------- //

import { FilesetResolver, LlmInference } from "@mediapipe/tasks-genai";
import hljs from "highlight.js/lib/core";
import * as marked from "marked";
import DOMPurify from "dompurify";
import {
  changeClass4StatusBar,
  removeHiddenClass,
  formatBytes
} from "../common/utility.js";
import { setupNavigBar } from "../../js/navbar.js";
import { MEDIAPIPE_WASM_FILE_PATH, USE_REMOTE_MODELS } from "../../config.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const submitBtn = document.getElementById("submit");
const modelStatusBar = document.getElementById("gemmaStatusBar");
const loadingIcon = document.getElementById("loadingIcon");
const promptInputSection = document.getElementById("promptInputSection");
const progressBar = document.getElementById(`progressBar`);
const promptInspireBtn = document.getElementById("promptInspireBtn");
const promptContent = document.getElementById("loadModelPromptContent");

const modelFileName = "gemma-2b-it-gpu-int4.bin"; /* Update the file name */

let llmInference;
const genaiFileset = await FilesetResolver.forGenAiTasks(
  USE_REMOTE_MODELS
    ? "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai/wasm"
    : MEDIAPIPE_WASM_FILE_PATH
);

const STATUS = {
  DEFAULT: 0,
  RUNNING: 1,
  UPLOADING: 2
};

function scrollOutputToBottom() {
  output.scrollTop = output.scrollHeight;
}

marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  }
});

/**
 * Display newly generated partial results to the output text box.
 */
function displayPartialResults(partialResults, complete) {
  output.innerHTML += partialResults;

  if (complete) {
    // transfer the result to markdown format
    if (!output.innerHTML) {
      output.innerHTML = "Result is empty";
    } else {
      const html = marked.parse(output.innerHTML);
      const cleanHTML = DOMPurify.sanitize(html);
      output.innerHTML = cleanHTML;
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }

  scrollOutputToBottom(output);
}
/**
 * Main function to run LLM Inference.
 */

submitBtn.onclick = async () => {
  if (!llmInference) return;
  setUpStatus(STATUS.RUNNING);
  //clear text box
  output.innerHTML = "";
  await llmInference.generateResponse(input.value, displayPartialResults);
  setUpStatus(STATUS.DEFAULT);
};

promptInspireBtn.addEventListener("click", () => {
  const imagePrompts = [
    "def fibonacci",
    "def quicksort",
    "Running AI on Web can",
    "def merge_sort",
    "function bubbleSort",
    "please give a quick introduction about WebAI",
    "<start_of_turn>user\nWhat is WebAI<end_of_turn>\n<start_of_turn>model"
  ];

  input.value = imagePrompts[Math.floor(Math.random() * imagePrompts.length)];
});

function setUpStatus(status) {
  if (status === STATUS.RUNNING) {
    promptInspireBtn.disabled = true;
    submitBtn.disabled = true;
    removeHiddenClass(loadingIcon);

    if (!promptInputSection.classList.contains("running-mode")) {
      promptInputSection.classList.add("running-mode");
    }
  } else if (status === STATUS.DEFAULT) {
    promptInspireBtn.disabled = false;
    submitBtn.disabled = false;
    if (!loadingIcon.classList.contains("hidden")) {
      loadingIcon.classList.add("hidden");
    }
    if (promptInputSection.classList.contains("running-mode")) {
      promptInputSection.classList.remove("running-mode");
    }
  } else if (status === STATUS.UPLOADING) {
    promptInspireBtn.disabled = false;
    submitBtn.disabled = false;
    if (!loadingIcon.classList.contains("hidden")) {
      loadingIcon.classList.add("hidden");
    }
    if (!promptInputSection.classList.contains("running-mode")) {
      promptInputSection.classList.add("running-mode");
    }
  }
}

document.getElementById("upload").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  const startPoint = new Date().getTime();

  reader.onprogress = function (progressEvent) {
    if (progressEvent.lengthComputable) {
      const loaded = progressEvent.loaded;
      const total = progressEvent.total;

      setUpStatus(STATUS.UPLOADING);
      // show the progress bar
      removeHiddenClass(progressBar);

      progressBar.innerHTML = `
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
      modelStatusBar.textContent = "loading";
      // set the status of this model in status bar
      changeClass4StatusBar("loading", modelStatusBar);

      let progress = (loaded / total) * 100;
      statusText.textContent = `Uploading model ...`;

      if (!progressEle.style.height) {
        progressEle.style.height = "30px";
      }
      progressEle.style.width = `${progress}%`;
      progressValEle.textContent = `${formatBytes(loaded)}/${formatBytes(
        total
      )}`;
    }
  };

  reader.onload = function (loadEvent) {
    const arrayBuffer = new Uint8Array(loadEvent.target.result);
    console.log("ArrayBuffer...", arrayBuffer.byteLength);
    LlmInference.createFromOptions(genaiFileset, {
      baseOptions: {
        modelAssetBuffer: arrayBuffer
      },
      maxTokens: 1000,
      topK: 40,
      temperature: 0.8,
      randomSeed: 101
    })
      .then((llm) => {
        llmInference = llm;
        const endPoint = new Date().getTime();
        modelStatusBar.textContent = `loaded in ${
          (endPoint - startPoint) / 1000
        }s (${formatBytes(arrayBuffer.byteLength)})`;

        changeClass4StatusBar("loaded", modelStatusBar);

        if (!progressBar.classList.contains("hidden")) {
          progressBar.classList.add("hidden");
        }

        if (!promptContent.classList.contains("hidden")) {
          promptContent.classList.add("hidden");
        }

        setUpStatus(STATUS.DEFAULT);
      })
      .catch(() => {
        alert("Failed to initialize the task.");
      });
  };

  reader.onerror = function (error) {
    console.error("FileReader error:", error);
  };

  reader.readAsArrayBuffer(file);
});

setupNavigBar("../..");
