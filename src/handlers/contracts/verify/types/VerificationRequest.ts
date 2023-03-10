import { Network } from "@/enums/Network";

export type VerificationRequest = {
  network: Network;
  contractName: string;
  contractsZipCID: string;
  optimise: boolean;
  isPublic: boolean;
};
