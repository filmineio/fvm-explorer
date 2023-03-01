import { Web3Storage } from "web3.storage";

import { MagicClient, initMagicClient } from "@/api/ctx/auth/magic";
import { Sealer, initSealer } from "@/api/ctx/auth/sealer";
import { AuthUtils, authUtils } from "@/api/ctx/auth/utils";
import { apiConfig } from "@/api/ctx/config/config";
import { ClickhouseDB, initClient } from "@/api/ctx/database/clickhouse";
import { Lotus, initLotus } from "@/api/ctx/lotus";

export type ApiCtx = {
  version: string;
  database: {
    ch: ClickhouseDB;
  };
  lotus: Lotus;
  auth: {
    sealer: Sealer;
    magic: MagicClient;
    utils: AuthUtils;
  };
  web3storage: Web3Storage;
};

let ctx: ApiCtx;
export const getCtx = async (config = apiConfig()): Promise<ApiCtx> => {
  console.log("CTX Exists: ", !!ctx);

  if (ctx) return ctx;
  ctx = {
    version: process.env.VERSION as string,
    database: {
      ch: initClient(config.clickhouse),
    },
    lotus: initLotus(config.lotus),
    auth: {
      sealer: initSealer(config.auth),
      magic: initMagicClient(config.auth),
      utils: authUtils,
    },
    web3storage: new Web3Storage({ token: config.web3Storage.token }),
  } as never;

  return ctx;
};
