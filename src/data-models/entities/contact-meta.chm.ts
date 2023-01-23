import { Entity } from "@/enums/Entity";
import { CHModel } from "@/schema/types/CHModel";

import { ContractMeta } from "@/types/data/ContractMeta";

export const contactMetaChm: CHModel<ContractMeta> = {
  kind: Entity.Transaction,
  table: "contract_meta",
  contractAddress: { kind: "string" },
  abiCid: { kind: "string" },
  mainCid: { kind: "string" },
  name: { kind: "string" },
  compilerVersion: { kind: "string" },
  fileMap: { kind: "string" },
  sigCid: { kind: "string" },
  binCid: { kind: "string" },
  isPublic: { kind: "bool" },
  owner: { kind: "string" },
};