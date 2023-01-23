import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";
import { QueryOrder } from "@/schema/types/QuerySchema";
import { uniq } from "ramda";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";
import { isModelFieldExposed } from "@/api/ctx/database/clickhouse/utils/isModelFieldExposed";

export const reduceSelectionSet = <T = CHModel<unknown>>(
  selectionSet: (keyof T)[],
  kind: Entity,
  order: QueryOrder<T>
) => {
  const model = getModel(kind);
  const selection =
    selectionSet.length === 0
      ? (Object.keys(model) as (keyof T)[])
      : uniq([...selectionSet, order[0]]);

  return Object.fromEntries(
    selection.filter(isModelFieldExposed).map((s) => [s, true])
  );
};