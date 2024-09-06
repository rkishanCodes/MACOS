import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { openApp } from "../../redux/slices/appSlice";
import MenuBar from "./MenuBar";
import Finder from "../../Apps/Finder/Finder";
import Safari from "../../Apps/Safari/Safari";
import Terminal from "../../Apps/Terminal/Terminal";
import Calculator from "../../Apps/Calculator/Calculator";
import Bin from "../../Apps/Bin/Bin";
import Dock from "./Dock";
import { selectApps } from "../../../redux/slices/appSlice";

const Desktop = () => {
  const dispatch = useDispatch();
  const apps = useSelector(selectApps);

  return (
    <div className="h-screen w-screen bg-[url('./assets/macos-sonoma-morning.jpg')] bg-cover bg-center bg-no-repeat relative">
      <MenuBar />
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <Dock />
      </div>

      {/* Conditionally render apps based on their 'active' state */}
      {apps.finder.active && <Finder />}
      {apps.safari.active && <Safari />}
      {apps.terminal.active && <Terminal />}
      {apps.calculator.active && <Calculator />}
      {apps.bin.active && <Bin />}
    </div>
  );
};

export default Desktop;
