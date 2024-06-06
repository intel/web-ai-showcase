import{s as x}from"./navbar-B3GQCZKa.js";const t=location.href.toLowerCase().indexOf("github.io")>-1?"/web-ai-showcase/":"/",n={WebGPU:"WebGPU",WebAssembly:"WebAssembly",WebNN:"WebNN"},i={GPU:"GPU",CPU:"CPU",NPU:"NPU"};let f=[{title:"Phi-3",desc:"A private and powerful AI chatbot that runs locally in your browser.",poster:`${t}assets/phi3.png`,sampleUrl:"./samples/phi3-webgpu/index.html",model:"Phi-3-mini-4k-instruct",webApi:[n.WebGPU],framework:"Transformers.js",supportHdw:["GPU"]},{title:"Stable Diffusion Turbo",desc:"Transform your words into stunning AI visuals with stable diffusion turbo",poster:`${t}assets/stable_diffusion_demo_poster.png`,video:`${t}assets/stable_diffusion_demo.mp4`,sampleUrl:"./samples/stable_diffusion/stable-diffusion.html",model:"SD Turbo",webApi:[n.WebGPU],framework:"ONNX Runtime Web",supportHdw:["GPU"]},{title:"Summarization",desc:"Generate summaries of paragraphs",poster:`${t}assets/summarization_demo_poster.png`,video:`${t}assets/summarization.mp4`,sampleUrl:"./samples/summarization/index.html",model:"DistilBART CNN",webApi:[n.WebAssembly],framework:"Transformers.js",supportHdw:["CPU"]},{title:"LLM-Gemma",desc:"LLM-Gemma",poster:`${t}assets/llm-gemma-poster.png`,video:`${t}assets/llm-gemma.mp4`,sampleUrl:"./samples/llm_gemma/gemma.html",model:"Gemma 2B",webApi:[n.WebGPU],framework:"MediaPipe",supportHdw:["GPU"]},{title:"Image To Text",desc:"Generate text from image",poster:`${t}assets/image_to_text_poster.png`,video:`${t}assets/image-to-text.mp4`,sampleUrl:"./samples/image_to_text/index.html",model:"ViT GPT2",webApi:[n.WebAssembly],framework:"Transformers.js",supportHdw:["CPU"]},{title:"Question Answering",desc:"Answer question from context",poster:`${t}assets/question_answering.png`,video:`${t}assets/question_answering.mp4`,sampleUrl:"./samples/question_answering/index.html",model:"DistilBERT",webApi:[n.WebAssembly],framework:"Transformers.js",supportHdw:["CPU"]},{title:"Background Removal",desc:"Remove the background of an image",poster:`${t}assets/background_removal_poster.png`,video:`${t}assets/background_removal.mp4`,sampleUrl:"./samples/image_background_removal/index.html",model:"RMBG v1.4",webApi:[n.WebGPU],framework:"Transformers.js",supportHdw:["GPU"]},{title:"Code Editor",desc:"Test out some sample code directly in a compatible browser",poster:`${t}assets/webnn_code_editor_poster.png`,video:`${t}assets/webnn_code_editor.mp4`,sampleUrl:"https://webmachinelearning.github.io/webnn-samples/code/index.html",model:"",webApi:[n.WebNN],framework:"Vanilla JavaScript",supportHdw:[i.CPU]},{title:"Image Classification",desc:"Try image classification with models like MobileNet V2, SqueezeNet, and ResNet V2 50",poster:`${t}assets/image_classification_poster.png`,video:`${t}assets/image_classification.mp4`,sampleUrl:"https://webmachinelearning.github.io/webnn-samples/image_classification/index.html",model:"MobileNet v2 · SqueezeNet · ResNet v2 50",webApi:[n.WebNN],framework:"Vanilla JavaScript",supportHdw:[i.CPU,i.GPU,i.NPU]},{title:"Object Detection",desc:"Check out this sample for object detection with models like Tiny Yolo V2 and SSD MobileNet V1",poster:`${t}assets/object_detection_poster.png`,video:`${t}assets/object_detection.mp4`,sampleUrl:"https://webmachinelearning.github.io/webnn-samples/object_detection/index.html",model:"Tiny Yolo v2 · SSD MobileNet v1",webApi:[n.WebNN],framework:"Vanilla JavaScript",supportHdw:[i.CPU,i.GPU,i.NPU]},{title:"Semantic Segmentation",desc:"See how semantic segmentation works with the DeepLab V3 with MobileNet V2 models",poster:`${t}assets/semantic_segmentation_poster.png`,video:`${t}assets/semantic_segmentation.mp4`,sampleUrl:"https://webmachinelearning.github.io/webnn-samples/semantic_segmentation/index.html",model:"DeepLab v3 · MobileNet v2",webApi:[n.WebNN],framework:"Vanilla JavaScript",supportHdw:[i.CPU,i.GPU]},{title:"Facial Landmark Detection",desc:"See how facial landmark detection works with the SSD MobileNet V2 Face model",poster:`${t}assets/face_landmark_detection_poster.png`,video:`${t}assets/face_landmark_detection.mp4`,sampleUrl:"https://webmachinelearning.github.io/webnn-samples/facial_landmark_detection/index.html",model:"SSD MobileNet v2 Face",webApi:[n.WebNN],framework:"Vanilla JavaScript",supportHdw:[i.CPU,i.GPU]},{title:"Face Recognition",desc:"Explore the power of face recognition in your browser with the SSD MobileNet V2 Face model",poster:`${t}assets/face_recognition_poster.png`,video:`${t}assets/face_recognition.mp4`,sampleUrl:"https://webmachinelearning.github.io/webnn-samples/face_recognition/index.html",model:"SSD MobileNet v2 Face",webApi:[n.WebNN],framework:"Vanilla JavaScript",supportHdw:[i.CPU,i.GPU]},{title:"Stable Diffusion 1.5",desc:"Transform your words into stunning AI visuals with stable diffusion 1.5",poster:`${t}assets/stable_diffusion_demo_webnn_ort_poster.png`,video:`${t}assets/stable_diffusion_demo_webnn_ort.mp4`,sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/stable-diffusion-1.5/",model:"SD 1.5",webApi:[n.WebNN],framework:"ONNX Runtime Web",supportHdw:[i.GPU]},{title:"Stable Diffusion Turbo",desc:"Transform your words into stunning AI visuals with stable diffusion turbo",poster:`${t}assets/stable_diffusion_demo_webnn.png`,video:`${t}assets/stable_diffusion_demo_webnn.mp4`,sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/sd-turbo/",model:"SD Turbo",webApi:[n.WebNN],framework:"ONNX Runtime Web",supportHdw:[i.GPU]},{title:"Segment Anything",desc:'Segment Anything is a new AI model from Meta AI that can "cut out" any object.',poster:`${t}assets/webnn_segment_anything.png`,video:`${t}assets/webnn_segment_anything.mp4`,sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/segment-anything/",model:"Sam",webApi:[n.WebNN],framework:"ONNX Runtime Web",supportHdw:[i.GPU]},{title:"Whisper Base",desc:"Whisper Base is a pre-trained model for automatic speech recognition (ASR) and speech translation.",poster:`${t}assets/webnn_whisper_base.png`,video:`${t}assets/webnn_whisper_base.mp4`,sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/whisper-base/",model:"Encoder · Decoder",webApi:[n.WebNN],framework:"ONNX Runtime Web",supportHdw:[i.GPU,i.NPU]}],m=f;const a=document.getElementById("prePageBtn"),l=document.getElementById("nextPageBtn"),b=6;let r=1,d=["WebGPU","WebAssembly","WebNN"],c=["GPU","CPU","NPU"],u=Math.ceil(m.length/b);function v(){for(const e of document.querySelectorAll("video"))e.controls=!1,e.addEventListener("mouseover",()=>{e.play()}),e.addEventListener("mouseout",()=>{e.load()})}function _(e){const o=e.map(s=>`
            <a
            class="group relative flex h-[280px] 2xl:h-[360px]  flex-col gap-6 rounded-xl overflow-hidden"
            href="${s.sampleUrl}"
            ><div
              class="absolute inset-0 h-[190px] 2xl:h-[240px]  rounded-xl overflow-hidden group-hover:h-full w-full duration-[250ms]"
            >
              <video
              poster="${s.poster}"
              class="h-full w-full rounded-xl object-cover group-hover:scale-125 duration-1000"
              src="${s.video}"
              muted
              loop
              ></video>
              <div class="absolute top-[10px] right-[10px]">
              <div class="flex flex-col items-end flex-wrap gap-2">
              ${s.model?` <div
              class="flex rounded-md font-semibold bg-stone-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
            >
              ${s.model}
            </div>`:""}
                  ${s.webApi.length>0?` <div
                  class="flex rounded-md font-semibold bg-indigo-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
                > ${s.webApi.join("·")} · ${s.framework}</div>`:""}
                  ${s.supportHdw.length>0?` <div
                  class="flex rounded-md font-semibold bg-sky-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
                >
                  ${s.supportHdw.join(" · ")}
                </div>`:""}

              </div>
            </div>
            </div>
            <div class="px-2 2xl:px-3 pt-1 2xl:pt-4 mt-auto w-full h-[90px] 2xl:h-[120px] flex flex-col gap-0.5">
              <div
              class="flex items-center text-xl w-full group-hover:text-white group-hover:z-50 group-hover:translate-y-[1.5rem] group-hover:drop-shadow-xl duration-[350ms]"
              >
                <div class="flex flex-col gap-0.5 2xl:gap-2 w-full">
                  <div class="font-bold text-stone-50 group-hover:text-2xl duration-[350ms]">${s.title}</div>
                  <div>  <p
                  class="group-hover:hidden 2xl:text-lg text-sm font-normal text-white font-sans">
                    ${s.desc}
                    </p></div>
                </div>
            </div>
            </div></a
          >
          `).join("");document.getElementById("sampleCardContainer").innerHTML=o}function h(){const e=document.getElementById("paginationSection");m.length>0?e&&e.classList.contains("hidden")&&e.classList.remove("hidden"):e&&!e.classList.contains("hidden")&&e.classList.add("hidden");let o="";for(let s=1;s<=u;s++)o+=`
      <div
        class="page cursor-pointer rounded-md relative inline-flex px-4 py-2  ${s===r?"bg-indigo-500/90":"hover:bg-stone-500/50"}">
        ${s}
      </div>
    `;document.getElementById("pageNumberWrapper").innerHTML=o}function N(){let e=`
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md ring-2 ring-gray-50/50 w-fit"
  >
    Backend
  </div>`,o=`
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md 2xl:ring-2 ring-1 ring-gray-50/50 w-fit"
  >
    Device
  </div>`;for(const s of Object.keys(n))e+=`<div
    class="filter-backend cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-indigo-500/30 hover:bg-indigo-500/90 w-fit"
    >
      ${n[s]}
    </div>`;for(const s of Object.keys(i))o+=`<div
    class="filter-device cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-sky-600/30 hover:bg-sky-600/90 w-fit"
    >
      ${i[s]}
    </div>`;document.getElementById("backendFilterSelection").innerHTML=e,document.getElementById("deviceFilterSelection").innerHTML=o}function w(){document.querySelectorAll(".page").forEach(e=>{e.addEventListener("click",o=>{const s=Number(o.target.innerText);r!==s&&(r=s,p())})}),a.addEventListener("click",()=>{r!==1&&(r--,p())}),l.addEventListener("click",()=>{r!==u&&(r++,p())})}function p(){_(m.slice((r-1)*b,r*b)),v(),document.querySelectorAll(".page").forEach(e=>{e.classList.contains("bg-indigo-500/90")&&e.classList.remove("bg-indigo-500/90"),Number(e.innerText)===r?(e.classList.contains("bg-indigo-500/90")||e.classList.add("bg-indigo-500/90"),e.classList.contains("hover:bg-stone-500/50")&&e.classList.remove("hover:bg-stone-500/50")):e.classList.contains("hover:bg-stone-500/50")||e.classList.add("hover:bg-stone-500/50")}),r===1?(a.classList.contains("cursor-pointer")&&a.classList.remove("cursor-pointer"),a.classList.contains("hover:bg-stone-500/50")&&a.classList.remove("hover:bg-stone-500/50")):(a.classList.contains("cursor-pointer")||a.classList.add("cursor-pointer"),a.classList.contains("hover:bg-stone-500/50")||a.classList.add("hover:bg-stone-500/50")),r===u?(l.classList.contains("cursor-pointer")&&l.classList.remove("cursor-pointer"),l.classList.contains("hover:bg-stone-500/50")&&l.classList.remove("hover:bg-stone-500/50")):(l.classList.contains("cursor-pointer")||l.classList.add("cursor-pointer"),l.classList.contains("hover:bg-stone-500/50")||l.classList.add("hover:bg-stone-500/50"))}function U(){document.querySelectorAll(".filter-backend").forEach(e=>{e.addEventListener("click",()=>{const o=e.innerText,s=d.indexOf(o);s>-1?d.splice(s,1):d.push(o),g()})}),document.querySelectorAll(".filter-device").forEach(e=>{e.addEventListener("click",()=>{const o=e.innerText,s=c.indexOf(o);s>-1?c.splice(s,1):c.push(o),g()})})}function g(){m=f.filter(e=>e.webApi.some(o=>d.includes(o))&&e.supportHdw.some(o=>c.includes(o))),r=1,u=Math.ceil(m.length/b),h(),p(),w(),document.querySelectorAll(".filter-backend").forEach(e=>{d.includes(e.innerText)?e.classList.contains("bg-indigo-500/90")||e.classList.add("bg-indigo-500/90"):e.classList.contains("bg-indigo-500/90")&&e.classList.remove("bg-indigo-500/90")}),document.querySelectorAll(".filter-device").forEach(e=>{c.includes(e.innerText)?e.classList.contains("bg-sky-600/90")||e.classList.add("bg-sky-600/90"):e.classList.contains("bg-sky-600/90")&&e.classList.remove("bg-sky-600/90")})}N();h();p();w();U();g();v();x(".");
