import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import { addFolder, removeFolder } from "../../../redux/slices/finderSlice";
import { addToBin } from "../../../redux/slices/binSlice";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState(["usr"]);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const { folders } = useSelector((state) => state.finder);
  const dispatch = useDispatch();

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newHistory = [
      ...history,
      { type: "input", content: `${currentDirectory.join("/")}> ${input}` },
    ];
    setHistory(newHistory);
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(-1);

    const output = processCommand(input);
    setHistory([...newHistory, { type: "output", content: output }]);
    setInput("");
  };

  const processCommand = (command) => {
    const [cmd, ...args] = command.trim().split(/\s+/);
    switch (cmd.toLowerCase()) {
      case "cd":
        return changeDirectory(args[0]);
      case "ls":
        return listDirectory();
      case "touch":
        return createFile(args[0]);
      case "mkdir":
        return makeDirectory(args[0]);
      case "rm":
        return removeFile(args[0]);
      case "pwd":
        return "/" + currentDirectory.join("/");
      case "help":
        return "Available commands: cd, ls, touch, mkdir, rm, pwd, help, clear";
      case "clear":
        setHistory([]);
        return "";
      default:
        return `Command not found: ${cmd}`;
    }
  };

  const getCurrentFolder = () => {
    let current = folders.usr;
    for (let i = 1; i < currentDirectory.length; i++) {
      if (Array.isArray(current)) {
        current = current.find(
          (item) => item.name === currentDirectory[i] && item.type === "folder"
        )?.children;
      } else {
        current = current[currentDirectory[i]];
      }
      if (!current) return null;
    }
    return current;
  };

  const changeDirectory = (dir) => {
    if (!dir) return "Please specify a directory";

    let newPath;
    if (dir === "/") {
      newPath = ["usr"];
    } else if (dir === "..") {
      if (currentDirectory.length > 1) {
        newPath = currentDirectory.slice(0, -1);
      } else {
        return "Already at root directory";
      }
    } else if (dir.startsWith("/")) {
      newPath = ["usr", ...dir.split("/").filter(Boolean)];
    } else {
      newPath = [...currentDirectory, ...dir.split("/").filter(Boolean)];
    }

    let current = folders.usr;
    for (let i = 1; i < newPath.length; i++) {
      const folder = newPath[i];
      if (Array.isArray(current)) {
        current = current.find(
          (item) => item.name === folder && item.type === "folder"
        )?.children;
      } else {
        current = current[folder];
      }
      if (!current) return `Directory not found: ${folder}`;
    }

    setCurrentDirectory(newPath);
    return `Changed to /${newPath.join("/")}`;
  };

  const listDirectory = () => {
    const current = getCurrentFolder();
    if (!current) return "Invalid directory";

    if (Array.isArray(current)) {
      return current
        .map((item) => `${item.type === "folder" ? "" : ""} ${item.name}`)
        .join("\n");
    } else {
      return Object.keys(current)
        .map((name) => `${name}`)
        .join("\n");
    }
  };

  const createFile = (filename) => {
    if (!filename) return "Please provide a filename";
    const current = getCurrentFolder();
    if (!current) return "Invalid directory";

    if (Array.isArray(current)) {
      if (current.some((item) => item.name === filename))
        return `File already exists: ${filename}`;
    } else {
      return "Cannot create file in this directory";
    }
    let passDirectory = currentDirectory.slice(1);

    dispatch(
      addFolder({
        path: passDirectory,
        folder: {
          name: filename,
          type: "file",
          size: 0,
          created: new Date().toISOString(),
        },
      })
    );
    return `File created: ${filename}`;
  };

  const makeDirectory = (dirname) => {
    if (!dirname) return "Please provide a directory name";
    const current = getCurrentFolder();
    if (!current) return "Invalid directory";

    if (Array.isArray(current)) {
      if (current.some((item) => item.name === dirname))
        return `Directory already exists: ${dirname}`;
    } else {
      return "Cannot create directory here";
    }

    let passDirectory = currentDirectory.slice(1);

    dispatch(
      addFolder({
        path: passDirectory,
        folder: {
          name: dirname,
          type: "folder",
          children: [],
          size: 0,
          created: new Date().toISOString(),
        },
      })
    );
    return `Directory created: ${dirname}`;
  };

  const removeFile = (filename) => {
    if (!filename) return "Please provide a filename";
    if (
      [
        "Desktop",
        "Documents",
        "Downloads",
        "Applications",
        "Recents",
        "-rf",
      ].includes(filename)
    ) {
      return `Nice try! But I can't let you delete ${
        filename == "-rf" ? "all system files" : `${filename}`
      }. It's like trying to erase your own shadow – entertaining, but ultimately futile.`;
    }
    const current = getCurrentFolder();
    if (!current) return "Invalid directory";


    let itemToRemove;
    if (Array.isArray(current)) {
      itemToRemove = current.find((item) => item.name === filename);
    } else {
      return "Cannot remove items from this directory";
    }

    if (!itemToRemove) return `File or directory not found: ${filename}`;

    let passDirectory = currentDirectory.slice(1);


dispatch(
  addToBin({
    ...itemToRemove,
  })
);
    dispatch(
      removeFolder({
        path: [...passDirectory, filename],
      })
    );

    return `Removed: ${filename}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };


  return (
    <ResizableWindow appName="terminal">
      <MenuActions appName="terminal" />
      <div className="w-full h-full bg-gray-900 text-green-500 font-mono p-4 overflow-hidden flex flex-col rounded-[10px] pt-[10%]">
        <div ref={outputRef} className="flex-1 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className={item.type === "input" ? "text-yellow-500" : ""}
            >
              {item.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex mt-2">
          <span className="mr-2">{`/${currentDirectory.join("/")}>`}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </form>
      </div>
    </ResizableWindow>
  );
};

export default Terminal;
