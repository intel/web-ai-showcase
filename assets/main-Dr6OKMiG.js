import{s as x}from"./navbar-C-8lifvS.js";const f=location.href.toLowerCase().indexOf("github.io")>-1?"/web-ai-showcase/":"/",s={WASM:"WASM",WEBGPU:"WebGPU",WEBNN:"WebNN"},i={CPU:"CPU",GPU:"GPU",NPU:"NPU"};let p=[{id:"wasm_image_to_text",title:"Image to Text",desc:"Generate text from image",sampleUrl:"./samples/image_to_text/index.html",model:"ViT GPT2",webApis:[s.WASM],framework:"Transformers.js",devices:[i.CPU],update:"2024-06-08"},{id:"wasm_question_answering",title:"Question Answering",desc:"Answer question from context",sampleUrl:"./samples/question_answering/index.html",model:"DistilBERT",webApis:[s.WASM],framework:"Transformers.js",devices:[i.CPU],update:"2024-06-08"},{id:"wasm_summarization",title:"Summarization",desc:"Generate summaries of paragraphs",sampleUrl:"./samples/summarization/index.html",model:"DistilBART CNN",webApis:[s.WASM],framework:"Transformers.js",devices:[i.CPU],update:"2024-06-08"},{id:"webgpu_background_removal",title:"Background Removal",desc:"Remove the background of an image",sampleUrl:"./samples/image_background_removal/index.html",model:"RMBG v1.4",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-08"},{id:"webgpu_benchmark",title:"WebGPU Benchmark",desc:"Benchmark to compare perf of WebGPU vs WASM",sampleUrl:"https://huggingface.co/spaces/Xenova/webgpu-embedding-benchmark",model:"all-MiniLM-L6-v2",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-08"},{id:"webgpu_clip",title:"OpenAI Clip",desc:"Zero-shot Image Classification",sampleUrl:"https://huggingface.co/spaces/Xenova/webgpu-clip",model:"clip",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-08"},{id:"webgpu_llm_gemma",title:"LLM-Gemma",desc:"LLM-Gemma",sampleUrl:"./samples/llm_gemma/gemma.html",model:"Gemma 2B",webApis:[s.WEBGPU],framework:"MediaPipe",devices:[i.GPU],update:"2024-06-08"},{id:"webgpu_modnet",title:"MODNet",desc:"Realtime Video Background Removal",sampleUrl:"https://huggingface.co/spaces/Xenova/webgpu-video-background-removal",model:"MODNet",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-08"},{id:"webgpu_moondream",title:"Moondream",desc:"Vision-Language Model",sampleUrl:"https://huggingface.co/spaces/Xenova/experimental-moondream-webgpu",model:"moondream2",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-10"},{id:"webgpu_phi3_mini",title:"Phi-3-mini",desc:"A private and powerful AI chatbot that runs locally in your browser.",sampleUrl:"./samples/phi3-webgpu/index.html",model:"Phi-3-mini-4k-instruct",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-09"},{id:"webgpu_qwen2",title:"Qwen2",desc:"Language understanding/generation, multilingual capability, coding, mathematics, etc.",sampleUrl:"https://huggingface.co/spaces/Xenova/webgpu-chat-qwen2",model:"Qwen2-0.5B-Instruct",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-10"},{id:"webgpu_sam",title:"WebGPU Segment Anything",desc:'AI model from Meta that can "cut out" any object',sampleUrl:"https://huggingface.co/spaces/Xenova/segment-anything-webgpu",model:"Sam",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-08"},{id:"webgpu_sd_turbo",title:"WebGPU Stable Diffusion Turbo",desc:"Transform your words into stunning AI visuals with stable diffusion turbo",sampleUrl:"./samples/stable_diffusion/stable-diffusion.html",model:"SD Turbo",webApis:[s.WEBGPU],framework:"ONNX Runtime Web",devices:[i.GPU],update:"2024-06-08"},{id:"webgpu_webllm",title:"WebLLM",desc:"High-performance in-browser LLM inference engine",sampleUrl:"https://chat.webllm.ai/",model:"Llama, Phi, Mistral, Gemma, QWen",webApis:[s.WEBGPU],framework:"TVM",devices:[i.GPU],update:"2024-06-09"},{id:"webgpu_whisper",title:"Whisper",desc:"Real-time speech recognition with OpenAI Whisper across 100 different languages",sampleUrl:"https://huggingface.co/spaces/Xenova/realtime-whisper-webgpu",model:"whisper-base",webApis:[s.WEBGPU],framework:"Transformers.js",devices:[i.GPU],update:"2024-06-10"},{id:"webnn_code_editor",title:"Code Editor",desc:"Test out some sample code directly in a compatible browser",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/code/index.html",model:"Matmul",webApis:[s.WEBNN],framework:"VanillaJS",devices:[i.CPU],update:"2024-06-08"},{id:"webnn_face_landmark_detection",title:"Facial Landmark Detection",desc:"See how facial landmark detection works with the SSD MobileNet V2 Face model",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/facial_landmark_detection/index.html",model:"SSD MobileNet v2 Face",webApis:[s.WEBNN],framework:"VanillaJS",devices:[i.CPU,i.GPU],update:"2024-06-08"},{id:"webnn_face_recognition",title:"Face Recognition",desc:"Explore the power of face recognition in your browser with the SSD MobileNet V2 Face model",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/face_recognition/index.html",model:"SSD MobileNet v2 Face",webApis:[s.WEBNN],framework:"VanillaJS",devices:[i.CPU,i.GPU],update:"2024-06-08"},{id:"webnn_image_classification",title:"Image Classification",desc:"Try image classification with models like MobileNet V2, SqueezeNet, and ResNet V2 50",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/image_classification/index.html",model:"MobileNet v2 · SqueezeNet · ResNet v2 50",webApis:[s.WEBNN],framework:"VanillaJS",devices:[i.CPU,i.GPU,i.NPU],update:"2024-06-08"},{id:"webnn_object_detection",title:"Object Detection",desc:"Check out this sample for object detection with models like Tiny Yolo V2 and SSD MobileNet V1",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/object_detection/index.html",model:"Tiny Yolo v2 · SSD MobileNet v1",webApis:[s.WEBNN],framework:"VanillaJS",devices:[i.CPU,i.GPU,i.NPU],update:"2024-06-08"},{id:"webnn_sam",title:"WebNN Segment Anything",desc:'Segment Anything is a new AI model from Meta AI that can "cut out" any object.',sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/segment-anything/",model:"Sam",webApis:[s.WEBNN],framework:"ONNX Runtime Web",devices:[i.GPU],update:"2024-06-08"},{id:"webnn_sd_15",title:"Stable Diffusion 1.5",desc:"Transform your words into stunning AI visuals with stable diffusion 1.5",sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/stable-diffusion-1.5/",model:"SD 1.5",webApis:[s.WEBNN],framework:"ONNX Runtime Web",devices:[i.GPU],update:"2024-06-08"},{id:"webnn_sd_turbo",title:"Stable Diffusion Turbo",desc:"Transform your words into stunning AI visuals with stable diffusion turbo",sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/sd-turbo/",model:"SD Turbo",webApis:[s.WEBNN],framework:"ONNX Runtime Web",devices:[i.GPU],update:"2024-06-08"},{id:"webnn_semantic_segmentation",title:"Semantic Segmentation",desc:"See how semantic segmentation works with the DeepLab V3 with MobileNet V2 models",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/semantic_segmentation/index.html",model:"DeepLab v3 · MobileNet v2",webApis:[s.WEBNN],framework:"VanillaJS",devices:[i.CPU,i.GPU],update:"2024-06-08"},{id:"webnn_whisper_base",title:"Whisper Base",desc:"Whisper Base is a pre-trained model for automatic speech recognition (ASR) and speech translation.",sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/whisper-base/",model:"Encoder · Decoder",webApis:[s.WEBNN],framework:"ONNX Runtime Web",devices:[i.GPU,i.NPU],update:"2024-06-08"}];p=p.sort((e,n)=>e.update>n.update?-1:1);let m=p;const a=document.getElementById("prePageBtn"),r=document.getElementById("nextPageBtn"),u=6;let o=1,l=[s.WEBGPU,s.WASM,s.WEBNN],d=[i.GPU,i.CPU,i.NPU],g=Math.ceil(m.length/u);function h(){for(const e of document.querySelectorAll("video"))e.controls=!1,e.addEventListener("mouseover",()=>{e.play()}),e.addEventListener("mouseout",()=>{e.load()})}function U(e){const n=e.map(t=>`
            <a class="group relative flex h-[280px] 2xl:h-[360px]  flex-col gap-6 rounded-xl overflow-hidden" href="${t.sampleUrl}">
            <div class="absolute inset-0 h-[180px] 2xl:h-[220px]  rounded-xl overflow-hidden group-hover:h-full w-full duration-[250ms]">
              <video
              poster="${f}assets/${t.id}.png"
              class="h-full w-full rounded-xl object-cover group-hover:scale-125 duration-1000"
              src="${f}assets/${t.id}.mp4"
              muted
              loop
              ></video>
              <div class="absolute top-[10px] right-[10px]">

            </div>
            </div>
            <div class="px-1.5 mt-auto w-full h-[100px] 2xl:h-[140px] flex flex-col">
              <div
              class="flex items-center text-xl w-full group-hover:text-white group-hover:z-50 group-hover:translate-y-[1.5rem] group-hover:drop-shadow-xl duration-[350ms] h-full"
              >

                <div class="flex flex-col h-full w-full 2xl:gap-2 gap-1 group-hover:gap-y-3">
                  <div class="font-bold text-stone-50 2xl:group-hover:text-2xl group-hover:text-xl h-1/5 2xl:text-2xl/6 text-lg/5 duration-[350ms] 2xl:pt-1 pt-0.5">${t.title}
                  </div>

                  <div class="group-hover:hidden 2/5 2xl:text-lg/5 text-xs/3 font-normal text-stone-300 font-sans">
                    <p>
                    ${t.desc}
                    </p>
                  </div>

                <div class="flex items-end flex-wrap 2xl:gap-2 gap-x-1 gap-y-0.5 h-2/5 2xl:text-sm text-xs pb-1">
              ${t.model?` <div
              class="flex rounded-md font-semibold bg-stone-600/80 px-1 py-0.5 text-stone-50 ring-1 ring-inset  ring-stone-500/10 w-auto"
            >
              ${t.model}
            </div>`:""}
                  ${t.webApis.length>0?` <div
                  class="flex rounded-md font-semibold bg-indigo-600/80 px-1 py-0.5 text-stone-50 ring-1 ring-inset  ring-stone-500/10 w-auto"
                > ${t.webApis.join("·")} · ${t.framework}</div>`:""}
                  ${t.devices.length>0?` <div
                  class="flex rounded-md font-semibold bg-sky-600/80 px-1 py-0.5 text-stone-50 ring-1 ring-inset  ring-stone-500/10 w-auto"
                >
                  ${t.devices.join(" · ")}
                </div>`:""}
              </div>

                    </div>
            </div>
            </div></a
          >
          `).join("");document.getElementById("sampleCardContainer").innerHTML=n}function w(){const e=document.getElementById("paginationSection");m.length>0?e&&e.classList.contains("hidden")&&e.classList.remove("hidden"):e&&!e.classList.contains("hidden")&&e.classList.add("hidden");let n="";for(let t=1;t<=g;t++)n+=`
      <div
        class="page cursor-pointer rounded-md relative inline-flex px-4 py-2  ${t===o?"bg-indigo-500/90":"hover:bg-stone-500/50"}">
        ${t}
      </div>
    `;document.getElementById("pageNumberWrapper").innerHTML=n}function P(){let e=`
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md ring-2 ring-gray-50/50 w-fit"
  >
    Backend
  </div>`,n=`
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md 2xl:ring-2 ring-1 ring-gray-50/50 w-fit"
  >
    Device
  </div>`;for(const t of Object.keys(s))e+=`<div
    class="filter-backend cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-indigo-500/30 hover:bg-indigo-500/90 w-fit"
    >
      ${s[t]}
    </div>`;for(const t of Object.keys(i))n+=`<div
    class="filter-device cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-sky-600/30 hover:bg-sky-600/90 w-fit"
    >
      ${i[t]}
    </div>`;document.getElementById("backendFilterSelection").innerHTML=e,document.getElementById("deviceFilterSelection").innerHTML=n}function v(){document.querySelectorAll(".page").forEach(e=>{e.addEventListener("click",n=>{const t=Number(n.target.innerText);o!==t&&(o=t,c())})}),a.addEventListener("click",()=>{o!==1&&(o--,c())}),r.addEventListener("click",()=>{o!==g&&(o++,c())})}function c(){U(m.slice((o-1)*u,o*u)),h(),document.querySelectorAll(".page").forEach(e=>{e.classList.contains("bg-indigo-500/90")&&e.classList.remove("bg-indigo-500/90"),Number(e.innerText)===o?(e.classList.contains("bg-indigo-500/90")||e.classList.add("bg-indigo-500/90"),e.classList.contains("hover:bg-stone-500/50")&&e.classList.remove("hover:bg-stone-500/50")):e.classList.contains("hover:bg-stone-500/50")||e.classList.add("hover:bg-stone-500/50")}),o===1?(a.classList.contains("cursor-pointer")&&a.classList.remove("cursor-pointer"),a.classList.contains("hover:bg-stone-500/50")&&a.classList.remove("hover:bg-stone-500/50")):(a.classList.contains("cursor-pointer")||a.classList.add("cursor-pointer"),a.classList.contains("hover:bg-stone-500/50")||a.classList.add("hover:bg-stone-500/50")),o===g?(r.classList.contains("cursor-pointer")&&r.classList.remove("cursor-pointer"),r.classList.contains("hover:bg-stone-500/50")&&r.classList.remove("hover:bg-stone-500/50")):(r.classList.contains("cursor-pointer")||r.classList.add("cursor-pointer"),r.classList.contains("hover:bg-stone-500/50")||r.classList.add("hover:bg-stone-500/50"))}function L(){document.querySelectorAll(".filter-backend").forEach(e=>{e.addEventListener("click",()=>{const n=e.innerText,t=l.indexOf(n);t>-1?l.splice(t,1):l.push(n),b()})}),document.querySelectorAll(".filter-device").forEach(e=>{e.addEventListener("click",()=>{const n=e.innerText,t=d.indexOf(n);t>-1?d.splice(t,1):d.push(n),b()})})}function b(){m=p.filter(e=>e.webApis.some(n=>l.includes(n))&&e.devices.some(n=>d.includes(n))),o=1,g=Math.ceil(m.length/u),w(),c(),v(),document.querySelectorAll(".filter-backend").forEach(e=>{l.includes(e.innerText)?e.classList.contains("bg-indigo-500/90")||(e.classList.add("bg-indigo-500/90"),e.classList.remove("text-gray-400")):e.classList.contains("bg-indigo-500/90")&&(e.classList.remove("bg-indigo-500/90"),e.classList.add("text-gray-400"))}),document.querySelectorAll(".filter-device").forEach(e=>{d.includes(e.innerText)?e.classList.contains("bg-sky-600/90")||(e.classList.add("bg-sky-600/90"),e.classList.remove("text-gray-400")):e.classList.contains("bg-sky-600/90")&&(e.classList.remove("bg-sky-600/90"),e.classList.add("text-gray-400"))})}P();w();c();v();L();b();h();x(".");
