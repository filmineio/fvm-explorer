import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import classNames from "classnames";
import Link from "next/link";
import { useReducer } from "react";

import { TransactionStatus } from "@/ui/components/TransactionStatus";

import { TransactionStateDiff } from "@/ui/modules/SelectedEntity/components/ContractPage/components/TransactionStateDiff";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";

export const ContractTransactionRow = ({
  contract,
  transaction,
  network,
}: {
  contract: Contract;
  transaction: Transaction;
  network: Network;
}) => {
  const [open, toggle] = useReducer((p) => !p, false);

  return (
    <>
      <tr className="min-w-full bg-gray-dark rounded rounded-b-0">
        <td className="w-1/6 px-6 py-3 text-left truncate text-yellow underline cursor-pointer">
          <Link
            href={`/explore/${Entity.Transaction}/${transaction.cid}?network=${network}`}
          >
            {transaction.cid}
          </Link>
        </td>
        <td className="w-1/6  text-left text-sm	italic  text-white font-space tracking-wider	 font-normal px-6 py-3 whitespace-nowrap">
          {transaction.method}
        </td>
        <td className="w-1/6  text-left text-sm	italic  text-white font-space tracking-wider	 font-normal px-6 py-3 whitespace-nowrap">
          {transaction.height}
        </td>
        <td className="w-1/6  text-left text-sm	  text-white font-roboto tracking-wider	 font-bold px-6 py-3 whitespace-nowrap">
          <TransactionStatus exitCode={transaction.messageRctExitCode} />
        </td>
        <td className="w-1/6  text-left text-sm	  text-white font-roboto tracking-wider	 font-normal  px-6 py-3 whitespace-nowrap">
          {transaction.messageRctGasUsed} attoFIL
        </td>
        <td className="w-1/6  text-left text-sm	  text-white font-roboto tracking-wider	 font-normal px-6 py-3 whitespace-nowrap">
          {transaction.value} FIL
        </td>
      </tr>
      <tr
        className={
          "min-w-full bg-gray-dark rounded-base rounded-t-0  transform -translate-y-2"
        }
      >
        <td colSpan={7} className="px-6 pt-4 pb-3">
          <div className="flex items-center text-sm font-normal font-roboto text-white">
            <div
              onClick={toggle}
              className={
                "state bg-secect rounded-base w-6 h-6 mr-2 flex items-center justify-center cursor-pointer"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={classNames("w-4 h-4", {
                  "transform rotate-90": open,
                })}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </div>
            STATE DIFFERENCE
          </div>
        </td>
      </tr>
      {open && (
        <tr
          className={
            "min-w-full bg-gray-dark rounded-base rounded-t-0  transform -translate-y-4"
          }
        >
          <td colSpan={7}>
            <TransactionStateDiff
              transaction={transaction}
              contract={contract}
              network={network}
            />
          </td>
        </tr>
      )}
    </>
  );
};