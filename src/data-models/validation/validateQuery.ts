import { isValidQuery } from "./isValidQuery";
import { Entity } from "@/enums/Entity";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { CHModel } from "@/schema/types/CHModel";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";

export const validateQuery = <M = CHModel<unknown>>(
  query: Record<keyof M, CHMFieldQuery>[],
  kind: Entity
) => {
  const model = getModel(kind);

  if (Array.isArray(query)) {
    if (query.some((q) => !isValidQuery(model, q))) {
      throw "INVALID_QUERY";
    }
  } else {
    if (!isValidQuery(model, query)) {
      throw "INVALID_QUERY";
    }
  }
};