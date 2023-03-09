import { gt, isEmpty, isNil, remove } from "ramda";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import { AdvancedFiltersQueryGroup } from "@/ui/modules/Filters/components/AdvancedFiltersQueryGroup";
import { AdvancedQueryActions } from "@/ui/modules/Filters/components/AdvancedQueryActions";
import { ORMarker } from "@/ui/modules/Filters/components/ORMarker";
import { getModelQueryFields } from "@/ui/modules/Filters/state/getModelQueryFields";

import {
  AdvancedFiltersState,
  FilterState,
  QueryGroup,
} from "@/ui/state/types/AppState";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";

import { cb } from "@/utils/cb";

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
    (index: number) => (group: QueryGroup) => {
      handleChange([
        ...queryGroups.slice(0, index),
        group,
        ...queryGroups.slice(index + 1),
      ]);
    },
    [queryGroups]
  );

  const addGroup = useCallback(() => {
    if (
      isEmpty(queryGroups) ||
      queryGroups.some(isEmpty) ||
      queryGroups.some(isNil)
    ) {
      return toast.warn(
        "All existing query groups must have rules in order to add new group"
      );
    }
    handleChange([...queryGroups, [] as never]);
  }, [queryGroups]);

  const removeGroup = useCallback(
    (index: number) => () => {
      handleChange(remove(index, 1, queryGroups));
    },
    [queryGroups]
  );

  const search = useCallback(() => {
    if (
      isEmpty(queryGroups) ||
      queryGroups.some(isEmpty) ||
      queryGroups.some(isNil)
    ) {
      return toast.warn(
        "All query groups must have rules in order to run search"
      );
    }

    onClick();
  }, [queryGroups, onClick]);

  const firstGroup = useMemo(() => queryGroups[0], [queryGroups]);

  const restOfTheGroups = useMemo(() => queryGroups.slice(1), [queryGroups]);

  return (
    <div className="flex flex-col justify-center gap-5 mt-8">
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

      <AdvancedQueryActions search={search} addGroup={addGroup} />
    </div>
  );
};