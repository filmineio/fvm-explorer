import { Entity } from "@/enums/Entity";
import classNames from "classnames";
import React, { useMemo } from "react";

import { Pagination } from "@/ui/components/Pagination/Pagination";

import { BlockCard } from "@/ui/modules/Results/components/BlockCard";
import { ContractCard } from "@/ui/modules/Results/components/ContractCard";
import { TransactionCard } from "@/ui/modules/Results/components/TransactionCard";

import { getEntityIdentifier } from "@/ui/utils/getEntityIdentifier";

import { SelectedEntity } from "@/types/DataResult";


export type ResultsProps = {
  paginate: (page: number) => void;
  page: number;
  pageSize: number;
  data: SelectedEntity;
};

export const Results = ({
  data: { kind, rows, total, network },
  paginate,
  page,
  pageSize,
}: ResultsProps) => {
  const Card = useMemo(() => {
    switch (kind) {
      case Entity.Contract:
        return ContractCard;
      case Entity.Block:
        return BlockCard;
      case Entity.Transaction:
        return TransactionCard;
      default:
        // eslint-disable-next-line react/display-name
        return () => <></>;
    }
  }, [kind]);

  return (
    <div className="flex-col">
      <div className="grid grid-cols-4 relative gap-7 sc-1400:grid-cols-3">
        {rows.map((r) => (
          <Card
            data={r as never}
            key={getEntityIdentifier(kind, r)}
            network={network}
          />
        ))}
      </div>
      <div>
        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          paginate={paginate}
        />
      </div>
    </div>
  );
};