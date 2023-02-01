export enum CHMStringOperator {
  StartsWith = "startsWith",
  EndsWith = "endsWith",
  Includes = "includes",
}

export enum CHMBaseOperator {
  Is = "is",
  Not = "not",
  In = "in",
  NotIn = "notIn",
  IsNull = "isNull",
}

export enum CHMNumberOperator {
  GreaterThan = "greaterThan",
  LessThan = "lessThan",
  GreaterThanOrEqual = "greaterThanOrEqual",
  LessThanOrEqual = "lessThanOrEqual",
}

export type CHMFiledOperator =
  | CHMStringOperator
  | CHMBaseOperator
  | CHMNumberOperator;
