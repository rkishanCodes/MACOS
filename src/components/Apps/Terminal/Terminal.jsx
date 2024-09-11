import React from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import { selectApps } from "../../../redux/slices/appSlice";
import { useSelector } from "react-redux";

const Terminal = React.memo(() => {
  const apps = useSelector(selectApps);
  if (apps["terminal"]["minimize"]) {
    return null;
  }

  return (
    <ResizableWindow appName="terminal">
      <MenuActions appName="terminal" />
      Terminal
    </ResizableWindow>
  );
});

export default Terminal;
