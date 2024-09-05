import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
} from "framer-motion";

const INITIAL_WIDTH = 48;

export const DockCard = ({ children, mouseX, hovered }) => {
  // Ref to the card element
  const ref = useRef(null);

  // Motion value to track distance from mouse
  const distance = useMotionValue(0);

  // Spring animation for card size
  const size = useSpring(INITIAL_WIDTH, { damping: 20, stiffness: 200 });

  // Transform size to y position for bounce effect
  const y = useTransform(size, [INITIAL_WIDTH, INITIAL_WIDTH * 1.75], [0, -10]);

  useAnimationFrame(() => {
    const el = ref.current;
    if (!el || !hovered) return;

    const rect = el.getBoundingClientRect();
    const distanceFromCenter = mouseX.get() - (rect.left + rect.width / 2);
    distance.set(distanceFromCenter);

    // Calculate hover scale based on distance from center
    const hoverScale = 1.75 - Math.abs(distanceFromCenter) / rect.width;
    size.set(INITIAL_WIDTH * Math.max(1, hoverScale));
  });

  return (
    <motion.div
      ref={ref}
      className="dock-card-container"
      style={{ width: size, height: size, y }}
    >
      <motion.button
        className="dock-card"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {children}
      </motion.button>
    </motion.div>
  );
};
