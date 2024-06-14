import { useEffect, useState, useRef } from "react";

import Chat from "./components/Chat";
import ArrowRightIcon from "./components/icons/ArrowRightIcon";
import StopIcon from "./components/icons/StopIcon";
import Progress from "./components/Progress";

import {
  initModelsPanelHandler,
  getElementId4Resource,
  removeHiddenClass,
  formatBytes
} from "../../common/utility.js";

import {
  TRANSFORMER_LOCAL_MODEL_PATH,
  ALL_NEEDED_MODEL_RESOURCES
} from "../../../config.js";

import logoImg from "/assets/logo.png";

const IS_WEBGPU_AVAILABLE = !!navigator.gpu;
const STICKY_SCROLL_THRESHOLD = 120;

const DEFAULT_CACHE_STORAGE_NAME = "transformers-cache";

async function hasFp16() {
  try {
    const adapter = await navigator.gpu.requestAdapter();
    return adapter.features.has("shader-f16");
  } catch (e) {
    return false;
  }
}

const MODEL_NAME = (await hasFp16())
  ? "Phi-3-mini-4k-instruct_fp16"
  : "Phi-3-mini-4k-instruct";

const LOCAL_REQUEST_PREFIX =
  TRANSFORMER_LOCAL_MODEL_PATH +
  ALL_NEEDED_MODEL_RESOURCES[MODEL_NAME].localFolderPathPrefix +
  MODEL_NAME +
  "/";

const REMOTE_REQUEST_PREFIX =
  ALL_NEEDED_MODEL_RESOURCES[MODEL_NAME].linkPathPrefix;

function App() {
  // Create a reference to the worker object.
  const worker = useRef(null);

  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Model loading and progress
  const [status, setStatus] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [progressItems, setProgressItems] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  // Inputs and outputs
  const [input, setInput] = useState("");
  const [dialogMessages, setDialogMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [tps, setTps] = useState(null);
  const [numTokens, setNumTokens] = useState(null);

  function startNewDialog() {
    setHistoryMessages([...historyMessages, ...dialogMessages]);
    worker.current.postMessage({ type: "reset" });
    setDialogMessages([]);
  }

  function onEnter(message) {
    startNewDialog();
    setDialogMessages((prev) => [...prev, { role: "user", content: message }]);
    setTps(null);
    setIsRunning(true);
    setInput("");
  }

  function constructLoadModelsPanel(modelName, targetElement) {
    const resourcesPanelHTML = ALL_NEEDED_MODEL_RESOURCES[modelName].resources
      .map((resource) => {
        const elementId = getElementId4Resource(resource);

        const text =
          resource.indexOf("/") > 0 ? resource.split("/")[1] : resource;

        const url =
          ALL_NEEDED_MODEL_RESOURCES[modelName].linkPathPrefix + resource;

        return `<div
        class="flex min-h-[40px] bg-stone-200 rounded-md text-sm items-center justify-between gap-2 font-mono p-1 m-1"
      >
        <a
          class="text-gray-900 font-semibold text-indigo-600 px-1"
          href="${url}"
          target="_blank"
          >${text}
          <span
            id="${elementId}StatusFlag"
            class="hidden text-lg text-green-600"
            >√</span
          ></a
        >

        <button
          class="px-2 mx-2 rounded-md text-stone-50 outline outline-1 bg-stone-500/50 hover:bg-stone-500/90"
        >
          <label class="cursor-pointer" for="uploadInput4${elementId}"
            >Load</label
          >
          <input
            style="display: none"
            type="file"
            id="uploadInput4${elementId}"
            multiple
          />
        </button>
      </div>`;
      })
      .join("");

    const tag = `<span class="font-semibold text-md p-2 italic"
      >Required files</span
    >`;

    targetElement.innerHTML = tag + resourcesPanelHTML;
  }

  function changeClass4StatusBar(status, targetElement) {
    const unloadClass = "bg-neutral-400";
    const cachedClass = "bg-sky-500";
    const loadingClass = "bg-amber-500";
    const loadedClass = "bg-emerald-500";
    let filters = [];
    let newClass = "";
    switch (status) {
      case "unload":
        filters = [cachedClass, loadingClass, loadedClass];
        newClass = unloadClass;
        break;

      case "cached":
        filters = [unloadClass, loadingClass, loadedClass];
        newClass = cachedClass;
        break;

      case "loading":
        filters = [unloadClass, cachedClass, loadedClass];
        newClass = loadingClass;
        break;

      case "loaded":
        filters = [unloadClass, cachedClass, loadingClass];
        newClass = loadedClass;
        break;
    }
    if (targetElement) {
      filters.map((removedClass) => {
        if (targetElement.classList.contains(removedClass)) {
          targetElement.classList.remove(removedClass);
        }
      });
      targetElement.classList.add(newClass);
    }
  }

  async function scanCacheStorage() {
    let cache = await caches.open(DEFAULT_CACHE_STORAGE_NAME);
    for (const name of ALL_NEEDED_MODEL_RESOURCES[MODEL_NAME].resources) {
      let status = "",
        textContent = "";
      const localModelUrl = LOCAL_REQUEST_PREFIX + name;
      // search local model resource in the cache first
      let cacheResponse = await cache.match(localModelUrl);

      if (!cacheResponse || !cacheResponse.ok) {
        // search remote model resource in the cache
        cacheResponse = await cache.match(REMOTE_REQUEST_PREFIX + name);
      }

      const statusBarElement = document.getElementById(
        `${name.split(".")[0].split("/")[1]}-${name.split(".")[1]}StatusBar`
      );

      if (!cacheResponse || !cacheResponse.ok) {
        // not cached
        status = "unload";
        textContent = "unload";
      } else {
        status = "cached";
        textContent = "cache available";
        // update the status flag of this resource
        removeHiddenClass(
          document.getElementById(`${getElementId4Resource(name)}StatusFlag`)
        );
      }
      if (statusBarElement) {
        changeClass4StatusBar(status, statusBarElement);
        statusBarElement.textContent = textContent;
      }

      changeTextForLoadBtn();
    }
  }

  // change the `Load model` when onnx & onnx_data have been loaded
  function changeTextForLoadBtn() {
    let modelsAllReady = true;
    for (const name of ALL_NEEDED_MODEL_RESOURCES[MODEL_NAME].resources) {
      const statusBarElement = document.getElementById(
        `${name.split(".")[0].split("/")[1]}-${name.split(".")[1]}StatusBar`
      );
      if (
        statusBarElement &&
        statusBarElement.textContent !== "cache available"
      ) {
        modelsAllReady = false;
        break;
      }
    }
    if (!modelsAllReady) return;

    const LOAD_MODELS_BUTTON = document.getElementById("loadModelBtn");

    LOAD_MODELS_BUTTON.textContent = "Trigger";
  }

  function setupNavigBar(relativePath) {
    const svgSection = `
      <svg
      id="naviMenuIcon"
      width="40px"
      height="40px"
      viewBox="0 0 1024 1024"
      class="icon block mr-4 hidden cursor-pointer"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      >
          <path
          d="M91.89 238.457c-29.899 0-54.133 24.239-54.133 54.134 0 29.899 24.234 54.137 54.133 54.137s54.138-24.238 54.138-54.137c0-29.896-24.239-54.134-54.138-54.134z"
          fill="#E5594F"
          />
          <path
          d="M91.89 462.463c-29.899 0-54.133 24.239-54.133 54.139 0 29.895 24.234 54.133 54.133 54.133s54.138-24.238 54.138-54.133c0-29.9-24.239-54.139-54.138-54.139z"
          fill="#C45FA0"
          />
          <path
          d="M91.89 686.475c-29.899 0-54.133 24.237-54.133 54.133 0 29.899 24.234 54.138 54.133 54.138s54.138-24.238 54.138-54.138c0-29.896-24.239-54.133-54.138-54.133z"
          fill="#F39A2B"
          />
          <path
          d="M941.26 234.723H328.964c-28.867 0-52.263 23.4-52.263 52.268v3.734c0 28.868 23.396 52.269 52.263 52.269H941.26c28.869 0 52.269-23.401 52.269-52.269v-3.734c-0.001-28.868-23.4-52.268-52.269-52.268z"
          fill="#F0D043"
          />
          <path
          d="M941.26 682.74H328.964c-28.867 0-52.263 23.399-52.263 52.268v3.734c0 28.863 23.396 52.269 52.263 52.269H941.26c28.869 0 52.269-23.405 52.269-52.269v-3.734c-0.001-28.868-23.4-52.268-52.269-52.268z"
          fill="#4A5699"
          />
          <path
          d="M709.781 458.729H328.964c-28.867 0-52.263 23.4-52.263 52.269v3.734c0 28.873 23.396 52.269 52.263 52.269h380.817c28.866 0 52.271-23.396 52.271-52.269v-3.734c0.001-28.869-23.405-52.269-52.271-52.269z"
          fill="#E5594F"
          />
      </svg>
      `;

    document.getElementById("naviBar").innerHTML = `<div
  class="flex items-center bg-stone-950/30 backdrop-blur-xl text-stone-50 min-h-[60px] p-2 w-full"
  >
      <div class="flex items-center px-2">
          ${svgSection}
          <a
              href="${relativePath}/index.html"
              class="font-mono font-bold text-4xl text-stone-50 text-shadow-sm block px-8 xl:px-16"
              >
                  <svg width="287" height="57" viewBox="0 0 887 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                  d="M249.752 121.336C249.752 117.752 250.477 114.616 251.928 111.928C253.379 109.197 255.363 107.085 257.88 105.592C260.44 104.099 263.277 103.352 266.392 103.352C269.464 103.352 272.131 104.013 274.392 105.336C276.653 106.659 278.339 108.323 279.448 110.328V103.928H285.336V139H279.448V132.472C278.296 134.52 276.568 136.227 274.264 137.592C272.003 138.915 269.357 139.576 266.328 139.576C263.213 139.576 260.397 138.808 257.88 137.272C255.363 135.736 253.379 133.581 251.928 130.808C250.477 128.035 249.752 124.877 249.752 121.336ZM279.448 121.4C279.448 118.755 278.915 116.451 277.848 114.488C276.781 112.525 275.331 111.032 273.496 110.008C271.704 108.941 269.72 108.408 267.544 108.408C265.368 108.408 263.384 108.92 261.592 109.944C259.8 110.968 258.371 112.461 257.304 114.424C256.237 116.387 255.704 118.691 255.704 121.336C255.704 124.024 256.237 126.371 257.304 128.376C258.371 130.339 259.8 131.853 261.592 132.92C263.384 133.944 265.368 134.456 267.544 134.456C269.72 134.456 271.704 133.944 273.496 132.92C275.331 131.853 276.781 130.339 277.848 128.376C278.915 126.371 279.448 124.045 279.448 121.4ZM300.362 109.624C301.386 107.619 302.837 106.061 304.714 104.952C306.634 103.843 308.959 103.288 311.69 103.288V109.304H310.154C303.626 109.304 300.362 112.845 300.362 119.928V139H294.538V103.928H300.362V109.624ZM324.877 108.728V129.4C324.877 131.107 325.24 132.323 325.965 133.048C326.69 133.731 327.949 134.072 329.741 134.072H334.029V139H328.781C325.538 139 323.106 138.253 321.485 136.76C319.864 135.267 319.053 132.813 319.053 129.4V108.728H314.509V103.928H319.053V95.096H324.877V103.928H334.029V108.728H324.877ZM343.454 98.232C342.344 98.232 341.406 97.848 340.638 97.08C339.87 96.312 339.486 95.3733 339.486 94.264C339.486 93.1547 339.87 92.216 340.638 91.448C341.406 90.68 342.344 90.296 343.454 90.296C344.52 90.296 345.416 90.68 346.142 91.448C346.91 92.216 347.294 93.1547 347.294 94.264C347.294 95.3733 346.91 96.312 346.142 97.08C345.416 97.848 344.52 98.232 343.454 98.232ZM346.27 103.928V139H340.446V103.928H346.27ZM369.828 108.728H362.468V139H356.644V108.728H352.1V103.928H356.644V101.432C356.644 97.5067 357.646 94.648 359.652 92.856C361.7 91.0213 364.964 90.104 369.444 90.104V94.968C366.884 94.968 365.07 95.48 364.004 96.504C362.98 97.4853 362.468 99.128 362.468 101.432V103.928H369.828V108.728ZM378.986 98.232C377.877 98.232 376.938 97.848 376.17 97.08C375.402 96.312 375.018 95.3733 375.018 94.264C375.018 93.1547 375.402 92.216 376.17 91.448C376.938 90.68 377.877 90.296 378.986 90.296C380.053 90.296 380.949 90.68 381.674 91.448C382.442 92.216 382.826 93.1547 382.826 94.264C382.826 95.3733 382.442 96.312 381.674 97.08C380.949 97.848 380.053 98.232 378.986 98.232ZM381.802 103.928V139H375.978V103.928H381.802ZM388.912 121.4C388.912 117.773 389.637 114.616 391.088 111.928C392.539 109.197 394.544 107.085 397.104 105.592C399.707 104.099 402.672 103.352 406 103.352C410.309 103.352 413.851 104.397 416.624 106.488C419.44 108.579 421.296 111.48 422.192 115.192H415.92C415.323 113.059 414.149 111.373 412.4 110.136C410.693 108.899 408.56 108.28 406 108.28C402.672 108.28 399.984 109.432 397.936 111.736C395.888 113.997 394.864 117.219 394.864 121.4C394.864 125.624 395.888 128.888 397.936 131.192C399.984 133.496 402.672 134.648 406 134.648C408.56 134.648 410.693 134.051 412.4 132.856C414.107 131.661 415.28 129.955 415.92 127.736H422.192C421.253 131.32 419.376 134.2 416.56 136.376C413.744 138.509 410.224 139.576 406 139.576C402.672 139.576 399.707 138.829 397.104 137.336C394.544 135.843 392.539 133.731 391.088 131C389.637 128.269 388.912 125.069 388.912 121.4ZM432.331 98.232C431.222 98.232 430.283 97.848 429.515 97.08C428.747 96.312 428.363 95.3733 428.363 94.264C428.363 93.1547 428.747 92.216 429.515 91.448C430.283 90.68 431.222 90.296 432.331 90.296C433.398 90.296 434.294 90.68 435.019 91.448C435.787 92.216 436.171 93.1547 436.171 94.264C436.171 95.3733 435.787 96.312 435.019 97.08C434.294 97.848 433.398 98.232 432.331 98.232ZM435.147 103.928V139H429.323V103.928H435.147ZM442.257 121.336C442.257 117.752 442.982 114.616 444.433 111.928C445.884 109.197 447.868 107.085 450.385 105.592C452.945 104.099 455.782 103.352 458.897 103.352C461.969 103.352 464.636 104.013 466.897 105.336C469.158 106.659 470.844 108.323 471.953 110.328V103.928H477.841V139H471.953V132.472C470.801 134.52 469.073 136.227 466.769 137.592C464.508 138.915 461.862 139.576 458.833 139.576C455.718 139.576 452.902 138.808 450.385 137.272C447.868 135.736 445.884 133.581 444.433 130.808C442.982 128.035 442.257 124.877 442.257 121.336ZM471.953 121.4C471.953 118.755 471.42 116.451 470.353 114.488C469.286 112.525 467.836 111.032 466.001 110.008C464.209 108.941 462.225 108.408 460.049 108.408C457.873 108.408 455.889 108.92 454.097 109.944C452.305 110.968 450.876 112.461 449.809 114.424C448.742 116.387 448.209 118.691 448.209 121.336C448.209 124.024 448.742 126.371 449.809 128.376C450.876 130.339 452.305 131.853 454.097 132.92C455.889 133.944 457.873 134.456 460.049 134.456C462.225 134.456 464.209 133.944 466.001 132.92C467.836 131.853 469.286 130.339 470.353 128.376C471.42 126.371 471.953 124.045 471.953 121.4ZM492.867 91.64V139H487.043V91.64H492.867ZM521.583 98.232C520.474 98.232 519.535 97.848 518.767 97.08C517.999 96.312 517.615 95.3733 517.615 94.264C517.615 93.1547 517.999 92.216 518.767 91.448C519.535 90.68 520.474 90.296 521.583 90.296C522.65 90.296 523.546 90.68 524.271 91.448C525.039 92.216 525.423 93.1547 525.423 94.264C525.423 95.3733 525.039 96.312 524.271 97.08C523.546 97.848 522.65 98.232 521.583 98.232ZM524.399 103.928V139H518.575V103.928H524.399ZM550.774 103.288C555.04 103.288 558.496 104.589 561.142 107.192C563.787 109.752 565.11 113.464 565.11 118.328V139H559.35V119.16C559.35 115.661 558.475 112.995 556.726 111.16C554.976 109.283 552.587 108.344 549.558 108.344C546.486 108.344 544.032 109.304 542.198 111.224C540.406 113.144 539.51 115.939 539.51 119.608V139H533.686V103.928H539.51V108.92C540.662 107.128 542.219 105.741 544.182 104.76C546.187 103.779 548.384 103.288 550.774 103.288ZM581.087 108.728V129.4C581.087 131.107 581.45 132.323 582.175 133.048C582.9 133.731 584.159 134.072 585.951 134.072H590.239V139H584.991C581.748 139 579.316 138.253 577.695 136.76C576.074 135.267 575.263 132.813 575.263 129.4V108.728H570.719V103.928H575.263V95.096H581.087V103.928H590.239V108.728H581.087ZM628.656 120.12C628.656 121.229 628.592 122.403 628.464 123.64H600.432C600.645 127.096 601.818 129.805 603.952 131.768C606.128 133.688 608.752 134.648 611.824 134.648C614.341 134.648 616.432 134.072 618.096 132.92C619.802 131.725 620.997 130.147 621.68 128.184H627.952C627.013 131.555 625.136 134.307 622.32 136.44C619.504 138.531 616.005 139.576 611.824 139.576C608.496 139.576 605.509 138.829 602.864 137.336C600.261 135.843 598.213 133.731 596.72 131C595.226 128.227 594.48 125.027 594.48 121.4C594.48 117.773 595.205 114.595 596.656 111.864C598.106 109.133 600.133 107.043 602.736 105.592C605.381 104.099 608.41 103.352 611.824 103.352C615.152 103.352 618.096 104.077 620.656 105.528C623.216 106.979 625.178 108.984 626.544 111.544C627.952 114.061 628.656 116.92 628.656 120.12ZM622.64 118.904C622.64 116.685 622.149 114.787 621.168 113.208C620.186 111.587 618.842 110.371 617.136 109.56C615.472 108.707 613.616 108.28 611.568 108.28C608.624 108.28 606.106 109.219 604.016 111.096C601.968 112.973 600.794 115.576 600.496 118.904H622.64ZM641.527 91.64V139H635.703V91.64H641.527ZM656.637 91.64V139H650.813V91.64H656.637ZM668.931 98.232C667.822 98.232 666.883 97.848 666.115 97.08C665.347 96.312 664.963 95.3733 664.963 94.264C664.963 93.1547 665.347 92.216 666.115 91.448C666.883 90.68 667.822 90.296 668.931 90.296C669.998 90.296 670.894 90.68 671.619 91.448C672.387 92.216 672.771 93.1547 672.771 94.264C672.771 95.3733 672.387 96.312 671.619 97.08C670.894 97.848 669.998 98.232 668.931 98.232ZM671.747 103.928V139H665.923V103.928H671.747ZM695.497 103.352C698.526 103.352 701.172 104.013 703.433 105.336C705.737 106.659 707.444 108.323 708.553 110.328V103.928H714.441V139.768C714.441 142.968 713.758 145.805 712.393 148.28C711.028 150.797 709.065 152.76 706.505 154.168C703.988 155.576 701.044 156.28 697.673 156.28C693.065 156.28 689.225 155.192 686.153 153.016C683.081 150.84 681.268 147.875 680.713 144.12H686.473C687.113 146.253 688.436 147.96 690.441 149.24C692.446 150.563 694.857 151.224 697.673 151.224C700.873 151.224 703.476 150.221 705.481 148.216C707.529 146.211 708.553 143.395 708.553 139.768V132.408C707.401 134.456 705.694 136.163 703.433 137.528C701.172 138.893 698.526 139.576 695.497 139.576C692.382 139.576 689.545 138.808 686.985 137.272C684.468 135.736 682.484 133.581 681.033 130.808C679.582 128.035 678.857 124.877 678.857 121.336C678.857 117.752 679.582 114.616 681.033 111.928C682.484 109.197 684.468 107.085 686.985 105.592C689.545 104.099 692.382 103.352 695.497 103.352ZM708.553 121.4C708.553 118.755 708.02 116.451 706.953 114.488C705.886 112.525 704.436 111.032 702.601 110.008C700.809 108.941 698.825 108.408 696.649 108.408C694.473 108.408 692.489 108.92 690.697 109.944C688.905 110.968 687.476 112.461 686.409 114.424C685.342 116.387 684.809 118.691 684.809 121.336C684.809 124.024 685.342 126.371 686.409 128.376C687.476 130.339 688.905 131.853 690.697 132.92C692.489 133.944 694.473 134.456 696.649 134.456C698.825 134.456 700.809 133.944 702.601 132.92C704.436 131.853 705.886 130.339 706.953 128.376C708.02 126.371 708.553 124.045 708.553 121.4ZM755.643 120.12C755.643 121.229 755.579 122.403 755.451 123.64H727.419C727.632 127.096 728.806 129.805 730.939 131.768C733.115 133.688 735.739 134.648 738.811 134.648C741.328 134.648 743.419 134.072 745.083 132.92C746.79 131.725 747.984 130.147 748.667 128.184H754.939C754 131.555 752.123 134.307 749.307 136.44C746.491 138.531 742.992 139.576 738.811 139.576C735.483 139.576 732.496 138.829 729.851 137.336C727.248 135.843 725.2 133.731 723.707 131C722.214 128.227 721.467 125.027 721.467 121.4C721.467 117.773 722.192 114.595 723.643 111.864C725.094 109.133 727.12 107.043 729.723 105.592C732.368 104.099 735.398 103.352 738.811 103.352C742.139 103.352 745.083 104.077 747.643 105.528C750.203 106.979 752.166 108.984 753.531 111.544C754.939 114.061 755.643 116.92 755.643 120.12ZM749.627 118.904C749.627 116.685 749.136 114.787 748.155 113.208C747.174 111.587 745.83 110.371 744.123 109.56C742.459 108.707 740.603 108.28 738.555 108.28C735.611 108.28 733.094 109.219 731.003 111.096C728.955 112.973 727.782 115.576 727.483 118.904H749.627ZM779.779 103.288C784.045 103.288 787.501 104.589 790.147 107.192C792.792 109.752 794.115 113.464 794.115 118.328V139H788.355V119.16C788.355 115.661 787.48 112.995 785.731 111.16C783.981 109.283 781.592 108.344 778.563 108.344C775.491 108.344 773.037 109.304 771.203 111.224C769.411 113.144 768.515 115.939 768.515 119.608V139H762.691V103.928H768.515V108.92C769.667 107.128 771.224 105.741 773.187 104.76C775.192 103.779 777.389 103.288 779.779 103.288ZM800.812 121.4C800.812 117.773 801.537 114.616 802.988 111.928C804.439 109.197 806.444 107.085 809.004 105.592C811.607 104.099 814.572 103.352 817.9 103.352C822.209 103.352 825.751 104.397 828.524 106.488C831.34 108.579 833.196 111.48 834.092 115.192H827.82C827.223 113.059 826.049 111.373 824.3 110.136C822.593 108.899 820.46 108.28 817.9 108.28C814.572 108.28 811.884 109.432 809.836 111.736C807.788 113.997 806.764 117.219 806.764 121.4C806.764 125.624 807.788 128.888 809.836 131.192C811.884 133.496 814.572 134.648 817.9 134.648C820.46 134.648 822.593 134.051 824.3 132.856C826.007 131.661 827.18 129.955 827.82 127.736H834.092C833.153 131.32 831.276 134.2 828.46 136.376C825.644 138.509 822.124 139.576 817.9 139.576C814.572 139.576 811.607 138.829 809.004 137.336C806.444 135.843 804.439 133.731 802.988 131C801.537 128.269 800.812 125.069 800.812 121.4ZM873.223 120.12C873.223 121.229 873.159 122.403 873.031 123.64H844.999C845.212 127.096 846.386 129.805 848.519 131.768C850.695 133.688 853.319 134.648 856.391 134.648C858.908 134.648 860.999 134.072 862.663 132.92C864.37 131.725 865.564 130.147 866.247 128.184H872.519C871.58 131.555 869.703 134.307 866.887 136.44C864.071 138.531 860.572 139.576 856.391 139.576C853.063 139.576 850.076 138.829 847.431 137.336C844.828 135.843 842.78 133.731 841.287 131C839.794 128.227 839.047 125.027 839.047 121.4C839.047 117.773 839.772 114.595 841.223 111.864C842.674 109.133 844.7 107.043 847.303 105.592C849.948 104.099 852.978 103.352 856.391 103.352C859.719 103.352 862.663 104.077 865.223 105.528C867.783 106.979 869.746 108.984 871.111 111.544C872.519 114.061 873.223 116.92 873.223 120.12ZM867.207 118.904C867.207 116.685 866.716 114.787 865.735 113.208C864.754 111.587 863.41 110.371 861.703 109.56C860.039 108.707 858.183 108.28 856.135 108.28C853.191 108.28 850.674 109.219 848.583 111.096C846.535 112.973 845.362 115.576 845.063 118.904H867.207Z"
                  fill="white" />
                  <path
                  d="M233 18C233 12.4772 237.477 8 243 8H388C393.523 8 398 12.4772 398 18V76C398 81.5228 393.523 86 388 86H243C237.477 86 233 81.5228 233 76V18Z"
                  fill="white" fill-opacity="0.5" />
                  <path
                  d="M300.069 33.928L289.125 69H283.109L274.661 41.16L266.213 69H260.197L249.189 33.928H255.141L263.205 63.368L271.909 33.928H277.861L286.373 63.432L294.309 33.928H300.069ZM337.209 50.12C337.209 51.2293 337.145 52.4027 337.017 53.64H308.985C309.199 57.096 310.372 59.8053 312.505 61.768C314.681 63.688 317.305 64.648 320.377 64.648C322.895 64.648 324.985 64.072 326.649 62.92C328.356 61.7253 329.551 60.1467 330.233 58.184H336.505C335.567 61.5547 333.689 64.3067 330.873 66.44C328.057 68.5307 324.559 69.576 320.377 69.576C317.049 69.576 314.063 68.8293 311.417 67.336C308.815 65.8427 306.767 63.7307 305.273 61C303.78 58.2267 303.033 55.0267 303.033 51.4C303.033 47.7733 303.759 44.5947 305.209 41.864C306.66 39.1333 308.687 37.0427 311.289 35.592C313.935 34.0987 316.964 33.352 320.377 33.352C323.705 33.352 326.649 34.0773 329.209 35.528C331.769 36.9787 333.732 38.984 335.097 41.544C336.505 44.0613 337.209 46.92 337.209 50.12ZM331.193 48.904C331.193 46.6853 330.703 44.7867 329.721 43.208C328.74 41.5867 327.396 40.3707 325.689 39.56C324.025 38.7067 322.169 38.28 320.121 38.28C317.177 38.28 314.66 39.2187 312.569 41.096C310.521 42.9733 309.348 45.576 309.049 48.904H331.193ZM350.081 40.456C351.275 38.3653 353.025 36.6587 355.329 35.336C357.633 34.0133 360.257 33.352 363.201 33.352C366.358 33.352 369.195 34.0987 371.713 35.592C374.23 37.0853 376.214 39.1973 377.665 41.928C379.115 44.616 379.841 47.752 379.841 51.336C379.841 54.8773 379.115 58.0347 377.665 60.808C376.214 63.5813 374.209 65.736 371.649 67.272C369.131 68.808 366.315 69.576 363.201 69.576C360.171 69.576 357.505 68.9147 355.201 67.592C352.939 66.2693 351.233 64.584 350.081 62.536V69H344.257V21.64H350.081V40.456ZM373.889 51.336C373.889 48.6907 373.355 46.3867 372.289 44.424C371.222 42.4613 369.771 40.968 367.937 39.944C366.145 38.92 364.161 38.408 361.985 38.408C359.851 38.408 357.867 38.9413 356.033 40.008C354.241 41.032 352.79 42.5467 351.681 44.552C350.614 46.5147 350.081 48.7973 350.081 51.4C350.081 54.0453 350.614 56.3707 351.681 58.376C352.79 60.3387 354.241 61.8533 356.033 62.92C357.867 63.944 359.851 64.456 361.985 64.456C364.161 64.456 366.145 63.944 367.937 62.92C369.771 61.8533 371.222 60.3387 372.289 58.376C373.355 56.3707 373.889 54.024 373.889 51.336Z"
                  fill="white" />
                  <path d="M15 66L33 45" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M63 59L44 44" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M77 61L103 55" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M126 16L119 39" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M151 41L127 47" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M161 50L156 85" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M163 38L193 83" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M162 92L188 92" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M148 98L119 119" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M101 90L155 132" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M183 126L155 132" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M194 117L197 105" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M195 131L203 142" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M123 60L149 87" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M67 71L55 103" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M27 72L87 88" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M79 36L97 79" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <path d="M120 11L88 21" stroke="white" stroke-width="6" stroke-linecap="round" />
                  <circle cx="38.5" cy="38.5" r="6.5" stroke="white" stroke-width="4" />
                  <circle cx="69.5" cy="63.5" r="6.5" stroke="white" stroke-width="4" />
                  <circle cx="127.5" cy="8.5" r="6.5" stroke="white" stroke-width="4" />
                  <circle cx="154.5" cy="92.5" r="6.5" stroke="white" stroke-width="4" />
                  <circle cx="112.5" cy="124.5" r="6.5" stroke="white" stroke-width="4" />
                  <circle cx="190.5" cy="124.5" r="6.5" stroke="white" stroke-width="4" />
                  <circle cx="200" cy="93" r="10" stroke="white" stroke-width="6" />
                  <circle cx="115" cy="51" r="10" stroke="white" stroke-width="6" />
                  <circle cx="15" cy="68" r="15" fill="white" />
                  <circle cx="75" cy="25" r="15" fill="white" />
                  <circle cx="163" cy="38" r="15" fill="white" />
                  <circle cx="101" cy="90" r="15" fill="white" />
                  <circle cx="156" cy="131" r="15" fill="white" />
              </svg>
              </a
          >
      </div>
      <div
          class="flex font-semibold text-2xl items-center px-2 absolute_center"
      >
      </div>
  </div>
  </div>`;
  }

  function bindEventListener() {
    const PROGRESS_BAR = document.getElementById(`progressBar`);

    ALL_NEEDED_MODEL_RESOURCES[MODEL_NAME].resources.map((resource) => {
      const elementId = getElementId4Resource(resource);

      const inputElement = document.getElementById(`uploadInput4${elementId}`);
      if (inputElement) {
        inputElement.addEventListener("change", async function (event) {
          const files = event.target.files;
          if (!files.length) {
            return;
          }

          const cache = await caches.open(DEFAULT_CACHE_STORAGE_NAME);

          for (const file of files) {
            const reader = new FileReader();

            reader.onprogress = function (progressEvent) {
              if (progressEvent.lengthComputable) {
                const loaded = progressEvent.loaded;
                const total = progressEvent.total;
                // show the progress bar
                removeHiddenClass(PROGRESS_BAR);

                PROGRESS_BAR.innerHTML = `
                    <div class="relative px-2 z-20" id="StatusText"></div>
                    <div class="relative px-2 z-20">
                      <span id="ProgressVal">0%</span>
                    </div>
                    <div
                      id="ProgressBar"
                      class="absolute top-0 rounded-lg z-10 text-right bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    ></div>
                 `;

                const statusText = document.getElementById(`StatusText`);
                // show the progress of downloading
                const progressEle = document.getElementById(`ProgressBar`);
                // show the progress value
                const progressValEle = document.getElementById(`ProgressVal`);

                let progress = (loaded / total) * 100;
                statusText.textContent = `Uploading model ...`;

                if (!progressEle.style.height) {
                  progressEle.style.height = "30px";
                }
                progressEle.style.width = `${progress}%`;
                progressValEle.textContent = `${formatBytes(
                  loaded
                )}/${formatBytes(total)}`;
              }
            };

            reader.onload = async function (fileEvent) {
              const arrayBuffer = fileEvent.target.result;
              const blob = new Blob([arrayBuffer]);
              const fileExt =
                file.name.split(".").length > 0 ? file.name.split(".")[1] : "";
              const contentType =
                fileExt === "json"
                  ? "text/plain; charset=utf-8"
                  : "binary/octet-stream";
              const response = new Response(blob, {
                headers: {
                  "Content-Length": blob.size.toString(),
                  "Accept-Ranges": "bytes",
                  "Content-Type": contentType
                }
              });
              // construct the url for this cached resource.
              const cacheKey = LOCAL_REQUEST_PREFIX + resource;
              const cacheResponse = await cache.match(cacheKey);
              if (!cacheResponse) {
                cache
                  .put(cacheKey, response)
                  .then(() => {
                    console.log(`cache ${resource} successfully.`);
                    scanCacheStorage();
                  })
                  .catch((error) => {
                    console.error(`cache ${resource} failed:`, error);
                  });
              }

              if (!PROGRESS_BAR.classList.contains("hidden")) {
                PROGRESS_BAR.classList.add("hidden");
              }
            };

            reader.readAsArrayBuffer(file);
          }
        });
      }
    });
  }

  useEffect(() => {
    const LOAD_MODELS_LOCALLY_BUTTON = document.getElementById(
      "loadModelLocallyBtn"
    );
    const LOAD_MODELS_POPOVER = document.getElementById("modelPopover");
    const MODEL_PANEL_WRAPPER = document.getElementById("modelPanelWrapper");

    setupNavigBar("../..");

    constructLoadModelsPanel(MODEL_NAME, MODEL_PANEL_WRAPPER);

    initModelsPanelHandler(LOAD_MODELS_LOCALLY_BUTTON, LOAD_MODELS_POPOVER);

    // bind event listener for loading models
    bindEventListener();

    scanCacheStorage();
  }, []);

  useEffect(() => {
    resizeInput();
  }, [input]);

  function onInterrupt() {
    // NOTE: We do not set isRunning to false here because the worker
    // will send a 'complete' message when it is done.
    worker.current.postMessage({ type: "interrupt" });
  }

  function resizeInput() {
    if (!textareaRef.current) return;

    const target = textareaRef.current;
    target.style.height = "auto";
    const newHeight = Math.min(Math.max(target.scrollHeight, 24), 200);
    target.style.height = `${newHeight}px`;
  }

  // We use the `useEffect` hook to setup the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module"
      });
    }

    // Create a callback function for dialogMessages from the worker thread.
    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case "loading":
          // Model file start load: add a new progress item to the list.
          setStatus("loading");
          setLoadingMessage(e.data.data);
          break;

        case "initiate":
          setProgressItems((prev) => [...prev, e.data]);
          break;

        case "progress":
          // Model file progress: update one of the progress items.
          setProgressItems((prev) =>
            prev.map((item) => {
              if (item.file === e.data.file) {
                return { ...item, ...e.data };
              }
              return item;
            })
          );
          break;

        case "done": {
          // update the model status
          const statusBarElement = document.getElementById(
            `${e.data.file.split(".")[0].split("/")[1]}-${e.data.file.split(".")[1]}StatusBar`
          );
          if (statusBarElement) {
            changeClass4StatusBar("loaded", statusBarElement);
            statusBarElement.textContent = "loaded";
          }

          setProgressItems((prev) =>
            prev.filter((item) => item.file !== e.data.file)
          );
          break;
        }

        case "compiling": {
          setStatus("compiling");
          setLoadingMessage(e.data.data);
          break;
        }

        case "ready":
          // Pipeline ready: the worker is ready to accept dialogMessages.
          setStatus("ready");
          break;

        case "start":
          {
            // Model file loaded: remove the progress item from the list.
            // hide the `sampleInfoPanel` after loading all info
            const SAMPLE_INFO_PANEL_ELEMENT =
              document.getElementById("sampleInfoPanel");
            if (!SAMPLE_INFO_PANEL_ELEMENT.classList.contains("hidden")) {
              SAMPLE_INFO_PANEL_ELEMENT.classList.add("hidden");
            }
            // Start generation
            setDialogMessages((prev) => [
              // This?
              ...prev,
              { role: "assistant", content: "" }
            ]);
          }
          break;

        case "update":
          {
            // Generation update: update the output text.
            // Parse dialogMessages
            const { output, tps, numTokens } = e.data;
            setTps(tps);
            setNumTokens(numTokens);
            setDialogMessages((prev) => {
              const cloned = [...prev];
              const last = cloned.at(-1);
              cloned[cloned.length - 1] = {
                ...last,
                content: last.content + output
              };
              return cloned;
            });
          }
          break;

        case "complete":
          // Generation complete: re-enable the "Generate" button
          setIsRunning(false);
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => {
      worker.current.removeEventListener("message", onMessageReceived);
    };
  }, []);

  // Send the dialogMessages to the worker thread whenever the `dialogMessages` state changes.
  useEffect(() => {
    if (dialogMessages.filter((x) => x.role === "user").length === 0) {
      // No user dialogMessages yet: do nothing.
      return;
    }
    if (dialogMessages.at(-1).role === "assistant") {
      // Do not update if the last message is from the assistant
      return;
    }
    setTps(null);
    worker.current.postMessage({ type: "generate", data: dialogMessages });
  }, [dialogMessages, isRunning]);

  useEffect(() => {
    if (!chatContainerRef.current) return;
    if (isRunning) {
      const element = chatContainerRef.current;
      if (
        element.scrollHeight - element.scrollTop - element.clientHeight <
        STICKY_SCROLL_THRESHOLD
      ) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }, [dialogMessages, isRunning]);

  return IS_WEBGPU_AVAILABLE ? (
    <div className="flex flex-col h-screen mx-auto items justify-end text-gray-200 dark:text-gray-200 dark:bg-gray-900">
      <div id="naviBar" className="sticky top-0 z-50"></div>

      <div
        id="sampleInfoPanel"
        className="h-full overflow-auto scrollbar-thin flex  items-center flex-col relative 2xl:mt-10 mt-2"
      >
        <div className="flex flex-col items-center mb-1 text-center">
          <img
            src={logoImg}
            width="100%"
            height="auto"
            className="2xl:block max-w-[250px] hidden"
          ></img>
          <h1 className="text-4xl font-bold 2xl:mb-1">Phi-3 WebGPU</h1>
          <h2 className="font-semibold hidden 2xl:block">
            A private and powerful AI chatbot that runs locally in your browser.
          </h2>

          <div className="grid grid-rows">
            <div className="text-nowrap justify-self-center flex gap-2 2xl:gap-4 items-center text-stone-100 max-w-100 rounded-2xl backdrop-blur-xl px-2 font-mono 2xl:mt-10 mt-4">
              <div className="text-md text-stone-50 font-semibold">
                Models Status
              </div>

              <div className="flex flex-wrap items-center gap-2 2xl:gap-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-l-md bg-stone-600 px-2 py-1 text-stone-50 ring-1 ring-inset ring-stone-500/10">
                    model_q4.onnx
                  </span>

                  <span
                    id="model_q4-onnxStatusBar"
                    className="rounded-r-md bg-neutral-400 min-h-[32px] min-w-[68px] px-2 py-1 text-stone-50 ring-1 ring-inset ring-stone-500/10"
                  >
                    unload
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="rounded-l-md bg-stone-600 px-2 py-1 text-stone-50 ring-1 ring-inset ring-stone-500/10">
                    model_q4.onnx_data
                  </span>

                  <span
                    id="model_q4-onnx_dataStatusBar"
                    className="rounded-r-md bg-neutral-400 min-h-[32px] min-w-[68px] px-2 py-1 text-stone-50 ring-1 ring-inset ring-stone-500/10"
                  >
                    unload
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {status === null && dialogMessages.length === 0 && (
          <div className="flex 2xl:mt-20 mt-4 items-center flex-col relative">
            <div className="flex flex-col items-center px-4">
              <p className="max-w-[514px] mb-4 text-sm 2xl:text-base">
                <br />
                You are about to load{" "}
                <a
                  href="https://huggingface.co/Xenova/Phi-3-mini-4k-instruct"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline text-amber-300 dark:text-amber-200"
                >
                  Phi-3-mini-4k-instruct
                </a>
                , a 3.82 billion parameter LLM that is optimized for inference
                on the web. Once downloaded, the model (2.3&nbsp;GB) will be
                cached and reused when you revisit the page.
                <br />
                <template className="hidden 2xl:block">
                  <br />
                  Everything runs directly in your browser using{" "}
                  <a
                    href="https://huggingface.co/docs/transformers.js"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    🤗&nbsp;Transformers.js
                  </a>{" "}
                  and ONNX Runtime Web, meaning your conversations aren&#39;t
                  sent to a server. You can even disconnect from the internet
                  after the model has loaded!
                </template>
              </p>

              <div className="w-full flex justify-between 2xl:mt-20 mt-4">
                <div className="relative">
                  <button
                    id="loadModelLocallyBtn"
                    className="w-[180px] cursor-pointer control-entry transition ease-in-out bg-stone-500/70 hover:-translate-y-1 hover:translate-x-0 hover:bg-stone-500 duration-200 text-stone-50 2xl:text-base text-sm font-semibold p-2 rounded-md disabled:bg-blue-100 disabled:cursor-not-allowed select-none"
                    disabled={status !== null}
                  >
                    <span title="load models from your local file system">
                      {" "}
                      Load Model Locally
                    </span>
                  </button>
                  <div
                    id="modelPopover"
                    className="transition-all ease-in-out delay-300 -z-50 opacity-0 absolute -top-[40px] left-[160px] backdrop-blur-xl"
                  >
                    <div
                      id="modelPanelWrapper"
                      className="w-screen max-w-[280px] flex flex-col overflow-hidden rounded-2xl bg-stone-50/30 p-2"
                    ></div>
                  </div>
                </div>
                <div>
                  <button
                    id="loadModelBtn"
                    className="w-[100px] 2xl:w-[120px] cursor-pointer control-entry transition ease-in-out bg-blue-500 hover:-translate-y-1 hover:translate-x-0 hover:bg-indigo-500 duration-200 text-stone-50 2xl:text-base text-sm font-semibold p-2 rounded-md disabled:bg-blue-100 disabled:cursor-not-allowed select-none"
                    onClick={() => {
                      worker.current.postMessage({ type: "load" });
                      setStatus("loading");
                    }}
                    disabled={status !== null}
                  >
                    Load model
                  </button>
                </div>
              </div>

              <div
                id="progressBar"
                className="relative hidden rounded-lg w-[514px] min-h-[30px] bg-stone-200/40 flex items-center justify-between font-mono mt-4"
              ></div>
            </div>
          </div>
        )}
      </div>
      {(status === "loading" || status === "compiling") && (
        <>
          <div className="w-full max-w-[500px] text-left mx-auto p-4 bottom-0 mt-auto">
            <div className="relative mb-8">
              {" "}
              <div className="w-auto px-2 py-1 2xl:px-4 2xl:px-4 items-center mb-1 rounded-md bg-stone-50/60 2xl:text-base text-sm font-semibold text-stone-700 absolute_center">
                {loadingMessage}
              </div>
            </div>

            {progressItems.map(({ file, progress, total }, i) => (
              <Progress
                key={i}
                text={file}
                percentage={progress}
                total={total}
              />
            ))}
          </div>
        </>
      )}
      {status === "ready" && (
        <div
          ref={chatContainerRef}
          className="overflow-y-auto scrollbar-thin w-full flex flex-col items-center h-full"
        >
          <Chat messages={[...historyMessages, ...dialogMessages]} />
          <p className="text-center text-sm min-h-6 text-stone-300 dark:text-gray-300">
            {tps && dialogMessages.length > 0 && (
              <>
                {!isRunning && (
                  <span>
                    Generated {numTokens} tokens in{" "}
                    {(numTokens / tps).toFixed(2)} seconds&nbsp;&#40;
                  </span>
                )}
                {
                  <>
                    <span className="font-medium text-center mr-1 text-sky-500 dark:text-white">
                      {tps.toFixed(2)}
                    </span>
                    <span className="text-stone-300 dark:text-gray-300">
                      tokens/second
                    </span>
                  </>
                }
                {!isRunning && (
                  <>
                    <span className="mr-1">&#41;.</span>
                    <span
                      className="underline cursor-pointer text-amber-300"
                      onClick={() => {
                        worker.current.postMessage({ type: "reset" });
                        setDialogMessages([]);
                      }}
                    >
                      Reset
                    </span>
                  </>
                )}
              </>
            )}
          </p>
        </div>
      )}
      <div className="mt-2 border dark:bg-gray-700 rounded-lg w-[600px] max-w-[80%] max-h-[200px] mx-auto relative mb-3 flex">
        <textarea
          ref={textareaRef}
          className="scrollbar-thin w-[550px] dark:bg-gray-700 px-3 py-4 rounded-lg bg-transparent border-none outline-none text-stone-200 disabled:text-gray-400 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 disabled:placeholder-gray-200 resize-none disabled:cursor-not-allowed"
          placeholder="Type your message..."
          type="text"
          rows={1}
          value={input}
          disabled={status !== "ready"}
          title={status === "ready" ? "Model is ready" : "Model not loaded yet"}
          onKeyDown={(e) => {
            if (
              input.length > 0 &&
              !isRunning &&
              e.key === "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault(); // Prevent default behavior of Enter key
              onEnter(input);
            }
          }}
          onInput={(e) => setInput(e.target.value)}
        />
        {isRunning ? (
          <div className="cursor-pointer" onClick={onInterrupt}>
            <StopIcon className="h-8 w-8 p-1 rounded-md text-stone-200 dark:text-gray-100 absolute right-3 bottom-3" />
          </div>
        ) : input.length > 0 ? (
          <div className="cursor-pointer" onClick={() => onEnter(input)}>
            <ArrowRightIcon
              className={`h-8 w-8 p-1 bg-stone-50/60 dark:bg-gray-100 text-white dark:text-black rounded-md absolute right-3 bottom-3`}
            />
          </div>
        ) : (
          <div>
            <ArrowRightIcon
              className={`h-8 w-8 p-1 bg-stone-50/60 dark:bg-gray-600 text-gray-50 dark:text-stone-200 rounded-md absolute right-3 bottom-3`}
            />
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 text-center mb-3">
        Disclaimer: Generated content may be inaccurate or false.
      </p>
    </div>
  ) : (
    <div className="fixed w-screen h-screen bg-black z-10 bg-opacity-[92%] text-white text-2xl font-semibold flex justify-center items-center text-center">
      WebGPU is not supported
      <br />
      by this browser :&#40;
    </div>
  );
}

export default App;
