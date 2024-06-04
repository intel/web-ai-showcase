var D$=Object.defineProperty;var L$=(oe,nt,ft)=>nt in oe?D$(oe,nt,{enumerable:!0,configurable:!0,writable:!0,value:ft}):oe[nt]=ft;var T=(oe,nt,ft)=>(L$(oe,typeof nt!="symbol"?nt+"":nt,ft),ft);(function(){"use strict";var Zh;var oe={},nt=Object.freeze({__proto__:null,default:oe});const ft="3.0.0-alpha.0",Ar=typeof self<"u",sf=Ar&&self.constructor.name==="DedicatedWorkerGlobalScope",zi=Ar&&"caches"in self,af=typeof navigator<"u"&&"gpu"in navigator,Ai=typeof process<"u",of=Ai&&((Zh=process==null?void 0:process.release)==null?void 0:Zh.name)==="node",Pr=!Ri(oe),Pi=!Ri(oe),mt=Object.freeze({IS_BROWSER_ENV:Ar,IS_WEBWORKER_ENV:sf,IS_WEB_CACHE_AVAILABLE:zi,IS_WEBGPU_AVAILABLE:af,IS_PROCESS_AVAILABLE:Ai,IS_NODE_ENV:of,IS_FS_AVAILABLE:Pr,IS_PATH_AVAILABLE:Pi}),Pn=Pr&&Pi,Oi=Pn?oe.dirname(oe.dirname(oe.fileURLToPath(self.location.href))):"./",lf=Pn?oe.join(Oi,"/.cache/"):null,Bi="/models/",uf=Pn?oe.join(Oi,Bi):Bi,pe={version:ft,backends:{onnx:{},tfjs:{}},allowRemoteModels:!0,remoteHost:"https://huggingface.co/",remotePathTemplate:"{model}/resolve/{revision}/",allowLocalModels:!Ar,localModelPath:uf,useFS:Pr,useBrowserCache:zi,useFSCache:Pr,cacheDir:lf,useCustomCache:!1,customCache:null};function Ri(e){return Object.keys(e).length===0}const Ce=class{constructor(){let e=function(...t){return e._call(...t)};return Object.setPrototypeOf(e,new.target.prototype)}_call(...e){throw Error("Must implement _call method in subclass")}};function jt(e,t){e&&e(t)}function df(e){return Object.fromEntries(Object.entries(e).map(([t,r])=>[r,t]))}function Di(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function cf(e){return Number.isInteger(e)||typeof e=="bigint"}function ye(...e){return Array.prototype.concat.apply([],e)}function gt(e,t){return Object.assign({},...t.map(r=>{if(e[r]!==void 0)return{[r]:e[r]}}))}var st={};class Or{constructor(t){T(this,"_CONTENT_TYPE_MAP",{txt:"text/plain",html:"text/html",css:"text/css",js:"text/javascript",json:"application/json",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif"});if(this.filePath=t,this.headers=new Headers,this.exists=oe.existsSync(t),this.exists){this.status=200,this.statusText="OK";let r=oe.statSync(t);this.headers.set("content-length",r.size.toString()),this.updateContentType();let n=this;this.body=new ReadableStream({start(s){n.arrayBuffer().then(i=>{s.enqueue(new Uint8Array(i)),s.close()})}})}else this.status=404,this.statusText="Not Found",this.body=null}updateContentType(){const t=this.filePath.toString().split(".").pop().toLowerCase();this.headers.set("content-type",this._CONTENT_TYPE_MAP[t]??"application/octet-stream")}clone(){let t=new Or(this.filePath);return t.exists=this.exists,t.status=this.status,t.statusText=this.statusText,t.headers=new Headers(this.headers),t}async arrayBuffer(){return(await oe.promises.readFile(this.filePath)).buffer}async blob(){const t=await oe.promises.readFile(this.filePath);return new Blob([t],{type:this.headers.get("content-type")})}async text(){return await oe.promises.readFile(this.filePath,"utf8")}async json(){return JSON.parse(await this.text())}}function On(e,t=null){let r;try{r=new URL(e)}catch{return!1}return t&&!t.includes(r.hostname)?!1:r.protocol==="http:"||r.protocol==="https:"}async function Li(e){var t;if(pe.useFS&&!On(e))return new Or(e);if(typeof process<"u"&&((t=process==null?void 0:process.release)==null?void 0:t.name)==="node"){const r=!!(st!=null&&st.TESTING_REMOTELY),n=pe.version,s=new Headers;if(s.set("User-Agent",`transformers.js/${n}; is_ci/${r};`),On(e,["huggingface.co","hf.co"])){const a=(st==null?void 0:st.HF_TOKEN)??(st==null?void 0:st.HF_ACCESS_TOKEN);a&&s.set("Authorization",`Bearer ${a}`)}return fetch(e,{headers:s})}else return fetch(e)}const pf={400:"Bad request error occurred while trying to load file",401:"Unauthorized access to file",403:"Forbidden access to file",404:"Could not locate file",408:"Request timeout error occurred while trying to load file",500:"Internal server error error occurred while trying to load file",502:"Bad gateway error occurred while trying to load file",503:"Service unavailable error occurred while trying to load file",504:"Gateway timeout error occurred while trying to load file"};function hf(e,t,r){if(!r)return null;const n=pf[e]??`Error (${e}) occurred while trying to load file`;throw Error(`${n}: "${t}".`)}class Fi{constructor(t){this.path=t}async match(t){let r=oe.join(this.path,t),n=new Or(r);if(n.exists)return n}async put(t,r){const n=Buffer.from(await r.arrayBuffer());let s=oe.join(this.path,t);try{await oe.promises.mkdir(oe.dirname(s),{recursive:!0}),await oe.promises.writeFile(s,n)}catch(i){console.warn("An error occurred while writing the file to cache:",i)}}}async function ff(e,...t){for(let r of t)try{let n=await e.match(r);if(n)return n}catch{continue}}async function Br(e,t,r=!0,n={}){if(!pe.allowLocalModels){if(n.local_files_only)throw Error("Invalid configuration detected: local models are disabled (`env.allowLocalModels=false`) but you have requested to only use local models (`local_files_only=true`).");if(!pe.allowRemoteModels)throw Error("Invalid configuration detected: both local and remote models are disabled. Fix by setting `env.allowLocalModels` or `env.allowRemoteModels` to `true`.")}jt(n.progress_callback,{status:"initiate",name:e,file:t});let s;if(!s&&pe.useBrowserCache){if(typeof caches>"u")throw Error("Browser cache is not available in this environment.");try{s=await caches.open("transformers-cache")}catch(w){console.warn("An error occurred while opening the browser cache:",w)}}if(!s&&pe.useFSCache&&(s=new Fi(n.cache_dir??pe.cacheDir)),!s&&pe.useCustomCache)throw Error("`env.useCustomCache=true`, but `env.customCache` is not defined.");const i=n.revision??"main";let a=Rr(e,t),o=Rr(pe.localModelPath,a),l=Rr(pe.remoteHost,pe.remotePathTemplate.replaceAll("{model}",e).replaceAll("{revision}",encodeURIComponent(i)),t),u=i==="main"?a:Rr(e,i,t),d,c=s instanceof Fi?u:l,p=!1,h;s&&(h=await ff(s,o,c));const f=h!==void 0;if(h===void 0){if(pe.allowLocalModels)if(On(a)){if(n.local_files_only)throw new Error(`\`local_files_only=true\`, but attempted to load a remote file from: ${a}.`);if(!pe.allowRemoteModels)throw new Error(`\`env.allowRemoteModels=false\`, but attempted to load a remote file from: ${a}.`)}else try{h=await Li(o),d=o}catch(_){console.warn(`Unable to load from local path "${o}": "${_}"`)}if(h===void 0||h.status===404){if(n.local_files_only||!pe.allowRemoteModels){if(r)throw Error(`\`local_files_only=true\` or \`env.allowRemoteModels=false\` and file was not found locally at "${o}".`);return null}if(h=await Li(l),h.status!==200)return hf(h.status,l,r);d=c}p=s&&typeof Response<"u"&&h instanceof Response&&h.status===200}jt(n.progress_callback,{status:"download",name:e,file:t});const m={status:"progress",name:e,file:t};let g;return n.progress_callback?f&&typeof navigator<"u"&&/firefox/i.test(navigator.userAgent)?(g=new Uint8Array(await h.arrayBuffer()),jt(n.progress_callback,{...m,progress:100,loaded:g.length,total:g.length})):g=await mf(h,w=>{jt(n.progress_callback,{...m,...w})}):g=new Uint8Array(await h.arrayBuffer()),p&&d&&await s.match(d)===void 0&&await s.put(d,new Response(g,{headers:h.headers})).catch(w=>{console.warn(`Unable to add response to browser cache: ${w}.`)}),jt(n.progress_callback,{status:"done",name:e,file:t}),g}async function _t(e,t,r=!0,n={}){let s=await Br(e,t,r,n);if(s===null)return{};let a=new TextDecoder("utf-8").decode(s);return JSON.parse(a)}async function mf(e,t){const r=e.headers.get("Content-Length");r===null&&console.warn("Unable to determine content-length from response headers. Will expand buffer when needed.");let n=parseInt(r??"0"),s=new Uint8Array(n),i=0;const a=e.body.getReader();async function o(){const{done:l,value:u}=await a.read();if(l)return;let d=i+u.length;if(d>n){n=d;let p=new Uint8Array(n);p.set(s),s=p}s.set(u,i),i=d;const c=i/n*100;return t({progress:c,loaded:i,total:n}),o()}return await o(),s}function Rr(...e){return e=e.map((t,r)=>(r&&(t=t.replace(new RegExp("^/"),"")),r!==e.length-1&&(t=t.replace(new RegExp("/$"),"")),t)),e.join("/")}function gf(e,t,r){const n=new Array(r.length),s=new Array(r.length);for(let o=r.length-1,l=1;o>=0;--o)s[o]=l,n[o]=t[r[o]],l*=n[o];const i=r.map((o,l)=>s[r.indexOf(l)]),a=new e.constructor(e.length);for(let o=0;o<e.length;++o){let l=0;for(let u=t.length-1,d=o;u>=0;--u)l+=d%t[u]*i[u],d=Math.floor(d/t[u]);a[l]=e[o]}return[a,n]}function Ni(e){const t=Bn(e)[0],r=e.map(i=>Math.exp(i-t)),n=r.reduce((i,a)=>i+a,0);return r.map(i=>i/n)}function Ui(e,t=0){return e=Array.from(e).map((r,n)=>[n,r]).sort((r,n)=>n[1]-r[1]),t!==null&&t>0&&(e=e.slice(0,t)),e}function _f(e){if(e.length===0)throw Error("Array must not be empty");let t=e[0],r=0;for(let n=1;n<e.length;++n)e[n]<t&&(t=e[n],r=n);return[t,r]}function Bn(e){if(e.length===0)throw Error("Array must not be empty");let t=e[0],r=0;for(let n=1;n<e.length;++n)e[n]>t&&(t=e[n],r=n);return[Number(t),r]}function wf(e,t){if(t%2===0||t<=0)throw new Error("Window size must be a positive odd number");const r=new e.constructor(e.length),n=new e.constructor(t),s=Math.floor(t/2);for(let i=0;i<e.length;++i){let a=0;for(let o=-s;o<=s;++o){let l=i+o;l<0?l=Math.abs(l):l>=e.length&&(l=2*(e.length-1)-l),n[a++]=e[l]}n.sort(),r[i]=n[s]}return r}function Dr(e,t){const r=Math.pow(10,t);return Math.round(e*r)/r}/*!
 * ONNX Runtime Web v1.19.0-dev.20240521-068bb3d5ee
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Rn=Object.defineProperty,yf=Object.getOwnPropertyDescriptor,bf=Object.getOwnPropertyNames,vf=Object.prototype.hasOwnProperty,$f=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),A=(e,t)=>()=>(e&&(t=e(e=0)),t),Lr=(e,t)=>{for(var r in t)Rn(e,r,{get:t[r],enumerable:!0})},xf=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of bf(t))!vf.call(e,s)&&s!==r&&Rn(e,s,{get:()=>t[s],enumerable:!(n=yf(t,s))||n.enumerable});return e},Dn=e=>xf(Rn({},"__esModule",{value:!0}),e),Wt,ut,wt,qi,Ln,Fn=A(()=>{Wt=new Map,ut=[],wt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=Wt.get(e);if(n===void 0)Wt.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let s=ut.indexOf(e);s!==-1&&ut.splice(s,1);for(let i=0;i<ut.length;i++)if(Wt.get(ut[i]).priority<=r){ut.splice(i,0,e);return}ut.push(e)}return}throw new TypeError("not a valid backend")},qi=async e=>{let t=Wt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Ln=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),n=r.length===0?ut:r,s,i=[],a=new Set;for(let l of n){let u=await qi(l);typeof u=="string"?i.push({name:l,err:u}):(s||(s=u),s===u&&a.add(l))}if(!s)throw new Error(`no available backend found. ERR: ${i.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:u}of i)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${u}`);let o=t.filter(l=>a.has(typeof l=="string"?l:l.name));return[s,new Proxy(e,{get:(l,u)=>u==="executionProviders"?o:Reflect.get(l,u)})]}}),kf=A(()=>{Fn()}),Gi,Sf=A(()=>{Gi="1.19.0-dev.20240521-068bb3d5ee"}),Nn,Be,Vi=A(()=>{Sf(),Nn="warning",Be={wasm:{},webgl:{},webgpu:{},versions:{common:Gi},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Nn=e}},get logLevel(){return Nn}},Object.defineProperty(Be,"logLevel",{enumerable:!0})}),se,Ef=A(()=>{Vi(),se=Be}),ji,Wi,Tf=A(()=>{ji=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let s,i;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(s=e.dims[2],i=e.dims[3]):(s=e.dims[3],i=e.dims[2]);let a=(t==null?void 0:t.format)!==void 0?t.format:"RGB",o=t==null?void 0:t.norm,l,u;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?u=[0,0,0,0]:typeof o.bias=="number"?u=[o.bias,o.bias,o.bias,o.bias]:(u=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(u[3]=o.bias[3]));let d=i*s,c=0,p=d,h=d*2,f=-1;a==="RGBA"?(c=0,p=d,h=d*2,f=d*3):a==="RGB"?(c=0,p=d,h=d*2):a==="RBG"&&(c=0,h=d,p=d*2);for(let m=0;m<i;m++)for(let g=0;g<s;g++){let w=(e.data[c++]-u[0])*l[0],_=(e.data[p++]-u[1])*l[1],v=(e.data[h++]-u[2])*l[2],b=f===-1?255:(e.data[f++]-u[3])*l[3];n.fillStyle="rgba("+w+","+_+","+v+","+b+")",n.fillRect(g,m,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Wi=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let s,i,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(s=e.dims[2],i=e.dims[1],a=e.dims[3]):(s=e.dims[3],i=e.dims[2],a=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm,u,d;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?d=[0,0,0,0]:typeof l.bias=="number"?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(d[3]=l.bias[3]));let c=i*s;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,h=0,f=1,m=2,g=3,w=0,_=c,v=c*2,b=-1;o==="RGBA"?(w=0,_=c,v=c*2,b=c*3):o==="RGB"?(w=0,_=c,v=c*2):o==="RBG"&&(w=0,v=c,_=c*2),n=r.createImageData(s,i);for(let y=0;y<i*s;h+=p,f+=p,m+=p,g+=p,y++)n.data[h]=(e.data[w++]-d[0])*u[0],n.data[f]=(e.data[_++]-d[1])*u[1],n.data[m]=(e.data[v++]-d[2])*u[2],n.data[g]=b===-1?255:(e.data[b++]-d[3])*u[3]}else throw new Error("Can not access image data");return n}}),Fr,Hi,Ki,Qi,Xi,If=A(()=>{qn(),Fr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,s=t.norm??{mean:255,bias:0},i,a;typeof s.mean=="number"?i=[s.mean,s.mean,s.mean,s.mean]:i=[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],typeof s.bias=="number"?a=[s.bias,s.bias,s.bias,s.bias]:a=[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",u=r*n,d=l==="RGBA"?new Float32Array(u*4):new Float32Array(u*3),c=4,p=0,h=1,f=2,m=3,g=0,w=u,_=u*2,v=-1;o==="RGB"&&(c=3,p=0,h=1,f=2,m=-1),l==="RGBA"?v=u*3:l==="RBG"?(g=0,_=u,w=u*2):l==="BGR"&&(_=0,w=u,g=u*2);for(let b=0;b<u;b++,p+=c,f+=c,h+=c,m+=c)d[g++]=(e[p]+a[0])/i[0],d[w++]=(e[h]+a[1])/i[1],d[_++]=(e[f]+a[2])/i[2],v!==-1&&m!==-1&&(d[v++]=(e[m]+a[3])/i[3]);return l==="RGBA"?new Fe("float32",d,[1,4,r,n]):new Fe("float32",d,[1,3,r,n])},Hi=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,s=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,o=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},u=d=>d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){let d=l();d.width=e.width,d.height=e.height;let c=u(d);if(c!=null){let p=e.height,h=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,h=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=p,o.width=h}else o.tensorFormat="RGBA",o.height=p,o.width=h;c.drawImage(e,0,0),a=c.getImageData(0,0,h,p).data}else throw new Error("Can not access image data")}else if(n){let d,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(d=t.resizedHeight,c=t.resizedWidth):(d=e.height,c=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=d,o.width=c,t!==void 0){let p=l();p.width=c,p.height=d;let h=u(p);if(h!=null)h.putImageData(e,0,0),a=h.getImageData(0,0,c,d).data;else throw new Error("Can not access image data")}else a=e.data}else if(s){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=l();d.width=e.width,d.height=e.height;let c=u(d);if(c!=null){let p=e.height,h=e.width;return c.drawImage(e,0,0,h,p),a=c.getImageData(0,0,h,p).data,o.height=p,o.width=h,Fr(a,o)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,c)=>{let p=l(),h=u(p);if(!e||!h)return c();let f=new Image;f.crossOrigin="Anonymous",f.src=e,f.onload=()=>{p.width=f.width,p.height=f.height,h.drawImage(f,0,0,p.width,p.height);let m=h.getImageData(0,0,p.width,p.height);o.height=p.height,o.width=p.width,d(Fr(m.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Fr(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Ki=(e,t)=>{let{width:r,height:n,download:s,dispose:i}=t,a=[1,n,r,4];return new Fe({location:"texture",type:"float32",texture:e,dims:a,download:s,dispose:i})},Qi=(e,t)=>{let{dataType:r,dims:n,download:s,dispose:i}=t;return new Fe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:s,dispose:i})},Xi=(e,t,r)=>new Fe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),yt,Ht,Un,Yi,Mf=A(()=>{yt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),Ht=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Un=!1,Yi=()=>{if(!Un){Un=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(yt.set("int64",BigInt64Array),Ht.set(BigInt64Array,"int64")),t&&(yt.set("uint64",BigUint64Array),Ht.set(BigUint64Array,"uint64")),r?(yt.set("float16",Float16Array),Ht.set(Float16Array,"float16")):yt.set("float16",Uint16Array)}}}),Zi,Ji,Cf=A(()=>{qn(),Zi=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},Ji=(e,t)=>{switch(e.location){case"cpu":return new Fe(e.type,e.data,t);case"cpu-pinned":return new Fe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Fe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Fe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Fe,qn=A(()=>{Tf(),If(),Mf(),Cf(),Fe=class{constructor(e,t,r){Yi();let n,s;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,n=e.type,s=e.dims,e.location){case"cpu-pinned":{let a=yt.get(n);if(!a)throw new TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(n!=="float32")throw new TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint8"&&n!=="bool")throw new TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof e=="string")if(n=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");a=t}else{let l=yt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array)throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");e==="uint64"||e==="int64"?a=l.from(t,BigInt):a=l.from(t)}else if(t instanceof l)a=t;else throw new TypeError(`A ${n} tensor's data must be type of ${l}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")n="string",a=e;else if(l==="boolean")n="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else{let l=Ht.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=l,a=e}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");s=o,this.cpuData=a,this.dataLocation="cpu"}let i=Zi(s);if(this.cpuData&&i!==this.cpuData.length)throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=s,this.size=i}static async fromImage(e,t){return Hi(e,t)}static fromTexture(e,t){return Ki(e,t)}static fromGpuBuffer(e,t){return Qi(e,t)}static fromPinnedBuffer(e,t,r){return Xi(e,t,r)}toDataURL(e){return ji(this,e)}toImageData(e){return Wi(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ji(this,e)}}}),xe,Gn=A(()=>{qn(),xe=Fe}),Kt,Vn,Ne,Re,ea=A(()=>{Vi(),Kt=(e,t)=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||console.timeStamp(`${e}::ORT::${t}`)},Vn=(e,t)=>{var s;let r=((s=new Error().stack)==null?void 0:s.split(/\r\n|\r|\n/g))||[],n=!1;for(let i=0;i<r.length;i++){if(n&&!r[i].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(a+=`::${t}`),Kt("CPU",a);return}r[i].includes("TRACE_FUNC")&&(n=!0)}},Ne=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||Vn("BEGIN",e)},Re=e=>{(typeof Be.trace>"u"?!Be.wasm.trace:!Be.trace)||Vn("END",e)}}),ta,zf=A(()=>{Fn(),Gn(),ea(),ta=class tf{constructor(t){this.handler=t}async run(t,r,n){Ne();let s={},i={};if(typeof t!="object"||t===null||t instanceof xe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof xe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let u of r){if(typeof u!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(u)===-1)throw new RangeError(`'fetches' contains invalid output name: ${u}.`);s[u]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let u=!1,d=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(d.indexOf(c)!==-1){let p=r[c];(p===null||p instanceof xe)&&(u=!0,a=!1,s[c]=p)}if(u){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let u of this.inputNames)if(typeof t[u]>"u")throw new Error(`input '${u}' is missing in 'feeds'.`);if(a)for(let u of this.outputNames)s[u]=null;let o=await this.handler.run(t,s,i),l={};for(let u in o)if(Object.hasOwnProperty.call(o,u)){let d=o[u];d instanceof xe?l[u]=d:l[u]=new xe(d.type,d.data,d.dims)}return Re(),l}async release(){return this.handler.dispose()}static async create(t,r,n,s){Ne();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let d=t,c=0,p=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(p=t.byteLength-c,typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-c}].`);if(typeof s=="object"&&s!==null)a=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(d,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await Ln(a),u=await o.createInferenceSessionHandler(i,l);return Re(),new tf(u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}}),jn,Af=A(()=>{zf(),jn=ta}),Pf=A(()=>{}),Of=A(()=>{}),Bf=A(()=>{}),Rf=A(()=>{}),ra,na,Df=A(()=>{Fn(),Gn(),ra="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",na=class rf{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",s=t.optimizerModel||"",i=r||{},[a,o]=await Ln(i);if(a.createTrainingSessionHandler){let l=await a.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,s,o);return new rf(l,!!t.optimizerModel,!!t.evalModel)}else throw new Error(ra)}typeNarrowingForRunStep(t,r,n,s,i){let a={},o={};if(typeof n!="object"||n===null||n instanceof xe||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let l=!0;if(typeof s=="object"){if(s===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(s instanceof xe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(s)){if(s.length===0)throw new TypeError("'fetches' cannot be an empty array.");l=!1;for(let u of s){if(typeof u!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(u)===-1)throw new RangeError(`'fetches' contains invalid output name: ${u}.`);a[u]=null}if(typeof i=="object"&&i!==null)o=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let u=!1,d=Object.getOwnPropertyNames(s);for(let c of r)if(d.indexOf(c)!==-1){let p=s[c];(p===null||p instanceof xe)&&(u=!0,l=!1,a[c]=p)}if(u){if(typeof i=="object"&&i!==null)o=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else o=s}}else if(typeof s<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let u of t)if(typeof n[u]>"u")throw new Error(`input '${u}' is missing in 'feeds'.`);if(l)for(let u of r)a[u]=null;return[a,o]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let s=t[n];s instanceof xe?r[n]=s:r[n]=new xe(s.type,s.data,s.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[s,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),a=await this.handler.runTrainStep(t,s,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[s,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),a=await this.handler.runEvalStep(t,s,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}}),Wn,Lf=A(()=>{Df(),Wn=na}),sa={};Lr(sa,{InferenceSession:()=>jn,TRACE:()=>Kt,TRACE_FUNC_BEGIN:()=>Ne,TRACE_FUNC_END:()=>Re,Tensor:()=>xe,TrainingSession:()=>Wn,env:()=>se,registerBackend:()=>wt});var Ue=A(()=>{kf(),Ef(),Af(),Gn(),Pf(),Of(),ea(),Bf(),Rf(),Lf()}),Hn=A(()=>{}),ia={};Lr(ia,{default:()=>aa});var Kn,Qn,aa,Ff=A(()=>{var e;Kc(),Pt(),Nr(),Kn="ort-wasm-proxy-worker",Qn=((e=globalThis.self)==null?void 0:e.name)===Kn,Qn&&(self.onmessage=t=>{let{type:r,in:n}=t.data;try{switch(r){case"init-wasm":ts(n.wasm).then(()=>{ri(n).then(()=>{postMessage({type:r})},s=>{postMessage({type:r,err:s})})},s=>{postMessage({type:r,err:s})});break;case"init-ep":{let{epName:s,env:i}=n;ni(i,s).then(()=>{postMessage({type:r})},a=>{postMessage({type:r,err:a})});break}case"copy-from":{let{buffer:s}=n,i=on(s);postMessage({type:r,out:i});break}case"create":{let{model:s,options:i}=n;si(s,i).then(a=>{postMessage({type:r,out:a})},a=>{postMessage({type:r,err:a})});break}case"release":ii(n),postMessage({type:r});break;case"run":{let{sessionId:s,inputIndices:i,inputs:a,outputIndices:o,options:l}=n;oi(s,i,a,o,new Array(o.length).fill(null),l).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:u},ui([...a,...u]))},u=>{postMessage({type:r,err:u})});break}case"end-profiling":li(n),postMessage({type:r});break;default:}}catch(s){postMessage({type:r,err:s})}}),aa=Qn?null:t=>new Worker(t??qe,{type:"module",name:Kn})}),qe,oa,Xn,la,ua,Yn,da,Zn,ca,pa,Nr=A(()=>{var e,t;Hn(),qe=self.location.href??(typeof document<"u"?(e=document.currentScript)==null?void 0:e.src:typeof self<"u"?(t=self.location)==null?void 0:t.href:void 0),oa=typeof location>"u"?void 0:location.origin,Xn=(r,n)=>{try{let s=n??qe;return(s?new URL(r,s):new URL(r)).origin===oa}catch{return!1}},la=(r,n)=>{let s=n??qe;try{return(s?new URL(r,s):new URL(r)).href}catch{return}},ua=(r,n)=>`${n??"./"}${r}`,Yn=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},da=async r=>(await import(r)).default,Zn=(Ff(),Dn(ia)).default,ca=async()=>{if(!qe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Xn(qe))return[void 0,Zn()];let r=await Yn(qe);return[r,Zn(r)]},pa=async(r,n,s)=>{let i="ort-wasm-simd-threaded.jsep.mjs",a=r??la(i,n),o=s&&a&&!Xn(a,n),l=o?await Yn(a):a??ua(i,n);return[o?l:void 0,await da(l)]}}),Jn,Ur,Qt,es,ha,fa,ts,ge,Pt=A(()=>{Nr(),Ur=!1,Qt=!1,es=!1,ha=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},fa=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},ts=async e=>{if(Ur)return Promise.resolve();if(Qt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(es)throw new Error("previous call to 'initializeWebAssembly()' failed.");Qt=!0;let t=e.initTimeout,r=e.numThreads;if(!fa())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=ha();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let s=e.wasmPaths,i=typeof s=="string"?s:void 0,a=s==null?void 0:s.mjs,o=(a==null?void 0:a.href)??a,l=s==null?void 0:s.wasm,u=(l==null?void 0:l.href)??l,[d,c]=await pa(o,i,r>1),p=!1,h=[];if(t>0&&h.push(new Promise(f=>{setTimeout(()=>{p=!0,f()},t)})),h.push(new Promise((f,m)=>{c({numThreads:r,locateFile:(g,w)=>u??(i??w)+g}).then(g=>{Qt=!1,Ur=!0,Jn=g,f(),d&&URL.revokeObjectURL(d)},g=>{Qt=!1,es=!0,m(g)})})),await Promise.race(h),p)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ge=()=>{if(Ur&&Jn)return Jn;throw new Error("WebAssembly is not initialized yet.")}}),he,qr,le,rs=A(()=>{Pt(),he=(e,t)=>{let r=ge(),n=r.lengthBytesUTF8(e)+1,s=r._malloc(n);return r.stringToUTF8(e,s,n),t.push(s),s},qr=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([s,i])=>{let a=t?t+s:s;if(typeof i=="object")qr(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},le=e=>{let t=ge(),r=t.stackSave();try{let n=t.stackAlloc(8);t._OrtGetLastError(n,n+4);let s=t.HEAP32[n/4],i=t.HEAPU32[n/4+1],a=i?t.UTF8ToString(i):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(r)}}}),ma,Nf=A(()=>{Pt(),rs(),ma=e=>{let t=ge(),r=0,n=[],s=e||{};try{if((e==null?void 0:e.logSeverityLevel)===void 0)s.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if((e==null?void 0:e.logVerbosityLevel)===void 0)s.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);(e==null?void 0:e.terminate)===void 0&&(s.terminate=!1);let i=0;return(e==null?void 0:e.tag)!==void 0&&(i=he(e.tag,n)),r=t._OrtCreateRunOptions(s.logSeverityLevel,s.logVerbosityLevel,!!s.terminate,i),r===0&&le("Can't create run options."),(e==null?void 0:e.extra)!==void 0&&qr(e.extra,"",new WeakSet,(a,o)=>{let l=he(a,n),u=he(o,n);t._OrtAddRunConfigEntry(r,l,u)!==0&&le(`Can't set a run config entry: ${a} - ${o}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}}),ga,_a,wa,ya,ba,Uf=A(()=>{Pt(),rs(),ga=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},_a=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},wa=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},ya=(e,t,r)=>{for(let n of t){let s=typeof n=="string"?n:n.name;switch(s){case"webnn":if(s="WEBNN",typeof n!="string"){let a=n;if(a!=null&&a.deviceType){let o=he("deviceType",r),l=he(a.deviceType,r);ge()._OrtAddSessionConfigEntry(e,o,l)!==0&&le(`Can't set a session config entry: 'deviceType' - ${a.deviceType}.`)}if(a!=null&&a.numThreads){let o=a.numThreads;(typeof o!="number"||!Number.isInteger(o)||o<0)&&(o=0);let l=he("numThreads",r),u=he(o.toString(),r);ge()._OrtAddSessionConfigEntry(e,l,u)!==0&&le(`Can't set a session config entry: 'numThreads' - ${a.numThreads}.`)}if(a!=null&&a.powerPreference){let o=he("powerPreference",r),l=he(a.powerPreference,r);ge()._OrtAddSessionConfigEntry(e,o,l)!==0&&le(`Can't set a session config entry: 'powerPreference' - ${a.powerPreference}.`)}}break;case"webgpu":if(s="JS",typeof n!="string"){let a=n;if(a!=null&&a.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let o=he("preferredLayout",r),l=he(a.preferredLayout,r);ge()._OrtAddSessionConfigEntry(e,o,l)!==0&&le(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let i=he(s,r);ge()._OrtAppendExecutionProvider(e,i)!==0&&le(`Can't append execution provider: ${s}.`)}},ba=e=>{let t=ge(),r=0,n=[],s=e||{};wa(s);try{let i=ga(s.graphOptimizationLevel??"all"),a=_a(s.executionMode??"sequential"),o=typeof s.logId=="string"?he(s.logId,n):0,l=s.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let u=s.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log verbosity level is not valid: ${u}`);let d=typeof s.optimizedModelFilePath=="string"?he(s.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!s.enableCpuMemArena,!!s.enableMemPattern,a,!!s.enableProfiling,0,o,l,u,d),r===0&&le("Can't create session options."),s.executionProviders&&ya(r,s.executionProviders,n),s.enableGraphCapture!==void 0){if(typeof s.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${s.enableGraphCapture}`);let c=he("enableGraphCapture",n),p=he(s.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,c,p)!==0&&le(`Can't set a session config entry: 'enableGraphCapture' - ${s.enableGraphCapture}.`)}if(s.freeDimensionOverrides)for(let[c,p]of Object.entries(s.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let h=he(c,n);t._OrtAddFreeDimensionOverride(r,h,p)!==0&&le(`Can't set a free dimension override: ${c} - ${p}.`)}return s.extra!==void 0&&qr(s.extra,"",new WeakSet,(c,p)=>{let h=he(c,n),f=he(p,n);t._OrtAddSessionConfigEntry(r,h,f)!==0&&le(`Can't set a session config entry: ${c} - ${p}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r),n.forEach(a=>t._free(a)),i}}}),ns,bt,Xt,ss,Gr,is,as,j=A(()=>{ns=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;default:throw new Error(`unsupported data type: ${e}`)}},bt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";default:throw new Error(`unsupported data type: ${e}`)}},Xt=e=>[void 0,4,1,1,2,2,4,8,void 0,1,2,8,4,8,void 0,void 0,void 0][e],ss=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Gr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},is=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool",as=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${e}`)}}}),os,va=A(()=>{Hn(),os=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let s=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(o){if(o instanceof RangeError){let l=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let a=0;for(;;){let{done:o,value:l}=await s.read();if(o)break;let u=l.byteLength;new Uint8Array(i,a,u).set(l),a+=u}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),$a,xa,ka,Sa,Ea,Ta,fe,vt=A(()=>{j(),$a=["V","I","W","E","F"],xa=(e,t)=>{console.log(`[${$a[e]},${new Date().toISOString()}]${t}`)},Ea=(e,t)=>{ka=e,Sa=t},Ta=(e,t)=>{let r=Gr(e),n=Gr(ka);r>=n&&xa(r,typeof t=="function"?t():t)},fe=(...e)=>{Sa&&Ta(...e)}}),Ia,qf=A(()=>{j(),Ia=(e,t)=>new(ss(t))(e)}),ls=A(()=>{}),us,Vr,jr,Ma,Ca,ds,cs,za,Aa,Gf=A(()=>{vt(),ls(),us=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Vr=[],jr=e=>Math.ceil(e/16)*16,Ma=e=>{for(let t=0;t<Vr.length;t++){let r=Vr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Ca=1,ds=()=>Ca++,cs=async(e,t,r,n)=>{let s=jr(r),i=e.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,s),e.flush(),await i.mapAsync(GPUMapMode.READ);let o=i.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(o,0,r)),l}else return new Uint8Array(o.slice(0,r))}finally{i.destroy()}},za=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[t]of us)Vr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[])}upload(e,t){let r=t.buffer,n=t.byteOffset,s=t.byteLength,i=jr(s),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(a.originalSize!==s)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${s}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=o.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,n,s)),o.unmap();let u=this.backend.getCommandEncoder();this.backend.endComputePass(),u.copyBufferToBuffer(o,0,a.gpuData.buffer,0,i),fe("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`),this.buffersForUploadingPending.push(o)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(t);if(!n)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw new Error("inconsistent source and destination gpu data size");let s=jr(r.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,s)}registerExternalBuffer(e,t,r){let n;if(r){if(n=this.externalBuffers.get(r),n===void 0)throw new Error("previous buffer is not registered");if(e===r)return fe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(r)}else n=ds();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:e},originalSize:t}),this.externalBuffers.set(e,n),fe("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, registered.`),n}unregisterExternalBuffer(e){let t=this.externalBuffers.get(e);t!==void 0&&(this.storageCache.delete(t),this.externalBuffers.delete(e),fe("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Ma(e),n,s=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(s||i){let o=(s?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?n=o.pop():n=this.backend.device.createBuffer({size:r,usage:t}):n=this.backend.device.createBuffer({size:r,usage:t})}else n=this.backend.device.createBuffer({size:r,usage:t});let a={id:ds(),type:0,buffer:n};return this.storageCache.set(a.id,{gpuData:a,originalSize:e}),fe("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){var t;return(t=this.storageCache.get(e))==null?void 0:t.gpuData}release(e){let t=this.storageCache.get(e);if(!t)throw new Error("releasing data does not exist");return fe("verbose",()=>`[WebGPU] GpuDataManager.release(id=${e}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(e),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("data does not exist");await cs(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){for(let e of this.buffersForUploadingPending)e.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=us.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e))}},Aa=(...e)=>new za(...e)}),Pa,ae,we=A(()=>{Pa=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ae=e=>new Pa(e)}),Oa,Ot,C,Wr,Ba,ps,hs,J=A(()=>{Oa=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Ot=class{static calcShape(e,t,r=!1){let n=e.length,s=t.length;if(n===0)return t;if(s===0)return e;let i=Math.max(e.length,t.length),a=new Array(i);if(r){if(n<2||s<2)return;let o=Oa.calcMatMulShape([e[n-2],e[n-1]],[t[s-2],t[s-1]]);if(o===void 0)return;[a[i-2],a[i-1]]=o}for(let o=r?3:1;o<=i;o++){let l=n-o<0?1:e[n-o],u=s-o<0?1:t[s-o];if(l!==u&&l>1&&u>1)return;let d=Math.max(l,u);if(l&&u)a[i-o]=Math.max(l,u);else{if(d>1)return;a[i-o]=0}}return a}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let s=1;s<=r;s++)if(e[r-s]!==1&&e[r-s]!==t[n-s])return!1;return!0}},C=class An{static size(t){return An.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let s=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){s[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");s[i]=1,r/=t[i],i--}for(i--;i>=0;i--)s[i]=t[i];return s}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return An.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return An.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let s=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");s*=t[i]}return s}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let s=r-3;s>=0;--s)n[s]=n[s+1]*t[s+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((s,i)=>s+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,s)=>n===r[s])}},Wr=class zr{static adjustPoolAttributes(t,r,n,s,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=n.length?n.push(r[o+2]):n[o]=r[o+2];for(let o=0;o<n.length;o++)if(o<s.length){if(s[o]<0)throw new Error("strides should be greater than or equal to 1")}else s.push(1);for(let o=0;o<n.length;o++)if(o<i.length){if(i[o]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let o=0;o<n.length*2;o++)if(o<a.length){if(a[o]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let o=0;o<n.length;o++){if(n[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[o]>=n[o]||a[o+n.length]>=n[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,s,i,a,o){if(o){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(s.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)zr.adjustPadAndReturnShape(t[l+(a?1:2)],r[l],n[l],s[l],i,l,l+t.length-2,o)}}static computePoolOutputShape(t,r,n,s,i,a,o){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return zr.computeShapeHelper(t,r,l,n,s,i,a,o),l}static computeConvOutputShape(t,r,n,s,i,a,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return zr.computeShapeHelper(!1,t,l,n,s,i,a,o),l}static computeShapeHelper(t,r,n,s,i,a,o,l){if(t)for(let u=0;u<r.length-2;u++)n.push(1);else for(let u=0;u<r.length-2;u++)n.push(zr.adjustPadAndReturnShape(r[u+2],s[u],i[u],a[u],o,u,u+r.length-2,l))}static adjustPadAndReturnShape(t,r,n,s,i,a,o,l){let u=n*(s-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return i[a]=0,i[o]=0,Math.floor((t-u)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((t+r-1)/r-1)*r+s-t;return i[a]=Math.floor(l==="SAME_LOWER"?(d+1)/2:d/2),i[o]=d-i[a],Math.floor((t+d-s)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[o]-u)/r+1)}},Ba=class{static getShapeOfGemmResult(e,t,r,n,s){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let i,a,o;t?(i=e[1],a=e[0]):(i=e[0],a=e[1]);let l=-1;if(n?(o=r[0],l=1):(o=r[1],l=0),r[l]!==a)throw new Error("dimension mismatch");if(i<=0||o<=0||a<=0)throw new Error("invalid shape specified");if(s&&!Ot.isValidBroadcast(s,[i,o]))throw new Error("gemm: invalid bias shape for broadcast");return[i,o,a]}},ps=-34028234663852886e22,hs=34028234663852886e22}),Bt,Hr,be,Te,F,_e,$t,Rt,dt,Q,Kr,z,N,fs,Ra,Da,Yt,Y=A(()=>{j(),J(),Bt=64,Hr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(e){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];default:throw new Error(`Unknown data type: ${e}`)}},be=(e,t=1)=>{let r=Hr(e,t);return typeof r=="string"?r:r[0]},Te=(e,t=1)=>{let r=Hr(e,t);return typeof r=="string"?r:r[1]},F=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:C.computeStrides(r)})}),t},_e=e=>e%4===0?4:e%2===0?2:1,$t=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Rt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,dt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Q=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Kr=(e,t,r,n,s)=>{let i=typeof r=="number",a=i?r:r.length,o=[...new Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,u=Hr(t,s),d=typeof u=="string"?u:u[1],c=typeof u=="string"?u:u[0],p={indices:l,value:d,storage:c,tensor:t},h=k=>typeof k=="string"?k:`${k}u`,f={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=i?"uniforms.":"",g=`${m}${e}_shape`,w=`${m}${e}_strides`,_="";for(let k=0;k<a-1;k++)_+=`
    let dim${k} = current / ${Q(w,k,a)};
    let rest${k} = current % ${Q(w,k,a)};
    indices[${k}] = dim${k};
    current = rest${k};
    `;_+=`indices[${a-1}] = current;`;let v=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${_}
    return indices;
  }`,b=k=>(f.offsetToIndices=!0,a<2?k:`o2i_${e}(${k})`),y=[];if(a>=2)for(let k=a-1;k>=0;k--)y.push(`${Q(w,k,a)} * (indices[${k}])`);let S=a<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${y.join("+")};
  }`,x=k=>(f.indicesToOffset=!0,a<2?k:`i2o_${e}(${k})`),I=(...k)=>a===0?"0u":`${p.indices}(${k.map(h).join(",")})`,D=(k,L)=>a<2?`${k}`:`${Q(k,L,a)}`,R=(k,L,G)=>a<2?`${k}=${G};`:`${Q(k,L,a)}=${G};`,U={},q=(k,L)=>{f.broadcastedIndicesToOffset=!0;let G=`${L.name}broadcastedIndicesTo${e}Offset`;if(G in U)return`${G}(${k})`;let ie=[];for(let ce=a-1;ce>=0;ce--){let rt=L.indicesGet("outputIndices",ce+L.rank-a);ie.push(`${D(w,ce)} * (${rt} % ${D(g,ce)})`)}return U[G]=`fn ${G}(outputIndices: ${L.type.indices}) -> u32 {
             return ${ie.length>0?ie.join("+"):"0u"};
           }`,`${G}(${k})`},H=(k,L)=>(()=>{if(p.storage===p.value)return`${e}[${k}]=${L};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${k}]=vec2<u32>(u32(${L}), select(0u, 0xFFFFFFFFu, ${L} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${k}]=vec2<u32>(u32(${L}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${k}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${L}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),V=k=>(()=>{if(p.storage===p.value)return`${e}[${k}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${k}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${k}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${k}] & 0xFFu), bool(${e}[${k}] & 0xFF00u), bool(${e}[${k}] & 0xFF0000u), bool(${e}[${k}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),E=a<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${d} {
    return ${V(`i2o_${e}(indices)`)};
  }`,M=a<2?"":(()=>{let k=o.map(G=>`d${G}: u32`).join(", "),L=o.map(G=>`d${G}`).join(", ");return`
  fn get_${e}(${k}) -> ${d} {
    return get_${e}ByIndices(${I(L)});
  }`})(),O=(...k)=>{if(k.length!==a)throw new Error(`indices length must be ${a}`);let L=k.map(h).join(",");return a===0?V("0u"):a===1?V(L[0]):(f.get=!0,f.getByIndices=!0,f.indicesToOffset=!0,`get_${e}(${L})`)},B=k=>a<2?V(k):(f.getByIndices=!0,f.indicesToOffset=!0,`get_${e}ByIndices(${k})`),K=a<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${d}) {
    ${H(`i2o_${e}(indices)`,"value")}
  }`,ee=a<2?"":(()=>{let k=o.map(G=>`d${G}: u32`).join(", "),L=o.map(G=>`d${G}`).join(", ");return`
  fn set_${e}(${k}, value: ${d}) {
    set_${e}ByIndices(${I(L)}, value);
  }`})();return{impl:()=>{let k=[],L=!1;return f.offsetToIndices&&(k.push(v),L=!0),f.indicesToOffset&&(k.push(S),L=!0),f.broadcastedIndicesToOffset&&(Object.values(U).forEach(G=>k.push(G)),L=!0),f.set&&(k.push(ee),L=!0),f.setByIndices&&(k.push(K),L=!0),f.get&&(k.push(M),L=!0),f.getByIndices&&(k.push(E),L=!0),!i&&L&&k.unshift(`const ${g} = ${p.indices}(${r.join(",")});`,`const ${w} = ${p.indices}(${C.computeStrides(r).join(",")});`),k.join(`
`)},type:p,offsetToIndices:b,indicesToOffset:x,broadcastedIndicesToOffset:q,indices:I,indicesGet:D,indicesSet:R,set:(...k)=>{if(k.length!==a+1)throw new Error(`indices length must be ${a}`);let L=k[a];if(typeof L!="string")throw new Error("value must be string");let G=k.slice(0,a).map(h).join(",");return a===0?H("0u",L):a===1?H(G[0],L):(f.set=!0,f.setByIndices=!0,f.indicesToOffset=!0,`set_${e}(${G}, ${L})`)},setByOffset:H,setByIndices:(k,L)=>a<2?H(k,L):(f.setByIndices=!0,f.indicesToOffset=!0,`set_${e}ByIndices(${k}, ${L});`),get:O,getByOffset:V,getByIndices:B,usage:n,name:e,strides:w,shape:g,rank:a}},z=(e,t,r,n=1)=>Kr(e,t,r,"input",n),N=(e,t,r,n=1)=>Kr(e,t,r,"output",n),fs=(e,t,r,n=1)=>Kr(e,t,r,"internal",n),Ra=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Bt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],n=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let s=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=s?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=s?"let global_idx = global_id.x; let local_idx = local_id.x;":`let global_idx = (workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
          workgroup_id.y * num_workgroups[0] + workgroup_id.x) * ${t*r*n}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${n})
  fn main(${i}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",n=e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${n}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:n}of this.uniforms)if(n&&n>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(n/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(n/4)}>`);else{let s=n==null||n===1?r:`vec${n}<${r}>`;e.push(`${t}:${s}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Da=(e,t)=>new Ra(e,t),Yt=(e,t)=>{let r=e.length,n=[];for(let s=0;s<r;s++){let i=r-1-s,a=e[i]||1;(t[t.length-1-s]||1)>1&&a===1&&n.unshift(i)}return n}}),La,ms,Fa,Na,Ze,Ua,qa,Dt=A(()=>{j(),J(),we(),Y(),La=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},ms=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Fa=(e,t)=>C.sortBasedOnPerm(e,ms(e.length,t)),Na=(e,t,r,n)=>{let s=[];s.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)s.push(r.indicesSet("a",e[i],`i[${i}]`));return s.push("return a;}"),s.join(`
`)},Ze=(e,t)=>{let r=e.dataType,n=e.dims.length,s=ms(n,t),i=Fa(e.dims,s),a=N("output",r,i.length),o=z("a",r,n),l=u=>`
  ${u.registerUniform("output_size","u32").declareVariables(o,a)}

  ${Na(s,n,o,a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${a.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${a.setByOffset("global_idx",o.getByIndices("aIndices"))}
  }`;return{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:u=>{let d=C.size(i);return{outputs:[{dims:i,dataType:u[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...F(u[0].dims,i)]}},getShaderSource:l}},Ua=(e,t)=>{La(e.inputs),e.compute(Ze(e.inputs[0],t.perm))},qa=e=>ae({perm:e.perm})}),Ga,Va,ja,Wa,Ha,Ka,Qa,Xa,Ya,Za,Ge,Ja,eo,to,ro,no,so,io,ao,oo,lo,Vf=A(()=>{j(),J(),Y(),_s(),Dt(),Ga={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Va={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},ja={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Wa={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Ha=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},Ka=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let s=t.map(i=>e[i]);return[r,s]},Qa=(e,t)=>{let r=e.length+t.length,n=[],s=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[s++]):n.push(1);return n},Xa=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Ya=(e,t)=>{let r=[];if(!Xa(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Za=(e,t,r,n,s,i,a)=>{let o=r[0].dims,l=C.size(i),u=C.size(a),d=z("_A",r[0].dataType,o),c=N("output",s,i),p=32,h=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `;return{name:e,shaderCache:t,getShaderSource:f=>`
        ${f.registerUniform("reduceSize","u32").declareVariables(d,c)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${f.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${ja[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${Ga[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Va[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${n==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Wa[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:l},programUniforms:[{type:12,data:u}]})}},Ge=(e,t,r,n)=>{let s=e.inputs.length===1?r:gs(e.inputs,r),i=s.axes;i.length===0&&!s.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((h,f)=>f));let a=C.normalizeAxes(i,e.inputs[0].dims.length),o=a,l=e.inputs[0],u=Ya(o,e.inputs[0].dims.length);u.length>0&&(l=e.compute(Ze(e.inputs[0],u),{inputs:[0],outputs:[-1]})[0],o=Ha(o.length,l.dims.length));let[d,c]=Ka(l.dims,o),p=d;s.keepDims&&(p=Qa(d,a)),e.compute(Za(t,{hint:s.cacheKey,inputDependencies:["type"]},[l],n,e.inputs[0].dataType,p,c),{inputs:[l]})},Ja=(e,t)=>{Ge(e,"ReduceMeanShared",t,"mean")},eo=(e,t)=>{Ge(e,"ReduceL1Shared",t,"l1")},to=(e,t)=>{Ge(e,"ReduceL2Shared",t,"l2")},ro=(e,t)=>{Ge(e,"ReduceLogSumExpShared",t,"logSumExp")},no=(e,t)=>{Ge(e,"ReduceMaxShared",t,"max")},so=(e,t)=>{Ge(e,"ReduceMinShared",t,"min")},io=(e,t)=>{Ge(e,"ReduceProdShared",t,"prod")},ao=(e,t)=>{Ge(e,"ReduceSumShared",t,"sum")},oo=(e,t)=>{Ge(e,"ReduceSumSquareShared",t,"sumSquare")},lo=(e,t)=>{Ge(e,"ReduceLogSumShared",t,"logSum")}}),Ve,uo,Qr,gs,je,co,po,ho,fo,mo,go,_o,wo,yo,bo,We,vo,$o,xo,ko,So,Eo,To,Io,Mo,Co,_s=A(()=>{j(),J(),we(),Y(),Vf(),Ve=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},uo=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Qr=(e,t,r,n,s,i,a=!1,o=!1)=>{let l=[],u=r[0].dims,d=u.length,c=C.normalizeAxes(s,d),p=!o&&c.length===0;u.forEach((m,g)=>{p||c.indexOf(g)>=0?a&&l.push(1):l.push(m)});let h=l.length,f=C.size(l);return{name:e,shaderCache:t,getShaderSource:m=>{let g=[],w=z("_A",r[0].dataType,d),_=N("output",i,h),v=n(w,_,c),b=v[2];for(let y=0,S=0;y<d;y++)p||c.indexOf(y)>=0?(a&&S++,b=`for(var j${y}: u32 = 0; j${y} < ${u[y]}; j${y}++) {
                  ${v[2].includes("last_index")?`let last_index = j${y};`:""}
                  ${w.indicesSet("input_indices",y,`j${y}`)}
                  ${b}
                }`):(g.push(`${w.indicesSet("input_indices",y,_.indicesGet("output_indices",S))};`),S++);return`

        ${m.registerUniform("output_size","u32").declareVariables(w,_)}

        ${m.mainStart()}
          ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${_.offsetToIndices("global_idx")};

          ${g.join(`
`)}
          ${v[0]}       // init ops for reduce max/min
          ${v[1]}
          ${b}
          ${v[3]}
          ${v.length===4?_.setByOffset("global_idx","value"):v.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:i}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...F(u,l)]})}},gs=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),ae({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},je=(e,t,r,n)=>{let s=e.inputs,i=s.length===1?r:gs(s,r);e.compute(Qr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[s[0]],i.noopWithEmptyAxes&&i.axes.length===0?uo:n,i.axes,s[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},co=(e,t)=>{Ve(e.inputs),je(e,"ReduceLogSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},po=(e,t)=>{Ve(e.inputs),je(e,"ReduceL1",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},ho=(e,t)=>{Ve(e.inputs),je(e,"ReduceL2",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},fo=(e,t)=>{Ve(e.inputs),je(e,"ReduceLogSumExp",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},mo=(e,t)=>{Ve(e.inputs),je(e,"ReduceMax",t,(r,n,s)=>{let i=[];for(let a=0;a<r.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(r.indicesSet("input_indices",a,0));return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},go=(e,t)=>{Ve(e.inputs),je(e,"ReduceMean",t,(r,n,s)=>{let i=1;for(let a=0;a<r.rank;a++)(s.indexOf(a)>=0||s.length===0)&&(i*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${i});`]})},_o=(e,t)=>{Ve(e.inputs),je(e,"ReduceMin",t,(r,n,s)=>{let i=[];for(let a=0;a<r.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(`input_indices[${a}] = 0;`);return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},wo=(e,t)=>{Ve(e.inputs),je(e,"ReduceProd",t,(r,n)=>[`var value = ${n.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},yo=(e,t)=>{Ve(e.inputs),je(e,"ReduceSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},bo=(e,t)=>{Ve(e.inputs),je(e,"ReduceSumSquare",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},We=(e,t,r)=>{if(t.length===0)return r;let n=1,s=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:s*=e[i];return s<32&&n>1024},vo=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?go(e,t):Ja(e,t)},$o=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?po(e,t):eo(e,t)},xo=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ho(e,t):to(e,t)},ko=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fo(e,t):ro(e,t)},So=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mo(e,t):no(e,t)},Eo=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_o(e,t):so(e,t)},To=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wo(e,t):io(e,t)},Io=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yo(e,t):ao(e,t)},Mo=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bo(e,t):oo(e,t)},Co=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?co(e,t):lo(e,t)}}),ws,zo,Ao,ys,jf=A(()=>{j(),we(),_s(),ws=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},zo=(e,t)=>{ws(e.inputs);let r=(n,s,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",s.setByOffset("global_idx","best_index")]};e.compute(Qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ao=(e,t)=>{ws(e.inputs);let r=(n,s,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",s.setByOffset("global_idx","best_index")]};e.compute(Qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ys=e=>ae(e)}),Po,Oo,Bo,Xr,Ro,Do,Lo=A(()=>{j(),J(),we(),Y(),Po=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],s=n.dataType,i=n.dims.length;e.forEach((a,o)=>{if(o!==r){if(a.dataType!==s)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((l,u)=>{if(u!==t&&l!==n.dims[u])throw new Error("non concat dimensions must match")})}})},Oo=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Bo=(e,t)=>{let r=e.length,n=[];for(let s=0;s<r;++s){let i=t.setByOffset("global_idx",e[s].getByIndices("indices"));r===1?n.push(i):s===0?n.push(`if (inputIndex == ${s}u) { ${i} }`):s===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${s}) { ${i} }`)}return n.join(`
`)},Xr=(e,t,r,n)=>{let s=C.size(r),i=new Array(e.length),a=new Array(e.length),o=0,l=[],u=[],d=[{type:12,data:s}];for(let m=0;m<e.length;++m)o+=e[m].dims[t],i[m]=o,u.push(e[m].dims.length),a[m]=z(`input${m}`,n,u[m]),l.push("rank"),d.push({type:12,data:i[m]});for(let m=0;m<e.length;++m)d.push(...F(e[m].dims));d.push(...F(r));let c=N("output",n,r.length),p=c.indicesGet("indices",t),h=Array.from(Array(i.length).keys()).map(m=>`uniforms.sizeInConcatAxis${m}`).join(","),f=m=>`

  ${(()=>{m.registerUniform("outputSize","u32");for(let g=0;g<e.length;g++)m.registerUniform(`sizeInConcatAxis${g}`,"u32");return m.declareVariables(...a,c)})()}

  ${Oo(i.length,h)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${h});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Bo(a,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:f}},Ro=(e,t)=>{let r=e.inputs,n=r[0].dims,s=C.normalizeAxis(t.axis,n.length);Po(r,s);let i=n.slice();i[s]=r.reduce((o,l)=>o+(l.dims.length>s?l.dims[s]:0),0);let a=r.filter(o=>C.size(o.dims)>0);e.compute(Xr(a,s,i,r[0].dataType),{inputs:a})},Do=e=>ae({axis:e.axis})}),Fo,No,Uo,qo,Zt,Go,Vo,bs=A(()=>{j(),ls(),Y(),Lo(),Fo=(e,t)=>{let r=e[0],n=e[1],s=e[2],i=e[3],a=e[4],o=e[5];if(a&&o)throw new Error("Attention cannot have both past and relative_position_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],u=r.dims[1],d=r.dims[2];if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(s.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=s.dims[0]/3,p=c,h=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let v of t.qkvHiddenSizes)if(v%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],h=t.qkvHiddenSizes[2]}let f=u;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(s.dims[0]!==c+p+h)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(a){if(p!==h)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(m=a.dims[3])}let g=f+m,w=-1,_=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");return{batchSize:l,sequenceLength:u,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:g,maxSequenceLength:w,inputHiddenSize:d,hiddenSize:c,vHiddenSize:h,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(h/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:_,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},No=(e,t,r,n)=>{let s=_e(n),i=64,a=n/s;a<i?i=1:a/8<64&&(i=Math.ceil(a/8));let o=Math.ceil(n/s/i),l=[{type:t.dataType,data:1/n},{type:12,data:a},{type:12,data:o}],u=be(t.dataType,s),d=Te(1,s),c=p=>{let h=N("x",t.dataType,t.dims,s),f=[{name:"d_inv",type:Te(t.dataType)},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${i}>;
  var<workgroup> thread_sum: array<f32, ${i}>;
  ${p.registerUniforms(f).declareVariables(h)}
  ${p.mainStart([i,1,1])}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = workgroup_id.x * uniforms.d_comp + local_offset;

    var thread_max_vector = ${d}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      thread_max_vector = max(${d}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(s){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${s}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${i}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${d}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
      sum_vector += exp(${d}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(s){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${s}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${i}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        x[offset + i] = ${h.type.value}(uniforms.d_inv);
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < uniforms.d_comp; i++) {
        var f32input = ${d}(x[offset + i]);
        x[offset + i] = ${h.type.value}(exp(f32input - max_value) / sum);
      }
    }
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${i};${u};${s}`},getShaderSource:c,getRunData:()=>({outputs:[],dispatchGroup:{x:r},programUniforms:l})}},Uo=(e,t,r,n,s,i,a)=>{let o=a+s.kvSequenceLength,l=[s.batchSize,s.numHeads,s.sequenceLength,o],u=i.scale===0?1/Math.sqrt(s.headSize):i.scale,d=_e(s.headSize),c=s.headSize/d,p=12,h={x:Math.ceil(o/p),y:Math.ceil(s.sequenceLength/p),z:s.batchSize*s.numHeads},f=[{type:12,data:s.sequenceLength},{type:12,data:c},{type:12,data:o},{type:12,data:s.numHeads},{type:1,data:u}],m=n?["type","type","type"]:["type","type"],g=w=>{let _=z("q",t.dataType,t.dims,d),v=z("key",r.dataType,r.dims,d),b=[_,v];n&&b.push(z("relative_position_bias",n.dataType,n.dims));let y=N("output",t.dataType,l),S=Te(1,d),x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"}];return`
  const TILE_SIZE = ${p}u;

  var<workgroup> tileQ: array<${_.type.storage}, ${p*p}>;
  var<workgroup> tileK: array<${_.type.storage}, ${p*p}>;
  ${w.registerUniforms(x).declareVariables(...b,y)}
  ${w.mainStart([p,p,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let qOffset = uniforms.M * uniforms.K * headIdx + m * uniforms.K;
    let kOffset = uniforms.N * uniforms.K * headIdx + n * uniforms.K;

    var value = ${S}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        tileK[TILE_SIZE * local_id.y + local_id.x] = key[kOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
        value += ${S}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    let headOffset = headIdx * uniforms.M * uniforms.N;
    if (global_id.y < uniforms.M && global_id.x < uniforms.N) {
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(d){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
        output[outputIdx] = ${y.type.value} (sum * uniforms.alpha) + ${n?"relative_position_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:h,programUniforms:f}),getShaderSource:g}},qo=(e,t,r,n,s)=>{let i=s+n.kvSequenceLength,a=n.nReps?n.nReps:1,o=n.vHiddenSize*a,l=[n.batchSize,n.sequenceLength,o],u=12,d={x:Math.ceil(n.vHeadSize/u),y:Math.ceil(n.sequenceLength/u),z:n.batchSize*n.numHeads},c=[{type:12,data:n.sequenceLength},{type:12,data:i},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:o}];return{name:"AttentionScore",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:c}),getShaderSource:p=>{let h=z("probs",t.dataType,t.dims),f=z("v",r.dataType,r.dims),m=N("output",t.dataType,l),g=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"}];return`
  const TILE_SIZE = ${u}u;
  var<workgroup> tileQ: array<${h.type.value}, ${u*u}>;
  var<workgroup> tileK: array<${h.type.value}, ${u*u}>;
  ${p.registerUniforms(g).declareVariables(h,f,m)}
  ${p.mainStart([u,u,1])}
   let headIdx = workgroup_id.z;
   let m = global_id.y;
   let n = global_id.x;

   let offsetA = headIdx * (uniforms.M * uniforms.K) + m * uniforms.K;
   let offsetB = headIdx * (uniforms.N * uniforms.K) + n;

   var value = ${h.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
     if (m < uniforms.M && w + local_id.x < uniforms.K) {
       tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
     }
     if (n < uniforms.N && w + local_id.y < uniforms.K) {
       tileK[TILE_SIZE * local_id.y + local_id.x] = v[offsetB + (w + local_id.y) * uniforms.N];
     }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let currentBatchHeadNumber = workgroup_id.z % uniforms.num_heads;
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + currentBatchHeadNumber * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}},Zt=(e,t,r,n,s,i,a,o,l,u,d)=>{let c=e.outputCount>1,p=e.outputCount>2,h=u.kvNumHeads!=null||c&&p?u.pastSequenceLength:0,f=h+u.kvSequenceLength,m=[u.batchSize,u.numHeads,f,u.headSize],g=a?[a,r]:[r],w=u.kvNumHeads==null&&c?e.compute(Xr(g,2,m,r.dataType),{inputs:g,outputs:[1]})[0]:r,_=[u.batchSize,u.numHeads,f,u.headSize],v=o?[o,n]:[n],b=u.kvNumHeads==null&&p?e.compute(Xr(v,2,_,n.dataType),{inputs:v,outputs:[2]})[0]:n,y=[t,w];l&&y.push(l);let S=e.compute(Uo(e,t,w,l,u,d,h),{inputs:y,outputs:[-1]})[0];e.compute(No(e,S,u.batchSize*u.numHeads*u.sequenceLength,f),{inputs:[S],outputs:[]});let x=[S,b];e.compute(qo(e,S,b,u,h),{inputs:x,outputs:[0]})},Go=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,s=t.inputHiddenSize,i=t.headSize,a=12,o={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],u=[{type:12,data:n},{type:12,data:s},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],d=c=>{let p=N("output_q",l[0].dataType,r),h=N("output_k",l[0].dataType,r),f=N("output_v",l[0].dataType,r),m=z("input",l[0].dataType,l[0].dims),g=z("weight",l[1].dataType,l[1].dims),w=z("bias",l[2].dataType,l[2].dims),_=m.type.storage,v=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${_}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${_}, ${a*a}>;
  var<workgroup> tileWeightK: array<${_}, ${a*a}>;
  var<workgroup> tileWeightV: array<${_}, ${a*a}>;
  ${c.registerUniforms(v).declareVariables(m,g,w,p,h,f)}
  ${c.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${_}(0);
    var valueK = ${_}(0);
    var valueV = ${_}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:u}),getShaderSource:d},{inputs:l,outputs:[-1,-1,-1]})},Vo=(e,t)=>{let r=Fo(e.inputs,t),[n,s,i]=Go(e,r);return Zt(e,n,s,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r,t)}}),jo,Wo,Ho,Ko,Wf=A(()=>{Ue(),j(),J(),we(),Y(),jo=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,s,i)=>{let a=s.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);s.forEach((o,l)=>{if(o!==n[l])throw new Error(`${i}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Wo=(e,t)=>{let{epsilon:r,spatial:n,format:s}=t,i=e[0].dims,a=n?_e(i[i.length-1]):1,o=s==="NHWC"&&i.length>1?a:1,l=C.size(i)/a,u=n,d=u?i.length:i,c=z("x",e[0].dataType,e[0].dims,a),p=z("scale",e[1].dataType,e[1].dims,o),h=z("bias",e[2].dataType,e[2].dims,o),f=z("inputMean",e[3].dataType,e[3].dims,o),m=z("inputVar",e[4].dataType,e[4].dims,o),g=N("y",e[0].dataType,d,a),w=()=>{let v="";if(n)v=`let cOffset = ${i.length===1?"0u":s==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(s==="NCHW")v=`
            ${g.indicesSet("outputIndices","0","0")}
            let cOffset = ${g.indicesToOffset("outputIndices")};`;else{v=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let b=1;b<p.rank;b++)v+=`cIndices[${b}] = outputIndices[${b}];`;v+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return v},_=v=>`
  const epsilon = ${r};
  ${v.registerUniform("outputSize","u32").declareVariables(c,p,h,f,m,g)}
  ${v.mainStart()}
  ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${a}`)};
    ${w()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:u?["rank","type","type","type","type"]:void 0},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u?[{type:12,data:l},...F(i)]:[{type:12,data:l}]})}},Ho=e=>ae(e),Ko=(e,t)=>{let{inputs:r,outputCount:n}=e,s=Ho({...t,outputCount:n});if(se.webgpu.validateInputContent&&jo(r,s),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Wo(r,s))}}),Qo,Xo,Yo,Hf=A(()=>{J(),Y(),Qo=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Xo=e=>{let t=e[0].dims,r=e[0].dims[2],n=C.size(t)/4,s=e[0].dataType,i=z("input",s,t,4),a=z("bias",s,[r],4),o=z("residual",s,t,4),l=N("output",s,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:u=>`
  const channels = ${r}u / 4;
  ${u.declareVariables(i,a,o,l)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Yo=e=>{Qo(e.inputs),e.compute(Xo(e.inputs))}}),Zo,ne,Jo,el,tl,rl,nl,sl,il,al,ol,ll,ul,dl,cl,pl,Yr,hl,Zr,fl,ml,gl,_l,wl,yl,bl,vl,$l,xl,kl,Sl,El,Tl,Il,Ml,vs,Cl,$s,xs,zl,Al,Pl,ks=A(()=>{j(),J(),we(),Y(),Zo=(e,t,r,n,s,i)=>{let a=Math.ceil(t/4),o="";typeof s=="string"?o=`${s}(a)`:o=s("a");let l=z("inputData",r,[a],4),u=N("outputData",n,[a],4);return`
      ${e.registerUniform("vec_size","u32").declareVariables(l,u)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${u.setByOffset("global_idx",o)}
  }`},ne=(e,t,r,n,s,i=e.dataType)=>({name:t,shaderCache:{hint:s,inputDependencies:["type"]},getShaderSource:a=>Zo(a,C.size(e.dims),e.dataType,i,r,n),getRunData:a=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(C.size(a[0].dims)/64/4)},programUniforms:[{type:12,data:Math.ceil(C.size(e.dims)/4)}]})}),Jo=e=>{e.compute(ne(e.inputs[0],"Abs","abs"))},el=e=>{e.compute(ne(e.inputs[0],"Acos","acos"))},tl=e=>{e.compute(ne(e.inputs[0],"Acosh","acosh"))},rl=e=>{e.compute(ne(e.inputs[0],"Asin","asin"))},nl=e=>{e.compute(ne(e.inputs[0],"Asinh","asinh"))},sl=e=>{e.compute(ne(e.inputs[0],"Atan","atan"))},il=e=>{e.compute(ne(e.inputs[0],"Atanh","atanh"))},al=e=>ae(e),ol=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ne(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},ll=e=>{let t=e.length>=2&&e[1].data!==0?e[1].getFloat32Array()[0]:ps,r=e.length>=3&&e[2].data!==0?e[2].getFloat32Array()[0]:hs;return ae({min:t,max:r})},ul=(e,t)=>{let r=e.inputs.length===1?t:ll(e.inputs),n=Te(e.inputs[0].dataType);e.compute(ne(e.inputs[0],"Clip",s=>`clamp(${s}, clip_min_, clip_max_)`,`
    const clip_min_: vec4<${n}> = vec4(${n}(${r.min}));
    const clip_max_: vec4<${n}> = vec4(${n}(${r.max}));
`,r.cacheKey),{inputs:[0]})},dl=e=>{e.compute(ne(e.inputs[0],"Ceil","ceil"))},cl=e=>{e.compute(ne(e.inputs[0],"Cos","cos"))},pl=e=>{e.compute(ne(e.inputs[0],"Cosh","cosh"))},Yr=e=>ae(e),hl=(e,t)=>{let r=Te(e.inputs[0].dataType);e.compute(ne(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Zr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,fl=e=>{let t=Te(e.inputs[0].dataType);e.compute(ne(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Zr(t)))},ml=e=>{e.compute(ne(e.inputs[0],"Exp","exp"))},gl=e=>{e.compute(ne(e.inputs[0],"Floor","floor"))},_l=e=>{let t=Te(e.inputs[0].dataType);e.compute(ne(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Zr(t)))},wl=(e,t)=>{let r=Te(e.inputs[0].dataType);e.compute(ne(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},yl=e=>{e.compute(ne(e.inputs[0],"Not",t=>`!${t}`))},bl=e=>{e.compute(ne(e.inputs[0],"Neg",t=>`-${t}`))},vl=e=>{e.compute(ne(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},$l=e=>{let t=Te(e.inputs[0].dataType);e.compute(ne(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},xl=e=>{e.compute(ne(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},kl=e=>ae(e),Sl=(e,t)=>{let r=Te(e.inputs[0].dataType);e.compute(ne(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},El=e=>{e.compute(ne(e.inputs[0],"Sin","sin"))},Tl=e=>{e.compute(ne(e.inputs[0],"Sinh","sinh"))},Il=e=>{e.compute(ne(e.inputs[0],"Sqrt","sqrt"))},Ml=e=>{e.compute(ne(e.inputs[0],"Tan","tan"))},vs=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Cl=e=>{e.compute(ne(e.inputs[0],"Tanh",vs))},$s=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${vs("v")};
}
`,xs=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,zl=e=>{let t=Te(e.inputs[0].dataType);e.compute(ne(e.inputs[0],"FastGelu",xs,$s(t),void 0,e.inputs[0].dataType))},Al=(e,t)=>{let r=Te(e.inputs[0].dataType);return e.compute(ne(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Pl=e=>{e.compute(ne(e.inputs[0],"Log","log"))}}),Ol,Bl,Rl,Kf=A(()=>{J(),Y(),ks(),Ol=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Bl=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=z("input",e[0].dataType,e[0].dims,4),n=z("bias",e[0].dataType,[e[0].dims[2]],4),s=N("output",e[0].dataType,t,4),i=C.size(t)/4,a=be(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,n,s)}

  ${Zr(a)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${s.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Rl=e=>{Ol(e.inputs),e.compute(Bl(e.inputs))}}),Dl,Ll,He,Fl,Nl,Ul,ql,Gl,Vl,jl,Wl,Hl,Kl,Qf=A(()=>{j(),J(),Y(),Dl=(e,t,r,n,s,i,a,o,l,u,d,c)=>{let p,h;typeof o=="string"?p=h=(_,v)=>`${o}((${_}),(${v}))`:typeof o=="function"?p=h=o:(p=o.scalar,h=o.vector);let f=N("outputData",d,n.length,4),m=z("aData",l,t.length,4),g=z("bData",u,r.length,4),w;if(s)if(i){let _=C.size(t)===1,v=C.size(r)===1,b=t.length>0&&t[t.length-1]%4===0,y=r.length>0&&r[r.length-1]%4===0;_||v?w=f.setByOffset("global_idx",h(_?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),v?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"))):w=`
            let outputIndices = ${f.offsetToIndices("global_idx * 4u")};
            let offsetA = ${m.broadcastedIndicesToOffset("outputIndices",f)};
            let offsetB = ${g.broadcastedIndicesToOffset("outputIndices",f)};
            ${f.setByOffset("global_idx",h(a||b?m.getByOffset("offsetA / 4u"):`${m.type.value}(${m.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||y?g.getByOffset("offsetB / 4u"):`${g.type.value}(${g.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else w=f.setByOffset("global_idx",h(m.getByOffset("global_idx"),g.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let _=(v,b,y="")=>{let S=`aData[indexA${b}][componentA${b}]`,x=`bData[indexB${b}][componentB${b}]`;return`
            let outputIndices${b} = ${f.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offsetA${b} = ${m.broadcastedIndicesToOffset(`outputIndices${b}`,f)};
            let offsetB${b} = ${g.broadcastedIndicesToOffset(`outputIndices${b}`,f)};
            let indexA${b} = offsetA${b} / 4u;
            let indexB${b} = offsetB${b} / 4u;
            let componentA${b} = offsetA${b} % 4u;
            let componentB${b} = offsetB${b} % 4u;
            ${v}[${b}] = ${y}(${p(S,x)});
          `};d===9?w=`
            var data = vec4<u32>(0);
            ${_("data",0,"u32")}
            ${_("data",1,"u32")}
            ${_("data",2,"u32")}
            ${_("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:w=`
            ${_("outputData[global_idx]",0)}
            ${_("outputData[global_idx]",1)}
            ${_("outputData[global_idx]",2)}
            ${_("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(m,g,f)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${w}
      }`},Ll=(e,t,r,n,s,i,a=r.dataType)=>{let o=!C.areEqual(r.dims,n.dims),l=r.dims,u=C.size(r.dims),d=!1,c=!1,p=[o];if(o){let h=Ot.calcShape(r.dims,n.dims,!1);if(!h)throw new Error("Can't perform binary op on the given tensors");l=h,u=C.size(l);let f=C.size(r.dims)===1,m=C.size(n.dims)===1,g=r.dims.length>0&&r.dims[r.dims.length-1]%4===0,w=n.dims.length>0&&n.dims[n.dims.length-1]%4===0;p.push(f),p.push(m),p.push(g),p.push(w);let _=1;for(let v=1;v<l.length;v++){let b=r.dims[r.dims.length-v]??1,y=n.dims[n.dims.length-v]??1;if(b===y)_*=b;else break}_%4===0?(c=!0,d=!0):(f||m||g||w)&&(d=!0)}else d=!0;return p.push(d),{name:e,shaderCache:{hint:t+p.map(h=>h.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:h=>Dl(h,r.dims,n.dims,l,d,o,c,s,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:Math.ceil(C.size(l)/4)},...F(r.dims,n.dims,l)]})}},He=(e,t,r,n,s,i)=>{e.compute(Ll(t,s??"",e.inputs[0],e.inputs[1],r,n,i))},Fl=e=>{He(e,"Add",(t,r)=>`${t}+${r}`)},Nl=e=>{He(e,"Div",(t,r)=>`${t}/${r}`)},Ul=e=>{He(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},ql=e=>{He(e,"Mul",(t,r)=>`${t}*${r}`)},Gl=e=>{let t=z("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;He(e,"Pow",{scalar:(r,n)=>`pow_custom(${r},${n})`,vector:(r,n)=>`pow_vector_custom(${r},${n})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Vl=e=>{He(e,"Sub",(t,r)=>`${t}-${r}`)},jl=e=>{He(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Wl=e=>{He(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Hl=e=>{He(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Kl=e=>{He(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),xt,kt,St,Ss,Et=A(()=>{j(),J(),xt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},kt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},St=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Ss=e=>{let t=(e==null?void 0:e.activation)||"";if(t==="HardSigmoid"){let[r,n]=(e==null?void 0:e.activation_params)||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=(e==null?void 0:e.activation_params)||[ps,hs];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=(e==null?void 0:e.activation_params)||[.01];return{activation:t,alpha:r}}return{activation:t}}}),ke,Es,Ts=A(()=>{ke=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Es=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Is,Ql=A(()=>{Is=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Xl,Yl,Jr,Ms,Zl,en,Jl,Cs,tn=A(()=>{j(),J(),Y(),Et(),Ts(),Xl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Yl=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Jr=(e,t,r="f32",n,s=!1,i=32,a=!1,o=32)=>{let l=t[1]*e[1],u=t[0]*e[0],d=s?l:i,c=s?i:l,p=d/t[0],h=i/t[1];if(!((s&&p===4&&e[1]===4||!s&&(p===3||p===4))&&d%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${s} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${r}>, ${d/p}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${u/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${p};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${a?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${a?`${Math.ceil(o/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${h};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Xl(s,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Yl(s,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ms=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Zl=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",en=(e,t,r="f32",n,s=!1,i=32,a=!1,o=32,l=!1)=>{let u=e[1]*t[1],d=e[0]*t[0],c=s?u:i,p=s?i:u;if(!(p%t[1]===0&&c%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let h=p/t[1],f=c/t[0],m=i/t[1],g=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${u};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Ms(s,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${s?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${u};

let tileRowA = i32(localId.y) * ${h};
let tileColA = i32(localId.x) * ${f};
let tileRowB = i32(localId.y) * ${m};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${f}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ms(s,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Zl(s)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${c}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${d}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(o/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;

    // Without this initialization strange values show up in acc.
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = 0.0;
      }
    }
    ${g}
  }
`},Jl=(e,t,r,n,s,i=!1)=>{let[a,o,l]=s,[u,d,c,p]=n,h=Yt(a,l),f=Yt(o,l),m=be(n[0].type.tensor),g=()=>{let _=d.rank,v=u.rank,b=`var aIndices: ${d.type.indices};`;for(let y=_-2-1,S=v-1;y>=0;y--,S--)b+=`
aIndices[${y}] = ${v>1?`batchIndices[${S}]`:"batchIndices"};`;return h.forEach(y=>{b+=`
aIndices[${y}] = 0;`}),b+=`
aIndices[${_-2}] = u32(row);
                   aIndices[${_-1}] = u32(colIn);`,b},w=()=>{let _=c.rank,v=u.rank,b=`var bIndices: ${c.type.indices};`;for(let y=_-2-1,S=v-1;y>=0;y--,S--)b+=`
bIndices[${y}] = ${v>1?`batchIndices[${S}]`:"batchIndices"};`;return f.forEach(y=>{b+=`
bIndices[${y}] = 0;`}),b+=`
bIndices[${_-2}] = u32(row);
                   bIndices[${_-1}] = u32(colIn);`,b};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${u.type.indices}) -> ${ke(e,m)} {
      var value = ${ke(e,m)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${g()}
        value = ${d.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${u.type.indices}) -> ${ke(e,m)} {
      var value = ${ke(e,m)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${w()}
        value = ${c.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ke(e,m)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${ke(e,m)}(bias[row])`};`:""}
        ${r}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Cs=(e,t,r,n,s=!1)=>{let i=e[0].dims,a=e[1].dims,o=i.slice(0,-2),l=a.slice(0,-2),u=n?n.slice(0,-2):r.slice(0,-2),d=C.size(u),c=i[i.length-2],p=i[i.length-1],h=a[a.length-1],f=p%4===0&&h%4===0,m=c<=8?[4,1,1]:[4,4,1],g=[8,8,1],w=[Math.ceil(h/g[0]/m[0]),Math.ceil(c/g[1]/m[1]),Math.ceil(d/g[2]/m[2])],_=f?4:1,v=[...o,c,p/_],b=v.length,y=[...l,p,h/_],S=y.length,x=[d,c,h/_],I=[{type:6,data:c},{type:6,data:h},{type:6,data:p}];kt(t,I),I.push(...F(u,v,y));let D=["rank","rank"],R=e.length>2;R&&(I.push(...F(e[2].dims)),D.push("rank")),I.push(...F(x));let U=q=>{let H=u.length,V=fs("batchDims",e[0].dataType,H,1),E=be(e[0].dataType),M=z("a",e[0].dataType,b,_),O=z("b",e[1].dataType,S,_),B=N("result",e[0].dataType,x.length,_),K=[M,O];if(R){let ie=s?_:1;K.push(z("bias",e[2].dataType,e[2].dims.length,ie))}let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];St(t,ee);let k=be(B.type.tensor),L=xt(t,B.type.value,k),G=Jl(_,R,L,[V,M,O,B],[o,l,u],s);return`
  ${q.registerUniforms(ee).registerInternalVariables(V).declareVariables(...K,B)}
  ${G}
  ${f?Jr(m,g,E,V):en(m,g,E,V)}
                   `};return{name:"MatMul",shaderCache:{hint:`${m};${t.activation};${f};${s}`,inputDependencies:D},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:I}),getShaderSource:U}}}),eu,tu,Xf=A(()=>{j(),vt(),Y(),Et(),Ts(),Ql(),tn(),eu=(e,t,r,n,s=!1,i,a=4,o=4,l=4,u="f32")=>{let d=D=>{switch(D){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${u}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},c=D=>{switch(D){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,f=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",m=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",g=e?"row":"col",w=e?"col":"row",_=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${g} / outWidth;
    let outCol = ${g} % outWidth;

    let WRow = ${w} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${w} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${w} % inChannels;
    var resData = ${ke(a,u)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${f} && xCol >= 0 && xCol < ${m}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(a)}
    }
    return resData;`,v=e?t&&n?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${_}
    }
    return ${ke(a,u)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${_}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${_}
    }
    return ${ke(a,u)}(0.0);`,b=`${c(o)}`,y=ke(l,u),S=ke(e?a:o,u),x=ke(e?o:a,u),I=xt(i,y,u);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${e?v:b}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${x} {
      ${e?b:v}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${y}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${Es(s)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},tu=(e,t,r,n,s,i,a,o)=>{let l=t.format==="NHWC",u=l?e[0].dims[3]:e[0].dims[1],d=r[0],c=l?r[2]:r[3],p=l?r[1]:r[2],h=l?r[3]:r[1],f=l&&(u%4===0||u%3===0)&&h%4===0,m=l?h:c*p,g=l?c*p:h,w=[8,8,1],_=n<=8?[4,1,1]:[4,4,1],v=[Math.ceil(m/w[0]/_[0]),Math.ceil(g/w[1]/_[1]),Math.ceil(d/w[2]/_[2])];fe("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${v}`);let b=f?l&&u%4!==0?3:4:1,y=w[1]*_[1],S=w[0]*_[0],x=Math.max(w[0]*b,w[1]),I=n%y===0,D=s%S===0,R=i%x===0,U=f?[b,4,4]:[1,1,1],q=[{type:6,data:n},{type:6,data:s},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];kt(t,q),q.push(...F(e[0].dims,e[1].dims));let H=["rank","rank"];a&&(q.push(...F(e[2].dims)),H.push("rank")),q.push(...F(r));let V=E=>{let M=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];St(t,M);let O=f?4:1,B=be(e[0].dataType),K=`
      fn setOutputAtIndex(flatIndex : i32, value : ${f?`vec4<${B}>`:B}) {
        result[flatIndex] = ${f?`vec4<${B}>`:B}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${f?`vec4<${B}>`:B}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${f?"/ 4":""}, value);
      }`,ee=z("x",e[0].dataType,e[0].dims.length,b===3?1:b),k=z("w",e[1].dataType,e[1].dims.length,O),L=[ee,k],G=N("result",e[0].dataType,r.length,O);if(a){let ie=z("bias",e[2].dataType,e[2].dims.length,O);L.push(ie),K+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${f?`vec4<${B}>`:B} {
          return bias[coords.${l?"w":"y"}${f?"/ 4":""}];
        }`}return`
        ${Is("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${E.registerUniforms(M).declareVariables(...L,G)}
        ${K}
        ${eu(l,I,D,R,a,t,U[0],U[1],U[2],B)}
        ${f?Jr(_,w,B,void 0,!l,x):en(_,w,B,void 0,!l,x,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${b};${f};${I};${D};${R};${y};${S};${x}`,inputDependencies:H},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:q}),getShaderSource:V}}}),zs,ru,Yf=A(()=>{j(),J(),Y(),uu(),Et(),zs=(e,t,r)=>{let n=e.length>2,s=n?"value += b[output_channel];":"",i=e[0].dims,a=e[1].dims,o=a[0]/t.group,l=t.format==="NHWC",u=rn(i,a,t.dilations,t.pads,t.strides,l),d=C.size(u),c=[{type:12,data:d},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:o}];kt(t,c),c.push(...F(i,a));let p=["rank","rank"];n&&(c.push(...F(e[2].dims)),p.push("rank")),c.push(...F(u));let h=f=>{let m=N("output",e[0].dataType,u.length),g=be(m.type.tensor),w=xt(t,m.type.value,g),_=z("x",e[0].dataType,i.length),v=z("w",e[1].dataType,a.length),b=[_,v];n&&b.push(z("b",e[2].dataType,e[2].dims.length));let y=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];return St(t,y),`
  ${f.registerUniforms(y).declareVariables(...b,m)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${m.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel / uniforms.output_channels_per_group;

    var value: ${m.type.value} = ${m.type.value}(0);
    for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
      let input_channel = group_id * uniforms.w_shape[1] + wInChannel;
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[${l?1:2}]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[${l?2:3}]) {
            continue;
          }

          let xVal = ${l?_.get("batch","xHeight","xWidth","input_channel"):_.get("batch","input_channel","xHeight","xWidth")};
          let wVal = ${v.get("output_channel","wInChannel","wHeight","wWidth")};
          value += xVal*wVal;
        }
      }
    }
    ${s}
    ${w}
    ${m.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:t.cacheKey,inputDependencies:p},getRunData:()=>({outputs:[{dims:r?r(u):u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:h}},ru=(e,t,r)=>{let n=e.length>2,s=_e(r[3]),i=_e(r[2]),a=C.size(r)/s/i,o=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],u=[r[0],r[1],r[2],r[3]/s],d=[{type:12,data:a},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];kt(t,d),d.push(...F(o,l,u));let c=(i-1)*t.strides[1]+l[1],p=h=>{let f=N("output",e[0].dataType,u.length,s),m=be(f.type.tensor),g=xt(t,f.type.value,m),w=z("x",e[0].dataType,o.length,s),_=z("w",e[1].dataType,l.length,s),v=[w,_];n&&v.push(z("b",e[2].dataType,e[2].dims,s));let b=n?"value += b[output_channel];":"",y=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return St(t,y),`
  ${h.registerUniforms(y).declareVariables(...v,f)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${i}u;
    let col = (index1 % width1) * ${i}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${w.type.value}, ${c}>;
    var values: array<${f.type.value}, ${i}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${c}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${w.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${w.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${_.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${i}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${i}u; i++) {
      var value = values[i];
      ${b}
      ${g}
      ${f.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${i};${c};${l[0]};${l[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:p}}}),As,nu,su,iu=A(()=>{j(),J(),tn(),Y(),Et(),As=(e,t,r,n,s=!1)=>{let i=e[0].dims,a=e[1].dims,o=i[i.length-2],l=a[a.length-1],u=i[i.length-1],d=_e(l),c=_e(u),p=_e(o),h=C.size(r)/d/p,f=e.length>2,m=n?n.slice(0,-2):r.slice(0,-2),g=[C.size(m),o,l],w=[{type:12,data:h},{type:12,data:o},{type:12,data:l},{type:12,data:u}];kt(t,w),w.push(...F(m,i,a)),f&&w.push(...F(e[2].dims)),w.push(...F(g));let _=v=>{let b=fs("batch_dims",e[0].dataType,m.length),y=z("a",e[0].dataType,i.length,c),S=z("b",e[1].dataType,a.length,d),x=N("output",e[0].dataType,g.length,d),I=be(x.type.tensor),D=xt(t,x.type.value,I),R=[y,S],U="";if(f){let K=s?d:1;R.push(z("bias",e[2].dataType,e[2].dims.length,K)),U=`${s?`value += bias[col / ${K}];`:`value += ${x.type.value}(bias[row + i]);`}`}let q=i.slice(0,-2),H=a.slice(0,-2),V=Yt(q,m),E=Yt(H,m),M=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];St(t,M);let O=(K,ee)=>{let k=K.rank,L=K.name;if(k===2)return`var ${L}_indices = ${K.type.indices}(0u, 0u);`;let G=b.rank,ie=`var ${L}_indices: ${K.type.indices};`;for(let ce=k-2-1,rt=G-1;ce>=0;ce--,rt--)ie+=`
${L}_indices[${ce}] = ${G>1?`batch_indices[${rt}]`:"batch_indices"};`;return ee.forEach(ce=>{ie+=`
${L}_indices[${ce}] = 0;`}),ie+=`${L}_indices[${k-2}] = 0u;
                     ${L}_indices[${k-1}] = 0u;`,ie},B=()=>{let K=`var a_data: ${y.type.value};`;for(let ee=0;ee<c;ee++)K+=`
              let b_data${ee} = b[(b_offset + (k + ${ee}) * uniforms.N + col) / ${d}];`;for(let ee=0;ee<p;ee++){K+=`a_data = a[(a_offset + (row + ${ee}) * uniforms.K + k) / ${c}];`;for(let k=0;k<c;k++)K+=`
            values[${ee}] = fma(${S.type.value}(a_data${c===1?"":`[${k}]`}), b_data${k}, values[${ee}]);
`}return K};return`
  ${v.registerUniforms(M).registerInternalVariables(b).declareVariables(...R,x)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${d})) * ${d};
    var index1 = global_idx / (uniforms.N / ${d});
    let stride1 = uniforms.M / ${p};
    let row = (index1 % stride1) * ${p};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${b.offsetToIndices("batch")};`}
    ${O(y,V)}
    let a_offset = ${y.indicesToOffset("a_indices")};
    ${O(S,E)}
    let b_offset = ${S.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${p}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${B()}
    }
    for (var i = 0u; i < ${p}u; i++) {
      var value = values[i];
      ${U}
      ${D}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${d}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${d};${c};${p};${s}`,inputDependencies:f?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:_}},nu=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},su=e=>{nu(e.inputs);let t=Ot.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];r<8&&n<8?e.compute(As(e.inputs,{activation:""},t)):e.compute(Cs(e.inputs,{activation:""},t))}}),rn,nn,au,Ps,Os,ou,lu,Bs,uu=A(()=>{J(),Xf(),tn(),Yf(),Et(),iu(),Dt(),rn=(e,t,r,n,s,i)=>{let a=e[0],o=e.slice(i?1:2,i?3:4),l=o.length,u=t[0],d=t.slice(2).map((p,h)=>p+(p-1)*(r[h]-1)),c=o.map((p,h)=>p+n[h]+n[h+l]).map((p,h)=>Math.floor((p-d[h]+s[h])/s[h]));return c.splice(0,0,a),c.splice(i?3:1,0,u),c},nn=[2,3,1,0],au=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support conv 1D and 2D");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Ps=(e,t)=>{let r=e.kernelShape.slice();for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();Wr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let s=Object.assign({},e);return Object.assign(s,{kernelShape:r,pads:n}),s},Os=e=>{let t=Ss(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],s=e.dilations,i=e.group,a=e.kernel_shape,o=e.pads,l=e.strides,u=e.w_is_const();return{autoPad:n,format:r,dilations:s,group:i,kernelShape:a,pads:o,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},ou=(e,t,r)=>{let n=Ps(r,t),s=r.format==="NHWC";if(r.group!==1){if(!e.adapterInfo.isArchitecture("ampere")&&s&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1){let S=rn(t[0].dims,t[1].dims,r.dilations,n.pads,r.strides,s),x=e.kernelCustomData.wT??e.compute(Ze(t[1],nn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let I=[t[0],x];t.length===3&&I.push(t[2]),e.compute(ru(I,n,S),{inputs:I})}else e.compute(zs(t,n));return}let i=t.length===3,a=t[0].dims[s?1:2],o=t[0].dims[s?2:3],l=t[0].dims[s?3:1],u=t[1].dims[2],d=t[1].dims[3],c=rn(t[0].dims,t[1].dims,r.dilations,n.pads,r.strides,s),p=c[s?1:2],h=c[s?2:3],f=c[s?3:1],m=s&&u===a&&d===o&&r.pads[0]===0&&r.pads[1]===0;if(m||u===1&&d===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let S=c[0],x,I,D,R=[];if(s){let H=e.kernelCustomData.wT??e.compute(Ze(t[1],nn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=H),m){let V=a*o*l;x=t[0].reshape([1,S,V]),I=H.reshape([1,V,f]),D=[1,S,f]}else x=t[0].reshape([S,a*o,l]),I=H.reshape([1,l,f]),D=[S,p*h,f];R.push(x),R.push(I)}else x=t[0].reshape([S,l,a*o]),I=t[1].reshape([1,f,l]),D=[S,f,p*h],R.push(I),R.push(x);i&&R.push(t[2]);let U=D[2],q=R[0].dims[R[0].dims.length-1];U<8&&q<8?e.compute(As(R,n,c,D,s),{inputs:R}):e.compute(Cs(R,n,c,D,s),{inputs:R});return}let g=!0,w=e.kernelCustomData.wT??e.compute(Ze(t[1],nn),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=w);let _=[t[0],w];i&&_.push(t[2]);let v=s?p*h:f,b=s?f:p*h,y=u*d*l;e.compute(tu(_,n,c,v,b,y,i,g),{inputs:_})},lu=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let s=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),o=[1].concat(t.kernelShape),l=Ps({...t,pads:s,strides:i,dilations:a,kernelShape:o},n);e.compute(zs(n,l,u=>r?[u[0],u[2],u[3]]:[]))},Bs=(e,t)=>{au(e.inputs,t),e.inputs[0].dims.length===3?lu(e,t):ou(e,e.inputs,t)}}),du,cu,Zf=A(()=>{j(),vt(),Y(),Et(),Ts(),Ql(),tn(),du=(e,t=!1,r,n,s=4)=>{let i=g=>{switch(g){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${n}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${g} is not supported.`)}},a=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,o=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,l=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",u=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",d=e?"row":"col",c=e?"col":"row",p=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${d} / outWidth;
      let outCol = ${d} % outWidth;

      let WRow = ${c} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${c} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${l}) || fract(xR) > 0.0) {
        return ${n}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${u}) || fract(xC) > 0.0) {
        return ${n}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${c} % inChannels;
      ${a}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${s}];`,h=e?`
      let col = colIn * ${s};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${p}
      }
      return ${n}(0.0);`:`
      let col = colIn * ${s};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${p}
      }
      return ${n}(0.0);`,f=`
      let col = colIn * ${s};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(s)}
      }
      return ${n}(0.0);
      `,m=xt(r,n);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?h:f}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?f:h}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${n}) {
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${o}
      ${Es(t)}
      ${m}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${s}] = value;
    }
  }`},cu=(e,t,r,n,s,i,a,o)=>{let l=t.format==="NHWC",u=l?e[0].dims[3]:e[0].dims[1],d=r[0],c=l?r[2]:r[3],p=l?r[1]:r[2],h=l?r[3]:r[1],f=l&&u%4===0&&u%3&&h%4===0,m=l?h:c*p,g=l?c*p:h,w=[8,8,1],_=n<=8?[4,1,1]:[4,4,1],v=[Math.ceil(m/w[0]/_[0]),Math.ceil(g/w[1]/_[1]),Math.ceil(d/w[2]/_[2])];fe("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${v}`);let b=f?4:1,y=Math.max(w[0]*b,w[1]),S=f?4:1,x=[t.kernelShape[l?1:2],t.kernelShape[l?2:3]],I=[x[0]+(t.dilations[0]<=1?0:(x[0]-1)*(t.dilations[0]-1)),x[1]+(t.dilations[1]<=1?0:(x[1]-1)*(t.dilations[1]-1))],D=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],R=[{type:6,data:n},{type:6,data:s},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:x},{type:6,data:D}];kt(t,R),R.push(...F(e[0].dims,e[1].dims));let U=["rank","rank"];a&&(R.push(...F(e[2].dims)),U.push("rank")),R.push(...F(r));let q=H=>{let V=z("x",e[0].dataType,e[0].dims.length,S),E=z("w",e[1].dataType,e[1].dims.length,1),M=N("result",e[0].dataType,r.length,S),O=[V,E],B="";if(a){let k=z("bias",e[2].dataType,e[2].dims.length,S);O.push(k),B+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${k.type.value} {
            return bias[coords.${l?"w":"y"}${f?"/ 4":""}];
          }`}let K=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:x.length},{name:"pads",type:"i32",length:D.length}];St(t,K);let ee=be(e[0].dataType,1);if(ee!=="f16"&&ee!=="f32")throw new Error(`elemType ${ee} is not supported.`);return`
        ${Is("uniforms.result_strides")}
        ${H.registerUniforms(K).declareVariables(...O,M)};
        ${B}
        ${du(l,a,t,V.type.value,b)}
        ${f?Jr(_,w,ee,void 0,!l,y):en(_,w,ee,void 0,!l,y,!1,void 0,o)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${_};${w};${f}`,inputDependencies:U},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:R}),getShaderSource:q}}}),pu,Rs,Jf=A(()=>{j(),vt(),J(),Y(),pu=(e,t,r,n,s,i=!1,a,o,l=!1)=>{let u=l?1:2,d=l?2:3,c=l?3:1,p=i?2:1,h=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${a}>`:a}) {
    result[flatIndex] = ${i?`vec4<${a}>`:a}(value);
  }`;n&&(h+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${a}>`:a} {
      return bias[coords.${l?"w":"y"}${i?"/ 4":""}];
    }`);let f=i?4:1,m=z("W",t[1].dataType,t[1].dims.length,f),g=z("Dy",t[0].dataType,t[0].dims.length,f),w=[g,m];n&&w.push(z("bias",t[2].dataType,[r[c]].length,f));let _=N("result",t[0].dataType,r.length,f),v=`{
        let batch: u32 = ${s?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${s?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${s?"global_id.y":"workgroup_id.y"} * ${p};
        let d1: u32 = ${s?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${a}>, ${p}>;
        for (var i = 0; i < ${p}; i++) {
          dotProd[i] = vec4<${a}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${a}(dyCorner.x) + ${a}(wR)) / ${a}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${a}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${a}(dyCorner.y) + ${a}(wC)) / ${a}(uniforms.strides.y);
            let dyC2 = (${a}(dyCorner.y) + 1.0 + ${a}(wC)) / ${a}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${a}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${a}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${g.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${g.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${a}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${c}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${g.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${m.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${g.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${p}; i = i + 1) {
          let value = dotProd[i] + ${n?"bias[c+i]":`vec4<${a}>(0.0)`};
          ${_.set("batch","r","c + i","d1","value")};
        }
      }`,b=`
          let outputIndices = ${_.offsetToIndices("global_idx")};
          let batch = ${_.indicesGet("outputIndices",0)};
          let d1 = ${_.indicesGet("outputIndices",c)};
          let r = ${_.indicesGet("outputIndices",u)};
          let c = ${_.indicesGet("outputIndices",d)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${a}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${a}(dyRCorner) + ${a}(wR)) / ${a}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${a}(uniforms.Dy_shape[${u}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${a}(dyCCorner) + ${a}(wC)) / ${a}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${a}(uniforms.Dy_shape[${d}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${l?g.get("batch","idyR","idyC","inputChannel"):g.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${m.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${a}(0.0)`};
          ${_.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(o).declareVariables(...w,_)}
  ${h}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?v:b}}`},Rs=(e,t,r)=>{let n=e.length>2,s=t.outputShape,i=C.size(s),a=[Math.ceil(i/64),1,1];fe("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${a}`);let o=t.format==="NHWC",l=["rank","rank"],u=[t.strides[0],t.strides[1]],d=[t.kernelShape[o?1:2],t.kernelShape[o?2:3]],c=[t.dilations[0],t.dilations[1]],p=[d[0]+(t.dilations[0]<=1?0:(t.kernelShape[o?1:2]-1)*(t.dilations[0]-1)),d[1]+(t.dilations[1]<=1?0:(t.kernelShape[o?2:3]-1)*(t.dilations[1]-1))],h=[p[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),p[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],f=!1,m=t.group,g=e[1].dims,w=g[0]/m,_=g[1],v=[{type:12,data:i},{type:12,data:u},{type:12,data:d},{type:12,data:c},{type:12,data:p},{type:6,data:h},{type:12,data:w},{type:12,data:_},...F(e[0].dims,e[1].dims)];n&&(v.push(...F(e[2].dims)),l.push("rank")),v.push(...F(s));let b=a[1]===1&&a[2]===1,y=S=>{let x=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:u.length},{name:"filter_dims",type:"u32",length:d.length},{name:"dilations",type:"u32",length:d.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:h.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],I=be(e[0].dataType);return`${pu(S,e,s,n,b,f,I,x,o)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:l},getRunData:()=>({dispatchGroup:{x:a[0],y:a[1],z:a[2]},outputs:[{dims:r?r(s):s,dataType:e[0].dataType}],programUniforms:v}),getShaderSource:y}}}),hu,fu,mu,Ds,gu,_u,wu,yu,bu,vu,em=A(()=>{Zf(),Jf(),Et(),Dt(),hu=(e,t,r,n,s,i)=>(e-1)*t+r+(n-1)*s+1-i,fu=(e,t,r,n,s)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[s]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[s]=i)},mu=(e,t,r,n,s,i,a,o,l,u)=>{let d=e.length-2,c=u.length===0;if(l.length===0)for(let f=0;f<d;++f)l.push(0);let p=e[0],h=t[o?3:1]*s;for(let f=0,m=e.length-d-(o?1:0);f<d;++f,++m){let g=e[m],w=c?g*a[f]:u[f],_=hu(g,a[f],i[f],t[m],r[f],w);fu(_,n,i,f,f+d),c&&u.push(a[f]*(g-1)+l[f]+(t[m]-1)*r[f]+1-i[f]-i[f+d])}u.splice(0,0,p),u.splice(o?3:1,0,h)},Ds=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,p)=>c*p,1)===0){r.length=0;for(let c=2;c<t[1].dims.length;++c)r.push(t[1].dims[c])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let s=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),o=t[0].dims,l=e.dilations.slice();if(l.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;l=new Array(c).fill(1)}let u=e.strides.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;u=new Array(c).fill(1)}mu(o,r,l,e.autoPad,e.group,s,u,n,a,i);let d=Object.assign({},e);return Object.assign(d,{kernelShape:r,pads:s,outputPadding:a,outputShape:i,dilations:l,strides:u}),d},gu=e=>{let t=Ss(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],s=e.dilations,i=e.group,a=e.kernelShape,o=e.pads,l=e.strides,u=e.wIsConst(),d=e.outputPadding,c=e.outputShape;return{autoPad:n,format:r,dilations:s,group:i,kernelShape:a,outputPadding:d,outputShape:c,pads:o,strides:l,wIsConst:u,...t,cacheKey:`${e.format};${t.activation};`}},_u=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let s=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==s))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((a,o)=>a+o,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((a,o)=>a+o,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((a,o)=>a+o,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((a,o)=>a+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},wu=[2,3,1,0],yu=(e,t,r)=>{let n=Ds(r,t),s=r.format==="NHWC",i=n.outputShape,a=i[s?3:1],o=t[0].dims[s?3:1];if(n.group!==1||a===1&&o===1){e.compute(Rs(t,n));return}let l=i[s?1:2],u=i[s?2:3],d=t[1].dims[2],c=t[1].dims[3],p=s?l*u:a,h=s?a:l*u,f=d*c*o,m=!0,g=e.kernelCustomData.wT??e.compute(Ze(t[1],wu),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=g);let w=[t[0],g],_=t.length===3;_&&(!s&&t[2].dims.length===1?w.push(t[2].reshape([t[2].dims[0],1,1])):w.push(t[2])),e.compute(cu(w,n,i,p,h,f,_,m),{inputs:w})},bu=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let s=t.kernelShape;(s.length===0||s[0]===0)&&(s=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],a=[1].concat(a),i=[1].concat(i),s=[1].concat(s);let l=Ds({...t,pads:o,strides:a,dilations:i,kernelShape:s},n);e.compute(Rs(n,l,u=>r?[u[0],u[2],u[3]]:[u[0],u[1],u[3]]))},vu=(e,t)=>{_u(e.inputs,t),e.inputs[0].dims.length===3?bu(e,t):yu(e,e.inputs,t)}}),$u,xu,ku,tm=A(()=>{j(),J(),we(),Y(),$u=(e,t,r,n)=>{let s=C.size(t),i=t.length,a=z("input",e,i),o=N("output",e,i),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),u=C.normalizeAxis(l,i),d=c=>{let p=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,h=Q("uniforms.input_shape","uniforms.axis",i),f=n.reverse?p+(n.exclusive?" + 1":""):"0",m=n.reverse?h:p+(n.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,o)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${f};
                  let last : i32 = ${m};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},{type:12,data:u},...F(t,t)]}),getShaderSource:d}},xu=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,s=e.inputs[1];e.compute($u(n,r,s,t),{inputs:[0]})},ku=e=>{let t=e.exclusive===1,r=e.reverse===1;return ae({exclusive:t,reverse:r})}}),Su,Eu,Tu,Iu,Mu,rm=A(()=>{j(),J(),we(),Y(),Su=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Eu=(e,t,r,n)=>{let s=[];s.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)s.push(r.indicesSet("a",e[i],`i[${i}]`));return s.push("return a;}"),s.join(`
`)},Tu=(e,t)=>{let r,n,s,i,a,o,l=t.format==="NHWC",u=t.blocksize,d=t.mode==="DCR";l?([r,n,s,i]=e.dims,a=d?[r,n,s,u,u,i/u**2]:[r,n,s,i/u**2,u,u],o=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,s,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=d?[r,u,u,i/u**2,n,s]:[r,i/u**2,u,u,n,s],o=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(a),p=c.dims.length,h=e.dataType,f=z("a",h,p),m=N("output",h,p),g=w=>`
  ${w.registerUniform("output_size","u32").declareVariables(f,m)}

  ${Eu(o,p,f,m)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",f.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:w=>{let _=l?[r,n*u,s*u,i/u**2]:[r,i/u**2,n*u,s*u],v=C.size(_),b=c.dims,y=C.sortBasedOnPerm(b,o);return{outputs:[{dims:_,dataType:w[0].dataType}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:[{type:12,data:v},...F(b,y)]}},getShaderSource:g}},Iu=(e,t)=>{Su(e.inputs),e.compute(Tu(e.inputs[0],t))},Mu=e=>ae({blocksize:e.blocksize,mode:e.mode,format:e.format})}),sn,Jt,Ls,Cu,zu,Au,Pu,Fs,Ou,Bu,Ru,nm=A(()=>{j(),J(),we(),Y(),sn="[a-zA-Z]|\\.\\.\\.",Jt="("+sn+")+",Ls="^"+Jt+"$",Cu="("+Jt+",)*"+Jt,zu="^"+Cu+"$",Au=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Pu=class{constructor(e,t){var s;this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,n]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(zu)))throw new Error("Invalid LHS term");if(r.split(",").forEach((i,a)=>{let o=e[a].dims.slice();if(!i.match(RegExp(Ls)))throw new Error("Invalid LHS term");let l=this.processTerm(i,!0,o,a);this.lhs.push(l)}),n==="")n+=[...this.symbolToInfo.entries()].filter(([i,a])=>a.count===1||i==="...").map(([i])=>i).join("");else if(!n.match(RegExp(Jt)))throw new Error("Invalid RHS");(s=n.match(RegExp(sn,"g")))==null||s.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(i);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(e,t,r){let n=this.symbolToInfo.get(e);if(n!==void 0){if(n.dimValue!==t&&n.count!==1)throw new Error("Dimension mismatch");n.count++,n.inputIndices.push(r)}else n={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,n)}processTerm(e,t,r,n=-1){let s=r.length,i=!1,a=[],o=0;if(!e.match(RegExp(Ls))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(sn,"g")),u=new Au(n);return l==null||l.forEach((d,c)=>{if(d==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let p=s-l.length+1;if(p<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(o,o+p),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let h=0;h<a.length;h++){let f=String.fromCharCode(48+h);u.addSymbol(f,c+h),this.addSymbol(f,r[o++],n)}}else u.addSymbol(d,c+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(d,r[o++],n)}),u}},Fs=e=>e+"_max",Ou=(e,t,r,n)=>{let s=e.map(u=>u.length).map((u,d)=>z(`input${d}`,t,u)),i=C.size(n),a=N("output",t,n.length),o=[...r.symbolToInfo.keys()].filter(u=>!r.rhs.symbolToIndices.has(u)),l=u=>{let d=[],c="var prod = 1.0;",p="var sum = 0.0;",h="sum += prod;",f=[],m=[],g=[],w=[],_=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((b,y)=>{var S;if(r.rhs.symbolToIndices.has(y)){let x=(S=r.rhs.symbolToIndices.get(y))==null?void 0:S[0];x!==void 0&&r.lhs.forEach((I,D)=>{if(b.inputIndices.includes(D)){let R=I.symbolToIndices.get(y);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(U=>{d.push(`${s[D].indicesSet(`input${D}Indices`,U,a.indicesGet("outputIndices",x))}`)})}})}else r.lhs.forEach((x,I)=>{if(b.inputIndices.includes(I)){let D=x.symbolToIndices.get(y);if(D===void 0)throw new Error("Invalid symbol error");D.forEach(R=>{f.push(`${s[I].indicesSet(`input${I}Indices`,R,`${y}`)}`)}),w.push(`prod *= ${s[I].getByIndices(`input${I}Indices`)};`)}}),m.push(`for(var ${y}: u32 = 0; ${y} < uniforms.${Fs(y)}; ${y}++) {`),g.push("}")});let v=_?[...d,`let sum = ${s.map((b,y)=>b.getByIndices(`input${y}Indices`)).join(" * ")};`]:[...d,p,...m,...f,c,...w,h,...g];return`
            ${u.registerUniforms(o.map(b=>({name:`${Fs(b)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...s,a)}

            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${s.map((b,y)=>`var input${y}Indices: ${s[y].type.indices};`).join(`
`)}
            ${v.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let u=o.filter(c=>r.symbolToInfo.has(c)).map(c=>{var p;return{type:12,data:((p=r.symbolToInfo.get(c))==null?void 0:p.dimValue)||0}});u.push({type:12,data:i});let d=e.map((c,p)=>[...F(c)]).reduce((c,p)=>c.concat(p),u);return d.push(...F(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d}},getShaderSource:l}},Bu=(e,t)=>{let r=new Pu(e.inputs,t.equation),n=r.outputDims,s=e.inputs.map((i,a)=>i.dims);e.compute(Ou(s,e.inputs[0].dataType,r,n))},Ru=e=>{let t=e.equation.replace(/\s+/g,"");return ae({equation:t})}}),Du,Ns,Lu,Fu,Nu,sm=A(()=>{j(),J(),Y(),Du=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,s=t.length<r.length?0:t.length-r.length;for(;n<r.length&&s<t.length;++n,++s)if(r[n]!==t[s]&&r[n]!==1&&t[s]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Ns=(e,t)=>{let r=e.length-t.length,n=[];for(let s=0;s<r;++s)n.push(e[s]);for(let s=0;s<t.length;++s)n.push(t[s]===1?e[s+r]:t[s]);return n},Lu=(e,t)=>e.length>t.length?Ns(e,t):Ns(t,e),Fu=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Lu(t,r),s=e[0].dataType,i=s===9?4:1,a=Math.ceil(C.size(n)/i),o=u=>{let d=z("input",s,t.length,i),c=N("output",s,n.length,i),p;if(s===9){let h=(f,m,g="")=>`
          let outputIndices${m} = ${c.offsetToIndices(`outputOffset + ${m}u`)};
          let offset${m} = ${d.broadcastedIndicesToOffset(`outputIndices${m}`,c)};
          let index${m} = offset${m} / 4u;
          let component${m} = offset${m} % 4u;
          ${f}[${m}] = ${g}(${d.getByOffset(`index${m}`)}[component${m}]);
        `;p=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${h("data",0,"u32")}
        ${h("data",1,"u32")}
        ${h("data",2,"u32")}
        ${h("data",3,"u32")}
        ${c.setByOffset("global_idx","data")}
      }`}else p=`
        let outputIndices = ${c.offsetToIndices("global_idx")};
        let inputOffset = ${d.broadcastedIndicesToOffset("outputIndices",c)};
        ${c.setByOffset("global_idx",d.getByOffset("inputOffset"))}
      }`;return`
    ${u.registerUniform("vec_size","u32").declareVariables(d,c)}
    ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${p}`},l=[{type:12,data:a},...F(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:o,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},Nu=e=>{Du(e.inputs),e.compute(Fu(e.inputs),{inputs:[0]})}}),Uu,qu,im=A(()=>{j(),J(),Y(),ks(),Uu=e=>{let t=e[0].dataType,r=C.size(e[0].dims),n=C.size(e[1].dims),s=n%4===0,i=a=>{let o=z("x",t,[1],4),l=z("bias",t,[1],4),u=N("y",t,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=h=>`
      let bias${h}_offset: u32 = (global_idx * 4 + ${h}) % uniforms.bias_size;
      let bias${h} = ${l.getByOffset(`bias${h}_offset / 4`)}[bias${h}_offset % 4];`,p=s?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(d).declareVariables(o,l,u)}

    ${$s(Te(t))}

    ${a.mainStart(Bt)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${u.setByOffset("global_idx",xs("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Bt/4)}})}},qu=e=>{e.inputs.length<2||C.size(e.inputs[1].dims)===0?zl(e):e.compute(Uu(e.inputs))}}),Gu,Vu,ju,Wu,am=A(()=>{j(),J(),we(),Y(),Gu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Vu=(e,t)=>{let r=e[0].dims,n=e[1].dims,s=r.length,i=C.normalizeAxis(t.axis,s),a=r.slice(0);a.splice(i,1,...n);let o=r[i],l=e[0].dataType===9?4:1,u=Math.ceil(C.size(a)/l),d=[{type:12,data:u},{type:6,data:o},{type:12,data:i},...F(e[0].dims,e[1].dims,a)],c=p=>{let h=z("data",e[0].dataType,e[0].dims.length,l),f=z("inputIndices",e[1].dataType,e[1].dims.length),m=N("output",e[0].dataType,a.length,l),g=_=>{let v=n.length,b=`var indicesIndices${_}  = ${f.type.indices}(0);`;for(let y=0;y<v;y++)b+=`${v>1?`indicesIndices${_}[${y}]`:`indicesIndices${_}`} = ${a.length>1?`outputIndices${_}[uniforms.axis + ${y}]`:`outputIndices${_}`};`;b+=`
          var idx${_} = ${f.getByIndices(`indicesIndices${_}`)};
          if (idx${_} < 0) {
            idx${_} = idx${_} + uniforms.axisDimLimit;
          }
          var dataIndices${_} : ${h.type.indices};
        `;for(let y=0,S=0;y<s;y++)y===i?(b+=`${s>1?`dataIndices${_}[${y}]`:`dataIndices${_}`} = u32(idx${_});`,S+=v):(b+=`${s>1?`dataIndices${_}[${y}]`:`dataIndices${_}`} = ${a.length>1?`outputIndices${_}[${S}]`:`outputIndices${_}`};`,S++);return b},w;if(e[0].dataType===9){let _=(v,b,y="")=>`
          let outputIndices${b} = ${m.offsetToIndices(`outputOffset + ${b}u`)};
          ${g(b)};
          let offset${b} = ${h.indicesToOffset(`dataIndices${b}`)};
          let index${b} = offset${b} / 4u;
          let component${b} = offset${b} % 4u;
          ${v}[${b}] = ${y}(${h.getByOffset(`index${b}`)}[component${b}]);
        `;w=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${_("value",0,"u32")}
        ${_("value",1,"u32")}
        ${_("value",2,"u32")}
        ${_("value",3,"u32")}
        ${m.setByOffset("global_idx","value")}
      `}else w=`
      let outputIndices = ${m.offsetToIndices("global_idx")};
      ${g("")};
      let value = ${h.getByIndices("dataIndices")};
      ${m.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,f,m)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${w}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},ju=e=>ae({axis:e.axis}),Wu=(e,t)=>{let r=e.inputs;Gu(r),e.compute(Vu(e.inputs,t))}}),Hu,Ku,Qu,Xu,om=A(()=>{j(),J(),we(),Y(),Hu=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Ku=(e,t)=>{let r=e[0].dims,n=e[0].dataType,s=r.length,i=e[1].dims,a=e[1].dataType,o=C.normalizeAxis(t.axis,s),l=r[o],u=i.slice(0),d=C.size(u),c=z("input",n,s),p=z("indicesInput",a,i.length),h=N("output",n,u.length),f=[{type:12,data:d},{type:6,data:l},{type:12,data:o}];return f.push(...F(r,i,u)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:m=>`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,h)}
      ${m.mainStart()}
      ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${h.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${h.setByOffset("global_idx","value")};
  }`}},Qu=e=>ae({axis:e.axis}),Xu=(e,t)=>{let r=e.inputs;Hu(r),e.compute(Ku(e.inputs,t))}}),Yu,Zu,Ju,ed,lm=A(()=>{j(),J(),Y(),Yu=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Zu=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[s,i,a]=Ba.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),o=[s,i];if(!o)throw new Error("Can't use gemm on the given tensors");let l=C.size(o),u=[{type:12,data:l},{type:12,data:s},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],d=["type","type"];e.length===3&&(u.push(...F(e[2].dims)),d.push("rank")),u.push(...F(o));let c=p=>{let h="";t.transA&&t.transB?h="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?h="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?h="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(h="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let f=t.alpha===1?"":"value *= uniforms.alpha;",m=z("a",e[0].dataType,e[0].dims),g=z("b",e[1].dataType,e[1].dims),w=m.type.value,_=null,v=[m,g];e.length===3&&(_=z("c",e[2].dataType,e[2].dims.length),v.push(_));let b=N("output",e[0].dataType,o.length);v.push(b);let y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${p.registerUniforms(y).declareVariables(...v)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${w}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${h}
    }

    ${f}
    ${_!=null?`let cOffset = ${_.broadcastedIndicesToOffset("vec2(m, n)",b)}; value += ${w}(uniforms.beta) * ${_.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:c}},Ju=e=>{let t=e.transA,r=e.transB,n=e.alpha,s=e.beta;return{transA:t,transB:r,alpha:n,beta:s,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},ed=(e,t)=>{Yu(e.inputs),e.compute(Zu(e.inputs,t))}}),Se,td,rd,Us,nd,er,sd,id=A(()=>{j(),J(),we(),ls(),bs(),Y(),Dt(),Se=(e,t)=>e.length>t&&e[t].dims.length>0&&C.size(e[t].dims)>0?e[t]:void 0,td=(e,t)=>{let r=e[0],n=Se(e,1),s=Se(e,2),i=Se(e,3),a=Se(e,4),o=Se(e,5),l=Se(e,6),u=Se(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,c=r.dims[0],p=r.dims[1],h=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=p,m=0,g=0,w=Math.floor(h/t.numHeads);if(l&&u){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==w)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[3]!==w)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==u.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(u.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=l.dims[2],g=l.dims[2]}else if(l||u)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let _;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');_=2,f=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw new Error('Expect "value" be none when "key" has packed kv format.');_=5,f=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');_=0,f=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}if(i){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(s&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=0;if(a){v=8;let I=a.dims;throw I.length===1?I[0]===c?v=1:I[0]===3*c+2&&(v=3):I.length===2&&I[0]===c&&I[1]===f&&(v=5),v===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, kv_sequence_length)'):new Error("Mask not supported")}let b=!1,y=h;if(s){if(s.dims.length!==3&&s.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(s.dims.length===3){if(f!==s.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');y=s.dims[2]}else{if(f!==s.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');y=s.dims[1]*s.dims[3],b=!0}}let S=m+f,x=!1;if(a)throw new Error("Key padding mask is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "relative_position_bias" is expected to have 4 dimensions');if(o.dims[0]!==c&&o.dims[0]!==1||o.dims[1]!==t.numHeads||o.dims[2]!==p||o.dims[3]!==S)throw new Error('Input "relative_position_bias" shape (batch_size, 1, sequence_length, kv_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:S,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:y,headSize:w,vHeadSize:Math.floor(y/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:x,passPastInKv:b,qkvFormat:_}},rd=e=>ae({...e}),Us=ae({perm:[0,2,1,3]}),nd=(e,t,r,n,s,i,a)=>{let o=[n,s,i],l=C.size(o),u=[{type:12,data:l},{type:12,data:a},{type:12,data:i}],d=c=>{let p=N("qkv_with_bias",t.dataType,o),h=z("qkv",t.dataType,o),f=z("bias",r.dataType,o),m=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(m).declareVariables(h,f,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:d},{inputs:[t,r],outputs:[-1]})[0]},er=(e,t,r,n,s,i,a,o)=>{let l=i;if(a){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=nd(e,i,a,t,n,r*s,o),l=l.reshape([t,n,r,s]),e.compute(Ze(l,Us.perm),{inputs:[l],outputs:[-1]})[0]}else return i.dims.length===3&&(l=i.reshape([t,n,r,s])),e.compute(Ze(l,Us.perm),{inputs:[l],outputs:[-1]})[0]},sd=(e,t)=>{let r=td(e.inputs,t),n=e.inputs[0],s=Se(e.inputs,1),i=Se(e.inputs,2),a=Se(e.inputs,3),o=Se(e.inputs,4),l=Se(e.inputs,5),u=Se(e.inputs,6),d=Se(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if((s==null?void 0:s.dims.length)===5)throw new Error("Packed KV is not implemented");let c=s&&i&&s.dims.length===4&&i.dims.length===4,p=er(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(c)return Zt(e,p,s,i,o,void 0,u,d,l,r,t);if(!s||!i)throw new Error("key and value must be provided");let h=er(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,s,a,r.hiddenSize),f=er(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Zt(e,p,h,f,o,void 0,u,d,l,r,t)}}),qs,ad,od,Gs,ld,ud=A(()=>{j(),J(),Y(),qs=e=>Array.from(e.getBigInt64Array(),Number),ad=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(qs(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},od=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},Gs=(e,t)=>{let r=e[0].dims,n=t??qs(e[1]),s=od(r,n),i=C.size(s),a=e[0].dataType,o=z("input",a,r.length),l=N("output",a,s.length),u=d=>`
      const inputShape = ${o.indices(...r)};
      ${d.registerUniform("output_size","u32").declareVariables(o,l)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...F(e[0].dims,s)]}),getShaderSource:u}},ld=e=>{ad(e.inputs),e.compute(Gs(e.inputs),{inputs:[0]})}}),dd,Vs,cd,pd,js,hd,um=A(()=>{j(),J(),we(),bs(),Y(),id(),ud(),Dt(),dd=(e,t)=>{let r=e[0],n=e[1],s=e[2],i=e[3],a=e[4];if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=r.dims[0],u=r.dims[1],d=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],c=u,p=0,h=0,f=Math.floor(d/t.numHeads),m=i&&i.dims.length!==0,g=a&&a.dims.length!==0,w=!0;if(m&&g){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=i.dims[1],h=i.dims[1]}else if(m||g)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let _;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');_=2,c=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==f)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw new Error('Expect "value" be none when "key" has packed kv format.');_=5,c=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==f)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');_=0,c=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');_=3}let v=0,b=!1,y=d;if(s){if(s.dims.length!==3&&s.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(s.dims.length===3){if(c!==s.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');y=s.dims[2]}else{if(c!==s.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');y=s.dims[1]*s.dims[3],b=!0}}let S=p+c;return{batchSize:l,sequenceLength:u,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:S,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:d,vHiddenSize:y,headSize:f,vHeadSize:Math.floor(y/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:b,qkvFormat:_,isPastkvBSNH:w}},Vs=(e,t,r,n)=>{let s=[n.batchSize,n.totalSequenceLength,n.kvNumHeads,n.headSize],i=4,a=C.size(s)/i,o=n.totalSequenceLength,l=N("present_kv",r,s.length,i),u=z("new_kv",e.dataType,e.dims.length,i),d=t?z("past_kv",t.dataType,t.dims.length,i):void 0,c=Math.ceil(n.headSize/i),p={x:o,y:e.dims[0],z:1},h=t?["rank","rank"]:["rank"],f=[{type:12,data:a},{type:12,data:n.pastSequenceLength},{type:12,data:n.kvSequenceLength},{type:12,data:n.totalSequenceLength}],m=[u];d?(f.push(...F(e.dims),...F(t.dims),...F(s)),m.push(d)):f.push(...F(e.dims),...F(s));let g=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],w=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,_=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,v=t?`if (s < past_seqlen) {
        ${w}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${_}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${_}
        }`,b=y=>`

  ${y.registerUniforms(g).declareVariables(...m,l)}
  ${y.mainStart([c,n.kvNumHeads,1])}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    var indices = ${l.offsetToIndices("global_idx")};
    let h = local_id.x;
    let n = local_id.y;
    let s = workgroup_id.x;
    let b = workgroup_id.y;
    let num_heads = ${n.kvNumHeads}u;
    let H = ${c}u;

    let present_seqlen = uniforms.present_seqlen;
    let present_batch_stride = present_seqlen * num_heads * H;
    var row_stride = H;
    let is_bsnh = ${n.isPastkvBSNH};

    if (is_bsnh) {
      row_stride = num_heads * H;
    }
    var present_head_stride = present_seqlen * H;
    if (is_bsnh) {
      present_head_stride = H;
    }

    let past_seqlen = uniforms.past_seqlen;

    let out_offset = b * present_batch_stride + s * row_stride + n * present_head_stride + h;
    ${v}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${n.kvNumHeads}${c}${!!t}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:s,dataType:r}],dispatchGroup:p,programUniforms:f}),getShaderSource:b}},cd=e=>ae({...e}),pd=ae({perm:[0,2,1,3]}),js=(e,t,r,n,s)=>{let i=t,a=n.kvNumHeads,o=n.nReps;return t.dims.length===3&&n.kvSequenceLength!==0&&(i=t.reshape([n.batchSize,n.kvSequenceLength,a,n.headSize])),r?i=e.compute(Vs(i,r,i.dataType,n),{inputs:[i,r],outputs:[n.isPastkvBSNH?s:-1]})[0]:i=e.compute(Vs(i,void 0,i.dataType,n),{inputs:[i],outputs:[n.isPastkvBSNH?s:-1]})[0],o!==1&&(i=e.compute(Gs([i],[1,1,1,o]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([n.batchSize,n.totalSequenceLength,a*o,n.headSize])),e.compute(Ze(i,pd.perm),{inputs:[i],outputs:[-1]})[0]},hd=(e,t)=>{var l;let r=dd(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(((l=e.inputs[1])==null?void 0:l.dims.length)===5)throw new Error("Packed KV is not implemented");let n=er(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,e.inputs[0],void 0,0),s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,i=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,a=js(e,e.inputs[1],s,r,1),o=js(e,e.inputs[2],i,r,2);Zt(e,n,a,o,void 0,void 0,void 0,void 0,void 0,r,t)}}),fd,md,gd,_d,dm=A(()=>{j(),J(),Y(),fd=(e,t)=>{let r=e[0].dims,n=r,s=2,i=C.sizeToDimension(r,s),a=C.sizeFromDimension(r,s),o=_e(a),l=a/o,u=[r[0],r[1],l],d=["rank","type","type"],c=[{type:12,data:a},{type:12,data:l}];c.push(...F(u,u));let p=h=>{let f=z("x",e[0].dataType,u.length,o),m=z("scale",e[1].dataType,e[1].dims),g=z("bias",e[2].dataType,e[2].dims),w=N("output",e[0].dataType,u.length,o),_=[f,m,g,w],v=f.type.value,b=o===1?"f32":`vec${o}<f32>`,y=64,S=[{name:"normSize",type:"u32"},{name:"normPackedSize",type:"u32"}];return`
  var<workgroup> meanShared : f32;
  var<workgroup> squaredNormShared : f32;
  var<workgroup> workgroupShared : array<${b}, ${y}>;
  const workgroupSize = ${y}u;
  ${h.registerUniforms(S).declareVariables(..._)}
  ${h.mainStart(y)}
    let norm = global_idx / workgroupSize;
    let batch = norm / uniforms.x_shape[1];
    let channel = norm % uniforms.x_shape[1];
    let localIndex = local_id.x;

    // initialize workgroup memory
    var initial = ${b}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      initial = initial + ${b}(${f.get("batch","channel","h")});
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the mean of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      meanShared = ${dt("workgroupShared[0]",o)} / f32(uniforms.normSize);
    }
    workgroupBarrier();

    // reinitialize workgroup memory.
    initial = ${b}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let deviation =  ${b}(${f.get("batch","channel","h")}) - ${b}(meanShared);
      initial = initial + deviation * deviation;
    }
    workgroupShared[localIndex] = initial;
    workgroupBarrier();

    // Calculate the sum of square of deviation of current channel data.
    for (var currSize = workgroupSize >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (localIndex < currSize) {
        workgroupShared[localIndex] = workgroupShared[localIndex] + workgroupShared[localIndex + currSize];
      }
      workgroupBarrier();
    }
    if (localIndex == 0) {
      squaredNormShared = ${dt("workgroupShared[0]",o)};
    }
    workgroupBarrier();

    let invStdDev = inverseSqrt(squaredNormShared / f32(uniforms.normSize) + f32(${t.epsilon}));
    let channelScale = invStdDev * f32(${m.getByOffset("channel")});
    let channelShift = f32(${g.getByOffset("channel")}) - meanShared * channelScale;
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let value = ${f.get("batch","channel","h")} * ${v}(${b}(channelScale)) + ${v}(${b}(channelShift));
      ${w.set("batch","channel","h","value")};
    }
  }`};return{name:"InstanceNormalization",shaderCache:{hint:`${t.epsilon};${o}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:i},programUniforms:c}),getShaderSource:p}},md=(e,t,r,n,s,i,a,o)=>{let l=_e(a),u=64,d=l===1?"vec2f":`mat2x${l}f`,c=l===1?"f32":`vec${l}f`,p=(S,x)=>`${d}(${S}, ${x})`,h=s*a/l,f=Math.ceil(i/u),m=["type"],g=[{type:12,data:f},{type:12,data:i},{type:12,data:Math.floor(a/l)},{type:12,data:Math.floor(i*a/l)}],w=S=>{let x=z("input",t.dataType,t.dims,l);return`
  ${S.declareVariables(x)}
  @group(0) @binding(1) var<storage, read_write> output : array<${d}>;
  struct Uniforms {wg_size:u32, H:u32, C:u32, image_size:u32};
  @group(0) @binding(2) var<uniform> uniforms: Uniforms;

  ${S.mainStart(u)}
    let currentImageNumber = global_idx / ${u} / uniforms.C;
    let currentChannelNumber = (global_idx / ${u}) % uniforms.C;
    let wgOffset = local_id.x * uniforms.wg_size;
    if (wgOffset >= uniforms.H) {
        return;
    }
    let wgMax = min(wgOffset + uniforms.wg_size, uniforms.H);

    let offset = currentImageNumber * uniforms.image_size + currentChannelNumber;
    var sum = ${$t("f32",l)};
    var squaredSum = ${$t("f32",l)};
    for (var i: u32 = wgOffset; i < wgMax; i++) {
        let value = ${c}(input[offset + i * uniforms.C]);
        sum += value;
        squaredSum += value * value;
    }
    output[global_idx] = ${p("sum","squaredSum")};
  }`},_=e.compute({name:"InstanceNormComputeMean",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:[s,a,u,2],dataType:1}],dispatchGroup:{x:s*a/l},programUniforms:g}),getShaderSource:w},{inputs:[t],outputs:[-1]})[0],v=[{type:12,data:h},{type:12,data:i},{type:12,data:Math.floor(a/l)},{type:12,data:Math.floor(u*a/l)}],b=["type","type","type"],y=S=>{let x=z("scale",r.dataType,r.dims,l),I=z("bias",n.dataType,n.dims,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${d}>;
  @group(0) @binding(1) var<storage, read> scale : array<${x.type.storage}>;
  @group(0) @binding(2) var<storage, read> bias : array<${I.type.storage}>;
  @group(0) @binding(3) var<storage, read_write> output : array<${d}>;
  struct Uniforms {units_of_work : u32, H: u32, C : u32, image_size : u32};
  @group(0) @binding(4) var<uniform> uniforms: Uniforms;

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.units_of_work")}
    let currentImageNumber = global_idx / uniforms.C;
    let currentChannelNumber = global_idx % uniforms.C;

    let offset = currentImageNumber * uniforms.image_size;
    var sum = ${$t("f32",l)};
    var squaredSum = ${$t("f32",l)};
    for (var i: u32 = 0; i < min(${u}, uniforms.H); i++) {
        let value = input[offset + i + currentChannelNumber * ${u}];
        sum += value[0];
        squaredSum += value[1];
    }
    sum = sum / f32(uniforms.H);
    squaredSum = squaredSum / f32(uniforms.H);
    let invStdDev = inverseSqrt(squaredSum - sum * sum + f32(${o}));
    let channelScale = invStdDev * ${c}(scale[currentChannelNumber]);
    let channelShift = ${c}(bias[currentChannelNumber]) - sum * channelScale;

    output[global_idx] = ${p("channelScale","channelShift")};
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:[s,a,2],dataType:1}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:v}),getShaderSource:y},{inputs:[_,r,n],outputs:[-1]})[0]},gd=(e,t,r)=>{let n=t[0].dims,s=n,i=n[0],a=n[n.length-1],o=C.sizeFromDimension(n,1)/a,l=_e(a),u=C.size(s)/l,d=[{type:12,data:o},{type:12,data:Math.floor(a/l)}],c=["type","type"],p=md(e,t[0],t[1],t[2],i,o,a,r.epsilon),h=f=>{let m=be(t[0].dataType),g=l===1?"vec2f":`mat2x${l}f`,w=l===1?m:`vec${l}<${m}>`,_=z("input",t[0].dataType,t[0].dims,l),v=N("output",t[0].dataType,s,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${_.type.storage}>;
  @group(0) @binding(1) var<storage, read> scaleInput : array<${g}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${v.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${f.mainStart()}
    let currentImageNumber = global_idx / (uniforms.C * uniforms.H);
    let currentChannelNumber = global_idx % uniforms.C;

    let scaleOffset = currentImageNumber * uniforms.C + currentChannelNumber;
    let scale = scaleInput[scaleOffset];
    output[global_idx] = fma(input[global_idx], ${w}(scale[0]), ${w}(scale[1]));
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:s,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:h},{inputs:[t[0],p]})},_d=(e,t)=>{t.format==="NHWC"?gd(e,e.inputs,t):e.compute(fd(e.inputs,t))}}),wd,yd,bd,cm=A(()=>{j(),J(),Y(),wd=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},yd=(e,t,r)=>{let n=t.simplified,s=e[0].dims,i=e[1],a=!n&&e[2],o=s,l=C.normalizeAxis(t.axis,s.length),u=C.sizeToDimension(s,l),d=C.sizeFromDimension(s,l),c=C.size(i.dims),p=a?C.size(a.dims):0;if(c!==d||a&&p!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let h=[];for(let y=0;y<s.length;++y)y<l?h.push(s[y]):h.push(1);let f=_e(d),m=["type","type"],g=[{type:12,data:u},{type:1,data:d},{type:12,data:Math.floor(d/f)},{type:1,data:t.epsilon}];a&&m.push("type");let w=r>1,_=r>2,v=y=>{let S=be(e[0].dataType),x=[z("x",e[0].dataType,e[0].dims,f),z("scale",i.dataType,i.dims,f)];a&&x.push(z("bias",a.dataType,a.dims,f)),x.push(N("output",e[0].dataType,o,f)),w&&x.push(N("mean_data_output",1,h)),_&&x.push(N("inv_std_output",1,h));let I=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${y.registerUniforms(I).declareVariables(...x)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${$t("f32",f)};
    var mean_square_vector = ${$t("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Rt(S,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${dt("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${dt("mean_square_vector",f)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Rt(S,f,"x[j + offset]")};
      let f32scale = ${Rt(S,f,"scale[j]")};
      output[j + offset] = ${x[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${Rt(S,f,"bias[j]")}`:""}
      );
    }

    ${w?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},b=[{dims:o,dataType:e[0].dataType}];return w&&b.push({dims:h,dataType:1}),_&&b.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${r};${n}`,inputDependencies:m},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:g}),getShaderSource:v}},bd=(e,t)=>{wd(e.inputs),e.compute(yd(e.inputs,t,e.outputCount))}}),vd,$d,xd,kd,pm=A(()=>{j(),J(),we(),Y(),vd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let s=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!C.areEqual(a.dims,[t.n,s,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(C.size(o)!==t.n*s)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,u=t.bits>4?t.n*s:t.n*Math.floor((s+1)/2);if(C.size(l)!==u)throw new Error("zeroPoints input size error.")}},$d=(e,t,r,n)=>{let s=e[0].dims,i=s.length,a=Math.floor((t.k+t.blockSize-1)/t.blockSize),o=s[i-2],l=t.k,u=t.n,d=s.slice(0,i-2),c=C.size(d),p=t.blockSize/8*t.bits/4,h=e[0].dataType,f=_e(o),m=_e(t.k),g=_e(p),w=Xt(h),_=o*a*w,v=Math.floor(n/_),b=a<=r[0]&&v>0,y=!b||v>=4?_e(u):v>=2&&_e(u)>=2?2:1,S=d.concat([o,u]),x=C.size(S)/y/f,I=b?[]:[{type:12,data:x},{type:12,data:t.blockSize}],D=[c,o,l/m],R=C.convertShape(e[1].dims).slice();R.splice(-1,1,p/g),I.push(...F(D)),I.push(...F(R)),I.push(...F(e[2].dims)),e.length===4&&I.push(...F(C.convertShape(e[3].dims)));let U=[c,o,u/y];I.push(...F(U));let q=H=>{let V=D.length,E=z("a",e[0].dataType,V,m),M=z("b",12,R.length,g),O=z("scales",e[2].dataType,e[2].dims.length),B=[E,M,O],K=e.length===4?z("zero_points",12,e[3].dims.length):void 0;K&&B.push(K);let ee=U.length,k=N("output",e[0].dataType,ee,y),L=[{name:"output_size",type:"u32"},{name:"block_size",type:"u32"}],G=be(e[0].dataType),ie=(()=>{switch(m){case 1:return`array<${G}, 8>`;case 2:return`mat4x2<${G}>`;case 4:return`mat2x4<${G}>`;default:throw new Error(`${m}-component is not supported.`)}})(),ce=`
        for (var word: u32 = 0; word < ${p}; word += ${g}) {
          ${M.indicesSet("b_indices","2","word")};
          let b_data = ${M.getByIndices("b_indices")};
          for (var i: u32 = 0; i < ${g}; i++) {
            let b_value: u32 = ${g===1?"b_data":"b_data[word + i]"};
            let b_mask: u32 = 0x0F0F0F0Fu;
            let b_value_lower: vec4<u32> = unpack4xU8(b_value & b_mask);
            let b_value_upper: vec4<u32> = unpack4xU8((b_value >> 4) & b_mask);
            let b_quantized_values = ${ie}(${Array.from({length:4},(Ir,Ye)=>`${G}(b_value_lower[${Ye}]), ${G}(b_value_upper[${Ye}])`).join(", ")});
            let b_dequantized_values = ${m===1?`${ie}(${Array.from({length:8},(Ir,Ye)=>`(b_quantized_values[${Ye}] - zero_point) * scale`).join(", ")});`:`(b_quantized_values - ${ie}(${Array(8).fill("zero_point").join(",")})) * scale;`};
            // Number of B elements per 32-bit word is 32/bits = 32/4 = 8
            for (var m: u32 = 0; m < ${b?o:f}u; m++) {
              ${E.indicesSet("a_indices",V-2,b?"m":`row * ${f} + m`)};
              ${E.indicesSet("a_indices",V-1,"word_offset")};
              var input_offset = ${E.indicesToOffset("a_indices")};
              var a_data: ${ie};
              for (var j: u32 = 0; j < ${8/m}; j++) {
                a_data[j] = ${E.getByOffset("input_offset")};
                input_offset++;
              }
              ${b?"workgroup_shared[workgroup_shared_offset + m]":"output_values[m]"}${y>1?"[c]":""} += ${Array.from({length:8/m},(Ir,Ye)=>`${m===1?`a_data[${Ye}] * b_dequantized_values[${Ye}]`:`dot(a_data[${Ye}], b_dequantized_values[${Ye}])`}`).join(" + ")};
            }
            word_offset += ${8/m};
          }
        }`,rt=K?`
          zero_point_offset += 4;
          if (zero_point_offset == 32) {
            zero_point_offset = 0;
            zero_point_index++;
            zero_point_word = ${K.getByOffset("zero_point_index")};
          }`:"";return b?`
        var<workgroup> workgroup_shared: array<${k.type.value}, ${o*a}>;
        ${H.declareVariables(...B,k)}
        ${H.mainStart([a,1,1])}
          var a_indices: ${E.type.indices};
          var block = local_id.x;
          var col = workgroup_id.y;
          var batch = workgroup_id.z;
          ${E.indicesSet("a_indices","0","batch")};
          // Two zero points are packed into one byte when uniforms.bits is 4.
          for (var c: u32 = 0; c < ${y}; c++) {
            let col_times_components_plus_c = col * ${y} + c;
              ${K?`
            var zero_point_bytes_per_col: u32 = (${a} + 1) / 2;
            var zero_point_byte_count: u32 = col_times_components_plus_c * zero_point_bytes_per_col + (block >> 0x1u);
            var zero_point_word_index: u32 = zero_point_byte_count >> 0x2u;
            var zero_point_byte_offset: u32 = zero_point_byte_count & 0x3u;
            var zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32 = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            var zero_point_word: u32 = ${K.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;`:""}
            var b_indices: ${M.type.indices};
            ${M.indicesSet("b_indices","0","col_times_components_plus_c")};
            // The scale and zero points are computed per block.
            var scales_index = col_times_components_plus_c * ${a} + block;
            let scale = ${O.getByOffset("scales_index")};
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${G}(${K?"(zero_point_word) & 0xFu":8});
            ${M.indicesSet("b_indices","1","block")};
            var word_offset: u32 = block * ${t.blockSize/m};
            var workgroup_shared_offset: u32 = block * ${o};
            ${ce}
          }
          workgroupBarrier();
          var output_indices: ${k.type.indices};
          var elements_per_thread: u32 = ${Math.ceil(o/a)};
          ${k.indicesSet("output_indices","0","batch")};
          ${k.indicesSet("output_indices",ee-1,"col")};
          ${k.indicesSet("output_indices",ee-2,"local_id.x * elements_per_thread")};
          var output_offset = ${k.indicesToOffset("output_indices")};
          for (var m: u32 = 0u; m < elements_per_thread; m++) {
            var row = m + local_id.x * elements_per_thread;
            if (row < ${o}) {
              var output_value: ${k.type.value} = ${k.type.value}(0);
              var workgroup_shared_offset: u32 = row;
              for (var b: u32 = 0u; b < ${a}u; b++) {
                output_value += workgroup_shared[workgroup_shared_offset];
                workgroup_shared_offset += ${o};
              }
              ${k.setByOffset("output_offset","output_value")};
              output_offset += ${u/y};
            }
          }
        }`:`
        ${H.registerUniforms(L).declareVariables(...B,k)}
        ${H.mainStart()}
          ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var output_values: array<${k.type.value}, ${f}>;
          var output_indices = ${k.offsetToIndices("global_idx")};
          var col = ${k.indicesGet("output_indices",ee-1)};
          var row = ${k.indicesGet("output_indices",ee-2)};
          var a_indices: ${E.type.indices} = output_indices;
          // Two zero points are packed into one byte because uniforms.bits <= 4.
          // zero_point_offset is either 0 or 4. It is bit offset within one byte.
          // TODO support zero_point_offset for bits > 4
          ${K?`
          var zero_point_abs_offset = col * ${y} * ((${a} + 1) / 2);
          var zero_point_index: u32 = zero_point_abs_offset / 4;
          var zero_point_word: u32 = ${K.getByOffset("zero_point_index")};
          var zero_point_offset: u32 = (zero_point_abs_offset % 4) * 8;`:""}
          var scale_index = col * ${a*y};
          var b_indices: ${M.type.indices};
          for (var c: u32 = 0; c < ${y}; c++) {
            ${M.indicesSet("b_indices","0",`col * ${y} + c`)};
            var block_offset: u32 = 0;
            for (var block: u32 = 0; block < ${a}; block++) {
              // The scale and zero points are computed per block.
              let scale = ${O.getByOffset("scale_index")};
              // The default zero point is 8 for unsigned 4-bit quantization.
              let zero_point = ${G}(${K?"extractBits(zero_point_word, zero_point_offset, 4)":8});
              ${M.indicesSet("b_indices","1","block")};
              var word_offset: u32 = block_offset;
              ${ce}
              scale_index++;
              ${rt}
              block_offset += uniforms.block_size / ${m};
            }
            // Drop the trailing 4 bits if the zero_poit_offset is not a byte boundary to align with the next byte.
            ${K?`if (zero_point_offset % 8 > 0) {
                ${rt}
              }`:""}
            }
            for (var k: u32 = 0u; k < ${f}u; k++) {
              ${k.indicesSet("output_indices",ee-2,`${f} * row + k`)};
              ${k.setByIndices("output_indices","output_values[k]")}
            }
        }`};return{name:b?"BlockwiseMatMulNBits":"MatMulNBits",shaderCache:{hint:`${t.cacheKey};${o};${h};${e.length}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:S,dataType:h}],name:b?"BlockwiseMatMulNBits":"MatMulNBits",dispatchGroup:b?{x:1,y:Math.ceil(u/y),z:c}:{x:Math.ceil(x/64)},programUniforms:I}),getShaderSource:q}},xd=(e,t)=>{vd(e.inputs,t);let r=e.getMaxComputeWorkgroupSizes(),n=e.getMaxComputeWorkgroupStoragesize();e.compute($d(e.inputs,t,r,n))},kd=e=>ae(e)}),Sd,Ed,Td,Id,Md,Cd,zd,Ad,Pd,hm=A(()=>{j(),J(),Y(),Sd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Ed=(e,t,r)=>{let n="";for(let s=t-1;s>=0;--s)n+=`
            k = i32(${e.indicesGet("indices",s)}) - ${Q("uniforms.pads",s,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Q("uniforms.x_shape",s,t)})) {
              break;
            }
            offset += k * i32(${Q("uniforms.x_strides",s,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},Td=(e,t,r)=>{let n="";for(let s=t-1;s>=0;--s)n+=`
                k = i32(${e.indicesGet("indices",s)}) - ${Q("uniforms.pads",s,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Q("uniforms.x_shape",s,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Q("uniforms.x_shape",s,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Q("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Id=(e,t,r)=>{let n="";for(let s=t-1;s>=0;--s)n+=`
                k = i32(${e.indicesGet("indices",s)}) - ${Q("uniforms.pads",s,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Q("uniforms.x_shape",s,t)})) {
                  k = i32(${Q("uniforms.x_shape",s,t)}) - 1;
                }
                offset += k * i32(${Q("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Md=(e,t,r)=>{let n="";for(let s=t-1;s>=0;--s)n+=`
                k = i32(${e.indicesGet("indices",s)}) - ${Q("uniforms.pads",s,r)};
                if (k < 0)  {
                  k += i32(${Q("uniforms.x_shape",s,t)}]);
                }
                if (k >= i32(${Q("uniforms.x_shape",s,t)})) {
                  k -= i32(${Q("uniforms.x_shape",s,t)});
                }
                offset += k * i32(${Q("uniforms.x_strides",s,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Cd=(e,t,r)=>{switch(r.mode){case 0:return Ed(e,t,r.pads.length);case 1:return Td(e,t,r.pads.length);case 2:return Id(e,t,r.pads.length);case 3:return Md(e,t,r.pads.length);default:throw new Error("Invalid mode")}},zd=(e,t)=>{let r=C.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,s=C.size(r),i=[{type:12,data:s},{type:6,data:t.pads}];t.mode===0&&i.push({type:e[0].dataType,data:t.value}),i.push(...F(e[0].dims,r));let a=["rank"],o=l=>{let u=N("output",e[0].dataType,r.length),d=z("x",e[0].dataType,n.length),c=d.type.value,p=Cd(u,n.length,t),h=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&h.push({name:"constant_value",type:c}),`
            ${l.registerUniforms(h).declareVariables(d,u)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${u.offsetToIndices("global_idx")};

            var value = ${c}(0);
            ${p}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(r)/64)},programUniforms:i}),getShaderSource:o}},Ad=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].getFloat32Array()[0]:0,s=e[0].dims.length,i=new Int32Array(2*s).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let l=0;l<o.length;l++)i[Number(o[l])]=Number(r[l]),i[Number(o[l])+s]=Number(r[l+o.length])}else r.forEach((o,l)=>i[Number(l)]=Number(o));let a=[];return i.forEach(o=>a.push(o)),{mode:t.mode,value:n,pads:a}}else return t},Pd=(e,t)=>{Sd(e.inputs);let r=Ad(e.inputs,t);e.compute(zd(e.inputs,r),{inputs:[0]})}}),tr,Ws,Hs,Ks,Qs,Od,Bd,Xs,Ys,Rd,Dd,Zs,Ld,Fd,Js,Nd,Ud,qd,Gd,fm=A(()=>{Ue(),j(),J(),Y(),tr=e=>{if(se.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Ws=(e,t,r)=>{let n=t.format==="NHWC",s=e.dims.slice();n&&s.splice(1,0,s.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),o=t.strides.slice(),l=i?t.dilations.slice():[],u=t.pads.slice();Wr.adjustPoolAttributes(r,s,a,o,l,u);let d=Wr.computePoolOutputShape(r,s,o,l,a,u,t.autoPad),c=Object.assign({},t);i?Object.assign(c,{kernelShape:a,strides:o,pads:u,dilations:l,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:a,strides:o,pads:u,cacheKey:t.cacheKey});let p=d.slice();return p.push(p.splice(1,1)[0]),[c,n?p:d]},Hs=(e,t)=>{let r=t.format==="NHWC",n=C.size(e),s=C.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:s}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],u=t.pads[t.pads.length/2-1],d=t.pads[t.pads.length-1],c=!!(u+d);i.push({type:12,data:o},{type:12,data:l},{type:12,data:u},{type:12,data:d}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){let h=t.kernelShape[t.kernelShape.length-2],f=t.strides[t.strides.length-2],m=t.pads[t.pads.length/2-2],g=t.pads[t.pads.length-2];p=!!(m+g),i.push({type:12,data:h},{type:12,data:f},{type:12,data:m},{type:12,data:g}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,c,p]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=C.computeStrides(t.kernelShape);i.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((u,d)=>u+d);return[i,a,!!l,!1,!1]}},Ks=(e,t,r,n,s,i,a,o,l,u,d,c)=>{let p=s.format==="NHWC",h=t.type.value,f=N("output",t.type.tensor,n);if(s.kernelShape.length<=2){let m="",g="",w="",_=r-(p?2:1);if(d?m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${_}] < 0 || xIndices[${_}]
                      >= uniforms.x_shape[${_}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,s.kernelShape.length===2){let v=r-(p?3:2);c?g=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${v}] < 0 || xIndices[${v}] >= uniforms.x_shape[${v}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:g=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sh - uniforms.phStart + j;
                `,w=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var value = ${h}(${o});
              var pad = 0;
              ${g}
              ${m}
              ${w}
              ${a}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let m=s.kernelShape.length,g=s.pads.length,w="";return u?w=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:w=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(l).declareVariables(t,f)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var offsets: array<u32, ${m}>;

              var value = ${h}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${m-1}u; j++) {
                  offsets[j] = offset / ${Q("uniforms.kernelStrides","j",m)};
                  offset -= offsets[j] * ${Q("uniforms.kernelStrides","j",m)};
                }
                offsets[${m-1}] = offset;

                isPad = false;
                for (var j = ${r-m}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Q("uniforms.strides",`j - ${r-m}u`,m)}
                    + offsets[j - ${r-m}u] - ${Q("uniforms.pads","j - 2u",g)};
                  ${w}
              }
              ${a}

              output[global_idx] = value;
            }`}},Qs=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Od=e=>`${Qs(e)};${e.countIncludePad}`,Bd=e=>`${Qs(e)};${e.storageOrder};${e.dilations}`,Xs=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Ys=(e,t,r,n)=>{let[s,i]=Ws(t,n,r),a=z("x",t.dataType,t.dims.length),o=a.type.value,l="value += x_val;",u="";s.countIncludePad?u+=`value /= ${o}(uniforms.kernelSize);`:u+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[d,c,p,h,f]=Hs(i,s);d.push(...F(t.dims,i));let m=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${p};${h};${f}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:d}),getShaderSource:g=>Ks(g,a,t.dims.length,i.length,s,l,u,0,c,p,h,f)}},Rd=e=>{let t=e.count_include_pad!==0,r=Xs(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Od(n)}},Dd=(e,t)=>{tr(e.inputs),e.compute(Ys("AveragePool",e.inputs[0],!1,t))},Zs={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Ld=e=>{let t=e.format;return{format:t,...Zs,cacheKey:t}},Fd=(e,t)=>{tr(e.inputs),e.compute(Ys("GlobalAveragePool",e.inputs[0],!0,t))},Js=(e,t,r,n)=>{let[s,i]=Ws(t,n,r),a=`
      value = max(x_val, value);
    `,o="",l=z("x",t.dataType,t.dims.length),u=["rank"],[d,c,p,h,f]=Hs(i,s);return d.push(...F(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${p};${h};${f}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(C.size(i)/64)},programUniforms:d}),getShaderSource:m=>Ks(m,l,t.dims.length,i.length,s,a,o,t.dataType===10?-65504:-1e5,c,p,h,f)}},Nd=(e,t)=>{tr(e.inputs),e.compute(Js("MaxPool",e.inputs[0],!1,t))},Ud=e=>{let t=e.storage_order,r=e.dilations,n=Xs(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let s={storageOrder:t,dilations:r,...n,cacheKey:""};return{...s,cacheKey:Bd(s)}},qd=e=>{let t=e.format;return{format:t,...Zs,cacheKey:t}},Gd=(e,t)=>{tr(e.inputs),e.compute(Js("GlobalMaxPool",e.inputs[0],!0,t))}}),Vd,jd,Wd,mm=A(()=>{Ue(),j(),Y(),Vd=(e,t,r)=>{let n=e===t,s=e<t&&r<0,i=e>t&&r>0;if(n||s||i)throw new Error("Range these inputs' contents are invalid.")},jd=(e,t,r,n)=>{let s=Math.abs(Math.ceil((t-e)/r)),i=[s],a=s,o=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...F(i)],l=u=>{let d=N("output",n,i.length),c=d.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${u.registerUniforms(p).declareVariables(d)}
        ${u.mainStart()}
        ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o})}},Wd=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),se.webgpu.validateInputContent&&Vd(t,r,n),e.compute(jd(t,r,n,e.inputs[0].dataType),{inputs:[]})}}),Hd,Kd,Qd,Xd,Yd,Zd,Jd,ec,tc,rc,nc,ei,sc,ic,ac,oc,lc,uc,dc,gm=A(()=>{j(),J(),we(),Y(),Hd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Kd=(e,t,r)=>{t.every(s=>s>=0&&s<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((s,i)=>n[s]=e[i]),n},Qd=(e,t,r,n,s,i)=>{let[a,o,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],u=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(d=>i.push(d));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length>0){if(e[o].getFloat32Array().forEach(d=>n.push(d)),n.length!==0&&n.length!==u&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Hd(n,t),t.axes.length>0&&Kd(n,t.axes,u).forEach((d,c)=>n[c]=d)}if(l>0&&e.length>l&&(e[l].getBigInt64Array().forEach(d=>s.push(Number(d))),s.length!==u||r>=18&&s.length===t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(s.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof s<"u"&&n.length>0&&s.length>u)throw new Error("Resize requires only of scales or sizes to be specified")},Xd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`return ${t}(xResized) / ${t}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${t}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${t}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${t}(lengthResized - 1);
                    return whole + fract;
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Yd=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Zd=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),s=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=s[a],n[a+r]=s[t.length+a]}),n):s},Jd=(e,t,r,n)=>{let s=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>s.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>s[i]=r[a])}else r.forEach(i=>s.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");s=e.map((i,a)=>Math.round(i*t[a]))}return s},ec=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let s=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>s[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),s.forEach((i,a)=>s[a]=Math.round(i*t[a]))),s},tc=(e,t,r,n,s)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Q("uniforms.scales","i",n)};
        var roi_low = ${Q("uniforms.roi","i",s)};
        var roi_hi = ${Q("uniforms.roi",`i + ${t.length}`,s)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Q("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,rc=(e,t,r,n,s,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Q("uniforms.scales","i",s)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Q("uniforms.roi","i",i)};
          var roi_hi = ${Q("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${Q("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,nc=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Q("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ei=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",sc=(e,t,r,n,s)=>{let[i,a,o,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${ei(e,l,i,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${u} = originalIndices[${a}];
      var col:${u} = originalIndices[${o}];
      ${n?`if (row < 0 || row > (${r[a]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${s};
      }`:""};
      row = max(0, min(row, ${r[a]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${i}])`:"0"};
      var x11: ${u} = getInputValue(batch, channel, row1, col1);
      var x12: ${u} = getInputValue(batch, channel, row1, col2);
      var x21: ${u} = getInputValue(batch, channel, row2, col1);
      var x22: ${u} = getInputValue(batch, channel, row2, col2);
      var dx1: ${u} = abs(row - ${u}(row1));
      var dx2: ${u} = abs(${u}(row2) - row);
      var dy1: ${u} = abs(col - ${u}(col1));
      var dy2: ${u} = abs(${u}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},ic=(e,t,r,n,s,i,a,o,l,u)=>{let d=r.length===2,[c,p]=d?[0,1]:[2,3],h=e.type.value,f=m=>{let g=m===c?"row":"col";return`
      fn ${g}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${h} {
        var output_index = ${t.indicesGet("output_indices",m)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${s[m]},
        ${n[m]}, ${r[m]}, ${i[m]}, ${i[m]} + ${r.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[m]} - 1))) {
          return ${l};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${g}: ${h} = originalIdx + ${h}(i);
          if (${g} < 0 || ${g} >= ${r[m]}) {
            ${u?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${l};`:`${g} = max(0, min(${g}, ${r[m]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",m,`u32(${g})`)};
          data[i + 1] = ${m===c?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(c)};
    ${f(p)};
  fn getCubicInterpolationCoefs(s: ${h}) -> array<${h}, 4> {
    var absS = abs(s);
    var coeffs: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${h} = 1.0 - absS;
    var twoMinusAbsS: ${h} = 2.0 - absS;
    var onePlusAbsS: ${h} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${h}, 4>, coefs: array<${h}, 4>) -> ${h} {
    var coefsSum: ${h} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${h} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},ac=(e,t,r,n,s)=>{let[i,a,o,l,u]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${ei(e,u,i,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${a}];
      var height:${d} = originalIndices[${o}];
      var width:${d} = originalIndices[${l}];
      ${n?`if (depth < 0 || depth > (${r[a]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${s};
        }`:""};

    depth = max(0, min(depth, ${r[a]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${i}])`:"0"};

      var x111: ${d} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${d} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${d} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${d} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${d} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${d} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${d} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${d} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${d} = abs(depth - ${d}(depth1));
      var dx2: ${d} = abs(${d}(depth2) - depth);
      var dy1: ${d} = abs(height - ${d}(height1));
      var dy2: ${d} = abs(${d}(height2) - height);
      var dz1: ${d} = abs(width - ${d}(width1));
      var dz2: ${d} = abs(${d}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},oc=(e,t,r,n,s,i)=>{let a=e.dims,o=Zd(i,t.axes,a.length),l=Jd(a,n,s,t.axes),u=n.slice();n.length===0&&(u=a.map((_,v)=>_===0?1:l[v]/_),t.keepAspectRatioPolicy!=="stretch"&&(l=ec(a,u,t)));let d=N("output",e.dataType,l.length),c=z("input",e.dataType,a.length),p=C.size(l),h=a.length===l.length&&a.every((_,v)=>_===l[v]),f=t.coordinateTransformMode==="tf_crop_and_resize",m=t.extrapolationValue,g=c.type.value,w=_=>`
      ${h?"":`
      ${Xd(t.coordinateTransformMode,g)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${nc(c,a)};
              ${Yd(t.nearestMode,r,g)};
              ${rc(c,d,a,l,u.length,o.length,f)};
              `;case"linear":return`
              ${tc(d,a,l,u.length,o.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${sc(c,d,a,f,m)}`;if(a.length===3||a.length===5)return`${ac(c,d,a,f,m)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${ic(c,d,a,l,u,o,t.cubicCoeffA,f,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${_.registerUniform("output_size","u32").registerUniform("scales","f32",u.length).registerUniform("roi","f32",o.length).declareVariables(c,d)}
      ${_.mainStart()}
        ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${u.length>0?u:""}|${s.length>0?s:""}|${o.length>0?o:""}|${h}|${a}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:u},{type:1,data:o},...F(a,l)]})}},lc=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},uc=(e,t)=>{let r=[],n=[],s=[],i=lc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Qd(e.inputs,t,i,r,n,s),e.compute(oc(e.inputs[0],t,i,r,n,s),{inputs:[0]})},dc=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,s=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,o=e.keepAspectRatioPolicy,l=e.mode,u=e.nearestMode===""?"simple":e.nearestMode;return ae({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:s,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:o,mode:l,nearestMode:u})}}),cc,pc,hc,_m=A(()=>{j(),J(),we(),Y(),cc=(e,t)=>{let[r,n,s,i]=e,{numHeads:a,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!C.areEqual(n.dims,[])&&!C.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!C.areEqual(s.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],u=r.dims[r.dims.length-2],d=s.dims[0],c=C.sizeFromDimension(r.dims,1)/u,p=o===0?s.dims[1]*2:c/a;if(o>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(u!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(p/2!==s.dims[1]&&o/2!==s.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${s.dims[1]}`);if(u>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},pc=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:s,scale:i}=t,a=e[0].dims[0],o=C.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],u=o/l,d=e[2].dims[1],c=s===0?d*2:u/n,p=new Array(a,l,u/c,c-d),h=C.computeStrides(p),f=[{type:1,data:i},{type:12,data:p},{type:12,data:h},...e[0].dims.length===3?new Array({type:12,data:[o,u,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,c,l*c,1]}):[],...F(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],m=g=>{let w=z("input",e[0].dataType,e[0].dims.length),_=z("position_ids",e[1].dataType,e[1].dims.length),v=z("cos_cache",e[2].dataType,e[2].dims.length),b=z("sin_cache",e[3].dataType,e[3].dims.length),y=N("output",e[0].dataType,e[0].dims.length);return g.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${g.declareVariables(w,_,v,b,y)}

        ${g.mainStart(Bt)}
          let half_rotary_emb_dim = uniforms.${v.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${_.broadcastedIndicesToOffset("bsnh.xy",N("",_.type.tensor,2))};
            let position_id =
                u32(${_.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${w.getByOffset("i")} * ${v.get("position_id","bsnh[3]")} -
                ${w.getByOffset("j")} * ${b.get("position_id","bsnh[3]")};
            ${y.setByOffset("i","re")}
            let im = ${w.getByOffset("i")} * ${b.get("position_id","bsnh[3]")} +
                ${w.getByOffset("j")} * ${v.get("position_id","bsnh[3]")};
            ${y.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${y.setByOffset("k",w.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:ae({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(p)/Bt)},programUniforms:f})}},hc=(e,t)=>{cc(e.inputs,t),e.compute(pc(e.inputs,t))}}),fc,mc,gc,wm=A(()=>{j(),J(),Y(),fc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let s=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==s)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==s)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==s)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==s)throw new Error("Bias must have the same hidden size as input")}},mc=(e,t,r,n)=>{let s=t.simplified,i=e[0].dims,a=C.size(i),o=i,l=a,u=i.slice(-1)[0],d=n?i.slice(0,-1).concat(1):[],c=!s&&e.length>3,p=e.length>4,h=n&&r>1,f=n&&r>2,m=r>3,g=64,w=_e(u),_=[{type:12,data:l},{type:12,data:w},{type:12,data:u},{type:1,data:t.epsilon}],v=y=>{let S=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],x=[z("x",e[0].dataType,e[0].dims,w),z("skip",e[1].dataType,e[1].dims,w),z("gamma",e[2].dataType,e[2].dims,w)];c&&x.push(z("beta",e[3].dataType,e[3].dims,w)),p&&x.push(z("bias",e[4].dataType,e[4].dims,w)),x.push(N("output",e[0].dataType,o,w)),h&&x.push(N("mean_output",1,d)),f&&x.push(N("inv_std_output",1,d)),m&&x.push(N("input_skip_bias_sum",e[0].dataType,o,w));let I=be(e[0].dataType),D=be(1,w);return`

      ${y.registerUniforms(S).declareVariables(...x)}
      var<workgroup> sum_shared : array<${D}, ${g}>;
      var<workgroup> sum_squared_shared : array<${D}, ${g}>;

      ${y.mainStart([g,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${g};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${g};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${g-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p?"bias[offset1d + i]":I+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Rt(I,w,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${g};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${dt("sum",w)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${dt("square_sum",w)} / f32(uniforms.hidden_size) ${s?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${f?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${s?"":`- ${I}(mean)`}) *
            ${I}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},b=[{dims:o,dataType:e[0].dataType}];return r>1&&b.push({dims:d,dataType:1}),r>2&&b.push({dims:d,dataType:1}),r>3&&b.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${w};${h};${f};${m}`,inputDependencies:e.map((y,S)=>"type")},getShaderSource:v,getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/u)},programUniforms:_})}},gc=(e,t)=>{fc(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(mc(e.inputs,t,e.outputCount,!1),{outputs:r})}}),_c,rr,wc,ti,yc,bc,vc,$c,ym=A(()=>{j(),J(),we(),Y(),_c=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},rr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},wc=(e,t)=>{if(e.length>1){let r=rr(e,1),n=rr(e,2),s=rr(e,3);return s.length===0&&(s=[...Array(e[0].dims.length).keys()]),ae({starts:r,ends:n,axes:s})}else return t},ti=(e,t,r,n,s)=>{let i=e;return e<0&&(i+=r[n[t]]),s[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},yc=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${Q("uniforms.input_shape","i",r.length)};
            let steps_i = ${Q("uniforms.steps","i",r.length)};
            let signs_i = ${Q("uniforms.signs","i",r.length)};
            let starts_i = ${Q("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,bc=(e,t)=>{let r=e[0].dims,n=C.size(r),s=t.axes.length>0?C.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=rr(e,4);i.forEach(w=>w!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(s.length).fill(1));let a=t.starts.map((w,_)=>ti(w,_,r,s,i)),o=t.ends.map((w,_)=>ti(w,_,r,s,i));if(s.length!==a.length||s.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(s.length!==r.length)for(let w=0;w<r.length;++w)s.includes(w)||(a.splice(w,0,0),o.splice(w,0,r[w]),i.splice(w,0,1));let l=i.map(w=>Math.sign(w));i.forEach((w,_,v)=>{if(w<0){let b=(o[_]-a[_])/w,y=a[_],S=y+b*i[_];a[_]=S,o[_]=y,v[_]=-w}});let u=r.slice(0);s.forEach((w,_)=>{u[w]=Math.ceil((o[w]-a[w])/i[w])});let d={dims:u,dataType:e[0].dataType},c=N("output",e[0].dataType,u.length),p=z("input",e[0].dataType,e[0].dims.length),h=C.size(u),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:i.length}],m=[{type:12,data:h},{type:12,data:a},{type:6,data:l},{type:12,data:i},...F(e[0].dims,u)],g=w=>`
      ${w.registerUniforms(f).declareVariables(p,c)}
        ${yc(p,c,r)}
        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:m})}},vc=(e,t)=>{_c(e.inputs,t);let r=wc(e.inputs,t);e.compute(bc(e.inputs,r),{inputs:[0]})},$c=e=>{let t=e.starts,r=e.ends,n=e.axes;return ae({starts:t,ends:r,axes:n})}}),xc,kc,Sc,Ec,bm=A(()=>{j(),J(),we(),Y(),xc=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},kc=(e,t)=>{let r=e.dims,n=C.size(r),s=64,i=t.axis;if(i<0&&(i=r.length+i),i<r.length-1)throw new Error("softmax only supports last axis for now.");let a=r[i],o=n/a,l=_e(a),u=a/l,d=(g,w)=>w===4?`max(max(${g}.x, ${g}.y), max(${g}.z, ${g}.w))`:w===2?`max(${g}.x, ${g}.y)`:w===3?`max(max(${g}.x, ${g}.y), ${g}.z)`:g,c=z("x",e.dataType,e.dims,l),p=N("result",e.dataType,e.dims,l),h=c.type.value,f=be(e.dataType)==="f32"?`var threadMax = ${h}(-3.402823e+38f);`:`var threadMax = ${h}(-65504.0h);`,m=g=>`
      var<workgroup> rowMaxShared : ${h};
      var<workgroup> rowSumShared : ${h};
      var<workgroup> threadShared : array<${h}, ${s}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${h} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${h}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${g.registerUniform("packedCols","i32").declareVariables(c,p)}
      ${g.mainStart()}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${s};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${f}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${h}(${d("threadShared[0]",l)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${h}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${h}(${dt("threadShared[0]",l)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${l}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.dataType}],dispatchGroup:{x:o},programUniforms:[{type:6,data:u}]}),getShaderSource:m}},Sc=(e,t)=>{xc(e.inputs),e.compute(kc(e.inputs[0],t))},Ec=e=>ae({axis:e.axis})}),Tc,Ic,Mc,Cc,zc,Ac,Pc,vm=A(()=>{j(),J(),we(),Y(),Tc=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ic=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(s=>r.push(Number(s))),n=r.length),ae({numOutputs:n,axis:t.axis,splitSizes:r})},Mc=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Q("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Cc=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let s=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(s):n===0?r.push(`if (output_number == ${n}u) { ${s} }`):n===t-1?r.push(`else { ${s} }`):r.push(`else if (output_number == ${n}) { ${s} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},zc=(e,t)=>{let r=e[0].dims,n=C.size(r),s=e[0].dataType,i=C.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),o=z("input",s,r.length),l=new Array(t.numOutputs),u=[],d=[],c=0,p=[{type:12,data:n}];for(let f=0;f<t.numOutputs;f++){c+=t.splitSizes[f],l[f]=c;let m=r.slice();m[t.axis]=t.splitSizes[f],d.push(m),a[f]=N(`output${f}`,s,m.length),u.push({dims:d[f],dataType:e[0].dataType})}p.push({type:12,data:l},...F(r,...d));let h=f=>`
  ${f.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...a)}
  ${Mc(l.length)}
  ${Cc(a)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Q("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:u,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p})}},Ac=(e,t)=>{Tc(e.inputs);let r=e.inputs.length===1?t:Ic(e.inputs,t);e.compute(zc(e.inputs,r),{inputs:[0]})},Pc=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return ae({axis:t,numOutputs:n,splitSizes:r})}}),Oc,Bc,Rc,$m=A(()=>{j(),J(),Y(),Oc=(e,t,r,n,s)=>{let i=N("output_data",s,r.length,4),a=z("a_data",t[1].dataType,t[1].dims.length,4),o=z("b_data",t[2].dataType,t[2].dims.length,4),l=z("c_data",t[0].dataType,t[0].dims.length,4),u,d=(c,p,h)=>`select(${p}, ${c}, ${h})`;if(!n)u=i.setByOffset("global_idx",d(a.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let c=(p,h,f="")=>{let m=`a_data[index_a${h}][component_a${h}]`,g=`b_data[index_b${h}][component_b${h}]`,w=`bool(c_data[index_c${h}] & (0xffu << (component_c${h} * 8)))`;return`
            let output_indices${h} = ${i.offsetToIndices(`global_idx * 4u + ${h}u`)};
            let offset_a${h} = ${a.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let offset_b${h} = ${o.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let offset_c${h} = ${l.broadcastedIndicesToOffset(`output_indices${h}`,i)};
            let index_a${h} = offset_a${h} / 4u;
            let index_b${h} = offset_b${h} / 4u;
            let index_c${h} = offset_c${h} / 4u;
            let component_a${h} = offset_a${h} % 4u;
            let component_b${h} = offset_b${h} % 4u;
            let component_c${h} = offset_c${h} % 4u;
            ${p}[${h}] = ${f}(${d(m,g,w)});
          `};s===9?u=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:u=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,a,o,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${u}
      }`},Bc=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,s=e[1].dataType,i=!(C.areEqual(t,r)&&C.areEqual(r,n)),a=t,o=C.size(t);if(i){let u=Ot.calcShape(Ot.calcShape(t,r,!1),n,!1);if(!u)throw new Error("Can't perform where op on the given tensors");a=u,o=C.size(a)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:u=>Oc(u,e,a,i,s),getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...F(n,t,r,a)]})}},Rc=e=>{e.compute(Bc(e.inputs))}}),Dc,xm=A(()=>{jf(),bs(),Wf(),Hf(),Kf(),Qf(),Lo(),uu(),em(),tm(),rm(),nm(),sm(),im(),am(),om(),lm(),um(),dm(),cm(),iu(),pm(),id(),hm(),fm(),mm(),_s(),gm(),_m(),wm(),ym(),bm(),vm(),ud(),Dt(),ks(),$m(),Dc=new Map([["Abs",[Jo]],["Acos",[el]],["Acosh",[tl]],["Add",[Fl]],["ArgMax",[Ao,ys]],["ArgMin",[zo,ys]],["Asin",[rl]],["Asinh",[nl]],["Atan",[sl]],["Atanh",[il]],["Attention",[Vo]],["AveragePool",[Dd,Rd]],["BatchNormalization",[Ko]],["BiasAdd",[Yo]],["BiasSplitGelu",[Rl]],["Cast",[ol,al]],["Ceil",[dl]],["Clip",[ul]],["Concat",[Ro,Do]],["Conv",[Bs,Os]],["ConvTranspose",[vu,gu]],["Cos",[cl]],["Cosh",[pl]],["CumSum",[xu,ku]],["DepthToSpace",[Iu,Mu]],["Div",[Nl]],["Einsum",[Bu,Ru]],["Elu",[hl,Yr]],["Equal",[Ul]],["Erf",[fl]],["Exp",[ml]],["Expand",[Nu]],["FastGelu",[qu]],["Floor",[gl]],["FusedConv",[Bs,Os]],["Gather",[Wu,ju]],["GatherElements",[Xu,Qu]],["Gelu",[_l]],["Gemm",[ed,Ju]],["GlobalAveragePool",[Fd,Ld]],["GlobalMaxPool",[Gd,qd]],["Greater",[jl]],["GreaterOrEqual",[Hl]],["GroupQueryAttention",[hd,cd]],["HardSigmoid",[Sl,kl]],["InstanceNormalization",[_d]],["LayerNormalization",[bd]],["LeakyRelu",[wl,Yr]],["Less",[Wl]],["LessOrEqual",[Kl]],["Log",[Pl]],["MatMul",[su]],["MatMulNBits",[xd,kd]],["MaxPool",[Nd,Ud]],["Mul",[ql]],["MultiHeadAttention",[sd,rd]],["Neg",[bl]],["Not",[yl]],["Pad",[Pd]],["Pow",[Gl]],["Range",[Wd]],["Reciprocal",[vl]],["ReduceMin",[Eo]],["ReduceMean",[vo]],["ReduceMax",[So]],["ReduceSum",[Io]],["ReduceProd",[To]],["ReduceL1",[$o]],["ReduceL2",[xo]],["ReduceLogSum",[Co]],["ReduceLogSumExp",[ko]],["ReduceSumSquare",[Mo]],["Relu",[$l]],["Resize",[uc,dc]],["RotaryEmbedding",[hc]],["Sigmoid",[xl]],["Sin",[El]],["Sinh",[Tl]],["Slice",[vc,$c]],["SkipLayerNormalization",[gc]],["Split",[Ac,Pc]],["Sqrt",[Il]],["Softmax",[Sc,Ec]],["Sub",[Vl]],["Tan",[Ml]],["Tanh",[Cl]],["ThresholdedRelu",[Al,Yr]],["Tile",[ld]],["Transpose",[Ua,qa]],["Where",[Rc]]])}),Lc,km=A(()=>{Ue(),vt(),Y(),Lc=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,n,s){Ne(e.programInfo.name);let i=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let u of t)o.push({binding:o.length,resource:{buffer:u.buffer}});for(let u of r)o.push({binding:o.length,resource:{buffer:u.buffer}});s&&o.push({binding:o.length,resource:s});let l=i.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let u={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(u)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...n),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Re(e.programInfo.name)}dispose(){}build(e,t){Ne(e.name);let r=this.backend.device,n=[];r.features.has("shader-f16")&&n.push("enable f16;");let s=Da(t,this.backend.device.limits),i=e.getShaderSource(s),a=`${n.join(`
`)}
${s.additionalImplementations}
${i}`,o=r.createShaderModule({code:a,label:e.name});fe("verbose",()=>`[WebGPU] ${e.name} shader code: ${a}`);let l=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return Re(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,n=typeof e=="number"?1:e.z||1,s=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=s&&r<=s&&n<=s)return[t,r,n];let i=t*r*n,a=Math.ceil(Math.sqrt(i));if(a>s){if(a=Math.ceil(Math.cbrt(i)),a>s)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}}),Fc,Nc,Uc,qc,Sm=A(()=>{Ue(),j(),vt(),qf(),Gf(),xm(),km(),Fc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let s=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${s}`);break}case"rank":{let i=e[n].dims.length;r.push(`${s};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${s};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Nc=(e,t,r)=>{var s,i;let n=e.name;return(s=e.shaderCache)!=null&&s.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Fc(t,((i=e.shaderCache)==null?void 0:i.inputDependencies)??new Array(t.length).fill("dims"))}`,n},Uc=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},qc=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r};t.features.has("chromium-experimental-timestamp-query-inside-passes")?r.push("chromium-experimental-timestamp-query-inside-passes"):t.features.has("timestamp-query")&&r.push("timestamp-query"),t.features.has("shader-f16")&&r.push("shader-f16"),this.device=await t.requestDevice(n),this.adapterInfo=new Uc(await t.requestAdapterInfo()),this.gpuDataManager=Aa(this),this.programManager=new Lc(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ea(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ne(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{var n;let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let s=0;s<t.length/2;s++){let i=r[s],a=i.kernelId,o=this.kernels.get(a),l=o.kernelType,u=o.kernelName,d=i.programName,c=i.inputTensorViews,p=i.outputTensorViews,h=t[s*2],f=t[s*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let m=Number(h-this.queryTimeBase),g=Number(f-this.queryTimeBase);if(!Number.isSafeInteger(m)||!Number.isSafeInteger(g))throw new RangeError("incorrect timestamp range");if((n=this.env.webgpu.profiling)!=null&&n.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(w=>({dims:w.dims,dataType:bt(w.dataType)})),outputsMetadata:p.map(w=>({dims:w.dims,dataType:bt(w.dataType)})),kernelId:a,kernelType:l,kernelName:u,programName:d,startTime:m,endTime:g});else{let w="";c.forEach((v,b)=>{w+=`input[${b}]: [${v.dims}] | ${bt(v.dataType)}, `});let _="";p.forEach((v,b)=>{_+=`output[${b}]: [${v.dims}] | ${bt(v.dataType)}, `}),console.log(`[profiling] kernel "${a}|${l}|${u}|${d}" ${w}${_}execution time: ${g-m} ns`)}Kt("GPU",`${d}::${h}::${f}`)}e.unmap(),this.pendingQueries.delete(e)}),Re()}run(e,t,r,n,s,i){Ne(e.name);let a=[];for(let _=0;_<t.length;++_){let v=t[_].data;if(v===0)continue;let b=this.gpuDataManager.get(v);if(!b)throw new Error(`no GPU data for input: ${v}`);a.push(b)}let{outputs:o,dispatchGroup:l,programUniforms:u}=e.getRunData(t),d=r.length===0?o.map((_,v)=>v):r;if(d.length!==o.length)throw new Error(`Output size ${d.length} must be equal to ${o.length}.`);let c=[],p=[];for(let _=0;_<o.length;++_){if(!Number.isInteger(d[_])||d[_]<-3||d[_]>=i)throw new Error(`Invalid output index: ${d[_]}`);if(d[_]===-3)continue;let v=d[_]===-1,b=d[_]===-2,y=v||b?s(o[_].dataType,o[_].dims):n(d[_],o[_].dataType,o[_].dims);if(c.push(y),y.data===0)continue;let S=this.gpuDataManager.get(y.data);if(!S)throw new Error(`no GPU data for output: ${y.data}`);if(v&&this.temporaryData.push(S),b){let x=this.kernelPersistentData.get(this.currentKernelId);x||(x=[],this.kernelPersistentData.set(this.currentKernelId,x)),x.push(S)}p.push(S)}if(a.length!==t.length||p.length!==c.length){if(p.length===0)return Re(e.name),c;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let h;if(u){let _=0,v=[];u.forEach(x=>{let I=typeof x.data=="number"?[x.data]:x.data;if(I.length===0)return;let D=x.type===10?2:4,R,U;x.type===10?(U=I.length>4?16:I.length>2?8:I.length*D,R=I.length>4?16:D*I.length):(U=I.length<=2?I.length*D:16,R=16),_=Math.ceil(_/U)*U,v.push(_);let q=x.type===10?8:4;_+=I.length>4?Math.ceil(I.length/q)*R:I.length*D});let b=16;_=Math.ceil(_/b)*b;let y=new ArrayBuffer(_);u.forEach((x,I)=>{let D=v[I],R=typeof x.data=="number"?[x.data]:x.data;if(x.type===6)new Int32Array(y,D,R.length).set(R);else if(x.type===12)new Uint32Array(y,D,R.length).set(R);else if(x.type===10)new Uint16Array(y,D,R.length).set(R);else if(x.type===1)new Float32Array(y,D,R.length).set(R);else throw new Error(`Unsupported uniform type: ${bt(x.type)}`)});let S=this.gpuDataManager.create(_,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(S.buffer,0,y,0,_),this.gpuDataManager.release(S.id),h={offset:0,size:_,buffer:S.buffer}}let f=this.programManager.normalizeDispatchGroupSize(l),m=f[1]===1&&f[2]===1,g=Nc(e,t,m),w=this.programManager.getArtifact(g);if(w||(w=this.programManager.build(e,f),this.programManager.setArtifact(g,w),fe("info",()=>`[artifact] key: ${g}, programName: ${e.name}`)),u&&w.uniformVariablesInfo){if(u.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${u.length} in program "${w.programInfo.name}".`);for(let _=0;_<u.length;_++){let v=u[_],b=v.type,y=typeof v.data=="number"?1:v.data.length,[S,x]=w.uniformVariablesInfo[_];if(b!==S||y!==x)throw new Error(`Uniform variable ${_} mismatch: expect type ${S} with size ${x}, got type ${b} with size ${y} in program "${w.programInfo.name}".`)}}if(fe("info",()=>`[ProgramManager] run "${e.name}" (key=${g}) with ${f[0]}x${f[1]}x${f[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let _={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:t,outputTensorViews:c};this.pendingKernels.push(_),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(_)}return this.programManager.run(w,a,p,f,h),Re(e.name),c}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,n){let s=Dc.get(e);if(!s)throw new Error(`kernel not implemented: ${e}`);let i={kernelType:e,kernelName:n,kernelEntry:s[0],attributes:[s[1],r]};this.kernels.set(t,i)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let n=this.kernels.get(e);if(!n)throw new Error(`kernel not created: ${e}`);let s=n.kernelType,i=n.kernelName,a=n.kernelEntry,o=n.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${s}] ${i}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),fe("info",()=>`[WebGPU] Start to run kernel "[${s}] ${i}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(t,o[1]),0}catch(u){return r.push(Promise.resolve(`[WebGPU] Kernel "[${s}] ${i}" failed. ${u}`)),1}finally{l&&r.push(this.device.popErrorScope().then(u=>u?`GPU validation error for kernel "[${s}] ${i}": ${u.message}`:null));for(let u of this.temporaryData)this.gpuDataManager.release(u.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,n){let s=this.sessionExternalDataMapping.get(e);s||(s=new Map,this.sessionExternalDataMapping.set(e,s));let i=s.get(t),a=this.gpuDataManager.registerExternalBuffer(r,n,i==null?void 0:i[1]);return s.set(t,[a,r]),a}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[1])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let n=await cs(this,e,t);return Ia(n.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){var e;this.queryType="none",(((e=this.env.webgpu.profiling)==null?void 0:e.mode)==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){fe("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){fe("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){fe("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let n=0;n<r;n++){let s=this.getComputePassEncoder(),i=e[n];this.writeTimestamp(this.pendingDispatchNumber*2),s.setPipeline(i.computePipeline),s.setBindGroup(0,i.bindGroup),s.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Gc={};Lr(Gc,{init:()=>jc});var an,Vc,jc,Em=A(()=>{j(),Sm(),vt(),J(),an=class nf{constructor(t,r,n,s){this.module=t,this.dataType=r,this.data=n,this.dims=s}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(C.size(t)!==C.size(this.dims))throw new Error("Invalid new shape");return new nf(this.module,this.dataType,this.data,t)}},Vc=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let n=e.HEAPU32,s=r>>>2;this.opKernelContext=n[s++];let i=n[s++];this.outputCount=n[s++],this.customDataOffset=n[s++],this.customDataSize=n[s++];let a=[];for(let o=0;o<i;o++){let l=n[s++],u=n[s++],d=n[s++],c=[];for(let p=0;p<d;p++)c.push(n[s++]);a.push(new an(e,l,u,c))}this.inputs=a}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(e,t){var a;let r=((a=t==null?void 0:t.inputs)==null?void 0:a.map(o=>typeof o=="number"?this.inputs[o]:o))??this.inputs,n=(t==null?void 0:t.outputs)??[],s=(o,l,u)=>new an(this.module,l,this.output(o,u),u),i=(o,l)=>{let u=Xt(o);if(!u)throw new Error(`Unsupported data type: ${o}`);let d=u*C.size(l),c=d>0?this.backend.gpuDataManager.create(d).id:0;return new an(this.module,o,c,l)};return this.backend.run(e,r,n,s,i,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let n=this.module.stackAlloc((1+t.length)*4),s=n>>2;this.module.HEAPU32[s++]=t.length;for(let i=0;i<t.length;i++)this.module.HEAPU32[s++]=t[i];return this.module._JsepOutput(this.opKernelContext,e,n)}catch(n){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(r)}}},jc=async(e,t,r,n)=>{let s=t.jsepInit;if(!s)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new qc;await i.initialize(r,n),s("webgpu",[i,a=>i.alloc(a),a=>i.free(a),(a,o,l,u=!1)=>{if(u)fe("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${a}, dst=${o}, size=${l}`),i.memcpy(a,o);else{fe("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${a}, gpuDataId=${o}, size=${l}`);let d=t.HEAPU8.subarray(a>>>0,(a>>>0)+l);i.upload(o,d)}},async(a,o,l)=>{fe("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${o}, size=${l}`),await i.download(a,()=>t.HEAPU8.subarray(o>>>0,(o>>>0)+l))},(a,o,l)=>i.createKernel(a,o,l,t.UTF8ToString(t._JsepGetNodeName(o))),a=>i.releaseKernel(a),(a,o,l,u)=>{fe("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${a}, contextDataOffset=${o}`);let d=new Vc(t,i,o);return i.computeKernel(a,d,u)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else s("webnn")}}),Wc,ri,ni,ct,Hc,on,si,ii,ai,oi,li,ui,Kc=A(()=>{Nf(),Uf(),j(),Pt(),rs(),va(),Wc=(e,t)=>{ge()._OrtInit(e,t)!==0&&le("Can't initialize onnxruntime.")},ri=async e=>{Wc(e.wasm.numThreads,Gr(e.logLevel))},ni=async(e,t)=>{{let r=(Em(),Dn(Gc)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let s=e.webgpu.powerPreference;if(s!==void 0&&s!=="low-power"&&s!=="high-performance")throw new Error(`Invalid powerPreference setting: "${s}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:s,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",ge(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",ge(),e)}}},ct=new Map,Hc=e=>{let t=ge(),r=t.stackSave();try{let n=t.stackAlloc(8);return t._OrtGetInputOutputCount(e,n,n+4)!==0&&le("Can't get session input/output count."),[t.HEAP32[n/4],t.HEAP32[n/4+1]]}finally{t.stackRestore(r)}},on=e=>{let t=ge(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},si=async(e,t)=>{var c,p;let r,n,s=ge();Array.isArray(e)?[r,n]=e:e.buffer===s.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=on(e);let i=0,a=0,o=0,l=[],u=[],d=[];try{if([a,l]=ba(t),(t==null?void 0:t.externalData)&&s.mountExternalData){let b=[];for(let y of t.externalData){let S=typeof y=="string"?y:y.path;b.push(os(typeof y=="string"?y:y.data).then(x=>{s.mountExternalData(S,x)}))}await Promise.all(b)}i=await s._OrtCreateSession(r,n,a),i===0&&le("Can't create a session.");let[h,f]=Hc(i),m=!!(t!=null&&t.enableGraphCapture),g=[],w=[],_=[];for(let b=0;b<h;b++){let y=s._OrtGetInputName(i,b);y===0&&le("Can't get an input name."),u.push(y),g.push(s.UTF8ToString(y))}for(let b=0;b<f;b++){let y=s._OrtGetOutputName(i,b);y===0&&le("Can't get an output name."),d.push(y);let S=s.UTF8ToString(y);w.push(S);{if(m&&(t==null?void 0:t.preferredOutputLocation)===void 0){_.push("gpu-buffer");continue}let x=typeof(t==null?void 0:t.preferredOutputLocation)=="string"?t.preferredOutputLocation:((c=t==null?void 0:t.preferredOutputLocation)==null?void 0:c[S])??"cpu";if(x!=="cpu"&&x!=="cpu-pinned"&&x!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${x}.`);if(m&&x!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${x}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(x)}}let v=null;return _.some(b=>b==="gpu-buffer")&&(o=s._OrtCreateBinding(i),o===0&&le("Can't create IO binding."),v={handle:o,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(b=>as(b))}),ct.set(i,[i,u,d,v,m,!1]),[i,g,w]}catch(h){throw u.forEach(f=>s._OrtFree(f)),d.forEach(f=>s._OrtFree(f)),o!==0&&s._OrtReleaseBinding(o),i!==0&&s._OrtReleaseSession(i),h}finally{s._free(r),a!==0&&s._OrtReleaseSessionOptions(a),l.forEach(h=>s._free(h)),(p=s.unmountExternalData)==null||p.call(s)}},ii=e=>{var l;let t=ge(),r=ct.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,s,i,a,o]=r;a&&(o&&t._OrtClearBoundOutputs(a.handle),t._OrtReleaseBinding(a.handle)),(l=t.jsepOnReleaseSession)==null||l.call(t,e),s.forEach(u=>t._OrtFree(u)),i.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(n),ct.delete(e)},ai=(e,t,r,n,s,i=!1)=>{if(!e){t.push(0);return}let a=ge(),o=e[0],l=e[1],u=e[3],d,c;if(o==="string"&&u==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(i&&u!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(u==="gpu-buffer"){let f=e[2].gpuBuffer,m=Xt(ns(o));c=l.reduce((w,_)=>w*_,1)*m;let g=a.jsepRegisterBuffer;if(!g)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');d=g(n,s,f,c)}else{let f=e[2];if(Array.isArray(f)){c=4*f.length,d=a._malloc(c),r.push(d);let m=d/4;for(let g=0;g<f.length;g++){if(typeof f[g]!="string")throw new TypeError(`tensor data at index ${g} is not a string`);a.HEAPU32[m++]=he(f[g],r)}}else c=f.byteLength,d=a._malloc(c),r.push(d),a.HEAPU8.set(new Uint8Array(f.buffer,f.byteOffset,c),d)}let p=a.stackSave(),h=a.stackAlloc(4*l.length);try{let f=h/4;l.forEach(g=>a.HEAP32[f++]=g);let m=a._OrtCreateTensor(ns(o),d,c,h,l.length,as(u));m===0&&le(`Can't create tensor for input/output. session=${n}, index=${s}.`),t.push(m)}finally{a.stackRestore(p)}},oi=async(e,t,r,n,s,i)=>{var R,U;let a=ge(),o=ct.get(e);if(!o)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=o[0],u=o[1],d=o[2],c=o[3],p=o[4],h=o[5],f=t.length,m=n.length,g=0,w=[],_=[],v=[],b=[],y=a.stackSave(),S=a.stackAlloc(f*4),x=a.stackAlloc(f*4),I=a.stackAlloc(m*4),D=a.stackAlloc(m*4);try{[g,w]=ma(i);for(let B=0;B<f;B++)ai(r[B],_,b,e,t[B],p);for(let B=0;B<m;B++)ai(s[B],v,b,e,f+n[B],p);let q=S/4,H=x/4,V=I/4,E=D/4;for(let B=0;B<f;B++)a.HEAPU32[q++]=_[B],a.HEAPU32[H++]=u[t[B]];for(let B=0;B<m;B++)a.HEAPU32[V++]=v[B],a.HEAPU32[E++]=d[n[B]];if(c&&!h){let{handle:B,outputPreferredLocations:K,outputPreferredLocationsEncoded:ee}=c;if(u.length!==f)throw new Error(`input count from feeds (${f}) is expected to be always equal to model's input count (${u.length}).`);for(let k=0;k<f;k++){let L=t[k];await a._OrtBindInput(B,u[L],_[k])!==0&&le(`Can't bind input[${k}] for session=${e}.`)}for(let k=0;k<m;k++){let L=n[k];(R=s[k])!=null&&R[3]?a._OrtBindOutput(B,d[L],v[k],0)!==0&&le(`Can't bind pre-allocated output[${k}] for session=${e}.`):a._OrtBindOutput(B,d[L],0,ee[L])!==0&&le(`Can't bind output[${k}] to ${K[k]} for session=${e}.`)}ct.set(e,[l,u,d,c,p,!0])}(U=a.jsepOnRunStart)==null||U.call(a,l);let M;c?M=await a._OrtRunWithBinding(l,c.handle,m,I,g):M=await a._OrtRun(l,x,S,f,D,m,I,g),M!==0&&le("failed to call OrtRun().");let O=[];for(let B=0;B<m;B++){let K=a.HEAPU32[I/4+B];if(K===v[B]){O.push(s[B]);continue}let ee=a.stackSave(),k=a.stackAlloc(4*4),L=!1,G,ie=0;try{a._OrtGetTensorData(K,k,k+4,k+8,k+12)!==0&&le(`Can't access output tensor data on index ${B}.`);let ce=k/4,rt=a.HEAPU32[ce++];ie=a.HEAPU32[ce++];let Ir=a.HEAPU32[ce++],Ye=a.HEAPU32[ce++],Mr=[];for(let Pe=0;Pe<Ye;Pe++)Mr.push(a.HEAPU32[Ir/4+Pe]);a._OrtFree(Ir);let Cr=Mr.reduce((Pe,Oe)=>Pe*Oe,1);G=bt(rt);let Jh=c==null?void 0:c.outputPreferredLocations[n[B]];if(G==="string"){if(Jh==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let Pe=[],Oe=ie/4;for(let Vt=0;Vt<Cr;Vt++){let ef=a.HEAPU32[Oe++],R$=Vt===Cr-1?void 0:a.HEAPU32[Oe]-ef;Pe.push(a.UTF8ToString(ef,R$))}O.push([G,Mr,Pe,"cpu"])}else if(Jh==="gpu-buffer"&&Cr>0){let Pe=a.jsepGetBuffer;if(!Pe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Oe=Pe(ie),Vt=Xt(rt);if(Vt===void 0||!is(G))throw new Error(`Unsupported data type: ${G}`);L=!0,O.push([G,Mr,{gpuBuffer:Oe,download:a.jsepCreateDownloader(Oe,Cr*Vt,G),dispose:()=>{a._OrtReleaseTensor(K)}},"gpu-buffer"])}else{let Pe=ss(G),Oe=new Pe(Cr);new Uint8Array(Oe.buffer,Oe.byteOffset,Oe.byteLength).set(a.HEAPU8.subarray(ie,ie+Oe.byteLength)),O.push([G,Mr,Oe,"cpu"])}}finally{a.stackRestore(ee),G==="string"&&ie&&a._free(ie),L||a._OrtReleaseTensor(K)}}return c&&!p&&(a._OrtClearBoundOutputs(c.handle),ct.set(e,[l,u,d,c,p,!1])),O}finally{a.stackRestore(y),_.forEach(q=>a._OrtReleaseTensor(q)),v.forEach(q=>a._OrtReleaseTensor(q)),b.forEach(q=>a._free(q)),g!==0&&a._OrtReleaseRunOptions(g),w.forEach(q=>a._free(q))}},li=e=>{let t=ge(),r=ct.get(e);if(!r)throw new Error("invalid session id");let n=r[0],s=t._OrtEndProfiling(n);s===0&&le("Can't get an profile file name."),t._OrtFree(s)},ui=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}}),pt,Ie,Lt,nr,sr,ln,di,un,Tt,It,Qc,Xc,Yc,Zc,Jc,ep,tp,rp,np=A(()=>{Ue(),Kc(),Pt(),Nr(),pt=()=>!!se.wasm.proxy&&typeof document<"u",Lt=!1,nr=!1,sr=!1,un=new Map,Tt=(e,t)=>{let r=un.get(e);r?r.push(t):un.set(e,[t])},It=()=>{if(Lt||!nr||sr||!Ie)throw new Error("worker not ready")},Qc=e=>{switch(e.data.type){case"init-wasm":Lt=!1,e.data.err?(sr=!0,di[1](e.data.err)):(nr=!0,di[0]()),ln&&(URL.revokeObjectURL(ln),ln=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=un.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},Xc=async()=>{if(!nr){if(Lt)throw new Error("multiple calls to 'initWasm()' detected.");if(sr)throw new Error("previous call to 'initWasm()' failed.");if(Lt=!0,pt())return new Promise((e,t)=>{Ie==null||Ie.terminate(),ca().then(([r,n])=>{try{Ie=n,Ie.onerror=i=>t(i),Ie.onmessage=Qc,di=[e,t];let s={type:"init-wasm",in:se};Ie.postMessage(s),ln=r}catch(s){t(s)}},t)});try{await ts(se.wasm),await ri(se),nr=!0}catch(e){throw sr=!0,e}finally{Lt=!1}}},Yc=async e=>{if(pt())return It(),new Promise((t,r)=>{Tt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:se}};Ie.postMessage(n)});await ni(se,e)},Zc=async e=>pt()?(It(),new Promise((t,r)=>{Tt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Ie.postMessage(n,[e.buffer])})):on(e),Jc=async(e,t)=>{if(pt()){if(t!=null&&t.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return It(),new Promise((r,n)=>{Tt("create",[r,n]);let s={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Ie.postMessage(s,i)})}else return si(e,t)},ep=async e=>{if(pt())return It(),new Promise((t,r)=>{Tt("release",[t,r]);let n={type:"release",in:e};Ie.postMessage(n)});ii(e)},tp=async(e,t,r,n,s,i)=>{if(pt()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(s.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return It(),new Promise((a,o)=>{Tt("run",[a,o]);let l=r,u={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:n,options:i}};Ie.postMessage(u,ui(l))})}else return oi(e,t,r,n,s,i)},rp=async e=>{if(pt())return It(),new Promise((t,r)=>{Tt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Ie.postMessage(n)});li(e)}}),ci,sp,ip,Tm=A(()=>{Ue(),np(),j(),Hn(),va(),ci=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},sp=e=>{switch(e[3]){case"cpu":return new xe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!is(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:s}=e[2];return xe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:s})}default:throw new Error(`invalid data location: ${e[3]}`)}},ip=class{async fetchModelAndCopyToWasmMemory(e){return Zc(await os(e))}async loadModel(e,t){Ne();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames]=await Jc(r,t),Re()}async dispose(){return ep(this.sessionId)}async run(e,t,r){Ne();let n=[],s=[];Object.entries(e).forEach(c=>{let p=c[0],h=c[1],f=this.inputNames.indexOf(p);if(f===-1)throw new Error(`invalid input '${p}'`);n.push(h),s.push(f)});let i=[],a=[];Object.entries(t).forEach(c=>{let p=c[0],h=c[1],f=this.outputNames.indexOf(p);if(f===-1)throw new Error(`invalid output '${p}'`);i.push(h),a.push(f)});let o=n.map((c,p)=>ci(c,()=>`input "${this.inputNames[s[p]]}"`)),l=i.map((c,p)=>c?ci(c,()=>`output "${this.outputNames[a[p]]}"`):null),u=await tp(this.sessionId,s,o,a,l,r),d={};for(let c=0;c<u.length;c++)d[this.outputNames[a[c]]]=i[c]??sp(u[c]);return Re(),d}startProfiling(){}endProfiling(){rp(this.sessionId)}}}),ap,op,Im=A(()=>{Ue(),np(),Tm(),Nr(),ap=()=>{if((typeof se.wasm.initTimeout!="number"||se.wasm.initTimeout<0)&&(se.wasm.initTimeout=0),se.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof se.wasm.proxy!="boolean"&&(se.wasm.proxy=!1),typeof se.wasm.trace!="boolean"&&(se.wasm.trace=!1),typeof se.wasm.numThreads!="number"||!Number.isInteger(se.wasm.numThreads)||se.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)se.wasm.numThreads=1;else{let e=typeof navigator>"u"?$f("node:os").cpus().length:navigator.hardwareConcurrency;se.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}se.wasm.wasmPaths===void 0&&qe&&qe.indexOf("blob:")!==0&&(se.wasm.wasmPaths=qe.substring(0,qe.lastIndexOf("/")+1))},op=class{async init(e){ap(),await Xc(),await Yc(e)}async createInferenceSessionHandler(e,t){let r=new ip;return await r.loadModel(e,t),Promise.resolve(r)}}}),lp={};Lr(lp,{wasmBackend:()=>up});var up,Mm=A(()=>{Im(),up=new op});Ue(),Ue(),Ue();var Cm="1.19.0-dev.20240521-068bb3d5ee",zm=sa;{let e=(Mm(),Dn(lp)).wasmBackend;wt("webgpu",e,5),wt("webnn",e,5),wt("cpu",e,10),wt("wasm",e,10)}Object.defineProperty(se.versions,"web",{value:Cm,enumerable:!0});/**
* @license
* Copyright 2021 Google LLC. All Rights Reserved.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =============================================================================
*//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Am=Object.freeze({__proto__:null,get InferenceSession(){return jn},get TRACE(){return Kt},get TRACE_FUNC_BEGIN(){return Ne},get TRACE_FUNC_END(){return Re},get Tensor(){return xe},get TrainingSession(){return Wn},default:zm,get env(){return se},get registerBackend(){return wt}});const Pm=(e,t)=>{const r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];const n=r.getContext("2d");if(n!=null){let s,i;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(s=e.dims[2],i=e.dims[3]):(s=e.dims[3],i=e.dims[2]);const a=(t==null?void 0:t.format)!==void 0?t.format:"RGB",o=t==null?void 0:t.norm;let l,u;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?u=[0,0,0,0]:typeof o.bias=="number"?u=[o.bias,o.bias,o.bias,o.bias]:(u=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(u[3]=o.bias[3]));const d=i*s;let c=0,p=d,h=d*2,f=-1;a==="RGBA"?(c=0,p=d,h=d*2,f=d*3):a==="RGB"?(c=0,p=d,h=d*2):a==="RBG"&&(c=0,h=d,p=d*2);for(let m=0;m<i;m++)for(let g=0;g<s;g++){const w=(e.data[c++]-u[0])*l[0],_=(e.data[p++]-u[1])*l[1],v=(e.data[h++]-u[2])*l[2],b=f===-1?255:(e.data[f++]-u[3])*l[3];n.fillStyle="rgba("+w+","+_+","+v+","+b+")",n.fillRect(g,m,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Om=(e,t)=>{const r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d");let n;if(r!=null){let s,i,a;(t==null?void 0:t.tensorLayout)!==void 0&&t.tensorLayout==="NHWC"?(s=e.dims[2],i=e.dims[1],a=e.dims[3]):(s=e.dims[3],i=e.dims[2],a=e.dims[1]);const o=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t==null?void 0:t.norm;let u,d;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?d=[0,0,0,0]:typeof l.bias=="number"?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(d[3]=l.bias[3]));const c=i*s;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");const p=4;let h=0,f=1,m=2,g=3,w=0,_=c,v=c*2,b=-1;o==="RGBA"?(w=0,_=c,v=c*2,b=c*3):o==="RGB"?(w=0,_=c,v=c*2):o==="RBG"&&(w=0,v=c,_=c*2),n=r.createImageData(s,i);for(let y=0;y<i*s;h+=p,f+=p,m+=p,g+=p,y++)n.data[h]=(e.data[w++]-d[0])*u[0],n.data[f]=(e.data[_++]-d[1])*u[1],n.data[m]=(e.data[v++]-d[2])*u[2],n.data[g]=b===-1?255:(e.data[b++]-d[3])*u[3]}else throw new Error("Can not access image data");return n},pi=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");const{height:r,width:n}=t,s=t.norm??{mean:255,bias:0};let i,a;typeof s.mean=="number"?i=[s.mean,s.mean,s.mean,s.mean]:i=[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],typeof s.bias=="number"?a=[s.bias,s.bias,s.bias,s.bias]:a=[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];const o=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",u=r*n,d=l==="RGBA"?new Float32Array(u*4):new Float32Array(u*3);let c=4,p=0,h=1,f=2,m=3,g=0,w=u,_=u*2,v=-1;o==="RGB"&&(c=3,p=0,h=1,f=2,m=-1),l==="RGBA"?v=u*3:l==="RBG"?(g=0,_=u,w=u*2):l==="BGR"&&(_=0,w=u,g=u*2);for(let y=0;y<u;y++,p+=c,f+=c,h+=c,m+=c)d[g++]=(e[p]+a[0])/i[0],d[w++]=(e[h]+a[1])/i[1],d[_++]=(e[f]+a[2])/i[2],v!==-1&&m!==-1&&(d[v++]=(e[m]+a[3])/i[3]);return l==="RGBA"?new Je("float32",d,[1,4,r,n]):new Je("float32",d,[1,3,r,n])},Bm=async(e,t)=>{const r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,s=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string";let a,o=t??{};const l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},u=d=>d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){const d=l();d.width=e.width,d.height=e.height;const c=u(d);if(c!=null){let p=e.height,h=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,h=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=p,o.width=h}else o.tensorFormat="RGBA",o.height=p,o.width=h;c.drawImage(e,0,0),a=c.getImageData(0,0,h,p).data}else throw new Error("Can not access image data")}else if(n){let d,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(d=t.resizedHeight,c=t.resizedWidth):(d=e.height,c=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=d,o.width=c,t!==void 0){const p=l();p.width=c,p.height=d;const h=u(p);if(h!=null)h.putImageData(e,0,0),a=h.getImageData(0,0,c,d).data;else throw new Error("Can not access image data")}else a=e.data}else if(s){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");const d=l();d.width=e.width,d.height=e.height;const c=u(d);if(c!=null){const p=e.height,h=e.width;return c.drawImage(e,0,0,h,p),a=c.getImageData(0,0,h,p).data,o.height=p,o.width=h,pi(a,o)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,c)=>{const p=l(),h=u(p);if(!e||!h)return c();const f=new Image;f.crossOrigin="Anonymous",f.src=e,f.onload=()=>{p.width=f.width,p.height=f.height,h.drawImage(f,0,0,p.width,p.height);const m=h.getImageData(0,0,p.width,p.height);o.height=p.height,o.width=p.width,d(pi(m.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return pi(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Rm=(e,t)=>{const{width:r,height:n,download:s,dispose:i}=t,a=[1,n,r,4];return new Je({location:"texture",type:"float32",texture:e,dims:a,download:s,dispose:i})},Dm=(e,t)=>{const{dataType:r,dims:n,download:s,dispose:i}=t;return new Je({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:s,dispose:i})},Lm=(e,t,r)=>new Je({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]}),Ft=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),dn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]);let dp=!1;const Fm=()=>{if(!dp){dp=!0;const e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(Ft.set("int64",BigInt64Array),dn.set(BigInt64Array,"int64")),t&&(Ft.set("uint64",BigUint64Array),dn.set(BigUint64Array,"uint64")),r?(Ft.set("float16",Float16Array),dn.set(Float16Array,"float16")):Ft.set("float16",Uint16Array)}},Nm=e=>{let t=1;for(let r=0;r<e.length;r++){const n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},Um=(e,t)=>{switch(e.location){case"cpu":return new Je(e.type,e.data,t);case"cpu-pinned":return new Je({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Je({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Je({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}};let Je=class{constructor(t,r,n){Fm();let s,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,s=t.type,i=t.dims,t.location){case"cpu-pinned":{const o=Ft.get(s);if(!o)throw new TypeError(`unsupported type "${s}" to create tensor from pinned buffer`);if(!(t.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=t.data;break}case"texture":{if(s!=="float32")throw new TypeError(`unsupported type "${s}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(s!=="float32"&&s!=="float16"&&s!=="int32"&&s!=="int64"&&s!=="uint32"&&s!=="uint8"&&s!=="bool")throw new TypeError(`unsupported type "${s}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,l;if(typeof t=="string")if(s=t,l=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");o=r}else{const u=Ft.get(t);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&u===Uint16Array)throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");t==="uint64"||t==="int64"?o=u.from(r,BigInt):o=u.from(r)}else if(r instanceof u)o=r;else throw new TypeError(`A ${s} tensor's data must be type of ${u}`)}else if(l=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");const u=typeof t[0];if(u==="string")s="string",o=t;else if(u==="boolean")s="bool",o=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else{const u=dn.get(t.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);s=u,o=t}if(l===void 0)l=[o.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");i=l,this.cpuData=o,this.dataLocation="cpu"}const a=Nm(i);if(this.cpuData&&a!==this.cpuData.length)throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=s,this.dims=i,this.size=a}static async fromImage(t,r){return Bm(t,r)}static fromTexture(t,r){return Rm(t,r)}static fromGpuBuffer(t,r){return Dm(t,r)}static fromPinnedBuffer(t,r,n){return Lm(t,r,n)}toDataURL(t){return Pm(this,t)}toImageData(t){return Om(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;const r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Um(this,t)}};const qm=Je,ir=[];let hi,Mt;mt.IS_NODE_ENV?(Mt=oe??nt,ir.push("cpu"),hi=["cpu"]):(Mt=Am,mt.IS_WEBGPU_AVAILABLE&&ir.push("webgpu"),ir.push("wasm"),hi=["wasm"]);const Gm=Mt.InferenceSession;function Vm(e){let t=hi;if(e){if(!ir.includes(e))throw new Error(`Unsupported device: "${e}". Should be one of: ${ir.join(", ")}.`);t=[e]}return t}async function jm(e,t){return await Gm.create(e,t)}function cp(e){return e instanceof Mt.Tensor}const Ke=Mt==null?void 0:Mt.env;Ke!=null&&Ke.wasm&&(Ke.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.19.0-dev.20240509-69cfcba38a/dist/",Ke.wasm.proxy=!mt.IS_WEBWORKER_ENV,(typeof crossOriginIsolated>"u"||!crossOriginIsolated)&&(Ke.wasm.numThreads=1),typeof navigator<"u"&&/iP(hone|od|ad).+16_4.+AppleWebKit/.test(navigator.userAgent)&&(Ke.wasm.simd=!1));function Wm(){var e;return(e=Ke==null?void 0:Ke.wasm)==null?void 0:e.proxy}pe.backends.onnx=Ke;const pp=Object.freeze({float32:Float32Array,float16:Uint16Array,float64:Float64Array,string:Array,int8:Int8Array,uint8:Uint8Array,int16:Int16Array,uint16:Uint16Array,int32:Int32Array,uint32:Uint32Array,int64:BigInt64Array,uint64:BigUint64Array,bool:Uint8Array});class Z{constructor(...t){T(this,"ort_tensor");return cp(t[0])?this.ort_tensor=t[0]:this.ort_tensor=new qm(t[0],t[1],t[2]),new Proxy(this,{get:(r,n)=>{if(typeof n=="string"){let s=Number(n);if(Number.isInteger(s))return r._getitem(s)}return r[n]},set:(r,n,s)=>r[n]=s})}get dims(){return this.ort_tensor.dims}set dims(t){this.ort_tensor.dims=t}get type(){return this.ort_tensor.type}get data(){return this.ort_tensor.data}get size(){return this.ort_tensor.size}get location(){return this.ort_tensor.location}dispose(){this.ort_tensor.dispose()}*[Symbol.iterator](){const[t,...r]=this.dims;if(r.length>0){const n=r.reduce((s,i)=>s*i);for(let s=0;s<t;++s)yield this._subarray(s,n,r)}else yield*this.data}_getitem(t){const[r,...n]=this.dims;if(t=et(t,r),n.length>0){const s=n.reduce((i,a)=>i*a);return this._subarray(t,s,n)}else return new Z(this.type,[this.data[t]],n)}indexOf(t){const r=this.data;for(let n=0;n<r.length;++n)if(r[n]==t)return n;return-1}_subarray(t,r,n){const s=t*r,i=(t+1)*r,a="subarray"in this.data?this.data.subarray(s,i):this.data.slice(s,i);return new Z(this.type,a,n)}item(){const t=this.data;if(t.length!==1)throw new Error(`a Tensor with ${t.length} elements cannot be converted to Scalar`);return t[0]}tolist(){return Hm(this.data,this.dims)}sigmoid(){return this.clone().sigmoid_()}sigmoid_(){const t=this.data;for(let r=0;r<t.length;++r)t[r]=1/(1+Math.exp(-t[r]));return this}mul(t){return this.clone().mul_(t)}mul_(t){const r=this.data;for(let n=0;n<r.length;++n)r[n]*=t;return this}add(t){return this.clone().add_(t)}add_(t){const r=this.data;for(let n=0;n<r.length;++n)r[n]+=t;return this}clone(){return new Z(this.type,this.data.slice(),this.dims.slice())}slice(...t){let r=[],n=[];for(let u=0;u<this.dims.length;++u){let d=t[u];if(d==null)n.push([0,this.dims[u]]),r.push(this.dims[u]);else if(typeof d=="number")d=et(d,this.dims[u],u),n.push([d,d+1]);else if(Array.isArray(d)&&d.length===2){let[c,p]=d;if(c=c===null?0:et(c,this.dims[u],u,!1),p=p===null?this.dims[u]:et(p,this.dims[u],u,!1),c>p)throw new Error(`Invalid slice: ${d}`);let h=[Math.max(c,0),Math.min(p,this.dims[u])];n.push(h),r.push(h[1]-h[0])}else throw new Error(`Invalid slice: ${d}`)}let s=n.map(([u,d])=>d-u),i=s.reduce((u,d)=>u*d);const a=this.data;let o=new a.constructor(i);const l=this.stride();for(let u=0;u<i;++u){let d=0;for(let c=s.length-1,p=u;c>=0;--c){const h=s[c];d+=(p%h+n[c][0])*l[c],p=Math.floor(p/h)}o[u]=a[d]}return new Z(this.type,o,r)}permute(...t){return Km(this,t)}transpose(...t){return this.permute(...t)}sum(t=null,r=!1){return this.norm(1,t,r)}norm(t="fro",r=null,n=!1){if(t==="fro")t=2;else if(typeof t=="string")throw Error(`Unsupported norm: ${t}`);const s=this.data;if(r===null){let o=s.reduce((l,u)=>l+u**t,0)**(1/t);return new Z(this.type,[o],[])}r=et(r,this.dims.length);const i=this.dims.slice();i[r]=1;const a=new s.constructor(s.length/this.dims[r]);for(let o=0;o<s.length;++o){let l=0;for(let u=this.dims.length-1,d=o,c=1;u>=0;--u){const p=this.dims[u];if(u!==r){const h=d%p;l+=h*c,c*=i[u]}d=Math.floor(d/p)}a[l]+=s[o]**t}if(t!==1)for(let o=0;o<a.length;++o)a[o]=a[o]**(1/t);return n||i.splice(r,1),new Z(this.type,a,i)}normalize_(t=2,r=1){r=et(r,this.dims.length);const n=this.norm(t,r,!0),s=this.data;for(let i=0;i<s.length;++i){let a=0;for(let o=this.dims.length-1,l=i,u=1;o>=0;--o){const d=this.dims[o];if(o!==r){const c=l%d;a+=c*u,u*=this.dims[o]}l=Math.floor(l/d)}s[i]/=n.data[a]}return this}normalize(t=2,r=1){return this.clone().normalize_(t,r)}stride(){return Ym(this.dims)}squeeze(t=null){return new Z(this.type,this.data,hp(this.dims,t))}squeeze_(t=null){return this.dims=hp(this.dims,t),this}unsqueeze(t=null){return new Z(this.type,this.data,fp(this.dims,t))}unsqueeze_(t=null){return this.dims=fp(this.dims,t),this}flatten_(t=0,r=-1){r=(r+this.dims.length)%this.dims.length;let n=this.dims.slice(0,t),s=this.dims.slice(t,r+1),i=this.dims.slice(r+1);return this.dims=[...n,s.reduce((a,o)=>a*o,1),...i],this}flatten(t=0,r=-1){return this.clone().flatten_(t,r)}view(...t){let r=-1;for(let n=0;n<t.length;++n)if(t[n]===-1){if(r!==-1)throw new Error("Only one dimension can be inferred");r=n}if(r!==-1){const n=t.reduce((s,i,a)=>a!==r?s*i:s,1);t[r]=this.data.length/n}return new Z(this.type,this.data,t)}neg_(){const t=this.data;for(let r=0;r<t.length;++r)t[r]=-t[r];return this}neg(){return this.clone().neg_()}clamp_(t,r){const n=this.data;for(let s=0;s<n.length;++s)n[s]=Math.min(Math.max(n[s],t),r);return this}clamp(t,r){return this.clone().clamp_(t,r)}round_(){const t=this.data;for(let r=0;r<t.length;++r)t[r]=Math.round(t[r]);return this}round(){return this.clone().round_()}mean(t=null,r=!1){return mi(this,t,r)}to(t){if(this.type===t)return this;if(!pp.hasOwnProperty(t))throw new Error(`Unsupported type: ${t}`);return new Z(t,pp[t].from(this.data),this.dims)}}function Hm(e,t){const r=e.length,n=t.reduce((i,a)=>i*a);if(r!==n)throw Error(`cannot reshape array of size ${r} into shape (${t})`);let s=e;for(let i=t.length-1;i>=0;i--)s=s.reduce((a,o)=>{let l=a[a.length-1];return l.length<t[i]?l.push(o):a.push([o]),a},[[]]);return s[0]}function Km(e,t){const[r,n]=gf(e.data,e.dims,t);return new Z(e.type,r,n)}function hp(e,t){return e=e.slice(),t===null?e=e.filter(r=>r!==1):typeof t=="number"?e[t]===1&&e.splice(t,1):Array.isArray(t)&&(e=e.filter((r,n)=>r!==1||!t.includes(n))),e}function fp(e,t){return t=et(t,e.length+1),e=e.slice(),e.splice(t,0,1),e}function et(e,t,r=null,n=!0){if(n&&(e<-t||e>=t))throw new Error(`IndexError: index ${e} is out of bounds for dimension${r===null?"":" "+r} with size ${t}`);return e<0&&(e=(e%t+t)%t),e}function it(e,t=0){t=et(t,e[0].dims.length);const r=e[0].dims.slice();r[t]=e.reduce((a,o)=>a+o.dims[t],0);const n=r.reduce((a,o)=>a*o,1),s=new e[0].data.constructor(n),i=e[0].type;if(t===0){let a=0;for(let o of e)s.set(o.data,a),a+=o.data.length}else{let a=0;for(let o=0;o<e.length;++o){let l=e[o];for(let u=0;u<l.data.length;++u){let d=0;for(let c=l.dims.length-1,p=u,h=1;c>=0;--c){const f=l.dims[c];let m=p%f;c===t&&(m+=a),d+=m*h,h*=r[c],p=Math.floor(p/f)}s[d]=l.data[u]}a+=l.dims[t]}}return new Z(i,s,r)}function fi(e,t=0){return it(e.map(r=>r.unsqueeze(t)),t)}function Qm(e,t=null,r=1,n=!1){if(t===null){const u=e.data.reduce((h,f)=>h+f,0)/e.data.length,d=Math.sqrt(e.data.reduce((h,f)=>h+(f-u)**2,0)/(e.data.length-r)),c=new Z(e.type,[u],[]);return[new Z(e.type,[d],[]),c]}t=et(t,e.dims.length);const s=mi(e,t,n),i=e.dims.slice();i[t]=1;const a=new e.data.constructor(e.data.length/e.dims[t]);for(let l=0;l<e.data.length;++l){let u=0;for(let d=e.dims.length-1,c=l,p=1;d>=0;--d){const h=e.dims[d];if(d!==t){const f=c%h;u+=f*p,p*=i[d]}c=Math.floor(c/h)}a[u]+=(e.data[l]-s.data[u])**2}for(let l=0;l<a.length;++l)a[l]=Math.sqrt(a[l]/(e.dims[t]-r));return n||i.splice(t,1),[new Z(e.type,a,i),s]}function mi(e,t=null,r=!1){if(t===null){let i=e.data.reduce((a,o)=>a+o,0);return new Z(e.type,[i/e.data.length],[])}t=et(t,e.dims.length);const n=e.dims.slice();n[t]=1;const s=new e.data.constructor(e.data.length/e.dims[t]);for(let i=0;i<e.data.length;++i){let a=0;for(let o=e.dims.length-1,l=i,u=1;o>=0;--o){const d=e.dims[o];if(o!==t){const c=l%d;a+=c*u,u*=n[o]}l=Math.floor(l/d)}s[a]+=e.data[i]}if(e.dims[t]!==1)for(let i=0;i<s.length;++i)s[i]=s[i]/e.dims[t];return r||n.splice(t,1),new Z(e.type,s,n)}function Xm(e){const[t,r]=e.dims,n=[t+1,r+1],s=new Z("float32",new Float32Array(n[0]*n[1]).fill(1/0),n),i=new Z("float32",new Float32Array(n[0]*n[1]).fill(-1),n);s[0].data[0]=0;for(let d=1;d<r+1;++d)for(let c=1;c<t+1;++c){const p=s[c-1][d-1].item(),h=s[c-1][d].item(),f=s[c][d-1].item();let m,g;p<h&&p<f?(m=p,g=0):h<p&&h<f?(m=h,g=1):(m=f,g=2),s[c].data[d]=e[c-1][d-1].item()+m,i[c].data[d]=g}let a=t,o=r;i.data.fill(2,0,n[1]);for(let d=0;d<n[0];++d)i[d].data[0]=1;let l=[],u=[];for(;a>0||o>0;)switch(l.push(a-1),u.push(o-1),i[a][o].item()){case 0:--a,--o;break;case 1:--a;break;case 2:--o;break;default:throw new Error(`Internal error in dynamic time warping. Unexpected trace[${a}, ${o}]. Please file a bug report.`)}return l.reverse(),u.reverse(),[l,u]}function Ym(e){const t=new Array(e.length);for(let r=e.length-1,n=1;r>=0;--r)t[r]=n,n*=e[r];return t}function gi(e,t,r,n){const s=e.reduce((i,a)=>i*a,1);return new Z(r,new n(s).fill(t),e)}function Zm(e,t){let r,n;return r="float32",n=Float32Array,gi(e,t,r,n)}function Jm(e,t){return Zm(e.dims,t)}function ar(e){return gi(e,1n,"int64",BigInt64Array)}function eg(e){return ar(e.dims)}function tg(e){return gi(e,0n,"int64",BigInt64Array)}function rg(e){return tg(e.dims)}class ng{constructor(t=(r,n)=>r>n){this._heap=[],this._comparator=t}get size(){return this._heap.length}isEmpty(){return this.size===0}peek(){return this._heap[0]}push(...t){return this.extend(t)}extend(t){for(const r of t)this._heap.push(r),this._siftUp();return this.size}pop(){const t=this.peek(),r=this.size-1;return r>0&&this._swap(0,r),this._heap.pop(),this._siftDown(),t}replace(t){const r=this.peek();return this._heap[0]=t,this._siftDown(),r}_parent(t){return(t+1>>>1)-1}_left(t){return(t<<1)+1}_right(t){return t+1<<1}_greater(t,r){return this._comparator(this._heap[t],this._heap[r])}_swap(t,r){const n=this._heap[t];this._heap[t]=this._heap[r],this._heap[r]=n}_siftUp(){let t=this.size-1;for(;t>0&&this._greater(t,this._parent(t));)this._swap(t,this._parent(t)),t=this._parent(t)}_siftDown(){let t=0;for(;this._left(t)<this.size&&this._greater(this._left(t),t)||this._right(t)<this.size&&this._greater(this._right(t),t);){const r=this._right(t)<this.size&&this._greater(this._right(t),this._left(t))?this._right(t):this._left(t);this._swap(t,r),t=r}}}class sg{constructor(){this.root=cn.default()}extend(t){for(let r of t)this.push(r)}push(t){let r=this.root;for(let n of t){let s=r.children.get(n);s===void 0&&(s=cn.default(),r.children.set(n,s)),r=s}r.isLeaf=!0}*commonPrefixSearch(t){let r=this.root,n="";for(let s=0;s<t.length&&r!==void 0;++s){const i=t[s];n+=i,r=r.children.get(i),r!==void 0&&r.isLeaf&&(yield n)}}}class cn{constructor(t,r){this.isLeaf=t,this.children=r}static default(){return new cn(!1,new Map)}}class ig{constructor(t,r,n){this.sentence=t,this.len=t.length,this.bosTokenId=r,this.eosTokenId=n,this.nodes=[],this.beginNodes=Array.from({length:this.len+1},()=>[]),this.endNodes=Array.from({length:this.len+1},()=>[]);const s=new or(this.bosTokenId,0,0,0,0),i=new or(this.eosTokenId,1,this.len,0,0);this.nodes.push(s.clone()),this.nodes.push(i.clone()),this.beginNodes[this.len].push(i),this.endNodes[0].push(s)}insert(t,r,n,s){const i=this.nodes.length,a=new or(s,i,t,r,n);this.beginNodes[t].push(a),this.endNodes[t+r].push(a),this.nodes.push(a)}viterbi(){const t=this.len;let r=0;for(;r<=t;){if(this.beginNodes[r].length==0)return[];for(let o of this.beginNodes[r]){o.prev=null;let l=0,u=null;for(let d of this.endNodes[r]){const c=d.backtraceScore+o.score;(u===null||c>l)&&(u=d.clone(),l=c)}if(u!==null)o.prev=u,o.backtraceScore=l;else return[]}++r}const n=[],i=this.beginNodes[t][0].prev;if(i===null)return[];let a=i.clone();for(;a.prev!==null;)n.push(a.clone()),a=a.clone().prev.clone();return n.reverse(),n}piece(t){return this.sentence.slice(t.pos,t.pos+t.length)}tokens(){return this.viterbi().map(r=>this.piece(r))}tokenIds(){return this.viterbi().map(r=>r.tokenId)}}class or{constructor(t,r,n,s,i){this.tokenId=t,this.nodeId=r,this.pos=n,this.length=s,this.score=i,this.prev=null,this.backtraceScore=0}clone(){const t=new or(this.tokenId,this.nodeId,this.pos,this.length,this.score);return t.prev=this.prev,t.backtraceScore=this.backtraceScore,t}}var $=Object.freeze({Text:"Text",NumericLiteral:"NumericLiteral",BooleanLiteral:"BooleanLiteral",StringLiteral:"StringLiteral",Identifier:"Identifier",Equals:"Equals",OpenParen:"OpenParen",CloseParen:"CloseParen",OpenStatement:"OpenStatement",CloseStatement:"CloseStatement",OpenExpression:"OpenExpression",CloseExpression:"CloseExpression",OpenSquareBracket:"OpenSquareBracket",CloseSquareBracket:"CloseSquareBracket",OpenCurlyBracket:"OpenCurlyBracket",CloseCurlyBracket:"CloseCurlyBracket",Comma:"Comma",Dot:"Dot",Colon:"Colon",Pipe:"Pipe",CallOperator:"CallOperator",AdditiveBinaryOperator:"AdditiveBinaryOperator",MultiplicativeBinaryOperator:"MultiplicativeBinaryOperator",ComparisonBinaryOperator:"ComparisonBinaryOperator",UnaryOperator:"UnaryOperator",Set:"Set",If:"If",For:"For",In:"In",Is:"Is",NotIn:"NotIn",Else:"Else",EndIf:"EndIf",ElseIf:"ElseIf",EndFor:"EndFor",And:"And",Or:"Or",Not:"UnaryOperator"}),mp=Object.freeze({set:$.Set,for:$.For,in:$.In,is:$.Is,if:$.If,else:$.Else,endif:$.EndIf,elif:$.ElseIf,endfor:$.EndFor,and:$.And,or:$.Or,not:$.Not,"not in":$.NotIn,true:$.BooleanLiteral,false:$.BooleanLiteral}),Ct=class{constructor(e,t){this.value=e,this.type=t}};function gp(e){return/\w/.test(e)}function _i(e){return/[0-9]/.test(e)}var ag=[["{%",$.OpenStatement],["%}",$.CloseStatement],["{{",$.OpenExpression],["}}",$.CloseExpression],["(",$.OpenParen],[")",$.CloseParen],["{",$.OpenCurlyBracket],["}",$.CloseCurlyBracket],["[",$.OpenSquareBracket],["]",$.CloseSquareBracket],[",",$.Comma],[".",$.Dot],[":",$.Colon],["|",$.Pipe],["<=",$.ComparisonBinaryOperator],[">=",$.ComparisonBinaryOperator],["==",$.ComparisonBinaryOperator],["!=",$.ComparisonBinaryOperator],["<",$.ComparisonBinaryOperator],[">",$.ComparisonBinaryOperator],["+",$.AdditiveBinaryOperator],["-",$.AdditiveBinaryOperator],["*",$.MultiplicativeBinaryOperator],["/",$.MultiplicativeBinaryOperator],["%",$.MultiplicativeBinaryOperator],["=",$.Equals]],og=new Map([["n",`
`],["t","	"],["r","\r"],["b","\b"],["f","\f"],["v","\v"],["'","'"],['"','"'],["\\","\\"]]);function lg(e,t={}){return e.endsWith(`
`)&&(e=e.slice(0,-1)),e=e.replace(/{#.*?#}/gs,"{##}"),t.lstrip_blocks&&(e=e.replace(/^[ \t]*({[#%])/gm,"$1")),t.trim_blocks&&(e=e.replace(/([#%]})\n/g,"$1")),e.replace(/{##}/g,"").replace(/-%}\s*/g,"%}").replace(/\s*{%-/g,"{%").replace(/-}}\s*/g,"}}").replace(/\s*{{-/g,"{{")}function ug(e,t={}){var a,o,l;const r=[],n=lg(e,t);let s=0;const i=u=>{let d="";for(;u(n[s]);){if(n[s]==="\\"){if(++s,s>=n.length)throw new SyntaxError("Unexpected end of input");const c=n[s++],p=og.get(c);if(p===void 0)throw new SyntaxError(`Unexpected escaped character: ${c}`);d+=p;continue}if(d+=n[s++],s>=n.length)throw new SyntaxError("Unexpected end of input")}return d};e:for(;s<n.length;){const u=(a=r.at(-1))==null?void 0:a.type;if(u===void 0||u===$.CloseStatement||u===$.CloseExpression){let c="";for(;s<n.length&&!(n[s]==="{"&&(n[s+1]==="%"||n[s+1]==="{"));)c+=n[s++];if(c.length>0){r.push(new Ct(c,$.Text));continue}}i(c=>/\s/.test(c));const d=n[s];if(d==="-"||d==="+"){const c=(o=r.at(-1))==null?void 0:o.type;if(c===$.Text||c===void 0)throw new SyntaxError(`Unexpected character: ${d}`);switch(c){case $.Identifier:case $.NumericLiteral:case $.BooleanLiteral:case $.StringLiteral:case $.CloseParen:case $.CloseSquareBracket:break;default:{++s;const p=i(_i);r.push(new Ct(`${d}${p}`,p.length>0?$.NumericLiteral:$.UnaryOperator));continue}}}for(const[c,p]of ag)if(n.slice(s,s+c.length)===c){r.push(new Ct(c,p)),s+=c.length;continue e}if(d==="'"||d==='"'){++s;const c=i(p=>p!==d);r.push(new Ct(c,$.StringLiteral)),++s;continue}if(_i(d)){const c=i(_i);r.push(new Ct(c,$.NumericLiteral));continue}if(gp(d)){const c=i(gp),p=Object.hasOwn(mp,c)?mp[c]:$.Identifier;p===$.In&&((l=r.at(-1))==null?void 0:l.type)===$.Not?(r.pop(),r.push(new Ct("not in",$.NotIn))):r.push(new Ct(c,p));continue}throw new SyntaxError(`Unexpected character: ${d}`)}return r}var lr=class{constructor(){T(this,"type","Statement")}},dg=class extends lr{constructor(t){super();T(this,"type","Program");this.body=t}},_p=class extends lr{constructor(t,r,n){super();T(this,"type","If");this.test=t,this.body=r,this.alternate=n}},cg=class extends lr{constructor(t,r,n){super();T(this,"type","For");this.loopvar=t,this.iterable=r,this.body=n}},pg=class extends lr{constructor(t,r){super();T(this,"type","Set");this.assignee=t,this.value=r}},tt=class extends lr{constructor(){super(...arguments);T(this,"type","Expression")}},hg=class extends tt{constructor(t,r,n){super();T(this,"type","MemberExpression");this.object=t,this.property=r,this.computed=n}},fg=class extends tt{constructor(t,r){super();T(this,"type","CallExpression");this.callee=t,this.args=r}},Nt=class extends tt{constructor(t){super();T(this,"type","Identifier");this.value=t}},Ut=class extends tt{constructor(t){super();T(this,"type","Literal");this.value=t}},mg=class extends Ut{constructor(){super(...arguments);T(this,"type","NumericLiteral")}},wp=class extends Ut{constructor(){super(...arguments);T(this,"type","StringLiteral")}},yp=class extends Ut{constructor(){super(...arguments);T(this,"type","BooleanLiteral")}},gg=class extends Ut{constructor(){super(...arguments);T(this,"type","ArrayLiteral")}},bp=class extends Ut{constructor(){super(...arguments);T(this,"type","TupleLiteral")}},_g=class extends Ut{constructor(){super(...arguments);T(this,"type","ObjectLiteral")}},ur=class extends tt{constructor(t,r,n){super();T(this,"type","BinaryExpression");this.operator=t,this.left=r,this.right=n}},wg=class extends tt{constructor(t,r){super();T(this,"type","FilterExpression");this.operand=t,this.filter=r}},yg=class extends tt{constructor(t,r,n){super();T(this,"type","TestExpression");this.operand=t,this.negate=r,this.test=n}},bg=class extends tt{constructor(t,r){super();T(this,"type","UnaryExpression");this.operator=t,this.argument=r}},vg=class extends tt{constructor(t=void 0,r=void 0,n=void 0){super();T(this,"type","SliceExpression");this.start=t,this.stop=r,this.step=n}},$g=class extends tt{constructor(t,r){super();T(this,"type","KeywordArgumentExpression");this.key=t,this.value=r}};function xg(e){const t=new dg([]);let r=0;function n(E,M){const O=e[r++];if(!O||O.type!==E)throw new Error(`Parser Error: ${M}. ${O.type} !== ${E}.`);return O}function s(){switch(e[r].type){case $.Text:return o();case $.OpenStatement:return l();case $.OpenExpression:return u();default:throw new SyntaxError(`Unexpected token type: ${e[r].type}`)}}function i(...E){return r+E.length<=e.length&&E.some((M,O)=>M!==e[r+O].type)}function a(...E){return r+E.length<=e.length&&E.every((M,O)=>M===e[r+O].type)}function o(){return new wp(n($.Text,"Expected text token").value)}function l(){n($.OpenStatement,"Expected opening statement token");let E;switch(e[r].type){case $.Set:++r,E=d(),n($.CloseStatement,"Expected closing statement token");break;case $.If:++r,E=c(),n($.OpenStatement,"Expected {% token"),n($.EndIf,"Expected endif token"),n($.CloseStatement,"Expected %} token");break;case $.For:++r,E=h(),n($.OpenStatement,"Expected {% token"),n($.EndFor,"Expected endfor token"),n($.CloseStatement,"Expected %} token");break;default:throw new SyntaxError(`Unknown statement type: ${e[r].type}`)}return E}function u(){n($.OpenExpression,"Expected opening expression token");const E=f();return n($.CloseExpression,"Expected closing expression token"),E}function d(){const E=f();if(a($.Equals)){++r;const M=d();return new pg(E,M)}return E}function c(){var B,K,ee,k,L,G,ie,ce;const E=f();n($.CloseStatement,"Expected closing statement token");const M=[],O=[];for(;!(((B=e[r])==null?void 0:B.type)===$.OpenStatement&&(((K=e[r+1])==null?void 0:K.type)===$.ElseIf||((ee=e[r+1])==null?void 0:ee.type)===$.Else||((k=e[r+1])==null?void 0:k.type)===$.EndIf));)M.push(s());if(((L=e[r])==null?void 0:L.type)===$.OpenStatement&&((G=e[r+1])==null?void 0:G.type)!==$.EndIf)if(++r,a($.ElseIf))n($.ElseIf,"Expected elseif token"),O.push(c());else for(n($.Else,"Expected else token"),n($.CloseStatement,"Expected closing statement token");!(((ie=e[r])==null?void 0:ie.type)===$.OpenStatement&&((ce=e[r+1])==null?void 0:ce.type)===$.EndIf);)O.push(s());return new _p(E,M,O)}function p(E=!1){const M=E?V:f,O=[M()],B=a($.Comma);for(;B&&(++r,O.push(M()),!!a($.Comma)););return B?new bp(O):O[0]}function h(){const E=p(!0);if(!(E instanceof Nt||E instanceof bp))throw new SyntaxError(`Expected identifier/tuple for the loop variable, got ${E.type} instead`);n($.In,"Expected `in` keyword following loop variable");const M=f();n($.CloseStatement,"Expected closing statement token");const O=[];for(;i($.OpenStatement,$.EndFor);)O.push(s());return new cg(E,M,O)}function f(){return m()}function m(){const E=g();if(a($.If)){++r;const M=g();n($.Else,"Expected else token");const O=g();return new _p(M,[E],[O])}return E}function g(){let E=w();for(;a($.Or);){const M=e[r];++r;const O=w();E=new ur(M,E,O)}return E}function w(){let E=_();for(;a($.And);){const M=e[r];++r;const O=_();E=new ur(M,E,O)}return E}function _(){let E;for(;a($.Not);){const M=e[r];++r;const O=_();E=new bg(M,O)}return E??v()}function v(){let E=b();for(;a($.ComparisonBinaryOperator)||a($.In)||a($.NotIn);){const M=e[r];++r;const O=b();E=new ur(M,E,O)}return E}function b(){let E=U();for(;a($.AdditiveBinaryOperator);){const M=e[r];++r;const O=U();E=new ur(M,E,O)}return E}function y(){const E=R();return a($.OpenParen)?S(E):E}function S(E){let M=new fg(E,x());return a($.OpenParen)&&(M=S(M)),M}function x(){n($.OpenParen,"Expected opening parenthesis for arguments list");const E=I();return n($.CloseParen,"Expected closing parenthesis for arguments list"),E}function I(){const E=[];for(;!a($.CloseParen);){let M=f();if(a($.Equals)){if(++r,!(M instanceof Nt))throw new SyntaxError("Expected identifier for keyword argument");const O=f();M=new $g(M,O)}E.push(M),a($.Comma)&&++r}return E}function D(){const E=[];let M=!1;for(;!a($.CloseSquareBracket);)a($.Colon)?(E.push(void 0),++r,M=!0):(E.push(f()),a($.Colon)&&(++r,M=!0));if(E.length===0)throw new SyntaxError("Expected at least one argument for member/slice expression");if(M){if(E.length>3)throw new SyntaxError("Expected 0-3 arguments for slice expression");return new vg(...E)}return E[0]}function R(){let E=V();for(;a($.Dot)||a($.OpenSquareBracket);){const M=e[r];++r;let O;const B=M.type!==$.Dot;if(B)O=D(),n($.CloseSquareBracket,"Expected closing square bracket");else if(O=V(),O.type!=="Identifier")throw new SyntaxError("Expected identifier following dot operator");E=new hg(E,O,B)}return E}function U(){let E=q();for(;a($.MultiplicativeBinaryOperator);){const M=e[r];++r;const O=q();E=new ur(M,E,O)}return E}function q(){let E=H();for(;a($.Is);){++r;const M=a($.Not);M&&++r;let O=V();if(O instanceof yp&&(O=new Nt(O.value.toString())),!(O instanceof Nt))throw new SyntaxError("Expected identifier for the test");E=new yg(E,M,O)}return E}function H(){let E=y();for(;a($.Pipe);){++r;let M=V();if(!(M instanceof Nt))throw new SyntaxError("Expected identifier for the filter");a($.OpenParen)&&(M=S(M)),E=new wg(E,M)}return E}function V(){const E=e[r];switch(E.type){case $.NumericLiteral:return++r,new mg(Number(E.value));case $.StringLiteral:return++r,new wp(E.value);case $.BooleanLiteral:return++r,new yp(E.value==="true");case $.Identifier:return++r,new Nt(E.value);case $.OpenParen:{++r;const M=p();if(e[r].type!==$.CloseParen)throw new SyntaxError(`Expected closing parenthesis, got ${e[r].type} instead`);return++r,M}case $.OpenSquareBracket:{++r;const M=[];for(;!a($.CloseSquareBracket);)M.push(f()),a($.Comma)&&++r;return++r,new gg(M)}case $.OpenCurlyBracket:{++r;const M=new Map;for(;!a($.CloseCurlyBracket);){const O=f();n($.Colon,"Expected colon between key and value in object literal");const B=f();M.set(O,B),a($.Comma)&&++r}return++r,new _g(M)}default:throw new SyntaxError(`Unexpected token: ${E.type}`)}}for(;r<e.length;)t.body.push(s());return t}function kg(e,t,r=1){t===void 0&&(t=e,e=0);const n=[];for(let s=e;s<t;s+=r)n.push(s);return n}function vp(e,t,r,n=1){const s=Math.sign(n);s>=0?(t=(t??(t=0))<0?Math.max(e.length+t,0):Math.min(t,e.length),r=(r??(r=e.length))<0?Math.max(e.length+r,0):Math.min(r,e.length)):(t=(t??(t=e.length-1))<0?Math.max(e.length+t,-1):Math.min(t,e.length-1),r=(r??(r=-1))<-1?Math.max(e.length+r,-1):Math.min(r,e.length-1));const i=[];for(let a=t;s*a<s*r;a+=n)i.push(e[a]);return i}function $p(e){return e.replace(/\b\w/g,t=>t.toUpperCase())}var at=class{constructor(e=void 0){T(this,"type","RuntimeValue");T(this,"value");T(this,"builtins",new Map);this.value=e}__bool__(){return new me(!!this.value)}},ue=class extends at{constructor(){super(...arguments);T(this,"type","NumericValue")}},te=class extends at{constructor(){super(...arguments);T(this,"type","StringValue");T(this,"builtins",new Map([["upper",new ot(()=>new te(this.value.toUpperCase()))],["lower",new ot(()=>new te(this.value.toLowerCase()))],["strip",new ot(()=>new te(this.value.trim()))],["title",new ot(()=>new te($p(this.value)))],["length",new ue(this.value.length)]]))}},me=class extends at{constructor(){super(...arguments);T(this,"type","BooleanValue")}},Qe=class extends at{constructor(){super(...arguments);T(this,"type","ObjectValue");T(this,"builtins",new Map([["get",new ot(([t,r])=>{if(!(t instanceof te))throw new Error(`Object key must be a string: got ${t.type}`);return this.value.get(t.value)??r??new dr})],["items",new ot(()=>new de(Array.from(this.value.entries()).map(([t,r])=>new de([new te(t),r]))))]]))}__bool__(){return new me(this.value.size>0)}},de=class extends at{constructor(){super(...arguments);T(this,"type","ArrayValue");T(this,"builtins",new Map([["length",new ue(this.value.length)]]))}__bool__(){return new me(this.value.length>0)}},Sg=class extends de{constructor(){super(...arguments);T(this,"type","TupleValue")}},ot=class extends at{constructor(){super(...arguments);T(this,"type","FunctionValue")}},dr=class extends at{constructor(){super(...arguments);T(this,"type","NullValue")}},Xe=class extends at{constructor(){super(...arguments);T(this,"type","UndefinedValue")}},wi=class{constructor(e){T(this,"variables",new Map([["namespace",new ot(e=>{if(e.length===0)return new Qe(new Map);if(e.length!==1||!(e[0]instanceof Qe))throw new Error("`namespace` expects either zero arguments or a single object argument");return e[0]})]]));T(this,"tests",new Map([["boolean",e=>e.type==="BooleanValue"],["callable",e=>e instanceof ot],["odd",e=>{if(e.type!=="NumericValue")throw new Error(`Cannot apply test "odd" to type: ${e.type}`);return e.value%2!==0}],["even",e=>{if(e.type!=="NumericValue")throw new Error(`Cannot apply test "even" to type: ${e.type}`);return e.value%2===0}],["false",e=>e.type==="BooleanValue"&&!e.value],["true",e=>e.type==="BooleanValue"&&e.value],["number",e=>e.type==="NumericValue"],["integer",e=>e.type==="NumericValue"&&Number.isInteger(e.value)],["iterable",e=>e instanceof de||e instanceof te],["lower",e=>{const t=e.value;return e.type==="StringValue"&&t===t.toLowerCase()}],["upper",e=>{const t=e.value;return e.type==="StringValue"&&t===t.toUpperCase()}],["none",e=>e.type==="NullValue"],["defined",e=>e.type!=="UndefinedValue"],["undefined",e=>e.type==="UndefinedValue"],["equalto",(e,t)=>e.value===t.value]]));this.parent=e}set(e,t){return this.declareVariable(e,pn(t))}declareVariable(e,t){if(this.variables.has(e))throw new SyntaxError(`Variable already declared: ${e}`);return this.variables.set(e,t),t}setVariable(e,t){return this.variables.set(e,t),t}resolve(e){if(this.variables.has(e))return this;if(this.parent)return this.parent.resolve(e);throw new Error(`Unknown variable: ${e}`)}lookupVariable(e){try{return this.resolve(e).variables.get(e)??new Xe}catch{return new Xe}}},Eg=class{constructor(e){T(this,"global");this.global=e??new wi}run(e){return this.evaluate(e,this.global)}evaluateBinaryExpression(e,t){const r=this.evaluate(e.left,t);switch(e.operator.value){case"and":return r.__bool__().value?this.evaluate(e.right,t):r;case"or":return r.__bool__().value?r:this.evaluate(e.right,t)}const n=this.evaluate(e.right,t);switch(e.operator.value){case"==":return new me(r.value==n.value);case"!=":return new me(r.value!=n.value)}if(r instanceof Xe||n instanceof Xe)throw new Error("Cannot perform operation on undefined values");if(r instanceof dr||n instanceof dr)throw new Error("Cannot perform operation on null values");if(r instanceof ue&&n instanceof ue)switch(e.operator.value){case"+":return new ue(r.value+n.value);case"-":return new ue(r.value-n.value);case"*":return new ue(r.value*n.value);case"/":return new ue(r.value/n.value);case"%":return new ue(r.value%n.value);case"<":return new me(r.value<n.value);case">":return new me(r.value>n.value);case">=":return new me(r.value>=n.value);case"<=":return new me(r.value<=n.value)}else if(r instanceof de&&n instanceof de)switch(e.operator.value){case"+":return new de(r.value.concat(n.value))}else if(n instanceof de){const s=n.value.find(i=>i.value===r.value)!==void 0;switch(e.operator.value){case"in":return new me(s);case"not in":return new me(!s)}}if(r instanceof te||n instanceof te)switch(e.operator.value){case"+":return new te(r.value.toString()+n.value.toString())}if(r instanceof te&&n instanceof te)switch(e.operator.value){case"in":return new me(n.value.includes(r.value));case"not in":return new me(!n.value.includes(r.value))}if(r instanceof te&&n instanceof Qe)switch(e.operator.value){case"in":return new me(n.value.has(r.value));case"not in":return new me(!n.value.has(r.value))}throw new SyntaxError(`Unknown operator "${e.operator.value}" between ${r.type} and ${n.type}`)}evaluateFilterExpression(e,t){const r=this.evaluate(e.operand,t);if(e.filter.type==="Identifier"){const n=e.filter;if(r instanceof de)switch(n.value){case"list":return r;case"first":return r.value[0];case"last":return r.value[r.value.length-1];case"length":return new ue(r.value.length);case"reverse":return new de(r.value.reverse());case"sort":return new de(r.value.sort((s,i)=>{if(s.type!==i.type)throw new Error(`Cannot compare different types: ${s.type} and ${i.type}`);switch(s.type){case"NumericValue":return s.value-i.value;case"StringValue":return s.value.localeCompare(i.value);default:throw new Error(`Cannot compare type: ${s.type}`)}}));default:throw new Error(`Unknown ArrayValue filter: ${n.value}`)}else if(r instanceof te)switch(n.value){case"length":return new ue(r.value.length);case"upper":return new te(r.value.toUpperCase());case"lower":return new te(r.value.toLowerCase());case"title":return new te($p(r.value));case"capitalize":return new te(r.value.charAt(0).toUpperCase()+r.value.slice(1));case"trim":return new te(r.value.trim());default:throw new Error(`Unknown StringValue filter: ${n.value}`)}else if(r instanceof ue)switch(n.value){case"abs":return new ue(Math.abs(r.value));default:throw new Error(`Unknown NumericValue filter: ${n.value}`)}else if(r instanceof Qe)switch(n.value){case"items":return new de(Array.from(r.value.entries()).map(([s,i])=>new de([new te(s),i])));case"length":return new ue(r.value.size);default:throw new Error(`Unknown ObjectValue filter: ${n.value}`)}throw new Error(`Cannot apply filter "${n.value}" to type: ${r.type}`)}else if(e.filter.type==="CallExpression"){const n=e.filter;if(n.callee.type!=="Identifier")throw new Error(`Unknown filter: ${n.callee.type}`);const s=n.callee.value;if(r instanceof de){switch(s){case"selectattr":{if(r.value.some(d=>!(d instanceof Qe)))throw new Error("`selectattr` can only be applied to array of objects");if(n.args.some(d=>d.type!=="StringLiteral"))throw new Error("arguments of `selectattr` must be strings");const[i,a,o]=n.args.map(d=>this.evaluate(d,t));let l;if(a){const d=t.tests.get(a.value);if(!d)throw new Error(`Unknown test: ${a.value}`);l=d}else l=(...d)=>d[0].__bool__().value;const u=r.value.filter(d=>{const c=d.value.get(i.value);return c?l(c,o):!1});return new de(u)}}throw new Error(`Unknown ArrayValue filter: ${s}`)}else throw new Error(`Cannot apply filter "${s}" to type: ${r.type}`)}throw new Error(`Unknown filter: ${e.filter.type}`)}evaluateTestExpression(e,t){const r=this.evaluate(e.operand,t),n=t.tests.get(e.test.value);if(!n)throw new Error(`Unknown test: ${e.test.value}`);const s=n(r);return new me(e.negate?!s:s)}evaluateUnaryExpression(e,t){const r=this.evaluate(e.argument,t);switch(e.operator.value){case"not":return new me(!r.value);default:throw new SyntaxError(`Unknown operator: ${e.operator.value}`)}}evalProgram(e,t){return this.evaluateBlock(e.body,t)}evaluateBlock(e,t){let r="";for(const n of e){const s=this.evaluate(n,t);s.type!=="NullValue"&&s.type!=="UndefinedValue"&&(r+=s.value)}return new te(r)}evaluateIdentifier(e,t){return t.lookupVariable(e.value)}evaluateCallExpression(e,t){const r=[],n=new Map;for(const i of e.args)if(i.type==="KeywordArgumentExpression"){const a=i;n.set(a.key.value,this.evaluate(a.value,t))}else r.push(this.evaluate(i,t));n.size>0&&r.push(new Qe(n));const s=this.evaluate(e.callee,t);if(s.type!=="FunctionValue")throw new Error(`Cannot call something that is not a function: got ${s.type}`);return s.value(r,t)}evaluateSliceExpression(e,t,r){if(!(e instanceof de||e instanceof te))throw new Error("Slice object must be an array or string");const n=this.evaluate(t.start,r),s=this.evaluate(t.stop,r),i=this.evaluate(t.step,r);if(!(n instanceof ue||n instanceof Xe))throw new Error("Slice start must be numeric or undefined");if(!(s instanceof ue||s instanceof Xe))throw new Error("Slice stop must be numeric or undefined");if(!(i instanceof ue||i instanceof Xe))throw new Error("Slice step must be numeric or undefined");return e instanceof de?new de(vp(e.value,n.value,s.value,i.value)):new te(vp(Array.from(e.value),n.value,s.value,i.value).join(""))}evaluateMemberExpression(e,t){const r=this.evaluate(e.object,t);let n;if(e.computed){if(e.property.type==="SliceExpression")return this.evaluateSliceExpression(r,e.property,t);n=this.evaluate(e.property,t)}else n=new te(e.property.value);let s;if(r instanceof Qe){if(!(n instanceof te))throw new Error(`Cannot access property with non-string: got ${n.type}`);s=r.value.get(n.value)??r.builtins.get(n.value)}else if(r instanceof de||r instanceof te)if(n instanceof ue)s=r.value.at(n.value),r instanceof te&&(s=new te(r.value.at(n.value)));else if(n instanceof te)s=r.builtins.get(n.value);else throw new Error(`Cannot access property with non-string/non-number: got ${n.type}`);else{if(!(n instanceof te))throw new Error(`Cannot access property with non-string: got ${n.type}`);s=r.builtins.get(n.value)}return s instanceof at?s:new Xe}evaluateSet(e,t){const r=this.evaluate(e.value,t);if(e.assignee.type==="Identifier"){const n=e.assignee.value;t.setVariable(n,r)}else if(e.assignee.type==="MemberExpression"){const n=e.assignee,s=this.evaluate(n.object,t);if(!(s instanceof Qe))throw new Error("Cannot assign to member of non-object");if(n.property.type!=="Identifier")throw new Error("Cannot assign to member with non-identifier property");s.value.set(n.property.value,r)}else throw new Error(`Invalid LHS inside assignment expression: ${JSON.stringify(e.assignee)}`);return new dr}evaluateIf(e,t){const r=this.evaluate(e.test,t);return this.evaluateBlock(r.__bool__().value?e.body:e.alternate,t)}evaluateFor(e,t){const r=new wi(t),n=this.evaluate(e.iterable,r);if(!(n instanceof de))throw new Error(`Expected iterable type in for loop: got ${n.type}`);let s="";for(let i=0;i<n.value.length;++i){const a=new Map([["index",new ue(i+1)],["index0",new ue(i)],["revindex",new ue(n.value.length-i)],["revindex0",new ue(n.value.length-i-1)],["first",new me(i===0)],["last",new me(i===n.value.length-1)],["length",new ue(n.value.length)],["previtem",i>0?n.value[i-1]:new Xe],["nextitem",i<n.value.length-1?n.value[i+1]:new Xe]]);r.setVariable("loop",new Qe(a));const o=n.value[i];if(e.loopvar.type==="Identifier")r.setVariable(e.loopvar.value,o);else if(e.loopvar.type==="TupleLiteral"){const u=e.loopvar;if(o.type!=="ArrayValue")throw new Error(`Cannot unpack non-iterable type: ${o.type}`);const d=o;if(u.value.length!==d.value.length)throw new Error(`Too ${u.value.length>d.value.length?"few":"many"} items to unpack`);for(let c=0;c<u.value.length;++c){if(u.value[c].type!=="Identifier")throw new Error(`Cannot unpack non-identifier type: ${u.value[c].type}`);r.setVariable(u.value[c].value,d.value[c])}}const l=this.evaluateBlock(e.body,r);s+=l.value}return new te(s)}evaluate(e,t){if(e===void 0)return new Xe;switch(e.type){case"Program":return this.evalProgram(e,t);case"Set":return this.evaluateSet(e,t);case"If":return this.evaluateIf(e,t);case"For":return this.evaluateFor(e,t);case"NumericLiteral":return new ue(Number(e.value));case"StringLiteral":return new te(e.value);case"BooleanLiteral":return new me(e.value);case"ArrayLiteral":return new de(e.value.map(r=>this.evaluate(r,t)));case"TupleLiteral":return new Sg(e.value.map(r=>this.evaluate(r,t)));case"ObjectLiteral":{const r=new Map;for(const[n,s]of e.value){const i=this.evaluate(n,t);if(!(i instanceof te))throw new Error(`Object keys must be strings: got ${i.type}`);r.set(i.value,this.evaluate(s,t))}return new Qe(r)}case"Identifier":return this.evaluateIdentifier(e,t);case"CallExpression":return this.evaluateCallExpression(e,t);case"MemberExpression":return this.evaluateMemberExpression(e,t);case"UnaryExpression":return this.evaluateUnaryExpression(e,t);case"BinaryExpression":return this.evaluateBinaryExpression(e,t);case"FilterExpression":return this.evaluateFilterExpression(e,t);case"TestExpression":return this.evaluateTestExpression(e,t);default:throw new SyntaxError(`Unknown node type: ${e.type}`)}}};function pn(e){switch(typeof e){case"number":return new ue(e);case"string":return new te(e);case"boolean":return new me(e);case"object":return e===null?new dr:Array.isArray(e)?new de(e.map(pn)):new Qe(new Map(Object.entries(e).map(([t,r])=>[t,pn(r)])));case"function":return new ot((t,r)=>{const n=e(...t.map(s=>s.value))??null;return pn(n)});default:throw new Error(`Cannot convert to runtime value: ${e}`)}}var Tg=class{constructor(e){T(this,"parsed");const t=ug(e,{lstrip_blocks:!0,trim_blocks:!0});this.parsed=xg(t)}render(e){const t=new wi;t.set("false",!1),t.set("true",!0),t.set("raise_exception",s=>{throw new Error(s)}),t.set("range",kg);for(const[s,i]of Object.entries(e))t.set(s,i);return new Eg(t).run(this.parsed).value}};async function xp(e,t){const r=await Promise.all([_t(e,"tokenizer.json",!0,t),_t(e,"tokenizer_config.json",!0,t)]);return t.legacy!==null&&(r[1].legacy=t.legacy),r}function Ig(e,t){const r=[];let n=0;for(const s of e.matchAll(t)){const i=s[0];n<s.index&&r.push(e.slice(n,s.index)),i.length>0&&r.push(i),n=s.index+i.length}return n<e.length&&r.push(e.slice(n)),r}function hn(e,t=!0){if(e.Regex!==void 0){let r=e.Regex.replace(/\\([#&~])/g,"$1");for(const[n,s]of Ag)r=r.replaceAll(n,s);return new RegExp(r,"gu")}else if(e.String!==void 0){const r=Di(e.String);return new RegExp(t?r:`(${r})`,"gu")}else return console.warn("Unknown pattern type:",e),null}function yi(e){return new Map(Object.entries(e))}function kp(e){const t=e.dims;switch(t.length){case 1:return e.tolist();case 2:if(t[0]!==1)throw new Error("Unable to decode tensor with `batch size !== 1`. Use `tokenizer.batch_decode(...)` for batched inputs.");return e.tolist()[0];default:throw new Error(`Expected tensor to have 1-2 dimensions, got ${t.length}.`)}}function bi(e){return e.replace(/ \./g,".").replace(/ \?/g,"?").replace(/ \!/g,"!").replace(/ ,/g,",").replace(/ \' /g,"'").replace(/ n\'t/g,"n't").replace(/ \'m/g,"'m").replace(/ \'s/g,"'s").replace(/ \'ve/g,"'ve").replace(/ \'re/g,"'re")}function Sp(e){return e.replace(/[\u0300-\u036f]/g,"")}function Mg(e){return Sp(e.toLowerCase())}function Ep(e){return e>=19968&&e<=40959||e>=13312&&e<=19903||e>=131072&&e<=173791||e>=173824&&e<=177983||e>=177984&&e<=178207||e>=178208&&e<=183983||e>=63744&&e<=64255||e>=194560&&e<=195103}function Cg(e,t,r){const n=[];let s=0;for(;s<e.length;){if(n.push(e[s]),(r.get(e[s])??t)!==t){++s;continue}for(;s<e.length&&(r.get(e[s])??t)===t;)++s}return n}function zg(e){return e.match(/\S+/g)||[]}const cr="\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E",Ag=new Map([["(?i:'s|'t|'re|'ve|'m|'ll|'d)","(?:'([sS]|[tT]|[rR][eE]|[vV][eE]|[mM]|[lL][lL]|[dD]))"]]);class Pg{constructor(t){this.content=t.content,this.id=t.id,this.single_word=t.single_word??!1,this.lstrip=t.lstrip??!1,this.rstrip=t.rstrip??!1,this.special=t.special??!1,this.normalized=t.normalized??null}}class pr extends Ce{constructor(t){super(),this.config=t,this.vocab=[],this.tokens_to_ids=new Map,this.unk_token_id=void 0,this.unk_token=void 0,this.end_of_word_suffix=void 0,this.fuse_unk=this.config.fuse_unk??!1}static fromConfig(t,...r){switch(t.type){case"WordPiece":return new Og(t);case"Unigram":return new Bg(t,...r);case"BPE":return new Dg(t);default:if(t.vocab)return new Lg(t,...r);throw new Error(`Unknown TokenizerModel type: ${t.type}`)}}_call(t){let r=this.encode(t);return this.fuse_unk&&(r=Cg(r,this.unk_token_id,this.tokens_to_ids)),r}encode(t){throw Error("encode should be implemented in subclass.")}convert_tokens_to_ids(t){return t.map(r=>this.tokens_to_ids.get(r)??this.unk_token_id)}convert_ids_to_tokens(t){return t.map(r=>this.vocab[r]??this.unk_token)}}class Og extends pr{constructor(t){super(t),this.tokens_to_ids=yi(t.vocab),this.unk_token_id=this.tokens_to_ids.get(t.unk_token),this.unk_token=t.unk_token,this.max_input_chars_per_word=t.max_input_chars_per_word??100,this.vocab=new Array(this.tokens_to_ids.size);for(const[r,n]of this.tokens_to_ids)this.vocab[n]=r}encode(t){const r=[];for(const n of t){const s=[...n];if(s.length>this.max_input_chars_per_word){r.push(this.unk_token);continue}let i=!1,a=0;const o=[];for(;a<s.length;){let l=s.length,u=null;for(;a<l;){let d=s.slice(a,l).join("");if(a>0&&(d=this.config.continuing_subword_prefix+d),this.tokens_to_ids.has(d)){u=d;break}--l}if(u===null){i=!0;break}o.push(u),a=l}i?r.push(this.unk_token):r.push(...o)}return r}}class Bg extends pr{constructor(t,r){super(t);const n=t.vocab.length;this.vocab=new Array(n),this.scores=new Array(n);for(let s=0;s<n;++s){const i=t.vocab[s];this.vocab[s]=i[0],this.scores[s]=i[1]}this.unk_token_id=t.unk_id,this.unk_token=this.vocab[t.unk_id],this.tokens_to_ids=new Map(this.vocab.map((s,i)=>[s,i])),this.bosToken=" ",this.bosTokenId=this.tokens_to_ids.get(this.bosToken),this.eosToken=r.eos_token,this.eosTokenId=this.tokens_to_ids.get(this.eosToken),this.unkToken=this.vocab[this.unk_token_id],this.minScore=_f(this.scores)[0],this.unkScore=this.minScore-10,this.scores[this.unk_token_id]=this.unkScore,this.trie=new sg,this.trie.extend(this.vocab),this.fuse_unk=!0}populateNodes(t){const r=t.sentence,n=r.length;let s=0;for(;s<n;){let a=!1;for(let o of this.trie.commonPrefixSearch(r.slice(s))){const l=this.tokens_to_ids.get(o),u=this.scores[l],d=o.length;t.insert(s,d,u,l),!a&&d===1&&(a=!0)}a||t.insert(s,1,this.unkScore,this.unk_token_id),s+=1}}tokenize(t){const r=new ig(t,this.bosTokenId,this.eosTokenId);return this.populateNodes(r),r.tokens()}encode(t){const r=[];for(const n of t){const s=this.tokenize(n);r.push(...s)}return r}}const Tp=(()=>{const e=[...Array.from({length:94},(s,i)=>i+33),...Array.from({length:12},(s,i)=>i+161),...Array.from({length:82},(s,i)=>i+174)],t=e.slice();let r=0;for(let s=0;s<256;++s)e.includes(s)||(e.push(s),t.push(256+r),r+=1);const n=t.map(s=>String.fromCharCode(s));return Object.fromEntries(e.map((s,i)=>[s,n[i]]))})(),Rg=df(Tp);class Dg extends pr{constructor(t){super(t),this.BPE_SPLIT_TOKEN=" ",this.tokens_to_ids=yi(t.vocab),this.unk_token_id=this.tokens_to_ids.get(t.unk_token),this.unk_token=t.unk_token,this.vocab=new Array(this.tokens_to_ids.size);for(const[r,n]of this.tokens_to_ids)this.vocab[n]=r;this.bpe_ranks=new Map(t.merges.map((r,n)=>[r,n])),this.merges=t.merges.map(r=>r.split(this.BPE_SPLIT_TOKEN)),this.end_of_word_suffix=t.end_of_word_suffix,this.continuing_subword_suffix=t.continuing_subword_suffix??null,this.byte_fallback=this.config.byte_fallback??!1,this.byte_fallback&&(this.text_encoder=new TextEncoder),this.cache=new Map}bpe(t){if(t.length===0)return[];const r=this.cache.get(t);if(r!==void 0)return r;const n=Array.from(t);this.end_of_word_suffix&&(n[n.length-1]+=this.end_of_word_suffix);let s=[];if(n.length>1){const i=new ng((l,u)=>l.score<u.score);let a={token:n[0],bias:0,prev:null,next:null},o=a;for(let l=1;l<n.length;++l){const u={bias:l/n.length,token:n[l],prev:o,next:null};o.next=u,this._add_node(i,o),o=u}for(;!i.isEmpty();){const l=i.pop();if(l.deleted||!l.next||l.next.deleted)continue;if(l.deleted=!0,l.next.deleted=!0,l.prev){const d={...l.prev};l.prev.deleted=!0,l.prev=d,d.prev?d.prev.next=d:a=d}const u={token:l.token+l.next.token,bias:l.bias,prev:l.prev,next:l.next.next};u.prev?(u.prev.next=u,this._add_node(i,u.prev)):a=u,u.next&&(u.next.prev=u,this._add_node(i,u))}for(let l=a;l!==null;l=l.next)s.push(l.token)}else s=n;if(this.continuing_subword_suffix)for(let i=0;i<s.length-1;++i)s[i]+=this.continuing_subword_suffix;return this.cache.set(t,s),s}_add_node(t,r){const n=this.bpe_ranks.get(r.token+this.BPE_SPLIT_TOKEN+r.next.token);n!==void 0&&(r.score=n+r.bias,t.push(r))}encode(t){const r=[];for(const n of t){const s=this.bpe(n);for(const i of s)this.tokens_to_ids.has(i)?r.push(i):this.byte_fallback?r.push(...Array.from(this.text_encoder.encode(i)).map(a=>`<0x${a.toString(16).toUpperCase().padStart(2,"0")}>`)):r.push(this.unk_token)}return r}}class Lg extends pr{constructor(t,r){super(t),this.tokens_to_ids=yi(r.target_lang?t.vocab[r.target_lang]:t.vocab),this.bos_token=r.bos_token,this.bos_token_id=this.tokens_to_ids.get(this.bos_token),this.eos_token=r.eos_token,this.eos_token_id=this.tokens_to_ids.get(this.eos_token),this.pad_token=r.pad_token,this.pad_token_id=this.tokens_to_ids.get(this.pad_token),this.unk_token=r.unk_token,this.unk_token_id=this.tokens_to_ids.get(this.unk_token),this.vocab=new Array(this.tokens_to_ids.size);for(const[n,s]of this.tokens_to_ids)this.vocab[s]=n}encode(t){return t}}class ze extends Ce{constructor(t){super(),this.config=t}static fromConfig(t){if(t===null)return null;switch(t.type){case"BertNormalizer":return new Kg(t);case"Precompiled":return new h_(t);case"Sequence":return new Hg(t);case"Replace":return new Fg(t);case"NFC":return new Ng(t);case"NFKC":return new Ug(t);case"NFKD":return new qg(t);case"Strip":return new Gg(t);case"StripAccents":return new Vg(t);case"Lowercase":return new jg(t);case"Prepend":return new Wg(t);default:throw new Error(`Unknown Normalizer type: ${t.type}`)}}normalize(t){throw Error("normalize should be implemented in subclass.")}_call(t){return this.normalize(t)}}class Fg extends ze{normalize(t){const r=hn(this.config.pattern);return r===null?t:t.replaceAll(r,this.config.content)}}class Ng extends ze{normalize(t){return t=t.normalize("NFC"),t}}class Ug extends ze{normalize(t){return t=t.normalize("NFKC"),t}}class qg extends ze{normalize(t){return t=t.normalize("NFKD"),t}}class Gg extends ze{normalize(t){return this.config.strip_left&&this.config.strip_right?t=t.trim():(this.config.strip_left&&(t=t.trimStart()),this.config.strip_right&&(t=t.trimEnd())),t}}class Vg extends ze{normalize(t){return t=Sp(t),t}}class jg extends ze{normalize(t){return t=t.toLowerCase(),t}}class Wg extends ze{normalize(t){return t=this.config.prepend+t,t}}class Hg extends ze{constructor(t){super(t),this.normalizers=t.normalizers.map(r=>ze.fromConfig(r))}normalize(t){return this.normalizers.reduce((r,n)=>n.normalize(r),t)}}class Kg extends ze{_tokenize_chinese_chars(t){const r=[];for(let n=0;n<t.length;++n){const s=t[n],i=s.charCodeAt(0);Ep(i)?(r.push(" "),r.push(s),r.push(" ")):r.push(s)}return r.join("")}stripAccents(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}_is_control(t){switch(t){case"	":case`
`:case"\r":return!1;default:return new RegExp("^\\p{Cc}|\\p{Cf}|\\p{Co}|\\p{Cs}$","u").test(t)}}_clean_text(t){const r=[];for(const n of t){const s=n.charCodeAt(0);s===0||s===65533||this._is_control(n)||(/^\s$/.test(n)?r.push(" "):r.push(n))}return r.join("")}normalize(t){return this.config.clean_text&&(t=this._clean_text(t)),this.config.handle_chinese_chars&&(t=this._tokenize_chinese_chars(t)),this.config.lowercase?(t=t.toLowerCase(),this.config.strip_accents!==!1&&(t=this.stripAccents(t))):this.config.strip_accents&&(t=this.stripAccents(t)),t}}class De extends Ce{static fromConfig(t){if(t===null)return null;switch(t.type){case"BertPreTokenizer":return new Qg(t);case"Sequence":return new f_(t);case"Whitespace":return new m_(t);case"WhitespaceSplit":return new g_(t);case"Metaspace":return new Cp(t);case"ByteLevel":return new Xg(t);case"Split":return new Yg(t);case"Punctuation":return new Zg(t);case"Digits":return new Jg(t);case"Replace":return new __(t);default:throw new Error(`Unknown PreTokenizer type: ${t.type}`)}}pre_tokenize_text(t,r){throw Error("pre_tokenize_text should be implemented in subclass.")}pre_tokenize(t,r){return(Array.isArray(t)?t.map(n=>this.pre_tokenize_text(n,r)):this.pre_tokenize_text(t,r)).flat()}_call(t,r){return this.pre_tokenize(t,r)}}class Qg extends De{constructor(t){super(),this.pattern=new RegExp(`[^\\s${cr}]+|[${cr}]`,"gu")}pre_tokenize_text(t,r){return t.trim().match(this.pattern)||[]}}class Xg extends De{constructor(t){super(),this.config=t,this.add_prefix_space=this.config.add_prefix_space,this.trim_offsets=this.config.trim_offsets,this.use_regex=this.config.use_regex??!0,this.pattern=new RegExp("'s|'t|'re|'ve|'m|'ll|'d| ?\\p{L}+| ?\\p{N}+| ?[^\\s\\p{L}\\p{N}]+|\\s+(?!\\S)|\\s+","gu"),this.byte_encoder=Tp,this.text_encoder=new TextEncoder}pre_tokenize_text(t,r){return this.add_prefix_space&&!t.startsWith(" ")&&(t=" "+t),(this.use_regex?t.match(this.pattern)||[]:[t]).map(s=>Array.from(this.text_encoder.encode(s),i=>this.byte_encoder[i]).join(""))}}class Yg extends De{constructor(t){super(),this.config=t,this.pattern=hn(this.config.pattern,this.config.invert)}pre_tokenize_text(t,r){return this.pattern===null?[]:this.config.invert?t.match(this.pattern)||[]:Ig(t,this.pattern)}}class Zg extends De{constructor(t){super(),this.config=t,this.pattern=new RegExp(`[^${cr}]+|[${cr}]+`,"gu")}pre_tokenize_text(t,r){return t.match(this.pattern)||[]}}class Jg extends De{constructor(t){super(),this.config=t;const r=`[^\\d]+|\\d${this.config.individual_digits?"":"+"}`;this.pattern=new RegExp(r,"gu")}pre_tokenize_text(t,r){return t.match(this.pattern)||[]}}class fn extends Ce{constructor(t){super(),this.config=t}static fromConfig(t){if(t===null)return null;switch(t.type){case"TemplateProcessing":return new e_(t);case"ByteLevel":return new t_(t);case"RobertaProcessing":return new Mp(t);case"BertProcessing":return new Ip(t);default:throw new Error(`Unknown PostProcessor type: ${t.type}`)}}post_process(t,...r){throw Error("post_process should be implemented in subclass.")}_call(t,...r){return this.post_process(t,...r)}}class Ip extends fn{constructor(t){super(t),this.cls=t.cls[0],this.sep=t.sep[0]}post_process(t,r=null,{add_special_tokens:n=!0}={}){n&&(t=ye([this.cls],t,[this.sep]));let s=new Array(t.length).fill(0);if(r!==null){const i=n&&this instanceof Mp?[this.sep]:[],a=n?[this.sep]:[];t=ye(t,i,r,a),s=ye(s,new Array(r.length+i.length+a.length).fill(1))}return{tokens:t,token_type_ids:s}}}class Mp extends Ip{}class e_ extends fn{constructor(t){super(t),this.single=t.single,this.pair=t.pair}post_process(t,r=null,{add_special_tokens:n=!0}={}){const s=r===null?this.single:this.pair;let i=[],a=[];for(const o of s)"SpecialToken"in o?n&&(i.push(o.SpecialToken.id),a.push(o.SpecialToken.type_id)):"Sequence"in o&&(o.Sequence.id==="A"?(i=ye(i,t),a=ye(a,new Array(t.length).fill(o.Sequence.type_id))):o.Sequence.id==="B"&&(i=ye(i,r),a=ye(a,new Array(r.length).fill(o.Sequence.type_id))));return{tokens:i,token_type_ids:a}}}class t_ extends fn{post_process(t,r=null){return r&&(t=ye(t,r)),{tokens:t}}}class Ae extends Ce{constructor(t){super(),this.config=t,this.added_tokens=[],this.end_of_word_suffix=null,this.trim_offsets=t.trim_offsets}static fromConfig(t){if(t===null)return null;switch(t.type){case"WordPiece":return new a_(t);case"Metaspace":return new p_(t);case"ByteLevel":return new o_(t);case"Replace":return new r_(t);case"ByteFallback":return new n_(t);case"Fuse":return new s_(t);case"Strip":return new i_(t);case"Sequence":return new u_(t);case"CTC":return new l_(t);case"BPEDecoder":return new d_(t);default:throw new Error(`Unknown Decoder type: ${t.type}`)}}_call(t){return this.decode(t)}decode(t){return this.decode_chain(t).join("")}decode_chain(t){throw Error("`decode_chain` should be implemented in subclass.")}}class r_ extends Ae{decode_chain(t){const r=hn(this.config.pattern);return r===null?t:t.map(n=>n.replaceAll(r,this.config.content))}}class n_ extends Ae{constructor(t){super(t),this.text_decoder=new TextDecoder}decode_chain(t){const r=[];let n=[];for(const s of t){let i=null;if(s.length===6&&s.startsWith("<0x")&&s.endsWith(">")){const a=parseInt(s.slice(3,5),16);isNaN(a)||(i=a)}if(i!==null)n.push(i);else{if(n.length>0){const a=this.text_decoder.decode(Uint8Array.from(n));r.push(a),n=[]}r.push(s)}}if(n.length>0){const s=this.text_decoder.decode(Uint8Array.from(n));r.push(s),n=[]}return r}}class s_ extends Ae{decode_chain(t){return[t.join("")]}}class i_ extends Ae{constructor(t){super(t),this.content=this.config.content,this.start=this.config.start,this.stop=this.config.stop}decode_chain(t){return t.map(r=>{let n=0;for(let i=0;i<this.start&&r[i]===this.content;++i){n=i+1;continue}let s=r.length;for(let i=0;i<this.stop;++i){const a=r.length-i-1;if(r[a]===this.content){s=a;continue}else break}return r.slice(n,s)})}}class a_ extends Ae{constructor(t){super(t),this.cleanup=t.cleanup}decode_chain(t){return t.map((r,n)=>(n!==0&&(r.startsWith(this.config.prefix)?r=r.replace(this.config.prefix,""):r=" "+r),this.cleanup&&(r=bi(r)),r))}}class o_ extends Ae{constructor(t){super(t),this.byte_decoder=Rg,this.text_decoder=new TextDecoder("utf-8",{fatal:!1,ignoreBOM:!0}),this.end_of_word_suffix=null}convert_tokens_to_string(t){const r=t.join(""),n=new Uint8Array([...r].map(i=>this.byte_decoder[i]));return this.text_decoder.decode(n)}decode_chain(t){const r=[];let n=[];for(const s of t)this.added_tokens.find(i=>i.content===s)!==void 0?(n.length>0&&(r.push(this.convert_tokens_to_string(n)),n=[]),r.push(s)):n.push(s);return n.length>0&&r.push(this.convert_tokens_to_string(n)),r}}class l_ extends Ae{constructor(t){super(t),this.pad_token=this.config.pad_token,this.word_delimiter_token=this.config.word_delimiter_token,this.cleanup=this.config.cleanup}convert_tokens_to_string(t){if(t.length===0)return"";const r=[t[0]];for(let i=1;i<t.length;++i)t[i]!==r.at(-1)&&r.push(t[i]);let s=r.filter(i=>i!==this.pad_token).join("");return this.cleanup&&(s=bi(s).replaceAll(this.word_delimiter_token," ").trim()),s}decode_chain(t){return[this.convert_tokens_to_string(t)]}}class u_ extends Ae{constructor(t){super(t),this.decoders=t.decoders.map(r=>Ae.fromConfig(r))}decode_chain(t){return this.decoders.reduce((r,n)=>n.decode_chain(r),t)}}class d_ extends Ae{constructor(t){super(t),this.suffix=this.config.suffix}decode_chain(t){return t.map((r,n)=>r.replaceAll(this.suffix,n===t.length-1?"":" "))}}class c_ extends Ae{decode_chain(t){let r="";for(let n=1;n<t.length;n+=2)r+=t[n];return[r]}}class Cp extends De{constructor(t){super(),this.addPrefixSpace=t.add_prefix_space,this.replacement=t.replacement,this.strRep=t.str_rep||this.replacement,this.prepend_scheme=t.prepend_scheme??"always"}pre_tokenize_text(t,{section_index:r=void 0}={}){let n=t.replaceAll(" ",this.strRep);return this.addPrefixSpace&&!n.startsWith(this.replacement)&&(this.prepend_scheme==="always"||this.prepend_scheme==="first"&&r===0)&&(n=this.strRep+n),[n]}}class p_ extends Ae{constructor(t){super(t),this.addPrefixSpace=t.add_prefix_space,this.replacement=t.replacement}decode_chain(t){const r=[];for(let n=0;n<t.length;++n){let s=t[n].replaceAll(this.replacement," ");this.addPrefixSpace&&n==0&&s.startsWith(" ")&&(s=s.substring(1)),r.push(s)}return r}}class h_ extends ze{constructor(t){super(t),this.charsmap=t.precompiled_charsmap}normalize(t){return t=t.replace(/[\u0001-\u0008\u000B\u000E-\u001F\u007F\u008F\u009F]/gm,""),t=t.replace(/[\u0009\u000A\u000C\u000D\u1680\u200B\u200C\u200E\u200F\u2028\u2029\u2581\uFEFF\uFFFD]/gm," "),t.includes("～")?t=t.split("～").map(n=>n.normalize("NFKC")).join("～"):t=t.normalize("NFKC"),t}}class f_ extends De{constructor(t){super(),this.tokenizers=t.pretokenizers.map(r=>De.fromConfig(r))}pre_tokenize_text(t,r){return this.tokenizers.reduce((n,s)=>s.pre_tokenize(n,r),[t])}}class m_ extends De{constructor(t){super()}pre_tokenize_text(t,r){return t.match(/\w+|[^\w\s]+/g)||[]}}class g_ extends De{constructor(t){super()}pre_tokenize_text(t,r){return zg(t)}}class __ extends De{constructor(t){super(),this.config=t,this.pattern=hn(this.config.pattern),this.content=this.config.content}pre_tokenize_text(t,r){return this.pattern===null?[t]:[t.replaceAll(this.pattern,this.config.content)]}}const w_=["bos_token","eos_token","unk_token","sep_token","pad_token","cls_token","mask_token"];function y_(e,t,r,n){for(const s of Object.keys(e)){const i=t-e[s].length,a=r(s),o=new Array(i).fill(a);e[s]=n==="right"?ye(e[s],o):ye(o,e[s])}}function b_(e,t){for(const r of Object.keys(e))e[r].length=t}class X extends Ce{constructor(r,n){super();T(this,"return_token_type_ids",!1);T(this,"_default_chat_template",`{% for message in messages %}{{'<|im_start|>' + message['role'] + '
' + message['content'] + '<|im_end|>' + '
'}}{% endfor %}{% if add_generation_prompt %}{{ '<|im_start|>assistant
' }}{% endif %}`);T(this,"padding_side","right");this._tokenizer_config=n,this.normalizer=ze.fromConfig(r.normalizer),this.pre_tokenizer=De.fromConfig(r.pre_tokenizer),this.model=pr.fromConfig(r.model,n),this.post_processor=fn.fromConfig(r.post_processor),this.decoder=Ae.fromConfig(r.decoder),this.special_tokens=[],this.all_special_ids=[],this.added_tokens=[];for(const s of r.added_tokens){const i=new Pg(s);this.added_tokens.push(i),this.model.tokens_to_ids.set(i.content,i.id),this.model.vocab[i.id]=i.content,i.special&&(this.special_tokens.push(i.content),this.all_special_ids.push(i.id))}if(this.additional_special_tokens=n.additional_special_tokens??[],this.special_tokens.push(...this.additional_special_tokens),this.special_tokens=[...new Set(this.special_tokens)],this.decoder&&(this.decoder.added_tokens=this.added_tokens,this.decoder.end_of_word_suffix=this.model.end_of_word_suffix),this.added_tokens_regex=this.added_tokens.length>0?new RegExp(this.added_tokens.map(s=>`${s.lstrip?"\\s*":""}(${Di(s.content)})${s.rstrip?"\\s*":""}`).join("|")):null,this.mask_token=this.getToken("mask_token"),this.mask_token_id=this.model.tokens_to_ids.get(this.mask_token),this.pad_token=this.getToken("pad_token","eos_token"),this.pad_token_id=this.model.tokens_to_ids.get(this.pad_token),this.sep_token=this.getToken("sep_token"),this.sep_token_id=this.model.tokens_to_ids.get(this.sep_token),this.unk_token=this.getToken("unk_token"),this.unk_token_id=this.model.tokens_to_ids.get(this.unk_token),this.model_max_length=n.model_max_length,this.remove_space=n.remove_space,this.clean_up_tokenization_spaces=n.clean_up_tokenization_spaces??!0,this.do_lowercase_and_remove_accent=n.do_lowercase_and_remove_accent??!1,n.padding_side&&(this.padding_side=n.padding_side),this.legacy=!1,this.chat_template=n.chat_template??null,Array.isArray(this.chat_template)){const s=Object.create(null);for(const{name:i,template:a}of this.chat_template){if(typeof i!="string"||typeof a!="string")throw new Error('Chat template must be a list of objects with "name" and "template" properties');s[i]=a}this.chat_template=s}this._compiled_template_cache=new Map}getToken(...r){for(const n of r){const s=this._tokenizer_config[n];if(s)if(typeof s=="object"){if(s.__type==="AddedToken")return s.content;throw Error(`Unknown token: ${s}`)}else return s}return null}static async from_pretrained(r,{progress_callback:n=null,config:s=null,cache_dir:i=null,local_files_only:a=!1,revision:o="main",legacy:l=null}={}){const u=await xp(r,{progress_callback:n,config:s,cache_dir:i,local_files_only:a,revision:o,legacy:l});return new this(...u)}_call(r,{text_pair:n=null,add_special_tokens:s=!0,padding:i=!1,truncation:a=null,max_length:o=null,return_tensor:l=!0}={}){const u=Array.isArray(r);let d;if(u){if(r.length===0)throw Error("text array must be non-empty");if(n!==null){if(Array.isArray(n)){if(r.length!==n.length)throw Error("text and text_pair must have the same length")}else throw Error("text_pair must also be an array");d=r.map((p,h)=>this._encode_plus(p,{text_pair:n[h],add_special_tokens:s}))}else d=r.map(p=>this._encode_plus(p,{add_special_tokens:s}))}else{if(r==null)throw Error("text may not be null or undefined");if(Array.isArray(n))throw Error("When specifying `text_pair`, since `text` is a string, `text_pair` must also be a string (i.e., not an array).");d=[this._encode_plus(r,{text_pair:n,add_special_tokens:s})]}if(o===null?i==="max_length"?o=this.model_max_length:o=Bn(d.map(p=>p.input_ids.length))[0]:a||console.warn("Truncation was not explicitly activated but `max_length` is provided a specific value, please use `truncation=true` to explicitly truncate examples to max length."),o=Math.min(o,this.model_max_length),i||a)for(let p=0;p<d.length;++p)d[p].input_ids.length!==o&&(d[p].input_ids.length>o?a&&b_(d[p],o):i&&y_(d[p],o,h=>h==="input_ids"?this.pad_token_id:0,this.padding_side));const c={};if(l){if(!(i&&a)&&d.some(h=>{var f;for(const m of Object.keys(h))if(h[m].length!==((f=d[0][m])==null?void 0:f.length))return!0;return!1}))throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=true' and 'truncation=true' to have batched tensors with the same length.");const p=[d.length,d[0].input_ids.length];for(const h of Object.keys(d[0]))c[h]=new Z("int64",BigInt64Array.from(d.flatMap(f=>f[h]).map(BigInt)),p)}else{for(const p of Object.keys(d[0]))c[p]=d.map(h=>h[p]);if(!u)for(const p of Object.keys(c))c[p]=c[p][0]}return c}_encode_text(r){return r===null?null:(this.added_tokens_regex?r.split(this.added_tokens_regex).filter(i=>i):[r]).map((i,a)=>{if(this.added_tokens.find(l=>l.content===i)!==void 0)return i;{if(this.remove_space===!0&&(i=i.trim().split(/\s+/).join(" ")),this.do_lowercase_and_remove_accent&&(i=Mg(i)),this.normalizer!==null&&(i=this.normalizer(i)),i.length===0)return[];const l=this.pre_tokenizer!==null?this.pre_tokenizer(i,{section_index:a}):[i];return this.model(l)}}).flat()}_encode_plus(r,{text_pair:n=null,add_special_tokens:s=!0}={}){const{tokens:i,token_type_ids:a}=this._tokenize_helper(r,{pair:n,add_special_tokens:s}),o=this.model.convert_tokens_to_ids(i),l={input_ids:o,attention_mask:new Array(o.length).fill(1)};return this.return_token_type_ids&&a&&(l.token_type_ids=a),l}_tokenize_helper(r,{pair:n=null,add_special_tokens:s=!1}={}){const i=this._encode_text(r),a=this._encode_text(n);return this.post_processor?this.post_processor(i,a,{add_special_tokens:s}):{tokens:ye(i??[],a??[])}}tokenize(r,{pair:n=null,add_special_tokens:s=!1}={}){return this._tokenize_helper(r,{pair:n,add_special_tokens:s}).tokens}encode(r,{text_pair:n=null,add_special_tokens:s=!0}={}){return this._encode_plus(r,{text_pair:n,add_special_tokens:s}).input_ids}batch_decode(r,n={}){return r instanceof Z&&(r=r.tolist()),r.map(s=>this.decode(s,n))}decode(r,n={}){if(r instanceof Z&&(r=kp(r)),!Array.isArray(r)||r.length===0||!cf(r[0]))throw Error("token_ids must be a non-empty array of integers.");return this.decode_single(r,n)}decode_single(r,{skip_special_tokens:n=!1,clean_up_tokenization_spaces:s=null}){let i=this.model.convert_ids_to_tokens(r);n&&(i=i.filter(o=>!this.special_tokens.includes(o)));let a=this.decoder?this.decoder(i):i.join(" ");return this.decoder&&this.decoder.end_of_word_suffix&&(a=a.replaceAll(this.decoder.end_of_word_suffix," "),n&&(a=a.trim())),(s??this.clean_up_tokenization_spaces)&&(a=bi(a)),a}get default_chat_template(){return this._warned_about_chat_template||(console.warn("No chat template is defined for this tokenizer - using a default chat template that implements the ChatML format. If the default is not appropriate for your model, please set `tokenizer.chat_template` to an appropriate template. See https://huggingface.co/docs/transformers/main/chat_templating for more information."),this._warned_about_chat_template=!0),this._default_chat_template}apply_chat_template(r,{chat_template:n=null,add_generation_prompt:s=!1,tokenize:i=!0,padding:a=!1,truncation:o=!1,max_length:l=null,return_tensor:u=!0,return_dict:d=!1,tokenizer_kwargs:c={},...p}={}){if(this.chat_template&&typeof this.chat_template=="object"||this.chat_template===null&&this.default_chat_template&&typeof this.default_chat_template=="object"){const g=this.chat_template??this.default_chat_template;if(n!==null&&Object.hasOwn(g,n))n=g[n];else if(n===null&&"default"in g)n=g.default;else if(n===null)throw Error(`This model has multiple chat templates with no default specified! Please either pass a chat template or the name of the template you wish to use to the 'chat_template' argument. Available template names are ${Object.keys(g).sort()}.`)}else n??(n=this.chat_template??this.default_chat_template);if(typeof n!="string")throw Error(`chat_template must be a string, but got ${typeof n}`);let h=this._compiled_template_cache.get(n);h===void 0&&(h=new Tg(n),this._compiled_template_cache.set(n,h));const f=Object.create(null);for(const g of w_){const w=this.getToken(g);w&&(f[g]=w)}const m=h.render({messages:r,add_generation_prompt:s,...f,...p});if(i){const g=this._call(m,{add_special_tokens:!1,padding:a,truncation:o,max_length:l,return_tensor:u,...c});return d?g:g.input_ids}return m}}class v_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class $_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class x_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class k_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class S_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class E_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class T_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class I_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class M_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class C_ extends X{}class z_ extends X{}class A_ extends X{constructor(r,n){super(r,n);T(this,"return_token_type_ids",!0);console.warn('WARNING: `XLMTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.')}}class P_ extends X{constructor(){super(...arguments);T(this,"return_token_type_ids",!0)}}class O_ extends X{}class zp extends X{constructor(){super(...arguments);T(this,"_default_chat_template",'{% for message in messages %}" "{{ message.content }}{{ eos_token }}" "{% endfor %}')}}class B_ extends X{}class Ap extends X{constructor(t,r){super(t,r),this.languageRegex=/^[a-z]{2}_[A-Z]{2}$/,this.language_codes=this.special_tokens.filter(n=>this.languageRegex.test(n)),this.lang_to_token=n=>n}_build_translation_inputs(t,r,n){return vi(this,t,r,n)}}class R_ extends Ap{}class D_ extends X{}class L_ extends zp{constructor(t,r){var i,a;const n=".,!?…。，、।۔،",s=(a=(i=t.pre_tokenizer)==null?void 0:i.pretokenizers[0])==null?void 0:a.pattern;s&&s.Regex===` ?[^(\\s|[${n}])]+`&&(s.Regex=` ?[^\\s${n}]+`),super(t,r)}}const mn="▁";class Pp extends X{constructor(r,n){super(r,n);T(this,"_default_chat_template",`{% if messages[0]['role'] == 'system' %}{% set loop_messages = messages[1:] %}{% set system_message = messages[0]['content'] %}{% elif USE_DEFAULT_PROMPT == true and not '<<SYS>>' in messages[0]['content'] %}{% set loop_messages = messages %}{% set system_message = 'DEFAULT_SYSTEM_MESSAGE' %}{% else %}{% set loop_messages = messages %}{% set system_message = false %}{% endif %}{% for message in loop_messages %}{% if (message['role'] == 'user') != (loop.index0 % 2 == 0) %}{{ raise_exception('Conversation roles must alternate user/assistant/user/assistant/...') }}{% endif %}{% if loop.index0 == 0 and system_message != false %}{% set content = '<<SYS>>
' + system_message + '
<</SYS>>

' + message['content'] %}{% else %}{% set content = message['content'] %}{% endif %}{% if message['role'] == 'user' %}{{ bos_token + '[INST] ' + content.strip() + ' [/INST]' }}{% elif message['role'] == 'system' %}{{ '<<SYS>>
' + content.strip() + '
<</SYS>>

' }}{% elif message['role'] == 'assistant' %}{{ ' '  + content.strip() + ' ' + eos_token }}{% endif %}{% endfor %}`);T(this,"DEFAULT_SYSTEM_PROMPT",`You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.

If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.`);T(this,"padding_side","left");this.use_default_system_prompt=n.use_default_system_prompt??!1,this.legacy=n.legacy??!0,this.legacy||(this.normalizer=null,this.pre_tokenizer=new Cp({replacement:mn,add_prefix_space:!0,prepend_scheme:"first"}))}_encode_text(r){if(r===null)return null;if(this.legacy||r.length===0)return super._encode_text(r);let n=super._encode_text(mn+r.replaceAll(mn," "));return n.length>1&&n[0]===mn&&this.special_tokens.includes(n[1])&&(n=n.slice(1)),n}get default_chat_template(){return super.default_chat_template.replaceAll("USE_DEFAULT_PROMPT",this.use_default_system_prompt?"true":"false").replaceAll("DEFAULT_SYSTEM_MESSAGE",this.DEFAULT_SYSTEM_PROMPT.replaceAll(`
`,"\\n").replaceAll("'","\\'"))}}class F_ extends Pp{}class N_ extends X{}class U_ extends X{}class q_ extends X{}class G_ extends X{}class V_ extends X{}class j_ extends X{}class W_ extends X{constructor(){super(...arguments);T(this,"_default_chat_template",`{% if messages[0]['role'] == 'system' %}{{ raise_exception('System role not supported') }}{% endif %}{% for message in messages %}{% if (message['role'] == 'user') != (loop.index0 % 2 == 0) %}{{ raise_exception('Conversation roles must alternate user/assistant/user/assistant/...') }}{% endif %}{% if (message['role'] == 'assistant') %}{% set role = 'model' %}{% else %}{% set role = message['role'] %}{% endif %}{{ '<start_of_turn>' + role + '
' + message['content'] | trim + '<end_of_turn>
' }}{% endfor %}{% if add_generation_prompt %}{{'<start_of_turn>model
'}}{% endif %}`)}}class H_ extends X{}function vi(e,t,r,n){if(!("language_codes"in e)||!Array.isArray(e.language_codes))throw new Error("Tokenizer must have `language_codes` attribute set and it should be an array of language ids.");if(!("languageRegex"in e)||!(e.languageRegex instanceof RegExp))throw new Error("Tokenizer must have `languageRegex` attribute set and it should be a regular expression.");if(!("lang_to_token"in e)||typeof e.lang_to_token!="function")throw new Error("Tokenizer must have `lang_to_token` attribute set and it should be a function.");const s=n.src_lang,i=n.tgt_lang;if(!e.language_codes.includes(i))throw new Error(`Target language code "${i}" is not valid. Must be one of: {${e.language_codes.join(", ")}}`);if(s!==void 0){if(!e.language_codes.includes(s))throw new Error(`Source language code "${s}" is not valid. Must be one of: {${e.language_codes.join(", ")}}`);for(const a of e.post_processor.config.single)if("SpecialToken"in a&&e.languageRegex.test(a.SpecialToken.id)){a.SpecialToken.id=e.lang_to_token(s);break}}return n.forced_bos_token_id=e.model.convert_tokens_to_ids([e.lang_to_token(i)])[0],e._call(t,r)}class K_ extends X{constructor(t,r){super(t,r),this.languageRegex=/^[a-z]{3}_[A-Z][a-z]{3}$/,this.language_codes=this.special_tokens.filter(n=>this.languageRegex.test(n)),this.lang_to_token=n=>n}_build_translation_inputs(t,r,n){return vi(this,t,r,n)}}class Q_ extends X{constructor(t,r){super(t,r),this.languageRegex=/^__[a-z]{2,3}__$/,this.language_codes=this.special_tokens.filter(n=>this.languageRegex.test(n)).map(n=>n.slice(2,-2)),this.lang_to_token=n=>`__${n}__`}_build_translation_inputs(t,r,n){return vi(this,t,r,n)}}const Op=[["en","english"],["zh","chinese"],["de","german"],["es","spanish"],["ru","russian"],["ko","korean"],["fr","french"],["ja","japanese"],["pt","portuguese"],["tr","turkish"],["pl","polish"],["ca","catalan"],["nl","dutch"],["ar","arabic"],["sv","swedish"],["it","italian"],["id","indonesian"],["hi","hindi"],["fi","finnish"],["vi","vietnamese"],["he","hebrew"],["uk","ukrainian"],["el","greek"],["ms","malay"],["cs","czech"],["ro","romanian"],["da","danish"],["hu","hungarian"],["ta","tamil"],["no","norwegian"],["th","thai"],["ur","urdu"],["hr","croatian"],["bg","bulgarian"],["lt","lithuanian"],["la","latin"],["mi","maori"],["ml","malayalam"],["cy","welsh"],["sk","slovak"],["te","telugu"],["fa","persian"],["lv","latvian"],["bn","bengali"],["sr","serbian"],["az","azerbaijani"],["sl","slovenian"],["kn","kannada"],["et","estonian"],["mk","macedonian"],["br","breton"],["eu","basque"],["is","icelandic"],["hy","armenian"],["ne","nepali"],["mn","mongolian"],["bs","bosnian"],["kk","kazakh"],["sq","albanian"],["sw","swahili"],["gl","galician"],["mr","marathi"],["pa","punjabi"],["si","sinhala"],["km","khmer"],["sn","shona"],["yo","yoruba"],["so","somali"],["af","afrikaans"],["oc","occitan"],["ka","georgian"],["be","belarusian"],["tg","tajik"],["sd","sindhi"],["gu","gujarati"],["am","amharic"],["yi","yiddish"],["lo","lao"],["uz","uzbek"],["fo","faroese"],["ht","haitian creole"],["ps","pashto"],["tk","turkmen"],["nn","nynorsk"],["mt","maltese"],["sa","sanskrit"],["lb","luxembourgish"],["my","myanmar"],["bo","tibetan"],["tl","tagalog"],["mg","malagasy"],["as","assamese"],["tt","tatar"],["haw","hawaiian"],["ln","lingala"],["ha","hausa"],["ba","bashkir"],["jw","javanese"],["su","sundanese"]],gn=new Map(Op),X_=new Map([...Op.map(([e,t])=>[t,e]),["burmese","my"],["valencian","ca"],["flemish","nl"],["haitian","ht"],["letzeburgesch","lb"],["pushto","ps"],["panjabi","pa"],["moldavian","ro"],["moldovan","ro"],["sinhalese","si"],["castilian","es"]]);class Y_ extends X{constructor(){super(...arguments);T(this,"_default_chat_template",'{% for message in messages %}" "{{ message.content }}{{ eos_token }}" "{% endfor %}')}_decode_asr(r,{return_timestamps:n=!1,return_language:s=!1,time_precision:i=null,force_full_sequences:a=!0}={}){if(i===null)throw Error("Must specify time_precision");let o=null;const l=n==="word";function u(){return{language:o,timestamp:[null,null],text:""}}const d=[];let c=u(),p=0;const h=this.model.convert_tokens_to_ids(["<|notimestamps|>"])[0]+1;let f=[],m=[],g=!1,w=null;const _=new Set(this.all_special_ids);for(const y of r){const S=y.tokens,x=l?y.token_timestamps:null;let I=null,D=h;if("stride"in y){const[q,H,V]=y.stride;if(p-=H,w=q-V,H&&(D=H/i+h),V)for(let E=S.length-1;E>=0;--E){const M=S[E];if(M>=h){if(I!==null&&(M-h)*i<w)break;I=M}}}let R=[],U=[];for(let q=0;q<S.length;++q){const H=S[q];if(_.has(H)){const V=this.decode([H]),E=gn.get(V.slice(2,-2));if(E!==void 0){if(o!==null&&E!==o&&!n){f.push(R);const M=this.findLongestCommonSequence(f)[0],O=this.decode(M);c.text=O,d.push(c),f=[],R=[],c=u()}o=c.language=E}}else if(H>=h){const V=(H-h)*i+p,E=Dr(V,2);if(I!==null&&H>=I)g=!0;else if(g||f.length>0&&H<D)g=!1;else if(c.timestamp[0]===null)c.timestamp[0]=E;else if(E!==c.timestamp[0]){c.timestamp[1]=E,f.push(R),l&&m.push(U);const[M,O]=this.findLongestCommonSequence(f,m),B=this.decode(M);c.text=B,l&&(c.words=this.collateWordTimestamps(M,O,o)),d.push(c),f=[],R=[],m=[],U=[],c=u()}}else if(R.push(H),l){let V=Dr(x[q]+p,2),E;q+1<x.length?E=Dr(x[q+1]+p,2):E=null,U.push([V,E])}}if("stride"in y){const[q,H,V]=y.stride;p+=q-V}R.length>0?(f.push(R),l&&m.push(U)):f.every(q=>q.length===0)&&(c=u(),f=[],R=[],m=[],U=[])}if(f.length>0){if(a&&n)throw new Error("Whisper did not predict an ending timestamp, which can happen if audio is cut off in the middle of a word. Also make sure WhisperTimeStampLogitsProcessor was used during generation.");const[y,S]=this.findLongestCommonSequence(f,m),x=this.decode(y);c.text=x,l&&(c.words=this.collateWordTimestamps(y,S,o)),d.push(c)}let v=Object.create(null);const b=d.map(y=>y.text).join("");if(n||s){for(let y=0;y<d.length;++y){const S=d[y];n||delete S.timestamp,s||delete S.language}if(l){const y=[];for(const S of d)for(const x of S.words)y.push(x);v={chunks:y}}else v={chunks:d}}return[b,v]}findLongestCommonSequence(r,n=null){let s=r[0],i=s.length,a=[];const o=Array.isArray(n)&&n.length>0;let l=o?[]:null,u=o?n[0]:null;for(let d=1;d<r.length;++d){const c=r[d];let p=0,h=[i,i,0,0];const f=c.length;for(let y=1;y<i+f;++y){const S=y/1e4,x=Math.max(0,i-y),I=Math.min(i,i+f-y),D=s.slice(x,I),R=Math.max(0,y-i),U=Math.min(f,y),q=c.slice(R,U);if(D.length!==q.length)throw new Error("There is a bug within whisper `decode_asr` function, please report it. Dropping to prevent bad inference.");const H=D.filter((E,M)=>E===q[M]).length,V=H/y+S;H>1&&V>p&&(p=V,h=[x,I,R,U])}const[m,g,w,_]=h,v=Math.floor((g+m)/2),b=Math.floor((_+w)/2);a.push(...s.slice(0,v)),s=c.slice(b),i=s.length,o&&(l.push(...u.slice(0,v)),u=n[d].slice(b))}return a.push(...s),o?(l.push(...u),[a,l]):[a,[]]}collateWordTimestamps(r,n,s){const[i,a,o]=this.combineTokensIntoWords(r,s),l=[];for(let u=0;u<i.length;++u){const d=o[u];l.push({text:i[u],timestamp:[n[d.at(0)][0],n[d.at(-1)][1]]})}return l}combineTokensIntoWords(r,n,s=`"'“¡¿([{-`,i=`"'.。,，!！?？:：”)]}、`){n=n??"english";let a,o,l;return["chinese","japanese","thai","lao","myanmar"].includes(n)?[a,o,l]=this.splitTokensOnUnicode(r):[a,o,l]=this.splitTokensOnSpaces(r),this.mergePunctuations(a,o,l,s,i)}decode(r,n){let s;return n&&n.decode_with_timestamps?(r instanceof Z&&(r=kp(r)),s=this.decodeWithTimestamps(r,n)):s=super.decode(r,n),s}decodeWithTimestamps(r,n){const s=(n==null?void 0:n.time_precision)??.02,i=Array.from(this.all_special_ids).at(-1)+1;let a=[[]];for(const o of r)if(o>=i){const l=Dr((Number(o)-i)*s,2);a.push(`<|${l}|>`),a.push([])}else a[a.length-1].push(o);return a=a.map(o=>typeof o=="string"?o:super.decode(o,n)),a.join("")}splitTokensOnUnicode(r){const n=this.decode(r,{decode_with_timestamps:!0}),s="�",i=[],a=[],o=[];let l=[],u=[],d=0;for(let c=0;c<r.length;++c){const p=r[c];l.push(p),u.push(c);const h=this.decode(l,{decode_with_timestamps:!0});(!h.includes(s)||n[d+h.indexOf(s)]===s)&&(i.push(h),a.push(l),o.push(u),l=[],u=[],d+=h.length)}return[i,a,o]}splitTokensOnSpaces(r){const[n,s,i]=this.splitTokensOnUnicode(r),a=[],o=[],l=[],u=new RegExp(`^[${cr}]$`,"gu");for(let d=0;d<n.length;++d){const c=n[d],p=s[d],h=i[d],f=p[0]>=this.model.tokens_to_ids.get("<|endoftext|>"),m=c.startsWith(" "),g=c.trim(),w=u.test(g);if(f||m||w||a.length===0)a.push(c),o.push(p),l.push(h);else{const _=a.length-1;a[_]+=c,o[_].push(...p),l[_].push(...h)}}return[a,o,l]}mergePunctuations(r,n,s,i,a){const o=structuredClone(r),l=structuredClone(n),u=structuredClone(s);let d=o.length-2,c=o.length-1;for(;d>=0;)o[d].startsWith(" ")&&i.includes(o[d].trim())?(o[c]=o[d]+o[c],l[c]=ye(l[d],l[c]),u[c]=ye(u[d],u[c]),o[d]="",l[d]=[],u[d]=[]):c=d,--d;for(d=0,c=1;c<o.length;)!o[d].endsWith(" ")&&a.includes(o[c])?(o[d]+=o[c],l[d]=ye(l[d],l[c]),u[d]=ye(u[d],u[c]),o[c]="",l[c]=[],u[c]=[]):d=c,++c;return[o.filter(p=>p),l.filter(p=>p.length>0),u.filter(p=>p.length>0)]}get_decoder_prompt_ids({language:r=null,task:n=null,no_timestamps:s=!0}={}){const i=[];if(r){r=r.toLowerCase();let a=X_.get(r);if(a===void 0)if(gn.has(r))a=r;else{const u=r.length===2?gn.keys():gn.values();throw new Error(`Language "${r}" is not supported. Must be one of: ${JSON.stringify(u)}`)}const o=this.model.tokens_to_ids.get(`<|${a}|>`);if(o===void 0)throw new Error(`Unable to find language "${a}" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.`);i.push(o)}else i.push(null);if(n){if(n=n.toLowerCase(),n!=="transcribe"&&n!=="translate")throw new Error(`Task "${n}" is not supported. Must be one of: ["transcribe", "translate"]`);const a=this.model.tokens_to_ids.get(`<|${n}|>`);if(a===void 0)throw new Error(`Unable to find task "${n}" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.`);i.push(a)}else i.push(null);if(s){const a=this.model.tokens_to_ids.get("<|notimestamps|>");if(a===void 0)throw new Error('Unable to find "<|notimestamps|>" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.');i.push(a)}return i.map((a,o)=>[o+1,a]).filter(a=>a[1]!==null)}}class Z_ extends X{}class J_ extends X{}class ew extends X{}class tw extends X{constructor(t,r){super(t,r),this.languageRegex=/^(>>\w+<<)\s*/g,this.supported_language_codes=this.model.vocab.filter(n=>this.languageRegex.test(n)),console.warn('WARNING: `MarianTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.')}_encode_text(t){if(t===null)return null;const[r,...n]=t.trim().split(this.languageRegex);if(n.length===0)return super._encode_text(r);if(n.length===2){const[s,i]=n;return this.supported_language_codes.includes(s)||console.warn(`Unsupported language code "${s}" detected, which may lead to unexpected behavior. Should be one of: ${JSON.stringify(this.supported_language_codes)}`),ye([s],super._encode_text(i))}}}class rw extends X{}class Bp extends X{constructor(){super(...arguments);T(this,"_default_chat_template","{% for message in messages %}{% if message['role'] == 'user' %}{{ ' ' }}{% endif %}{{ message['content'] }}{% if not loop.last %}{{ '  ' }}{% endif %}{% endfor %}{{ eos_token }}")}}class nw extends Bp{}class sw extends X{}class iw extends X{}class aw extends X{constructor(t,r){super(t,r),this.decoder=new c_({})}}class ow extends X{}class Rp{static async from_pretrained(t,{progress_callback:r=null,config:n=null,cache_dir:s=null,local_files_only:i=!1,revision:a="main",legacy:o=null}={}){var p;const[l,u]=await xp(t,{progress_callback:r,config:n,cache_dir:s,local_files_only:i,revision:a,legacy:o}),d=((p=u.tokenizer_class)==null?void 0:p.replace(/Fast$/,""))??"PreTrainedTokenizer";let c=this.TOKENIZER_CLASS_MAPPING[d];return c||(console.warn(`Unknown tokenizer class "${d}", attempting to construct from base class.`),c=X),new c(l,u)}}T(Rp,"TOKENIZER_CLASS_MAPPING",{T5Tokenizer:O_,DistilBertTokenizer:C_,CamembertTokenizer:z_,DebertaTokenizer:S_,DebertaV2Tokenizer:E_,BertTokenizer:v_,HerbertTokenizer:T_,ConvBertTokenizer:I_,RoFormerTokenizer:M_,XLMTokenizer:A_,ElectraTokenizer:P_,MobileBertTokenizer:x_,SqueezeBertTokenizer:k_,AlbertTokenizer:$_,GPT2Tokenizer:zp,BartTokenizer:B_,MBartTokenizer:Ap,MBart50Tokenizer:R_,RobertaTokenizer:D_,WhisperTokenizer:Y_,CodeGenTokenizer:Z_,CLIPTokenizer:J_,SiglipTokenizer:ew,MarianTokenizer:tw,BloomTokenizer:L_,NllbTokenizer:K_,M2M100Tokenizer:Q_,LlamaTokenizer:Pp,CodeLlamaTokenizer:F_,XLMRobertaTokenizer:N_,MPNetTokenizer:U_,FalconTokenizer:q_,GPTNeoXTokenizer:G_,EsmTokenizer:V_,Wav2Vec2CTCTokenizer:rw,BlenderbotTokenizer:Bp,BlenderbotSmallTokenizer:nw,SpeechT5Tokenizer:sw,NougatTokenizer:iw,VitsTokenizer:aw,Qwen2Tokenizer:j_,GemmaTokenizer:W_,Grok1Tokenizer:H_,CohereTokenizer:ow,PreTrainedTokenizer:X});async function lw(e,t){return await _t(e,"config.json",!0,t)}function _n(e){const t={};let r={};switch(e.model_type){case"llava":case"paligemma":r=_n(e.text_config);break;case"moondream1":r=_n(e.phi_config);break;case"musicgen":r=_n(e.decoder);break;case"gpt2":case"gptj":case"codegen":case"gpt_bigcode":t.num_heads="n_head",t.num_layers="n_layer",t.hidden_size="n_embd";break;case"gpt_neox":case"stablelm":case"opt":case"phi":case"phi3":case"falcon":t.num_heads="num_attention_heads",t.num_layers="num_hidden_layers",t.hidden_size="hidden_size";break;case"llama":case"mistral":case"starcoder2":case"qwen2":t.num_heads="num_key_value_heads",t.num_layers="num_hidden_layers",t.hidden_size="hidden_size",t.num_attention_heads="num_attention_heads";break;case"gemma":t.num_heads="num_key_value_heads",t.num_layers="num_hidden_layers",t.dim_kv="head_dim";break;case"openelm":t.num_heads="num_kv_heads",t.num_layers="num_transformer_layers",t.dim_kv="head_dim";break;case"gpt_neo":t.num_heads="num_heads",t.num_layers="num_layers",t.hidden_size="hidden_size";break;case"bloom":t.num_heads="n_head",t.num_layers="n_layer",t.hidden_size="hidden_size";break;case"mpt":t.num_heads="n_heads",t.num_layers="n_layers",t.hidden_size="d_model";break;case"t5":case"mt5":case"longt5":t.num_decoder_layers="num_decoder_layers",t.num_decoder_heads="num_heads",t.decoder_dim_kv="d_kv",t.num_encoder_layers="num_layers",t.num_encoder_heads="num_heads",t.encoder_dim_kv="d_kv";break;case"bart":case"mbart":case"marian":case"whisper":case"m2m_100":case"blenderbot":case"blenderbot-small":t.num_decoder_layers="decoder_layers",t.num_decoder_heads="decoder_attention_heads",t.decoder_hidden_size="d_model",t.num_encoder_layers="encoder_layers",t.num_encoder_heads="encoder_attention_heads",t.encoder_hidden_size="d_model";break;case"speecht5":t.num_decoder_layers="decoder_layers",t.num_decoder_heads="decoder_attention_heads",t.decoder_hidden_size="hidden_size",t.num_encoder_layers="encoder_layers",t.num_encoder_heads="encoder_attention_heads",t.encoder_hidden_size="hidden_size";break;case"trocr":t.num_encoder_layers=t.num_decoder_layers="decoder_layers",t.num_encoder_heads=t.num_decoder_heads="decoder_attention_heads",t.encoder_hidden_size=t.decoder_hidden_size="d_model";break;case"musicgen_decoder":t.num_encoder_layers=t.num_decoder_layers="num_hidden_layers",t.num_encoder_heads=t.num_decoder_heads="num_attention_heads",t.encoder_hidden_size=t.decoder_hidden_size="hidden_size";break}const n={...r,...gt(e,["model_type","multi_query","is_encoder_decoder"])};for(const s in t)n[s]=e[t[s]];return n}function Dp(e,{prefix:t="past_key_values",encoder_add_pkv:r=!0}={}){const n={},s=e.normalized_config,i=1;if(s.is_encoder_decoder&&r){const a=s.encoder_dim_kv??s.encoder_hidden_size/s.num_encoder_heads,o=s.decoder_dim_kv??s.decoder_hidden_size/s.num_decoder_heads,l=[i,s.num_encoder_heads,0,a],u=[i,s.num_decoder_heads,0,o];for(let d=0;d<s.num_decoder_layers;++d)n[`${t}.${d}.encoder.key`]=l,n[`${t}.${d}.encoder.value`]=l,n[`${t}.${d}.decoder.key`]=u,n[`${t}.${d}.decoder.value`]=u}else{const a=s.num_heads,o=s.num_layers,l=s.dim_kv??s.hidden_size/(s.num_attention_heads??a);if(s.model_type==="falcon"){const u=[i*a,0,l];for(let d=0;d<o;++d)n[`${t}.${d}.key`]=u,n[`${t}.${d}.value`]=u}else if(s.multi_query){const u=[i*a,0,2*l];for(let d=0;d<o;++d)n[`${t}.${d}.key_value`]=u}else if(s.model_type==="bloom"){const u=[i*a,l,0],d=[i*a,0,l];for(let c=0;c<o;++c)n[`${t}.${c}.key`]=u,n[`${t}.${c}.value`]=d}else if(s.model_type==="openelm")for(let u=0;u<o;++u){const d=[i,a[u],0,l];n[`${t}.${u}.key`]=d,n[`${t}.${u}.value`]=d}else{const u=[i,a,0,l];for(let d=0;d<o;++d)n[`${t}.${d}.key`]=u,n[`${t}.${d}.value`]=u}}return n}class wn{constructor(t){T(this,"max_position_embeddings");this.model_type=null,this.is_encoder_decoder=!1,Object.assign(this,t),this.normalized_config=_n(this)}static async from_pretrained(t,{progress_callback:r=null,config:n=null,cache_dir:s=null,local_files_only:i=!1,revision:a="main"}={}){n&&!(n instanceof wn)&&(n=new wn(n));const o=n??await lw(t,{progress_callback:r,config:n,cache_dir:s,local_files_only:i,revision:a});return new this(o)}}class Lp{static async from_pretrained(...t){return wn.from_pretrained(...t)}}const yn=Object.freeze({cpu:"cpu",gpu:"gpu",wasm:"wasm",webgpu:"webgpu"}),uw=function(){let e;return async function(){if(e===void 0)if(mt.IS_NODE_ENV)e=!0;else if(!mt.IS_WEBGPU_AVAILABLE)e=!1;else try{e=(await navigator.gpu.requestAdapter()).features.has("shader-f16")}catch{e=!1}return e}}(),Me=Object.freeze({fp32:"fp32",fp16:"fp16",q8:"q8",int8:"int8",uint8:"uint8",q4:"q4",bnb4:"bnb4",q4f16:"q4f16"}),dw=Object.freeze({[yn.cpu]:Me.q8,[yn.gpu]:Me.fp32,[yn.wasm]:Me.q8,[yn.webgpu]:Me.fp32}),Fp=Object.freeze({[Me.fp32]:"",[Me.fp16]:"_fp16",[Me.int8]:"_int8",[Me.uint8]:"_uint8",[Me.q8]:"_quantized",[Me.q4]:"_q4",[Me.q4f16]:"_q4f16",[Me.bnb4]:"_bnb4"});class lt extends Ce{_call(t,r){throw Error("`_call` should be implemented in a subclass")}}class $i extends Ce{_call(t,r){throw Error("`_call` should be implemented in a subclass")}}class Np extends Ce{constructor(){super(),this.processors=[]}push(t){this.processors.push(t)}extend(t){this.processors.push(...t)}_call(t,r){let n=r;for(const s of this.processors)n=s(t,n);return n}[Symbol.iterator](){return this.processors.values()}}class cw extends lt{constructor(t){super(),this.bos_token_id=t}_call(t,r){for(let n=0;n<t.length;++n)if(t[n].length===1){const s=r[n];s.data.fill(-1/0),s.data[this.bos_token_id]=0}return r}}class pw extends lt{constructor(t,r){super(),this.max_length=t,this.forced_eos_token_id=r}_call(t,r){}}class hw extends lt{constructor(t,r){super(),this.begin_suppress_tokens=t,this.begin_index=r}_call(t,r){for(let n=0;n<t.length;++n)if(t[n].length===this.begin_index){const s=r[n];for(const i of this.begin_suppress_tokens)s.data[i]=-1/0}return r}}class fw extends lt{constructor(t){super(),this.no_repeat_ngram_size=t}getNgrams(t){const r=t.length,n=[];for(let i=0;i<r+1-this.no_repeat_ngram_size;++i){const a=[];for(let o=0;o<this.no_repeat_ngram_size;++o)a.push(t[i+o]);n.push(a)}const s=new Map;for(const i of n){const a=i.slice(0,i.length-1),o=JSON.stringify(a),l=s.get(o)??[];l.push(i[i.length-1]),s.set(o,l)}return s}getGeneratedNgrams(t,r){const n=r.slice(r.length+1-this.no_repeat_ngram_size,r.length);return t.get(JSON.stringify(n))??[]}calcBannedNgramTokens(t){const r=[];if(t.length+1<this.no_repeat_ngram_size)return r;{const n=this.getNgrams(t);return this.getGeneratedNgrams(n,t)}}_call(t,r){for(let n=0;n<t.length;++n){const s=r[n],i=this.calcBannedNgramTokens(t[n]);for(const a of i)s.data[a]=-1/0}return r}}class mw extends lt{constructor(t){super(),this.penalty=t}_call(t,r){for(let n=0;n<t.length;++n){const s=r[n];for(const i of t[n])s.data[i]<0?s.data[i]*=this.penalty:s.data[i]/=this.penalty}return r}}class gw extends lt{constructor(t,r){super(),this.min_length=t,this.eos_token_id=Array.isArray(r)?r:[r]}_call(t,r){for(let n=0;n<t.length;++n)if(t[n].length<this.min_length){const s=r[n];for(const i of this.eos_token_id)s.data[i]=-1/0}return r}}class _w extends lt{constructor(t,r,n){super(),this.prompt_length_to_skip=t,this.min_new_tokens=r,this.eos_token_id=Array.isArray(n)?n:[n]}_call(t,r){for(let n=0;n<t.length;++n)if(t[n].length-this.prompt_length_to_skip<this.min_new_tokens){const i=r[n];for(const a of this.eos_token_id)i[a]=-1/0}return r}}class ww extends lt{constructor(t,r){super(),this.bad_words_ids=t,this.eos_token_id=Array.isArray(r)?r:[r]}_call(t,r){for(let n=0;n<t.length;++n){const s=r[n];for(const i of this.bad_words_ids){let a=!0;for(let o=1;o<=i.length-1&&i.length<t[o].length;++o)if(i.at(-o-1)!==t[o].at(-o)){a=!1;break}a&&(s[i.at(-1)]=-1/0)}}return r}}class yw extends lt{constructor(t){if(super(),t<=1)throw new Error(`Require guidance scale >1 to use the classifier free guidance processor, got guidance scale ${t}.`);this.guidance_scale=t}_call(t,r){if(r.dims[0]!==2*t.length)throw new Error(`Logits should have twice the batch size of the input ids, the first half of batches corresponding to the conditional inputs, and the second half of batches corresponding to the unconditional inputs. Got batch size ${r.dims[0]} for the logits and ${t.length} for the input ids.`);const n=t.length,s=r.slice([0,n],null),i=r.slice([n,r.dims[0]],null);for(let a=0;a<i.data.length;++a)i.data[a]+=(s.data[a]-i.data[a])*this.guidance_scale;return i}}class bw extends $i{constructor(t){super(),this.temperature=t}_call(t,r){const n=r.data;for(let s=0;s<n.length;++s)n[s]/=this.temperature;return r}}class vw extends $i{constructor(t,{filter_value:r=-1/0,min_tokens_to_keep:n=1}={}){if(super(),t<0||t>1)throw new Error(`\`top_p\` must be a float > 0 and < 1, but is ${t}`);if(!Number.isInteger(n)||n<1)throw new Error(`\`min_tokens_to_keep\` must be a positive integer, but is ${n}`);this.top_p=t,this.filter_value=r,this.min_tokens_to_keep=n}}class $w extends $i{constructor(t,{filter_value:r=-1/0,min_tokens_to_keep:n=1}={}){if(super(),!Number.isInteger(t)||t<0)throw new Error(`\`top_k\` must be a positive integer, but is ${t}`);this.top_k=Math.max(t,n),this.filter_value=r}}class xw{constructor(t){T(this,"max_length",20);T(this,"max_new_tokens",null);T(this,"min_length",0);T(this,"min_new_tokens",null);T(this,"early_stopping",!1);T(this,"max_time",null);T(this,"do_sample",!1);T(this,"num_beams",1);T(this,"num_beam_groups",1);T(this,"penalty_alpha",null);T(this,"use_cache",!0);T(this,"temperature",1);T(this,"top_k",50);T(this,"top_p",1);T(this,"typical_p",1);T(this,"epsilon_cutoff",0);T(this,"eta_cutoff",0);T(this,"diversity_penalty",0);T(this,"repetition_penalty",1);T(this,"encoder_repetition_penalty",1);T(this,"length_penalty",1);T(this,"no_repeat_ngram_size",0);T(this,"bad_words_ids",null);T(this,"force_words_ids",null);T(this,"renormalize_logits",!1);T(this,"constraints",null);T(this,"forced_bos_token_id",null);T(this,"forced_eos_token_id",null);T(this,"remove_invalid_values",!1);T(this,"exponential_decay_length_penalty",null);T(this,"suppress_tokens",null);T(this,"begin_suppress_tokens",null);T(this,"forced_decoder_ids",null);T(this,"guidance_scale",null);T(this,"num_return_sequences",1);T(this,"output_attentions",!1);T(this,"output_hidden_states",!1);T(this,"output_scores",!1);T(this,"return_dict_in_generate",!1);T(this,"pad_token_id",null);T(this,"bos_token_id",null);T(this,"eos_token_id",null);T(this,"encoder_no_repeat_ngram_size",0);T(this,"decoder_start_token_id",null);T(this,"generation_kwargs",{});Object.assign(this,gt(t,Object.getOwnPropertyNames(this)))}}class bn extends Ce{_call(t,r){throw Error("StoppingCriteria needs to be subclassed")}}class xi extends Ce{constructor(){super(),this.criteria=[]}push(t){this.criteria.push(t)}extend(t){t instanceof xi?t=t.criteria:t instanceof bn&&(t=[t]),this.criteria.push(...t)}_call(t,r){const n=new Array(t.length).fill(!1);for(const s of this.criteria){const i=s(t,r);for(let a=0;a<n.length;++a)n[a]||(n[a]=i[a])}return n}[Symbol.iterator](){return this.criteria.values()}}class kw extends bn{constructor(t,r=null){super(),this.max_length=t,this.max_position_embeddings=r}_call(t){return t.map(r=>r.length>=this.max_length)}}class Sw extends bn{constructor(t){super(),Array.isArray(t)||(t=[t]),this.eos_token_id=t}_call(t,r){return t.map(n=>{const s=n.at(-1);return this.eos_token_id.some(i=>s==i)})}}class vn extends Ce{constructor(t){super(),this.generation_config=t}_call(t,r=-1){return this.sample(t,r)}sample(t,r){throw Error("sample should be implemented in subclasses.")}getLogits(t,r){let n=t.dims.at(-1),s=t.data;if(r===-1)s=s.slice(-n);else{let i=r*n;s=s.slice(i,i+n)}return s}randomSelect(t){let r=t.reduce((s,i)=>s+i,0),n=Math.random()*r;for(let s=0;s<t.length;++s)if(n-=t[s],n<=0)return s;return 0}static getSampler(t){if(t.do_sample)return new Tw(t);if(t.num_beams>1)return new Iw(t);if(t.num_return_sequences>1)throw Error(`num_return_sequences has to be 1 when doing greedy search, but is ${t.num_return_sequences}.`);return new Ew(t)}}class Ew extends vn{sample(t,r=-1){let n=this.getLogits(t,r);return[[Bn(n)[1],0]]}}class Tw extends vn{sample(t,r=-1){let n=t.dims.at(-1);this.generation_config.top_k>0&&(n=Math.min(this.generation_config.top_k,n));const s=this.getLogits(t,r),i=Ui(s,n),a=Ni(i.map(o=>o[1]));return Array.from({length:this.generation_config.num_beams},()=>{const o=this.randomSelect(a);return[i[o][0],Math.log(a[o])]})}}class Iw extends vn{sample(t,r=-1){let n=t.dims.at(-1);this.generation_config.top_k>0&&(n=Math.min(this.generation_config.top_k,n));const s=this.getLogits(t,r),i=Ui(s,n),a=Ni(i.map(o=>o[1]));return Array.from({length:this.generation_config.num_beams},(o,l)=>[i[l][0],Math.log(a[l])])}}const W={EncoderOnly:0,EncoderDecoder:1,Seq2Seq:2,Vision2Seq:3,DecoderOnly:4,MaskGeneration:5,ImageTextToText:6,Musicgen:7},$n=new Map,Up=new Map,hr=new Map;async function Mw(e,t,r){let n=r.device;n&&typeof n!="string"&&(n.hasOwnProperty(t)?n=n[t]:(console.warn(`Device not specified for ${t}. Using the default device.`),n=null));const s=Vm(n);let i=r.dtype;if(typeof i!="string"&&(i&&i.hasOwnProperty(t)?i=i[t]:(i=dw[s[0]],console.warn(`Dtype not specified for ${t}. Using the default dtype: ${i}.`))),Fp.hasOwnProperty(i)){if(i===Me.fp16&&!await uw())throw new Error("The device does not support fp16.")}else throw new Error(`Invalid dtype: ${i}. Should be one of: ${Object.keys(Me).join(", ")}`);const a=Fp[i],o=`${r.subfolder??""}/${t}${a}.onnx`,l={...r.session_options};l.executionProviders??(l.executionProviders=s);const u=Br(e,o,!0,r);let d=[];if(r.use_external_data_format){if(mt.IS_NODE_ENV)throw new Error("External data format is not yet supported in Node.js");const p=`${t}${a}.onnx_data`,h=`${r.subfolder??""}/${p}`;d.push(new Promise(async(f,m)=>{const g=await Br(e,h,!0,r);f({path:p,data:g})}))}else l.externalData!==void 0&&(d=l.externalData.map(async p=>{if(typeof p.data=="string"){const h=await Br(e,p.data,!0,r);return{...p,data:h}}return p}));if(d.length>0&&(l.externalData=await Promise.all(d)),n==="webgpu"){const p=Dp(r.config,{prefix:"present"}),h={};for(const f in p)h[f]="gpu-buffer";l.preferredOutputLocation=h}return{buffer:await u,session_options:l}}async function zt(e,t,r){const n=Object.keys(t),s=await Promise.all(n.map(async a=>Mw(e,t[a],r))),i={};for(let a=0;a<n.length;++a){const{buffer:o,session_options:l}=s[a],u=await jm(o,l);i[n[a]]=u}return i}function Cw(e,t){const r=Object.create(null),n=[];for(const a of e.inputNames){const o=t[a];if(!(o instanceof Z)){n.push(a);continue}r[a]=Wm()?o.clone():o}if(n.length>0)throw new Error(`An error occurred during model execution: "Missing the following inputs: ${n.join(", ")}.`);const s=Object.keys(t).length,i=e.inputNames.length;if(s>i){let a=Object.keys(t).filter(o=>!e.inputNames.includes(o));console.warn(`WARNING: Too many inputs were provided (${s} > ${i}). The following inputs will be ignored: "${a.join(", ")}".`)}return r}async function ht(e,t){const r=Cw(e,t);try{const n=Object.fromEntries(Object.entries(r).map(([i,a])=>[i,a.ort_tensor]));let s=await e.run(n);return s=qp(s),s}catch(n){throw console.error(`An error occurred during model execution: "${n}".`),console.error("Inputs given to model:",r),n}}function qp(e){for(let t in e)cp(e[t])?e[t]=new Z(e[t]):typeof e[t]=="object"&&qp(e[t]);return e}function zw(e){if(e instanceof Z)return e;if(e.length===0)throw Error("items must be non-empty");if(Array.isArray(e[0])){if(e.some(t=>t.length!==e[0].length))throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=True' and/or 'truncation=True' to have batched tensors with the same length.");return new Z("int64",BigInt64Array.from(e.flat().map(t=>BigInt(t))),[e.length,e[0].length])}else return new Z("int64",BigInt64Array.from(e.map(t=>BigInt(t))),[1,e.length])}function Gp(e){return new Z("bool",[e],[1])}async function Vp(e,t){let{encoder_outputs:r,past_key_values:n}=t;if(!r){const l=gt(t,e.sessions.model.inputNames);r=(await fr(e,l)).last_hidden_state}const{input_ids:s,decoder_input_ids:i,...a}=t;return a.input_ids=i,a.encoder_hidden_states=r,e.sessions.decoder_model_merged.inputNames.includes("encoder_attention_mask")&&(a.encoder_attention_mask=t.attention_mask),await ki(e,a,!0)}async function fr(e,t){const r=e.sessions.model,n=Object.create(null);for(const s of r.inputNames)n[s]=t[s];return r.inputNames.includes("token_type_ids")&&!n.token_type_ids&&(n.token_type_ids=new Z("int64",new BigInt64Array(n.input_ids.data.length),n.input_ids.dims)),await ht(r,n)}async function ki(e,t,r=!1){const n=e.sessions[r?"decoder_model_merged":"model"],{past_key_values:s,...i}=t;n.inputNames.includes("use_cache_branch")&&(i.use_cache_branch=Gp(!!s)),n.inputNames.includes("position_ids")&&i.attention_mask&&!i.position_ids&&(i.position_ids=Pw(i,s)),e.addPastKeyValues(i,s);const a=gt(i,n.inputNames);return await ht(n,a)}async function Aw(e,{input_ids:t=null,attention_mask:r=null,pixel_values:n=null,position_ids:s=null,inputs_embeds:i=null,past_key_values:a=null,generation_config:o=null,logits_processor:l=null,...u}){if(!i){if(i=await e.encode_text({input_ids:t}),n&&t.dims[1]!==1){const c=await e.encode_image({pixel_values:n});({inputs_embeds:i,attention_mask:r}=e._merge_input_ids_with_image_features({image_features:c,inputs_embeds:i,input_ids:t,attention_mask:r}))}else if(a&&n&&t.dims[1]===1){const c=t.dims[1],p=Object.values(a)[0].dims.at(-2);r=it([ar([t.dims[0],p]),r.slice(null,[r.dims[1]-c,r.dims[1]])],1)}}return await ki(e,{inputs_embeds:i,past_key_values:a,attention_mask:r,position_ids:s,generation_config:o,logits_processor:l},!0)}function Pw(e,t=null){const{input_ids:r,inputs_embeds:n,attention_mask:s}=e,[i,a]=s.dims,o=new BigInt64Array(s.data.length);for(let u=0;u<i;++u){const d=u*a;let c=BigInt(0);for(let p=0;p<a;++p){const h=d+p;s.data[h]===0n?o[h]=BigInt(1):(o[h]=c,c+=s.data[h])}}let l=new Z("int64",o,s.dims);if(t){const u=-(r??n).dims.at(1);l=l.slice(null,[u,null])}return l}function jp(e,t,r,n){if(r.past_key_values){const s=Object.values(r.past_key_values)[0].dims.at(-2),{input_ids:i,attention_mask:a}=r;if(!(a&&a.dims[1]>i.dims[1])){if(s<i.dims[1])r.input_ids=i.slice(null,[s,null]);else if(e.config.image_token_index!=null&&i.data.some(o=>o==e.config.image_token_index)){const o=e.config.num_image_tokens;if(!o)throw new Error("`num_image_tokens` is missing in the model configuration.");const l=i.dims[1]-(s-o);r.input_ids=i.slice(null,[-l,null]),r.attention_mask=ar([1,s+l])}}}return r}function Ow(e,t,r,n){const{...s}=r;return r.past_key_values&&(t=t.map(a=>[a.at(-1)])),s.decoder_input_ids=zw(t),s}class P extends Ce{constructor(r,n){super();T(this,"main_input_name","input_ids");T(this,"forward_params",["input_ids","attention_mask"]);this.config=r,this.sessions=n;const s=hr.get(this.constructor),i=$n.get(s);this.can_generate=!1,this._forward=null,this._prepare_inputs_for_generation=null,i===W.DecoderOnly?(this.can_generate=!0,this._forward=ki,this._prepare_inputs_for_generation=jp):i===W.Seq2Seq||i===W.Vision2Seq||i===W.Musicgen?(this.can_generate=!0,this._forward=Vp,this._prepare_inputs_for_generation=Ow):i===W.EncoderDecoder?this._forward=Vp:i===W.ImageTextToText?(this.can_generate=!0,this._forward=Aw,this._prepare_inputs_for_generation=jp):this._forward=fr,this.can_generate&&this.forward_params.push("past_key_values"),this.custom_config=this.config["transformers.js_config"]??{}}async dispose(){var n;const r=[];for(const s of Object.values(this.sessions))(n=s==null?void 0:s.handler)!=null&&n.dispose&&r.push(s.handler.dispose());return await Promise.all(r)}static async from_pretrained(r,{progress_callback:n=null,config:s=null,cache_dir:i=null,local_files_only:a=!1,revision:o="main",model_file_name:l=null,subfolder:u="onnx",device:d=null,dtype:c=null,use_external_data_format:p=null,session_options:h={}}={}){let f={progress_callback:n,config:s,cache_dir:i,local_files_only:a,revision:o,model_file_name:l,subfolder:u,device:d,dtype:c,use_external_data_format:p,session_options:h};const m=hr.get(this),g=$n.get(m);f.config=await Lp.from_pretrained(r,f);let w;return g===W.DecoderOnly?w=await Promise.all([zt(r,{model:f.model_file_name??"model"},f),_t(r,"generation_config.json",!1,f)]):g===W.Seq2Seq||g===W.Vision2Seq?w=await Promise.all([zt(r,{model:"encoder_model",decoder_model_merged:"decoder_model_merged"},f),_t(r,"generation_config.json",!1,f)]):g===W.MaskGeneration?w=await Promise.all([zt(r,{model:"vision_encoder",prompt_encoder_mask_decoder:"prompt_encoder_mask_decoder"},f)]):g===W.EncoderDecoder?w=await Promise.all([zt(r,{model:"encoder_model",decoder_model_merged:"decoder_model_merged"},f)]):g===W.ImageTextToText?w=await Promise.all([zt(r,{embed_tokens:"embed_tokens",vision_encoder:"vision_encoder",decoder_model_merged:"decoder_model_merged"},f),_t(r,"generation_config.json",!1,f)]):g===W.Musicgen?w=await Promise.all([zt(r,{model:"text_encoder",decoder_model_merged:"decoder_model_merged",encodec_decode:"encodec_decode"},f),_t(r,"generation_config.json",!1,f)]):(g!==W.EncoderOnly&&console.warn(`Model type for '${m??(s==null?void 0:s.model_type)}' not found, assuming encoder-only architecture. Please report this at https://github.com/xenova/transformers.js/issues/new/choose.`),w=await Promise.all([zt(r,{model:f.model_file_name??"model"},f)])),new this(f.config,...w)}async _call(r){return await this.forward(r)}async forward(r){return await this._forward(this,r)}_get_logits_warper(r){const n=new Np;return r.temperature!==null&&r.temperature!==1&&n.push(new bw(r.temperature)),r.top_k!==null&&r.top_k!==0&&n.push(new $w(r.top_k)),r.top_p!==null&&r.top_p<1&&n.push(new vw(r.top_p)),n}_get_logits_processor(r,n,s=null){const i=new Np;if(r.repetition_penalty!==null&&r.repetition_penalty!==1&&i.push(new mw(r.repetition_penalty)),r.no_repeat_ngram_size!==null&&r.no_repeat_ngram_size>0&&i.push(new fw(r.no_repeat_ngram_size)),r.bad_words_ids!==null&&i.push(new ww(r.bad_words_ids,r.eos_token_id)),r.min_length!==null&&r.eos_token_id!==null&&r.min_length>0&&i.push(new gw(r.min_length,r.eos_token_id)),r.min_new_tokens!==null&&r.eos_token_id!==null&&r.min_new_tokens>0&&i.push(new _w(n,r.min_new_tokens,r.eos_token_id)),r.forced_bos_token_id!==null&&i.push(new cw(r.forced_bos_token_id)),r.forced_eos_token_id!==null&&i.push(new pw(r.max_length,r.forced_eos_token_id)),r.begin_suppress_tokens!==null){let a=n>1||r.forced_bos_token_id===null?n:n+1;r.forced_decoder_ids!==null&&(a+=r.forced_decoder_ids[r.forced_decoder_ids.length-1][0]),i.push(new hw(r.begin_suppress_tokens,a))}return r.guidance_scale!==null&&r.guidance_scale>1&&i.push(new yw(r.guidance_scale)),s!==null&&i.extend(s),i}_prepare_generation_config(r,n){const s=new xw(this.config);return"generation_config"in this&&Object.assign(s,this.generation_config),r&&Object.assign(s,r),n&&Object.assign(s,gt(n,Object.getOwnPropertyNames(s))),s}_get_stopping_criteria(r,n=null){const s=new xi;return r.max_length!==null&&s.push(new kw(r.max_length,this.config.max_position_embeddings??null)),r.eos_token_id!==null&&s.push(new Sw(r.eos_token_id)),n&&s.extend(n),s}_validate_model_class(){if(!this.can_generate){const r=[Ci,Hh,Wh,jh],n=hr.get(this.constructor),s=new Set,i=this.config.model_type;for(const o of r){const l=o.get(i);l&&s.add(l[0])}let a=`The current model class (${n}) is not compatible with \`.generate()\`, as it doesn't have a language model head.`;throw s.size>0&&(a+=` Please use the following class instead: ${[...s].join(", ")}`),Error(a)}}prepare_inputs_for_generation(...r){return this._prepare_inputs_for_generation(this,...r)}_update_model_kwargs_for_generation({generated_input_ids:r,outputs:n,model_inputs:s,is_encoder_decoder:i}){return s.past_key_values=this.getPastKeyValues(n,s.past_key_values),s.input_ids=new Z("int64",r.flat(),[r.length,1]),i||(s.attention_mask=it([s.attention_mask,ar([s.attention_mask.dims[0],1])],1)),s.position_ids=null,s}_prepare_model_inputs({inputs:r,bos_token_id:n,model_kwargs:s}){const i=gt(s,this.forward_params),a=this.main_input_name;if(a in i){if(r)throw new Error("`inputs`: {inputs}` were passed alongside {input_name} which is not allowed. Make sure to either pass {inputs} or {input_name}=...")}else i[a]=r;return{inputs_tensor:i[a],model_inputs:i,model_input_name:a}}async _prepare_encoder_decoder_kwargs_for_generation({inputs_tensor:r,model_inputs:n,model_input_name:s,generation_config:i}){const a=gt(n,this.sessions.model.inputNames);let{last_hidden_state:o}=await fr(this,a);return i.guidance_scale!==null&&i.guidance_scale>1&&(o=it([o,Jm(o,0)],0),"attention_mask"in n&&(n.attention_mask=it([n.attention_mask,rg(n.attention_mask)],0))),n.encoder_outputs=o,n}_prepare_decoder_input_ids_for_generation({batch_size:r,model_input_name:n,model_kwargs:s,decoder_start_token_id:i,bos_token_id:a,generation_config:o}){i=i??a;let l;if(this.config.model_type==="musicgen")l=new Array(r*this.config.decoder.num_codebooks).fill(i);else if(Array.isArray(i)){if(i.length!==r)throw new Error(`\`decoder_start_token_id\` expcted to have length ${r} but got ${i.length}`);l=i}else l=new Array(r).fill(i);const d=new Z("int64",l,[l.length,1]);return s.decoder_attention_mask=eg(d),{input_ids:d,model_inputs:s}}async generate({inputs:r=null,generation_config:n=null,logits_processor:s=null,stopping_criteria:i=null,streamer:a=null,...o}){this._validate_model_class(),n=this._prepare_generation_config(n,o);let{inputs_tensor:l,model_inputs:u,model_input_name:d}=this._prepare_model_inputs({inputs:r,model_kwargs:o});const c=this.config.is_encoder_decoder;c&&("encoder_outputs"in u||(u=await this._prepare_encoder_decoder_kwargs_for_generation({inputs_tensor:l,model_inputs:u,model_input_name:d,generation_config:n})));let p;c?{input_ids:p,model_inputs:u}=this._prepare_decoder_input_ids_for_generation({batch_size:u[d].dims.at(0),model_input_name:d,model_kwargs:u,decoder_start_token_id:n.decoder_start_token_id,bos_token_id:n.bos_token_id,generation_config:n}):p=u[d];let h=p.dims.at(-1);n.max_new_tokens!==null&&(n.max_length=h+n.max_new_tokens);const f=this._get_logits_processor(n,h,s),m=this._get_stopping_criteria(n,i),g=u[d].dims.at(0),w=vn.getSampler(n),_=new Array(g).fill(0),v=p.tolist();a&&a.put(v);let b=null;for(;;){u=this.prepare_inputs_for_generation(v,u,n);const S=await this.forward(u),x=S.logits.slice(null,-1,null),I=f(v,x),D=[];for(let U=0;U<I.dims.at(0);++U){const q=I[U],H=w(q);for(const[V,E]of H){const M=BigInt(V);_[U]+=E,v[U].push(M),D.push([M])}}if(a&&a.put(D),m(v).every(U=>U)){n.return_dict_in_generate&&(b=this.getPastKeyValues(S,u.past_key_values,!1));break}u=this._update_model_kwargs_for_generation({generated_input_ids:D,outputs:S,model_inputs:u,is_encoder_decoder:c})}a&&a.end();const y=new Z("int64",v.flat(),[v.length,v[0].length]);return n.return_dict_in_generate?{sequences:y,past_key_values:b}:y}addAttentionsToBeam(r,n){if(this.config.is_encoder_decoder){if(!n.cross_attentions||n.cross_attentions.length===0)throw Error("`output_attentions` is true, but the model did not produce cross-attentions. This is most likely because the model was not exported with `output_attentions=True`.");r.cross_attentions||(r.cross_attentions=[]),r.cross_attentions.push(n.cross_attentions)}if(!n.decoder_attentions||n.decoder_attentions.length===0)throw Error("`output_attentions` is true, but the model did not produce decoder-attentions. This is most likely because the model was not exported with `output_attentions=True`.");r.decoder_attentions||(r.decoder_attentions=[]),r.decoder_attentions.push(n.decoder_attentions)}groupBeams(r){const n=Object.create(null);for(const s of r)n[s.id]===void 0?n[s.id]=[s]:n[s.id].push(s);return Object.values(n)}getPastKeyValues(r,n,s=!0){const i=Object.create(null);for(const a in r)if(a.startsWith("present")){let o=a.replace("present","past_key_values");if(n&&a.includes("encoder"))i[o]=n[o];else{if(s&&n){const l=n[o];l.location==="gpu-buffer"&&l.dispose()}i[o]=r[a]}}return i}getAttentions(r){const n=Object.create(null);for(const s of["cross_attentions","decoder_attentions"]){const i=[];for(const a in r)if(a.startsWith(s)){const o=a.split(".").pop();i[o]=r[a]}n[s]=i}return n}addPastKeyValues(r,n){if(n)Object.assign(r,n);else{const s=this.custom_config.kv_cache_dtype??"float32",i=s==="float16"?new Uint16Array:[],a=Dp(this.config,{encoder_add_pkv:this.add_encoder_pkv??!0});for(const o in a)r[o]=new Z(s,i,a[o])}}}class Le{}class mr extends P{}class Bw extends mr{}class Rw extends mr{async _call(t){return new $e(await super._call(t))}}class Dw extends mr{async _call(t){return new re(await super._call(t))}}class Lw extends mr{async _call(t){return new ve(await super._call(t))}}class Fw extends mr{async _call(t){return new Ee(await super._call(t))}}class Nw extends P{}class Uw extends Nw{}class gr extends P{}class qw extends gr{}class Gw extends gr{async _call(t){return new $e(await super._call(t))}}class Vw extends gr{async _call(t){return new re(await super._call(t))}}class jw extends gr{async _call(t){return new ve(await super._call(t))}}class Ww extends gr{async _call(t){return new Ee(await super._call(t))}}class _r extends P{}class Hw extends _r{}class Kw extends _r{async _call(t){return new $e(await super._call(t))}}class Qw extends _r{async _call(t){return new re(await super._call(t))}}class Xw extends _r{async _call(t){return new ve(await super._call(t))}}class Yw extends _r{async _call(t){return new Ee(await super._call(t))}}class wr extends P{}class Zw extends wr{}class Jw extends wr{async _call(t){return new $e(await super._call(t))}}class ey extends wr{async _call(t){return new re(await super._call(t))}}class ty extends wr{async _call(t){return new ve(await super._call(t))}}class ry extends wr{async _call(t){return new Ee(await super._call(t))}}class yr extends P{}class ny extends yr{}class sy extends yr{async _call(t){return new $e(await super._call(t))}}class iy extends yr{async _call(t){return new re(await super._call(t))}}class ay extends yr{async _call(t){return new ve(await super._call(t))}}class oy extends yr{async _call(t){return new Ee(await super._call(t))}}class br extends P{}class ly extends br{}class uy extends br{async _call(t){return new $e(await super._call(t))}}class dy extends br{async _call(t){return new re(await super._call(t))}}class cy extends br{async _call(t){return new ve(await super._call(t))}}class py extends br{async _call(t){return new Ee(await super._call(t))}}class vr extends P{}class hy extends vr{}class fy extends vr{async _call(t){return new $e(await super._call(t))}}class my extends vr{async _call(t){return new re(await super._call(t))}}class gy extends vr{async _call(t){return new ve(await super._call(t))}}class _y extends vr{async _call(t){return new Ee(await super._call(t))}}class $r extends P{}class wy extends $r{}class yy extends $r{async _call(t){return new re(await super._call(t))}}class by extends $r{async _call(t){return new ve(await super._call(t))}}class vy extends $r{async _call(t){return new Ee(await super._call(t))}}class $y extends $r{async _call(t){return new $e(await super._call(t))}}class xn extends P{}class xy extends xn{}class ky extends xn{async _call(t){return new $e(await super._call(t))}}class Sy extends xn{async _call(t){return new re(await super._call(t))}}class Ey extends xn{async _call(t){return new ve(await super._call(t))}}class kn extends P{}class Ty extends kn{}class Iy extends kn{async _call(t){return new $e(await super._call(t))}}class My extends kn{async _call(t){return new re(await super._call(t))}}class Cy extends kn{async _call(t){return new Ee(await super._call(t))}}class xr extends P{}class zy extends xr{}class Ay extends xr{async _call(t){return new $e(await super._call(t))}}class Py extends xr{async _call(t){return new re(await super._call(t))}}class Oy extends xr{async _call(t){return new ve(await super._call(t))}}class By extends xr{async _call(t){return new Ee(await super._call(t))}}class Sn extends P{}class Ry extends Sn{}class Dy extends Sn{async _call(t){return new $e(await super._call(t))}}class Ly extends Sn{async _call(t){return new re(await super._call(t))}}class Fy extends Sn{async _call(t){return new Ee(await super._call(t))}}class En extends P{}class Ny extends En{}class Uy extends En{async _call(t){return new re(await super._call(t))}}class qy extends En{async _call(t){return new Ee(await super._call(t))}}class Gy extends En{async _call(t){return new $e(await super._call(t))}}class Wp extends P{constructor(r,n,s){super(r,n);T(this,"forward_params",["input_ids","attention_mask","encoder_outputs","decoder_input_ids","decoder_attention_mask","past_key_values"]);this.generation_config=s}}class Vy extends Wp{}class jy extends Wp{}class Hp extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Wy extends Hp{}class Hy extends Hp{}class Kp extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Ky extends Kp{}class Qy extends Kp{}class Si extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Xy extends Si{}class Yy extends Si{}class Zy extends Si{async _call(t){return new re(await super._call(t))}}class Tn extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Jy extends Tn{}class eb extends Tn{}class tb extends Tn{async _call(t){return new re(await super._call(t))}}class rb extends Tn{}class Qp extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class nb extends Qp{}class sb extends Qp{}class Xp extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class ib extends Xp{}class ab extends Xp{}class kr extends P{}class ob extends kr{}class lb extends kr{async _call(t){return new $e(await super._call(t))}}class ub extends kr{async _call(t){return new re(await super._call(t))}}class db extends kr{async _call(t){return new ve(await super._call(t))}}class cb extends kr{async _call(t){return new Ee(await super._call(t))}}class Sr extends P{}class pb extends Sr{}class hb extends Sr{async _call(t){return new $e(await super._call(t))}}class fb extends Sr{async _call(t){return new re(await super._call(t))}}class mb extends Sr{async _call(t){return new ve(await super._call(t))}}class gb extends Sr{async _call(t){return new Ee(await super._call(t))}}class Er extends P{}class _b extends Er{}class wb extends Er{async _call(t){return new $e(await super._call(t))}}class yb extends Er{async _call(t){return new re(await super._call(t))}}class bb extends Er{async _call(t){return new ve(await super._call(t))}}class vb extends Er{async _call(t){return new Ee(await super._call(t))}}class Yp extends P{}class $b extends Yp{}class xb extends Yp{}class Zp extends P{constructor(r,n,s){super(r,n);T(this,"requires_attention_mask",!1);T(this,"main_input_name","input_features");T(this,"forward_params",["input_features","attention_mask","decoder_input_ids","decoder_attention_mask","past_key_values"]);this.generation_config=s}}class kb extends Zp{}class Sb extends Zp{_retrieve_init_tokens(t){throw t.decoder_start_token_id,new Error("Not implemented yet")}async generate({inputs:t=null,generation_config:r=null,logits_processor:n=null,stopping_criteria:s=null,language:i=null,task:a=null,...o}){throw new Error("WhisperForConditionalGeneration.generate is not yet in Transformers.js v3.")}_extract_token_timestamps(t,r,n=null,s=.02){if(!t.cross_attentions)throw new Error("Model outputs must contain cross attentions to extract timestamps. This is most likely because the model was not exported with `output_attentions=True`.");let i=this.config.median_filter_width;i===void 0&&(console.warn("Model config has no `median_filter_width`, using default value of 7."),i=7);const a=t.cross_attentions.map(u=>{let d=Array.from({length:this.config.decoder_layers},(g,w)=>it(u.map(_=>_[w]),2)),c=fi(r.map(([g,w])=>n?d[g].slice(null,w,null,[0,n]):d[g].slice(null,w)));c=c.transpose(1,0,2,3);let[p,h]=Qm(c,-2,0,!0),f=c.clone();for(let g=0;g<f.dims[0];++g){let w=f[g];for(let _=0;_<w.dims[0];++_){let v=w[_];const b=p[g][_][0],y=h[g][_][0];for(let S=0;S<v.dims[0];++S){let x=v[S];for(let I=0;I<x.data.length;++I)x.data[I]=(x.data[I]-y.data[I])/b.data[I];x.data.set(wf(x.data,i))}}}return mi(f,1)}),o=[t.sequences.length,t.sequences[0].length],l=new Z("float32",new Float32Array(o[0]*o[1]),o);for(let u=0;u<o[0];++u){const d=a[u].neg().squeeze_(0);let[c,p]=Xm(d),h=Array.from({length:c.length-1},(g,w)=>c[w+1]-c[w]),f=ye([1],h).map(g=>!!g),m=[];for(let g=0;g<f.length;++g)f[g]&&m.push(p[g]*s);l[u].data.set(m,1)}return l}}class Eb extends P{constructor(r,n,s){super(r,n);T(this,"main_input_name","pixel_values");throw this.generation_config=s,new Error("Not implemented yet")}}class Tb extends P{constructor(r,n,s){super(r,n);T(this,"forward_params",["input_ids","pixel_values","attention_mask","position_ids","past_key_values"]);this.generation_config=s}}class Jp extends Tb{async encode_image({pixel_values:t}){const r=(await ht(this.sessions.vision_encoder,{pixel_values:t})).image_features;return this.config.num_image_tokens||(console.warn(`The number of image tokens was not set in the model configuration. Setting it to the number of features detected by the vision encoder (${r.dims[1]}).`),this.config.num_image_tokens=r.dims[1]),r}async encode_text({input_ids:t}){return(await ht(this.sessions.embed_tokens,{input_ids:t})).inputs_embeds}_merge_input_ids_with_image_features({inputs_embeds:t,image_features:r,input_ids:n,attention_mask:s}){const i=this.config.image_token_index,o=n.tolist().map(p=>p.findIndex(h=>h==i)),l=o.every(p=>p===-1),u=o.every(p=>p!==-1);if(!l&&!u)throw new Error("Every input should contain either 0 or 1 image token.");if(l)return{inputs_embeds:t,attention_mask:s};const d=[],c=[];for(let p=0;p<o.length;++p){const h=o[p],f=t[p],m=r[p],g=s[p];d.push(it([f.slice([0,h]),m,f.slice([h+1,f.dims[0]])],0)),c.push(it([g.slice([0,h]),ar([m.dims[0]]),g.slice([h+1,g.dims[0]])],0))}return{inputs_embeds:fi(d,0),attention_mask:fi(c,0)}}}class Ib extends Jp{}class In extends P{}class Mb extends In{}class Cb extends In{static async from_pretrained(t,r={}){return r.model_file_name??(r.model_file_name="text_model"),super.from_pretrained(t,r)}}class zb extends In{static async from_pretrained(t,r={}){return r.model_file_name??(r.model_file_name="vision_model"),super.from_pretrained(t,r)}}class eh extends P{}class Ab extends eh{}class Pb extends eh{static async from_pretrained(t,r={}){return r.model_file_name??(r.model_file_name="text_model"),super.from_pretrained(t,r)}}class Ob extends In{static async from_pretrained(t,r={}){return r.model_file_name??(r.model_file_name="vision_model"),super.from_pretrained(t,r)}}class Bb extends P{}class Rb extends Bb{}class th extends P{}class Db extends th{}class Lb extends th{}class rh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Fb extends rh{}class Nb extends rh{}class nh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Ub extends nh{}class qb extends nh{}class sh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Gb extends sh{}class Vb extends sh{}class ih extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class jb extends ih{}class Wb extends ih{}class ah extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Hb extends ah{}class Kb extends ah{}class oh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Qb extends oh{}class Xb extends oh{}class lh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Yb extends lh{}class Zb extends lh{}class uh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Jb extends uh{}class e0 extends uh{}class dh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class t0 extends dh{}class r0 extends dh{}class ch extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class n0 extends ch{}class s0 extends ch{}class ph extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class i0 extends ph{}class a0 extends ph{}class hh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class o0 extends hh{}class l0 extends hh{}class fh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class u0 extends fh{}class d0 extends fh{}class mh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class c0 extends mh{}class p0 extends mh{}class gh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class h0 extends gh{}class f0 extends gh{}class _h extends P{}class m0 extends _h{}class g0 extends _h{async _call(t){return new re(await super._call(t))}}class _0 extends P{}class w0 extends _0{async _call(t){return new T$(await super._call(t))}}class wh extends P{}class y0 extends wh{}class b0 extends wh{async _call(t){return new re(await super._call(t))}}class yh extends P{}class v0 extends yh{}class $0 extends yh{}class bh extends P{}class x0 extends bh{}class k0 extends bh{}class vh extends P{}class S0 extends vh{}class E0 extends vh{async _call(t){return new re(await super._call(t))}}class Ei extends P{}class T0 extends Ei{}class I0 extends Ei{async _call(t){return new $h(await super._call(t))}}class M0 extends Ei{async _call(t){return new C0(await super._call(t))}}class $h extends Le{constructor({logits:t,pred_boxes:r}){super(),this.logits=t,this.pred_boxes=r}}class C0 extends Le{constructor({logits:t,pred_boxes:r,pred_masks:n}){super(),this.logits=t,this.pred_boxes=r,this.pred_masks=n}}class xh extends P{}class z0 extends xh{}class A0 extends xh{async _call(t){return new P0(await super._call(t))}}class P0 extends $h{}class kh extends P{}class O0 extends kh{}class B0 extends kh{async _call(t){return new re(await super._call(t))}}class Sh extends P{}class R0 extends Sh{}class D0 extends Sh{async _call(t){return new re(await super._call(t))}}class Eh extends P{}class L0 extends Eh{}class F0 extends Eh{async _call(t){return new re(await super._call(t))}}class Th extends P{}class N0 extends Th{}class U0 extends Th{}class Ih extends P{}class q0 extends Ih{}class G0 extends Ih{}class V0 extends P{}class j0 extends V0{}class Mh extends P{}class W0 extends Mh{}class H0 extends Mh{}class K0 extends P{}class Q0 extends K0{}class Ch extends P{}class X0 extends Ch{}class Y0 extends Ch{async _call(t){return new re(await super._call(t))}}class zh extends P{}class Z0 extends zh{}class J0 extends zh{async _call(t){return new re(await super._call(t))}}class Ah extends P{}class ev extends Ah{}class tv extends Ah{async _call(t){return new re(await super._call(t))}}class Ph extends P{}class rv extends Ph{}class nv extends Ph{async _call(t){return new sv(await super._call(t))}}class sv extends Le{constructor({logits:t,pred_boxes:r}){super(),this.logits=t,this.pred_boxes=r}}class iv extends P{}class av extends iv{async get_image_embeddings({pixel_values:t}){return await fr(this,{pixel_values:t})}async forward(t){if((!t.image_embeddings||!t.image_positional_embeddings)&&(t={...t,...await this.get_image_embeddings(t)}),!t.input_labels&&t.input_points){const n=t.input_points.dims.slice(0,-1),s=n.reduce((i,a)=>i*a,1);t.input_labels=new Z("int64",new BigInt64Array(s).fill(1n),n)}const r={image_embeddings:t.image_embeddings,image_positional_embeddings:t.image_positional_embeddings};return t.input_points&&(r.input_points=t.input_points),t.input_labels&&(r.input_labels=t.input_labels),t.input_boxes&&(r.input_boxes=t.input_boxes),await ht(this.sessions.prompt_encoder_mask_decoder,r)}async _call(t){return new ov(await super._call(t))}}class ov extends Le{constructor({iou_scores:t,pred_masks:r}){super(),this.iou_scores=t,this.pred_masks=r}}class Oh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class lv extends Oh{}class uv extends Oh{}class Bh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class dv extends Bh{}class cv extends Bh{}class At extends P{}class pv extends At{}class hv extends At{async _call(t){return new qt(await super._call(t))}}class fv extends At{async _call(t){return new re(await super._call(t))}}class mv extends At{async _call(t){return new ve(await super._call(t))}}class Ti extends P{}class gv extends Ti{}class _v extends Ti{async _call(t){return new qt(await super._call(t))}}class wv extends Ti{async _call(t){return new re(await super._call(t))}}class Mn extends P{}class yv extends Mn{}class bv extends Mn{async _call(t){return new qt(await super._call(t))}}class vv extends Mn{async _call(t){return new re(await super._call(t))}}class $v extends Mn{async _call(t){return new ve(await super._call(t))}}class Ii extends P{}class xv extends Ii{}class kv extends Ii{async _call(t){return new qt(await super._call(t))}}class Sv extends Ii{async _call(t){return new re(await super._call(t))}}class Ev extends At{}class Tv extends At{async _call(t){return new qt(await super._call(t))}}class Iv extends At{async _call(t){return new re(await super._call(t))}}class Tr extends P{}class Mv extends Tr{}class Cv extends Tr{async _call(t){return new qt(await super._call(t))}}class zv extends Tr{async _call(t){return new re(await super._call(t))}}class Av extends Tr{async _call(t){return new E$(await super._call(t))}}class Pv extends Tr{async _call(t){return new ve(await super._call(t))}}class Rh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Ov extends Rh{}class Bv extends Rh{async generate_speech(t,r,{threshold:n=.5,minlenratio:s=0,maxlenratio:i=20,vocoder:a=null}={}){const o={input_ids:t},{encoder_outputs:l,encoder_attention_mask:u}=await fr(this,o),d=l.dims[1]/this.config.reduction_factor,c=Math.floor(d*i),p=Math.floor(d*s),h=this.config.num_mel_bins;let f=[],m=null,g=null,w=0;for(;;){++w;const b=Gp(!!g);let y;g?y=g.output_sequence_out:y=new Z("float32",new Float32Array(h),[1,1,h]);let S={use_cache_branch:b,output_sequence:y,encoder_attention_mask:u,speaker_embeddings:r,encoder_hidden_states:l};this.addPastKeyValues(S,m),g=await ht(this.sessions.decoder_model_merged,S),m=this.getPastKeyValues(g,m);const{prob:x,spectrum:I}=g;if(f.push(I),w>=p&&(Array.from(x.data).filter(D=>D>=n).length>0||w>=c))break}const _=it(f),{waveform:v}=await ht(a.sessions.model,{spectrogram:_});return{spectrogram:_,waveform:v}}}class Rv extends P{constructor(){super(...arguments);T(this,"main_input_name","spectrogram")}}class Dv extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Lv extends Dv{}class Dh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Fv extends Dh{}class Nv extends Dh{}class Lh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Uv extends Lh{}class qv extends Lh{}class Fh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Gv extends Fh{}class Vv extends Fh{}class Mi extends P{}class jv extends Mi{}class Wv extends Mi{static async from_pretrained(t,r={}){return r.model_file_name??(r.model_file_name="text_model"),super.from_pretrained(t,r)}}class Hv extends Mi{static async from_pretrained(t,r={}){return r.model_file_name??(r.model_file_name="audio_model"),super.from_pretrained(t,r)}}class Kv extends P{}class Nh extends Kv{async _call(t){return new I$(await super._call(t))}}class Uh extends P{}class Qv extends Uh{}class Xv extends Uh{}class qh extends P{constructor(t,r,n){super(t,r),this.generation_config=n}}class Yv extends qh{}class Zv extends qh{}class Gh extends P{}class Jv extends Gh{}class e$ extends Gh{async _call(t){return new re(await super._call(t))}}class Vh extends P{constructor(r,n,s){super(r,n);T(this,"forward_params",["input_ids","attention_mask","encoder_outputs","decoder_input_ids","decoder_attention_mask","past_key_values"]);this.generation_config=s}_apply_and_filter_by_delay_pattern_mask(r){const[n,s]=r.dims,i=this.config.decoder.num_codebooks,a=s-i;let o=0;for(let d=0;d<r.size;++d){if(r.data[d]===this.config.decoder.pad_token_id)continue;const c=d%s,p=Math.floor(d/s)%i,h=c-p;h>0&&h<=a&&(r.data[o++]=r.data[d])}const l=Math.floor(n/i),u=o/(l*i);return new Z(r.type,r.data.slice(0,o),[l,i,u])}prepare_inputs_for_generation(r,n,s){let i=structuredClone(r);for(let o=0;o<i.length;++o)for(let l=0;l<i[o].length;++l)o%this.config.decoder.num_codebooks>=l&&(i[o][l]=BigInt(this.config.decoder.pad_token_id));return s.guidance_scale!==null&&s.guidance_scale>1&&(i=i.concat(i)),super.prepare_inputs_for_generation(i,n,s)}async generate(r){const n=await super.generate(r),s=this._apply_and_filter_by_delay_pattern_mask(n).unsqueeze_(0),{audio_values:i}=await ht(this.sessions.encodec_decode,{audio_codes:s});return i}}class Cn{static async from_pretrained(t,{progress_callback:r=null,config:n=null,cache_dir:s=null,local_files_only:i=!1,revision:a="main",model_file_name:o=null,subfolder:l="onnx",device:u=null,dtype:d=null,use_external_data_format:c=null,session_options:p={}}={}){let h={progress_callback:r,config:n,cache_dir:s,local_files_only:i,revision:a,model_file_name:o,subfolder:l,device:u,dtype:d,use_external_data_format:c,session_options:p};if(h.config=await Lp.from_pretrained(t,h),!this.MODEL_CLASS_MAPPINGS)throw new Error("`MODEL_CLASS_MAPPINGS` not implemented for this type of `AutoClass`: "+this.name);for(let f of this.MODEL_CLASS_MAPPINGS){const m=f.get(h.config.model_type);if(m)return await m[1].from_pretrained(t,h)}if(this.BASE_IF_FAIL)return console.warn(`Unknown model class "${h.config.model_type}", attempting to construct from base class.`),await P.from_pretrained(t,h);throw Error(`Unsupported model type: ${h.config.model_type}`)}}T(Cn,"MODEL_CLASS_MAPPINGS",null),T(Cn,"BASE_IF_FAIL",!1);const t$=new Map([["bert",["BertModel",Bw]],["nomic_bert",["NomicBertModel",Uw]],["roformer",["RoFormerModel",qw]],["electra",["ElectraModel",Zw]],["esm",["EsmModel",xy]],["convbert",["ConvBertModel",Hw]],["camembert",["CamembertModel",ny]],["deberta",["DebertaModel",ly]],["deberta-v2",["DebertaV2Model",hy]],["mpnet",["MPNetModel",zy]],["albert",["AlbertModel",Ny]],["distilbert",["DistilBertModel",wy]],["roberta",["RobertaModel",ob]],["xlm",["XLMModel",pb]],["xlm-roberta",["XLMRobertaModel",_b]],["clap",["ClapModel",jv]],["clip",["CLIPModel",Mb]],["clipseg",["CLIPSegModel",Db]],["chinese_clip",["ChineseCLIPModel",Rb]],["siglip",["SiglipModel",Ab]],["mobilebert",["MobileBertModel",Ty]],["squeezebert",["SqueezeBertModel",Ry]],["wav2vec2",["Wav2Vec2Model",pv]],["wav2vec2-bert",["Wav2Vec2BertModel",xv]],["unispeech",["UniSpeechModel",gv]],["unispeech-sat",["UniSpeechSatModel",yv]],["hubert",["HubertModel",Ev]],["wavlm",["WavLMModel",Mv]],["audio-spectrogram-transformer",["ASTModel",$b]],["vits",["VitsModel",Nh]],["detr",["DetrModel",T0]],["table-transformer",["TableTransformerModel",z0]],["vit",["ViTModel",m0]],["mobilevit",["MobileViTModel",y0]],["owlvit",["OwlViTModel",v0]],["owlv2",["Owlv2Model",x0]],["beit",["BeitModel",S0]],["deit",["DeiTModel",O0]],["convnext",["ConvNextModel",X0]],["convnextv2",["ConvNextV2Model",Z0]],["dinov2",["Dinov2Model",ev]],["resnet",["ResNetModel",R0]],["swin",["SwinModel",L0]],["swin2sr",["Swin2SRModel",N0]],["donut-swin",["DonutSwinModel",Q0]],["yolos",["YolosModel",rv]],["dpt",["DPTModel",q0]],["glpn",["GLPNModel",W0]],["hifigan",["SpeechT5HifiGan",Rv]],["efficientnet",["EfficientNetModel",Jv]]]),r$=new Map([["t5",["T5Model",Vy]],["longt5",["LongT5Model",Wy]],["mt5",["MT5Model",Ky]],["bart",["BartModel",Xy]],["mbart",["MBartModel",Jy]],["marian",["MarianModel",lv]],["whisper",["WhisperModel",kb]],["m2m_100",["M2M100Model",dv]],["blenderbot",["BlenderbotModel",nb]],["blenderbot-small",["BlenderbotSmallModel",ib]]]),n$=new Map([["bloom",["BloomModel",u0]],["gpt2",["GPT2Model",Fb]],["gptj",["GPTJModel",jb]],["gpt_bigcode",["GPTBigCodeModel",Hb]],["gpt_neo",["GPTNeoModel",Ub]],["gpt_neox",["GPTNeoXModel",Gb]],["codegen",["CodeGenModel",Qb]],["llama",["LlamaModel",Yb]],["gemma",["GemmaModel",Jb]],["openelm",["OpenELMModel",t0]],["qwen2",["Qwen2Model",n0]],["phi",["PhiModel",i0]],["phi3",["Phi3Model",o0]],["mpt",["MptModel",c0]],["opt",["OPTModel",h0]],["mistral",["MistralModel",Fv]],["starcoder2",["Starcoder2Model",Uv]],["falcon",["FalconModel",Gv]],["stablelm",["StableLmModel",Yv]]]),jh=new Map([["speecht5",["SpeechT5ForSpeechToText",Ov]],["whisper",["WhisperForConditionalGeneration",Sb]]]),s$=new Map([["speecht5",["SpeechT5ForTextToSpeech",Bv]]]),i$=new Map([["vits",["VitsModel",Nh]],["musicgen",["MusicgenForConditionalGeneration",Vh]]]),a$=new Map([["bert",["BertForSequenceClassification",Dw]],["roformer",["RoFormerForSequenceClassification",Vw]],["electra",["ElectraForSequenceClassification",ey]],["esm",["EsmForSequenceClassification",Sy]],["convbert",["ConvBertForSequenceClassification",Qw]],["camembert",["CamembertForSequenceClassification",iy]],["deberta",["DebertaForSequenceClassification",dy]],["deberta-v2",["DebertaV2ForSequenceClassification",my]],["mpnet",["MPNetForSequenceClassification",Py]],["albert",["AlbertForSequenceClassification",Uy]],["distilbert",["DistilBertForSequenceClassification",yy]],["roberta",["RobertaForSequenceClassification",ub]],["xlm",["XLMForSequenceClassification",fb]],["xlm-roberta",["XLMRobertaForSequenceClassification",yb]],["bart",["BartForSequenceClassification",Zy]],["mbart",["MBartForSequenceClassification",tb]],["mobilebert",["MobileBertForSequenceClassification",My]],["squeezebert",["SqueezeBertForSequenceClassification",Ly]]]),o$=new Map([["bert",["BertForTokenClassification",Lw]],["roformer",["RoFormerForTokenClassification",jw]],["electra",["ElectraForTokenClassification",ty]],["esm",["EsmForTokenClassification",Ey]],["convbert",["ConvBertForTokenClassification",Xw]],["camembert",["CamembertForTokenClassification",ay]],["deberta",["DebertaForTokenClassification",cy]],["deberta-v2",["DebertaV2ForTokenClassification",gy]],["mpnet",["MPNetForTokenClassification",Oy]],["distilbert",["DistilBertForTokenClassification",by]],["roberta",["RobertaForTokenClassification",db]],["xlm",["XLMForTokenClassification",mb]],["xlm-roberta",["XLMRobertaForTokenClassification",bb]]]),Wh=new Map([["t5",["T5ForConditionalGeneration",jy]],["longt5",["LongT5ForConditionalGeneration",Hy]],["mt5",["MT5ForConditionalGeneration",Qy]],["bart",["BartForConditionalGeneration",Yy]],["mbart",["MBartForConditionalGeneration",eb]],["marian",["MarianMTModel",uv]],["m2m_100",["M2M100ForConditionalGeneration",cv]],["blenderbot",["BlenderbotForConditionalGeneration",sb]],["blenderbot-small",["BlenderbotSmallForConditionalGeneration",ab]]]),Ci=new Map([["bloom",["BloomForCausalLM",d0]],["gpt2",["GPT2LMHeadModel",Nb]],["gptj",["GPTJForCausalLM",Wb]],["gpt_bigcode",["GPTBigCodeForCausalLM",Kb]],["gpt_neo",["GPTNeoForCausalLM",qb]],["gpt_neox",["GPTNeoXForCausalLM",Vb]],["codegen",["CodeGenForCausalLM",Xb]],["llama",["LlamaForCausalLM",Zb]],["gemma",["GemmaForCausalLM",e0]],["openelm",["OpenELMForCausalLM",r0]],["qwen2",["Qwen2ForCausalLM",s0]],["phi",["PhiForCausalLM",a0]],["phi3",["Phi3ForCausalLM",l0]],["mpt",["MptForCausalLM",p0]],["opt",["OPTForCausalLM",f0]],["mbart",["MBartForCausalLM",rb]],["mistral",["MistralForCausalLM",Nv]],["starcoder2",["Starcoder2ForCausalLM",qv]],["falcon",["FalconForCausalLM",Vv]],["trocr",["TrOCRForCausalLM",Lv]],["stablelm",["StableLmForCausalLM",Zv]]]),l$=new Map([["bert",["BertForMaskedLM",Rw]],["roformer",["RoFormerForMaskedLM",Gw]],["electra",["ElectraForMaskedLM",Jw]],["esm",["EsmForMaskedLM",ky]],["convbert",["ConvBertForMaskedLM",Kw]],["camembert",["CamembertForMaskedLM",sy]],["deberta",["DebertaForMaskedLM",uy]],["deberta-v2",["DebertaV2ForMaskedLM",fy]],["mpnet",["MPNetForMaskedLM",Ay]],["albert",["AlbertForMaskedLM",Gy]],["distilbert",["DistilBertForMaskedLM",$y]],["roberta",["RobertaForMaskedLM",lb]],["xlm",["XLMWithLMHeadModel",hb]],["xlm-roberta",["XLMRobertaForMaskedLM",wb]],["mobilebert",["MobileBertForMaskedLM",Iy]],["squeezebert",["SqueezeBertForMaskedLM",Dy]]]),u$=new Map([["bert",["BertForQuestionAnswering",Fw]],["roformer",["RoFormerForQuestionAnswering",Ww]],["electra",["ElectraForQuestionAnswering",ry]],["convbert",["ConvBertForQuestionAnswering",Yw]],["camembert",["CamembertForQuestionAnswering",oy]],["deberta",["DebertaForQuestionAnswering",py]],["deberta-v2",["DebertaV2ForQuestionAnswering",_y]],["mpnet",["MPNetForQuestionAnswering",By]],["albert",["AlbertForQuestionAnswering",qy]],["distilbert",["DistilBertForQuestionAnswering",vy]],["roberta",["RobertaForQuestionAnswering",cb]],["xlm",["XLMForQuestionAnswering",gb]],["xlm-roberta",["XLMRobertaForQuestionAnswering",vb]],["mobilebert",["MobileBertForQuestionAnswering",Cy]],["squeezebert",["SqueezeBertForQuestionAnswering",Fy]]]),Hh=new Map([["vision-encoder-decoder",["VisionEncoderDecoderModel",Eb]]]),d$=new Map([["llava",["LlavaForConditionalGeneration",Jp]],["moondream1",["Moondream1ForConditionalGeneration",Ib]]]),c$=new Map([["vit",["ViTForImageClassification",g0]],["mobilevit",["MobileViTForImageClassification",b0]],["beit",["BeitForImageClassification",E0]],["deit",["DeiTForImageClassification",B0]],["convnext",["ConvNextForImageClassification",Y0]],["convnextv2",["ConvNextV2ForImageClassification",J0]],["dinov2",["Dinov2ForImageClassification",tv]],["resnet",["ResNetForImageClassification",D0]],["swin",["SwinForImageClassification",F0]],["segformer",["SegformerForImageClassification",Qv]],["efficientnet",["EfficientNetForImageClassification",e$]]]),p$=new Map([["detr",["DetrForObjectDetection",I0]],["table-transformer",["TableTransformerForObjectDetection",A0]],["yolos",["YolosForObjectDetection",nv]]]),h$=new Map([["owlvit",["OwlViTForObjectDetection",$0]],["owlv2",["Owlv2ForObjectDetection",k0]]]),f$=new Map([["detr",["DetrForSegmentation",M0]],["clipseg",["CLIPSegForImageSegmentation",Lb]]]),m$=new Map([["segformer",["SegformerForSemanticSegmentation",Xv]]]),g$=new Map([["sam",["SamModel",av]]]),_$=new Map([["wav2vec2",["Wav2Vec2ForCTC",hv]],["wav2vec2-bert",["Wav2Vec2BertForCTC",kv]],["unispeech",["UniSpeechForCTC",_v]],["unispeech-sat",["UniSpeechSatForCTC",bv]],["wavlm",["WavLMForCTC",Cv]],["hubert",["HubertForCTC",Tv]]]),w$=new Map([["wav2vec2",["Wav2Vec2ForSequenceClassification",fv]],["wav2vec2-bert",["Wav2Vec2BertForSequenceClassification",Sv]],["unispeech",["UniSpeechForSequenceClassification",wv]],["unispeech-sat",["UniSpeechSatForSequenceClassification",vv]],["wavlm",["WavLMForSequenceClassification",zv]],["hubert",["HubertForSequenceClassification",Iv]],["audio-spectrogram-transformer",["ASTForAudioClassification",xb]]]),y$=new Map([["wavlm",["WavLMForXVector",Av]]]),b$=new Map([["unispeech-sat",["UniSpeechSatForAudioFrameClassification",$v]],["wavlm",["WavLMForAudioFrameClassification",Pv]],["wav2vec2",["Wav2Vec2ForAudioFrameClassification",mv]]]),v$=new Map([["vitmatte",["VitMatteForImageMatting",w0]]]),$$=new Map([["swin2sr",["Swin2SRForImageSuperResolution",U0]]]),x$=new Map([["dpt",["DPTForDepthEstimation",G0]],["depth_anything",["DepthAnythingForDepthEstimation",j0]],["glpn",["GLPNForDepthEstimation",H0]]]),k$=new Map([["clip",["CLIPVisionModelWithProjection",zb]],["siglip",["SiglipVisionModel",Ob]]]),Kh=[[t$,W.EncoderOnly],[r$,W.EncoderDecoder],[n$,W.DecoderOnly],[a$,W.EncoderOnly],[o$,W.EncoderOnly],[Wh,W.Seq2Seq],[jh,W.Seq2Seq],[Ci,W.DecoderOnly],[l$,W.EncoderOnly],[u$,W.EncoderOnly],[Hh,W.Vision2Seq],[d$,W.ImageTextToText],[c$,W.EncoderOnly],[f$,W.EncoderOnly],[m$,W.EncoderOnly],[v$,W.EncoderOnly],[$$,W.EncoderOnly],[x$,W.EncoderOnly],[p$,W.EncoderOnly],[h$,W.EncoderOnly],[g$,W.MaskGeneration],[_$,W.EncoderOnly],[w$,W.EncoderOnly],[s$,W.Seq2Seq],[i$,W.EncoderOnly],[y$,W.EncoderOnly],[b$,W.EncoderOnly],[k$,W.EncoderOnly]];for(const[e,t]of Kh)for(const[r,n]of e.values())$n.set(r,t),hr.set(n,r),Up.set(r,n);const S$=[["MusicgenForConditionalGeneration",Vh,W.Musicgen],["CLIPTextModelWithProjection",Cb,W.EncoderOnly],["SiglipTextModel",Pb,W.EncoderOnly],["ClapTextModelWithProjection",Wv,W.EncoderOnly],["ClapAudioModelWithProjection",Hv,W.EncoderOnly]];for(const[e,t,r]of S$)$n.set(e,r),hr.set(t,e),Up.set(e,t);class Qh extends Cn{}T(Qh,"MODEL_CLASS_MAPPINGS",Kh.map(t=>t[0])),T(Qh,"BASE_IF_FAIL",!0);class Xh extends Cn{}T(Xh,"MODEL_CLASS_MAPPINGS",[Ci]);class re extends Le{constructor({logits:t}){super(),this.logits=t}}class E$ extends Le{constructor({logits:t,embeddings:r}){super(),this.logits=t,this.embeddings=r}}class ve extends Le{constructor({logits:t}){super(),this.logits=t}}class $e extends Le{constructor({logits:t}){super(),this.logits=t}}class Ee extends Le{constructor({start_logits:t,end_logits:r}){super(),this.start_logits=t,this.end_logits=r}}class qt extends Le{constructor({logits:t}){super(),this.logits=t}}class T$ extends Le{constructor({alphas:t}){super(),this.alphas=t}}class I$ extends Le{constructor({waveform:t,spectrogram:r}){super(),this.waveform=t,this.spectrogram=r}}if(!(typeof self<"u")){if(!oe)throw new Error("Unable to load image processing library.")}class M${put(t){throw Error("Not implemented")}end(){throw Error("Not implemented")}}const Yh=mt.IS_PROCESS_AVAILABLE?e=>process.stdout.write(e):e=>console.log(e);class C$ extends M${constructor(t,{skip_prompt:r=!1,...n}={}){super(),this.tokenizer=t,this.skip_prompt=r,this.decode_kwargs=n,this.token_cache=[],this.print_len=0,this.next_tokens_are_prompt=!0}put(t){if(t.length>1)throw Error("TextStreamer only supports batch size of 1");const r=t[0];if(this.skip_prompt&&this.next_tokens_are_prompt){this.next_tokens_are_prompt=!1;return}this.token_cache=ye(this.token_cache,r);const n=this.tokenizer.decode(this.token_cache,this.decode_kwargs);let s;n.endsWith(`
`)?(s=n.slice(this.print_len),this.token_cache=[],this.print_len=0):n.length>0&&Ep(n.charCodeAt(n.length-1))?(s=n.slice(this.print_len),this.print_len+=s.length):(s=n.slice(this.print_len,n.lastIndexOf(" ")+1),this.print_len+=s.length),this.on_finalized_text(s,!1)}end(){let t;this.token_cache.length>0?(t=this.tokenizer.decode(this.token_cache,this.decode_kwargs).slice(this.print_len),this.token_cache=[],this.print_len=0):t="",this.next_tokens_are_prompt=!0,this.on_finalized_text(t,!0)}on_finalized_text(t,r){Yh(t),r&&Yh(`
`)}}class z$ extends C${constructor(t,r){super(t,{skip_prompt:!0,skip_special_tokens:!0}),this.cb=r}on_finalized_text(t){this.cb(t)}}class A$ extends bn{constructor(){super(),this.interrupted=!1}interrupt(){this.interrupted=!0}reset(){this.interrupted=!1}_call(t,r){return new Array(t.length).fill(this.interrupted)}}const zn=new A$;async function P$(){try{return(await navigator.gpu.requestAdapter()).features.has("shader-f16")}catch{return!1}}class Gt{static async getInstance(t=null){return this.model_id??(this.model_id=await P$()?"Xenova/Phi-3-mini-4k-instruct_fp16":"Xenova/Phi-3-mini-4k-instruct"),this.tokenizer??(this.tokenizer=Rp.from_pretrained(this.model_id,{legacy:!0,progress_callback:t})),this.model??(this.model=Xh.from_pretrained(this.model_id,{dtype:"q4",device:"webgpu",use_external_data_format:!0,progress_callback:t})),Promise.all([this.tokenizer,this.model])}}T(Gt,"model_id",null),T(Gt,"model",null),T(Gt,"tokenizer",null),T(Gt,"streamer",null);async function O$(e){const[t,r]=await Gt.getInstance(),n=t.apply_chat_template(e,{add_generation_prompt:!0,return_dict:!0});let s,i=0;const a=d=>{s??(s=performance.now());let c;i++>0&&(c=i/(performance.now()-s)*1e3),self.postMessage({status:"update",output:d,tps:c,numTokens:i})},o=new z$(t,a);self.postMessage({status:"start"});const l=await r.generate({...n,max_new_tokens:512,streamer:o,stopping_criteria:zn}),u=t.batch_decode(l,{skip_special_tokens:!1});self.postMessage({status:"complete",output:u})}async function B$(){self.postMessage({status:"loading",data:"Loading model"}),pe.backends.onnx.wasm.wasmPaths="/models/wasm/ort-web@1_19_0_dev/",location.href.toLowerCase().indexOf("github.io")>-1?(pe.allowLocalModels=!1,pe.allowRemoteModels=!0):(pe.localModelPath="/models/",pe.allowLocalModels=!0,pe.allowRemoteModels=!1);const[e,t]=await Gt.getInstance(n=>{self.postMessage(n)});self.postMessage({status:"loading",data:"Compiling shaders and warming up model..."});const r=e("a");await t.generate({...r,max_new_tokens:1}),self.postMessage({status:"ready"})}self.addEventListener("message",async e=>{const{type:t,data:r}=e.data;switch(t){case"load":B$();break;case"generate":zn.reset(),O$(r);break;case"interrupt":zn.interrupt();break;case"reset":zn.reset();break}})})();
