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
    <div className="project relative p-7  min-w-0 break-words  border-2 border-label rounded-4 mt-6  ">
      <div className="absolute bg-label p-1 -top-3 left-0">
        <p className="text-14 text-white font-normal ">ABI &amp; COMPILER</p>
      </div>

      <div className="xs:flex flex-wrap ">
        <div className="w-full mt-2 sm:w-6/12 mt-0 w-5/12 ">
          <h4 className="text-label font-normal text-14 leading-5">ABI</h4>
          <div className="flex">
            <button
              className="flex items-center justify-between text-xs font-bold text-white pr-4"
              onClick={cb(setViewAbi, true)}
            >
              <div className="bg-blue-400_opacity-30 p-1 mr-2 rounded-4 flex items-center justify-center w-8">
                {loading ? <Spinner inline /> : <LinkIcon />}
              </div>
              <div className="text-blue-400 font-bold text-14 ">View ABI</div>
            </button>
            <CopyToClipboard text={JSON.stringify(data)}>
              <button className="flex items-center justify-between text-xs font-bold text-white">
                <div className="bg-blue-400 p-1 mr-2 rounded-4 flex items-center justify-center w-8">
                  {loading ? <Spinner inline /> : <CopyIcon />}
                </div>
                <h5 className="text-blue-400 font-bold text-14 ">Copy ABI</h5>
              </button>
            </CopyToClipboard>
          </div>
        </div>

        <div className="w-full mt-2 sm:w-6/12 mt-0 w-3/12 ">
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