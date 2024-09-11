import React from "react";
import ResizableWindow from "../ResizableWindow";
import { selectApps } from "../../../redux/slices/appSlice";
import { useSelector } from "react-redux";
import MenuActions from "../MenuActions";

const Safari = React.memo(() => {
   const apps = useSelector(selectApps);
   if (apps["safari"]["minimize"]) {
     return null;
   }
  return (
    <ResizableWindow appName="safari">
      <MenuActions appName="safari" />
      Safari
    </ResizableWindow>
  );
});

export default Safari;
