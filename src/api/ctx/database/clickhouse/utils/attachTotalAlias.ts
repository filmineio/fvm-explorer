import { FieldAliasMap } from "@/schema/types/AliasMap";

import { generateAlias } from "@/api/ctx/database/clickhouse/utils/alias";

export const attachTotalAlias = (
  fieldAliasMap: FieldAliasMap,
  selection: { root: string; query: Record<string, boolean> }
) => {
  const total = generateAlias();
  selection.query.total = false;
  fieldAliasMap[selection.root] = Object.assign(
    fieldAliasMap[selection.root] || {},
    { total }
  );
  return total;
};