import React, { useState, useEffect } from "react";
import icon from "../assets/Apple_logo_white.png";
import icon1 from "../assets/icon1.png";
import battery from "../assets/battery.png";
import on from "../assets/on.png";
import off from "../assets/off.png";

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatDateTime = (date) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    // Format date and time
    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Remove comma
    return formattedDateTime.replace(/,/g, "");
  };

  const menuItems = ["File", "Edit", "Go", "Window", "Help"];

  return (
    <div className="w-screen h-6 flex justify-between bg-[linear-gradient(-45deg,#6793ff,#d85e81)] backdrop-blur-sm">
      <div className="flex gap-4 text-white justify-center items-center">
        <img src={icon1} alt="" className="w-[1.15rem] h-[1.15rem] ml-4" />
        <h6 className="font-[600] text-[1vw]">Finder</h6>
        {menuItems.map((item, index) => (
          <h6 key={index} className="text-[0.85rem] font-[500]">
            {item}
          </h6>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <img src={battery} alt="" className="h-6 w-6" />
        <div className="flex flex-col gap-0">
          <img src={off} alt="" className="h-4 w-[1.15rem]" />
          <img src={on} alt="" className="h-4 w-[1.15rem] mt-[-38%]" />
        </div>
        <h6 className="text-[0.85rem] font-[200] text-white mr-4">
          {formatDateTime(currentTime)}
        </h6>
      </div>
    </div>
  );
};

export default MenuBar;
