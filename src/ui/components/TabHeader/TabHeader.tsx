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
          "block nav- font-bold text-14 leading-tight border-x-0 border-t-0 border-b-2 border-transparent py-2 mb-2 hover:border-transparent focus:border-transparent",
          {
            "text-blue-400 underline": tabIndex === activeTab,
            "text-label": tabIndex !== activeTab,
          }
        )}
      >
        {label}
      </span>
    </li>
  );
};