import React from "react";

import appleIcon from "../../../assets/Safari/safariApple.svg";
import gmailIcon from "../../../assets/Safari/Gmail.svg";
import gitHubIcon from "../../../assets/Safari/GitHub.svg";
import linkedInIcon from "../../../assets/Safari/LinkedIn.svg";
import googleIcon from "../../../assets/Safari/Google.svg";

const iconMapping = [
  {
    name: "Apple",
    icon: appleIcon,
    link: "https://www.apple.com",
  },
  {
    name: "Gmail",
    icon: gmailIcon,
    link: "mailto:rkishan.codes@gmail.com",
  },
  {
    name: "GitHub",
    icon: gitHubIcon,
    link: "https://github.com/rkishanCodes",
  },
  {
    name: "LinkedIn",
    icon: linkedInIcon,
    link: "https://www.linkedin.com/in/r-kishan-34913631a/",
  },
  {
    name: "Google",
    icon: googleIcon,
    link: "https://www.google.com",
  },
];

const ContentSafari = () => {
  return (
    <div className="w-full h-full bg-[url('./assets/Safari/bg.png')] bg-cover bg-center bg-no-repeat rounded-br-[10px] rounded-bl-[10px]">
      <div className="w-full h-full flex flex-col justify-center item-center ">
        <h1 className="text-black font-[600] text-[1.125rem] text-center mb-[2%]">
          Favourites
        </h1>
        <div className="flex gap-4 justify-center items-center ">
          {iconMapping.map((app) => (
            <div
              key={app.name}
              className="flex flex-col justify-center item-center text-center"
            >
              <a href={app.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="bg-white/100 p-2 rounded-[10px] shadow-[0_1px_10px_rgba(0,0,0,0.4)]"
                />
                <span className="text-black text-[0.85rem]">{app.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSafari;
