import classNames from "classnames";

import { cb } from "@/utils/cb";

export const TabHeader = ({
  label,
  tabIndex,
  toggle,
  activeTab,
}: {
  label: string;
  activeTab: number;
  tabIndex: number;
  toggle: (v: number) => void;
}) => {
  return (
    <li className="nav-item px-4 cursor-pointer" onClick={cb(toggle, tabIndex)}>
      <span
        className={classNames(
          "block nav- font-bold font-roboto text-sm leading-tight border-x-0 border-t-0 border-b-2 border-transparent py-2 my-2 hover:border-transparent focus:border-transparent",
          {
            "text-yellow underline": tabIndex === activeTab,
            "text-lightgray": tabIndex !== activeTab,
          }
        )}
      >
        {label}
      </span>
    </li>
  );
};