// ResizableWindow.js
import React, { useCallback, useEffect, useRef } from "react";
import { useAppWindow } from "../../hooks/useAppWindow";
import useWindowPosition from "../../hooks/useWindowPosition";

const ResizableWindow = ({ appName, children }) => {
  const { width, height, handleMouseDown } = useAppWindow(appName);
  const { x, y, setPosition } = useWindowPosition(appName);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleDragStart = useCallback(
    (e) => {
      isDragging.current = true;
      dragOffset.current = { x: e.clientX - x, y: e.clientY - y };
    },
    [x, y]
  );

  const handleDrag = useCallback(
    (e) => {
      if (isDragging.current) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        setPosition(newX, newY);
      }
    },
    [setPosition]
  );

  const handleDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleDrag(e);
    };

    const handleGlobalMouseUp = () => {
      handleDragEnd();
    };

    if (isDragging.current) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [handleDrag, handleDragEnd]);

  return (
    <div className="relative">
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: `${x}px`,
          top: `${y}px`,
        }}
        className={"bg-white absolute  "}
      >
        <div className="absolute flex gap-2 mx-3 mt-3">
          <span className="h-[0.875rem] w-[0.875rem] bg-red-700 rounded-full">
      
          </span>
          <span className="h-[0.875rem] w-[0.875rem] bg-red-700 rounded-full">
          </span>
          <span className="h-[0.875rem] w-[0.875rem] bg-red-700 rounded-full">
          </span>
        </div>
        <div
          className="bg-transparent h-8  w-[100%] absolute"
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        ></div>
        <div className="overflow-hidden h-[calc(100%-2rem)]">{children}</div>

        {/* Resize handles for all sides */}
        <div
          onMouseDown={(e) => handleMouseDown(e, "right")}
          className="absolute right-0 top-0 w-1 h-full  cursor-ew-resize"
        />
        <div
          onMouseDown={(e) => handleMouseDown(e, "left")}
          className="absolute left-0 top-0 w-1 h-full  cursor-ew-resize"
        />
        <div
          onMouseDown={(e) => handleMouseDown(e, "bottom")}
          className="absolute bottom-0 left-0 w-full h-1  cursor-ns-resize"
        />
        <div
          onMouseDown={(e) => handleMouseDown(e, "top")}
          className="absolute top-0 left-0 w-full h-1  cursor-ns-resize"
        />
        {/* Resize handles for all corners */}
        <div
          onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
          className="absolute bottom-0 right-0 w-1 h-1  cursor-se-resize"
        />
        <div
          onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
          className="absolute bottom-0 left-0 w-1 h-1  cursor-sw-resize"
        />
        <div
          onMouseDown={(e) => handleMouseDown(e, "top-right")}
          className="absolute top-0 right-0 w-1 h-1  cursor-ne-resize"
        />
        <div
          onMouseDown={(e) => handleMouseDown(e, "top-left")}
          className="absolute top-0 left-0 w-1 h-1  cursor-nw-resize"
        />
      </div>
    </div>
  );
};

export default ResizableWindow;
