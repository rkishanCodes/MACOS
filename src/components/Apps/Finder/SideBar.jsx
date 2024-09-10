import React from "react";

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

const SideBar = ({ setSelectedItem, selectedItem }) => {
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

  return (
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
                      section.name === "Favourites" ? "w-6 h-6" : "w-3.5 h-3.5"
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
  );
};

export default SideBar;
