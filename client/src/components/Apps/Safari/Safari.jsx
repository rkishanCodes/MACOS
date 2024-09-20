import React, { useState } from "react";

import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import ContentSafari from "./ContentSafari";
import HeaderSafari from "./HeaderSafari";

const Safari = () => {
  // const [tabs, setTabs] = useState([
  //   { id: 1, url: "https://www.apple.com", title: "Apple" },
  // ]);
  // const [activeTab, setActiveTab] = useState(1);
  // const [inputUrl, setInputUrl] = useState("https://www.apple.com");

  // const addTab = () => {
  //   const newTab = {
  //     id: Date.now(),
  //     url: "https://www.apple.com",
  //     title: "New Tab",
  //   };
  //   setTabs([...tabs, newTab]);
  //   setActiveTab(newTab.id);
  //   setInputUrl("https://www.apple.com");
  // };

  // const removeTab = (id) => {
  //   const newTabs = tabs.filter((tab) => tab.id !== id);
  //   setTabs(newTabs);
  //   if (activeTab === id && newTabs.length > 0) {
  //     setActiveTab(newTabs[newTabs.length - 1].id);
  //     setInputUrl(newTabs[newTabs.length - 1].url);
  //   }
  // };

  // const changeTab = (id) => {
  //   setActiveTab(id);
  //   const tab = tabs.find((tab) => tab.id === id);
  //   setInputUrl(tab.url);
  // };

  // const handleUrlChange = (e) => {
  //   setInputUrl(e.target.value);
  // };

  // const handleUrlSubmit = (e) => {
  //   e.preventDefault();
  //   const updatedTabs = tabs.map((tab) =>
  //     tab.id === activeTab ? { ...tab, url: inputUrl, title: inputUrl } : tab
  //   );
  //   setTabs(updatedTabs);
  // };

  return (
    <ResizableWindow appName="safari">
      <MenuActions appName="safari" />
      <div className="w-full h-full rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white cursor-default">
        <div className="w-full h-full flex flex-col">
          <HeaderSafari />
          <ContentSafari />
        </div>
      </div>
    </ResizableWindow>
  );
};

export default Safari;
