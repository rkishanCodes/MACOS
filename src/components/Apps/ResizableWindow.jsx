import React, { useCallback, useEffect, useRef } from "react";
import { useAppWindow } from "../../hooks/useAppWindow";
import useWindowPosition from "../../hooks/useWindowPosition";
import { useDispatch, useSelector } from "react-redux";
import { SetActiveApp, selectApps } from "../../redux/slices/appSlice";

const ResizableWindow = ({ appName, children }) => {
  const dispatch = useDispatch();
  const { width, height, handleMouseDown } = useAppWindow(appName);
  const apps = useSelector(selectApps);
  const activeAppName = useSelector((state) => state.apps.activeApp);

  const { x, y, setPosition } = useWindowPosition(appName);
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Check if the screen is mobile (you can adjust the breakpoint as needed)
  const isMobile = window.innerWidth <= 1024;

  const handleDragStart = useCallback(
    (e) => {
      if (isMobile) return; // Disable dragging on mobile
      isDragging.current = true;
      dragOffset.current = { x: e.clientX - x, y: e.clientY - y };
    },
    [x, y, isMobile]
  );

  const handleDrag = useCallback(
    (e) => {
      if (isMobile) return; // Disable dragging on mobile
      if (isDragging.current) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        setPosition(newX, newY);
      }
    },
    [setPosition, isMobile]
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

  const handleClick = useCallback(
    (e) => {
      if (!isDragging.current && activeAppName !== appName) {
        console.log(`Clicked on ${appName}`);
        dispatch(SetActiveApp({ appName }));
      }
      e.stopPropagation();
    },
    [dispatch, appName, activeAppName]
  );

  const windowStyle = isMobile
    ? {
        width: "50%",
        height: "50%",
        left: "0",
        top: "0",
      }
    : {
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
      };

  return (
    <div
      className={`${apps[appName]["minimize"] ? "hidden" : "relative"} ${
        isMobile ? "fixed inset-0 z-50" : ""
      }`}
      onClick={handleClick}
    >
      <div className={isMobile ? "w-full h-full" : "absolute"}>
        <div
          style={windowStyle}
          className={`bg-transparent ${isMobile ? "relative" : "absolute"}`}
        >
          {/* Drag Area */}
          <div
            className={`bg-transparent h-8 w-full absolute ${
              isMobile ? "cursor-default" : "cursor-move"
            }`}
            onMouseDown={handleDragStart}
            onMouseMove={handleDrag}
            onMouseUp={handleDragEnd}
          ></div>

          {/* Window content */}
          <div
            className="w-full h-full rounded-[10px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]"
            style={{ outline: "1px solid rgb(0 0 0 / 0.75)" }}
          >
            {children}
          </div>

          {/* Resize handles */}
          {!isMobile && (
            <>
              {/* Resize handles for all sides */}
              <div
                onMouseDown={(e) => handleMouseDown(e, "right")}
                className="absolute right-0 top-0 w-1 h-full cursor-ew-resize"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, "left")}
                className="absolute left-0 top-0 w-1 h-full cursor-ew-resize"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, "bottom")}
                className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, "top")}
                className="absolute top-0 left-0 w-full h-1 cursor-ns-resize"
              />

              {/* Resize handles for all corners */}
              <div
                onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
                className="absolute bottom-0 right-0 w-1 h-1 cursor-se-resize"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
                className="absolute bottom-0 left-0 w-1 h-1 cursor-sw-resize"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, "top-right")}
                className="absolute top-0 right-0 w-1 h-1 cursor-ne-resize"
              />
              <div
                onMouseDown={(e) => handleMouseDown(e, "top-left")}
                className="absolute top-0 left-0 w-1 h-1 cursor-nw-resize"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResizableWindow;
