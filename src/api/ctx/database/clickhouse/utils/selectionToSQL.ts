import { FieldAliasMap, TableAliasMap } from "@/schema/types/AliasMap";

import { attachTotalAlias } from "@/api/ctx/database/clickhouse/utils/attachTotalAlias";
import { getSelectedFields } from "@/api/ctx/database/clickhouse/utils/getSelectedFields";

export const selectionToSQL = (
  tableAlias: TableAliasMap,
  fieldAliasMap: FieldAliasMap,
  selection: { root: string; query: Record<string, boolean> }
): string => {
  try {
    const total = attachTotalAlias(fieldAliasMap, selection);
    const selectedFields = getSelectedFields(
      tableAlias,
      fieldAliasMap,
      selection
    );
    return `select COUNT(*) OVER() as ${total}, ${selectedFields.join(",")}`;
  } catch (e) {
    console.log(e);
    return "select *";
  }
};