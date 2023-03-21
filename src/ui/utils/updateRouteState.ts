import { Router } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

import { FilterState } from "@/ui/state/types/AppState";
import { Network } from "@/enums/Network";

export const updateRouteState = (
  push: Router["push"],
  filters: FilterState,
) => {
  // push("/explore");
  console.log('filters', filters);
  push(
    "/explore",
    { query: filters as unknown as ParsedUrlQueryInput },
    { shallow: true }
  );
};

export const updateRouteStateSameRoute = (
  push: Router["push"],
  filters: { network: Network },
) => {
  push(
    "/",
    { query: filters as unknown as ParsedUrlQueryInput },
    { shallow: true }
  );
};