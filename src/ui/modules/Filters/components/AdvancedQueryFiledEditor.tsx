import { Entity } from "@/enums/Entity";
import { CHMFiledOperator } from "@/schema/types/CHMFiledOperator";
import { KeyboardEvent, useCallback, useEffect, useMemo } from "react";

import { FilterValue } from "@/ui/modules/Filters/components/FilterValue";
import { RemoveBtn } from "@/ui/modules/Filters/components/RemoveBtn";
import { getQueryFieldOperators } from "@/ui/modules/Filters/state/getQueryFieldOperators";
import { InputType, getInputType } from "@/ui/modules/Filters/state/inputType";
import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields,
} from "@/ui/modules/Filters/state/state";

import { cb } from "@/utils/cb";
import { toHumanReadable } from "@/utils/toHumanReadable";
import { onChange } from "@/utils/unpack";

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
      <div className="flex mt-3 flex-wrap gap-1">
        <div className="flex justify-center pr-2 md:w-1/2 w-40">
          <div className="mb-3 w-40 md:w-ful">
            <select
              className="form-select appearance-none block w-full px-3 py-3 text-lightgray font-normal bg-gray-dark bg-clip-padding bg-no-repeat rounded-base transition ease-in-out outline-none m-0 font-space text-sm	 focus:text-white focus:bg-gray-dark  focus:outline-none"
              value={selectedField.field}
              onChange={onChange(change("field"))}
            >
              {fields.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-center w-1/2 w-40 pr-2">
          <div className="mb-3 w-30 w-full">
            <select
              className="form-select appearance-none block w-full px-3 py-3 font-normal text-white bg-gray-dark bg-clip-padding bg-no-repeat rounded-base transition ease-in-out outline-none m-0 font-space text-sm	 focus:text-white focus:bg-gray-dark  focus:outline-none"
              value={selectedField.operator}
              onChange={onChange(change("operator"))}
            >
              {operators.map((o) => (
                <option key={o} value={o}>
                  {toHumanReadable(o)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="relative xs:max-w-full max-w-calc2 flex-1 sm:max-w-lg text-xs">
          <div className="px-3 py-2.5 flex w-full rounded-base bg-gray-dark gap-5 flex-wrap">
            <div className="rounded-base flex items-center">
              {selectedField.values.map((v) => (
                <FilterValue value={v} key={v} />
              ))}
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Enter value..."
                className="bg-gray-dark text-white w-full border-0 focus:border-0 focus:outline-none focus:ring-0 py-1 px-0 font-space text-sm transform translate-y-0.5 flex-1"
                value={selectedField.value}
                onChange={onChange(change("value"))}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
        </div>
        <div className="ml-2 xs:mt-4 sm:mt-0">
          <button
            className="rounded-base border-2 border-yellow text-yellow text-xs font-roboto font-bold py-3 px-6"
            onClick={handleAdd}
          >
            ADD RULE
          </button>
        </div>
        <RemoveBtn onClick={onClear} />
      </div>
    </div>
  );
};