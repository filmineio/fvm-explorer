import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { useEffect } from "react";

import { SearchFeedback } from "@/ui/components/SearchFeedback";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { TransactionPresenter } from "@/ui/modules/SelectedEntity/components/TransactionPage/components/TransactionPresenter";

import { useQuery } from "@/ui/external/data";

import { Transaction } from "@/types/data/Transaction";


export const InternalTransactions = ({
  cid,
  network,
}: {
  cid: string;
  network: Network;
}) => {
  const { data, error, loading, get } = useQuery<Transaction>();
  useEffect(() => {
    get(Entity.Transaction, {
      network,
      pagination: { limit: 100, offset: 0 },
      order: ["timestamp", "ASC"],
      query: { subCallOf: { is: cid } },
      selection: [
        "cid",
        "method",
        "messageRctExitCode",
        "messageRctGasUsed",
        "value",
        "from",
        "robustFrom",
        "to",
        "robustTo",
      ],
    });
  }, []);

  if (loading)
    return (
      <div className="flex flex-col text-lightgray">
        <Spinner />
      </div>
    );

  if (error || data.length === 0)
    return (
      <div className="flex flex-col">
        <SearchFeedback error={!!error} />
      </div>
    );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto ">
        <div className="py-2 inline-block min-w-full ">
          <div className="overflow-hidden">
            <div
              className={
                "bg-secect border-0 rounded-l-lg uppercase text-left border-0 t text-sm font-bold text-white px-6 py-5 flex justify-between"
              }
            >
              <div className={"flex-1"}>From/To</div>
              <div className={"text-center w-48"}>Gas Cost</div>
              <div className={"w-48 text-right"}>Value</div>
            </div>
          </div>
        </div>
      </div>
      <div className={"flex flex-col gap-2"}>
        {data.map((transaction) => (
          <TransactionPresenter
            key={transaction.cid}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};