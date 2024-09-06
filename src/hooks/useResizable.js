import { useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSize } from "../redux/slices/appSlice";

const useResizable = (appName, initialWidth, initialHeight) => {
  const dispatch = useDispatch();
  const resizingRef = useRef(false);
  const initialSizeRef = useRef({ width: initialWidth, height: initialHeight });
  const initialMousePosRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e, direction) => {
      e.preventDefault();
      resizingRef.current = true;
      initialSizeRef.current = { width: initialWidth, height: initialHeight };
      initialMousePosRef.current = { x: e.clientX, y: e.clientY };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [initialWidth, initialHeight]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!resizingRef.current) return;

      const dx = e.clientX - initialMousePosRef.current.x;
      const dy = e.clientY - initialMousePosRef.current.y;

      const newWidth = Math.max(initialSizeRef.current.width + dx, 100);
      const newHeight = Math.max(initialSizeRef.current.height + dy, 100);

      dispatch(
        updateSize({ app: appName, width: newWidth, height: newHeight })
      );
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
