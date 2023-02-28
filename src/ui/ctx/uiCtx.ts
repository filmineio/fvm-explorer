import { AuthClient, initClientAuth } from "./auth/initAuth";
import { uiConfig } from "./config/config";
import { Axios } from "axios";
import { Web3Storage } from "web3.storage";

import { getHttpClient } from "@/ui/ctx/http/getHttpClient";
import { makeStorageClient } from "@/ui/ctx/web3storage/web3storage";

export type UiCtx = {
  auth: () => AuthClient;
  client: () => Axios;
  externalClient: () => Axios;
  w3s: () => Web3Storage;
};

export const uiCtx: UiCtx = {
  auth: initClientAuth(uiConfig.magic),
  client: getHttpClient(() => localStorage.getItem("token")),
  externalClient: getHttpClient(
    () => localStorage.getItem("token"),
    "https://hyper-api.lotus-node.dev/api"
  ),
  w3s: () => makeStorageClient(uiConfig.w3s),
};