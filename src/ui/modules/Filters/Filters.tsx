import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useCallback, useEffect, useState } from "react";

import { AdvancedFilters } from "@/ui/modules/Filters/components/AdvancedFilters";
import { FiltersHeader } from "@/ui/modules/Filters/components/FiltersHeader";
import { SearchFilters } from "@/ui/modules/Filters/components/SearchFilters";
import { getInitialFilterState } from "@/ui/modules/Filters/state/state";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useStore } from "@/ui/state/Store";
import {
  resetFiltersToQueryTransformer,
  setFiltersValueTransformer,
} from "@/ui/state/transformers/filters/setFiltersValueTransformer";
import { AdvancedFiltersState } from "@/ui/state/types/AppState";

export const Filters = ({ search }: { search: () => void }) => {
  const [advancedSearchActive, toggleAdvancedSearch] = useState(false);
  const query = useLocationQuery<NextParsedUrlQuery>();
  const {
    mod,
    state: { filters: state },
  } = useStore();

  const change = useCallback(
    (v: string | AdvancedFiltersState) => {
      console.log(v);
      mod(setFiltersValueTransformer(v));
    },
    [mod]
  );

  useEffect(() => {
    mod(resetFiltersToQueryTransformer(getInitialFilterState(query)));
  }, []);

  return (
    <div className="py-7 space-y-5 ">
      <FiltersHeader
        state={state}
        checked={advancedSearchActive}
        toggle={toggleAdvancedSearch}
        search={search}
      />
      {advancedSearchActive ? (
        <AdvancedFilters handleChange={change} state={state} onClick={search} />
      ) : (
        <SearchFilters handleChange={change} state={state} onClick={search} />
      )}
    </div>
  );
};