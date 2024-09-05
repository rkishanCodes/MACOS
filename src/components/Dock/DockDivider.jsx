import React from "react";
import { useGesture } from "@use-gesture/react";

import { useDock } from "./DockContext";
import { DOCK_ZOOM_LIMIT } from "./Dock";

import "./styles.css";

export const DockDivider = () => {
  const { zoomLevel, setIsZooming } = useDock();

 const bind = useGesture(
   {
     onDrag: ({ down, offset: [ox, oy], cancel, direction: [, dy] }) => {
       console.log("Dragging", { ox, oy, direction });
       if (oy <= DOCK_ZOOM_LIMIT[0] && dy === -1) {
         cancel();
       } else if (oy >= DOCK_ZOOM_LIMIT[1] && dy === 1) {
         cancel();
       } else if (zoomLevel) {
         zoomLevel.set(1 + oy / 100);
       }
     },
     onDragStart: () => {
       console.log("Drag started");
       setIsZooming(true);
     },
     onDragEnd: () => {
       console.log("Drag ended");
       setIsZooming(false);
     },
   },
   {
     drag: {
       axis: "y",
     },
   }
 );
  if (!zoomLevel) {
    return null;
  }

  return (
    <div className="divider__container" {...bind()}>
      <span className="divider"></span>
    </div>
  );
};
