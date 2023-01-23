import { useReducer } from "react";

export const useForceRender = () => {
  const [, forceRender] = useReducer((p) => p + 1, 0);

  return forceRender;
};