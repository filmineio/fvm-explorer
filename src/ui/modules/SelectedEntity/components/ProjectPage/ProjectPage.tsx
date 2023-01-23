import { ProjectResults } from "@/types/DataResult";

type Props = { data: ProjectResults };
export const ProjectPage = ({ data }: Props) => {
  return <code className={"text-white"}>{JSON.stringify(data, null, 2)}</code>;
};