import Button from "../Button";
import classNames from "classnames";
import React, { useReducer } from "react";

import { cb } from "@/utils/cb";

type DropdownProps<T> = {
  values: { label: string; value: T }[];
  onSelect: (v: T) => void;
  selected: T;
  triggerClass: string;
  wrapperClass?: string;
};

export const Dropdown = <T extends any>({
  values,
  selected,
  onSelect,
  triggerClass,
  wrapperClass,
}: DropdownProps<T>) => {
  const [state, toggle] = useReducer((_: boolean, a: boolean) => a, false);

  return (
    <div className={wrapperClass || "relative w-60"}>
      <Button
        className={triggerClass}
        onClick={cb(toggle, !state)}
        rightIcon={
          <svg
            className="ml-2 w-4 h-4"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        }
      >
        {values.find((v) => v.value === selected)?.label}
      </Button>
      <div
        className={classNames(
          "z-10 w-60 bg-white absolute  bg-Grayscale-Body rounded-12xl top-14",
          { hidden: !state }
        )}
      >
        <ul
          className="py-1 uppercase text-sm "
          onClick={cb(toggle, !state)}
          onMouseLeave={cb(toggle, false)}
        >
          {values.map((v) => (
            <li
              key={v.value as string}
              className="block py-2 px-4 cursor-pointer text-center"
              onClick={cb(onSelect, v.value)}
            >
              {v.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
