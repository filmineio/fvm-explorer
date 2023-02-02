import {
  CHMBaseOperator,
  CHMFiledOperator,
  CHMNumberOperator,
  CHMStringOperator,
} from "@/schema/types/CHMFiledOperator";

export enum InputType {
  Text,
  Bool,
  List,
}

export const getInputType = (operator: CHMFiledOperator): InputType => {
  switch (operator) {
    case CHMStringOperator.StartsWith:
    case CHMStringOperator.EndsWith:
    case CHMStringOperator.Includes:
    case CHMBaseOperator.Is:
    case CHMBaseOperator.Not:
    case CHMNumberOperator.GreaterThan:
    case CHMNumberOperator.LessThan:
    case CHMNumberOperator.GreaterThanOrEqual:
    case CHMNumberOperator.LessThanOrEqual:
      return InputType.Text;
    case CHMBaseOperator.In:
    case CHMBaseOperator.NotIn:
      return InputType.List;
    case CHMBaseOperator.IsNull:
      return InputType.Bool;
  }
};