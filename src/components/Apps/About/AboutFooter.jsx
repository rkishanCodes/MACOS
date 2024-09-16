import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import aboutImg from "../../../assets/About/bio.webp";
import connectImg from "../../../assets/About/connect.jpeg";
import careersImg from "../../../assets/About/Careers.avif";
import projectImg from "../../../assets/About/project.jpg";
import achievementsImg from "../../../assets/About/achievements.webp";

export const AboutFooter = ({ setActiveTab, scrollableRef }) => {
  const handleClick = (tab) => {
    setActiveTab(tab);
    if (scrollableRef && scrollableRef.current) {
      scrollableRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-neutral-950 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          heading="About"
          subheading="Get to know me better"
          imgSrc={aboutImg}
          onClick={() => handleClick("Bio")}
        />
        <Link
          heading="Projects"
          subheading="Explore my work and collaborations"
          imgSrc={projectImg}
          onClick={() => handleClick("Works")}
        />
        <Link
          heading="Careers"
          subheading="Join forces and build something great"
          imgSrc={careersImg}
          onClick={() => handleClick("Career")}
        />
        <Link
          heading="Achievements"
          subheading="Celebrating key milestones"
          imgSrc={achievementsImg}
          onClick={() => handleClick("Milestones")}
        />
        <Link
          heading="Connect"
          subheading="Reach out and stay in touch"
          imgSrc={connectImg}
          href="https://www.linkedin.com/in/r-kishan-34913631a/"
          external={true}
        />
      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, href, onClick, external }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const commonProps = {
    ref: ref,
    onMouseMove: handleMouseMove,
    initial: "initial",
    whileHover: "whileHover",
    className:
      "group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8 cursor-pointer",
  };

  const linkContent = (
    <>
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-56"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </>
  );

  return external ? (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...commonProps}
    >
      {linkContent}
    </motion.a>
  ) : (
    <motion.div onClick={onClick} {...commonProps}>
      {linkContent}
    </motion.div>
  );
};
