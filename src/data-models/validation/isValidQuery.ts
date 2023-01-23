import { isFiledQueryValid } from "./isFiledQueryValid";
import { CHModel } from "@/schema/types/CHModel";

import { isModelFieldExposed } from "@/api/ctx/database/clickhouse/utils/isModelFieldExposed";

export const isValidQuery = <T>(
  model: CHModel<T>,
  query: Record<string, any>
): boolean => {
  const modelFields = Object.keys(model).filter(isModelFieldExposed);
  return !Object.entries(query).some(
    ([key, value]) =>
      !(modelFields.includes(key) || isFiledQueryValid(model, key, value))
  );
};