import { Network } from "@/enums/Network";
import Link from "next/link";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { Transaction } from "@/types/data/Transaction";

export const TransactionOverview = ({
  network,
  data,
  transaction,
}: {
  network: Network;
  data: Transaction[];
  transaction: Transaction;
}) => {
  return (
    <div className="mt-5 flex-wrap flex justify-between">
      <div className="w-4/6	 md:w-full">
        <div className="bg-body_opacity-50 rounded-6 p-7.5">
          <div className="flex flex-wrap  text-justify justify-between items-center	">
            <h5 className="font-bold text-18 leading-compact text-white font-space">
              Method & Params
            </h5>

            <span className="flex text-justify items-center mt-3 sm:mt-0	">
              <p className="text-14 font-normal italic text-white pr-3">
                MethodId
              </p>
              <button className="bg-bglight rounded-4 py-2 px-5 font-medium text-14 leading-5 text-white">
                {transaction.method}
              </button>
            </span>
          </div>
          <div className="overflow-x-auto ">
            <div className="mt-4 inline-block min-w-full">
              <pre>
                <code className="font-roboto text-14 leading-normal text-label whitespace-normal break-all">{transaction.params}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[430px] md:w-full ml-0 md:mt-4">
        <div className="bg-body_opacity-50 rounded-6 p-7.5">
          <h5 className="text-18 font-bold text-white leading-compact">
            Transaction overview
          </h5>

          <div className="mt-5">
            <h5 className="text-left font-medium text-14  text-label leading-4">
              CID
            </h5>
            <div className={"relative"}>
              <CopyWrapper data={transaction.cid}>
                <p className="mt-1.25 text-left font-normal text-14 text-white leading-normal relative truncate cursor-pointer">
                  {transaction.cid}
                </p>
              </CopyWrapper>
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