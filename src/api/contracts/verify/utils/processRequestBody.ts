import { NextApiRequest } from "next";

import { VerificationRequest } from "@/api/contracts/verify/types/VerificationRequest";

export const processRequestBody = (req: NextApiRequest) => {
  // TODO: Add validation of CID, etc
  return req.body as VerificationRequest;
};
