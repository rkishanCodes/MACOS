// import React from "react";
// import Hello from "./components/BootScreen/Hello";
// import BootScreen from "./components/BootScreen/BootScreen";
// import LockScreen from "./LockScreen";
// import Desktop from "./components/BootScreen/Desktop/Desktop";
// import { useSelector } from "react-redux";

// const App = () => {
//   const { isHello, isBoot, isLock, isDesktop } = useSelector(
//     (state) => state.boot
//   );

//   console.log(isHello);
//   console.log(isBoot);
//   console.log("app rendering");

//   return (
//     <>
//       {isHello && <Hello />}
//       {isBoot && <BootScreen />}
//       {isLock && <LockScreen />}
//       {isDesktop && <Desktop />}
//     </>
//   );
// };

// export default App;

import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Hello from "./components/BootScreen/Hello";
import BootScreen from "./components/BootScreen/BootScreen";
import LockScreen from "./LockScreen";
import Desktop from "./components/BootScreen/Desktop/Desktop";

const App = () => {
  const { isHello, isBoot, isLock, isDesktop } = useSelector(
    (state) => state.boot
  );

  return (
    <AnimatePresence>
      {isHello && <Hello />}
      {isBoot && <BootScreen />}
      {isLock && (
        <motion.div
          key="lock"
          // initial={{ opacity: 0.99 }}
          // animate={{ opacity: 1 }}
          // // exit={{ opacity: 0.7 }}
          transition={{ duration: 0.5}}
        >
          <LockScreen />
        </motion.div>
      )}
      {isDesktop && (
        <motion.div
          key="desktop"
          // initial={{ opacity: 0.99 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0.7 }}
          transition={{ duration: 0.5 }}
        >
          <Desktop />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
