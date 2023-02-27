// @ts-ignore
import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";

import { LotusConfig } from "@/api/ctx/config/lotus.config";
import { LotusClient } from "@/api/ctx/lotus/client/typings/lotus-client-rpc";
import { CustomSchema } from "@/api/ctx/lotus/client/schemas/custom.schema";


export const getLotusClient = (config: LotusConfig): LotusClient => {
  const provider = new NodejsProvider(config.url, { token: config.token, sendHttpContentType: 'application/json' });
  return new LotusRPC(provider, {
    schema: CustomSchema,
  }) as LotusClient;
};
