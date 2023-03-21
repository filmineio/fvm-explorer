import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { User } from "@/ui/state/types/AppState";

import { uiCtx } from "@/ui/ctx/uiCtx";

import { cb } from "@/utils/cb";
import ArrowChevronDown from "@/ui/components/Common/Icons/ArrowChevronDown";
import classNames from "classnames";


export const UserMenu = ({ user }: { user: User }) => {
  const [expanded, setExpanded] = useState(false);
  const { push } = useRouter();

  const logout = useCallback(() => {
    uiCtx
      .auth()
      .user.logout()
      .then(() => {
        localStorage.clear();
        window.location.href = "/";
      });
  }, []);

  const [selected, setSelected] = useState(0);

  return (
    <div
      className="flex items-center relative cursor-pointer relative"
      onMouseEnter={cb(setExpanded, true)}
      onMouseLeave={cb(setExpanded, false)}
    >
      <div className="text-white text-14 focus:outline-none flex items-center gap-3">
        {user && <div className="flex w-8 h-8 rounded-40 bg-purple items-center justify-center text-white text-16 font-bold leading-normal">{user.email?.charAt(0).toUpperCase()}</div>}
        {user?.email}
        {user && <ArrowChevronDown />}
      </div>

      {expanded && (
        <div className="flex absolute flex-col z-50 bg-slate py-2 h-fit w-64 right-6 top-16 text-label text-14 font-semibold rounded-9 shadow-dropdown">
          <div
            className="relative px-4 py-4 cursor-pointer hover:text-blue-400 hover:bg-body"
            onMouseEnter={() => setSelected(1)}
            onMouseLeave={() => setSelected(0)}
            onClick={cb(push, "/me/projects")}
          >
            <div className={classNames("absolute inline-block top-0 left-0 h-full w-[3px] rounded-0330", {"bg-blue-400": selected === 1})}/>
            <span>My projects</span>
          </div>
          <div
            className="relative px-4 py-4 cursor-pointer hover:text-blue-400 hover:bg-body"
            onMouseEnter={() => setSelected(2)}
            onMouseLeave={() => setSelected(0)}
            onClick={cb(push, "/me/queries")}
          >
            <div className={classNames("absolute inline-block top-0 left-0 h-full w-[3px] rounded-0330", {"bg-blue-400": selected === 2})}></div>
            <span>My queries</span>
          </div>
          <div
            className="relative px-4 py-4 cursor-pointer hover:text-blue-400 hover:bg-body"
            onMouseEnter={() => setSelected(3)}
            onMouseLeave={() => setSelected(0)}
            onClick={logout}
          >
            <div className={classNames("absolute inline-block top-0 left-0 h-full w-[3px] rounded-0330", {"bg-blue-400": selected === 3})}></div>
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};