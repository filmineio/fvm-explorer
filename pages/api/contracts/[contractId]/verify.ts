import { NextApiRequest, NextApiResponse } from "next";

import { handle } from "@/api/contracts/verify/utils/handleVerifyRequest";
import { getCtx } from "@/api/ctx/apiCtx";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const ctx = await getCtx();
    res.json(await handle(ctx, req));
  } catch (e) {
    console.error(e);
    return res.status(400).json({ exception: e });
  }
};
