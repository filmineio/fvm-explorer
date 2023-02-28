import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { uniqBy } from "ramda";
import { useCallback, useEffect, useMemo } from "react";
import { toast } from "react-toastify";

import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useMutation, useQuery } from "@/ui/external/data";

import { Project } from "@/types/data/Project";
import { ProjectContract } from "@/types/data/ProjectContract";
import { Transaction } from "@/types/data/Transaction";

import { toHumanReadable } from "@/utils/toHumanReadable";
import Link from "next/link";
import Share from "@/ui/components/Common/Icons/Share";
import Contract from "@/ui/components/Common/Icons/Contract";
import Garbage from "@/ui/components/Common/Icons/Garbage";


export const ProjectContractRow = ({
  contract,
  projectId,
  onRemove,
}: {
  contract: ProjectContract;
  projectId: string;
  onRemove: VoidFunction;
}) => {
  const { get, data: transactions } =
    useQuery<Pick<Transaction, "cid" | "messageRctExitCode">>();
  const {
    post: remove,
    loading: removing,
    error,
    total: removeResult,
  } = useMutation<Project>();

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

  const submit = useCallback(() => {
    remove(Entity.Project, `/projects/${projectId}/remove-contract`, contract);
  }, [contract, projectId]);

  useEffect(() => {
    get(Entity.Transaction, {
      network: Network.HyperSpace,
      query: [
        ["robustTo", "robustFrom"].map((f) => ({
          [f]: { is: contract.contractAddress },
        })),
      ].flat(),
      order: ["cid", "ASC"],
      pagination: { limit: 1000, offset: 0 },
      selection: ["cid", "messageRctExitCode"],
    });
  }, []);

  useEffect(() => {
    if (!!removeResult) {
      toast.success("Successfully removed contract");
      onRemove();
    }
  }, [removeResult]);

  useEffect(() => {
    if (!!error) toast.error("Failed to remove the contract");
  }, [error]);

  return (
    <tr className="border-2 border-transparent hover:border-label transition-all custome text-left">
      <td className="py-5 pr-2 pl-5 bg-body_opacity-50 rounded-tl-6 rounded-bl-6">
        <div className="flex items-center">
          <div className="relative w-auto  pr-4">
            <div className="bg-bglight xs:w-[80px] h-[80px]  rounded-lg py-3 px-3 flex justify-center items-center ">
              <Contract />
            </div>
          </div>
          <div className="">
            <h4 className="text-white leading-6 text-lg	 font-bold font-sans1 truncate w-96	">
              {contract.contractAddress}
            </h4>
            <h4 className="text-blue-400 font-bold text-xs font-sans1">
              verified
            </h4>
          </div>
        </div>
      </td>
      <td className="py-5 px-2 bg-body_opacity-50 text-left text-14 whitespace-nowrap">
        <span className="text-label">NETWORK</span>
        <p className="font-medium text-14	text-white mt-2">
          {toHumanReadable(Network.HyperSpace)}
        </p>
      </td>

      <td
        colSpan={2}
        className="py-5 px-2 bg-body_opacity-50 text-left text-14 whitespace-nowrap"
      >
        <span className="text-label">TRANSACTIONS</span>
        <p className="font-medium text-14	text-white mt-2">
          {ok + reverted}
        </p>
      </td>

      <td className="py-5 px-2 bg-body_opacity-50 text-left text-14 whitespace-nowrap">
        <Link href={`/explore/contract/${contract.contractAddress}`} passHref>
          <div className="flex items-center text-blue-400 text-14 font-bold cursor-pointer hover:text-blue-500 transition-colors group">
            <div className="bg-label_opacity-30 mr-5 rounded-3 flex items-center justify-center w-8 h-8 border border-transparent group-hover:border-label group-active:border-blue-500 transition-all">
              <Share />
            </div>
            View contract
          </div>
        </Link>
      </td>
      <td className="py-5 pr-5 pl-2 bg-body_opacity-50 text-left text-14 whitespace-nowrap rounded-tr-6 rounded-br-6 w-8">
        <div className="cursor-pointer" onClick={submit}>
          <div className="bg-label_opacity-30 ml-auto rounded-3 flex items-center justify-center w-8 h-8 border border-transparent hover:border-label active:bg-label transition-all">
            {removing ? (
              <div
                className={"w-[32px] h-[32px] flex items-center justify-center"}
              >
                <Spinner inline />
              </div>
            ) : (
              <Garbage />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};