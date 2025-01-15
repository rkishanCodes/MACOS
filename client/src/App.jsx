import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
        if (!response.ok) console.error("Failed to ping the backend of gemini api ");
      } catch (error) {
        console.error("Error pinging the backend:     ", error);
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_CAL_API}/ping`);
        if (!response.ok)
          console.error("Failed to ping the backend calculator   ");
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
    <>
      <Helmet>
        <title>MacOS Portfolio - R Kishan</title>
        <meta
          name="description"
          content="Explore my macOS-inspired portfolio showcasing projects, skills, and achievements. Built with React and inspired by macOS UI."
        />
        <meta
          name="keywords"
          content="Portfolio, macOS, R Kishan, R Kishan Codes"
        />
        <meta name="author" content="R Kishan" />
        <link rel="canonical" href="https://macosai.vercel.app/" />

        <meta property="og:title" content="MacOS Portfolio - R Kishan" />
        <meta
          property="og:description"
          content="Explore my macOS-inspired portfolio showcasing projects, skills, and achievements."
        />
        <meta
          property="og:image"
          content="https://macosai.vercel.app/preview-image.jpg"
        />
        <meta property="og:url" content="https://macosai.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MacOS Portfolio - R Kishan" />
        <meta
          name="twitter:description"
          content="Explore my macOS-inspired portfolio showcasing projects, skills, and achievements."
        />
        <meta
          name="twitter:image"
          content="https://macosai.vercel.app/preview-image.jpg"
        />
      </Helmet>

      <AnimatePresence>
        {isHello && <Hello />}
        {isBoot && <BootScreen />}
        {isLock && (
          <motion.div key="lock" transition={{ duration: 0.5 }}>
            <LockScreen />
          </motion.div>
        )}
        {isDesktop && (
          <motion.div key="desktop" transition={{ duration: 0.5 }}>
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
