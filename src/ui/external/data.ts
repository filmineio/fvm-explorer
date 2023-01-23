import { Entity } from "@/enums/Entity";
import { Axios } from "axios";
import { lensPath, set } from "ramda";
import { useState } from "react";

import { useStore } from "@/ui/state/Store";
import { setDataErrorTransformer } from "@/ui/state/transformers/data/setDataError.transformer";
import { setDataLoadingTransformer } from "@/ui/state/transformers/data/setDataLoading.transformer";
import { setDataResultsTransformer } from "@/ui/state/transformers/data/setDataResults.transformer";

import { uiCtx } from "@/ui/ctx/uiCtx";
import { processResponse } from "@/ui/utils/processResponse";

import { ApiResponse, ResponseStatus } from "@/types/ApiResponse";
import { ResourceQuery } from "@/types/AppQuery";

import { cb } from "@/utils/cb";


export const querify = <T>(data: ResourceQuery<T>) => {
  return Object.entries(data)
    .map(([k, v]) => `${k}=${typeof v === "object" ? JSON.stringify(v) : v}`)
    .join("&");
};

export const dataAPI = (client: Axios) => {
  const get = async <T, RT>(
    resource: Entity,
    query: ResourceQuery<T>
  ): Promise<ApiResponse<RT>> => {
    return client.get(`explore/${resource}?${querify(query)}`);
  };

  return { get };
};

export const useQuery = <T>() => {
  const [state, setState] = useState<{
    error: string;
    loading: boolean;
    data: T[];
    total: number;
  }>({
    error: "",
    loading: true,
    data: [],
    total: 0,
  });

  const get = <T = unknown>(resource: Entity, query: ResourceQuery<T>) => {
    setState((p) => set(lensPath(["loading"]), true)(p));
    dataAPI(uiCtx.client())
      .get(resource, {
        ...query,
      })
      .then((response) => {
        const data = processResponse(response, Entity.Event);
        if (data.status === ResponseStatus.Error) {
          setState((p) => set(lensPath(["error"]), data.data.exception)(p));
        } else {
          setState((p) =>
            set(
              lensPath(["total"]),
              data.data.total
            )(set(lensPath(["data"]), data.data.rows)(p))
          );
        }
      })
      .catch(() =>
        setState((p) => set(lensPath(["error"]), "Something Wennt Wrong")(p))
      )
      .finally(() => setState((p) => set(lensPath(["loading"]), false)(p)));
  };

  return { get, ...state };
};

export const useDataClient = () => {
  const { mod } = useStore();
  const get = <T, RT>(resource: Entity, query: ResourceQuery<T>) => {
    mod(setDataLoadingTransformer(true), setDataErrorTransformer(""));
    dataAPI(uiCtx.client())
      .get(resource, query)
      .then((response) => {
        const data = processResponse(response, resource);
        if (data.status === ResponseStatus.Error) {
          mod(setDataErrorTransformer(data.data.exception));
        } else {
          mod(setDataResultsTransformer(data.data));
        }
      })
      .catch(
        cb(
          mod,
          setDataErrorTransformer("Something Went Wrong"),
          setDataResultsTransformer({
            kind: resource as Entity.Contract,
            total: 0,
            rows: [],
            network: query.network,
          })
        )
      )
      .finally(cb(mod, setDataLoadingTransformer(false)));
  };

  return { get };
};