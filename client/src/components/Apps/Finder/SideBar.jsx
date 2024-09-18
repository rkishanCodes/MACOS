import React from "react";
import recentsIcon from "../../../assets/finder/recents.png";
import downloadsIcon from "../../../assets/finder/downloads.png";
import desktopIcon from "../../../assets/finder/desktop.png";
import documentsIcon from "../../../assets/finder/documents.png";
import applicationsIcon from "../../../assets/finder/applications.png";
import binIcon from "../../../assets/finder/bin.png";
import redIcon from "../../../assets/finder/red.png";
import greenIcon from "../../../assets/finder/green.png";
import yellowIcon from "../../../assets/finder/yellow.png";
import purpleIcon from "../../../assets/finder/purple.png";
import blueIcon from "../../../assets/finder/blue.png";
import orangeIcon from "../../../assets/finder/orange.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedItem,
  setSelectedTag,
} from "../../../redux/slices/finderSlice";

const iconMapping = {
  Recents: recentsIcon,
  Applications: applicationsIcon,
  Desktop: desktopIcon,
  Downloads: downloadsIcon,
  Documents: documentsIcon,
  Bin: binIcon,
  Red: redIcon,
  Orange: orangeIcon,
  Yellow: yellowIcon,
  Green: greenIcon,
  Blue: blueIcon,
  Purple: purpleIcon,
};

const SideBar = () => {
  const dispatch = useDispatch();
  const { selectedItem, selectedTag } = useSelector((state) => state.finder);

  const sidebarItems = [
    {
      name: "Favourites",
      items: [
        "Recents",
        "Applications",
        "Documents",
        "Desktop",
        "Downloads",
        "Bin",
      ],
    },
    {
      name: "Tags",
      items: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
    },
  ];

  const handleItemClick = (item) => {
    if (sidebarItems[0].items.includes(item)) {
      dispatch(setSelectedItem(item));
      dispatch(setSelectedTag(null));
    } else {
      dispatch(setSelectedTag(item));
      dispatch(setSelectedItem(null));
    }
  };

  return (
    <div className="pt-2 bg-black/60 rounded-tl-[10px] rounded-bl-[10px] h-full w-[150px] border-r-[1px] border-black">
      <div className="h-full overflow-y-auto p-4">
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
                    selectedItem === item || selectedTag === item
                      ? "bg-white/15 rounded-lg"
                      : ""
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <img
                    src={iconMapping[item]}
                    alt={item}
                    className={`mr-2 ${
                      section.name === "Favourites" ? "w-6 h-6" : "w-3.5 h-3.5"
                    }`}
                  />
                  <h6 className="text-[0.95rem] font-thin text-white/90 truncate">
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
