import { Network } from "@/enums/Network";

export type LotusConfig = {
  url: string;
  token?: string;
};

const lotusWallabyConfig: LotusConfig = {
  url: process.env.WALLABY_LOTUS_URL as string,
  token: process.env.WALLABY_LOTUS_TOKEN as string,
};

const lotusHyperspaceConfig: LotusConfig = {
  url: process.env.HYPERSPACE_LOTUS_URL as string,
  token: process.env.HYPERSPACE_LOTUS_TOKEN as string,
};

export default {
  [Network.Wallaby]: lotusWallabyConfig,
  [Network.HyperSpace]: lotusHyperspaceConfig,
};
