import { NextApiRequest, NextApiResponse } from "next";

import { getCtx } from "@/api/ctx/apiCtx";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = await getCtx();
  const token = ctx.auth.utils.extractAuthToken(req);

  if (!token) {
    return res.status(401).end();
  }

  try {
    const data = await ctx.auth.magic.users.getMetadataByToken(token);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
};