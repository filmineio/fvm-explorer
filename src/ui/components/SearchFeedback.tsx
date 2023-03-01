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
      <div className="border-solid border-2 border-label rounded-4">
        <div className="h-full min-h-[57vh] min-h-[47vh] flex justify-center items-center ">
          <h3 className="text-3xl font-bold leading-8 text-white">
            No data found
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto 2xls:px-20">
      <div className="border-solid border-2 my-10 border-label rounded-4">
        <div className="h-full min-h-[57vh] flex justify-center items-center px-8 xs:flex-wrap">
          <div className="border-solid border-2 border-label rounded-4 p-6">
            <img src="/images/text-ped.png" alt={"Dev Storage"} />
          </div>
          {error ? (
            <div className="pr-14 ml-5">
              <h5 className="text-white font-bold text-lg mb-4 font-space ">
                Something Went Wrong
              </h5>
              <p className="text-label font-medium text-[16px]">
                We are experiencing issues while running your query
                <br />
                Try again in few minutes. If the issue is still present please
                contact us.
              </p>
            </div>
          ) : (
            <div className="pr-14 ml-5">
              <h5 className="text-white font-bold text-lg mb-4 font-space ">
                {capitalize(kind)} not found
              </h5>
              <p className="text-label font-medium text-[16px]">
                It may take up to 2 minutes for the new {kind}
                <br />
                to appear in DevStorage.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};