import React from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import { useState, memo } from "react";

import recentsIcon from "../../../assets/finder/recents.png";
import downloadsIcon from "../../../assets/finder/downloads.png";
import desktopIcon from "../../../assets/finder/desktop.png";
import documentsIcon from "../../../assets/finder/documents.png";
import applicationsIcon from "../../../assets/finder/applications.png";

import redIcon from "../../../assets/finder/red.png";
import greenIcon from "../../../assets/finder/green.png";
import yellowIcon from "../../../assets/finder/yellow.png";
import purpleIcon from "../../../assets/finder/purple.png";
import blueIcon from "../../../assets/finder/blue.png";
import orangeIcon from "../../../assets/finder/orange.png";

const iconMapping = {
  Recents: recentsIcon,
  Applications: applicationsIcon,
  Desktop: desktopIcon,
  Downloads: downloadsIcon,
  Documents: documentsIcon,
  Red: redIcon,
  Orange: orangeIcon,
  Yellow: yellowIcon,
  Green: greenIcon,
  Blue: blueIcon,
  Purple: purpleIcon,
};

const Finder = memo(() => {
  const [selectedItem, setSelectedItem] = useState("Recents");
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const sidebarItems = [
    {
      name: "Favourites",
      items: ["Recents", "Applications", "Documents", "Desktop", "Downloads"],
    },
    {
      name: "Tags",
      items: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
    },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const handleOptionClick = (option) => {
    console.log(`${option} clicked for ${selectedItem}`);
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <ResizableWindow appName="finder">
      <MenuActions appName="finder" />
      <div className="w-full h-full rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white cursor-default">
        <div className="flex w-full h-full">
          <div className="pt-2 bg-black/60 rounded-tl-[10px] rounded-bl-[10px] h-full w-[150px] border-r-[1px] border-black	">
            {/* Sidebar */}
            <div
              className="h-full overflow-y-auto p-4"
              style={{
                scrollbarWidth: "2rem",
                scrollbarColor: "rgb(177, 176, 172) #888", // Fallback for Firefox
              }}
            >
              <style>
                {`
        /* Scrollbar styles for WebKit-based browsers */
        div::-webkit-scrollbar {
          width: 2rem;
        }

        div::-webkit-scrollbar-thumb {
          background-color: rgb(177, 176, 172);
          border-radius: 10px;
        }

        div::-webkit-scrollbar-track {
          background-color: rgb(177, 176, 172);
        }
      `}
              </style>
              {sidebarItems.map((section) => (
                <div key={section.name} className="mt-5">
                  <h2 className="text-[13px] font-medium text-white/40">
                    {section.name}
                  </h2>
                  <ul>
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className={`flex items-center p-[2px] ${
                          selectedItem === item ? "bg-white/15 rounded-lg" : ""
                        }`}
                        onClick={() => handleItemClick(item)}
                        onContextMenu={(e) => handleContextMenu(e, item)}
                      >
                        <img
                          src={iconMapping[item]}
                          alt={item}
                          className={`mr-2 ${
                            section.name === "Favourites"
                              ? "w-6 h-6"
                              : "w-3.5 h-3.5"
                          }`}
                        />
                        <h6
                          className={
                            "text-[0.95rem] font-thin text-white/90 truncate "
                          }
                        >
                          {item}
                        </h6>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 ">
            <div className="  h-12 border-b-[1px] border-black bg-finder-nav-dark rounded-tr-[10px] flex items-center">
              <h4 className=" ml-6 text-[1.15rem] font-normal text-white/90">
                {selectedItem}
              </h4>
            </div>
            <div className=" w-full h-[calc(100%-3rem)] ">
              {/* Main content area */}
              {selectedItem && (
                <div className="bg-finder-body-dark  shadow  w-full h-full ">
                  <h2 className="text-xl font-bold ">{selectedItem}</h2>
                  <p>Content for {selectedItem} goes here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ResizableWindow>
  );
});

export default Finder;
