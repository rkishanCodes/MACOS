import React, { useState, useEffect } from "react";
import icon1 from "../../../assets/icon1.png";
import battery from "../../../assets/battery.png";
import on from "../../../assets/on.png";
import off from "../../../assets/off.png";
import { useSelector } from "react-redux";
import { useCapitalizeFirstLetter } from "../../../hooks/useCapitalizeFirstLetter";

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const activeAppName = useSelector((state) => state.apps.activeApp);
  const capitalizeFirstLetter = useCapitalizeFirstLetter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDateTime.replace(/,/g, "");
  };

  const menuItems = [
    "Apple",
    capitalizeFirstLetter(activeAppName),
    "File",
    "Edit",
    "Go",
    "Window",
    "Help",
  ];

  const handleMenuClick = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
      setIsMenuActive(false);
    } else {
      setActiveMenu(menu);
      setIsMenuActive(true);
    }
  };

  const handleMenuHover = (menu) => {
    if (isMenuActive) {
      setActiveMenu(menu);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-item")) {
        setActiveMenu(null);
        setIsMenuActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderMenuContent = (item) => {
    return (
      <ul className="w-full h-full px-1 py-2 border-[1px] border-white/30 rounded-[8px] text-[1vw]">
        <li className="flex items-center justify-between py-[2px] hover:bg-hover-finder-bg-blue px-2 hover:rounded-md">
          <span>New Window</span>
          <span>⌘N</span>
        </li>
        <li className="flex items-center justify-between py-[2px] hover:bg-hover-finder-bg-blue px-2 hover:rounded-md">
          <span>Open</span>
          <span>⌘O</span>
        </li>
        <li className="flex items-center justify-between py-[2px] hover:bg-hover-finder-bg-blue px-2 hover:rounded-md">
          <span>Get Info</span>
          <span>⌘I</span>
        </li>
        <li className="flex items-center justify-between py-[2px] hover:bg-hover-finder-bg-blue px-2 hover:rounded-md">
          <span>Copy</span>
          <span>⌘C</span>
        </li>
        <li className="flex items-center justify-between py-[2px] hover:bg-hover-finder-bg-blue px-2 hover:rounded-md">
          <span>Paste</span>
          <span>⌘V</span>
        </li>
        <li className="flex items-center justify-between py-[2px] hover:bg-hover-finder-bg-blue px-2 hover:rounded-md">
          <span>Print</span>
          <span>⌘P</span>
        </li>
        <li className="flex items-center justify-between py-[2px] hover:bg-hover-finder-bg-blue px-2 hover:rounded-md">
          <span>Close Window</span>
          <span>⌘W</span>
        </li>
      </ul>
    );
  };

  return (
    <div className="w-screen h-6 flex justify-between bg-[linear-gradient(-45deg,#6793ff,#d85e81)] backdrop-blur-sm">
      <div className="flex gap-4 text-white justify-center items-center">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative menu-item w-[3vw] "
            onClick={() => handleMenuClick(item)}
            onMouseEnter={() => handleMenuHover(item)}
          >
            {item === "Apple" ? (
              <img
                src={icon1}
                alt=""
                className={`w-[1.15rem] h-[1.15rem] ml-4 ${
                  activeMenu === item ? "bg-black/30 rounded" : ""
                }`}
              />
            ) : (
              <h6
                className={`text-[80%] font-[500] cursor-default px-1 py-1 rounded ${
                  activeMenu === item ? "bg-black/30" : ""
                }`}
              >
                {item}
              </h6>
            )}
            {activeMenu === item && (
              <div className="bg-black/30 h-auto w-[15vw] absolute top-6 border-[1px] border-black rounded-[8px]">
                {renderMenuContent(item)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 items-center ">
        <div className="flex flex-col gap-0">
          <img src={off} alt="" className="h-4 w-[1.15rem]" />
          <img src={on} alt="" className="h-4 w-[1.15rem] mt-[-38%]" />
        </div>
        <h6 className="text-[1vw] font-[200] text-white mr-4 max-lg:text-[1.25vw] max-md:text-[1.75vw] max-xs:text-[3vw]">
          {formatDateTime(currentTime)}
        </h6>
      </div>
    </div>
  );
};

export default MenuBar;
