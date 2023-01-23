import { CHMField } from "@/schema/types/CHMField";
import { CHMBaseOperator } from "@/schema/types/CHMFiledOperator";

import { isEnum } from "@/utils/isEnum";

export const isValidValue = <T>(
  field: CHMField,
  operator: string,
  value: T
) => {
  if (operator === CHMBaseOperator.IsNull) return typeof value === "boolean";

  switch (field.kind) {
    case "string":
      if (operator === CHMBaseOperator.In || operator === CHMBaseOperator.NotIn)
        return (
          value instanceof Array &&
          value.every((val) => typeof val === "string")
        );

      return typeof value === "string";

    case "number":
      if (operator === CHMBaseOperator.In || operator === CHMBaseOperator.NotIn)
        return (
          value instanceof Array &&
          value.every((val) => typeof val === "number")
        );

      return typeof value === "number";

    case "bool":
      if (operator === CHMBaseOperator.IsNull)
        return typeof value === "boolean";

      return typeof value === "boolean";

    case "enum":
      if (
        operator === CHMBaseOperator.In ||
        operator === CHMBaseOperator.NotIn
      ) {
        if (field.value instanceof Array)
          return (
            value instanceof Array &&
            value.every((val) => isEnum(field.value, val))
          );

        return (
          value instanceof Array &&
          value.every((val) => isEnum(field.value, val))
        );
      }
      return isEnum(field.value, value);

    default:
      return true;
  }
};