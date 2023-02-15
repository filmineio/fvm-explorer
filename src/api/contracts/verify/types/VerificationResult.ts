import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";

export type VerificationResult = {
  status: ContractVerificationStatus;
  errors: any[];
  warnings: any[];
  contractBytecode: string;
  contractCode: string;
  abi?: unknown;
};
