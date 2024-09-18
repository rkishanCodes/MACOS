import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Hello from "./components/BootScreen/Hello";
import LockScreen from "./components/BootScreen/LockScreen";
import BootScreen from "./components/BootScreen/BootScreen";
import Desktop from "./components/BootScreen/Desktop/Desktop";

const App = () => {
  const { isHello, isBoot, isLock, isDesktop } = useSelector(
    (state) => state.boot
  );

  // console.log(isDesktop);

  return (
    <AnimatePresence>
      {isHello && <Hello />}
      {isBoot && <BootScreen />}
      {isLock && (
        <motion.div
          key="lock"
         
          transition={{ duration: 0.5}}
        >
          <LockScreen />
        </motion.div>
      )}
      {isDesktop && (
        <motion.div
          key="desktop"
       
          transition={{ duration: 0.5 }}
        >
          <Desktop />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
