import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFolder } from "../../../redux/slices/finderSlice";
import folderIcon from "../../../assets/finder/folderIcon.svg";
import fileIcon from "../../../assets/finder/documents.png";

const Content = ({ selectedItem, folders, onFolderClick, currentPath }) => {
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const [newFolderCount, setNewFolderCount] = useState(1);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            x: event.clientX,
            y: event.clientY,
          }
        : null
    );
  };

  const handleNewFolder = () => {
    const newFolderName = `Untitled Folder${
      newFolderCount > 1 ? ` ${newFolderCount}` : ""
    }`;
    dispatch(
      addFolder({
        path: [selectedItem, ...currentPath],
        folder: {
          name: newFolderName,
          children: [],
          created: new Date().toISOString(),
          size: 0,
          type: "folder",
        },
      })
    );
    setNewFolderCount(newFolderCount + 1);
    setContextMenu(null);
  };

  const handleInfo = () => {
    // Implement info functionality here
    console.log("Info clicked");
    setContextMenu(null);
  };

  return (
    <div
      className="w-full h-[calc(100%-3rem)] bg-finder-body-dark rounded-br-[10px]"
      onContextMenu={handleContextMenu}
    >
      {selectedItem && (
        <div className="w-full h-full p-4 overflow-auto">
          <div className="grid grid-cols-5 gap-4">
            {folders.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center border-2"
                onDoubleClick={() =>
                  item.type === "folder" && onFolderClick(item.name)
                }
              >
                {" "}
                {console.log(item)}
                <img
                  src={item.type === "folder" ? folderIcon : fileIcon}
                  alt=""
                  className="w-14 h-14"
                />
                <span className="text-center text-sm mt-2 w-full truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {contextMenu && (
        <div
          className="absolute bg-gray-800 border border-gray-700 rounded shadow-lg"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleNewFolder}
            >
              New Folder
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleInfo}
            >
              Info
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Content;
