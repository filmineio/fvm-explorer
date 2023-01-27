import { gt } from "ramda";
import { PropsWithChildren, useMemo } from "react";

import { AdvancedFiltersQueryGroup } from "@/ui/modules/Filters/components/AdvancedFiltersQueryGroup";
import { ORMarker } from "@/ui/modules/Filters/components/ORMarker";
import { getModelQueryFields } from "@/ui/modules/Filters/state/state";

import { FilterState } from "@/ui/state/types/AppState";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";

import { cb } from "@/utils/cb";


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

export const InnerGroupWrapper = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ORMarker />
      <div className={"flex flex-col justify-center gap-3 -mt-12 relative"}>
        {children}
      </div>
    </>
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
  const model = useMemo(cb(getModel, state.filteredBy), [state.filteredBy]);
  const fields = useMemo(cb(getModelQueryFields, model.kind), [model]);

  const queryGroups = useMemo(() => state.advancedFilter || [], []);

  const hasMultipleGroups = useMemo(cb(gt(1), queryGroups.length), []);

  return (
    <div className={"flex flex-col justify-center gap-3"}>
      <AdvancedFiltersQueryGroup
        removable={hasMultipleGroups}
        group={queryGroups[0]}
        index={0}
        fields={fields}
        kind={model.kind as never}
      />
      {queryGroups.slice(1).map((group, index) => (
        <InnerGroupWrapper key={index}>
          <AdvancedFiltersQueryGroup
            removable={hasMultipleGroups}
            group={group}
            index={index}
            fields={fields}
            kind={model.kind as never}
          />
        </InnerGroupWrapper>
      ))}

      <AdvancedQueryActions />
    </div>
  );
};