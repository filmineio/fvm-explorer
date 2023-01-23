import { Entity } from "@/enums/Entity";
import { AxiosResponse } from "axios";

import { ApiException } from "@/types/ApiException";
import { DataResult } from "@/types/DataResult";
import { ResultWithTotal } from "@/types/ResultWithTotal";

export type ApiResponse<T> = AxiosResponse<ResultWithTotal<T> | ApiException>;

export enum ResponseStatus {
  Ok = "ok",
  Error = "error",
}

export type ApplicationResults = {
  status: ResponseStatus.Ok;
  data: DataResult;
};

export type ApplicationError = {
  status: ResponseStatus.Error;
  data: ApiException;
  kind: Entity;
};

export type ApplicationData = ApplicationResults | ApplicationError;