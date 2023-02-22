import { Contract } from "@/types/data/Contract";

export const ContractMetaInfo = ({ contract }: { contract: Contract }) => {
  return (
    <div className="project relative p-7  min-w-0 break-words  border-2 border-lightgray rounded-base mt-6  ">
      <div className="absolute bg-lightgray p-1 -top-3 left-0">
        <p className="text-sm text-white font-normal ">ABI &amp; COMPILER</p>
      </div>

      <div className="xs:flex flex-wrap ">
        <div className="w-full mt-2 sm:w-6/12 mt-0 w-5/12 ">
          <h4 className="text-lightgray font-normal font-sans1 text-sm	tracking-wider	leading-5	">
            ABI
          </h4>
          <div className="flex">
            <button
              data-bs-toggle="modal"
              data-bs-target="#ViewABI"
              className="flex items-center justify-between text-xs font-bold font-sans1 text-white pr-4"
            >
              <div className="bg-yellowrgba p-1 mr-2 rounded-base flex items-center justify-center w-8">
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
              <a href="#ViewABI" className="text-yellow font-bold text-sm ">
                View ABI
              </a>
            </button>
            <button className="flex items-center justify-between text-xs font-bold font-sans1 text-white">
              <div className="bg-yellowrgba p-1 mr-2 rounded-base flex items-center justify-center w-8">
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 5.75L13 9.75C13 10.8546 12.1046 11.75 11 11.75H10M13 5.75V5.75C13 5.26978 12.8092 4.80923 12.4697 4.46967L9.78033 1.78033C9.44077 1.44077 8.98022 1.25 8.5 1.25V1.25M13 5.75H10.5C9.39543 5.75 8.5 4.85457 8.5 3.75V1.25M8.5 1.25L6 1.25C4.89543 1.25 4 2.14543 4 3.25V4.25M10 11.75L6 11.75C4.89543 11.75 4 10.8546 4 9.75L4 4.25M10 11.75V12.75C10 13.8546 9.10457 14.75 8 14.75L3 14.75C1.89543 14.75 1 13.8546 1 12.75L1 6.25C1 5.14543 1.89543 4.25 3 4.25H4"
                    stroke="#D5FF64"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h5 className="text-yellow font-bold text-sm ">Copy ABI</h5>
            </button>
          </div>
        </div>

        <div className="w-full mt-2 sm:w-6/12 mt-0 w-3/12 ">
          <h4 className="text-lightgray font-normal font-sans1 text-sm	tracking-wider	leading-5	">
            COMPILER VERSION
          </h4>
          <h5 className="text-white font-medium font-sans1 text-sm	tracking-wider	leading-5	">
            g++ 4.8
          </h5>
        </div>
      </div>
    </div>
  );
};