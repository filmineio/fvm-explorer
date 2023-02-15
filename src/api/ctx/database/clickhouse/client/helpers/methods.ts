import { ClickhouseWriteClient } from "../../types/ClickhouseWriteClient";
import { CHMFieldQuery } from "@/schema/types/CHMQuery";
import { omit } from "ramda";

import { OperationStatus } from "@/types/ApiResponse";

import { Create } from "@/api/ctx/database/clickhouse/types/create";
import { Update } from "@/api/ctx/database/clickhouse/types/update";

import { capitalize } from "@/utils/capitalize";

export const create =
  (client: ClickhouseWriteClient): Create =>
  async (model, data, [key, id]) => {
    try {
      await client.insert({
        table: model.table,
        values: [
          {
            ...Object.fromEntries(
              Object.entries(data).map(([k, v]) => [
                capitalize(k),
                typeof v === "object" ? JSON.stringify(v) : v,
              ])
            ),
            [capitalize(key as string)]: id,
          },
        ],
        format: "JSONEachRow",
      });

      return client.query({
        query: [{ [key]: { is: id } }],
        fieldName: model.kind,
        order: [key as string, "ASC"],
        pagination: { limit: 1, offset: 0 },
        selection: [],
      });
    } catch (e) {
      return OperationStatus.Error;
    }
  };
export const update =
  (client: ClickhouseWriteClient): Update =>
  async (model, criteria, data, key) => {
    try {
      const [match] = await client.query({
        query: [criteria as Record<string, CHMFieldQuery>],
        fieldName: model.kind,
        order: [key as string, "ASC"],
        pagination: { limit: 1, offset: 0 },
        selection: [key as string],
      });

      if (!match) return OperationStatus.Error;

      await client.insert({
        table: model.table,
        values: [
          {
            ...Object.fromEntries(
              Object.entries({ ...omit(["total"], match), ...data }).map(
                ([k, v]) => [capitalize(k), v]
              )
            ),
          },
        ],
      });

      return client.query({
        query: [{ [key]: { is: match[key] } }],
        fieldName: model.kind,
        order: [key as string, "ASC"],
        pagination: { limit: 1, offset: 0 },
        selection: [],
      });
    } catch (e) {
      return OperationStatus.Error;
    }
  };
