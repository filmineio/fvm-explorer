import { Entity } from "@/enums/Entity";
import { AxiosResponse } from "axios";

import { ApplicationData, ResponseStatus } from "@/types/ApiResponse";

export const processResponse = (
  response: AxiosResponse,
  kind: Entity
): ApplicationData => {
  if (!response.data.exception) {
    return {
      status: ResponseStatus.Ok,
      data: {
        ...response.data,
        kind,
      },
    };
  }

  return {
    status: ResponseStatus.Error,
    data: response.data,
    kind,
  };
};