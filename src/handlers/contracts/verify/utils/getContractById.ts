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
    selection: [
      "contractAddress",
      "contractId",
      "contractActorAddress",
      "ethAddress",
      "ownerAddress",
      "ownerId",
    ],
    query: [
      {
        contractAddress: {
          is: contractId,
        },
      },
    ],
    order: ["ethAddress", "ASC"],
    pagination: {
      limit: 1,
      offset: 0,
    },
    final: true,
  });

  return contract as (Contract & Record<"total", number>) | undefined;
};