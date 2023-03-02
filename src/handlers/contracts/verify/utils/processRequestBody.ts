import { Request } from "express";
import { VerificationRequest } from "@/handlers/contracts/verify/types/VerificationRequest";
import { SolidityVersion } from "@/enums/SolidityVersion";

export const processRequestBody = (req: Request) => {
  // TODO: Add validation of CID, etc
  const { body } = req;
  // Default to latest solidity version
  const solidityVersion = body.solidityVersion || SolidityVersion.Latest;
  return { ...body, solidityVersion } as VerificationRequest;
};
