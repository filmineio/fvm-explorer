import { Entity } from "@/enums/Entity";
import {
  CHMBaseOperator,
  CHMFiledOperator,
} from "@/schema/types/CHMFiledOperator";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { lensPath, set } from "ramda";
import { useCallback, useMemo, useState } from "react";

import { AdvancedFilterRule } from "@/ui/modules/Filters/components/AdvancedFilterRule";
import { FilterValue } from "@/ui/modules/Filters/components/FilterValue";
import { RemoveBtn } from "@/ui/modules/Filters/components/RemoveBtn";
import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields,
  getQueryFieldOperators,
} from "@/ui/modules/Filters/state/state";

import { cb } from "@/utils/cb";
import { toHumanReadable } from "@/utils/toHumanReadable";
import { onChange } from "@/utils/unpack";

export const AdvancedQueryFiledEditor = ({
  fields,
  kind,
  selectedField,
  change,
}: {
  fields: string[];
  selectedField: QueryEditorField;
  kind: Entity.Block | Entity.Transaction | Entity.Contract;
  change: (k: keyof QueryEditorField) => (v: string) => void;
}) => {
  const operators = useMemo(
    cb(getQueryFieldOperators, [kind, selectedField] as never),
    []
  );

  return (
    <div className="content">
      <div className="flex mt-3 flex-wrap gap-1">
        <div className="flex justify-center pr-2 md:w-1/2 w-40">
          <div className="mb-3 w-40 md:w-ful">
            <select
              className="form-select appearance-none block w-full px-3 py-3 text-lightgray font-normal bg-gray-dark bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out outline-none m-0 font-mono1 text-sm	 focus:text-white focus:bg-gray-dark  focus:outline-none"
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
              className="form-select appearance-none block w-full px-3 py-3 font-normal text-white bg-gray-dark bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out outline-none m-0 font-mono1 text-sm	 focus:text-white focus:bg-gray-dark  focus:outline-none"
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
          <div className="px-3 py-2.5  w-full rounded-lg bg-gray-dark flex gap-5 flex-wrap">
            <div className="rounded-md flex items-center">
              {/*<FilterValue />*/}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter value..."
                className="bg-gray-dark text-white w-full border-0 focus:border-0 focus:outline-none focus:ring-0 py-1 px-0 font-mono1 text-sm transform translate-y-0.5"
                value={selectedField.value}
                onChange={onChange(change("value"))}
              />
            </div>
          </div>
        </div>
        <div className="ml-2 xs:mt-4 sm:mt-0">
          <button className="rounded-lg border-2 border-yellow text-yellow text-xs font-sans1 font-bold py-3 px-6">
            ADD RULE
          </button>
        </div>
        <RemoveBtn />
      </div>
    </div>
  );
};

export type QueryEditorField = {
  value: string;
  values: string[];
  operator: CHMFiledOperator;
  field: BlockQueryFields | ContractQueryField | TransactionQueryFields;
};

const defaultState: (
  f: BlockQueryFields | ContractQueryField | TransactionQueryFields
) => QueryEditorField = (
  f: BlockQueryFields | ContractQueryField | TransactionQueryFields
) => ({
  value: "",
  values: [],
  operator: CHMBaseOperator.Is,
  field: f,
});

export const AdvancedFiltersQueryGroup = ({
  removable,
  group,
  index,
  fields,
  kind,
}: {
  removable: boolean;
  group: Record<string, CHMFieldQuery>;
  index: number;
  fields: string[];
  kind: Entity.Block | Entity.Transaction | Entity.Contract;
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

  return (
    <div
      className={"relative p-5 border-2 border-lightgray rounded pb-8 relative"}
    >
      {removable && (
        <button className="box-content w-4 h-4 p-2 text-center text-white border-none  bg-secect rounded-lg focus:shadow-none focus:outline-none flex justify-center items-center absolute -top-3 -right-3">
          <img className="w-auto" src="/images/close.png" alt={""} />
        </button>
      )}

      <AdvancedQueryFiledEditor
        fields={fields}
        selectedField={currentField}
        kind={kind}
        change={change}
      />

      <AdvancedFilterRule />
    </div>
  );
};
