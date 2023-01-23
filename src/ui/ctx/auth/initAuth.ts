import { UIConfig } from "../config/config";
import { InstanceWithExtensions, SDKBase } from "@magic-sdk/provider";
import { Magic, MagicSDKExtensionsOption } from "magic-sdk";

export type AuthClient = InstanceWithExtensions<
  SDKBase,
  MagicSDKExtensionsOption<string>
>;

export const initClientAuth = (
  config: UIConfig["magic"]
): (() => AuthClient) => {
  return () => new Magic(config.key);
};
