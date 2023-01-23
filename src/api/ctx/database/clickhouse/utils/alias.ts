import { TableAliasMap } from "@/schema/types/AliasMap";
import randomstring from "randomstring";

export const generateAlias = () => {
  return randomstring.generate({
    length: 12,
    charset: "alphabetic",
  });
};

export const getAlias = (
  map: TableAliasMap,
  predefinedAlias: string | undefined
) => {
  const { root, alias: a } = map;
  if (root === predefinedAlias && a) return a;

  const alias = generateAlias();

  map.root = predefinedAlias as string;
  map.alias = alias;

  return alias;
};