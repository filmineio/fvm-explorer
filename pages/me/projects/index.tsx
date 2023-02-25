import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import classNames from "classnames";
import { ReactElement, useCallback, useEffect } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper/MyDataWrapper";
import { ProjectCard } from "@/ui/components/ProjectComponents/ProjectCard";
import { ProjectsHeading } from "@/ui/components/ProjectsHeading/ProjectsHeading";
import { SearchFeedback } from "@/ui/components/SearchFeedback";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useStore } from "@/ui/state/Store";

import { useQuery } from "@/ui/external/data";

import { Project } from "@/types/data/Project";

import { getZeroIndexOffset } from "@/utils/getZeroIndexOffset";


export default function Projects({ data }: { data: Project[] }): ReactElement {
  const {
    state: { user },
  } = useStore();
  const { get, loading, data: projects } = useQuery<Project>();

  const getData = useCallback(() => {
    user &&
      get(Entity.Project, {
        network: Network.HyperSpace,
        query: { owner: { is: user.email } },
        order: ["id", "ASC"],
        pagination: { limit: PAGE_SIZE, offset: getZeroIndexOffset(1) },
      });
  }, [user]);

  useEffect(getData, [!!user]);

  if (loading) {
    return (
      <MyDataWrapper kind={MyDataKind.Projects}>
        <div className=" all px-0 max-w-2xl justify-self-center mx-auto pt-20 pb-10 pl-32 md:pl-20">
          <ProjectsHeading onCreate={getData} />
        </div>
        <div className={"text-gray-text"}>
          <Spinner />
        </div>
      </MyDataWrapper>
    );
  }

  if (projects.length === 0) {
    return (
      <MyDataWrapper kind={MyDataKind.Projects}>
        <div className=" all px-0 max-w-2xl justify-self-center mx-auto pt-20 pb-10 pl-32 md:pl-20">
          <ProjectsHeading onCreate={getData} />
        </div>
        <div
          className={
            "max-w-2xl justify-self-center mx-auto pt-20 pb-10 pl-32 md:pl-20 "
          }
        >
          <SearchFeedback kind={Entity.Project} />
        </div>
      </MyDataWrapper>
    );
  }
  return (
    <MyDataWrapper kind={MyDataKind.Projects}>
      <div className=" all px-0 max-w-2xl justify-self-center mx-auto pt-20 pb-10 pl-32 md:pl-20">
        <ProjectsHeading onCreate={getData} />

        <div className="space-y-5 pt-5 flex-col">
          <div
            className={classNames("flex flex-wrap relative gap-6", {
              "justify-center": projects.length > 2,
              "justify-start px-20": projects.length < 3,
            })}
          >
            {projects.map((data) => (
              <ProjectCard key={data.id} data={data} reFetch={getData} />
            ))}
          </div>
        </div>
      </div>
    </MyDataWrapper>
  );
}