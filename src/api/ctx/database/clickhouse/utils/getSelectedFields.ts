import { FieldAliasMap, TableAliasMap } from "@/schema/types/AliasMap";

import { generateAlias } from "@/api/ctx/database/clickhouse/utils/alias";

import { capitalize } from "@/utils/capitalize";

export const getSelectedFields = (
  tableAlias: TableAliasMap,
  fieldAliasMap: FieldAliasMap,
  selection: { root: string; query: Record<string, boolean> }
): string[] => {
  return Object.entries(selection.query)
    .filter(([_, v]) => v)
    .flatMap(([field]) => {
      const alias = generateAlias();
      fieldAliasMap[selection.root] = {
        ...fieldAliasMap[selection.root],
        [field]: alias,
      };
      return `"${tableAlias.alias}".${capitalize(field)} as ${alias}`;
    });
};