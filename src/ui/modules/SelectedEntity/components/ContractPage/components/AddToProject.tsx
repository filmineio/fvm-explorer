import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import X from "@/ui/components/Common/Icons/X";
import Modal from "@/ui/components/Modal/Modal";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { AddToProjectRow } from "@/ui/modules/SelectedEntity/components/ContractPage/components/AddToProjectRow";

import { useStore } from "@/ui/state/Store";

import { useMutation, useQuery } from "@/ui/external/data";

import { Contract } from "@/types/data/Contract";
import { Project } from "@/types/data/Project";

import { cb } from "@/utils/cb";
import { getZeroIndexOffset } from "@/utils/getZeroIndexOffset";


export const AddToProject = ({
  contract,
  onAdd,
  close,
  network,
}: {
  contract: Contract;
  onAdd: VoidFunction;
  close: VoidFunction;
  network: Network;
}) => {
  const [addToProjects, setAddToProjects] = useState<string[]>([]);

  const {
    state: { user },
  } = useStore();

  const { get, loading, data: projects } = useQuery<Project>();

  const {
    post: add,
    loading: adding,
    error,
    total: addResult,
  } = useMutation<Project>();

  const getData = useCallback(() => {
    user &&
      get(Entity.Project, {
        network: Network.HyperSpace,
        query: { owner: { is: user.email } },
        order: ["id", "ASC"],
        pagination: { limit: PAGE_SIZE, offset: getZeroIndexOffset(1) },
      });
  }, [user]);

  const toggle = useCallback((projectId: string) => {
    setAddToProjects((p) => {
      return p.includes(projectId)
        ? p.filter((v) => v !== projectId)
        : [...p, projectId];
    });
  }, []);

  const submit = useCallback(() => {
    addToProjects.map((p) => {
      add(Entity.Project, `/projects/${p}/add-contract`, {
        contractAddress: contract.contractAddress,
        network,
      });
    });
  }, [network, contract, addToProjects]);

  useEffect(() => {
    if (!!error) {
      toast.error("Failed to add the contract to the selected projects.");
      close();
    }
  }, [error]);

  useEffect(() => {
    if (!!addResult) {
      toast.success("Successfully added contract to the projects.");
      close();
    }
  }, [addResult]);

  useEffect(getData, [!!user]);

  if (loading || adding) {
    return (
      <Modal>
        <div className={"text-gray-text"}>
          <Spinner />
        </div>
      </Modal>
    );
  }
  return (
    <Modal>
      <div className="modal-content border-none shadow-none relative flex flex-col w-full pointer-events-auto bg-slate rounded-10">
        <div className="modal-header flex flex-shrink-0 items-center">
          <button
            className="btn-close absolute right-7 top-7 z-10 hover:opacity-50 transition-all [transition:opacity_.0.16s_ease_in_out]"
            onClick={close}
          >
            <X />
          </button>
        </div>
        <div className="modal-body relative p-[70px]">
          <h3 className="font-space text-white text-24 mb-10">
            Add contract to project
          </h3>
          <p className="mb-14 text-white text-16">
            Easily access the contracts you wish to monitor.
          </p>

          <div className="gap-5 relative flex flex-col">
            {projects.map((data) => (
              <AddToProjectRow
                key={data.id}
                data={data}
                network={network}
                contract={contract}
                onClick={cb(toggle, data.id)}
                checked={addToProjects.includes(data.id)}
              />
            ))}
          </div>
          <button
            onClick={submit}
            className="btn bg-blue-500 text-white mt-14 uppercase hover:bg-blue-400 hover:border-blue-400 active:shadow-[0px_0px_0px_3px_rgba(89,169,255,0.3)] transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};