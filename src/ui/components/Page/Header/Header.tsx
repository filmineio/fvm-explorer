import Link from "next/link";
import Router from "next/router";
import { FC, useCallback } from "react";

import Button from "@/ui/components/Button";
import { UserMenu } from "@/ui/components/UserMenu/UserMenu";

import { useStore } from "@/ui/state/Store";

import { cb } from "@/utils/cb";
import LogoDevStorageWithText from "@/ui/components/Common/Icons/LogoDevStorageWithText";
import { CustomSelect } from "@/ui/components/Select/Select";
import { availableNetworks } from "@/ui/modules/Filters/state/state";
import { AdvancedFiltersState } from "@/ui/state/types/AppState";
import { setFiltersValueTransformer } from "@/ui/state/transformers/filters/setFiltersValueTransformer";

export const Header: FC = () => {
  const {
    mod,
    state: { user, filters: state },
  } = useStore();

  const change = useCallback(
    (v: string | AdvancedFiltersState) => {
      mod(setFiltersValueTransformer(v));
    },
    [mod]
  );

  return (
    <header className="px-4 py-4 border-b border-body">
      <div>
        <div className="flex gap-3 mr-5 items-center">
          <span className="inline-block text-label form-check-label text-14 font-medium">
            network
          </span>
          <div className="w-32">
            <CustomSelect
              value={state.network}
              onChange={change}
              values={availableNetworks}
              selectType="transparent"
            />
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