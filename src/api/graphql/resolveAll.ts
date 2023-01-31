import { Network } from "@/enums/Network";
import { QuerySchema } from "@/schema/types/QuerySchema";
import { validateOrderBy } from "@/schema/validation/validateOrderBy";

import { getCtx } from "@/api/ctx/apiCtx";

import { isEnum } from "@/utils/isEnum";


const reduceSelectionSet = (selectionSet: any) => {
  return selectionSet.selections.reduce((p: string[], c: any) => {
    if (c.selectionSet?.selections) {
      return [...p, ...reduceSelectionSet(c.selectionSet)];
    }

    return [...p, c.name.value];
  }, []);
};
export const resolveAll = async (
  _: any,
  { query, network, order, pagination = { limit: 50, offset: 0 } }: any,
  __: any,
  { fieldNodes, fieldName }: any
) => {
  if (!isEnum(Network, network)) {
    throw { exception: "INVALID_NETWORK" };
  }

  validateOrderBy([order.orderBy, order.orderDirection], fieldName);

  const selection = fieldNodes
    .map(({ selectionSet }: any) => reduceSelectionSet(selectionSet))
    .pop();

  const querySchema = {
    query,
    selection,
    pagination,
    order: [order.orderBy, order.orderDirection],
    fieldName,
  };

  const ctx = await getCtx();

  return ctx.database.ch.data.chain[network as Network].query(
    querySchema as QuerySchema
  );
};