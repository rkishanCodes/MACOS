import React, { useState, memo } from "react";
import {
  Wifi,
  Bluetooth,
  Rss,
  Moon,
  Sun,
  Monitor,
  Play,
  Pause,
  Volume,
  Volume2,
} from "react-feather";
import SliderDemo from "./Slider"; 
const ControlCentre = memo(() => {
  const [connections, setConnections] = useState([
    { icon: Wifi, name: "Wi-Fi", status: "Home", off: "off", active: true },
    { icon: Bluetooth, name: "Bluetooth", active: false },
    {
      icon: Rss,
      name: "AirDrop",
      status: "Contacts Only",
      off: "off",
      active: true,
    },
  ]);

  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [displayValue, setDisplayValue] = useState(55);
  const [soundValue, setSoundValue] = useState(55);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleActive = (index) => {
    setConnections((prevConnections) => {
      const newConnections = [...prevConnections];
      newConnections[index].active = !newConnections[index].active;
      return newConnections;
    });
  };

  const ConnectionModule = memo(() => (
    <div className="bg-black text-white bg-opacity-40 rounded-lg p-4 grid grid-rows-3 gap-4">
      {connections.map((connection, index) => (
        <div key={index} className="flex items-center">
          <button
            onClick={() => toggleActive(index)}
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              connection.active
                ? "bg-blue-500 text-white"
                : "bg-black bg-opacity-10 text-white"
            }`}
          >
            <connection.icon size={20} />
          </button>
          <div>
            <p className="font-medium">{connection.name}</p>
            {connection.status && (
              <p className="text-sm opacity-60">
                {!connection.active && connection.off
                  ? connection.off
                  : connection.status}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  ));

  const DoNotDisturb = memo(() => (
    <div className="bg-black text-white bg-opacity-40 rounded-lg p-4 flex items-center">
      <button
        onClick={() => setDoNotDisturb(!doNotDisturb)}
        className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
          doNotDisturb
            ? "bg-blue-500 text-white"
            : "bg-black bg-opacity-10 text-white"
        }`}
      >
        <Moon size={20} />
      </button>
      <p className="leading-tight">
        Do Not
        <br />
        Disturb
      </p>
    </div>
  ));

 const FullWidthSlider = memo(({ text, icon: Icon, value, setValue }) => (
   <div className="bg-black bg-opacity-30 rounded-lg p-4">
     <p className="text-white mb-4">{text}</p>
     <SliderDemo
       value={value}
       onChange={setValue}
       icon={Icon}
       className="w-full"
     />
   </div>
 ));
  const MusicModule = memo(() => (
    <div className="bg-black text-white bg-opacity-40 rounded-lg p-4 flex items-center">
      <img
        src="https://c.saavncdn.com/544/Badass-From-Leo-Tamil-2023-20230928162246-150x150.jpg"
        alt="cover art"
        className="w-16 h-16 rounded mr-6"
      />
      <div className="flex-grow">
        <h4 className="font-medium">LEO</h4>
        <p className="text-sm opacity-60">BADASS </p>
      </div>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-transparent"
      >
        {isPlaying ? <Pause size={30} /> : <Play size={30} />}
      </button>
    </div>
  ));

  return (
    <div className="bg-black bg-opacity-20 rounded-lg w-[500px] p-4 grid gap-4 scale-[0.85]">
      <div className="grid grid-cols-2 gap-4">
        <ConnectionModule />
        <div className="grid gap-4">
          <DoNotDisturb />
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black text-white bg-opacity-40 rounded-lg p-4 flex flex-col items-center justify-center">
              <Sun size={20} />
              <p className="mt-2 text-xs text-center">Keyboard Brightness</p>
            </div>
            <div className="bg-black text-white bg-opacity-40 rounded-lg p-4 flex flex-col items-center justify-center">
              <Monitor size={20} />
              <p className="mt-2 text-xs text-center">Airplay Display</p>
            </div>
          </div>
        </div>
      </div>
      <FullWidthSlider
        text="Display"
        icon={Sun}
        value={displayValue}
        setValue={setDisplayValue}
      />
      <FullWidthSlider
        text="Sound"
        icon={Volume2}
        value={soundValue}
        setValue={setSoundValue}
      />
      <MusicModule />
    </div>
  );
});

export default ControlCentre;
