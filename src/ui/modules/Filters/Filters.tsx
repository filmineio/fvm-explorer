import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useCallback, useEffect, useState } from "react";

import Input from "@/ui/components/Input/Input";
import Modal from "@/ui/components/Modal/Modal";

import { AdvancedFilters } from "@/ui/modules/Filters/components/AdvancedFilters";
import { FilterActionButton } from "@/ui/modules/Filters/components/FilterActionButton";
import { GhostSelect } from "@/ui/modules/Filters/components/GhostSelect";
import {
  availableFilters,
  availableNetworks,
  getInitialFilterState,
} from "@/ui/modules/Filters/state/state";

import { useLocationQuery } from "@/ui/hooks/useLocationQuery";

import { useStore } from "@/ui/state/Store";
import {
  resetFiltersToQueryTransformer,
  setFiltersValueTransformer,
} from "@/ui/state/transformers/filters/setFiltersValueTransformer";

export const Filters = ({ search }: { search: () => void }) => {
  const [advancedSearchActive, _toggleAdvancedSearchld] = useState(false);
  const query = useLocationQuery<NextParsedUrlQuery>();
  const {
    mod,
    state: { filters: state },
  } = useStore();

  const change = useCallback(
    (v: string) => mod(setFiltersValueTransformer(v)),
    [mod]
  );

  useEffect(() => {
    mod(resetFiltersToQueryTransformer(getInitialFilterState(query)));
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center max-w-lg gap-24 md:gap-0 w-full">
        <div className="flex-1 bg-gray-dark rounded-lg px-3 py-2">
          <div className="flex justify-center">
            <div className="w-full">
              <div className="input-group relative flex md:flex-wrap gap-4 items-stretch w-full rounded">
                <Input
                  className="xl:w-96 form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-medium font-mono1 text-white bg-gray-dark rounded transition ease-in-out m-0 focus:text-white focus:border-0 focus:outline-none outline-none"
                  placeholder="Search"
                  handleChange={change}
                  value={state.filterValue}
                />
                <div className="flex items-center gap-4">
                  <div className=" inset-y-0 right-0 flex items-center static inset-auto sm:ml-6 sm:pr-0">
                    <GhostSelect
                      value={state.filteredBy}
                      onChange={change}
                      values={availableFilters}
                    />
                  </div>
                  <div className="inset-y-0 right-0 flex items-center static inset-auto sm:ml-6 sm:mr-6 sm:pr-0 gap-6">
                    <GhostSelect
                      value={state.network}
                      onChange={change}
                      values={availableNetworks}
                    />
                  </div>
                  <div className="border-r-2 border-r-slate-600  mr-2 h-5"></div>
                </div>
                <FilterActionButton onClick={search} />
              </div>
            </div>
          </div>
        </div>
        <div className={"w-2/12 md:w-full sm:w-full"}>
          <span
            className={
              "font-sans1 text-gray text-sm font-bold leading-6 cursor-not-allowed"
            }
          >
            Advanced search
          </span>
        </div>
      </div>
      {advancedSearchActive && (
        <Modal>
          <AdvancedFilters />
        </Modal>
      )}
    </>
  );
};