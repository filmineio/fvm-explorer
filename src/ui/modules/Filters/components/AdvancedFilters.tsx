import { useMemo } from "react";

import { AdvancedFiltersQueryGroup } from "@/ui/modules/Filters/components/AdvancedFiltersQueryGroup";

import { FilterState } from "@/ui/state/types/AppState";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";


export const ORMarker = () => {
  return (
    <div
      className={
        "flex items-center justify-center  w-full  mx-auto transform -translate-y-6 z-20"
      }
    >
      <div
        className={
          "border-2 border-lightgray bg-black text-gray-text w-20 h-10 bg-black flex items-center justify-center"
        }
      >
        OR
      </div>
    </div>
  );
};

export const AdvancedQueryActions = () => {
  return (
    <div
      className={
        "flex justify-between transform -translate-y-7 max-w-2xl w-full px-10"
      }
    >
      <button className="w-52 border-2 border-yellow text-yellow uppercase rounded  bg-black px-2 py-1">
        Collapse Query
      </button>
      <div className={"flex gap-5"}>
        <button className="w-52 border-2 border-yellow text-yellow uppercase bg-black rounded px-2 py-1">
          Add group
        </button>
        <button className="w-52 border-2 border-yellow bg-yellow text-gray-dark uppercase rounded px-2 py-1">
          Search
        </button>
      </div>
    </div>
  );
};

export const AdvancedFilters = ({
                                  handleChange,
                                  state,
                                  onClick,
                                }: {
  handleChange: (v: string) => void;
  state: FilterState;
  onClick: () => void;
}) => {
  const model = useMemo(() => {
    return getModel(state.filteredBy);
  }, [state.filteredBy]);


  console.log(model);

  return (
    <div className={"flex flex-col justify-center gap-3"}>
      <AdvancedFiltersQueryGroup />
      <ORMarker />
      <div className={"flex flex-col justify-center gap-3 -mt-12 relative"}>
        <AdvancedFiltersQueryGroup />
      </div>
      <AdvancedQueryActions />
    </div>
  );
};