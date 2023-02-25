import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { useRouter } from "next/router";
import { pluck, uniqBy } from "ramda";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { ProjectEditModal } from "@/ui/components/ProjectComponents/ProjectEditModal";

import { TransactionCounters } from "@/ui/modules/Results/components/TransactionCounters";

import { useMutation, useQuery } from "@/ui/external/data";

import { Project } from "@/types/data/Project";
import { Transaction } from "@/types/data/Transaction";

import { cb } from "@/utils/cb";
import { parse } from "@/utils/parse";


type ProjectCardProps = {
  data: Project;
  reFetch: () => void;
};
export const ProjectCard = ({ data, reFetch }: ProjectCardProps) => {
  const { push } = useRouter();

  const {
    get,
    loading,
    error,
    data: transactions,
  } = useQuery<Pick<Transaction, "cid" | "messageRctExitCode">>();

  const {
    total: updatedProject,
    loading: updating,
    error: updatingError,
    post: updateProject,
  } = useMutation<Project>();

  const {
    total: removedProject,
    loading: removing,
    error: removingError,
    post: removeProject,
  } = useMutation<Project>();

  const [showEdit, setShowEdit] = useState(false);

  const contracts: Project["contracts"] = useMemo(
    () => parse(data.contracts as never, []),
    [data.contracts]
  );

  const edit = useCallback(
    (name: string) => {
      updateProject(Entity.Project, `/projects/${data.id}/update`, { name });
    },
    [data]
  );

  const remove = useCallback(() => {
    removeProject(Entity.Project, `/projects/${data.id}/remove`, {});
  }, [data]);

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
    if (!contracts.length) return;

    get(Entity.Transaction, {
      network: Network.HyperSpace,
      query: [
        ["robustTo", "robustFrom"].map((f) => ({
          [f]: {
            in: pluck(["contractAddress"] as never, contracts),
          },
        })),
      ].flat(),
      order: ["cid", "ASC"],
      pagination: { limit: 1000, offset: 0 },
      selection: ["cid", "messageRctExitCode"],
    });
  }, [contracts]);

  useEffect(() => {
    !!updatingError && toast.error(updatingError);
  }, [!!updatingError]);

  useEffect(() => {
    if (!updatedProject) return;
    reFetch();
    toast.info(`Successfully updated the project`);
  }, [updatedProject]);

  useEffect(() => {
    !!removingError && toast.error(removingError);
  }, [!!removingError]);

  useEffect(() => {
    if (!removedProject) return;
    reFetch();
    toast.info(`Successfully removed the project`);
  }, [removedProject]);

  return (
    <>
      <div className="relative flex flex-col break-words bg-body_opacity-50 border-2 border-transparent hover:border-label rounded-9 shadow-lg pt-10 px-8 pb-8">
        <div className="absolute bg-label py-1.5 px-2.5 -top-4 -left-[1.875px]">
          <p className="text-xs text-white font-normal ">PROJECT</p>
        </div>
        <div className="block cursor-pointer" onClick={cb(setShowEdit, true)}>
          <div className="bg-bglight absolute right-2 top-2 	 p-2 mr-2 rounded-md flex items-center justify-center w-8">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.88235 2.76471L7.93995 1.70711C8.33048 1.31658 8.96364 1.31658 9.35417 1.70711L10.2929 2.64583C10.6834 3.03636 10.6834 3.66952 10.2929 4.06005L9.23529 5.11765M6.88235 2.76471L1.29289 8.35417C1.10536 8.5417 1 8.79606 1 9.06127V10C1 10.5523 1.44772 11 2 11H2.93873C3.20394 11 3.4583 10.8946 3.64583 10.7071L9.23529 5.11765M6.88235 2.76471L9.23529 5.11765"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="relative pr-4 xs:w-4/12">
            <div className="bg-bglight  rounded-lg py-3 px-3 flex justify-center items-center ">
              <img src="/images/Project-icon.png" alt="" />
            </div>
          </div>
          <div className="relative w-6/12 ">
            <h4 className="text-white leading-6 text-2xl font-bold font-sans1 truncate	">
              {data.name}
            </h4>
            <h4 className="mt-1.5 text-blue-400	tracking-wider leading-5 text-14 font-bold">
              {contracts.length} contracts
            </h4>
          </div>
        </div>

        <TransactionCounters
          loading={loading}
          error={!!error}
          ok={ok}
          reverted={reverted}
        />
        {!!contracts.length ? (
          <div
            className="mt-8 flex text-yellow text-sm font-bold cursor-pointer"
            onClick={cb(push, `/me/projects/${data.id}`)}
          >
            <div className="bg-yellowrgba p-1 mr-2 rounded-md flex items-center justify-center w-8">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 1H3C1.89543 1 1 1.89543 1 3V11C1 12.1046 1.89543 13 3 13H11C12.1046 13 13 12.1046 13 11V8.5M7 7L13 1M13 1V4.75M13 1H9.25"
                  stroke="#D5FF64"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
            View Contracts
          </div>
        ) : (
          <div className="mt-8 flex text-yellow text-sm font-bold" />
        )}
      </div>

      {showEdit && (
        <ProjectEditModal
          onEdit={edit}
          onDelete={remove}
          value={data.name}
          toggle={setShowEdit}
          loading={updating}
        />
      )}
    </>
  );
};