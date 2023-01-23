import classNames from "classnames";
import { ChangeEvent } from "react";

type ToggleProps = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <div className="flex justify-center mt-1">
      <div className="form-check form-switch">
        <label className="inline-flex relative items-center cursor-pointer relative">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={checked}
            onChange={onChange}
          />
          <div
            className={classNames(
              `w-11 h-6 peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all
        
              `,
              {
                "peer-checked:after:translate-x-full peer-checked:after:border-white  after:border-Grayscale-Placeholder bg-Green-500 bg-opacity-30  after:bg-Green-600":
                  checked,
                " after:border-Green-500 bg-Grayscale-Body ": !checked,
              }
            )}
          ></div>
        </label>
      </div>
    </div>
  );
};
