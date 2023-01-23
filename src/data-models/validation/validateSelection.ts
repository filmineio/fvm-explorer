import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";
import { Key } from "@/schema/types/Key";

import { getModel } from "@/api/ctx/database/clickhouse/utils/getModel";

export const validateSelection = <M = CHModel<unknown>>(
  selection: Key<M>[],
  kind: Entity
) => {
  let invalid = selection.some(
    (s) => !Object.keys(getModel(kind)).includes(s as string)
  );
  if (invalid) throw "INVALID_SELECTION";
};