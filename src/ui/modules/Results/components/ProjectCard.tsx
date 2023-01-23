import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import Link from "next/link";

import { Project } from "@/types/data/Project";

type ProjectCardProps = {
  data: Project;
  network: Network;
};
export const ProjectCard = ({ data, network }: ProjectCardProps) => {
  return (
    <Link href={`/explore/${Entity.Project}/${data.id}?network=${network}`}>
      {JSON.stringify(data)}
    </Link>
  );
};