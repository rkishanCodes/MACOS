import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight } from "react-icons/fi";
import userLogo from "../../../assets/kishan.jpeg";
import styles from "./bubble.module.css";

export const Bento = () => {
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-8 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <AboutBlock />
      </motion.div>
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};
const BubbleText = ({ text, className }) => (
  <span className={className}>
    {text.split(/(\s+)/).map((segment, idx) => (
      <span key={idx} className={styles.wordWrapper}>
        {segment.split("").map((char, charIdx) => (
          <span className={styles.hoverText} key={charIdx}>
            {char}
          </span>
        ))}
      </span>
    ))}
  </span>
);

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2">
    <img src={userLogo} alt="" className="h-32 w-32 rounded-full" />
    <h1 className="my-2 text-4xl font-medium leading-tight">
      <BubbleText text="Hi, I'm R Kishan. " className={styles.whiteText} />
      <BubbleText
        text="I'm a Software Developer & AI Enthusiast. I love to build "
        className={styles.zincText}
      />
      <BubbleText text="unique " className={`${styles.whiteText} underline`} />
      <BubbleText text="website like this." className={styles.zincText} />
    </h1>
    <a
      href="https://www.linkedin.com/in/r-kishan-34913631a/"
      className={`flex items-center gap-1 ${styles.redText} hover:underline`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BubbleText text="Contact me " className={styles.redText} />
      <FiArrowRight />
    </a>
  </Block>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      <BubbleText
        text="I'm a BCA graduate with an 8.96 CGPA. I started my journey in Machine Learning, worked on research papers, and even got them published. Along the way, I fell in love with web development and the art of building the web. Now, I enjoy creating scalable projects for fun. "
        className={styles.zincText}
      />
      <BubbleText
        text="My passion is building cool and impactful stuff that solves real problems."
        className={styles.whiteText}
      />
    </p>
  </Block>
);

export default Bento;
