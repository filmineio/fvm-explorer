import { SolidityVersion } from "@/api/ctx/contracts/verify/enums/SolidityVersion";

export type VerificationRequest = {
  solidityVersion: SolidityVersion;
  contractName: string;
  contractSource: string;
  optimise: boolean;
};
