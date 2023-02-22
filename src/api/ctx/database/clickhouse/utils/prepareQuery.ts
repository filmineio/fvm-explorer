import { CHModel } from "@/schema/types//CHModel";
import { QueryOrder, QuerySchema } from "@/schema/types//QuerySchema";
import { TableAliasMap } from "@/schema/types/AliasMap";

import { addOrderBy } from "@/api/ctx/database/clickhouse/utils/addOrderBy";
import { addPagination } from "@/api/ctx/database/clickhouse/utils/addPagination";
import { queryToSQL } from "@/api/ctx/database/clickhouse/utils/queryToSQL";
import { reduceSelectionSet } from "@/api/ctx/database/clickhouse/utils/reduceSelectionSet";
import { resolveSchema } from "@/api/ctx/database/clickhouse/utils/resolveSchema";
import { resolveSource } from "@/api/ctx/database/clickhouse/utils/resolveSource";
import { selectionToSQL } from "@/api/ctx/database/clickhouse/utils/selectionToSQL";

export function prepareQuery<T = CHModel<unknown>>(schema: QuerySchema<T>) {
  const order = schema.order;

  const selection = reduceSelectionSet(
    schema.selection,
    schema.fieldName,
    order as QueryOrder<T>
  );
  const pagination = schema.pagination;

  const map: TableAliasMap = { root: "", alias: "" };
  const [selectionSchema] = resolveSchema(map, schema.fieldName, selection);
  const querySchema = resolveSchema(map, schema.fieldName, schema.query);

  const fieldAliasMap = {};

  const query = `${selectionToSQL(
    map,
    fieldAliasMap,
    selectionSchema
  )}${resolveSource(map, schema.final)} ${querySchema.length ? "where" : ""} ${queryToSQL(
    querySchema
  )}`;

  return {
    selection: selectionSchema,
    fieldAliasMap,
    query: addPagination(
      addOrderBy(query, map.root, fieldAliasMap, order),
      pagination
    ),
  };
}