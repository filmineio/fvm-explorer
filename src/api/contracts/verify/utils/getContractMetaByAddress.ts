import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";

import { ContractMeta } from "@/types/data/ContractMeta";

import { ApiCtx } from "@/api/ctx/apiCtx";

export const getContractMetaByAddress = async (
  ctx: ApiCtx,
  network: Network,
  contractAddress: string
): Promise<(ContractMeta & Record<"total", number>) | undefined> => {
  const [contractMeta] = await ctx.database.ch.data.chain[network].query({
    fieldName: Entity.ContractMeta,
    selection: [],
    query: [
      {
        contractAddress: {
          is: contractAddress,
        },
      },
    ],
    order: ["contractAddress", "ASC"],
    pagination: {
      limit: 1,
      offset: 0,
    },
    final: true,
  });

  return contractMeta as (ContractMeta & Record<"total", number>) | undefined;
};
