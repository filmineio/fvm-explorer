import Link from "next/link";
import Router from "next/router";
import { FC, useCallback } from "react";

import Button from "@/ui/components/Button";

import { useStore } from "@/ui/state/Store";

import { cb } from "@/utils/cb";
import LogoDevStorage from "@/ui/components/Common/Icons/LogoDevStorage";


export const Header: FC = () => {
  const {
    state: { user },
  } = useStore();

  const logout = useCallback(() => {}, []);

  return (
    <header className="px-5 py-5 border-b border-gray-dark">
      <div className="flex flex-row justify-between items-center m-auto">
        <div className="md:basis-1/2">
          <Link href="/">
            <LogoDevStorage />
          </Link>
        </div>
        {user && (
          <div className="md:basis-1/2 text-right">
            <Button
              className="py-3 h-sm px-5 font-roboto bg-yellow text-black text-sm font-semibold rounded-base  hover:bg-yellow  focus:outline-none focus:ring-2 focus:ring-yellow "
              onClick={cb(Router.push, "/auth")}
            >
              AUTHENTICATE
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};