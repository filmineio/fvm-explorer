import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";

import { UserMeta } from "@/types/data/UserMeta";

export const userMetaChm: CHModel<UserMeta> = {
  kind: Entity.UserMeta,
  table: "user_meta",
  email: { kind: "string" },
  watchedAddress: { kind: "string" },
};