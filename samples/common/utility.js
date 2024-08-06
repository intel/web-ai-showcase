/*-------------------------------------------------------------------------------------------------
 *  Copyright (C) 2024 Intel Corporation. All rights reserved.
 *  Licensed under the Apache License 2.0. See LICENSE in the project root for license information.
 *  SPDX-License-Identifier: Apache-2.0
 *-----------------------------------------------------------------------------------------------*/

import {
  ALL_NEEDED_MODEL_RESOURCES,
  TRANSFORMER_LOCAL_MODEL_PATH
} from "../../config.js";

import DOMPurify from "dompurify";

export function changeClass4StatusBar(status, targetElement) {
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

export function defineResourcesObject(modelName) {
  let resourcesObject = {};
  for (const resource of ALL_NEEDED_MODEL_RESOURCES[modelName].resources) {
    resourcesObject[resource] = {
      cached: false,
      size: 0
    };
  }
  return resourcesObject;
}

export function getRequestPrefix(modelName) {
  // eslint-disable-next-line no-undef
  return VITE_ENV_USE_REMOTE_MODELS
    ? ALL_NEEDED_MODEL_RESOURCES[modelName].linkPathPrefix
    : TRANSFORMER_LOCAL_MODEL_PATH +
        ALL_NEEDED_MODEL_RESOURCES[modelName].localFolderPathPrefix +
        modelName +
        "/";
}

export function getElementId4Resource(resource) {
  return resource.split(".")[0].indexOf("/") < 0
    ? resource.split(".")[0]
    : `${resource.split(".")[0].split("/")[1]}-${resource.split(".")[1]}`;
}

export function constructLoadModelsPanel(modelName, targetElement) {
  const resourcesPanelHTML = ALL_NEEDED_MODEL_RESOURCES[modelName].resources
    .map((resource) => {
      const elementId = getElementId4Resource(resource);

      const text =
        resource.indexOf("/") > 0 ? resource.split("/")[1] : resource;

      const url =
        ALL_NEEDED_MODEL_RESOURCES[modelName].linkPathPrefix + resource;

      return `  <div
      class="flex 2xl:min-h-[40px] min-h-[30px] bg-stone-200 rounded-md  items-center justify-between gap-2 font-mono p-1 m-1 text-xs 2xl:text-sm"
    >
      <a
        class="text-gray-900 font-semibold text-indigo-600 px-1"
        href="${url}"
        target="_blank"
        >${text}
        <span
          id="${elementId}StatusFlag"
          class="hidden  text-green-600"
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

  const tag = `  <span class="font-semibold p-2 italic text-xs 2xl:text-sm"
    >Required files</span
  >`;

  targetElement.innerHTML = tag + resourcesPanelHTML;
}

export function initModelsPanelHandler(
  loadModelsBtnElement,
  loadModelsPopoverElement
) {
  const showModelPopover = () => {
    if (
      loadModelsPopoverElement.classList.contains("opacity-0") &&
      loadModelsPopoverElement.classList.contains("-z-50") &&
      !loadModelsPopoverElement.classList.contains("z-50")
    ) {
      loadModelsPopoverElement.classList.remove("opacity-0", "-z-50");
      loadModelsPopoverElement.classList.add("z-50");
    }
  };

  const hideModelPopover = () => {
    if (
      !loadModelsPopoverElement.classList.contains("opacity-0") &&
      !loadModelsPopoverElement.classList.contains("-z-50") &&
      loadModelsPopoverElement.classList.contains("z-50")
    ) {
      loadModelsPopoverElement.classList.remove("z-50");
      loadModelsPopoverElement.classList.add("opacity-0", "-z-50");
    }
  };

  loadModelsBtnElement.addEventListener("mouseover", showModelPopover);
  loadModelsBtnElement.addEventListener("mouseout", (event) => {
    if (!loadModelsPopoverElement.contains(event.relatedTarget)) {
      hideModelPopover();
    }
  });

  loadModelsPopoverElement.addEventListener("mouseover", showModelPopover);
  loadModelsPopoverElement.addEventListener("mouseout", hideModelPopover);
}

export function formatBytes(bytes, decimals = 0) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1000)), 10);
  const rounded = (bytes / Math.pow(1000, i)).toFixed(decimals);
  return rounded + " " + sizes[i];
}

export function htmlToElement(html) {
  const domPurityConfig = {
    ADD_ATTR: ["model", "file"] // Keep custom attributes
  };
  // https://stackoverflow.com/a/35385518
  let template = document.createElement("template");
  const cleanHtml = DOMPurify.sanitize(html.trim(), domPurityConfig);
  template.innerHTML = cleanHtml;
  return template.content.firstChild;
}

export function removeHiddenClass(...targetElements) {
  targetElements.forEach((element) => {
    if (
      element &&
      element instanceof HTMLElement &&
      element.classList.contains("hidden")
    ) {
      element.classList.remove("hidden");
    }
  });
}
