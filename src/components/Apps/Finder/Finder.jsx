import React from "react";
import { useSelector } from "react-redux";
import { selectApps } from "../../../redux/slices/appSlice";
import useResizable from "../../../hooks/useResizable";

const Finder = React.memo(() => {
  const { width, height } = useSelector(selectApps).finder;
  const handleMouseDown = useResizable("finder", width, height);

  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="bg-white relative"
    >
      Finder
      {/* Resize handles */}
      <div
        onMouseDown={(e) => handleMouseDown(e, "right")}
        className="absolute right-0 top-0 w-4 h-full bg-transparent cursor-ew-resize"
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "bottom")}
        className="absolute bottom-0 left-0 w-full h-4 bg-transparent cursor-ns-resize"
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
        className="absolute bottom-0 right-0 w-4 h-4 bg-transparent cursor-se-resize"
      />
    </div>
  );
});

export default Finder;
