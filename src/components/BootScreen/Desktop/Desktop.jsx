import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import finderIcon from "../../../assets/Apps/finder.svg";
import safariIcon from "../../../assets/Apps/safari.svg";
import terminalIcon from "../../../assets/Apps/terminal.svg";
import calculatorIcon from "../../../assets/Apps/calculator.svg";
import trashEmptyIcon from "../../../assets/Apps/Trash Empty.svg";
import MenuBar from "../../MenuBar";

// Import your app components
import Finder from "../../Apps/Finder/Finder"; // Assuming you have a Finder component
import Safari from "../../Apps/Safari/Safari";
import Terminal from "../../Apps/Terminal/Terminal";
import Calculator from "../../Apps/Calculator/Calculator";

const Desktop = () => {
  const [activeApp, setActiveApp] = useState(null); // State to track the active app

  return (
    <div className="h-screen w-screen bg-[url('./assets/macos-sonoma-morning.jpg')] bg-cover bg-center bg-no-repeat relative">
      <MenuBar />
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <Dock setActiveApp={setActiveApp} /> {/* Pass setActiveApp to Dock */}
      </div>

      {/* Conditionally render the app components */}
      {activeApp === "finder" && <Finder />}
      {activeApp === "safari" && <Safari />}
      {activeApp === "terminal" && <Terminal />}
      {activeApp === "calculator" && <Calculator />}
      {/* Add more apps as needed */}
    </div>
  );
};

export default Desktop;

function Dock({ setActiveApp }) {
  let mouseX = useMotionValue(Infinity);
  const appIcons = [
    { src: finderIcon, appName: "finder" },
    { src: safariIcon, appName: "safari" },
    { src: terminalIcon, appName: "terminal" },
    { src: calculatorIcon, appName: "calculator" },
    { src: trashEmptyIcon, appName: "trash" },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-24 items-center rounded-2xl  border-2 border-white/30 bg-black/30"
    >
      {appIcons.map((icon, i) => (
        <AppIcon
          key={i}
          mouseX={mouseX}
          src={icon.src}
          onClick={() => setActiveApp(icon.appName)} // Set active app on click
        />
      ))}
    </motion.div>
  );
}

function AppIcon({ mouseX, src, onClick }) {
  const ref = useRef(null);

  // Calculate the distance between the cursor and the center of the icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Animate the width
  const widthSync = useTransform(distance, [-150, 0, 150], [80, 140, 80]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  // Animate the vertical position (y)
  const ySync = useTransform(distance, [-150, 0, 150], [0, -35, 0]); // Move up by 10px in the center
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.img
      src={src}
      ref={ref}
      style={{ width, y }} // Apply the y transformation along with the width
      className="scale-[4]"
      onClick={onClick} // Handle click to open the app
    />
  );
}
