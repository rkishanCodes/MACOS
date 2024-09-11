import React, { useCallback, useRef, useState } from "react";
import exitIcon from "../../assets/exit.png";
import minimizeIcon from "../../assets/minimize.png";
import fullScreenIcon from "../../assets/fullscreen.png";
import { useDispatch } from "react-redux";
import { minimizeApp, toggleAppState } from "../../redux/slices/appSlice";
import { updateMaxSize } from "../../redux/slices/appSlice";

const MenuActions = ({ appName }) => {
  const [showIcons, setShowIcons] = useState(false);
  const iconAreaRef = useRef(null);
  const dispatch = useDispatch();

  const handleMouseMove = useCallback((e) => {
    if (iconAreaRef.current) {
      const rect = iconAreaRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setShowIcons(true);
      } else {
        setShowIcons(false);
      }
    }
  }, []);

  return (
    <div
      className="absolute flex gap-2 mx-4 mt-4"
      ref={iconAreaRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowIcons(false)}
    >
      <span
        className="h-[0.875rem] w-[0.875rem] bg-red-700 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgb(237, 106, 94)" }}
        onClick={() => {
          dispatch(toggleAppState({ app: appName, field: "active" }));
        }}
      >
        {showIcons && (
          <img src={exitIcon} alt="exit" className="scale-[1.75]" />
        )}
      </span>
      <span
        className="h-[0.875rem] w-[0.875rem] bg-yellow-700 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgb(245, 191, 79)" }}
        onClick={() => {
          dispatch(minimizeApp({ app: appName })); // Dispatch minimize action
          
        }}
      >
        {showIcons && (
          <img src={minimizeIcon} alt="minimize" className="scale-[1.75]" />
        )}
      </span>
      <span
        className="h-[0.875rem] w-[0.875rem] bg-green-700 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgb(97, 194, 83)" }}
        onClick={() => {
          dispatch(updateMaxSize({ app: appName }));
        }}
      >
        {showIcons && (
          <img
            src={fullScreenIcon}
            alt="fullscreen"
            className="scale-[1.675]"
          />
        )}
      </span>
    </div>
  );
};

export default MenuActions;
