import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

import { FilterState } from "@/ui/state/types/AppState";

import { capitalize } from "@/utils/capitalize";
import { isEnum } from "@/utils/isEnum";

export const defaultFiltersState: FilterState = {
  advancedFilter: null,
  filterValue: "",
  filteredBy: Entity.Contract,
  network: Network.Wallaby,
  page: 1,
};

export const getInitialFilterState = (
  query: NextParsedUrlQuery
): FilterState => {
  if (isEnum(Entity, query.filteredBy)) {
    return {
      ...defaultFiltersState,
      filterValue: query.filterValue || "",
      filteredBy: query.filteredBy,
      network: query.network || Network.Wallaby,
    } as FilterState;
  }

  return defaultFiltersState;
};

export const getFilterLabel = (value: Entity) => {
  return `${capitalize(value)}s`;
};

export const AVAILABLE_FILTERS = [
  Entity.Project,
  Entity.Contract,
  Entity.Block,
  Entity.Transaction,
];

export const AVAILABLE_NETWORKS = [Network.Wallaby, Network.HyperSpace];

export const availableFilters = AVAILABLE_FILTERS.map((value) => ({
  value,
  label: getFilterLabel(value),
}));
export const availableNetworks = AVAILABLE_NETWORKS.map((value) => ({
  value,
  label: capitalize(value),
}));