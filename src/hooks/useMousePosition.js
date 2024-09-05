import { useEffect, useMemo } from "react";
import { useSpring } from "@react-spring/web";

export const useMousePosition = () => {
  const [springProps, api] = useSpring(() => ({ x: 0, y: 0 }));

  useEffect(() => {
    const handleMouseMove = (event) => {
      api.start({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return useMemo(() => springProps, [springProps]);
};
