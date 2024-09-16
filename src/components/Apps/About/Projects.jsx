import React from "react";
import html from "../../../assets/Tools/html.svg";
import js from "../../../assets/Tools/javaScript.svg";
import css from "../../../assets/Tools/css.svg";
import tailwind from "../../../assets/Tools/tailwind.svg";
import gsap from "../../../assets/Tools/gsap.svg";
import reactJs from "../../../assets/Tools/reactJs.svg";
import framerMotion from "../../../assets/Tools/framerMotion.svg";
import redux from "../../../assets/Tools/redux.svg";
import nodeJs from "../../../assets/Tools/nodeJs.svg";
import googleAuth2 from "../../../assets/Tools/googleAuth2.svg";
import jwt from "../../../assets/Tools/jwt.svg";
import mongoDb from "../../../assets/Tools/mongoDb.svg";
import zod from "../../../assets/Tools/zod.svg";
import chartJs from "../../../assets/Tools/chartJs.png";
import aws from "../../../assets/Tools/aws.svg";
import graphQl from "../../../assets/Tools/graphQl.svg";
import nextJs from "../../../assets/Tools/nextJs.svg";
import PostgreSQL from "../../../assets/Tools/PostgreSQL.svg";

import redis from "../../../assets/Tools/redis.svg";
import supabase from "../../../assets/Tools/supabase.svg";
import typescript from "../../../assets/Tools/typescript.svg";
import git from "../../../assets/Tools/git.svg";
import python from "../../../assets/Tools/python.svg";
import flask from "../../../assets/Tools/flask.svg";
import machineLearning from "../../../assets/Tools/machineLearning.svg";
import vsc from "../../../assets/Tools/vsc.svg";

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
        top: js,
        bottom: css,
      },

      {
        top: redux,
        bottom: reactJs,
      },
      {
        top: gsap,
        bottom: framerMotion,
      },
      {
        top: nodeJs,
        bottom: mongoDb,
      },
      {
        top: googleAuth2,
        bottom: jwt,
      },
      {
        top: zod,
        bottom: chartJs,
      },
    ],
  },
  {
    title: "MacOS Portfolio",
    description: [
      "Used Framer Motion for cool aniamtions",
      "redux for store management",
      "Finder and terminal is in sync",
    ],
    images: [
      {
        top: git,
        bottom: js,
      },
      {
        top: tailwind,
        bottom: css,
      },
      {
        top: redux,
        bottom: reactJs,
      },
      {
        top: gsap,
        bottom: framerMotion,
      },
    ],
  },

  {
    title: "TweetHub",
    description: [
      "used Next and typescript",
      "PostgreSQL for database ",
      "its a mini SAAS",
    ],
    images: [
      {
        top: framerMotion,
        bottom: typescript,
      },
      {
        top: tailwind,
        bottom: nodeJs,
      },
      {
        top: aws,
        bottom: nextJs,
      },

      {
        top: googleAuth2,
        bottom: jwt,
      },
      {
        top: graphQl,
        bottom: PostgreSQL,
      },
      {
        top: supabase,
        bottom: redis,
      },
    ],
  },

  {
    title: "Street2Site",
    description: [
      "used advanced animations",
      "desgnes featuers like service",
      "Responseieve",
    ],
    images: [
      {
        top: git,
        bottom: js,
      },
      {
        top: tailwind,
        bottom: css,
      },
      {
        top: redux,
        bottom: reactJs,
      },
      {
        top: gsap,
        bottom: framerMotion,
      },
    ],
  },
  {
    title: "AQI prediction",
    description: [
      "used advance modeels",
      "foudnout insights",
      "worked in research paper",
    ],
    images: [
      {
        top: python,
        bottom: flask,
      },
      {
        top: html,
        bottom: css,
      },

      {
        top: machineLearning,
        bottom: vsc,
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
    <div className="h-[80%] w-[80%]  mb-8 rounded-[5vh] border-2 border-white/40 flex flex-col  justify-around  relative left-[50%] transform translate-x-[-50%]">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-[1.5rem] font-[900] pl-6">{title}</h1>
        <a href="" className="pr-6">
          Code
        </a>
      </div>
      <ul>
        {description.map((desc, index) => (
          <li
            key={index}
            className="text-zinc-500 text-[1.15rem] list-disc ml-8"
          >
            {desc}
          </li>
        ))}
      </ul>
      <div>
        <h4 className="text-white text-[1.125rem] font-[900] pl-6">Tools</h4>
        <SwapLogos images={images} />
      </div>
    </div>
  );
};

export default Projects;

const SwapLogos = ({ images }) => {
  return (
    <div className="flex   items-center justify-center border-[1px ] rounded-lg mx-4 py-2   flex-wrap bg-white/5">
      {images.map((image, index) => (
        <div
          className="h-16  flex justify-center items-center px-4"
          key={index}
        >
          <div className="h-12  overflow-hidden ">
            <motion.div
              className="w-12 h-12 border-[1px] rounded-full relative top-[-50%] transform translate-y-[50%] "
              animate={{ rotate: [0, 180, 180, 360, 360] }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
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
              animate={{ rotate: [0, 180, 180, 360, 360] }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
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
