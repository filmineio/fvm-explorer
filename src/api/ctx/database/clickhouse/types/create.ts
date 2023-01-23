import { CHModel } from "@/schema/types/CHModel";
import { Key } from "@/schema/types/Key";

import { OperationStatus } from "@/types/ApiResponse";

export type Create = <V = unknown>(
  model: CHModel<V>,
  data: Partial<V>,
  identifier: [Key<V>, string]
) => Promise<(V & Record<"total", number>)[] | OperationStatus.Error>;