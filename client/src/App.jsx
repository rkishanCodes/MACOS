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

    document.body.style.overflow = 'hidden';

// Prevent default for mouse wheel and touch move events
function preventDefault(e) {
  e.preventDefault();
}

// Modern Chrome requires { passive: false } for event listeners to prevent default
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// Disable scrolling
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// Enable scrolling (in case you need it later)
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// Call this function to disable scroll
disableScroll();

// Prevent scroll on arrow keys
function preventDefaultForScrollKeys(e) {
  var keys = {37: 1, 38: 1, 39: 1, 40: 1};
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}


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
