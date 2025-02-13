---
library_name: transformers.js
base_model: deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B
---

https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B with ONNX weights to be compatible with Transformers.js.



## Usage (Transformers.js)

If you haven't already, you can install the [Transformers.js](https://huggingface.co/docs/transformers.js) JavaScript library from [NPM](https://www.npmjs.com/package/@huggingface/transformers) using:
```bash
npm i @huggingface/transformers
```


**Example:** Text-generation w/ `onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX`

```js
import { pipeline, TextStreamer } from "@huggingface/transformers";

// Create a text generation pipeline
const generator = await pipeline(
  "text-generation",
  "onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX",
  { dtype: "q4f16" },
);

// Define the list of messages
const messages = [
  { role: "user", content:  "Solve the equation: x^2 - 3x + 2 = 0" },
];

// Create text streamer
const streamer = new TextStreamer(generator.tokenizer, {
  skip_prompt: true,
  // callback_function: (text) => { }, // Optional callback function
})

// Generate a response
const output = await generator(messages, { max_new_tokens: 512, do_sample: false, streamer });
console.log(output[0].generated_text.at(-1).content);
```

<details>
<summary>See example output</summary>

```
<think>
To solve the quadratic equation \( x^2 - 3x + 2 = 0 \), I'll start by factoring the left-hand side. I need to find two numbers that multiply to 2 and add up to -3. These numbers are -1 and -2.

Next, I'll rewrite the equation as \( (x - 1)(x - 2) = 0 \). 

Using the zero product property, I'll set each factor equal to zero:
1. \( x - 1 = 0 \) leads to \( x = 1 \).
2. \( x - 2 = 0 \) leads to \( x = 2 \).

Therefore, the solutions to the equation are \( x = 1 \) and \( x = 2 \).
</think>

To solve the quadratic equation:

\[
x^2 - 3x + 2 = 0
\]

**Step 1: Factor the Quadratic**

We look for two numbers that multiply to \( +2 \) and add up to \( -3 \). These numbers are \( -1 \) and \( -2 \).

\[
x^2 - 3x + 2 = (x - 1)(x - 2) = 0
\]

**Step 2: Apply the Zero Product Property**

If the product of two factors is zero, at least one of the factors must be zero.

\[
x - 1 = 0 \quad \text{or} \quad x - 2 = 0
\]

**Step 3: Solve for \( x \)**

\[
x = 1 \quad \text{or} \quad x = 2
\]

**Final Answer:**

\[
\boxed{1 \text{ and } 2}
\]
```
  
</details>

---

Note: Having a separate repo for ONNX weights is intended to be a temporary solution until WebML gains more traction. If you would like to make your models web-ready, we recommend converting to ONNX using [🤗 Optimum](https://huggingface.co/docs/optimum/index) and structuring your repo like this one (with ONNX weights located in a subfolder named `onnx`).