import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { uniqBy } from "ramda";
import { useEffect, useMemo } from "react";

import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useQuery } from "@/ui/external/data";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

import ContractIcon from "@/ui/components/Common/Icons/ContractIcon";
import CopyText from "@/ui/components/CopyText/CopyText";
import classNames from "classnames";


type ContractCardProps = {
  data: Contract;
  network: Network;
};

const TransactionCounters = ({
  ok,
  reverted,
  loading,
  error,
}: {
  ok: number;
  reverted: number;
  loading: boolean;
  error: boolean;
}) => {
  return (
      <div className="flex mt-5">
        <div className="w-14/25 xs:w-1/2 lg:w-7/12 pr-2.5">
          <div className="bg-label_opacity-30 p-2.5 rounded-3">
            <h4 className="font-space text-white text-lg font-bold leading-compact">
              {loading ? <Spinner inline /> : error ? "--" : ok}
            </h4>
            <p className="text-white text-xs font-normal leading-normal">
              successful txns
            </p>
          </div>
        </div>

        <div className="w-11/25 xs:w-1/2 lg:w-5/12 mt-0">
          <div className="bg-label_opacity-30 p-2.5 rounded-3">
            <h4 className="font-space text-white text-lg font-bold leading-compact">
              {loading ? <Spinner inline /> : error ? "--" : reverted}
            </h4>
            <p className="text-white text-xs font-normal leading-normal">
              failed txns
            </p>
          </div>
        </div>
      </div>
  );
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
    <div className="w-full cursor-pointer">
      <Link href={`/explore/${Entity.Contract}/${data.contractAddress}?network=${network}`}>
        <div className="relative flex flex-col break-words bg-body_opacity-50 border-2 border-transparent rounded-9 hover:border-label">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="w-20 h-20 flex bg-label_opacity-30 rounded-6 justify-center items-center">
                <ContractIcon/>
              </div>
              <div className="ml-5 min-w-0 flex-1 overflow-hidden">
                <div className="w-full">
                  <CopyText text={data.contractAddress} additionalClass="copy-animate-width">
                    <span className="auto font-space text-white text-lg font-bold leading-compact truncate">
                      {data.contractAddress}
                    </span>
                  </CopyText>
                </div>
                <span className={classNames("text-xs font-bold leading-compact mt-1.5", {
                  "text-blue-400": data.verified,
                  "text-label": !data.verified
                })}>
                  {data.verified ? "verified" : "unverified"}
                </span>
              </div>
            </div>

            <TransactionCounters
              ok={ok}
              reverted={reverted}
              loading={loading}
              error={!!error}
            />

            <div className="flex mt-5">
              <div className="w-14/25 lg:w-8/12 pr-0 lg:pr-3">
                <h3 className="text-label text-14 font-normal leading-4 lowercase">
                  NETWORK
                </h3>
                <h5 className="text-white text-14 font-medium leading-normal capitalize">
                  {network}
                </h5>
              </div>
              <div className="w-11/25 lg:w-4/12 mt-2 lg:mt-0">
                <button className="block ml-auto mr-0 bg-label_opacity-30 rounded-3 py-2.5 px-5 text-blue-400 text-14 font-medium leading-4">
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