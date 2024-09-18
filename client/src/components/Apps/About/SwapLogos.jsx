import React from "react";
import html from "../../../assets/Skills/html.svg";
import js from "../../../assets/Skills/js.svg";
import { motion } from "framer-motion";

const SwapLogos = () => {
  return (
    <div className="flex bg-black w-full h-full items-center justify-center gap-8">
      <div className="h-16 w-[200px] border-[1px] border-white flex justify-center items-center">
        <div className="h-12  overflow-hidden ">
          <motion.div
            className="w-12 h-12 border-[1px] rounded-full relative top-[-50%] transform translate-y-[50%] "
            animate={{ rotate: [0, 180, 180, 360, 360] }} // Add an extra keyframe for the pause
            transition={{
              duration: 6, // Total duration for one full cycle (2s for each half rotation + 2s pause + 2s final pause)
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1], // Adjust timing to include the extra pause
              repeat: Infinity, // Repeat infinitely
            }}
          >
            <img
              src={html}
              alt=""
              className="w-5 h-5 absolute top-[-10px] left-[50%] translate-x-[-50%] rotate-180"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            />
            <img
              src={js}
              alt=""
              className="w-5 h-5 absolute bottom-[-10px] left-[50%] translate-x-[-50%] "
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            />
          </motion.div>
          <motion.div
            className="w-12 h-12 border-[1px] rounded-full relative bottom-[50%] translate-y-[-100%]"
            animate={{ rotate: [0, 180, 180, 360, 360] }} // Add an extra keyframe for the pause
            transition={{
              duration: 6, // Total duration for one full cycle (2s for each half rotation + 2s pause + 2s final pause)
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1], // Adjust timing to include the extra pause
              repeat: Infinity, // Repeat infinitely
            }}
          >
            <img
              src={js}
              alt=""
              className="w-5 h-5 absolute top-[-10px] left-[50%] translate-x-[-50%] "
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              }}
            />
            <img
              src={html}
              alt=""
              className="w-5 h-5 absolute bottom-[-10px] left-[50%] translate-x-[-50%]  -rotate-180"
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>
      <div className="h-16 w-[200px] border-[1px] border-white flex justify-center items-center">
        <div className="h-12  overflow-hidden ">
          <motion.div
            className="w-12 h-12 border-[1px] rounded-full relative top-[-50%] transform translate-y-[50%] "
            animate={{ rotate: [0, 180, 180, 360, 360] }} // Add an extra keyframe for the pause
            transition={{
              duration: 6, // Total duration for one full cycle (2s for each half rotation + 2s pause + 2s final pause)
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1], // Adjust timing to include the extra pause
              repeat: Infinity, // Repeat infinitely
            }}
          >
            <img
              src={html}
              alt=""
              className="w-5 h-5 absolute top-[-10px] left-[50%] translate-x-[-50%] rotate-180"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            />
            <img
              src={js}
              alt=""
              className="w-5 h-5 absolute bottom-[-10px] left-[50%] translate-x-[-50%] "
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            />
          </motion.div>
          <motion.div
            className="w-12 h-12 border-[1px] rounded-full relative bottom-[50%] translate-y-[-100%]"
            animate={{ rotate: [0, 180, 180, 360, 360] }} // Add an extra keyframe for the pause
            transition={{
              duration: 6, // Total duration for one full cycle (2s for each half rotation + 2s pause + 2s final pause)
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1], // Adjust timing to include the extra pause
              repeat: Infinity, // Repeat infinitely
            }}
          >
            <img
              src={js}
              alt=""
              className="w-5 h-5 absolute top-[-10px] left-[50%] translate-x-[-50%] "
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              }}
            />
            <img
              src={html}
              alt=""
              className="w-5 h-5 absolute bottom-[-10px] left-[50%] translate-x-[-50%]  -rotate-180"
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>
      <div className="h-16 w-[200px] border-[1px] border-white flex justify-center items-center">
        <div className="h-12  overflow-hidden ">
          <motion.div
            className="w-12 h-12 border-[1px] rounded-full relative top-[-50%] transform translate-y-[50%] "
            animate={{ rotate: [0, 180, 180, 360, 360] }} // Add an extra keyframe for the pause
            transition={{
              duration: 6, // Total duration for one full cycle (2s for each half rotation + 2s pause + 2s final pause)
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1], // Adjust timing to include the extra pause
              repeat: Infinity, // Repeat infinitely
            }}
          >
            <img
              src={html}
              alt=""
              className="w-5 h-5 absolute top-[-10px] left-[50%] translate-x-[-50%] rotate-180"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            />
            <img
              src={js}
              alt=""
              className="w-5 h-5 absolute bottom-[-10px] left-[50%] translate-x-[-50%] "
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
            />
          </motion.div>
          <motion.div
            className="w-12 h-12 border-[1px] rounded-full relative bottom-[50%] translate-y-[-100%]"
            animate={{ rotate: [0, 180, 180, 360, 360] }} // Add an extra keyframe for the pause
            transition={{
              duration: 6, // Total duration for one full cycle (2s for each half rotation + 2s pause + 2s final pause)
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1], // Adjust timing to include the extra pause
              repeat: Infinity, // Repeat infinitely
            }}
          >
            <img
              src={js}
              alt=""
              className="w-5 h-5 absolute top-[-10px] left-[50%] translate-x-[-50%] "
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              }}
            />
            <img
              src={html}
              alt=""
              className="w-5 h-5 absolute bottom-[-10px] left-[50%] translate-x-[-50%]  -rotate-180"
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SwapLogos;
