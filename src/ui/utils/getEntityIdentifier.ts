import { Entity } from "@/enums/Entity";

import { Block } from "@/types/data/Block";
import { Contract } from "@/types/data/Contract";
import { Project } from "@/types/data/Project";
import { Transaction } from "@/types/data/Transaction";

export const getEntityIdentifier = (
  kind: Entity,
  v: Contract | Project | Block | Transaction
): string => {
  switch (kind) {
    case Entity.Contract:
      return (v as Contract).contractId || (v as Contract).contractAddress;
    case Entity.Block:
      return (v as Block).cid;
    case Entity.Transaction:
      return `${(v as Transaction).cid}-${(v as Transaction).block}`;
    case Entity.Project:
      return (v as Project).id;
    default:
      return "";
  }
};