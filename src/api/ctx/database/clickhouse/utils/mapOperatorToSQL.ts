import {
  CHMBaseOperator,
  CHMNumberOperator,
  CHMStringOperator,
} from "@/schema/types//CHMFiledOperator";

import { mapValueToSQL } from "@/api/ctx/database/clickhouse/utils/mapValueToSQL";

export const mapOperatorToSQL = (q: Record<string, unknown>) => {
  return Object.entries(q).reduce((p, [k, v]) => {
    switch (k) {
      case CHMBaseOperator.Is:
        return `= ${mapValueToSQL(v)}`;
      case CHMBaseOperator.Not:
        return `<> ${mapValueToSQL(v)}`;
      case CHMBaseOperator.IsNull:
        return `is ${v ? "" : "not"} NULL`;
      case CHMBaseOperator.In:
        return `IN (${(v as [])
          .map((v: unknown) => `${mapValueToSQL(v)}`)
          .join(",")})`;
      case CHMBaseOperator.NotIn:
        return `NOT IN (${(v as [])
          .map((v: unknown) => `${mapValueToSQL(v)}`)
          .join(",")})`;
      case CHMStringOperator.Includes:
        return `ilike '%${v}%'`;
      case CHMStringOperator.StartsWith:
        return `ilike '${v}%'`;
      case CHMStringOperator.EndsWith:
        return `ilike '%${v}'`;
      case CHMNumberOperator.GreaterThanOrEqual:
        return `>= ${v}`;
      case CHMNumberOperator.GreaterThan:
        return `> ${v}`;
      case CHMNumberOperator.LessThan:
        return `< ${v}`;
      case CHMNumberOperator.LessThanOrEqual:
        return `<= ${v}`;
      default:
        return ``;
    }

    return "";
  }, "");
};