import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCapitalizeFirstLetter } from "../../../hooks/useCapitalizeFirstLetter";
import {
  toggleAppState,
  updateMaxSize,
  minimizeApp,
} from "../../../redux/slices/appSlice";
import {
  setHello,
  setBoot,
  setLock,
  setDesktop,
  setAudio,
} from "../../../redux/slices/bootSlice";
import icon1 from "../../../assets/icon1.png";
import on from "../../../assets/on.png";
import off from "../../../assets/off.png";
import ControlCentre from "./ControlCentre";

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [showControlCentre, setShowControlCentre] = useState(false);
  const controlCentreRef = useRef(null);
  const toggleRef = useRef(null); // New ref for toggle

  const activeAppName = useSelector((state) => state.apps.activeApp);
  const activeAppState = useSelector((state) => state.apps[activeAppName]);
  const isMobile = useSelector((state) => state.apps.isMobile);
  const capitalizeFirstLetter = useCapitalizeFirstLetter();
  const dispatch = useDispatch();

  // Update current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle clicks outside the ControlCentre and toggle to close it
  const handleClickOutside = useCallback((event) => {
    if (
      controlCentreRef.current &&
      !controlCentreRef.current.contains(event.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target)
    ) {
      setShowControlCentre(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Format date and time
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

  // Handle system restart
  const handleRestart = useCallback(() => {
    dispatch(setHello(true));
    dispatch(setBoot(false));
    dispatch(setLock(false));
    dispatch(setDesktop(false));
    dispatch(setAudio(false));
  }, [dispatch]);

  // Toggle ControlCentre visibility
  const handleControlCentreToggle = useCallback(() => {
    setShowControlCentre((prev) => !prev);
  }, [showControlCentre]);

  // Define menu item content
  const menuItemContent = {
    Window: [
      {
        name: "Minimize",
        cmd: "⌘M",
        action: () => dispatch(minimizeApp({ app: activeAppName })),
      },
      {
        name: activeAppState.fullScreen
          ? "Exit Full Screen"
          : "Enter Full Screen",
        cmd: "⌃⌘F",
        action: () => dispatch(updateMaxSize({ app: activeAppName })),
      },
    ],
    Help: [
      {
        name: "Report an issue",
        cmd: " ",
        action: () => console.log("Report an issue"),
      },
    ],
    File: [
      {
        name: "New Window",
        cmd: "⌘N",
        action: () => console.log("New Window"),
      },
    ],
    Edit: [
      { name: "Undo", cmd: "⌘Z", action: () => document.execCommand("undo") },
      { name: "Redo", cmd: "⇧⌘Z", action: () => document.execCommand("redo") },
      { name: "Cut", cmd: "⌘X", action: () => document.execCommand("cut") },
      { name: "Copy", cmd: "⌘C", action: () => document.execCommand("copy") },
      { name: "Paste", cmd: "⌘V", action: () => document.execCommand("paste") },
    ],
    Apple: [
      {
        name: "About this Mac",
        cmd: " ",
        action: () => console.log("About this Mac"),
      },
      { name: "Settings...", cmd: " ", action: () => console.log("Settings") },
      { name: "Restart", cmd: " ", action: handleRestart },
    ],
    App: [
      {
        name: `About ${capitalizeFirstLetter(activeAppName)}`,
        cmd: " ",
        action: () => console.log(`About ${activeAppName}`),
      },
      {
        name: "Settings...",
        cmd: " ",
        action: () => console.log("App Settings"),
      },
      {
        name: `Quit ${capitalizeFirstLetter(activeAppName)}`,
        cmd: "⌘Q",
        action: () =>
          dispatch(toggleAppState({ app: activeAppName, field: "active" })),
      },
    ],
  };

  // Define which menu items to show based on device type
  const menuItems = isMobile
    ? ["Apple", capitalizeFirstLetter(activeAppName)]
    : [
        "Apple",
        capitalizeFirstLetter(activeAppName),
        "File",
        "Edit",
        "Window",
        "Help",
      ];

  // Handle menu item click
  const handleMenuClick = useCallback(
    (menu) => {
      setActiveMenu((prev) => (prev === menu ? null : menu));
      setIsMenuActive((prev) => (prev ? prev === menu : false));
    },
    [activeMenu]
  );

  // Handle menu item hover
  const handleMenuHover = useCallback(
    (menu) => {
      if (isMenuActive && !isMobile) {
        setActiveMenu(menu);
      }
    },
    [isMenuActive, isMobile]
  );

  // Render menu content
  const renderMenuContent = (item) => {
    const content = menuItemContent[item] || menuItemContent["App"];
    return (
      <ul className="w-full h-full px-1 py-2 border-[1px] border-white/30 rounded-[8px] text-[0.85rem]">
        {content.map((menuItem, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-[2px] hover:bg-hover-finder-bg-blue px-2 hover:rounded-md cursor-pointer"
            onClick={menuItem.action}
          >
            <span>{menuItem.name}</span>
            <span>{menuItem.cmd}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-screen h-6 flex justify-between bg-[linear-gradient(-45deg,#6793ff,#d85e81)] backdrop-blur-sm">
      {/* Left Side Menu Items */}
      <div className="flex gap-4 text-white justify-center items-center">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="relative menu-item"
            onClick={() => handleMenuClick(item)}
            onMouseEnter={() => handleMenuHover(item)}
          >
            {item === "Apple" ? (
              <img
                src={icon1}
                alt="Apple Icon"
                className={`w-[1.15rem] h-[1.15rem] ml-4 ${
                  activeMenu === item ? "bg-black/30 rounded" : ""
                }`}
              />
            ) : (
              <h6
                className={`text-[0.85rem] font-[500] cursor-default px-1 py-1 rounded ${
                  activeMenu === item ? "bg-black/30" : ""
                }`}
              >
                {item}
              </h6>
            )}
            {activeMenu === item && !isMobile && (
              <div className="bg-black/30 w-40 absolute top-full mt-1 border border-black rounded-lg">
                {renderMenuContent(item)}
              </div>
            )}
            {activeMenu === item && isMobile && (
              <div className="bg-black/30 w-40 absolute top-full mt-1 border border-black rounded-lg">
                {renderMenuContent(item)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Side: Control Centre Toggle and Time */}
      <div className="flex gap-4 items-center">
        {!isMobile && (
          <div
            ref={toggleRef} // Assign the toggle ref
            className="flex flex-col gap-0 cursor-pointer"
            onClick={handleControlCentreToggle}
          >
            <img src={off} alt="Control Off" className="h-4 w-[1.15rem]" />
            <img
              src={on}
              alt="Control On"
              className="h-4 w-[1.15rem] mt-[-38%]"
            />
          </div>
        )}
        <h6 className="text-[0.95rem] font-[200] text-white mr-4 max-lg:text-[0.95rem] max-md:text-[0.95rem] max-xs:text-[0.75rem]">
          {formatDateTime(currentTime)}
        </h6>
      </div>

      {/* Control Centre */}
      {showControlCentre && (
        <div
          ref={controlCentreRef}
          className="absolute top-[20px] right-[-20px] z-50"
        >
          <ControlCentre />
        </div>
      )}
    </div>
  );
};

export default MenuBar;