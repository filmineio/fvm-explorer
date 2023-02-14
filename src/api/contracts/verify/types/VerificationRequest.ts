import { Network } from "@/enums/Network";
import { SolidityVersion } from "@/enums/SolidityVersion";

export type VerificationRequest = {
  network: Network;
  solidityVersion: SolidityVersion;
  contractName: string;
  contractsZipCID: string;
  optimise: boolean;
};
