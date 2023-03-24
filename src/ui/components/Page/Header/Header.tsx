import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FC, ReactElement, useCallback } from "react";

import Button from "@/ui/components/Button";
import { UserMenu } from "@/ui/components/UserMenu/UserMenu";

import { useStore } from "@/ui/state/Store";

import { cb } from "@/utils/cb";
import LogoDevStorageWithText from "@/ui/components/Common/Icons/LogoDevStorageWithText";
import { useDataClient } from "@/ui/external/data";
import { getData } from "@/ui/modules/Filters/filtersUtils";
import { Filters } from "@/ui/modules/Filters/Filters";
import LinkAngled from "@/ui/components/Common/Icons/LinkAngled";

type Props = {
  filterComponent?: ReactElement;
};

export const Header: FC<Props> = ({ filterComponent }) => {
  const {
    state: { user, filters: state },
  } = useStore();
  const router = useRouter();
  const { get } = useDataClient();
  const requestData = useCallback(getData(router.push, state), [state, get]);

  return (
    <header className="">
      <div className="">
        <div className="flex items-center justify-between px-10">
          <div className="flex items-center gap-5">
            {/*<span className="text-label text-12 font-bold leading-large">*/}
            {/*  network storage power*/}
            {/*</span>*/}
            {/*<span className="text-white text-12 font-normal leading-large">*/}
            {/*  19.165 EiB*/}
            {/*</span>*/}
          </div>
          <div className="flex items-center">
            <div className="mr-1.5">
              <LinkAngled/>
            </div>
            <span className="text-label text-12 font-bold leading-large mr-2.5">
              current network
            </span>
            <div>
              {filterComponent ? (
                filterComponent
              ) : (
                <Filters search={requestData} showOnlyNetwork />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between py-1 min-h-[60px] px-10 items-center m-auto border-y border-body">
        <div className="flex flex-row gap-7.5 items-center">
          <Link href="/" passHref>
            <a>
              <LogoDevStorageWithText />
            </a>
          </Link>
          <div className="flex flex-row gap-10 items-center pl-7.5 border-l border-body">
            <Link href="/explore">
              <span className="text-14 text-white leading-large font-normal cursor-pointer">
                Explore
              </span>
            </Link>
            {/*<Link href="/">*/}
            {/*  <span className="text-14 text-white leading-large font-normal cursor-pointer">*/}
            {/*    GraphQL sandbox*/}
            {/*  </span>*/}
            {/*</Link>*/}
          </div>
        </div>
        {!user && (
          <div className="md:basis-1/2 text-right">
            <Button
              className="bg-blue-500 text-white hover:bg-blue-400 rounded-4 text-14 leading-5 hover:border-blue-400 px-5 py-2.5 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all"
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