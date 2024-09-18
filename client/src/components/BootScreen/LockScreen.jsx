import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import userLogo from "../../assets/profile.png";
import { useDispatch } from "react-redux";
import { setDesktop, setLock } from "../../redux/slices/bootSlice";

const LockScreen = () => {
  const [time, setTime] = useState(new Date());
  const inputRef = useRef(null); // Ref to access the input field directly
  const hintRef = useRef(null); // Ref to access the hint element directly
  const controls = useAnimation(); // Animation controls for the shake effect
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = () => {
    const inputElement = inputRef.current;
    const hintElement = hintRef.current;

    if (inputElement && hintElement) {
      const inputValue = inputElement.value;
      const hintText = "dev";

      const updatedHintHtml = hintText
        .split("")
        .map((letter, index) => {
          let colorClass = "text-gray-300"; // Default color for empty input

          if (inputValue[index] === letter) {
            colorClass = "text-green-500";
          } else if (
            inputValue[index] !== undefined &&
            inputValue[index] !== letter
          ) {
            colorClass = "text-red-500";
          }

          return `<span class="${colorClass}">${letter}</span>`;
        })
        .join("");

      hintElement.innerHTML = `Hint: ${updatedHintHtml}`;

      // Trigger shake animation if the input value does not match the hint
      if (inputValue !== hintText) {
        controls.start({
          x: [0, -10, 10, -10, 10, -10, 0],
          transition: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
        });
      } else {
        console.log("true");
        dispatch(setLock(false));
        dispatch(setDesktop(true));
      }
    }
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = dayNames[time.getDay()];
  const date = time.getDate();
  const month = monthNames[time.getMonth()];
  const formattedTime = `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <div
      className="w-screen h-screen bg-[url('./assets/macos-sonoma-morning.jpg')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between text-white pt-[6%] pb-[2%] "
      style={{
        fontFamily: "SF Pro Display",
      }}
    >
      <div className="text-center">
        <div className="text-[1.65rem] font-[500] opacity-65 ">
          {day}, {date} {month}
        </div>
        <div className="text-[5.5rem] font-[700] opacity-65  mt-[-10%]">
          {formattedTime}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 max-md:translate-y-[-10vw]">
        <div className="h-12 w-12 rounded-full bg-yellow-200  flex justify-center items-center">
          <img src={userLogo} alt="" className="h-7 w-7 " />
        </div>
        <p
          className="text-[0.85rem] font-[500] "
          style={{ textShadow: " black 1px 0 8px" }}
        >
          R Kishan
        </p>

        <motion.input
          type="password"
          ref={inputRef}
          className="w-32 rounded-full bg-white/20 focus:outline-none px-2 placeholder-white placeholder:text-[12px] placeholder:font-[800] placeholder:opacity-40"
          placeholder="Enter Password"
          onChange={handleChange}
          animate={controls}
        />

        <p className="text-[1rem] font-[700] text-gray-300 " ref={hintRef}>
          Hint: dev
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
