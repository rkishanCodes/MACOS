import React from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";

import { AboutNav } from "./AboutNav";
import { AboutFooter } from "./AboutFooter";
import { Bento } from "./Bento";
import { Achievements } from "./Achievements";
import { Experience } from "./Experience";
import Projects from "./Projects";

const About = () => {
  return (
    <ResizableWindow appName="about">
      <MenuActions appName="about" />
      <div className="w-full h-full rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white cursor-default overflow-y-auto">
        <style>
          {`
            /* Hide scrollbar for Chrome, Safari and Opera */
            ::-webkit-scrollbar {
              display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          `}
        </style>
        <div className="h-18 bg-white rounded-tr-[10px] rounded-tl-[10px]">
          <AboutNav />
        </div>
        {false && <Bento />}
        {false && (
          <div className="relative h-full overflow-y-scroll">
            <Achievements />
          </div>
        )}
        {false && (
          <div className="relative h-full overflow-y-scroll">
            <Experience />
          </div>
        )}
        {true && (
          <div className="relative h-full overflow-y-scroll  bg-zinc-900 py-5">
            <Projects />
          </div>
        )}
        <AboutFooter />
      </div>
    </ResizableWindow>
  );
};

export default About;
