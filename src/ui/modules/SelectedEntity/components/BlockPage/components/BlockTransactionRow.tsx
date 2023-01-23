import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { useMemo } from "react";

import { TransactionStatus } from "@/ui/components/TransactionStatus";

import { Transaction } from "@/types/data/Transaction";

import { attoFilToFil } from "@/utils/attoFilToFil";


export const BlockTransactionRow = ({
  transaction,
  network,
}: {
  transaction: Transaction;
  network: Network;
}) => {
  const value = useMemo(() => attoFilToFil(transaction), [transaction.value]);

  return (
    <tr className="border-spacing-y-3">
      <td className="w-1/6 px-6 py-3 text-left truncate text-yellow underline cursor-pointer">
        <Link
          href={`/explore/${Entity.Transaction}/${transaction.cid}?network=${network}`}
        >
          {transaction.cid}
        </Link>
      </td>
      <td className="w-1/6  text-left text-sm	italic  text-white font-mono1 tracking-wider	 font-normal px-6 py-3 whitespace-nowrap">
        {transaction.method}
      </td>
      <td className="w-1/6  text-left text-sm	  text-white font-sans1 tracking-wider	 font-bold px-6 py-3 whitespace-nowrap">
        <TransactionStatus exitCode={transaction.messageRctExitCode} />
      </td>
      <td className="w-1/6  text-left text-sm	  text-white font-sans1 tracking-wider	 font-normal  px-6 py-3 whitespace-nowrap">
        {transaction.messageRctGasUsed} attoFIL
      </td>
      <td className="w-1/6  text-left text-sm	  text-white font-sans1 tracking-wider	 font-normal px-6 py-3 whitespace-nowrap">
        {value.toFixed(12)} FIL
      </td>
    </tr>
  );
};