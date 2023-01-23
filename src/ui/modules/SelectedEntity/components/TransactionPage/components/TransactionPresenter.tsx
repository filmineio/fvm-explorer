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
    <div
      className={
        "px-6 py-3 bg-gray-dark flex rounded-l-lg text-left items-center"
      }
    >
      <div className={"flex-1 -mt-3"}>
        <TransactionActors transaction={transaction} />
      </div>
      <div className="bg-gray-dark text-center text-white text-smt ext-white font-sans1 tracking-wider font-light whitespace-nowrap w-48">
        {value.toFixed()} FIL
      </div>
      <div className="bg-gray-dark text-sm text-right text-white rounded-r-lg text-white font-sans1 tracking-wider font-lightpy-3 whitespace-nowrap w-48">
        {transaction.messageRctGasUsed} attoFIL
      </div>
    </div>
  );
};