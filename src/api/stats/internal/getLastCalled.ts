import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";

import { Transaction } from "@/types/data/Transaction";

import { ApiCtx } from "@/api/ctx/apiCtx";

export const getLastCalled = async (nwk: Network, ctx: ApiCtx) => {
  const data = await ctx.database.ch.data.chain[nwk].query<Transaction>({
    pagination: { limit: 50, offset: 0 },
    order: ["timestamp", "DESC"],
    fieldName: Entity.Transaction,
    selection: ["robustFrom", "robustTo"],
    query: [
      {
        to: { startsWith: nwk === Network.HyperSpace ? "t04" : "f04" },
      },
      {
        from: { startsWith: nwk === Network.HyperSpace ? "t04" : "f04" },
      },
    ],
  });

  const v = data.reduce((p, c) => {
    if (!c.robustFrom || !c.robustTo) return p;

    if (!p[c.robustTo]) {
      p[c.robustTo] = c.timestamp;
    } else if (!p[c.robustFrom]) {
      p[c.robustFrom] = c.timestamp;
    }

    return p;
  }, {} as Record<string, number>);

  return Object.keys(v)
    .filter((z) => z.startsWith(nwk === Network.HyperSpace ? "t04" : "f04"))
    .map((z) => ({
      contractAddress: z,
      timestamp: v[z] * 1000,
    }));
};