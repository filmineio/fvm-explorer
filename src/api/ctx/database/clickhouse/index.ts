import { validateQueryParams } from "../../../../data-models/validation/validateQueryParams";
import { APIConfig } from "../../config/config";
import { Network } from "@/enums/Network";
import { QuerySchema, SchemaValidation } from "@/schema/types/QuerySchema";
import { ResultSet, createClient } from "@clickhouse/client";

import { queryRunner } from "@/api/ctx/database/clickhouse/utils/queryRunner";

export type ClickhouseClient = {
  query: <T>(schema: QuerySchema) => Promise<(T & Record<"total", number>)[]>;
  raw: (query: string) => Promise<ResultSet>;
};

export type ClickhouseDB = Record<Network, ClickhouseClient> & {
  validation: SchemaValidation;
};

export const initClient = (config: APIConfig["clickhouse"]): ClickhouseDB => {
  const wallaby = createClient({
    host: config.wallaby.host,
    username: config.wallaby.username,
    password: config.wallaby.password,
    database: config.wallaby.database,
  });
  const hyperspace = createClient({
    host: config.hyperspace.host,
    username: config.hyperspace.username,
    password: config.hyperspace.password,
    database: config.hyperspace.database,
  });

  return {
    [Network.Wallaby]: {
      raw: (query: string) => wallaby.query({ query }),
      query: queryRunner(wallaby),
    },
    [Network.HyperSpace]: {
      raw: (query: string) => hyperspace.query({ query }),
      query: queryRunner(hyperspace),
    },
    validation: {
      validateQueryParams,
    },
  };
};