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
    <div
      className={classNames(
        "p-6 bg-slate rounded-10 w-full flex justify-between items-center ",
        { "cursor-pointer": !included, "cursor-forbidden": included }
      )}
      onClick={onClick}
    >
      <div>
        <div className={"text-white font-semibold mb-4"}>{data.name}</div>
        <div className={"text-line_opacity-80"}>
          {contracts.length} contracts
        </div>
      </div>

      <div>
        <CheckIndicator
          state={included ? "disabled" : checked ? "checked" : "none"}
        />
      </div>
    </div>
  );
}