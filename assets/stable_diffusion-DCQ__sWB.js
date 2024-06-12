import{s as be}from"./navbar-C-8lifvS.js";import{A as _e,e as Q}from"./image-O15s_1zf.js";import{r as v,i as Be,g as se,c as U}from"./utility-Cpztc4yD.js";import{A as ie}from"./config-C7GNoNA1.js";be("../..");Q.allowLocalModels=!1,Q.allowRemoteModels=!0;var s=null,le=null,M=null,V=null,Z={},ee=null,I=null,_=null,de=null,B=null,z=null,N=null,ce=null,F=null,ue=null,x=null,fe=null;const P=512,T=512;var C=null,$=null,pe=null;const xe=`
@binding(0) @group(0) var<storage, read_write> result: array<vec4<f32>>;
@binding(1) @group(0) var<storage, read> latentData: array<vec4<f32>>;

@compute @workgroup_size(128, 1, 1)
fn _start(@builtin(global_invocation_id) GlobalId : vec3<u32>) {
let index = GlobalId.x;
let value = latentData[index] / 14.64877241136608;
result[index] = value;
}
`,Pe=`
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
`,Te=`
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
`,Le=`
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
`,Ae="sd-turbo-ort-web",S="clip-vit-base-patch16",y=Re(),m={unet:{url:"unet/model.onnx",size:640,opt:{freeDimensionOverrides:{batch_size:1,num_channels:4,height:64,width:64,sequence_length:77}}},text_encoder:{url:"text_encoder/model.onnx",size:1700,opt:{freeDimensionOverrides:{batch_size:1}}},vae_decoder:{url:"vae_decoder/model.onnx",size:95,opt:{freeDimensionOverrides:{batch_size:1,num_channels_latent:4,height_latent:64,width_latent:64}}}},W=document.getElementById("userInput"),Ie=document.getElementById("uploadInput4Unet"),Oe=document.getElementById("uploadInput4vae_decoder"),Ue=document.getElementById("uploadInput4text_encoder"),ge=document.getElementById("generateTriggerBtn"),O=document.getElementById("loadModelsTriggerBtn"),L=document.getElementById("progressBar"),Ce=document.getElementById("loadModelBtn"),Se=document.getElementById("modelPopover"),te=document.getElementById("logPanel"),ne=document.getElementById("downloadPrompt");let A;const De=14.6146;let ae=0,H={};W.value="Paris with the river in the background";const u={DEFAULT:0,PREPARING:1,RUNNING:2,DONE:3};function Ge(){let e={};for(const n of ie[S].resources)e[n.split(".")[0]]={fullUrl:se(S)+n};return e}Ge();function Re(){var e={model:se(Ae),provider:"webgpu",device:"gpu",threads:"1",images:"1"};const o=(window.location.search?window.location.search.substring(1):"").split("&");for(var t=0;t<o.length;t++){let a=o[t].split("=");if(a[0]in e)e[a[0]]=decodeURIComponent(a[1]);else if(a[0].length>0)throw new Error("unknown argument: "+a[0])}return e.threads=parseInt(e.threads),e.images=parseInt(e.images),e}function Me(e,n){function o(){let r=Math.random(),l=Math.random();return Math.sqrt(-2*Math.log(r))*Math.cos(2*Math.PI*l)}let t=1;e.forEach(r=>{t*=r});let a=new Float32Array(t);for(let r=0;r<t;r++)a[r]=o()*n;return a}async function ke(e,n,o){const t=`${n}${o}`;let a=[];console.log("trying to fetch model:",e);const r=document.getElementById(`${e}StatusBar`),l=await navigator.storage.getDirectory();let i;async function w(){try{ne.textContent===""&&(ne.textContent="These models will be downloaded only once.");const d=await fetch(t);if(d.status===404)throw new Error(`${e} model not found.`);const c=document.getElementById(`${e}ModelWrapper`);c.innerHTML=`
        <div class="relative px-2 z-20" id="${e}StatusText"></div>
        <div class="relative px-2 z-20">
          <span id="${e}ProgressVal">0%</span>
        </div>
        <div
          id="${e}ProgressBar"
          class="absolute top-0 rounded-2xl z-10 text-right bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        ></div>
     `;const p=document.getElementById(`${e}StatusText`),E=document.getElementById(`${e}ProgressBar`),b=document.getElementById(`${e}ProgressVal`);h(u.PREPARING),c.classList.toggle("hidden");const f=d.body.getReader(),D=+d.headers.get("Content-Length");let G=0,he=[];const ve=new Date().getTime();let ye=new ReadableStream({start(X){function K(){f.read().then(({done:we,value:R})=>{const J=(new Date().getTime()-ve)/1e3;if(we){r&&(r.textContent=`downloaded in ${J}s (${k(D)})`,U("loaded",r)),X.close();return}G+=R.byteLength;let Ee=G/D*100;p.textContent=`Downloading ${e} model ...`,E.style.height||(E.style.height="30px"),E.style.width=`${Ee}%`,b.textContent=`Size: ${k(G)} / ${k(D)} - Time: ${J.toFixed(2)}s`,he.push(R),X.enqueue(R),K()})}K()}});a=await new Response(ye).arrayBuffer(),i=await l.getFileHandle(e,{create:!0});const j=await i.createWritable();return await j.write(a),await j.close(),v(document.getElementById(`${e}StatusFlag`)),c.classList.toggle("hidden"),a}catch(d){g(d);return}}try{i=await l.getFileHandle(e);const c=await(await i.getFile()).arrayBuffer();return r.textContent="loaded",U("loaded",r),c}catch{return await w()}}function Ve(e,n,o){g("Uploading data to GPU buffer ...");const t=s.createBuffer({usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC,size:n.buffer.byteLength,mappedAtCreation:!0}),a=t.getMappedRange();new Float32Array(a).set(n),t.unmap();const r=s.createCommandEncoder();r.copyBufferToBuffer(t,0,e,0,n.byteLength),s.queue.submit([r.finish()]),t.destroy()}function re(e,n){let o=s.createCommandEncoder(),t=o.beginComputePass();t.setPipeline(e),t.setBindGroup(0,n),t.dispatchWorkgroups(32,1,1),t.end(),t=null,le.submit([o.finish()])}async function ze(e){console.time("load_models");for(const[n,o]of Object.entries(e)){const t=document.getElementById(`${n}StatusBar`);try{t&&(t.textContent="loading",U("loading",t));const a=await ke(n,y.model,o.url);H[n]=a}catch{t.textContent="unload"}}if(console.timeEnd("load_models"),Object.keys(H).length!==Object.keys(e).length)throw"Please make sure that all models are successfully loaded!";document.getElementById("progressDisplaySection").classList.add("disappear")}y.provider=="webgpu"?(ort.env.wasm.numThreads=1,ort.env.wasm.simd=!0):(ort.env.wasm.numThreads=y.threads,ort.env.wasm.simd=!0);const q={executionProviders:[y.provider],enableMemPattern:!1,enableCpuMemArena:!1,extra:{session:{disable_prepacking:"1",use_device_allocator_for_initializers:"1",use_ort_model_bytes_directly:"1",use_ort_model_bytes_for_initializers:"1"}}};switch(y.provider){case"webgpu":if(!("gpu"in navigator))throw new Error("webgpu is NOT supported");q.preferredOutputLocation={last_hidden_state:"gpu-buffer"};break;case"webnn":if(!("ml"in navigator))throw new Error("webnn is NOT supported");q.executionProviders=[{name:"webnn",deviceType:y.device,powerPreference:"default"}];break}function h(e){const n=document.getElementById("promptInputSection"),o=n.querySelectorAll("button, textarea"),t=document.getElementById("loadingIcon"),a=document.getElementById("progressDisplaySection"),r=document.getElementById("imageDisplaySection"),l=document.getElementById("generatingProgress");e===u.DEFAULT&&(a.classList.contains("disappear")||a.classList.add("disappear"),t.classList.contains("hidden")||t.classList.add("hidden"),o.forEach(function(i){i.disabled=!1}),n.classList.contains("running-mode")&&n.classList.remove("running-mode"),r.classList.contains("disappear")||r.classList.add("disappear")),e===u.PREPARING&&(v(t),o.forEach(function(i){i.disabled=!0}),n.classList.contains("running-mode")||n.classList.add("running-mode"),a.classList.contains("disappear")&&a.classList.remove("disappear"),r.classList.contains("disappear")||r.classList.add("disappear")),e===u.RUNNING&&(a.classList.contains("disappear")||a.classList.add("disappear"),t.classList.contains("hidden")||t.classList.add("hidden"),o.forEach(function(i){i.disabled=!0}),n.classList.contains("running-mode")||n.classList.add("running-mode"),r.classList.contains("disappear")&&r.classList.remove("disappear"),v(l)),e===u.DONE&&(a.classList.contains("disappear")||a.classList.add("disappear"),t.classList.contains("hidden")||t.classList.add("hidden"),n.classList.contains("running-mode")&&n.classList.remove("running-mode"),r.classList.contains("disappear")&&r.classList.remove("disappear"),l.classList.contains("hidden")||l.classList.add("hidden"),o.forEach(function(i){i.disabled=!1}))}O.addEventListener("click",async function(){try{await ze(m),setTimeout(async()=>{me(!0)},1e3)}catch{h(u.DEFAULT)}});ge.addEventListener("click",async function(){try{h(u.RUNNING),setTimeout(async()=>{me()},1e3)}catch{h(u.DEFAULT)}});document.getElementById("promptInspireBtn").addEventListener("click",()=>{const e=["Paris with the river in the background","A serene sunset over a calm ocean","A bustling cityscape at night","A tranquil forest with a flowing river","A snowy mountain peak under a clear blue sky","A medieval castle surrounded by a moat","A futuristic city with flying cars","A desert oasis with palm trees and a camel","A tropical beach with crystal clear water","A group of penguins on an ice floe","A cherry blossom tree in full bloom","A Victorian mansion at dusk","A field of sunflowers under a sunny sky","A cozy cabin in a winter landscape","A bustling farmer's market with fresh produce","A coral reef teeming with marine life","A vineyard in the rolling hills of Tuscany","A lighthouse on a cliff overlooking the sea","A hot air balloon festival at sunrise","A tranquil Japanese garden with a koi pond","A space station orbiting a distant planet","Impressionist oil painting of a beach at sunset with a narrow aspect ratio","A photograph of a city skyline in the style of Edward Hopper taken from an aerial viewpoint","A 3D rendering of a cat sitting on a windowsill in minimalist style with high resolution","Graffiti-style painting of a city street with an urban look and textured surfaces","A sketch of a pirate ship in black-and-white with realistic textures and low resolution","A chalk drawing of a family picnic being attacked by ants in Central Park with a surrealist style","A watercolor painting of a coffee shop with surreal elements in vibrant colors","An oil painting of a rainbow over a rural abandoned town with classic style","A 3D rendering of a spaceship taking off into space with a cyberpunk look and wide aspect ratio","A sketch of two cats sitting on a sofa watching TV while eating spaghetti"];W.value=e[Math.floor(Math.random()*e.length)]});function g(e){v(te),te.textContent=e}async function me(e=!1){try{async function n(){for(const[a,r]of Object.entries(m)){ae===1&&Fe();const l={...q,...r.opt};g(`Creating inference session for ${a} ...`),m[a].sess=await ort.InferenceSession.create(H[a],l),ae++}ee=Me([1,4,64,64],De),Ve(I,ee,"float32"),re(N,ce),A===void 0&&(g("Loading tokenizer ..."),A=await _e.from_pretrained(ie[S].localFolderPathPrefix+S),A.pad_token_id=0)}async function o(t){const{input_ids:a}=await A(t,{padding:!0,max_length:77,truncation:!0,return_tensor:!1});Z.last_hidden_state=V,await m.text_encoder.sess.run({input_ids:new ort.Tensor("int32",a,[1,a.length])},Z);for(let i=0;i<y.images;i++){let w={sample:de,timestep:new ort.Tensor("int64",[999n],[1]),encoder_hidden_states:V};var r={};r.out_sample=z;let{out_sample:d}=await m.unet.sess.run(w,r);re(F,ue);var l={};l.latent_sample=z;const c={};c.sample=fe,await m.vae_decoder.sess.run(l,c);const p=s.createCommandEncoder(),b={colorAttachments:[{view:C.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]},f=p.beginRenderPass(b);f.setPipeline($),f.setBindGroup(0,pe),f.draw(6,1,0,0),f.end(),s.queue.submit([p.finish()]),await s.queue.onSubmittedWorkDone()}}if(e){await n(),await o("Quick test image"),Ne(),g("Ready!"),O&&!O.classList.contains("hidden")&&O.classList.add("hidden"),v(ge),h(u.DEFAULT);return}else await o(W.value),g("Ready!"),h(u.DONE)}catch(n){console.error(n),g("Error: "+n.message||n),h(u.DEFAULT);return}}function Ne(){const e=s.createCommandEncoder(),o={colorAttachments:[{view:C.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]};e.beginComputePass(o).end(),s.queue.submit([e.finish()])}function Fe(){g("Initializing the webgpu resources ..."),s=ort.env.webgpu.device,le=s.queue,M=s.createBuffer({size:Math.ceil(1*77*1024*4/16)*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),V=ort.Tensor.fromGpuBuffer(M,{dataType:"float32",dims:[1,77,1024],dispose:()=>M.destroy()}),B=s.createBuffer({size:Math.ceil(1*4*64*64*4/16)*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),z=ort.Tensor.fromGpuBuffer(B,{dataType:"float32",dims:[1,4,64,64],dispose:()=>B.destroy()}),I=s.createBuffer({size:Math.ceil(1*4*64*64*4/16)*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),_=s.createBuffer({size:Math.ceil(1*4*64*64*4/16)*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),de=ort.Tensor.fromGpuBuffer(_,{dataType:"float32",dims:[1,4,64,64],dispose:()=>_.destroy()}),x=s.createBuffer({size:Math.ceil(1*3*P*T*4/16)*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),fe=ort.Tensor.fromGpuBuffer(x,{dataType:"float32",dims:[1,3,P,T],dispose:()=>x.destroy()}),N=s.createComputePipeline({layout:"auto",compute:{module:s.createShaderModule({code:xe}),entryPoint:"_start"}}),ce=s.createBindGroup({layout:N.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:_}},{binding:1,resource:{buffer:I}}]}),F=s.createComputePipeline({layout:"auto",compute:{module:s.createShaderModule({code:Pe}),entryPoint:"_start"}}),ue=s.createBindGroup({layout:F.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:B}},{binding:1,resource:{buffer:I}}]});const e=document.getElementById("canvas");e.width=T,e.height=P,C=e.getContext("webgpu");const n=navigator.gpu.getPreferredCanvasFormat(),o=[T,P];C.configure({device:s,size:o,format:n,alphaMode:"premultiplied"}),$=s.createRenderPipeline({layout:"auto",vertex:{module:s.createShaderModule({code:Te}),entryPoint:"main"},fragment:{module:s.createShaderModule({code:Le}),entryPoint:"main",targets:[{format:n}]},primitive:{topology:"triangle-list"}}),pe=s.createBindGroup({layout:$.getBindGroupLayout(0),entries:[{binding:1,resource:{buffer:x}}]})}async function $e(){for(const[e,n]of Object.entries(m)){const o=document.getElementById(`${e}StatusBar`);if(!o)return;const t=await navigator.storage.getDirectory();try{o.textContent="unload",U("unload",o),await(await t.getFileHandle(e)).getFile(),v(document.getElementById(`${e}StatusFlag`))}catch{}}}function k(e){return e>=1e9?(e/1e9).toFixed(2)+"GB":e>=1e6?(e/1e6).toFixed(2)+"MB":e>=1e3?(e/1e3).toFixed(2)+"KB":e+"bytes"}await $e();function oe(e,n=0){const o=["Bytes","KB","MB","GB","TB"];if(e===0)return"0 Bytes";const t=parseInt(Math.floor(Math.log(e)/Math.log(1e3)),10);return(e/Math.pow(1e3,t)).toFixed(n)+" "+o[t]}Ie.addEventListener("change",e=>{Y(e,"unet")});Oe.addEventListener("change",e=>{Y(e,"vae_decoder")});Ue.addEventListener("change",e=>{Y(e,"text_encoder")});async function Y(e,n){const o=e.target.files;if(o.length)for(const t of o){const a=new FileReader;a.onprogress=function(r){if(r.lengthComputable){const l=r.loaded,i=r.total;v(L),L.innerHTML=`
      <div class="relative px-2 z-20" id="StatusText"></div>
      <div class="relative px-2 z-20">
        <span id="ProgressVal">0%</span>
      </div>
      <div
        id="ProgressBar"
        class="absolute top-0 rounded-2xl z-10 text-right bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      ></div>
   `;const w=document.getElementById("StatusText"),d=document.getElementById("ProgressBar"),c=document.getElementById("ProgressVal");let p=l/i*100;w.textContent="Uploading model ...",d.style.height||(d.style.height="30px"),d.style.width=`${p}%`,c.textContent=`${oe(l)}/${oe(i)}`}},a.onload=async function(r){const l=r.target.result,i=new Blob([l]),d=(t.name.split(".").length>0?t.name.split(".")[1]:"")==="json"?"text/plain; charset=utf-8":"binary/octet-stream",p=await new Response(i,{headers:{"Content-Length":i.size.toString(),"Accept-Ranges":"bytes","Content-Type":d}}).arrayBuffer(),f=await(await(await navigator.storage.getDirectory()).getFileHandle(n,{create:!0})).createWritable();await f.write(p),await f.close(),L.classList.contains("hidden")||L.classList.add("hidden")},a.readAsArrayBuffer(t)}}Be(Ce,Se);
