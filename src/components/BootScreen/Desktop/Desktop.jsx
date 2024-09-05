import React, { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { setDesktop, setLock } from "../../../redux/slices/bootSlice";
import { useDispatch } from "react-redux";
import MenuBar from "../../MenuBar";




const Desktop = () => {
  const dispatch = useDispatch();

  const lock = () => {
    dispatch(setDesktop(false));
    dispatch(setLock(true));
  };
  return (
    <div className="h-screen w-screen bg-[url('./assets/macos-sonoma-morning.jpg')] bg-cover bg-center bg-no-repeat relative">
      <MenuBar />
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
        <Dock />
      </div>
    </div>
  );
};

export default Desktop;

// function Dock() {
//   let mouseX = useMotionValue(Infinity);

//   return (
//     <motion.div
//       onMouseMove={(e) => mouseX.set(e.pageX)}
//       onMouseLeave={() => mouseX.set(Infinity)}
//       className="mx-auto flex h-20 items-center gap-4 rounded-2xl bg-gray-700 px-4 pb-3"
//     >
//       {[...Array(8).keys()].map((i) => (
//         <AppIcon mouseX={mouseX} key={i} />
//       ))}
//     </motion.div>
//   );
// }
// function AppIcon({ mouseX }) {
//   const ref = useRef(null);

//   const distance = useTransform(mouseX, (val) => {
//     const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
//     return val - bounds.x - bounds.width / 2;
//   });

//   const widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
//   const width = useSpring(widthSync, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   });

//   return (
//     <motion.div
//       ref={ref}
//       style={{ width }}
//       className="aspect-square w-10 rounded-full bg-gray-400"
//     />
//   );
// }




// const dockVariants = {
//   hidden: { y: "100%", opacity: 0 },
//   visible: { y: "0%", opacity: 1 },
// };

// const iconVariants = {
//   hover: { scale: 1.2, y: -10 },
//   rest: { scale: 1, y: 0 },
// };

// const Dock = () => {
//   return (
//     <motion.div
//       className="fixed bottom-0 left-0 right-0 bg-gray-800 p-2 flex justify-around items-center border-t border-gray-600"
//       variants={dockVariants}
//       initial="hidden"
//       animate="visible"
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div
//         className="text-white flex flex-col items-center"
//         variants={iconVariants}
//         whileHover="hover"
//         initial="rest"
//       >
//         <div className="bg-blue-500 p-3 rounded-full">A</div>
//         <span className="mt-1 text-xs">App 1</span>
//       </motion.div>
//       <motion.div
//         className="text-white flex flex-col items-center"
//         variants={iconVariants}
//         whileHover="hover"
//         initial="rest"
//       >
//         <div className="bg-green-500 p-3 rounded-full">B</div>
//         <span className="mt-1 text-xs">App 2</span>
//       </motion.div>
//       {/* Add more icons as needed */}
//     </motion.div>
//   );
// };


function Dock() {
  const mouseX = useMotionValue(0);
  const icons = ["App1", "App2", "App3", "App4"]; // Example icons

  return (
    <div className="flex justify-center items-center h-20 bg-gray-800">
      {icons.map((icon, index) => {
        const width = useTransform(mouseX, (val) => {
          const distance = Math.abs(val - index * 100); // Assuming each icon is 100px apart
          return Math.max(40, 100 - distance / 2); // Scale down based on distance
        });

        return (
          <motion.div
            key={icon}
            style={{ width }}
            className="h-10 bg-blue-500 mx-2 rounded-full"
            onMouseMove={(e) => mouseX.set(e.clientX)}
          >
            {icon}
          </motion.div>
        );
      })}
    </div>
  );
}