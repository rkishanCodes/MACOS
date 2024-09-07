import React from "react";
import { motion } from "framer-motion";

const GenieEffect = ({ isOpen, onClose }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="540"
        height="620"
        viewBox="0 0 540 620"
        className={`transition-all ${isOpen ? "opacity-0" : "opacity-1"}`}
      >
        <g id="Page-1" fill="none" fillRule="evenodd">
          <g id="modal-with-genie-effect">
            {/* Define your paths here, using Framer Motion animations */}
            <motion.path
              id="step-3"
              stroke="#979797"
              d="M186 561.005c0-2.764 2.234-5.005 4.998-5.005h157.004c2.76 0 4.998 2.242 4.998 5.005v33.99c0 2.764-2.234 5.005-4.998 5.005H190.998c-2.76 0-4.998-2.242-4.998-5.005v-33.99z"
              opacity={isOpen ? 0 : 0.5}
            />
            {/* Other paths */}
            <motion.path
              id="element"
              fill="#FFF"
              animate={{ scale: isOpen ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <g id="open-modal-ctr">
              <motion.rect
                id="open-modal-btn"
                fill="#FFF"
                onClick={onClose}
                className={`transition-opacity ${
                  isOpen ? "opacity-0 pointer-events-none" : "opacity-1"
                }`}
              />
              <text
                id="text"
                fill="#7E7878"
                fontFamily="Poppins"
                fontSize="16"
                fontWeight="260"
              >
                <tspan x="41.797" y="27">
                  Open Modal
                </tspan>
              </text>
            </g>
          </g>
        </g>
      </motion.svg>
    </div>
  );
};

export default GenieEffect;
