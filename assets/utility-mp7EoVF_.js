import{A as r}from"./config-C7GNoNA1.js";function f(t,s){const n="bg-neutral-400",a="bg-sky-500",i="bg-amber-500",e="bg-emerald-500";let c=[],o="";switch(t){case"unload":c=[a,i,e],o=n;break;case"cached":c=[n,i,e],o=a;break;case"loading":c=[n,a,e],o=i;break;case"loaded":c=[n,a,i],o=e;break}s&&(c.map(u=>{s.classList.contains(u)&&s.classList.remove(u)}),s.classList.add(o))}function L(t){let s={};for(const n of r[t].resources)s[n]={cached:!1,size:0};return s}function p(t){return r[t].linkPathPrefix}function d(t){return t.split(".")[0].indexOf("/")<0?t.split(".")[0]:`${t.split(".")[0].split("/")[1]}-${t.split(".")[1]}`}function b(t,s){const n=r[t].resources.map(i=>{const e=d(i),c=i.indexOf("/")>0?i.split("/")[1]:i;return`  <div
      class="flex min-h-[40px] bg-stone-200 rounded-md text-sm items-center justify-between gap-2 font-mono p-1 m-1"
    >
      <a
        class="text-gray-900 font-semibold text-indigo-600 px-1"
        href="${r[t].linkPathPrefix+i}"
        target="_blank"
        >${c}
        <span
          id="${e}StatusFlag"
          class="hidden text-lg text-green-600"
          >√</span
        ></a
      >

      <button
        class="px-2 mx-2 rounded-md text-stone-50 outline outline-1 bg-stone-500/50 hover:bg-stone-500/90"
      >
        <label class="cursor-pointer" for="uploadInput4${e}"
          >Load</label
        >
        <input
          style="display: none"
          type="file"
          id="uploadInput4${e}"
          multiple
        />
      </button>
    </div>`}).join(""),a=`  <span class="font-semibold text-md p-2 italic"
    >Required files</span
  >`;s.innerHTML=a+n}function g(t,s){const n=()=>{s.classList.contains("opacity-0")&&s.classList.contains("-z-50")&&!s.classList.contains("z-50")&&(s.classList.remove("opacity-0","-z-50"),s.classList.add("z-50"))},a=()=>{!s.classList.contains("opacity-0")&&!s.classList.contains("-z-50")&&s.classList.contains("z-50")&&(s.classList.remove("z-50"),s.classList.add("opacity-0","-z-50"))};t.addEventListener("mouseover",n),t.addEventListener("mouseout",i=>{s.contains(i.relatedTarget)||a()}),s.addEventListener("mouseover",n),s.addEventListener("mouseout",a)}function h(t,s=0){const n=["Bytes","KB","MB","GB","TB"];if(t===0)return"0 Bytes";const a=parseInt(Math.floor(Math.log(t)/Math.log(1e3)),10);return(t/Math.pow(1e3,a)).toFixed(s)+" "+n[a]}function x(t){let s=document.createElement("template");return t=t.trim(),s.innerHTML=t,s.content.firstChild}function m(...t){t.forEach(s=>{s&&s instanceof HTMLElement&&s.classList.contains("hidden")&&s.classList.remove("hidden")})}export{b as a,d as b,f as c,L as d,h as f,p as g,x as h,g as i,m as r};
