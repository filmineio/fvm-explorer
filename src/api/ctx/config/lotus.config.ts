import { Network } from "@/enums/Network";
import { RetryOptions } from "@adobe/node-fetch-retry";

export type LotusConfig = {
  url: string;
  token?: string;
  retryOptions?: Pick<RetryOptions, "socketTimeout" | "retryMaxDuration">;
};

const lotusMainnetConfig: (env?: typeof process.env) => LotusConfig = (
  env = process.env
) => ({
  url: process.env.MAINNET_LOTUS_URL as string,
  token: process.env.MAINNET_LOTUS_TOKEN as string,
  retryOptions: {
    socketTimeout: +(process.env.LOTUS_SOCKET_TIMEOUT || 180000),
    // Without retryMaxDuration defined it will default to 60000ms and socketTimeout
    // will default to 30000ms if socketTimeout >= retryMaxDuration
    // We set retryMaxDuration to 5 x of socketTimeout value,
    // hence making it possible to retry max 5 times before request timing out.
    retryMaxDuration: +(process.env.LOTUS_SOCKET_TIMEOUT || 180000) * 5,
  },
});

const lotusHyperspaceConfig: (env?: typeof process.env) => LotusConfig = (
  env = process.env
) => ({
  url: process.env.HYPERSPACE_LOTUS_URL as string,
  token: process.env.HYPERSPACE_LOTUS_TOKEN as string,
  retryOptions: {
    socketTimeout: +(process.env.LOTUS_SOCKET_TIMEOUT || 180000),
    // Without retryMaxDuration defined it will default to 60000ms and socketTimeout
    // will default to 30000ms if socketTimeout >= retryMaxDuration
    // We set retryMaxDuration to 5 x of socketTimeout value,
    // hence making it possible to retry max 5 times before request timing out.
    retryMaxDuration: +(process.env.LOTUS_SOCKET_TIMEOUT || 180000) * 5,
  },
});

export default (env = process.env) => ({
  [Network.Mainnet]: lotusMainnetConfig(env),
  [Network.HyperSpace]: lotusHyperspaceConfig(env),
});
