import { Entity } from "@/enums/Entity";
import { TableAliasMap } from "@/schema/types/AliasMap";

import { getAlias } from "@/api/ctx/database/clickhouse/utils/alias";
import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";

export const resolveSchema = <T>(
  tableAliasMap: TableAliasMap,
  kind: Entity,
  query: unknown
) => {
  const model = getModel(kind);
  const root = model.table;
  getAlias(tableAliasMap, root);

  return (Array.isArray(query) ? query : [query]).map(
    (query) =>
      Object.entries(query).reduce(
        (p, [key, value]) => {
          return { ...p, query: { ...p.query, ...{ [key]: value } } };
        },
        {
          root: root,
          query: {},
        }
      ),
    {}
  );
};