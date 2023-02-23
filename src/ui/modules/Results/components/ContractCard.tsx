import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { uniqBy } from "ramda";
import { useEffect, useMemo } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { TransactionCounters } from "@/ui/modules/Results/components/TransactionCounters";

import { useQuery } from "@/ui/external/data";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

import { capitalize } from "@/utils/capitalize";


type ContractCardProps = {
  data: Contract;
  network: Network;
};

export const ContractCard = ({ data, network }: ContractCardProps) => {
  const {
    get,
    loading,
    error,
    data: transactions,
  } = useQuery<Pick<Transaction, "cid" | "messageRctExitCode">>();

  const { ok, reverted } = useMemo(() => {
    return uniqBy((m) => m.cid, transactions).reduce(
      (p, c) => {
        if (+c.messageRctExitCode === 0) p.ok += 1;
        else p.reverted += 1;

        return p;
      },
      { ok: 0, reverted: 0 }
    );
  }, [transactions]);

  useEffect(() => {
    get(Entity.Transaction, {
      network: network,
      query: [
        ["from", "to"].map((f) => ({ [f]: { is: data.contractId } })),
        ["robustTo", "robustFrom"].map((f) => ({
          [f]: { is: data.contractAddress },
        })),
      ].flat(),
      order: ["cid", "ASC"],
      pagination: { limit: 1000, offset: 0 },
      selection: ["cid", "messageRctExitCode"],
    });
  }, []);

  return (
    <div className="w-full sm:min-w-full max-w-xs sm:w-5/12 md:w-1/2 lg:w-1/3  my-2 sm:pr-5 px-0 cursor-pointer">
      <Link
        href={`/explore/${Entity.Contract}/${data.contractAddress}?network=${network}`}
      >
        <div className="relative flex flex-col  break-words bg-gray-dark border-2 border-gray-dark hover:border-lightgray rounded-lg  shadow-lg">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="relative pr-4 w-4/12">
                <div className="bg-bglight rounded-lg py-3 px-3 flex justify-center items-center">
                  <img src="/images/contract-icon.png" alt={""} />
                </div>
              </div>
              <div className="relative w-8/12">
                <CopyWrapper data={data.contractAddress}>
                  <h4 className="text-white leading-6 text-base font-bold font-sans1 truncate	">
                    {data.contractAddress}
                  </h4>
                </CopyWrapper>

                <p className="text-yellow font-bold text-xs leading-4 font-mono1">
                  {data.verified}
                </p>
              </div>
            </div>

            <TransactionCounters
              ok={ok}
              reverted={reverted}
              loading={loading}
              error={!!error}
            />

            <div className="flex  mt-3">
              <div className="w-full lg:w-8/12 pr-0 lg:pr-3">
                <h3 className="text-gray-text font-normal	text-sm	leading-5 tracking-widest	font-sans1	">
                  NETWORK
                </h3>
                <h5 className="text-white font-medium text-sm	leading-4 font-sans1 tracking-wider">
                  {capitalize(network)}
                </h5>
              </div>
              <div className="w-full lg:w-4/12 mt-2 lg:mt-0">
                <button className="bg-bglight rounded-lg py-2 px-5 font-medium font-mono1	text-sm	leading-5 text-white tracking-wider">
                  {data.ethAddress ? "EVM" : "FVM"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};