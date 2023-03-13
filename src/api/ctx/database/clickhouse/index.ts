import { APIConfig } from "../../config/config";
import { Network } from "@/enums/Network";
import { SchemaValidation } from "@/schema/types/QuerySchema";
import { validateQueryParams } from "@/schema/validation/validateQueryParams";

import {
  getReadClient,
  getWriteClient,
} from "@/api/ctx/database/clickhouse/client";
import { ClickhouseWriteClient } from "@/api/ctx/database/clickhouse/types/ClickhouseWriteClient";
import { ClickhouseClient } from "@/api/ctx/database/clickhouse/types/clickhouseClient";

export type ClickhouseDB = {
  data: {
    chain: Record<Network, ClickhouseWriteClient>;
    users: ClickhouseWriteClient;
  };
} & {
  validation: SchemaValidation;
};

export const initClient = (config: APIConfig["clickhouse"]): ClickhouseDB => {
  return {
    data: {
      chain: {
        [Network.Mainnet]: getWriteClient(config.mainnet),
        [Network.HyperSpace]: getWriteClient(config.hyperspace),
      },
      users: getWriteClient(config.userdata),
    },
    validation: {
      validateQueryParams,
    },
  };
};
