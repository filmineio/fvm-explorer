import { Entity } from "@/enums/Entity";
import React, { useMemo } from "react";

import { SearchFeedback } from "@/ui/components/SearchFeedback";

import { BlockPage } from "@/ui/modules/SelectedEntity/components/BlockPage/BlockPage";
import { ContractPage } from "@/ui/modules/SelectedEntity/components/ContractPage/ContractPage";
import { TransactionPage } from "@/ui/modules/SelectedEntity/components/TransactionPage/TransactionPage";

import { DataResult } from "@/types/DataResult";


export type ResultsProps = {
  data: DataResult;
};

export const SelectedEntity = ({ data }: ResultsProps) => {
  const Page = useMemo(() => {
    switch (data.kind) {
      case Entity.Contract:
        return ContractPage;
      case Entity.Block:
        return BlockPage;
      case Entity.Transaction:
        return TransactionPage;
      default:
        return () => null;
    }
  }, [data.kind]);

  if (data.rows.length === 0) return <SearchFeedback kind={data.kind} />;

  return <Page data={data as never} />;
};