import { AuthUtils, authUtils } from "./auth/utils";
import { apiConfig } from "./config/config";
import { ClickhouseDB, initClient } from "./database/clickhouse";

import { MagicClient, initMagicClient } from "@/api/ctx/auth/magic";
import { Sealer, initSealer } from "@/api/ctx/auth/sealer";


export type ApiCtx = {
  version: string;
  database: {
    ch: ClickhouseDB;
  };
  auth: {
    sealer: Sealer;
    magic: MagicClient;
    utils: AuthUtils;
  };
};

let ctx: ApiCtx;
export const getCtx = async (): Promise<ApiCtx> => {
  console.log("CTX Exists: ", !!ctx);

  if (ctx) return ctx;
  ctx = {
    version: process.env.VERSION as string,
    database: {
      ch: initClient(apiConfig.clickhouse),
    },
    auth: {
      sealer: initSealer(apiConfig.auth),
      magic: initMagicClient(apiConfig.auth),
      utils: authUtils,
    },
  };

  return ctx;
};