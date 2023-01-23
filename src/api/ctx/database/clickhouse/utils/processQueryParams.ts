import { Entity } from "@/enums/Entity";
import { QueryOrder, QuerySchema } from "@/schema/types/QuerySchema";
import { validateQueryParams } from "@/schema/validation/validateQueryParams";
import { NextApiRequest } from "next";

import { parse } from "@/utils/parse";

export const processQueryParams = (
  req: NextApiRequest,
  entityKind: Entity
): QuerySchema => {
  const query = parse(req.query.query as string, []);
  const selection = parse(req.query.selection as string, []);
  const pagination = parse(req.query.pagination as string, {
    limit: 1,
    offset: 0,
  });
  const order: QueryOrder = parse(req.query.order as string, [
    "height",
    "DESC",
  ]);

  const querySchema = {
    query,
    selection,
    pagination,
    order,
    fieldName: entityKind,
  };

  validateQueryParams(entityKind, querySchema);

  return querySchema;
};