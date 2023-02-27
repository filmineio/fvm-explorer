import { Network } from "@/enums/Network";

export type LotusConfig = {
  url: string;
  token?: string;
};

const lotusWallabyConfig: (env?: typeof process.env) => LotusConfig = (
  env = process.env
) => ({
  url: process.env.WALLABY_LOTUS_URL as string,
  token: process.env.WALLABY_LOTUS_TOKEN as string,
});

const lotusHyperspaceConfig: (env?: typeof process.env) => LotusConfig = (
  env = process.env
) => ({
  url: process.env.HYPERSPACE_LOTUS_URL as string,
  token: process.env.HYPERSPACE_LOTUS_TOKEN as string,
});

export default (env = process.env) => ({
  [Network.Wallaby]: lotusWallabyConfig(env),
  [Network.HyperSpace]: lotusHyperspaceConfig(env),
});