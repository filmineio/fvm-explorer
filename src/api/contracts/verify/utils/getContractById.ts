import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";

import { ApiCtx } from "@/api/ctx/apiCtx";

export const getContractById = (
  ctx: ApiCtx,
  network: Network,
  contractId: string
) => {
  return ctx.database.ch.data.chain[network].query({
    fieldName: Entity.Contract,
    selection: ["*"],
    query: [
      {
        ContractId: {
          is: contractId,
        },
      },
    ],
    order: ["ContractId", "ASC"],
    pagination: {
      limit: 1,
      offset: 0,
    },
  });
};
