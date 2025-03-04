import { AutoTokenizer, TextStreamer, env } from "@huggingface/transformers";

import ort from "onnxruntime-web/webgpu";

import {
  TRANSFORMER_LOCAL_MODEL_PATH,
  ALL_NEEDED_MODEL_RESOURCES
} from "../../../config.js";

import { DEFAULT_CACHE_STORAGE_NAME, MODEL_NAME } from "./constants.js";

let baseUrl = "";

if (location.href.toLowerCase().indexOf("github.io") > -1) {
  // Used for release to public domain, so the project can be hosted on GitHub Pages or other static hosting services.
  baseUrl = "/web-ai-showcase";
}

const LOCAL_REQUEST_PREFIX =
  baseUrl +
  TRANSFORMER_LOCAL_MODEL_PATH +
  ALL_NEEDED_MODEL_RESOURCES[MODEL_NAME].localFolderPathPrefix;

export class LLM {
  model_data_file_name = `model_q4f16.onnx`;
  model_config_file_name = `config.json`;

  local_model_path = LOCAL_REQUEST_PREFIX;

  tokenizer = undefined;
  inferenceSession = undefined;

  kv_dims = [];
  num_hidden_layers = 0;

  eos = 0n;
  end_thinking_token_id = 0;

  async init() {
    env.allowLocalModels = true;
    env.allowRemoteModels = true;
    env.localModelPath = this.local_model_path;

    //const model_data_file_url = `${LOCAL_REQUEST_PREFIX}${MODEL_NAME}/onnx/${this.model_data_file_name}`;
    //const model_config_file_url = `${LOCAL_REQUEST_PREFIX}${MODEL_NAME}/${this.model_config_file_name}`;
    env.remoteHost = `https://hf-mirror.com/`;
    const model_data_file_url = `${env.remoteHost}onnx-community/${MODEL_NAME}/resolve/main/onnx/${this.model_data_file_name}`;
    const model_config_file_url = `${env.remoteHost}onnx-community/${MODEL_NAME}/resolve/main/${this.model_config_file_name}`;

    const callback = (x) => {
      self.postMessage(x);
    };

    this.tokenizer = await AutoTokenizer.from_pretrained(MODEL_NAME, callback);

    // 151648: <think>
    // 151649: </think>
    const [END_THINKING_TOKEN_ID] = this.tokenizer.encode("</think>", {
      add_special_tokens: false
    });
    this.end_thinking_token_id = END_THINKING_TOKEN_ID;

    const modelBytes = await this.fetchAndCache(
      model_data_file_url,
      (callbackInfo) => {
        callback({
          name: MODEL_NAME,
          file: this.model_data_file_name,
          ...callbackInfo
        });
      }
    );
    const inferenceSessionOptions = {
      executionProviders: ["webgpu"],
      preferredOutputLocation: {}
    };
    const jsonBytes = await this.fetchAndCache(
      model_config_file_url,
      (callbackInfo) => {
        callback({
          name: MODEL_NAME,
          file: this.model_config_file_name,
          ...callbackInfo
        });
      }
    );
    const textDecoder = new TextDecoder();
    const modelConfig = JSON.parse(textDecoder.decode(jsonBytes));
    for (let i = 0; i < modelConfig.num_hidden_layers; ++i) {
      inferenceSessionOptions.preferredOutputLocation[`present.${i}.key`] =
        "gpu-buffer";
      inferenceSessionOptions.preferredOutputLocation[`present.${i}.value`] =
        "gpu-buffer";
    }
    this.inferenceSession = await ort.InferenceSession.create(
      modelBytes,
      inferenceSessionOptions
    );

    this.eos = BigInt(modelConfig.eos_token_id);
    this.num_hidden_layers = modelConfig.num_hidden_layers;
    this.kv_dims = [
      1,
      modelConfig.num_key_value_heads,
      0,
      modelConfig.hidden_size / modelConfig.num_attention_heads
    ];
  }

  async fetchAndCache(url, callback) {
    callback({
      status: "initiate"
    });

    try {
      const cache = await caches.open(DEFAULT_CACHE_STORAGE_NAME);
      let response = await cache.match(url);
      const cacheMiss = response === undefined;
      if (cacheMiss) {
        callback({
          status: "download"
        });
        response = await fetch(url);
      }

      const data = await this.readResponse(response, callback);

      if (cacheMiss) {
        try {
          await cache.put(
            url,
            new Response(data, {
              headers: response.headers
            })
          );
        } catch (error) {
          console.error(error);
        }
      }

      callback({
        status: "done"
      });

      return data;
    } catch (error) {
      console.log(`can't fetch ${url}`);
      throw error;
    }
  }

  // Referenced from transformers.js/src/utils/hub.js
  async readResponse(response, callback) {
    const contentLength = response.headers.get("Content-Length");
    let total = parseInt(contentLength ?? "0");
    let buffer = new Uint8Array(total);
    let loaded = 0;

    const reader = response.body.getReader();
    async function read() {
      const { done, value } = await reader.read();
      if (done) return;

      let newLoaded = loaded + value.length;
      if (newLoaded > total) {
        total = newLoaded;

        // Adding the new data will overflow buffer.
        // In this case, we extend the buffer
        let newBuffer = new Uint8Array(total);

        // copy contents
        newBuffer.set(buffer);

        buffer = newBuffer;
      }
      buffer.set(value, loaded);
      loaded = newLoaded;

      const progress = (loaded / total) * 100;

      // Call your function here
      callback({
        status: "progress",
        progress: progress,
        loaded: loaded,
        total: total
      });

      return read();
    }

    // Actually read
    await read();

    return buffer;
  }

  async query(
    messages,
    max_output_tokens,
    callback_function = null,
    token_callback_function = null
  ) {
    const inferenceInputIds = this.tokenizer.apply_chat_template(messages, {
      add_generation_prompt: true
    });

    let feed = {};
    const empty = new Uint16Array();
    for (let i = 0; i < this.num_hidden_layers; ++i) {
      feed[`past_key_values.${i}.key`] = new ort.Tensor(
        "float16",
        empty,
        this.kv_dims
      );
      feed[`past_key_values.${i}.value`] = new ort.Tensor(
        "float16",
        empty,
        this.kv_dims
      );
    }

    feed["input_ids"] = inferenceInputIds;
    const output_tokens = [];
    output_tokens.push(...inferenceInputIds.data);

    let seqlen = output_tokens.length;
    const input_len = inferenceInputIds.size;
    feed["position_ids"] = new ort.Tensor(
      "int64",
      BigInt64Array.from({ length: input_len }, (_, i) =>
        BigInt(seqlen - input_len + i)
      ),
      [1, input_len]
    );

    const streamer = new TextStreamer(this.tokenizer, {
      skip_prompt: true,
      skip_special_tokens: true,
      callback_function,
      token_callback_function
    });

    let last_token = 0n;
    while (last_token != this.eos && seqlen < max_output_tokens) {
      feed["attention_mask"] = new ort.Tensor(
        "int64",
        BigInt64Array.from({ length: seqlen }, () => 1n),
        [1, seqlen]
      );

      const outputs = await this.inferenceSession.run(feed);
      last_token = BigInt(this.argmax(outputs.logits));

      if (last_token === this.eos) {
        break;
      }

      streamer.put([[last_token]]);

      this.update_kv_cache(outputs, feed);
      feed["input_ids"] = new ort.Tensor(
        "int64",
        BigInt64Array.from([last_token]),
        [1, 1]
      );
      feed["position_ids"] = new ort.Tensor(
        "int64",
        BigInt64Array.from([BigInt(seqlen)]),
        [1, 1]
      );
      ++seqlen;
    }

    streamer.end();
  }

  argmax(t) {
    const arr = t.data;
    const start = t.dims[2] * (t.dims[1] - 1);
    let max = arr[start];
    let maxidx = 0;

    for (let i = 0; i < t.dims[2]; i++) {
      const val = arr[i + start];
      if (!isFinite(val)) {
        throw new Error("found infinitive in logits");
      }
      if (val > max) {
        max = arr[i + start];
        maxidx = i;
      }
    }
    return maxidx;
  }

  update_kv_cache(outputs, feed) {
    for (const name in outputs) {
      if (name.startsWith("present")) {
        let newName = name.replace("present", "past_key_values");
        const t = feed[newName];
        if (t.location === "gpu-buffer") {
          t.dispose();
        }
        feed[newName] = outputs[name];
      }
    }
  }
}
