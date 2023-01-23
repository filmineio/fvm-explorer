import { MagicConfig, magicConfig } from "./magic.config";

import apiConfig, { ApiConfig } from "@/ui/ctx/config/api.config";

export type UIConfig = {
  magic: MagicConfig;
  api: ApiConfig;
};

export const uiConfig: UIConfig = {
  magic: magicConfig,
  api: apiConfig,
};