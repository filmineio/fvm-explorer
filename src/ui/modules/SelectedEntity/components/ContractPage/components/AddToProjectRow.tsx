import { Network } from "@/enums/Network";
import classNames from "classnames";
import { useMemo } from "react";

import { CheckIndicator } from "@/ui/modules/SelectedEntity/components/ContractPage/components/CheckIndicator";

import { Contract } from "@/types/data/Contract";
import { Project } from "@/types/data/Project";
import { ProjectContract } from "@/types/data/ProjectContract";

import { parse } from "@/utils/parse";


export function AddToProjectRow({
  data,
  contract,
  network,
  checked,
  onClick,
}: {
  data: Project;
  contract: Contract;
  network: Network;
  checked: boolean;
  onClick: VoidFunction;
}) {
  const contracts: ProjectContract[] = useMemo(
    () => parse(data.contracts as never, []),
    []
  );

  const included = useMemo(() => {
    return contracts.some(
      (c) =>
        c.contractAddress === contract.contractAddress && c.network === network
    );
  }, [contract, contracts]);

  return (
    <div className="pr-2">
      <div
        className={classNames(
          "px-8 py-7 bg-body_opacity-50 rounded-10 w-full flex justify-between items-center border border-transparent transition-all",
          { "cursor-pointer hover:border-blue-500": !included, "cursor-forbidden": included }
        )}
        onClick={onClick}
      >
        <div>
          <h6 className={"text-white font-semibold mb-4"}>{data.name}</h6>
          <div className={"text-newdarck"}>
            {contracts.length} contracts
          </div>
        </div>
        {/*state={included ? "none" : checked ? "none" : "none"}*/}

        <div>
          <div className={classNames('w-6 h-6 flex items-center justify-center rounded-3 border transition-all', {
            'bg-blue-500': !included && checked,
            'bg-blue-500_opacity-30 border-transparent': included,
            'bg-label_opacity-30 border-transparent': !included && !checked,
            'border-blue-500': !included && checked,
          })}
          >
            <CheckIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}