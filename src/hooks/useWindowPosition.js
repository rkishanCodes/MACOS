import { useSelector, useDispatch } from "react-redux";
import { selectApps, updatePosition } from "../redux/slices/appSlice";

const useWindowPosition = (appName) => {
  const dispatch = useDispatch();
  const app = useSelector(selectApps)[appName];
  const { x, y } = app;

  const setPosition = (newX, newY) => {
    dispatch(updatePosition({ app: appName, x: newX, y: newY }));
  };

  return { x, y, setPosition};
};

export default useWindowPosition;
