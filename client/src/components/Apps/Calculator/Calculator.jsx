import React, { useState, useRef, useEffect } from "react";
import ResizableWindow from "../ResizableWindow";
import MenuActions from "../MenuActions";
import { useDispatch, useSelector } from "react-redux";
import { selectApps, updateAppState } from "../../../redux/slices/appSlice";
import NormalCalculator from "./NormalCalculator";
import AICalculator from "./AICalculator";

const Calculator = React.memo(() => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const [showAI, setShowAI] = useState(true);
  const dispatch=useDispatch()

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    // Initial size calculation
    updateSize();

    // Create a ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <ResizableWindow appName="calculator">
      <MenuActions appName="calculator" />
      <div
        ref={containerRef}
        className="w-full h-full bg-black/65 rounded-[10px] shadow-[0_35px_40px_-15px_rgba(0,0,0,0.5)] border-[1px] border-white/30 text-white overflow-hidden"
      >
        <div className="w-full mt-12 flex justify-around items-center">
          <button
            className={`  px-4 py-2 rounded text-[1.25rem] ${
              !showAI ? "bg-orange-400" : "bg-gray-700"
            }`}
            onClick={() => {setShowAI(false);
              dispatch(
                updateAppState({
                  app: "calculator",
                  field: "width",
                  value:"321"
                })
              );
              dispatch(
                updateAppState({
                  app: "calculator",
                  field: "height",
                  value: "361",
                })
              );

            }}
          >
            Normal
          </button>
          <button
            className={`  px-4 py-2 rounded ${
              showAI ? "bg-orange-400" : "bg-gray-700"
            }`}
            onClick={() => {setShowAI(true);
              dispatch(
                updateAppState({
                  app: "calculator",
                  field: "width",
                  value: "800",
                })
              );
              dispatch(
                updateAppState({
                  app: "calculator",
                  field: "height",
                  value: "550",
                })
              );
              dispatch(
                updateAppState({
                  app: "calculator",
                  field: "y",
                  value: "25",
                })
              );
            }}
          >
            AI
          </button>
        </div>
        <div className="w-full h-[calc(100%-60px)]">
          {!showAI && <NormalCalculator containerSize={containerSize} />}
          {showAI && <AICalculator containerSize={containerSize} />}
        </div>
      </div>
    </ResizableWindow>
  );
});

export default Calculator;
