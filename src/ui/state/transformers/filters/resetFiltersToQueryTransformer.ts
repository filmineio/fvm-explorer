import { isEmpty } from "ramda";
import { parse } from "yaml";

import { defaultFiltersState } from "@/ui/modules/Filters/state/state";

import { AppState, FilterState } from "@/ui/state/types/AppState";
import { StateTransformer } from "@/ui/state/types/transformers/StateTranformer";

import { fromHex } from "@/utils/hex";


export const resetFiltersToQueryTransformer: StateTransformer<
  AppState,
  FilterState & Record<"advancedFilter", string | null>
> = (d) => (s) => {
  if (isEmpty(d)) {
    return { ...s, filters: defaultFiltersState };
  }

  console.trace("d", d);

  let { advancedFilter, ...rest } = d;
  if (advancedFilter) {
    advancedFilter = parse(fromHex(advancedFilter) || "", undefined);
  }

  return { ...s, filters: { ...rest, advancedFilter } };
};