import React, { useState } from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import { selectApps } from "../../../redux/slices/appSlice";
import { useSelector } from "react-redux";

const Safari = () => {
  const [url, setUrl] = useState("https://www.example.com");
  const [inputUrl, setInputUrl] = useState(url);
    const apps = useSelector(selectApps);


  const handleNavigate = () => {
    setUrl(inputUrl);
  };
//  if (apps["safari"]["minimize"]) {
//    return null;
//  }
  return (
    <ResizableWindow appName="safari">
      <MenuActions appName="safari" />
      <div className="w-full h-full bg-white rounded-[10px]">
        <div className="flex items-center p-2 bg-gray-200">
          <button className="mr-2">◁</button>
          <button className="mr-2">▷</button>
          <button className="mr-2">⨉</button>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleNavigate();
            }}
            className="flex-1 p-1 border border-gray-300 rounded"
          />
          <button
            onClick={handleNavigate}
            className="ml-2 bg-blue-500 text-white p-1 rounded"
          >
            Go
          </button>
        </div>
        <iframe
          src={url}
          title="Safari"
          className="w-full h-full border-none"
        />
      </div>
    </ResizableWindow>
  );
};

export default Safari;
