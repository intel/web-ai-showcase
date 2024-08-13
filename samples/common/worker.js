/*
 * This file is modified based on
 *     https://github.com/xenova/transformers.js/blob/main/examples/demo-site/src/worker.js
 */

/////////////////////////////////////////////////////////////////
// Worker.js file for doing all transformer-based computations //
// Needed to ensure the UI thread is not blocked when running  //
/////////////////////////////////////////////////////////////////

/* eslint-disable no-undef */

import { pipeline, env } from "@xenova/transformers";

import {
  TRANSFORMER_LOCAL_MODEL_PATH,
  TRANSFORMERS_V3_ORT_ENV_WASM_FILE_PATH
} from "../../config.js";

if (VITE_ENV_USE_REMOTE_MODELS) {
  env.allowLocalModels = false;
  env.allowRemoteModels = true;
} else {
  env.allowLocalModels = true;
  env.allowRemoteModels = false;
}

// Define task function mapping
const TASK_FUNCTION_MAPPING = {
  "question-answering": question_answering,
  summarization: summarize,
  "image-to-text": image_to_text
};

// Listen for messages from UI
self.addEventListener("message", async (event) => {
  const { baseURI } = event.data;
  if (baseURI) {
    env.localModelPath = new URL(baseURI).origin + TRANSFORMER_LOCAL_MODEL_PATH;

    // set up local wasm paths for hosting mode
    if (!VITE_ENV_USE_REMOTE_MODELS) {
      env.backends.onnx.wasm.wasmPaths =
        new URL(baseURI).origin + TRANSFORMERS_V3_ORT_ENV_WASM_FILE_PATH;
    }
  }
  const data = event.data;
  let fn = TASK_FUNCTION_MAPPING[data.task];

  if (!fn) return;

  let result = await fn(data);
  self.postMessage({
    task: data.task,
    type: "result",
    data: result
  });
});

// Define model factories
// Ensures only one model is created of each type
class PipelineFactory {
  static task = null;
  static model = null;

  // NOTE: instance stores a promise that resolves to the pipeline
  static instance = null;

  constructor(tokenizer, model) {
    this.tokenizer = tokenizer;
    this.model = model;
  }

  /**
   * Get pipeline instance
   * @param {*} progressCallback
   * @returns {Promise}
   */
  static getInstance(progressCallback = null) {
    if (this.task === null || this.model === null) {
      throw Error("Must set task and model");
    }
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, {
        progress_callback: progressCallback
      });
    }

    return this.instance;
  }
}

class QuestionAnsweringPipelineFactory extends PipelineFactory {
  static task = "question-answering";
  static model = "Xenova/distilbert-base-cased-distilled-squad";
}

class SummarizationPipelineFactory extends PipelineFactory {
  static task = "summarization";
  static model = "Xenova/distilbart-cnn-6-6";
}

class ImageToTextPipelineFactory extends PipelineFactory {
  static task = "image-to-text";
  static model = "Xenova/vit-gpt2-image-captioning";
}

async function question_answering(data) {
  let pipeline = await QuestionAnsweringPipelineFactory.getInstance((data) => {
    self.postMessage({
      type: "download",
      task: "question-answering",
      data: data
    });
  });

  let answer = await pipeline(data.question, data.context);
  self.postMessage({
    type: "complete",
    target: data.elementIdToUpdate,
    data: answer.answer
  });

  return answer;
}

async function summarize(data) {
  let pipeline = await SummarizationPipelineFactory.getInstance((data) => {
    self.postMessage({
      type: "download",
      task: "summarization",
      data: data
    });
  });

  return await pipeline(data.text, {
    ...data.generation,
    callback_function: function (beams) {
      const decodedText = pipeline.tokenizer.decode(beams[0].output_token_ids, {
        skip_special_tokens: true
      });

      self.postMessage({
        type: "update",
        target: data.elementIdToUpdate,
        data: decodedText.trim()
      });
    }
  });
}

async function image_to_text(data) {
  let pipeline = await ImageToTextPipelineFactory.getInstance((data) => {
    self.postMessage({
      type: "download",
      task: "image-to-text",
      data: data
    });
  });

  return await pipeline(data.image, {
    ...data.generation,
    callback_function: function (beams) {
      const decodedText = pipeline.tokenizer.decode(beams[0].output_token_ids, {
        skip_special_tokens: true
      });

      self.postMessage({
        type: "update",
        target: data.elementIdToUpdate,
        data: decodedText.trim()
      });
    }
  });
}
