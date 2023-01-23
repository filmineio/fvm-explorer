import {
  CHMBooleanQuery,
  CHMEnumQuery,
  CHMNumberQuery,
  CHMStringQuery,
} from "@/schema/types/CHMQuery";
import { CHModel } from "@/schema/types/CHModel";

export type CHMField =
  | CHMStringField
  | CHMNumberField
  | CHMBooleanField
  | CHMEnumField
  | CHMMapField
  | CHMArrayField
  | CHMRelationField;
export type CHMStringField = {
  kind: "string";
  query?: CHMStringQuery;
};
export type CHMNumberField = {
  kind: "number";
  query?: CHMNumberQuery;
};
export type CHMBooleanField = {
  kind: "bool";
  query?: CHMBooleanQuery;
};
export type CHMEnumField<T = unknown> = {
  kind: "enum";
  name: string;
  query?: CHMEnumQuery<T>;
  value: T;
};
export type CHMMapField<T = unknown> = {
  kind: "map";
  value: CHModel<T>;
};
export type CHMArrayField<T = unknown> = {
  kind: "list";
  value: T extends string | number | boolean ? T : CHModel<T>;
};
export type CHMRelationField<T = CHModel<unknown>, R = "one" | "many"> = {
  kind: "relation";
  relation: R;
  value: T;
  path: string;
  on: [string, string];
};