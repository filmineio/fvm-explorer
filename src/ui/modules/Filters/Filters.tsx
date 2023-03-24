import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useCallback, useEffect, useState } from "react";

import { AdvancedFilters } from "@/ui/modules/Filters/components/AdvancedFilters";
import { FiltersHeader } from "@/ui/modules/Filters/components/FiltersHeader";
import { SearchFilters } from "@/ui/modules/Filters/components/SearchFilters";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useStore } from "@/ui/state/Store";
import { setFiltersValueTransformer } from "@/ui/state/transformers/filters/setFiltersValueTransformer";
import { AdvancedFiltersState } from "@/ui/state/types/AppState";
import Button from "@/ui/components/Button";
import Link from "next/link";
import router from "next/router";
import { updateRouteState } from "@/ui/utils/updateRouteState";
import { DEFAULT_FILTERS } from "@/ui/state/default";


export const Filters = ({ search, showOnlyNetwork = false }: {
  search: () => void,
  showOnlyNetwork?: boolean;
}) => {
  const query = useLocationQuery<NextParsedUrlQuery>();

  const [searchSelectionActive, setSearchSelectionActive] = useState(false);
  const [advancedSearchActive, setAdvancedSearchActive] = useState(false);
  const [init, setInit] = useState(true);
  const {
    mod,
    state: { user, filters: state },
  } = useStore();

  const change = useCallback(
    (v: string | AdvancedFiltersState) => {
      mod(setFiltersValueTransformer(v));
    },
    [mod]
  );

  const existingAdvancedFilters = !!query.advancedFilter;

  useEffect(() => {
    setSearchSelectionActive(existingAdvancedFilters);
    setAdvancedSearchActive(existingAdvancedFilters);
    setInit(false);
  }, []);

  useEffect(() => {
    if (!init && !searchSelectionActive) {
      setAdvancedSearchActive(false);

      if (existingAdvancedFilters) {
        updateRouteState(router.push, { ...DEFAULT_FILTERS, network: state.network, filteredBy: state.filteredBy});
      }
    }
  }, [searchSelectionActive]);

  const toggleAdvancedSearchActive = () => {
    setAdvancedSearchActive(prevState => !prevState);
  };

  if (showOnlyNetwork) {
    return (
      <FiltersHeader
        state={state}
        checked={searchSelectionActive}
        toggle={setSearchSelectionActive}
        search={search}
        showOnlyNetwork
      />
    )
  }

  return (
    <div className="pt-5 mt-5">
      <FiltersHeader
        state={state}
        checked={searchSelectionActive}
        toggle={setSearchSelectionActive}
        search={search}
      />
      {searchSelectionActive ? (
        advancedSearchActive ? (
          <AdvancedFilters handleChange={change} state={state} onClick={search} />
        ) : (
          <div className="flex gap-5 items-center justify-center p-11 border-2 border-label rounded-6 mt-6 mb-8">
            <Button className="btn border-2 bg-blue-500 border-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all" onClick={toggleAdvancedSearchActive}>QUERY BUILDER</Button>
            {user ? (
              <Link href="/me/queries">
                <Button className="btn border-2 bg-slate border-blue-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all">GRAPHQL SEARCH</Button>
              </Link>
              ) : (
              <Link href="/auth?redirect=queries">
                <Button className="btn border-2 bg-slate border-blue-400 text-blue-400 hover:text-blue-500 hover:border-blue-500 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all">GRAPHQL SEARCH</Button>
              </Link>
            )}
          </div>
      )) : (
        <SearchFilters handleChange={change} state={state} onClick={search} />
      )}
    </div>
  );
};