import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { User } from "@/ui/state/types/AppState";

import { uiCtx } from "@/ui/ctx/uiCtx";

import { cb } from "@/utils/cb";
import ArrowChevronDown from "@/ui/components/Common/Icons/ArrowChevronDown";


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

  return (
    <div
      className="flex items-center relative cursor-pointer relative"
      onMouseEnter={cb(setExpanded, true)}
      onMouseLeave={cb(setExpanded, false)}
    >
      <div className="py-4 text-white font-14 focus:outline-none flex items-center gap-4 mr-6">
        {user && <div className="w-8 h-8 flex items-center justify-center bg-purple rounded-40">{user.email?.charAt(0).toUpperCase()}</div>}
        {user?.email}
        {user && <ArrowChevronDown />}
      </div>

      {expanded && (
        <div
          className={
            "absolute h-fit w-64 right-2 p-2 bg-black top-[100%] text-gray-text text-14 rounded border border-gray-dark flex flex-col gap-2 z-50"
          }
        >
          <div
            className={"cursor-pointer hover:text-yellow mt-2"}
            onClick={cb(push, "/me/projects")}
          >
            My Projects
          </div>
          <div
            className={"cursor-pointer hover:text-yellow"}
            onClick={cb(push, "/me/queries")}
          >
            My Queries
          </div>
          <div
            className={
              "cursor-pointer hover:text-yellow border-t border-t-gray-dark mt-2 pt-1 text-yellow"
            }
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};