import { LLM } from "./llm.js";

let llm = null;

/**
 * Helper function to perform feature detection for WebGPU
 */
async function check() {
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      throw new Error("WebGPU is not supported (no adapter found)");
    }
    if (!adapter.features.has("shader-f16")) {
      throw new Error("WebGPU feature `shader-f16` is not supported");
    }
  } catch (e) {
    self.postMessage({
      status: "error",
      data: e.toString()
    });
  }
}

async function generate(messages) {
  if (!llm) {
    return;
  }

  let state = "thinking"; // 'thinking' or 'answering'
  let startTime;
  let numTokens = 0;
  let tps;
  const token_callback_function = (tokens) => {
    startTime ??= performance.now();

    if (numTokens++ > 0) {
      tps = (numTokens / (performance.now() - startTime)) * 1000;
    }
    if (tokens[0] == llm.end_thinking_token_id) {
      state = "answering";
    }
  };
  const callback_function = (output) => {
    self.postMessage({
      status: "update",
      output,
      tps,
      numTokens,
      state
    });
  };

  // Tell the main thread we are starting
  self.postMessage({ status: "start" });

  const max_output_tokens = 2048;
  await llm.query(
    messages,
    max_output_tokens,
    callback_function,
    token_callback_function
  );

  // Send the output back to the main thread
  self.postMessage({
    status: "complete"
  });
}

async function load() {
  self.postMessage({
    status: "loading",
    data: "Loading"
  });

  llm = new LLM();
  await llm.init();

  self.postMessage({
    status: "loading",
    data: "Warming up"
  });

  const max_output_tokens = 5;
  const empty_callback_function = () => {};
  await llm.query(
    ["hi"],
    max_output_tokens,
    empty_callback_function,
    empty_callback_function
  );

  self.postMessage({ status: "ready" });
}

// Listen for messages from the main thread
self.addEventListener("message", async (e) => {
  const { type, data } = e.data;

  switch (type) {
    case "check":
      check();
      break;

    case "load":
      load();
      break;

    case "generate":
      //const max_output_tokens = 2048;
      generate(data, 2048);
      break;

    case "interrupt":
      break;

    case "reset":
      break;
  }
});
