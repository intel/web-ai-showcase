/*
 * This file is modified based on
 *    https://github.com/guschmue/ort-webgpu/blob/master/sd-turbo/index.html
 */

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { AutoTokenizer, env } from "@xenova/transformers";
import { setupNavigBar } from "../../js/navbar.js";
import {
  changeClass4StatusBar,
  getRequestPrefix,
  initModelsPanelHandler,
  removeHiddenClass
} from "../common/utility.js";
import { ALL_NEEDED_MODEL_RESOURCES } from "../../config.js";

// load navigation bar
setupNavigBar("../..");

if (VITE_ENV_USE_REMOTE_MODELS) {
  env.allowLocalModels = false;
  env.allowRemoteModels = true;
} else {
  env.allowLocalModels = true;
  env.allowRemoteModels = false;
}

var deviceWebgpu = null;
var queueWebgpu = null;
var textEncoderOutputsBuffer = null;
var textEncoderOutputsTensor = null;
var textEncoderOutputs = {};
var latentData = null;
var latentBuffer = null;
var unetSampleInputsBuffer = null;
var unetSampleInputsTensor = null;
var unetOutSampleBuffer = null;
var unetOutSampleTensor = null;
var prescaleLatentSpacePipeline = null;
var prescaleLatentSpaceBindGroup = null;
var stepLatentSpacePipeline = null;
var stepLatentSpaceBindGroup = null;
var decodedOutputsBuffer = null;
var decodedOutputsTensor = null;
const pixelHeight = 512;
const pixelWidth = 512;
var renderContext = null;
var renderPipeline = null;
var renderBindGroup = null;

const PRESCALE_LATENT_SPACE_SHADER = `
@binding(0) @group(0) var<storage, read_write> result: array<vec4<f32>>;
@binding(1) @group(0) var<storage, read> latentData: array<vec4<f32>>;

@compute @workgroup_size(128, 1, 1)
fn _start(@builtin(global_invocation_id) GlobalId : vec3<u32>) {
let index = GlobalId.x;
let value = latentData[index] / 14.64877241136608;
result[index] = value;
}
`;

const STEP_LATENT_SPACE_SHADER = `
@binding(0) @group(0) var<storage, read_write> result: array<vec4<f32>>;
@binding(1) @group(0) var<storage, read> latentData: array<vec4<f32>>;

@compute @workgroup_size(128, 1, 1)
fn _start(@builtin(global_invocation_id) GlobalId : vec3<u32>) {
let index = GlobalId.x;
let sigma_hat = 14.6146;
let latentVal = latentData[index];
let outputSampleVal = result[index];

let pred_original_sample = latentVal - 14.6146 * outputSampleVal;
let derivative = (latentVal - pred_original_sample) / 14.6146;
let dt = -14.6146;
result[index] = (latentVal + derivative * dt) / 0.18215;
}
`;

const VERTEX_SHADER = `
struct VertexOutput {
@builtin(position) Position : vec4<f32>,
@location(0) fragUV : vec2<f32>,
}

@vertex
fn main(@builtin(vertex_index) VertexIndex : u32) -> VertexOutput {
var pos = array<vec2<f32>, 6>(
vec2<f32>( 1.0,  1.0),
vec2<f32>( 1.0, -1.0),
vec2<f32>(-1.0, -1.0),
vec2<f32>( 1.0,  1.0),
vec2<f32>(-1.0, -1.0),
vec2<f32>(-1.0,  1.0)
);

var uv = array<vec2<f32>, 6>(
vec2<f32>(1.0, 0.0),
vec2<f32>(1.0, 1.0),
vec2<f32>(0.0, 1.0),
vec2<f32>(1.0, 0.0),
vec2<f32>(0.0, 1.0),
vec2<f32>(0.0, 0.0)
);

var output : VertexOutput;
output.Position = vec4<f32>(pos[VertexIndex], 0.0, 1.0);
output.fragUV = uv[VertexIndex];
return output;
}
`;

const PIXEL_SHADER = `
@group(0) @binding(1) var<storage, read> buf : array<f32>;

@fragment
fn main(@location(0) fragUV : vec2<f32>) -> @location(0) vec4<f32> {
// The user-facing camera is mirrored, flip horizontally.
var coord = vec2(0.0, 0.0);
if (fragUV.x < 0.5) {
  coord = vec2(fragUV.x + 0.5, fragUV.y);
} else {
  coord = vec2(fragUV.x - 0.5, fragUV.y);
}

let redInputOffset = 0;
let greenInputOffset = 262144;
let blueInputOffset = 524288;
let index = i32(coord.x * f32(512)) + i32(coord.y * f32(512) * f32(512));  // pixelWidth = pixelHeight= 512
let r = clamp(buf[index] / 2 + 0.5, 0.0, 1.0);
let g = clamp(buf[262144 + index] / 2 + 0.5, 0.0, 1.0);
let b = clamp(buf[524288 + index] / 2 + 0.5, 0.0, 1.0);
let a = 1.0;

var out_color = vec4<f32>(r, g, b, a);

return out_color;
}
`;

const modelName = "sd-turbo-ort-web";
const tokenizerName = "clip-vit-base-patch16";

const config = getConfig();

const models = {
  unet: {
    url: "unet/model.onnx",
    size: 640,
    // should have 'steps: 1' but will fail to create the session
    opt: {
      freeDimensionOverrides: {
        batch_size: 1,
        num_channels: 4,
        height: 64,
        width: 64,
        sequence_length: 77
      }
    }
  },
  text_encoder: {
    url: "text_encoder/model.onnx",
    size: 1700,
    // should have 'sequence_length: 77' but produces a bad image
    opt: { freeDimensionOverrides: { batch_size: 1 } }
  },
  vae_decoder: {
    url: "vae_decoder/model.onnx",
    size: 95,
    opt: {
      freeDimensionOverrides: {
        batch_size: 1,
        num_channels_latent: 4,
        height_latent: 64,
        width_latent: 64
      }
    }
  }
};

const text = document.getElementById("userInput");

const MODEL_UPLOAD_INPUT_UNET = document.getElementById("uploadInput4Unet");
const MODEL_UPLOAD_INPUT_VAE_DECODER = document.getElementById(
  "uploadInput4vae_decoder"
);
const MODEL_UPLOAD_INPUT_TEXT_ENCODER = document.getElementById(
  "uploadInput4text_encoder"
);

const GENERATE_TRIGGER_BUTTON = document.getElementById("generateTriggerBtn");
const LOAD_MODELS_TRIGGER_BUTTON = document.getElementById(
  "loadModelsTriggerBtn"
);

const progressBar = document.getElementById("progressBar");
const LOAD_MODELS_BUTTON = document.getElementById("loadModelBtn");
const LOAD_MODELS_POPOVER = document.getElementById("modelPopover");
const LOG_PANEL = document.getElementById("logPanel");
const DOWNLOAD_PROMPT_DIV = document.getElementById("downloadPrompt");

let tokenizer;
let loading;
const sigma = 14.6146;
const gamma = 0;
const vae_scaling_factor = 0.18215;

let loadedCount = 0;
let fetchedModels = {};

text.value = "Paris with the river in the background";

const STATUS = {
  DEFAULT: 0,
  PREPARING: 1,
  RUNNING: 2,
  DONE: 3
};

function getConfig() {
  var config = {
    model: getRequestPrefix(modelName),
    provider: "webgpu",
    device: "gpu",
    threads: "1",
    images: "1"
  };

  const query = window.location.search
    ? window.location.search.substring(1)
    : "";

  const vars = query.split("&");

  for (var i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if (pair[0] in config) {
      config[pair[0]] = decodeURIComponent(pair[1]);
    } else if (pair[0].length > 0) {
      throw new Error("unknown argument: " + pair[0]);
    }
  }
  config.threads = parseInt(config.threads);
  config.images = parseInt(config.images);
  return config;
}

function randn_latents(shape, noise_sigma) {
  function randn() {
    // Use the Box-Muller transform
    let u = Math.random();
    let v = Math.random();
    let z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return z;
  }
  let size = 1;
  shape.forEach((element) => {
    size *= element;
  });

  let data = new Float32Array(size);
  // Loop over the shape dimensions
  for (let i = 0; i < size; i++) {
    data[i] = randn() * noise_sigma;
  }
  return data;
}

async function fetchAndCache(name, base_url, model_path) {
  const url = `${base_url}${model_path}`;
  let data = [];

  console.log("trying to fetch model:", name);

  const statusBarElement = document.getElementById(`${name}StatusBar`);

  // fetch models from origin private file system
  const root = await navigator.storage.getDirectory();
  let fileHandle;

  async function fetchFile() {
    try {
      if (DOWNLOAD_PROMPT_DIV.textContent === "") {
        DOWNLOAD_PROMPT_DIV.textContent = `These models will be downloaded only once.`;
      }

      const response = await fetch(url);

      if (response.status === 404) {
        throw new Error(`${name} model not found.`);
      }

      const element = document.getElementById(`${name}ModelWrapper`);

      element.innerHTML = `
        <div class="relative px-2 z-20" id="${name}StatusText"></div>
        <div class="relative px-2 z-20">
          <span id="${name}ProgressVal">0%</span>
        </div>
        <div
          id="${name}ProgressBar"
          class="absolute top-0 rounded-2xl z-10 text-right bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        ></div>
     `;

      const statusText = document.getElementById(`${name}StatusText`);
      // show the progress of downloading
      const progressEle = document.getElementById(`${name}ProgressBar`);
      // show the progress value
      const progressValEle = document.getElementById(`${name}ProgressVal`);

      // show the models downloading content
      setUpLayout4PromptMode(STATUS.PREPARING);
      // show the progress bar during downloading
      element.classList.toggle("hidden");
      const reader = response.body.getReader();
      const totalLength = +response.headers.get("Content-Length");

      let loaded = 0;
      let chunks = [];

      const startTime = new Date().getTime();
      let stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              const currentTime = new Date().getTime();
              const elapsedTime = (currentTime - startTime) / 1000;
              if (done) {
                // update status bar content when download complete
                if (statusBarElement) {
                  statusBarElement.textContent = `downloaded in ${elapsedTime}s (${formatBufferSize(
                    totalLength
                  )})`;
                  changeClass4StatusBar("loaded", statusBarElement);
                }
                controller.close();
                return;
              }

              loaded += value.byteLength;
              let progress = (loaded / totalLength) * 100;
              statusText.textContent = `Downloading ${name} model ...`;

              if (!progressEle.style.height) {
                progressEle.style.height = "30px";
              }
              progressEle.style.width = `${progress}%`;
              progressValEle.textContent = `Size: ${formatBufferSize(
                loaded
              )} / ${formatBufferSize(
                totalLength
              )} - Time: ${elapsedTime.toFixed(2)}s`;

              chunks.push(value);
              controller.enqueue(value);
              push();
            });
          }

          push();
        }
      });

      let newResponse = new Response(stream);
      data = await newResponse.arrayBuffer();

      // save the buffer into origin private file system
      fileHandle = await root.getFileHandle(name, { create: true });

      const writable = await fileHandle.createWritable();
      await writable.write(data);
      await writable.close();

      // update status flag in model panel
      removeHiddenClass(document.getElementById(`${name}StatusFlag`));
      // hide the element when loading process finish
      element.classList.toggle("hidden");

      return data;
    } catch (e) {
      logOutToPanel(e);
      return;
    }
  }

  try {
    // get buffer from origin private file system
    fileHandle = await root.getFileHandle(name);
    const blob = await fileHandle.getFile();
    const buffer = await blob.arrayBuffer();
    statusBarElement.textContent = "loaded";
    changeClass4StatusBar("loaded", statusBarElement);

    return buffer;
  } catch (e) {
    // not saved in origin private file system, fetch from origin server
    return await fetchFile();
  }
}

function uploadToGPU(buffer, values, type) {
  logOutToPanel("Uploading data to GPU buffer ...");
  const stagingBuffer = deviceWebgpu.createBuffer({
    usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC,
    size: values.buffer.byteLength,
    mappedAtCreation: true
  });
  const arrayBuffer = stagingBuffer.getMappedRange();
  if (type === "float32") {
    new Float32Array(arrayBuffer).set(values);
  } else if (type === "int32") {
    new Int32Array(arrayBuffer).set(values);
  }
  stagingBuffer.unmap();
  const encoder = deviceWebgpu.createCommandEncoder();
  encoder.copyBufferToBuffer(stagingBuffer, 0, buffer, 0, values.byteLength);
  deviceWebgpu.queue.submit([encoder.finish()]);
  stagingBuffer.destroy();
}

function submitComputeTask(pipeline, bindGroup) {
  let commandEncoderWebgpu = deviceWebgpu.createCommandEncoder();
  let computePassEncoder = commandEncoderWebgpu.beginComputePass();
  computePassEncoder.setPipeline(pipeline);
  computePassEncoder.setBindGroup(0, bindGroup);
  computePassEncoder.dispatchWorkgroups(32, 1, 1);
  computePassEncoder.end();
  computePassEncoder = null;
  queueWebgpu.submit([commandEncoderWebgpu.finish()]);
}

async function load_models(models) {
  // NOTE: download or load models first
  console.time("load_models");
  for (const [name, model] of Object.entries(models)) {
    const statusBarElement = document.getElementById(`${name}StatusBar`);
    try {
      if (statusBarElement) {
        statusBarElement.textContent = "loading";
        // set the status of this model in status bar
        changeClass4StatusBar("loading", statusBarElement);
      }

      const model_bytes = await fetchAndCache(name, config.model, model.url);
      fetchedModels[name] = model_bytes;
    } catch (e) {
      statusBarElement.textContent = "unload";
    }
  }
  console.timeEnd("load_models");

  // NOTE: return if not all models are successfully loaded
  if (Object.keys(fetchedModels).length !== Object.keys(models).length) {
    throw "Please make sure that all models are successfully loaded!";
  }

  // hide the progress display area after loading all models
  document.getElementById("progressDisplaySection").classList.add("disappear");
}

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) =>
      reject(new Error(`Failed to load script ${src}: ${err.message}`));
    document.head.appendChild(script);
  });
};

if (VITE_ENV_USE_REMOTE_MODELS) {
  await loadScript(
    "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/ort.webgpu.min.js"
  );
  console.log("ONNX Runtime Web script loaded successfully.");
} else {
  await loadScript("../../models/wasm/ort-web@1_18_0/ort.webgpu.min.js");
  console.log("Loaded ORT Web locally successfully.");
}

if (config.provider == "webgpu") {
  ort.env.wasm.numThreads = 1;
  ort.env.wasm.simd = true;
} else {
  ort.env.wasm.numThreads = config.threads;
  ort.env.wasm.simd = true;
}

const opt = {
  executionProviders: [config.provider],
  enableMemPattern: false,
  enableCpuMemArena: false,
  extra: {
    session: {
      disable_prepacking: "1",
      use_device_allocator_for_initializers: "1",
      use_ort_model_bytes_directly: "1",
      use_ort_model_bytes_for_initializers: "1"
    }
  }
};

switch (config.provider) {
  case "webgpu":
    if (!("gpu" in navigator)) {
      throw new Error("webgpu is NOT supported");
    }
    opt.preferredOutputLocation = {
      last_hidden_state: "gpu-buffer"
    };
    break;
  case "webnn":
    if (!("ml" in navigator)) {
      throw new Error("webnn is NOT supported");
    }
    opt.executionProviders = [
      {
        name: "webnn",
        deviceType: config.device,
        powerPreference: "default"
      }
    ];
    break;
}

/**
 *
 * @param {current status, one of STATUS object} status
 *
 */
function setUpLayout4PromptMode(status) {
  const promptEle = document.getElementById("promptInputSection");
  const buttonsAndTextAreas = promptEle.querySelectorAll("button, textarea");
  const loadingIconEle = document.getElementById("loadingIcon");
  const progressBarEle = document.getElementById("progressDisplaySection");
  const imageDisplayEle = document.getElementById("imageDisplaySection");
  const generatingStatusTextEle = document.getElementById("generatingProgress");

  // the initial status of the elements or the status when errors occurring
  if (status === STATUS.DEFAULT) {
    if (!progressBarEle.classList.contains("disappear")) {
      progressBarEle.classList.add("disappear");
    }

    if (!loadingIconEle.classList.contains("hidden")) {
      loadingIconEle.classList.add("hidden");
    }

    buttonsAndTextAreas.forEach(function (item) {
      item.disabled = false;
    });

    if (promptEle.classList.contains("running-mode")) {
      promptEle.classList.remove("running-mode");
    }

    if (!imageDisplayEle.classList.contains("disappear")) {
      imageDisplayEle.classList.add("disappear");
    }
  }

  // display the models loading | downloading process bar and animation icon during evn preparing process
  if (status === STATUS.PREPARING) {
    removeHiddenClass(loadingIconEle);

    buttonsAndTextAreas.forEach(function (item) {
      item.disabled = true;
    });

    if (!promptEle.classList.contains("running-mode")) {
      promptEle.classList.add("running-mode");
    }

    if (progressBarEle.classList.contains("disappear")) {
      progressBarEle.classList.remove("disappear");
    }

    if (!imageDisplayEle.classList.contains("disappear")) {
      imageDisplayEle.classList.add("disappear");
    }
  }

  // hide process bar and display the image display section
  if (status === STATUS.RUNNING) {
    if (!progressBarEle.classList.contains("disappear")) {
      progressBarEle.classList.add("disappear");
    }

    if (!loadingIconEle.classList.contains("hidden")) {
      loadingIconEle.classList.add("hidden");
    }

    buttonsAndTextAreas.forEach(function (item) {
      item.disabled = true;
    });

    if (!promptEle.classList.contains("running-mode")) {
      promptEle.classList.add("running-mode");
    }

    if (imageDisplayEle.classList.contains("disappear")) {
      imageDisplayEle.classList.remove("disappear");
    }

    removeHiddenClass(generatingStatusTextEle);
  }

  // should keep the image display area and hidden other elements
  if (status === STATUS.DONE) {
    if (!progressBarEle.classList.contains("disappear")) {
      progressBarEle.classList.add("disappear");
    }

    if (!loadingIconEle.classList.contains("hidden")) {
      loadingIconEle.classList.add("hidden");
    }

    if (promptEle.classList.contains("running-mode")) {
      promptEle.classList.remove("running-mode");
    }

    if (imageDisplayEle.classList.contains("disappear")) {
      imageDisplayEle.classList.remove("disappear");
    }

    if (!generatingStatusTextEle.classList.contains("hidden")) {
      generatingStatusTextEle.classList.add("hidden");
    }

    buttonsAndTextAreas.forEach(function (item) {
      item.disabled = false;
    });
  }
}

LOAD_MODELS_TRIGGER_BUTTON.addEventListener("click", async function () {
  try {
    await load_models(models);
    setTimeout(async () => {
      run(true);
    }, 1000);
  } catch (error) {
    setUpLayout4PromptMode(STATUS.DEFAULT);
  }
});

GENERATE_TRIGGER_BUTTON.addEventListener("click", async function () {
  try {
    setUpLayout4PromptMode(STATUS.RUNNING);
    setTimeout(async () => {
      run();
    }, 1000);
  } catch (error) {
    setUpLayout4PromptMode(STATUS.DEFAULT);
  }
});

document.getElementById("promptInspireBtn").addEventListener("click", () => {
  const imagePrompts = [
    "Paris with the river in the background",
    "A serene sunset over a calm ocean",
    "A bustling cityscape at night",
    "A tranquil forest with a flowing river",
    "A snowy mountain peak under a clear blue sky",
    "A medieval castle surrounded by a moat",
    "A futuristic city with flying cars",
    "A desert oasis with palm trees and a camel",
    "A tropical beach with crystal clear water",
    "A group of penguins on an ice floe",
    "A cherry blossom tree in full bloom",
    "A Victorian mansion at dusk",
    "A field of sunflowers under a sunny sky",
    "A cozy cabin in a winter landscape",
    "A bustling farmer's market with fresh produce",
    "A coral reef teeming with marine life",
    "A vineyard in the rolling hills of Tuscany",
    "A lighthouse on a cliff overlooking the sea",
    "A hot air balloon festival at sunrise",
    "A tranquil Japanese garden with a koi pond",
    "A space station orbiting a distant planet",
    "Impressionist oil painting of a beach at sunset with a narrow aspect ratio",
    "A photograph of a city skyline in the style of Edward Hopper taken from an aerial viewpoint",
    "A 3D rendering of a cat sitting on a windowsill in minimalist style with high resolution",
    "Graffiti-style painting of a city street with an urban look and textured surfaces",
    "A sketch of a pirate ship in black-and-white with realistic textures and low resolution",
    "A chalk drawing of a family picnic being attacked by ants in Central Park with a surrealist style",
    "A watercolor painting of a coffee shop with surreal elements in vibrant colors",
    "An oil painting of a rainbow over a rural abandoned town with classic style",
    "A 3D rendering of a spaceship taking off into space with a cyberpunk look and wide aspect ratio",
    "A sketch of two cats sitting on a sofa watching TV while eating spaghetti"
  ];

  text.value = imagePrompts[Math.floor(Math.random() * imagePrompts.length)];
});

function logOutToPanel(content) {
  removeHiddenClass(LOG_PANEL);
  LOG_PANEL.textContent = content;
}

async function run(initFlag = false) {
  try {
    // initialize web gpu and models
    async function initializeModels() {
      for (const [name, model] of Object.entries(models)) {
        if (loadedCount === 1) {
          webgpuResourceInitialize();
        }
        const sess_opt = { ...opt, ...model.opt };
        logOutToPanel(`Creating inference session for ${name} ...`);
        models[name].sess = await ort.InferenceSession.create(
          fetchedModels[name],
          sess_opt
        );
        loadedCount++;
      }
      const latent_shape = [1, 4, 64, 64];
      latentData = randn_latents(latent_shape, sigma);

      uploadToGPU(latentBuffer, latentData, "float32");

      submitComputeTask(
        prescaleLatentSpacePipeline,
        prescaleLatentSpaceBindGroup
      );

      if (tokenizer === undefined) {
        logOutToPanel("Loading tokenizer ...");
        tokenizer = await AutoTokenizer.from_pretrained(
          ALL_NEEDED_MODEL_RESOURCES[tokenizerName].localFolderPathPrefix +
            tokenizerName
        );

        tokenizer.pad_token_id = 0;
      }
    }

    async function executeInference(token) {
      const { input_ids } = await tokenizer(token, {
        padding: true,
        max_length: 77,
        truncation: true,
        return_tensor: false
      });

      // text-encoder
      textEncoderOutputs["last_hidden_state"] = textEncoderOutputsTensor;
      await models.text_encoder.sess.run(
        {
          input_ids: new ort.Tensor("int32", input_ids, [1, input_ids.length])
        },
        textEncoderOutputs
      );

      for (let j = 0; j < config.images; j++) {
        let feed = {
          sample: unetSampleInputsTensor,
          timestep: new ort.Tensor("int64", [999n], [1]),
          encoder_hidden_states: textEncoderOutputsTensor
        };
        var unetOutSampleOutputs = {};
        unetOutSampleOutputs["out_sample"] = unetOutSampleTensor;
        let { out_sample } = await models.unet.sess.run(
          feed,
          unetOutSampleOutputs
        );

        submitComputeTask(stepLatentSpacePipeline, stepLatentSpaceBindGroup);

        var vaeDecodeInputs = {};
        vaeDecodeInputs["latent_sample"] = unetOutSampleTensor;
        const decodedOutputs = {};
        decodedOutputs["sample"] = decodedOutputsTensor;
        await models.vae_decoder.sess.run(vaeDecodeInputs, decodedOutputs);

        const commandEncoder = deviceWebgpu.createCommandEncoder();
        const textureView = renderContext.getCurrentTexture().createView();
        const renderPassDescriptor = {
          colorAttachments: [
            {
              view: textureView,
              clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
              loadOp: "clear",
              storeOp: "store"
            }
          ]
        };

        const passEncoder =
          commandEncoder.beginRenderPass(renderPassDescriptor);
        passEncoder.setPipeline(renderPipeline);
        passEncoder.setBindGroup(0, renderBindGroup);
        passEncoder.draw(6, 1, 0, 0);
        passEncoder.end();
        deviceWebgpu.queue.submit([commandEncoder.finish()]);
        await deviceWebgpu.queue.onSubmittedWorkDone();
      }
    }

    // set up environment firstly
    if (initFlag) {
      await initializeModels();
      await executeInference("Quick test image");
      // clear the generated test image in the canvas
      clearCanvas();
      logOutToPanel("Ready!");
      // hide the loading icon and show the generate button
      if (
        LOAD_MODELS_TRIGGER_BUTTON &&
        !LOAD_MODELS_TRIGGER_BUTTON.classList.contains("hidden")
      ) {
        LOAD_MODELS_TRIGGER_BUTTON.classList.add("hidden");
      }
      removeHiddenClass(GENERATE_TRIGGER_BUTTON);
      setUpLayout4PromptMode(STATUS.DEFAULT);
      return;
    } else {
      await executeInference(text.value);
      logOutToPanel("Ready!");
      setUpLayout4PromptMode(STATUS.DONE);
    }
  } catch (e) {
    console.error(e);
    logOutToPanel("Error: " + e.message || e);
    setUpLayout4PromptMode(STATUS.DEFAULT);
    return;
  }
}

function clearCanvas() {
  const commandEncoder = deviceWebgpu.createCommandEncoder();
  const textureView = renderContext.getCurrentTexture().createView();
  const renderPassDescriptor = {
    colorAttachments: [
      {
        view: textureView,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
        loadOp: "clear",
        storeOp: "store"
      }
    ]
  };

  const passEncoder = commandEncoder.beginComputePass(renderPassDescriptor);
  passEncoder.end();
  deviceWebgpu.queue.submit([commandEncoder.finish()]);
}

function webgpuResourceInitialize() {
  logOutToPanel("Initializing the webgpu resources ...");
  deviceWebgpu = ort.env.webgpu.device;
  queueWebgpu = deviceWebgpu.queue;

  textEncoderOutputsBuffer = deviceWebgpu.createBuffer({
    size: Math.ceil((1 * 77 * 1024 * 4) / 16) * 16,
    usage:
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
  });
  textEncoderOutputsTensor = ort.Tensor.fromGpuBuffer(
    textEncoderOutputsBuffer,
    {
      dataType: "float32",
      dims: [1, 77, 1024],
      dispose: () => textEncoderOutputsBuffer.destroy()
    }
  );

  unetOutSampleBuffer = deviceWebgpu.createBuffer({
    size: Math.ceil((1 * 4 * 64 * 64 * 4) / 16) * 16,
    usage:
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
  });
  unetOutSampleTensor = ort.Tensor.fromGpuBuffer(unetOutSampleBuffer, {
    dataType: "float32",
    dims: [1, 4, 64, 64],
    dispose: () => unetOutSampleBuffer.destroy()
  });
  latentBuffer = deviceWebgpu.createBuffer({
    size: Math.ceil((1 * 4 * 64 * 64 * 4) / 16) * 16,
    usage:
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
  });
  unetSampleInputsBuffer = deviceWebgpu.createBuffer({
    size: Math.ceil((1 * 4 * 64 * 64 * 4) / 16) * 16,
    usage:
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
  });
  unetSampleInputsTensor = ort.Tensor.fromGpuBuffer(unetSampleInputsBuffer, {
    dataType: "float32",
    dims: [1, 4, 64, 64],
    dispose: () => unetSampleInputsBuffer.destroy()
  });
  decodedOutputsBuffer = deviceWebgpu.createBuffer({
    size: Math.ceil((1 * 3 * pixelHeight * pixelWidth * 4) / 16) * 16,
    usage:
      GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
  });
  decodedOutputsTensor = ort.Tensor.fromGpuBuffer(decodedOutputsBuffer, {
    dataType: "float32",
    dims: [1, 3, pixelHeight, pixelWidth],
    dispose: () => decodedOutputsBuffer.destroy()
  });

  prescaleLatentSpacePipeline = deviceWebgpu.createComputePipeline({
    layout: "auto",
    compute: {
      module: deviceWebgpu.createShaderModule({
        code: PRESCALE_LATENT_SPACE_SHADER
      }),
      entryPoint: "_start"
    }
  });

  prescaleLatentSpaceBindGroup = deviceWebgpu.createBindGroup({
    layout: prescaleLatentSpacePipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: unetSampleInputsBuffer
        }
      },
      {
        binding: 1,
        resource: {
          buffer: latentBuffer
        }
      }
    ]
  });

  stepLatentSpacePipeline = deviceWebgpu.createComputePipeline({
    layout: "auto",
    compute: {
      module: deviceWebgpu.createShaderModule({
        code: STEP_LATENT_SPACE_SHADER
      }),
      entryPoint: "_start"
    }
  });
  stepLatentSpaceBindGroup = deviceWebgpu.createBindGroup({
    layout: stepLatentSpacePipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: unetOutSampleBuffer
        }
      },
      {
        binding: 1,
        resource: {
          buffer: latentBuffer
        }
      }
    ]
  });

  const canvas = document.getElementById(`canvas`);
  canvas.width = pixelWidth;
  canvas.height = pixelHeight;
  renderContext = canvas.getContext("webgpu");
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  const presentationSize = [pixelWidth, pixelHeight];
  renderContext.configure({
    device: deviceWebgpu,
    size: presentationSize,
    format: presentationFormat,
    alphaMode: "premultiplied"
  });
  renderPipeline = deviceWebgpu.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: deviceWebgpu.createShaderModule({
        code: VERTEX_SHADER
      }),
      entryPoint: "main"
    },
    fragment: {
      module: deviceWebgpu.createShaderModule({
        code: PIXEL_SHADER
      }),
      entryPoint: "main",
      targets: [
        {
          format: presentationFormat
        }
      ]
    },
    primitive: {
      topology: "triangle-list"
    }
  });

  renderBindGroup = deviceWebgpu.createBindGroup({
    layout: renderPipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 1,
        resource: {
          buffer: decodedOutputsBuffer
        }
      }
    ]
  });
}

async function updateStatusOfModels() {
  for (const [name, _model] of Object.entries(models)) {
    const statusBarElement = document.getElementById(`${name}StatusBar`);
    if (!statusBarElement) return;
    // set status of this model as `unload` by default
    // check if this name is in the origin private file system
    // show the status flag in the status panels or not
    const root = await navigator.storage.getDirectory();
    try {
      const fileHandle = await root.getFileHandle(name);
      await fileHandle.getFile();
      statusBarElement.textContent = "cached";
      changeClass4StatusBar("cached", statusBarElement);
      removeHiddenClass(document.getElementById(`${name}StatusFlag`));
    } catch (e) {
      statusBarElement.textContent = "unload";
      changeClass4StatusBar("unload", statusBarElement);
    }
  }
}

function formatBufferSize(bufferByteSize) {
  if (bufferByteSize >= 1e9) {
    return (bufferByteSize / 1e9).toFixed(2) + "GB";
  } else if (bufferByteSize >= 1e6) {
    return (bufferByteSize / 1e6).toFixed(2) + "MB";
  } else if (bufferByteSize >= 1e3) {
    return (bufferByteSize / 1e3).toFixed(2) + "KB";
  } else {
    return bufferByteSize + "bytes";
  }
}

await updateStatusOfModels();

function formatBytes(bytes, decimals = 0) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
  const rounded = (bytes / Math.pow(1000, i)).toFixed(decimals);
  return rounded + " " + sizes[i];
}

MODEL_UPLOAD_INPUT_UNET.addEventListener("change", (event) => {
  uploadHandler(event, "unet");
});

MODEL_UPLOAD_INPUT_VAE_DECODER.addEventListener("change", (event) => {
  uploadHandler(event, "vae_decoder");
});

MODEL_UPLOAD_INPUT_TEXT_ENCODER.addEventListener("change", (event) => {
  uploadHandler(event, "text_encoder");
});

async function uploadHandler(event, resource) {
  const files = event.target.files;
  if (!files.length) {
    return;
  }

  for (const file of files) {
    const reader = new FileReader();

    reader.onprogress = function (progressEvent) {
      if (progressEvent.lengthComputable) {
        const loaded = progressEvent.loaded;
        const total = progressEvent.total;

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

      const data = await response.arrayBuffer();

      // save this buffer and file name into the origin private file system
      const root = await navigator.storage.getDirectory();
      const fileHandle = await root.getFileHandle(resource, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(data);
      await writable.close();

      if (!progressBar.classList.contains("hidden")) {
        progressBar.classList.add("hidden");
      }

      // should update the model status in the status panel
      await updateStatusOfModels();
    };

    reader.readAsArrayBuffer(file);
  }
}

initModelsPanelHandler(LOAD_MODELS_BUTTON, LOAD_MODELS_POPOVER);
