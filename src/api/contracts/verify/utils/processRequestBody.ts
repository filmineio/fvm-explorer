import { SolidityVersion } from "@/enums/SolidityVersion";
import { NextApiRequest } from "next";

import { VerificationRequest } from "@/api/contracts/verify/types/VerificationRequest";

import { parse } from "@/utils/parse";

export const processRequestBody = (req: NextApiRequest) => {
  const body = parse(req.body, {
    solidityVersion: SolidityVersion.Latest,
    optimise: false,
  } as VerificationRequest);
  // TODO: Add validation of CID, etc
  return body;
};
