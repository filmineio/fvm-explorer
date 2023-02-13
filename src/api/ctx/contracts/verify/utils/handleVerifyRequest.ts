import { NextApiRequest } from "next";

import { ApiCtx } from "@/api/ctx/apiCtx";
import { verify } from "@/api/ctx/contracts/verify";
import { processRequestBody } from "@/api/ctx/contracts/verify/utils/processRequestBody";

export const handle = async (ctx: ApiCtx, req: NextApiRequest) => {
  const validationRequest = processRequestBody(req);
  return verify(ctx, validationRequest);
};
