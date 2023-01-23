import { Entity } from "@/enums/Entity";
import { QueryOrder } from "@/schema/types/QuerySchema";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";

export const validateOrderBy = (order: QueryOrder, kind: Entity) => {
  let invalid = !Object.keys(getModel(kind)).includes(order[0]);
  if (invalid) throw "INVALID_ORDER_BY";
};