import { useSelector } from "react-redux";
import { selectApps } from "../redux/slices/appSlice";
import useResizable from "./useResizable";

export const useAppWindow = (appName) => {
  const { width, height, x, y } = useSelector(selectApps)[appName];
  const handleMouseDown = useResizable(appName, width, height, x, y);

  return { width, height, x, y, handleMouseDown };
};
