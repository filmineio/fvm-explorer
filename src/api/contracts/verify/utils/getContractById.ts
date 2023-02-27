import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";

import { Contract } from "@/types/data/Contract";

import { ApiCtx } from "@/api/ctx/apiCtx";

export const getContractById = async (
  ctx: ApiCtx,
  network: Network,
  contractId: string
): Promise<(Contract & Record<"total", number>) | undefined> => {
  const [contract] = await ctx.database.ch.data.chain[network].query({
    fieldName: Entity.Contract,
    selection: [],
    query: [
      {
        contractId: {
          is: contractId,
        },
      },
    ],
    order: ["contractId", "ASC"],
    pagination: {
      limit: 1,
      offset: 0,
    },
    final: true,
  });

  return contract as (Contract & Record<"total", number>) | undefined;
};
