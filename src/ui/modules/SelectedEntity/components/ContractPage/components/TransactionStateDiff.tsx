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
import ArrowRight from "@/ui/components/Common/Icons/ArrowRight";


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
    <div className="flex flex-none items-center gap-5 mt-5">
      <span className="w-20 text-white text-14 font-bold leading-4 text-left">
        actor
      </span>
      <div className="flex justify-start ">
        <button className="relative min-w-[140px] overflow-hidden">
          <CopyText text={contract.contractAddress} additionalClass="copy-animate-width">
            <span
              className="bg-body py-2 px-3 rounded-4 text-purple-400 font-bold text-14 leading-5 flex justify-center">
              <span className="text-left block truncate max-w-[250px]">
                {contract.contractAddress}
              </span>
            </span>
          </CopyText>
        </button>
        <button className="px-3">
          <ArrowRight/>
        </button>
        <button
          className="bg-body px-2 py-1 rounded-4 text-yellow-500 font-bold text-14 flex leading-5 flex items-center">
          {loading ? <Spinner inline/> : stateDiff} FIL
        </button>
      </div>
    </div>
  );
};