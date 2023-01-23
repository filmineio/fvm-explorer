import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";

import { Project } from "@/types/data/Project";

export const projectChm: CHModel<Project> = {
  kind: Entity.Transaction,
  table: "projects",
  id: { kind: "string" },
  name: { kind: "string" },
  contracts: { kind: "string" },
  owner: { kind: "string" },
};