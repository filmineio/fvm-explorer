import Link from "next/link";
import Router from "next/router";
import { FC } from "react";

import Button from "@/ui/components/Button";
import { UserMenu } from "@/ui/components/UserMenu/UserMenu";

import { useStore } from "@/ui/state/Store";

import { cb } from "@/utils/cb";
import LogoDevStorageWithText from "@/ui/components/Common/Icons/LogoDevStorageWithText";

export const Header: FC = () => {
  const {
    state: { user },
  } = useStore();

  return (
    <header className="px-5 py-5 border-b border-slate">
      <div className="flex flex-row justify-between items-center m-auto">
        <div className="md:basis-1/2">
          <Link href="/" passHref>
            <a>
              <LogoDevStorageWithText />
            </a>
          </Link>
        </div>
        {!user && (
          <div className="md:basis-1/2 text-right">
            <Button
              className="py-3 h-sm px-5 bg-yellow text-black text-sm font-semibold rounded-base  hover:bg-yellow  focus:outline-none focus:ring-2 focus:ring-yellow "
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