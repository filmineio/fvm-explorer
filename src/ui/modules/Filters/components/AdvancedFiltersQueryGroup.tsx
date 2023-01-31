import {
  AdvancedQueryFiledEditor,
  QueryEditorField,
} from "./AdvancedQueryFiledEditor";
import { Entity } from "@/enums/Entity";
import { CHMBaseOperator } from "@/schema/types/CHMFiledOperator";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { difference, lensPath, omit, set } from "ramda";
import { useCallback, useMemo, useState } from "react";

import { AdvancedFilterRule } from "@/ui/modules/Filters/components/AdvancedFilterRule";
import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields,
} from "@/ui/modules/Filters/state/state";

import { FieldQuery } from "@/types/FieldQuery";

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
  onChange: (group: FieldQuery) => void;
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
      onChange(omit([key], group));
    },
    [group]
  );

  const clear = useCallback(() => {
    update(
      defaultState(
        difference(
          [...Object.keys(group || {}), currentField.field],
          fields
        )[0] as never
      )
    );
  }, [group])

  const addRule = useCallback(() => {
    console.log(currentField);
    onChange(
      set(lensPath([currentField.field]), {
        [currentField.operator]: currentField.value,
      })(group)
    );
    clear()
  }, [group, currentField]);

  const groupRules = useMemo(() => Object.entries(group || {}), [group]);

  return (
    <div
      className={"relative p-5 border-2 border-lightgray rounded pb-8 relative"}
    >
      {removable && (
        <button
          className="box-content w-4 h-4 p-2 text-center text-white border-none bg-secect rounded-lg focus:shadow-none focus:outline-none flex justify-center items-center absolute -top-3 -right-3"
          onClick={onRemove}
        >
          <img className="w-auto" src="/images/close.png" alt={""} />
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

      {groupRules.map(([field, v]) => (
        <AdvancedFilterRule
          key={field}
          field={field}
          value={v}
          onRemove={removeRule(field)}
        />
      ))}
    </div>
  );
};