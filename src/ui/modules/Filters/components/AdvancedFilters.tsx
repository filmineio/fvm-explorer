export const AdvancedFilters = () => {
  return (
    <div
      className={
        "modal-content relative border-none shadow-lg flex flex-col w-full pointer-events-auto bg-black bg-clip-padding outline-none text-current rounded-2xl p-10 md:p-16"
      }
    >
      <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 rounded-t-md">
        <button className="btn-close  box-content w-4 h-4 p-1 text-white border-none rounded-none focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline absolute top-7 right-7">
          <svg
            className="h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <div className={"modal-body relative py-4"}>
        <div className="flex mb-10 flex-wrap ">
          <div className="w-9/12 md:w-full">
            <h5 className="text-[24px] text-white font-bold leading-7  font-sans1">
              Advanced search
            </h5>
            <p className="text-sm	 text-gray-text font-bold leading-7  font-sans1">
              Build complex queries to get detailed insigts about the Filecoin
              network.
            </p>
          </div>
          <div className="w-3/12 md:w-full">
            <div className="flex justify-center">
              <select className="form-select appearance-none block w-full px-3 py-2.5 text-white font-normal bg-gray-dark bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out outline-none m-0 font-mono1 text-sm	 focus:text-white focus:bg-gray-dark  focus:outline-none">
                <option selected>in Projects</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
        <div className="content mb-8 ">
          <h4 className="text-sm text-white font-sans1 font-normal">
            CREATE A RULE
          </h4>
          <div className="flex mt-3 flex-wrap">
            <div className="flex justify-center pr-2 md:w-1/2 w-40">
              <div className="mb-3 w-40 md:w-full ">
                <select className="form-select appearance-none block w-full px-3 py-3 text-lightgray font-normal bg-gray-dark bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out outline-none m-0 font-mono1 text-sm	 focus:text-white focus:bg-gray-dark  focus:outline-none">
                  <option selected>Attribute</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center w-1/2 w-40 pr-2">
              <div className="mb-3 w-30 w-full">
                <select className="form-select appearance-none block w-full px-3 py-3 font-normal text-white bg-gray-dark bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out outline-none m-0 font-mono1 text-sm	 focus:text-white focus:bg-gray-dark  focus:outline-none">
                  <option selected>is</option>
                </select>
              </div>
            </div>

            <div className="relative xs:max-w-full max-w-calc2 max-w-calc2 sm:max-w-lg w-full text-xs">
              <div className="px-3 py-2.5  w-full rounded-lg bg-gray-dark flex gap-5 flex-wrap">
                <div className="bg-secect rounded-md flex items-center gap-10">
                  <div className="rounded-md flex items-center">
                    <div className="px-2 py-1 text-sm font-mono1 font-medium text-white w-fit">
                      Chris
                    </div>

                    <div className="p-2 w-fit select-none rounded-r-md cursor-pointer hover:bg-magma-orange-clear">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5745 1L1 12.5745"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        ></path>
                        <path
                          d="M1.00024 1L12.5747 12.5745"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1 ">
                  <input
                    type="text"
                    placeholder="Enter value..."
                    className="bg-gray-dark text-white w-full border-0 focus:border-0 focus:outline-none focus:ring-0 py-1 px-0 font-mono1 text-sm transform translate-y-0.5"
                  />
                </div>
              </div>
            </div>
            <div className="buttone ml-2 xs:mt-4 sm:mt-0">
              <button className="rounded-lg border-2 border-yellow text-yellow text-xs	 font-sans1 font-bold py-3 px-5 ">
                ADD RULE
              </button>
            </div>
          </div>
        </div>
        <div className="eidtproduct">
          <div className="bg-gray-dark rounded-lg flex-wrap justify-between lg:flex p-5">
            <div className="flex flex-wrap">
              <div className="closebut pr-3 mt-2 lg:mt-0">
                <button className="  box-content w-4 h-4 p-2 text-center text-white border-none  bg-secect rounded-lg focus:shadow-none focus:outline-none  ">
                  <img className="w-auto m-auto " src="/images/colose.png" />
                </button>
              </div>
              <div className="closebut pr-3 mt-2 lg:mt-0">
                <button
                  type="button"
                  className="  box-content  py-1 font-normal px-2 text-center text-white border border-yellow text-sm font-mono1  rounded-lg focus:shadow-none focus:outline-none  "
                >
                  TOTAL VALUE LOCKED
                </button>
              </div>
              <div className="closebut  pr-3 mt-2 lg:mt-0 ">
                <button
                  type="button"
                  className="  box-content  py-1 font-normal px-2 text-center text-white border border-secect  text-sm font-mono1  rounded-lg focus:shadow-none focus:outline-none  "
                >
                  in Projects
                </button>
              </div>
              <div className="closebut  pr-3 mt-2 lg:mt-0">
                <button
                  type="button"
                  className="  box-content  py-1 font-normal px-2 text-center text-analogous border border-analogous  text-sm font-mono1  rounded-full focus:shadow-none focus:outline-none  "
                >
                  greater than
                </button>
              </div>
              <button
                type="button"
                className="  mt-2 lg:mt-0 box-content bg-analogous py-1 font-normal px-2 text-center text-white text-sm font-mono1  rounded-lg focus:shadow-none focus:outline-none  "
              >
                6000
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer flex w-full flex-wrap items-center justify-end py-6 rounded-b-md gap-6">
        <button className="inline-block py-3 ml-2 h-sm px-5 font-sans1 text-lightgray text-sm font-semibold rounded-lg  hover:bg-yellow  focus:outline-none ">
          Cancel
        </button>

        <button className="inline-block py-3 h-sm px-5 font-sans1 bg-yellow text-black  text-sm font-semibold rounded-lg  hover:bg-yellow  focus:outline-none focus:ring-2 focus:ring-yellow  ">
          SEARCH
        </button>
      </div>
    </div>
  );
};
