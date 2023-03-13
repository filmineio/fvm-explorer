import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { groupBy, pickAll } from "ramda";

import { Block } from "@/types/data/Block";

import { ApiCtx } from "@/api/ctx/apiCtx";


type DbResponse<T> = T & Record<"total", number>;
export const getLatestTipSets = async (nwk: Network, ctx: ApiCtx) => {
  const data = await ctx.database.ch.data.chain[nwk].query<Block>({
    pagination: { limit: 50, offset: 0 },
    order: ["height", "DESC"],
    fieldName: Entity.Block,
    selection: ["height", "cid", "miner"],
    query: [
      {
        height: { isNull: false },
      },
    ],
  });

  const v = groupBy<DbResponse<Block>>((a) => a.height.toString(), data);

  return Object.keys(v)
    .sort((a, b) => +b - +a)
    .slice(0, 1)
    .map((z) => ({
      height: z,
      blocks: v[z].map(pickAll(["cid", "miner"])),
    }));
};