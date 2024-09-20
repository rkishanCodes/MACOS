import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Hello from "./components/BootScreen/Hello";
import LockScreen from "./components/BootScreen/LockScreen";
import BootScreen from "./components/BootScreen/BootScreen";
import Desktop from "./components/BootScreen/Desktop/Desktop";

const App = () => {


  useEffect(() => {
    const pingBackend = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_GEMINI_API}/ping`);
        if (!response.ok) {
          console.error("Failed to ping the backend of gimini"); 
          
        }
      } catch (error) {
        console.error("Error pinging the backend:", error);
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_CAL_API}/ping`);
        if (!response.ok) {
          console.error("Failed to ping the backend calculator"); 
          
        }
      } catch (error) {
        console.error("Error pinging the backend:", error);
      }
    };

    pingBackend(); 

    const interval = setInterval(pingBackend, 5 * 60 * 1000); 

    return () => clearInterval(interval); 
  }, []);

  
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
