import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  restoreApp,
  selectApps,
  updateAppState,
  SetActiveApp,
  setDeviceType,
  minimizeAllOtherAppsOnMobile,
} from "../../../redux/slices/appSlice";
import { useCapitalizeFirstLetter } from "../../../hooks/useCapitalizeFirstLetter";

import finderIcon from "../../../assets/Apps/Finder.png";
import safariIcon from "../../../assets/Apps/Safari.png";
import terminalIcon from "../../../assets/Apps/Terminal.png";
import calculatorIcon from "../../../assets/Apps/Calculator.png";
import trashEmptyIcon from "../../../assets/Apps/TrashFull.png";
import aboutIcon from "../../../assets/Apps/About.png";
import geminiIcon from "../../../assets/Apps/Gemini.svg";

import finderMinimize from "../../../assets/finderMinimize.png";
import calculatorMinimize from "../../../assets/calculatorMinimize.png";
import safariMinimize from "../../../assets/safariMinimize.png";
import binMinimize from "../../../assets/binMinimize.png";
import terminalMinimize from "../../../assets/terminalMinimize.png";
import aboutMinimize from "../../../assets/aboutMinimize.png";
import geminiMinimize from "../../../assets/geminiMinimize.png";

const imgIcon = {
  finderIcon,
  safariIcon,
  terminalIcon,
  calculatorIcon,
  trashEmptyIcon,
  geminiIcon,
  aboutIcon,
};

const minimizeIcon = {
  finderMinimize,
  calculatorMinimize,
  safariMinimize,
  binMinimize,
  terminalMinimize,
  geminiMinimize,
  aboutMinimize,
};

const Dock = () => {
  let mouseX = useMotionValue(Infinity);
  const dispatch = useDispatch();
  const appIcons = useSelector((state) => state.apps.appIcons);
  const apps = useSelector(selectApps);
  const activeAppName = useSelector((state) => state.apps.activeApp);
  const isMobile = useSelector((state) => state.apps.isMobile);
  const dockRef = useRef(null);

  const handleClick = useCallback(
    (appName) => {
      if (isMobile) {
        dispatch(minimizeAllOtherAppsOnMobile({ clickedApp: appName }));
      } else {
        if (activeAppName !== appName) {
          dispatch(SetActiveApp({ appName }));
        }

        if (apps[appName]?.minimize) {
          dispatch(restoreApp({ app: appName }));
        }

        dispatch(
          updateAppState({
            app: appName,
            field: "active",
            value: true,
          })
        );
      }
    },
    [dispatch, activeAppName, apps, isMobile]
  );

  useEffect(() => {
    const handleResize = () => {
      dispatch(setDeviceType({ isMobile: window.innerWidth <= 1024 }));
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleTouchMove = useCallback(
    (e) => {
      if (dockRef.current) {
        const touch = e.touches[0];
        const dockRect = dockRef.current.getBoundingClientRect();
        const touchX = touch.clientX - dockRect.left;
        mouseX.set(touchX);
      }
    },
    [mouseX]
  );

  const handleTouchEnd = useCallback(() => {
    mouseX.set(Infinity);
  }, [mouseX]);

  return (
    <motion.div
      ref={dockRef}
      onMouseMove={(e) => !isMobile && mouseX.set(e.pageX)}
      onMouseLeave={() => !isMobile && mouseX.set(Infinity)}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      className="mx-auto flex h-[6.5vw] items-end rounded-2xl border-2 border-white/30 bg-black/30 pb-1 max-xs:scale-150 max-xs:h-[9vw] max-xxs:scale-[1.75] max-xxs:h-[9.5vw]"
    >
      {appIcons.map((icon, i) =>
        icon ? (
          icon.src ? (
            <AppIcon
              key={i}
              mouseX={mouseX}
              src={imgIcon[icon.src]}
              name={icon.appName}
              onClick={() => handleClick(icon.appName)}
              isMobile={isMobile}
            />
          ) : (
            <AppDiv
              key={i}
              mouseX={mouseX}
              src={minimizeIcon[icon.divSrc]}
              name={icon.divName}
              onClick={() => handleClick(icon.divName)}
              isMobile={isMobile}
            />
          )
        ) : (
          <div key={i} className="w-[1px] h-[70%] bg-white/45 mx-2"></div>
        )
      )}
    </motion.div>
  );
};

const AppIcon = ({ mouseX, src, name, onClick, isMobile }) => {
  const capitalizeFirstLetter = useCapitalizeFirstLetter();

  const apps = useSelector(selectApps);
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [90, 110, 90] : [80, 140, 80]
  );
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: isMobile ? 300 : 150,
    damping: isMobile ? 20 : 12,
  });

  const ySync = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [0, -10, 0] : [0, -25, 0]
  );
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: isMobile ? 300 : 150,
    damping: isMobile ? 20 : 12,
  });

  return (
    <motion.div
      className="flex flex-col justify-center items-center relative"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      <motion.img
        src={src}
        ref={ref}
        style={{ width, y }}
        onClick={onClick}
        className="mx-[2px]"
      />
      {apps[name]?.active && (
        <span className="w-1 h-1 rounded-full bg-white fixed bottom-1"></span>
      )}
      {isHovered && !isMobile && (
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


const AppDiv = ({ mouseX, src, name, onClick, isMobile }) => {
  const capitalizeFirstLetter = useCapitalizeFirstLetter();

  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [90, 110, 90] : [80, 140, 80]
  );
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: isMobile ? 300 : 150,
    damping: isMobile ? 20 : 12,
  });

  const ySync = useTransform(
    distance,
    [-150, 0, 150],
    isMobile ? [0, -8, 0] : [0, -10, 0]
  );
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: isMobile ? 300 : 150,
    damping: isMobile ? 20 : 12,
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
      <motion.img src={src} className="mx-[2px]" style={{ width, y }} />
      {isHovered && !isMobile && (
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
