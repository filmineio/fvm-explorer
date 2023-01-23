import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextApiRequest } from "next";

import { ApiCtx } from "@/api/ctx/apiCtx";
import { processQueryParams } from "@/api/ctx/database/clickhouse/utils/processQueryParams";

import { standardizeResponse } from "@/utils/standardizeResponse";

export const handle = async (
  ctx: ApiCtx,
  req: NextApiRequest,
  kind: Entity,
  network: Network
) =>
  standardizeResponse(
    await ctx.database.ch.chaindata[network].query(
      processQueryParams(req, kind)
    ),
    req.query.network as Network
  );