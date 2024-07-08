/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

import { setupNavigBar } from "./navbar.js";

// Used for release to public domain, so the project can be hosted on GitHub Pages or other static hosting services.
const baseUrl =
  location.href.toLowerCase().indexOf("github.io") > -1
    ? "/web-ai-showcase/"
    : "/";

const BACKENDS = {
  WASM: "Wasm",
  WEBGPU: "WebGPU",
  WEBNN: "WebNN"
};

const DEVICES = {
  CPU: "CPU",
  GPU: "GPU",
  NPU: "NPU"
};

// To add a new sample, please put <id>.png and <id>.mp4 in the public/assets folder.
let SAMPLES = [
  // WASM
  {
    id: "wasm_image_to_text",
    title: "ViT GPT2",
    desc: "Generate text from image",
    sampleUrl: "./samples/image_to_text/index.html",
    models: ["ViT GPT2"],
    tasks: "Image-to-Text",
    webApis: [BACKENDS.WASM],
    framework: "Transformers.js",
    devices: [DEVICES.CPU],
    update: "2024-06-08"
  },
  {
    id: "wasm_question_answering",
    title: "DistilBERT",
    desc: "Answer question from context",
    sampleUrl: "./samples/question_answering/index.html",
    models: ["DistilBERT"],
    tasks: "Fill-Mask",
    webApis: [BACKENDS.WASM],
    framework: "Transformers.js",
    devices: [DEVICES.CPU],
    update: "2024-06-08"
  },
  {
    id: "wasm_summarization",
    title: "DistilBART",
    desc: "Generate summaries of paragraphs",
    sampleUrl: "./samples/summarization/index.html",
    models: ["DistilBART"],
    tasks: "Summarization",
    webApis: [BACKENDS.WASM],
    framework: "Transformers.js",
    devices: [DEVICES.CPU],
    update: "2024-06-08"
  },

  // WebGPU
  {
    id: "webgpu_background_removal",
    title: "RMBG",
    desc: "Remove the background of an image",
    sampleUrl: "./samples/image_background_removal/index.html",
    models: ["RMBG v1.4"],
    tasks: "Image Segmentation",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webgpu_benchmark",
    title: "Benchmark",
    desc: "Benchmark to compare perf of WebGPU vs Wasm",
    sampleUrl:
      "https://huggingface.co/spaces/Xenova/webgpu-embedding-benchmark",
    models: ["All MiniLM L6 v2"],
    tasks: "N/A",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webgpu_clip",
    title: "OpenAI Clip",
    desc: "Learn about what contributes to robustness in computer vision tasks",
    sampleUrl: "https://huggingface.co/spaces/Xenova/webgpu-clip",
    models: ["Clip"],
    tasks: "Zero-shot Image Classification",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webgpu_llm_gemma",
    title: "Gemma",
    desc: "LLM-Gemma",
    sampleUrl: "./samples/llm_gemma/gemma.html",
    models: ["Gemma 2B"],
    tasks: "Text-to-Image",
    webApis: [BACKENDS.WEBGPU],
    framework: "MediaPipe",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webgpu_mobilenetv4",
    title: "MobileNetV4",
    desc: "Real-time image classification",
    sampleUrl: "https://huggingface.co/spaces/Xenova/webgpu-mobilenet",
    models: ["MobileNetV4"],
    tasks: "Image Classification",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-24"
  },
  {
    id: "webgpu_modnet",
    title: "MODNet",
    desc: "Realtime Video Background Removal",
    sampleUrl:
      "https://huggingface.co/spaces/Xenova/webgpu-video-background-removal",
    models: ["MODNet"],
    tasks: "Image-to-Image",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webgpu_moondream",
    title: "Moondream",
    desc: "Vision-Language Model",
    sampleUrl:
      "https://huggingface.co/spaces/Xenova/experimental-moondream-webgpu",
    models: ["Moondream"],
    tasks: "Text Generation",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-10"
  },
  {
    id: "webgpu_phi3_mini",
    title: "Phi-3",
    desc: "A private and powerful AI chatbot that runs locally in your browser",
    sampleUrl: "./samples/phi3-webgpu/index.html",
    models: ["Phi 3 Mini 4k Instruct"],
    tasks: "Text Generation",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-09"
  },
  {
    id: "webgpu_qwen2",
    title: "Qwen2",
    desc: "Language understanding/generation, multilingual capability, coding, mathematics, etc.",
    sampleUrl: "https://huggingface.co/spaces/Xenova/webgpu-chat-qwen2",
    models: ["Qwen2 0.5B Instruct"],
    tasks: "Text Generation",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-10"
  },
  {
    id: "webgpu_sam",
    title: "Segment Anything",
    desc: `AI model from Meta that can "cut out" any object`,
    sampleUrl: "https://huggingface.co/spaces/Xenova/segment-anything-webgpu",
    models: ["SAM"],
    tasks: "Image-to-Image",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webgpu_sd_turbo",
    title: "SD-Turbo",
    desc: "Transform your words into stunning AI visuals with SD-Turbo",
    sampleUrl: "./samples/stable_diffusion/stable-diffusion.html",
    models: ["SD-Turbo"],
    tasks: "Text-to-Image",
    webApis: [BACKENDS.WEBGPU],
    framework: "ONNX Runtime Web",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webgpu_webllm",
    title: "WebLLM",
    desc: "High-performance in-browser LLM inference engine",
    sampleUrl: "https://chat.webllm.ai/",
    models: ["Llama", "Phi", "Mistral", "Gemma", "QWen"],
    tasks: "Text Generation",
    webApis: [BACKENDS.WEBGPU],
    framework: "TVM",
    devices: [DEVICES.GPU],
    update: "2024-06-09"
  },
  {
    id: "webgpu_whisper",
    title: "Whisper Base",
    desc: "Real-time speech recognition with OpenAI Whisper across 100 different languages",
    sampleUrl: "https://huggingface.co/spaces/Xenova/realtime-whisper-webgpu",
    models: ["Encoder", "Decoder"],
    tasks: "Automatic Speech Recognition",
    webApis: [BACKENDS.WEBGPU],
    framework: "Transformers.js",
    devices: [DEVICES.GPU],
    update: "2024-06-10"
  },

  // WebNN
  {
    id: "webnn_code_editor",
    title: "Code Editor",
    desc: "Test out some sample code directly in a compatible browser",
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/code/index.html",
    models: ["Matmul"],
    tasks: "N/A",
    webApis: [BACKENDS.WEBNN],
    framework: "VanillaJS",
    devices: [DEVICES.CPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_face_landmark_detection",
    title: "Facial Landmark Detection",
    desc: "See how facial landmark detection works with the SSD MobileNet V2 Face models",
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/facial_landmark_detection/index.html",
    models: ["SSD MobileNet v2 Face"],
    tasks: "Object Detection",
    webApis: [BACKENDS.WEBNN],
    framework: "VanillaJS",
    devices: [DEVICES.CPU, DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_face_recognition",
    title: "Face Recognition",
    desc: "Explore the power of face recognition in your browser with the SSD MobileNet V2 Face",
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/face_recognition/index.html",
    models: ["SSD MobileNet v2 Face"],
    tasks: "Object Detection",
    webApis: [BACKENDS.WEBNN],
    framework: "VanillaJS",
    devices: [DEVICES.CPU, DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_image_classification",
    title: "Image Classification",
    desc: "Try image classification with models like MobileNet V2, SqueezeNet, and ResNet V2 50",
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/image_classification/index.html",
    models: ["MobileNet v2", "SqueezeNet", "ResNet v2 50"],
    tasks: "Image Classification",
    webApis: [BACKENDS.WEBNN],
    framework: "VanillaJS",
    devices: [DEVICES.CPU, DEVICES.GPU, DEVICES.NPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_object_detection",
    title: "Object Detection",
    desc: "Check out this sample for object detection with models like Tiny Yolo V2 and SSD MobileNet V1",
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/object_detection/index.html",
    models: ["Tiny Yolo v2", "SSD MobileNet v1"],
    tasks: "Object Detection",
    webApis: [BACKENDS.WEBNN],
    framework: "VanillaJS",
    devices: [DEVICES.CPU, DEVICES.GPU, DEVICES.NPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_sam",
    title: "Segment Anything",
    desc: `Segment Anything is a new AI model from Meta AI that can "cut out" any object`,
    sampleUrl:
      "https://microsoft.github.io/webnn-developer-preview/demos/segment-anything/",
    models: ["SAM"],
    tasks: "Image-to-Image",
    webApis: [BACKENDS.WEBNN],
    framework: "ONNX Runtime Web",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_sd_15",
    title: "Stable Diffusion 1.5",
    desc: "Transform your words into stunning AI visuals with Stable Diffusion 1.5",
    sampleUrl:
      "https://microsoft.github.io/webnn-developer-preview/demos/stable-diffusion-1.5/",
    models: ["Stable Diffusion 1.5"],
    tasks: "Text-to-Image",
    webApis: [BACKENDS.WEBNN],
    framework: "ONNX Runtime Web",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_sd_turbo",
    title: "SD-Turbo",
    desc: "Transform your words into stunning AI visuals with SD-Turbo",
    sampleUrl:
      "https://microsoft.github.io/webnn-developer-preview/demos/sd-turbo/",
    models: ["SD-Turbo"],
    tasks: "Text-to-Image",
    webApis: [BACKENDS.WEBNN],
    framework: "ONNX Runtime Web",
    devices: [DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_semantic_segmentation",
    title: "Semantic Segmentation",
    desc: "See how semantic segmentation works with the DeepLab V3 with MobileNet V2 models",
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/semantic_segmentation/index.html",
    models: ["DeepLab v3", "MobileNet v2"],
    tasks: "Image Segmentation",
    webApis: [BACKENDS.WEBNN],
    framework: "VanillaJS",
    devices: [DEVICES.CPU, DEVICES.GPU],
    update: "2024-06-08"
  },
  {
    id: "webnn_whisper_base",
    title: "Whisper Base",
    desc: "Automatic speech recognition (ASR) and speech translation",
    sampleUrl:
      "https://microsoft.github.io/webnn-developer-preview/demos/whisper-base/",
    models: ["Encoder", "Decoder"],
    tasks: "Automatic Speech Recognition",
    webApis: [BACKENDS.WEBNN],
    framework: "ONNX Runtime Web",
    devices: [DEVICES.GPU, DEVICES.NPU],
    update: "2024-06-08"
  }
];

// the phi3 project only available in `production` mode
// TODO: enable phi3 sample under development mode, maybe
//       host another server for phi3 project since it is
//       a standalone react + vite project
if (import.meta.env.MODE === "development") {
  SAMPLES = SAMPLES.filter((sample) => sample.id !== "webgpu_phi3_mini");
}

SAMPLES = SAMPLES.sort((a, b) => (a.update > b.update ? -1 : 1));

let displayedSamples = SAMPLES;

const PRE_PAGE_BUTTON = document.getElementById("prePageBtn");
const NEXT_PAGE_BUTTON = document.getElementById("nextPageBtn");
const SAMPLE_COUNT_PER_PAGE = 6;

let currentPageNum = 1;
let currentBackendFilter = [BACKENDS.WEBGPU, BACKENDS.WASM, BACKENDS.WEBNN];
let currentDeviceFilter = [DEVICES.GPU, DEVICES.CPU, DEVICES.NPU];

let totalPageCount = Math.ceil(displayedSamples.length / SAMPLE_COUNT_PER_PAGE);

function setupVideos() {
  for (const video of document.querySelectorAll("video")) {
    video.controls = false;
    video.addEventListener("mouseover", () => {
      video.play();
    });
    video.addEventListener("mouseout", () => {
      video.load();
    });
  }
}

function constructSampleHTML(samples) {
  const sampleCardHTML = samples
    .map((sample) => {
      return `
            <a class="group relative flex h-[250px] 2xl:h-[360px]  flex-col gap-6 rounded-xl overflow-hidden" href="${sample.sampleUrl}">
            <div class="absolute inset-0 h-1/2 2xl:h-[220px]  rounded-xl overflow-hidden group-hover:h-full w-full duration-[250ms]">
              <video
              poster="${baseUrl}assets/${sample.id}.png"
              class="h-full w-full rounded-xl object-cover group-hover:scale-125 duration-1000"
              src="${baseUrl}assets/${sample.id}.mp4"
              muted
              loop
              ></video>
              <div class="absolute top-[10px] right-[10px]">

            </div>
            </div>
            <div class="px-3 mt-auto w-full h-1/2 2xl:h-[140px] flex flex-col">
              <div
              class="flex items-center text-xl w-full group-hover:text-white group-hover:z-50 group-hover:translate-y-[1.5rem] group-hover:drop-shadow-xl duration-[350ms] h-full"
              >

                <div class="flex flex-col h-full w-full">
                  <div class="font-bold text-stone-50 2xl:group-hover:text-2xl group-hover:text-xl  2xl:text-2xl/6 text-lg/5 duration-[350ms] 2xl:pt-1 pt-3 drop-shadow-md">${sample.title}
                  </div>

                  <div class="group-hover:hidden 2xl:pt-3 pt-3 2xl:text-lg/5 text-xs/3 font-normal text-stone-300 font-sans">
                    <p>
                    ${sample.desc}
                    </p>
                  </div>

                <div class="flex flex-wrap h-fit pt-3 2xl:gap-x-2 gap-x-1 text-[10px]/4 gap-y-1 2xl:text-sm">

                <div class="flex 2xl:font-medium rounded-2xl bg-fuchsia-600/60 px-2 text-stone-50 w-auto">${sample.tasks}</div>

              ${
                sample.models.length > 0
                  ? ` ${sample.models
                      .map(
                        (model) =>
                          `<div class="flex 2xl:font-medium rounded-2xl bg-stone-600/80 px-2 text-stone-50 w-auto">${model}</div>`
                      )
                      .join("")}`
                  : ``
              }

                  <div
                    class="flex 2xl:font-medium rounded-2xl bg-teal-600/80 px-2 text-stone-50">${sample.framework}
                  </div>

                  ${
                    sample.webApis.length > 0
                      ? `
                 ${sample.webApis
                   .map(
                     (api) =>
                       `<div class="flex 2xl:font-medium rounded-2xl bg-indigo-600/80 px-2 text-stone-50">${api}</div>`
                   )
                   .join("")}`
                      : ``
                  }

                  ${
                    sample.devices.length > 0
                      ? `${sample.devices
                          .map(
                            (device) =>
                              `<div class="flex 2xl:font-medium rounded-2xl bg-sky-600/80 px-2 text-stone-50">${device}</div>`
                          )
                          .join("")}`
                      : ``
                  }
              </div>

                    </div>
            </div>
            </div></a
          >
          `;
    })
    .join("");

  document.getElementById("sampleCardContainer").innerHTML = sampleCardHTML;
}

function constructPagination() {
  // hide the pagination panel if displayed samples is empty
  const pagePanel = document.getElementById("paginationSection");
  if (displayedSamples.length > 0) {
    if (pagePanel && pagePanel.classList.contains("hidden"))
      pagePanel.classList.remove("hidden");
  } else {
    if (pagePanel && !pagePanel.classList.contains("hidden"))
      pagePanel.classList.add("hidden");
  }

  let paginationHTML = "";
  for (let i = 1; i <= totalPageCount; i++) {
    paginationHTML += `
      <div
        class="page cursor-pointer rounded-md relative inline-flex px-4 py-2  ${i === currentPageNum ? "bg-indigo-500/90" : "hover:bg-stone-500/50"}">
        ${i}
      </div>
    `;
  }

  document.getElementById("pageNumberWrapper").innerHTML = paginationHTML;
}

function constructFilter() {
  let backendFilterHTML = `
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md ring-2 ring-gray-50/50 w-fit"
  >
    Backend
  </div>`;
  let deviceFilterHTML = `
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md 2xl:ring-2 ring-1 ring-gray-50/50 w-fit"
  >
    Device
  </div>`;

  for (const backend of Object.keys(BACKENDS)) {
    backendFilterHTML += `<div
    class="filter-backend cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-indigo-500/30 w-fit"
    >
      ${BACKENDS[backend]}
    </div>`;
  }

  for (const device of Object.keys(DEVICES)) {
    deviceFilterHTML += `<div
    class="filter-device cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-sky-600/30 w-fit"
    >
      ${DEVICES[device]}
    </div>`;
  }

  document.getElementById("backendFilterSelection").innerHTML =
    backendFilterHTML;

  document.getElementById("deviceFilterSelection").innerHTML = deviceFilterHTML;
}

function bindPageChangeEventHandler() {
  document.querySelectorAll(".page").forEach((node) => {
    node.addEventListener("click", (e) => {
      const newIndex = Number(e.target.innerText);
      if (currentPageNum === newIndex) return;
      currentPageNum = newIndex;
      changePageHandler();
    });
  });

  PRE_PAGE_BUTTON.addEventListener("click", () => {
    if (currentPageNum === 1) return;
    currentPageNum--;
    changePageHandler();
  });

  NEXT_PAGE_BUTTON.addEventListener("click", () => {
    if (currentPageNum === totalPageCount) return;
    currentPageNum++;
    changePageHandler();
  });
}

function changePageHandler() {
  // refresh sample panels
  constructSampleHTML(
    displayedSamples.slice(
      (currentPageNum - 1) * SAMPLE_COUNT_PER_PAGE,
      currentPageNum * SAMPLE_COUNT_PER_PAGE
    )
  );

  // refresh video element
  setupVideos();

  // refresh the page
  document.querySelectorAll(".page").forEach((node) => {
    if (node.classList.contains("bg-indigo-500/90")) {
      node.classList.remove("bg-indigo-500/90");
    }

    if (Number(node.innerText) === currentPageNum) {
      if (!node.classList.contains("bg-indigo-500/90"))
        node.classList.add("bg-indigo-500/90");
      if (node.classList.contains("hover:bg-stone-500/50"))
        node.classList.remove("hover:bg-stone-500/50");
    } else {
      if (!node.classList.contains("hover:bg-stone-500/50"))
        node.classList.add("hover:bg-stone-500/50");
    }
  });

  // refresh hover effect for pre and next button
  if (currentPageNum === 1) {
    if (PRE_PAGE_BUTTON.classList.contains("cursor-pointer"))
      PRE_PAGE_BUTTON.classList.remove("cursor-pointer");

    if (PRE_PAGE_BUTTON.classList.contains("hover:bg-stone-500/50"))
      PRE_PAGE_BUTTON.classList.remove("hover:bg-stone-500/50");
  } else {
    if (!PRE_PAGE_BUTTON.classList.contains("cursor-pointer"))
      PRE_PAGE_BUTTON.classList.add("cursor-pointer");

    if (!PRE_PAGE_BUTTON.classList.contains("hover:bg-stone-500/50"))
      PRE_PAGE_BUTTON.classList.add("hover:bg-stone-500/50");
  }

  if (currentPageNum === totalPageCount) {
    if (NEXT_PAGE_BUTTON.classList.contains("cursor-pointer"))
      NEXT_PAGE_BUTTON.classList.remove("cursor-pointer");

    if (NEXT_PAGE_BUTTON.classList.contains("hover:bg-stone-500/50"))
      NEXT_PAGE_BUTTON.classList.remove("hover:bg-stone-500/50");
  } else {
    if (!NEXT_PAGE_BUTTON.classList.contains("cursor-pointer"))
      NEXT_PAGE_BUTTON.classList.add("cursor-pointer");
    if (!NEXT_PAGE_BUTTON.classList.contains("hover:bg-stone-500/50"))
      NEXT_PAGE_BUTTON.classList.add("hover:bg-stone-500/50");
  }
}

function bindFilterChangeEventHandler() {
  document.querySelectorAll(".filter-backend").forEach((node) => {
    node.addEventListener("click", () => {
      const _backend = node.innerText;
      const _backend_idx = currentBackendFilter.indexOf(_backend);

      if (_backend_idx > -1) {
        currentBackendFilter.splice(_backend_idx, 1);
      } else {
        currentBackendFilter.push(_backend);
      }

      changeFilterHandler();
    });
  });

  document.querySelectorAll(".filter-device").forEach((node) => {
    node.addEventListener("click", () => {
      const _device = node.innerText;
      const _device_idx = currentDeviceFilter.indexOf(_device);

      if (_device_idx > -1) {
        currentDeviceFilter.splice(_device_idx, 1);
      } else {
        currentDeviceFilter.push(_device);
      }

      changeFilterHandler();
    });
  });
}

function changeFilterHandler() {
  //if all filter are removed, display all samples

  // refresh samples
  displayedSamples = SAMPLES.filter(
    (sample) =>
      sample.webApis.some((api) => currentBackendFilter.includes(api)) &&
      sample.devices.some((hdw) => currentDeviceFilter.includes(hdw))
  );
  currentPageNum = 1;
  totalPageCount = Math.ceil(displayedSamples.length / SAMPLE_COUNT_PER_PAGE);

  constructPagination();
  changePageHandler();
  bindPageChangeEventHandler();

  // refresh backend filter button class
  document.querySelectorAll(".filter-backend").forEach((node) => {
    if (currentBackendFilter.includes(node.innerText)) {
      if (!node.classList.contains("bg-indigo-500/90")) {
        node.classList.add("bg-indigo-500/90");
        node.classList.remove("text-gray-400");
      }
    } else {
      if (node.classList.contains("bg-indigo-500/90")) {
        node.classList.remove("bg-indigo-500/90");
        node.classList.add("text-gray-400");
      }
    }
  });

  //
  document.querySelectorAll(".filter-device").forEach((node) => {
    if (currentDeviceFilter.includes(node.innerText)) {
      if (!node.classList.contains("bg-sky-600/90")) {
        node.classList.add("bg-sky-600/90");
        node.classList.remove("text-gray-400");
      }
    } else {
      if (node.classList.contains("bg-sky-600/90")) {
        node.classList.remove("bg-sky-600/90");
        node.classList.add("text-gray-400");
      }
    }
  });
}

constructFilter();
constructPagination();
bindFilterChangeEventHandler();
changeFilterHandler();
setupVideos();
setupNavigBar(".");
