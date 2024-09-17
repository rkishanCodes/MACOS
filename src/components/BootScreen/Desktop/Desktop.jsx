import React from "react";
import { useSelector } from "react-redux";
import MenuBar from "./MenuBar";
import Finder from "../../Apps/Finder/Finder";
import Bin from "../../Apps/Finder/Bin";
import Safari from "../../Apps/Safari/Safari";
import Terminal from "../../Apps/Terminal/Terminal";
import Calculator from "../../Apps/Calculator/Calculator";
import About from "../../Apps/About/About";
import Dock from "./Dock";
import { selectApps } from "../../../redux/slices/appSlice";
import Gemini from "../../Apps/ChatGpt/Gemini";

const Desktop = () => {
  const apps = useSelector(selectApps);

  return (
    <div className="h-screen w-screen bg-[url('./assets/macos-sonoma-morning.jpg')] bg-cover bg-center bg-no-repeat relative">
      <MenuBar />
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <Dock />
      </div>

      {apps.finder.active && <Finder />}
      {apps.safari.active && <Safari />}
      {apps.terminal.active && <Terminal />}
      {apps.calculator.active && <Calculator />}
      {apps.bin.active && <Bin />}
      {apps.about.active && <About />}
      {apps.gemini.active && <Gemini />}
    </div>
  );
};

export default Desktop;
