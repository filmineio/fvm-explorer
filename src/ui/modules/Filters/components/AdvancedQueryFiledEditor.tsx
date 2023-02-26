import { Entity } from "@/enums/Entity";
import { CHMFiledOperator } from "@/schema/types/CHMFiledOperator";
import { KeyboardEvent, useCallback, useEffect, useMemo } from "react";

import { FilterValue } from "@/ui/modules/Filters/components/FilterValue";
import { getQueryFieldOperators } from "@/ui/modules/Filters/state/getQueryFieldOperators";
import { InputType, getInputType } from "@/ui/modules/Filters/state/inputType";
import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields
} from "@/ui/modules/Filters/state/state";

import { cb } from "@/utils/cb";
import { toHumanReadable } from "@/utils/toHumanReadable";
import { onChange } from "@/utils/unpack";
import { CustomSelect } from "@/ui/components/Select/Select";

export type QueryEditorField = {
  value: string;
  values: string[];
  operator: CHMFiledOperator;
  field: BlockQueryFields | ContractQueryField | TransactionQueryFields;
};

export const AdvancedQueryFiledEditor = ({
  fields,
  kind,
  selectedField,
  change,
  onAdd,
  onClear,
}: {
  fields: string[];
  selectedField: QueryEditorField;
  kind: Entity.Block | Entity.Transaction | Entity.Contract;
  change: (k: keyof QueryEditorField) => (v: string) => void;
  onAdd: () => void;
  onClear: () => void;
}) => {
  const operators = useMemo(
    cb(getQueryFieldOperators, [kind, selectedField.field] as never),
    [selectedField.field]
  );

  const editorType = useMemo(cb(getInputType, selectedField.operator), [
    selectedField.operator,
  ]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") {
        return;
      }

      if (editorType === InputType.Text) {
        onAdd();
      } else {
        change("values")([
          ...selectedField.values,
          e.currentTarget.value,
        ] as never);
        change("value")("");
      }
    },
    [editorType, onAdd]
  );

  const handleAdd = useCallback(() => {
    if (editorType !== InputType.List) return onAdd();
    else if (selectedField.value) {
      change("values")([...selectedField.values, selectedField.value] as never);
      change("value")("");
    }

    onAdd();
  }, [editorType, onAdd, selectedField]);

  useEffect(() => {
    change("values")([] as never);
    change("value")("");
  }, [editorType]);

  return (
    <div className="content">
      <div className="flex mt-3 flex-wrap items-center gap-1">
        <div className="flex justify-center md:w-1/2 w-40 mr-4">
          <div className="w-40 md:w-ful">
            <CustomSelect
              value={selectedField.field}
              onChange={change("field")}
              values={fields.map((str) => ({ label: str, value: str }))}
            />
          </div>
        </div>
        <div className="flex justify-center w-1/2 w-36">
          <div className="w-30 w-full">
            <CustomSelect
              value={selectedField.operator}
              onChange={change("operator")}
              values={operators.map((str) => ({ label: toHumanReadable(str), value: str }))}
            />
          </div>
        </div>
        <div className="relative xs:max-w-full max-w-calc2 flex-1 sm:max-w-lg text-xs">
          <div className="pr-3 py-2.5 flex w-full rounded-4 bg-slate gap-5 flex-wrap">
            <div className="rounded-4 flex items-center">
              {selectedField.values.map((v) => (
                <FilterValue value={v} key={v} />
              ))}
            </div>
            <div className="flex-1">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter value..."
                  className="w-full"
                  value={selectedField.value}
                  onChange={onChange(change("value"))}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-2 xs:mt-4 sm:mt-0">
          <button
            className="btn border-2 border-blue-500 text-blue-500 hover:text-blue-400 hover:border-blue-400 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all"
            onClick={handleAdd}
          >
            ADD RULE
          </button>
        </div>
        <button
          className="btn link flex items-center text-label ml-4"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};