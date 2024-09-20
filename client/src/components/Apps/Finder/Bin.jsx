import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import HeaderFinder from "./HeaderFinder";
import Content from "./Content";
import MenuActions from "../MenuActions";
import ResizableWindow from "../ResizableWindow";
import { setSelectedItem } from "../../../redux/slices/finderSlice";

const Bin = () => {
  const dispatch = useDispatch();

  const { binContent } = useSelector((state) => state.bin);
  const [currentPath, setCurrentPath] = useState([]);
  const [forwardStack, setForwardStack] = useState([]);

  useEffect(() => {
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
    return binContent;
  };

  return (
    <ResizableWindow appName="bin">
      <MenuActions appName="bin" />
      <div className="w-full h-full rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white cursor-default">
        <div className="flex w-full h-full ">
          <SideBar />
          <div className="flex-1">
            <HeaderFinder
              selectedItem="Bin"
              currentPath={currentPath}
              onGoBack={handleGoBack}
              onGoForward={handleGoForward}
              canGoForward={forwardStack.length > 0}
            />
            <Content
              selectedItem="Bin"
              folders={getCurrentFolder()}
              onFolderClick={handleFolderClick}
              currentPath={currentPath}
              isBin={true}
            />
          </div>
        </div>
      </div>
    </ResizableWindow>
  );
};

export default Bin;
