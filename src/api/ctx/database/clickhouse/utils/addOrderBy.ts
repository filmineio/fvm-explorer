import { FieldAliasMap } from "@/schema/types/AliasMap";
import { QueryOrder } from "@/schema/types/QuerySchema";

export const addOrderBy = (
  query: string,
  root: string,
  map: FieldAliasMap,
  queryOrder?: QueryOrder
) => {
  if (!queryOrder) return query;

  const [orderBy, orderDirection] = queryOrder;
  return query + ` order by "${map[root][orderBy]}" ${orderDirection}`;
};