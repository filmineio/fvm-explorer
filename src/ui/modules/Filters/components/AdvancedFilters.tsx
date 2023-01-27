import { PropsWithChildren, useMemo } from "react";

import { AdvancedFiltersQueryGroup } from "@/ui/modules/Filters/components/AdvancedFiltersQueryGroup";
import { ORMarker } from "@/ui/modules/Filters/components/ORMarker";

import { FilterState } from "@/ui/state/types/AppState";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";

export const AdvancedQueryActions = () => {
  return (
    <div
      className={
        "flex justify-between transform -translate-y-7 max-w-2xl w-full px-10"
      }
    >
      <button className="w-52 border-2 border-yellow text-yellow uppercase rounded  bg-black px-2 py-1">
        Collapse Query
      </button>
      <div className={"flex gap-5"}>
        <button className="w-52 border-2 border-yellow text-yellow uppercase bg-black rounded px-2 py-1">
          Add group
        </button>
        <button className="w-52 border-2 border-yellow bg-yellow text-gray-dark uppercase rounded px-2 py-1">
          Search
        </button>
      </div>
    </div>
  );
};

export const InnerGroupWrapper = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ORMarker />
      <div className={"flex flex-col justify-center gap-3 -mt-12 relative"}>
        {children}
      </div>
    </>
  );
};

enum ContractQueryField {
  ContractAddress = "Contract  Address",
  ContractF4Address = "Contract f4 Address",
  ContractEthAddress = "Contract ETH Address",
  ContractActorId = "Contract ActorId",
  ContractDeployedFromAddress = "Contract Deployed From Address",
}

enum BlockQueryFields {
  Height = "Height",
  BlockCid = "BlockCid",
  Miner = "Miner",
}
export const AdvancedFilters = ({
  handleChange,
  state,
  onClick,
}: {
  handleChange: (v: string) => void;
  state: FilterState;
  onClick: () => void;
}) => {
  const model = useMemo(() => {
    return getModel(state.filteredBy);
  }, [state.filteredBy]);

  const fields = useMemo(() => {
    switch (model.kind) {
    }
  }, [model]);

  console.log(model);

  return (
    <div className={"flex flex-col justify-center gap-3"}>
      <AdvancedFiltersQueryGroup />
      <InnerGroupWrapper>
        <AdvancedFiltersQueryGroup />
      </InnerGroupWrapper>
      <AdvancedQueryActions />
    </div>
  );
};
