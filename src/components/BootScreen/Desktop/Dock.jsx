import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  restoreApp,
  selectApps,
  updateAppState,
} from "../../../redux/slices/appSlice";
import finderIcon from "../../../assets/Apps/finder.svg";
import safariIcon from "../../../assets/Apps/safari.svg";
import terminalIcon from "../../../assets/Apps/terminal.svg";
import calculatorIcon from "../../../assets/Apps/calculator.svg";
import trashEmptyIcon from "../../../assets/Apps/Trash Empty.svg";
import chatgptIcon from "../../../assets/Apps/chatgpt1.svg";

import finderMinimize from "../../../assets/finderMinimize.png";
import calculatorMinimize from "../../../assets/calculatorMinimize.png";
import safariMinimize from "../../../assets/safariMinimize.png";
import binMinimize from "../../../assets/binMinimize.png";
import terminalMinimize from "../../../assets/terminalMinimize.png";

const imgIcon = {
  finderIcon,
  safariIcon,
  terminalIcon,
  calculatorIcon,
  trashEmptyIcon,
  chatgptIcon,
};

const minimizeIcon = {
  finderMinimize,
  calculatorMinimize,
  safariMinimize,
  binMinimize,
  terminalMinimize,
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Dock = () => {
  let mouseX = useMotionValue(Infinity);
  const dispatch = useDispatch();
  const appIcons = useSelector((state) => state.apps.appIcons);
  const apps = useSelector(selectApps);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-24 items-end rounded-2xl border-2 border-white/30 bg-black/30 pb-1"
    >
      {appIcons.map((icon, i) =>
        icon ? (
          icon.src ? (
            <AppIcon
              key={i}
              mouseX={mouseX}
              src={imgIcon[icon.src]}
              name={icon.appName}
              onClick={() => {
                dispatch(
                  updateAppState({
                    app: icon.appName,
                    field: "active",
                    value: true,
                  })
                );

                if (apps[icon.appName]["minimize"]) {
                  dispatch(
                    restoreApp({
                      app: icon.appName,
                    })
                  );
                }
              }}
            />
          ) : (
            <AppDiv
              key={i}
              mouseX={mouseX}
              src={minimizeIcon[icon.divSrc]}
              name={icon.divName}
              onClick={() =>
                dispatch(
                  restoreApp({
                    app: icon.divName,
                  })
                )
              }
            />
          )
        ) : (
          <div key={i} className="w-[1px] h-[70%] bg-white/45 mx-2"></div>
        )
      )}
    </motion.div>
  );
};

const AppIcon = ({ mouseX, src, name, onClick }) => {
  const apps = useSelector(selectApps);
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const ySync = useTransform(distance, [-150, 0, 150], [0, -25, 0]);
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      className="flex flex-col justify-center items-center relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={src}
        ref={ref}
        style={{ width, y, }}
        onClick={onClick}
        className="mx-[2px] "
      />
      {apps[name]?.active && (
        <span className="w-1 h-1 rounded-full bg-white fixed bottom-1"></span>
      )}
      {isHovered && (
        <div className="absolute bottom-full mb-6 flex flex-col items-center">
          <div
            className="px-4 py-1 bg-black/55 border-[1px] border-white/40 text-white text-[0.85rem] rounded whitespace-nowrap"
            style={{ outline: "1px solid black" }}
          >
            {capitalizeFirstLetter(name)}
          </div>
          <div
            className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black/55"
            style={{ filter: "drop-shadow(0px 1px 0px rgba(255,255,255,0.4))" }}
          ></div>
        </div>
      )}
    </motion.div>
  );
};

const AppDiv = ({ mouseX, src, name, onClick }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const ySync = useTransform(distance, [-150, 0, 150], [0, -20, 0]);
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      className="flex flex-col justify-center items-center relative"
      style={{ width, y }}
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img src={src} className="mx-[2px] " style={{ width, y 
      }} />
      {isHovered && (
        <div className="absolute bottom-full mb-8 flex flex-col items-center">
          <div
            className="px-4 py-1 bg-black/55 border-[1px] border-white/40 text-white text-[0.85rem] rounded whitespace-nowrap"
            style={{ outline: "1px solid black" }}
          >
            {capitalizeFirstLetter(name)}
          </div>
          <div
            className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-black/55"
            style={{ filter: "drop-shadow(0px 1px 0px rgba(255,255,255,0.4))" }}
          ></div>
        </div>
      )}
    </motion.div>
  );
};

export default Dock;
