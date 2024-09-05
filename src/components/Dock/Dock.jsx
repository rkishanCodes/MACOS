import * as React from "react";
import { animated, useSpringValue } from "@react-spring/web";
import { clamp } from "@react-spring/shared";

import { useWindowResize } from "../../hooks/useWindowResize";
import { DockContext } from "./DockContext";
import styles from "./styles.module.css";

// Define the zoom limits for the dock
export const DOCK_ZOOM_LIMIT = [-100, 50];

// Dock component
export const Dock = ({ children }) => {
  // State to track if the dock is hovered
  const [hovered, setHovered] = React.useState(false);
  // State to store the width of the dock
  const [width, setWidth] = React.useState(0);
  // Ref to track if zooming is happening
  const isZooming = React.useRef(false);
  // Ref for the dock element
  const dockRef = React.useRef(null);

  // Function to set zooming state and update hover state
  const setIsZooming = React.useCallback((value) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  // Spring value for zoom level
  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      if (dockRef.current) {
        setWidth(dockRef.current.clientWidth);
      }
    },
  });

  // Update dock width on window resize
  useWindowResize(() => {
    if (dockRef.current) {
      setWidth(dockRef.current.clientWidth);
    }
  });

  return (
    <DockContext.Provider value={{ hovered, setIsZooming, width, zoomLevel }}>
      <animated.div
        ref={dockRef}
        className={styles.dock}
        onMouseOver={() => {
          if (!isZooming.current) {
            setHovered(true);
          }
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
        style={{
          x: "-50%",
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to((value) => clamp(0.5, 2, value)),
        }}
      >
        {children}
      </animated.div>
    </DockContext.Provider>
  );
};
