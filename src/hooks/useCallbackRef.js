import { useRef, useEffect, useMemo } from "react";

export const useCallbackRef = (callback) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(
    () =>
      (...args) =>
        callbackRef.current?.(...args),
    []
  );
};
