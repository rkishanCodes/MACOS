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
import Gemini from "../../Apps/Gemini/Gemini";
import ControlCentre from "./ControlCentre";

const Desktop = () => {
  const apps = useSelector(selectApps);
  const activeApp = useSelector((state) => state.apps.activeApp);

  const appComponents = [
    { name: "finder", component: <Finder key="finder" /> },
    { name: "safari", component: <Safari key="safari" /> },
    { name: "terminal", component: <Terminal key="terminal" /> },
    { name: "calculator", component: <Calculator key="calculator" /> },
    { name: "bin", component: <Bin key="bin" /> },
    { name: "about", component: <About key="about" /> },
    { name: "gemini", component: <Gemini key="gemini" /> },
  ];

  const sortedApps = appComponents.sort((a, b) => {
    if (a.name === activeApp) return 1;
    if (b.name === activeApp) return -1;
    return apps[b.name].active - apps[a.name].active;
  });

  return (
    <div className="h-screen w-screen bg-[url('./assets/macos-sonoma-morning.jpg')] bg-cover bg-center bg-no-repeat relative">
      <MenuBar />
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <Dock />
      </div>


      {sortedApps.map(({ name, component }) => apps[name].active && component)}
    </div>
  );
};

export default Desktop;
