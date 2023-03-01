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
    <li className="nav-item px-4 cursor-pointer last:pr-0" onClick={cb(toggle, tabIndex)}>
      <span
        className={classNames(
          "block nav- font-bold text-14 leading-tight border-b-2 py-2 mb-2 hover:text-blue-400 transition-all",
          {
            "text-blue-400 border-blue-400": tabIndex === activeTab,
            "text-label border-transparent": tabIndex !== activeTab,
          }
        )}
      >
        {label}
      </span>
    </li>
  );
};