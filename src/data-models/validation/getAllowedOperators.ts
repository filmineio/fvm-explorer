import { CHMField } from "@/schema/types/CHMField";
import {
  CHMBaseOperator,
  CHMFiledOperator,
  CHMNumberOperator,
  CHMStringOperator,
} from "@/schema/types/CHMFiledOperator";

const stringFieldOperators = new Set([
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
  CHMBaseOperator.In,
  CHMBaseOperator.NotIn,
  CHMStringOperator.Includes,
  CHMStringOperator.StartsWith,
  CHMStringOperator.EndsWith,
]);
const numberFieldOperators = new Set([
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
  CHMBaseOperator.In,
  CHMBaseOperator.NotIn,
  CHMNumberOperator.GreaterThanOrEqual,
  CHMNumberOperator.GreaterThan,
  CHMNumberOperator.LessThan,
  CHMNumberOperator.LessThanOrEqual,
]);
const booleanFieldOperators = new Set([
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
]);
const enumFieldOperators = new Set([
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
  CHMBaseOperator.In,
  CHMBaseOperator.NotIn,
]);
const relationFieldOperators = new Set([
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
]);
const mapFieldOperators = new Set([CHMBaseOperator.Is, CHMBaseOperator.Not]);
const arrayFieldOperators = new Set([
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
  CHMBaseOperator.In,
  CHMBaseOperator.NotIn,
]);
export const getAllowedOperators = (field: CHMField): Set<CHMFiledOperator> => {
  switch (field.kind) {
    case "string":
      return stringFieldOperators;
    case "number":
      return numberFieldOperators;
    case "bool":
      return booleanFieldOperators;
    case "enum":
      return enumFieldOperators;
    case "relation":
      return relationFieldOperators;
    case "map":
      return mapFieldOperators;
    case "list":
      return arrayFieldOperators;
    default:
      throw new Error(`UNKNOWN_FILED`);
  }
};