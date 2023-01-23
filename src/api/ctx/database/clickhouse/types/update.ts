import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { CHModel } from "@/schema/types/CHModel";
import { Key } from "@/schema/types/Key";

import { OperationStatus } from "@/types/ApiResponse";

export type Update = <V = unknown>(
  model: CHModel<V>,
  criteria: Partial<Record<Key<V>, CHMFieldQuery>>,
  data: Partial<V>,
  primaryKey: Key<V>
) => Promise<(V & Record<"total", number>)[] | OperationStatus.Error>;