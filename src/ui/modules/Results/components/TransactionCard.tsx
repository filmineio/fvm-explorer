import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import BigNumber from "bignumber.js";
import Link from "next/link";
import { useMemo } from "react";

import { TransactionStatus } from "@/ui/components/TransactionStatus";

import { Transaction } from "@/types/data/Transaction";

import CopyText from "@/ui/components/CopyText/CopyText";

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
    <div className="w-full cursor-pointer">
      <Link href={`/explore/${Entity.Transaction}/${data.cid}?network=${network}`}>
        <div className="relative flex flex-col break-words bg-body_opacity-50 border-2 border-transparent rounded-9 hover:border-label">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="w-full">
                <CopyText text={data.cid} additionalClass="copy-animate-width">
                  <span className="font-space text-white text-18 font-bold leading-compact truncate">
                    {data.cid}
                  </span>
                </CopyText>
              </div>
              <TransactionStatus exitCode={data.messageRctExitCode} />
            </div>

            <div className="flex mt-5 gap-2.5">
              <div className="w-14/25">
                <div className="bg-label_opacity-30 p-2.5 rounded-3">
                  <h4 className="font-space text-white text-18 font-bold leading-compact">
                    {value.toFixed(2)} FIL
                  </h4>
                  <p className="text-white text-12 font-normal leading-normal">
                    value
                  </p>
                </div>
              </div>

              <div className="w-11/25">
                <div className="bg-label_opacity-30 p-2.5 rounded-3">
                  <h4 className="font-space text-white text-18 font-bold leading-compact">
                    {data.height}
                  </h4>
                  <p className="text-white text-12 font-normal leading-normal">
                    epoch
                  </p>
                </div>
              </div>
            </div>

            <div className="flex mt-5 gap-2.5">
              <div className="w-14/25">
                <h3 className="text-label text-14 font-medium leading-4 lowercase">
                  method type
                </h3>
                <h5 className="text-white text-14 font-normal leading-normal capitalize">
                  {data.method}
                </h5>
              </div>
              <div className="w-11/25">
                <h3 className="text-label text-14 font-medium leading-4 lowercase">
                  GAS
                </h3>
                <h5 className="text-white text-14 font-normal leading-normal">
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