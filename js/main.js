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
  WebGPU: "WebGPU",
  WebAssembly: "WebAssembly",
  WebNN: "WebNN"
};

const SUPPORTED_DEVICES = {
  GPU: "GPU",
  CPU: "CPU",
  NPU: "NPU"
};

let SAMPLES = [
  {
    title: "Phi-3",
    desc: "A private and powerful AI chatbot that runs locally in your browser.",
    poster: `${baseUrl}assets/phi3.png`,
    sampleUrl: "./samples/phi3-webgpu/index.html",
    model: "Phi-3-mini-4k-instruct",
    webApi: [BACKENDS.WebGPU],
    supportHdw: ["GPU"]
  },

  {
    title: "Stable Diffusion Turbo",
    desc: "Transform your words into stunning AI visuals with stable diffusion turbo",
    poster: `${baseUrl}assets/stable_diffusion_demo_poster.png`,
    video: `${baseUrl}assets/stable_diffusion_demo.mp4`,
    sampleUrl: "./samples/stable_diffusion/stable-diffusion.html",
    model: "SD Turbo",
    webApi: [BACKENDS.WebGPU],
    supportHdw: ["GPU"]
  },
  {
    title: "Summarization",
    desc: "Generate summaries of paragraphs",
    poster: `${baseUrl}assets/summarization_demo_poster.png`,
    video: `${baseUrl}assets/summarization.mp4`,
    sampleUrl: "./samples/summarization/index.html",
    model: "DistilBART CNN",
    webApi: [BACKENDS.WebAssembly],
    supportHdw: ["CPU"]
  },

  {
    title: "LLM-Gemma",
    desc: "LLM-Gemma",
    poster: `${baseUrl}assets/llm-gemma-poster.png`,
    video: `${baseUrl}assets/llm-gemma.mp4`,
    sampleUrl: "./samples/llm_gemma/gemma.html",
    model: "Gemma 2B",
    webApi: [BACKENDS.WebGPU],
    supportHdw: ["GPU"]
  },

  {
    title: "Image To Text",
    desc: "Generate text from image",
    poster: `${baseUrl}assets/image_to_text_poster.png`,
    video: `${baseUrl}assets/image-to-text.mp4`,
    sampleUrl: "./samples/image_to_text/index.html",
    model: "ViT GPT2",
    webApi: [BACKENDS.WebAssembly],
    supportHdw: ["CPU"]
  },

  {
    title: "Question Answering",
    desc: "Answer question from context",
    poster: `${baseUrl}assets/question_answering.png`,
    video: `${baseUrl}assets/question_answering.mp4`,
    sampleUrl: "./samples/question_answering/index.html",
    model: "DistilBERT",
    webApi: [BACKENDS.WebAssembly],
    supportHdw: ["CPU"]
  },

  {
    title: "Background Removal",
    desc: "Remove the background of an image",
    poster: `${baseUrl}assets/background_removal_poster.png`,
    video: `${baseUrl}assets/background_removal.mp4`,
    sampleUrl: "./samples/image_background_removal/index.html",
    model: "RMBG v1.4",
    webApi: [BACKENDS.WebGPU],
    supportHdw: ["GPU"]
  },

  {
    title: "Code Editor",
    desc: "Test out some sample code directly in a compatible browser",
    poster: `${baseUrl}assets/webnn_code_editor_poster.png`,
    video: `${baseUrl}assets/webnn_code_editor.mp4`,
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/code/index.html",
    model: "",
    webApi: [BACKENDS.WebNN],
    supportHdw: [SUPPORTED_DEVICES.CPU]
  },

  {
    title: "Image Classification",
    desc: "Try image classification with models like MobileNet V2, SqueezeNet, and ResNet V2 50",
    poster: `${baseUrl}assets/image_classification_poster.png`,
    video: `${baseUrl}assets/image_classification.mp4`,
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/image_classification/index.html",
    model: "MobileNet v2 · SqueezeNet · ResNet v2 50",
    webApi: [BACKENDS.WebNN],
    supportHdw: [
      SUPPORTED_DEVICES.CPU,
      SUPPORTED_DEVICES.GPU,
      SUPPORTED_DEVICES.NPU
    ]
  },

  {
    title: "Object Detection",
    desc: "Check out this sample for object detection with models like Tiny Yolo V2 and SSD MobileNet V1",
    poster: `${baseUrl}assets/object_detection_poster.png`,
    video: `${baseUrl}assets/object_detection.mp4`,
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/object_detection/index.html",
    model: "Tiny Yolo v2 · SSD MobileNet v1",
    webApi: [BACKENDS.WebNN],
    supportHdw: [
      SUPPORTED_DEVICES.CPU,
      SUPPORTED_DEVICES.GPU,
      SUPPORTED_DEVICES.NPU
    ]
  },

  {
    title: "Semantic Segmentation",
    desc: "See how semantic segmentation works with the DeepLab V3 with MobileNet V2 models",
    poster: `${baseUrl}assets/semantic_segmentation_poster.png`,
    video: `${baseUrl}assets/semantic_segmentation.mp4`,
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/semantic_segmentation/index.html",
    model: "DeepLab v3 · MobileNet v2",
    webApi: [BACKENDS.WebNN],
    supportHdw: [SUPPORTED_DEVICES.CPU, SUPPORTED_DEVICES.GPU]
  },

  {
    title: "Facial Landmark Detection",
    desc: "See how facial landmark detection works with the SSD MobileNet V2 Face model",
    poster: `${baseUrl}assets/face_landmark_detection_poster.png`,
    video: `${baseUrl}assets/face_landmark_detection.mp4`,
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/facial_landmark_detection/index.html",
    model: "SSD MobileNet v2 Face",
    webApi: [BACKENDS.WebNN],
    supportHdw: [SUPPORTED_DEVICES.CPU, SUPPORTED_DEVICES.GPU]
  },

  {
    title: "Face Recognition",
    desc: "Explore the power of face recognition in your browser with the SSD MobileNet V2 Face model",
    poster: `${baseUrl}assets/face_recognition_poster.png`,
    video: `${baseUrl}assets/face_recognition.mp4`,
    sampleUrl:
      "https://webmachinelearning.github.io/webnn-samples/face_recognition/index.html",
    model: "SSD MobileNet v2 Face",
    webApi: [BACKENDS.WebNN],
    supportHdw: [SUPPORTED_DEVICES.CPU, SUPPORTED_DEVICES.GPU]
  },

  {
    title: "Stable Diffusion 1.5",
    desc: "Transform your words into stunning AI visuals with stable diffusion 1.5",
    poster: `${baseUrl}assets/stable_diffusion_demo_webnn_ort_poster.png`,
    video: `${baseUrl}assets/stable_diffusion_demo_webnn_ort.mp4`,
    sampleUrl:
      "https://microsoft.github.io/webnn-developer-preview/demos/stable-diffusion-1.5/",
    model: "SD Turbo",
    webApi: [BACKENDS.WebNN],
    supportHdw: [SUPPORTED_DEVICES.GPU]
  },

  {
    title: "Stable Diffusion Turbo",
    desc: "Transform your words into stunning AI visuals with stable diffusion turbo",
    poster: `${baseUrl}assets/stable_diffusion_demo_webnn.png`,
    video: `${baseUrl}assets/stable_diffusion_demo_webnn.mp4`,
    sampleUrl:
      "https://microsoft.github.io/webnn-developer-preview/demos/sd-turbo/",
    model: "SD Turbo",
    webApi: [BACKENDS.WebNN],
    supportHdw: [SUPPORTED_DEVICES.GPU]
  },

  {
    title: "Segment Anything",
    desc: `Segment Anything is a new AI model from Meta AI that can "cut out" any object.`,
    poster: `${baseUrl}assets/webnn_segment_anything.png`,
    video: `${baseUrl}assets/webnn_segment_anything.mp4`,
    sampleUrl:
      "https://microsoft.github.io/webnn-developer-preview/demos/segment-anything/",
    model: "Sam",
    webApi: [BACKENDS.WebNN],
    supportHdw: [SUPPORTED_DEVICES.GPU]
  },

  {
    title: "Whisper Base",
    desc: "Whisper Base is a pre-trained model for automatic speech recognition (ASR) and speech translation.",
    poster: `${baseUrl}assets/webnn_whisper_base.png`,
    video: `${baseUrl}assets/webnn_whisper_base.mp4`,
    sampleUrl:
      "https://microsoft.github.io/webnn-developer-preview/demos/whisper-base/",
    model: "Encoder · Decoder",
    webApi: [BACKENDS.WebNN],
    supportHdw: [SUPPORTED_DEVICES.GPU, SUPPORTED_DEVICES.NPU]
  }
];

// the phi3 project only available in `production` mode
// TODO: enable phi3 sample under development mode, maybe
//       host another server for phi3 project since it is
//       a standalone react + vite project
if (import.meta.env.MODE === "development") {
  SAMPLES = SAMPLES.slice(1);
}

let displayedSamples = SAMPLES;

const PRE_PAGE_BUTTON = document.getElementById("prePageBtn");
const NEXT_PAGE_BUTTON = document.getElementById("nextPageBtn");
const SAMPLE_COUNT_PER_PAGE = 6;

let currentPageNum = 1;
let currentBackendFilter = ["WebGPU", "WebAssembly", "WebNN"];
let currentDeviceFilter = ["GPU", "CPU", "NPU"];

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
            <a
            class="group relative flex h-[280px] 2xl:h-[360px]  flex-col gap-6 rounded-xl overflow-hidden"
            href="${sample.sampleUrl}"
            ><div
              class="absolute inset-0 h-[190px] 2xl:h-[240px]  rounded-xl overflow-hidden group-hover:h-full w-full duration-[250ms]"
            >
              <video
              poster="${sample.poster}"
              class="h-full w-full rounded-xl object-cover group-hover:scale-125 duration-1000"
              src="${sample.video}"
              muted
              loop
              ></video>
              <div class="absolute top-[10px] right-[10px]">
              <div class="flex flex-col items-end flex-wrap gap-2">
              ${
                sample.model
                  ? ` <div
              class="flex rounded-md font-semibold bg-stone-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
            >
              ${sample.model}
            </div>`
                  : ``
              }
                  ${
                    sample.webApi.length > 0
                      ? ` <div
                  class="flex rounded-md font-semibold bg-indigo-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
                > ${sample.webApi.join("·")}</div>`
                      : ``
                  }
                  ${
                    sample.supportHdw.length > 0
                      ? ` <div
                  class="flex rounded-md font-semibold bg-sky-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
                >
                  ${sample.supportHdw.join(" · ")}
                </div>`
                      : ``
                  }

              </div>
            </div>
            </div>
            <div class="px-2 2xl:px-3 pt-1 2xl:pt-4 mt-auto w-full h-[90px] 2xl:h-[120px] flex flex-col gap-0.5">
              <div
              class="flex items-center text-xl w-full group-hover:text-white group-hover:z-50 group-hover:translate-y-[1.5rem] group-hover:drop-shadow-xl duration-[350ms]"
              >
                <div class="flex flex-col gap-0.5 2xl:gap-2 w-full">
                  <div class="font-bold text-stone-50 group-hover:text-2xl duration-[350ms]">${sample.title}</div>
                  <div>  <p
                  class="group-hover:hidden 2xl:text-lg text-sm font-normal text-white font-sans">
                    ${sample.desc}
                    </p></div>
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
    Backends
  </div>`;
  let deviceFilterHTML = `
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md 2xl:ring-2 ring-1 ring-gray-50/50 w-fit"
  >
    Device
  </div>`;

  for (const backend of Object.keys(BACKENDS)) {
    backendFilterHTML += `<div
    class="filter-backend cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-indigo-500/30 hover:bg-indigo-500/90 w-fit"
    >
      ${BACKENDS[backend]}
    </div>`;
  }

  for (const device of Object.keys(SUPPORTED_DEVICES)) {
    deviceFilterHTML += `<div
    class="filter-device cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-sky-600/30 hover:bg-sky-600/90 w-fit"
    >
      ${SUPPORTED_DEVICES[device]}
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
      sample.webApi.some((api) => currentBackendFilter.includes(api)) &&
      sample.supportHdw.some((hdw) => currentDeviceFilter.includes(hdw))
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
      }
    } else {
      if (node.classList.contains("bg-indigo-500/90")) {
        node.classList.remove("bg-indigo-500/90");
      }
    }
  });

  //
  document.querySelectorAll(".filter-device").forEach((node) => {
    if (currentDeviceFilter.includes(node.innerText)) {
      if (!node.classList.contains("bg-sky-600/90")) {
        node.classList.add("bg-sky-600/90");
      }
    } else {
      if (node.classList.contains("bg-sky-600/90")) {
        node.classList.remove("bg-sky-600/90");
      }
    }
  });
}

constructFilter();
constructPagination();
changePageHandler();
bindPageChangeEventHandler();
bindFilterChangeEventHandler();
changeFilterHandler();
setupVideos();
setupNavigBar(".");
