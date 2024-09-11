import React, { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  restoreApp,
  selectApps,
  updateAppState,
  updateMinimizedPosition,
  updatePosition,
} from "../../redux/slices/appSlice"

// import Re

// src/components/Dock.js

const Dock = () => {
  let mouseX = useMotionValue(Infinity);
  const dispatch = useDispatch();
  const appIcons = useSelector((state) => state.apps.appIcons);
  const apps = useSelector(selectApps);
  const dockRef = useRef(null);

  const minimizedApps = Object.keys(apps).filter((app) => apps[app].minimize);

  const setMinimizedPosition = useCallback(
    (app, index, totalMinimized) => {
      const dockBounds = dockRef.current.getBoundingClientRect();
      const x =
        dockBounds.left +
        (dockBounds.width / (totalMinimized + 1)) * (index + 1);
      const y = dockBounds.bottom - 60; // Adjust as needed
      dispatch(updateMinimizedPosition({ app, x, y }));
    },
    [dispatch]
  );

  useEffect(() => {
    minimizedApps.forEach((app, index) => {
      setMinimizedPosition(app, index, minimizedApps.length);
    });
  }, [minimizedApps, setMinimizedPosition]);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      ref={dockRef}
      className="fixed bottom-1 left-1/2 transform -translate-x-1/2 flex h-24 items-center rounded-2xl border-2 border-white/30 bg-black/30"
    >
      {appIcons.map((icon, i) =>
        icon ? (
          icon.src ? (
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
              }
            />
          ) : (
            <ResizableApp
              key={i}
              mouseX={mouseX}
              appName={icon.appName}
              onClick={() =>
                dispatch(
                  restoreApp({
                    app: icon.appName,
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

// AppIcon for image icons
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
        onClick={onClick}
        className="mx-[2px]"
      />
      {apps[name]?.active && (
        <span className="w-1 h-1 rounded-full bg-white fixed bottom-1"></span>
      )}
    </motion.div>
  );
};

// ResizableApp for minimized apps
const ResizableApp = ({ mouseX, appName, onClick }) => {
  const apps = useSelector(selectApps);
  const ref = useRef(null);
  const dispatch = useDispatch();

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
    <motion.div
      ref={ref}
      style={{ width, y }}
      onClick={onClick}
      className="flex justify-center items-center bg-transparent rounded-md mx-2 p-2 overflow-hidden"
    >
      <ResizableWindow appName={appName}>
        <div className="w-full h-full">App Content for {appName}</div>
      </ResizableWindow>
      {apps[appName]?.active && (
        <span className="w-1 h-1 rounded-full bg-white fixed bottom-1"></span>
      )}
    </motion.div>
  );
};

export default Dock;
