import Link from "next/link";
import Router from "next/router";
import { FC } from "react";

import Button from "@/ui/components/Button";

import { useStore } from "@/ui/state/Store";

import { cb } from "@/utils/cb";


export const Header: FC = () => {
  const {
    state: { user },
  } = useStore();

  return (
    <header className="px-8 py-4 border-b border-gray-dark">
      <div className="flex flex-row justify-between items-center m-auto">
        <div className="md:basis-1/2">
          <Link href="/">
            <img
              src="/images/logomain.png"
              className="h-31 w-155"
              alt={"filexplore"}
            />
          </Link>
        </div>
        {!user && (
          <div className="md:basis-1/2 text-right">
            <Button
              className="py-3 h-sm px-5 font-sans1 bg-yellow text-black text-sm font-semibold rounded-lg  hover:bg-yellow  focus:outline-none focus:ring-2 focus:ring-yellow "
              onClick={cb(Router.push, "/auth")}
            >
              AUTHENTICATE
            </Button>
          </div>
        )}
        {user && (
          <div className="md:basis-1/2 text-right">
            <Button
              className="py-3 h-sm px-5 font-sans1 text-yellow text-sm font-semibold focus:outline-none "
              onClick={cb(Router.push, "/me/projects")}
            >
              {user.email}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};