import clickhouseConfig, { ClickhouseConfig } from "./clickhouse.config";

import authConfig, { AuthConfig } from "@/api/ctx/config/auth.config";
import lotusConfig, { LotusConfig } from "@/api/ctx/config/lotus.config";
import web3StorageConfig, {
  Web3StorageConfig,
} from "@/api/ctx/config/web3.config";

export type APIConfig = {
  clickhouse: {
    wallaby: ClickhouseConfig;
    hyperspace: ClickhouseConfig;
    userdata: ClickhouseConfig;
  };
  lotus: {
    wallaby: LotusConfig;
    hyperspace: LotusConfig;
  };
  auth: AuthConfig;
  web3Storage: Web3StorageConfig;
};

export const apiConfig: APIConfig = {
  clickhouse: clickhouseConfig,
  auth: authConfig,
  lotus: lotusConfig,
  web3Storage: web3StorageConfig,
};
