import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { ReactElement, useEffect } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper";

import { ResultsPresenter } from "@/ui/modules/Results/components/ResultsPresenter";

import { useStore } from "@/ui/state/Store";

import { useQuery } from "@/ui/external/data";

import { Project } from "@/types/data/Project";

import { getZeroIndexOffset } from "@/utils/getZeroIndexOffset";


function ProjectsHeading() {
  return (
    <div className="flex flex-wrap items-center justify-between mb-10">
      <div className="textheading">
        <h3 className="text-2xl font-sans1 font-bold text-white	">
          My projects
        </h3>

        <h5 className="text-switchs text-lg font-sans1">
          Collections of contracts you created or want to be in the loop about.
        </h5>
      </div>
      <div className="addproject">
        <div
          className="flex text-yellow text-sm font-bold mt-5"
          data-bs-toggle="modal"
          data-bs-target="#addproject"
        >
          <div className="bg-yellowrgba p-1 mr-2 rounded-md flex items-center justify-center w-8">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.66699 7.00008H7.00033M12.3337 7.00008H7.00033M7.00033 7.00008V1.66675M7.00033 7.00008V12.3334"
                stroke="#D5FF64"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          New project
        </div>
      </div>
    </div>
  );
}

export default function Projects({ data }: { data: Project[] }): ReactElement {
  const {
    state: { user },
  } = useStore();
  const { get, loading, data: projects, total, error } = useQuery<Project>();

  useEffect(() => {
    user &&
      get(Entity.Project, {
        network: Network.HyperSpace,
        query: { owner: { is: user.email } },
        order: ["id", "ASC"],
        pagination: { limit: PAGE_SIZE, offset: getZeroIndexOffset(1) },
      });
  }, [!!user]);

  return (
    <MyDataWrapper kind={MyDataKind.Projects}>
      <div className=" all px-0 max-w-2xl justify-self-center mx-auto pt-20 pb-10 pl-32 md:pl-20">
        <ProjectsHeading />
        <ResultsPresenter
          error={error}
          loading={loading}
          results={{
            network: Network.HyperSpace,
            kind: Entity.Project,
            total,
            rows: projects,
          }}
          paginate={console.error}
          page={1}
        />
      </div>
    </MyDataWrapper>
  );
}