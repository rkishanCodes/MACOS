import React from "react";
import { motion } from "framer-motion";

export const Card = ({ src }) => (
  <motion.span className="card" whileHover={{ scale: 1.05 }}>
    <motion.img
      className="card__blur"
      src={src}
      alt=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 0.3 }}
    />
    <motion.img
      className="card__img"
      src={src}
      alt=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.span>
);
