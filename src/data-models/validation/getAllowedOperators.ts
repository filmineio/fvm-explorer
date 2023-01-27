import { CHMField } from "@/schema/types/CHMField";
import {
  CHMBaseOperator,
  CHMFiledOperator,
  CHMNumberOperator,
  CHMStringOperator,
} from "@/schema/types/CHMFiledOperator";

const stringFieldOperators = [
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
  CHMBaseOperator.In,
  CHMBaseOperator.NotIn,
  CHMStringOperator.Includes,
  CHMStringOperator.StartsWith,
  CHMStringOperator.EndsWith,
];
const numberFieldOperators = [
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
  CHMBaseOperator.In,
  CHMBaseOperator.NotIn,
  CHMNumberOperator.GreaterThanOrEqual,
  CHMNumberOperator.GreaterThan,
  CHMNumberOperator.LessThan,
  CHMNumberOperator.LessThanOrEqual,
];
const booleanFieldOperators = [
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
];
const enumFieldOperators = [
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
  CHMBaseOperator.In,
  CHMBaseOperator.NotIn,
];
const relationFieldOperators = [CHMBaseOperator.Is, CHMBaseOperator.Not];
const mapFieldOperators = [CHMBaseOperator.Is, CHMBaseOperator.Not];
const arrayFieldOperators = [
  CHMBaseOperator.Is,
  CHMBaseOperator.Not,
  CHMBaseOperator.IsNull,
  CHMBaseOperator.In,
  CHMBaseOperator.NotIn,
];
export const getAllowedOperators = (
  field: CHMField["kind"]
): CHMFiledOperator[] => {
  switch (field) {
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