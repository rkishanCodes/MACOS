import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import appleLogo from "../../assets/Apple_logo_white.png";
import bootSound from "../../assets/mac_boot_sound.mp3";
import { useDispatch, useSelector } from "react-redux";
import { use } from "framer-motion/client";
import { setBoot, setDesktop, setLock } from "../../redux/slices/bootSlice";

const BootScreen = () => {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();
  const { isAudio } = useSelector((state) => state.boot);
    const dispatch = useDispatch();


  useEffect(() => {
    console.log("playing");
    if (isAudio) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });

      // Set progress to 0 and then start progress animation after 2 seconds
      setProgress(0);

      setTimeout(() => {
        setProgress(100);
      }, 2000);

      setTimeout(() => {
        dispatch(setBoot(false));
        dispatch(setLock(true));
      }, 5000);
    }
  }, []);

  return (
    <div className="w-screen h-lvh bg-black flex flex-col justify-center items-center relative">
      <audio id="boot-sound" src={bootSound} ref={audioRef} />
      <img src={appleLogo} alt="" className="w-[4.75rem] h-[5.5rem]" />

      <div
        className="w-[20%] absolute rounded-full bottom-[10%]"
        style={{ backgroundColor: "#28231D" }}
      >
        <motion.div
          className="bg-white h-2 rounded-full"
          style={{ width: `${progress}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 2, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </div>
  );
};

export default BootScreen;
