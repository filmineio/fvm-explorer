import { defaultNetwork } from "../../filters/defaultNetwork";
import { AppState } from "./types/AppState";
import { Entity } from "@/enums/Entity";

export const DEFAULT_FILTERS = {
  advancedFilter: null,
  filterValue: "",
  filteredBy: Entity.Contract,
  network: defaultNetwork(),
  page: 1,
};

export const defaultState: AppState = {
  user: null,
  data: {
    error: "",
    loading: true,
    receivedServerData: null,
    results: {
      total: 0,
      kind: Entity.Contract,
      rows: [],
      network: defaultNetwork(),
    },
  },
  filters: {
    advancedFilter: null,
    filterValue: "",
    filteredBy: Entity.Contract,
    network: defaultNetwork(),
    page: 1,
  },
};