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
    <header className="px-4 py-4 border-b border-body">
      <div>
        <div className="flex gap-3 items-center justify-end pr-[2px] mr-5">
          <span className="inline-block text-label form-check-label text-14 font-medium">
            network
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
              className="btn bg-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all"
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