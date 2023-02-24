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

  console.log(data);

  return (
    <div className="w-full sm:min-w-full max-w-xs md:w-1/2 lg:w-1/3 sm:pr-5 px-0 cursor-pointer">
      <Link
        href={`/explore/${Entity.Transaction}/${data.cid}?network=${network}`}
      >
        <div className="relative flex flex-col w-full break-words bg-body_opacity-50 border-2 border-transparent hover:border-label rounded-9  shadow-lg">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full">
                <CopyWrapper data={data.cid}>
                  <h4 className="font-space text-white text-lg font-bold leading-compact truncate">
                    {data.cid}
                  </h4>
                </CopyWrapper>
              </div>
              <TransactionStatus exitCode={data.messageRctExitCode} />
            </div>

            <div className="flex mt-5">
              <div className="w-14/25 pr-2.5">
                <div className="bg-label_opacity-30 p-2.5 rounded-3">
                  <h4 className="font-space text-white text-lg font-bold leading-compact">
                    {value.toFixed(2)} FIL
                  </h4>
                  <p className="font-roboto text-white text-xs font-normal leading-normal">
                    value
                  </p>
                </div>
              </div>

              <div className="w-11/25">
                <div className="bg-label_opacity-30 p-2.5 rounded-3">
                  <h4 className="font-space text-white text-lg font-bold leading-compact">
                    {data.height}
                  </h4>
                  <p className="font-roboto text-white text-xs font-normal leading-normal">
                    epoch
                  </p>
                </div>
              </div>
            </div>

            <div className="flex mt-5">
              <div className="w-14/25 lg:w-5/12 pr-0 lg:pr-3">
                <h3 className="font-roboto text-label text-sm font-medium leading-4 lowercase">
                  method type
                </h3>
                <h5 className="font-roboto text-white text-sm font-normal leading-normal capitalize">
                  {data.method}
                </h5>
              </div>
              <div className="w-11/25 lg:w-5/12 pr-0 lg:pr-3">
                <h3 className="font-roboto text-label text-sm font-medium leading-4 lowercase">
                  GAS
                </h3>
                <h5 className="font-roboto text-white text-sm font-normal leading-normal">
                  {data.messageRctGasUsed} FIL
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};