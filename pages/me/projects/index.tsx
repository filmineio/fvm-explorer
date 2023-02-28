import { PAGE_SIZE } from "@/constants/pagination";
import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
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
import { Page } from "@/ui/components/Page/Page";
import { META_PAGE_TITLE_DASHBOARD } from "@/constants/global";


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

  const pageContent = () => {
    return (!user || loading) ? (
      <div className={"text-gray-text"}>
        <Spinner />
      </div>
    ) : projects.length === 0 ? (
      <div
        className={
          "justify-self-center mx-auto"
        }
      >
        <SearchFeedback kind={Entity.Project} />
      </div>
    ) : (
      <div
        className="grid grid-cols-3 gap-5 relative"
      >
        {projects.map((data) => (
          <ProjectCard key={data.id} data={data} reFetch={getData} />
        ))}
      </div>
    )
  }

  return (
    <Page title={META_PAGE_TITLE_DASHBOARD}>
      <MyDataWrapper kind={MyDataKind.Projects}>
        <div className="max-w-1xl mx-auto p-10">
          <ProjectsHeading onCreate={getData} />
          {pageContent()}
        </div>
      </MyDataWrapper>
    </Page>
  );
}