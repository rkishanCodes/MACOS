import React from "react";
import html from "../../../assets/Skills/html.svg";
import js from "../../../assets/Skills/js.svg";
import { motion } from "framer-motion";

const projectsArr = [
  {
    title: "Let's Insight",
    description: [
      "Used D3js for datavisualization",
      "JWT and Google auth for authentication",
      "its a mini SAAS",
    ],
    images: [
      {
        top: html,
        bottom: js,
      },
      {
        top: html,
        bottom: js,
      },
      {
        top: html,
        bottom: js,
      },
      {
        top: html,
        bottom: js,
      },
  
    ],
  },
  {
    title: "Let's Insight",
    description: [
      "Used D3js for datavisualization",
      "JWT and Google auth for authentication",
      "its a mini SAAS",
    ],
    images: [
      {
        top: html,
        bottom: js,
      },
      {
        top: html,
        bottom: js,
      },
      {
        top: html,
        bottom: js,
      },
    ],
  },
];

const Projects = () => {
  return (
    <div className="h-full w-full ">
      {projectsArr.map((project, index) => (
        <ProjectItem
          key={index}
          title={project.title}
          description={project.description}
          images={project.images}
        />
      ))}
    </div>
  );
};

const ProjectItem = ({ title, description, images }) => {
  return (
    <div className="h-[80%] w-[80%] rounded-[5vh] border-2 border-white/40 flex flex-col justify-around items-center relative left-[50%] transform translate-x-[-50%]">
      <h1>{title}</h1>
      <ul>
        {description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
      <h4>Tools</h4>
      <SwapLogos images={images} />
    </div>
  );
};

export default Projects;

const SwapLogos = ({ images }) => {
  return (
    <div className="flex   items-center justify-center gap-8">
      {images.map((image, index) => (
        <div className="h-16  flex justify-center items-center " key={index}>
          {console.log(image)}{" "}
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
                src={image.top}
                alt=""
                className="w-5 h-5 absolute top-[-10px] left-[50%] translate-x-[-50%] rotate-180"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
              />
              <img
                src={image.bottom}
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
                src={image.bottom}
                alt=""
                className="w-5 h-5 absolute top-[-10px] left-[50%] translate-x-[-50%] "
                style={{
                  clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                }}
              />
              <img
                src={image.top}
                alt=""
                className="w-5 h-5 absolute bottom-[-10px] left-[50%] translate-x-[-50%]  -rotate-180"
                style={{
                  clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                }}
              />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};
