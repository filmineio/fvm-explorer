import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import JSONPretty from "react-json-pretty";

import CopyText from "@/ui/components/CopyText/CopyText";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useMutation } from "@/ui/external/data";

import { Transaction } from "@/types/data/Transaction";


const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const TransactionOverview = ({
  network,
  data,
  transaction,
}: {
  network: Network;
  data: Transaction[];
  transaction: Transaction;
}) => {
  const { post, data: paramsRes, error, loading } = useMutation<string>();

  useEffect(() => {
    post(Entity.Transaction, `transactions/decode-params?network=${network}`, {
      actorId: transaction.to || transaction.robustTo,
      method: transaction.method,
      params: transaction.params,
      block: transaction.block,
    });
  }, [transaction]);

  const params = useMemo(() => paramsRes[0], [paramsRes]);

  return (
    <div className="mt-5 flex gap-5 justify-between">
      <div className="w-2/3">
        <div className="bg-body_opacity-50 rounded-6 p-7.5">
          <div className="flex flex-wrap  text-justify justify-between items-center	">
            <h5 className="font-bold text-18 leading-compact text-white font-space">
              Method & Params
            </h5>

            <span className="flex text-justify items-center">
              <p className="text-14 font-normal italic text-white pr-3">
                MethodId
              </p>
              <button className="bg-label bg-opacity-20 rounded-4 py-2 px-5 font-medium text-14 leading-5 text-white">
                {transaction.method}
              </button>
            </span>
          </div>
          <div className="overflow-x-auto ">
            <div className="mt-4 inline-block min-w-full max-h-[600px] min-h-[200px] h-[50vh] overflow-y-auto">
              {loading ? (
                <Spinner />
              ) : (
                <div className={"text-sm text-secondary "}>
                  {params ? (
                    <JSONPretty
                      data={params}
                      keyStyle={"color:rgb(59 130 246 / 0.5)"}
                    />
                  ) : (
                    transaction.params
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 gap-5">
        <div className="bg-body_opacity-50 rounded-6 p-7.5">
          <h5 className="text-18 font-bold text-white leading-compact">
            Transaction overview
          </h5>

          <div className="mt-5">
            <h5 className="text-left font-medium text-14  text-label leading-4">
              CID
            </h5>
            <div className={"relative"}>
              <CopyText text={transaction.cid} additionalClass="copy-animate-width">
                <span className="mt-1.25 text-left font-normal text-14 text-white leading-normal relative truncate cursor-pointer">
                  {transaction.cid}
                </span>
              </CopyText>
            </div>

            <h5 className="mt-5 text-left font-medium text-14  text-label leading-4 lowercase">
              TIPSETS (BLOCKS)
            </h5>

            {data.map((t) => (
              <div key={t.cid} className={"cursor-pointer"}>
                <Link href={`/explore/block/${t.block}?network=${network}`}>
                  <p className="text-left font-normal mt-3 truncate text-14 text-white hover:text-blue-400 hover:underline">
                    {t.block}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-body_opacity-50 rounded-6 p-7.5 mt-5">
          <h5 className="text-18 font-bold text-white leading-compact">
            Gas details
          </h5>

          <div className="mt-5">
            <h5 className="text-left font-medium text-14  text-label leading-4 lowercase">
              GAS FEE CAP
            </h5>
            <p className="mt-1.25 text-left font-normal text-14 text-white leading-normal">
              {transaction.gasFeeCap}
            </p>
            <h5 className="mt-5 text-left font-medium text-14  text-label leading-4 lowercase">
              GAS LIMIT
            </h5>
            <p className="mt-1.25 text-left font-normal text-14 text-white leading-normal">
              {transaction.gasLimit}
            </p>
            <h5 className="mt-5 text-left font-medium text-14 text-label leading-4 lowercase">
              GAS PREMIUM
            </h5>
            <p className="mt-1.25 text-left font-normal  text-14 text-white">
              {transaction.gasPremium}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};