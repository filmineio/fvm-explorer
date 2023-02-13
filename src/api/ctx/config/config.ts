import clickhouseConfig, { ClickhouseConfig } from "./clickhouse.config";

import authConfig, { AuthConfig } from "@/api/ctx/config/auth.config";
import web3StorageConfig, { Web3StorageConfig } from "./web3.config";

export type APIConfig = {
  clickhouse: {
    wallaby: ClickhouseConfig;
    hyperspace: ClickhouseConfig;
    userdata: ClickhouseConfig;
  };
  auth: AuthConfig;
  web3Storage: Web3StorageConfig;
};

export const apiConfig: APIConfig = {
  clickhouse: clickhouseConfig,
  auth: authConfig,
  web3Storage: web3StorageConfig
};
