import { defaultState } from "./default";
import { AppState } from "./types/AppState";
import { StateChange } from "./types/transformers/StateTranformer";
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

export type Mod = (...transformers: StateChange<AppState>[]) => void;

type StoreCtx = {
  state: AppState;
  mod: Mod;
};

const Context = React.createContext({} as StoreCtx);

export const useStore = (): StoreCtx => useContext(Context);

const Store = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(defaultState);

  const mod: Mod = useCallback((...transformers) => {
    setState((value) => transformers.reduce((acc, curr) => curr(acc), value));
  }, []);

  return <Context.Provider value={{ state, mod }}>{children}</Context.Provider>;
};

export default Store;