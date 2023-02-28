import { Request } from "express";
import { VerificationRequest } from "@/handlers/contracts/verify/types/VerificationRequest";

export const processRequestBody = (req: Request) => {
  // TODO: Add validation of CID, etc
  return req.body as VerificationRequest;
};
