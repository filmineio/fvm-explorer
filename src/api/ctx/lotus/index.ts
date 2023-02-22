import { Network } from "@/enums/Network";

import { APIConfig } from "@/api/ctx/config/config";
import { getLotusClient } from "@/api/ctx/lotus/client";
import { LotusClient } from "@/api/ctx/lotus/client/typings/lotus-client-rpc";

export type Lotus = {
  chain: Record<Network, LotusClient>;
};

export const initLotus = (config: APIConfig["lotus"]): Lotus => {
  return {
    chain: {
      [Network.Wallaby]: getLotusClient(config.wallaby),
      [Network.HyperSpace]: getLotusClient(config.hyperspace),
    },
  };
};