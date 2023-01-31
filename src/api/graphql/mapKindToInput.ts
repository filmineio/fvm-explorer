import { CHMField } from "@/schema/types/CHMField";

import { boolQueryInput } from "@/api/graphql/boolQueryInput";
import { numberQueryInput } from "@/api/graphql/numberQueryInput";
import {
  getFieldQuery,
  processModelInT,
} from "@/api/graphql/processModelSchema";
import { stringQueryInput } from "@/api/graphql/stringQueryInput";

export const mapKindToInput = (f: CHMField) => {
  switch (f.kind) {
    case "number":
      return numberQueryInput;
    case "string":
      return stringQueryInput;
    case "bool":
      return boolQueryInput;
    case "enum":
      return getFieldQuery(f);
    case "list":
      return processModelInT(f.value);
    case "map":
      return processModelInT(f.value);
    case "relation":
      return processModelInT(f.value);
    default:
      return null;
  }
};