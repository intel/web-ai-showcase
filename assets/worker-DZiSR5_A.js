(function(){"use strict";var ce={},Qh=Object.freeze({__proto__:null,default:ce});const Xh="3.0.0-alpha.0",Sr=typeof self<"u",Yh=Sr&&self.constructor.name==="DedicatedWorkerGlobalScope",ki=Sr&&"caches"in self,Zh=typeof navigator<"u"&&"gpu"in navigator,Si=typeof process<"u",Jh=Si&&process?.release?.name==="node",Er=!Mi(ce),Ei=!Mi(ce),ct=Object.freeze({IS_BROWSER_ENV:Sr,IS_WEBWORKER_ENV:Yh,IS_WEB_CACHE_AVAILABLE:ki,IS_WEBGPU_AVAILABLE:Zh,IS_PROCESS_AVAILABLE:Si,IS_NODE_ENV:Jh,IS_FS_AVAILABLE:Er,IS_PATH_AVAILABLE:Ei}),Sn=Er&&Ei,Ti=Sn?ce.dirname(ce.dirname(ce.fileURLToPath(self.location.href))):"./",ef=Sn?ce.join(Ti,"/.cache/"):null,Ii="/models/",tf=Sn?ce.join(Ti,Ii):Ii,ye={version:Xh,backends:{onnx:{},tfjs:{}},allowRemoteModels:!0,remoteHost:"https://huggingface.co/",remotePathTemplate:"{model}/resolve/{revision}/",allowLocalModels:!Sr,localModelPath:tf,useFS:Er,useBrowserCache:ki,useFSCache:Er,cacheDir:ef,useCustomCache:!1,customCache:null};function Mi(t){return Object.keys(t).length===0}const Me=class{constructor(){let t=function(...e){return t._call(...e)};return Object.setPrototypeOf(t,new.target.prototype)}_call(...t){throw Error("Must implement _call method in subclass")}};function Nt(t,e){t&&t(e)}function rf(t){return Object.fromEntries(Object.entries(t).map(([e,r])=>[r,e]))}function Ci(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function nf(t){return Number.isInteger(t)||typeof t=="bigint"}function ge(...t){return Array.prototype.concat.apply([],t)}function pt(t,e){return Object.assign({},...e.map(r=>{if(t[r]!==void 0)return{[r]:t[r]}}))}var En={};class Tr{_CONTENT_TYPE_MAP={txt:"text/plain",html:"text/html",css:"text/css",js:"text/javascript",json:"application/json",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif"};constructor(e){if(this.filePath=e,this.headers=new Headers,this.exists=ce.existsSync(e),this.exists){this.status=200,this.statusText="OK";let r=ce.statSync(e);this.headers.set("content-length",r.size.toString()),this.updateContentType();let n=this;this.body=new ReadableStream({start(s){n.arrayBuffer().then(i=>{s.enqueue(new Uint8Array(i)),s.close()})}})}else this.status=404,this.statusText="Not Found",this.body=null}updateContentType(){const e=this.filePath.toString().split(".").pop().toLowerCase();this.headers.set("content-type",this._CONTENT_TYPE_MAP[e]??"application/octet-stream")}clone(){let e=new Tr(this.filePath);return e.exists=this.exists,e.status=this.status,e.statusText=this.statusText,e.headers=new Headers(this.headers),e}async arrayBuffer(){return(await ce.promises.readFile(this.filePath)).buffer}async blob(){const e=await ce.promises.readFile(this.filePath);return new Blob([e],{type:this.headers.get("content-type")})}async text(){return await ce.promises.readFile(this.filePath,"utf8")}async json(){return JSON.parse(await this.text())}}function Tn(t,e=null){let r;try{r=new URL(t)}catch{return!1}return e&&!e.includes(r.hostname)?!1:r.protocol==="http:"||r.protocol==="https:"}async function zi(t){if(ye.useFS&&!Tn(t))return new Tr(t);if(typeof process<"u"&&process?.release?.name==="node"){const e=!!En?.TESTING_REMOTELY,r=ye.version,n=new Headers;if(n.set("User-Agent",`transformers.js/${r}; is_ci/${e};`),Tn(t,["huggingface.co","hf.co"])){const i=En?.HF_TOKEN??En?.HF_ACCESS_TOKEN;i&&n.set("Authorization",`Bearer ${i}`)}return fetch(t,{headers:n})}else return fetch(t)}const sf={400:"Bad request error occurred while trying to load file",401:"Unauthorized access to file",403:"Forbidden access to file",404:"Could not locate file",408:"Request timeout error occurred while trying to load file",500:"Internal server error error occurred while trying to load file",502:"Bad gateway error occurred while trying to load file",503:"Service unavailable error occurred while trying to load file",504:"Gateway timeout error occurred while trying to load file"};function af(t,e,r){if(!r)return null;const n=sf[t]??`Error (${t}) occurred while trying to load file`;throw Error(`${n}: "${e}".`)}class Ai{constructor(e){this.path=e}async match(e){let r=ce.join(this.path,e),n=new Tr(r);if(n.exists)return n}async put(e,r){const n=Buffer.from(await r.arrayBuffer());let s=ce.join(this.path,e);try{await ce.promises.mkdir(ce.dirname(s),{recursive:!0}),await ce.promises.writeFile(s,n)}catch(i){console.warn("An error occurred while writing the file to cache:",i)}}}async function of(t,...e){for(let r of e)try{let n=await t.match(r);if(n)return n}catch{continue}}async function Ir(t,e,r=!0,n={}){if(!ye.allowLocalModels&&n.local_files_only)throw Error("Invalid configuration detected: local models are disabled (`env.allowLocalModels=false`) but you have requested to only use local models (`local_files_only=true`).");Nt(n.progress_callback,{status:"initiate",name:t,file:e});let s;if(!s&&ye.useBrowserCache){if(typeof caches>"u")throw Error("Browser cache is not available in this environment.");try{s=await caches.open("transformers-cache")}catch(w){console.warn("An error occurred while opening the browser cache:",w)}}if(!s&&ye.useFSCache&&(s=new Ai(n.cache_dir??ye.cacheDir)),!s&&ye.useCustomCache)throw Error("`env.useCustomCache=true`, but `env.customCache` is not defined.");const i=n.revision??"main";let a=Mr(t,e),o=Mr(ye.localModelPath,a),l=Mr(ye.remoteHost,ye.remotePathTemplate.replaceAll("{model}",t).replaceAll("{revision}",encodeURIComponent(i)),e),u=i==="main"?a:Mr(t,i,e),d,c=s instanceof Ai?u:l,p=!1,h;s&&(h=await of(s,o,c));const f=h!==void 0;if(h===void 0){if(ye.allowLocalModels)if(Tn(a)){if(n.local_files_only)throw new Error(`\`local_files_only=true\`, but attempted to load a remote file from: ${a}.`)}else try{h=await zi(o),d=o}catch(g){console.warn(`Unable to load from local path "${o}": "${g}"`)}if(h===void 0||h.status===404){if(n.local_files_only||!ye.allowRemoteModels){if(r)throw Error(`\`local_files_only=true\` or \`env.allowRemoteModels=false\` and file was not found locally at "${o}".`);return null}if(h=await zi(l),h.status!==200)return af(h.status,l,r);d=c}p=s&&typeof Response<"u"&&h instanceof Response&&h.status===200}Nt(n.progress_callback,{status:"download",name:t,file:e});const m={status:"progress",name:t,file:e};let _;return n.progress_callback?f&&typeof navigator<"u"&&/firefox/i.test(navigator.userAgent)?(_=new Uint8Array(await h.arrayBuffer()),Nt(n.progress_callback,{...m,progress:100,loaded:_.length,total:_.length})):_=await lf(h,w=>{Nt(n.progress_callback,{...m,...w})}):_=new Uint8Array(await h.arrayBuffer()),p&&d&&await s.match(d)===void 0&&await s.put(d,new Response(_,{headers:h.headers})).catch(w=>{console.warn(`Unable to add response to browser cache: ${w}.`)}),Nt(n.progress_callback,{status:"done",name:t,file:e}),_}async function ht(t,e,r=!0,n={}){let s=await Ir(t,e,r,n);if(s===null)return{};let a=new TextDecoder("utf-8").decode(s);return JSON.parse(a)}async function lf(t,e){const r=t.headers.get("Content-Length");r===null&&console.warn("Unable to determine content-length from response headers. Will expand buffer when needed.");let n=parseInt(r??"0"),s=new Uint8Array(n),i=0;const a=t.body.getReader();async function o(){const{done:l,value:u}=await a.read();if(l)return;let d=i+u.length;if(d>n){n=d;let p=new Uint8Array(n);p.set(s),s=p}s.set(u,i),i=d;const c=i/n*100;return e({progress:c,loaded:i,total:n}),o()}return await o(),s}function Mr(...t){return t=t.map((e,r)=>(r&&(e=e.replace(new RegExp("^/"),"")),r!==t.length-1&&(e=e.replace(new RegExp("/$"),"")),e)),t.join("/")}function uf(t,e,r){const n=new Array(r.length),s=new Array(r.length);for(let o=r.length-1,l=1;o>=0;--o)s[o]=l,n[o]=e[r[o]],l*=n[o];const i=r.map((o,l)=>s[r.indexOf(l)]),a=new t.constructor(t.length);for(let o=0;o<t.length;++o){let l=0;for(let u=e.length-1,d=o;u>=0;--u)l+=d%e[u]*i[u],d=Math.floor(d/e[u]);a[l]=t[o]}return[a,n]}function Pi(t){const e=In(t)[0],r=t.map(i=>Math.exp(i-e)),n=r.reduce((i,a)=>i+a,0);return r.map(i=>i/n)}function Oi(t,e=0){return t=Array.from(t).map((r,n)=>[n,r]).sort((r,n)=>n[1]-r[1]),e!==null&&e>0&&(t=t.slice(0,e)),t}function df(t){if(t.length===0)throw Error("Array must not be empty");let e=t[0],r=0;for(let n=1;n<t.length;++n)t[n]<e&&(e=t[n],r=n);return[e,r]}function In(t){if(t.length===0)throw Error("Array must not be empty");let e=t[0],r=0;for(let n=1;n<t.length;++n)t[n]>e&&(e=t[n],r=n);return[Number(e),r]}function cf(t,e){if(e%2===0||e<=0)throw new Error("Window size must be a positive odd number");const r=new t.constructor(t.length),n=new t.constructor(e),s=Math.floor(e/2);for(let i=0;i<t.length;++i){let a=0;for(let o=-s;o<=s;++o){let l=i+o;l<0?l=Math.abs(l):l>=t.length&&(l=2*(t.length-1)-l),n[a++]=t[l]}n.sort(),r[i]=n[s]}return r}function Cr(t,e){const r=Math.pow(10,e);return Math.round(t*r)/r}/*!
 * ONNX Runtime Web v1.19.0-dev.20240521-068bb3d5ee
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Mn=Object.defineProperty,pf=Object.getOwnPropertyDescriptor,hf=Object.getOwnPropertyNames,ff=Object.prototype.hasOwnProperty,mf=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')}),z=(t,e)=>()=>(t&&(e=t(t=0)),e),zr=(t,e)=>{for(var r in e)Mn(t,r,{get:e[r],enumerable:!0})},gf=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of hf(e))!ff.call(t,s)&&s!==r&&Mn(t,s,{get:()=>e[s],enumerable:!(n=pf(e,s))||n.enumerable});return t},Cn=t=>gf(Mn({},"__esModule",{value:!0}),t),Ut,it,ft,Bi,zn,An=z(()=>{Ut=new Map,it=[],ft=(t,e,r)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let n=Ut.get(t);if(n===void 0)Ut.set(t,{backend:e,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==e)throw new Error(`cannot register backend "${t}" using priority ${r}`)}if(r>=0){let s=it.indexOf(t);s!==-1&&it.splice(s,1);for(let i=0;i<it.length;i++)if(Ut.get(it[i]).priority<=r){it.splice(i,0,t);return}it.push(t)}return}throw new TypeError("not a valid backend")},Bi=async t=>{let e=Ut.get(t);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let r=!!e.initPromise;try{return r||(e.initPromise=e.backend.init(t)),await e.initPromise,e.initialized=!0,e.backend}catch(n){return r||(e.error=`${n}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},zn=async t=>{let e=t.executionProviders||[],r=e.map(l=>typeof l=="string"?l:l.name),n=r.length===0?it:r,s,i=[],a=new Set;for(let l of n){let u=await Bi(l);typeof u=="string"?i.push({name:l,err:u}):(s||(s=u),s===u&&a.add(l))}if(!s)throw new Error(`no available backend found. ERR: ${i.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:u}of i)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${u}`);let o=e.filter(l=>a.has(typeof l=="string"?l:l.name));return[s,new Proxy(t,{get:(l,u)=>u==="executionProviders"?o:Reflect.get(l,u)})]}}),_f=z(()=>{An()}),Ri,wf=z(()=>{Ri="1.19.0-dev.20240521-068bb3d5ee"}),Pn,Oe,Di=z(()=>{wf(),Pn="warning",Oe={wasm:{},webgl:{},webgpu:{},versions:{common:Ri},set logLevel(t){if(t!==void 0){if(typeof t!="string"||["verbose","info","warning","error","fatal"].indexOf(t)===-1)throw new Error(`Unsupported logging level: ${t}`);Pn=t}},get logLevel(){return Pn}},Object.defineProperty(Oe,"logLevel",{enumerable:!0})}),ne,yf=z(()=>{Di(),ne=Oe}),Li,Fi,bf=z(()=>{Li=(t,e)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=t.dims[3],r.height=t.dims[2];let n=r.getContext("2d");if(n!=null){let s,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(s=t.dims[2],i=t.dims[3]):(s=t.dims[3],i=t.dims[2]);let a=e?.format!==void 0?e.format:"RGB",o=e?.norm,l,u;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?u=[0,0,0,0]:typeof o.bias=="number"?u=[o.bias,o.bias,o.bias,o.bias]:(u=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(u[3]=o.bias[3]));let d=i*s,c=0,p=d,h=d*2,f=-1;a==="RGBA"?(c=0,p=d,h=d*2,f=d*3):a==="RGB"?(c=0,p=d,h=d*2):a==="RBG"&&(c=0,h=d,p=d*2);for(let m=0;m<i;m++)for(let _=0;_<s;_++){let w=(t.data[c++]-u[0])*l[0],g=(t.data[p++]-u[1])*l[1],b=(t.data[h++]-u[2])*l[2],y=f===-1?255:(t.data[f++]-u[3])*l[3];n.fillStyle="rgba("+w+","+g+","+b+","+y+")",n.fillRect(_,m,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Fi=(t,e)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let s,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(s=t.dims[2],i=t.dims[1],a=t.dims[3]):(s=t.dims[3],i=t.dims[2],a=t.dims[1]);let o=e!==void 0&&e.format!==void 0?e.format:"RGB",l=e?.norm,u,d;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?d=[0,0,0,0]:typeof l.bias=="number"?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(d[3]=l.bias[3]));let c=i*s;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,h=0,f=1,m=2,_=3,w=0,g=c,b=c*2,y=-1;o==="RGBA"?(w=0,g=c,b=c*2,y=c*3):o==="RGB"?(w=0,g=c,b=c*2):o==="RBG"&&(w=0,b=c,g=c*2),n=r.createImageData(s,i);for(let v=0;v<i*s;h+=p,f+=p,m+=p,_+=p,v++)n.data[h]=(t.data[w++]-d[0])*u[0],n.data[f]=(t.data[g++]-d[1])*u[1],n.data[m]=(t.data[b++]-d[2])*u[2],n.data[_]=y===-1?255:(t.data[y++]-d[3])*u[3]}else throw new Error("Can not access image data");return n}}),Ar,Ni,Ui,qi,Vi,vf=z(()=>{Bn(),Ar=(t,e)=>{if(t===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=e,s=e.norm??{mean:255,bias:0},i,a;typeof s.mean=="number"?i=[s.mean,s.mean,s.mean,s.mean]:i=[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],typeof s.bias=="number"?a=[s.bias,s.bias,s.bias,s.bias]:a=[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];let o=e.format!==void 0?e.format:"RGBA",l=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",u=r*n,d=l==="RGBA"?new Float32Array(u*4):new Float32Array(u*3),c=4,p=0,h=1,f=2,m=3,_=0,w=u,g=u*2,b=-1;o==="RGB"&&(c=3,p=0,h=1,f=2,m=-1),l==="RGBA"?b=u*3:l==="RBG"?(_=0,g=u,w=u*2):l==="BGR"&&(g=0,w=u,_=u*2);for(let y=0;y<u;y++,p+=c,f+=c,h+=c,m+=c)d[_++]=(t[p]+a[0])/i[0],d[w++]=(t[h]+a[1])/i[1],d[g++]=(t[f]+a[2])/i[2],b!==-1&&m!==-1&&(d[b++]=(t[m]+a[3])/i[3]);return l==="RGBA"?new Fe("float32",d,[1,4,r,n]):new Fe("float32",d,[1,3,r,n])},Ni=async(t,e)=>{let r=typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,n=typeof ImageData<"u"&&t instanceof ImageData,s=typeof ImageBitmap<"u"&&t instanceof ImageBitmap,i=typeof t=="string",a,o=e??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},u=d=>d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){let d=l();d.width=t.width,d.height=t.height;let c=u(d);if(c!=null){let p=t.height,h=t.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(p=e.resizedHeight,h=e.resizedWidth),e!==void 0){if(o=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=p,o.width=h}else o.tensorFormat="RGBA",o.height=p,o.width=h;c.drawImage(t,0,0),a=c.getImageData(0,0,h,p).data}else throw new Error("Can not access image data")}else if(n){let d,c;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(d=e.resizedHeight,c=e.resizedWidth):(d=t.height,c=t.width),e!==void 0&&(o=e),o.format="RGBA",o.height=d,o.width=c,e!==void 0){let p=l();p.width=c,p.height=d;let h=u(p);if(h!=null)h.putImageData(t,0,0),a=h.getImageData(0,0,c,d).data;else throw new Error("Can not access image data")}else a=t.data}else if(s){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=l();d.width=t.width,d.height=t.height;let c=u(d);if(c!=null){let p=t.height,h=t.width;return c.drawImage(t,0,0,h,p),a=c.getImageData(0,0,h,p).data,o.height=p,o.width=h,Ar(a,o)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,c)=>{let p=l(),h=u(p);if(!t||!h)return c();let f=new Image;f.crossOrigin="Anonymous",f.src=t,f.onload=()=>{p.width=f.width,p.height=f.height,h.drawImage(f,0,0,p.width,p.height);let m=h.getImageData(0,0,p.width,p.height);o.height=p.height,o.width=p.width,d(Ar(m.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Ar(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Ui=(t,e)=>{let{width:r,height:n,download:s,dispose:i}=e,a=[1,n,r,4];return new Fe({location:"texture",type:"float32",texture:t,dims:a,download:s,dispose:i})},qi=(t,e)=>{let{dataType:r,dims:n,download:s,dispose:i}=e;return new Fe({location:"gpu-buffer",type:r??"float32",gpuBuffer:t,dims:n,download:s,dispose:i})},Vi=(t,e,r)=>new Fe({location:"cpu-pinned",type:t,data:e,dims:r??[e.length]})}),mt,qt,On,Gi,$f=z(()=>{mt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),qt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),On=!1,Gi=()=>{if(!On){On=!0;let t=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;t&&(mt.set("int64",BigInt64Array),qt.set(BigInt64Array,"int64")),e&&(mt.set("uint64",BigUint64Array),qt.set(BigUint64Array,"uint64")),r?(mt.set("float16",Float16Array),qt.set(Float16Array,"float16")):mt.set("float16",Uint16Array)}}}),ji,Wi,xf=z(()=>{Bn(),ji=t=>{let e=1;for(let r=0;r<t.length;r++){let n=t[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);e*=n}return e},Wi=(t,e)=>{switch(t.location){case"cpu":return new Fe(t.type,t.data,e);case"cpu-pinned":return new Fe({location:"cpu-pinned",data:t.data,type:t.type,dims:e});case"texture":return new Fe({location:"texture",texture:t.texture,type:t.type,dims:e});case"gpu-buffer":return new Fe({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${t.location} is not supported`)}}}),Fe,Bn=z(()=>{bf(),vf(),$f(),xf(),Fe=class{constructor(t,e,r){Gi();let n,s;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,n=t.type,s=t.dims,t.location){case"cpu-pinned":{let a=mt.get(n);if(!a)throw new TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(t.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=t.data;break}case"texture":{if(n!=="float32")throw new TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint8"&&n!=="bool")throw new TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,o;if(typeof t=="string")if(n=t,o=r,t==="string"){if(!Array.isArray(e))throw new TypeError("A string tensor's data must be a string array.");a=e}else{let l=mt.get(t);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(e)){if(t==="float16"&&l===Uint16Array)throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");t==="uint64"||t==="int64"?a=l.from(e,BigInt):a=l.from(e)}else if(e instanceof l)a=e;else throw new TypeError(`A ${n} tensor's data must be type of ${l}`)}else if(o=e,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof t[0];if(l==="string")n="string",a=t;else if(l==="boolean")n="bool",a=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else{let l=qt.get(t.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);n=l,a=t}if(o===void 0)o=[a.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");s=o,this.cpuData=a,this.dataLocation="cpu"}let i=ji(s);if(this.cpuData&&i!==this.cpuData.length)throw new Error(`Tensor's size(${i}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=s,this.size=i}static async fromImage(t,e){return Ni(t,e)}static fromTexture(t,e){return Ui(t,e)}static fromGpuBuffer(t,e){return qi(t,e)}static fromPinnedBuffer(t,e,r){return Vi(t,e,r)}toDataURL(t){return Li(this,t)}toImageData(t){return Fi(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let e=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=e,t&&this.disposer&&(this.disposer(),this.disposer=void 0),e}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Wi(this,t)}}}),$e,Rn=z(()=>{Bn(),$e=Fe}),Vt,Dn,Ne,Be,Hi=z(()=>{Di(),Vt=(t,e)=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||console.timeStamp(`${t}::ORT::${e}`)},Dn=(t,e)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let s=0;s<r.length;s++){if(n&&!r[s].includes("TRACE_FUNC")){let i=`FUNC_${t}::${r[s].trim().split(" ")[1]}`;e&&(i+=`::${e}`),Vt("CPU",i);return}r[s].includes("TRACE_FUNC")&&(n=!0)}},Ne=t=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||Dn("BEGIN",t)},Be=t=>{(typeof Oe.trace>"u"?!Oe.wasm.trace:!Oe.trace)||Dn("END",t)}}),Ki,kf=z(()=>{An(),Rn(),Hi(),Ki=class Wh{constructor(e){this.handler=e}async run(e,r,n){Ne();let s={},i={};if(typeof e!="object"||e===null||e instanceof $e||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof $e)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let u of r){if(typeof u!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(u)===-1)throw new RangeError(`'fetches' contains invalid output name: ${u}.`);s[u]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let u=!1,d=Object.getOwnPropertyNames(r);for(let c of this.outputNames)if(d.indexOf(c)!==-1){let p=r[c];(p===null||p instanceof $e)&&(u=!0,a=!1,s[c]=p)}if(u){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let u of this.inputNames)if(typeof e[u]>"u")throw new Error(`input '${u}' is missing in 'feeds'.`);if(a)for(let u of this.outputNames)s[u]=null;let o=await this.handler.run(e,s,i),l={};for(let u in o)if(Object.hasOwnProperty.call(o,u)){let d=o[u];d instanceof $e?l[u]=d:l[u]=new $e(d.type,d.data,d.dims)}return Be(),l}async release(){return this.handler.dispose()}static async create(e,r,n,s){Ne();let i,a={};if(typeof e=="string"){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let d=e,c=0,p=e.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(c=r,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(p=e.byteLength-c,typeof n=="number"){if(p=n,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-c}].`);if(typeof s=="object"&&s!==null)a=s;else if(typeof s<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(d,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,l]=await zn(a),u=await o.createInferenceSessionHandler(i,l);return Be(),new Wh(u)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}}),Ln,Sf=z(()=>{kf(),Ln=Ki}),Ef=z(()=>{}),Tf=z(()=>{}),If=z(()=>{}),Mf=z(()=>{}),Qi,Xi,Cf=z(()=>{An(),Rn(),Qi="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Xi=class Hh{constructor(e,r,n){this.handler=e,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(e,r){let n=e.evalModel||"",s=e.optimizerModel||"",i=r||{},[a,o]=await zn(i);if(a.createTrainingSessionHandler){let l=await a.createTrainingSessionHandler(e.checkpointState,e.trainModel,n,s,o);return new Hh(l,!!e.optimizerModel,!!e.evalModel)}else throw new Error(Qi)}typeNarrowingForRunStep(e,r,n,s,i){let a={},o={};if(typeof n!="object"||n===null||n instanceof $e||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let l=!0;if(typeof s=="object"){if(s===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(s instanceof $e)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(s)){if(s.length===0)throw new TypeError("'fetches' cannot be an empty array.");l=!1;for(let u of s){if(typeof u!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(u)===-1)throw new RangeError(`'fetches' contains invalid output name: ${u}.`);a[u]=null}if(typeof i=="object"&&i!==null)o=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let u=!1,d=Object.getOwnPropertyNames(s);for(let c of r)if(d.indexOf(c)!==-1){let p=s[c];(p===null||p instanceof $e)&&(u=!0,l=!1,a[c]=p)}if(u){if(typeof i=="object"&&i!==null)o=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else o=s}}else if(typeof s<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let u of e)if(typeof n[u]>"u")throw new Error(`input '${u}' is missing in 'feeds'.`);if(l)for(let u of r)a[u]=null;return[a,o]}convertHandlerReturnTypeToMapOfTensors(e){let r={};for(let n in e)if(Object.hasOwnProperty.call(e,n)){let s=e[n];s instanceof $e?r[n]=s:r[n]=new $e(s.type,s.data,s.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(e,r,n){let[s,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,e,r,n),a=await this.handler.runTrainStep(e,s,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}async runOptimizerStep(e){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(e||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(e,r,n){if(this.hasEvalModel){let[s,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,e,r,n),a=await this.handler.runEvalStep(e,s,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(e=!0){return this.handler.getParametersSize(e)}async loadParametersBuffer(e,r=!0){let n=await this.getParametersSize(r);if(e.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(e,r)}async getContiguousParameters(e=!0){return this.handler.getContiguousParameters(e)}async release(){return this.handler.dispose()}}}),Fn,zf=z(()=>{Cf(),Fn=Xi}),Yi={};zr(Yi,{InferenceSession:()=>Ln,TRACE:()=>Vt,TRACE_FUNC_BEGIN:()=>Ne,TRACE_FUNC_END:()=>Be,Tensor:()=>$e,TrainingSession:()=>Fn,env:()=>ne,registerBackend:()=>ft});var Ue=z(()=>{_f(),yf(),Sf(),Rn(),Ef(),Tf(),Hi(),If(),Mf(),zf()}),Nn=z(()=>{}),Zi={};zr(Zi,{default:()=>Ji});var Un,qn,Ji,Af=z(()=>{Uc(),Mt(),Pr(),Un="ort-wasm-proxy-worker",qn=globalThis.self?.name===Un,qn&&(self.onmessage=t=>{let{type:e,in:r}=t.data;try{switch(e){case"init-wasm":Kn(r.wasm).then(()=>{Qs(r).then(()=>{postMessage({type:e})},n=>{postMessage({type:e,err:n})})},n=>{postMessage({type:e,err:n})});break;case"init-ep":{let{epName:n,env:s}=r;Xs(s,n).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:n}=r,s=Jr(n);postMessage({type:e,out:s});break}case"create":{let{model:n,options:s}=r;Ys(n,s).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":Zs(r),postMessage({type:e});break;case"run":{let{sessionId:n,inputIndices:s,inputs:i,outputIndices:a,options:o}=r;ei(n,s,i,a,new Array(a.length).fill(null),o).then(l=>{l.some(u=>u[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:l},ri([...i,...l]))},l=>{postMessage({type:e,err:l})});break}case"end-profiling":ti(r),postMessage({type:e});break;default:}}catch(n){postMessage({type:e,err:n})}}),Ji=qn?null:t=>new Worker(t??qe,{type:"module",name:Un})}),qe,ea,Vn,ta,ra,Gn,na,jn,sa,ia,Pr=z(()=>{Nn(),qe=self.location.href??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),ea=typeof location>"u"?void 0:location.origin,Vn=(t,e)=>{try{let r=e??qe;return(r?new URL(t,r):new URL(t)).origin===ea}catch{return!1}},ta=(t,e)=>{let r=e??qe;try{return(r?new URL(t,r):new URL(t)).href}catch{return}},ra=(t,e)=>`${e??"./"}${t}`,Gn=async t=>{let e=await(await fetch(t,{credentials:"same-origin"})).blob();return URL.createObjectURL(e)},na=async t=>(await import(t)).default,jn=(Af(),Cn(Zi)).default,sa=async()=>{if(!qe)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Vn(qe))return[void 0,jn()];let t=await Gn(qe);return[t,jn(t)]},ia=async(t,e,r)=>{let n="ort-wasm-simd-threaded.jsep.mjs",s=t??ta(n,e),i=r&&s&&!Vn(s,e),a=i?await Gn(s):s??ra(n,e);return[i?a:void 0,await na(a)]}}),Wn,Or,Gt,Hn,aa,oa,Kn,pe,Mt=z(()=>{Pr(),Or=!1,Gt=!1,Hn=!1,aa=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},oa=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Kn=async t=>{if(Or)return Promise.resolve();if(Gt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Hn)throw new Error("previous call to 'initializeWebAssembly()' failed.");Gt=!0;let e=t.initTimeout,r=t.numThreads;if(!oa())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=aa();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),t.numThreads=r=1);let s=t.wasmPaths,i=typeof s=="string"?s:void 0,a=s?.mjs,o=a?.href??a,l=s?.wasm,u=l?.href??l,[d,c]=await ia(o,i,r>1),p=!1,h=[];if(e>0&&h.push(new Promise(f=>{setTimeout(()=>{p=!0,f()},e)})),h.push(new Promise((f,m)=>{c({numThreads:r,locateFile:(_,w)=>u??(i??w)+_}).then(_=>{Gt=!1,Or=!0,Wn=_,f(),d&&URL.revokeObjectURL(d)},_=>{Gt=!1,Hn=!0,m(_)})})),await Promise.race(h),p)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},pe=()=>{if(Or&&Wn)return Wn;throw new Error("WebAssembly is not initialized yet.")}}),le,Br,ie,Qn=z(()=>{Mt(),le=(t,e)=>{let r=pe(),n=r.lengthBytesUTF8(t)+1,s=r._malloc(n);return r.stringToUTF8(t,s,n),e.push(s),s},Br=(t,e,r,n)=>{if(typeof t=="object"&&t!==null){if(r.has(t))throw new Error("Circular reference in options");r.add(t)}Object.entries(t).forEach(([s,i])=>{let a=e?e+s:s;if(typeof i=="object")Br(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},ie=t=>{let e=pe(),r=e.stackSave();try{let n=e.stackAlloc(8);e._OrtGetLastError(n,n+4);let s=e.HEAP32[n/4],i=e.HEAPU32[n/4+1],a=i?e.UTF8ToString(i):"";throw new Error(`${t} ERROR_CODE: ${s}, ERROR_MESSAGE: ${a}`)}finally{e.stackRestore(r)}}}),la,Pf=z(()=>{Mt(),Qn(),la=t=>{let e=pe(),r=0,n=[],s=t||{};try{if(t?.logSeverityLevel===void 0)s.logSeverityLevel=2;else if(typeof t.logSeverityLevel!="number"||!Number.isInteger(t.logSeverityLevel)||t.logSeverityLevel<0||t.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${t.logSeverityLevel}`);if(t?.logVerbosityLevel===void 0)s.logVerbosityLevel=0;else if(typeof t.logVerbosityLevel!="number"||!Number.isInteger(t.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${t.logVerbosityLevel}`);t?.terminate===void 0&&(s.terminate=!1);let i=0;return t?.tag!==void 0&&(i=le(t.tag,n)),r=e._OrtCreateRunOptions(s.logSeverityLevel,s.logVerbosityLevel,!!s.terminate,i),r===0&&ie("Can't create run options."),t?.extra!==void 0&&Br(t.extra,"",new WeakSet,(a,o)=>{let l=le(a,n),u=le(o,n);e._OrtAddRunConfigEntry(r,l,u)!==0&&ie(`Can't set a run config entry: ${a} - ${o}.`)}),[r,n]}catch(i){throw r!==0&&e._OrtReleaseRunOptions(r),n.forEach(a=>e._free(a)),i}}}),ua,da,ca,pa,ha,Of=z(()=>{Mt(),Qn(),ua=t=>{switch(t){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${t}`)}},da=t=>{switch(t){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${t}`)}},ca=t=>{t.extra||(t.extra={}),t.extra.session||(t.extra.session={});let e=t.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),t.executionProviders&&t.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(t.enableMemPattern=!1)},pa=(t,e,r)=>{for(let n of e){let s=typeof n=="string"?n:n.name;switch(s){case"webnn":if(s="WEBNN",typeof n!="string"){let a=n;if(a?.deviceType){let o=le("deviceType",r),l=le(a.deviceType,r);pe()._OrtAddSessionConfigEntry(t,o,l)!==0&&ie(`Can't set a session config entry: 'deviceType' - ${a.deviceType}.`)}if(a?.numThreads){let o=a.numThreads;(typeof o!="number"||!Number.isInteger(o)||o<0)&&(o=0);let l=le("numThreads",r),u=le(o.toString(),r);pe()._OrtAddSessionConfigEntry(t,l,u)!==0&&ie(`Can't set a session config entry: 'numThreads' - ${a.numThreads}.`)}if(a?.powerPreference){let o=le("powerPreference",r),l=le(a.powerPreference,r);pe()._OrtAddSessionConfigEntry(t,o,l)!==0&&ie(`Can't set a session config entry: 'powerPreference' - ${a.powerPreference}.`)}}break;case"webgpu":if(s="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let o=le("preferredLayout",r),l=le(a.preferredLayout,r);pe()._OrtAddSessionConfigEntry(t,o,l)!==0&&ie(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${s}`)}let i=le(s,r);pe()._OrtAppendExecutionProvider(t,i)!==0&&ie(`Can't append execution provider: ${s}.`)}},ha=t=>{let e=pe(),r=0,n=[],s=t||{};ca(s);try{let i=ua(s.graphOptimizationLevel??"all"),a=da(s.executionMode??"sequential"),o=typeof s.logId=="string"?le(s.logId,n):0,l=s.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let u=s.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log verbosity level is not valid: ${u}`);let d=typeof s.optimizedModelFilePath=="string"?le(s.optimizedModelFilePath,n):0;if(r=e._OrtCreateSessionOptions(i,!!s.enableCpuMemArena,!!s.enableMemPattern,a,!!s.enableProfiling,0,o,l,u,d),r===0&&ie("Can't create session options."),s.executionProviders&&pa(r,s.executionProviders,n),s.enableGraphCapture!==void 0){if(typeof s.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${s.enableGraphCapture}`);let c=le("enableGraphCapture",n),p=le(s.enableGraphCapture.toString(),n);e._OrtAddSessionConfigEntry(r,c,p)!==0&&ie(`Can't set a session config entry: 'enableGraphCapture' - ${s.enableGraphCapture}.`)}if(s.freeDimensionOverrides)for(let[c,p]of Object.entries(s.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let h=le(c,n);e._OrtAddFreeDimensionOverride(r,h,p)!==0&&ie(`Can't set a free dimension override: ${c} - ${p}.`)}return s.extra!==void 0&&Br(s.extra,"",new WeakSet,(c,p)=>{let h=le(c,n),f=le(p,n);e._OrtAddSessionConfigEntry(r,h,f)!==0&&ie(`Can't set a session config entry: ${c} - ${p}.`)}),[r,n]}catch(i){throw r!==0&&e._OrtReleaseSessionOptions(r),n.forEach(a=>e._free(a)),i}}}),Xn,gt,jt,Yn,Rr,Zn,Jn,q=z(()=>{Xn=t=>{switch(t){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;default:throw new Error(`unsupported data type: ${t}`)}},gt=t=>{switch(t){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";default:throw new Error(`unsupported data type: ${t}`)}},jt=t=>[void 0,4,1,1,2,2,4,8,void 0,1,2,8,4,8,void 0,void 0,void 0][t],Yn=t=>{switch(t){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${t}`)}},Rr=t=>{switch(t){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${t}`)}},Zn=t=>t==="float32"||t==="float16"||t==="int32"||t==="int64"||t==="uint32"||t==="uint8"||t==="bool",Jn=t=>{switch(t){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;default:throw new Error(`unsupported data location: ${t}`)}}}),es,fa=z(()=>{Nn(),es=async t=>{if(typeof t=="string"){let e=await fetch(t);if(!e.ok)throw new Error(`failed to load external data file: ${t}`);let r=e.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${t}, no response body.`);let s=e.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(o){if(o instanceof RangeError){let l=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw o}let a=0;for(;;){let{done:o,value:l}=await s.read();if(o)break;let u=l.byteLength;new Uint8Array(i,a,u).set(l),a+=u}return new Uint8Array(i,0,n)}}else return t instanceof Blob?new Uint8Array(await t.arrayBuffer()):t instanceof Uint8Array?t:new Uint8Array(t)}}),ma,ga,_a,wa,ya,ba,ue,_t=z(()=>{q(),ma=["V","I","W","E","F"],ga=(t,e)=>{console.log(`[${ma[t]},${new Date().toISOString()}]${e}`)},ya=(t,e)=>{_a=t,wa=e},ba=(t,e)=>{let r=Rr(t),n=Rr(_a);r>=n&&ga(r,typeof e=="function"?e():e)},ue=(...t)=>{wa&&ba(...t)}}),va,Bf=z(()=>{q(),va=(t,e)=>new(Yn(e))(t)}),ts=z(()=>{}),rs,Dr,Lr,$a,xa,ns,ss,ka,Sa,Rf=z(()=>{_t(),ts(),rs=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Dr=[],Lr=t=>Math.ceil(t/16)*16,$a=t=>{for(let e=0;e<Dr.length;e++){let r=Dr[e];if(t<=r)return r}return Math.ceil(t/16)*16},xa=1,ns=()=>xa++,ss=async(t,e,r,n)=>{let s=Lr(r),i=t.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=t.getCommandEncoder();t.endComputePass(),a.copyBufferToBuffer(e,0,i,0,s),t.flush(),await i.mapAsync(GPUMapMode.READ);let o=i.getMappedRange();if(n){let l=n();return l.set(new Uint8Array(o,0,r)),l}else return new Uint8Array(o.slice(0,r))}finally{i.destroy()}},ka=class{constructor(t){this.backend=t,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersForUploadingPending=[],this.buffersPending=[],this.externalBuffers=new Map,this.capturedPendingBuffers=new Map;for(let[e]of rs)Dr.push(e),this.freeBuffers.set(e,[]),this.freeUniformBuffers.set(e,[])}upload(t,e){let r=e.buffer,n=e.byteOffset,s=e.byteLength,i=Lr(s),a=this.storageCache.get(t);if(!a)throw new Error("gpu data for uploading does not exist");if(a.originalSize!==s)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${s}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:i,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=o.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,n,s)),o.unmap();let u=this.backend.getCommandEncoder();this.backend.endComputePass(),u.copyBufferToBuffer(o,0,a.gpuData.buffer,0,i),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`),this.buffersForUploadingPending.push(o)}memcpy(t,e){let r=this.storageCache.get(t);if(!r)throw new Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(e);if(!n)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw new Error("inconsistent source and destination gpu data size");let s=Lr(r.originalSize),i=this.backend.getCommandEncoder();this.backend.endComputePass(),i.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,s)}registerExternalBuffer(t,e,r){let n;if(r){if(n=this.externalBuffers.get(r),n===void 0)throw new Error("previous buffer is not registered");if(t===r)return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${e}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`);this.externalBuffers.delete(r)}else n=ns();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:t},originalSize:e}),this.externalBuffers.set(t,n),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${e}) => id=${n}, registered.`),n}unregisterExternalBuffer(t){let e=this.externalBuffers.get(t);e!==void 0&&(this.storageCache.delete(e),this.externalBuffers.delete(t),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(t,e=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=$a(t),n,s=(e&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,i=(e&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(s||i){let o=(s?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?n=o.pop():n=this.backend.device.createBuffer({size:r,usage:e}):n=this.backend.device.createBuffer({size:r,usage:e})}else n=this.backend.device.createBuffer({size:r,usage:e});let a={id:ns(),type:0,buffer:n};return this.storageCache.set(a.id,{gpuData:a,originalSize:t}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${a.id}`),a}get(t){return this.storageCache.get(t)?.gpuData}release(t){let e=this.storageCache.get(t);if(!e)throw new Error("releasing data does not exist");return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${e.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(e.gpuData.buffer),e.originalSize}async download(t,e){let r=this.storageCache.get(t);if(!r)throw new Error("data does not exist");await ss(this.backend,r.gpuData.buffer,r.originalSize,e)}refreshPendingBuffers(){for(let t of this.buffersForUploadingPending)t.destroy();if(this.buffersForUploadingPending=[],this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let e=rs.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];e===void 0||r.length>=e?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];e===void 0||r.length>=e?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let e of this.buffersPending)t.push(e);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(e=>{e.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(e=>{e.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(e=>{e.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onReleaseSession(t){let e=this.capturedPendingBuffers.get(t);e&&(e.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(t))}},Sa=(...t)=>new ka(...t)}),Ea,se,me=z(()=>{Ea=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},se=t=>new Ea(t)}),Ta,Ct,M,Fr,Ia,is,as,Z=z(()=>{Ta=class{static calcMatMulShape(t,e){return t[1]!==e[0]?void 0:[t[0],e[1]]}},Ct=class{static calcShape(t,e,r=!1){let n=t.length,s=e.length;if(n===0)return e;if(s===0)return t;let i=Math.max(t.length,e.length),a=new Array(i);if(r){if(n<2||s<2)return;let o=Ta.calcMatMulShape([t[n-2],t[n-1]],[e[s-2],e[s-1]]);if(o===void 0)return;[a[i-2],a[i-1]]=o}for(let o=r?3:1;o<=i;o++){let l=n-o<0?1:t[n-o],u=s-o<0?1:e[s-o];if(l!==u&&l>1&&u>1)return;let d=Math.max(l,u);if(l&&u)a[i-o]=Math.max(l,u);else{if(d>1)return;a[i-o]=0}}return a}static isValidBroadcast(t,e){let r=t.length,n=e.length;if(r>n)return!1;for(let s=1;s<=r;s++)if(t[r-s]!==1&&t[r-s]!==e[n-s])return!1;return!0}},M=class kn{static size(e){return kn.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,r=4){let n=e.length;if(n===0)return[];let s=new Array(n),i=n-1;for(;i>=0;){if(e[i]%r===0){s[i]=e[i]/r;break}if(r%e[i]!==0)throw new Error("cannot convert shape");s[i]=1,r/=e[i],i--}for(i--;i>=0;i--)s[i]=e[i];return s}static sizeFromDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return kn.getSizeFromDimensionRange(e,r,e.length)}static sizeToDimension(e,r){if(r<0||r>e.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${e.length} dimensions.`);return kn.getSizeFromDimensionRange(e,0,r)}static getSizeFromDimensionRange(e,r,n){let s=1;for(let i=r;i<n;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");s*=e[i]}return s}static computeStrides(e){let r=e.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=e[r-1];for(let s=r-3;s>=0;--s)n[s]=n[s+1]*e[s+1];return n}static normalizeAxis(e,r){if(e<-r&&e>=r)throw new Error("unsupported axis for this operation.");return e<0?e+r:e}static normalizeAxes(e,r){return e.map(n=>this.normalizeAxis(n,r??e.length))}static sortBasedOnPerm(e,r){return r?r.map(n=>e[n]):e.slice().reverse()}static padShape(e,r){let n=e.length;return e.map((s,i)=>s+r[i]+r[i+n])}static areEqual(e,r){return e.length!==r.length?!1:e.every((n,s)=>n===r[s])}},Fr=class kr{static adjustPoolAttributes(e,r,n,s,i,a){if(!e&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let o=0;o<r.length-2;o++)o>=n.length?n.push(r[o+2]):n[o]=r[o+2];for(let o=0;o<n.length;o++)if(o<s.length){if(s[o]<0)throw new Error("strides should be greater than or equal to 1")}else s.push(1);for(let o=0;o<n.length;o++)if(o<i.length){if(i[o]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let o=0;o<n.length*2;o++)if(o<a.length){if(a[o]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let o=0;o<n.length;o++){if(n[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[o]>=n[o]||a[o+n.length]>=n[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,r,n,s,i,a,o){if(o){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(s.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<e.length-2;l++)kr.adjustPadAndReturnShape(e[l+(a?1:2)],r[l],n[l],s[l],i,l,l+e.length-2,o)}}static computePoolOutputShape(e,r,n,s,i,a,o){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return kr.computeShapeHelper(e,r,l,n,s,i,a,o),l}static computeConvOutputShape(e,r,n,s,i,a,o){if(e.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[e[0],r[0]];return kr.computeShapeHelper(!1,e,l,n,s,i,a,o),l}static computeShapeHelper(e,r,n,s,i,a,o,l){if(e)for(let u=0;u<r.length-2;u++)n.push(1);else for(let u=0;u<r.length-2;u++)n.push(kr.adjustPadAndReturnShape(r[u+2],s[u],i[u],a[u],o,u,u+r.length-2,l))}static adjustPadAndReturnShape(e,r,n,s,i,a,o,l){let u=n*(s-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return i[a]=0,i[o]=0,Math.floor((e-u)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((e+r-1)/r-1)*r+s-e;return i[a]=Math.floor(l==="SAME_LOWER"?(d+1)/2:d/2),i[o]=d-i[a],Math.floor((e+d-s)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[a]+i[o]-u)/r+1)}},Ia=class{static getShapeOfGemmResult(t,e,r,n,s){if(t.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let i,a,o;e?(i=t[1],a=t[0]):(i=t[0],a=t[1]);let l=-1;if(n?(o=r[0],l=1):(o=r[1],l=0),r[l]!==a)throw new Error("dimension mismatch");if(i<=0||o<=0||a<=0)throw new Error("invalid shape specified");if(s&&!Ct.isValidBroadcast(s,[i,o]))throw new Error("gemm: invalid bias shape for broadcast");return[i,o,a]}},is=-34028234663852886e22,as=34028234663852886e22}),zt,Nr,_e,Te,D,he,wt,At,at,G,Ur,C,F,os,Ma,Ca,Wt,K=z(()=>{q(),Z(),zt=64,Nr=(t,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(t){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];default:throw new Error(`Unknown data type: ${t}`)}},_e=(t,e=1)=>{let r=Nr(t,e);return typeof r=="string"?r:r[0]},Te=(t,e=1)=>{let r=Nr(t,e);return typeof r=="string"?r:r[1]},D=(...t)=>{let e=[];return t.forEach(r=>{r.length!==0&&e.push({type:12,data:r},{type:12,data:M.computeStrides(r)})}),e},he=t=>t%4===0?4:t%2===0?2:1,wt=(t="f32",e,r="0")=>!e||e===1?`${t}(${r})`:`vec${e}<${t}>(${r})`,At=(t,e,r)=>t==="f32"?r:e===1?`f32(${r})`:`vec${e}<f32>(${r})`,at=(t,e)=>e===4?`(${t}.x + ${t}.y + ${t}.z + ${t}.w)`:e===2?`(${t}.x + ${t}.y)`:e===3?`(${t}.x + ${t}.y + ${t}.z)`:t,G=(t,e,r,n)=>t.startsWith("uniforms.")&&r>4?typeof e=="string"?n==="f16"?`${t}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${t}[(${e}) / 4][(${e}) % 4]`:n==="f16"?`${t}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${t}[${Math.floor(e/4)}][${e%4}]`:r>1?`${t}[${e}]`:t,Ur=(t,e,r,n,s)=>{let i=typeof r=="number",a=i?r:r.length,o=[...new Array(a).keys()],l=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,u=Nr(e,s),d=typeof u=="string"?u:u[1],c=typeof u=="string"?u:u[0],p={indices:l,value:d,storage:c,tensor:e},h=E=>typeof E=="string"?E:`${E}u`,f={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},m=i?"uniforms.":"",_=`${m}${t}_shape`,w=`${m}${t}_strides`,g="";for(let E=0;E<a-1;E++)g+=`
    let dim${E} = current / ${G(w,E,a)};
    let rest${E} = current % ${G(w,E,a)};
    indices[${E}] = dim${E};
    current = rest${E};
    `;g+=`indices[${a-1}] = current;`;let b=a<2?"":`
  fn o2i_${t}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,y=E=>(f.offsetToIndices=!0,a<2?E:`o2i_${t}(${E})`),v=[];if(a>=2)for(let E=a-1;E>=0;E--)v.push(`${G(w,E,a)} * (indices[${E}])`);let S=a<2?"":`
  fn i2o_${t}(indices: ${p.indices}) -> u32 {
    return ${v.join("+")};
  }`,k=E=>(f.indicesToOffset=!0,a<2?E:`i2o_${t}(${E})`),I=(...E)=>a===0?"0u":`${p.indices}(${E.map(h).join(",")})`,B=(E,R)=>a<2?`${E}`:`${G(E,R,a)}`,P=(E,R,Y)=>a<2?`${E}=${Y};`:`${G(E,R,a)}=${Y};`,U={},H=(E,R)=>{f.broadcastedIndicesToOffset=!0;let Y=`${R.name}broadcastedIndicesTo${t}Offset`;if(Y in U)return`${Y}(${E})`;let fe=[];for(let we=a-1;we>=0;we--){let st=R.indicesGet("outputIndices",we+R.rank-a);fe.push(`${B(w,we)} * (${st} % ${B(_,we)})`)}return U[Y]=`fn ${Y}(outputIndices: ${R.type.indices}) -> u32 {
             return ${fe.length>0?fe.join("+"):"0u"};
           }`,`${Y}(${E})`},j=(E,R)=>(()=>{if(p.storage===p.value)return`${t}[${E}]=${R};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${t}[${E}]=vec2<u32>(u32(${R}), select(0u, 0xFFFFFFFFu, ${R} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${t}[${E}]=vec2<u32>(u32(${R}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${t}[${E}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${R}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),N=E=>(()=>{if(p.storage===p.value)return`${t}[${E}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${t}[${E}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${t}[${E}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${t}[${E}] & 0xFFu), bool(${t}[${E}] & 0xFF00u), bool(${t}[${E}] & 0xFF0000u), bool(${t}[${E}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),x=a<2?"":`
  fn get_${t}ByIndices(indices: ${p.indices}) -> ${d} {
    return ${N(`i2o_${t}(indices)`)};
  }`,T=a<2?"":(()=>{let E=o.map(Y=>`d${Y}: u32`).join(", "),R=o.map(Y=>`d${Y}`).join(", ");return`
  fn get_${t}(${E}) -> ${d} {
    return get_${t}ByIndices(${I(R)});
  }`})(),O=(...E)=>{if(E.length!==a)throw new Error(`indices length must be ${a}`);let R=E.map(h).join(",");return a===0?N("0u"):a===1?N(R[0]):(f.get=!0,f.getByIndices=!0,f.indicesToOffset=!0,`get_${t}(${R})`)},J=E=>a<2?N(E):(f.getByIndices=!0,f.indicesToOffset=!0,`get_${t}ByIndices(${E})`),L=a<2?"":`
  fn set_${t}ByIndices(indices: ${p.indices}, value: ${d}) {
    ${j(`i2o_${t}(indices)`,"value")}
  }`,X=a<2?"":(()=>{let E=o.map(Y=>`d${Y}: u32`).join(", "),R=o.map(Y=>`d${Y}`).join(", ");return`
  fn set_${t}(${E}, value: ${d}) {
    set_${t}ByIndices(${I(R)}, value);
  }`})();return{impl:()=>{let E=[],R=!1;return f.offsetToIndices&&(E.push(b),R=!0),f.indicesToOffset&&(E.push(S),R=!0),f.broadcastedIndicesToOffset&&(Object.values(U).forEach(Y=>E.push(Y)),R=!0),f.set&&(E.push(X),R=!0),f.setByIndices&&(E.push(L),R=!0),f.get&&(E.push(T),R=!0),f.getByIndices&&(E.push(x),R=!0),!i&&R&&E.unshift(`const ${_} = ${p.indices}(${r.join(",")});`,`const ${w} = ${p.indices}(${M.computeStrides(r).join(",")});`),E.join(`
`)},type:p,offsetToIndices:y,indicesToOffset:k,broadcastedIndicesToOffset:H,indices:I,indicesGet:B,indicesSet:P,set:(...E)=>{if(E.length!==a+1)throw new Error(`indices length must be ${a}`);let R=E[a];if(typeof R!="string")throw new Error("value must be string");let Y=E.slice(0,a).map(h).join(",");return a===0?j("0u",R):a===1?j(Y[0],R):(f.set=!0,f.setByIndices=!0,f.indicesToOffset=!0,`set_${t}(${Y}, ${R})`)},setByOffset:j,setByIndices:(E,R)=>a<2?j(E,R):(f.setByIndices=!0,f.indicesToOffset=!0,`set_${t}ByIndices(${E}, ${R});`),get:O,getByOffset:N,getByIndices:J,usage:n,name:t,strides:w,shape:_,rank:a}},C=(t,e,r,n=1)=>Ur(t,e,r,"input",n),F=(t,e,r,n=1)=>Ur(t,e,r,"output",n),os=(t,e,r,n=1)=>Ur(t,e,r,"internal",n),Ma=class{constructor(t,e){this.normalizedDispatchGroup=t,this.limits=e,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=zt){let e=typeof t=="number"?t:t[0],r=typeof t=="number"?1:t[1],n=typeof t=="number"?1:t[2];if(e>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${e}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(e*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${e}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let s=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,i=s?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=s?"let global_idx = global_id.x; let local_idx = local_id.x;":`let global_idx = (workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
          workgroup_id.y * num_workgroups[0] + workgroup_id.x) * ${e*r*n}u + local_idx;`;return`@compute @workgroup_size(${e}, ${r}, ${n})
  fn main(${i}) {
    ${a}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,e){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let r=t.usage==="input"?"read":"read_write",n=t.type.storage;return`@group(0) @binding(${e}) var<storage, ${r}> ${t.name}: array<${n}>;`}declareVariables(...t){return t.map(e=>this.declareVariable(e,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(e=>this.registerInternalVariable(e)),this}registerUniform(t,e,r=1){return this.uniforms.push({name:t,type:e,length:r}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:e,type:r,length:n}of this.uniforms)if(n&&n>4)r==="f16"?t.push(`@align(16) ${e}:array<mat2x4<${r}>, ${Math.ceil(n/8)}>`):t.push(`${e}:array<vec4<${r}>, ${Math.ceil(n/4)}>`);else{let s=n==null||n===1?r:`vec${n}<${r}>`;t.push(`${e}:${s}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=e=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(e)];return this.uniforms.map(e=>[t(e.type),e.length??1])}},Ca=(t,e)=>new Ma(t,e),Wt=(t,e)=>{let r=t.length,n=[];for(let s=0;s<r;s++){let i=r-1-s,a=t[i]||1;(e[e.length-1-s]||1)>1&&a===1&&n.unshift(i)}return n}}),za,ls,Aa,Pa,Xe,Oa,Ba,Pt=z(()=>{q(),Z(),me(),K(),za=t=>{if(!t||t.length!==1)throw new Error("Transpose requires 1 input.")},ls=(t,e)=>e&&e.length!==t?[...new Array(t).keys()].reverse():e,Aa=(t,e)=>M.sortBasedOnPerm(t,ls(t.length,e)),Pa=(t,e,r,n)=>{let s=[];s.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)s.push(r.indicesSet("a",t[i],`i[${i}]`));return s.push("return a;}"),s.join(`
`)},Xe=(t,e)=>{let r=t.dataType,n=t.dims.length,s=ls(n,e),i=Aa(t.dims,s),a=F("output",r,i.length),o=C("a",r,n),l=u=>`
  ${u.registerUniform("output_size","u32").declareVariables(o,a)}

  ${Pa(s,n,o,a)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${a.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${a.setByOffset("global_idx",o.getByIndices("aIndices"))}
  }`;return{name:"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:u=>{let d=M.size(i);return{outputs:[{dims:i,dataType:u[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...D(u[0].dims,i)]}},getShaderSource:l}},Oa=(t,e)=>{za(t.inputs),t.compute(Xe(t.inputs[0],e.perm))},Ba=t=>se({perm:t.perm})}),Ra,Da,La,Fa,Na,Ua,qa,Va,Ga,ja,Ve,Wa,Ha,Ka,Qa,Xa,Ya,Za,Ja,eo,to,Df=z(()=>{q(),Z(),K(),ds(),Pt(),Ra={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Da={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},La={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Fa={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Na=(t,e)=>{let r=[];for(let n=e-t;n<e;++n)r.push(n);return r},Ua=(t,e)=>{let r=[],n=t.length;for(let i=0;i<n;i++)e.indexOf(i)===-1&&r.push(t[i]);let s=e.map(i=>t[i]);return[r,s]},qa=(t,e)=>{let r=t.length+e.length,n=[],s=0;for(let i=0;i<r;i++)e.indexOf(i)===-1?n.push(t[s++]):n.push(1);return n},Va=(t,e)=>{for(let r=0;r<t.length;++r)if(t[t.length-r-1]!==e-1-r)return!1;return!0},Ga=(t,e)=>{let r=[];if(!Va(t,e)){for(let n=0;n<e;++n)t.indexOf(n)===-1&&r.push(n);t.forEach(n=>r.push(n))}return r},ja=(t,e,r,n,s,i,a)=>{let o=r[0].dims,l=M.size(i),u=M.size(a),d=C("_A",r[0].dataType,o),c=F("output",s,i),p=32,h=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `;return{name:t,shaderCache:e,getShaderSource:f=>`
        ${f.registerUniform("reduceSize","u32").declareVariables(d,c)}
        ${h}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${f.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${La[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${Ra[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Da[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${n==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Fa[n]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:l},programUniforms:[{type:12,data:u}]})}},Ve=(t,e,r,n)=>{let s=t.inputs.length===1?r:us(t.inputs,r),i=s.axes;i.length===0&&!s.noopWithEmptyAxes&&(i=t.inputs[0].dims.map((h,f)=>f));let a=M.normalizeAxes(i,t.inputs[0].dims.length),o=a,l=t.inputs[0],u=Ga(o,t.inputs[0].dims.length);u.length>0&&(l=t.compute(Xe(t.inputs[0],u),{inputs:[0],outputs:[-1]})[0],o=Na(o.length,l.dims.length));let[d,c]=Ua(l.dims,o),p=d;s.keepDims&&(p=qa(d,a)),t.compute(ja(e,{hint:s.cacheKey,inputDependencies:["type"]},[l],n,t.inputs[0].dataType,p,c),{inputs:[l]})},Wa=(t,e)=>{Ve(t,"ReduceMeanShared",e,"mean")},Ha=(t,e)=>{Ve(t,"ReduceL1Shared",e,"l1")},Ka=(t,e)=>{Ve(t,"ReduceL2Shared",e,"l2")},Qa=(t,e)=>{Ve(t,"ReduceLogSumExpShared",e,"logSumExp")},Xa=(t,e)=>{Ve(t,"ReduceMaxShared",e,"max")},Ya=(t,e)=>{Ve(t,"ReduceMinShared",e,"min")},Za=(t,e)=>{Ve(t,"ReduceProdShared",e,"prod")},Ja=(t,e)=>{Ve(t,"ReduceSumShared",e,"sum")},eo=(t,e)=>{Ve(t,"ReduceSumSquareShared",e,"sumSquare")},to=(t,e)=>{Ve(t,"ReduceLogSumShared",e,"logSum")}}),Ge,ro,qr,us,je,no,so,io,ao,oo,lo,uo,co,po,ho,We,fo,mo,go,_o,wo,yo,bo,vo,$o,xo,ds=z(()=>{q(),Z(),me(),K(),Df(),Ge=t=>{if(!t||t.length===0||t.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(t.length===2&&t[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ro=t=>["","",`var value = ${t.getByIndices("input_indices")};`,""],qr=(t,e,r,n,s,i,a=!1,o=!1)=>{let l=[],u=r[0].dims,d=u.length,c=M.normalizeAxes(s,d),p=!o&&c.length===0;u.forEach((m,_)=>{p||c.indexOf(_)>=0?a&&l.push(1):l.push(m)});let h=l.length,f=M.size(l);return{name:t,shaderCache:e,getShaderSource:m=>{let _=[],w=C("_A",r[0].dataType,d),g=F("output",i,h),b=n(w,g,c),y=b[2];for(let v=0,S=0;v<d;v++)p||c.indexOf(v)>=0?(a&&S++,y=`for(var j${v}: u32 = 0; j${v} < ${u[v]}; j${v}++) {
                  ${b[2].includes("last_index")?`let last_index = j${v};`:""}
                  ${w.indicesSet("input_indices",v,`j${v}`)}
                  ${y}
                }`):(_.push(`${w.indicesSet("input_indices",v,g.indicesGet("output_indices",S))};`),S++);return`

        ${m.registerUniform("output_size","u32").declareVariables(w,g)}

        ${m.mainStart()}
          ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${g.offsetToIndices("global_idx")};

          ${_.join(`
`)}
          ${b[0]}       // init ops for reduce max/min
          ${b[1]}
          ${y}
          ${b[3]}
          ${b.length===4?g.setByOffset("global_idx","value"):b.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:i}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},...D(u,l)]})}},us=(t,e)=>{let r=[];return t[1].dims[0]>0&&t[1].getBigInt64Array().forEach(n=>r.push(Number(n))),se({axes:r,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},je=(t,e,r,n)=>{let s=t.inputs,i=s.length===1?r:us(s,r);t.compute(qr(e,{hint:i.cacheKey,inputDependencies:["rank"]},[s[0]],i.noopWithEmptyAxes&&i.axes.length===0?ro:n,i.axes,s[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},no=(t,e)=>{Ge(t.inputs),je(t,"ReduceLogSum",e,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},so=(t,e)=>{Ge(t.inputs),je(t,"ReduceL1",e,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},io=(t,e)=>{Ge(t.inputs),je(t,"ReduceL2",e,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},ao=(t,e)=>{Ge(t.inputs),je(t,"ReduceLogSumExp",e,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},oo=(t,e)=>{Ge(t.inputs),je(t,"ReduceMax",e,(r,n,s)=>{let i=[];for(let a=0;a<r.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(r.indicesSet("input_indices",a,0));return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},lo=(t,e)=>{Ge(t.inputs),je(t,"ReduceMean",e,(r,n,s)=>{let i=1;for(let a=0;a<r.rank;a++)(s.indexOf(a)>=0||s.length===0)&&(i*=t.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${i});`]})},uo=(t,e)=>{Ge(t.inputs),je(t,"ReduceMin",e,(r,n,s)=>{let i=[];for(let a=0;a<r.rank;a++)(s.indexOf(a)>=0||s.length===0)&&i.push(`input_indices[${a}] = 0;`);return[`${i.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},co=(t,e)=>{Ge(t.inputs),je(t,"ReduceProd",e,(r,n)=>[`var value = ${n.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},po=(t,e)=>{Ge(t.inputs),je(t,"ReduceSum",e,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ho=(t,e)=>{Ge(t.inputs),je(t,"ReduceSumSquare",e,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},We=(t,e,r)=>{if(e.length===0)return r;let n=1,s=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?n*=t[i]:s*=t[i];return s<32&&n>1024},fo=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?lo(t,e):Wa(t,e)},mo=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?so(t,e):Ha(t,e)},go=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?io(t,e):Ka(t,e)},_o=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?ao(t,e):Qa(t,e)},wo=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?oo(t,e):Xa(t,e)},yo=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?uo(t,e):Ya(t,e)},bo=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?co(t,e):Za(t,e)},vo=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?po(t,e):Ja(t,e)},$o=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?ho(t,e):eo(t,e)},xo=(t,e)=>{We(t.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?no(t,e):to(t,e)}}),cs,ko,So,ps,Lf=z(()=>{q(),me(),ds(),cs=t=>{if(!t||t.length===0||t.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(t[0].dataType!==1)throw new Error("Invalid input type.")},ko=(t,e)=>{cs(t.inputs);let r=(n,s,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",s.setByOffset("global_idx","best_index")]};t.compute(qr("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},So=(t,e)=>{cs(t.inputs);let r=(n,s,i)=>{let a=[];for(let o=0;o<n.rank;o++)(i.indexOf(o)>=0||i.length===0)&&a.push(`input_indices[${o}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",s.setByOffset("global_idx","best_index")]};t.compute(qr("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],r,[e.axis],7,e.keepDims),{inputs:[0]})},ps=t=>se(t)}),Eo,To,Io,Vr,Mo,Co,zo=z(()=>{q(),Z(),me(),K(),Eo=(t,e)=>{if(!t||t.length<1)throw new Error("too few inputs");let r=0,n=t[r],s=n.dataType,i=n.dims.length;t.forEach((a,o)=>{if(o!==r){if(a.dataType!==s)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((l,u)=>{if(u!==e&&l!==n.dims[u])throw new Error("non concat dimensions must match")})}})},To=(t,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${t}u>(${e});
    for (var i: u32 = 0u; i < ${t}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${t}u;
  }`,Io=(t,e)=>{let r=t.length,n=[];for(let s=0;s<r;++s){let i=e.setByOffset("global_idx",t[s].getByIndices("indices"));r===1?n.push(i):s===0?n.push(`if (inputIndex == ${s}u) { ${i} }`):s===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${s}) { ${i} }`)}return n.join(`
`)},Vr=(t,e,r,n)=>{let s=M.size(r),i=new Array(t.length),a=new Array(t.length),o=0,l=[],u=[],d=[{type:12,data:s}];for(let m=0;m<t.length;++m)o+=t[m].dims[e],i[m]=o,u.push(t[m].dims.length),a[m]=C(`input${m}`,n,u[m]),l.push("rank"),d.push({type:12,data:i[m]});for(let m=0;m<t.length;++m)d.push(...D(t[m].dims));d.push(...D(r));let c=F("output",n,r.length),p=c.indicesGet("indices",e),h=Array.from(Array(i.length).keys()).map(m=>`uniforms.sizeInConcatAxis${m}`).join(","),f=m=>`

  ${(()=>{m.registerUniform("outputSize","u32");for(let _=0;_<t.length;_++)m.registerUniform(`sizeInConcatAxis${_}`,"u32");return m.declareVariables(...a,c)})()}

  ${To(i.length,h)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${h});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Io(a,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}),getShaderSource:f}},Mo=(t,e)=>{let r=t.inputs,n=r[0].dims,s=M.normalizeAxis(e.axis,n.length);Eo(r,s);let i=n.slice();i[s]=r.reduce((o,l)=>o+(l.dims.length>s?l.dims[s]:0),0);let a=r.filter(o=>M.size(o.dims)>0);t.compute(Vr(a,s,i,r[0].dataType),{inputs:a})},Co=t=>se({axis:t.axis})}),Ao,Po,Oo,Bo,Ht,Ro,Do,hs=z(()=>{q(),ts(),K(),zo(),Ao=(t,e)=>{let r=t[0],n=t[1],s=t[2],i=t[3],a=t[4],o=t[5];if(a&&o)throw new Error("Attention cannot have both past and relative_position_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],u=r.dims[1],d=r.dims[2];if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(s.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=s.dims[0]/3,p=c,h=p;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let b of e.qkvHiddenSizes)if(b%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=e.qkvHiddenSizes[0],p=e.qkvHiddenSizes[1],h=e.qkvHiddenSizes[2]}let f=u;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(s.dims[0]!==c+p+h)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(a){if(p!==h)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==p/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(m=a.dims[3])}let _=f+m,w=-1,g=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");return{batchSize:l,sequenceLength:u,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:_,maxSequenceLength:w,inputHiddenSize:d,hiddenSize:c,vHiddenSize:h,headSize:Math.floor(c/e.numHeads),vHeadSize:Math.floor(h/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:g,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Po=(t,e,r,n)=>{let s=he(n),i=64,a=n/s;a<i?i=1:a/8<64&&(i=Math.ceil(a/8));let o=Math.ceil(n/s/i),l=[{type:e.dataType,data:1/n},{type:12,data:a},{type:12,data:o}],u=_e(e.dataType,s),d=Te(1,s),c=p=>{let h=F("x",e.dataType,e.dims,s),f=[{name:"d_inv",type:Te(e.dataType)},{name:"d_comp",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
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
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${i};${u};${s}`},getShaderSource:c,getRunData:()=>({outputs:[],dispatchGroup:{x:r},programUniforms:l})}},Oo=(t,e,r,n,s,i,a)=>{let o=a+s.kvSequenceLength,l=[s.batchSize,s.numHeads,s.sequenceLength,o],u=i.scale===0?1/Math.sqrt(s.headSize):i.scale,d=he(s.headSize),c=s.headSize/d,p=12,h={x:Math.ceil(o/p),y:Math.ceil(s.sequenceLength/p),z:s.batchSize*s.numHeads},f=[{type:12,data:s.sequenceLength},{type:12,data:c},{type:12,data:o},{type:12,data:s.numHeads},{type:1,data:u}],m=n?["type","type","type"]:["type","type"],_=w=>{let g=C("q",e.dataType,e.dims,d),b=C("key",r.dataType,r.dims,d),y=[g,b];n&&y.push(C("relative_position_bias",n.dataType,n.dims));let v=F("output",e.dataType,l),S=Te(1,d),k=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"alpha",type:"f32"}];return`
  const TILE_SIZE = ${p}u;

  var<workgroup> tileQ: array<${g.type.storage}, ${p*p}>;
  var<workgroup> tileK: array<${g.type.storage}, ${p*p}>;
  ${w.registerUniforms(k).declareVariables(...y,v)}
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
        output[outputIdx] = ${v.type.value} (sum * uniforms.alpha) + ${n?"relative_position_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:l,dataType:e.dataType,gpuDataType:0}],dispatchGroup:h,programUniforms:f}),getShaderSource:_}},Bo=(t,e,r,n,s)=>{let i=s+n.kvSequenceLength,a=n.nReps?n.nReps:1,o=n.vHiddenSize*a,l=[n.batchSize,n.sequenceLength,o],u=12,d={x:Math.ceil(n.vHeadSize/u),y:Math.ceil(n.sequenceLength/u),z:n.batchSize*n.numHeads},c=[{type:12,data:n.sequenceLength},{type:12,data:i},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:o}];return{name:"AttentionScore",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:e.dataType,gpuDataType:0}],dispatchGroup:d,programUniforms:c}),getShaderSource:p=>{let h=C("probs",e.dataType,e.dims),f=C("v",r.dataType,r.dims),m=F("output",e.dataType,l),_=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"v_hidden_size",type:"u32"}];return`
  const TILE_SIZE = ${u}u;
  var<workgroup> tileQ: array<${h.type.value}, ${u*u}>;
  var<workgroup> tileK: array<${h.type.value}, ${u*u}>;
  ${p.registerUniforms(_).declareVariables(h,f,m)}
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
  }`}}},Ht=(t,e,r,n,s,i,a,o,l,u,d)=>{let c=t.outputCount>1,p=t.outputCount>2,h=u.kvNumHeads!=null||c&&p?u.pastSequenceLength:0,f=h+u.kvSequenceLength,m=[u.batchSize,u.numHeads,f,u.headSize],_=a?[a,r]:[r],w=u.kvNumHeads==null&&c?t.compute(Vr(_,2,m,r.dataType),{inputs:_,outputs:[1]})[0]:r,g=[u.batchSize,u.numHeads,f,u.headSize],b=o?[o,n]:[n],y=u.kvNumHeads==null&&p?t.compute(Vr(b,2,g,n.dataType),{inputs:b,outputs:[2]})[0]:n,v=[e,w];l&&v.push(l);let S=t.compute(Oo(t,e,w,l,u,d,h),{inputs:v,outputs:[-1]})[0];t.compute(Po(t,S,u.batchSize*u.numHeads*u.sequenceLength,f),{inputs:[S],outputs:[]});let k=[S,y];t.compute(Bo(t,S,y,u,h),{inputs:k,outputs:[0]})},Ro=(t,e)=>{let r=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],n=e.sequenceLength,s=e.inputHiddenSize,i=e.headSize,a=12,o={x:Math.ceil(e.headSize/a),y:Math.ceil(e.sequenceLength/a),z:e.batchSize*e.numHeads},l=[t.inputs[0],t.inputs[1],t.inputs[2]],u=[{type:12,data:n},{type:12,data:s},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],d=c=>{let p=F("output_q",l[0].dataType,r),h=F("output_k",l[0].dataType,r),f=F("output_v",l[0].dataType,r),m=C("input",l[0].dataType,l[0].dims),_=C("weight",l[1].dataType,l[1].dims),w=C("bias",l[2].dataType,l[2].dims),g=m.type.storage,b=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${g}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${g}, ${a*a}>;
  var<workgroup> tileWeightK: array<${g}, ${a*a}>;
  var<workgroup> tileWeightV: array<${g}, ${a*a}>;
  ${c.registerUniforms(b).declareVariables(m,_,w,p,h,f)}
  ${c.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${g}(0);
    var valueK = ${g}(0);
    var valueV = ${g}(0);
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
  }`};return t.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:t.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:u}),getShaderSource:d},{inputs:l,outputs:[-1,-1,-1]})},Do=(t,e)=>{let r=Ao(t.inputs,e),[n,s,i]=Ro(t,r);return Ht(t,n,s,i,t.inputs[4],void 0,void 0,void 0,t.inputs[5],r,e)}}),Lo,Fo,No,Uo,Ff=z(()=>{Ue(),q(),Z(),me(),K(),Lo=(t,e)=>{if(!t||t.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,s,i)=>{let a=s.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);s.forEach((o,l)=>{if(o!==n[l])throw new Error(`${i}: dim[${l}] do not match`)})};if(t[0].dims.length>1){let n=e.format==="NHWC"?e.spatial?t[0].dims.slice(-1):t[0].dims.slice(-1).concat(t[0].dims.slice(1,t[0].dims.length-1)):t[0].dims.slice(1,e.spatial?2:void 0);r(t[1].dims,n,"Invalid input scale"),r(t[2].dims,n,"Invalid input B"),r(t[3].dims,n,"Invalid input mean"),r(t[4].dims,n,"Invalid input var")}else r(t[1].dims,[1],"Invalid input scale"),r(t[2].dims,[1],"Invalid input B"),r(t[3].dims,[1],"Invalid input mean"),r(t[4].dims,[1],"Invalid input var")},Fo=(t,e)=>{let{epsilon:r,spatial:n,format:s}=e,i=t[0].dims,a=n?he(i[i.length-1]):1,o=s==="NHWC"&&i.length>1?a:1,l=M.size(i)/a,u=n,d=u?i.length:i,c=C("x",t[0].dataType,t[0].dims,a),p=C("scale",t[1].dataType,t[1].dims,o),h=C("bias",t[2].dataType,t[2].dims,o),f=C("inputMean",t[3].dataType,t[3].dims,o),m=C("inputVar",t[4].dataType,t[4].dims,o),_=F("y",t[0].dataType,d,a),w=()=>{let b="";if(n)b=`let cOffset = ${i.length===1?"0u":s==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(s==="NCHW")b=`
            ${_.indicesSet("outputIndices","0","0")}
            let cOffset = ${_.indicesToOffset("outputIndices")};`;else{b=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let y=1;y<p.rank;y++)b+=`cIndices[${y}] = outputIndices[${y}];`;b+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return b},g=b=>`
  const epsilon = ${r};
  ${b.registerUniform("outputSize","u32").declareVariables(c,p,h,f,m,_)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${_.offsetToIndices(`global_idx * ${a}`)};
    ${w()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${_.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${n}_${a}`,inputDependencies:u?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u?[{type:12,data:l},...D(i)]:[{type:12,data:l}]})}},No=t=>se(t),Uo=(t,e)=>{let{inputs:r,outputCount:n}=t,s=No({...e,outputCount:n});if(ne.webgpu.validateInputContent&&Lo(r,s),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");t.compute(Fo(r,s))}}),qo,Vo,Go,Nf=z(()=>{Z(),K(),qo=t=>{if(t[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(t[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(t[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Vo=t=>{let e=t[0].dims,r=t[0].dims[2],n=M.size(e)/4,s=t[0].dataType,i=C("input",s,e,4),a=C("bias",s,[r],4),o=C("residual",s,e,4),l=F("output",s,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:u=>`
  const channels = ${r}u / 4;
  ${u.declareVariables(i,a,o,l)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},Go=t=>{qo(t.inputs),t.compute(Vo(t.inputs))}}),jo,re,Wo,Ho,Ko,Qo,Xo,Yo,Zo,Jo,el,tl,rl,nl,sl,il,Gr,al,jr,ol,ll,ul,dl,cl,pl,hl,fl,ml,gl,_l,wl,yl,bl,vl,$l,fs,xl,ms,gs,kl,Sl,El,_s=z(()=>{q(),Z(),me(),K(),jo=(t,e,r,n,s,i)=>{let a=Math.ceil(e/4),o="";typeof s=="string"?o=`${s}(a)`:o=s("a");let l=C("inputData",r,[a],4),u=F("outputData",n,[a],4);return`
      ${t.registerUniform("vec_size","u32").declareVariables(l,u)}

  ${i??""}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${u.setByOffset("global_idx",o)}
  }`},re=(t,e,r,n,s,i=t.dataType)=>({name:e,shaderCache:{hint:s,inputDependencies:["type"]},getShaderSource:a=>jo(a,M.size(t.dims),t.dataType,i,r,n),getRunData:a=>({outputs:[{dims:t.dims,dataType:i}],dispatchGroup:{x:Math.ceil(M.size(a[0].dims)/64/4)},programUniforms:[{type:12,data:Math.ceil(M.size(t.dims)/4)}]})}),Wo=t=>{t.compute(re(t.inputs[0],"Abs","abs"))},Ho=t=>{t.compute(re(t.inputs[0],"Acos","acos"))},Ko=t=>{t.compute(re(t.inputs[0],"Acosh","acosh"))},Qo=t=>{t.compute(re(t.inputs[0],"Asin","asin"))},Xo=t=>{t.compute(re(t.inputs[0],"Asinh","asinh"))},Yo=t=>{t.compute(re(t.inputs[0],"Atan","atan"))},Zo=t=>{t.compute(re(t.inputs[0],"Atanh","atanh"))},Jo=t=>se(t),el=(t,e)=>{let r;switch(e.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}t.compute(re(t.inputs[0],"Cast",r,void 0,e.cacheKey,e.to))},tl=t=>{let e=t.length>=2&&t[1].data!==0?t[1].getFloat32Array()[0]:is,r=t.length>=3&&t[2].data!==0?t[2].getFloat32Array()[0]:as;return se({min:e,max:r})},rl=(t,e)=>{let r=t.inputs.length===1?e:tl(t.inputs),n=Te(t.inputs[0].dataType);t.compute(re(t.inputs[0],"Clip",s=>`clamp(${s}, clip_min_, clip_max_)`,`
    const clip_min_: vec4<${n}> = vec4(${n}(${r.min}));
    const clip_max_: vec4<${n}> = vec4(${n}(${r.max}));
`,r.cacheKey),{inputs:[0]})},nl=t=>{t.compute(re(t.inputs[0],"Ceil","ceil"))},sl=t=>{t.compute(re(t.inputs[0],"Cos","cos"))},il=t=>{t.compute(re(t.inputs[0],"Cosh","cosh"))},Gr=t=>se(t),al=(t,e)=>{let r=Te(t.inputs[0].dataType);t.compute(re(t.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${e.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},jr=(t="f32")=>`
const r0: ${t} = 0.3275911;
const r1: ${t} = 0.254829592;
const r2: ${t} = -0.284496736;
const r3: ${t} = 1.421413741;
const r4: ${t} = -1.453152027;
const r5: ${t} = 1.061405429;

fn erf_vf32(v: vec4<${t}>) -> vec4<${t}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,ol=t=>{let e=Te(t.inputs[0].dataType);t.compute(re(t.inputs[0],"Erf",r=>`erf_vf32(${r})`,jr(e)))},ll=t=>{t.compute(re(t.inputs[0],"Exp","exp"))},ul=t=>{t.compute(re(t.inputs[0],"Floor","floor"))},dl=t=>{let e=Te(t.inputs[0].dataType);t.compute(re(t.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,jr(e)))},cl=(t,e)=>{let r=Te(t.inputs[0].dataType);t.compute(re(t.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${e.alpha});`,e.cacheKey))},pl=t=>{t.compute(re(t.inputs[0],"Not",e=>`!${e}`))},hl=t=>{t.compute(re(t.inputs[0],"Neg",e=>`-${e}`))},fl=t=>{t.compute(re(t.inputs[0],"Reciprocal",e=>`1.0/${e}`))},ml=t=>{let e=Te(t.inputs[0].dataType);t.compute(re(t.inputs[0],"Relu",r=>`select(vec4<${e}>(0.0), ${r}, ${r} > vec4<${e}>(0.0))`))},gl=t=>{t.compute(re(t.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},_l=t=>se(t),wl=(t,e)=>{let r=Te(t.inputs[0].dataType);t.compute(re(t.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${e.alpha} * ${n} + vec4<${r}>(${e.beta})))`,void 0,e.cacheKey))},yl=t=>{t.compute(re(t.inputs[0],"Sin","sin"))},bl=t=>{t.compute(re(t.inputs[0],"Sinh","sinh"))},vl=t=>{t.compute(re(t.inputs[0],"Sqrt","sqrt"))},$l=t=>{t.compute(re(t.inputs[0],"Tan","tan"))},fs=t=>`sign(${t}) * (1 - exp(-2 * abs(${t}))) / (1 + exp(-2 * abs(${t})))`,xl=t=>{t.compute(re(t.inputs[0],"Tanh",fs))},ms=(t="f32")=>`
const fast_gelu_a: ${t} = 0.5;
const fast_gelu_b: ${t} = 0.7978845608028654;
const fast_gelu_c: ${t} = 0.035677408136300125;

fn tanh_v(v: vec4<${t}>) -> vec4<${t}> {
  return ${fs("v")};
}
`,gs=t=>`(fast_gelu_a + fast_gelu_a * tanh_v(${t} * (fast_gelu_c * ${t} * ${t} + fast_gelu_b))) * ${t}`,kl=t=>{let e=Te(t.inputs[0].dataType);t.compute(re(t.inputs[0],"FastGelu",gs,ms(e),void 0,t.inputs[0].dataType))},Sl=(t,e)=>{let r=Te(t.inputs[0].dataType);return t.compute(re(t.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${e.alpha});`,e.cacheKey)),0},El=t=>{t.compute(re(t.inputs[0],"Log","log"))}}),Tl,Il,Ml,Uf=z(()=>{Z(),K(),_s(),Tl=t=>{if(t[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(t[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(t[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Il=t=>{let e=t[0].dims.slice();e[2]=e[2]/2;let r=C("input",t[0].dataType,t[0].dims,4),n=C("bias",t[0].dataType,[t[0].dims[2]],4),s=F("output",t[0].dataType,e,4),i=M.size(e)/4,a=_e(t[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${t[0].dims[2]/4/2}u;

  ${o.declareVariables(r,n,s)}

  ${jr(a)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${s.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ml=t=>{Tl(t.inputs),t.compute(Il(t.inputs))}}),Cl,zl,He,Al,Pl,Ol,Bl,Rl,Dl,Ll,Fl,Nl,Ul,qf=z(()=>{q(),Z(),K(),Cl=(t,e,r,n,s,i,a,o,l,u,d,c)=>{let p,h;typeof o=="string"?p=h=(g,b)=>`${o}((${g}),(${b}))`:typeof o=="function"?p=h=o:(p=o.scalar,h=o.vector);let f=F("outputData",d,n.length,4),m=C("aData",l,e.length,4),_=C("bData",u,r.length,4),w;if(s)if(i){let g=M.size(e)===1,b=M.size(r)===1,y=e.length>0&&e[e.length-1]%4===0,v=r.length>0&&r[r.length-1]%4===0;g||b?w=f.setByOffset("global_idx",h(g?`${m.type.value}(${m.getByOffset("0")}.x)`:m.getByOffset("global_idx"),b?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"))):w=`
            let outputIndices = ${f.offsetToIndices("global_idx * 4u")};
            let offsetA = ${m.broadcastedIndicesToOffset("outputIndices",f)};
            let offsetB = ${_.broadcastedIndicesToOffset("outputIndices",f)};
            ${f.setByOffset("global_idx",h(a||y?m.getByOffset("offsetA / 4u"):`${m.type.value}(${m.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||v?_.getByOffset("offsetB / 4u"):`${_.type.value}(${_.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else w=f.setByOffset("global_idx",h(m.getByOffset("global_idx"),_.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(b,y,v="")=>{let S=`aData[indexA${y}][componentA${y}]`,k=`bData[indexB${y}][componentB${y}]`;return`
            let outputIndices${y} = ${f.offsetToIndices(`global_idx * 4u + ${y}u`)};
            let offsetA${y} = ${m.broadcastedIndicesToOffset(`outputIndices${y}`,f)};
            let offsetB${y} = ${_.broadcastedIndicesToOffset(`outputIndices${y}`,f)};
            let indexA${y} = offsetA${y} / 4u;
            let indexB${y} = offsetB${y} / 4u;
            let componentA${y} = offsetA${y} % 4u;
            let componentB${y} = offsetB${y} % 4u;
            ${b}[${y}] = ${v}(${p(S,k)});
          `};d===9?w=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:w=`
            ${g("outputData[global_idx]",0)}
            ${g("outputData[global_idx]",1)}
            ${g("outputData[global_idx]",2)}
            ${g("outputData[global_idx]",3)}
          `}return`
        ${t.registerUniform("vec_size","u32").declareVariables(m,_,f)}

        ${c??""}

        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${w}
      }`},zl=(t,e,r,n,s,i,a=r.dataType)=>{let o=!M.areEqual(r.dims,n.dims),l=r.dims,u=M.size(r.dims),d=!1,c=!1,p=[o];if(o){let h=Ct.calcShape(r.dims,n.dims,!1);if(!h)throw new Error("Can't perform binary op on the given tensors");l=h,u=M.size(l);let f=M.size(r.dims)===1,m=M.size(n.dims)===1,_=r.dims.length>0&&r.dims[r.dims.length-1]%4===0,w=n.dims.length>0&&n.dims[n.dims.length-1]%4===0;p.push(f),p.push(m),p.push(_),p.push(w);let g=1;for(let b=1;b<l.length;b++){let y=r.dims[r.dims.length-b]??1,v=n.dims[n.dims.length-b]??1;if(y===v)g*=y;else break}g%4===0?(c=!0,d=!0):(f||m||_||w)&&(d=!0)}else d=!0;return p.push(d),{name:t,shaderCache:{hint:e+p.map(h=>h.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:h=>Cl(h,r.dims,n.dims,l,d,o,c,s,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:Math.ceil(M.size(l)/4)},...D(r.dims,n.dims,l)]})}},He=(t,e,r,n,s,i)=>{t.compute(zl(e,s??"",t.inputs[0],t.inputs[1],r,n,i))},Al=t=>{He(t,"Add",(e,r)=>`${e}+${r}`)},Pl=t=>{He(t,"Div",(e,r)=>`${e}/${r}`)},Ol=t=>{He(t,"Equal",{scalar:(e,r)=>`u32(${e}==${r})`,vector:(e,r)=>`vec4<u32>(${e}==${r})`},void 0,void 0,9)},Bl=t=>{He(t,"Mul",(e,r)=>`${e}*${r}`)},Rl=t=>{let e=C("input",t.inputs[0].dataType,t.inputs[0].dims).type.value;He(t,"Pow",{scalar:(r,n)=>`pow_custom(${r},${n})`,vector:(r,n)=>`pow_vector_custom(${r},${n})`},`
    fn pow_custom(a : ${e}, b : ${e}) -> ${e} {
      if (b == ${e}(0.0)) {
        return ${e}(1.0);
      } else if (a < ${e}(0.0) && f32(b) != floor(f32(b))) {
        return ${e}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${e}(1.0), round(f32(abs(b) % ${e}(2.0))) != 1.0) * ${e}(${e==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${e}>, b : vec4<${e}>) -> vec4<${e}> {
      // TODO: implement vectorized pow
      return vec4<${e}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Dl=t=>{He(t,"Sub",(e,r)=>`${e}-${r}`)},Ll=t=>{He(t,"Greater",{scalar:(e,r)=>`u32(${e}>${r})`,vector:(e,r)=>`vec4<u32>(${e}>${r})`},void 0,void 0,9)},Fl=t=>{He(t,"Less",{scalar:(e,r)=>`u32(${e}<${r})`,vector:(e,r)=>`vec4<u32>(${e}<${r})`},void 0,void 0,9)},Nl=t=>{He(t,"GreaterOrEqual",{scalar:(e,r)=>`u32(${e}>=${r})`,vector:(e,r)=>`vec4<u32>(${e}>=${r})`},void 0,void 0,9)},Ul=t=>{He(t,"LessOrEqual",{scalar:(e,r)=>`u32(${e}<=${r})`,vector:(e,r)=>`vec4<u32>(${e}<=${r})`},void 0,void 0,9)}}),yt,bt,vt,ws,$t=z(()=>{q(),Z(),yt=(t,e,r="f32")=>{switch(t.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${r}(uniforms.clip_min)), ${e}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"":return"";default:throw new Error(`Unsupported activation ${t.activation}`)}},bt=(t,e)=>{t.activation==="Clip"?e.push({type:1,data:t.clipMax},{type:1,data:t.clipMin}):t.activation==="HardSigmoid"?e.push({type:1,data:t.alpha},{type:1,data:t.beta}):t.activation==="LeakyRelu"&&e.push({type:1,data:t.alpha})},vt=(t,e)=>{t.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):t.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):t.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},ws=t=>{let e=t?.activation||"";if(e==="HardSigmoid"){let[r,n]=t?.activation_params||[.2,.5];return{activation:e,alpha:r,beta:n}}else if(e==="Clip"){let[r,n]=t?.activation_params||[is,as];return{activation:e,clipMax:n,clipMin:r}}else if(e==="LeakyRelu"){let[r]=t?.activation_params||[.01];return{activation:e,alpha:r}}return{activation:e}}}),xe,ys,bs=z(()=>{xe=(t,e)=>{switch(t){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${t}-component is not supported.`)}},ys=t=>`
      ${t?"value = value + getBiasByOutputCoords(coords);":""}
      `}),vs,ql=z(()=>{vs=t=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${t}.x), i32(${t}.y), i32(${t}.z), 1));
}
`}),Vl,Gl,Wr,$s,jl,Hr,Wl,xs,Kr=z(()=>{q(),Z(),K(),$t(),bs(),Vl=(t,e)=>t?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,Gl=(t,e)=>t?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${e===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Wr=(t,e,r="f32",n,s=!1,i=32,a=!1,o=32)=>{let l=e[1]*t[1],u=e[0]*t[0],d=s?l:i,c=s?i:l,p=d/e[0],h=i/e[1];if(!((s&&p===4&&t[1]===4||!s&&(p===3||p===4))&&d%e[0]===0&&i%e[1]===0&&t[0]===4))throw new Error(`If transposeA ${s} is true, innerElementSize ${p} and workPerThread[1] ${t[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${t[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${r}>, ${d/p}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${u/t[0]}>, ${i}>;

const rowPerThread = ${t[1]};
const colPerThread = ${t[0]};
const innerElementSize = ${p};
const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
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
          ${Vl(s,n)}
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

          ${Gl(s,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},$s=(t,e)=>t?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,jl=t=>t?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Hr=(t,e,r="f32",n,s=!1,i=32,a=!1,o=32,l=!1)=>{let u=t[1]*e[1],d=t[0]*e[0],c=s?u:i,p=s?i:u;if(!(p%e[1]===0&&c%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let h=p/e[1],f=c/e[0],m=i/e[1],_=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${u};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          ${$s(s,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${e[0]}) {
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
          BCached[inner] = mm_Bsub[k][localCol + inner * ${e[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${s?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${e[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${e[0]};
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
      ${$s(s,n)}
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
      ${jl(s)}
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
  const rowPerThread = ${t[1]};
  const colPerThread = ${t[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
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
    ${_}
  }
`},Wl=(t,e,r,n,s,i=!1)=>{let[a,o,l]=s,[u,d,c,p]=n,h=Wt(a,l),f=Wt(o,l),m=_e(n[0].type.tensor),_=()=>{let g=d.rank,b=u.rank,y=`var aIndices: ${d.type.indices};`;for(let v=g-2-1,S=b-1;v>=0;v--,S--)y+=`
aIndices[${v}] = ${b>1?`batchIndices[${S}]`:"batchIndices"};`;return h.forEach(v=>{y+=`
aIndices[${v}] = 0;`}),y+=`
aIndices[${g-2}] = u32(row);
                   aIndices[${g-1}] = u32(colIn);`,y},w=()=>{let g=c.rank,b=u.rank,y=`var bIndices: ${c.type.indices};`;for(let v=g-2-1,S=b-1;v>=0;v--,S--)y+=`
bIndices[${v}] = ${b>1?`batchIndices[${S}]`:"batchIndices"};`;return f.forEach(v=>{y+=`
bIndices[${v}] = 0;`}),y+=`
bIndices[${g-2}] = u32(row);
                   bIndices[${g-1}] = u32(colIn);`,y};return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${u.type.indices}) -> ${xe(t,m)} {
      var value = ${xe(t,m)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        ${_()}
        value = ${d.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${u.type.indices}) -> ${xe(t,m)} {
      var value = ${xe(t,m)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        ${w()}
        value = ${c.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${xe(t,m)}) {
      let col = colIn * ${t};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${i?"bias[colIn]":`${xe(t,m)}(bias[row])`};`:""}
        ${r}
        ${p.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},xs=(t,e,r,n,s=!1)=>{let i=t[0].dims,a=t[1].dims,o=i.slice(0,-2),l=a.slice(0,-2),u=n?n.slice(0,-2):r.slice(0,-2),d=M.size(u),c=i[i.length-2],p=i[i.length-1],h=a[a.length-1],f=p%4===0&&h%4===0,m=c<=8?[4,1,1]:[4,4,1],_=[8,8,1],w=[Math.ceil(h/_[0]/m[0]),Math.ceil(c/_[1]/m[1]),Math.ceil(d/_[2]/m[2])],g=f?4:1,b=[...o,c,p/g],y=b.length,v=[...l,p,h/g],S=v.length,k=[d,c,h/g],I=[{type:6,data:c},{type:6,data:h},{type:6,data:p}];bt(e,I),I.push(...D(u,b,v));let B=["rank","rank"],P=t.length>2;P&&(I.push(...D(t[2].dims)),B.push("rank")),I.push(...D(k));let U=H=>{let j=u.length,N=os("batchDims",t[0].dataType,j,1),x=_e(t[0].dataType),T=C("a",t[0].dataType,y,g),O=C("b",t[1].dataType,S,g),J=F("result",t[0].dataType,k.length,g),L=[T,O];if(P){let fe=s?g:1;L.push(C("bias",t[2].dataType,t[2].dims.length,fe))}let X=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];vt(e,X);let E=_e(J.type.tensor),R=yt(e,J.type.value,E),Y=Wl(g,P,R,[N,T,O,J],[o,l,u],s);return`
  ${H.registerUniforms(X).registerInternalVariables(N).declareVariables(...L,J)}
  ${Y}
  ${f?Wr(m,_,x,N):Hr(m,_,x,N)}
                   `};return{name:"MatMul",shaderCache:{hint:`${m};${e.activation};${f};${s}`,inputDependencies:B},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:I}),getShaderSource:U}}}),Hl,Kl,Vf=z(()=>{q(),_t(),K(),$t(),bs(),ql(),Kr(),Hl=(t,e,r,n,s=!1,i,a=4,o=4,l=4,u="f32")=>{let d=B=>{switch(B){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${u}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},c=B=>{switch(B){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},p=t?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=t?`
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
    `,f=t?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",m=t?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",_=t?"row":"col",w=t?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${_} / outWidth;
    let outCol = ${_} % outWidth;

    let WRow = ${w} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${w} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${w} % inChannels;
    var resData = ${xe(a,u)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${f} && xCol >= 0 && xCol < ${m}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(a)}
    }
    return resData;`,b=t?e&&n?`
    let col = colIn * ${a};
    ${g}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${xe(a,u)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${g}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${xe(a,u)}(0.0);`,y=`${c(o)}`,v=xe(l,u),S=xe(t?a:o,u),k=xe(t?o:a,u),I=yt(i,v,u);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${S} {
      ${t?b:y}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${k} {
      ${t?y:b}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${v}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${ys(s)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Kl=(t,e,r,n,s,i,a,o)=>{let l=e.format==="NHWC",u=l?t[0].dims[3]:t[0].dims[1],d=r[0],c=l?r[2]:r[3],p=l?r[1]:r[2],h=l?r[3]:r[1],f=l&&(u%4===0||u%3===0)&&h%4===0,m=l?h:c*p,_=l?c*p:h,w=[8,8,1],g=n<=8?[4,1,1]:[4,4,1],b=[Math.ceil(m/w[0]/g[0]),Math.ceil(_/w[1]/g[1]),Math.ceil(d/w[2]/g[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${b}`);let y=f?l&&u%4!==0?3:4:1,v=w[1]*g[1],S=w[0]*g[0],k=Math.max(w[0]*y,w[1]),I=n%v===0,B=s%S===0,P=i%k===0,U=f?[y,4,4]:[1,1,1],H=[{type:6,data:n},{type:6,data:s},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];bt(e,H),H.push(...D(t[0].dims,t[1].dims));let j=["rank","rank"];a&&(H.push(...D(t[2].dims)),j.push("rank")),H.push(...D(r));let N=x=>{let T=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];vt(e,T);let O=f?4:1,J=_e(t[0].dataType),L=`
      fn setOutputAtIndex(flatIndex : i32, value : ${f?`vec4<${J}>`:J}) {
        result[flatIndex] = ${f?`vec4<${J}>`:J}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${f?`vec4<${J}>`:J}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${f?"/ 4":""}, value);
      }`,X=C("x",t[0].dataType,t[0].dims.length,y===3?1:y),E=C("w",t[1].dataType,t[1].dims.length,O),R=[X,E],Y=F("result",t[0].dataType,r.length,O);if(a){let fe=C("bias",t[2].dataType,t[2].dims.length,O);R.push(fe),L+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${f?`vec4<${J}>`:J} {
          return bias[coords.${l?"w":"y"}${f?"/ 4":""}];
        }`}return`
        ${vs("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${x.registerUniforms(T).declareVariables(...R,Y)}
        ${L}
        ${Hl(l,I,B,P,a,e,U[0],U[1],U[2],J)}
        ${f?Wr(g,w,J,void 0,!l,k):Hr(g,w,J,void 0,!l,k,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${y};${f};${I};${B};${P};${v};${S};${k}`,inputDependencies:j},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:H}),getShaderSource:N}}}),ks,Ql,Gf=z(()=>{q(),Z(),K(),ru(),$t(),ks=(t,e,r)=>{let n=t.length>2,s=n?"value += b[output_channel];":"",i=t[0].dims,a=t[1].dims,o=a[0]/e.group,l=e.format==="NHWC",u=Qr(i,a,e.dilations,e.pads,e.strides,l),d=M.size(u),c=[{type:12,data:d},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:o}];bt(e,c),c.push(...D(i,a));let p=["rank","rank"];n&&(c.push(...D(t[2].dims)),p.push("rank")),c.push(...D(u));let h=f=>{let m=F("output",t[0].dataType,u.length),_=_e(m.type.tensor),w=yt(e,m.type.value,_),g=C("x",t[0].dataType,i.length),b=C("w",t[1].dataType,a.length),y=[g,b];n&&y.push(C("b",t[2].dataType,t[2].dims.length));let v=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];return vt(e,v),`
  ${f.registerUniforms(v).declareVariables(...y,m)}

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

          let xVal = ${l?g.get("batch","xHeight","xWidth","input_channel"):g.get("batch","input_channel","xHeight","xWidth")};
          let wVal = ${b.get("output_channel","wInChannel","wHeight","wWidth")};
          value += xVal*wVal;
        }
      }
    }
    ${s}
    ${w}
    ${m.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:e.cacheKey,inputDependencies:p},getRunData:()=>({outputs:[{dims:r?r(u):u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:h}},Ql=(t,e,r)=>{let n=t.length>2,s=he(r[3]),i=he(r[2]),a=M.size(r)/s/i,o=[t[0].dims[0],t[0].dims[1],t[0].dims[2],t[0].dims[3]/s],l=[t[1].dims[0],t[1].dims[1],t[1].dims[2],t[1].dims[3]/s],u=[r[0],r[1],r[2],r[3]/s],d=[{type:12,data:a},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];bt(e,d),d.push(...D(o,l,u));let c=(i-1)*e.strides[1]+l[1],p=h=>{let f=F("output",t[0].dataType,u.length,s),m=_e(f.type.tensor),_=yt(e,f.type.value,m),w=C("x",t[0].dataType,o.length,s),g=C("w",t[1].dataType,l.length,s),b=[w,g];n&&b.push(C("b",t[2].dataType,t[2].dims,s));let y=n?"value += b[output_channel];":"",v=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return vt(e,v),`
  ${h.registerUniforms(v).declareVariables(...b,f)}
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
          let w_val = ${g.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${i}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${i}u; i++) {
      var value = values[i];
      ${y}
      ${_}
      ${f.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${s};${i};${c};${l[0]};${l[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:p}}}),Ss,Xl,Yl,Zl=z(()=>{q(),Z(),Kr(),K(),$t(),Ss=(t,e,r,n,s=!1)=>{let i=t[0].dims,a=t[1].dims,o=i[i.length-2],l=a[a.length-1],u=i[i.length-1],d=he(l),c=he(u),p=he(o),h=M.size(r)/d/p,f=t.length>2,m=n?n.slice(0,-2):r.slice(0,-2),_=[M.size(m),o,l],w=[{type:12,data:h},{type:12,data:o},{type:12,data:l},{type:12,data:u}];bt(e,w),w.push(...D(m,i,a)),f&&w.push(...D(t[2].dims)),w.push(...D(_));let g=b=>{let y=os("batch_dims",t[0].dataType,m.length),v=C("a",t[0].dataType,i.length,c),S=C("b",t[1].dataType,a.length,d),k=F("output",t[0].dataType,_.length,d),I=_e(k.type.tensor),B=yt(e,k.type.value,I),P=[v,S],U="";if(f){let L=s?d:1;P.push(C("bias",t[2].dataType,t[2].dims.length,L)),U=`${s?`value += bias[col / ${L}];`:`value += ${k.type.value}(bias[row + i]);`}`}let H=i.slice(0,-2),j=a.slice(0,-2),N=Wt(H,m),x=Wt(j,m),T=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];vt(e,T);let O=(L,X)=>{let E=L.rank,R=L.name;if(E===2)return`var ${R}_indices = ${L.type.indices}(0u, 0u);`;let Y=y.rank,fe=`var ${R}_indices: ${L.type.indices};`;for(let we=E-2-1,st=Y-1;we>=0;we--,st--)fe+=`
${R}_indices[${we}] = ${Y>1?`batch_indices[${st}]`:"batch_indices"};`;return X.forEach(we=>{fe+=`
${R}_indices[${we}] = 0;`}),fe+=`${R}_indices[${E-2}] = 0u;
                     ${R}_indices[${E-1}] = 0u;`,fe},J=()=>{let L=`var a_data: ${v.type.value};`;for(let X=0;X<c;X++)L+=`
              let b_data${X} = b[(b_offset + (k + ${X}) * uniforms.N + col) / ${d}];`;for(let X=0;X<p;X++){L+=`a_data = a[(a_offset + (row + ${X}) * uniforms.K + k) / ${c}];`;for(let E=0;E<c;E++)L+=`
            values[${X}] = fma(${S.type.value}(a_data${c===1?"":`[${E}]`}), b_data${E}, values[${X}]);
`}return L};return`
  ${b.registerUniforms(T).registerInternalVariables(y).declareVariables(...P,k)}
  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${d})) * ${d};
    var index1 = global_idx / (uniforms.N / ${d});
    let stride1 = uniforms.M / ${p};
    let row = (index1 % stride1) * ${p};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${y.offsetToIndices("batch")};`}
    ${O(v,N)}
    let a_offset = ${v.indicesToOffset("a_indices")};
    ${O(S,x)}
    let b_offset = ${S.indicesToOffset("b_indices")};
    var values: array<${k.type.value}, ${p}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${c}) {
      ${J()}
    }
    for (var i = 0u; i < ${p}u; i++) {
      var value = values[i];
      ${U}
      ${B}
      let cur_indices = ${k.type.indices}(batch, row + i, col);
      let offset = ${k.indicesToOffset("cur_indices")};
      ${k.setByOffset(`offset / ${d}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${d};${c};${p};${s}`,inputDependencies:f?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:g}},Xl=t=>{if(!t||t.length!==2)throw new Error("MatMul requires 2 inputs.");if(t[0].dims[t[0].dims.length-1]!==t[1].dims[t[1].dims.length-2])throw new Error("shared dimension does not match.")},Yl=t=>{Xl(t.inputs);let e=Ct.calcShape(t.inputs[0].dims,t.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let r=e[e.length-1],n=t.inputs[0].dims[t.inputs[0].dims.length-1];r<8&&n<8?t.compute(Ss(t.inputs,{activation:""},e)):t.compute(xs(t.inputs,{activation:""},e))}}),Qr,Xr,Jl,Es,Ts,eu,tu,Is,ru=z(()=>{Z(),Vf(),Kr(),Gf(),$t(),Zl(),Pt(),Qr=(t,e,r,n,s,i)=>{let a=t[0],o=t.slice(i?1:2,i?3:4),l=o.length,u=e[0],d=e.slice(2).map((p,h)=>p+(p-1)*(r[h]-1)),c=o.map((p,h)=>p+n[h]+n[h+l]).map((p,h)=>Math.floor((p-d[h]+s[h])/s[h]));return c.splice(0,0,a),c.splice(i?3:1,0,u),c},Xr=[2,3,1,0],Jl=(t,e)=>{if(!t||t.length!==2&&t.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(t[0].dims.length!==4&&t[0].dims.length!==3)throw new Error("currently only support conv 1D and 2D");if(t[0].dims.length!==t[1].dims.length)throw new Error("filter does not have same dimension as input");let r=t[0].dims[e.format==="NHWC"?t[0].dims.length-1:1],n=t[1].dims[1]*e.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(t.length===3&&(t[2].dims.length!==1||t[1].dims[0]!==t[2].dims[0]))throw new Error("invalid bias");let s=t[0].dims.length-2;if(e.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(e.strides.length!==s)throw new Error(`strides should be ${s}D`);if(e.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==t[1].dims.length-2)throw new Error("invalid kernel shape")},Es=(t,e)=>{let r=t.kernelShape.slice();for(let i=2;i<e[1].dims.length;++i)r[i-2]===0&&(r[i-2]=e[1].dims[i]);let n=t.pads.slice();Fr.adjustPadsBasedOnAutoPad(e[0].dims,t.strides,t.dilations,r,n,t.format==="NHWC",t.autoPad);let s=Object.assign({},t);return Object.assign(s,{kernelShape:r,pads:n}),s},Ts=t=>{let e=ws(t),r=t.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],s=t.dilations,i=t.group,a=t.kernel_shape,o=t.pads,l=t.strides,u=t.w_is_const();return{autoPad:n,format:r,dilations:s,group:i,kernelShape:a,pads:o,strides:l,wIsConst:u,...e,cacheKey:`${t.format};${e.activation};`}},eu=(t,e,r)=>{let n=Es(r,e),s=r.format==="NHWC";if(r.group!==1){if(!t.adapterInfo.isArchitecture("ampere")&&s&&e[1].dims[0]===r.group&&e[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1){let S=Qr(e[0].dims,e[1].dims,r.dilations,n.pads,r.strides,s),k=t.kernelCustomData.wT??t.compute(Xe(e[1],Xr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=k);let I=[e[0],k];e.length===3&&I.push(e[2]),t.compute(Ql(I,n,S),{inputs:I})}else t.compute(ks(e,n));return}let i=e.length===3,a=e[0].dims[s?1:2],o=e[0].dims[s?2:3],l=e[0].dims[s?3:1],u=e[1].dims[2],d=e[1].dims[3],c=Qr(e[0].dims,e[1].dims,r.dilations,n.pads,r.strides,s),p=c[s?1:2],h=c[s?2:3],f=c[s?3:1],m=s&&u===a&&d===o&&r.pads[0]===0&&r.pads[1]===0;if(m||u===1&&d===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let S=c[0],k,I,B,P=[];if(s){let j=t.kernelCustomData.wT??t.compute(Xe(e[1],Xr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=j),m){let N=a*o*l;k=e[0].reshape([1,S,N]),I=j.reshape([1,N,f]),B=[1,S,f]}else k=e[0].reshape([S,a*o,l]),I=j.reshape([1,l,f]),B=[S,p*h,f];P.push(k),P.push(I)}else k=e[0].reshape([S,l,a*o]),I=e[1].reshape([1,f,l]),B=[S,f,p*h],P.push(I),P.push(k);i&&P.push(e[2]);let U=B[2],H=P[0].dims[P[0].dims.length-1];U<8&&H<8?t.compute(Ss(P,n,c,B,s),{inputs:P}):t.compute(xs(P,n,c,B,s),{inputs:P});return}let _=!0,w=t.kernelCustomData.wT??t.compute(Xe(e[1],Xr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=w);let g=[e[0],w];i&&g.push(e[2]);let b=s?p*h:f,y=s?f:p*h,v=u*d*l;t.compute(Kl(g,n,c,b,y,v,i,_),{inputs:g})},tu=(t,e)=>{let r=e.format==="NHWC",n=[t.inputs[0].reshape(r?[t.inputs[0].dims[0],1,t.inputs[0].dims[1],t.inputs[0].dims[2]]:[t.inputs[0].dims[0],t.inputs[0].dims[1],1,t.inputs[0].dims[2]]),t.inputs[1].reshape([t.inputs[1].dims[0],t.inputs[1].dims[1],1,t.inputs[1].dims[2]])];t.inputs.length===3&&n.push(t.inputs[2]);let s=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),a=[1].concat(e.dilations),o=[1].concat(e.kernelShape),l=Es({...e,pads:s,strides:i,dilations:a,kernelShape:o},n);t.compute(ks(n,l,u=>r?[u[0],u[2],u[3]]:[]))},Is=(t,e)=>{Jl(t.inputs,e),t.inputs[0].dims.length===3?tu(t,e):eu(t,t.inputs,e)}}),nu,su,jf=z(()=>{q(),_t(),K(),$t(),bs(),ql(),Kr(),nu=(t,e=!1,r,n,s=4)=>{let i=_=>{switch(_){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${n}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${_} is not supported.`)}},a=t?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,o=t?`
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
    `,l=t?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",u=t?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",d=t?"row":"col",c=t?"col":"row",p=`
      let inChannels = ${t?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
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
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${s}];`,h=t?`
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
      let inChannels = ${t?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${t?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(s)}
      }
      return ${n}(0.0);
      `,m=yt(r,n);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${t?h:f}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${t?f:h}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${n}) {
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${o}
      ${ys(e)}
      ${m}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${s}] = value;
    }
  }`},su=(t,e,r,n,s,i,a,o)=>{let l=e.format==="NHWC",u=l?t[0].dims[3]:t[0].dims[1],d=r[0],c=l?r[2]:r[3],p=l?r[1]:r[2],h=l?r[3]:r[1],f=l&&u%4===0&&u%3&&h%4===0,m=l?h:c*p,_=l?c*p:h,w=[8,8,1],g=n<=8?[4,1,1]:[4,4,1],b=[Math.ceil(m/w[0]/g[0]),Math.ceil(_/w[1]/g[1]),Math.ceil(d/w[2]/g[2])];ue("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${b}`);let y=f?4:1,v=Math.max(w[0]*y,w[1]),S=f?4:1,k=[e.kernelShape[l?1:2],e.kernelShape[l?2:3]],I=[k[0]+(e.dilations[0]<=1?0:(k[0]-1)*(e.dilations[0]-1)),k[1]+(e.dilations[1]<=1?0:(k[1]-1)*(e.dilations[1]-1))],B=[I[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),I[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],P=[{type:6,data:n},{type:6,data:s},{type:6,data:i},{type:6,data:e.strides},{type:6,data:e.dilations},{type:6,data:k},{type:6,data:B}];bt(e,P),P.push(...D(t[0].dims,t[1].dims));let U=["rank","rank"];a&&(P.push(...D(t[2].dims)),U.push("rank")),P.push(...D(r));let H=j=>{let N=C("x",t[0].dataType,t[0].dims.length,S),x=C("w",t[1].dataType,t[1].dims.length,1),T=F("result",t[0].dataType,r.length,S),O=[N,x],J="";if(a){let E=C("bias",t[2].dataType,t[2].dims.length,S);O.push(E),J+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${E.type.value} {
            return bias[coords.${l?"w":"y"}${f?"/ 4":""}];
          }`}let L=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:k.length},{name:"pads",type:"i32",length:B.length}];vt(e,L);let X=_e(t[0].dataType,1);if(X!=="f16"&&X!=="f32")throw new Error(`elemType ${X} is not supported.`);return`
        ${vs("uniforms.result_strides")}
        ${j.registerUniforms(L).declareVariables(...O,T)};
        ${J}
        ${nu(l,a,e,N.type.value,y)}
        ${f?Wr(g,w,X,void 0,!l,v):Hr(g,w,X,void 0,!l,v,!1,void 0,o)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${e.cacheKey};${g};${w};${f}`,inputDependencies:U},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:P}),getShaderSource:H}}}),iu,Ms,Wf=z(()=>{q(),_t(),Z(),K(),iu=(t,e,r,n,s,i=!1,a,o,l=!1)=>{let u=l?1:2,d=l?2:3,c=l?3:1,p=i?2:1,h=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${a}>`:a}) {
    result[flatIndex] = ${i?`vec4<${a}>`:a}(value);
  }`;n&&(h+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${a}>`:a} {
      return bias[coords.${l?"w":"y"}${i?"/ 4":""}];
    }`);let f=i?4:1,m=C("W",e[1].dataType,e[1].dims.length,f),_=C("Dy",e[0].dataType,e[0].dims.length,f),w=[_,m];n&&w.push(C("bias",e[2].dataType,[r[c]].length,f));let g=F("result",e[0].dataType,r.length,f),b=`{
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

                var xValue = ${_.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${_.get("batch","idyR","idyC2","d2")};

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

                var xValue = ${_.get("batch","idyR","idyC","d2")};
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

                var xValue = ${_.get("batch","idyR","idyC2","d2")};
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
          ${g.set("batch","r","c + i","d1","value")};
        }
      }`,y=`
          let outputIndices = ${g.offsetToIndices("global_idx")};
          let batch = ${g.indicesGet("outputIndices",0)};
          let d1 = ${g.indicesGet("outputIndices",c)};
          let r = ${g.indicesGet("outputIndices",u)};
          let c = ${g.indicesGet("outputIndices",d)};
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
                let xValue = ${l?_.get("batch","idyR","idyC","inputChannel"):_.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${m.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${a}(0.0)`};
          ${g.setByOffset("global_idx","value")};
        `;return`
  ${t.registerUniforms(o).declareVariables(...w,g)}
  ${h}

    ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?b:y}}`},Ms=(t,e,r)=>{let n=t.length>2,s=e.outputShape,i=M.size(s),a=[Math.ceil(i/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${a}`);let o=e.format==="NHWC",l=["rank","rank"],u=[e.strides[0],e.strides[1]],d=[e.kernelShape[o?1:2],e.kernelShape[o?2:3]],c=[e.dilations[0],e.dilations[1]],p=[d[0]+(e.dilations[0]<=1?0:(e.kernelShape[o?1:2]-1)*(e.dilations[0]-1)),d[1]+(e.dilations[1]<=1?0:(e.kernelShape[o?2:3]-1)*(e.dilations[1]-1))],h=[p[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),p[1]-1-Math.floor(e.pads[1]+e.pads[3])/2],f=!1,m=e.group,_=t[1].dims,w=_[0]/m,g=_[1],b=[{type:12,data:i},{type:12,data:u},{type:12,data:d},{type:12,data:c},{type:12,data:p},{type:6,data:h},{type:12,data:w},{type:12,data:g},...D(t[0].dims,t[1].dims)];n&&(b.push(...D(t[2].dims)),l.push("rank")),b.push(...D(s));let y=a[1]===1&&a[2]===1,v=S=>{let k=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:u.length},{name:"filter_dims",type:"u32",length:d.length},{name:"dilations",type:"u32",length:d.length},{name:"effective_filter_dims",type:"u32",length:p.length},{name:"pads",type:"i32",length:h.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],I=_e(t[0].dataType);return`${iu(S,t,s,n,y,f,I,k,o)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};`,inputDependencies:l},getRunData:()=>({dispatchGroup:{x:a[0],y:a[1],z:a[2]},outputs:[{dims:r?r(s):s,dataType:t[0].dataType}],programUniforms:b}),getShaderSource:v}}}),au,ou,lu,Cs,uu,du,cu,pu,hu,fu,Hf=z(()=>{jf(),Wf(),$t(),Pt(),au=(t,e,r,n,s,i)=>(t-1)*e+r+(n-1)*s+1-i,ou=(t,e,r,n,s)=>{let i=Math.floor(t/2);e==="SAME_UPPER"?(r[n]=i,r[s]=t-i):e==="SAME_LOWER"&&(r[n]=t-i,r[s]=i)},lu=(t,e,r,n,s,i,a,o,l,u)=>{let d=t.length-2,c=u.length===0;if(l.length===0)for(let f=0;f<d;++f)l.push(0);let p=t[0],h=e[o?3:1]*s;for(let f=0,m=t.length-d-(o?1:0);f<d;++f,++m){let _=t[m],w=c?_*a[f]:u[f],g=au(_,a[f],i[f],e[m],r[f],w);ou(g,n,i,f,f+d),c&&u.push(a[f]*(_-1)+l[f]+(e[m]-1)*r[f]+1-i[f]-i[f+d])}u.splice(0,0,p),u.splice(o?3:1,0,h)},Cs=(t,e)=>{let r=t.kernelShape.slice();if(t.kernelShape.length===0||t.kernelShape.reduce((c,p)=>c*p,1)===0){r.length=0;for(let c=2;c<e[1].dims.length;++c)r.push(e[1].dims[c])}let n=t.format==="NHWC";r.splice(0,0,e[1].dims[0]),r.splice(n?3:1,0,e[1].dims[1]);let s=t.pads.slice(),i=t.outputShape.slice(),a=t.outputPadding.slice(),o=e[0].dims,l=t.dilations.slice();if(l.reduce((c,p)=>c+p,0)===0){let c=e[0].dims.length-2;l=new Array(c).fill(1)}let u=t.strides.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=e[0].dims.length-2;u=new Array(c).fill(1)}lu(o,r,l,t.autoPad,t.group,s,u,n,a,i);let d=Object.assign({},t);return Object.assign(d,{kernelShape:r,pads:s,outputPadding:a,outputShape:i,dilations:l,strides:u}),d},uu=t=>{let e=ws(t),r=t.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof t.autoPad>"u"?0:t.autoPad],s=t.dilations,i=t.group,a=t.kernelShape,o=t.pads,l=t.strides,u=t.wIsConst(),d=t.outputPadding,c=t.outputShape;return{autoPad:n,format:r,dilations:s,group:i,kernelShape:a,outputPadding:d,outputShape:c,pads:o,strides:l,wIsConst:u,...e,cacheKey:`${t.format};${e.activation};`}},du=(t,e)=>{if(!t||t.length!==2&&t.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(t[0].dims.length!==4&&t[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(t[0].dims.length!==t[1].dims.length)throw new Error("filter does not have same dimension as input");let r=t[0].dims[e.format==="NHWC"?t[0].dims.length-1:1],n=t[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let s=t[1].dims[1]*e.group;if(t.length===3&&(t[2].dims.length!==1||t[2].dims[0]!==s))throw new Error("invalid bias");let i=t[0].dims.length-2;if(e.dilations.reduce((a,o)=>a+o,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((a,o)=>a+o,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((a,o)=>a+o,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((a,o)=>a+o,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==t[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==t[0].dims.length-2)throw new Error("invalid output shape")},cu=[2,3,1,0],pu=(t,e,r)=>{let n=Cs(r,e),s=r.format==="NHWC",i=n.outputShape,a=i[s?3:1],o=e[0].dims[s?3:1];if(n.group!==1||a===1&&o===1){t.compute(Ms(e,n));return}let l=i[s?1:2],u=i[s?2:3],d=e[1].dims[2],c=e[1].dims[3],p=s?l*u:a,h=s?a:l*u,f=d*c*o,m=!0,_=t.kernelCustomData.wT??t.compute(Xe(e[1],cu),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=_);let w=[e[0],_],g=e.length===3;g&&(!s&&e[2].dims.length===1?w.push(e[2].reshape([e[2].dims[0],1,1])):w.push(e[2])),t.compute(su(w,n,i,p,h,f,g,m),{inputs:w})},hu=(t,e)=>{let r=e.format==="NHWC",n=[t.inputs[0].reshape(r?[t.inputs[0].dims[0],1,t.inputs[0].dims[1],t.inputs[0].dims[2]]:[t.inputs[0].dims[0],t.inputs[0].dims[1],1,t.inputs[0].dims[2]]),t.inputs[1].reshape([t.inputs[1].dims[0],t.inputs[1].dims[1],1,t.inputs[1].dims[2]])];t.inputs.length===3&&n.push(t.inputs[2]);let s=e.kernelShape;(s.length===0||s[0]===0)&&(s=[t.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=e.strides;(a.length===0||a[0]===0)&&(a=[1]);let o=e.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],a=[1].concat(a),i=[1].concat(i),s=[1].concat(s);let l=Cs({...e,pads:o,strides:a,dilations:i,kernelShape:s},n);t.compute(Ms(n,l,u=>r?[u[0],u[2],u[3]]:[u[0],u[1],u[3]]))},fu=(t,e)=>{du(t.inputs,e),t.inputs[0].dims.length===3?hu(t,e):pu(t,t.inputs,e)}}),mu,gu,_u,Kf=z(()=>{q(),Z(),me(),K(),mu=(t,e,r,n)=>{let s=M.size(e),i=e.length,a=C("input",t,i),o=F("output",t,i),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),u=M.normalizeAxis(l,i),d=c=>{let p=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,h=G("uniforms.input_shape","uniforms.axis",i),f=n.reverse?p+(n.exclusive?" + 1":""):"0",m=n.reverse?h:p+(n.exclusive?"":" + 1");return`
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
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},{type:12,data:u},...D(e,e)]}),getShaderSource:d}},gu=(t,e)=>{let r=t.inputs[0].dims,n=t.inputs[0].dataType,s=t.inputs[1];t.compute(mu(n,r,s,e),{inputs:[0]})},_u=t=>{let e=t.exclusive===1,r=t.reverse===1;return se({exclusive:e,reverse:r})}}),wu,yu,bu,vu,$u,Qf=z(()=>{q(),Z(),me(),K(),wu=t=>{if(!t||t.length!==1)throw new Error("DepthToSpace requires 1 input.");if(t[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},yu=(t,e,r,n)=>{let s=[];s.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<e;++i)s.push(r.indicesSet("a",t[i],`i[${i}]`));return s.push("return a;}"),s.join(`
`)},bu=(t,e)=>{let r,n,s,i,a,o,l=e.format==="NHWC",u=e.blocksize,d=e.mode==="DCR";l?([r,n,s,i]=t.dims,a=d?[r,n,s,u,u,i/u**2]:[r,n,s,i/u**2,u,u],o=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,s,i]=[t.dims[0],t.dims[2],t.dims[3],t.dims[1]],a=d?[r,u,u,i/u**2,n,s]:[r,i/u**2,u,u,n,s],o=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=t.reshape(a),p=c.dims.length,h=t.dataType,f=C("a",h,p),m=F("output",h,p),_=w=>`
  ${w.registerUniform("output_size","u32").declareVariables(f,m)}

  ${yu(o,p,f,m)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",f.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${t.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:w=>{let g=l?[r,n*u,s*u,i/u**2]:[r,i/u**2,n*u,s*u],b=M.size(g),y=c.dims,v=M.sortBasedOnPerm(y,o);return{outputs:[{dims:g,dataType:w[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...D(y,v)]}},getShaderSource:_}},vu=(t,e)=>{wu(t.inputs),t.compute(bu(t.inputs[0],e))},$u=t=>se({blocksize:t.blocksize,mode:t.mode,format:t.format})}),Yr,Kt,zs,xu,ku,Su,Eu,As,Tu,Iu,Mu,Xf=z(()=>{q(),Z(),me(),K(),Yr="[a-zA-Z]|\\.\\.\\.",Kt="("+Yr+")+",zs="^"+Kt+"$",xu="("+Kt+",)*"+Kt,ku="^"+xu+"$",Su=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,e){let r=this.symbolToIndices.get(t);r===void 0?r=[e]:r.push(e),this.symbolToIndices.set(t,r)}},Eu=class{constructor(t,e){this.equation=e,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,n]=e.includes("->")?e.split("->",2):[e,""];if(!r.match(RegExp(ku)))throw new Error("Invalid LHS term");if(r.split(",").forEach((s,i)=>{let a=t[i].dims.slice();if(!s.match(RegExp(zs)))throw new Error("Invalid LHS term");let o=this.processTerm(s,!0,a,i);this.lhs.push(o)}),n==="")n+=[...this.symbolToInfo.entries()].filter(([s,i])=>i.count===1||s==="...").map(([s])=>s).join("");else if(!n.match(RegExp(Kt)))throw new Error("Invalid RHS");n.match(RegExp(Yr,"g"))?.forEach(s=>{if(s==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let i=this.symbolToInfo.get(s);if(i===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(i.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(t,e,r){let n=this.symbolToInfo.get(t);if(n!==void 0){if(n.dimValue!==e&&n.count!==1)throw new Error("Dimension mismatch");n.count++,n.inputIndices.push(r)}else n={count:1,dimValue:e,inputIndices:[r]};this.symbolToInfo.set(t,n)}processTerm(t,e,r,n=-1){let s=r.length,i=!1,a=[],o=0;if(!t.match(RegExp(zs))&&!e&&t!=="")throw new Error("Invalid LHS term");let l=t.match(RegExp(Yr,"g")),u=new Su(n);return l?.forEach((d,c)=>{if(d==="..."){if(i)throw new Error("Only one ellipsis is allowed per input term");i=!0;let p=s-l.length+1;if(p<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(o,o+p),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(e)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let h=0;h<a.length;h++){let f=String.fromCharCode(48+h);u.addSymbol(f,c+h),this.addSymbol(f,r[o++],n)}}else u.addSymbol(d,c+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(d,r[o++],n)}),u}},As=t=>t+"_max",Tu=(t,e,r,n)=>{let s=t.map(u=>u.length).map((u,d)=>C(`input${d}`,e,u)),i=M.size(n),a=F("output",e,n.length),o=[...r.symbolToInfo.keys()].filter(u=>!r.rhs.symbolToIndices.has(u)),l=u=>{let d=[],c="var prod = 1.0;",p="var sum = 0.0;",h="sum += prod;",f=[],m=[],_=[],w=[],g=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((y,v)=>{if(r.rhs.symbolToIndices.has(v)){let S=r.rhs.symbolToIndices.get(v)?.[0];S!==void 0&&r.lhs.forEach((k,I)=>{if(y.inputIndices.includes(I)){let B=k.symbolToIndices.get(v);if(B===void 0)throw new Error("Invalid symbol error");B.forEach(P=>{d.push(`${s[I].indicesSet(`input${I}Indices`,P,a.indicesGet("outputIndices",S))}`)})}})}else r.lhs.forEach((S,k)=>{if(y.inputIndices.includes(k)){let I=S.symbolToIndices.get(v);if(I===void 0)throw new Error("Invalid symbol error");I.forEach(B=>{f.push(`${s[k].indicesSet(`input${k}Indices`,B,`${v}`)}`)}),w.push(`prod *= ${s[k].getByIndices(`input${k}Indices`)};`)}}),m.push(`for(var ${v}: u32 = 0; ${v} < uniforms.${As(v)}; ${v}++) {`),_.push("}")});let b=g?[...d,`let sum = ${s.map((y,v)=>y.getByIndices(`input${v}Indices`)).join(" * ")};`]:[...d,p,...m,...f,c,...w,h,..._];return`
            ${u.registerUniforms(o.map(y=>({name:`${As(y)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...s,a)}

            ${u.mainStart()}
            ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${s.map((y,v)=>`var input${v}Indices: ${s[v].type.indices};`).join(`
`)}
            ${b.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:t.map(()=>"rank")},getRunData:()=>{let u=o.filter(c=>r.symbolToInfo.has(c)).map(c=>({type:12,data:r.symbolToInfo.get(c)?.dimValue||0}));u.push({type:12,data:i});let d=t.map((c,p)=>[...D(c)]).reduce((c,p)=>c.concat(p),u);return d.push(...D(n)),{outputs:[{dims:n,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:d}},getShaderSource:l}},Iu=(t,e)=>{let r=new Eu(t.inputs,e.equation),n=r.outputDims,s=t.inputs.map((i,a)=>i.dims);t.compute(Tu(s,t.inputs[0].dataType,r,n))},Mu=t=>{let e=t.equation.replace(/\s+/g,"");return se({equation:e})}}),Cu,Ps,zu,Au,Pu,Yf=z(()=>{q(),Z(),K(),Cu=t=>{if(!t||t.length!==2)throw new Error("Expand requires 2 input.");let e=t[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),n=r.length<e.length?0:r.length-e.length,s=e.length<r.length?0:e.length-r.length;for(;n<r.length&&s<e.length;++n,++s)if(r[n]!==e[s]&&r[n]!==1&&e[s]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Ps=(t,e)=>{let r=t.length-e.length,n=[];for(let s=0;s<r;++s)n.push(t[s]);for(let s=0;s<e.length;++s)n.push(e[s]===1?t[s+r]:e[s]);return n},zu=(t,e)=>t.length>e.length?Ps(t,e):Ps(e,t),Au=t=>{let e=t[0].dims,r=Array.from(t[1].getBigInt64Array(),Number),n=zu(e,r),s=t[0].dataType,i=s===9?4:1,a=Math.ceil(M.size(n)/i),o=u=>{let d=C("input",s,e.length,i),c=F("output",s,n.length,i),p;if(s===9){let h=(f,m,_="")=>`
          let outputIndices${m} = ${c.offsetToIndices(`outputOffset + ${m}u`)};
          let offset${m} = ${d.broadcastedIndicesToOffset(`outputIndices${m}`,c)};
          let index${m} = offset${m} / 4u;
          let component${m} = offset${m} % 4u;
          ${f}[${m}] = ${_}(${d.getByOffset(`index${m}`)}[component${m}]);
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
    ${p}`},l=[{type:12,data:a},...D(e,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:o,getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},Pu=t=>{Cu(t.inputs),t.compute(Au(t.inputs),{inputs:[0]})}}),Ou,Bu,Zf=z(()=>{q(),Z(),K(),_s(),Ou=t=>{let e=t[0].dataType,r=M.size(t[0].dims),n=M.size(t[1].dims),s=n%4===0,i=a=>{let o=C("x",e,[1],4),l=C("bias",e,[1],4),u=F("y",e,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=h=>`
      let bias${h}_offset: u32 = (global_idx * 4 + ${h}) % uniforms.bias_size;
      let bias${h} = ${l.getByOffset(`bias${h}_offset / 4`)}[bias${h}_offset % 4];`,p=s?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(d).declareVariables(o,l,u)}

    ${ms(Te(e))}

    ${a.mainStart(zt)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${u.setByOffset("global_idx",gs("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/zt/4)}})}},Bu=t=>{t.inputs.length<2||M.size(t.inputs[1].dims)===0?kl(t):t.compute(Ou(t.inputs))}}),Ru,Du,Lu,Fu,Jf=z(()=>{q(),Z(),me(),K(),Ru=t=>{if(!t||t.length!==2)throw new Error("Gather requires 2 inputs.")},Du=(t,e)=>{let r=t[0].dims,n=t[1].dims,s=r.length,i=M.normalizeAxis(e.axis,s),a=r.slice(0);a.splice(i,1,...n);let o=r[i],l=t[0].dataType===9?4:1,u=Math.ceil(M.size(a)/l),d=[{type:12,data:u},{type:6,data:o},{type:12,data:i},...D(t[0].dims,t[1].dims,a)],c=p=>{let h=C("data",t[0].dataType,t[0].dims.length,l),f=C("inputIndices",t[1].dataType,t[1].dims.length),m=F("output",t[0].dataType,a.length,l),_=g=>{let b=n.length,y=`var indicesIndices${g}  = ${f.type.indices}(0);`;for(let v=0;v<b;v++)y+=`${b>1?`indicesIndices${g}[${v}]`:`indicesIndices${g}`} = ${a.length>1?`outputIndices${g}[uniforms.axis + ${v}]`:`outputIndices${g}`};`;y+=`
          var idx${g} = ${f.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${h.type.indices};
        `;for(let v=0,S=0;v<s;v++)v===i?(y+=`${s>1?`dataIndices${g}[${v}]`:`dataIndices${g}`} = u32(idx${g});`,S+=b):(y+=`${s>1?`dataIndices${g}[${v}]`:`dataIndices${g}`} = ${a.length>1?`outputIndices${g}[${S}]`:`outputIndices${g}`};`,S++);return y},w;if(t[0].dataType===9){let g=(b,y,v="")=>`
          let outputIndices${y} = ${m.offsetToIndices(`outputOffset + ${y}u`)};
          ${_(y)};
          let offset${y} = ${h.indicesToOffset(`dataIndices${y}`)};
          let index${y} = offset${y} / 4u;
          let component${y} = offset${y} % 4u;
          ${b}[${y}] = ${v}(${h.getByOffset(`index${y}`)}[component${y}]);
        `;w=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${m.setByOffset("global_idx","value")}
      `}else w=`
      let outputIndices = ${m.offsetToIndices("global_idx")};
      ${_("")};
      let value = ${h.getByIndices("dataIndices")};
      ${m.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,f,m)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${w}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c}},Lu=t=>se({axis:t.axis}),Fu=(t,e)=>{let r=t.inputs;Ru(r),t.compute(Du(t.inputs,e))}}),Nu,Uu,qu,Vu,em=z(()=>{q(),Z(),me(),K(),Nu=t=>{if(!t||t.length!==2)throw new Error("GatherElements requires 2 inputs.");if(t[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(t[0].dims.length!==t[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Uu=(t,e)=>{let r=t[0].dims,n=t[0].dataType,s=r.length,i=t[1].dims,a=t[1].dataType,o=M.normalizeAxis(e.axis,s),l=r[o],u=i.slice(0),d=M.size(u),c=C("input",n,s),p=C("indicesInput",a,i.length),h=F("output",n,u.length),f=[{type:12,data:d},{type:6,data:l},{type:12,data:o}];return f.push(...D(r,i,u)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:m=>`
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
  }`}},qu=t=>se({axis:t.axis}),Vu=(t,e)=>{let r=t.inputs;Nu(r),t.compute(Uu(t.inputs,e))}}),Gu,ju,Wu,Hu,tm=z(()=>{q(),Z(),K(),Gu=t=>{if(!t)throw new Error("Input is missing");if(t.length<2||t.length>3)throw new Error("Invaid input number.");if(t.length===3&&t[2].dims.length>2)throw new Error("Invalid input shape of C");if(t[0].dataType!==t[1].dataType||t.length===3&&t[0].dataType!==t[2].dataType)throw new Error("Input types are mismatched")},ju=(t,e)=>{let r=t[0].dims.slice(),n=t[1].dims.slice(),[s,i,a]=Ia.getShapeOfGemmResult(r,e.transA,n,e.transB,t.length===3?t[2].dims:void 0),o=[s,i];if(!o)throw new Error("Can't use gemm on the given tensors");let l=M.size(o),u=[{type:12,data:l},{type:12,data:s},{type:12,data:i},{type:12,data:a},{type:1,data:e.alpha},{type:1,data:e.beta}],d=["type","type"];t.length===3&&(u.push(...D(t[2].dims)),d.push("rank")),u.push(...D(o));let c=p=>{let h="";e.transA&&e.transB?h="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?h="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?h="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(h="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let f=e.alpha===1?"":"value *= uniforms.alpha;",m=C("a",t[0].dataType,t[0].dims),_=C("b",t[1].dataType,t[1].dims),w=m.type.value,g=null,b=[m,_];t.length===3&&(g=C("c",t[2].dataType,t[2].dims.length),b.push(g));let y=F("output",t[0].dataType,o.length);b.push(y);let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${p.registerUniforms(v).declareVariables(...b)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${w}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${h}
    }

    ${f}
    ${g!=null?`let cOffset = ${g.broadcastedIndicesToOffset("vec2(m, n)",y)}; value += ${w}(uniforms.beta) * ${g.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`};return{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:c}},Wu=t=>{let e=t.transA,r=t.transB,n=t.alpha,s=t.beta;return{transA:e,transB:r,alpha:n,beta:s,cacheKey:`${t.transA};${t.transB};${t.alpha===1}`}},Hu=(t,e)=>{Gu(t.inputs),t.compute(ju(t.inputs,e))}}),ke,Ku,Qu,Os,Xu,Qt,Yu,Zu=z(()=>{q(),Z(),me(),ts(),hs(),K(),Pt(),ke=(t,e)=>t.length>e&&t[e].dims.length>0&&M.size(t[e].dims)>0?t[e]:void 0,Ku=(t,e)=>{let r=t[0],n=ke(t,1),s=ke(t,2),i=ke(t,3),a=ke(t,4),o=ke(t,5),l=ke(t,6),u=ke(t,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=!1,c=r.dims[0],p=r.dims[1],h=r.dims.length===3?d?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],f=p,m=0,_=0,w=Math.floor(h/e.numHeads);if(l&&u){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==w)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==w)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==u.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(u.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=l.dims[2],_=l.dims[2]}else if(l||u)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');g=2,f=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==e.numHeads||n.dims[3]!==2||n.dims[4]!==w)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw new Error('Expect "value" be none when "key" has packed kv format.');g=5,f=n.dims[1]}else{if(n.dims[1]!==e.numHeads||n.dims[3]!==w)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=0,f=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}if(i){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(s&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=0;if(a){b=8;let I=a.dims;throw I.length===1?I[0]===c?b=1:I[0]===3*c+2&&(b=3):I.length===2&&I[0]===c&&I[1]===f&&(b=5),b===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, kv_sequence_length)'):new Error("Mask not supported")}let y=!1,v=h;if(s){if(s.dims.length!==3&&s.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(s.dims.length===3){if(f!==s.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=s.dims[2]}else{if(f!==s.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');v=s.dims[1]*s.dims[3],y=!0}}let S=m+f,k=!1;if(a)throw new Error("Key padding mask is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "relative_position_bias" is expected to have 4 dimensions');if(o.dims[0]!==c&&o.dims[0]!==1||o.dims[1]!==e.numHeads||o.dims[2]!==p||o.dims[3]!==S)throw new Error('Input "relative_position_bias" shape (batch_size, 1, sequence_length, kv_sequence_length)')}return{batchSize:c,sequenceLength:p,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:S,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:h,vHiddenSize:v,headSize:w,vHeadSize:Math.floor(v/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:b,scale:e.scale,broadcastResPosBias:k,passPastInKv:y,qkvFormat:g}},Qu=t=>se({...t}),Os=se({perm:[0,2,1,3]}),Xu=(t,e,r,n,s,i,a)=>{let o=[n,s,i],l=M.size(o),u=[{type:12,data:l},{type:12,data:a},{type:12,data:i}],d=c=>{let p=F("qkv_with_bias",e.dataType,o),h=C("qkv",e.dataType,o),f=C("bias",r.dataType,o),m=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(m).declareVariables(h,f,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return t.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:d},{inputs:[e,r],outputs:[-1]})[0]},Qt=(t,e,r,n,s,i,a,o)=>{let l=i;if(a){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Xu(t,i,a,e,n,r*s,o),l=l.reshape([e,n,r,s]),t.compute(Xe(l,Os.perm),{inputs:[l],outputs:[-1]})[0]}else return i.dims.length===3&&(l=i.reshape([e,n,r,s])),t.compute(Xe(l,Os.perm),{inputs:[l],outputs:[-1]})[0]},Yu=(t,e)=>{let r=Ku(t.inputs,e),n=t.inputs[0],s=ke(t.inputs,1),i=ke(t.inputs,2),a=ke(t.inputs,3),o=ke(t.inputs,4),l=ke(t.inputs,5),u=ke(t.inputs,6),d=ke(t.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(s?.dims.length===5)throw new Error("Packed KV is not implemented");let c=s&&i&&s.dims.length===4&&i.dims.length===4,p=Qt(t,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(c)return Ht(t,p,s,i,o,void 0,u,d,l,r,e);if(!s||!i)throw new Error("key and value must be provided");let h=Qt(t,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,s,a,r.hiddenSize),f=Qt(t,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Ht(t,p,h,f,o,void 0,u,d,l,r,e)}}),Bs,Ju,ed,Rs,td,rd=z(()=>{q(),Z(),K(),Bs=t=>Array.from(t.getBigInt64Array(),Number),Ju=t=>{if(!t||t.length!==2)throw new Error("Tile requires 2 inputs.");if(t[0].dataType!==1&&t[0].dataType!==6&&t[0].dataType!==12)throw new Error("Tile only support float, int32, and uint32 data types");if(t[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(t[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Bs(t[1]).length!==t[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},ed=(t,e)=>{let r=[];for(let n=0;n<t.length;++n)r.push(t[n]*e[n]);return r},Rs=(t,e)=>{let r=t[0].dims,n=e??Bs(t[1]),s=ed(r,n),i=M.size(s),a=t[0].dataType,o=C("input",a,r.length),l=F("output",a,s.length),u=d=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...D(t[0].dims,s)]}),getShaderSource:u}},td=t=>{Ju(t.inputs),t.compute(Rs(t.inputs),{inputs:[0]})}}),nd,Ds,sd,id,Ls,ad,rm=z(()=>{q(),Z(),me(),hs(),K(),Zu(),rd(),Pt(),nd=(t,e)=>{let r=t[0],n=t[1],s=t[2],i=t[3],a=t[4];if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,l=r.dims[0],u=r.dims[1],d=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:e.numHeads*r.dims[4],c=u,p=0,h=0,f=Math.floor(d/e.numHeads),m=i&&i.dims.length!==0,_=a&&a.dims.length!==0,w=!0;if(m&&_){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=i.dims[1],h=i.dims[1]}else if(m||_)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g;if(n){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');g=2,c=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==e.numHeads||n.dims[3]!==2||n.dims[4]!==f)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw new Error('Expect "value" be none when "key" has packed kv format.');g=5,c=n.dims[1]}else{if(n.dims[1]!==e.numHeads||n.dims[3]!==f)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');g=0,c=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==e.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let b=0,y=!1,v=d;if(s){if(s.dims.length!==3&&s.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==s.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(s.dims.length===3){if(c!==s.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=s.dims[2]}else{if(c!==s.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');v=s.dims[1]*s.dims[3],y=!0}}let S=p+c;return{batchSize:l,sequenceLength:u,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:S,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:d,vHiddenSize:v,headSize:f,vHeadSize:Math.floor(v/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:e.scale,broadcastResPosBias:!1,passPastInKv:y,qkvFormat:g,isPastkvBSNH:w}},Ds=(t,e,r,n)=>{let s=[n.batchSize,n.totalSequenceLength,n.kvNumHeads,n.headSize],i=4,a=M.size(s)/i,o=n.totalSequenceLength,l=F("present_kv",r,s.length,i),u=C("new_kv",t.dataType,t.dims.length,i),d=e?C("past_kv",e.dataType,e.dims.length,i):void 0,c=Math.ceil(n.headSize/i),p={x:o,y:t.dims[0],z:1},h=e?["rank","rank"]:["rank"],f=[{type:12,data:a},{type:12,data:n.pastSequenceLength},{type:12,data:n.kvSequenceLength},{type:12,data:n.totalSequenceLength}],m=[u];d?(f.push(...D(t.dims),...D(e.dims),...D(s)),m.push(d)):f.push(...D(t.dims),...D(s));let _=[{name:"output_size",type:"u32"},{name:"past_seqlen",type:"u32"},{name:"new_seqlen",type:"u32"},{name:"present_seqlen",type:"u32"}],w=`      let past_batch_stride = uniforms.past_seqlen * num_heads * H;
        var past_head_stride = uniforms.past_seqlen * H;
        if (is_bsnh) {
          past_head_stride = H;
        }
        let in_offset = b * past_batch_stride + s * row_stride + n * past_head_stride + h;
        present_kv[out_offset] = past_kv[in_offset];`,g=`      let new_batch_stride = uniforms.new_seqlen * num_heads * H;
        let new_row_stride = num_heads * H;
        let new_head_stride = H;
        let in_offset = b * new_batch_stride + (s - past_seqlen) * new_row_stride + n * new_head_stride + h;
        present_kv[out_offset] = new_kv[in_offset];`,b=e?`if (s < past_seqlen) {
        ${w}
        } else if (s < past_seqlen + uniforms.new_seqlen) {
        ${g}
        }`:`if (s < past_seqlen + uniforms.new_seqlen) {
          ${g}
        }`,y=v=>`

  ${v.registerUniforms(_).declareVariables(...m,l)}
  ${v.mainStart([c,n.kvNumHeads,1])}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
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
    ${b}
  }`;return{name:"ConcatPastNew",shaderCache:{hint:`${n.kvNumHeads}${c}${!!e}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:s,dataType:r}],dispatchGroup:p,programUniforms:f}),getShaderSource:y}},sd=t=>se({...t}),id=se({perm:[0,2,1,3]}),Ls=(t,e,r,n,s)=>{let i=e,a=n.kvNumHeads,o=n.nReps;return e.dims.length===3&&n.kvSequenceLength!==0&&(i=e.reshape([n.batchSize,n.kvSequenceLength,a,n.headSize])),r?i=t.compute(Ds(i,r,i.dataType,n),{inputs:[i,r],outputs:[n.isPastkvBSNH?s:-1]})[0]:i=t.compute(Ds(i,void 0,i.dataType,n),{inputs:[i],outputs:[n.isPastkvBSNH?s:-1]})[0],o!==1&&(i=t.compute(Rs([i],[1,1,1,o]),{inputs:[i],outputs:[-1]})[0],i=i.reshape([n.batchSize,n.totalSequenceLength,a*o,n.headSize])),t.compute(Xe(i,id.perm),{inputs:[i],outputs:[-1]})[0]},ad=(t,e)=>{let r=nd(t.inputs,e);if(t.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(t.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=Qt(t,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.inputs[0],void 0,0),s=t.inputs[3]&&t.inputs[3].dims.length!==0?t.inputs[3]:void 0,i=t.inputs[4]&&t.inputs[4].dims.length!==0?t.inputs[4]:void 0,a=Ls(t,t.inputs[1],s,r,1),o=Ls(t,t.inputs[2],i,r,2);Ht(t,n,a,o,void 0,void 0,void 0,void 0,void 0,r,e)}}),od,ld,ud,dd,nm=z(()=>{q(),Z(),K(),od=(t,e)=>{let r=t[0].dims,n=r,s=2,i=M.sizeToDimension(r,s),a=M.sizeFromDimension(r,s),o=he(a),l=a/o,u=[r[0],r[1],l],d=["rank","type","type"],c=[{type:12,data:a},{type:12,data:l}];c.push(...D(u,u));let p=h=>{let f=C("x",t[0].dataType,u.length,o),m=C("scale",t[1].dataType,t[1].dims),_=C("bias",t[2].dataType,t[2].dims),w=F("output",t[0].dataType,u.length,o),g=[f,m,_,w],b=f.type.value,y=o===1?"f32":`vec${o}<f32>`,v=64,S=[{name:"normSize",type:"u32"},{name:"normPackedSize",type:"u32"}];return`
  var<workgroup> meanShared : f32;
  var<workgroup> squaredNormShared : f32;
  var<workgroup> workgroupShared : array<${y}, ${v}>;
  const workgroupSize = ${v}u;
  ${h.registerUniforms(S).declareVariables(...g)}
  ${h.mainStart(v)}
    let norm = global_idx / workgroupSize;
    let batch = norm / uniforms.x_shape[1];
    let channel = norm % uniforms.x_shape[1];
    let localIndex = local_id.x;

    // initialize workgroup memory
    var initial = ${y}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      initial = initial + ${y}(${f.get("batch","channel","h")});
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
      meanShared = ${at("workgroupShared[0]",o)} / f32(uniforms.normSize);
    }
    workgroupBarrier();

    // reinitialize workgroup memory.
    initial = ${y}(0);
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let deviation =  ${y}(${f.get("batch","channel","h")}) - ${y}(meanShared);
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
      squaredNormShared = ${at("workgroupShared[0]",o)};
    }
    workgroupBarrier();

    let invStdDev = inverseSqrt(squaredNormShared / f32(uniforms.normSize) + f32(${e.epsilon}));
    let channelScale = invStdDev * f32(${m.getByOffset("channel")});
    let channelShift = f32(${_.getByOffset("channel")}) - meanShared * channelScale;
    for (var h = localIndex; h < uniforms.normPackedSize; h += workgroupSize) {
      let value = ${f.get("batch","channel","h")} * ${b}(${y}(channelScale)) + ${b}(${y}(channelShift));
      ${w.set("batch","channel","h","value")};
    }
  }`};return{name:"InstanceNormalization",shaderCache:{hint:`${e.epsilon};${o}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:i},programUniforms:c}),getShaderSource:p}},ld=(t,e,r,n,s,i,a,o)=>{let l=he(a),u=64,d=l===1?"vec2f":`mat2x${l}f`,c=l===1?"f32":`vec${l}f`,p=(S,k)=>`${d}(${S}, ${k})`,h=s*a/l,f=Math.ceil(i/u),m=["type"],_=[{type:12,data:f},{type:12,data:i},{type:12,data:Math.floor(a/l)},{type:12,data:Math.floor(i*a/l)}],w=S=>{let k=C("input",e.dataType,e.dims,l);return`
  ${S.declareVariables(k)}
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
    var sum = ${wt("f32",l)};
    var squaredSum = ${wt("f32",l)};
    for (var i: u32 = wgOffset; i < wgMax; i++) {
        let value = ${c}(input[offset + i * uniforms.C]);
        sum += value;
        squaredSum += value * value;
    }
    output[global_idx] = ${p("sum","squaredSum")};
  }`},g=t.compute({name:"InstanceNormComputeMean",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:[s,a,u,2],dataType:1}],dispatchGroup:{x:s*a/l},programUniforms:_}),getShaderSource:w},{inputs:[e],outputs:[-1]})[0],b=[{type:12,data:h},{type:12,data:i},{type:12,data:Math.floor(a/l)},{type:12,data:Math.floor(u*a/l)}],y=["type","type","type"],v=S=>{let k=C("scale",r.dataType,r.dims,l),I=C("bias",n.dataType,n.dims,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${d}>;
  @group(0) @binding(1) var<storage, read> scale : array<${k.type.storage}>;
  @group(0) @binding(2) var<storage, read> bias : array<${I.type.storage}>;
  @group(0) @binding(3) var<storage, read_write> output : array<${d}>;
  struct Uniforms {units_of_work : u32, H: u32, C : u32, image_size : u32};
  @group(0) @binding(4) var<uniform> uniforms: Uniforms;

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.units_of_work")}
    let currentImageNumber = global_idx / uniforms.C;
    let currentChannelNumber = global_idx % uniforms.C;

    let offset = currentImageNumber * uniforms.image_size;
    var sum = ${wt("f32",l)};
    var squaredSum = ${wt("f32",l)};
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
  }`};return t.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${o}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:[s,a,2],dataType:1}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:b}),getShaderSource:v},{inputs:[g,r,n],outputs:[-1]})[0]},ud=(t,e,r)=>{let n=e[0].dims,s=n,i=n[0],a=n[n.length-1],o=M.sizeFromDimension(n,1)/a,l=he(a),u=M.size(s)/l,d=[{type:12,data:o},{type:12,data:Math.floor(a/l)}],c=["type","type"],p=ld(t,e[0],e[1],e[2],i,o,a,r.epsilon),h=f=>{let m=_e(e[0].dataType),_=l===1?"vec2f":`mat2x${l}f`,w=l===1?m:`vec${l}<${m}>`,g=C("input",e[0].dataType,e[0].dims,l),b=F("output",e[0].dataType,s,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${g.type.storage}>;
  @group(0) @binding(1) var<storage, read> scaleInput : array<${_}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${b.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${f.mainStart()}
    let currentImageNumber = global_idx / (uniforms.C * uniforms.H);
    let currentChannelNumber = global_idx % uniforms.C;

    let scaleOffset = currentImageNumber * uniforms.C + currentChannelNumber;
    let scale = scaleInput[scaleOffset];
    output[global_idx] = fma(input[global_idx], ${w}(scale[0]), ${w}(scale[1]));
  }`};t.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:h},{inputs:[e[0],p]})},dd=(t,e)=>{e.format==="NHWC"?ud(t,t.inputs,e):t.compute(od(t.inputs,e))}}),cd,pd,hd,sm=z(()=>{q(),Z(),K(),cd=t=>{if(!t||t.length<2)throw new Error("layerNorm requires at least 2 inputs.")},pd=(t,e,r)=>{let n=e.simplified,s=t[0].dims,i=t[1],a=!n&&t[2],o=s,l=M.normalizeAxis(e.axis,s.length),u=M.sizeToDimension(s,l),d=M.sizeFromDimension(s,l),c=M.size(i.dims),p=a?M.size(a.dims):0;if(c!==d||a&&p!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let h=[];for(let v=0;v<s.length;++v)v<l?h.push(s[v]):h.push(1);let f=he(d),m=["type","type"],_=[{type:12,data:u},{type:1,data:d},{type:12,data:Math.floor(d/f)},{type:1,data:e.epsilon}];a&&m.push("type");let w=r>1,g=r>2,b=v=>{let S=_e(t[0].dataType),k=[C("x",t[0].dataType,t[0].dims,f),C("scale",i.dataType,i.dims,f)];a&&k.push(C("bias",a.dataType,a.dims,f)),k.push(F("output",t[0].dataType,o,f)),w&&k.push(F("mean_data_output",1,h)),g&&k.push(F("inv_std_output",1,h));let I=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${v.registerUniforms(I).declareVariables(...k)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${wt("f32",f)};
    var mean_square_vector = ${wt("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${At(S,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${at("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${at("mean_square_vector",f)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${At(S,f,"x[j + offset]")};
      let f32scale = ${At(S,f,"scale[j]")};
      output[j + offset] = ${k[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${At(S,f,"bias[j]")}`:""}
      );
    }

    ${w?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},y=[{dims:o,dataType:t[0].dataType}];return w&&y.push({dims:h,dataType:1}),g&&y.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${r};${n}`,inputDependencies:m},getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:_}),getShaderSource:b}},hd=(t,e)=>{cd(t.inputs),t.compute(pd(t.inputs,e,t.outputCount))}}),fd,md,gd,_d,im=z(()=>{q(),Z(),me(),K(),fd=(t,e)=>{if(t.length<3||t.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=t[0],n=r.dims.length;if(r.dims[n-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let s=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,a=t[1];if(!M.areEqual(a.dims,[e.n,s,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=t[2].dims;if(M.size(o)!==e.n*s)throw new Error("scales input size error.");if(t.length===4){let l=t[3].dims,u=e.bits>4?e.n*s:e.n*Math.floor((s+1)/2);if(M.size(l)!==u)throw new Error("zeroPoints input size error.")}},md=(t,e,r,n)=>{let s=t[0].dims,i=s.length,a=Math.floor((e.k+e.blockSize-1)/e.blockSize),o=s[i-2],l=e.k,u=e.n,d=s.slice(0,i-2),c=M.size(d),p=e.blockSize/8*e.bits/4,h=t[0].dataType,f=he(o),m=he(e.k),_=he(p),w=jt(h),g=o*a*w,b=Math.floor(n/g),y=a<=r[0]&&b>0,v=!y||b>=4?he(u):b>=2&&he(u)>=2?2:1,S=d.concat([o,u]),k=M.size(S)/v/f,I=y?[]:[{type:12,data:k},{type:12,data:e.blockSize}],B=[c,o,l/m],P=M.convertShape(t[1].dims).slice();P.splice(-1,1,p/_),I.push(...D(B)),I.push(...D(P)),I.push(...D(t[2].dims)),t.length===4&&I.push(...D(M.convertShape(t[3].dims)));let U=[c,o,u/v];I.push(...D(U));let H=j=>{let N=B.length,x=C("a",t[0].dataType,N,m),T=C("b",12,P.length,_),O=C("scales",t[2].dataType,t[2].dims.length),J=[x,T,O],L=t.length===4?C("zero_points",12,t[3].dims.length):void 0;L&&J.push(L);let X=U.length,E=F("output",t[0].dataType,X,v),R=[{name:"output_size",type:"u32"},{name:"block_size",type:"u32"}],Y=_e(t[0].dataType),fe=(()=>{switch(m){case 1:return`array<${Y}, 8>`;case 2:return`mat4x2<${Y}>`;case 4:return`mat2x4<${Y}>`;default:throw new Error(`${m}-component is not supported.`)}})(),we=`
        for (var word: u32 = 0; word < ${p}; word += ${_}) {
          ${T.indicesSet("b_indices","2","word")};
          let b_data = ${T.getByIndices("b_indices")};
          for (var i: u32 = 0; i < ${_}; i++) {
            let b_value: u32 = ${_===1?"b_data":"b_data[word + i]"};
            let b_mask: u32 = 0x0F0F0F0Fu;
            let b_value_lower: vec4<u32> = unpack4xU8(b_value & b_mask);
            let b_value_upper: vec4<u32> = unpack4xU8((b_value >> 4) & b_mask);
            let b_quantized_values = ${fe}(${Array.from({length:4},(dt,Ee)=>`${Y}(b_value_lower[${Ee}]), ${Y}(b_value_upper[${Ee}])`).join(", ")});
            let b_dequantized_values = ${m===1?`${fe}(${Array.from({length:8},(dt,Ee)=>`(b_quantized_values[${Ee}] - zero_point) * scale`).join(", ")});`:`(b_quantized_values - ${fe}(${Array(8).fill("zero_point").join(",")})) * scale;`};
            // Number of B elements per 32-bit word is 32/bits = 32/4 = 8
            for (var m: u32 = 0; m < ${y?o:f}u; m++) {
              ${x.indicesSet("a_indices",N-2,y?"m":`row * ${f} + m`)};
              ${x.indicesSet("a_indices",N-1,"word_offset")};
              var input_offset = ${x.indicesToOffset("a_indices")};
              var a_data: ${fe};
              for (var j: u32 = 0; j < ${8/m}; j++) {
                a_data[j] = ${x.getByOffset("input_offset")};
                input_offset++;
              }
              ${y?"workgroup_shared[workgroup_shared_offset + m]":"output_values[m]"}${v>1?"[c]":""} += ${Array.from({length:8/m},(dt,Ee)=>`${m===1?`a_data[${Ee}] * b_dequantized_values[${Ee}]`:`dot(a_data[${Ee}], b_dequantized_values[${Ee}])`}`).join(" + ")};
            }
            word_offset += ${8/m};
          }
        }`,st=L?`
          zero_point_offset += 4;
          if (zero_point_offset == 32) {
            zero_point_offset = 0;
            zero_point_index++;
            zero_point_word = ${L.getByOffset("zero_point_index")};
          }`:"";return y?`
        var<workgroup> workgroup_shared: array<${E.type.value}, ${o*a}>;
        ${j.declareVariables(...J,E)}
        ${j.mainStart([a,1,1])}
          var a_indices: ${x.type.indices};
          var block = local_id.x;
          var col = workgroup_id.y;
          var batch = workgroup_id.z;
          ${x.indicesSet("a_indices","0","batch")};
          // Two zero points are packed into one byte when uniforms.bits is 4.
          for (var c: u32 = 0; c < ${v}; c++) {
            let col_times_components_plus_c = col * ${v} + c;
              ${L?`
            var zero_point_bytes_per_col: u32 = (${a} + 1) / 2;
            var zero_point_byte_count: u32 = col_times_components_plus_c * zero_point_bytes_per_col + (block >> 0x1u);
            var zero_point_word_index: u32 = zero_point_byte_count >> 0x2u;
            var zero_point_byte_offset: u32 = zero_point_byte_count & 0x3u;
            var zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32 = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            var zero_point_word: u32 = ${L.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;`:""}
            var b_indices: ${T.type.indices};
            ${T.indicesSet("b_indices","0","col_times_components_plus_c")};
            // The scale and zero points are computed per block.
            var scales_index = col_times_components_plus_c * ${a} + block;
            let scale = ${O.getByOffset("scales_index")};
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Y}(${L?"(zero_point_word) & 0xFu":8});
            ${T.indicesSet("b_indices","1","block")};
            var word_offset: u32 = block * ${e.blockSize/m};
            var workgroup_shared_offset: u32 = block * ${o};
            ${we}
          }
          workgroupBarrier();
          var output_indices: ${E.type.indices};
          var elements_per_thread: u32 = ${Math.ceil(o/a)};
          ${E.indicesSet("output_indices","0","batch")};
          ${E.indicesSet("output_indices",X-1,"col")};
          ${E.indicesSet("output_indices",X-2,"local_id.x * elements_per_thread")};
          var output_offset = ${E.indicesToOffset("output_indices")};
          for (var m: u32 = 0u; m < elements_per_thread; m++) {
            var row = m + local_id.x * elements_per_thread;
            if (row < ${o}) {
              var output_value: ${E.type.value} = ${E.type.value}(0);
              var workgroup_shared_offset: u32 = row;
              for (var b: u32 = 0u; b < ${a}u; b++) {
                output_value += workgroup_shared[workgroup_shared_offset];
                workgroup_shared_offset += ${o};
              }
              ${E.setByOffset("output_offset","output_value")};
              output_offset += ${u/v};
            }
          }
        }`:`
        ${j.registerUniforms(R).declareVariables(...J,E)}
        ${j.mainStart()}
          ${j.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var output_values: array<${E.type.value}, ${f}>;
          var output_indices = ${E.offsetToIndices("global_idx")};
          var col = ${E.indicesGet("output_indices",X-1)};
          var row = ${E.indicesGet("output_indices",X-2)};
          var a_indices: ${x.type.indices} = output_indices;
          // Two zero points are packed into one byte because uniforms.bits <= 4.
          // zero_point_offset is either 0 or 4. It is bit offset within one byte.
          // TODO support zero_point_offset for bits > 4
          ${L?`
          var zero_point_abs_offset = col * ${v} * ((${a} + 1) / 2);
          var zero_point_index: u32 = zero_point_abs_offset / 4;
          var zero_point_word: u32 = ${L.getByOffset("zero_point_index")};
          var zero_point_offset: u32 = (zero_point_abs_offset % 4) * 8;`:""}
          var scale_index = col * ${a*v};
          var b_indices: ${T.type.indices};
          for (var c: u32 = 0; c < ${v}; c++) {
            ${T.indicesSet("b_indices","0",`col * ${v} + c`)};
            var block_offset: u32 = 0;
            for (var block: u32 = 0; block < ${a}; block++) {
              // The scale and zero points are computed per block.
              let scale = ${O.getByOffset("scale_index")};
              // The default zero point is 8 for unsigned 4-bit quantization.
              let zero_point = ${Y}(${L?"extractBits(zero_point_word, zero_point_offset, 4)":8});
              ${T.indicesSet("b_indices","1","block")};
              var word_offset: u32 = block_offset;
              ${we}
              scale_index++;
              ${st}
              block_offset += uniforms.block_size / ${m};
            }
            // Drop the trailing 4 bits if the zero_poit_offset is not a byte boundary to align with the next byte.
            ${L?`if (zero_point_offset % 8 > 0) {
                ${st}
              }`:""}
            }
            for (var k: u32 = 0u; k < ${f}u; k++) {
              ${E.indicesSet("output_indices",X-2,`${f} * row + k`)};
              ${E.setByIndices("output_indices","output_values[k]")}
            }
        }`};return{name:y?"BlockwiseMatMulNBits":"MatMulNBits",shaderCache:{hint:`${e.cacheKey};${o};${h};${t.length}`,inputDependencies:Array(t.length).fill("rank")},getRunData:()=>({outputs:[{dims:S,dataType:h}],name:y?"BlockwiseMatMulNBits":"MatMulNBits",dispatchGroup:y?{x:1,y:Math.ceil(u/v),z:c}:{x:Math.ceil(k/64)},programUniforms:I}),getShaderSource:H}},gd=(t,e)=>{fd(t.inputs,e);let r=t.getMaxComputeWorkgroupSizes(),n=t.getMaxComputeWorkgroupStoragesize();t.compute(md(t.inputs,e,r,n))},_d=t=>se(t)}),wd,yd,bd,vd,$d,xd,kd,Sd,Ed,am=z(()=>{q(),Z(),K(),wd=t=>{if(!t||t.length<1)throw new Error("Too few inputs");if(t[0].dataType!==1&&t[0].dataType!==10)throw new Error("Input type must be float or float16.");if(t.length>=2){let e=t[0].dims.length*2===t[1].dims[0];if(t.length===4&&(e=t[3].dims[0]*2===t[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},yd=(t,e,r)=>{let n="";for(let s=e-1;s>=0;--s)n+=`
            k = i32(${t.indicesGet("indices",s)}) - ${G("uniforms.pads",s,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${G("uniforms.x_shape",s,e)})) {
              break;
            }
            offset += k * i32(${G("uniforms.x_strides",s,e)});
        `;return`
          value = ${t.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},bd=(t,e,r)=>{let n="";for(let s=e-1;s>=0;--s)n+=`
                k = i32(${t.indicesGet("indices",s)}) - ${G("uniforms.pads",s,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${G("uniforms.x_shape",s,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${G("uniforms.x_shape",s,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${G("uniforms.x_strides",s,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},vd=(t,e,r)=>{let n="";for(let s=e-1;s>=0;--s)n+=`
                k = i32(${t.indicesGet("indices",s)}) - ${G("uniforms.pads",s,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${G("uniforms.x_shape",s,e)})) {
                  k = i32(${G("uniforms.x_shape",s,e)}) - 1;
                }
                offset += k * i32(${G("uniforms.x_strides",s,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},$d=(t,e,r)=>{let n="";for(let s=e-1;s>=0;--s)n+=`
                k = i32(${t.indicesGet("indices",s)}) - ${G("uniforms.pads",s,r)};
                if (k < 0)  {
                  k += i32(${G("uniforms.x_shape",s,e)}]);
                }
                if (k >= i32(${G("uniforms.x_shape",s,e)})) {
                  k -= i32(${G("uniforms.x_shape",s,e)});
                }
                offset += k * i32(${G("uniforms.x_strides",s,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},xd=(t,e,r)=>{switch(r.mode){case 0:return yd(t,e,r.pads.length);case 1:return bd(t,e,r.pads.length);case 2:return vd(t,e,r.pads.length);case 3:return $d(t,e,r.pads.length);default:throw new Error("Invalid mode")}},kd=(t,e)=>{let r=M.padShape(t[0].dims.slice(),e.pads),n=t[0].dims,s=M.size(r),i=[{type:12,data:s},{type:6,data:e.pads}];e.mode===0&&i.push({type:t[0].dataType,data:e.value}),i.push(...D(t[0].dims,r));let a=["rank"],o=l=>{let u=F("output",t[0].dataType,r.length),d=C("x",t[0].dataType,n.length),c=d.type.value,p=xd(u,n.length,e),h=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&h.push({name:"constant_value",type:c}),`
            ${l.registerUniforms(h).declareVariables(d,u)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${u.offsetToIndices("global_idx")};

            var value = ${c}(0);
            ${p}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(M.size(r)/64)},programUniforms:i}),getShaderSource:o}},Sd=(t,e)=>{if(t.length>1){let r=t[1].getBigInt64Array(),n=t.length>=3&&t[2].data?t[2].getFloat32Array()[0]:0,s=t[0].dims.length,i=new Int32Array(2*s).fill(0);if(t.length>=4){let o=t[3].getBigInt64Array();for(let l=0;l<o.length;l++)i[Number(o[l])]=Number(r[l]),i[Number(o[l])+s]=Number(r[l+o.length])}else r.forEach((o,l)=>i[Number(l)]=Number(o));let a=[];return i.forEach(o=>a.push(o)),{mode:e.mode,value:n,pads:a}}else return e},Ed=(t,e)=>{wd(t.inputs);let r=Sd(t.inputs,e);t.compute(kd(t.inputs,r),{inputs:[0]})}}),Xt,Fs,Ns,Us,qs,Td,Id,Vs,Gs,Md,Cd,js,zd,Ad,Ws,Pd,Od,Bd,Rd,om=z(()=>{Ue(),q(),Z(),K(),Xt=t=>{if(ne.webgpu.validateInputContent&&(!t||t.length!==1))throw new Error("Pool ops requires 1 input.")},Fs=(t,e,r)=>{let n=e.format==="NHWC",s=t.dims.slice();n&&s.splice(1,0,s.pop());let i=Object.hasOwnProperty.call(e,"dilations"),a=e.kernelShape.slice(),o=e.strides.slice(),l=i?e.dilations.slice():[],u=e.pads.slice();Fr.adjustPoolAttributes(r,s,a,o,l,u);let d=Fr.computePoolOutputShape(r,s,o,l,a,u,e.autoPad),c=Object.assign({},e);i?Object.assign(c,{kernelShape:a,strides:o,pads:u,dilations:l,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:a,strides:o,pads:u,cacheKey:e.cacheKey});let p=d.slice();return p.push(p.splice(1,1)[0]),[c,n?p:d]},Ns=(t,e)=>{let r=e.format==="NHWC",n=M.size(t),s=M.size(e.kernelShape),i=[{type:12,data:n},{type:12,data:s}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let o=e.kernelShape[e.kernelShape.length-1],l=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],d=e.pads[e.pads.length-1],c=!!(u+d);i.push({type:12,data:o},{type:12,data:l},{type:12,data:u},{type:12,data:d}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(e.kernelShape.length===2){let h=e.kernelShape[e.kernelShape.length-2],f=e.strides[e.strides.length-2],m=e.pads[e.pads.length/2-2],_=e.pads[e.pads.length-2];p=!!(m+_),i.push({type:12,data:h},{type:12,data:f},{type:12,data:m},{type:12,data:_}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,c,p]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=M.computeStrides(e.kernelShape);i.push({type:12,data:o},{type:12,data:e.pads},{type:12,data:e.strides}),a.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let l=e.pads.reduce((u,d)=>u+d);return[i,a,!!l,!1,!1]}},Us=(t,e,r,n,s,i,a,o,l,u,d,c)=>{let p=s.format==="NHWC",h=e.type.value,f=F("output",e.type.tensor,n);if(s.kernelShape.length<=2){let m="",_="",w="",g=r-(p?2:1);if(d?m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:m=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,s.kernelShape.length===2){let b=r-(p?3:2);c?_=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${b}] < 0 || xIndices[${b}] >= uniforms.x_shape[${b}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:_=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sh - uniforms.phStart + j;
                `,w=`
              }
            `}return`
            ${t.registerUniforms(l).declareVariables(e,f)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var value = ${h}(${o});
              var pad = 0;
              ${_}
              ${m}
              ${w}
              ${a}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let m=s.kernelShape.length,_=s.pads.length,w="";return u?w=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:w=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${t.registerUniforms(l).declareVariables(e,f)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${f.offsetToIndices("global_idx")};
              var xIndices = ${f.offsetToIndices("global_idx")};

              var offsets: array<u32, ${m}>;

              var value = ${h}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${m-1}u; j++) {
                  offsets[j] = offset / ${G("uniforms.kernelStrides","j",m)};
                  offset -= offsets[j] * ${G("uniforms.kernelStrides","j",m)};
                }
                offsets[${m-1}] = offset;

                isPad = false;
                for (var j = ${r-m}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${G("uniforms.strides",`j - ${r-m}u`,m)}
                    + offsets[j - ${r-m}u] - ${G("uniforms.pads","j - 2u",_)};
                  ${w}
              }
              ${a}

              output[global_idx] = value;
            }`}},qs=t=>`${t.format};${t.ceilMode};${t.autoPad};${t.kernelShape.length}`,Td=t=>`${qs(t)};${t.countIncludePad}`,Id=t=>`${qs(t)};${t.storageOrder};${t.dilations}`,Vs=t=>({format:t.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],ceilMode:t.ceil_mode,kernelShape:t.kernel_shape,strides:t.strides,pads:t.pads}),Gs=(t,e,r,n)=>{let[s,i]=Fs(e,n,r),a=C("x",e.dataType,e.dims.length),o=a.type.value,l="value += x_val;",u="";s.countIncludePad?u+=`value /= ${o}(uniforms.kernelSize);`:u+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[d,c,p,h,f]=Ns(i,s);d.push(...D(e.dims,i));let m=["rank"];return{name:t,shaderCache:{hint:`${n.cacheKey};${p};${h};${f}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(M.size(i)/64)},programUniforms:d}),getShaderSource:_=>Us(_,a,e.dims.length,i.length,s,l,u,0,c,p,h,f)}},Md=t=>{let e=t.count_include_pad!==0,r=Vs(t);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:e,...r,cacheKey:""};return{...n,cacheKey:Td(n)}},Cd=(t,e)=>{Xt(t.inputs),t.compute(Gs("AveragePool",t.inputs[0],!1,e))},js={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},zd=t=>{let e=t.format;return{format:e,...js,cacheKey:e}},Ad=(t,e)=>{Xt(t.inputs),t.compute(Gs("GlobalAveragePool",t.inputs[0],!0,e))},Ws=(t,e,r,n)=>{let[s,i]=Fs(e,n,r),a=`
      value = max(x_val, value);
    `,o="",l=C("x",e.dataType,e.dims.length),u=["rank"],[d,c,p,h,f]=Ns(i,s);return d.push(...D(e.dims,i)),{name:t,shaderCache:{hint:`${n.cacheKey};${p};${h};${f}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(M.size(i)/64)},programUniforms:d}),getShaderSource:m=>Us(m,l,e.dims.length,i.length,s,a,o,e.dataType===10?-65504:-1e5,c,p,h,f)}},Pd=(t,e)=>{Xt(t.inputs),t.compute(Ws("MaxPool",t.inputs[0],!1,e))},Od=t=>{let e=t.storage_order,r=t.dilations,n=Vs(t);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let s={storageOrder:e,dilations:r,...n,cacheKey:""};return{...s,cacheKey:Id(s)}},Bd=t=>{let e=t.format;return{format:e,...js,cacheKey:e}},Rd=(t,e)=>{Xt(t.inputs),t.compute(Ws("GlobalMaxPool",t.inputs[0],!0,e))}}),Dd,Ld,Fd,lm=z(()=>{Ue(),q(),K(),Dd=(t,e,r)=>{let n=t===e,s=t<e&&r<0,i=t>e&&r>0;if(n||s||i)throw new Error("Range these inputs' contents are invalid.")},Ld=(t,e,r,n)=>{let s=Math.abs(Math.ceil((e-t)/r)),i=[s],a=s,o=[{type:12,data:a},{type:n,data:t},{type:n,data:r},...D(i)],l=u=>{let d=F("output",n,i.length),c=d.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${u.registerUniforms(p).declareVariables(d)}
        ${u.mainStart()}
        ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:o})}},Fd=t=>{let e=0,r=0,n=0;t.inputs[0].dataType===6?(e=t.inputs[0].getInt32Array()[0],r=t.inputs[1].getInt32Array()[0],n=t.inputs[2].getInt32Array()[0]):t.inputs[0].dataType===1&&(e=t.inputs[0].getFloat32Array()[0],r=t.inputs[1].getFloat32Array()[0],n=t.inputs[2].getFloat32Array()[0]),ne.webgpu.validateInputContent&&Dd(e,r,n),t.compute(Ld(e,r,n,t.inputs[0].dataType),{inputs:[]})}}),Nd,Ud,qd,Vd,Gd,jd,Wd,Hd,Kd,Qd,Xd,Hs,Yd,Zd,Jd,ec,tc,rc,nc,um=z(()=>{q(),Z(),me(),K(),Nd=(t,e)=>{if(t.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),t.length>0){if(e.mode==="linear"){if(!(t.length===2||t.length===3||t.length===4&&t[0]===1&&t[1]===1||t.length===4&&t[0]===1&&t[3]===1||t.length===5&&t[0]===1&&t[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(t.length===2||t.length===4&&t[0]===1&&t[1]===1||t.length===4&&t[0]===1&&t[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ud=(t,e,r)=>{e.every(s=>s>=0&&s<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return e.forEach((s,i)=>n[s]=t[i]),n},qd=(t,e,r,n,s,i)=>{let[a,o,l]=r>10?[1,2,3]:[-1,t.length>1?1:-1,-1],u=t[0].dims.length;if(a>0&&t.length>a&&t[a].dims.length>0)t[a].getFloat32Array().forEach(d=>i.push(d));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&t.length>o&&t[o].dims.length>0){if(t[o].getFloat32Array().forEach(d=>n.push(d)),n.length!==0&&n.length!==u&&r>=18&&n.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Nd(n,e),e.axes.length>0&&Ud(n,e.axes,u).forEach((d,c)=>n[c]=d)}if(l>0&&t.length>l&&(t[l].getBigInt64Array().forEach(d=>s.push(Number(d))),s.length!==u||r>=18&&s.length===e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(n.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(s.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof s<"u"&&n.length>0&&s.length>u)throw new Error("Resize requires only of scales or sizes to be specified")},Vd=(t,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(t){case"asymmetric":return`return ${e}(xResized) / ${e}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${e}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${e}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${e}(lengthResized - 1);
                    return whole + fract;
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${e}(roiStart) * ${e}(lengthOriginal - 1) +
                        (${e}(xResized) * ${e}(roiEnd - roiStart) * ${e}(lengthOriginal - 1)) /
                        ${e}(lengthResized - 1);
                  } else {
                    return 0.5 * ${e}(roiStart + roiEnd) * ${e}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${e}xScale * ${e}(lengthResized);
                  const adjustment = ${e}(lengthResized) / outputWidth;
                  const center = ${e}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${t} is not supported`)}})()+"}",Gd=(t,e,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(t){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${t} is not supported`)}})()+"}",jd=(t,e,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),s=t.length===0?n:t.slice();return e.length>0?(e.forEach((i,a)=>{n[i]=s[a],n[a+r]=s[e.length+a]}),n):s},Wd=(t,e,r,n)=>{let s=[];if(r.length>0)if(n.length>0){if(t.forEach(i=>s.push(i)),Math.max(...n)>t.length)throw new Error("axes is out of bound");n.forEach((i,a)=>s[i]=r[a])}else r.forEach(i=>s.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");s=t.map((i,a)=>Math.round(i*e[a]))}return s},Hd=(t,e,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let s=t.slice();return r.axes.length>0?(r.axes.forEach(i=>e[i]=n),r.axes.forEach(i=>s[i]=Math.round(t[i]*e[i]))):(e.fill(n,0,e.length),s.forEach((i,a)=>s[a]=Math.round(i*e[a]))),s},Kd=(t,e,r,n,s)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> array<${t.type.value}, ${r.length}> {
      var original_indices: array<${t.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var scale = ${G("uniforms.scales","i",n)};
        var roi_low = ${G("uniforms.roi","i",s)};
        var roi_hi = ${G("uniforms.roi",`i + ${e.length}`,s)};
        if (scale == 1.0) {
          original_indices[i] = ${t.type.value}(output_index);
        } else {
          var input_shape_i = ${G("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${G("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Qd=(t,e,r,n,s,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${t.type.indices} {
      var input_indices: ${t.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${G("uniforms.scales","i",s)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${G("uniforms.roi","i",i)};
          var roi_hi = ${G("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${G("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${G("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${e.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${t.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,Xd=(t,e)=>`
    fn checkInputIndices(input_indices: ${t.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${t.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${G("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,Hs=(t,e,r,n)=>t.rank>n?`
    ${t.indicesSet("input_indices",e,"channel")};
    ${t.indicesSet("input_indices",r,"batch")};
`:"",Yd=(t,e,r,n,s)=>{let[i,a,o,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],u=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${u} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",a,`max(0, min(row, ${r[a]} - 1))`)};
      ${t.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${Hs(t,l,i,2)}
      return ${t.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${u} {
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
    }`},Zd=(t,e,r,n,s,i,a,o,l,u)=>{let d=r.length===2,[c,p]=d?[0,1]:[2,3],h=t.type.value,f=m=>{let _=m===c?"row":"col";return`
      fn ${_}CubicInterpolation(input_indices: ${t.type.indices}, output_indices: ${e.type.indices}) -> ${h} {
        var output_index = ${e.indicesGet("output_indices",m)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${s[m]},
        ${n[m]}, ${r[m]}, ${i[m]}, ${i[m]} + ${r.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[m]} - 1))) {
          return ${l};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${_}: ${h} = originalIdx + ${h}(i);
          if (${_} < 0 || ${_} >= ${r[m]}) {
            ${u?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${l};`:`${_} = max(0, min(${_}, ${r[m]} - 1));`};
          }
        var input_indices_copy: ${t.type.indices} = input_indices;
          ${t.indicesSet("input_indices_copy",m,`u32(${_})`)};
          data[i + 1] = ${m===c?t.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
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

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${h} {
    var input_indices: ${t.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Jd=(t,e,r,n,s)=>{let[i,a,o,l,u]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],d=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",a,`max(0, min(depth, ${r[a]} - 1))`)};
      ${t.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${t.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${Hs(t,u,i,3)}
      return ${t.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${d} {
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
    }`},ec=(t,e,r,n,s,i)=>{let a=t.dims,o=jd(i,e.axes,a.length),l=Wd(a,n,s,e.axes),u=n.slice();n.length===0&&(u=a.map((g,b)=>g===0?1:l[b]/g),e.keepAspectRatioPolicy!=="stretch"&&(l=Hd(a,u,e)));let d=F("output",t.dataType,l.length),c=C("input",t.dataType,a.length),p=M.size(l),h=a.length===l.length&&a.every((g,b)=>g===l[b]),f=e.coordinateTransformMode==="tf_crop_and_resize",m=e.extrapolationValue,_=c.type.value,w=g=>`
      ${h?"":`
      ${Vd(e.coordinateTransformMode,_)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${Xd(c,a)};
              ${Gd(e.nearestMode,r,_)};
              ${Qd(c,d,a,l,u.length,o.length,f)};
              `;case"linear":return`
              ${Kd(d,a,l,u.length,o.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Yd(c,d,a,f,m)}`;if(a.length===3||a.length===5)return`${Jd(c,d,a,f,m)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Zd(c,d,a,l,u,o,e.cubicCoeffA,f,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",u.length).registerUniform("roi","f32",o.length).declareVariables(c,d)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${h?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${r}|${u.length>0?u:""}|${s.length>0?s:""}|${o.length>0?o:""}|${h}|${a}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:l,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:u},{type:1,data:o},...D(a,l)]})}},tc=t=>{let e=t.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},rc=(t,e)=>{let r=[],n=[],s=[],i=tc(t);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");qd(t.inputs,e,i,r,n,s),t.compute(ec(t.inputs[0],e,i,r,n,s),{inputs:[0]})},nc=t=>{let e=t.antialias,r=t.axes,n=t.coordinateTransformMode,s=t.cubicCoeffA,i=t.excludeOutside!==0,a=t.extrapolationValue,o=t.keepAspectRatioPolicy,l=t.mode,u=t.nearestMode===""?"simple":t.nearestMode;return se({antialias:e,axes:r,coordinateTransformMode:n,cubicCoeffA:s,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:o,mode:l,nearestMode:u})}}),sc,ic,ac,dm=z(()=>{q(),Z(),me(),K(),sc=(t,e)=>{let[r,n,s,i]=t,{numHeads:a,rotaryEmbeddingDim:o}=e;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!M.areEqual(n.dims,[])&&!M.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!M.areEqual(s.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],u=r.dims[r.dims.length-2],d=s.dims[0],c=M.sizeFromDimension(r.dims,1)/u,p=o===0?s.dims[1]*2:c/a;if(o>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(l!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(u!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(p/2!==s.dims[1]&&o/2!==s.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${s.dims[1]}`);if(u>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},ic=(t,e)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:s,scale:i}=e,a=t[0].dims[0],o=M.sizeFromDimension(t[0].dims,1),l=t[0].dims[t[0].dims.length-2],u=o/l,d=t[2].dims[1],c=s===0?d*2:u/n,p=new Array(a,l,u/c,c-d),h=M.computeStrides(p),f=[{type:1,data:i},{type:12,data:p},{type:12,data:h},...t[0].dims.length===3?new Array({type:12,data:[o,u,c,1]}):[],...t[0].dims.length===4?new Array({type:12,data:[o,c,l*c,1]}):[],...D(t[0].dims,t[1].dims,t[2].dims,t[3].dims,t[0].dims)],m=_=>{let w=C("input",t[0].dataType,t[0].dims.length),g=C("position_ids",t[1].dataType,t[1].dims.length),b=C("cos_cache",t[2].dataType,t[2].dims.length),y=C("sin_cache",t[3].dataType,t[3].dims.length),v=F("output",t[0].dataType,t[0].dims.length);return _.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:h.length},{name:"input_output_strides",type:"u32",length:h.length}]),`
        ${_.declareVariables(w,g,b,y,v)}

        ${_.mainStart(zt)}
          let half_rotary_emb_dim = uniforms.${b.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",F("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${w.getByOffset("i")} * ${b.get("position_id","bsnh[3]")} -
                ${w.getByOffset("j")} * ${y.get("position_id","bsnh[3]")};
            ${v.setByOffset("i","re")}
            let im = ${w.getByOffset("i")} * ${y.get("position_id","bsnh[3]")} +
                ${w.getByOffset("j")} * ${b.get("position_id","bsnh[3]")};
            ${v.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${v.setByOffset("k",w.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:se({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(M.size(p)/zt)},programUniforms:f})}},ac=(t,e)=>{sc(t.inputs,e),t.compute(ic(t.inputs,e))}}),oc,lc,uc,cm=z(()=>{q(),Z(),K(),oc=t=>{if(!t||t.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=t[0],r=t[1],n=t[2];if(e.dataType!==r.dataType||e.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let s=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(r.dims[r.dims.length-1]!==s)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==s)throw new Error("Gamma must have the same hidden size as input");if(t.length>3){let a=t[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==s)throw new Error("Beta must have the same hidden size as input")}if(t.length>4){let a=t[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==s)throw new Error("Bias must have the same hidden size as input")}},lc=(t,e,r,n)=>{let s=e.simplified,i=t[0].dims,a=M.size(i),o=i,l=a,u=i.slice(-1)[0],d=n?i.slice(0,-1).concat(1):[],c=!s&&t.length>3,p=t.length>4,h=n&&r>1,f=n&&r>2,m=r>3,_=64,w=he(u),g=[{type:12,data:l},{type:12,data:w},{type:12,data:u},{type:1,data:e.epsilon}],b=v=>{let S=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],k=[C("x",t[0].dataType,t[0].dims,w),C("skip",t[1].dataType,t[1].dims,w),C("gamma",t[2].dataType,t[2].dims,w)];c&&k.push(C("beta",t[3].dataType,t[3].dims,w)),p&&k.push(C("bias",t[4].dataType,t[4].dims,w)),k.push(F("output",t[0].dataType,o,w)),h&&k.push(F("mean_output",1,d)),f&&k.push(F("inv_std_output",1,d)),m&&k.push(F("input_skip_bias_sum",t[0].dataType,o,w));let I=_e(t[0].dataType),B=_e(1,w);return`

      ${v.registerUniforms(S).declareVariables(...k)}
      var<workgroup> sum_shared : array<${B}, ${_}>;
      var<workgroup> sum_squared_shared : array<${B}, ${_}>;

      ${v.mainStart([_,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${_};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${_};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${_-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p?"bias[offset1d + i]":I+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${m?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${At(I,w,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${_};
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
        let mean = ${at("sum",w)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${at("square_sum",w)} / f32(uniforms.hidden_size) ${s?"":"- mean * mean"} + uniforms.epsilon);
        ${h?"mean_output[global_idx] = mean;":""}
        ${f?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${s?"":`- ${I}(mean)`}) *
            ${I}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},y=[{dims:o,dataType:t[0].dataType}];return r>1&&y.push({dims:d,dataType:1}),r>2&&y.push({dims:d,dataType:1}),r>3&&y.push({dims:i,dataType:t[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${w};${h};${f};${m}`,inputDependencies:t.map((v,S)=>"type")},getShaderSource:b,getRunData:()=>({outputs:y,dispatchGroup:{x:Math.ceil(l/u)},programUniforms:g})}},uc=(t,e)=>{oc(t.inputs);let r=[0];t.outputCount>1&&r.push(-3),t.outputCount>2&&r.push(-3),t.outputCount>3&&r.push(3),t.compute(lc(t.inputs,e,t.outputCount,!1),{outputs:r})}}),dc,Yt,cc,Ks,pc,hc,fc,mc,pm=z(()=>{q(),Z(),me(),K(),dc=(t,e)=>{if(!t||t.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");t.slice(1).forEach((r,n)=>{if(t[n+1].dataType!==6&&t[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},Yt=(t,e)=>{let r=[];if(t.length>e)if(t[e].dataType===7)t[e].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(t[e].dataType===6)t[e].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return r},cc=(t,e)=>{if(t.length>1){let r=Yt(t,1),n=Yt(t,2),s=Yt(t,3);return s.length===0&&(s=[...Array(t[0].dims.length).keys()]),se({starts:r,ends:n,axes:s})}else return e},Ks=(t,e,r,n,s)=>{let i=t;return t<0&&(i+=r[n[e]]),s[e]<0?Math.max(0,Math.min(i,r[n[e]]-1)):Math.max(0,Math.min(i,r[n[e]]))},pc=(t,e,r)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${t.type.indices} {
          var input_indices: ${t.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${G("uniforms.input_shape","i",r.length)};
            let steps_i = ${G("uniforms.steps","i",r.length)};
            let signs_i = ${G("uniforms.signs","i",r.length)};
            let starts_i = ${G("uniforms.starts","i",r.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${t.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,hc=(t,e)=>{let r=t[0].dims,n=M.size(r),s=e.axes.length>0?M.normalizeAxes(e.axes,r.length):[...Array(r.length).keys()],i=Yt(t,4);i.forEach(w=>w!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(s.length).fill(1));let a=e.starts.map((w,g)=>Ks(w,g,r,s,i)),o=e.ends.map((w,g)=>Ks(w,g,r,s,i));if(s.length!==a.length||s.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(s.length!==r.length)for(let w=0;w<r.length;++w)s.includes(w)||(a.splice(w,0,0),o.splice(w,0,r[w]),i.splice(w,0,1));let l=i.map(w=>Math.sign(w));i.forEach((w,g,b)=>{if(w<0){let y=(o[g]-a[g])/w,v=a[g],S=v+y*i[g];a[g]=S,o[g]=v,b[g]=-w}});let u=r.slice(0);s.forEach((w,g)=>{u[w]=Math.ceil((o[w]-a[w])/i[w])});let d={dims:u,dataType:t[0].dataType},c=F("output",t[0].dataType,u.length),p=C("input",t[0].dataType,t[0].dims.length),h=M.size(u),f=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:i.length}],m=[{type:12,data:h},{type:12,data:a},{type:6,data:l},{type:12,data:i},...D(t[0].dims,u)],_=w=>`
      ${w.registerUniforms(f).declareVariables(p,c)}
        ${pc(p,c,r)}
        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:m})}},fc=(t,e)=>{dc(t.inputs,e);let r=cc(t.inputs,e);t.compute(hc(t.inputs,r),{inputs:[0]})},mc=t=>{let e=t.starts,r=t.ends,n=t.axes;return se({starts:e,ends:r,axes:n})}}),gc,_c,wc,yc,hm=z(()=>{q(),Z(),me(),K(),gc=t=>{if(!t||t.length!==1)throw new Error("Softmax op requires 1 input.")},_c=(t,e)=>{let r=t.dims,n=M.size(r),s=64,i=e.axis;if(i<0&&(i=r.length+i),i<r.length-1)throw new Error("softmax only supports last axis for now.");let a=r[i],o=n/a,l=he(a),u=a/l,d=(_,w)=>w===4?`max(max(${_}.x, ${_}.y), max(${_}.z, ${_}.w))`:w===2?`max(${_}.x, ${_}.y)`:w===3?`max(max(${_}.x, ${_}.y), ${_}.z)`:_,c=C("x",t.dataType,t.dims,l),p=F("result",t.dataType,t.dims,l),h=c.type.value,f=_e(t.dataType)==="f32"?`var threadMax = ${h}(-3.402823e+38f);`:`var threadMax = ${h}(-65504.0h);`,m=_=>`
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
      ${_.registerUniform("packedCols","i32").declareVariables(c,p)}
      ${_.mainStart()}
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
          rowSumShared = ${h}(${at("threadShared[0]",l)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`;return{name:"Softmax",shaderCache:{hint:`${l}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:r,dataType:t.dataType}],dispatchGroup:{x:o},programUniforms:[{type:6,data:u}]}),getShaderSource:m}},wc=(t,e)=>{gc(t.inputs),t.compute(_c(t.inputs[0],e))},yc=t=>se({axis:t.axis})}),bc,vc,$c,xc,kc,Sc,Ec,fm=z(()=>{q(),Z(),me(),K(),bc=t=>{if(!t||t.length<1)throw new Error("too few inputs")},vc=(t,e)=>{let r=[],n=e.numOutputs;return t[1].dims[0]>0&&(t[1].getBigInt64Array().forEach(s=>r.push(Number(s))),n=r.length),se({numOutputs:n,axis:e.axis,splitSizes:r})},$c=t=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${t}u; i += 1u ) {
    if (index < ${G("uniforms.size_in_split_axis","i",t)}) {
        return i;
    }
    }
    return ${t}u;
}`,xc=t=>{let e=t.length,r=[];for(let n=0;n<e;++n){let s=t[n].setByIndices("indices","input[global_idx]");e===1?r.push(s):n===0?r.push(`if (output_number == ${n}u) { ${s} }`):n===e-1?r.push(`else { ${s} }`):r.push(`else if (output_number == ${n}) { ${s} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${t[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},kc=(t,e)=>{let r=t[0].dims,n=M.size(r),s=t[0].dataType,i=M.normalizeAxis(e.axis,r.length),a=new Array(e.numOutputs),o=C("input",s,r.length),l=new Array(e.numOutputs),u=[],d=[],c=0,p=[{type:12,data:n}];for(let f=0;f<e.numOutputs;f++){c+=e.splitSizes[f],l[f]=c;let m=r.slice();m[e.axis]=e.splitSizes[f],d.push(m),a[f]=F(`output${f}`,s,m.length),u.push({dims:d[f],dataType:t[0].dataType})}p.push({type:12,data:l},...D(r,...d));let h=f=>`
  ${f.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(o,...a)}
  ${$c(l.length)}
  ${xc(a)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${G("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${o.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:h,getRunData:()=>({outputs:u,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p})}},Sc=(t,e)=>{bc(t.inputs);let r=t.inputs.length===1?e:vc(t.inputs,e);t.compute(kc(t.inputs,r),{inputs:[0]})},Ec=t=>{let e=t.axis,r=t.splitSizes,n=t.numOutputs<0?r.length:t.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return se({axis:e,numOutputs:n,splitSizes:r})}}),Tc,Ic,Mc,mm=z(()=>{q(),Z(),K(),Tc=(t,e,r,n,s)=>{let i=F("output_data",s,r.length,4),a=C("a_data",e[1].dataType,e[1].dims.length,4),o=C("b_data",e[2].dataType,e[2].dims.length,4),l=C("c_data",e[0].dataType,e[0].dims.length,4),u,d=(c,p,h)=>`select(${p}, ${c}, ${h})`;if(!n)u=i.setByOffset("global_idx",d(a.getByOffset("global_idx"),o.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let c=(p,h,f="")=>{let m=`a_data[index_a${h}][component_a${h}]`,_=`b_data[index_b${h}][component_b${h}]`,w=`bool(c_data[index_c${h}] & (0xffu << (component_c${h} * 8)))`;return`
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
            ${p}[${h}] = ${f}(${d(m,_,w)});
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
        ${t.registerUniform("vec_size","u32").declareVariables(l,a,o,i)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${u}
      }`},Ic=t=>{let e=t[1].dims,r=t[2].dims,n=t[0].dims,s=t[1].dataType,i=!(M.areEqual(e,r)&&M.areEqual(r,n)),a=e,o=M.size(e);if(i){let u=Ct.calcShape(Ct.calcShape(e,r,!1),n,!1);if(!u)throw new Error("Can't perform where op on the given tensors");a=u,o=M.size(a)}let l=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:u=>Tc(u,t,a,i,s),getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:l},...D(n,e,r,a)]})}},Mc=t=>{t.compute(Ic(t.inputs))}}),Cc,gm=z(()=>{Lf(),hs(),Ff(),Nf(),Uf(),qf(),zo(),ru(),Hf(),Kf(),Qf(),Xf(),Yf(),Zf(),Jf(),em(),tm(),rm(),nm(),sm(),Zl(),im(),Zu(),am(),om(),lm(),ds(),um(),dm(),cm(),pm(),hm(),fm(),rd(),Pt(),_s(),mm(),Cc=new Map([["Abs",[Wo]],["Acos",[Ho]],["Acosh",[Ko]],["Add",[Al]],["ArgMax",[So,ps]],["ArgMin",[ko,ps]],["Asin",[Qo]],["Asinh",[Xo]],["Atan",[Yo]],["Atanh",[Zo]],["Attention",[Do]],["AveragePool",[Cd,Md]],["BatchNormalization",[Uo]],["BiasAdd",[Go]],["BiasSplitGelu",[Ml]],["Cast",[el,Jo]],["Ceil",[nl]],["Clip",[rl]],["Concat",[Mo,Co]],["Conv",[Is,Ts]],["ConvTranspose",[fu,uu]],["Cos",[sl]],["Cosh",[il]],["CumSum",[gu,_u]],["DepthToSpace",[vu,$u]],["Div",[Pl]],["Einsum",[Iu,Mu]],["Elu",[al,Gr]],["Equal",[Ol]],["Erf",[ol]],["Exp",[ll]],["Expand",[Pu]],["FastGelu",[Bu]],["Floor",[ul]],["FusedConv",[Is,Ts]],["Gather",[Fu,Lu]],["GatherElements",[Vu,qu]],["Gelu",[dl]],["Gemm",[Hu,Wu]],["GlobalAveragePool",[Ad,zd]],["GlobalMaxPool",[Rd,Bd]],["Greater",[Ll]],["GreaterOrEqual",[Nl]],["GroupQueryAttention",[ad,sd]],["HardSigmoid",[wl,_l]],["InstanceNormalization",[dd]],["LayerNormalization",[hd]],["LeakyRelu",[cl,Gr]],["Less",[Fl]],["LessOrEqual",[Ul]],["Log",[El]],["MatMul",[Yl]],["MatMulNBits",[gd,_d]],["MaxPool",[Pd,Od]],["Mul",[Bl]],["MultiHeadAttention",[Yu,Qu]],["Neg",[hl]],["Not",[pl]],["Pad",[Ed]],["Pow",[Rl]],["Range",[Fd]],["Reciprocal",[fl]],["ReduceMin",[yo]],["ReduceMean",[fo]],["ReduceMax",[wo]],["ReduceSum",[vo]],["ReduceProd",[bo]],["ReduceL1",[mo]],["ReduceL2",[go]],["ReduceLogSum",[xo]],["ReduceLogSumExp",[_o]],["ReduceSumSquare",[$o]],["Relu",[ml]],["Resize",[rc,nc]],["RotaryEmbedding",[ac]],["Sigmoid",[gl]],["Sin",[yl]],["Sinh",[bl]],["Slice",[fc,mc]],["SkipLayerNormalization",[uc]],["Split",[Sc,Ec]],["Sqrt",[vl]],["Softmax",[wc,yc]],["Sub",[Dl]],["Tan",[$l]],["Tanh",[xl]],["ThresholdedRelu",[Sl,Gr]],["Tile",[td]],["Transpose",[Oa,Ba]],["Where",[Mc]]])}),zc,_m=z(()=>{Ue(),_t(),K(),zc=class{constructor(t){this.backend=t,this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,e){this.repo.set(t,e)}run(t,e,r,n,s){Ne(t.programInfo.name);let i=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let u of e)o.push({binding:o.length,resource:{buffer:u.buffer}});for(let u of r)o.push({binding:o.length,resource:{buffer:u.buffer}});s&&o.push({binding:o.length,resource:s});let l=i.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:o,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let u={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:l,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(u)}a.setPipeline(t.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...n),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Be(t.programInfo.name)}dispose(){}build(t,e){Ne(t.name);let r=this.backend.device,n=[];r.features.has("shader-f16")&&n.push("enable f16;");let s=Ca(e,this.backend.device.limits),i=t.getShaderSource(s),a=`${n.join(`
`)}
${s.additionalImplementations}
${i}`,o=r.createShaderModule({code:a,label:t.name});ue("verbose",()=>`[WebGPU] ${t.name} shader code: ${a}`);let l=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:t.name});return Be(t.name),{programInfo:t,computePipeline:l,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let e=typeof t=="number"?t:t.x,r=typeof t=="number"?1:t.y||1,n=typeof t=="number"?1:t.z||1,s=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(e<=s&&r<=s&&n<=s)return[e,r,n];let i=e*r*n,a=Math.ceil(Math.sqrt(i));if(a>s){if(a=Math.ceil(Math.cbrt(i)),a>s)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}}),Ac,Pc,Oc,Bc,wm=z(()=>{Ue(),q(),_t(),Bf(),Rf(),gm(),_m(),Ac=(t,e)=>{if(e.length!==t.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${t.length}.`);let r=[];for(let n=0;n<t.length;++n){let s=t[n].dataType;switch(e[n]){case"none":{r.push("");break}case"type":{r.push(`${s}`);break}case"rank":{let i=t[n].dims.length;r.push(`${s};${i}`);break}case"dims":{let i=t[n].dims.join(",");r.push(`${s};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[n]}`)}}return r.join("|")},Pc=(t,e,r)=>{let n=t.name;return t.shaderCache?.hint&&(n+="["+t.shaderCache.hint+"]"),n+=":"+r+`:${Ac(e,t.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,n},Oc=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Bc=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,e){this.env=t;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:e.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:e.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize,maxBufferSize:e.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:e.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:e.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:e.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:e.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r};e.features.has("chromium-experimental-timestamp-query-inside-passes")?r.push("chromium-experimental-timestamp-query-inside-passes"):e.features.has("timestamp-query")&&r.push("timestamp-query"),e.features.has("shader-f16")&&r.push("shader-f16"),this.device=await e.requestDevice(n),this.adapterInfo=new Oc(await e.requestAdapterInfo()),this.gpuDataManager=Sa(this),this.programManager=new zc(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ya(t.logLevel,!!t.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:e,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),e={};this.queryType==="at-passes"&&(e.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(e)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ne(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let e=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let n=0;n<e.length/2;n++){let s=r[n],i=s.kernelId,a=this.kernels.get(i),o=a.kernelType,l=a.kernelName,u=s.programName,d=s.inputTensorViews,c=s.outputTensorViews,p=e[n*2],h=e[n*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=p);let f=Number(p-this.queryTimeBase),m=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(m))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(_=>({dims:_.dims,dataType:gt(_.dataType)})),outputsMetadata:c.map(_=>({dims:_.dims,dataType:gt(_.dataType)})),kernelId:i,kernelType:o,kernelName:l,programName:u,startTime:f,endTime:m});else{let _="";d.forEach((g,b)=>{_+=`input[${b}]: [${g.dims}] | ${gt(g.dataType)}, `});let w="";c.forEach((g,b)=>{w+=`output[${b}]: [${g.dims}] | ${gt(g.dataType)}, `}),console.log(`[profiling] kernel "${i}|${o}|${l}|${u}" ${_}${w}execution time: ${m-f} ns`)}Vt("GPU",`${u}::${p}::${h}`)}t.unmap(),this.pendingQueries.delete(t)}),Be()}run(t,e,r,n,s,i){Ne(t.name);let a=[];for(let g=0;g<e.length;++g){let b=e[g].data;if(b===0)continue;let y=this.gpuDataManager.get(b);if(!y)throw new Error(`no GPU data for input: ${b}`);a.push(y)}let{outputs:o,dispatchGroup:l,programUniforms:u}=t.getRunData(e),d=r.length===0?o.map((g,b)=>b):r;if(d.length!==o.length)throw new Error(`Output size ${d.length} must be equal to ${o.length}.`);let c=[],p=[];for(let g=0;g<o.length;++g){if(!Number.isInteger(d[g])||d[g]<-3||d[g]>=i)throw new Error(`Invalid output index: ${d[g]}`);if(d[g]===-3)continue;let b=d[g]===-1,y=d[g]===-2,v=b||y?s(o[g].dataType,o[g].dims):n(d[g],o[g].dataType,o[g].dims);if(c.push(v),v.data===0)continue;let S=this.gpuDataManager.get(v.data);if(!S)throw new Error(`no GPU data for output: ${v.data}`);if(b&&this.temporaryData.push(S),y){let k=this.kernelPersistentData.get(this.currentKernelId);k||(k=[],this.kernelPersistentData.set(this.currentKernelId,k)),k.push(S)}p.push(S)}if(a.length!==e.length||p.length!==c.length){if(p.length===0)return Be(t.name),c;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let h;if(u){let g=0,b=[];u.forEach(k=>{let I=typeof k.data=="number"?[k.data]:k.data;if(I.length===0)return;let B=k.type===10?2:4,P,U;k.type===10?(U=I.length>4?16:I.length>2?8:I.length*B,P=I.length>4?16:B*I.length):(U=I.length<=2?I.length*B:16,P=16),g=Math.ceil(g/U)*U,b.push(g);let H=k.type===10?8:4;g+=I.length>4?Math.ceil(I.length/H)*P:I.length*B});let y=16;g=Math.ceil(g/y)*y;let v=new ArrayBuffer(g);u.forEach((k,I)=>{let B=b[I],P=typeof k.data=="number"?[k.data]:k.data;if(k.type===6)new Int32Array(v,B,P.length).set(P);else if(k.type===12)new Uint32Array(v,B,P.length).set(P);else if(k.type===10)new Uint16Array(v,B,P.length).set(P);else if(k.type===1)new Float32Array(v,B,P.length).set(P);else throw new Error(`Unsupported uniform type: ${gt(k.type)}`)});let S=this.gpuDataManager.create(g,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(S.buffer,0,v,0,g),this.gpuDataManager.release(S.id),h={offset:0,size:g,buffer:S.buffer}}let f=this.programManager.normalizeDispatchGroupSize(l),m=f[1]===1&&f[2]===1,_=Pc(t,e,m),w=this.programManager.getArtifact(_);if(w||(w=this.programManager.build(t,f),this.programManager.setArtifact(_,w),ue("info",()=>`[artifact] key: ${_}, programName: ${t.name}`)),u&&w.uniformVariablesInfo){if(u.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${u.length} in program "${w.programInfo.name}".`);for(let g=0;g<u.length;g++){let b=u[g],y=b.type,v=typeof b.data=="number"?1:b.data.length,[S,k]=w.uniformVariablesInfo[g];if(y!==S||v!==k)throw new Error(`Uniform variable ${g} mismatch: expect type ${S} with size ${k}, got type ${y} with size ${v} in program "${w.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${t.name}" (key=${_}) with ${f[0]}x${f[1]}x${f[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let g={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:e,outputTensorViews:c};this.pendingKernels.push(g),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(g)}return this.programManager.run(w,a,p,f,h),Be(t.name),c}upload(t,e){this.gpuDataManager.upload(t,e)}memcpy(t,e){this.gpuDataManager.memcpy(t,e)}async download(t,e){await this.gpuDataManager.download(t,e)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,e,r,n){let s=Cc.get(t);if(!s)throw new Error(`kernel not implemented: ${t}`);let i={kernelType:t,kernelName:n,kernelEntry:s[0],attributes:[s[1],r]};this.kernels.set(e,i)}releaseKernel(t){let e=this.kernelPersistentData.get(t);if(e){for(let r of e)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,e,r){let n=this.kernels.get(t);if(!n)throw new Error(`kernel not created: ${t}`);let s=n.kernelType,i=n.kernelName,a=n.kernelEntry,o=n.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${s}] ${i}" is not allowed to be called recursively`);this.currentKernelId=t,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${s}] ${i}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(e,o[1]),0}catch(u){return r.push(Promise.resolve(`[WebGPU] Kernel "[${s}] ${i}" failed. ${u}`)),1}finally{l&&r.push(this.device.popErrorScope().then(u=>u?`GPU validation error for kernel "[${s}] ${i}": ${u.message}`:null));for(let u of this.temporaryData)this.gpuDataManager.release(u.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,e,r,n){let s=this.sessionExternalDataMapping.get(t);s||(s=new Map,this.sessionExternalDataMapping.set(t,s));let i=s.get(e),a=this.gpuDataManager.registerExternalBuffer(r,n,i?.[1]);return s.set(e,[a,r]),a}unregisterBuffers(t){let e=this.sessionExternalDataMapping.get(t);e&&(e.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[1])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let e=this.gpuDataManager.get(t);if(!e)throw new Error(`no GPU data for buffer: ${t}`);return e.buffer}createDownloader(t,e,r){return async()=>{let n=await ss(this,t,e);return va(n.buffer,r)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),e=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let n=0;n<r;n++){let s=this.getComputePassEncoder(),i=t[n];this.writeTimestamp(this.pendingDispatchNumber*2),s.setPipeline(i.computePipeline),s.setBindGroup(0,i.bindGroup),s.dispatchWorkgroups(...i.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(e[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}}),Rc={};zr(Rc,{init:()=>Lc});var Zr,Dc,Lc,ym=z(()=>{q(),wm(),_t(),Z(),Zr=class Kh{constructor(e,r,n,s){this.module=e,this.dataType=r,this.data=n,this.dims=s}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=M.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=M.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=M.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if(M.size(e)!==M.size(this.dims))throw new Error("Invalid new shape");return new Kh(this.module,this.dataType,this.data,e)}},Dc=class{constructor(t,e,r){this.module=t,this.backend=e,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=e.adapterInfo;let n=t.HEAPU32,s=r>>>2;this.opKernelContext=n[s++];let i=n[s++];this.outputCount=n[s++],this.customDataOffset=n[s++],this.customDataSize=n[s++];let a=[];for(let o=0;o<i;o++){let l=n[s++],u=n[s++],d=n[s++],c=[];for(let p=0;p<d;p++)c.push(n[s++]);a.push(new Zr(t,l,u,c))}this.inputs=a}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}getMaxComputeWorkgroupSizes(){return[this.backend.device.limits.maxComputeWorkgroupSizeX,this.backend.device.limits.maxComputeWorkgroupSizeY,this.backend.device.limits.maxComputeWorkgroupSizeZ]}getMaxComputeWorkgroupStoragesize(){return this.backend.device.limits.maxComputeWorkgroupStorageSize}compute(t,e){let r=e?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,n=e?.outputs??[],s=(a,o,l)=>new Zr(this.module,o,this.output(a,l),l),i=(a,o)=>{let l=jt(a);if(!l)throw new Error(`Unsupported data type: ${a}`);let u=l*M.size(o),d=u>0?this.backend.gpuDataManager.create(u).id:0;return new Zr(this.module,a,d,o)};return this.backend.run(t,r,n,s,i,this.outputCount)}output(t,e){let r=this.module.stackSave();try{let n=this.module.stackAlloc((1+e.length)*4),s=n>>2;this.module.HEAPU32[s++]=e.length;for(let i=0;i<e.length;i++)this.module.HEAPU32[s++]=e[i];return this.module._JsepOutput(this.opKernelContext,t,n)}catch(n){throw new Error(`Failed to generate kernel's output[${t}] with dims [${e}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(r)}}},Lc=async(t,e,r,n)=>{let s=e.jsepInit;if(!s)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(t==="webgpu"){let i=new Bc;await i.initialize(r,n),s("webgpu",[i,a=>i.alloc(a),a=>i.free(a),(a,o,l,u=!1)=>{if(u)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${a}, dst=${o}, size=${l}`),i.memcpy(a,o);else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${a}, gpuDataId=${o}, size=${l}`);let d=e.HEAPU8.subarray(a>>>0,(a>>>0)+l);i.upload(o,d)}},async(a,o,l)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${o}, size=${l}`),await i.download(a,()=>e.HEAPU8.subarray(o>>>0,(o>>>0)+l))},(a,o,l)=>i.createKernel(a,o,l,e.UTF8ToString(e._JsepGetNodeName(o))),a=>i.releaseKernel(a),(a,o,l,u)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${l}, kernel=${a}, contextDataOffset=${o}`);let d=new Dc(e,i,o);return i.computeKernel(a,d,u)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else s("webnn")}}),Fc,Qs,Xs,ot,Nc,Jr,Ys,Zs,Js,ei,ti,ri,Uc=z(()=>{Pf(),Of(),q(),Mt(),Qn(),fa(),Fc=(t,e)=>{pe()._OrtInit(t,e)!==0&&ie("Can't initialize onnxruntime.")},Qs=async t=>{Fc(t.wasm.numThreads,Rr(t.logLevel))},Xs=async(t,e)=>{{let r=(ym(),Cn(Rc)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=t.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let s=t.webgpu.powerPreference;if(s!==void 0&&s!=="low-power"&&s!=="high-performance")throw new Error(`Invalid powerPreference setting: "${s}"`);let i=t.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:s,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",pe(),t,n)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",pe(),t)}}},ot=new Map,Nc=t=>{let e=pe(),r=e.stackSave();try{let n=e.stackAlloc(8);return e._OrtGetInputOutputCount(t,n,n+4)!==0&&ie("Can't get session input/output count."),[e.HEAP32[n/4],e.HEAP32[n/4+1]]}finally{e.stackRestore(r)}},Jr=t=>{let e=pe(),r=e._malloc(t.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${t.byteLength}.`);return e.HEAPU8.set(t,r),[r,t.byteLength]},Ys=async(t,e)=>{let r,n,s=pe();Array.isArray(t)?[r,n]=t:t.buffer===s.HEAPU8.buffer?[r,n]=[t.byteOffset,t.byteLength]:[r,n]=Jr(t);let i=0,a=0,o=0,l=[],u=[],d=[];try{if([a,l]=ha(e),e?.externalData&&s.mountExternalData){let g=[];for(let b of e.externalData){let y=typeof b=="string"?b:b.path;g.push(es(typeof b=="string"?b:b.data).then(v=>{s.mountExternalData(y,v)}))}await Promise.all(g)}i=await s._OrtCreateSession(r,n,a),i===0&&ie("Can't create a session.");let[c,p]=Nc(i),h=!!e?.enableGraphCapture,f=[],m=[],_=[];for(let g=0;g<c;g++){let b=s._OrtGetInputName(i,g);b===0&&ie("Can't get an input name."),u.push(b),f.push(s.UTF8ToString(b))}for(let g=0;g<p;g++){let b=s._OrtGetOutputName(i,g);b===0&&ie("Can't get an output name."),d.push(b);let y=s.UTF8ToString(b);m.push(y);{if(h&&e?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let v=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[y]??"cpu";if(v!=="cpu"&&v!=="cpu-pinned"&&v!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${v}.`);if(h&&v!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${v}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(v)}}let w=null;return _.some(g=>g==="gpu-buffer")&&(o=s._OrtCreateBinding(i),o===0&&ie("Can't create IO binding."),w={handle:o,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(g=>Jn(g))}),ot.set(i,[i,u,d,w,h,!1]),[i,f,m]}catch(c){throw u.forEach(p=>s._OrtFree(p)),d.forEach(p=>s._OrtFree(p)),o!==0&&s._OrtReleaseBinding(o),i!==0&&s._OrtReleaseSession(i),c}finally{s._free(r),a!==0&&s._OrtReleaseSessionOptions(a),l.forEach(c=>s._free(c)),s.unmountExternalData?.()}},Zs=t=>{let e=pe(),r=ot.get(t);if(!r)throw new Error(`cannot release session. invalid session id: ${t}`);let[n,s,i,a,o]=r;a&&(o&&e._OrtClearBoundOutputs(a.handle),e._OrtReleaseBinding(a.handle)),e.jsepOnReleaseSession?.(t),s.forEach(l=>e._OrtFree(l)),i.forEach(l=>e._OrtFree(l)),e._OrtReleaseSession(n),ot.delete(t)},Js=(t,e,r,n,s,i=!1)=>{if(!t){e.push(0);return}let a=pe(),o=t[0],l=t[1],u=t[3],d,c;if(o==="string"&&u==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");if(i&&u!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(u==="gpu-buffer"){let f=t[2].gpuBuffer,m=jt(Xn(o));c=l.reduce((w,g)=>w*g,1)*m;let _=a.jsepRegisterBuffer;if(!_)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');d=_(n,s,f,c)}else{let f=t[2];if(Array.isArray(f)){c=4*f.length,d=a._malloc(c),r.push(d);let m=d/4;for(let _=0;_<f.length;_++){if(typeof f[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);a.HEAPU32[m++]=le(f[_],r)}}else c=f.byteLength,d=a._malloc(c),r.push(d),a.HEAPU8.set(new Uint8Array(f.buffer,f.byteOffset,c),d)}let p=a.stackSave(),h=a.stackAlloc(4*l.length);try{let f=h/4;l.forEach(_=>a.HEAP32[f++]=_);let m=a._OrtCreateTensor(Xn(o),d,c,h,l.length,Jn(u));m===0&&ie(`Can't create tensor for input/output. session=${n}, index=${s}.`),e.push(m)}finally{a.stackRestore(p)}},ei=async(t,e,r,n,s,i)=>{let a=pe(),o=ot.get(t);if(!o)throw new Error(`cannot run inference. invalid session id: ${t}`);let l=o[0],u=o[1],d=o[2],c=o[3],p=o[4],h=o[5],f=e.length,m=n.length,_=0,w=[],g=[],b=[],y=[],v=a.stackSave(),S=a.stackAlloc(f*4),k=a.stackAlloc(f*4),I=a.stackAlloc(m*4),B=a.stackAlloc(m*4);try{[_,w]=la(i);for(let T=0;T<f;T++)Js(r[T],g,y,t,e[T],p);for(let T=0;T<m;T++)Js(s[T],b,y,t,f+n[T],p);let P=S/4,U=k/4,H=I/4,j=B/4;for(let T=0;T<f;T++)a.HEAPU32[P++]=g[T],a.HEAPU32[U++]=u[e[T]];for(let T=0;T<m;T++)a.HEAPU32[H++]=b[T],a.HEAPU32[j++]=d[n[T]];if(c&&!h){let{handle:T,outputPreferredLocations:O,outputPreferredLocationsEncoded:J}=c;if(u.length!==f)throw new Error(`input count from feeds (${f}) is expected to be always equal to model's input count (${u.length}).`);for(let L=0;L<f;L++){let X=e[L];await a._OrtBindInput(T,u[X],g[L])!==0&&ie(`Can't bind input[${L}] for session=${t}.`)}for(let L=0;L<m;L++){let X=n[L];s[L]?.[3]?a._OrtBindOutput(T,d[X],b[L],0)!==0&&ie(`Can't bind pre-allocated output[${L}] for session=${t}.`):a._OrtBindOutput(T,d[X],0,J[X])!==0&&ie(`Can't bind output[${L}] to ${O[L]} for session=${t}.`)}ot.set(t,[l,u,d,c,p,!0])}a.jsepOnRunStart?.(l);let N;c?N=await a._OrtRunWithBinding(l,c.handle,m,I,_):N=await a._OrtRun(l,k,S,f,B,m,I,_),N!==0&&ie("failed to call OrtRun().");let x=[];for(let T=0;T<m;T++){let O=a.HEAPU32[I/4+T];if(O===b[T]){x.push(s[T]);continue}let J=a.stackSave(),L=a.stackAlloc(4*4),X=!1,E,R=0;try{a._OrtGetTensorData(O,L,L+4,L+8,L+12)!==0&&ie(`Can't access output tensor data on index ${T}.`);let Y=L/4,fe=a.HEAPU32[Y++];R=a.HEAPU32[Y++];let we=a.HEAPU32[Y++],st=a.HEAPU32[Y++],dt=[];for(let Ae=0;Ae<st;Ae++)dt.push(a.HEAPU32[we/4+Ae]);a._OrtFree(we);let Ee=dt.reduce((Ae,Pe)=>Ae*Pe,1);E=gt(fe);let Gh=c?.outputPreferredLocations[n[T]];if(E==="string"){if(Gh==="gpu-buffer")throw new Error("String tensor is not supported on GPU.");let Ae=[],Pe=R/4;for(let Ft=0;Ft<Ee;Ft++){let jh=a.HEAPU32[Pe++],A$=Ft===Ee-1?void 0:a.HEAPU32[Pe]-jh;Ae.push(a.UTF8ToString(jh,A$))}x.push([E,dt,Ae,"cpu"])}else if(Gh==="gpu-buffer"&&Ee>0){let Ae=a.jsepGetBuffer;if(!Ae)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Pe=Ae(R),Ft=jt(fe);if(Ft===void 0||!Zn(E))throw new Error(`Unsupported data type: ${E}`);X=!0,x.push([E,dt,{gpuBuffer:Pe,download:a.jsepCreateDownloader(Pe,Ee*Ft,E),dispose:()=>{a._OrtReleaseTensor(O)}},"gpu-buffer"])}else{let Ae=Yn(E),Pe=new Ae(Ee);new Uint8Array(Pe.buffer,Pe.byteOffset,Pe.byteLength).set(a.HEAPU8.subarray(R,R+Pe.byteLength)),x.push([E,dt,Pe,"cpu"])}}finally{a.stackRestore(J),E==="string"&&R&&a._free(R),X||a._OrtReleaseTensor(O)}}return c&&!p&&(a._OrtClearBoundOutputs(c.handle),ot.set(t,[l,u,d,c,p,!1])),x}finally{a.stackRestore(v),g.forEach(P=>a._OrtReleaseTensor(P)),b.forEach(P=>a._OrtReleaseTensor(P)),y.forEach(P=>a._free(P)),_!==0&&a._OrtReleaseRunOptions(_),w.forEach(P=>a._free(P))}},ti=t=>{let e=pe(),r=ot.get(t);if(!r)throw new Error("invalid session id");let n=r[0],s=e._OrtEndProfiling(n);s===0&&ie("Can't get an profile file name."),e._OrtFree(s)},ri=t=>{let e=[];for(let r of t){let n=r[2];!Array.isArray(n)&&"buffer"in n&&e.push(n.buffer)}return e}}),lt,Re,Ot,Zt,Jt,en,ni,tn,xt,kt,qc,Vc,Gc,jc,Wc,Hc,Kc,Qc,Xc=z(()=>{Ue(),Uc(),Mt(),Pr(),lt=()=>!!ne.wasm.proxy&&typeof document<"u",Ot=!1,Zt=!1,Jt=!1,tn=new Map,xt=(t,e)=>{let r=tn.get(t);r?r.push(e):tn.set(t,[e])},kt=()=>{if(Ot||!Zt||Jt||!Re)throw new Error("worker not ready")},qc=t=>{switch(t.data.type){case"init-wasm":Ot=!1,t.data.err?(Jt=!0,ni[1](t.data.err)):(Zt=!0,ni[0]()),en&&(URL.revokeObjectURL(en),en=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=tn.get(t.data.type);t.data.err?e.shift()[1](t.data.err):e.shift()[0](t.data.out);break}}},Vc=async()=>{if(!Zt){if(Ot)throw new Error("multiple calls to 'initWasm()' detected.");if(Jt)throw new Error("previous call to 'initWasm()' failed.");if(Ot=!0,lt())return new Promise((t,e)=>{Re?.terminate(),sa().then(([r,n])=>{try{Re=n,Re.onerror=i=>e(i),Re.onmessage=qc,ni=[t,e];let s={type:"init-wasm",in:ne};Re.postMessage(s),en=r}catch(s){e(s)}},e)});try{await Kn(ne.wasm),await Qs(ne),Zt=!0}catch(t){throw Jt=!0,t}finally{Ot=!1}}},Gc=async t=>{if(lt())return kt(),new Promise((e,r)=>{xt("init-ep",[e,r]);let n={type:"init-ep",in:{epName:t,env:ne}};Re.postMessage(n)});await Xs(ne,t)},jc=async t=>lt()?(kt(),new Promise((e,r)=>{xt("copy-from",[e,r]);let n={type:"copy-from",in:{buffer:t}};Re.postMessage(n,[t.buffer])})):Jr(t),Wc=async(t,e)=>{if(lt()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return kt(),new Promise((r,n)=>{xt("create",[r,n]);let s={type:"create",in:{model:t,options:{...e}}},i=[];t instanceof Uint8Array&&i.push(t.buffer),Re.postMessage(s,i)})}else return Ys(t,e)},Hc=async t=>{if(lt())return kt(),new Promise((e,r)=>{xt("release",[e,r]);let n={type:"release",in:t};Re.postMessage(n)});Zs(t)},Kc=async(t,e,r,n,s,i)=>{if(lt()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(s.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return kt(),new Promise((a,o)=>{xt("run",[a,o]);let l=r,u={type:"run",in:{sessionId:t,inputIndices:e,inputs:l,outputIndices:n,options:i}};Re.postMessage(u,ri(l))})}else return ei(t,e,r,n,s,i)},Qc=async t=>{if(lt())return kt(),new Promise((e,r)=>{xt("end-profiling",[e,r]);let n={type:"end-profiling",in:t};Re.postMessage(n)});ti(t)}}),si,Yc,Zc,bm=z(()=>{Ue(),Xc(),q(),Nn(),fa(),si=(t,e)=>{switch(t.location){case"cpu":return[t.type,t.dims,t.data,"cpu"];case"gpu-buffer":return[t.type,t.dims,{gpuBuffer:t.gpuBuffer},"gpu-buffer"];default:throw new Error(`invalid data location: ${t.location} for ${e()}`)}},Yc=t=>{switch(t[3]){case"cpu":return new $e(t[0],t[2],t[1]);case"gpu-buffer":{let e=t[0];if(!Zn(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:s}=t[2];return $e.fromGpuBuffer(r,{dataType:e,dims:t[1],download:n,dispose:s})}default:throw new Error(`invalid data location: ${t[3]}`)}},Zc=class{async fetchModelAndCopyToWasmMemory(t){return jc(await es(t))}async loadModel(t,e){Ne();let r;typeof t=="string"?r=await this.fetchModelAndCopyToWasmMemory(t):r=t,[this.sessionId,this.inputNames,this.outputNames]=await Wc(r,e),Be()}async dispose(){return Hc(this.sessionId)}async run(t,e,r){Ne();let n=[],s=[];Object.entries(t).forEach(c=>{let p=c[0],h=c[1],f=this.inputNames.indexOf(p);if(f===-1)throw new Error(`invalid input '${p}'`);n.push(h),s.push(f)});let i=[],a=[];Object.entries(e).forEach(c=>{let p=c[0],h=c[1],f=this.outputNames.indexOf(p);if(f===-1)throw new Error(`invalid output '${p}'`);i.push(h),a.push(f)});let o=n.map((c,p)=>si(c,()=>`input "${this.inputNames[s[p]]}"`)),l=i.map((c,p)=>c?si(c,()=>`output "${this.outputNames[a[p]]}"`):null),u=await Kc(this.sessionId,s,o,a,l,r),d={};for(let c=0;c<u.length;c++)d[this.outputNames[a[c]]]=i[c]??Yc(u[c]);return Be(),d}startProfiling(){}endProfiling(){Qc(this.sessionId)}}}),Jc,ep,vm=z(()=>{Ue(),Xc(),bm(),Pr(),Jc=()=>{if((typeof ne.wasm.initTimeout!="number"||ne.wasm.initTimeout<0)&&(ne.wasm.initTimeout=0),ne.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof ne.wasm.proxy!="boolean"&&(ne.wasm.proxy=!1),typeof ne.wasm.trace!="boolean"&&(ne.wasm.trace=!1),typeof ne.wasm.numThreads!="number"||!Number.isInteger(ne.wasm.numThreads)||ne.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ne.wasm.numThreads=1;else{let t=typeof navigator>"u"?mf("node:os").cpus().length:navigator.hardwareConcurrency;ne.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}ne.wasm.wasmPaths===void 0&&qe&&qe.indexOf("blob:")!==0&&(ne.wasm.wasmPaths=qe.substring(0,qe.lastIndexOf("/")+1))},ep=class{async init(t){Jc(),await Vc(),await Gc(t)}async createInferenceSessionHandler(t,e){let r=new Zc;return await r.loadModel(t,e),Promise.resolve(r)}}}),tp={};zr(tp,{wasmBackend:()=>rp});var rp,$m=z(()=>{vm(),rp=new ep});Ue(),Ue(),Ue();var xm="1.19.0-dev.20240521-068bb3d5ee",km=Yi;{let t=($m(),Cn(tp)).wasmBackend;ft("webgpu",t,5),ft("webnn",t,5),ft("cpu",t,10),ft("wasm",t,10)}Object.defineProperty(ne.versions,"web",{value:xm,enumerable:!0});/**
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
 */var Sm=Object.freeze({__proto__:null,get InferenceSession(){return Ln},get TRACE(){return Vt},get TRACE_FUNC_BEGIN(){return Ne},get TRACE_FUNC_END(){return Be},get Tensor(){return $e},get TrainingSession(){return Fn},default:km,get env(){return ne},get registerBackend(){return ft}});const Em=(t,e)=>{const r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=t.dims[3],r.height=t.dims[2];const n=r.getContext("2d");if(n!=null){let s,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(s=t.dims[2],i=t.dims[3]):(s=t.dims[3],i=t.dims[2]);const a=e?.format!==void 0?e.format:"RGB",o=e?.norm;let l,u;o===void 0||o.mean===void 0?l=[255,255,255,255]:typeof o.mean=="number"?l=[o.mean,o.mean,o.mean,o.mean]:(l=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(l[3]=o.mean[3])),o===void 0||o.bias===void 0?u=[0,0,0,0]:typeof o.bias=="number"?u=[o.bias,o.bias,o.bias,o.bias]:(u=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(u[3]=o.bias[3]));const d=i*s;let c=0,p=d,h=d*2,f=-1;a==="RGBA"?(c=0,p=d,h=d*2,f=d*3):a==="RGB"?(c=0,p=d,h=d*2):a==="RBG"&&(c=0,h=d,p=d*2);for(let m=0;m<i;m++)for(let _=0;_<s;_++){const w=(t.data[c++]-u[0])*l[0],g=(t.data[p++]-u[1])*l[1],b=(t.data[h++]-u[2])*l[2],y=f===-1?255:(t.data[f++]-u[3])*l[3];n.fillStyle="rgba("+w+","+g+","+b+","+y+")",n.fillRect(_,m,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Tm=(t,e)=>{const r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d");let n;if(r!=null){let s,i,a;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(s=t.dims[2],i=t.dims[1],a=t.dims[3]):(s=t.dims[3],i=t.dims[2],a=t.dims[1]);const o=e!==void 0&&e.format!==void 0?e.format:"RGB",l=e?.norm;let u,d;l===void 0||l.mean===void 0?u=[255,255,255,255]:typeof l.mean=="number"?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(u[3]=l.mean[3])),l===void 0||l.bias===void 0?d=[0,0,0,0]:typeof l.bias=="number"?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(d[3]=l.bias[3]));const c=i*s;if(e!==void 0&&(e.format!==void 0&&a===4&&e.format!=="RGBA"||a===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");const p=4;let h=0,f=1,m=2,_=3,w=0,g=c,b=c*2,y=-1;o==="RGBA"?(w=0,g=c,b=c*2,y=c*3):o==="RGB"?(w=0,g=c,b=c*2):o==="RBG"&&(w=0,b=c,g=c*2),n=r.createImageData(s,i);for(let v=0;v<i*s;h+=p,f+=p,m+=p,_+=p,v++)n.data[h]=(t.data[w++]-d[0])*u[0],n.data[f]=(t.data[g++]-d[1])*u[1],n.data[m]=(t.data[b++]-d[2])*u[2],n.data[_]=y===-1?255:(t.data[y++]-d[3])*u[3]}else throw new Error("Can not access image data");return n},ii=(t,e)=>{if(t===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");const{height:r,width:n}=e,s=e.norm??{mean:255,bias:0};let i,a;typeof s.mean=="number"?i=[s.mean,s.mean,s.mean,s.mean]:i=[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],typeof s.bias=="number"?a=[s.bias,s.bias,s.bias,s.bias]:a=[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];const o=e.format!==void 0?e.format:"RGBA",l=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",u=r*n,d=l==="RGBA"?new Float32Array(u*4):new Float32Array(u*3);let c=4,p=0,h=1,f=2,m=3,_=0,w=u,g=u*2,b=-1;o==="RGB"&&(c=3,p=0,h=1,f=2,m=-1),l==="RGBA"?b=u*3:l==="RBG"?(_=0,g=u,w=u*2):l==="BGR"&&(g=0,w=u,_=u*2);for(let v=0;v<u;v++,p+=c,f+=c,h+=c,m+=c)d[_++]=(t[p]+a[0])/i[0],d[w++]=(t[h]+a[1])/i[1],d[g++]=(t[f]+a[2])/i[2],b!==-1&&m!==-1&&(d[b++]=(t[m]+a[3])/i[3]);return l==="RGBA"?new Ye("float32",d,[1,4,r,n]):new Ye("float32",d,[1,3,r,n])},Im=async(t,e)=>{const r=typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement,n=typeof ImageData<"u"&&t instanceof ImageData,s=typeof ImageBitmap<"u"&&t instanceof ImageBitmap,i=typeof t=="string";let a,o=e??{};const l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},u=d=>d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(r){const d=l();d.width=t.width,d.height=t.height;const c=u(d);if(c!=null){let p=t.height,h=t.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(p=e.resizedHeight,h=e.resizedWidth),e!==void 0){if(o=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=p,o.width=h}else o.tensorFormat="RGBA",o.height=p,o.width=h;c.drawImage(t,0,0),a=c.getImageData(0,0,h,p).data}else throw new Error("Can not access image data")}else if(n){let d,c;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(d=e.resizedHeight,c=e.resizedWidth):(d=t.height,c=t.width),e!==void 0&&(o=e),o.format="RGBA",o.height=d,o.width=c,e!==void 0){const p=l();p.width=c,p.height=d;const h=u(p);if(h!=null)h.putImageData(t,0,0),a=h.getImageData(0,0,c,d).data;else throw new Error("Can not access image data")}else a=t.data}else if(s){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");const d=l();d.width=t.width,d.height=t.height;const c=u(d);if(c!=null){const p=t.height,h=t.width;return c.drawImage(t,0,0,h,p),a=c.getImageData(0,0,h,p).data,o.height=p,o.width=h,ii(a,o)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,c)=>{const p=l(),h=u(p);if(!t||!h)return c();const f=new Image;f.crossOrigin="Anonymous",f.src=t,f.onload=()=>{p.width=f.width,p.height=f.height,h.drawImage(f,0,0,p.width,p.height);const m=h.getImageData(0,0,p.width,p.height);o.height=p.height,o.width=p.width,d(ii(m.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return ii(a,o);throw new Error("Input data provided is not supported - aborted tensor creation")},Mm=(t,e)=>{const{width:r,height:n,download:s,dispose:i}=e,a=[1,n,r,4];return new Ye({location:"texture",type:"float32",texture:t,dims:a,download:s,dispose:i})},Cm=(t,e)=>{const{dataType:r,dims:n,download:s,dispose:i}=e;return new Ye({location:"gpu-buffer",type:r??"float32",gpuBuffer:t,dims:n,download:s,dispose:i})},zm=(t,e,r)=>new Ye({location:"cpu-pinned",type:t,data:e,dims:r??[e.length]}),Bt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array]]),rn=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]);let np=!1;const Am=()=>{if(!np){np=!0;const t=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;t&&(Bt.set("int64",BigInt64Array),rn.set(BigInt64Array,"int64")),e&&(Bt.set("uint64",BigUint64Array),rn.set(BigUint64Array,"uint64")),r?(Bt.set("float16",Float16Array),rn.set(Float16Array,"float16")):Bt.set("float16",Uint16Array)}},Pm=t=>{let e=1;for(let r=0;r<t.length;r++){const n=t[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);e*=n}return e},Om=(t,e)=>{switch(t.location){case"cpu":return new Ye(t.type,t.data,e);case"cpu-pinned":return new Ye({location:"cpu-pinned",data:t.data,type:t.type,dims:e});case"texture":return new Ye({location:"texture",texture:t.texture,type:t.type,dims:e});case"gpu-buffer":return new Ye({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${t.location} is not supported`)}};let Ye=class{constructor(e,r,n){Am();let s,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,s=e.type,i=e.dims,e.location){case"cpu-pinned":{const o=Bt.get(s);if(!o)throw new TypeError(`unsupported type "${s}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(s!=="float32")throw new TypeError(`unsupported type "${s}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(s!=="float32"&&s!=="float16"&&s!=="int32"&&s!=="int64"&&s!=="uint32"&&s!=="uint8"&&s!=="bool")throw new TypeError(`unsupported type "${s}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,l;if(typeof e=="string")if(s=e,l=n,e==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");o=r}else{const u=Bt.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(r)){if(e==="float16"&&u===Uint16Array)throw new TypeError("Creating a float16 tensor from number array is not supported. Please use Uint16Array as data.");e==="uint64"||e==="int64"?o=u.from(r,BigInt):o=u.from(r)}else if(r instanceof u)o=r;else throw new TypeError(`A ${s} tensor's data must be type of ${u}`)}else if(l=r,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");const u=typeof e[0];if(u==="string")s="string",o=e;else if(u==="boolean")s="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else{const u=rn.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);s=u,o=e}if(l===void 0)l=[o.length];else if(!Array.isArray(l))throw new TypeError("A tensor's dims must be a number array");i=l,this.cpuData=o,this.dataLocation="cpu"}const a=Pm(i);if(this.cpuData&&a!==this.cpuData.length)throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=s,this.dims=i,this.size=a}static async fromImage(e,r){return Im(e,r)}static fromTexture(e,r){return Mm(e,r)}static fromGpuBuffer(e,r){return Cm(e,r)}static fromPinnedBuffer(e,r,n){return zm(e,r,n)}toDataURL(e){return Em(this,e)}toImageData(e){return Tm(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;const r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,e&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Om(this,e)}};const Bm=Ye,er=[];let ai,tr;ct.IS_NODE_ENV?(tr=ce??Qh,er.push("cpu"),ai=["cpu"]):(tr=Sm,ct.IS_WEBGPU_AVAILABLE&&er.push("webgpu"),er.push("wasm"),ai=["wasm"]);const Rm=tr.InferenceSession;function Dm(t){let e=ai;if(t){if(!er.includes(t))throw new Error(`Unsupported device: "${t}". Should be one of: ${er.join(", ")}.`);e=[t]}return e}async function Lm(t,e){return await Rm.create(t,e)}function sp(t){return t instanceof tr.Tensor}const St=tr?.env;St?.wasm&&(St.wasm.wasmPaths="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.19.0-dev.20240509-69cfcba38a/dist/",St.wasm.proxy=!ct.IS_WEBWORKER_ENV,(typeof crossOriginIsolated>"u"||!crossOriginIsolated)&&(St.wasm.numThreads=1),typeof navigator<"u"&&/iP(hone|od|ad).+16_4.+AppleWebKit/.test(navigator.userAgent)&&(St.wasm.simd=!1));function Fm(){return St?.wasm?.proxy}ye.backends.onnx=St;const ip=Object.freeze({float32:Float32Array,float16:Uint16Array,float64:Float64Array,string:Array,int8:Int8Array,uint8:Uint8Array,int16:Int16Array,uint16:Uint16Array,int32:Int32Array,uint32:Uint32Array,int64:BigInt64Array,uint64:BigUint64Array,bool:Uint8Array});class Q{get dims(){return this.ort_tensor.dims}set dims(e){this.ort_tensor.dims=e}get type(){return this.ort_tensor.type}get data(){return this.ort_tensor.data}get size(){return this.ort_tensor.size}get location(){return this.ort_tensor.location}ort_tensor;constructor(...e){return sp(e[0])?this.ort_tensor=e[0]:this.ort_tensor=new Bm(e[0],e[1],e[2]),new Proxy(this,{get:(r,n)=>{if(typeof n=="string"){let s=Number(n);if(Number.isInteger(s))return r._getitem(s)}return r[n]},set:(r,n,s)=>r[n]=s})}dispose(){this.ort_tensor.dispose()}*[Symbol.iterator](){const[e,...r]=this.dims;if(r.length>0){const n=r.reduce((s,i)=>s*i);for(let s=0;s<e;++s)yield this._subarray(s,n,r)}else yield*this.data}_getitem(e){const[r,...n]=this.dims;if(e=Ze(e,r),n.length>0){const s=n.reduce((i,a)=>i*a);return this._subarray(e,s,n)}else return new Q(this.type,[this.data[e]],n)}indexOf(e){const r=this.data;for(let n=0;n<r.length;++n)if(r[n]==e)return n;return-1}_subarray(e,r,n){const s=e*r,i=(e+1)*r,a="subarray"in this.data?this.data.subarray(s,i):this.data.slice(s,i);return new Q(this.type,a,n)}item(){const e=this.data;if(e.length!==1)throw new Error(`a Tensor with ${e.length} elements cannot be converted to Scalar`);return e[0]}tolist(){return Nm(this.data,this.dims)}sigmoid(){return this.clone().sigmoid_()}sigmoid_(){const e=this.data;for(let r=0;r<e.length;++r)e[r]=1/(1+Math.exp(-e[r]));return this}mul(e){return this.clone().mul_(e)}mul_(e){const r=this.data;for(let n=0;n<r.length;++n)r[n]*=e;return this}add(e){return this.clone().add_(e)}add_(e){const r=this.data;for(let n=0;n<r.length;++n)r[n]+=e;return this}clone(){return new Q(this.type,this.data.slice(),this.dims.slice())}slice(...e){let r=[],n=[];for(let u=0;u<this.dims.length;++u){let d=e[u];if(d==null)n.push([0,this.dims[u]]),r.push(this.dims[u]);else if(typeof d=="number")d=Ze(d,this.dims[u],u),n.push([d,d+1]);else if(Array.isArray(d)&&d.length===2){let[c,p]=d;if(c=c===null?0:Ze(c,this.dims[u],u,!1),p=p===null?this.dims[u]:Ze(p,this.dims[u],u,!1),c>p)throw new Error(`Invalid slice: ${d}`);let h=[Math.max(c,0),Math.min(p,this.dims[u])];n.push(h),r.push(h[1]-h[0])}else throw new Error(`Invalid slice: ${d}`)}let s=n.map(([u,d])=>d-u),i=s.reduce((u,d)=>u*d);const a=this.data;let o=new a.constructor(i);const l=this.stride();for(let u=0;u<i;++u){let d=0;for(let c=s.length-1,p=u;c>=0;--c){const h=s[c];d+=(p%h+n[c][0])*l[c],p=Math.floor(p/h)}o[u]=a[d]}return new Q(this.type,o,r)}permute(...e){return Um(this,e)}transpose(...e){return this.permute(...e)}sum(e=null,r=!1){return this.norm(1,e,r)}norm(e="fro",r=null,n=!1){if(e==="fro")e=2;else if(typeof e=="string")throw Error(`Unsupported norm: ${e}`);const s=this.data;if(r===null){let o=s.reduce((l,u)=>l+u**e,0)**(1/e);return new Q(this.type,[o],[])}r=Ze(r,this.dims.length);const i=this.dims.slice();i[r]=1;const a=new s.constructor(s.length/this.dims[r]);for(let o=0;o<s.length;++o){let l=0;for(let u=this.dims.length-1,d=o,c=1;u>=0;--u){const p=this.dims[u];if(u!==r){const h=d%p;l+=h*c,c*=i[u]}d=Math.floor(d/p)}a[l]+=s[o]**e}if(e!==1)for(let o=0;o<a.length;++o)a[o]=a[o]**(1/e);return n||i.splice(r,1),new Q(this.type,a,i)}normalize_(e=2,r=1){r=Ze(r,this.dims.length);const n=this.norm(e,r,!0),s=this.data;for(let i=0;i<s.length;++i){let a=0;for(let o=this.dims.length-1,l=i,u=1;o>=0;--o){const d=this.dims[o];if(o!==r){const c=l%d;a+=c*u,u*=this.dims[o]}l=Math.floor(l/d)}s[i]/=n.data[a]}return this}normalize(e=2,r=1){return this.clone().normalize_(e,r)}stride(){return Gm(this.dims)}squeeze(e=null){return new Q(this.type,this.data,ap(this.dims,e))}squeeze_(e=null){return this.dims=ap(this.dims,e),this}unsqueeze(e=null){return new Q(this.type,this.data,op(this.dims,e))}unsqueeze_(e=null){return this.dims=op(this.dims,e),this}flatten_(e=0,r=-1){r=(r+this.dims.length)%this.dims.length;let n=this.dims.slice(0,e),s=this.dims.slice(e,r+1),i=this.dims.slice(r+1);return this.dims=[...n,s.reduce((a,o)=>a*o,1),...i],this}flatten(e=0,r=-1){return this.clone().flatten_(e,r)}view(...e){let r=-1;for(let n=0;n<e.length;++n)if(e[n]===-1){if(r!==-1)throw new Error("Only one dimension can be inferred");r=n}if(r!==-1){const n=e.reduce((s,i,a)=>a!==r?s*i:s,1);e[r]=this.data.length/n}return new Q(this.type,this.data,e)}neg_(){const e=this.data;for(let r=0;r<e.length;++r)e[r]=-e[r];return this}neg(){return this.clone().neg_()}clamp_(e,r){const n=this.data;for(let s=0;s<n.length;++s)n[s]=Math.min(Math.max(n[s],e),r);return this}clamp(e,r){return this.clone().clamp_(e,r)}round_(){const e=this.data;for(let r=0;r<e.length;++r)e[r]=Math.round(e[r]);return this}round(){return this.clone().round_()}mean(e=null,r=!1){return li(this,e,r)}to(e){if(this.type===e)return this;if(!ip.hasOwnProperty(e))throw new Error(`Unsupported type: ${e}`);return new Q(e,ip[e].from(this.data),this.dims)}}function Nm(t,e){const r=t.length,n=e.reduce((i,a)=>i*a);if(r!==n)throw Error(`cannot reshape array of size ${r} into shape (${e})`);let s=t;for(let i=e.length-1;i>=0;i--)s=s.reduce((a,o)=>{let l=a[a.length-1];return l.length<e[i]?l.push(o):a.push([o]),a},[[]]);return s[0]}function Um(t,e){const[r,n]=uf(t.data,t.dims,e);return new Q(t.type,r,n)}function ap(t,e){return t=t.slice(),e===null?t=t.filter(r=>r!==1):typeof e=="number"?t[e]===1&&t.splice(e,1):Array.isArray(e)&&(t=t.filter((r,n)=>r!==1||!e.includes(n))),t}function op(t,e){return e=Ze(e,t.length+1),t=t.slice(),t.splice(e,0,1),t}function Ze(t,e,r=null,n=!0){if(n&&(t<-e||t>=e))throw new Error(`IndexError: index ${t} is out of bounds for dimension${r===null?"":" "+r} with size ${e}`);return t<0&&(t=(t%e+e)%e),t}function et(t,e=0){e=Ze(e,t[0].dims.length);const r=t[0].dims.slice();r[e]=t.reduce((a,o)=>a+o.dims[e],0);const n=r.reduce((a,o)=>a*o,1),s=new t[0].data.constructor(n),i=t[0].type;if(e===0){let a=0;for(let o of t)s.set(o.data,a),a+=o.data.length}else{let a=0;for(let o=0;o<t.length;++o){let l=t[o];for(let u=0;u<l.data.length;++u){let d=0;for(let c=l.dims.length-1,p=u,h=1;c>=0;--c){const f=l.dims[c];let m=p%f;c===e&&(m+=a),d+=m*h,h*=r[c],p=Math.floor(p/f)}s[d]=l.data[u]}a+=l.dims[e]}}return new Q(i,s,r)}function oi(t,e=0){return et(t.map(r=>r.unsqueeze(e)),e)}function qm(t,e=null,r=1,n=!1){if(e===null){const u=t.data.reduce((h,f)=>h+f,0)/t.data.length,d=Math.sqrt(t.data.reduce((h,f)=>h+(f-u)**2,0)/(t.data.length-r)),c=new Q(t.type,[u],[]);return[new Q(t.type,[d],[]),c]}e=Ze(e,t.dims.length);const s=li(t,e,n),i=t.dims.slice();i[e]=1;const a=new t.data.constructor(t.data.length/t.dims[e]);for(let l=0;l<t.data.length;++l){let u=0;for(let d=t.dims.length-1,c=l,p=1;d>=0;--d){const h=t.dims[d];if(d!==e){const f=c%h;u+=f*p,p*=i[d]}c=Math.floor(c/h)}a[u]+=(t.data[l]-s.data[u])**2}for(let l=0;l<a.length;++l)a[l]=Math.sqrt(a[l]/(t.dims[e]-r));return n||i.splice(e,1),[new Q(t.type,a,i),s]}function li(t,e=null,r=!1){if(e===null){let i=t.data.reduce((a,o)=>a+o,0);return new Q(t.type,[i/t.data.length],[])}e=Ze(e,t.dims.length);const n=t.dims.slice();n[e]=1;const s=new t.data.constructor(t.data.length/t.dims[e]);for(let i=0;i<t.data.length;++i){let a=0;for(let o=t.dims.length-1,l=i,u=1;o>=0;--o){const d=t.dims[o];if(o!==e){const c=l%d;a+=c*u,u*=n[o]}l=Math.floor(l/d)}s[a]+=t.data[i]}if(t.dims[e]!==1)for(let i=0;i<s.length;++i)s[i]=s[i]/t.dims[e];return r||n.splice(e,1),new Q(t.type,s,n)}function Vm(t){const[e,r]=t.dims,n=[e+1,r+1],s=new Q("float32",new Float32Array(n[0]*n[1]).fill(1/0),n),i=new Q("float32",new Float32Array(n[0]*n[1]).fill(-1),n);s[0].data[0]=0;for(let d=1;d<r+1;++d)for(let c=1;c<e+1;++c){const p=s[c-1][d-1].item(),h=s[c-1][d].item(),f=s[c][d-1].item();let m,_;p<h&&p<f?(m=p,_=0):h<p&&h<f?(m=h,_=1):(m=f,_=2),s[c].data[d]=t[c-1][d-1].item()+m,i[c].data[d]=_}let a=e,o=r;i.data.fill(2,0,n[1]);for(let d=0;d<n[0];++d)i[d].data[0]=1;let l=[],u=[];for(;a>0||o>0;)switch(l.push(a-1),u.push(o-1),i[a][o].item()){case 0:--a,--o;break;case 1:--a;break;case 2:--o;break;default:throw new Error(`Internal error in dynamic time warping. Unexpected trace[${a}, ${o}]. Please file a bug report.`)}return l.reverse(),u.reverse(),[l,u]}function Gm(t){const e=new Array(t.length);for(let r=t.length-1,n=1;r>=0;--r)e[r]=n,n*=t[r];return e}function ui(t,e,r,n){const s=t.reduce((i,a)=>i*a,1);return new Q(r,new n(s).fill(e),t)}function jm(t,e){let r,n;return r="float32",n=Float32Array,ui(t,e,r,n)}function Wm(t,e){return jm(t.dims,e)}function rr(t){return ui(t,1n,"int64",BigInt64Array)}function Hm(t){return rr(t.dims)}function Km(t){return ui(t,0n,"int64",BigInt64Array)}function Qm(t){return Km(t.dims)}class Xm{constructor(e=(r,n)=>r>n){this._heap=[],this._comparator=e}get size(){return this._heap.length}isEmpty(){return this.size===0}peek(){return this._heap[0]}push(...e){return this.extend(e)}extend(e){for(const r of e)this._heap.push(r),this._siftUp();return this.size}pop(){const e=this.peek(),r=this.size-1;return r>0&&this._swap(0,r),this._heap.pop(),this._siftDown(),e}replace(e){const r=this.peek();return this._heap[0]=e,this._siftDown(),r}_parent(e){return(e+1>>>1)-1}_left(e){return(e<<1)+1}_right(e){return e+1<<1}_greater(e,r){return this._comparator(this._heap[e],this._heap[r])}_swap(e,r){const n=this._heap[e];this._heap[e]=this._heap[r],this._heap[r]=n}_siftUp(){let e=this.size-1;for(;e>0&&this._greater(e,this._parent(e));)this._swap(e,this._parent(e)),e=this._parent(e)}_siftDown(){let e=0;for(;this._left(e)<this.size&&this._greater(this._left(e),e)||this._right(e)<this.size&&this._greater(this._right(e),e);){const r=this._right(e)<this.size&&this._greater(this._right(e),this._left(e))?this._right(e):this._left(e);this._swap(e,r),e=r}}}class Ym{constructor(){this.root=nn.default()}extend(e){for(let r of e)this.push(r)}push(e){let r=this.root;for(let n of e){let s=r.children.get(n);s===void 0&&(s=nn.default(),r.children.set(n,s)),r=s}r.isLeaf=!0}*commonPrefixSearch(e){let r=this.root,n="";for(let s=0;s<e.length&&r!==void 0;++s){const i=e[s];n+=i,r=r.children.get(i),r!==void 0&&r.isLeaf&&(yield n)}}}class nn{constructor(e,r){this.isLeaf=e,this.children=r}static default(){return new nn(!1,new Map)}}class Zm{constructor(e,r,n){this.sentence=e,this.len=e.length,this.bosTokenId=r,this.eosTokenId=n,this.nodes=[],this.beginNodes=Array.from({length:this.len+1},()=>[]),this.endNodes=Array.from({length:this.len+1},()=>[]);const s=new nr(this.bosTokenId,0,0,0,0),i=new nr(this.eosTokenId,1,this.len,0,0);this.nodes.push(s.clone()),this.nodes.push(i.clone()),this.beginNodes[this.len].push(i),this.endNodes[0].push(s)}insert(e,r,n,s){const i=this.nodes.length,a=new nr(s,i,e,r,n);this.beginNodes[e].push(a),this.endNodes[e+r].push(a),this.nodes.push(a)}viterbi(){const e=this.len;let r=0;for(;r<=e;){if(this.beginNodes[r].length==0)return[];for(let o of this.beginNodes[r]){o.prev=null;let l=0,u=null;for(let d of this.endNodes[r]){const c=d.backtraceScore+o.score;(u===null||c>l)&&(u=d.clone(),l=c)}if(u!==null)o.prev=u,o.backtraceScore=l;else return[]}++r}const n=[],i=this.beginNodes[e][0].prev;if(i===null)return[];let a=i.clone();for(;a.prev!==null;)n.push(a.clone()),a=a.clone().prev.clone();return n.reverse(),n}piece(e){return this.sentence.slice(e.pos,e.pos+e.length)}tokens(){return this.viterbi().map(r=>this.piece(r))}tokenIds(){return this.viterbi().map(r=>r.tokenId)}}class nr{constructor(e,r,n,s,i){this.tokenId=e,this.nodeId=r,this.pos=n,this.length=s,this.score=i,this.prev=null,this.backtraceScore=0}clone(){const e=new nr(this.tokenId,this.nodeId,this.pos,this.length,this.score);return e.prev=this.prev,e.backtraceScore=this.backtraceScore,e}}var $=Object.freeze({Text:"Text",NumericLiteral:"NumericLiteral",BooleanLiteral:"BooleanLiteral",StringLiteral:"StringLiteral",Identifier:"Identifier",Equals:"Equals",OpenParen:"OpenParen",CloseParen:"CloseParen",OpenStatement:"OpenStatement",CloseStatement:"CloseStatement",OpenExpression:"OpenExpression",CloseExpression:"CloseExpression",OpenSquareBracket:"OpenSquareBracket",CloseSquareBracket:"CloseSquareBracket",OpenCurlyBracket:"OpenCurlyBracket",CloseCurlyBracket:"CloseCurlyBracket",Comma:"Comma",Dot:"Dot",Colon:"Colon",Pipe:"Pipe",CallOperator:"CallOperator",AdditiveBinaryOperator:"AdditiveBinaryOperator",MultiplicativeBinaryOperator:"MultiplicativeBinaryOperator",ComparisonBinaryOperator:"ComparisonBinaryOperator",UnaryOperator:"UnaryOperator",Set:"Set",If:"If",For:"For",In:"In",Is:"Is",NotIn:"NotIn",Else:"Else",EndIf:"EndIf",ElseIf:"ElseIf",EndFor:"EndFor",And:"And",Or:"Or",Not:"UnaryOperator"}),lp=Object.freeze({set:$.Set,for:$.For,in:$.In,is:$.Is,if:$.If,else:$.Else,endif:$.EndIf,elif:$.ElseIf,endfor:$.EndFor,and:$.And,or:$.Or,not:$.Not,"not in":$.NotIn,true:$.BooleanLiteral,false:$.BooleanLiteral}),Et=class{constructor(t,e){this.value=t,this.type=e}};function up(t){return/\w/.test(t)}function di(t){return/[0-9]/.test(t)}var Jm=[["{%",$.OpenStatement],["%}",$.CloseStatement],["{{",$.OpenExpression],["}}",$.CloseExpression],["(",$.OpenParen],[")",$.CloseParen],["{",$.OpenCurlyBracket],["}",$.CloseCurlyBracket],["[",$.OpenSquareBracket],["]",$.CloseSquareBracket],[",",$.Comma],[".",$.Dot],[":",$.Colon],["|",$.Pipe],["<=",$.ComparisonBinaryOperator],[">=",$.ComparisonBinaryOperator],["==",$.ComparisonBinaryOperator],["!=",$.ComparisonBinaryOperator],["<",$.ComparisonBinaryOperator],[">",$.ComparisonBinaryOperator],["+",$.AdditiveBinaryOperator],["-",$.AdditiveBinaryOperator],["*",$.MultiplicativeBinaryOperator],["/",$.MultiplicativeBinaryOperator],["%",$.MultiplicativeBinaryOperator],["=",$.Equals]],eg=new Map([["n",`
`],["t","	"],["r","\r"],["b","\b"],["f","\f"],["v","\v"],["'","'"],['"','"'],["\\","\\"]]);function tg(t,e={}){return t.endsWith(`
`)&&(t=t.slice(0,-1)),t=t.replace(/{#.*?#}/gs,"{##}"),e.lstrip_blocks&&(t=t.replace(/^[ \t]*({[#%])/gm,"$1")),e.trim_blocks&&(t=t.replace(/([#%]})\n/g,"$1")),t.replace(/{##}/g,"").replace(/-%}\s*/g,"%}").replace(/\s*{%-/g,"{%").replace(/-}}\s*/g,"}}").replace(/\s*{{-/g,"{{")}function rg(t,e={}){const r=[],n=tg(t,e);let s=0;const i=a=>{let o="";for(;a(n[s]);){if(n[s]==="\\"){if(++s,s>=n.length)throw new SyntaxError("Unexpected end of input");const l=n[s++],u=eg.get(l);if(u===void 0)throw new SyntaxError(`Unexpected escaped character: ${l}`);o+=u;continue}if(o+=n[s++],s>=n.length)throw new SyntaxError("Unexpected end of input")}return o};e:for(;s<n.length;){const a=r.at(-1)?.type;if(a===void 0||a===$.CloseStatement||a===$.CloseExpression){let l="";for(;s<n.length&&!(n[s]==="{"&&(n[s+1]==="%"||n[s+1]==="{"));)l+=n[s++];if(l.length>0){r.push(new Et(l,$.Text));continue}}i(l=>/\s/.test(l));const o=n[s];if(o==="-"||o==="+"){const l=r.at(-1)?.type;if(l===$.Text||l===void 0)throw new SyntaxError(`Unexpected character: ${o}`);switch(l){case $.Identifier:case $.NumericLiteral:case $.BooleanLiteral:case $.StringLiteral:case $.CloseParen:case $.CloseSquareBracket:break;default:{++s;const u=i(di);r.push(new Et(`${o}${u}`,u.length>0?$.NumericLiteral:$.UnaryOperator));continue}}}for(const[l,u]of Jm)if(n.slice(s,s+l.length)===l){r.push(new Et(l,u)),s+=l.length;continue e}if(o==="'"||o==='"'){++s;const l=i(u=>u!==o);r.push(new Et(l,$.StringLiteral)),++s;continue}if(di(o)){const l=i(di);r.push(new Et(l,$.NumericLiteral));continue}if(up(o)){const l=i(up),u=Object.hasOwn(lp,l)?lp[l]:$.Identifier;u===$.In&&r.at(-1)?.type===$.Not?(r.pop(),r.push(new Et("not in",$.NotIn))):r.push(new Et(l,u));continue}throw new SyntaxError(`Unexpected character: ${o}`)}return r}var sr=class{type="Statement"},ng=class extends sr{constructor(t){super(),this.body=t}type="Program"},dp=class extends sr{constructor(t,e,r){super(),this.test=t,this.body=e,this.alternate=r}type="If"},sg=class extends sr{constructor(t,e,r){super(),this.loopvar=t,this.iterable=e,this.body=r}type="For"},ig=class extends sr{constructor(t,e){super(),this.assignee=t,this.value=e}type="Set"},Je=class extends sr{type="Expression"},ag=class extends Je{constructor(t,e,r){super(),this.object=t,this.property=e,this.computed=r}type="MemberExpression"},og=class extends Je{constructor(t,e){super(),this.callee=t,this.args=e}type="CallExpression"},Rt=class extends Je{constructor(t){super(),this.value=t}type="Identifier"},Dt=class extends Je{constructor(t){super(),this.value=t}type="Literal"},lg=class extends Dt{type="NumericLiteral"},cp=class extends Dt{type="StringLiteral"},pp=class extends Dt{type="BooleanLiteral"},ug=class extends Dt{type="ArrayLiteral"},hp=class extends Dt{type="TupleLiteral"},dg=class extends Dt{type="ObjectLiteral"},ir=class extends Je{constructor(t,e,r){super(),this.operator=t,this.left=e,this.right=r}type="BinaryExpression"},cg=class extends Je{constructor(t,e){super(),this.operand=t,this.filter=e}type="FilterExpression"},pg=class extends Je{constructor(t,e,r){super(),this.operand=t,this.negate=e,this.test=r}type="TestExpression"},hg=class extends Je{constructor(t,e){super(),this.operator=t,this.argument=e}type="UnaryExpression"},fg=class extends Je{constructor(t=void 0,e=void 0,r=void 0){super(),this.start=t,this.stop=e,this.step=r}type="SliceExpression"},mg=class extends Je{constructor(t,e){super(),this.key=t,this.value=e}type="KeywordArgumentExpression"};function gg(t){const e=new ng([]);let r=0;function n(x,T){const O=t[r++];if(!O||O.type!==x)throw new Error(`Parser Error: ${T}. ${O.type} !== ${x}.`);return O}function s(){switch(t[r].type){case $.Text:return o();case $.OpenStatement:return l();case $.OpenExpression:return u();default:throw new SyntaxError(`Unexpected token type: ${t[r].type}`)}}function i(...x){return r+x.length<=t.length&&x.some((T,O)=>T!==t[r+O].type)}function a(...x){return r+x.length<=t.length&&x.every((T,O)=>T===t[r+O].type)}function o(){return new cp(n($.Text,"Expected text token").value)}function l(){n($.OpenStatement,"Expected opening statement token");let x;switch(t[r].type){case $.Set:++r,x=d(),n($.CloseStatement,"Expected closing statement token");break;case $.If:++r,x=c(),n($.OpenStatement,"Expected {% token"),n($.EndIf,"Expected endif token"),n($.CloseStatement,"Expected %} token");break;case $.For:++r,x=h(),n($.OpenStatement,"Expected {% token"),n($.EndFor,"Expected endfor token"),n($.CloseStatement,"Expected %} token");break;default:throw new SyntaxError(`Unknown statement type: ${t[r].type}`)}return x}function u(){n($.OpenExpression,"Expected opening expression token");const x=f();return n($.CloseExpression,"Expected closing expression token"),x}function d(){const x=f();if(a($.Equals)){++r;const T=d();return new ig(x,T)}return x}function c(){const x=f();n($.CloseStatement,"Expected closing statement token");const T=[],O=[];for(;!(t[r]?.type===$.OpenStatement&&(t[r+1]?.type===$.ElseIf||t[r+1]?.type===$.Else||t[r+1]?.type===$.EndIf));)T.push(s());if(t[r]?.type===$.OpenStatement&&t[r+1]?.type!==$.EndIf)if(++r,a($.ElseIf))n($.ElseIf,"Expected elseif token"),O.push(c());else for(n($.Else,"Expected else token"),n($.CloseStatement,"Expected closing statement token");!(t[r]?.type===$.OpenStatement&&t[r+1]?.type===$.EndIf);)O.push(s());return new dp(x,T,O)}function p(x=!1){const T=x?N:f,O=[T()],J=a($.Comma);for(;J&&(++r,O.push(T()),!!a($.Comma)););return J?new hp(O):O[0]}function h(){const x=p(!0);if(!(x instanceof Rt||x instanceof hp))throw new SyntaxError(`Expected identifier/tuple for the loop variable, got ${x.type} instead`);n($.In,"Expected `in` keyword following loop variable");const T=f();n($.CloseStatement,"Expected closing statement token");const O=[];for(;i($.OpenStatement,$.EndFor);)O.push(s());return new sg(x,T,O)}function f(){return m()}function m(){const x=_();if(a($.If)){++r;const T=_();n($.Else,"Expected else token");const O=_();return new dp(T,[x],[O])}return x}function _(){let x=w();for(;a($.Or);){const T=t[r];++r;const O=w();x=new ir(T,x,O)}return x}function w(){let x=g();for(;a($.And);){const T=t[r];++r;const O=g();x=new ir(T,x,O)}return x}function g(){let x;for(;a($.Not);){const T=t[r];++r;const O=g();x=new hg(T,O)}return x??b()}function b(){let x=y();for(;a($.ComparisonBinaryOperator)||a($.In)||a($.NotIn);){const T=t[r];++r;const O=y();x=new ir(T,x,O)}return x}function y(){let x=U();for(;a($.AdditiveBinaryOperator);){const T=t[r];++r;const O=U();x=new ir(T,x,O)}return x}function v(){const x=P();return a($.OpenParen)?S(x):x}function S(x){let T=new og(x,k());return a($.OpenParen)&&(T=S(T)),T}function k(){n($.OpenParen,"Expected opening parenthesis for arguments list");const x=I();return n($.CloseParen,"Expected closing parenthesis for arguments list"),x}function I(){const x=[];for(;!a($.CloseParen);){let T=f();if(a($.Equals)){if(++r,!(T instanceof Rt))throw new SyntaxError("Expected identifier for keyword argument");const O=f();T=new mg(T,O)}x.push(T),a($.Comma)&&++r}return x}function B(){const x=[];let T=!1;for(;!a($.CloseSquareBracket);)a($.Colon)?(x.push(void 0),++r,T=!0):(x.push(f()),a($.Colon)&&(++r,T=!0));if(x.length===0)throw new SyntaxError("Expected at least one argument for member/slice expression");if(T){if(x.length>3)throw new SyntaxError("Expected 0-3 arguments for slice expression");return new fg(...x)}return x[0]}function P(){let x=N();for(;a($.Dot)||a($.OpenSquareBracket);){const T=t[r];++r;let O;const J=T.type!==$.Dot;if(J)O=B(),n($.CloseSquareBracket,"Expected closing square bracket");else if(O=N(),O.type!=="Identifier")throw new SyntaxError("Expected identifier following dot operator");x=new ag(x,O,J)}return x}function U(){let x=H();for(;a($.MultiplicativeBinaryOperator);){const T=t[r];++r;const O=H();x=new ir(T,x,O)}return x}function H(){let x=j();for(;a($.Is);){++r;const T=a($.Not);T&&++r;let O=N();if(O instanceof pp&&(O=new Rt(O.value.toString())),!(O instanceof Rt))throw new SyntaxError("Expected identifier for the test");x=new pg(x,T,O)}return x}function j(){let x=v();for(;a($.Pipe);){++r;let T=N();if(!(T instanceof Rt))throw new SyntaxError("Expected identifier for the filter");a($.OpenParen)&&(T=S(T)),x=new cg(x,T)}return x}function N(){const x=t[r];switch(x.type){case $.NumericLiteral:return++r,new lg(Number(x.value));case $.StringLiteral:return++r,new cp(x.value);case $.BooleanLiteral:return++r,new pp(x.value==="true");case $.Identifier:return++r,new Rt(x.value);case $.OpenParen:{++r;const T=p();if(t[r].type!==$.CloseParen)throw new SyntaxError(`Expected closing parenthesis, got ${t[r].type} instead`);return++r,T}case $.OpenSquareBracket:{++r;const T=[];for(;!a($.CloseSquareBracket);)T.push(f()),a($.Comma)&&++r;return++r,new ug(T)}case $.OpenCurlyBracket:{++r;const T=new Map;for(;!a($.CloseCurlyBracket);){const O=f();n($.Colon,"Expected colon between key and value in object literal");const J=f();T.set(O,J),a($.Comma)&&++r}return++r,new dg(T)}default:throw new SyntaxError(`Unexpected token: ${x.type}`)}}for(;r<t.length;)e.body.push(s());return e}function _g(t,e,r=1){e===void 0&&(e=t,t=0);const n=[];for(let s=t;s<e;s+=r)n.push(s);return n}function fp(t,e,r,n=1){const s=Math.sign(n);s>=0?(e=(e??=0)<0?Math.max(t.length+e,0):Math.min(e,t.length),r=(r??=t.length)<0?Math.max(t.length+r,0):Math.min(r,t.length)):(e=(e??=t.length-1)<0?Math.max(t.length+e,-1):Math.min(e,t.length-1),r=(r??=-1)<-1?Math.max(t.length+r,-1):Math.min(r,t.length-1));const i=[];for(let a=e;s*a<s*r;a+=n)i.push(t[a]);return i}function mp(t){return t.replace(/\b\w/g,e=>e.toUpperCase())}var tt=class{type="RuntimeValue";value;builtins=new Map;constructor(t=void 0){this.value=t}__bool__(){return new de(!!this.value)}},ae=class extends tt{type="NumericValue"},ee=class extends tt{type="StringValue";builtins=new Map([["upper",new rt(()=>new ee(this.value.toUpperCase()))],["lower",new rt(()=>new ee(this.value.toLowerCase()))],["strip",new rt(()=>new ee(this.value.trim()))],["title",new rt(()=>new ee(mp(this.value)))],["length",new ae(this.value.length)]])},de=class extends tt{type="BooleanValue"},Ke=class extends tt{type="ObjectValue";__bool__(){return new de(this.value.size>0)}builtins=new Map([["get",new rt(([t,e])=>{if(!(t instanceof ee))throw new Error(`Object key must be a string: got ${t.type}`);return this.value.get(t.value)??e??new ar})],["items",new rt(()=>new oe(Array.from(this.value.entries()).map(([t,e])=>new oe([new ee(t),e]))))]])},oe=class extends tt{type="ArrayValue";builtins=new Map([["length",new ae(this.value.length)]]);__bool__(){return new de(this.value.length>0)}},wg=class extends oe{type="TupleValue"},rt=class extends tt{type="FunctionValue"},ar=class extends tt{type="NullValue"},Qe=class extends tt{type="UndefinedValue"},ci=class{constructor(t){this.parent=t}variables=new Map([["namespace",new rt(t=>{if(t.length===0)return new Ke(new Map);if(t.length!==1||!(t[0]instanceof Ke))throw new Error("`namespace` expects either zero arguments or a single object argument");return t[0]})]]);tests=new Map([["boolean",t=>t.type==="BooleanValue"],["callable",t=>t instanceof rt],["odd",t=>{if(t.type!=="NumericValue")throw new Error(`Cannot apply test "odd" to type: ${t.type}`);return t.value%2!==0}],["even",t=>{if(t.type!=="NumericValue")throw new Error(`Cannot apply test "even" to type: ${t.type}`);return t.value%2===0}],["false",t=>t.type==="BooleanValue"&&!t.value],["true",t=>t.type==="BooleanValue"&&t.value],["number",t=>t.type==="NumericValue"],["integer",t=>t.type==="NumericValue"&&Number.isInteger(t.value)],["iterable",t=>t instanceof oe||t instanceof ee],["lower",t=>{const e=t.value;return t.type==="StringValue"&&e===e.toLowerCase()}],["upper",t=>{const e=t.value;return t.type==="StringValue"&&e===e.toUpperCase()}],["none",t=>t.type==="NullValue"],["defined",t=>t.type!=="UndefinedValue"],["undefined",t=>t.type==="UndefinedValue"],["equalto",(t,e)=>t.value===e.value]]);set(t,e){return this.declareVariable(t,sn(e))}declareVariable(t,e){if(this.variables.has(t))throw new SyntaxError(`Variable already declared: ${t}`);return this.variables.set(t,e),e}setVariable(t,e){return this.variables.set(t,e),e}resolve(t){if(this.variables.has(t))return this;if(this.parent)return this.parent.resolve(t);throw new Error(`Unknown variable: ${t}`)}lookupVariable(t){try{return this.resolve(t).variables.get(t)??new Qe}catch{return new Qe}}},yg=class{global;constructor(t){this.global=t??new ci}run(t){return this.evaluate(t,this.global)}evaluateBinaryExpression(t,e){const r=this.evaluate(t.left,e);switch(t.operator.value){case"and":return r.__bool__().value?this.evaluate(t.right,e):r;case"or":return r.__bool__().value?r:this.evaluate(t.right,e)}const n=this.evaluate(t.right,e);switch(t.operator.value){case"==":return new de(r.value==n.value);case"!=":return new de(r.value!=n.value)}if(r instanceof Qe||n instanceof Qe)throw new Error("Cannot perform operation on undefined values");if(r instanceof ar||n instanceof ar)throw new Error("Cannot perform operation on null values");if(r instanceof ae&&n instanceof ae)switch(t.operator.value){case"+":return new ae(r.value+n.value);case"-":return new ae(r.value-n.value);case"*":return new ae(r.value*n.value);case"/":return new ae(r.value/n.value);case"%":return new ae(r.value%n.value);case"<":return new de(r.value<n.value);case">":return new de(r.value>n.value);case">=":return new de(r.value>=n.value);case"<=":return new de(r.value<=n.value)}else if(r instanceof oe&&n instanceof oe)switch(t.operator.value){case"+":return new oe(r.value.concat(n.value))}else if(n instanceof oe){const s=n.value.find(i=>i.value===r.value)!==void 0;switch(t.operator.value){case"in":return new de(s);case"not in":return new de(!s)}}if(r instanceof ee||n instanceof ee)switch(t.operator.value){case"+":return new ee(r.value.toString()+n.value.toString())}if(r instanceof ee&&n instanceof ee)switch(t.operator.value){case"in":return new de(n.value.includes(r.value));case"not in":return new de(!n.value.includes(r.value))}if(r instanceof ee&&n instanceof Ke)switch(t.operator.value){case"in":return new de(n.value.has(r.value));case"not in":return new de(!n.value.has(r.value))}throw new SyntaxError(`Unknown operator "${t.operator.value}" between ${r.type} and ${n.type}`)}evaluateFilterExpression(t,e){const r=this.evaluate(t.operand,e);if(t.filter.type==="Identifier"){const n=t.filter;if(r instanceof oe)switch(n.value){case"list":return r;case"first":return r.value[0];case"last":return r.value[r.value.length-1];case"length":return new ae(r.value.length);case"reverse":return new oe(r.value.reverse());case"sort":return new oe(r.value.sort((s,i)=>{if(s.type!==i.type)throw new Error(`Cannot compare different types: ${s.type} and ${i.type}`);switch(s.type){case"NumericValue":return s.value-i.value;case"StringValue":return s.value.localeCompare(i.value);default:throw new Error(`Cannot compare type: ${s.type}`)}}));default:throw new Error(`Unknown ArrayValue filter: ${n.value}`)}else if(r instanceof ee)switch(n.value){case"length":return new ae(r.value.length);case"upper":return new ee(r.value.toUpperCase());case"lower":return new ee(r.value.toLowerCase());case"title":return new ee(mp(r.value));case"capitalize":return new ee(r.value.charAt(0).toUpperCase()+r.value.slice(1));case"trim":return new ee(r.value.trim());default:throw new Error(`Unknown StringValue filter: ${n.value}`)}else if(r instanceof ae)switch(n.value){case"abs":return new ae(Math.abs(r.value));default:throw new Error(`Unknown NumericValue filter: ${n.value}`)}else if(r instanceof Ke)switch(n.value){case"items":return new oe(Array.from(r.value.entries()).map(([s,i])=>new oe([new ee(s),i])));case"length":return new ae(r.value.size);default:throw new Error(`Unknown ObjectValue filter: ${n.value}`)}throw new Error(`Cannot apply filter "${n.value}" to type: ${r.type}`)}else if(t.filter.type==="CallExpression"){const n=t.filter;if(n.callee.type!=="Identifier")throw new Error(`Unknown filter: ${n.callee.type}`);const s=n.callee.value;if(r instanceof oe){switch(s){case"selectattr":{if(r.value.some(d=>!(d instanceof Ke)))throw new Error("`selectattr` can only be applied to array of objects");if(n.args.some(d=>d.type!=="StringLiteral"))throw new Error("arguments of `selectattr` must be strings");const[i,a,o]=n.args.map(d=>this.evaluate(d,e));let l;if(a){const d=e.tests.get(a.value);if(!d)throw new Error(`Unknown test: ${a.value}`);l=d}else l=(...d)=>d[0].__bool__().value;const u=r.value.filter(d=>{const c=d.value.get(i.value);return c?l(c,o):!1});return new oe(u)}}throw new Error(`Unknown ArrayValue filter: ${s}`)}else throw new Error(`Cannot apply filter "${s}" to type: ${r.type}`)}throw new Error(`Unknown filter: ${t.filter.type}`)}evaluateTestExpression(t,e){const r=this.evaluate(t.operand,e),n=e.tests.get(t.test.value);if(!n)throw new Error(`Unknown test: ${t.test.value}`);const s=n(r);return new de(t.negate?!s:s)}evaluateUnaryExpression(t,e){const r=this.evaluate(t.argument,e);switch(t.operator.value){case"not":return new de(!r.value);default:throw new SyntaxError(`Unknown operator: ${t.operator.value}`)}}evalProgram(t,e){return this.evaluateBlock(t.body,e)}evaluateBlock(t,e){let r="";for(const n of t){const s=this.evaluate(n,e);s.type!=="NullValue"&&s.type!=="UndefinedValue"&&(r+=s.value)}return new ee(r)}evaluateIdentifier(t,e){return e.lookupVariable(t.value)}evaluateCallExpression(t,e){const r=[],n=new Map;for(const i of t.args)if(i.type==="KeywordArgumentExpression"){const a=i;n.set(a.key.value,this.evaluate(a.value,e))}else r.push(this.evaluate(i,e));n.size>0&&r.push(new Ke(n));const s=this.evaluate(t.callee,e);if(s.type!=="FunctionValue")throw new Error(`Cannot call something that is not a function: got ${s.type}`);return s.value(r,e)}evaluateSliceExpression(t,e,r){if(!(t instanceof oe||t instanceof ee))throw new Error("Slice object must be an array or string");const n=this.evaluate(e.start,r),s=this.evaluate(e.stop,r),i=this.evaluate(e.step,r);if(!(n instanceof ae||n instanceof Qe))throw new Error("Slice start must be numeric or undefined");if(!(s instanceof ae||s instanceof Qe))throw new Error("Slice stop must be numeric or undefined");if(!(i instanceof ae||i instanceof Qe))throw new Error("Slice step must be numeric or undefined");return t instanceof oe?new oe(fp(t.value,n.value,s.value,i.value)):new ee(fp(Array.from(t.value),n.value,s.value,i.value).join(""))}evaluateMemberExpression(t,e){const r=this.evaluate(t.object,e);let n;if(t.computed){if(t.property.type==="SliceExpression")return this.evaluateSliceExpression(r,t.property,e);n=this.evaluate(t.property,e)}else n=new ee(t.property.value);let s;if(r instanceof Ke){if(!(n instanceof ee))throw new Error(`Cannot access property with non-string: got ${n.type}`);s=r.value.get(n.value)??r.builtins.get(n.value)}else if(r instanceof oe||r instanceof ee)if(n instanceof ae)s=r.value.at(n.value),r instanceof ee&&(s=new ee(r.value.at(n.value)));else if(n instanceof ee)s=r.builtins.get(n.value);else throw new Error(`Cannot access property with non-string/non-number: got ${n.type}`);else{if(!(n instanceof ee))throw new Error(`Cannot access property with non-string: got ${n.type}`);s=r.builtins.get(n.value)}return s instanceof tt?s:new Qe}evaluateSet(t,e){const r=this.evaluate(t.value,e);if(t.assignee.type==="Identifier"){const n=t.assignee.value;e.setVariable(n,r)}else if(t.assignee.type==="MemberExpression"){const n=t.assignee,s=this.evaluate(n.object,e);if(!(s instanceof Ke))throw new Error("Cannot assign to member of non-object");if(n.property.type!=="Identifier")throw new Error("Cannot assign to member with non-identifier property");s.value.set(n.property.value,r)}else throw new Error(`Invalid LHS inside assignment expression: ${JSON.stringify(t.assignee)}`);return new ar}evaluateIf(t,e){const r=this.evaluate(t.test,e);return this.evaluateBlock(r.__bool__().value?t.body:t.alternate,e)}evaluateFor(t,e){const r=new ci(e),n=this.evaluate(t.iterable,r);if(!(n instanceof oe))throw new Error(`Expected iterable type in for loop: got ${n.type}`);let s="";for(let i=0;i<n.value.length;++i){const a=new Map([["index",new ae(i+1)],["index0",new ae(i)],["revindex",new ae(n.value.length-i)],["revindex0",new ae(n.value.length-i-1)],["first",new de(i===0)],["last",new de(i===n.value.length-1)],["length",new ae(n.value.length)],["previtem",i>0?n.value[i-1]:new Qe],["nextitem",i<n.value.length-1?n.value[i+1]:new Qe]]);r.setVariable("loop",new Ke(a));const o=n.value[i];if(t.loopvar.type==="Identifier")r.setVariable(t.loopvar.value,o);else if(t.loopvar.type==="TupleLiteral"){const u=t.loopvar;if(o.type!=="ArrayValue")throw new Error(`Cannot unpack non-iterable type: ${o.type}`);const d=o;if(u.value.length!==d.value.length)throw new Error(`Too ${u.value.length>d.value.length?"few":"many"} items to unpack`);for(let c=0;c<u.value.length;++c){if(u.value[c].type!=="Identifier")throw new Error(`Cannot unpack non-identifier type: ${u.value[c].type}`);r.setVariable(u.value[c].value,d.value[c])}}const l=this.evaluateBlock(t.body,r);s+=l.value}return new ee(s)}evaluate(t,e){if(t===void 0)return new Qe;switch(t.type){case"Program":return this.evalProgram(t,e);case"Set":return this.evaluateSet(t,e);case"If":return this.evaluateIf(t,e);case"For":return this.evaluateFor(t,e);case"NumericLiteral":return new ae(Number(t.value));case"StringLiteral":return new ee(t.value);case"BooleanLiteral":return new de(t.value);case"ArrayLiteral":return new oe(t.value.map(r=>this.evaluate(r,e)));case"TupleLiteral":return new wg(t.value.map(r=>this.evaluate(r,e)));case"ObjectLiteral":{const r=new Map;for(const[n,s]of t.value){const i=this.evaluate(n,e);if(!(i instanceof ee))throw new Error(`Object keys must be strings: got ${i.type}`);r.set(i.value,this.evaluate(s,e))}return new Ke(r)}case"Identifier":return this.evaluateIdentifier(t,e);case"CallExpression":return this.evaluateCallExpression(t,e);case"MemberExpression":return this.evaluateMemberExpression(t,e);case"UnaryExpression":return this.evaluateUnaryExpression(t,e);case"BinaryExpression":return this.evaluateBinaryExpression(t,e);case"FilterExpression":return this.evaluateFilterExpression(t,e);case"TestExpression":return this.evaluateTestExpression(t,e);default:throw new SyntaxError(`Unknown node type: ${t.type}`)}}};function sn(t){switch(typeof t){case"number":return new ae(t);case"string":return new ee(t);case"boolean":return new de(t);case"object":return t===null?new ar:Array.isArray(t)?new oe(t.map(sn)):new Ke(new Map(Object.entries(t).map(([e,r])=>[e,sn(r)])));case"function":return new rt((e,r)=>{const n=t(...e.map(s=>s.value))??null;return sn(n)});default:throw new Error(`Cannot convert to runtime value: ${t}`)}}var bg=class{parsed;constructor(t){const e=rg(t,{lstrip_blocks:!0,trim_blocks:!0});this.parsed=gg(e)}render(t){const e=new ci;e.set("false",!1),e.set("true",!0),e.set("raise_exception",s=>{throw new Error(s)}),e.set("range",_g);for(const[s,i]of Object.entries(t))e.set(s,i);return new yg(e).run(this.parsed).value}};async function gp(t,e){const r=await Promise.all([ht(t,"tokenizer.json",!0,e),ht(t,"tokenizer_config.json",!0,e)]);return e.legacy!==null&&(r[1].legacy=e.legacy),r}function vg(t,e){const r=[];let n=0;for(const s of t.matchAll(e)){const i=s[0];n<s.index&&r.push(t.slice(n,s.index)),i.length>0&&r.push(i),n=s.index+i.length}return n<t.length&&r.push(t.slice(n)),r}function an(t,e=!0){if(t.Regex!==void 0){let r=t.Regex.replace(/\\([#&~])/g,"$1");for(const[n,s]of Sg)r=r.replaceAll(n,s);return new RegExp(r,"gu")}else if(t.String!==void 0){const r=Ci(t.String);return new RegExp(e?r:`(${r})`,"gu")}else return console.warn("Unknown pattern type:",t),null}function pi(t){return new Map(Object.entries(t))}function _p(t){const e=t.dims;switch(e.length){case 1:return t.tolist();case 2:if(e[0]!==1)throw new Error("Unable to decode tensor with `batch size !== 1`. Use `tokenizer.batch_decode(...)` for batched inputs.");return t.tolist()[0];default:throw new Error(`Expected tensor to have 1-2 dimensions, got ${e.length}.`)}}function hi(t){return t.replace(/ \./g,".").replace(/ \?/g,"?").replace(/ \!/g,"!").replace(/ ,/g,",").replace(/ \' /g,"'").replace(/ n\'t/g,"n't").replace(/ \'m/g,"'m").replace(/ \'s/g,"'s").replace(/ \'ve/g,"'ve").replace(/ \'re/g,"'re")}function wp(t){return t.replace(/[\u0300-\u036f]/g,"")}function $g(t){return wp(t.toLowerCase())}function yp(t){return t>=19968&&t<=40959||t>=13312&&t<=19903||t>=131072&&t<=173791||t>=173824&&t<=177983||t>=177984&&t<=178207||t>=178208&&t<=183983||t>=63744&&t<=64255||t>=194560&&t<=195103}function xg(t,e,r){const n=[];let s=0;for(;s<t.length;){if(n.push(t[s]),(r.get(t[s])??e)!==e){++s;continue}for(;s<t.length&&(r.get(t[s])??e)===e;)++s}return n}function kg(t){return t.match(/\S+/g)||[]}const or="\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E",Sg=new Map([["(?i:'s|'t|'re|'ve|'m|'ll|'d)","(?:'([sS]|[tT]|[rR][eE]|[vV][eE]|[mM]|[lL][lL]|[dD]))"]]);class Eg{constructor(e){this.content=e.content,this.id=e.id,this.single_word=e.single_word??!1,this.lstrip=e.lstrip??!1,this.rstrip=e.rstrip??!1,this.special=e.special??!1,this.normalized=e.normalized??null}}class lr extends Me{constructor(e){super(),this.config=e,this.vocab=[],this.tokens_to_ids=new Map,this.unk_token_id=void 0,this.unk_token=void 0,this.end_of_word_suffix=void 0,this.fuse_unk=this.config.fuse_unk??!1}static fromConfig(e,...r){switch(e.type){case"WordPiece":return new Tg(e);case"Unigram":return new Ig(e,...r);case"BPE":return new Cg(e);default:if(e.vocab)return new zg(e,...r);throw new Error(`Unknown TokenizerModel type: ${e.type}`)}}_call(e){let r=this.encode(e);return this.fuse_unk&&(r=xg(r,this.unk_token_id,this.tokens_to_ids)),r}encode(e){throw Error("encode should be implemented in subclass.")}convert_tokens_to_ids(e){return e.map(r=>this.tokens_to_ids.get(r)??this.unk_token_id)}convert_ids_to_tokens(e){return e.map(r=>this.vocab[r]??this.unk_token)}}class Tg extends lr{constructor(e){super(e),this.tokens_to_ids=pi(e.vocab),this.unk_token_id=this.tokens_to_ids.get(e.unk_token),this.unk_token=e.unk_token,this.max_input_chars_per_word=e.max_input_chars_per_word??100,this.vocab=new Array(this.tokens_to_ids.size);for(const[r,n]of this.tokens_to_ids)this.vocab[n]=r}encode(e){const r=[];for(const n of e){const s=[...n];if(s.length>this.max_input_chars_per_word){r.push(this.unk_token);continue}let i=!1,a=0;const o=[];for(;a<s.length;){let l=s.length,u=null;for(;a<l;){let d=s.slice(a,l).join("");if(a>0&&(d=this.config.continuing_subword_prefix+d),this.tokens_to_ids.has(d)){u=d;break}--l}if(u===null){i=!0;break}o.push(u),a=l}i?r.push(this.unk_token):r.push(...o)}return r}}class Ig extends lr{constructor(e,r){super(e);const n=e.vocab.length;this.vocab=new Array(n),this.scores=new Array(n);for(let s=0;s<n;++s){const i=e.vocab[s];this.vocab[s]=i[0],this.scores[s]=i[1]}this.unk_token_id=e.unk_id,this.unk_token=this.vocab[e.unk_id],this.tokens_to_ids=new Map(this.vocab.map((s,i)=>[s,i])),this.bosToken=" ",this.bosTokenId=this.tokens_to_ids.get(this.bosToken),this.eosToken=r.eos_token,this.eosTokenId=this.tokens_to_ids.get(this.eosToken),this.unkToken=this.vocab[this.unk_token_id],this.minScore=df(this.scores)[0],this.unkScore=this.minScore-10,this.scores[this.unk_token_id]=this.unkScore,this.trie=new Ym,this.trie.extend(this.vocab),this.fuse_unk=!0}populateNodes(e){const r=e.sentence,n=r.length;let s=0;for(;s<n;){let a=!1;for(let o of this.trie.commonPrefixSearch(r.slice(s))){const l=this.tokens_to_ids.get(o),u=this.scores[l],d=o.length;e.insert(s,d,u,l),!a&&d===1&&(a=!0)}a||e.insert(s,1,this.unkScore,this.unk_token_id),s+=1}}tokenize(e){const r=new Zm(e,this.bosTokenId,this.eosTokenId);return this.populateNodes(r),r.tokens()}encode(e){const r=[];for(const n of e){const s=this.tokenize(n);r.push(...s)}return r}}const bp=(()=>{const t=[...Array.from({length:94},(s,i)=>i+33),...Array.from({length:12},(s,i)=>i+161),...Array.from({length:82},(s,i)=>i+174)],e=t.slice();let r=0;for(let s=0;s<256;++s)t.includes(s)||(t.push(s),e.push(256+r),r+=1);const n=e.map(s=>String.fromCharCode(s));return Object.fromEntries(t.map((s,i)=>[s,n[i]]))})(),Mg=rf(bp);class Cg extends lr{constructor(e){super(e),this.BPE_SPLIT_TOKEN=" ",this.tokens_to_ids=pi(e.vocab),this.unk_token_id=this.tokens_to_ids.get(e.unk_token),this.unk_token=e.unk_token,this.vocab=new Array(this.tokens_to_ids.size);for(const[r,n]of this.tokens_to_ids)this.vocab[n]=r;this.bpe_ranks=new Map(e.merges.map((r,n)=>[r,n])),this.merges=e.merges.map(r=>r.split(this.BPE_SPLIT_TOKEN)),this.end_of_word_suffix=e.end_of_word_suffix,this.continuing_subword_suffix=e.continuing_subword_suffix??null,this.byte_fallback=this.config.byte_fallback??!1,this.byte_fallback&&(this.text_encoder=new TextEncoder),this.cache=new Map}bpe(e){if(e.length===0)return[];const r=this.cache.get(e);if(r!==void 0)return r;const n=Array.from(e);this.end_of_word_suffix&&(n[n.length-1]+=this.end_of_word_suffix);let s=[];if(n.length>1){const i=new Xm((l,u)=>l.score<u.score);let a={token:n[0],bias:0,prev:null,next:null},o=a;for(let l=1;l<n.length;++l){const u={bias:l/n.length,token:n[l],prev:o,next:null};o.next=u,this._add_node(i,o),o=u}for(;!i.isEmpty();){const l=i.pop();if(l.deleted||!l.next||l.next.deleted)continue;if(l.deleted=!0,l.next.deleted=!0,l.prev){const d={...l.prev};l.prev.deleted=!0,l.prev=d,d.prev?d.prev.next=d:a=d}const u={token:l.token+l.next.token,bias:l.bias,prev:l.prev,next:l.next.next};u.prev?(u.prev.next=u,this._add_node(i,u.prev)):a=u,u.next&&(u.next.prev=u,this._add_node(i,u))}for(let l=a;l!==null;l=l.next)s.push(l.token)}else s=n;if(this.continuing_subword_suffix)for(let i=0;i<s.length-1;++i)s[i]+=this.continuing_subword_suffix;return this.cache.set(e,s),s}_add_node(e,r){const n=this.bpe_ranks.get(r.token+this.BPE_SPLIT_TOKEN+r.next.token);n!==void 0&&(r.score=n+r.bias,e.push(r))}encode(e){const r=[];for(const n of e){const s=this.bpe(n);for(const i of s)this.tokens_to_ids.has(i)?r.push(i):this.byte_fallback?r.push(...Array.from(this.text_encoder.encode(i)).map(a=>`<0x${a.toString(16).toUpperCase().padStart(2,"0")}>`)):r.push(this.unk_token)}return r}}class zg extends lr{constructor(e,r){super(e),this.tokens_to_ids=pi(r.target_lang?e.vocab[r.target_lang]:e.vocab),this.bos_token=r.bos_token,this.bos_token_id=this.tokens_to_ids.get(this.bos_token),this.eos_token=r.eos_token,this.eos_token_id=this.tokens_to_ids.get(this.eos_token),this.pad_token=r.pad_token,this.pad_token_id=this.tokens_to_ids.get(this.pad_token),this.unk_token=r.unk_token,this.unk_token_id=this.tokens_to_ids.get(this.unk_token),this.vocab=new Array(this.tokens_to_ids.size);for(const[n,s]of this.tokens_to_ids)this.vocab[s]=n}encode(e){return e}}class Ce extends Me{constructor(e){super(),this.config=e}static fromConfig(e){if(e===null)return null;switch(e.type){case"BertNormalizer":return new Ug(e);case"Precompiled":return new a_(e);case"Sequence":return new Ng(e);case"Replace":return new Ag(e);case"NFC":return new Pg(e);case"NFKC":return new Og(e);case"NFKD":return new Bg(e);case"Strip":return new Rg(e);case"StripAccents":return new Dg(e);case"Lowercase":return new Lg(e);case"Prepend":return new Fg(e);default:throw new Error(`Unknown Normalizer type: ${e.type}`)}}normalize(e){throw Error("normalize should be implemented in subclass.")}_call(e){return this.normalize(e)}}class Ag extends Ce{normalize(e){const r=an(this.config.pattern);return r===null?e:e.replaceAll(r,this.config.content)}}class Pg extends Ce{normalize(e){return e=e.normalize("NFC"),e}}class Og extends Ce{normalize(e){return e=e.normalize("NFKC"),e}}class Bg extends Ce{normalize(e){return e=e.normalize("NFKD"),e}}class Rg extends Ce{normalize(e){return this.config.strip_left&&this.config.strip_right?e=e.trim():(this.config.strip_left&&(e=e.trimStart()),this.config.strip_right&&(e=e.trimEnd())),e}}class Dg extends Ce{normalize(e){return e=wp(e),e}}class Lg extends Ce{normalize(e){return e=e.toLowerCase(),e}}class Fg extends Ce{normalize(e){return e=this.config.prepend+e,e}}class Ng extends Ce{constructor(e){super(e),this.normalizers=e.normalizers.map(r=>Ce.fromConfig(r))}normalize(e){return this.normalizers.reduce((r,n)=>n.normalize(r),e)}}class Ug extends Ce{_tokenize_chinese_chars(e){const r=[];for(let n=0;n<e.length;++n){const s=e[n],i=s.charCodeAt(0);yp(i)?(r.push(" "),r.push(s),r.push(" ")):r.push(s)}return r.join("")}stripAccents(e){return e.normalize("NFD").replace(/[\u0300-\u036f]/g,"")}_is_control(e){switch(e){case"	":case`
`:case"\r":return!1;default:return/^\p{Cc}|\p{Cf}|\p{Co}|\p{Cs}$/u.test(e)}}_clean_text(e){const r=[];for(const n of e){const s=n.charCodeAt(0);s===0||s===65533||this._is_control(n)||(/^\s$/.test(n)?r.push(" "):r.push(n))}return r.join("")}normalize(e){return this.config.clean_text&&(e=this._clean_text(e)),this.config.handle_chinese_chars&&(e=this._tokenize_chinese_chars(e)),this.config.lowercase?(e=e.toLowerCase(),this.config.strip_accents!==!1&&(e=this.stripAccents(e))):this.config.strip_accents&&(e=this.stripAccents(e)),e}}class De extends Me{static fromConfig(e){if(e===null)return null;switch(e.type){case"BertPreTokenizer":return new qg(e);case"Sequence":return new o_(e);case"Whitespace":return new l_(e);case"WhitespaceSplit":return new u_(e);case"Metaspace":return new xp(e);case"ByteLevel":return new Vg(e);case"Split":return new Gg(e);case"Punctuation":return new jg(e);case"Digits":return new Wg(e);case"Replace":return new d_(e);default:throw new Error(`Unknown PreTokenizer type: ${e.type}`)}}pre_tokenize_text(e,r){throw Error("pre_tokenize_text should be implemented in subclass.")}pre_tokenize(e,r){return(Array.isArray(e)?e.map(n=>this.pre_tokenize_text(n,r)):this.pre_tokenize_text(e,r)).flat()}_call(e,r){return this.pre_tokenize(e,r)}}class qg extends De{constructor(e){super(),this.pattern=new RegExp(`[^\\s${or}]+|[${or}]`,"gu")}pre_tokenize_text(e,r){return e.trim().match(this.pattern)||[]}}class Vg extends De{constructor(e){super(),this.config=e,this.add_prefix_space=this.config.add_prefix_space,this.trim_offsets=this.config.trim_offsets,this.use_regex=this.config.use_regex??!0,this.pattern=/'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu,this.byte_encoder=bp,this.text_encoder=new TextEncoder}pre_tokenize_text(e,r){return this.add_prefix_space&&!e.startsWith(" ")&&(e=" "+e),(this.use_regex?e.match(this.pattern)||[]:[e]).map(s=>Array.from(this.text_encoder.encode(s),i=>this.byte_encoder[i]).join(""))}}class Gg extends De{constructor(e){super(),this.config=e,this.pattern=an(this.config.pattern,this.config.invert)}pre_tokenize_text(e,r){return this.pattern===null?[]:this.config.invert?e.match(this.pattern)||[]:vg(e,this.pattern)}}class jg extends De{constructor(e){super(),this.config=e,this.pattern=new RegExp(`[^${or}]+|[${or}]+`,"gu")}pre_tokenize_text(e,r){return e.match(this.pattern)||[]}}class Wg extends De{constructor(e){super(),this.config=e;const r=`[^\\d]+|\\d${this.config.individual_digits?"":"+"}`;this.pattern=new RegExp(r,"gu")}pre_tokenize_text(e,r){return e.match(this.pattern)||[]}}class on extends Me{constructor(e){super(),this.config=e}static fromConfig(e){if(e===null)return null;switch(e.type){case"TemplateProcessing":return new Hg(e);case"ByteLevel":return new Kg(e);case"RobertaProcessing":return new $p(e);case"BertProcessing":return new vp(e);default:throw new Error(`Unknown PostProcessor type: ${e.type}`)}}post_process(e,...r){throw Error("post_process should be implemented in subclass.")}_call(e,...r){return this.post_process(e,...r)}}class vp extends on{constructor(e){super(e),this.cls=e.cls[0],this.sep=e.sep[0]}post_process(e,r=null,{add_special_tokens:n=!0}={}){n&&(e=ge([this.cls],e,[this.sep]));let s=new Array(e.length).fill(0);if(r!==null){const i=n&&this instanceof $p?[this.sep]:[],a=n?[this.sep]:[];e=ge(e,i,r,a),s=ge(s,new Array(r.length+i.length+a.length).fill(1))}return{tokens:e,token_type_ids:s}}}class $p extends vp{}class Hg extends on{constructor(e){super(e),this.single=e.single,this.pair=e.pair}post_process(e,r=null,{add_special_tokens:n=!0}={}){const s=r===null?this.single:this.pair;let i=[],a=[];for(const o of s)"SpecialToken"in o?n&&(i.push(o.SpecialToken.id),a.push(o.SpecialToken.type_id)):"Sequence"in o&&(o.Sequence.id==="A"?(i=ge(i,e),a=ge(a,new Array(e.length).fill(o.Sequence.type_id))):o.Sequence.id==="B"&&(i=ge(i,r),a=ge(a,new Array(r.length).fill(o.Sequence.type_id))));return{tokens:i,token_type_ids:a}}}class Kg extends on{post_process(e,r=null){return r&&(e=ge(e,r)),{tokens:e}}}class ze extends Me{constructor(e){super(),this.config=e,this.added_tokens=[],this.end_of_word_suffix=null,this.trim_offsets=e.trim_offsets}static fromConfig(e){if(e===null)return null;switch(e.type){case"WordPiece":return new Jg(e);case"Metaspace":return new i_(e);case"ByteLevel":return new e_(e);case"Replace":return new Qg(e);case"ByteFallback":return new Xg(e);case"Fuse":return new Yg(e);case"Strip":return new Zg(e);case"Sequence":return new r_(e);case"CTC":return new t_(e);case"BPEDecoder":return new n_(e);default:throw new Error(`Unknown Decoder type: ${e.type}`)}}_call(e){return this.decode(e)}decode(e){return this.decode_chain(e).join("")}decode_chain(e){throw Error("`decode_chain` should be implemented in subclass.")}}class Qg extends ze{decode_chain(e){const r=an(this.config.pattern);return r===null?e:e.map(n=>n.replaceAll(r,this.config.content))}}class Xg extends ze{constructor(e){super(e),this.text_decoder=new TextDecoder}decode_chain(e){const r=[];let n=[];for(const s of e){let i=null;if(s.length===6&&s.startsWith("<0x")&&s.endsWith(">")){const a=parseInt(s.slice(3,5),16);isNaN(a)||(i=a)}if(i!==null)n.push(i);else{if(n.length>0){const a=this.text_decoder.decode(Uint8Array.from(n));r.push(a),n=[]}r.push(s)}}if(n.length>0){const s=this.text_decoder.decode(Uint8Array.from(n));r.push(s),n=[]}return r}}class Yg extends ze{decode_chain(e){return[e.join("")]}}class Zg extends ze{constructor(e){super(e),this.content=this.config.content,this.start=this.config.start,this.stop=this.config.stop}decode_chain(e){return e.map(r=>{let n=0;for(let i=0;i<this.start&&r[i]===this.content;++i){n=i+1;continue}let s=r.length;for(let i=0;i<this.stop;++i){const a=r.length-i-1;if(r[a]===this.content){s=a;continue}else break}return r.slice(n,s)})}}class Jg extends ze{constructor(e){super(e),this.cleanup=e.cleanup}decode_chain(e){return e.map((r,n)=>(n!==0&&(r.startsWith(this.config.prefix)?r=r.replace(this.config.prefix,""):r=" "+r),this.cleanup&&(r=hi(r)),r))}}class e_ extends ze{constructor(e){super(e),this.byte_decoder=Mg,this.text_decoder=new TextDecoder("utf-8",{fatal:!1,ignoreBOM:!0}),this.end_of_word_suffix=null}convert_tokens_to_string(e){const r=e.join(""),n=new Uint8Array([...r].map(i=>this.byte_decoder[i]));return this.text_decoder.decode(n)}decode_chain(e){const r=[];let n=[];for(const s of e)this.added_tokens.find(i=>i.content===s)!==void 0?(n.length>0&&(r.push(this.convert_tokens_to_string(n)),n=[]),r.push(s)):n.push(s);return n.length>0&&r.push(this.convert_tokens_to_string(n)),r}}class t_ extends ze{constructor(e){super(e),this.pad_token=this.config.pad_token,this.word_delimiter_token=this.config.word_delimiter_token,this.cleanup=this.config.cleanup}convert_tokens_to_string(e){if(e.length===0)return"";const r=[e[0]];for(let i=1;i<e.length;++i)e[i]!==r.at(-1)&&r.push(e[i]);let s=r.filter(i=>i!==this.pad_token).join("");return this.cleanup&&(s=hi(s).replaceAll(this.word_delimiter_token," ").trim()),s}decode_chain(e){return[this.convert_tokens_to_string(e)]}}class r_ extends ze{constructor(e){super(e),this.decoders=e.decoders.map(r=>ze.fromConfig(r))}decode_chain(e){return this.decoders.reduce((r,n)=>n.decode_chain(r),e)}}class n_ extends ze{constructor(e){super(e),this.suffix=this.config.suffix}decode_chain(e){return e.map((r,n)=>r.replaceAll(this.suffix,n===e.length-1?"":" "))}}class s_ extends ze{decode_chain(e){let r="";for(let n=1;n<e.length;n+=2)r+=e[n];return[r]}}class xp extends De{constructor(e){super(),this.addPrefixSpace=e.add_prefix_space,this.replacement=e.replacement,this.strRep=e.str_rep||this.replacement,this.prepend_scheme=e.prepend_scheme??"always"}pre_tokenize_text(e,{section_index:r=void 0}={}){let n=e.replaceAll(" ",this.strRep);return this.addPrefixSpace&&!n.startsWith(this.replacement)&&(this.prepend_scheme==="always"||this.prepend_scheme==="first"&&r===0)&&(n=this.strRep+n),[n]}}class i_ extends ze{constructor(e){super(e),this.addPrefixSpace=e.add_prefix_space,this.replacement=e.replacement}decode_chain(e){const r=[];for(let n=0;n<e.length;++n){let s=e[n].replaceAll(this.replacement," ");this.addPrefixSpace&&n==0&&s.startsWith(" ")&&(s=s.substring(1)),r.push(s)}return r}}class a_ extends Ce{constructor(e){super(e),this.charsmap=e.precompiled_charsmap}normalize(e){return e=e.replace(/[\u0001-\u0008\u000B\u000E-\u001F\u007F\u008F\u009F]/gm,""),e=e.replace(/[\u0009\u000A\u000C\u000D\u1680\u200B\u200C\u200E\u200F\u2028\u2029\u2581\uFEFF\uFFFD]/gm," "),e.includes("～")?e=e.split("～").map(n=>n.normalize("NFKC")).join("～"):e=e.normalize("NFKC"),e}}class o_ extends De{constructor(e){super(),this.tokenizers=e.pretokenizers.map(r=>De.fromConfig(r))}pre_tokenize_text(e,r){return this.tokenizers.reduce((n,s)=>s.pre_tokenize(n,r),[e])}}class l_ extends De{constructor(e){super()}pre_tokenize_text(e,r){return e.match(/\w+|[^\w\s]+/g)||[]}}class u_ extends De{constructor(e){super()}pre_tokenize_text(e,r){return kg(e)}}class d_ extends De{constructor(e){super(),this.config=e,this.pattern=an(this.config.pattern),this.content=this.config.content}pre_tokenize_text(e,r){return this.pattern===null?[e]:[e.replaceAll(this.pattern,this.config.content)]}}const c_=["bos_token","eos_token","unk_token","sep_token","pad_token","cls_token","mask_token"];function p_(t,e,r,n){for(const s of Object.keys(t)){const i=e-t[s].length,a=r(s),o=new Array(i).fill(a);t[s]=n==="right"?ge(t[s],o):ge(o,t[s])}}function h_(t,e){for(const r of Object.keys(t))t[r].length=e}class W extends Me{return_token_type_ids=!1;_default_chat_template=`{% for message in messages %}{{'<|im_start|>' + message['role'] + '
' + message['content'] + '<|im_end|>' + '
'}}{% endfor %}{% if add_generation_prompt %}{{ '<|im_start|>assistant
' }}{% endif %}`;padding_side="right";constructor(e,r){super(),this._tokenizer_config=r,this.normalizer=Ce.fromConfig(e.normalizer),this.pre_tokenizer=De.fromConfig(e.pre_tokenizer),this.model=lr.fromConfig(e.model,r),this.post_processor=on.fromConfig(e.post_processor),this.decoder=ze.fromConfig(e.decoder),this.special_tokens=[],this.all_special_ids=[],this.added_tokens=[];for(const n of e.added_tokens){const s=new Eg(n);this.added_tokens.push(s),this.model.tokens_to_ids.set(s.content,s.id),this.model.vocab[s.id]=s.content,s.special&&(this.special_tokens.push(s.content),this.all_special_ids.push(s.id))}if(this.additional_special_tokens=r.additional_special_tokens??[],this.special_tokens.push(...this.additional_special_tokens),this.special_tokens=[...new Set(this.special_tokens)],this.decoder&&(this.decoder.added_tokens=this.added_tokens,this.decoder.end_of_word_suffix=this.model.end_of_word_suffix),this.added_tokens_regex=this.added_tokens.length>0?new RegExp(this.added_tokens.map(n=>`${n.lstrip?"\\s*":""}(${Ci(n.content)})${n.rstrip?"\\s*":""}`).join("|")):null,this.mask_token=this.getToken("mask_token"),this.mask_token_id=this.model.tokens_to_ids.get(this.mask_token),this.pad_token=this.getToken("pad_token","eos_token"),this.pad_token_id=this.model.tokens_to_ids.get(this.pad_token),this.sep_token=this.getToken("sep_token"),this.sep_token_id=this.model.tokens_to_ids.get(this.sep_token),this.unk_token=this.getToken("unk_token"),this.unk_token_id=this.model.tokens_to_ids.get(this.unk_token),this.model_max_length=r.model_max_length,this.remove_space=r.remove_space,this.clean_up_tokenization_spaces=r.clean_up_tokenization_spaces??!0,this.do_lowercase_and_remove_accent=r.do_lowercase_and_remove_accent??!1,r.padding_side&&(this.padding_side=r.padding_side),this.legacy=!1,this.chat_template=r.chat_template??null,Array.isArray(this.chat_template)){const n=Object.create(null);for(const{name:s,template:i}of this.chat_template){if(typeof s!="string"||typeof i!="string")throw new Error('Chat template must be a list of objects with "name" and "template" properties');n[s]=i}this.chat_template=n}this._compiled_template_cache=new Map}getToken(...e){for(const r of e){const n=this._tokenizer_config[r];if(n)if(typeof n=="object"){if(n.__type==="AddedToken")return n.content;throw Error(`Unknown token: ${n}`)}else return n}return null}static async from_pretrained(e,{progress_callback:r=null,config:n=null,cache_dir:s=null,local_files_only:i=!1,revision:a="main",legacy:o=null}={}){const l=await gp(e,{progress_callback:r,config:n,cache_dir:s,local_files_only:i,revision:a,legacy:o});return new this(...l)}_call(e,{text_pair:r=null,add_special_tokens:n=!0,padding:s=!1,truncation:i=null,max_length:a=null,return_tensor:o=!0}={}){const l=Array.isArray(e);let u;if(l){if(e.length===0)throw Error("text array must be non-empty");if(r!==null){if(Array.isArray(r)){if(e.length!==r.length)throw Error("text and text_pair must have the same length")}else throw Error("text_pair must also be an array");u=e.map((c,p)=>this._encode_plus(c,{text_pair:r[p],add_special_tokens:n}))}else u=e.map(c=>this._encode_plus(c,{add_special_tokens:n}))}else{if(e==null)throw Error("text may not be null or undefined");if(Array.isArray(r))throw Error("When specifying `text_pair`, since `text` is a string, `text_pair` must also be a string (i.e., not an array).");u=[this._encode_plus(e,{text_pair:r,add_special_tokens:n})]}if(a===null?s==="max_length"?a=this.model_max_length:a=In(u.map(c=>c.input_ids.length))[0]:i||console.warn("Truncation was not explicitly activated but `max_length` is provided a specific value, please use `truncation=true` to explicitly truncate examples to max length."),a=Math.min(a,this.model_max_length),s||i)for(let c=0;c<u.length;++c)u[c].input_ids.length!==a&&(u[c].input_ids.length>a?i&&h_(u[c],a):s&&p_(u[c],a,p=>p==="input_ids"?this.pad_token_id:0,this.padding_side));const d={};if(o){if(!(s&&i)&&u.some(p=>{for(const h of Object.keys(p))if(p[h].length!==u[0][h]?.length)return!0;return!1}))throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=true' and 'truncation=true' to have batched tensors with the same length.");const c=[u.length,u[0].input_ids.length];for(const p of Object.keys(u[0]))d[p]=new Q("int64",BigInt64Array.from(u.flatMap(h=>h[p]).map(BigInt)),c)}else{for(const c of Object.keys(u[0]))d[c]=u.map(p=>p[c]);if(!l)for(const c of Object.keys(d))d[c]=d[c][0]}return d}_encode_text(e){return e===null?null:(this.added_tokens_regex?e.split(this.added_tokens_regex).filter(s=>s):[e]).map((s,i)=>{if(this.added_tokens.find(o=>o.content===s)!==void 0)return s;{if(this.remove_space===!0&&(s=s.trim().split(/\s+/).join(" ")),this.do_lowercase_and_remove_accent&&(s=$g(s)),this.normalizer!==null&&(s=this.normalizer(s)),s.length===0)return[];const o=this.pre_tokenizer!==null?this.pre_tokenizer(s,{section_index:i}):[s];return this.model(o)}}).flat()}_encode_plus(e,{text_pair:r=null,add_special_tokens:n=!0}={}){const{tokens:s,token_type_ids:i}=this._tokenize_helper(e,{pair:r,add_special_tokens:n}),a=this.model.convert_tokens_to_ids(s),o={input_ids:a,attention_mask:new Array(a.length).fill(1)};return this.return_token_type_ids&&i&&(o.token_type_ids=i),o}_tokenize_helper(e,{pair:r=null,add_special_tokens:n=!1}={}){const s=this._encode_text(e),i=this._encode_text(r);return this.post_processor?this.post_processor(s,i,{add_special_tokens:n}):{tokens:ge(s??[],i??[])}}tokenize(e,{pair:r=null,add_special_tokens:n=!1}={}){return this._tokenize_helper(e,{pair:r,add_special_tokens:n}).tokens}encode(e,{text_pair:r=null,add_special_tokens:n=!0}={}){return this._encode_plus(e,{text_pair:r,add_special_tokens:n}).input_ids}batch_decode(e,r={}){return e instanceof Q&&(e=e.tolist()),e.map(n=>this.decode(n,r))}decode(e,r={}){if(e instanceof Q&&(e=_p(e)),!Array.isArray(e)||e.length===0||!nf(e[0]))throw Error("token_ids must be a non-empty array of integers.");return this.decode_single(e,r)}decode_single(e,{skip_special_tokens:r=!1,clean_up_tokenization_spaces:n=null}){let s=this.model.convert_ids_to_tokens(e);r&&(s=s.filter(a=>!this.special_tokens.includes(a)));let i=this.decoder?this.decoder(s):s.join(" ");return this.decoder&&this.decoder.end_of_word_suffix&&(i=i.replaceAll(this.decoder.end_of_word_suffix," "),r&&(i=i.trim())),(n??this.clean_up_tokenization_spaces)&&(i=hi(i)),i}get default_chat_template(){return this._warned_about_chat_template||(console.warn("No chat template is defined for this tokenizer - using a default chat template that implements the ChatML format. If the default is not appropriate for your model, please set `tokenizer.chat_template` to an appropriate template. See https://huggingface.co/docs/transformers/main/chat_templating for more information."),this._warned_about_chat_template=!0),this._default_chat_template}apply_chat_template(e,{chat_template:r=null,add_generation_prompt:n=!1,tokenize:s=!0,padding:i=!1,truncation:a=!1,max_length:o=null,return_tensor:l=!0,return_dict:u=!1,tokenizer_kwargs:d={},...c}={}){if(this.chat_template&&typeof this.chat_template=="object"||this.chat_template===null&&this.default_chat_template&&typeof this.default_chat_template=="object"){const m=this.chat_template??this.default_chat_template;if(r!==null&&Object.hasOwn(m,r))r=m[r];else if(r===null&&"default"in m)r=m.default;else if(r===null)throw Error(`This model has multiple chat templates with no default specified! Please either pass a chat template or the name of the template you wish to use to the 'chat_template' argument. Available template names are ${Object.keys(m).sort()}.`)}else r??=this.chat_template??this.default_chat_template;if(typeof r!="string")throw Error(`chat_template must be a string, but got ${typeof r}`);let p=this._compiled_template_cache.get(r);p===void 0&&(p=new bg(r),this._compiled_template_cache.set(r,p));const h=Object.create(null);for(const m of c_){const _=this.getToken(m);_&&(h[m]=_)}const f=p.render({messages:e,add_generation_prompt:n,...h,...c});if(s){const m=this._call(f,{add_special_tokens:!1,padding:i,truncation:a,max_length:o,return_tensor:l,...d});return u?m:m.input_ids}return f}}class f_ extends W{return_token_type_ids=!0}class m_ extends W{return_token_type_ids=!0}class g_ extends W{return_token_type_ids=!0}class __ extends W{return_token_type_ids=!0}class w_ extends W{return_token_type_ids=!0}class y_ extends W{return_token_type_ids=!0}class b_ extends W{return_token_type_ids=!0}class v_ extends W{return_token_type_ids=!0}class $_ extends W{return_token_type_ids=!0}class x_ extends W{}class k_ extends W{}class S_ extends W{return_token_type_ids=!0;constructor(e,r){super(e,r),console.warn('WARNING: `XLMTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.')}}class E_ extends W{return_token_type_ids=!0}class T_ extends W{}class kp extends W{_default_chat_template='{% for message in messages %}" "{{ message.content }}{{ eos_token }}" "{% endfor %}'}class I_ extends W{}class Sp extends W{constructor(e,r){super(e,r),this.languageRegex=/^[a-z]{2}_[A-Z]{2}$/,this.language_codes=this.special_tokens.filter(n=>this.languageRegex.test(n)),this.lang_to_token=n=>n}_build_translation_inputs(e,r,n){return fi(this,e,r,n)}}class M_ extends Sp{}class C_ extends W{}class z_ extends kp{constructor(e,r){const n=".,!?…。，、।۔،",s=e.pre_tokenizer?.pretokenizers[0]?.pattern;s&&s.Regex===` ?[^(\\s|[${n}])]+`&&(s.Regex=` ?[^\\s${n}]+`),super(e,r)}}const ln="▁";class Ep extends W{_default_chat_template=`{% if messages[0]['role'] == 'system' %}{% set loop_messages = messages[1:] %}{% set system_message = messages[0]['content'] %}{% elif USE_DEFAULT_PROMPT == true and not '<<SYS>>' in messages[0]['content'] %}{% set loop_messages = messages %}{% set system_message = 'DEFAULT_SYSTEM_MESSAGE' %}{% else %}{% set loop_messages = messages %}{% set system_message = false %}{% endif %}{% for message in loop_messages %}{% if (message['role'] == 'user') != (loop.index0 % 2 == 0) %}{{ raise_exception('Conversation roles must alternate user/assistant/user/assistant/...') }}{% endif %}{% if loop.index0 == 0 and system_message != false %}{% set content = '<<SYS>>
' + system_message + '
<</SYS>>

' + message['content'] %}{% else %}{% set content = message['content'] %}{% endif %}{% if message['role'] == 'user' %}{{ bos_token + '[INST] ' + content.strip() + ' [/INST]' }}{% elif message['role'] == 'system' %}{{ '<<SYS>>
' + content.strip() + '
<</SYS>>

' }}{% elif message['role'] == 'assistant' %}{{ ' '  + content.strip() + ' ' + eos_token }}{% endif %}{% endfor %}`;DEFAULT_SYSTEM_PROMPT=`You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.

If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.`;padding_side="left";constructor(e,r){super(e,r),this.use_default_system_prompt=r.use_default_system_prompt??!1,this.legacy=r.legacy??!0,this.legacy||(this.normalizer=null,this.pre_tokenizer=new xp({replacement:ln,add_prefix_space:!0,prepend_scheme:"first"}))}_encode_text(e){if(e===null)return null;if(this.legacy||e.length===0)return super._encode_text(e);let r=super._encode_text(ln+e.replaceAll(ln," "));return r.length>1&&r[0]===ln&&this.special_tokens.includes(r[1])&&(r=r.slice(1)),r}get default_chat_template(){return super.default_chat_template.replaceAll("USE_DEFAULT_PROMPT",this.use_default_system_prompt?"true":"false").replaceAll("DEFAULT_SYSTEM_MESSAGE",this.DEFAULT_SYSTEM_PROMPT.replaceAll(`
`,"\\n").replaceAll("'","\\'"))}}class A_ extends Ep{}class P_ extends W{}class O_ extends W{}class B_ extends W{}class R_ extends W{}class D_ extends W{}class L_ extends W{}class F_ extends W{_default_chat_template=`{% if messages[0]['role'] == 'system' %}{{ raise_exception('System role not supported') }}{% endif %}{% for message in messages %}{% if (message['role'] == 'user') != (loop.index0 % 2 == 0) %}{{ raise_exception('Conversation roles must alternate user/assistant/user/assistant/...') }}{% endif %}{% if (message['role'] == 'assistant') %}{% set role = 'model' %}{% else %}{% set role = message['role'] %}{% endif %}{{ '<start_of_turn>' + role + '
' + message['content'] | trim + '<end_of_turn>
' }}{% endfor %}{% if add_generation_prompt %}{{'<start_of_turn>model
'}}{% endif %}`}class N_ extends W{}function fi(t,e,r,n){if(!("language_codes"in t)||!Array.isArray(t.language_codes))throw new Error("Tokenizer must have `language_codes` attribute set and it should be an array of language ids.");if(!("languageRegex"in t)||!(t.languageRegex instanceof RegExp))throw new Error("Tokenizer must have `languageRegex` attribute set and it should be a regular expression.");if(!("lang_to_token"in t)||typeof t.lang_to_token!="function")throw new Error("Tokenizer must have `lang_to_token` attribute set and it should be a function.");const s=n.src_lang,i=n.tgt_lang;if(!t.language_codes.includes(i))throw new Error(`Target language code "${i}" is not valid. Must be one of: {${t.language_codes.join(", ")}}`);if(s!==void 0){if(!t.language_codes.includes(s))throw new Error(`Source language code "${s}" is not valid. Must be one of: {${t.language_codes.join(", ")}}`);for(const a of t.post_processor.config.single)if("SpecialToken"in a&&t.languageRegex.test(a.SpecialToken.id)){a.SpecialToken.id=t.lang_to_token(s);break}}return n.forced_bos_token_id=t.model.convert_tokens_to_ids([t.lang_to_token(i)])[0],t._call(e,r)}class U_ extends W{constructor(e,r){super(e,r),this.languageRegex=/^[a-z]{3}_[A-Z][a-z]{3}$/,this.language_codes=this.special_tokens.filter(n=>this.languageRegex.test(n)),this.lang_to_token=n=>n}_build_translation_inputs(e,r,n){return fi(this,e,r,n)}}class q_ extends W{constructor(e,r){super(e,r),this.languageRegex=/^__[a-z]{2,3}__$/,this.language_codes=this.special_tokens.filter(n=>this.languageRegex.test(n)).map(n=>n.slice(2,-2)),this.lang_to_token=n=>`__${n}__`}_build_translation_inputs(e,r,n){return fi(this,e,r,n)}}const Tp=[["en","english"],["zh","chinese"],["de","german"],["es","spanish"],["ru","russian"],["ko","korean"],["fr","french"],["ja","japanese"],["pt","portuguese"],["tr","turkish"],["pl","polish"],["ca","catalan"],["nl","dutch"],["ar","arabic"],["sv","swedish"],["it","italian"],["id","indonesian"],["hi","hindi"],["fi","finnish"],["vi","vietnamese"],["he","hebrew"],["uk","ukrainian"],["el","greek"],["ms","malay"],["cs","czech"],["ro","romanian"],["da","danish"],["hu","hungarian"],["ta","tamil"],["no","norwegian"],["th","thai"],["ur","urdu"],["hr","croatian"],["bg","bulgarian"],["lt","lithuanian"],["la","latin"],["mi","maori"],["ml","malayalam"],["cy","welsh"],["sk","slovak"],["te","telugu"],["fa","persian"],["lv","latvian"],["bn","bengali"],["sr","serbian"],["az","azerbaijani"],["sl","slovenian"],["kn","kannada"],["et","estonian"],["mk","macedonian"],["br","breton"],["eu","basque"],["is","icelandic"],["hy","armenian"],["ne","nepali"],["mn","mongolian"],["bs","bosnian"],["kk","kazakh"],["sq","albanian"],["sw","swahili"],["gl","galician"],["mr","marathi"],["pa","punjabi"],["si","sinhala"],["km","khmer"],["sn","shona"],["yo","yoruba"],["so","somali"],["af","afrikaans"],["oc","occitan"],["ka","georgian"],["be","belarusian"],["tg","tajik"],["sd","sindhi"],["gu","gujarati"],["am","amharic"],["yi","yiddish"],["lo","lao"],["uz","uzbek"],["fo","faroese"],["ht","haitian creole"],["ps","pashto"],["tk","turkmen"],["nn","nynorsk"],["mt","maltese"],["sa","sanskrit"],["lb","luxembourgish"],["my","myanmar"],["bo","tibetan"],["tl","tagalog"],["mg","malagasy"],["as","assamese"],["tt","tatar"],["haw","hawaiian"],["ln","lingala"],["ha","hausa"],["ba","bashkir"],["jw","javanese"],["su","sundanese"]],un=new Map(Tp),V_=new Map([...Tp.map(([t,e])=>[e,t]),["burmese","my"],["valencian","ca"],["flemish","nl"],["haitian","ht"],["letzeburgesch","lb"],["pushto","ps"],["panjabi","pa"],["moldavian","ro"],["moldovan","ro"],["sinhalese","si"],["castilian","es"]]);class G_ extends W{_default_chat_template='{% for message in messages %}" "{{ message.content }}{{ eos_token }}" "{% endfor %}';_decode_asr(e,{return_timestamps:r=!1,return_language:n=!1,time_precision:s=null,force_full_sequences:i=!0}={}){if(s===null)throw Error("Must specify time_precision");let a=null;const o=r==="word";function l(){return{language:a,timestamp:[null,null],text:""}}const u=[];let d=l(),c=0;const p=this.model.convert_tokens_to_ids(["<|notimestamps|>"])[0]+1;let h=[],f=[],m=!1,_=null;const w=new Set(this.all_special_ids);for(const y of e){const v=y.tokens,S=o?y.token_timestamps:null;let k=null,I=p;if("stride"in y){const[U,H,j]=y.stride;if(c-=H,_=U-j,H&&(I=H/s+p),j)for(let N=v.length-1;N>=0;--N){const x=v[N];if(x>=p){if(k!==null&&(x-p)*s<_)break;k=x}}}let B=[],P=[];for(let U=0;U<v.length;++U){const H=v[U];if(w.has(H)){const j=this.decode([H]),N=un.get(j.slice(2,-2));if(N!==void 0){if(a!==null&&N!==a&&!r){h.push(B);const x=this.findLongestCommonSequence(h)[0],T=this.decode(x);d.text=T,u.push(d),h=[],B=[],d=l()}a=d.language=N}}else if(H>=p){const j=(H-p)*s+c,N=Cr(j,2);if(k!==null&&H>=k)m=!0;else if(m||h.length>0&&H<I)m=!1;else if(d.timestamp[0]===null)d.timestamp[0]=N;else if(N!==d.timestamp[0]){d.timestamp[1]=N,h.push(B),o&&f.push(P);const[x,T]=this.findLongestCommonSequence(h,f),O=this.decode(x);d.text=O,o&&(d.words=this.collateWordTimestamps(x,T,a)),u.push(d),h=[],B=[],f=[],P=[],d=l()}}else if(B.push(H),o){let j=Cr(S[U]+c,2),N;U+1<S.length?N=Cr(S[U+1]+c,2):N=null,P.push([j,N])}}if("stride"in y){const[U,H,j]=y.stride;c+=U-j}B.length>0?(h.push(B),o&&f.push(P)):h.every(U=>U.length===0)&&(d=l(),h=[],B=[],f=[],P=[])}if(h.length>0){if(i&&r)throw new Error("Whisper did not predict an ending timestamp, which can happen if audio is cut off in the middle of a word. Also make sure WhisperTimeStampLogitsProcessor was used during generation.");const[y,v]=this.findLongestCommonSequence(h,f),S=this.decode(y);d.text=S,o&&(d.words=this.collateWordTimestamps(y,v,a)),u.push(d)}let g=Object.create(null);const b=u.map(y=>y.text).join("");if(r||n){for(let y=0;y<u.length;++y){const v=u[y];r||delete v.timestamp,n||delete v.language}if(o){const y=[];for(const v of u)for(const S of v.words)y.push(S);g={chunks:y}}else g={chunks:u}}return[b,g]}findLongestCommonSequence(e,r=null){let n=e[0],s=n.length,i=[];const a=Array.isArray(r)&&r.length>0;let o=a?[]:null,l=a?r[0]:null;for(let u=1;u<e.length;++u){const d=e[u];let c=0,p=[s,s,0,0];const h=d.length;for(let y=1;y<s+h;++y){const v=y/1e4,S=Math.max(0,s-y),k=Math.min(s,s+h-y),I=n.slice(S,k),B=Math.max(0,y-s),P=Math.min(h,y),U=d.slice(B,P);if(I.length!==U.length)throw new Error("There is a bug within whisper `decode_asr` function, please report it. Dropping to prevent bad inference.");const H=I.filter((N,x)=>N===U[x]).length,j=H/y+v;H>1&&j>c&&(c=j,p=[S,k,B,P])}const[f,m,_,w]=p,g=Math.floor((m+f)/2),b=Math.floor((w+_)/2);i.push(...n.slice(0,g)),n=d.slice(b),s=n.length,a&&(o.push(...l.slice(0,g)),l=r[u].slice(b))}return i.push(...n),a?(o.push(...l),[i,o]):[i,[]]}collateWordTimestamps(e,r,n){const[s,i,a]=this.combineTokensIntoWords(e,n),o=[];for(let l=0;l<s.length;++l){const u=a[l];o.push({text:s[l],timestamp:[r[u.at(0)][0],r[u.at(-1)][1]]})}return o}combineTokensIntoWords(e,r,n=`"'“¡¿([{-`,s=`"'.。,，!！?？:：”)]}、`){r=r??"english";let i,a,o;return["chinese","japanese","thai","lao","myanmar"].includes(r)?[i,a,o]=this.splitTokensOnUnicode(e):[i,a,o]=this.splitTokensOnSpaces(e),this.mergePunctuations(i,a,o,n,s)}decode(e,r){let n;return r&&r.decode_with_timestamps?(e instanceof Q&&(e=_p(e)),n=this.decodeWithTimestamps(e,r)):n=super.decode(e,r),n}decodeWithTimestamps(e,r){const n=r?.time_precision??.02,s=Array.from(this.all_special_ids).at(-1)+1;let i=[[]];for(const a of e)if(a>=s){const o=Cr((Number(a)-s)*n,2);i.push(`<|${o}|>`),i.push([])}else i[i.length-1].push(a);return i=i.map(a=>typeof a=="string"?a:super.decode(a,r)),i.join("")}splitTokensOnUnicode(e){const r=this.decode(e,{decode_with_timestamps:!0}),n="�",s=[],i=[],a=[];let o=[],l=[],u=0;for(let d=0;d<e.length;++d){const c=e[d];o.push(c),l.push(d);const p=this.decode(o,{decode_with_timestamps:!0});(!p.includes(n)||r[u+p.indexOf(n)]===n)&&(s.push(p),i.push(o),a.push(l),o=[],l=[],u+=p.length)}return[s,i,a]}splitTokensOnSpaces(e){const[r,n,s]=this.splitTokensOnUnicode(e),i=[],a=[],o=[],l=new RegExp(`^[${or}]$`,"gu");for(let u=0;u<r.length;++u){const d=r[u],c=n[u],p=s[u],h=c[0]>=this.model.tokens_to_ids.get("<|endoftext|>"),f=d.startsWith(" "),m=d.trim(),_=l.test(m);if(h||f||_||i.length===0)i.push(d),a.push(c),o.push(p);else{const w=i.length-1;i[w]+=d,a[w].push(...c),o[w].push(...p)}}return[i,a,o]}mergePunctuations(e,r,n,s,i){const a=structuredClone(e),o=structuredClone(r),l=structuredClone(n);let u=a.length-2,d=a.length-1;for(;u>=0;)a[u].startsWith(" ")&&s.includes(a[u].trim())?(a[d]=a[u]+a[d],o[d]=ge(o[u],o[d]),l[d]=ge(l[u],l[d]),a[u]="",o[u]=[],l[u]=[]):d=u,--u;for(u=0,d=1;d<a.length;)!a[u].endsWith(" ")&&i.includes(a[d])?(a[u]+=a[d],o[u]=ge(o[u],o[d]),l[u]=ge(l[u],l[d]),a[d]="",o[d]=[],l[d]=[]):u=d,++d;return[a.filter(c=>c),o.filter(c=>c.length>0),l.filter(c=>c.length>0)]}get_decoder_prompt_ids({language:e=null,task:r=null,no_timestamps:n=!0}={}){const s=[];if(e){e=e.toLowerCase();let i=V_.get(e);if(i===void 0)if(un.has(e))i=e;else{const l=e.length===2?un.keys():un.values();throw new Error(`Language "${e}" is not supported. Must be one of: ${JSON.stringify(l)}`)}const a=this.model.tokens_to_ids.get(`<|${i}|>`);if(a===void 0)throw new Error(`Unable to find language "${i}" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.`);s.push(a)}else s.push(null);if(r){if(r=r.toLowerCase(),r!=="transcribe"&&r!=="translate")throw new Error(`Task "${r}" is not supported. Must be one of: ["transcribe", "translate"]`);const i=this.model.tokens_to_ids.get(`<|${r}|>`);if(i===void 0)throw new Error(`Unable to find task "${r}" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.`);s.push(i)}else s.push(null);if(n){const i=this.model.tokens_to_ids.get("<|notimestamps|>");if(i===void 0)throw new Error('Unable to find "<|notimestamps|>" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.');s.push(i)}return s.map((i,a)=>[a+1,i]).filter(i=>i[1]!==null)}}class j_ extends W{}class W_ extends W{}class H_ extends W{}class K_ extends W{constructor(e,r){super(e,r),this.languageRegex=/^(>>\w+<<)\s*/g,this.supported_language_codes=this.model.vocab.filter(n=>this.languageRegex.test(n)),console.warn('WARNING: `MarianTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.')}_encode_text(e){if(e===null)return null;const[r,...n]=e.trim().split(this.languageRegex);if(n.length===0)return super._encode_text(r);if(n.length===2){const[s,i]=n;return this.supported_language_codes.includes(s)||console.warn(`Unsupported language code "${s}" detected, which may lead to unexpected behavior. Should be one of: ${JSON.stringify(this.supported_language_codes)}`),ge([s],super._encode_text(i))}}}class Q_ extends W{}class Ip extends W{_default_chat_template="{% for message in messages %}{% if message['role'] == 'user' %}{{ ' ' }}{% endif %}{{ message['content'] }}{% if not loop.last %}{{ '  ' }}{% endif %}{% endfor %}{{ eos_token }}"}class X_ extends Ip{}class Y_ extends W{}class Z_ extends W{}class J_ extends W{constructor(e,r){super(e,r),this.decoder=new s_({})}}class ew extends W{}class tw{static TOKENIZER_CLASS_MAPPING={T5Tokenizer:T_,DistilBertTokenizer:x_,CamembertTokenizer:k_,DebertaTokenizer:w_,DebertaV2Tokenizer:y_,BertTokenizer:f_,HerbertTokenizer:b_,ConvBertTokenizer:v_,RoFormerTokenizer:$_,XLMTokenizer:S_,ElectraTokenizer:E_,MobileBertTokenizer:g_,SqueezeBertTokenizer:__,AlbertTokenizer:m_,GPT2Tokenizer:kp,BartTokenizer:I_,MBartTokenizer:Sp,MBart50Tokenizer:M_,RobertaTokenizer:C_,WhisperTokenizer:G_,CodeGenTokenizer:j_,CLIPTokenizer:W_,SiglipTokenizer:H_,MarianTokenizer:K_,BloomTokenizer:z_,NllbTokenizer:U_,M2M100Tokenizer:q_,LlamaTokenizer:Ep,CodeLlamaTokenizer:A_,XLMRobertaTokenizer:P_,MPNetTokenizer:O_,FalconTokenizer:B_,GPTNeoXTokenizer:R_,EsmTokenizer:D_,Wav2Vec2CTCTokenizer:Q_,BlenderbotTokenizer:Ip,BlenderbotSmallTokenizer:X_,SpeechT5Tokenizer:Y_,NougatTokenizer:Z_,VitsTokenizer:J_,Qwen2Tokenizer:L_,GemmaTokenizer:F_,Grok1Tokenizer:N_,CohereTokenizer:ew,PreTrainedTokenizer:W};static async from_pretrained(e,{progress_callback:r=null,config:n=null,cache_dir:s=null,local_files_only:i=!1,revision:a="main",legacy:o=null}={}){const[l,u]=await gp(e,{progress_callback:r,config:n,cache_dir:s,local_files_only:i,revision:a,legacy:o}),d=u.tokenizer_class?.replace(/Fast$/,"")??"PreTrainedTokenizer";let c=this.TOKENIZER_CLASS_MAPPING[d];return c||(console.warn(`Unknown tokenizer class "${d}", attempting to construct from base class.`),c=W),new c(l,u)}}async function rw(t,e){return await ht(t,"config.json",!0,e)}function dn(t){const e={};let r={};switch(t.model_type){case"llava":case"paligemma":r=dn(t.text_config);break;case"moondream1":r=dn(t.phi_config);break;case"musicgen":r=dn(t.decoder);break;case"gpt2":case"gptj":case"codegen":case"gpt_bigcode":e.num_heads="n_head",e.num_layers="n_layer",e.hidden_size="n_embd";break;case"gpt_neox":case"stablelm":case"opt":case"phi":case"phi3":case"falcon":e.num_heads="num_attention_heads",e.num_layers="num_hidden_layers",e.hidden_size="hidden_size";break;case"llama":case"mistral":case"starcoder2":case"qwen2":e.num_heads="num_key_value_heads",e.num_layers="num_hidden_layers",e.hidden_size="hidden_size",e.num_attention_heads="num_attention_heads";break;case"gemma":e.num_heads="num_key_value_heads",e.num_layers="num_hidden_layers",e.dim_kv="head_dim";break;case"openelm":e.num_heads="num_kv_heads",e.num_layers="num_transformer_layers",e.dim_kv="head_dim";break;case"gpt_neo":e.num_heads="num_heads",e.num_layers="num_layers",e.hidden_size="hidden_size";break;case"bloom":e.num_heads="n_head",e.num_layers="n_layer",e.hidden_size="hidden_size";break;case"mpt":e.num_heads="n_heads",e.num_layers="n_layers",e.hidden_size="d_model";break;case"t5":case"mt5":case"longt5":e.num_decoder_layers="num_decoder_layers",e.num_decoder_heads="num_heads",e.decoder_dim_kv="d_kv",e.num_encoder_layers="num_layers",e.num_encoder_heads="num_heads",e.encoder_dim_kv="d_kv";break;case"bart":case"mbart":case"marian":case"whisper":case"m2m_100":case"blenderbot":case"blenderbot-small":e.num_decoder_layers="decoder_layers",e.num_decoder_heads="decoder_attention_heads",e.decoder_hidden_size="d_model",e.num_encoder_layers="encoder_layers",e.num_encoder_heads="encoder_attention_heads",e.encoder_hidden_size="d_model";break;case"speecht5":e.num_decoder_layers="decoder_layers",e.num_decoder_heads="decoder_attention_heads",e.decoder_hidden_size="hidden_size",e.num_encoder_layers="encoder_layers",e.num_encoder_heads="encoder_attention_heads",e.encoder_hidden_size="hidden_size";break;case"trocr":e.num_encoder_layers=e.num_decoder_layers="decoder_layers",e.num_encoder_heads=e.num_decoder_heads="decoder_attention_heads",e.encoder_hidden_size=e.decoder_hidden_size="d_model";break;case"musicgen_decoder":e.num_encoder_layers=e.num_decoder_layers="num_hidden_layers",e.num_encoder_heads=e.num_decoder_heads="num_attention_heads",e.encoder_hidden_size=e.decoder_hidden_size="hidden_size";break}const n={...r,...pt(t,["model_type","multi_query","is_encoder_decoder"])};for(const s in e)n[s]=t[e[s]];return n}function Mp(t,{prefix:e="past_key_values",encoder_add_pkv:r=!0}={}){const n={},s=t.normalized_config,i=1;if(s.is_encoder_decoder&&r){const a=s.encoder_dim_kv??s.encoder_hidden_size/s.num_encoder_heads,o=s.decoder_dim_kv??s.decoder_hidden_size/s.num_decoder_heads,l=[i,s.num_encoder_heads,0,a],u=[i,s.num_decoder_heads,0,o];for(let d=0;d<s.num_decoder_layers;++d)n[`${e}.${d}.encoder.key`]=l,n[`${e}.${d}.encoder.value`]=l,n[`${e}.${d}.decoder.key`]=u,n[`${e}.${d}.decoder.value`]=u}else{const a=s.num_heads,o=s.num_layers,l=s.dim_kv??s.hidden_size/(s.num_attention_heads??a);if(s.model_type==="falcon"){const u=[i*a,0,l];for(let d=0;d<o;++d)n[`${e}.${d}.key`]=u,n[`${e}.${d}.value`]=u}else if(s.multi_query){const u=[i*a,0,2*l];for(let d=0;d<o;++d)n[`${e}.${d}.key_value`]=u}else if(s.model_type==="bloom"){const u=[i*a,l,0],d=[i*a,0,l];for(let c=0;c<o;++c)n[`${e}.${c}.key`]=u,n[`${e}.${c}.value`]=d}else if(s.model_type==="openelm")for(let u=0;u<o;++u){const d=[i,a[u],0,l];n[`${e}.${u}.key`]=d,n[`${e}.${u}.value`]=d}else{const u=[i,a,0,l];for(let d=0;d<o;++d)n[`${e}.${d}.key`]=u,n[`${e}.${d}.value`]=u}}return n}class cn{max_position_embeddings;constructor(e){this.model_type=null,this.is_encoder_decoder=!1,Object.assign(this,e),this.normalized_config=dn(this)}static async from_pretrained(e,{progress_callback:r=null,config:n=null,cache_dir:s=null,local_files_only:i=!1,revision:a="main"}={}){n&&!(n instanceof cn)&&(n=new cn(n));const o=n??await rw(e,{progress_callback:r,config:n,cache_dir:s,local_files_only:i,revision:a});return new this(o)}}class Cp{static async from_pretrained(...e){return cn.from_pretrained(...e)}}const pn=Object.freeze({cpu:"cpu",gpu:"gpu",wasm:"wasm",webgpu:"webgpu"}),nw=function(){let t;return async function(){if(t===void 0)if(ct.IS_NODE_ENV)t=!0;else if(!ct.IS_WEBGPU_AVAILABLE)t=!1;else try{t=(await navigator.gpu.requestAdapter()).features.has("shader-f16")}catch{t=!1}return t}}(),Ie=Object.freeze({fp32:"fp32",fp16:"fp16",q8:"q8",int8:"int8",uint8:"uint8",q4:"q4",bnb4:"bnb4",q4f16:"q4f16"}),sw=Object.freeze({[pn.cpu]:Ie.q8,[pn.gpu]:Ie.fp32,[pn.wasm]:Ie.q8,[pn.webgpu]:Ie.fp32}),zp=Object.freeze({[Ie.fp32]:"",[Ie.fp16]:"_fp16",[Ie.int8]:"_int8",[Ie.uint8]:"_uint8",[Ie.q8]:"_quantized",[Ie.q4]:"_q4",[Ie.q4f16]:"_q4f16",[Ie.bnb4]:"_bnb4"});class nt extends Me{_call(e,r){throw Error("`_call` should be implemented in a subclass")}}class mi extends Me{_call(e,r){throw Error("`_call` should be implemented in a subclass")}}class Ap extends Me{constructor(){super(),this.processors=[]}push(e){this.processors.push(e)}extend(e){this.processors.push(...e)}_call(e,r){let n=r;for(const s of this.processors)n=s(e,n);return n}[Symbol.iterator](){return this.processors.values()}}class iw extends nt{constructor(e){super(),this.bos_token_id=e}_call(e,r){for(let n=0;n<e.length;++n)if(e[n].length===1){const s=r[n];s.data.fill(-1/0),s.data[this.bos_token_id]=0}return r}}class aw extends nt{constructor(e,r){super(),this.max_length=e,this.forced_eos_token_id=r}_call(e,r){}}class ow extends nt{constructor(e,r){super(),this.begin_suppress_tokens=e,this.begin_index=r}_call(e,r){for(let n=0;n<e.length;++n)if(e[n].length===this.begin_index){const s=r[n];for(const i of this.begin_suppress_tokens)s.data[i]=-1/0}return r}}class lw extends nt{constructor(e){super(),this.no_repeat_ngram_size=e}getNgrams(e){const r=e.length,n=[];for(let i=0;i<r+1-this.no_repeat_ngram_size;++i){const a=[];for(let o=0;o<this.no_repeat_ngram_size;++o)a.push(e[i+o]);n.push(a)}const s=new Map;for(const i of n){const a=i.slice(0,i.length-1),o=JSON.stringify(a),l=s.get(o)??[];l.push(i[i.length-1]),s.set(o,l)}return s}getGeneratedNgrams(e,r){const n=r.slice(r.length+1-this.no_repeat_ngram_size,r.length);return e.get(JSON.stringify(n))??[]}calcBannedNgramTokens(e){const r=[];if(e.length+1<this.no_repeat_ngram_size)return r;{const n=this.getNgrams(e);return this.getGeneratedNgrams(n,e)}}_call(e,r){for(let n=0;n<e.length;++n){const s=r[n],i=this.calcBannedNgramTokens(e[n]);for(const a of i)s.data[a]=-1/0}return r}}class uw extends nt{constructor(e){super(),this.penalty=e}_call(e,r){for(let n=0;n<e.length;++n){const s=r[n];for(const i of e[n])s.data[i]<0?s.data[i]*=this.penalty:s.data[i]/=this.penalty}return r}}class dw extends nt{constructor(e,r){super(),this.min_length=e,this.eos_token_id=Array.isArray(r)?r:[r]}_call(e,r){for(let n=0;n<e.length;++n)if(e[n].length<this.min_length){const s=r[n];for(const i of this.eos_token_id)s.data[i]=-1/0}return r}}class cw extends nt{constructor(e,r,n){super(),this.prompt_length_to_skip=e,this.min_new_tokens=r,this.eos_token_id=Array.isArray(n)?n:[n]}_call(e,r){for(let n=0;n<e.length;++n)if(e[n].length-this.prompt_length_to_skip<this.min_new_tokens){const i=r[n];for(const a of this.eos_token_id)i[a]=-1/0}return r}}class pw extends nt{constructor(e,r){super(),this.bad_words_ids=e,this.eos_token_id=Array.isArray(r)?r:[r]}_call(e,r){for(let n=0;n<e.length;++n){const s=r[n];for(const i of this.bad_words_ids){let a=!0;for(let o=1;o<=i.length-1&&i.length<e[o].length;++o)if(i.at(-o-1)!==e[o].at(-o)){a=!1;break}a&&(s[i.at(-1)]=-1/0)}}return r}}class hw extends nt{constructor(e){if(super(),e<=1)throw new Error(`Require guidance scale >1 to use the classifier free guidance processor, got guidance scale ${e}.`);this.guidance_scale=e}_call(e,r){if(r.dims[0]!==2*e.length)throw new Error(`Logits should have twice the batch size of the input ids, the first half of batches corresponding to the conditional inputs, and the second half of batches corresponding to the unconditional inputs. Got batch size ${r.dims[0]} for the logits and ${e.length} for the input ids.`);const n=e.length,s=r.slice([0,n],null),i=r.slice([n,r.dims[0]],null);for(let a=0;a<i.data.length;++a)i.data[a]+=(s.data[a]-i.data[a])*this.guidance_scale;return i}}class fw extends mi{constructor(e){super(),this.temperature=e}_call(e,r){const n=r.data;for(let s=0;s<n.length;++s)n[s]/=this.temperature;return r}}class mw extends mi{constructor(e,{filter_value:r=-1/0,min_tokens_to_keep:n=1}={}){if(super(),e<0||e>1)throw new Error(`\`top_p\` must be a float > 0 and < 1, but is ${e}`);if(!Number.isInteger(n)||n<1)throw new Error(`\`min_tokens_to_keep\` must be a positive integer, but is ${n}`);this.top_p=e,this.filter_value=r,this.min_tokens_to_keep=n}}class gw extends mi{constructor(e,{filter_value:r=-1/0,min_tokens_to_keep:n=1}={}){if(super(),!Number.isInteger(e)||e<0)throw new Error(`\`top_k\` must be a positive integer, but is ${e}`);this.top_k=Math.max(e,n),this.filter_value=r}}class _w{max_length=20;max_new_tokens=null;min_length=0;min_new_tokens=null;early_stopping=!1;max_time=null;do_sample=!1;num_beams=1;num_beam_groups=1;penalty_alpha=null;use_cache=!0;temperature=1;top_k=50;top_p=1;typical_p=1;epsilon_cutoff=0;eta_cutoff=0;diversity_penalty=0;repetition_penalty=1;encoder_repetition_penalty=1;length_penalty=1;no_repeat_ngram_size=0;bad_words_ids=null;force_words_ids=null;renormalize_logits=!1;constraints=null;forced_bos_token_id=null;forced_eos_token_id=null;remove_invalid_values=!1;exponential_decay_length_penalty=null;suppress_tokens=null;begin_suppress_tokens=null;forced_decoder_ids=null;guidance_scale=null;num_return_sequences=1;output_attentions=!1;output_hidden_states=!1;output_scores=!1;return_dict_in_generate=!1;pad_token_id=null;bos_token_id=null;eos_token_id=null;encoder_no_repeat_ngram_size=0;decoder_start_token_id=null;generation_kwargs={};constructor(e){Object.assign(this,pt(e,Object.getOwnPropertyNames(this)))}}class hn extends Me{_call(e,r){throw Error("StoppingCriteria needs to be subclassed")}}class gi extends Me{constructor(){super(),this.criteria=[]}push(e){this.criteria.push(e)}extend(e){e instanceof gi?e=e.criteria:e instanceof hn&&(e=[e]),this.criteria.push(...e)}_call(e,r){const n=new Array(e.length).fill(!1);for(const s of this.criteria){const i=s(e,r);for(let a=0;a<n.length;++a)n[a]||=i[a]}return n}[Symbol.iterator](){return this.criteria.values()}}class ww extends hn{constructor(e,r=null){super(),this.max_length=e,this.max_position_embeddings=r}_call(e){return e.map(r=>r.length>=this.max_length)}}class yw extends hn{constructor(e){super(),Array.isArray(e)||(e=[e]),this.eos_token_id=e}_call(e,r){return e.map(n=>{const s=n.at(-1);return this.eos_token_id.some(i=>s==i)})}}class fn extends Me{constructor(e){super(),this.generation_config=e}_call(e,r=-1){return this.sample(e,r)}sample(e,r){throw Error("sample should be implemented in subclasses.")}getLogits(e,r){let n=e.dims.at(-1),s=e.data;if(r===-1)s=s.slice(-n);else{let i=r*n;s=s.slice(i,i+n)}return s}randomSelect(e){let r=e.reduce((s,i)=>s+i,0),n=Math.random()*r;for(let s=0;s<e.length;++s)if(n-=e[s],n<=0)return s;return 0}static getSampler(e){if(e.do_sample)return new vw(e);if(e.num_beams>1)return new $w(e);if(e.num_return_sequences>1)throw Error(`num_return_sequences has to be 1 when doing greedy search, but is ${e.num_return_sequences}.`);return new bw(e)}}class bw extends fn{sample(e,r=-1){let n=this.getLogits(e,r);return[[In(n)[1],0]]}}class vw extends fn{sample(e,r=-1){let n=e.dims.at(-1);this.generation_config.top_k>0&&(n=Math.min(this.generation_config.top_k,n));const s=this.getLogits(e,r),i=Oi(s,n),a=Pi(i.map(o=>o[1]));return Array.from({length:this.generation_config.num_beams},()=>{const o=this.randomSelect(a);return[i[o][0],Math.log(a[o])]})}}class $w extends fn{sample(e,r=-1){let n=e.dims.at(-1);this.generation_config.top_k>0&&(n=Math.min(this.generation_config.top_k,n));const s=this.getLogits(e,r),i=Oi(s,n),a=Pi(i.map(o=>o[1]));return Array.from({length:this.generation_config.num_beams},(o,l)=>[i[l][0],Math.log(a[l])])}}const V={EncoderOnly:0,EncoderDecoder:1,Seq2Seq:2,Vision2Seq:3,DecoderOnly:4,MaskGeneration:5,ImageTextToText:6,Musicgen:7},mn=new Map,Pp=new Map,ur=new Map;async function xw(t,e,r){let n=r.device;n&&typeof n!="string"&&(n.hasOwnProperty(e)?n=n[e]:(console.warn(`Device not specified for ${e}. Using the default device.`),n=null));const s=Dm(n);let i=r.dtype;if(typeof i!="string"&&(i&&i.hasOwnProperty(e)?i=i[e]:(i=sw[s[0]],console.warn(`Dtype not specified for ${e}. Using the default dtype: ${i}.`))),zp.hasOwnProperty(i)){if(i===Ie.fp16&&!await nw())throw new Error("The device does not support fp16.")}else throw new Error(`Invalid dtype: ${i}. Should be one of: ${Object.keys(Ie).join(", ")}`);const a=zp[i],o=`${r.subfolder??""}/${e}${a}.onnx`,l={...r.session_options};l.executionProviders??=s;const u=Ir(t,o,!0,r);let d=[];if(r.use_external_data_format){if(ct.IS_NODE_ENV)throw new Error("External data format is not yet supported in Node.js");const p=`${e}${a}.onnx_data`,h=`${r.subfolder??""}/${p}`;d.push(new Promise(async(f,m)=>{const _=await Ir(t,h,!0,r);f({path:p,data:_})}))}else l.externalData!==void 0&&(d=l.externalData.map(async p=>{if(typeof p.data=="string"){const h=await Ir(t,p.data,!0,r);return{...p,data:h}}return p}));if(d.length>0&&(l.externalData=await Promise.all(d)),n==="webgpu"){const p=Mp(r.config,{prefix:"present"}),h={};for(const f in p)h[f]="gpu-buffer";l.preferredOutputLocation=h}return{buffer:await u,session_options:l}}async function Tt(t,e,r){const n=Object.keys(e),s=await Promise.all(n.map(async a=>xw(t,e[a],r))),i={};for(let a=0;a<n.length;++a){const{buffer:o,session_options:l}=s[a],u=await Lm(o,l);i[n[a]]=u}return i}function kw(t,e){const r=Object.create(null),n=[];for(const a of t.inputNames){const o=e[a];if(!(o instanceof Q)){n.push(a);continue}r[a]=Fm()?o.clone():o}if(n.length>0)throw new Error(`An error occurred during model execution: "Missing the following inputs: ${n.join(", ")}.`);const s=Object.keys(e).length,i=t.inputNames.length;if(s>i){let a=Object.keys(e).filter(o=>!t.inputNames.includes(o));console.warn(`WARNING: Too many inputs were provided (${s} > ${i}). The following inputs will be ignored: "${a.join(", ")}".`)}return r}async function ut(t,e){const r=kw(t,e);try{const n=Object.fromEntries(Object.entries(r).map(([i,a])=>[i,a.ort_tensor]));let s=await t.run(n);return s=Op(s),s}catch(n){throw console.error(`An error occurred during model execution: "${n}".`),console.error("Inputs given to model:",r),n}}function Op(t){for(let e in t)sp(t[e])?t[e]=new Q(t[e]):typeof t[e]=="object"&&Op(t[e]);return t}function Sw(t){if(t instanceof Q)return t;if(t.length===0)throw Error("items must be non-empty");if(Array.isArray(t[0])){if(t.some(e=>e.length!==t[0].length))throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=True' and/or 'truncation=True' to have batched tensors with the same length.");return new Q("int64",BigInt64Array.from(t.flat().map(e=>BigInt(e))),[t.length,t[0].length])}else return new Q("int64",BigInt64Array.from(t.map(e=>BigInt(e))),[1,t.length])}function Bp(t){return new Q("bool",[t],[1])}async function Rp(t,e){let{encoder_outputs:r,past_key_values:n}=e;if(!r){const l=pt(e,t.sessions.model.inputNames);r=(await dr(t,l)).last_hidden_state}const{input_ids:s,decoder_input_ids:i,...a}=e;return a.input_ids=i,a.encoder_hidden_states=r,t.sessions.decoder_model_merged.inputNames.includes("encoder_attention_mask")&&(a.encoder_attention_mask=e.attention_mask),await _i(t,a,!0)}async function dr(t,e){const r=t.sessions.model,n=Object.create(null);for(const s of r.inputNames)n[s]=e[s];return r.inputNames.includes("token_type_ids")&&!n.token_type_ids&&(n.token_type_ids=new Q("int64",new BigInt64Array(n.input_ids.data.length),n.input_ids.dims)),await ut(r,n)}async function _i(t,e,r=!1){const n=t.sessions[r?"decoder_model_merged":"model"],{past_key_values:s,...i}=e;n.inputNames.includes("use_cache_branch")&&(i.use_cache_branch=Bp(!!s)),n.inputNames.includes("position_ids")&&i.attention_mask&&!i.position_ids&&(i.position_ids=Tw(i,s)),t.addPastKeyValues(i,s);const a=pt(i,n.inputNames);return await ut(n,a)}async function Ew(t,{input_ids:e=null,attention_mask:r=null,pixel_values:n=null,position_ids:s=null,inputs_embeds:i=null,past_key_values:a=null,generation_config:o=null,logits_processor:l=null,...u}){if(!i){if(i=await t.encode_text({input_ids:e}),n&&e.dims[1]!==1){const c=await t.encode_image({pixel_values:n});({inputs_embeds:i,attention_mask:r}=t._merge_input_ids_with_image_features({image_features:c,inputs_embeds:i,input_ids:e,attention_mask:r}))}else if(a&&n&&e.dims[1]===1){const c=e.dims[1],p=Object.values(a)[0].dims.at(-2);r=et([rr([e.dims[0],p]),r.slice(null,[r.dims[1]-c,r.dims[1]])],1)}}return await _i(t,{inputs_embeds:i,past_key_values:a,attention_mask:r,position_ids:s,generation_config:o,logits_processor:l},!0)}function Tw(t,e=null){const{input_ids:r,inputs_embeds:n,attention_mask:s}=t,[i,a]=s.dims,o=new BigInt64Array(s.data.length);for(let u=0;u<i;++u){const d=u*a;let c=BigInt(0);for(let p=0;p<a;++p){const h=d+p;s.data[h]===0n?o[h]=BigInt(1):(o[h]=c,c+=s.data[h])}}let l=new Q("int64",o,s.dims);if(e){const u=-(r??n).dims.at(1);l=l.slice(null,[u,null])}return l}function Dp(t,e,r,n){if(r.past_key_values){const s=Object.values(r.past_key_values)[0].dims.at(-2),{input_ids:i,attention_mask:a}=r;if(!(a&&a.dims[1]>i.dims[1])){if(s<i.dims[1])r.input_ids=i.slice(null,[s,null]);else if(t.config.image_token_index!=null&&i.data.some(o=>o==t.config.image_token_index)){const o=t.config.num_image_tokens;if(!o)throw new Error("`num_image_tokens` is missing in the model configuration.");const l=i.dims[1]-(s-o);r.input_ids=i.slice(null,[-l,null]),r.attention_mask=rr([1,s+l])}}}return r}function Iw(t,e,r,n){const{...s}=r;return r.past_key_values&&(e=e.map(a=>[a.at(-1)])),s.decoder_input_ids=Sw(e),s}class A extends Me{main_input_name="input_ids";forward_params=["input_ids","attention_mask"];constructor(e,r){super(),this.config=e,this.sessions=r;const n=ur.get(this.constructor),s=mn.get(n);this.can_generate=!1,this._forward=null,this._prepare_inputs_for_generation=null,s===V.DecoderOnly?(this.can_generate=!0,this._forward=_i,this._prepare_inputs_for_generation=Dp):s===V.Seq2Seq||s===V.Vision2Seq||s===V.Musicgen?(this.can_generate=!0,this._forward=Rp,this._prepare_inputs_for_generation=Iw):s===V.EncoderDecoder?this._forward=Rp:s===V.ImageTextToText?(this.can_generate=!0,this._forward=Ew,this._prepare_inputs_for_generation=Dp):this._forward=dr,this.can_generate&&this.forward_params.push("past_key_values"),this.custom_config=this.config["transformers.js_config"]??{}}async dispose(){const e=[];for(const r of Object.values(this.sessions))r?.handler?.dispose&&e.push(r.handler.dispose());return await Promise.all(e)}static async from_pretrained(e,{progress_callback:r=null,config:n=null,cache_dir:s=null,local_files_only:i=!1,revision:a="main",model_file_name:o=null,subfolder:l="onnx",device:u=null,dtype:d=null,use_external_data_format:c=null,session_options:p={}}={}){let h={progress_callback:r,config:n,cache_dir:s,local_files_only:i,revision:a,model_file_name:o,subfolder:l,device:u,dtype:d,use_external_data_format:c,session_options:p};const f=ur.get(this),m=mn.get(f);h.config=await Cp.from_pretrained(e,h);let _;return m===V.DecoderOnly?_=await Promise.all([Tt(e,{model:h.model_file_name??"model"},h),ht(e,"generation_config.json",!1,h)]):m===V.Seq2Seq||m===V.Vision2Seq?_=await Promise.all([Tt(e,{model:"encoder_model",decoder_model_merged:"decoder_model_merged"},h),ht(e,"generation_config.json",!1,h)]):m===V.MaskGeneration?_=await Promise.all([Tt(e,{model:"vision_encoder",prompt_encoder_mask_decoder:"prompt_encoder_mask_decoder"},h)]):m===V.EncoderDecoder?_=await Promise.all([Tt(e,{model:"encoder_model",decoder_model_merged:"decoder_model_merged"},h)]):m===V.ImageTextToText?_=await Promise.all([Tt(e,{embed_tokens:"embed_tokens",vision_encoder:"vision_encoder",decoder_model_merged:"decoder_model_merged"},h),ht(e,"generation_config.json",!1,h)]):m===V.Musicgen?_=await Promise.all([Tt(e,{model:"text_encoder",decoder_model_merged:"decoder_model_merged",encodec_decode:"encodec_decode"},h),ht(e,"generation_config.json",!1,h)]):(m!==V.EncoderOnly&&console.warn(`Model type for '${f??n?.model_type}' not found, assuming encoder-only architecture. Please report this at https://github.com/xenova/transformers.js/issues/new/choose.`),_=await Promise.all([Tt(e,{model:h.model_file_name??"model"},h)])),new this(h.config,..._)}async _call(e){return await this.forward(e)}async forward(e){return await this._forward(this,e)}_get_logits_warper(e){const r=new Ap;return e.temperature!==null&&e.temperature!==1&&r.push(new fw(e.temperature)),e.top_k!==null&&e.top_k!==0&&r.push(new gw(e.top_k)),e.top_p!==null&&e.top_p<1&&r.push(new mw(e.top_p)),r}_get_logits_processor(e,r,n=null){const s=new Ap;if(e.repetition_penalty!==null&&e.repetition_penalty!==1&&s.push(new uw(e.repetition_penalty)),e.no_repeat_ngram_size!==null&&e.no_repeat_ngram_size>0&&s.push(new lw(e.no_repeat_ngram_size)),e.bad_words_ids!==null&&s.push(new pw(e.bad_words_ids,e.eos_token_id)),e.min_length!==null&&e.eos_token_id!==null&&e.min_length>0&&s.push(new dw(e.min_length,e.eos_token_id)),e.min_new_tokens!==null&&e.eos_token_id!==null&&e.min_new_tokens>0&&s.push(new cw(r,e.min_new_tokens,e.eos_token_id)),e.forced_bos_token_id!==null&&s.push(new iw(e.forced_bos_token_id)),e.forced_eos_token_id!==null&&s.push(new aw(e.max_length,e.forced_eos_token_id)),e.begin_suppress_tokens!==null){let i=r>1||e.forced_bos_token_id===null?r:r+1;e.forced_decoder_ids!==null&&(i+=e.forced_decoder_ids[e.forced_decoder_ids.length-1][0]),s.push(new ow(e.begin_suppress_tokens,i))}return e.guidance_scale!==null&&e.guidance_scale>1&&s.push(new hw(e.guidance_scale)),n!==null&&s.extend(n),s}_prepare_generation_config(e,r){const n=new _w(this.config);return"generation_config"in this&&Object.assign(n,this.generation_config),e&&Object.assign(n,e),r&&Object.assign(n,pt(r,Object.getOwnPropertyNames(n))),n}_get_stopping_criteria(e,r=null){const n=new gi;return e.max_length!==null&&n.push(new ww(e.max_length,this.config.max_position_embeddings??null)),e.eos_token_id!==null&&n.push(new yw(e.eos_token_id)),r&&n.extend(r),n}_validate_model_class(){if(!this.can_generate){const e=[xi,Nh,Fh,Lh],r=ur.get(this.constructor),n=new Set,s=this.config.model_type;for(const a of e){const o=a.get(s);o&&n.add(o[0])}let i=`The current model class (${r}) is not compatible with \`.generate()\`, as it doesn't have a language model head.`;throw n.size>0&&(i+=` Please use the following class instead: ${[...n].join(", ")}`),Error(i)}}prepare_inputs_for_generation(...e){return this._prepare_inputs_for_generation(this,...e)}_update_model_kwargs_for_generation({generated_input_ids:e,outputs:r,model_inputs:n,is_encoder_decoder:s}){return n.past_key_values=this.getPastKeyValues(r,n.past_key_values),n.input_ids=new Q("int64",e.flat(),[e.length,1]),s||(n.attention_mask=et([n.attention_mask,rr([n.attention_mask.dims[0],1])],1)),n.position_ids=null,n}_prepare_model_inputs({inputs:e,bos_token_id:r,model_kwargs:n}){const s=pt(n,this.forward_params),i=this.main_input_name;if(i in s){if(e)throw new Error("`inputs`: {inputs}` were passed alongside {input_name} which is not allowed. Make sure to either pass {inputs} or {input_name}=...")}else s[i]=e;return{inputs_tensor:s[i],model_inputs:s,model_input_name:i}}async _prepare_encoder_decoder_kwargs_for_generation({inputs_tensor:e,model_inputs:r,model_input_name:n,generation_config:s}){const i=pt(r,this.sessions.model.inputNames);let{last_hidden_state:a}=await dr(this,i);return s.guidance_scale!==null&&s.guidance_scale>1&&(a=et([a,Wm(a,0)],0),"attention_mask"in r&&(r.attention_mask=et([r.attention_mask,Qm(r.attention_mask)],0))),r.encoder_outputs=a,r}_prepare_decoder_input_ids_for_generation({batch_size:e,model_input_name:r,model_kwargs:n,decoder_start_token_id:s,bos_token_id:i,generation_config:a}){s=s??i;let o;if(this.config.model_type==="musicgen")o=new Array(e*this.config.decoder.num_codebooks).fill(s);else if(Array.isArray(s)){if(s.length!==e)throw new Error(`\`decoder_start_token_id\` expcted to have length ${e} but got ${s.length}`);o=s}else o=new Array(e).fill(s);const u=new Q("int64",o,[o.length,1]);return n.decoder_attention_mask=Hm(u),{input_ids:u,model_inputs:n}}async generate({inputs:e=null,generation_config:r=null,logits_processor:n=null,stopping_criteria:s=null,streamer:i=null,...a}){this._validate_model_class(),r=this._prepare_generation_config(r,a);let{inputs_tensor:o,model_inputs:l,model_input_name:u}=this._prepare_model_inputs({inputs:e,model_kwargs:a});const d=this.config.is_encoder_decoder;d&&("encoder_outputs"in l||(l=await this._prepare_encoder_decoder_kwargs_for_generation({inputs_tensor:o,model_inputs:l,model_input_name:u,generation_config:r})));let c;d?{input_ids:c,model_inputs:l}=this._prepare_decoder_input_ids_for_generation({batch_size:l[u].dims.at(0),model_input_name:u,model_kwargs:l,decoder_start_token_id:r.decoder_start_token_id,bos_token_id:r.bos_token_id,generation_config:r}):c=l[u];let p=c.dims.at(-1);r.max_new_tokens!==null&&(r.max_length=p+r.max_new_tokens);const h=this._get_logits_processor(r,p,n),f=this._get_stopping_criteria(r,s),m=l[u].dims.at(0),_=fn.getSampler(r),w=new Array(m).fill(0),g=c.tolist();i&&i.put(g);let b=null;for(;;){l=this.prepare_inputs_for_generation(g,l,r);const v=await this.forward(l),S=v.logits.slice(null,-1,null),k=h(g,S),I=[];for(let P=0;P<k.dims.at(0);++P){const U=k[P],H=_(U);for(const[j,N]of H){const x=BigInt(j);w[P]+=N,g[P].push(x),I.push([x])}}if(i&&i.put(I),f(g).every(P=>P)){r.return_dict_in_generate&&(b=this.getPastKeyValues(v,l.past_key_values,!1));break}l=this._update_model_kwargs_for_generation({generated_input_ids:I,outputs:v,model_inputs:l,is_encoder_decoder:d})}i&&i.end();const y=new Q("int64",g.flat(),[g.length,g[0].length]);return r.return_dict_in_generate?{sequences:y,past_key_values:b}:y}addAttentionsToBeam(e,r){if(this.config.is_encoder_decoder){if(!r.cross_attentions||r.cross_attentions.length===0)throw Error("`output_attentions` is true, but the model did not produce cross-attentions. This is most likely because the model was not exported with `output_attentions=True`.");e.cross_attentions||(e.cross_attentions=[]),e.cross_attentions.push(r.cross_attentions)}if(!r.decoder_attentions||r.decoder_attentions.length===0)throw Error("`output_attentions` is true, but the model did not produce decoder-attentions. This is most likely because the model was not exported with `output_attentions=True`.");e.decoder_attentions||(e.decoder_attentions=[]),e.decoder_attentions.push(r.decoder_attentions)}groupBeams(e){const r=Object.create(null);for(const n of e)r[n.id]===void 0?r[n.id]=[n]:r[n.id].push(n);return Object.values(r)}getPastKeyValues(e,r,n=!0){const s=Object.create(null);for(const i in e)if(i.startsWith("present")){let a=i.replace("present","past_key_values");if(r&&i.includes("encoder"))s[a]=r[a];else{if(n&&r){const o=r[a];o.location==="gpu-buffer"&&o.dispose()}s[a]=e[i]}}return s}getAttentions(e){const r=Object.create(null);for(const n of["cross_attentions","decoder_attentions"]){const s=[];for(const i in e)if(i.startsWith(n)){const a=i.split(".").pop();s[a]=e[i]}r[n]=s}return r}addPastKeyValues(e,r){if(r)Object.assign(e,r);else{const n=this.custom_config.kv_cache_dtype??"float32",s=n==="float16"?new Uint16Array:[],i=Mp(this.config,{encoder_add_pkv:this.add_encoder_pkv??!0});for(const a in i)e[a]=new Q(n,s,i[a])}}}class Le{}class cr extends A{}class Mw extends cr{}class Cw extends cr{async _call(e){return new ve(await super._call(e))}}class zw extends cr{async _call(e){return new te(await super._call(e))}}class Aw extends cr{async _call(e){return new be(await super._call(e))}}class Pw extends cr{async _call(e){return new Se(await super._call(e))}}class Ow extends A{}class Bw extends Ow{}class pr extends A{}class Rw extends pr{}class Dw extends pr{async _call(e){return new ve(await super._call(e))}}class Lw extends pr{async _call(e){return new te(await super._call(e))}}class Fw extends pr{async _call(e){return new be(await super._call(e))}}class Nw extends pr{async _call(e){return new Se(await super._call(e))}}class hr extends A{}class Uw extends hr{}class qw extends hr{async _call(e){return new ve(await super._call(e))}}class Vw extends hr{async _call(e){return new te(await super._call(e))}}class Gw extends hr{async _call(e){return new be(await super._call(e))}}class jw extends hr{async _call(e){return new Se(await super._call(e))}}class fr extends A{}class Ww extends fr{}class Hw extends fr{async _call(e){return new ve(await super._call(e))}}class Kw extends fr{async _call(e){return new te(await super._call(e))}}class Qw extends fr{async _call(e){return new be(await super._call(e))}}class Xw extends fr{async _call(e){return new Se(await super._call(e))}}class mr extends A{}class Yw extends mr{}class Zw extends mr{async _call(e){return new ve(await super._call(e))}}class Jw extends mr{async _call(e){return new te(await super._call(e))}}class ey extends mr{async _call(e){return new be(await super._call(e))}}class ty extends mr{async _call(e){return new Se(await super._call(e))}}class gr extends A{}class ry extends gr{}class ny extends gr{async _call(e){return new ve(await super._call(e))}}class sy extends gr{async _call(e){return new te(await super._call(e))}}class iy extends gr{async _call(e){return new be(await super._call(e))}}class ay extends gr{async _call(e){return new Se(await super._call(e))}}class _r extends A{}class oy extends _r{}class ly extends _r{async _call(e){return new ve(await super._call(e))}}class uy extends _r{async _call(e){return new te(await super._call(e))}}class dy extends _r{async _call(e){return new be(await super._call(e))}}class cy extends _r{async _call(e){return new Se(await super._call(e))}}class wr extends A{}class py extends wr{}class hy extends wr{async _call(e){return new te(await super._call(e))}}class fy extends wr{async _call(e){return new be(await super._call(e))}}class my extends wr{async _call(e){return new Se(await super._call(e))}}class gy extends wr{async _call(e){return new ve(await super._call(e))}}class gn extends A{}class _y extends gn{}class wy extends gn{async _call(e){return new ve(await super._call(e))}}class yy extends gn{async _call(e){return new te(await super._call(e))}}class by extends gn{async _call(e){return new be(await super._call(e))}}class _n extends A{}class vy extends _n{}class $y extends _n{async _call(e){return new ve(await super._call(e))}}class xy extends _n{async _call(e){return new te(await super._call(e))}}class ky extends _n{async _call(e){return new Se(await super._call(e))}}class yr extends A{}class Sy extends yr{}class Ey extends yr{async _call(e){return new ve(await super._call(e))}}class Ty extends yr{async _call(e){return new te(await super._call(e))}}class Iy extends yr{async _call(e){return new be(await super._call(e))}}class My extends yr{async _call(e){return new Se(await super._call(e))}}class wn extends A{}class Cy extends wn{}class zy extends wn{async _call(e){return new ve(await super._call(e))}}class Ay extends wn{async _call(e){return new te(await super._call(e))}}class Py extends wn{async _call(e){return new Se(await super._call(e))}}class yn extends A{}class Oy extends yn{}class By extends yn{async _call(e){return new te(await super._call(e))}}class Ry extends yn{async _call(e){return new Se(await super._call(e))}}class Dy extends yn{async _call(e){return new ve(await super._call(e))}}class Lp extends A{forward_params=["input_ids","attention_mask","encoder_outputs","decoder_input_ids","decoder_attention_mask","past_key_values"];constructor(e,r,n){super(e,r),this.generation_config=n}}class Ly extends Lp{}class Fy extends Lp{}class Fp extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Ny extends Fp{}class Uy extends Fp{}class Np extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class qy extends Np{}class Vy extends Np{}class wi extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Gy extends wi{}class jy extends wi{}class Wy extends wi{async _call(e){return new te(await super._call(e))}}class bn extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Hy extends bn{}class Ky extends bn{}class Qy extends bn{async _call(e){return new te(await super._call(e))}}class Xy extends bn{}class Up extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Yy extends Up{}class Zy extends Up{}class qp extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Jy extends qp{}class eb extends qp{}class br extends A{}class tb extends br{}class rb extends br{async _call(e){return new ve(await super._call(e))}}class nb extends br{async _call(e){return new te(await super._call(e))}}class sb extends br{async _call(e){return new be(await super._call(e))}}class ib extends br{async _call(e){return new Se(await super._call(e))}}class vr extends A{}class ab extends vr{}class ob extends vr{async _call(e){return new ve(await super._call(e))}}class lb extends vr{async _call(e){return new te(await super._call(e))}}class ub extends vr{async _call(e){return new be(await super._call(e))}}class db extends vr{async _call(e){return new Se(await super._call(e))}}class $r extends A{}class cb extends $r{}class pb extends $r{async _call(e){return new ve(await super._call(e))}}class hb extends $r{async _call(e){return new te(await super._call(e))}}class fb extends $r{async _call(e){return new be(await super._call(e))}}class mb extends $r{async _call(e){return new Se(await super._call(e))}}class Vp extends A{}class gb extends Vp{}class _b extends Vp{}class Gp extends A{requires_attention_mask=!1;main_input_name="input_features";forward_params=["input_features","attention_mask","decoder_input_ids","decoder_attention_mask","past_key_values"];constructor(e,r,n){super(e,r),this.generation_config=n}}class wb extends Gp{}class yb extends Gp{_retrieve_init_tokens(e){throw e.decoder_start_token_id,new Error("Not implemented yet")}async generate({inputs:e=null,generation_config:r=null,logits_processor:n=null,stopping_criteria:s=null,language:i=null,task:a=null,...o}){throw new Error("WhisperForConditionalGeneration.generate is not yet in Transformers.js v3.")}_extract_token_timestamps(e,r,n=null,s=.02){if(!e.cross_attentions)throw new Error("Model outputs must contain cross attentions to extract timestamps. This is most likely because the model was not exported with `output_attentions=True`.");let i=this.config.median_filter_width;i===void 0&&(console.warn("Model config has no `median_filter_width`, using default value of 7."),i=7);const a=e.cross_attentions.map(u=>{let d=Array.from({length:this.config.decoder_layers},(_,w)=>et(u.map(g=>g[w]),2)),c=oi(r.map(([_,w])=>n?d[_].slice(null,w,null,[0,n]):d[_].slice(null,w)));c=c.transpose(1,0,2,3);let[p,h]=qm(c,-2,0,!0),f=c.clone();for(let _=0;_<f.dims[0];++_){let w=f[_];for(let g=0;g<w.dims[0];++g){let b=w[g];const y=p[_][g][0],v=h[_][g][0];for(let S=0;S<b.dims[0];++S){let k=b[S];for(let I=0;I<k.data.length;++I)k.data[I]=(k.data[I]-v.data[I])/y.data[I];k.data.set(cf(k.data,i))}}}return li(f,1)}),o=[e.sequences.length,e.sequences[0].length],l=new Q("float32",new Float32Array(o[0]*o[1]),o);for(let u=0;u<o[0];++u){const d=a[u].neg().squeeze_(0);let[c,p]=Vm(d),h=Array.from({length:c.length-1},(_,w)=>c[w+1]-c[w]),f=ge([1],h).map(_=>!!_),m=[];for(let _=0;_<f.length;++_)f[_]&&m.push(p[_]*s);l[u].data.set(m,1)}return l}}class bb extends A{main_input_name="pixel_values";constructor(e,r,n){throw super(e,r),this.generation_config=n,new Error("Not implemented yet")}}class vb extends A{forward_params=["input_ids","pixel_values","attention_mask","position_ids","past_key_values"];constructor(e,r,n){super(e,r),this.generation_config=n}}class jp extends vb{async encode_image({pixel_values:e}){const r=(await ut(this.sessions.vision_encoder,{pixel_values:e})).image_features;return this.config.num_image_tokens||(console.warn(`The number of image tokens was not set in the model configuration. Setting it to the number of features detected by the vision encoder (${r.dims[1]}).`),this.config.num_image_tokens=r.dims[1]),r}async encode_text({input_ids:e}){return(await ut(this.sessions.embed_tokens,{input_ids:e})).inputs_embeds}_merge_input_ids_with_image_features({inputs_embeds:e,image_features:r,input_ids:n,attention_mask:s}){const i=this.config.image_token_index,o=n.tolist().map(p=>p.findIndex(h=>h==i)),l=o.every(p=>p===-1),u=o.every(p=>p!==-1);if(!l&&!u)throw new Error("Every input should contain either 0 or 1 image token.");if(l)return{inputs_embeds:e,attention_mask:s};const d=[],c=[];for(let p=0;p<o.length;++p){const h=o[p],f=e[p],m=r[p],_=s[p];d.push(et([f.slice([0,h]),m,f.slice([h+1,f.dims[0]])],0)),c.push(et([_.slice([0,h]),rr([m.dims[0]]),_.slice([h+1,_.dims[0]])],0))}return{inputs_embeds:oi(d,0),attention_mask:oi(c,0)}}}class $b extends jp{}class vn extends A{}class xb extends vn{}class kb extends vn{static async from_pretrained(e,r={}){return r.model_file_name??="text_model",super.from_pretrained(e,r)}}class Sb extends vn{static async from_pretrained(e,r={}){return r.model_file_name??="vision_model",super.from_pretrained(e,r)}}class Wp extends A{}class Eb extends Wp{}class Tb extends Wp{static async from_pretrained(e,r={}){return r.model_file_name??="text_model",super.from_pretrained(e,r)}}class Ib extends vn{static async from_pretrained(e,r={}){return r.model_file_name??="vision_model",super.from_pretrained(e,r)}}class Mb extends A{}class Cb extends Mb{}class Hp extends A{}class zb extends Hp{}class Ab extends Hp{}class Kp extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Pb extends Kp{}class Ob extends Kp{}class Qp extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Bb extends Qp{}class Rb extends Qp{}class Xp extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Db extends Xp{}class Lb extends Xp{}class Yp extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Fb extends Yp{}class Nb extends Yp{}class Zp extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Ub extends Zp{}class qb extends Zp{}class Jp extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Vb extends Jp{}class Gb extends Jp{}class eh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class jb extends eh{}class Wb extends eh{}class th extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Hb extends th{}class Kb extends th{}class rh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Qb extends rh{}class Xb extends rh{}class nh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Yb extends nh{}class Zb extends nh{}class sh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Jb extends sh{}class e0 extends sh{}class ih extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class t0 extends ih{}class r0 extends ih{}class ah extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class n0 extends ah{}class s0 extends ah{}class oh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class i0 extends oh{}class a0 extends oh{}class lh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class o0 extends lh{}class l0 extends lh{}class uh extends A{}class u0 extends uh{}class d0 extends uh{async _call(e){return new te(await super._call(e))}}class c0 extends A{}class p0 extends c0{async _call(e){return new $$(await super._call(e))}}class dh extends A{}class h0 extends dh{}class f0 extends dh{async _call(e){return new te(await super._call(e))}}class ch extends A{}class m0 extends ch{}class g0 extends ch{}class ph extends A{}class _0 extends ph{}class w0 extends ph{}class hh extends A{}class y0 extends hh{}class b0 extends hh{async _call(e){return new te(await super._call(e))}}class yi extends A{}class v0 extends yi{}class $0 extends yi{async _call(e){return new fh(await super._call(e))}}class x0 extends yi{async _call(e){return new k0(await super._call(e))}}class fh extends Le{constructor({logits:e,pred_boxes:r}){super(),this.logits=e,this.pred_boxes=r}}class k0 extends Le{constructor({logits:e,pred_boxes:r,pred_masks:n}){super(),this.logits=e,this.pred_boxes=r,this.pred_masks=n}}class mh extends A{}class S0 extends mh{}class E0 extends mh{async _call(e){return new T0(await super._call(e))}}class T0 extends fh{}class gh extends A{}class I0 extends gh{}class M0 extends gh{async _call(e){return new te(await super._call(e))}}class _h extends A{}class C0 extends _h{}class z0 extends _h{async _call(e){return new te(await super._call(e))}}class wh extends A{}class A0 extends wh{}class P0 extends wh{async _call(e){return new te(await super._call(e))}}class yh extends A{}class O0 extends yh{}class B0 extends yh{}class bh extends A{}class R0 extends bh{}class D0 extends bh{}class L0 extends A{}class F0 extends L0{}class vh extends A{}class N0 extends vh{}class U0 extends vh{}class q0 extends A{}class V0 extends q0{}class $h extends A{}class G0 extends $h{}class j0 extends $h{async _call(e){return new te(await super._call(e))}}class xh extends A{}class W0 extends xh{}class H0 extends xh{async _call(e){return new te(await super._call(e))}}class kh extends A{}class K0 extends kh{}class Q0 extends kh{async _call(e){return new te(await super._call(e))}}class Sh extends A{}class X0 extends Sh{}class Y0 extends Sh{async _call(e){return new Z0(await super._call(e))}}class Z0 extends Le{constructor({logits:e,pred_boxes:r}){super(),this.logits=e,this.pred_boxes=r}}class J0 extends A{}class ev extends J0{async get_image_embeddings({pixel_values:e}){return await dr(this,{pixel_values:e})}async forward(e){if((!e.image_embeddings||!e.image_positional_embeddings)&&(e={...e,...await this.get_image_embeddings(e)}),!e.input_labels&&e.input_points){const n=e.input_points.dims.slice(0,-1),s=n.reduce((i,a)=>i*a,1);e.input_labels=new Q("int64",new BigInt64Array(s).fill(1n),n)}const r={image_embeddings:e.image_embeddings,image_positional_embeddings:e.image_positional_embeddings};return e.input_points&&(r.input_points=e.input_points),e.input_labels&&(r.input_labels=e.input_labels),e.input_boxes&&(r.input_boxes=e.input_boxes),await ut(this.sessions.prompt_encoder_mask_decoder,r)}async _call(e){return new tv(await super._call(e))}}class tv extends Le{constructor({iou_scores:e,pred_masks:r}){super(),this.iou_scores=e,this.pred_masks=r}}class Eh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class rv extends Eh{}class nv extends Eh{}class Th extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class sv extends Th{}class iv extends Th{}class It extends A{}class av extends It{}class ov extends It{async _call(e){return new Lt(await super._call(e))}}class lv extends It{async _call(e){return new te(await super._call(e))}}class uv extends It{async _call(e){return new be(await super._call(e))}}class bi extends A{}class dv extends bi{}class cv extends bi{async _call(e){return new Lt(await super._call(e))}}class pv extends bi{async _call(e){return new te(await super._call(e))}}class $n extends A{}class hv extends $n{}class fv extends $n{async _call(e){return new Lt(await super._call(e))}}class mv extends $n{async _call(e){return new te(await super._call(e))}}class gv extends $n{async _call(e){return new be(await super._call(e))}}class vi extends A{}class _v extends vi{}class wv extends vi{async _call(e){return new Lt(await super._call(e))}}class yv extends vi{async _call(e){return new te(await super._call(e))}}class bv extends It{}class vv extends It{async _call(e){return new Lt(await super._call(e))}}class $v extends It{async _call(e){return new te(await super._call(e))}}class xr extends A{}class xv extends xr{}class kv extends xr{async _call(e){return new Lt(await super._call(e))}}class Sv extends xr{async _call(e){return new te(await super._call(e))}}class Ev extends xr{async _call(e){return new v$(await super._call(e))}}class Tv extends xr{async _call(e){return new be(await super._call(e))}}class Ih extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Iv extends Ih{}class Mv extends Ih{async generate_speech(e,r,{threshold:n=.5,minlenratio:s=0,maxlenratio:i=20,vocoder:a=null}={}){const o={input_ids:e},{encoder_outputs:l,encoder_attention_mask:u}=await dr(this,o),d=l.dims[1]/this.config.reduction_factor,c=Math.floor(d*i),p=Math.floor(d*s),h=this.config.num_mel_bins;let f=[],m=null,_=null,w=0;for(;;){++w;const y=Bp(!!_);let v;_?v=_.output_sequence_out:v=new Q("float32",new Float32Array(h),[1,1,h]);let S={use_cache_branch:y,output_sequence:v,encoder_attention_mask:u,speaker_embeddings:r,encoder_hidden_states:l};this.addPastKeyValues(S,m),_=await ut(this.sessions.decoder_model_merged,S),m=this.getPastKeyValues(_,m);const{prob:k,spectrum:I}=_;if(f.push(I),w>=p&&(Array.from(k.data).filter(B=>B>=n).length>0||w>=c))break}const g=et(f),{waveform:b}=await ut(a.sessions.model,{spectrogram:g});return{spectrogram:g,waveform:b}}}class Cv extends A{main_input_name="spectrogram"}class zv extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Av extends zv{}class Mh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Pv extends Mh{}class Ov extends Mh{}class Ch extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Bv extends Ch{}class Rv extends Ch{}class zh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class Dv extends zh{}class Lv extends zh{}class $i extends A{}class Fv extends $i{}class Nv extends $i{static async from_pretrained(e,r={}){return r.model_file_name??="text_model",super.from_pretrained(e,r)}}class Uv extends $i{static async from_pretrained(e,r={}){return r.model_file_name??="audio_model",super.from_pretrained(e,r)}}class qv extends A{}class Ah extends qv{async _call(e){return new x$(await super._call(e))}}class Ph extends A{}class Vv extends Ph{}class Gv extends Ph{}class Oh extends A{constructor(e,r,n){super(e,r),this.generation_config=n}}class jv extends Oh{}class Wv extends Oh{}class Bh extends A{}class Hv extends Bh{}class Kv extends Bh{async _call(e){return new te(await super._call(e))}}class Rh extends A{forward_params=["input_ids","attention_mask","encoder_outputs","decoder_input_ids","decoder_attention_mask","past_key_values"];constructor(e,r,n){super(e,r),this.generation_config=n}_apply_and_filter_by_delay_pattern_mask(e){const[r,n]=e.dims,s=this.config.decoder.num_codebooks,i=n-s;let a=0;for(let u=0;u<e.size;++u){if(e.data[u]===this.config.decoder.pad_token_id)continue;const d=u%n,c=Math.floor(u/n)%s,p=d-c;p>0&&p<=i&&(e.data[a++]=e.data[u])}const o=Math.floor(r/s),l=a/(o*s);return new Q(e.type,e.data.slice(0,a),[o,s,l])}prepare_inputs_for_generation(e,r,n){let s=structuredClone(e);for(let a=0;a<s.length;++a)for(let o=0;o<s[a].length;++o)a%this.config.decoder.num_codebooks>=o&&(s[a][o]=BigInt(this.config.decoder.pad_token_id));return n.guidance_scale!==null&&n.guidance_scale>1&&(s=s.concat(s)),super.prepare_inputs_for_generation(s,r,n)}async generate(e){const r=await super.generate(e),n=this._apply_and_filter_by_delay_pattern_mask(r).unsqueeze_(0),{audio_values:s}=await ut(this.sessions.encodec_decode,{audio_codes:n});return s}}class Dh{static MODEL_CLASS_MAPPINGS=null;static BASE_IF_FAIL=!1;static async from_pretrained(e,{progress_callback:r=null,config:n=null,cache_dir:s=null,local_files_only:i=!1,revision:a="main",model_file_name:o=null,subfolder:l="onnx",device:u=null,dtype:d=null,use_external_data_format:c=null,session_options:p={}}={}){let h={progress_callback:r,config:n,cache_dir:s,local_files_only:i,revision:a,model_file_name:o,subfolder:l,device:u,dtype:d,use_external_data_format:c,session_options:p};if(h.config=await Cp.from_pretrained(e,h),!this.MODEL_CLASS_MAPPINGS)throw new Error("`MODEL_CLASS_MAPPINGS` not implemented for this type of `AutoClass`: "+this.name);for(let f of this.MODEL_CLASS_MAPPINGS){const m=f.get(h.config.model_type);if(m)return await m[1].from_pretrained(e,h)}if(this.BASE_IF_FAIL)return console.warn(`Unknown model class "${h.config.model_type}", attempting to construct from base class.`),await A.from_pretrained(e,h);throw Error(`Unsupported model type: ${h.config.model_type}`)}}const Qv=new Map([["bert",["BertModel",Mw]],["nomic_bert",["NomicBertModel",Bw]],["roformer",["RoFormerModel",Rw]],["electra",["ElectraModel",Ww]],["esm",["EsmModel",_y]],["convbert",["ConvBertModel",Uw]],["camembert",["CamembertModel",Yw]],["deberta",["DebertaModel",ry]],["deberta-v2",["DebertaV2Model",oy]],["mpnet",["MPNetModel",Sy]],["albert",["AlbertModel",Oy]],["distilbert",["DistilBertModel",py]],["roberta",["RobertaModel",tb]],["xlm",["XLMModel",ab]],["xlm-roberta",["XLMRobertaModel",cb]],["clap",["ClapModel",Fv]],["clip",["CLIPModel",xb]],["clipseg",["CLIPSegModel",zb]],["chinese_clip",["ChineseCLIPModel",Cb]],["siglip",["SiglipModel",Eb]],["mobilebert",["MobileBertModel",vy]],["squeezebert",["SqueezeBertModel",Cy]],["wav2vec2",["Wav2Vec2Model",av]],["wav2vec2-bert",["Wav2Vec2BertModel",_v]],["unispeech",["UniSpeechModel",dv]],["unispeech-sat",["UniSpeechSatModel",hv]],["hubert",["HubertModel",bv]],["wavlm",["WavLMModel",xv]],["audio-spectrogram-transformer",["ASTModel",gb]],["vits",["VitsModel",Ah]],["detr",["DetrModel",v0]],["table-transformer",["TableTransformerModel",S0]],["vit",["ViTModel",u0]],["mobilevit",["MobileViTModel",h0]],["owlvit",["OwlViTModel",m0]],["owlv2",["Owlv2Model",_0]],["beit",["BeitModel",y0]],["deit",["DeiTModel",I0]],["convnext",["ConvNextModel",G0]],["convnextv2",["ConvNextV2Model",W0]],["dinov2",["Dinov2Model",K0]],["resnet",["ResNetModel",C0]],["swin",["SwinModel",A0]],["swin2sr",["Swin2SRModel",O0]],["donut-swin",["DonutSwinModel",V0]],["yolos",["YolosModel",X0]],["dpt",["DPTModel",R0]],["glpn",["GLPNModel",N0]],["hifigan",["SpeechT5HifiGan",Cv]],["efficientnet",["EfficientNetModel",Hv]]]),Xv=new Map([["t5",["T5Model",Ly]],["longt5",["LongT5Model",Ny]],["mt5",["MT5Model",qy]],["bart",["BartModel",Gy]],["mbart",["MBartModel",Hy]],["marian",["MarianModel",rv]],["whisper",["WhisperModel",wb]],["m2m_100",["M2M100Model",sv]],["blenderbot",["BlenderbotModel",Yy]],["blenderbot-small",["BlenderbotSmallModel",Jy]]]),Yv=new Map([["bloom",["BloomModel",n0]],["gpt2",["GPT2Model",Pb]],["gptj",["GPTJModel",Fb]],["gpt_bigcode",["GPTBigCodeModel",Ub]],["gpt_neo",["GPTNeoModel",Bb]],["gpt_neox",["GPTNeoXModel",Db]],["codegen",["CodeGenModel",Vb]],["llama",["LlamaModel",jb]],["gemma",["GemmaModel",Hb]],["openelm",["OpenELMModel",Qb]],["qwen2",["Qwen2Model",Yb]],["phi",["PhiModel",Jb]],["phi3",["Phi3Model",t0]],["mpt",["MptModel",i0]],["opt",["OPTModel",o0]],["mistral",["MistralModel",Pv]],["starcoder2",["Starcoder2Model",Bv]],["falcon",["FalconModel",Dv]],["stablelm",["StableLmModel",jv]]]),Lh=new Map([["speecht5",["SpeechT5ForSpeechToText",Iv]],["whisper",["WhisperForConditionalGeneration",yb]]]),Zv=new Map([["speecht5",["SpeechT5ForTextToSpeech",Mv]]]),Jv=new Map([["vits",["VitsModel",Ah]],["musicgen",["MusicgenForConditionalGeneration",Rh]]]),e$=new Map([["bert",["BertForSequenceClassification",zw]],["roformer",["RoFormerForSequenceClassification",Lw]],["electra",["ElectraForSequenceClassification",Kw]],["esm",["EsmForSequenceClassification",yy]],["convbert",["ConvBertForSequenceClassification",Vw]],["camembert",["CamembertForSequenceClassification",Jw]],["deberta",["DebertaForSequenceClassification",sy]],["deberta-v2",["DebertaV2ForSequenceClassification",uy]],["mpnet",["MPNetForSequenceClassification",Ty]],["albert",["AlbertForSequenceClassification",By]],["distilbert",["DistilBertForSequenceClassification",hy]],["roberta",["RobertaForSequenceClassification",nb]],["xlm",["XLMForSequenceClassification",lb]],["xlm-roberta",["XLMRobertaForSequenceClassification",hb]],["bart",["BartForSequenceClassification",Wy]],["mbart",["MBartForSequenceClassification",Qy]],["mobilebert",["MobileBertForSequenceClassification",xy]],["squeezebert",["SqueezeBertForSequenceClassification",Ay]]]),t$=new Map([["bert",["BertForTokenClassification",Aw]],["roformer",["RoFormerForTokenClassification",Fw]],["electra",["ElectraForTokenClassification",Qw]],["esm",["EsmForTokenClassification",by]],["convbert",["ConvBertForTokenClassification",Gw]],["camembert",["CamembertForTokenClassification",ey]],["deberta",["DebertaForTokenClassification",iy]],["deberta-v2",["DebertaV2ForTokenClassification",dy]],["mpnet",["MPNetForTokenClassification",Iy]],["distilbert",["DistilBertForTokenClassification",fy]],["roberta",["RobertaForTokenClassification",sb]],["xlm",["XLMForTokenClassification",ub]],["xlm-roberta",["XLMRobertaForTokenClassification",fb]]]),Fh=new Map([["t5",["T5ForConditionalGeneration",Fy]],["longt5",["LongT5ForConditionalGeneration",Uy]],["mt5",["MT5ForConditionalGeneration",Vy]],["bart",["BartForConditionalGeneration",jy]],["mbart",["MBartForConditionalGeneration",Ky]],["marian",["MarianMTModel",nv]],["m2m_100",["M2M100ForConditionalGeneration",iv]],["blenderbot",["BlenderbotForConditionalGeneration",Zy]],["blenderbot-small",["BlenderbotSmallForConditionalGeneration",eb]]]),xi=new Map([["bloom",["BloomForCausalLM",s0]],["gpt2",["GPT2LMHeadModel",Ob]],["gptj",["GPTJForCausalLM",Nb]],["gpt_bigcode",["GPTBigCodeForCausalLM",qb]],["gpt_neo",["GPTNeoForCausalLM",Rb]],["gpt_neox",["GPTNeoXForCausalLM",Lb]],["codegen",["CodeGenForCausalLM",Gb]],["llama",["LlamaForCausalLM",Wb]],["gemma",["GemmaForCausalLM",Kb]],["openelm",["OpenELMForCausalLM",Xb]],["qwen2",["Qwen2ForCausalLM",Zb]],["phi",["PhiForCausalLM",e0]],["phi3",["Phi3ForCausalLM",r0]],["mpt",["MptForCausalLM",a0]],["opt",["OPTForCausalLM",l0]],["mbart",["MBartForCausalLM",Xy]],["mistral",["MistralForCausalLM",Ov]],["starcoder2",["Starcoder2ForCausalLM",Rv]],["falcon",["FalconForCausalLM",Lv]],["trocr",["TrOCRForCausalLM",Av]],["stablelm",["StableLmForCausalLM",Wv]]]),r$=new Map([["bert",["BertForMaskedLM",Cw]],["roformer",["RoFormerForMaskedLM",Dw]],["electra",["ElectraForMaskedLM",Hw]],["esm",["EsmForMaskedLM",wy]],["convbert",["ConvBertForMaskedLM",qw]],["camembert",["CamembertForMaskedLM",Zw]],["deberta",["DebertaForMaskedLM",ny]],["deberta-v2",["DebertaV2ForMaskedLM",ly]],["mpnet",["MPNetForMaskedLM",Ey]],["albert",["AlbertForMaskedLM",Dy]],["distilbert",["DistilBertForMaskedLM",gy]],["roberta",["RobertaForMaskedLM",rb]],["xlm",["XLMWithLMHeadModel",ob]],["xlm-roberta",["XLMRobertaForMaskedLM",pb]],["mobilebert",["MobileBertForMaskedLM",$y]],["squeezebert",["SqueezeBertForMaskedLM",zy]]]),n$=new Map([["bert",["BertForQuestionAnswering",Pw]],["roformer",["RoFormerForQuestionAnswering",Nw]],["electra",["ElectraForQuestionAnswering",Xw]],["convbert",["ConvBertForQuestionAnswering",jw]],["camembert",["CamembertForQuestionAnswering",ty]],["deberta",["DebertaForQuestionAnswering",ay]],["deberta-v2",["DebertaV2ForQuestionAnswering",cy]],["mpnet",["MPNetForQuestionAnswering",My]],["albert",["AlbertForQuestionAnswering",Ry]],["distilbert",["DistilBertForQuestionAnswering",my]],["roberta",["RobertaForQuestionAnswering",ib]],["xlm",["XLMForQuestionAnswering",db]],["xlm-roberta",["XLMRobertaForQuestionAnswering",mb]],["mobilebert",["MobileBertForQuestionAnswering",ky]],["squeezebert",["SqueezeBertForQuestionAnswering",Py]]]),Nh=new Map([["vision-encoder-decoder",["VisionEncoderDecoderModel",bb]]]),s$=new Map([["llava",["LlavaForConditionalGeneration",jp]],["moondream1",["Moondream1ForConditionalGeneration",$b]]]),i$=new Map([["vit",["ViTForImageClassification",d0]],["mobilevit",["MobileViTForImageClassification",f0]],["beit",["BeitForImageClassification",b0]],["deit",["DeiTForImageClassification",M0]],["convnext",["ConvNextForImageClassification",j0]],["convnextv2",["ConvNextV2ForImageClassification",H0]],["dinov2",["Dinov2ForImageClassification",Q0]],["resnet",["ResNetForImageClassification",z0]],["swin",["SwinForImageClassification",P0]],["segformer",["SegformerForImageClassification",Vv]],["efficientnet",["EfficientNetForImageClassification",Kv]]]),a$=new Map([["detr",["DetrForObjectDetection",$0]],["table-transformer",["TableTransformerForObjectDetection",E0]],["yolos",["YolosForObjectDetection",Y0]]]),o$=new Map([["owlvit",["OwlViTForObjectDetection",g0]],["owlv2",["Owlv2ForObjectDetection",w0]]]),l$=new Map([["detr",["DetrForSegmentation",x0]],["clipseg",["CLIPSegForImageSegmentation",Ab]]]),u$=new Map([["segformer",["SegformerForSemanticSegmentation",Gv]]]),d$=new Map([["sam",["SamModel",ev]]]),c$=new Map([["wav2vec2",["Wav2Vec2ForCTC",ov]],["wav2vec2-bert",["Wav2Vec2BertForCTC",wv]],["unispeech",["UniSpeechForCTC",cv]],["unispeech-sat",["UniSpeechSatForCTC",fv]],["wavlm",["WavLMForCTC",kv]],["hubert",["HubertForCTC",vv]]]),p$=new Map([["wav2vec2",["Wav2Vec2ForSequenceClassification",lv]],["wav2vec2-bert",["Wav2Vec2BertForSequenceClassification",yv]],["unispeech",["UniSpeechForSequenceClassification",pv]],["unispeech-sat",["UniSpeechSatForSequenceClassification",mv]],["wavlm",["WavLMForSequenceClassification",Sv]],["hubert",["HubertForSequenceClassification",$v]],["audio-spectrogram-transformer",["ASTForAudioClassification",_b]]]),h$=new Map([["wavlm",["WavLMForXVector",Ev]]]),f$=new Map([["unispeech-sat",["UniSpeechSatForAudioFrameClassification",gv]],["wavlm",["WavLMForAudioFrameClassification",Tv]],["wav2vec2",["Wav2Vec2ForAudioFrameClassification",uv]]]),m$=new Map([["vitmatte",["VitMatteForImageMatting",p0]]]),g$=new Map([["swin2sr",["Swin2SRForImageSuperResolution",B0]]]),_$=new Map([["dpt",["DPTForDepthEstimation",D0]],["depth_anything",["DepthAnythingForDepthEstimation",F0]],["glpn",["GLPNForDepthEstimation",U0]]]),w$=new Map([["clip",["CLIPVisionModelWithProjection",Sb]],["siglip",["SiglipVisionModel",Ib]]]),Uh=[[Qv,V.EncoderOnly],[Xv,V.EncoderDecoder],[Yv,V.DecoderOnly],[e$,V.EncoderOnly],[t$,V.EncoderOnly],[Fh,V.Seq2Seq],[Lh,V.Seq2Seq],[xi,V.DecoderOnly],[r$,V.EncoderOnly],[n$,V.EncoderOnly],[Nh,V.Vision2Seq],[s$,V.ImageTextToText],[i$,V.EncoderOnly],[l$,V.EncoderOnly],[u$,V.EncoderOnly],[m$,V.EncoderOnly],[g$,V.EncoderOnly],[_$,V.EncoderOnly],[a$,V.EncoderOnly],[o$,V.EncoderOnly],[d$,V.MaskGeneration],[c$,V.EncoderOnly],[p$,V.EncoderOnly],[Zv,V.Seq2Seq],[Jv,V.EncoderOnly],[h$,V.EncoderOnly],[f$,V.EncoderOnly],[w$,V.EncoderOnly]];for(const[t,e]of Uh)for(const[r,n]of t.values())mn.set(r,e),ur.set(n,r),Pp.set(r,n);const y$=[["MusicgenForConditionalGeneration",Rh,V.Musicgen],["CLIPTextModelWithProjection",kb,V.EncoderOnly],["SiglipTextModel",Tb,V.EncoderOnly],["ClapTextModelWithProjection",Nv,V.EncoderOnly],["ClapAudioModelWithProjection",Uv,V.EncoderOnly]];for(const[t,e,r]of y$)mn.set(t,r),ur.set(e,t),Pp.set(t,e);class P$ extends Dh{static MODEL_CLASS_MAPPINGS=Uh.map(e=>e[0]);static BASE_IF_FAIL=!0}class b$ extends Dh{static MODEL_CLASS_MAPPINGS=[xi]}class te extends Le{constructor({logits:e}){super(),this.logits=e}}class v$ extends Le{constructor({logits:e,embeddings:r}){super(),this.logits=e,this.embeddings=r}}class be extends Le{constructor({logits:e}){super(),this.logits=e}}class ve extends Le{constructor({logits:e}){super(),this.logits=e}}class Se extends Le{constructor({start_logits:e,end_logits:r}){super(),this.start_logits=e,this.end_logits=r}}class Lt extends Le{constructor({logits:e}){super(),this.logits=e}}class $$ extends Le{constructor({alphas:e}){super(),this.alphas=e}}class x$ extends Le{constructor({waveform:e,spectrogram:r}){super(),this.waveform=e,this.spectrogram=r}}if(!(typeof self<"u")){if(!ce)throw new Error("Unable to load image processing library.")}class k${put(e){throw Error("Not implemented")}end(){throw Error("Not implemented")}}const qh=ct.IS_PROCESS_AVAILABLE?t=>process.stdout.write(t):t=>console.log(t);class S$ extends k${constructor(e,{skip_prompt:r=!1,...n}={}){super(),this.tokenizer=e,this.skip_prompt=r,this.decode_kwargs=n,this.token_cache=[],this.print_len=0,this.next_tokens_are_prompt=!0}put(e){if(e.length>1)throw Error("TextStreamer only supports batch size of 1");const r=e[0];if(this.skip_prompt&&this.next_tokens_are_prompt){this.next_tokens_are_prompt=!1;return}this.token_cache=ge(this.token_cache,r);const n=this.tokenizer.decode(this.token_cache,this.decode_kwargs);let s;n.endsWith(`
`)?(s=n.slice(this.print_len),this.token_cache=[],this.print_len=0):n.length>0&&yp(n.charCodeAt(n.length-1))?(s=n.slice(this.print_len),this.print_len+=s.length):(s=n.slice(this.print_len,n.lastIndexOf(" ")+1),this.print_len+=s.length),this.on_finalized_text(s,!1)}end(){let e;this.token_cache.length>0?(e=this.tokenizer.decode(this.token_cache,this.decode_kwargs).slice(this.print_len),this.token_cache=[],this.print_len=0):e="",this.next_tokens_are_prompt=!0,this.on_finalized_text(e,!0)}on_finalized_text(e,r){qh(e),r&&qh(`
`)}}var E$={VITE_BASE:"/web-ai-showcase",BASE_URL:"/web-ai-showcase",MODE:"github",DEV:!1,PROD:!0,SSR:!1};class T$ extends S${constructor(e,r){super(e,{skip_prompt:!0,skip_special_tokens:!0}),this.cb=r}on_finalized_text(e){this.cb(e)}}class I$ extends hn{constructor(){super(),this.interrupted=!1}interrupt(){this.interrupted=!0}reset(){this.interrupted=!1}_call(e,r){return new Array(e.length).fill(this.interrupted)}}const xn=new I$;async function M$(){try{return(await navigator.gpu.requestAdapter()).features.has("shader-f16")}catch{return!1}}class Vh{static model_id=null;static model=null;static tokenizer=null;static streamer=null;static async getInstance(e=null){return this.model_id??=await M$()?"Xenova/Phi-3-mini-4k-instruct_fp16":"Xenova/Phi-3-mini-4k-instruct",this.tokenizer??=tw.from_pretrained(this.model_id,{legacy:!0,progress_callback:e}),this.model??=b$.from_pretrained(this.model_id,{dtype:"q4",device:"webgpu",use_external_data_format:!0,progress_callback:e}),Promise.all([this.tokenizer,this.model])}}async function C$(t){const[e,r]=await Vh.getInstance(),n=e.apply_chat_template(t,{add_generation_prompt:!0,return_dict:!0});let s,i=0;const a=d=>{s??=performance.now();let c;i++>0&&(c=i/(performance.now()-s)*1e3),self.postMessage({status:"update",output:d,tps:c,numTokens:i})},o=new T$(e,a);self.postMessage({status:"start"});const l=await r.generate({...n,max_new_tokens:512,streamer:o,stopping_criteria:xn}),u=e.batch_decode(l,{skip_special_tokens:!1});self.postMessage({status:"complete",output:u})}async function z$(){self.postMessage({status:"loading",data:"Loading model and initializing"});const t=E$.VIT_BASE;ye.localModelPath=`${t}/models/`,ye.allowLocalModels=!0,ye.backends.onnx.wasm.wasmPaths=`${t}/models/wasm/ort-web@1_19_0_dev/`;const[e,r]=await Vh.getInstance(s=>{self.postMessage(s)});self.postMessage({status:"compiling",data:"Compiling shaders and warming up model..."});const n=e("a");await r.generate({...n,max_new_tokens:1}),self.postMessage({status:"ready"})}self.addEventListener("message",async t=>{const{type:e,data:r}=t.data;switch(e){case"load":z$();break;case"generate":xn.reset(),C$(r);break;case"interrupt":xn.interrupt();break;case"reset":xn.reset();break}})})();
