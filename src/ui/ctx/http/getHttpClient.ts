import axios, { Axios } from "axios";

import { uiConfig } from "@/ui/ctx/config/config";

import { Maybe } from "@/types/Maybe";

export const getHttpClient =
  (readToken: () => Maybe<string>, baseUrl?: string): (() => Axios) =>
  () =>
    new Axios({
      transformResponse: (d) => {
        try {
          return JSON.parse(d);
        } catch (e) {
          throw "Invalid Response";
        }
      },
      transformRequest: axios.defaults.transformRequest,
      baseURL: baseUrl || uiConfig.api.url,
      headers: readToken()
        ? {
            authorization: `Bearer ${readToken()}`,
          }
        : {},
    });