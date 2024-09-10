import React, { useState } from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import SideBar from "./SideBar";
import { memo } from "react";
import HeaderFinder from "./HeaderFinder";
import Content from "./Content";

const Finder = memo(() => {
  const [selectedItem, setSelectedItem] = useState("Recents");

  return (
    <ResizableWindow appName="finder">
      <MenuActions appName="finder" />
      <div className="w-full h-full rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white cursor-default">
        <div className="flex w-full h-full">
          <SideBar
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
          />
          <div className="flex-1">
            <HeaderFinder selectedItem={selectedItem} />
            <Content selectedItem={selectedItem} />
          </div>
        </div>
      </div>
    </ResizableWindow>
  );
});

export default Finder;
