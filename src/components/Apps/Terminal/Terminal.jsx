import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import { selectApps } from "../../../redux/slices/appSlice";
import { addFolder, removeFolder } from "../../../redux/slices/finderSlice";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState(["Desktop"]);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const apps = useSelector(selectApps);
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
    const [cmd, ...args] = command.split(" ");
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
        return currentDirectory.join("/");
      case "help":
        return "Available commands: cd, ls, touch, mkdir, rm, pwd, help, clear";
      case "clear":
        setHistory([]);
        return "";
      default:
        return `Command not found: ${cmd}`;
    }
  };

  // const changeDirectory = (dir) => {
  //   if (!dir || dir === ".") return "Current directory unchanged";
  //   if (dir === "..") {
  //     if (currentDirectory.length > 1) {
  //       setCurrentDirectory(currentDirectory.slice(0, -1));
  //       return `Changed to ${currentDirectory.slice(0, -1).join("/")}`;
  //     }
  //     return "Already at root directory";
  //   }

  //   let currentFolder = folders;
  //   for (const folder of currentDirectory) {
  //     currentFolder = currentFolder[folder] || [];
  //   }

  //   const targetFolder = currentFolder.find(
  //     (f) => f.name === dir && f.type === "folder"
  //   );
  //   if (targetFolder) {
  //     setCurrentDirectory([...currentDirectory, dir]);
  //     return `Changed to ${[...currentDirectory, dir].join("/")}`;
  //   }
  //   return `Directory not found: ${dir}`;
  // };





















// const changeDirectory = (dir) => {
//   if (!dir || dir === ".") return "Current directory unchanged";

//   // Move up a directory
//   if (dir === "..") {
//     if (currentDirectory.length > 1) {
//       // Remove the last folder from the current directory path
//       const newDirectory = currentDirectory.slice(0, -1);
//       setCurrentDirectory(newDirectory);
//       return `Changed to ${newDirectory.join("/")}`;
//     }
//     return "Already at root directory";
//   }

//   // Access current folder from the Redux folder structure
//   let currentFolder = folders;
//   for (const folder of currentDirectory) {
//     currentFolder =
//       currentFolder.find((f) => f.name === folder)?.children || [];
//   }

//   // Check if the target folder exists
//   const targetFolder = currentFolder.find(
//     (f) => f.name === dir && f.type === "folder"
//   );

//   if (targetFolder) {
//     // Update the current directory
//     const newDirectory = [...currentDirectory, dir];
//     setCurrentDirectory(newDirectory);
//     return `Changed to ${newDirectory.join("/")}`;
//   }

//   return `Directory not found: ${dir}`;
// };





  
  
  const listDirectory = () => {
    let currentFolder = folders;
    for (const folder of currentDirectory) {
      currentFolder = currentFolder[folder] || [];
    }
    return currentFolder
      .map((item) => `${item.type === "folder" ? "d" : "-"} ${item.name}`)
      .join("\n");
  };

  const createFile = (filename) => {
    if (!filename) return "Please provide a filename";
    dispatch(
      addFolder({
        path: currentDirectory,
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
    dispatch(
      addFolder({
        path: currentDirectory,
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
    dispatch(
      removeFolder({
        path: [...currentDirectory, filename],
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

  if (apps["terminal"]["minimize"]) {
    return null;
  }

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
          <span className="mr-2">{`${currentDirectory.join("/")}>`}</span>
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
