import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { pluck } from "ramda";
import { ReactElement, useEffect, useMemo } from "react";

import {
  MyDataKind,
  MyDataWrapper,
} from "@/ui/components/MyDataWrapper/MyDataWrapper";
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

  useEffect(() => {
    !!user &&
      getProject(Entity.Project, {
        network: Network.HyperSpace,
        order: ["id", "ASC"],
        query: { id: { is: projectId }, owner: { is: user.email } },
      });
  }, [!!user, projectId]);

  useEffect(() => {
    if (!contractsList.length) return;

    getContracts(Entity.Contract, {
      network: Network.HyperSpace,
      query: {
        contractAddress: {
          in: pluck(["contractAddress"] as never, contractsList),
        },
      },
      order: ["contractAddress", "ASC"],
      pagination: { limit: 1000, offset: 0 },
      selection: [],
    });
  }, [contractsList]);

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
      <div className=" all px-0 max-w-2xl justify-self-center mx-auto pt-20 pb-10 ">
        <div className="flex flex-wrap items-center justify-between">
          <div className="textheading">
            <h3 className="text-2xl font-sans1 font-bold text-white	">
              {project.name}
            </h3>
          </div>
        </div>
        <div className=" py-0 md:py-10">
          <div className="flex flex-col">
            <div className="overflow-x-auto ">
              <div className="py-2 inline-block">
                <table className=" rwd-table min-w-full text-center border-0 border-separate border-spacing-y-[20px]	">
                  <tbody>
                    {contracts.map((contract) => (
                      <ProjectContractRow
                        key={contract.contractAddress}
                        contract={contract}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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