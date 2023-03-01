import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { useMemo } from "react";

import { Transaction } from "@/types/data/Transaction";

import { attoFilToFil } from "@/utils/attoFilToFil";
import classNames from "classnames";


export const BlockTransactionRow = ({
  transaction,
  network,
}: {
  transaction: Transaction;
  network: Network;
}) => {
  const value = useMemo(() => attoFilToFil(transaction), [transaction.value]);
  const exitCode = useMemo(() => +transaction.messageRctExitCode, [transaction.messageRctExitCode]);

  return (
    <tr className="bg-body_opacity-50 border-spacing-y-3">
      <td className="w-1/6 px-10 py-5 text-left truncate text-blue-400 underline cursor-pointer rounded-4004">
        <Link
          href={`/explore/${Entity.Transaction}/${transaction.cid}?network=${network}`}
        >
          {transaction.cid}
        </Link>
      </td>
      <td className="w-1/6  text-left text-14	italic  text-white font-space  font-normal px-10 py-5 whitespace-nowrap">
        {transaction.method}
      </td>
      <td className="w-1/6  text-left text-14 text-white font-bold px-10 py-5 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <div className={classNames("w-3 h-3 rounded-2", {
            "bg-blue-500": exitCode === 0,
            "bg-label": exitCode !== 0
          })}></div>
          <span className="text-14 font-bold leading-compact">
              {exitCode === 0 ? "successful" : "reverted"}
            </span>
        </div>
      </td>
      <td className="w-1/6 text-left text-14 text-white font-normal px-10 py-5 whitespace-nowrap">
        {transaction.messageRctGasUsed} attoFIL
      </td>
      <td className="w-1/6 text-right text-14 text-white font-normal px-10 py-5 whitespace-nowrap rounded-0440">
        {value.toFixed(12)} FIL
      </td>
    </tr>
  );
};