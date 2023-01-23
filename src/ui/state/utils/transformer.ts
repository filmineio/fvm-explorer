import { lensPath, set } from "ramda";

import { AppState } from "@/ui/state/types/AppState";
import { StateTransformer } from "@/ui/state/types/transformers/StateTranformer";

export const transformer =
  <T>(...path: string[]): StateTransformer<AppState, T> =>
  (d) =>
  (s) =>
    set(lensPath(path), d)(s);