import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { findIndex } from "ramda";
import { useEffect, useMemo } from "react";

import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useQuery } from "@/ui/external/data";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

import { attoFilToFil } from "@/utils/attoFilToFil";
import CopyText from "@/ui/components/CopyText/CopyText";


export const TransactionStateDiff = ({
  transaction,
  contract,
  network,
}: {
  contract: Contract;
  transaction: Transaction;
  network: Network;
}) => {
  const { get, data: transactions, loading } = useQuery<Transaction>();

  const stateDiff = useMemo(() => {
    return transactions
      .slice(0, findIndex((c) => c.cid === transaction.cid, transactions) + 1)
      .reduce((p, d) => {
        const value = attoFilToFil(d).toNumber();
        let l = p;
        if (
          d.from === contract.contractId ||
          d.robustFrom === contract.contractAddress
        ) {
          return p - value;
        } else {
          return p + value;
        }
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
            <td className="w-36">
              <div className="text-14 text-white font-bold pb-5 pl-10 text-left block">actor</div>
            </td>
            <td className="px-4 pb-5">
              <div className="flex justify-start ">
                <button className="relative min-w-[140px] overflow-hidden">
                  <CopyText text={contract.contractAddress} additionalClass="copy-animate-width">
                  <span className="bg-body py-2 px-3 rounded-4 text-yellow-500 font-bold text-14 leading-5 flex justify-center">
                    <span className="text-left block truncate max-w-[250px]">
                      {contract.contractAddress}
                    </span>
                  </span>
                  </CopyText>
                </button>
                <button className="px-2 py-1">
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
                <button className="bg-body px-2 py-1 rounded-4 text-yellow-500 font-bold text-14 flex leading-5 flex items-center">
                  {loading ? <Spinner inline /> : stateDiff} FIL
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};