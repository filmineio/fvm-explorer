import { InternalTransactions } from "./components/InternalTransactions";
import { TransactionEvents } from "./components/TransactionEvents";
import { TransactionOverview } from "./components/TransactionOverview";
import { useMemo, useState } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";
import { TransactionStatus } from "@/ui/components/TransactionStatus";

import { TransactionPageTabHeaders } from "@/ui/modules/SelectedEntity/components/TransactionPage/components/TransactionPageTabHeaders";

import { TransactionActors } from "@/ui/TransactionActors/TransactionActors";

import { TransactionResults } from "@/types/DataResult";
import { Transaction } from "@/types/data/Transaction";

import { attoFilToFil } from "@/utils/attoFilToFil";


type Props = { data: TransactionResults };

export const TransactionPage = ({ data }: Props) => {
  const transaction = useMemo(() => data.rows[0] as Transaction, [data]);
  const value = useMemo(() => attoFilToFil(transaction), [transaction.value]);

  const date = useMemo(
    () => new Date(transaction.timestamp * 1000),
    [transaction]
  );

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className=" pt-7 flex-wrap flex justify-between">
        <div className="w-full lg:mr-5 md:mr-0">
          <div className="project relative  px-7 py-9 min-w-0 break-words bg-gray-dark border-2 border-lightgray rounded-base mb-6 xl:mb-0 shadow-lg ">
            <div className="absolute bg-lightgray py-1 px-2 -top-3 left-0">
              <p className="text-xs text-white font-normal ">TRANSACTION</p>
            </div>
            <div className=" lg:flex items-center justify-between flex-wrap ">
              <div className=" lg:w-8/12   w-full ">
                <div className="pr-3 w-fit relative">
                  <CopyWrapper data={transaction.cid}>
                    <h3 className="text-xl font-roboto font-bold text-white relative">
                      {transaction.cid}
                    </h3>
                  </CopyWrapper>
                </div>
              </div>
              <div className="md:mt2 lg:w-4/12  w-full">
                <TransactionStatus exitCode={transaction.messageRctExitCode} />
              </div>
            </div>

            <div className="xs:flex mt-6 flex-wrap ">
              <div className="w-full mt-2 sm:w-6/12 md:mt-0 md:w-5/12 ">
                <h4 className="text-lightgray font-normal font-roboto text-sm	tracking-wider	leading-5	">
                  TIMESTAMP
                </h4>
                <h5 className="text-white font-medium font-roboto text-sm	tracking-wider	leading-5	">
                  {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </h5>
              </div>

              <div className="w-full mt-2 sm:w-6/12 md:mt-0 md:w-3/12 ">
                <h4 className="text-lightgray font-normal font-roboto text-sm	tracking-wider	leading-5	">
                  VALUE
                </h4>
                <h5 className="text-white font-medium font-roboto text-sm	tracking-wider	leading-5	">
                  {value.toFixed()} FIL
                </h5>
              </div>
              <div className="w-full mt-2 md:mt-0 md:w-3/12 ">
                <h4 className="text-lightgray font-normal font-roboto text-sm	tracking-wider	leading-5	">
                  HEIGHT (EPOCH){" "}
                </h4>
                <h5 className="text-white font-medium font-roboto text-sm	tracking-wider	leading-5	">
                  {transaction.height}
                </h5>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lightgray font-normal font-roboto text-sm	tracking-wider	leading-5">
                FROM/TO
              </h4>
              <TransactionActors transaction={transaction} />
            </div>
          </div>
        </div>
      </div>
      <div className=" py-2.5  relative">
        <p className="text-white mt-0 mt-7 font-bold leading-5 text-2xl  ">
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