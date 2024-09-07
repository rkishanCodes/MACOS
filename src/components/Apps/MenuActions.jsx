import React, { useCallback, useRef, useState } from "react";

import exitIcon from "../../assets/exit.png";
import minimizeIcon from "../../assets/minimize.png";
import fullScreenIcon from "../../assets/fullscreen.png";
import { useDispatch } from "react-redux";
import { toggleAppState } from "../../redux/slices/appSlice";

const MenuActions = ({appName}) => {
  const [showIcons, setShowIcons] = useState(false);
  const iconAreaRef = useRef(null);
  const dispatch = useDispatch();

//   const handleIconClick = useCallback(
//     (action) => {
//       if (isClick.current) {
//         console.log(`Icon clicked: ${action}`);
//         if (action === "exit") {
//           dispatch(toggleAppState({ app: appName, field: "active" }));
//         }
//         // Add other actions for minimize and fullscreen if needed
//       }
//     },
//     [dispatch, appName]
//   );
  const handleMouseMove = (e) => {
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
  };
  return (
    <div
      className="absolute flex gap-2 mx-5 mt-5 border-2"
      ref={iconAreaRef}
      onClick={() => {
        console.log("clicking of div");
      }}
      onMouseMove={handleMouseMove}
    >
      <span
        className="h-[0.875rem] w-[0.875rem] bg-red-700 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgb(237, 106, 94)" }}
        onClick={() => {
          console.log("object");
          dispatch(toggleAppState({ app: appName, field: "active" }));
        }}
      >
        {showIcons && <img src={exitIcon} alt="" className="scale-[1.75]" />}
      </span>
      <span
        className="h-[0.875rem] w-[0.875rem] bg-yellow-700 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgb(245, 191, 79)" }}
      >
        {showIcons && (
          <img src={minimizeIcon} alt="" className="scale-[1.75]" />
        )}
      </span>
      <span
        className="h-[0.875rem] w-[0.875rem] bg-green-700 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgb(97, 194, 83)" }}
      >
        {showIcons && (
          <img src={fullScreenIcon} alt="" className="scale-[1.675]" />
        )}
      </span>
    </div>
  );
};

export default MenuActions;
