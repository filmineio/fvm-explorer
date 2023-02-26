import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { ReactElement, useCallback, useEffect, useMemo } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper/MyDataWrapper";
import { ProjectContractRow } from "@/ui/components/ProjectComponents/ProjectContractRow";
import { Spinner } from "@/ui/components/Spinner/Spinner";

import { useStore } from "@/ui/state/Store";

import { useQuery } from "@/ui/external/data";

import { Contract } from "@/types/data/Contract";
import { Project } from "@/types/data/Project";


export default function SingleProject({
                                        projectId,
                                      }: {
  projectId: string;
}): ReactElement {
  const {
    state: { user },
  } = useStore();

  const {
    get: getProject,
    loading: projectLoading,
    data: projects,
  } = useQuery<Project>();
  const { get: getContracts, data: contracts } = useQuery<Contract>();

  const project = useMemo(() => projects[0], [projects]);

  const contractsList: Project["contracts"] = useMemo(() => {
    if (project) {
      return JSON.parse(project.contracts as never);
    }

    return [];
  }, [project]);

  const getData = useCallback(() => {
    !!user &&

    getProject(Entity.Project, {
      network: Network.HyperSpace,
      order: ["id", "ASC"],
      query: { id: { is: projectId }, owner: { is: user.email } },
    });
  }, [user, projectId])


  useEffect(getData, [!!user, projectId]);


  if (projectLoading || !project) {
    return (
      <MyDataWrapper kind={MyDataKind.Projects}>
        <div className=" all px-0 max-w-2xl justify-self-center mx-auto pt-20 pb-10  text-lightgray">
          <Spinner />
        </div>
      </MyDataWrapper>
    );
  }

  return (
    <MyDataWrapper kind={MyDataKind.Projects} activeEntity={project?.name}>
      <div className="max-w-1xl mx-auto p-10">
        <h3 className="text-24 text-white mb-4 font-space">
          {project.name}
        </h3>
        <table className="rwd-table min-w-full text-center border-0 border-separate border-spacing-y-[20px]	">
          <tbody>
          {contractsList.map((contract) => (
            <ProjectContractRow
              key={contract.contractAddress}
              contract={contract}
              projectId={project.id}
              onRemove={getData}
            />
          ))}
          </tbody>
        </table>
      </div>
    </MyDataWrapper>
  );
}

export async function getServerSideProps({
                                           params,
                                         }: {
  params: { project: string };
}) {
  return {
    props: {
      projectId: params.project,
    },
  };
}