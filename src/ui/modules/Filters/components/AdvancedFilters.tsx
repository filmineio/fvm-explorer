import { gt, remove } from "ramda";
import { PropsWithChildren, useCallback, useMemo } from "react";

import { AdvancedFiltersQueryGroup } from "@/ui/modules/Filters/components/AdvancedFiltersQueryGroup";
import { ORMarker } from "@/ui/modules/Filters/components/ORMarker";
import { getModelQueryFields } from "@/ui/modules/Filters/state/state";

import { AdvancedFiltersState, FilterState } from "@/ui/state/types/AppState";

import { FieldQuery } from "@/types/FieldQuery";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";

import { cb } from "@/utils/cb";


export const AdvancedQueryActions = ({
  search,
  addGroup,
}: {
  search: () => void;
  addGroup: () => void;
}) => {
  return (
    <div
      className={
        "flex justify-between transform -translate-y-7 max-w-2xl w-full px-10"
      }
    >
      {/*<button className="w-52 border-2 border-yellow text-yellow uppercase rounded  bg-black px-2 py-1">*/}
      {/*  Collapse Query*/}
      {/*</button>*/}
      <span />
      <div className={"flex gap-5"}>
        <button
          className="w-52 border-2 border-yellow text-yellow uppercase bg-black rounded px-2 py-1"
          onClick={addGroup}
        >
          Add group
        </button>
        <button
          className="w-52 border-2 border-yellow bg-yellow text-gray-dark uppercase rounded px-2 py-1"
          onClick={search}
        >
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
  handleChange: (v: AdvancedFiltersState) => void;
  state: FilterState;
  onClick: () => void;
}) => {
  const model = useMemo(cb(getModel, state.filteredBy), [state.filteredBy]);
  const fields = useMemo(cb(getModelQueryFields, model.kind), [model]);

  const queryGroups = useMemo(
    () => state.advancedFilter || [],
    [state.advancedFilter]
  );

  const hasMultipleGroups = useMemo(cb(gt(1), queryGroups.length), [
    queryGroups,
  ]);

  const handleGroupChange = useCallback(
    (index: number) => (group: FieldQuery) => {
      handleChange([
        ...queryGroups.slice(0, index),
        group,
        ...queryGroups.slice(index + 1),
      ]);
    },
    [queryGroups]
  );

  const addGroup = useCallback(() => {
    handleChange([...queryGroups, []]);
  }, [queryGroups]);

  const removeGroup = useCallback(
    (index: number) => () => {
      handleChange(remove(index, 1, queryGroups));
    },
    [queryGroups]
  );

  const firstGroup = useMemo(() => queryGroups[0], [queryGroups]);

  const restOfTheGroups = useMemo(() => queryGroups.slice(1), [queryGroups]);

  return (
    <div className={"flex flex-col justify-center gap-3"}>
      <AdvancedFiltersQueryGroup
        removable={!hasMultipleGroups}
        group={firstGroup}
        onChange={handleGroupChange(0)}
        fields={fields}
        kind={model.kind as never}
        onRemove={removeGroup(0)}
      />
      {restOfTheGroups.map((group, index) => (
        <InnerGroupWrapper key={index}>
          <AdvancedFiltersQueryGroup
            removable={!hasMultipleGroups}
            group={group}
            fields={fields}
            kind={model.kind as never}
            onChange={handleGroupChange(index + 1)}
            onRemove={removeGroup(index + 1)}
          />
        </InnerGroupWrapper>
      ))}

      <AdvancedQueryActions search={onClick} addGroup={addGroup} />
    </div>
  );
};