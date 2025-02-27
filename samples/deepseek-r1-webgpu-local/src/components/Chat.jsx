import { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

import BotIcon from "./icons/BotIcon";
import BrainIcon from "./icons/BrainIcon";
import UserIcon from "./icons/UserIcon";

import { MathJaxContext, MathJax } from "better-react-mathjax";
import "./Chat.css";

function render(text) {
  // Replace all instances of single backslashes before brackets with double backslashes
  // See https://github.com/markedjs/marked/issues/546 for more information.
  text = text.replace(/\\([\[\]\(\)])/g, "\\\\$1");

  const result = DOMPurify.sanitize(
    marked.parse(text, {
      async: false,
      breaks: true
    })
  );
  return result;
}
function Message({ role, content, answerIndex }) {
  const thinking = answerIndex ? content.slice(0, answerIndex) : content;
  const answer = answerIndex ? content.slice(answerIndex) : "";

  const [showThinking, setShowThinking] = useState(false);

  const doneThinking = answer.length > 0;

  return (
    <div className="flex items-start space-x-4">
      {role === "assistant" ? (
        <>
          <BotIcon className="h-6 w-6 min-h-6 min-w-6 my-3 text-gray-500 text-stone-50" />
          <div className="bg-stone-700/30 text-white rounded-lg p-4">
            <div className="min-h-6 text-white overflow-wrap-anywhere">
              {thinking.length > 0 ? (
                <>
                  <div className="bg-stone-700/30 text-white rounded-lg flex flex-col">
                    <button
                      className="flex items-center gap-2 cursor-pointer p-4 hover:bg-transparent rounded-lg "
                      onClick={() => setShowThinking((prev) => !prev)}
                      style={{ width: showThinking ? "100%" : "auto" }}
                    >
                      <BrainIcon
                        className={doneThinking ? "" : "animate-pulse"}
                      />
                      <span>
                        {doneThinking ? "查看思考过程" : "思考中 ..."}
                      </span>
                      <span className="ml-auto text-white">
                        {showThinking ? "▲" : "▼"}
                      </span>
                    </button>
                    {showThinking && (
                      <MathJax
                        className="border-t border-gray-200 dark:border-gray-700 px-4 py-2"
                        dynamic
                      >
                        <span
                          className="markdown"
                          dangerouslySetInnerHTML={{
                            __html: render(thinking)
                          }}
                        />
                      </MathJax>
                    )}
                  </div>
                  {doneThinking && (
                    <MathJax className="mt-2" dynamic>
                      <span
                        className="markdown"
                        dangerouslySetInnerHTML={{
                          __html: render(answer)
                        }}
                      />
                    </MathJax>
                  )}
                </>
              ) : (
                <span className="h-6 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-white-600 dark:bg-white-300 rounded-full animate-pulse"></span>
                  <span className="w-2.5 h-2.5 bg-white-600 dark:bg-white-300 rounded-full animate-pulse animation-delay-200"></span>
                  <span className="w-2.5 h-2.5 bg-white-600 dark:bg-white-300 rounded-full animate-pulse animation-delay-400"></span>
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <UserIcon className="h-6 w-6 min-h-6 min-w-6 my-3 text-white text-stone-50" />
          <div className="bg-stone-700/30 text-white rounded-lg p-4">
            <p className="min-h-6 overflow-wrap-anywhere">{content}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default function Chat({ messages }) {
  const empty = messages.length === 0;

  return (
    <div
      className={`overflow-y-auto scrollbar-thin ${empty ? "flex flex-col items-center justify-end" : "flex-1 p-6 max-w-[1280px] w-full space-y-4"}`}
    >
      <MathJaxContext>
        {messages.map((msg, i) => (
          <Message key={`message-${i}`} {...msg} />
        ))}
      </MathJaxContext>
    </div>
  );
}
