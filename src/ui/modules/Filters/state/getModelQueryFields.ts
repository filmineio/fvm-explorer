import { Entity } from "@/enums/Entity";

import {
  BlockQueryFields,
  ContractQueryField,
  TransactionQueryFields,
} from "@/ui/modules/Filters/state/state";

export const getModelQueryFields = (kind: Entity) => {
  switch (kind) {
    case Entity.Block:
      return Object.values(BlockQueryFields);
    case Entity.Contract:
      return Object.values(ContractQueryField);
    case Entity.Transaction:
      return Object.values(TransactionQueryFields);
    default:
      return [];
  }
};