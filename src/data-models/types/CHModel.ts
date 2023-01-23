import { Entity } from "@/enums/Entity";
import { CHMField } from "@/schema/types/CHMField";
import { Key } from "@/schema/types/Key";

export type CHModel<T> = Record<"kind", Entity> & {
  [key in Key<T>]: CHMField;
} & Record<"table", string> &
  Record<string, any>;