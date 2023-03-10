import { VerificationRequest } from "@/handlers/contracts/verify/types/VerificationRequest";
import { Request } from "express";

export const processRequestBody = (req: Request) => {
  // TODO: Add validation of CID, etc
  const { body } = req;
  // Default to latest solidity version
  return body as VerificationRequest;
};
