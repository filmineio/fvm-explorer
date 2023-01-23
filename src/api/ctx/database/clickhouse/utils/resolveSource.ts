import { TableAliasMap } from "@/schema/types/AliasMap";

export const resolveSource = ({ root, alias }: TableAliasMap) => {
  return ` from "${root}" as ${alias}`;
};