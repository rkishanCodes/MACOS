import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const AboutNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-finder-nav-dark pt-12 pb-2">
      <SlideTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const SlideTabs = ({ activeTab, setActiveTab }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full border-2 border-white/50 bg-finder-nav-dark p-1"
    >
      <Tab
        setPosition={setPosition}
        active={activeTab === "Bio"}
        onClick={() => setActiveTab("Bio")}
      >
        Bio
      </Tab>
      <Tab
        setPosition={setPosition}
        active={activeTab === "Works"}
        onClick={() => setActiveTab("Works")}
      >
        Works
      </Tab>
      <Tab
        setPosition={setPosition}
        active={activeTab === "Career"}
        onClick={() => setActiveTab("Career")}
      >
        Career
      </Tab>
      <Tab
        setPosition={setPosition}
        active={activeTab === "Milestones"}
        onClick={() => setActiveTab("Milestones")}
      >
        Milestones
      </Tab>
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition, active, onClick }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (active && ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      setPosition({
        left: ref.current.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [active, setPosition]);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base ${
        active ? "font-bold" : ""
      }`}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-white/20 md:h-12"
    />
  );
};