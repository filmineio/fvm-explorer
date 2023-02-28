import { MagicUserMetadata } from "@magic-sdk/admin/dist/cjs/types";
import { Request } from "express";
import { NextApiRequest } from "next";

import { OperationStatus } from "@/types/ApiResponse";

import { ApiCtx } from "@/api/ctx/apiCtx";

export const identifyUser = async (
  ctx: ApiCtx,
  req: NextApiRequest | Request
): Promise<MagicUserMetadata | OperationStatus.Error> => {
  const token = ctx.auth.utils.extractAuthToken(req);

  if (!token) {
    return OperationStatus.Error;
  }

  const data = await ctx.auth.magic.users.getMetadataByToken(token);

  if (!data) {
    return OperationStatus.Error;
  }

  return data;
};
