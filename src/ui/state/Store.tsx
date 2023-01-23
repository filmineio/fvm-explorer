import { defaultState } from "./default";
import { AppState } from "./types/AppState";
import { StateChange } from "./types/transformers/StateTranformer";
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type Select = <T>(selector: (s: AppState) => T, def?: T) => T;
type Mod = (...transformers: StateChange<AppState>[]) => void;

type StoreCtx = {
  state: AppState;
  select: Select;
  mod: Mod;
};

const Context = React.createContext({} as StoreCtx);

export const useStore = (): StoreCtx => useContext(Context);

const Store = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(defaultState);

  const select: Select = useCallback(
    (selector) => {
      return selector(state);
    },
    [state]
  );

  const mod: Mod = useCallback((...transformers) => {
    setState((value) => transformers.reduce((acc, curr) => curr(acc), value));
  }, []);

  return (
    <Context.Provider value={{ state, select, mod }}>
      {children}
    </Context.Provider>
  );
};

export default Store;