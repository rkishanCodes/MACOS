import React from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";

import { AboutNav } from "./AboutNav";
import AboutMe from "./AboutMe";
import { AboutFooter } from "./AboutFooter";
import { Bento } from "./Bento";

const About = () => {
  return (
    <ResizableWindow appName="about">
      <MenuActions appName="about" />
      <div className="w-full h-full rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white cursor-default overflow-y-auto">
        <div className="h-18  bg-white rounded-tr-[10px] rounded-tl-[10px] ">
          <AboutNav />
        </div>
        {false && <Bento />}
        {true && <Bento />}
        

        <AboutFooter />
      </div>
    </ResizableWindow>
  );
};

export default About;
