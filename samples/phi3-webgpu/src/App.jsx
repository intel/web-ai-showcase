import { useEffect, useState, useRef } from "react";

import Chat from "./components/Chat";
import ArrowRightIcon from "./components/icons/ArrowRightIcon";
import StopIcon from "./components/icons/StopIcon";
import Progress from "./components/Progress";

import logoImg from "/assets/logo.png";

const IS_WEBGPU_AVAILABLE = !!navigator.gpu;
const STICKY_SCROLL_THRESHOLD = 120;

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

        case "done":
          // Model file loaded: remove the progress item from the list.
          setProgressItems((prev) =>
            prev.filter((item) => item.file !== e.data.file)
          );
          break;

        case "ready":
          // Pipeline ready: the worker is ready to accept dialogMessages.
          setStatus("ready");
          break;

        case "start":
          {
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
      {status === null && dialogMessages.length === 0 && (
        <div className="h-full overflow-auto scrollbar-thin flex justify-center items-center flex-col relative">
          <div className="flex flex-col items-center mb-1 max-w-[250px] text-center">
            <img
              src={logoImg}
              width="100%"
              height="auto"
              className="block"
            ></img>
            <h1 className="text-4xl font-bold mb-1">Phi-3 WebGPU</h1>
            <h2 className="font-semibold hidden 2xl:block">
              A private and powerful AI chatbot that runs locally in your
              browser.
            </h2>
          </div>

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
              , a 3.82 billion parameter LLM that is optimized for inference on
              the web. Once downloaded, the model (2.3&nbsp;GB) will be cached
              and reused when you revisit the page.
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
                and ONNX Runtime Web, meaning your conversations aren&#39;t sent
                to a server. You can even disconnect from the internet after the
                model has loaded!
              </template>
            </p>

            <button
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
      )}
      {status === "loading" && (
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
