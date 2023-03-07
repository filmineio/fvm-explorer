import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";

import { Contract } from "@/types/data/Contract";

export const contractChm: CHModel<Contract> = {
  kind: Entity.Contract,
  table: "contracts",
  cid: { kind: "string" },
  contractAddress: { kind: "string" },
  contractId: { kind: "string" },
  contractActorAddress: { kind: "string" },
  ethAddress: { kind: "string" },
  ownerAddress: { kind: "string" },
  ownerId: { kind: "string" },
  bytecode: { kind: "string" },
  contractType: { kind: "string" },
  compiler: { kind: "string" },
};
