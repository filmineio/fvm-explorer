import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";

import { AdvancedFiltersState, AppState } from "@/ui/state/types/AppState";
import { StateTransformer } from "@/ui/state/types/transformers/StateTranformer";

import { isEnum } from "@/utils/isEnum";
import { isString } from "@/utils/isString";

export const setFiltersValueTransformer: StateTransformer<
  AppState,
  Entity | Network | AdvancedFiltersState | string
> = (v) => (s) => {
  if (isEnum(Entity, v)) {
    return {
      ...s,
      filters: {
        ...s.filters,
        filteredBy: v as Entity,
        advancedFilter: null,
        page: 1,
      },
    };
  } else if (isEnum(Network, v)) {
    return {
      ...s,
      filters: {
        ...s.filters,
        network: v as Network,
        page: 1,
      },
    };
  } else if (isString(v)) {
    return {
      ...s,
      filters: {
        ...s.filters,
        filterValue: v as string,
        advancedFilter: null,
        page: 1,
      },
    };
  }

  return {
    ...s,
    filters: {
      ...s.filters,
      advancedFilter: v as AdvancedFiltersState,
      page: 1,
    },
  };
};