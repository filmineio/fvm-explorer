import { Network } from "@/enums/Network";
import { useReducer } from "react";

import { CopyWrapper } from "@/ui/components/CopyWrapper/CopyWrapper";

import { Contract } from "@/types/data/Contract";

import { capitalize } from "@/utils/capitalize";


export const ContractBaseInfo = ({
  contract,
  network,
  totalTransactions,
}: {
  contract: Contract;
  network: Network;
  totalTransactions: number;
}) => {
  const [showEth, toggle] = useReducer((p) => !p, false);
  return (
    <div className="w-full mr-5 md:mr-0">
      <div className="project relative  p-7  min-w-0 break-words bg-gray-dark border-2 border-lightgray rounded-base mb-6 xl:mb-0 shadow-lg ">
        <div className="absolute bg-lightgray py-1 px-2 -top-3 left-0">
          <p className="text-xs text-white font-normal ">CONTRACT</p>
        </div>
        <div className="flex md:flex-wrap   items-center">
          <div className="w-3/4  md:w-full ">
            <div className="pr-3">
              <h3 className="text-xl font-sans1 font-bold text-white relative w-fit">
                <CopyWrapper
                  data={
                    showEth ? contract.ethAddress : contract.contractAddress
                  }
                >
                  {showEth ? contract.ethAddress : contract.contractAddress}
                </CopyWrapper>
              </h3>
            </div>
          </div>

          <div className="sx:w-1/4">
            <button
              className="flex items-center justify-between text-xs font-bold font-sans1 text-white"
              onClick={toggle}
            >
              <div className="bg-yellowrgba p-1 mr-2 rounded-base flex items-center justify-center w-8">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7353 5.66667V5.66667C13.7353 5.16821 13.5395 4.68971 13.19 4.33428L10.4479 1.54529C10.1049 1.19647 9.63624 1 9.14706 1V1M13.7353 5.66667H11.1471C10.0425 5.66667 9.14706 4.77124 9.14706 3.66667L9.14706 1M13.7353 5.66667V8M9.14706 1L3.5 1C2.39543 1 1.5 1.89543 1.5 3L1.5 13C1.5 14.1046 2.39543 15 3.5 15L4.55882 15"
                    stroke="#D5FF64"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10.6761 12.6673H10.6838M6.90038 12.4995C7.22767 11.9644 8.41086 10.334 10.6761 10.334C12.9413 10.334 14.1245 11.9644 14.4518 12.4995C14.5155 12.6038 14.5155 12.7309 14.4518 12.8352C14.1245 13.3702 12.9413 15.0007 10.6761 15.0007C8.41086 15.0007 7.22767 13.3702 6.90038 12.8352C6.83659 12.7309 6.83659 12.6038 6.90038 12.4995Z"
                    stroke="#D5FF64"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <span className="text-yellow font-bold text-sm ">
                {" "}
                {showEth ? "Hide ETH" : "View ETH"}
              </span>
            </button>
          </div>
        </div>

        <div className="flex mt-6 flex-wrap ">
          <div className="w-full mt-2 sm:w-6/12 mt-0 w-5/12 ">
            <h4 className="text-lightgray font-normal font-sans1 text-sm uppercase tracking-wider	leading-5	">
              Number of TRANSACTIONS
            </h4>
            <h5 className="text-white font-medium font-sans1 text-sm	tracking-wider	leading-5	">
              {totalTransactions}
            </h5>
          </div>

          <div className="w-full mt-2 sm:w-6/12 mt-0 w-3/12 ">
            <h4 className="text-lightgray font-normal font-sans1 text-sm	tracking-wider	leading-5	">
              VALUE LOCKED
            </h4>
            <h5 className="text-white font-medium font-sans1 text-sm	tracking-wider	leading-5	">
              --
            </h5>
          </div>
          <div className="w-full mt-2 mt-0 w-3/12 ">
            <h4 className="text-lightgray font-normal font-sans1 text-sm	tracking-wider	leading-5	">
              NETWORK
            </h4>
            <button className="flex items-center  justify-between text-xs font-semibold font-sans1 text-white">
              <div className="bg-yellow p-1 w-2.5 h-2.5 mr-2 rounded-base flex items-center justify-center"></div>
              {capitalize(network)}
            </button>
          </div>
        </div>

        {/*<ContractMetaInfo contract={contract} />*/}
      </div>
    </div>
  );
};