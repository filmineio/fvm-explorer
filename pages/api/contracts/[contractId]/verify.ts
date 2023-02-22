import { NextApiRequest, NextApiResponse } from "next";

import { OperationStatus } from "@/types/ApiResponse";

import { handle } from "@/api/contracts/verify/utils/handleVerifyRequest";
import { getCtx } from "@/api/ctx/apiCtx";
import { identifyUser } from "@/api/utils/identifyUser";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await getCtx();
  const user = await identifyUser(ctx, req);

  if (user === OperationStatus.Error) return res.status(401).end();

  try {
    res.json(await handle(ctx, req));
  } catch (e) {
    console.log(e);
    return res.status(400).json({ exception: e });
  }
};
