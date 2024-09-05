import { createContext, useContext } from "react";
import { SpringValue } from "@react-spring/web";

// Create a context with a default value
export const DockContext = createContext({
  width: 0,
  hovered: false,
  setIsZooming: () => {},
});

// Custom hook to use the DockContext
export const useDock = () => {
  return useContext(DockContext);
};
