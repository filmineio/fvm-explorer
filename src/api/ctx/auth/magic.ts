import { Magic } from "@magic-sdk/admin";

import { AuthConfig } from "@/api/ctx/config/auth.config";

export type MagicClient = any;

export const initMagicClient = (c: AuthConfig): any => {
  return new Magic(c.magicSecretKey);
};
