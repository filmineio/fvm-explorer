import { Network } from "@/enums/Network";
import { NextApiRequest, NextApiResponse } from "next";

import { getCtx } from "@/api/ctx/apiCtx";

import { standardizeResponse } from "@/utils/standardizeResponse";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await getCtx();
  const network = req.query.network as Network;
  const body = req.body;
  console.log(body, network);
  try {
    const result = await ctx.lotus[network].stateDecodeParams(
      body.actorId,
      +body.method,
      body.params,
      [{ "/": body.block }]
    );

    return res.status(200).json(standardizeResponse([result]));
  } catch (e) {
    console.log(e);
    return res.status(400).json({ exception: e });
  }
};