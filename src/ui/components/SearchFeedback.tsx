import { Entity } from "@/enums/Entity";

import { capitalize } from "@/utils/capitalize";

export const SearchFeedback = ({
  kind,
  error,
}: {
  kind?: Entity;
  error?: boolean;
}) => {
  if (!kind) {
    return (
      <div className="border-solid border-2 border-lightgray  rounded-lg ">
        <div className="h-full min-h-[57vh] min-h-[47vh] flex justify-center items-center ">
          <h3 className=" text-3xl   font-bold leading-8 text-white font-sans1">
            No data found
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 2xls:px-20">
      <div className="border-solid border-2  mt-10 border-lightgray  rounded-lg ">
        <div className="h-full min-h-[57vh] flex justify-center items-center px-8  xs:flex-wrap">
          <div className="border-solid border-2 border-lightgray  rounded-lg p-6">
            <img src="/images/text-ped.png" alt={"filexplore"} />
          </div>
          {error ? (
            <div className="pr-14 ml-5">
              <h5 className="text-white font-bold text-lg mb-4 font-mono1 tracking-widest	">
                Something Went Wrong
              </h5>
              <p className="text-switchs font-medium text-[16px] font-sans1">
                We are experiencing issues while running your query
                <br />
                Try again in few minutes. If the issue is still present please
                contact us.
              </p>
            </div>
          ) : (
            <div className="pr-14 ml-5">
              <h5 className="text-white font-bold text-lg mb-4 font-mono1 tracking-widest	">
                {capitalize(kind)} not found
              </h5>
              <p className="text-switchs font-medium text-[16px] font-sans1">
                It may take up to 2 minutes for the new {kind}
                <br />
                to appear in FilExplore.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};