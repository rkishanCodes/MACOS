import { useCallback } from "react";

export const useCapitalizeFirstLetter = () => {
  return useCallback((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }, []);
};
