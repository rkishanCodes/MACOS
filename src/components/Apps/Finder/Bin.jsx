import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setBinContent } from "../../../redux/slices/binSlice";
import SideBar from "./SideBar";
import HeaderFinder from "./HeaderFinder";
import Content from "./Content";
import MenuActions from "../MenuActions";
import ResizableWindow from "../ResizableWindow";
import { setSelectedItem } from "../../../redux/slices/finderSlice";

const Bin = () => {
  const dispatch = useDispatch();
  const { selectedItem, selectedTag, folders } = useSelector(
    (state) => state.finder
  );
  const { binContent } = useSelector((state) => state.bin);
  const [currentPath, setCurrentPath] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);

  useEffect(() => {
    const fetchedBinContent = [
      {
        name: "Deleted File 1",
        type: "file",
        created: "2023-09-15T10:00:00Z",
        size: 1024,
      },
      {
        name: "Deleted Folder",
        type: "folder",
        created: "2023-09-14T15:30:00Z",
        size: 0,
        children: [],
      },
      {
        name: "Deleted File 2",
        type: "file",
        created: "2023-09-13T09:45:00Z",
        size: 2048,
      },
    ];
    dispatch(setBinContent(fetchedBinContent));
    dispatch(setSelectedItem("Bin"));
  }, [dispatch]);

  const handleFolderClick = (folderName) => {
    setCurrentPath([...currentPath, folderName]);
    setForwardStack([]);
  };

  const handleGoBack = () => {
    if (currentPath.length > 0) {
      const newPath = currentPath.slice(0, -1);
      setForwardStack([currentPath[currentPath.length - 1], ...forwardStack]);
      setCurrentPath(newPath);
    }
  };

  const handleGoForward = () => {
    if (forwardStack.length > 0) {
      const [nextFolder, ...remainingForward] = forwardStack;
      setCurrentPath([...currentPath, nextFolder]);
      setForwardStack(remainingForward);
    }
  };

  const getCurrentFolder = () => {
    if (selectedTag) {
      return Object.values(folders)
        .flat()
        .filter((item) => item.tag === selectedTag);
    }
    if (selectedItem === "Bin") {
      return binContent;
    }
    let currentFolder = folders[selectedItem];
    for (const folderName of currentPath) {
      currentFolder =
        currentFolder.find((f) => f.name === folderName && f.type === "folder")
          ?.children || [];
    }
    return currentFolder;
  };

  return (
    <ResizableWindow appName="bin">
      <MenuActions appName="bin" />
      <div className="w-full h-full rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white cursor-default">
        <div className="flex w-full h-full ">
          <SideBar />
          <div className="flex-1">
            <HeaderFinder
              selectedItem={selectedItem || selectedTag}
              currentPath={currentPath}
              onGoBack={handleGoBack}
              onGoForward={handleGoForward}
              canGoForward={forwardStack.length > 0}
            />
            <Content
              selectedItem={selectedItem || selectedTag}
              folders={getCurrentFolder()}
              onFolderClick={handleFolderClick}
              currentPath={currentPath}
              isBin={selectedItem === "Bin"}
            />
          </div>
        </div>
      </div>
    </ResizableWindow>
  );
};

export default Bin;
