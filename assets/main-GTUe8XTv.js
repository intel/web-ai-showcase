import{s as w}from"./navbar-B3GQCZKa.js";const o={WebGPU:"WebGPU",WebAssembly:"WebAssembly",WebNN:"WebNN"},s={GPU:"GPU",CPU:"CPU",NPU:"NPU"};let g=[{title:"Phi-3",desc:"A private and powerful AI chatbot that runs locally in your browser.",poster:"/assets/phi3.png",sampleUrl:"./samples/phi3-webgpu/index.html",model:"Phi-3-mini-4k-instruct",webApi:[o.WebGPU],supportHdw:["GPU"]},{title:"Stable Diffusion Turbo",desc:"Transform your words into stunning AI visuals with stable diffusion turbo",poster:"/assets/stable_diffusion_demo_poster.png",video:"/assets/stable_diffusion_demo.mp4",sampleUrl:"./samples/stable_diffusion/stable-diffusion.html",model:"SD Turbo",webApi:[o.WebGPU],supportHdw:["GPU"]},{title:"Summarization",desc:"Generate summaries of paragraphs",poster:"/assets/summarization_demo_poster.png",video:"/assets/summarization.mp4",sampleUrl:"./samples/summarization/index.html",model:"DistilBART CNN",webApi:[o.WebAssembly],supportHdw:["CPU"]},{title:"LLM-Gemma",desc:"LLM-Gemma",poster:"/assets/llm-gemma-poster.png",video:"/assets/llm-gemma.mp4",sampleUrl:"./samples/llm_gemma/gemma.html",model:"Gemma 2B",webApi:[o.WebGPU],supportHdw:["GPU"]},{title:"Image To Text",desc:"Generate text from image",poster:"/assets/image_to_text_poster.png",video:"/assets/image-to-text.mp4",sampleUrl:"./samples/image_to_text/index.html",model:"ViT GPT2",webApi:[o.WebAssembly],supportHdw:["CPU"]},{title:"Question Answering",desc:"Answer question from context",poster:"/assets/question_answering.png",video:"/assets/question_answering.mp4",sampleUrl:"./samples/question_answering/index.html",model:"DistilBERT",webApi:[o.WebAssembly],supportHdw:["CPU"]},{title:"Background Removal",desc:"Remove the background of an image",poster:"/assets/background_removal_poster.png",video:"/assets/background_removal.mp4",sampleUrl:"./samples/image_background_removal/index.html",model:"RMBG v1.4",webApi:[o.WebGPU],supportHdw:["GPU"]},{title:"Code Editor",desc:"Test out some sample code directly in a compatible browser",poster:"/assets/webnn_code_editor_poster.png",video:"/assets/webnn_code_editor.mp4",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/code/index.html",model:"",webApi:[o.WebNN],supportHdw:[s.CPU]},{title:"Image Classification",desc:"Try image classification with models like MobileNet V2, SqueezeNet, and ResNet V2 50",poster:"/assets/image_classification_poster.png",video:"/assets/image_classification.mp4",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/image_classification/index.html",model:"MobileNet v2 · SqueezeNet · ResNet v2 50",webApi:[o.WebNN],supportHdw:[s.CPU,s.GPU,s.NPU]},{title:"Object Detection",desc:"Check out this sample for object detection with models like Tiny Yolo V2 and SSD MobileNet V1",poster:"/assets/object_detection_poster.png",video:"/assets/object_detection.mp4",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/object_detection/index.html",model:"Tiny Yolo v2 · SSD MobileNet v1",webApi:[o.WebNN],supportHdw:[s.CPU,s.GPU,s.NPU]},{title:"Semantic Segmentation",desc:"See how semantic segmentation works with the DeepLab V3 with MobileNet V2 models",poster:"/assets/semantic_segmentation_poster.png",video:"/assets/semantic_segmentation.mp4",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/semantic_segmentation/index.html",model:"DeepLab v3 · MobileNet v2",webApi:[o.WebNN],supportHdw:[s.CPU,s.GPU]},{title:"Facial Landmark Detection",desc:"See how facial landmark detection works with the SSD MobileNet V2 Face model",poster:"/assets/face_landmark_detection_poster.png",video:"/assets/face_landmark_detection.mp4",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/facial_landmark_detection/index.html",model:"SSD MobileNet v2 Face",webApi:[o.WebNN],supportHdw:[s.CPU,s.GPU]},{title:"Face Recognition",desc:"Explore the power of face recognition in your browser with the SSD MobileNet V2 Face model",poster:"/assets/face_recognition_poster.png",video:"/assets/face_recognition.mp4",sampleUrl:"https://webmachinelearning.github.io/webnn-samples/face_recognition/index.html",model:"SSD MobileNet v2 Face",webApi:[o.WebNN],supportHdw:[s.CPU,s.GPU]},{title:"Stable Diffusion 1.5",desc:"Transform your words into stunning AI visuals with stable diffusion 1.5",poster:"/assets/stable_diffusion_demo_webnn_ort_poster.png",video:"/assets/stable_diffusion_demo_webnn_ort.mp4",sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/stable-diffusion-1.5/",model:"SD Turbo",webApi:[o.WebNN],supportHdw:[s.GPU]},{title:"Stable Diffusion Turbo",desc:"Transform your words into stunning AI visuals with stable diffusion turbo",poster:"/assets/stable_diffusion_demo_webnn.png",video:"/assets/stable_diffusion_demo_webnn.mp4",sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/sd-turbo/",model:"SD Turbo",webApi:[o.WebNN],supportHdw:[s.GPU]},{title:"Segment Anything",desc:'Segment Anything is a new AI model from Meta AI that can "cut out" any object.',poster:"/assets/webnn_segment_anything.png",video:"/assets/webnn_segment_anything.mp4",sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/segment-anything/",model:"Sam",webApi:[o.WebNN],supportHdw:[s.GPU]},{title:"Whisper Base",desc:"Whisper Base is a pre-trained model for automatic speech recognition (ASR) and speech translation.",poster:"/assets/webnn_whisper_base.png",video:"/assets/webnn_whisper_base.mp4",sampleUrl:"https://microsoft.github.io/webnn-developer-preview/demos/whisper-base/",model:"Encoder · Decoder",webApi:[o.WebNN],supportHdw:[s.GPU,s.NPU]}],p=g;const l=document.getElementById("prePageBtn"),a=document.getElementById("nextPageBtn"),m=6;let n=1,r=["WebGPU","WebAssembly","WebNN"],d=["GPU","CPU","NPU"],b=Math.ceil(p.length/m);function f(){for(const e of document.querySelectorAll("video"))e.controls=!1,e.addEventListener("mouseover",()=>{e.play()}),e.addEventListener("mouseout",()=>{e.load()})}function x(e){const i=e.map(t=>`
            <a
            class="group relative flex h-[280px] 2xl:h-[360px]  flex-col gap-6 rounded-xl overflow-hidden"
            href="${t.sampleUrl}"
            ><div
              class="absolute inset-0 h-[190px] 2xl:h-[240px]  rounded-xl overflow-hidden group-hover:h-full w-full duration-[250ms]"
            >
              <video
              poster="${t.poster}"
              class="h-full w-full rounded-xl object-cover group-hover:scale-125 duration-1000"
              src="${t.video}"
              muted
              loop
              ></video>
              <div class="absolute top-[10px] right-[10px]">
              <div class="flex flex-col items-end flex-wrap gap-2">
              ${t.model?` <div
              class="flex rounded-md font-semibold bg-stone-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
            >
              ${t.model}
            </div>`:""}
                  ${t.webApi.length>0?` <div
                  class="flex rounded-md font-semibold bg-indigo-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
                > ${t.webApi.join("·")}</div>`:""}
                  ${t.supportHdw.length>0?` <div
                  class="flex rounded-md font-semibold bg-sky-600/80 px-2 py-1 text-stone-50 ring-1 ring-inset text-sm ring-stone-500/10 w-auto"
                >
                  ${t.supportHdw.join(" · ")}
                </div>`:""}

              </div>
            </div>
            </div>
            <div class="px-2 2xl:px-3 pt-1 2xl:pt-4 mt-auto w-full h-[90px] 2xl:h-[120px] flex flex-col gap-0.5">
              <div
              class="flex items-center text-xl w-full group-hover:text-white group-hover:z-50 group-hover:translate-y-[1.5rem] group-hover:drop-shadow-xl duration-[350ms]"
              >
                <div class="flex flex-col gap-0.5 2xl:gap-2 w-full">
                  <div class="font-bold text-stone-50 group-hover:text-2xl duration-[350ms]">${t.title}</div>
                  <div>  <p
                  class="group-hover:hidden 2xl:text-lg text-sm font-normal text-white font-sans">
                    ${t.desc}
                    </p></div>
                </div>
            </div>
            </div></a
          >
          `).join("");document.getElementById("sampleCardContainer").innerHTML=i}function h(){const e=document.getElementById("paginationSection");p.length>0?e&&e.classList.contains("hidden")&&e.classList.remove("hidden"):e&&!e.classList.contains("hidden")&&e.classList.add("hidden");let i="";for(let t=1;t<=b;t++)i+=`
      <div
        class="page cursor-pointer rounded-md relative inline-flex px-4 py-2  ${t===n?"bg-indigo-500/90":"hover:bg-stone-500/50"}">
        ${t}
      </div>
    `;document.getElementById("pageNumberWrapper").innerHTML=i}function _(){let e=`
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md ring-2 ring-gray-50/50 w-fit"
  >
    Backends
  </div>`,i=`
  <div
    class="2xl:px-2 px-1 2xl:py-2 py-1 font-semibold rounded-md 2xl:ring-2 ring-1 ring-gray-50/50 w-fit"
  >
    Device
  </div>`;for(const t of Object.keys(o))e+=`<div
    class="filter-backend cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-indigo-500/30 hover:bg-indigo-500/90 w-fit"
    >
      ${o[t]}
    </div>`;for(const t of Object.keys(s))i+=`<div
    class="filter-device cursor-pointer px-2 py-1 2xl:px-3 2xl:py-2 rounded-md bg-sky-600/30 hover:bg-sky-600/90 w-fit"
    >
      ${s[t]}
    </div>`;document.getElementById("backendFilterSelection").innerHTML=e,document.getElementById("deviceFilterSelection").innerHTML=i}function v(){document.querySelectorAll(".page").forEach(e=>{e.addEventListener("click",i=>{const t=Number(i.target.innerText);n!==t&&(n=t,c())})}),l.addEventListener("click",()=>{n!==1&&(n--,c())}),a.addEventListener("click",()=>{n!==b&&(n++,c())})}function c(){x(p.slice((n-1)*m,n*m)),f(),document.querySelectorAll(".page").forEach(e=>{e.classList.contains("bg-indigo-500/90")&&e.classList.remove("bg-indigo-500/90"),Number(e.innerText)===n?(e.classList.contains("bg-indigo-500/90")||e.classList.add("bg-indigo-500/90"),e.classList.contains("hover:bg-stone-500/50")&&e.classList.remove("hover:bg-stone-500/50")):e.classList.contains("hover:bg-stone-500/50")||e.classList.add("hover:bg-stone-500/50")}),n===1?(l.classList.contains("cursor-pointer")&&l.classList.remove("cursor-pointer"),l.classList.contains("hover:bg-stone-500/50")&&l.classList.remove("hover:bg-stone-500/50")):(l.classList.contains("cursor-pointer")||l.classList.add("cursor-pointer"),l.classList.contains("hover:bg-stone-500/50")||l.classList.add("hover:bg-stone-500/50")),n===b?(a.classList.contains("cursor-pointer")&&a.classList.remove("cursor-pointer"),a.classList.contains("hover:bg-stone-500/50")&&a.classList.remove("hover:bg-stone-500/50")):(a.classList.contains("cursor-pointer")||a.classList.add("cursor-pointer"),a.classList.contains("hover:bg-stone-500/50")||a.classList.add("hover:bg-stone-500/50"))}function U(){document.querySelectorAll(".filter-backend").forEach(e=>{e.addEventListener("click",()=>{const i=e.innerText,t=r.indexOf(i);t>-1?r.splice(t,1):r.push(i),u()})}),document.querySelectorAll(".filter-device").forEach(e=>{e.addEventListener("click",()=>{const i=e.innerText,t=d.indexOf(i);t>-1?d.splice(t,1):d.push(i),u()})})}function u(){p=g.filter(e=>e.webApi.some(i=>r.includes(i))&&e.supportHdw.some(i=>d.includes(i))),n=1,b=Math.ceil(p.length/m),h(),c(),v(),document.querySelectorAll(".filter-backend").forEach(e=>{r.includes(e.innerText)?e.classList.contains("bg-indigo-500/90")||e.classList.add("bg-indigo-500/90"):e.classList.contains("bg-indigo-500/90")&&e.classList.remove("bg-indigo-500/90")}),document.querySelectorAll(".filter-device").forEach(e=>{d.includes(e.innerText)?e.classList.contains("bg-sky-600/90")||e.classList.add("bg-sky-600/90"):e.classList.contains("bg-sky-600/90")&&e.classList.remove("bg-sky-600/90")})}_();h();c();v();U();u();f();w(".");
