import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { findIndex } from "ramda";
import { useEffect, useMemo } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { useQuery } from "@/ui/external/data";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

import { attoFilToFil } from "@/utils/attoFilToFil";


export const TransactionStateDiff = ({
  transaction,
  contract,
  network,
}: {
  contract: Contract;
  transaction: Transaction;
  network: Network;
}) => {
  const { get, data: transactions } = useQuery<Transaction>();

  const stateDiff = useMemo(() => {
    return transactions
      .slice(
        0,
        findIndex((c) => c.cid === transaction.cid, transactions)
      )
      .reduce((p, d) => {
        const value = attoFilToFil(d).toNumber();
        if (
          d.from === contract.contractId ||
          d.robustFrom === contract.contractAddress
        ) {
          return p - value;
        }
        return p + value;
      }, 0);
  }, [transactions, transaction]);

  useEffect(() => {
    get<Transaction>(Entity.Transaction, {
      network: network,
      query: [
        ["from", "to"].map((f) => ({
          [f]: { is: contract.contractId },
          timestamp: { lessThanOrEqual: transaction.timestamp },
        })),
        ["robustTo", "robustFrom"].map((f) => ({
          [f]: { is: contract.contractAddress },
          timestamp: { lessThanOrEqual: transaction.timestamp },
        })),
      ].flat(),
      order: ["timestamp", "ASC"],
      pagination: { limit: 1000, offset: 0 },
      selection: ["cid", "from", "robustFrom", "to", "robustTo", "value"],
    });
  }, []);

  return (
    <div>
      <table className="min-w-full">
        <tbody>
          <tr>
            <td
              colSpan={2}
              className="text-14 text-white font-bold pb-5"
            >
              actor
            </td>
            <td className="px-4 pb-" colSpan={5}>
              <div className="flex justify-start ">
                <button className="bg-body  px-2 py-1 rounded-4 text-purple-400 font-bold font-space text-xs	tracking-wider	leading-5 relative">
                  <CopyWrapper data={contract.contractAddress}>
                    {contract.contractAddress}
                  </CopyWrapper>
                </button>
                <button className="px-2 py-1  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </button>
                <button className="bg-body px-2 py-1 rounded-4 text-yellow-500 font-bold font-space text-xs	tracking-wider leading-5">
                  {stateDiff} FIL
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};