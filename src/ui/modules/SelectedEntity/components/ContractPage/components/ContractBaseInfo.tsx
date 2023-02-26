import { ContractMetaInfo } from "./ContractMetaInfo";
import { Network } from "@/enums/Network";
import { useReducer } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { AddToProject } from "@/ui/modules/SelectedEntity/components/ContractPage/components/AddToProject";

import { useStore } from "@/ui/state/Store";

import { Contract } from "@/types/data/Contract";
import { ContractMeta } from "@/types/data/ContractMeta";

import { capitalize } from "@/utils/capitalize";
import FileEyeIcon from "@/ui/components/Common/Icons/FileEyeIcon";
import BookmarkCodeIcon from "@/ui/components/Common/Icons/BookmarkCodeIcon";
import LinkIcon from "@/ui/components/Common/Icons/LinkIcon";
import FileCopyIcon from "@/ui/components/Common/Icons/FileCopyIcon";


export const ContractBaseInfo = ({
  contract,
  network,
  totalTransactions,
  metadata,
}: {
  contract: Contract;
  network: Network;
  totalTransactions: number;
  metadata?: ContractMeta;
}) => {
  const {
    state: { user },
  } = useStore();

  const [showEth, toggle] = useReducer((p) => !p, false);
  const [showAddToProject, toggleAddToProject] = useReducer((p) => !p, false);

  return (
    <div className="w-full">
      <div className="relative bg-body_opacity-50 p-7.5 mb-15 rounded-6 break-words">
        <div className="absolute bg-label py-1.25 px-2 -top-3 left-0 rounded-1110">
          <p className="text-white text-12 font-bold leading-compact uppercase">CONTRACT</p>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-start mr-15">
            <h3 className="relative font-space text-24 leading-compact font-bold text-white">
              <CopyWrapper data={ showEth ? contract.ethAddress : contract.contractAddress }>
                {showEth ? contract.ethAddress : contract.contractAddress}
              </CopyWrapper>
            </h3>
          </div>
          <div className="flex items-center justify-start">
            <button className="flex items-center mr-10" type="button" onClick={toggle}>
              <div className="w-6 h-6 flex mr-2.5 rounded-3 bg-label_opacity-30 items-center justify-center">
                <FileEyeIcon/>
              </div>
              <span className="text-blue-400 font-bold text-14 leading-4">
                { " " }
                { showEth ? "Hide ETH" : "View ETH" }
              </span>
            </button>
            {!!user && (
              <button className="flex items-center" type="button" onClick={toggleAddToProject}>
                <div className="w-6 h-6 flex mr-2.5 rounded-3 bg-label_opacity-30 items-center justify-center">
                  <BookmarkCodeIcon/>
                </div>
                <span className="text-blue-400 font-bold text-14 leading-4">Save to project</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-start mt-7.5">
          <div className="flex flex-col mr-15">
            <h4 className="font-medium text-label text-14 leading-4 lowercase">
              Number of TRANSACTIONS
            </h4>
            <h5 className="font-medium text-white text-14	leading-normal mt-1.5">
              {totalTransactions}
            </h5>
          </div>

          <div className="flex flex-col mr-15">
            <h4 className="font-medium text-label text-14 leading-4 lowercase">
              VALUE LOCKED
            </h4>
            <h5 className="font-medium text-white text-14	leading-normal mt-1.5">
              --
            </h5>
          </div>
          <div className="flex flex-col">
            <h4 className="font-medium text-label text-14 leading-4 lowercase">
              NETWORK
            </h4>
            <div className="flex items-center mt-1.5">
              <div className="bg-pink p-1 w-2.5 h-2.5 mr-2 rounded-2 flex items-center justify-center"/>
              <span className="font-bold text-white text-14 leading-normal capitalize">{network}</span>
            </div>
          </div>
        </div>

        {/*<span className="flex font-space font-bold text-white text-18 leading-compact mt-10">ABI & Compiler</span>*/}

        {/*<div className="flex flex-wrap items-center justify-start mt-5">*/}
        {/*  <button className="flex items-center mr-10" type="button" onClick={() => 0 /*TODO*!/>*/}
        {/*    <div className="w-6 h-6 flex mr-2.5 rounded-3 bg-label_opacity-30 items-center justify-center">*/}
        {/*      <LinkIcon/>*/}
        {/*    </div>*/}
        {/*    <span className="text-blue-400 font-bold text-14 leading-4">View ABI</span>*/}
        {/*  </button>*/}
        {/*  <button className="flex items-center mr-10" type="button" onClick={() => 0 /*TODO*!/>*/}
        {/*    <div className="w-6 h-6 flex mr-2.5 rounded-3 bg-label_opacity-30 items-center justify-center">*/}
        {/*      <FileCopyIcon/>*/}
        {/*    </div>*/}
        {/*    <span className="text-blue-400 font-bold text-14 leading-4">Copy ABI</span>*/}
        {/*  </button>*/}
        {/*  <div className="flex items-center">*/}
        {/*    <h4 className="font-medium text-label text-14 leading-4 lowercase mr-5">*/}
        {/*      compiler v.*/}
        {/*    </h4>*/}
        {/*    <h5 className="bg-label_opacity-30 px-3.5 py-2.5 rounded-4 font-normal text-white text-14 italic leading-4 lowercase">*/}
        {/*      gcc 4.8*/}
        {/*    </h5>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {!!metadata && (
          <ContractMetaInfo contract={contract} metadata={metadata} />
        )}
      </div>

      {showAddToProject && (
        <AddToProject
          contract={contract}
          onAdd={toggleAddToProject}
          close={toggleAddToProject}
          network={network}
        />
      )}
    </div>
  );
};