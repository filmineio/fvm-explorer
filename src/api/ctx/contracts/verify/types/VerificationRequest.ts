import { SolidityVersion } from "@/api/ctx/contracts/verify/enums/SolidityVersion";

export type VerificationRequest = {
  solidityVersion: SolidityVersion;
  contractName: string;
  contractsZipCID: string;
  optimise: boolean;
};
