import { CopyIcon } from "@graphiql/react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AbiItem } from "web3-utils";

import LinkIcon from "@/ui/components/Common/Icons/LinkIcon";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { ContractAbi } from "@/ui/modules/SelectedEntity/components/ContractPage/components/ContractAbi";

import { useWeb3Storage } from "@/ui/external/useWeb3Storage";

import { Contract } from "@/types/data/Contract";
import { ContractMeta } from "@/types/data/ContractMeta";

import { cb } from "@/utils/cb";


export const ContractMetaInfo = ({
  contract,
  metadata,
  abi,
}: {
  contract: Contract;
  metadata: ContractMeta;
  abi: string;
}) => {
  const { retrieve, data, loading } = useWeb3Storage<AbiItem[]>();
  const [viewAbi, setViewAbi] = useState(false);

  useEffect(() => {
    if (abi) retrieve(abi);
  }, [abi]);

  return (
    <div className="project relative p-7 min-w-0 break-words border-2 border-label rounded-4 mt-6 ">
      <div className="absolute bg-label py-1.25 px-2 -top-3 -left-[2px] rounded-1110">
        <p className="text-white text-12 leading-compact">ABI &amp; COMPILER</p>
      </div>

      <div className="flex flex-wrap ">
        <div className="mt-0 mr-14">
          <h4 className="text-label font-normal text-14 leading-5">ABI</h4>
          <div className="flex">
            <button
              className="flex items-center mr-10 text-blue-400 hover:text-blue-500 transition-colors group"
              type="button"
              onClick={cb(setViewAbi, true)}
            >
              <div className="w-6 h-6 flex mr-2.5 rounded-3 bg-label_opacity-30 items-center justify-center border border-transparent group-hover:border-label group-active:border-blue-500 transition-all">
                {loading ? <Spinner inline /> : <LinkIcon />}
              </div>
              <span className="font-bold text-14 leading-4">View ABI</span>
            </button>
            <CopyToClipboard text={JSON.stringify(data)}>
              <button className="flex items-center mr-10 text-blue-400 hover:text-blue-500 transition-colors group" type="button">
                <div className="w-6 h-6 flex mr-2.5 rounded-3 bg-label_opacity-30 items-center justify-center border border-transparent group-hover:border-label group-active:border-blue-500 transition-all">
                  {loading ? <Spinner inline /> : <CopyIcon />}
                </div>
                <span className="font-bold text-14 leading-4">Copy ABI</span>
              </button>
            </CopyToClipboard>
          </div>
        </div>

        <div className="mt-0">
          <h4 className="text-label font-normal text-14	leading-5">
            COMPILER VERSION
          </h4>
          <h5 className="text-white font-medium text-14	leading-5">
            {metadata.compilerVersion}
          </h5>
        </div>
      </div>
      {viewAbi && <ContractAbi toggle={setViewAbi} data={data} />}
    </div>
  );
};