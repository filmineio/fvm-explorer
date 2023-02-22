import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { useMemo } from "react";

import { toHumanReadable } from "@/utils/toHumanReadable";

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
      <div className="bg-gray-dark rounded-base flex-wrap justify-end gap-5 items-center flex-row-reverse flex px-5 py-3 ">
        <div className="flex flex-wrap gap-4">
          <div className="closebut pr-3">
            <button
              type="button"
              className=" box-content w-64 py-1 font-normal px-2 text-center text-white border border-yellow text-sm font-space  rounded-base focus:shadow-none focus:outline-none"
            >
              {field}
            </button>
          </div>
          <div className="closebut pr-3">
            <button
              type="button"
              className=" box-content w-48 py-1 font-normal px-2 text-center text-analogous border border-analogous  text-sm font-space  rounded-full focus:shadow-none focus:outline-none"
            >
              {toHumanReadable(operator)}
            </button>
          </div>
          {Array.isArray(val) ? (
            val.map((v) => (
              <button
                key={v}
                type="button"
                className="box-content bg-analogous py-1 font-normal px-2 text-center text-white text-sm font-space  rounded-base focus:shadow-none focus:outline-none w-40 truncate"
              >
                {v as string}
              </button>
            ))
          ) : (
            <button
              type="button"
              className="box-content bg-analogous py-1 font-normal px-2 text-center text-white text-sm font-space  rounded-base focus:shadow-none focus:outline-none"
            >
              {val as string}
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button
            className="box-content w-4 h-4 p-2 text-center text-white border-none bg-secect rounded-base focus:shadow-none focus:outline-none flex justify-center items-center"
            onClick={onRemove}
          >
            <img className="w-auto" src="/images/close.png" alt={""} />
          </button>
        </div>
      </div>
    </div>
  );
};