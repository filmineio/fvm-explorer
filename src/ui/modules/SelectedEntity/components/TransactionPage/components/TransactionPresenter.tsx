import { useMemo } from "react";

import { TransactionActors } from "@/ui/TransactionActors/TransactionActors";

import { Transaction } from "@/types/data/Transaction";

import { attoFilToFil } from "@/utils/attoFilToFil";


export const TransactionPresenter = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const value = useMemo(() => attoFilToFil(transaction), [transaction.value]);

  return (
    <div className="px-6 py-5 bg-body_opacity-50 flex rounded-4 text-left items-center">
      <div className={"flex-1 -mt-3"}>
        <TransactionActors transaction={transaction} />
      </div>
      <div className="text-center text-white text-14 font-normal leading-normal whitespace-nowrap w-48">
        {value.toFixed()} FIL
      </div>
      <div className="text-14 text-right text-white font-normal leading-normal whitespace-nowrap w-48">
        {transaction.messageRctGasUsed} attoFIL
      </div>
    </div>
  );
};