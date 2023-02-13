import { NextApiRequest } from "next";

import { VerificationRequest } from "@/api/ctx/contracts/verify/types/VerificationRequest";
import { SolidityVersion } from "@/api/ctx/contracts/verify/enums/SolidityVersion";

export const processRequestBody = (req: NextApiRequest) => {
  const body = parse(req.body, {
    solidityVersion: SolidityVersion.Latest,
    optimise: false,
  } as VerificationRequest);
  // TODO: Add validation of CID, etc
  return body;
};

const parse = <T>(value: unknown, defaultValue: T): T => {
  if (value === undefined) {
    return defaultValue;
  }

  return value as T;
};
