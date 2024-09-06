// ResizableWindow.js
import React from "react";
import { useAppWindow } from "../../hooks/useAppWindow";

const ResizableWindow = ({ appName, children, className }) => {
  const { width, height, x, y, handleMouseDown } = useAppWindow(appName);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
      }}
      className={`bg-white absolute m-10 ${className}`}
    >
      {children}
      {/* Resize handles for all sides */}
      <div
        onMouseDown={(e) => handleMouseDown(e, "right")}
        className="absolute right-0 top-0 w-1 h-full bg-black cursor-ew-resize"
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "left")}
        className="absolute left-0 top-0 w-1 h-full bg-black cursor-ew-resize"
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "bottom")}
        className="absolute bottom-0 left-0 w-full h-1 bg-black cursor-ns-resize"
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "top")}
        className="absolute top-0 left-0 w-full h-1 bg-black cursor-ns-resize"
      />
      {/* Resize handles for all corners */}
      <div
        onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
        className="absolute bottom-0 right-0 w-1 h-1 bg-black cursor-se-resize"
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
        className="absolute bottom-0 left-0 w-1 h-1 bg-black cursor-sw-resize"
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "top-right")}
        className="absolute top-0 right-0 w-1 h-1 bg-black cursor-ne-resize"
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "top-left")}
        className="absolute top-0 left-0 w-1 h-1 bg-black cursor-nw-resize"
      />
    </div>
  );
};

export default ResizableWindow;
