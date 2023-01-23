import { AuthClient, initClientAuth } from "./auth/initAuth";
import { uiConfig } from "./config/config";
import { Axios } from "axios";

import { getHttpClient } from "@/ui/ctx/http/getHttpClient";

export type UiCtx = {
  auth: () => AuthClient;
  client: () => Axios;
};

export const uiCtx: UiCtx = {
  auth: initClientAuth(uiConfig.magic),
  client: getHttpClient(() => localStorage.getItem("token")),
};