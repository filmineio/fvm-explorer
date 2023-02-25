import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useCallback, useEffect, useState } from "react";

import { AdvancedFilters } from "@/ui/modules/Filters/components/AdvancedFilters";
import { FiltersHeader } from "@/ui/modules/Filters/components/FiltersHeader";
import { SearchFilters } from "@/ui/modules/Filters/components/SearchFilters";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useStore } from "@/ui/state/Store";
import { setFiltersValueTransformer } from "@/ui/state/transformers/filters/setFiltersValueTransformer";
import { AdvancedFiltersState } from "@/ui/state/types/AppState";


export const Filters = ({ search }: { search: () => void }) => {
  const query = useLocationQuery<NextParsedUrlQuery>();

  const [advancedSearchActive, toggleAdvancedSearch] = useState(false);
  const {
    mod,
    state: { filters: state },
  } = useStore();

  const change = useCallback(
    (v: string | AdvancedFiltersState) => {
      mod(setFiltersValueTransformer(v));
    },
    [mod]
  );

  useEffect(() => {
    toggleAdvancedSearch(!!query.advancedFilter);
  }, []);

  return (
    <div className="pt-10 space-y-5 ">
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