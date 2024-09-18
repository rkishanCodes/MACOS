import { useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePosition, updateSize } from "../redux/slices/appSlice";

const useResizable = (
  appName,
  initialWidth,
  initialHeight,
  initialX,
  initialY
) => {
  const dispatch = useDispatch();
  const resizingRef = useRef(false);
  const directionRef = useRef(null);
  const initialSizeRef = useRef({ width: initialWidth, height: initialHeight });
  const initialPosRef = useRef({ x: initialX, y: initialY });
  const initialMousePosRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e, direction) => {
      e.preventDefault();
      resizingRef.current = true;
      directionRef.current = direction;
      initialSizeRef.current = { width: initialWidth, height: initialHeight };
      initialPosRef.current = { x: initialX, y: initialY };
      initialMousePosRef.current = { x: e.clientX, y: e.clientY };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [initialWidth, initialHeight, initialX, initialY]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!resizingRef.current) return;
      const dx = e.clientX - initialMousePosRef.current.x;
      const dy = e.clientY - initialMousePosRef.current.y;

      let newWidth = initialSizeRef.current.width;
      let newHeight = initialSizeRef.current.height;
      let newX = initialPosRef.current.x;
      let newY = initialPosRef.current.y;

      if (directionRef.current.includes("right")) {
        newWidth = Math.max(initialSizeRef.current.width + dx, 300);
      }
      if (directionRef.current.includes("bottom")) {
        newHeight = Math.max(initialSizeRef.current.height + dy, 300);
      }
      if (directionRef.current.includes("left")) {
        const widthChange = Math.min(dx, initialSizeRef.current.width - 300);
        newWidth = initialSizeRef.current.width - widthChange;
        newX = initialPosRef.current.x + widthChange;
      }
      if (directionRef.current.includes("top")) {
        const heightChange = Math.min(dy, initialSizeRef.current.height - 300);
        newHeight = initialSizeRef.current.height - heightChange;
        newY = initialPosRef.current.y + heightChange;
      }

      dispatch(
        updateSize({ app: appName, width: newWidth, height: newHeight })
      );
      dispatch(updatePosition({ app: appName, x: newX, y: newY }));
    },
    [dispatch, appName]
  );

  const handleMouseUp = useCallback(() => {
    resizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return handleMouseDown;
};

export default useResizable;
