/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

/**
 * Transformers.js will firstly try to fetch resource from
 * the hugging face, then fallback to local if hugging face
 * is inaccessible
 */

/***************************************************************
 *                                                             *
 * ONLY_USE_LOCAL_MODELS (offline | hugging face inaccessible) *
 *     USE_REMOTE_MODELS = false                               *
 *                                                             *
 * ONLY_USE_REMOTE_MODELS (hugging face accessible)            *
 *     USE_REMOTE_MODELS = true                                *
 *                                                             *
 ***************************************************************/

export const USE_REMOTE_MODELS = false;

export const TRANSFORMER_LOCAL_MODEL_PATH = "/models/";

//TODO: unify the wasm version used by `Stable diffusion turbo` and other transformers.js samples.
// Now
//  - `transformers.js@aadeed9` : `onnxruntime-web@1.17.1`
//
//  We keep these 2 wasm files temporally and may unify them later.

export const TRANSFORMERS_V3_ORT_ENV_WASM_FILE_PATH =
  "/models/wasm/ort-web@1_17_1/";

export const MEDIAPIPE_WASM_FILE_PATH = "/models/mediapipe/tasks-genai/wasm";

/**
 * Example:
 *
 *  Remote Link
 *   - https://huggingface.co/Xenova/distilbart-cnn-6-6/resolve/main/config.json
 *
 *
 *  LocalModelFolder -
 *
 *   ./`${transformer_local_model_path}`/Xenova/distilbart-cnn-6-6/config.json
 *
 *   For onnx model files:
 *   ./`${transformer_local_model_path}`/models/Xenova/distilbart-cnn-6-6/onnx/decoder_model_merged_quantized.onnx
 */
export const ALL_NEEDED_MODEL_RESOURCES = {
  // summarization
  "distilbart-cnn-6-6": {
    linkPathPrefix:
      "https://huggingface.co/Xenova/distilbart-cnn-6-6/resolve/main/",
    localFolderPathPrefix: "Xenova/",
    resources: [
      "onnx/decoder_model_merged_quantized.onnx",
      "onnx/encoder_model_quantized.onnx"
    ]
  },

  // image-to-text
  "vit-gpt2-image-captioning": {
    linkPathPrefix:
      "https://huggingface.co/Xenova/vit-gpt2-image-captioning/resolve/main/",
    localFolderPathPrefix: "Xenova/",
    resources: [
      "onnx/decoder_model_merged_quantized.onnx",
      "onnx/encoder_model_quantized.onnx"
    ]
  },

  // question-answering
  "distilbert-base-cased-distilled-squad": {
    linkPathPrefix:
      "https://huggingface.co/Xenova/distilbert-base-cased-distilled-squad/resolve/main/",
    localFolderPathPrefix: "Xenova/",
    resources: ["onnx/model_quantized.onnx"]
  },

  // background-removal
  "RMBG-1.4": {
    linkPathPrefix: "https://huggingface.co/briaai/RMBG-1.4/resolve/main/",
    localFolderPathPrefix: "briaai/",
    resources: ["onnx/model.onnx"]
  },

  // SD-Turbo
  "sd-turbo-ort-web": {
    linkPathPrefix:
      "https://huggingface.co/schmuell/sd-turbo-ort-web/resolve/main/",
    localFolderPathPrefix: "schmuell/",
    resources: [
      "unet/model.onnx",
      "vae_decoder/model.onnx",
      "text_encoder/model.onnx"
    ]
  },

  // used by SD-Turbo
  "clip-vit-base-patch16": {
    linkPathPrefix:
      "https://huggingface.co/Xenova/clip-vit-base-patch16/resolve/main/",
    localFolderPathPrefix: "Xenova/",
    resources: []
  },

  "Phi-3-mini-4k-instruct": {
    linkPathPrefix:
      "https://huggingface.co/Xenova/Phi-3-mini-4k-instruct/resolve/main/",
    localFolderPathPrefix: "Xenova/",
    resources: ["onnx/model_q4.onnx", "onnx/model_q4.onnx_data"]
  },

  "Phi-3-mini-4k-instruct_fp16": {
    linkPathPrefix:
      "https://huggingface.co/Xenova/Phi-3-mini-4k-instruct_fp16/resolve/main/",
    localFolderPathPrefix: "Xenova/",
    resources: ["onnx/model_q4.onnx", "onnx/model_q4.onnx_data"]
  }
};
