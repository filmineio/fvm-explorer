import { InternalTransactions } from "./components/InternalTransactions";
import { TransactionEvents } from "./components/TransactionEvents";
import { TransactionOverview } from "./components/TransactionOverview";
import { useMemo, useState } from "react";

import {
  TransactionPageTabHeaders
} from "@/ui/modules/SelectedEntity/components/TransactionPage/components/TransactionPageTabHeaders";

import { TransactionActors } from "@/ui/TransactionActors/TransactionActors";

import { TransactionResults } from "@/types/DataResult";
import { Transaction } from "@/types/data/Transaction";

import { attoFilToFil } from "@/utils/attoFilToFil";
import classNames from "classnames";
import CopyText from "@/ui/components/CopyText/CopyText";


type Props = { data: TransactionResults };

export const TransactionPage = ({ data }: Props) => {
  const transaction = useMemo(() => data.rows[0] as Transaction, [data]);
  const value = useMemo(() => attoFilToFil(transaction), [transaction.value]);

  const date = useMemo(
    () => new Date(transaction.timestamp * 1000),
    [transaction]
  );

  const [activeTab, setActiveTab] = useState(0);
  const exitCode = useMemo(() => +transaction.messageRctExitCode, [transaction.messageRctExitCode]);

  return (
    <>
      <div className=" pt-7 flex-wrap flex justify-between">
        <div className="w-full lg:mr-5 md:mr-0">
          <div className="project relative bg-body_opacity-50 p-7.5 min-w-0 rounded-6 mb-15 shadow-lg break-words">
            <div className="absolute bg-label py-1.25 px-2 -top-3 left-0 rounded-1110">
              <p className="text-white text-12 leading-compact">TRANSACTION</p>
            </div>
            <div className="flex w-full justify-between sc-1400:flex-col sc-1400:items-start sc-1400:gap-1.5">
              <div className="w-full">
                <div className="w-fit overflow-hidden sc-1400:w-auto">
                  <CopyText text={transaction.cid} additionalClass="copy-animate-width">
                    <span className="font-space text-24 leading-compact font-bold text-white truncate">
                      {transaction.cid}
                    </span>
                  </CopyText>
                </div>
              </div>
              <div className="flex items-center h-6 gap-2">
                <div className={classNames("w-2.5 h-2.5 rounded-2 mt-0.5", {
                  "bg-blue-500": exitCode === 0,
                  "bg-label": exitCode !== 0
                })}/>
                <span className="text-14 leading-compact text-white font-bold">
                  {exitCode === 0 ? "successful" : "reverted"}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-start mt-7.5">
              <div className="flex flex-col mr-15">
                <h4 className="font-medium text-label text-14 leading-4 lowercase">
                  TIMESTAMP
                </h4>
                <h5 className="font-medium text-white text-14	leading-normal mt-1.5">
                  {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </h5>
              </div>

              <div className="flex flex-col mr-15">
                <h4 className="font-medium text-label text-14 leading-4 lowercase">
                  VALUE
                </h4>
                <h5 className="font-medium text-white text-14	leading-normal mt-1.5">
                  {value.toFixed()} FIL
                </h5>
              </div>
              <div className="flex flex-col">
                <h4 className="font-medium text-label text-14 leading-4 lowercase">
                  HEIGHT (EPOCH)
                </h4>
                <h5 className="font-medium text-white text-14	leading-normal mt-1.5">
                  { transaction.height }
                </h5>
              </div>
            </div>
            <div className="mt-10">
              <h4 className="font-medium text-label text-14 leading-4 lowercase">
                FROM/TO
              </h4>
              <TransactionActors transaction={transaction} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative mb-15">
        <p className="text-white font-bold leading-5 text-2xl  ">
          Details
        </p>

        <TransactionPageTabHeaders
          toggle={setActiveTab}
          activeTab={activeTab}
          transaction={transaction}
        />
        <div className="tab-content">
          <div className="tab-pane fade show active">
            {activeTab === 0 && (
              <TransactionOverview
                data={data.rows}
                transaction={transaction}
                network={data.network}
              />
            )}
            {activeTab === 1 && (
              <InternalTransactions
                cid={transaction.cid}
                network={data.network}
              />
            )}
            {activeTab === 2 && (
              <TransactionEvents
                cid={transaction.cid}
                network={data.network}
                eventsRoot={transaction.messageRctEventsRoot}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};