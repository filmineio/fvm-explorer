import {
  AdvancedQueryFiledEditor,
  QueryEditorField,
} from "./AdvancedQueryFiledEditor";
import { Entity } from "@/enums/Entity";
import { CHMBaseOperator } from "@/schema/types/CHMFiledOperator";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { isEmpty, lensPath, omit, set } from "ramda";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { AdvancedFilterRule } from "@/ui/modules/Filters/components/AdvancedFilterRule";
import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields,
} from "@/ui/modules/Filters/state/state";

import { QueryGroup } from "@/ui/state/types/AppState";
import Garbage from "@/ui/components/Common/Icons/Garbage";


const defaultState: (
  f: BlockQueryFields | ContractQueryField | TransactionQueryFields
) => QueryEditorField = (f) => ({
  value: "",
  values: [],
  operator: CHMBaseOperator.Is,
  field: f,
});

export const AdvancedFiltersQueryGroup = ({
  removable,
  group,
  fields,
  kind,
  onChange,
  onRemove,
}: {
  removable: boolean;
  group: Record<string, CHMFieldQuery>;
  fields: string[];
  kind: Entity.Block | Entity.Transaction | Entity.Contract;
  onChange: (group: QueryGroup) => void;
  onRemove: () => void;
}) => {
  const [currentField, update] = useState<QueryEditorField>(
    defaultState(fields[0] as never)
  );

  const change = useCallback(
    (k: keyof QueryEditorField) => (v: string) => {
      update((p) => set(lensPath([k]), v)(p));
    },
    []
  );

  const removeRule = useCallback(
    (key: string) => () => {
      onChange(omit([key], group) as never);
    },
    [group]
  );

  const clear = useCallback(() => {
    update(defaultState(fields[0] as never));
  }, [group]);

  const addRule = useCallback(() => {
    if (!currentField.value && isEmpty(currentField.values)) {
      return toast.warn("Filter Value is required in order to Add Rule");
    }
    if (!currentField.field) {
      return toast.warn("Filter Field is required in order to Add Rule");
    }
    onChange(
      set(lensPath([currentField.field]), {
        [currentField.operator]: isEmpty(currentField.values)
          ? currentField.value
          : currentField.values,
      })(group)
    );
    clear();
  }, [group, currentField]);

  const groupRules = useMemo(() => Object.entries(group || {}), [group]);

  return (
    <div
      className={"relative p-5 border-[3px] border-label rounded-3 pb-8 relative"}
    >
      {removable && (
        <button
          className="bg-body rounded-3 flex items-center justify-center w-8 h-8 absolute top-[-18px] right-[-18px]"
          onClick={onRemove}
        >
          <Garbage />
        </button>
      )}

      <AdvancedQueryFiledEditor
        fields={fields}
        selectedField={currentField}
        kind={kind}
        change={change}
        onAdd={addRule}
        onClear={clear}
      />

      <div className={"flex flex-col gap-3 pt-4"}>
        {groupRules.map(([field, v]) => (
          <AdvancedFilterRule
            key={field}
            field={field}
            value={v}
            onRemove={removeRule(field)}
          />
        ))}
      </div>
    </div>
  );
};