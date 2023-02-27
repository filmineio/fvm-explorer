import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import classNames from "classnames";
import Link from "next/link";
import {useMemo, useReducer} from "react";

import { TransactionStatus } from "@/ui/components/TransactionStatus";

import { TransactionStateDiff } from "@/ui/modules/SelectedEntity/components/ContractPage/components/TransactionStateDiff";

import { Contract } from "@/types/data/Contract";
import { Transaction } from "@/types/data/Transaction";
import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

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

  const exitCode = useMemo(() => +transaction.messageRctExitCode, [transaction.messageRctExitCode]);

  return (
    <>
      <tr className="min-w-full rounded rounded-b-0 bg-body_opacity-50">
        <td className="w-1/6 px-10 pt-5 pb-3 text-left truncate text-blue-400 underline cursor-pointer rounded-4000">
          <Link
            href={`/explore/${Entity.Transaction}/${transaction.cid}?network=${network}`}
          >
            <div className="relative">
              <CopyWrapper data={transaction.cid}>
                {transaction.cid}
              </CopyWrapper>
            </div>
          </Link>
        </td>
        <td className="w-1/6  text-left text-14	italic  text-white tracking-wider	 font-normal px-10 pt-5 pb-3 whitespace-nowrap">
          {transaction.method}
        </td>
        <td className="w-1/6  text-left text-14	italic  text-white tracking-wider	 font-normal px-10 pt-5 pb-3 whitespace-nowrap">
          {transaction.height}
        </td>
        <td className="w-1/6  text-left text-14	text-white tracking-wider	 font-bold px-10 pt-5 pb-3 whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            <div className={classNames("w-3 h-3 rounded-2 mt-0.5", {
              "bg-blue-500": exitCode === 0,
              "bg-label": exitCode !== 0
            })}></div>
            <span className="text-14 font-normal leading-compact">
              {exitCode === 0 ? "successful" : "reverted"}
            </span>
          </div>
        </td>
        <td className="w-1/6  text-left text-14	  text-white tracking-wider	 font-normal  px-10 pt-5 pb-3 whitespace-nowrap">
          {transaction.messageRctGasUsed} attoFIL
        </td>
        <td className="w-1/6  text-left text-14	  text-white tracking-wider	 font-normal px-10 pt-5 pb-3 whitespace-nowrap rounded-0400">
          {transaction.value} FIL
        </td>
      </tr>
      <tr
        className={
          "min-w-full bg-body_opacity-50 transform -translate-y-2"
        }
      >
        <td colSpan={7} className={classNames("px-10 pt-3 pb-5", {"rounded-0044": !open, "rounded-0": open})}>
          <div className="flex items-center text-14 font-medium text-white">
            <div
              onClick={toggle}
              className={
                "state bg-body rounded-4 w-6 h-6 mr-2 flex items-center justify-center cursor-pointer"
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
            "min-w-full bg-body_opacity-50 transform -translate-y-4"
          }
        >
          <td colSpan={7} className="rounded-0044">
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