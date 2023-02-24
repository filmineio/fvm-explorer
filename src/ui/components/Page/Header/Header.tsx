import Link from "next/link";
import Router from "next/router";
import { FC } from "react";

import Button from "@/ui/components/Button";
import { UserMenu } from "@/ui/components/UserMenu/UserMenu";

import { useStore } from "@/ui/state/Store";

import { cb } from "@/utils/cb";
import LogoDevStorage from "@/ui/components/Common/Icons/LogoDevStorage";


export const Header: FC = () => {
  const {
    state: { user },
  } = useStore();

  return (
    <header className="px-4 py-4 border-b border-body">
      <div className="flex flex-row justify-between items-center m-auto">
        <div className="md:basis-1/2">
          <Link href="/">
            <LogoDevStorage />
          </Link>
        </div>
        {!user && (
          <div className="md:basis-1/2 text-right">
            <Button
              className="bg-blue-500 py-3.75 px-7 rounded-base font-roboto text-base text-white font-bold leading-5"
              onClick={cb(Router.push, "/auth")}
            >
              AUTHENTICATE
            </Button>
          </div>
        )}
        {user && <UserMenu user={user} />}
      </div>
    </header>
  );
};