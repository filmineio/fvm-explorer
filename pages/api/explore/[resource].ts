import { Entity } from "@/enums/Entity";
import { Network } from "@/enums/Network";
import { NextApiRequest, NextApiResponse } from "next";

import { getCtx } from "@/api/ctx/apiCtx";
import { handle } from "@/api/ctx/database/clickhouse/utils/handleExploreRequest";

import { isEnum } from "@/utils/isEnum";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const resource: Entity = req.query.resource as Entity;
  const network: Network = req.query.network as Network;

  if (!isEnum(Network, network)) {
    return res.status(400).json({ exception: "INVALID_NETWORK" });
  }

  if (!isEnum(Entity, resource)) {
    return res.status(400).json({ exception: "INVALID_RESOURCE" });
  }

  try {
    const ctx = await getCtx();
    res.json(await handle(ctx, req, resource, network));
  } catch (e) {
    return res.status(400).json({ exception: e });
  }
};