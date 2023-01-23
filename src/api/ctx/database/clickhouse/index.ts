import { APIConfig } from "../../config/config";
import { Network } from "@/enums/Network";
import { QuerySchema, SchemaValidation } from "@/schema/types/QuerySchema";
import { validateQueryParams } from "@/schema/validation/validateQueryParams";
import { ResultSet, createClient } from "@clickhouse/client";
import { InsertParams } from "@clickhouse/client/dist/client";

import { queryRunner } from "@/api/ctx/database/clickhouse/utils/queryRunner";

export type ClickhouseClient = {
  query: <T>(schema: QuerySchema) => Promise<(T & Record<"total", number>)[]>;
  raw: (query: string) => Promise<ResultSet>;
  insert: <T>(params: InsertParams<T>) => Promise<void>;
};

export type ClickhouseDB = Record<
  "chaindata",
  Record<Network, ClickhouseClient>
> & {
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
    chaindata: {
      [Network.Wallaby]: {
        raw: (query: string) => wallaby.query({ query }),
        query: queryRunner(wallaby),
        insert: wallaby.insert,
      },
      [Network.HyperSpace]: {
        raw: (query: string) => hyperspace.query({ query }),
        query: queryRunner(hyperspace),
        insert: hyperspace.insert,
      },
    },
    validation: {
      validateQueryParams,
    },
  };
};