import { MagicConfig, magicConfig } from "./magic.config";

import apiConfig, { ApiConfig } from "@/ui/ctx/config/api.config";
import w3sConfig, { W3sConfig } from "@/ui/ctx/config/w3s.config";

export type UIConfig = {
  magic: MagicConfig;
  api: ApiConfig;
  w3s: W3sConfig;
};

export const uiConfig: UIConfig = {
  magic: magicConfig,
  api: apiConfig,
  w3s: w3sConfig,
};