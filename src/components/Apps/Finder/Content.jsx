import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addFolder,
  removeFolder,
  updateFolder,
} from "../../../redux/slices/finderSlice";
import {
  addToBin,
  removeFromBin,
  restoreFromBin,
} from "../../../redux/slices/binSlice";
import folderIcon from "../../../assets/finder/folder.webp";
import fileIcon from "../../../assets/finder/documents.png";


const Content = ({
  selectedItem,
  folders,
  onFolderClick,
  currentPath,
  isBin = false,
}) => {
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const [newFolderCount, setNewFolderCount] = useState(1);
  const [renameItem, setRenameItem] = useState(null);
  const [newName, setNewName] = useState("");
  const contentRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (renameItem && inputRef.current) {
      inputRef.current.focus();
    }
  }, [renameItem]);

  const handleContentContextMenu = (event) => {
    event.preventDefault();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const parentRect = contentRef.current.getBoundingClientRect();
    const x = mouseX - parentRect.left;
    const y = mouseY - parentRect.top;
    setContextMenu({
      type: "content",
      x: x,
      y: y,
    });
  };

  const handleItemContextMenu = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const parentRect = contentRef.current.getBoundingClientRect();
    const x = mouseX - parentRect.left;
    const y = mouseY - parentRect.top;
    setContextMenu({
      type: "item",
      x: x,
      y: y,
      item: item,
    });
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

  const handleMoveToBin = (item) => {
    dispatch(
      addToBin({
        ...item,
        originalPath: [selectedItem, ...currentPath],
      })
    );
    dispatch(removeFolder({ path: [selectedItem, ...currentPath, item.name] }));
    setContextMenu(null);
  };

  const handleRestoreFromBin = (item) => {
    dispatch(restoreFromBin(item));
    setContextMenu(null);
  };

  const handleDeletePermanently = (item) => {
    dispatch(removeFromBin(item.name));
    setContextMenu(null);
  };


  const handleRename = () => {
    if (renameItem && newName.trim() !== renameItem.name) {
      dispatch(
        updateFolder({
          path: [selectedItem, ...currentPath, renameItem.name],
          updates: { name: newName.trim() },
        })
      );
    }
    setRenameItem(null);
    setNewName(""); // Clear the new name after renaming
    setContextMenu(null);
  };

  const handleAddToTag = (item, tag) => {
    dispatch(
      updateFolder({
        path: [selectedItem, ...currentPath, item.name],
        updates: { tag },
      })
    );
    setContextMenu(null);
  };

  const renderContentContextMenu = () => (
    <div
      className="absolute bg-white/5 border border-white/40 rounded shadow-lg"
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
        outline: "1px solid black",
      }}
    >
      <ul>
        <li
          className="px-4 py-2 hover:bg-hover-bg-blue cursor-pointer text-[0.85rem]"
          onClick={handleNewFolder}
        >
          New Folder
        </li>
      </ul>
    </div>
  );

  const renderItemContextMenu = () => (
    <div
      className="absolute bg-white/5 border border-white/40 rounded shadow-lg"
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
        outline: "1px solid black",
      }}
    >
      <ul>
        {isBin && (
          <>
            <li
              className="px-4 py-2 hover:bg-hover-bg-blue cursor-pointer text-[0.85rem]"
              onClick={() => handleRestoreFromBin(contextMenu.item)}
            >
              Restore
            </li>
            <li
              className="px-4 py-2 hover:bg-hover-bg-blue cursor-pointer text-[0.85rem]"
              onClick={() => handleDeletePermanently(contextMenu.item)}
            >
              Delete Permanently
            </li>
          </>
        )}
      </ul>

      {!isBin && (
        <ul>
          <>
            {" "}
            <li
              className="px-4 py-2 hover:bg-hover-bg-blue cursor-pointer text-[0.85rem]"
              onClick={() => handleMoveToBin(contextMenu.item)}
            >
              Move to Bin
            </li>
            <li
              className="px-4 py-2 hover:bg-hover-bg-blue cursor-pointer text-[0.85rem]"
              onClick={() => {
                setRenameItem(contextMenu.item);
                setNewName(contextMenu.item.name); 
              }}
            >
              Rename
            </li>
            <li className="px-4 py-2 hover:bg-hover-bg-blue cursor-pointer text-[0.85rem]">
              Add to Tags
              <ul>
                {["Red", "Orange", "Yellow", "Green", "Blue", "Purple"].map(
                  (tag) => (
                    <li
                      key={tag}
                      className="px-4 py-1 hover:bg-hover-bg-blue cursor-pointer text-[0.8rem]"
                      onClick={() => handleAddToTag(contextMenu.item, tag)}
                    >
                      {tag}
                    </li>
                  )
                )}
              </ul>
            </li>
          </>
        </ul>
      )}
    </div>
  );

  return (
    <div
      className="w-full h-[calc(100%-3rem)] bg-finder-body-dark rounded-br-[10px] relative"
      onContextMenu={handleContentContextMenu}
      ref={contentRef}
    >
      {selectedItem && (
        <div className="w-full h-full p-4 overflow-auto">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
            {folders.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
                onDoubleClick={() =>
                  item.type === "folder" && onFolderClick(item.name)
                }
                onContextMenu={(e) => handleItemContextMenu(e, item)}
              >
                <img
                  src={item.type === "folder" ? folderIcon : fileIcon}
                  alt=""
                  className="w-18 h-14"
                />
                <span className="text-center text-sm mt-2 w-full truncate">
                  {renameItem && renameItem.name === item.name ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={handleRename}
                      ref={inputRef}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRename();
                        }
                      }}
                      autoFocus
                      className="w-16 bg-blue-500 text-white px-2 py-1 rounded-md outline-none"
                    />
                  ) : (
                    item.name
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {contextMenu &&
        contextMenu.type === "content" &&
        renderContentContextMenu()}
      {contextMenu && contextMenu.type === "item" && renderItemContextMenu()}
    </div>
  );
};

export default Content;
