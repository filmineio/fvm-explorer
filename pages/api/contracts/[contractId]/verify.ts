// TODO Implement followind
import { NextApiRequest, NextApiResponse } from "next";

import { getCtx } from "@/api/ctx/apiCtx";
import { handle } from "@/api/ctx/contracts/verify/utils/handleVerifyRequest";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await getCtx();
  res.json(await handle(ctx, req));
};
