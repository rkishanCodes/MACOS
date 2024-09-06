import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectApps, updateAppState } from "../../../redux/slices/appSlice";
import finderIcon from "../../../assets/Apps/finder.svg";
import safariIcon from "../../../assets/Apps/safari.svg";
import terminalIcon from "../../../assets/Apps/terminal.svg";
import calculatorIcon from "../../../assets/Apps/calculator.svg";
import trashEmptyIcon from "../../../assets/Apps/Trash Empty.svg";

const Dock = () => {
  let mouseX = useMotionValue(Infinity);
  const dispatch = useDispatch();

  const appIcons = [
    { src: finderIcon, appName: "finder" },
    { src: safariIcon, appName: "safari" },
    { src: terminalIcon, appName: "terminal" },
    { src: calculatorIcon, appName: "calculator" },
    { src: trashEmptyIcon, appName: "bin" },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-24 items-center rounded-2xl border-2 border-white/30 bg-black/30"
    >
      {appIcons.map((icon, i) => (
        <AppIcon
          key={i}
          mouseX={mouseX}
          src={icon.src}
          name={icon.appName}
          onClick={() =>
            dispatch(
              updateAppState({
                app: icon.appName,
                field: "active",
                value: true,
              })
            )
          } // Dispatch the action to open the app
        />
      ))}
    </motion.div>
  );
};

const AppIcon = ({ mouseX, src, name, onClick }) => {
  const apps = useSelector(selectApps);
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [80, 140, 80]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const ySync = useTransform(distance, [-150, 0, 150], [0, -35, 0]);
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div className="flex flex-col justify-center items-center relative">
      <motion.img
        src={src}
        ref={ref}
        style={{ width, y }}
        className="cursor-pointer"
        onClick={onClick}
      />
      {/* Indicator under the app icon */}
      {apps[name]?.active && (
        <span className="w-1 h-1 rounded-full bg-white fixed bottom-1"></span>
      )}
    </motion.div>
  );
};

export default Dock;
