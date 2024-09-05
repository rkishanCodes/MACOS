import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const DOCK_ZOOM_LIMIT = [-100, 50];

export const Dock = ({ children }) => {
  // State to track if the dock is being hovered
  const [hovered, setHovered] = useState(false);

  // Ref to the dock element
  const dockRef = useRef(null);

  // Motion value to track mouse X position
  const mouseX = useMotionValue(0);

  // Motion value to track zoom level
  const zoomLevel = useMotionValue(1);

  // Transform zoom level to scale
  const scale = useTransform(
    zoomLevel,
    [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
    [2, 1, 0.5]
  );

  return (
    <motion.div
      ref={dockRef}
      className="dock"
      style={{ scale }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={(e) => {
        // Update mouseX when mouse moves over the dock
        mouseX.set(e.clientX);
      }}
      // Enable vertical dragging for resizing
      drag="y"
      dragConstraints={{ top: DOCK_ZOOM_LIMIT[0], bottom: DOCK_ZOOM_LIMIT[1] }}
      dragElastic={0.1}
      onDrag={(_, info) => {
        // Update zoom level based on drag position
        zoomLevel.set(1 + info.offset.y / 100);
      }}
    >
      {React.Children.map(children, (child) =>
        // Pass mouseX and hovered state to all children
        React.cloneElement(child, { mouseX, hovered })
      )}
    </motion.div>
  );
};
