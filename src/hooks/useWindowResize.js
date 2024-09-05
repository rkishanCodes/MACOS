import { useEffect } from "react";

export const useWindowResize = (callback) => {
  useEffect(() => {
    const handleResize = () => callback(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [callback]);
};
