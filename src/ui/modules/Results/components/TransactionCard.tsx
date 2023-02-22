import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import BigNumber from "bignumber.js";
import Link from "next/link";
import { useMemo } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";
import { TransactionStatus } from "@/ui/components/TransactionStatus";

import { Transaction } from "@/types/data/Transaction";

import { capitalize } from "@/utils/capitalize";


type TransactionCardProps = {
  data: Transaction;
  network: Network;
};

export const TransactionCard = ({ data, network }: TransactionCardProps) => {
  const value = useMemo(
    () => BigNumber(data.value).shiftedBy(-18),
    [data.value]
  );

  return (
    <div className="w-full sm:min-w-full max-w-xs md:w-1/2 lg:w-1/3  my-2 sm:pr-5 px-0 cursor-pointer">
      <Link
        href={`/explore/${Entity.Transaction}/${data.cid}?network=${network}`}
      >
        <div className="relative flex flex-col w-full break-words bg-gray-dark border-2 border-gray-dark hover:border-lightgray rounded-base  shadow-lg">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full">
                <CopyWrapper data={data.cid}>
                  <h4 className="text-white leading-6 text-base font-bold font-roboto truncate	">
                    {data.cid}
                  </h4>
                </CopyWrapper>
              </div>
              <TransactionStatus exitCode={data.messageRctExitCode} />
            </div>

            <div className="flex mt-4">
              <div className="w-full xs:w-1/2 lg:w-7/12 pr-3">
                <div className="bg-yellow p-2.5 rounded-base">
                  <h4 className="text-lg font-bold text-black	tracking-wider	font-space">
                    {value.toFixed(2)} FIL
                  </h4>
                  <p className="text-gray-text text-sm font-normal font-roboto	">
                    value
                  </p>
                </div>
              </div>

              <div className="w-full xs:w-1/2 lg:w-5/12 mt-0">
                <div className="bg-black p-2.5 rounded-base">
                  <h4 className="text-lg font-bold text-white	tracking-wider	font-space">
                    {data.height}
                  </h4>
                  <p className="text-gray-text text-sm font-normal font-roboto">
                    epoch
                  </p>
                </div>
              </div>
            </div>

            <div className="flex  mt-3">
              <div className="w-full lg:w-5/12 pr-0 lg:pr-3">
                <h3 className="text-gray-text font-normal	text-sm	leading-5 tracking-wider	font-roboto	">
                  NETWORK
                </h3>
                <h5 className="text-white font-medium text-sm	leading-4 font-roboto tracking-wider">
                  {capitalize(network)}
                </h5>
              </div>
              <div className="w-full lg:w-5/12 pr-0 lg:pr-3">
                <h3 className="text-gray-text font-normal	text-sm	leading-5 tracking-wider	font-roboto	">
                  GAS USED
                </h3>
                <h5 className="text-white font-medium text-sm	leading-4 font-roboto tracking-wider">
                  {data.messageRctGasUsed} attoFIL
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};