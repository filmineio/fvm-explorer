import { Entity } from "@/enums/Entity";
import { AxiosResponse } from "axios";

import { ApplicationData, OperationStatus } from "@/types/ApiResponse";

export const processResponse = (
  response: AxiosResponse,
  kind: Entity
): ApplicationData => {
  if (!response.data.exception) {
    return {
      status: OperationStatus.Ok,
      data: {
        ...response.data,
        kind,
      },
    };
  }

  return {
    status: OperationStatus.Error,
    data: response.data,
    kind,
  };
};