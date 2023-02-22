import { TableAliasMap } from "@/schema/types/AliasMap";

export const resolveSource = (
  { root, alias }: TableAliasMap,
  final = false
) => {
  const q = ` from "${root}" as ${alias}`;
  return final ? `${q} FINAL` : q;
};
