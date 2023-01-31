import { CHMField } from "@/schema/types/CHMField";
import { CHMBaseOperator } from "@/schema/types/CHMFiledOperator";

import { processField } from "@/api/graphql/processModelSchema";

export function getIsNotQuery(f: CHMField) {
  return {
    [CHMBaseOperator.Is]: {
      type: processField(f),
    },
    [CHMBaseOperator.Not]: {
      type: processField(f),
    },
  };
}