import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Experience = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="bg-zinc-900 overflow-y-auto h-full pt-4">
      <TextParallaxContent
        imgUrl="https://cdn.sanity.io/images/tlr8oxjg/production/5d89f75fb4e6732aef0fdbe99d2215b2f456368a-1456x816.png?w=3840&q=100&fit=clip&auto=format"
        subheading="Co-Founder & Software Engineer"
        heading=" Empowered SMEs through High-Quality Web Design
 "
        containerRef={containerRef}
      >
        <Street2SiteContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Front End Developer"
        heading="Built Web Applications with React and RESTful APIs"
        containerRef={containerRef}
      >
        <VtechContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://content.jdmagicbox.com/v2/comp/bangalore/w7/080pxx80.xx80.180810152617.m2w7/catalogue/ekennis-electronic-city-phase-1-bangalore-computer-training-institutes-uzjm9v6jwc.jpg"
        subheading="	Software Developer Intern"
        heading="Enhancing Web Performance and User Experience
"
        containerRef={containerRef}
      >
        <EkennisContent />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
  containerRef,
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
      className="relative w-full"
    >
      <div className="relative h-[70%]">
        <StickyImage imgUrl={imgUrl} containerRef={containerRef} />
        <OverlayCopy
          heading={heading}
          subheading={subheading}
          containerRef={containerRef}
        />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl, containerRef }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
    container: containerRef,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(50vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl w-full max-w-full"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading, containerRef }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
    container: containerRef,
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const opacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.6, 0.7],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-lg md:mb-3 md:text-2xl">
        {subheading}
      </p>
      <p className="text-center text-3xl font-bold md:text-5xl">{heading}</p>
    </motion.div>
  );
};

const Street2SiteContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
      Street2Site
      <h6>Dec 23 - Present</h6>
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        Co-founded Street2Site to empower small and medium-sized businesses to
        enhance their brand value through high-quality web design projects.
      </p>
      <p className="mb-8 text-xl text-neutral-400 md:text-2xl">
        Directed the successful execution of projects by integrating hands-on
        coding with strategic problem-solving.
      </p>
    </div>
  </div>
);

const VtechContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
      VTech Integrated Solutions
      <h6>Mar 2024 - May 2024</h6>
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        Gained valuable experience working with React and building RESTful APIs
        while developing interactive and efficient web applications.
      </p>
      <p className="mb-8 text-xl text-neutral-400 md:text-2xl">
        Collaborated closely with a mentor, learning industry best practices for
        software development, improving debugging skills, and enhancing the
        overall structure and performance of the applications I worked on.
      </p>
    </div>
  </div>
);

const EkennisContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-white">
      Ekennis
      <h6>Aug 2023 - Nov 2023</h6>
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        Gained hands-on experience in web development by building dynamic web
        pages, optimizing websites on platforms like Wix and WordPress, and
        enhancing overall performance through CMS integration.
      </p>
      <p className="mb-8 text-xl text-neutral-400 md:text-2xl">
        Improved website functionality and user experience by implementing
        custom complex forms using Velo language, designing responsive layouts,
        and conducting thorough application testing and debugging, resulting in
        faster load times and more engaging interactions.
      </p>
    </div>
  </div>
);
