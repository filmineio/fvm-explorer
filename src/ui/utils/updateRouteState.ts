import { Router } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

import { FilterState } from "@/ui/state/types/AppState";

export const updateRouteState = (
  push: Router["push"],
  filters: FilterState
) => {
  push(
    "",
    { query: filters as unknown as ParsedUrlQueryInput },
    { shallow: true }
  );
};