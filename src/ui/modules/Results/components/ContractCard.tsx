import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { uniqBy } from "ramda";
import { useEffect, useMemo } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useQuery } from "@/ui/external/data";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

import { capitalize } from "@/utils/capitalize";


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
    <div className="flex mt-4">
      <div className="w-full xs:w-1/2 lg:w-7/12 pr-3">
        <div className="bg-yellow p-2.5 rounded-base">
          <h4 className="text-lg font-bold text-black	tracking-wider	font-space">
            {loading ? <Spinner inline /> : error ? "--" : ok}
          </h4>
          <p className="text-gray-text text-sm font-normal font-roboto	">
            successful txns
          </p>
        </div>
      </div>

      <div className="w-full xs:w-1/2 lg:w-5/12 mt-0">
        <div className="bg-black p-2.5 rounded-base">
          <h4 className="text-lg font-bold text-white	tracking-wider	font-space">
            {loading ? <Spinner inline /> : error ? "--" : reverted}
          </h4>
          <p className="text-gray-text text-sm font-normal font-roboto">
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
    <div className="w-full sm:min-w-full max-w-xs sm:w-5/12 md:w-1/2 lg:w-1/3  my-2 sm:pr-5 px-0 cursor-pointer">
      <Link
        href={`/explore/${Entity.Contract}/${data.contractAddress}?network=${network}`}
      >
        <div className="relative flex flex-col break-words bg-gray-dark border-2 border-gray-dark hover:border-lightgray rounded-base  shadow-lg">
          <div className="flex-auto p-5">
            <div className="flex flex-wrap items-center">
              <div className="relative pr-4 w-4/12">
                <div className="bg-bglight rounded-small py-3 px-3 flex justify-center items-center w-20 h-20">
                  <img src="/images/contract-icon.png" alt={""} />
                </div>
              </div>
              <div className="relative w-8/12">
                <CopyWrapper data={data.contractAddress}>
                  <h4 className="text-white leading-6 text-base font-bold font-roboto truncate	">
                    {data.contractAddress}
                  </h4>
                </CopyWrapper>

                <p className="text-yellow font-bold text-xs leading-4 font-space">
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
                <h3 className="text-gray-text font-normal	text-sm	leading-5 tracking-wider	font-roboto	">
                  NETWORK
                </h3>
                <h5 className="text-white font-medium text-sm	leading-4 font-roboto tracking-wider">
                  {capitalize(network)}
                </h5>
              </div>
              <div className="w-full lg:w-4/12 mt-2 lg:mt-0">
                <button className="bg-bglight rounded-base py-2 px-5 font-medium font-space	text-sm	leading-5 text-white tracking-wider">
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