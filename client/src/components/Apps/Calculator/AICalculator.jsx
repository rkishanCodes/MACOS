import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../ui/button";
import axios from "axios";
import Draggable from "react-draggable";
import { useSelector } from "react-redux";

export default function Home({ containerSize }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const [reset, setReset] = useState(false);
  const [dictOfVars, setDictOfVars] = useState({});
  const [result, setResult] = useState(null);
  const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
  const [latexExpression, setLatexExpression] = useState([]);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const isMobile = useSelector((state) => state.apps.isMobile);
  const isMinimize = useSelector(
    (state) => state.apps["calculator"]["minimize"]
  );

  useEffect(() => {
    if (latexExpression.length > 0 && window.MathJax) {
      setTimeout(() => {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }, 0);
    }
  }, [latexExpression]);

  useEffect(() => {
    if (result) {
      renderLatexToCanvas(result.expression, result.answer);
    }
  }, [result]);

  useEffect(() => {
    if (reset) {
      resetCanvas();
      setLatexExpression([]);
      setResult(undefined);
      setDictOfVars({});
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setCanvasSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight - 50,
        });
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
      });
    };

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        ctx.lineCap = "round";
        ctx.lineWidth = 3;
      }
    }
  }, [canvasSize]);

  useEffect(() => {
    function preventDefault(e) {
      e.preventDefault();
    }

    let supportsPassive = false;
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", {
          get: function () {
            supportsPassive = true;
          },
        })
      );
    } catch (e) {}

    const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function disableScroll() {
      window.addEventListener("DOMMouseScroll", preventDefault, false); 
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); 
      window.addEventListener("touchmove", preventDefault, wheelOpt); 
    }

    function enableScroll() {
      window.removeEventListener("DOMMouseScroll", preventDefault, false);
      window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
      window.removeEventListener("touchmove", preventDefault, wheelOpt);
    }

    if (isMobile && !isMinimize) {
      document.body.style.overflow = "hidden";
      disableScroll();
    } else {
      document.body.style.overflow = "";
      enableScroll();
    }

    return () => {
      enableScroll();
      document.body.style.overflow = "";
    };
  }, [isMobile, isMinimize]);

  const renderLatexToCanvas = (expression, answer) => {
    const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
    setLatexExpression([...latexExpression, latex]);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      setLatexPosition({ x: centerX, y: centerY });
    }
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.background = "black";
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = e.type.includes("mouse")
          ? e.clientX - rect.left
          : e.touches[0].clientX - rect.left;
        const y = e.type.includes("mouse")
          ? e.clientY - rect.top
          : e.touches[0].clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
      }
    }
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = e.type.includes("mouse")
          ? e.clientX - rect.left
          : e.touches[0].clientX - rect.left;
        const y = e.type.includes("mouse")
          ? e.clientY - rect.top
          : e.touches[0].clientY - rect.top;
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const runRoute = async () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const backendURL = import.meta.env.VITE_CAL_API;

      const response = await axios({
        method: "post",
        url: `${backendURL}/calculate`,
        data: {
          image: canvas.toDataURL("image/png"),
          dict_of_vars: dictOfVars,
        },
      });

      const resp = await response.data;
      resp.data.forEach((data) => {
        if (data.assign === true) {
          setDictOfVars({
            ...dictOfVars,
            [data.expr]: data.result,
          });
        }
      });
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let minX = canvas.width,
        minY = canvas.height,
        maxX = 0,
        maxY = 0;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          if (imageData.data[i + 3] > 0) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;

      setLatexPosition({ x: centerX, y: centerY });
      resp.data.forEach((data) => {
        setTimeout(() => {
          setResult({
            expression: data.expr,
            answer: data.result,
          });
        }, 1000);
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: containerSize.width,
        height: containerSize.height,
        overflow: "hidden",
      }}
    >
      <div className="flex justify-between items-center p-2 bg-gray-800">
        <Button
          onClick={() => setReset(true)}
          className="z-20 bg-black text-white"
          variant="default"
          color="black"
        >
          Reset
        </Button>
        <h1>Draw for Math</h1>
        <Button
          onClick={runRoute}
          className="z-20 bg-black text-white"
          variant="default"
          color="white"
        >
          Calculate
        </Button>
      </div>
      <div className="relative" style={{ height: "calc(100% - 50px)" }}>
        <canvas
          ref={canvasRef}
          id="canvas"
          className="absolute top-0 left-0 w-full h-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          willreadfrequently={"true"} 
        />

        {latexExpression &&
          latexExpression.map((latex, index) => (
            <Draggable
              key={index}
              defaultPosition={{
                x: latexPosition.x - 50, 
                y: latexPosition.y - 20, 
              }}
              onStop={(e, data) => setLatexPosition({ x: data.x, y: data.y })}
              bounds="parent"
            >
              <div className="absolute p-2 text-white rounded shadow-md">
                <div className="latex-content">{latex}</div>
              </div>
            </Draggable>
          ))}
      </div>
    </div>
  );
}
