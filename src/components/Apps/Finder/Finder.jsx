import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedItem } from "../../../redux/slices/finderSlice";
import SideBar from "./SideBar";
import HeaderFinder from "./HeaderFinder";
import Content from "./Content";
import { selectApps } from "../../../redux/slices/appSlice";
import MenuActions from "../MenuActions";
import ResizableWindow from "../ResizableWindow";

const Finder = () => {
  const dispatch = useDispatch();
  const { selectedItem, folders } = useSelector((state) => state.finder);
  const apps = useSelector(selectApps);
  const [currentPath, setCurrentPath] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);

  const handleSetSelectedItem = (item) => {
    dispatch(setSelectedItem(item));
    setCurrentPath([]);
    setForwardStack([]);
  };

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
    let currentFolder = folders[selectedItem];
    for (const folderName of currentPath) {
      currentFolder =
        currentFolder.find((f) => f.name === folderName && f.type === "folder")
          ?.children || [];
    }
    return currentFolder;
  };

  if (apps["finder"]["minimize"]) {
    return null;
  }

  return (
    <ResizableWindow appName="finder">
      <MenuActions appName="finder" />
      <div className="w-full h-full rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white cursor-default">
        <div className="flex w-full h-full ">
          <SideBar
            setSelectedItem={handleSetSelectedItem}
            selectedItem={selectedItem}
          />
          <div className="flex-1">
            <HeaderFinder
              selectedItem={selectedItem}
              currentPath={currentPath}
              onGoBack={handleGoBack}
              onGoForward={handleGoForward}
              canGoForward={forwardStack.length > 0}
            />
            <Content
              selectedItem={selectedItem}
              folders={getCurrentFolder()}
              onFolderClick={handleFolderClick}
              currentPath={currentPath}
            />
          </div>
        </div>
      </div>
    </ResizableWindow>
  );
};

export default Finder;
