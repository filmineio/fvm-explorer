import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { uniqBy } from "ramda";
import { useEffect, useMemo } from "react";

import { useQuery } from "@/ui/external/data";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

import { toHumanReadable } from "@/utils/toHumanReadable";


export const ProjectContractRow = ({ contract }: { contract: Contract }) => {
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
      network: Network.HyperSpace,
      query: [
        ["from", "to"].map((f) => ({ [f]: { is: contract.contractId } })),
        ["robustTo", "robustFrom"].map((f) => ({
          [f]: { is: contract.contractAddress },
        })),
      ].flat(),
      order: ["cid", "ASC"],
      pagination: { limit: 1000, offset: 0 },
      selection: ["cid", "messageRctExitCode"],
    });
  }, []);

  return (
    <tr className=" border-2 border-transparent hover:border-lightgray  custome">
      <td className="px-6 py-3 bg-gray-dark  rounded-l-lg text-left">
        <div className="flex   items-center">
          <div className="relative w-auto  pr-4">
            <div className="bg-bglight xs:w-[80px] h-[80px]  rounded-lg py-3 px-3 flex justify-center items-center ">
              <img src="/images/contract-icon.png" />
            </div>
          </div>
          <div className="">
            <h4 className="text-white leading-6 text-lg	 font-bold font-sans1 truncate w-96	">
              {contract.contractAddress}
            </h4>
            <h4 className="text-yellow font-bold text-xs font-sans1">
              verified
            </h4>
          </div>
        </div>
      </td>
      <td className="bg-gray-dark text-left text-sm	 text-gray-text font-sans1 tracking-wider font-light px-6 py-3 whitespace-nowrap">
        NETWORK
        <p className="font-medium text-sm	text-white font-sans1">
          {toHumanReadable(Network.HyperSpace)}
        </p>
      </td>

      <td
        colSpan={2}
        className="bg-gray-dark text-left text-sm	 text-gray-text font-sans1 tracking-wider font-light px-6 py-3 whitespace-nowrap"
      >
        TRANSACTIONS
        <p className="font-medium text-sm	text-white font-sans1">
          {ok + reverted}
        </p>
      </td>

      <td className="bg-gray-dark text-left text-sm	 text-gray-text font-sans1 tracking-wider font-light px-6 py-3 whitespace-nowrap">
        <div className="flex items-center justify-between text-xs font-bold font-sans1 text-white">
          <div className="bg-yellowrgba p-1 mr-2 rounded-md flex items-center justify-center w-8">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17H15C16.1046 17 17 16.1046 17 15V11M9 9L17 1M17 1V6M17 1H12"
                stroke="#D5FF64"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <h5 className="text-yellow font-bold text-sm">View contract</h5>
        </div>
      </td>
      <td className="bg-gray-dark text-left text-sm	rounded-r-lg text-gray-text font-sans1 tracking-wider font-light px-6 py-3 whitespace-nowrap">
        <div className="flex items-center justify-between text-xs font-bold font-sans1 text-white">
          <div className="bg-[#292E42] p-1 mr-2 rounded-md flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4997 11.8333V11.8333C13.4997 10.4525 14.619 9.33325 15.9997 9.33325V9.33325C17.3804 9.33325 18.4997 10.4525 18.4997 11.8333V11.8333M13.4997 11.8333H18.4997M13.4997 11.8333H10.9997M18.4997 11.8333H20.9997M22.6663 11.8333H20.9997M9.33301 11.8333H10.9997M10.9997 11.8333V20.6666C10.9997 21.7712 11.8951 22.6666 12.9997 22.6666H18.9997C20.1042 22.6666 20.9997 21.7712 20.9997 20.6666V11.8333"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
};