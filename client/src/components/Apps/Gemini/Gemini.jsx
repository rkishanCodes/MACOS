import React, { useState } from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import geminiIcon from "../../../assets/Apps/Gemini.svg";
import userIcon from "../../../assets/geminiUser.svg";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useSelector } from "react-redux";

const Gemini = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInitial, setShowInitial] = useState(true);
  const isMobile = useSelector((state) => state.apps.isMobile);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const placeHolderContent = `Ask Gemini ${isMobile ? "" : "anything..."}`;

  const backendUrl = import.meta.env.VITE_GEMINI_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    if (showInitial) setShowInitial(false);

    const newHistory = [...history, { type: "user", content: input }];
    setHistory(newHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/gemini`, {
        message: input,
      });
      setHistory([
        ...newHistory,
        { type: "gemini", content: response.data.content },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setHistory([
        ...newHistory,
        {
          type: "error",
          content: "An error occurred while processing your request.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <ResizableWindow appName="gemini">
      <MenuActions appName="gemini" />
      <div className="w-full h-full bg-gray-900 text-white font-mono p-4 overflow-hidden flex flex-col rounded-[10px] pt-[10%]">
        {showInitial && (
          <div>
            <div className="flex items-center mb-4">
              <img
                src={geminiIcon}
                alt="Gemini Logo"
                className="w-8 h-8 mr-2"
              />
              <h6
                className="text-[2rem] font-semibold"
                style={{
                  position: "relative",
                  color: "transparent",
                  background:
                    "linear-gradient(90deg, #1e90ff, #ff69b4, #ffa500)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Hello
              </h6>
            </div>
            {!isMobile && (
              <h6 className="text-[2rem] font-extrabold text-zinc-600">
                How can I help you today?
              </h6>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto mb-4">
          {history.map((item, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${
                item.type === "user"
                  ? "text-wh2"
                  : item.type === "error"
                  ? "text-red-400"
                  : "text-white"
              }`}
            >
              <img
                src={item.type === "user" ? userIcon : geminiIcon}
                alt={item.type === "user" ? "User Icon" : "Gemini Icon"}
                className="w-6 h-6 mr-2 mt-1"
              />
              <div className="flex-1">
                {item.type === "user" ? (
                  <p>{item.content}</p>
                ) : (
                  <ReactMarkdown
                    className="gemini-response"
                    components={{
                      p: ({ node, ...props }) => (
                        <p className="mb-2" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-4 mb-2" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-4 mb-2" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                      h1: ({ node, ...props }) => (
                        <h1 className="text-xl font-bold mb-2" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-lg font-bold mb-2" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-base font-bold mb-2" {...props} />
                      ),
                      code: ({ node, inline, ...props }) =>
                        inline ? (
                          <code
                            className="bg-gray-800 px-1 rounded"
                            {...props}
                          />
                        ) : (
                          <pre className="bg-gray-800 p-2 rounded mb-2 overflow-x-auto">
                            <code {...props} />
                          </pre>
                        ),
                    }}
                  >
                    {item.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <>
              <motion.div
                className="relative flex items-center justify-center left-[-45%] mb-2 "
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <img src={geminiIcon} alt="Gemini Logo" className="w-8 h-8" />
              </motion.div>
              <motion.div
                className="relative w-full h-3.5 bg-gradient-to-r from-blue-500 to-black rounded-md mb-1.5"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                className="relative w-full h-3.5 bg-gradient-to-r from-black to-blue-500 rounded-md mb-1.5"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                className="relative w-full h-3.5 bg-gradient-to-r from-blue-500 to-black rounded-md mb-1.5"
                initial={{ width: "0%" }}
                animate={{ width: "60%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-1 bg-transparent outline-none text-white"
            placeholder={placeHolderContent}
            autoFocus
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </ResizableWindow>
  );
};

export default Gemini;
