export const AdvancedFilterRule = () => {
  return (
    <div>
      <div className="bg-gray-dark rounded-lg flex-wrap justify-end gap-5 items-center flex-row-reverse flex px-5 py-3">
        <div className="flex flex-wrap">
          <div className="closebut pr-3  lg:mt-0">
            <button
              type="button"
              className="  box-content  py-1 font-normal px-2 text-center text-white border border-yellow text-sm font-mono1  rounded-lg focus:shadow-none focus:outline-none"
            >
              TOTAL VALUE LOCKED
            </button>
          </div>
          <div className="closebut  pr-3  lg:mt-">
            <button
              type="button"
              className="  box-content  py-1 font-normal px-2 text-center text-white border border-secect  text-sm font-mono1  rounded-lg focus:shadow-none focus:outline-none"
            >
              in Projects
            </button>
          </div>
          <div className="closebut  pr-3  lg:mt-0">
            <button
              type="button"
              className="  box-content  py-1 font-normal px-2 text-center text-analogous border border-analogous  text-sm font-mono1  rounded-full focus:shadow-none focus:outline-none"
            >
              greater than
            </button>
          </div>
          <button
            type="button"
            className="   lg:mt-0 box-content bg-analogous py-1 font-normal px-2 text-center text-white text-sm font-mono1  rounded-lg focus:shadow-none focus:outline-none"
          >
            6000
          </button>
        </div>
        <div className="px-3  lg:mt-0">
          <button className="box-content w-4 h-4 p-2 text-center text-white border-none  bg-secect rounded-lg focus:shadow-none focus:outline-none flex justify-center items-center">
            <img className="w-auto" src="/images/colose.png" />
          </button>
        </div>
      </div>
    </div>
  );
};
