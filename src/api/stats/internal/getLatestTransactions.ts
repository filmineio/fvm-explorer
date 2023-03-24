import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { omit } from "ramda";

import { Transaction } from "@/types/data/Transaction";

import { ApiCtx } from "@/api/ctx/apiCtx";

export const getLatestTransactions = async (nwk: Network, ctx: ApiCtx) => {
  const data = await ctx.database.ch.data.chain[nwk].query<Transaction>({
    pagination: { limit: 50, offset: 0 },
    order: ["timestamp", "DESC"],
    fieldName: Entity.Transaction,
    selection: [
      "cid",
      "from",
      "to",
      "robustFrom",
      "robustTo",
      "value",
      "messageRctGasUsed",
      "timestamp",
      "messageRctExitCode",
    ],
    query: [
      {
        timestamp: { isNull: false },
      },
    ],
  });

  return data.map((v) => omit(["total"], v));
};