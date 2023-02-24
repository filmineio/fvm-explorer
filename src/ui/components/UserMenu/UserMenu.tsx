import { useRouter } from "next/router";
import { useCallback, useState } from "react";

import { User } from "@/ui/state/types/AppState";

import { uiCtx } from "@/ui/ctx/uiCtx";

import { cb } from "@/utils/cb";


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
      className="user flex items-center relative cursor-pointer"
      onMouseEnter={cb(setExpanded, true)}
      onMouseLeave={cb(setExpanded, false)}
    >
      <div className="py-3 h-sm px-5 font-sans1 text-yellow text-sm font-semibold focus:outline-none">
        {user?.email}
      </div>

      {expanded && (
        <div
          className={
            "absolute h-fit w-64 right-2 p-2 bg-black shadow-sm top-8 text-gray-text text-sm rounded border border-gray-dark flex flex-col gap-2 z-50"
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