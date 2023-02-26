import { Web3Storage } from "web3.storage";

import { UIConfig } from "@/ui/ctx/config/config";

export const makeStorageClient = (config: UIConfig["w3s"]) => {
  return new Web3Storage(config);
};