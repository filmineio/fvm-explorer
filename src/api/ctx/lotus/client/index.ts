import fetch from "@adobe/node-fetch-retry";
// @ts-ignore
import { NodejsProvider } from "@filecoin-shipyard/lotus-client-provider-nodejs";
import { LotusRPC } from "@filecoin-shipyard/lotus-client-rpc";

import { LotusConfig } from "@/api/ctx/config/lotus.config";
import { CustomSchema } from "@/api/ctx/lotus/client/schemas/custom.schema";
import { LotusClient } from "@/api/ctx/lotus/client/typings/lotus-client-rpc";

export const getLotusClient = (config: LotusConfig): LotusClient => {
  const fetchRetry: typeof fetch = (url, init) =>
    fetch(url, {
      ...init,
      retryOptions: {
        ...config.retryOptions,
        retryOnHttpError: (e) => true,
        retryOnHttpResponse: (response) => {
          return response.error ? true : false;
        },
      },
    });

  const provider = new NodejsProvider(config.url, {
    token: config.token,
    sendHttpContentType: "application/json",
    fetch: fetchRetry,
  });
  return new LotusRPC(provider, {
    schema: CustomSchema,
  }) as LotusClient;
};
