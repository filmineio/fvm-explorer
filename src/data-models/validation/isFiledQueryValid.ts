import { getAllowedOperators } from "./getAllowedOperators";
import { isValidValue } from "./isValidValue";
import { CHMFiledOperator } from "@/schema/types/CHMFiledOperator";
import { CHModel } from "@/schema/types/CHModel";

export function isFiledQueryValid<T>(
  model: CHModel<T>,
  key: string,
  value: Record<string, unknown>
) {
  const field = model[key];
  const allowedOperators = getAllowedOperators(field.kind);
  const operators = Object.entries(value);
  return operators.some(
    ([operator, value]) =>
      !(
        allowedOperators.includes(operator as CHMFiledOperator) ||
        isValidValue(field, operator, value)
      )
  );
}