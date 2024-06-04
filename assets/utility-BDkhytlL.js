import{A as r,a as d}from"./config-hvj4ggRh.js";function L(t,s){const n="bg-neutral-400",i="bg-sky-500",a="bg-amber-500",e="bg-emerald-500";let c=[],o="";switch(t){case"unload":c=[i,a,e],o=n;break;case"cached":c=[n,a,e],o=i;break;case"loading":c=[n,i,e],o=a;break;case"loaded":c=[n,i,a],o=e;break}s&&(c.map(u=>{s.classList.contains(u)&&s.classList.remove(u)}),s.classList.add(o))}function p(t){let s={};for(const n of r[t].resources)s[n]={cached:!1,size:0};return s}function b(t){return d+r[t].localFolderPathPrefix+t+"/"}function l(t){return t.split(".")[0].indexOf("/")<0?t.split(".")[0]:t.split(".")[0].split("/")[1]}function g(t,s){const n=r[t].resources.map(a=>{const e=l(a),c=a.indexOf("/")>0?a.split("/")[1]:a;return`  <div
      class="flex min-h-[40px] bg-stone-200 rounded-md text-sm items-center justify-between gap-2 font-mono p-1 m-1"
    >
      <a
        class="text-gray-900 font-semibold text-indigo-600 px-1"
        href="${r[t].linkPathPrefix+a}"
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
    </div>`}).join(""),i=`  <span class="font-semibold text-md p-2 italic"
    >Required files</span
  >`;s.innerHTML=i+n}function h(t,s){const n=()=>{s.classList.contains("opacity-0")&&s.classList.contains("-z-50")&&!s.classList.contains("z-50")&&(s.classList.remove("opacity-0","-z-50"),s.classList.add("z-50"))},i=()=>{!s.classList.contains("opacity-0")&&!s.classList.contains("-z-50")&&s.classList.contains("z-50")&&(s.classList.remove("z-50"),s.classList.add("opacity-0","-z-50"))};t.addEventListener("mouseover",n),t.addEventListener("mouseout",a=>{s.contains(a.relatedTarget)||i()}),s.addEventListener("mouseover",n),s.addEventListener("mouseout",i)}function x(t,s=0){const n=["Bytes","KB","MB","GB","TB"];if(t===0)return"0 Bytes";const i=parseInt(Math.floor(Math.log(t)/Math.log(1e3)),10);return(t/Math.pow(1e3,i)).toFixed(s)+" "+n[i]}function m(t){let s=document.createElement("template");return t=t.trim(),s.innerHTML=t,s.content.firstChild}function y(...t){t.forEach(s=>{s&&s instanceof HTMLElement&&s.classList.contains("hidden")&&s.classList.remove("hidden")})}export{g as a,l as b,L as c,p as d,x as f,b as g,m as h,h as i,y as r};
