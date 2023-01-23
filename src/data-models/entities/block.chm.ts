import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";

import { Block } from "@/types/data/Block";

export const blockChm: CHModel<Block> = {
  kind: Entity.Block,
  table: "block",
  cid: { kind: "string" },
  block: { kind: "string" },
  height: { kind: "number" },
  timestamp: { kind: "number" },
  miner: { kind: "string" },
};