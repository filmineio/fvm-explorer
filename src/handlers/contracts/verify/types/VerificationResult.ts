import { ContractVerificationStatus } from "@/enums/ContractVerificationStatus";

export type VerificationResult = {
  status: ContractVerificationStatus;
  errors: any[];
  warnings: any[];
  contractBytecode: string;
  contractCode: string;
  solidityVersion: string;
  abi?: unknown;
  solcOutput?: unknown;
};
