import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { useMemo } from "react";

import { toHumanReadable } from "@/utils/toHumanReadable";
import X from "@/ui/components/Common/Icons/X";

export const AdvancedFilterRule = ({
  field,
  value,
  onRemove,
}: {
  field: string;
  value: CHMFieldQuery;
  onRemove: () => void;
}) => {
  const [operator, val]: [string, unknown] = useMemo(
    () => Object.entries(value)[0],
    [value]
  );

  return (
    <div>
      <div className="bg-body_opacity-50 flex-wrap justify-end gap-4 items-center flex-row-reverse flex px-5 py-5 rounded-3">
        <div className="flex flex-wrap gap-4">
          <div>
            <button
              type="button"
              className="box-content px-3 py-1.5 font-normal px-2 text-center text-white border border-blue-400 text-14 uppercase rounded-4 focus:shadow-none focus:outline-none"
            >
              {field}
            </button>
          </div>
          <div>
            <button
              type="button"
              className="box-content px-3 py-1.5 font-normal px-2 text-center text-purple border border-purple text-14 font-space rounded-40 focus:shadow-none focus:outline-none"
            >
              {toHumanReadable(operator)}
            </button>
          </div>
          {Array.isArray(val) ? (
            val.map((v) => (
              <button
                key={v}
                type="button"
                className="box-content px-3 py-1.5 font-normal px-2 text-center text-white bg-pink border border-pink text-14 uppercase rounded-3 focus:shadow-none focus:outline-none"
              >
                {v as string}
              </button>
            ))
          ) : (
            <button
              type="button"
              className="box-content px-3 py-1.5 font-normal px-2 text-center text-white bg-pink border border-pink text-14 uppercase rounded-3 focus:shadow-none focus:outline-none"
            >
              {val as string}
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button
            className="bg-body rounded-3 flex items-center justify-center w-8 h-8 border border-transparent hover:border-label active:bg-label transition-all"
            onClick={onRemove}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <X />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};