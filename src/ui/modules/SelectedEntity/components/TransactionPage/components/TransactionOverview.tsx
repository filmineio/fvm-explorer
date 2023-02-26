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
    <div className="my-5 flex-wrap flex justify-between">
      <div className="w-4/6	 md:w-full">
        <div className="bg-slate rounded-4  p-6">
          <div className="flex flex-wrap  text-justify justify-between items-center	">
            <h5 className="font-bold text-lg text-white font-space ">
              Method & Params
            </h5>

            <span className="flex text-justify items-center mt-3 sm:mt-0	">
              <p className="text-14 font-normal font-space italic	text-white pr-3">
                MethodId
              </p>
              <button className="bg-bglight rounded-4 py-2 px-5 font-medium font-space  text-14 leading-5 text-white tracking-wider">
                {transaction.method}
              </button>
            </span>
          </div>
          <div className="overflow-x-auto ">
            <div className="py-2 inline-block min-w-full text-label">
              <pre>
                <code>{transaction.params}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div className="w-96	 md:w-full	ml-0  md:mt-4">
        <div className="bg-slate rounded-4 p-6">
          <h5 className="text-lg	font-bold text-white">
            Transaction overview
          </h5>

          <div className="py-3">
            <h5 className="text-left font-semibold text-14 mt-2 tracking-wider	 text-label">
              CID
            </h5>
            <div className={"relative"}>
              <CopyWrapper data={transaction.cid}>
                <p className="text-left font-normal font-space mb-4 text-14  text-white relative truncate cursor-pointer">
                  {transaction.cid}
                </p>
              </CopyWrapper>
            </div>

            <h5 className="text-left font-semibold text-14 mt-2 tracking-wider	 text-label">
              TIPSETS (BLOCKS)
            </h5>

            {data.map((t) => (
              <div key={t.cid} className={"cursor-pointer"}>
                <Link href={`/explore/block/${t.block}?network=${network}`}>
                  <p className="text-left font-normal font-space mb-4 truncate text-14 text-white hover:text-blue-400 hover:underline">
                    {t.block}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate rounded-4 p-6 mt-4">
          <h5 className="text-lg	font-bold text-white">
            Gas details
          </h5>

          <div className="py-3">
            <h5 className="text-left font-semibold text-14 mt-2 tracking-wider	 text-label">
              GAS FEE CAP
            </h5>
            <p className="text-left font-medium mb-4 text-14  text-white">
              {transaction.gasFeeCap}
            </p>
            <h5 className="text-left font-semibold text-14 mt-2 tracking-wider	 text-label">
              GAS LIMIT
            </h5>
            <p className="text-left font-semibold mb-4 text-14 text-white">
              {transaction.gasLimit}
            </p>
            <h5 className="text-left font-semibold text-14 mt-2 tracking-wider	text-label">
              GAS PREMIUM
            </h5>
            <p className="text-left font-semibold  text-14 tracking-wider	text-white">
              {transaction.gasPremium}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};