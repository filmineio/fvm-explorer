import {
  CHMBaseOperator,
  CHMNumberOperator,
  CHMStringOperator,
} from "@/schema/types/CHMFiledOperator";

export type CHMFieldQuery =
  | CHMStringQuery
  | CHMNumberQuery
  | CHMBooleanQuery
  | CHMEnumQuery;
export type CHMInQuery<T = unknown> = Partial<{
  [condition in CHMBaseOperator.In | CHMBaseOperator.NotIn]: T;
}>;
export type CHMIsNotQuery<T = unknown> = Partial<{
  [condition in CHMBaseOperator.Is | CHMBaseOperator.Not]: T;
}>;
export type CHMNullishQuery<T = unknown> = Partial<{
  [condition in CHMBaseOperator.IsNull]: boolean;
}>;
export type CHMStringQuery =
  | Partial<{
      [condition in CHMStringOperator]: string;
    }>
  | CHMIsNotQuery<string>
  | CHMInQuery<string>
  | CHMNullishQuery<string>;
export type CHMNumberQuery =
  | Partial<{
      [condition in CHMNumberOperator]: number;
    }>
  | CHMIsNotQuery<number>
  | CHMInQuery<number>
  | CHMNullishQuery<number>;
export type CHMEnumQuery<T = unknown> =
  | CHMIsNotQuery<T>
  | CHMInQuery<T>
  | CHMNullishQuery<T>;
export type CHMBooleanQuery = CHMIsNotQuery<boolean> | CHMNullishQuery<boolean>;